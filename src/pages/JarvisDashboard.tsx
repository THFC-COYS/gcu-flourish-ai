import { useEffect, useRef, useState, useCallback } from 'react';
import '../styles/jarvis.css';

// ─────────────────────────────────────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface UniversityConfig {
  id: string;
  name: string;
  abbr: string;
  accentColor: string;
  accentRgb: string;
  weekStart: number;   // 0=Sun 1=Mon 2=Tue 3=Wed 4=Thu 5=Fri 6=Sat
  weekType: string;    // e.g. "Mon–Sun"
  termStart: string;   // ISO date string, MUST be the weekStart day
  termWeeks: number;
}

interface WeekInfo {
  status: 'upcoming' | 'active' | 'complete';
  weekNum: number;
  totalWeeks: number;
  daysIntoWeek: number;   // 0 = first day, 6 = last day
  progress: number;        // 0-100 across entire term
  isFirstDay: boolean;
  isLastDay: boolean;
  termEndDate: Date;
  weekEndDate: Date;
}

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

interface NewsSection {
  label: string;
  icon: string;
  color: string;
  colorRgb: string;
  rssUrl: string;
  items: NewsItem[];
  loading: boolean;
  error: boolean;
}

interface AlertInfo {
  type: 'announcement' | 'grading';
  universities: string[];
}

interface ElonState {
  status: 'idle' | 'requesting' | 'approved' | 'denied';
  message: string;
  timestamp: string;
}

// ─────────────────────────────────────────────────────────────────────────────
//  UNIVERSITY DEFAULTS  (user can edit in Settings)
// ─────────────────────────────────────────────────────────────────────────────

const DEFAULT_UNIVERSITIES: UniversityConfig[] = [
  {
    id: 'gcu',
    name: 'Grand Canyon University',
    abbr: 'GCU',
    accentColor: '#9b30ff',
    accentRgb: '155,48,255',
    weekStart: 1,    // Monday
    weekType: 'Mon–Sun',
    termStart: '2026-03-09',
    termWeeks: 8,
  },
  {
    id: 'snhu',
    name: 'Southern New Hampshire Univ.',
    abbr: 'SNHU',
    accentColor: '#0080ff',
    accentRgb: '0,128,255',
    weekStart: 1,    // Monday
    weekType: 'Mon–Sun',
    termStart: '2026-03-02',
    termWeeks: 8,
  },
  {
    id: 'umgc',
    name: 'Univ. of Maryland Global Campus',
    abbr: 'UMGC',
    accentColor: '#ffd700',
    accentRgb: '255,215,0',
    weekStart: 3,    // Wednesday
    weekType: 'Wed–Tue',
    termStart: '2026-03-11',
    termWeeks: 8,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
//  ELON APPROVAL MESSAGES
// ─────────────────────────────────────────────────────────────────────────────

const ELON_APPROVED_MESSAGES = [
  '"Yeah." — E. Musk',
  '"Ship it." — E. Musk',
  '"Approved. Now work faster." — E. Musk',
  '"Based. Authorization granted." — E. Musk',
  '"This is fine. Actually it\'s great." — E. Musk',
  '"Approved. Also, Mars by 2029." — E. Musk',
];

const ELON_PROCESSING_STEPS = [
  'CONNECTING TO X PLATFORM...',
  'SCANNING BIOMETRIC SIGNATURE...',
  'ROUTING THROUGH STARLINK...',
  'AWAITING EXECUTIVE RESPONSE...',
  'PROCESSING AUTHORIZATION...',
];

// ─────────────────────────────────────────────────────────────────────────────
//  HELPER: WEEK INFO CALCULATOR
// ─────────────────────────────────────────────────────────────────────────────

function getWeekInfo(cfg: UniversityConfig, today: Date): WeekInfo {
  const start = new Date(cfg.termStart + 'T00:00:00');
  const msDay = 86_400_000;
  const daysSinceStart = Math.floor((today.getTime() - start.getTime()) / msDay);

  const totalWeeks = cfg.termWeeks;

  if (daysSinceStart < 0) {
    return {
      status: 'upcoming',
      weekNum: 0,
      totalWeeks,
      daysIntoWeek: 0,
      progress: 0,
      isFirstDay: false,
      isLastDay: false,
      termEndDate: new Date(start.getTime() + totalWeeks * 7 * msDay),
      weekEndDate: start,
    };
  }

  const weekNum = Math.floor(daysSinceStart / 7) + 1;
  const daysIntoWeek = daysSinceStart % 7;

  if (weekNum > totalWeeks) {
    const termEndDate = new Date(start.getTime() + totalWeeks * 7 * msDay);
    return {
      status: 'complete',
      weekNum: totalWeeks,
      totalWeeks,
      daysIntoWeek: 6,
      progress: 100,
      isFirstDay: false,
      isLastDay: false,
      termEndDate,
      weekEndDate: termEndDate,
    };
  }

  const termEndDate = new Date(start.getTime() + totalWeeks * 7 * msDay);
  const weekEndDate = new Date(start.getTime() + weekNum * 7 * msDay - msDay);

  return {
    status: 'active',
    weekNum,
    totalWeeks,
    daysIntoWeek,
    progress: (daysSinceStart / (totalWeeks * 7)) * 100,
    isFirstDay: daysIntoWeek === 0,
    isLastDay: daysIntoWeek === 6,
    termEndDate,
    weekEndDate,
  };
}

function fmtDate(d: Date) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function timeAgo(dateStr: string) {
  try {
    const d = new Date(dateStr);
    const secs = Math.floor((Date.now() - d.getTime()) / 1000);
    if (secs < 60) return 'just now';
    if (secs < 3600) return `${Math.floor(secs / 60)}m ago`;
    if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`;
    return `${Math.floor(secs / 86400)}d ago`;
  } catch {
    return '';
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  HOOK: NEWS FEED (RSS via rss2json)
// ─────────────────────────────────────────────────────────────────────────────

const RSS2JSON = 'https://api.rss2json.com/v1/api.json';

const NEWS_FEEDS: Omit<NewsSection, 'items' | 'loading' | 'error'>[] = [
  {
    label: 'Apple',
    icon: '',
    color: '#aaaaaa',
    colorRgb: '170,170,170',
    rssUrl: 'https://feeds.macrumors.com/MacRumors-All',
  },
  {
    label: 'Nintendo',
    icon: '',
    color: '#e4000f',
    colorRgb: '228,0,15',
    rssUrl: 'https://www.nintendolife.com/feeds/news',
  },
  {
    label: 'Spurs',
    icon: '⚽',
    color: '#132257',
    colorRgb: '19,34,87',
    rssUrl: 'https://www.skysports.com/rss/12040',
  },
];

async function fetchNewsSection(feed: typeof NEWS_FEEDS[0]): Promise<NewsItem[]> {
  const url = `${RSS2JSON}?rss_url=${encodeURIComponent(feed.rssUrl)}&count=5`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Network error');
  const data = await res.json();
  if (data.status !== 'ok') throw new Error('Feed error');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data.items || []).slice(0, 5).map((item: any) => ({
    title: item.title || 'No title',
    link: item.link || '#',
    pubDate: item.pubDate || '',
    description: item.description
      ? item.description.replace(/<[^>]+>/g, '').slice(0, 120) + '…'
      : '',
  }));
}

// ─────────────────────────────────────────────────────────────────────────────
//  SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

/** Animated arc reactor */
function ArcReactor({ size = 64 }: { size?: number }) {
  return (
    <div className="arc-reactor" style={{ width: size, height: size, flexShrink: 0 }}>
      <div className="arc-ring arc-ring-1" />
      <div className="arc-ring arc-ring-2" />
      <div className="arc-ring arc-ring-3" />
      <div className="arc-core" />
    </div>
  );
}

/** Status indicator row */
function StatusRow({ label, value, dotClass = 'j-dot-cyan' }: {
  label: string; value: string; dotClass?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2 py-1">
      <span className="j-label" style={{ fontSize: '0.55rem' }}>{label}</span>
      <div className="flex items-center gap-2">
        <span className="j-dot" style={{ width: 6, height: 6 }} />
        <span
          className={`j-dot ${dotClass}`}
          style={{ width: 6, height: 6, marginLeft: -10 }}
        />
        <span style={{ fontSize: '0.7rem', fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.05em' }}>
          {value}
        </span>
      </div>
    </div>
  );
}

/** University week tracker card */
function UniversityCard({ cfg, today }: { cfg: UniversityConfig; today: Date }) {
  const info = getWeekInfo(cfg, today);

  const badgeClass =
    info.isFirstDay ? 'week-badge-first' :
    info.isLastDay  ? 'week-badge-last'  :
    'week-badge-active';

  const statusLabel =
    info.status === 'upcoming' ? 'UPCOMING' :
    info.status === 'complete' ? 'TERM COMPLETE' :
    info.isFirstDay ? '⚡ WEEK START' :
    info.isLastDay  ? '🔴 WEEK END'   :
    `DAY ${info.daysIntoWeek + 1} / 7`;

  return (
    <div
      className="j-panel j-panel-inner j-scan-sweep p-3 rounded-sm"
      style={{
        borderColor: `rgba(${cfg.accentRgb}, 0.35)`,
        animation: 'slide-in-left 0.6s ease both',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="j-title" style={{ fontSize: '0.65rem', color: cfg.accentColor, letterSpacing: '0.18em' }}>
            {cfg.abbr}
          </div>
          <div style={{ fontSize: '0.6rem', color: 'rgba(0,212,255,0.45)', letterSpacing: '0.05em' }}>
            {cfg.name}
          </div>
        </div>
        <div
          className={`px-2 py-0.5 rounded-sm text-center j-title ${badgeClass}`}
          style={{ fontSize: '0.55rem', minWidth: 80 }}
        >
          {statusLabel}
        </div>
      </div>

      {/* Week number hero */}
      {info.status === 'active' && (
        <div className="flex items-end gap-2 mb-2">
          <div
            className="j-title j-glow"
            style={{ fontSize: '2.2rem', lineHeight: 1, color: cfg.accentColor }}
          >
            {info.weekNum}
          </div>
          <div>
            <div style={{ fontSize: '0.6rem', color: 'rgba(0,212,255,0.45)' }}>OF</div>
            <div className="j-title" style={{ fontSize: '1rem', color: 'rgba(0,212,255,0.6)' }}>
              {info.totalWeeks}
            </div>
          </div>
          <div className="ml-auto text-right">
            <div className="j-label" style={{ fontSize: '0.5rem' }}>TERM ENDS</div>
            <div style={{ fontSize: '0.65rem', color: 'rgba(0,212,255,0.7)', fontFamily: 'Orbitron, sans-serif' }}>
              {fmtDate(info.termEndDate)}
            </div>
          </div>
        </div>
      )}

      {info.status === 'upcoming' && (
        <div className="mb-2">
          <span style={{ fontSize: '0.7rem', color: 'rgba(0,212,255,0.5)' }}>
            Starts {fmtDate(new Date(cfg.termStart + 'T00:00:00'))}
          </span>
        </div>
      )}

      {info.status === 'complete' && (
        <div className="mb-2">
          <span style={{ fontSize: '0.7rem', color: 'var(--j-green)' }}>
            ✓ Term completed {fmtDate(info.termEndDate)}
          </span>
        </div>
      )}

      {/* Progress */}
      <div className="j-progress-track mb-1">
        <div
          className="j-progress-fill"
          style={{
            width: `${info.progress}%`,
            background: `linear-gradient(90deg, rgba(${cfg.accentRgb},0.4), ${cfg.accentColor})`,
            boxShadow: `0 0 8px ${cfg.accentColor}`,
          }}
        />
      </div>
      <div className="flex justify-between">
        <span className="j-label" style={{ fontSize: '0.5rem' }}>TERM PROGRESS</span>
        <span style={{ fontSize: '0.6rem', fontFamily: 'Orbitron, sans-serif', color: cfg.accentColor }}>
          {Math.round(info.progress)}%
        </span>
      </div>

      {/* Week cycle */}
      <div className="mt-2 flex justify-between items-center">
        <span className="j-label" style={{ fontSize: '0.5rem' }}>WEEK CYCLE</span>
        <div className="flex gap-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 7,
                height: 7,
                borderRadius: 1,
                background: i < info.daysIntoWeek + (info.status === 'active' ? 1 : 0)
                  ? cfg.accentColor
                  : 'rgba(0,212,255,0.1)',
                boxShadow: i === info.daysIntoWeek && info.status === 'active'
                  ? `0 0 6px ${cfg.accentColor}`
                  : 'none',
              }}
            />
          ))}
        </div>
        <span className="j-label" style={{ fontSize: '0.5rem' }}>{cfg.weekType}</span>
      </div>
    </div>
  );
}

/** Single news section */
function NewsSection({ section }: { section: NewsSection }) {
  return (
    <div className="j-panel j-panel-inner rounded-sm p-3" style={{ borderColor: `rgba(${section.colorRgb},0.3)` }}>
      <div className="flex items-center gap-2 mb-2">
        <span style={{ fontSize: '1rem' }}>{section.icon}</span>
        <span
          className="j-title"
          style={{ fontSize: '0.7rem', color: section.color, letterSpacing: '0.15em' }}
        >
          {section.label}
        </span>
        {section.loading && <div className="j-spinner ml-auto" style={{ width: 14, height: 14 }} />}
        {!section.loading && !section.error && (
          <span className="ml-auto j-label" style={{ fontSize: '0.5rem', color: 'rgba(0,212,255,0.35)' }}>
            LIVE
          </span>
        )}
      </div>
      <div className="j-divider mb-2" />

      {section.error && (
        <div style={{ fontSize: '0.65rem', color: 'rgba(255,32,32,0.7)', textAlign: 'center', padding: '8px 0' }}>
          ⚠ FEED OFFLINE
        </div>
      )}

      {!section.loading && !section.error && section.items.length === 0 && (
        <div style={{ fontSize: '0.65rem', color: 'rgba(0,212,255,0.35)', textAlign: 'center', padding: '8px 0' }}>
          No articles loaded
        </div>
      )}

      <div className="flex flex-col gap-2">
        {section.items.map((item, idx) => (
          <a
            key={idx}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="j-news-item pl-2 py-1 no-underline"
            style={{ textDecoration: 'none', animation: `fade-up 0.4s ease ${idx * 0.07}s both` }}
          >
            <div
              style={{
                fontSize: '0.7rem',
                color: 'rgba(220,240,255,0.9)',
                lineHeight: 1.3,
                marginBottom: 2,
              }}
            >
              {item.title}
            </div>
            <div style={{ fontSize: '0.58rem', color: 'rgba(0,212,255,0.4)' }}>
              {timeAgo(item.pubDate)}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

/** Alert Overlay */
function AlertOverlay({
  alert,
  onDismiss,
}: {
  alert: AlertInfo;
  onDismiss: () => void;
}) {
  const isAnnouncement = alert.type === 'announcement';

  return (
    <div className="j-alert-overlay" onClick={onDismiss}>
      <div className="j-alert-box" onClick={e => e.stopPropagation()}>
        <div className="j-alert-border" />
        <div
          className="j-panel p-6 rounded-sm"
          style={{ border: `1px solid ${isAnnouncement ? 'rgba(255,107,0,0.6)' : 'rgba(255,32,32,0.6)'}` }}
        >
          {/* Top decoration */}
          <div className="flex items-center gap-3 mb-4">
            <div className="j-dot j-dot-red" style={{ width: 12, height: 12 }} />
            <span
              className="j-title"
              style={{
                fontSize: '0.6rem',
                color: isAnnouncement ? 'var(--j-orange)' : 'var(--j-red)',
                letterSpacing: '0.3em',
              }}
            >
              ⚡ PRIORITY ALERT — JARVIS SYSTEM
            </span>
            <div className="j-dot j-dot-red ml-auto" style={{ width: 12, height: 12 }} />
          </div>

          <div className="j-divider mb-4" />

          {/* Icon */}
          <div className="text-center mb-4">
            <div
              style={{
                fontSize: '3rem',
                filter: `drop-shadow(0 0 12px ${isAnnouncement ? 'var(--j-orange)' : 'var(--j-red)'})`,
              }}
            >
              {isAnnouncement ? '📣' : '📋'}
            </div>
          </div>

          {/* Message */}
          <div className="text-center mb-2">
            <div
              className="j-title"
              style={{
                fontSize: '1.1rem',
                color: isAnnouncement ? 'var(--j-orange)' : 'var(--j-red)',
                letterSpacing: '0.1em',
                textShadow: isAnnouncement
                  ? '0 0 15px rgba(255,107,0,0.6)'
                  : '0 0 15px rgba(255,32,32,0.6)',
              }}
            >
              {isAnnouncement ? 'POST YOUR ANNOUNCEMENTS' : 'CHECK & UPDATE GRADING'}
            </div>
          </div>

          <div
            className="text-center mb-4"
            style={{ fontSize: '0.75rem', color: 'rgba(0,212,255,0.6)' }}
          >
            {isAnnouncement
              ? 'Today is the FIRST day of the week for the following institutions.'
              : 'Today is the LAST day of the week. Review and submit grades before midnight.'}
          </div>

          {/* University list */}
          <div className="flex flex-wrap gap-2 justify-center mb-5">
            {alert.universities.map(u => (
              <span
                key={u}
                className="j-title px-3 py-1 rounded-sm"
                style={{
                  fontSize: '0.7rem',
                  background: isAnnouncement
                    ? 'rgba(255,107,0,0.15)'
                    : 'rgba(255,32,32,0.15)',
                  border: `1px solid ${isAnnouncement ? 'rgba(255,107,0,0.4)' : 'rgba(255,32,32,0.4)'}`,
                  color: isAnnouncement ? 'var(--j-orange)' : 'var(--j-red)',
                }}
              >
                {u}
              </span>
            ))}
          </div>

          <div className="j-divider mb-4" />

          <button
            onClick={onDismiss}
            className="w-full py-2 j-title"
            style={{
              background: 'rgba(0,212,255,0.08)',
              border: '1px solid rgba(0,212,255,0.3)',
              color: 'var(--j-cyan)',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              cursor: 'pointer',
              fontFamily: 'Orbitron, sans-serif',
            }}
          >
            ACKNOWLEDGED — DISMISS
          </button>
        </div>
      </div>
    </div>
  );
}

/** Elon Musk Approval Panel */
function ElonPanel({
  elon,
  onRequest,
}: {
  elon: ElonState;
  onRequest: () => void;
}) {
  const approved = elon.status === 'approved';
  const requesting = elon.status === 'requesting';

  return (
    <div
      className="j-panel j-panel-inner j-scan-sweep rounded-sm p-3"
      style={{
        borderColor: approved
          ? 'rgba(0,255,136,0.4)'
          : requesting
          ? 'rgba(255,215,0,0.4)'
          : 'rgba(255,107,0,0.3)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div
          className="j-dot"
          style={{
            width: 8,
            height: 8,
            background: approved ? 'var(--j-green)' : requesting ? 'var(--j-gold)' : 'var(--j-orange)',
            boxShadow: `0 0 6px ${approved ? 'var(--j-green)' : requesting ? 'var(--j-gold)' : 'var(--j-orange)'}`,
            animation: 'pulse-dot 1s infinite',
          }}
        />
        <span
          className="j-title"
          style={{ fontSize: '0.65rem', letterSpacing: '0.18em', color: 'var(--j-orange)' }}
        >
          EXECUTIVE AUTHORIZATION
        </span>
      </div>

      <div className="j-divider mb-3" />

      {/* Avatar placeholder */}
      <div className="flex justify-center mb-3">
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,107,0,0.2) 0%, rgba(0,8,20,0.8) 70%)',
            border: `2px solid ${approved ? 'var(--j-green)' : 'rgba(255,107,0,0.5)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.6rem',
            boxShadow: `0 0 15px ${approved ? 'rgba(0,255,136,0.3)' : 'rgba(255,107,0,0.3)'}`,
          }}
        >
          𝕏
        </div>
      </div>

      <div
        className="j-title text-center mb-1"
        style={{ fontSize: '0.75rem', color: 'rgba(220,240,255,0.9)', letterSpacing: '0.1em' }}
      >
        E. MUSK
      </div>
      <div
        className="text-center mb-3"
        style={{ fontSize: '0.6rem', color: 'rgba(0,212,255,0.4)', letterSpacing: '0.05em' }}
      >
        CEO, SPACEX · CTO, X CORP
      </div>

      {/* Status */}
      <div
        className="text-center py-2 mb-3 rounded-sm"
        style={{
          background: approved
            ? 'rgba(0,255,136,0.08)'
            : requesting
            ? 'rgba(255,215,0,0.08)'
            : 'rgba(255,107,0,0.08)',
          border: `1px solid ${approved ? 'rgba(0,255,136,0.2)' : requesting ? 'rgba(255,215,0,0.2)' : 'rgba(255,107,0,0.15)'}`,
        }}
      >
        <div
          className="j-title"
          style={{
            fontSize: '0.6rem',
            color: approved ? 'var(--j-green)' : requesting ? 'var(--j-gold)' : 'var(--j-orange)',
            letterSpacing: '0.15em',
          }}
        >
          {approved
            ? '✓ AUTHORIZATION GRANTED'
            : requesting
            ? '⟳ PROCESSING...'
            : '⚠ AUTHORIZATION REQUIRED'}
        </div>
        {elon.message && (
          <div
            className="mt-1"
            style={{
              fontSize: '0.65rem',
              color: approved ? 'rgba(0,255,136,0.7)' : 'rgba(255,215,0,0.7)',
              fontStyle: 'italic',
            }}
          >
            {elon.message}
          </div>
        )}
        {elon.timestamp && approved && (
          <div
            style={{ fontSize: '0.5rem', color: 'rgba(0,212,255,0.3)', marginTop: 4 }}
          >
            {elon.timestamp}
          </div>
        )}
      </div>

      {/* Button */}
      {!approved && (
        <button
          className={`elon-btn w-full py-2 rounded-sm ${requesting ? 'opacity-60' : ''}`}
          style={{ fontSize: '0.6rem' }}
          onClick={onRequest}
          disabled={requesting}
        >
          {requesting ? '◌ AWAITING RESPONSE...' : 'REQUEST AUTHORIZATION'}
        </button>
      )}

      {approved && (
        <button
          className="elon-btn elon-approved w-full py-2 rounded-sm"
          style={{ fontSize: '0.6rem' }}
          onClick={onRequest}
        >
          ✓ RE-AUTHORIZE DASHBOARD
        </button>
      )}
    </div>
  );
}

/** Settings Modal */
function SettingsModal({
  universities,
  onSave,
  onClose,
}: {
  universities: UniversityConfig[];
  onSave: (configs: UniversityConfig[]) => void;
  onClose: () => void;
}) {
  const [local, setLocal] = useState<UniversityConfig[]>(
    universities.map(u => ({ ...u }))
  );

  function update(id: string, key: keyof UniversityConfig, value: string | number) {
    setLocal(prev =>
      prev.map(u => (u.id === id ? { ...u, [key]: value } : u))
    );
  }

  return (
    <div className="j-settings-overlay">
      <div
        className="j-panel rounded-sm p-5 j-scroll"
        style={{ width: '90%', maxWidth: 560, maxHeight: '85vh', overflowY: 'auto' }}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="j-title" style={{ fontSize: '0.8rem', letterSpacing: '0.2em' }}>
            ⚙ SYSTEM CONFIGURATION
          </span>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: '1px solid rgba(0,212,255,0.3)',
              color: 'var(--j-cyan)',
              padding: '2px 10px',
              cursor: 'pointer',
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '0.6rem',
            }}
          >
            ✕ CLOSE
          </button>
        </div>
        <div className="j-divider mb-4" />

        {local.map(u => (
          <div key={u.id} className="mb-5">
            <div
              className="j-title mb-2"
              style={{ fontSize: '0.65rem', color: u.accentColor, letterSpacing: '0.15em' }}
            >
              {u.abbr} — {u.name}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="j-label mb-1" style={{ fontSize: '0.5rem' }}>TERM START DATE</div>
                <input
                  type="date"
                  value={u.termStart}
                  onChange={e => update(u.id, 'termStart', e.target.value)}
                  style={{
                    background: 'rgba(0,212,255,0.05)',
                    border: '1px solid rgba(0,212,255,0.2)',
                    color: 'var(--j-cyan)',
                    padding: '4px 8px',
                    width: '100%',
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '0.6rem',
                    outline: 'none',
                  }}
                />
              </div>
              <div>
                <div className="j-label mb-1" style={{ fontSize: '0.5rem' }}>TERM LENGTH (WEEKS)</div>
                <input
                  type="number"
                  min={1}
                  max={26}
                  value={u.termWeeks}
                  onChange={e => update(u.id, 'termWeeks', parseInt(e.target.value) || 8)}
                  style={{
                    background: 'rgba(0,212,255,0.05)',
                    border: '1px solid rgba(0,212,255,0.2)',
                    color: 'var(--j-cyan)',
                    padding: '4px 8px',
                    width: '100%',
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '0.6rem',
                    outline: 'none',
                  }}
                />
              </div>
            </div>
            <div className="j-divider mt-3" />
          </div>
        ))}

        <button
          onClick={() => onSave(local)}
          style={{
            background: 'rgba(0,212,255,0.1)',
            border: '1px solid rgba(0,212,255,0.5)',
            color: 'var(--j-cyan)',
            width: '100%',
            padding: '8px',
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            cursor: 'pointer',
          }}
        >
          SAVE CONFIGURATION
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  MAIN DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'jarvis_universities_v2';
const ELON_STORAGE_KEY = 'jarvis_elon_v1';
const ALERT_STORAGE_KEY = 'jarvis_alerts_dismissed_v1';

export default function JarvisDashboard() {
  // ── Time ──────────────────────────────────────────────────────────────────
  const [now, setNow] = useState(new Date());
  const [bootDone, setBootDone] = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);

  // ── Universities ──────────────────────────────────────────────────────────
  const [universities, setUniversities] = useState<UniversityConfig[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch { /* ignore */ }
    return DEFAULT_UNIVERSITIES;
  });

  // ── Alerts ────────────────────────────────────────────────────────────────
  const [activeAlert, setActiveAlert] = useState<AlertInfo | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  // ── Elon ──────────────────────────────────────────────────────────────────
  const [elon, setElon] = useState<ElonState>(() => {
    try {
      const saved = localStorage.getItem(ELON_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Expire after 24 hours
        if (parsed.timestamp && Date.now() - new Date(parsed.savedAt).getTime() < 86_400_000) {
          return parsed.state;
        }
      }
    } catch { /* ignore */ }
    return { status: 'idle', message: '', timestamp: '' };
  });

  // ── News ──────────────────────────────────────────────────────────────────
  const [newsSections, setNewsSections] = useState<NewsSection[]>(
    NEWS_FEEDS.map(f => ({ ...f, items: [], loading: true, error: false }))
  );
  const [lastNewsRefresh, setLastNewsRefresh] = useState<Date | null>(null);
  const newsIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Boot sequence ─────────────────────────────────────────────────────────
  useEffect(() => {
    const lines = [
      'JARVIS v4.2.1 — INITIALIZING...',
      'LOADING NEURAL ARCHITECTURE...',
      'CONNECTING TO STARK NETWORK...',
      'CALIBRATING HUD PARAMETERS...',
      'LOADING UNIVERSITY TRACKERS...',
      'ESTABLISHING NEWS FEEDS...',
      'RUNNING SECURITY SWEEP...',
      'ALL SYSTEMS NOMINAL — WELCOME.',
    ];
    let i = 0;
    const id = setInterval(() => {
      setBootLines(prev => [...prev, lines[i]]);
      i++;
      if (i >= lines.length) {
        clearInterval(id);
        setTimeout(() => setBootDone(true), 600);
      }
    }, 250);
    return () => clearInterval(id);
  }, []);

  // ── Clock ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // ── Alert check ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!bootDone) return;
    const todayKey = now.toDateString();
    let dismissed: string[] = [];
    try {
      dismissed = JSON.parse(localStorage.getItem(ALERT_STORAGE_KEY) || '[]');
    } catch { /* ignore */ }
    if (dismissed.includes(todayKey)) return;

    const announcementUnis: string[] = [];
    const gradingUnis: string[] = [];

    universities.forEach(cfg => {
      const info = getWeekInfo(cfg, now);
      if (info.status !== 'active') return;
      if (info.isFirstDay) announcementUnis.push(cfg.abbr);
      if (info.isLastDay) gradingUnis.push(cfg.abbr);
    });

    // Grading takes priority if both
    if (gradingUnis.length > 0) {
      setActiveAlert({ type: 'grading', universities: gradingUnis });
    } else if (announcementUnis.length > 0) {
      setActiveAlert({ type: 'announcement', universities: announcementUnis });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bootDone]);

  function dismissAlert() {
    const todayKey = now.toDateString();
    try {
      const dismissed: string[] = JSON.parse(localStorage.getItem(ALERT_STORAGE_KEY) || '[]');
      dismissed.push(todayKey);
      localStorage.setItem(ALERT_STORAGE_KEY, JSON.stringify(dismissed.slice(-30)));
    } catch { /* ignore */ }
    setActiveAlert(null);
  }

  // ── News fetch ────────────────────────────────────────────────────────────
  const fetchNews = useCallback(async () => {
    setNewsSections(prev => prev.map(s => ({ ...s, loading: true, error: false })));
    const results = await Promise.allSettled(
      NEWS_FEEDS.map(f => fetchNewsSection(f))
    );
    setNewsSections(prev =>
      prev.map((s, i) => {
        const r = results[i];
        if (r.status === 'fulfilled') {
          return { ...s, items: r.value, loading: false, error: false };
        }
        return { ...s, loading: false, error: true };
      })
    );
    setLastNewsRefresh(new Date());
  }, []);

  useEffect(() => {
    if (!bootDone) return;
    fetchNews();
    newsIntervalRef.current = setInterval(fetchNews, 5 * 60 * 1000);
    return () => {
      if (newsIntervalRef.current) clearInterval(newsIntervalRef.current);
    };
  }, [bootDone, fetchNews]);

  // ── Elon approval ─────────────────────────────────────────────────────────
  function requestElonApproval() {
    setElon({ status: 'requesting', message: ELON_PROCESSING_STEPS[0], timestamp: '' });
    let step = 0;
    const stepId = setInterval(() => {
      step++;
      if (step < ELON_PROCESSING_STEPS.length) {
        setElon(prev => ({ ...prev, message: ELON_PROCESSING_STEPS[step] }));
      }
    }, 700);
    setTimeout(() => {
      clearInterval(stepId);
      const msg = ELON_APPROVED_MESSAGES[Math.floor(Math.random() * ELON_APPROVED_MESSAGES.length)];
      const ts = new Date().toLocaleString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      });
      const newState: ElonState = { status: 'approved', message: msg, timestamp: ts };
      setElon(newState);
      try {
        localStorage.setItem(ELON_STORAGE_KEY, JSON.stringify({ state: newState, savedAt: new Date().toISOString() }));
      } catch { /* ignore */ }
    }, ELON_PROCESSING_STEPS.length * 700 + 400);
  }

  // ── Save universities ─────────────────────────────────────────────────────
  function saveUniversities(configs: UniversityConfig[]) {
    setUniversities(configs);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(configs)); } catch { /* ignore */ }
    setShowSettings(false);
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  Boot Screen
  // ─────────────────────────────────────────────────────────────────────────
  if (!bootDone) {
    return (
      <div
        className="jarvis-root flex items-center justify-center"
        style={{ minHeight: '100vh' }}
      >
        <div className="jarvis-content" style={{ minWidth: 360 }}>
          <div className="flex justify-center mb-6">
            <ArcReactor size={80} />
          </div>
          <div
            className="j-title text-center mb-6"
            style={{
              fontSize: '1.4rem',
              letterSpacing: '0.4em',
              animation: 'header-glow 2s ease-in-out infinite',
            }}
          >
            J.A.R.V.I.S.
          </div>
          <div
            className="j-panel p-4 rounded-sm"
            style={{ minWidth: 340, fontFamily: 'Orbitron, sans-serif', fontSize: '0.6rem' }}
          >
            {bootLines.map((line, i) => (
              <div
                key={i}
                style={{
                  color: i === bootLines.length - 1 ? 'var(--j-cyan)' : 'rgba(0,212,255,0.45)',
                  marginBottom: 4,
                  animation: 'fade-up 0.3s ease both',
                }}
              >
                <span style={{ color: 'var(--j-orange)', marginRight: 8 }}>›</span>
                {line}
              </div>
            ))}
            <div className="j-blink mt-1" style={{ color: 'rgba(0,212,255,0.4)', fontSize: '0.55rem' }} />
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  Main Dashboard
  // ─────────────────────────────────────────────────────────────────────────

  const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  // Gather quick-status for ticker
  const tickerItems = universities.map(cfg => {
    const info = getWeekInfo(cfg, now);
    const wk = info.status === 'active' ? `WK ${info.weekNum}/${info.totalWeeks}` : info.status.toUpperCase();
    return `${cfg.abbr}: ${wk}`;
  }).join('   ·   ');

  return (
    <div className="jarvis-root">
      {/* Alerts */}
      {activeAlert && <AlertOverlay alert={activeAlert} onDismiss={dismissAlert} />}

      {/* Settings */}
      {showSettings && (
        <SettingsModal
          universities={universities}
          onSave={saveUniversities}
          onClose={() => setShowSettings(false)}
        />
      )}

      <div className="jarvis-content">

        {/* ── HEADER ──────────────────────────────────────────────────────── */}
        <header className="jarvis-header px-4 py-3">
          <div className="flex items-center gap-4">
            <ArcReactor size={48} />

            <div className="flex-1">
              <div
                className="j-title j-glow"
                style={{
                  fontSize: '1.1rem',
                  letterSpacing: '0.35em',
                  animation: 'header-glow 3s ease-in-out infinite',
                }}
              >
                J.A.R.V.I.S.
              </div>
              <div className="j-label" style={{ fontSize: '0.5rem', letterSpacing: '0.15em' }}>
                PERSONAL COMMAND CENTER · EDUCATIONAL OPERATIONS MODULE
              </div>
            </div>

            {/* Clock */}
            <div className="text-right hidden sm:block">
              <div
                className="j-title j-glow"
                style={{ fontSize: '1.4rem', letterSpacing: '0.1em', fontVariantNumeric: 'tabular-nums' }}
              >
                {timeStr}
              </div>
              <div style={{ fontSize: '0.6rem', color: 'rgba(0,212,255,0.5)', letterSpacing: '0.05em' }}>
                {dateStr}
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-2">
              <button
                onClick={fetchNews}
                title="Refresh news"
                style={{
                  background: 'rgba(0,212,255,0.08)',
                  border: '1px solid rgba(0,212,255,0.2)',
                  color: 'rgba(0,212,255,0.6)',
                  padding: '4px 10px',
                  cursor: 'pointer',
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '0.55rem',
                  letterSpacing: '0.1em',
                }}
              >
                ↺ NEWS
              </button>
              <button
                onClick={() => setShowSettings(true)}
                style={{
                  background: 'rgba(0,212,255,0.08)',
                  border: '1px solid rgba(0,212,255,0.2)',
                  color: 'rgba(0,212,255,0.6)',
                  padding: '4px 10px',
                  cursor: 'pointer',
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '0.55rem',
                  letterSpacing: '0.1em',
                }}
              >
                ⚙ CONFIG
              </button>
            </div>
          </div>

          {/* Ticker */}
          <div
            className="mt-2 overflow-hidden"
            style={{
              borderTop: '1px solid rgba(0,212,255,0.1)',
              paddingTop: 4,
              fontSize: '0.55rem',
              color: 'rgba(0,212,255,0.4)',
              fontFamily: 'Orbitron, sans-serif',
              letterSpacing: '0.1em',
            }}
          >
            <div className="j-ticker">{tickerItems} &nbsp;&nbsp;&nbsp;— JARVIS ONLINE — &nbsp;&nbsp;&nbsp;{tickerItems}</div>
          </div>
        </header>

        {/* ── MAIN GRID ───────────────────────────────────────────────────── */}
        <div
          className="p-4 gap-4"
          style={{
            display: 'grid',
            gridTemplateColumns: '260px 1fr 220px',
            gridTemplateRows: 'auto',
            minHeight: 'calc(100vh - 100px)',
          }}
        >

          {/* ── LEFT: University trackers ──────────────────────────────────── */}
          <div className="flex flex-col gap-3">
            <div className="j-label" style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}>
              ◈ ACADEMIC TRACKER
            </div>

            {universities.map(cfg => (
              <UniversityCard key={cfg.id} cfg={cfg} today={now} />
            ))}

            {/* Quick legend */}
            <div
              className="j-panel rounded-sm p-2 mt-1"
              style={{ fontSize: '0.55rem', color: 'rgba(0,212,255,0.4)', fontFamily: 'Orbitron, sans-serif' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="week-badge-first px-1 rounded-sm" style={{ fontSize: '0.45rem' }}>⚡ START</div>
                <span>Post announcements</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="week-badge-last px-1 rounded-sm" style={{ fontSize: '0.45rem' }}>🔴 END</div>
                <span>Check grading</span>
              </div>
            </div>
          </div>

          {/* ── CENTER: News ───────────────────────────────────────────────── */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="j-label" style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}>
                ◈ INTEL FEEDS
              </span>
              {lastNewsRefresh && (
                <span style={{ fontSize: '0.5rem', color: 'rgba(0,212,255,0.3)', fontFamily: 'Orbitron, sans-serif' }}>
                  UPDATED {lastNewsRefresh.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </span>
              )}
            </div>

            <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
              {newsSections.map((section, i) => (
                <NewsSection key={i} section={section} />
              ))}
            </div>

            {/* Status bar */}
            <div
              className="j-panel rounded-sm p-3 mt-auto"
              style={{ border: '1px solid rgba(0,212,255,0.1)' }}
            >
              <div className="j-label mb-2" style={{ fontSize: '0.5rem' }}>◈ SYSTEM STATUS</div>
              <div className="grid grid-cols-3 gap-4">
                <StatusRow label="JARVIS CORE" value="ONLINE" dotClass="j-dot-green" />
                <StatusRow label="NEWS FEEDS" value={newsSections.every(s => !s.error) ? 'ACTIVE' : 'DEGRADED'} dotClass={newsSections.every(s => !s.error) ? 'j-dot-green' : 'j-dot-orange'} />
                <StatusRow label="UNIV. TRACKER" value="NOMINAL" dotClass="j-dot-cyan" />
              </div>
            </div>
          </div>

          {/* ── RIGHT: Elon + Mini stats ───────────────────────────────────── */}
          <div className="flex flex-col gap-3">
            <div className="j-label" style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}>
              ◈ AUTHORIZATION
            </div>

            <ElonPanel elon={elon} onRequest={requestElonApproval} />

            {/* Today's briefing */}
            <div className="j-panel j-panel-inner rounded-sm p-3">
              <div className="j-label mb-2" style={{ fontSize: '0.55rem' }}>◈ TODAY'S BRIEFING</div>
              <div className="j-divider mb-2" />
              {universities.map(cfg => {
                const info = getWeekInfo(cfg, now);
                if (info.status !== 'active') return null;
                return (
                  <div key={cfg.id} className="mb-2">
                    <div className="flex justify-between items-center">
                      <span
                        className="j-title"
                        style={{ fontSize: '0.6rem', color: cfg.accentColor }}
                      >
                        {cfg.abbr}
                      </span>
                      <span
                        style={{
                          fontSize: '0.55rem',
                          fontFamily: 'Orbitron, sans-serif',
                          color: info.isFirstDay
                            ? 'var(--j-orange)'
                            : info.isLastDay
                            ? 'var(--j-red)'
                            : 'rgba(0,212,255,0.5)',
                        }}
                      >
                        {info.isFirstDay ? '⚡ POST ANN.' : info.isLastDay ? '🔴 GRADE' : `W${info.weekNum} D${info.daysIntoWeek + 1}`}
                      </span>
                    </div>
                  </div>
                );
              })}
              {universities.every(cfg => getWeekInfo(cfg, now).status !== 'active') && (
                <div style={{ fontSize: '0.65rem', color: 'rgba(0,212,255,0.35)' }}>
                  No active terms
                </div>
              )}
            </div>

            {/* Arc reactor mini */}
            <div className="j-panel j-panel-inner rounded-sm p-3 flex flex-col items-center gap-2">
              <ArcReactor size={40} />
              <div
                className="j-title"
                style={{ fontSize: '0.55rem', letterSpacing: '0.15em', color: 'rgba(0,212,255,0.5)' }}
              >
                ARC REACTOR v3
              </div>
              <div
                style={{ fontSize: '0.55rem', color: 'rgba(0,212,255,0.35)', fontFamily: 'Orbitron, sans-serif' }}
              >
                PWR: 3.00 GJ
              </div>
              <div className="j-progress-track w-full">
                <div className="j-progress-fill" style={{ width: '87%' }} />
              </div>
              <div style={{ fontSize: '0.5rem', color: 'rgba(0,212,255,0.35)', fontFamily: 'Orbitron, sans-serif' }}>
                87% CAPACITY
              </div>
            </div>

          </div>
        </div>

        {/* ── FOOTER ──────────────────────────────────────────────────────── */}
        <footer
          style={{
            borderTop: '1px solid rgba(0,212,255,0.1)',
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.5rem',
            color: 'rgba(0,212,255,0.25)',
            fontFamily: 'Orbitron, sans-serif',
            letterSpacing: '0.1em',
          }}
        >
          <span>J.A.R.V.I.S. · PERSONAL COMMAND CENTER · v4.2.1</span>
          <span>NEWS REFRESHES EVERY 5 MIN · ALERTS AUTO-DISMISS AFTER ACK</span>
          <span>STARK INDUSTRIES © 2026</span>
        </footer>

      </div>
    </div>
  );
}
