import { useEffect, useRef, useState, useCallback } from 'react';
import '../styles/jarvis.css';

// ─────────────────────────────────────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface TermEntry {
  label: string;
  start: string;   // ISO date "YYYY-MM-DD" — must fall on weekStart day
  end: string;     // ISO date "YYYY-MM-DD"
}

interface UniversityConfig {
  id: string;
  name: string;
  abbr: string;
  accentColor: string;
  accentRgb: string;
  weekStart: number;   // 0=Sun 1=Mon 2=Tue 3=Wed 4=Thu 5=Fri 6=Sat
  weekType: string;    // e.g. "Mon–Sun"
  terms: TermEntry[];
}

interface WeekInfo {
  status: 'upcoming' | 'active' | 'complete';
  weekNum: number;
  totalWeeks: number;
  daysIntoWeek: number;   // 0 = first day, 6 = last day
  progress: number;        // 0–100 across term
  isFirstDay: boolean;
  isLastDay: boolean;
  termLabel: string;
  termEndDate: Date;
  nextTermDate: Date | null;  // when status=upcoming, the start of next term
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
//  UNIVERSITY DEFAULTS
// ─────────────────────────────────────────────────────────────────────────────

const DEFAULT_UNIVERSITIES: UniversityConfig[] = [
  {
    id: 'gcu',
    name: 'Grand Canyon University',
    abbr: 'GCU',
    accentColor: '#9b30ff',
    accentRgb: '155,48,255',
    weekStart: 1,
    weekType: 'Mon–Sun',
    terms: [
      { label: 'Spring B 2026', start: '2026-03-09', end: '2026-05-03' },
    ],
  },
  {
    id: 'snhu',
    name: 'Southern New Hampshire Univ.',
    abbr: 'SNHU',
    accentColor: '#0080ff',
    accentRgb: '0,128,255',
    weekStart: 1,
    weekType: 'Mon–Sun',
    terms: [
      { label: 'May–Jun 2026',  start: '2026-05-04', end: '2026-06-28' },
      { label: 'Jun–Aug 2026',  start: '2026-06-29', end: '2026-08-23' },
      { label: 'Aug–Oct 2026',  start: '2026-08-31', end: '2026-10-25' },
      { label: 'Oct–Dec 2026',  start: '2026-10-26', end: '2026-12-20' },
      { label: 'Jan–Feb 2027',  start: '2027-01-04', end: '2027-02-28' },
      { label: 'Mar–Apr 2027',  start: '2027-03-01', end: '2027-04-25' },
    ],
  },
  {
    id: 'umgc',
    name: 'Univ. of Maryland Global Campus',
    abbr: 'UMGC',
    accentColor: '#ffd700',
    accentRgb: '255,215,0',
    weekStart: 3,
    weekType: 'Wed–Tue',
    terms: [
      // Spring 2026 — Undergraduate Online 8-Wk Sessions
      { label: 'Spring 2026 Session 1', start: '2026-01-07', end: '2026-03-03' },
      { label: 'Spring 2026 Session 2', start: '2026-02-11', end: '2026-04-07' },
      { label: 'Spring 2026 Session 3', start: '2026-03-11', end: '2026-05-05' },
      // Summer 2026 — Undergraduate Online 8-Wk Sessions
      { label: 'Summer 2026 Session 1', start: '2026-05-13', end: '2026-07-07' },
      { label: 'Summer 2026 Session 2', start: '2026-06-10', end: '2026-08-04' },
    ],
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
  const msDay = 86_400_000;

  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  // 1. Find active term — when sessions overlap (e.g. UMGC), pick the
  //    most recently *started* one (the current enrollment).
  const activeTerm = cfg.terms
    .filter(t => {
      const s = new Date(t.start + 'T00:00:00');
      const e = new Date(t.end   + 'T00:00:00');
      return todayMidnight >= s && todayMidnight <= e;
    })
    .sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime())[0];

  // 2. Find next upcoming term (closest start date after today)
  const upcoming = cfg.terms
    .filter(t => new Date(t.start + 'T00:00:00') > todayMidnight)
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())[0];

  // 3. If no active and no upcoming, use last term as complete
  const lastTerm = cfg.terms[cfg.terms.length - 1];

  if (!activeTerm && !upcoming) {
    // All terms are in the past
    const e = new Date(lastTerm.end + 'T00:00:00');
    const s = new Date(lastTerm.start + 'T00:00:00');
    const totalDays = Math.floor((e.getTime() - s.getTime()) / msDay) + 1;
    const totalWeeks = Math.ceil(totalDays / 7);
    return {
      status: 'complete',
      weekNum: totalWeeks,
      totalWeeks,
      daysIntoWeek: 6,
      progress: 100,
      isFirstDay: false,
      isLastDay: false,
      termLabel: lastTerm.label,
      termEndDate: e,
      nextTermDate: null,
    };
  }

  if (!activeTerm && upcoming) {
    const nextStart = new Date(upcoming.start + 'T00:00:00');
    const e = new Date(upcoming.end + 'T00:00:00');
    const s = new Date(upcoming.start + 'T00:00:00');
    const totalDays = Math.floor((e.getTime() - s.getTime()) / msDay) + 1;
    const totalWeeks = Math.ceil(totalDays / 7);
    return {
      status: 'upcoming',
      weekNum: 0,
      totalWeeks,
      daysIntoWeek: 0,
      progress: 0,
      isFirstDay: false,
      isLastDay: false,
      termLabel: upcoming.label,
      termEndDate: e,
      nextTermDate: nextStart,
    };
  }

  // Active term
  const term = activeTerm!;
  const termStart = new Date(term.start + 'T00:00:00');
  const termEnd   = new Date(term.end   + 'T00:00:00');

  const daysSinceStart = Math.floor((todayMidnight.getTime() - termStart.getTime()) / msDay);
  const totalDays = Math.floor((termEnd.getTime() - termStart.getTime()) / msDay) + 1;
  const totalWeeks = Math.ceil(totalDays / 7);
  const weekNum = Math.floor(daysSinceStart / 7) + 1;
  const daysIntoWeek = daysSinceStart % 7;

  return {
    status: 'active',
    weekNum: Math.min(weekNum, totalWeeks),
    totalWeeks,
    daysIntoWeek,
    progress: (daysSinceStart / (totalDays - 1)) * 100,
    isFirstDay: daysIntoWeek === 0,
    isLastDay: daysIntoWeek === 6,
    termLabel: term.label,
    termEndDate: termEnd,
    nextTermDate: upcoming ? new Date(upcoming.start + 'T00:00:00') : null,
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
//  HOOK: NEWS FEED (RSS via /api/rss serverless route)
// ─────────────────────────────────────────────────────────────────────────────

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
  const url = `/api/rss?rss_url=${encodeURIComponent(feed.rssUrl)}&count=5`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Network error');
  const data = await res.json();
  if (data.status !== 'ok') throw new Error(data.error || 'Feed error');
  return (data.items || []).slice(0, 5).map((item: NewsItem) => ({
    title: item.title || 'No title',
    link: item.link || '#',
    pubDate: item.pubDate || '',
    description: item.description || '',
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
        <span className={`j-dot ${dotClass}`} style={{ width: 6, height: 6, marginLeft: -10 }} />
        <span style={{ fontSize: '0.7rem', fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.05em' }}>
          {value}
        </span>
      </div>
    </div>
  );
}

/** Spatial tilt hook — moves panel in 3D toward the pointer/gaze */
function useTilt(maxDeg = 6, tz = 14) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width  - 0.5;   // -0.5 .. +0.5
    const y = (e.clientY - top)  / height - 0.5;
    el.style.setProperty('--rx', `${(-y * maxDeg).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${ (x * maxDeg).toFixed(2)}deg`);
    el.style.setProperty('--tz', `${tz}px`);
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--tz', '8px');
  }

  return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}

/** University week tracker card */
function UniversityCard({ cfg, today }: { cfg: UniversityConfig; today: Date }) {
  const info = getWeekInfo(cfg, today);
  const tilt = useTilt(5, 12);

  const badgeClass =
    info.isFirstDay ? 'week-badge-first' :
    info.isLastDay  ? 'week-badge-last'  :
    'week-badge-active';

  const statusLabel =
    info.status === 'upcoming' ? 'UPCOMING' :
    info.status === 'complete' ? 'COMPLETE' :
    info.isFirstDay ? '⚡ WEEK START' :
    info.isLastDay  ? '🔴 WEEK END'   :
    `DAY ${info.daysIntoWeek + 1} / 7`;

  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className="j-panel j-panel-inner j-scan-sweep j-vros j-tilt j-specular j-ambient-glow p-3 rounded-sm"
      style={{
        '--glow-color': `rgba(${cfg.accentRgb}, 0.2)`,
        '--float-z': '8px',
        borderColor: `rgba(${cfg.accentRgb}, 0.35)`,
        animation: 'slide-in-left 0.6s ease both',
      } as React.CSSProperties}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="j-title" style={{ fontSize: '0.65rem', color: cfg.accentColor, letterSpacing: '0.18em' }}>
            {cfg.abbr}
          </div>
          <div style={{ fontSize: '0.55rem', color: 'rgba(0,212,255,0.45)', letterSpacing: '0.03em' }}>
            {cfg.name}
          </div>
        </div>
        <div
          className={`px-2 py-0.5 rounded-sm text-center j-title ${badgeClass}`}
          style={{ fontSize: '0.5rem', minWidth: 80 }}
        >
          {statusLabel}
        </div>
      </div>

      {/* Term label */}
      <div
        className="mb-2 px-2 py-0.5 rounded-sm inline-block"
        style={{
          background: `rgba(${cfg.accentRgb}, 0.08)`,
          border: `1px solid rgba(${cfg.accentRgb}, 0.2)`,
          fontSize: '0.55rem',
          fontFamily: 'Orbitron, sans-serif',
          color: cfg.accentColor,
          letterSpacing: '0.08em',
        }}
      >
        {info.termLabel}
      </div>

      {/* Week number hero — active */}
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
            <div style={{ fontSize: '0.6rem', color: 'rgba(0,212,255,0.7)', fontFamily: 'Orbitron, sans-serif' }}>
              {fmtDate(info.termEndDate)}
            </div>
          </div>
        </div>
      )}

      {/* Upcoming */}
      {info.status === 'upcoming' && (
        <div className="mb-2">
          <div style={{ fontSize: '0.65rem', color: 'rgba(0,212,255,0.5)' }}>
            Starts {info.nextTermDate ? fmtDate(info.nextTermDate) : '—'}
          </div>
          <div style={{ fontSize: '0.55rem', color: 'rgba(0,212,255,0.3)', marginTop: 2 }}>
            {info.totalWeeks} weeks · {cfg.weekType}
          </div>
        </div>
      )}

      {/* Complete */}
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

      {/* Week cycle pips */}
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
function NewsSectionCard({ section, delay = 0 }: { section: NewsSection; delay?: number }) {
  const tilt = useTilt(4, 10);
  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className="j-panel j-panel-inner j-vros j-tilt j-specular j-float j-ambient-glow rounded-sm p-3"
      style={{
        '--glow-color': `rgba(${section.colorRgb}, 0.15)`,
        '--float-z': '10px',
        borderColor: `rgba(${section.colorRgb},0.3)`,
        animationDelay: `${-delay}s`,
      } as React.CSSProperties}
    >
      <div className="flex items-center gap-2 mb-2">
        <span style={{ fontSize: '1rem' }}>{section.icon}</span>
        <span className="j-title" style={{ fontSize: '0.7rem', color: section.color, letterSpacing: '0.15em' }}>
          {section.label}
        </span>
        {section.loading && <div className="j-spinner ml-auto" style={{ width: 14, height: 14 }} />}
        {!section.loading && !section.error && (
          <span className="ml-auto j-label" style={{ fontSize: '0.5rem', color: 'rgba(0,212,255,0.35)' }}>LIVE</span>
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
            <div style={{ fontSize: '0.7rem', color: 'rgba(220,240,255,0.9)', lineHeight: 1.3, marginBottom: 2 }}>
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
function AlertOverlay({ alert, onDismiss }: { alert: AlertInfo; onDismiss: () => void }) {
  const isAnnouncement = alert.type === 'announcement';
  return (
    <div className="j-alert-overlay" onClick={onDismiss}>
      <div className="j-alert-box" onClick={e => e.stopPropagation()}>
        <div className="j-alert-border" />
        <div
          className="j-panel p-6 rounded-sm"
          style={{ border: `1px solid ${isAnnouncement ? 'rgba(255,107,0,0.6)' : 'rgba(255,32,32,0.6)'}` }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="j-dot j-dot-red" style={{ width: 12, height: 12 }} />
            <span
              className="j-title"
              style={{ fontSize: '0.6rem', color: isAnnouncement ? 'var(--j-orange)' : 'var(--j-red)', letterSpacing: '0.3em' }}
            >
              ⚡ PRIORITY ALERT — JARVIS SYSTEM
            </span>
            <div className="j-dot j-dot-red ml-auto" style={{ width: 12, height: 12 }} />
          </div>

          <div className="j-divider mb-4" />

          <div className="text-center mb-4">
            <div style={{ fontSize: '3rem', filter: `drop-shadow(0 0 12px ${isAnnouncement ? 'var(--j-orange)' : 'var(--j-red)'})` }}>
              {isAnnouncement ? '📣' : '📋'}
            </div>
          </div>

          <div className="text-center mb-2">
            <div
              className="j-title"
              style={{
                fontSize: '1.1rem',
                color: isAnnouncement ? 'var(--j-orange)' : 'var(--j-red)',
                letterSpacing: '0.1em',
                textShadow: isAnnouncement ? '0 0 15px rgba(255,107,0,0.6)' : '0 0 15px rgba(255,32,32,0.6)',
              }}
            >
              {isAnnouncement ? 'POST YOUR ANNOUNCEMENTS' : 'CHECK & UPDATE GRADING'}
            </div>
          </div>

          <div className="text-center mb-4" style={{ fontSize: '0.75rem', color: 'rgba(0,212,255,0.6)' }}>
            {isAnnouncement
              ? 'Today is the FIRST day of the week for the following institutions.'
              : 'Today is the LAST day of the week. Review and submit grades before midnight.'}
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-5">
            {alert.universities.map(u => (
              <span
                key={u}
                className="j-title px-3 py-1 rounded-sm"
                style={{
                  fontSize: '0.7rem',
                  background: isAnnouncement ? 'rgba(255,107,0,0.15)' : 'rgba(255,32,32,0.15)',
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
function ElonPanel({ elon, onRequest }: { elon: ElonState; onRequest: () => void }) {
  const approved  = elon.status === 'approved';
  const requesting = elon.status === 'requesting';
  const tilt = useTilt(6, 18);
  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className="j-panel j-panel-inner j-scan-sweep j-vros j-tilt j-specular j-float-slow j-ambient-glow rounded-sm p-3"
      style={{
        '--glow-color': approved ? 'rgba(0,255,136,0.2)' : 'rgba(255,107,0,0.15)',
        '--float-z': '16px',
        borderColor: approved ? 'rgba(0,255,136,0.4)' : requesting ? 'rgba(255,215,0,0.4)' : 'rgba(255,107,0,0.3)',
      } as React.CSSProperties}
    >
      <div className="flex items-center gap-2 mb-3">
        <div
          className="j-dot"
          style={{
            width: 8, height: 8,
            background: approved ? 'var(--j-green)' : requesting ? 'var(--j-gold)' : 'var(--j-orange)',
            boxShadow: `0 0 6px ${approved ? 'var(--j-green)' : requesting ? 'var(--j-gold)' : 'var(--j-orange)'}`,
            animation: 'pulse-dot 1s infinite',
          }}
        />
        <span className="j-title" style={{ fontSize: '0.65rem', letterSpacing: '0.18em', color: 'var(--j-orange)' }}>
          EXECUTIVE AUTHORIZATION
        </span>
      </div>
      <div className="j-divider mb-3" />

      <div className="flex justify-center mb-3">
        <div
          style={{
            width: 60, height: 60, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,107,0,0.2) 0%, rgba(0,8,20,0.8) 70%)',
            border: `2px solid ${approved ? 'var(--j-green)' : 'rgba(255,107,0,0.5)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.6rem',
            boxShadow: `0 0 15px ${approved ? 'rgba(0,255,136,0.3)' : 'rgba(255,107,0,0.3)'}`,
          }}
        >
          𝕏
        </div>
      </div>

      <div className="j-title text-center mb-1" style={{ fontSize: '0.75rem', color: 'rgba(220,240,255,0.9)', letterSpacing: '0.1em' }}>
        E. MUSK
      </div>
      <div className="text-center mb-3" style={{ fontSize: '0.6rem', color: 'rgba(0,212,255,0.4)', letterSpacing: '0.05em' }}>
        CEO, SPACEX · CTO, X CORP
      </div>

      <div
        className="text-center py-2 mb-3 rounded-sm"
        style={{
          background: approved ? 'rgba(0,255,136,0.08)' : requesting ? 'rgba(255,215,0,0.08)' : 'rgba(255,107,0,0.08)',
          border: `1px solid ${approved ? 'rgba(0,255,136,0.2)' : requesting ? 'rgba(255,215,0,0.2)' : 'rgba(255,107,0,0.15)'}`,
        }}
      >
        <div
          className="j-title"
          style={{ fontSize: '0.6rem', color: approved ? 'var(--j-green)' : requesting ? 'var(--j-gold)' : 'var(--j-orange)', letterSpacing: '0.15em' }}
        >
          {approved ? '✓ AUTHORIZATION GRANTED' : requesting ? '⟳ PROCESSING...' : '⚠ AUTHORIZATION REQUIRED'}
        </div>
        {elon.message && (
          <div className="mt-1" style={{ fontSize: '0.65rem', color: approved ? 'rgba(0,255,136,0.7)' : 'rgba(255,215,0,0.7)', fontStyle: 'italic' }}>
            {elon.message}
          </div>
        )}
        {elon.timestamp && approved && (
          <div style={{ fontSize: '0.5rem', color: 'rgba(0,212,255,0.3)', marginTop: 4 }}>
            {elon.timestamp}
          </div>
        )}
      </div>

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
        <button className="elon-btn elon-approved w-full py-2 rounded-sm" style={{ fontSize: '0.6rem' }} onClick={onRequest}>
          ✓ RE-AUTHORIZE DASHBOARD
        </button>
      )}
    </div>
  );
}

// ── Helper: calculate end date from start + week count ──────────────────────
function calcEndDate(start: string, weeks: number): string {
  if (!start) return '';
  const d = new Date(start + 'T00:00:00');
  d.setDate(d.getDate() + weeks * 7 - 1);
  return d.toISOString().split('T')[0];
}

function autoLabel(start: string, abbr: string): string {
  if (!start) return 'New Course';
  const d = new Date(start + 'T00:00:00');
  const month = d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  return `${abbr} ${month}`;
}

// ── Quick-Add row: pick start date + weeks → end auto-fills ─────────────────
function QuickAddRow({
  u,
  onAdd,
}: {
  u: UniversityConfig;
  onAdd: (term: TermEntry) => void;
}) {
  const [start, setStart]   = useState('');
  const [weeks, setWeeks]   = useState(8);

  const end   = calcEndDate(start, weeks);
  const label = autoLabel(start, u.abbr);

  const canAdd = start !== '' && end !== '';

  const rowStyle: React.CSSProperties = {
    background: `rgba(${u.accentRgb}, 0.06)`,
    border: `1px solid rgba(${u.accentRgb}, 0.25)`,
    borderRadius: 2,
    padding: '8px 10px',
    marginBottom: 8,
  };

  const inputStyle: React.CSSProperties = {
    background: 'rgba(0,212,255,0.06)',
    border: '1px solid rgba(0,212,255,0.2)',
    color: 'var(--j-cyan)',
    padding: '4px 6px',
    fontFamily: 'Orbitron, sans-serif',
    fontSize: '0.55rem',
    outline: 'none',
    width: '100%',
  };

  return (
    <div style={rowStyle}>
      <div className="j-label mb-2" style={{ fontSize: '0.5rem', color: u.accentColor }}>
        ⚡ QUICK ADD — pick start date, weeks auto-fill end
      </div>
      <div className="flex gap-2 items-end">
        {/* Start date */}
        <div style={{ flex: 2 }}>
          <div className="j-label mb-1" style={{ fontSize: '0.45rem' }}>
            START DATE ({u.weekType.split('–')[0]})
          </div>
          <input
            type="date"
            style={inputStyle}
            value={start}
            onChange={e => setStart(e.target.value)}
          />
        </div>

        {/* Weeks */}
        <div style={{ flex: 1 }}>
          <div className="j-label mb-1" style={{ fontSize: '0.45rem' }}>WEEKS</div>
          <select
            style={{ ...inputStyle, cursor: 'pointer' }}
            value={weeks}
            onChange={e => setWeeks(Number(e.target.value))}
          >
            {[4, 6, 8, 10, 12, 16].map(w => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
        </div>

        {/* Calculated end date (read-only display) */}
        <div style={{ flex: 2 }}>
          <div className="j-label mb-1" style={{ fontSize: '0.45rem' }}>END DATE (AUTO)</div>
          <div
            style={{
              ...inputStyle,
              color: end ? 'var(--j-green)' : 'rgba(0,212,255,0.25)',
              pointerEvents: 'none',
            }}
          >
            {end || '—'}
          </div>
        </div>

        {/* Add button */}
        <div>
          <button
            disabled={!canAdd}
            onClick={() => {
              onAdd({ label, start, end });
              setStart('');
              setWeeks(8);
            }}
            style={{
              background: canAdd ? `rgba(${u.accentRgb},0.15)` : 'rgba(0,212,255,0.03)',
              border: `1px solid ${canAdd ? `rgba(${u.accentRgb},0.5)` : 'rgba(0,212,255,0.1)'}`,
              color: canAdd ? u.accentColor : 'rgba(0,212,255,0.2)',
              padding: '4px 10px',
              cursor: canAdd ? 'pointer' : 'default',
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '0.5rem',
              letterSpacing: '0.1em',
              whiteSpace: 'nowrap',
            }}
          >
            + ADD
          </button>
        </div>
      </div>

      {/* Preview label */}
      {canAdd && (
        <div style={{ marginTop: 4, fontSize: '0.5rem', color: `rgba(${u.accentRgb},0.6)`, fontFamily: 'Orbitron, sans-serif' }}>
          Will add: "{label}" · {start} → {end} ({weeks} wks)
        </div>
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
  const [local, setLocal] = useState<UniversityConfig[]>(universities.map(u => ({
    ...u,
    terms: u.terms.map(t => ({ ...t })),
  })));

  function quickAdd(uId: string, term: TermEntry) {
    setLocal(prev => prev.map(u =>
      u.id === uId ? { ...u, terms: [...u.terms, term] } : u
    ));
  }

  function updateTerm(uId: string, tIdx: number, key: keyof TermEntry, value: string) {
    setLocal(prev => prev.map(u => {
      if (u.id !== uId) return u;
      const terms = u.terms.map((t, i) => i === tIdx ? { ...t, [key]: value } : t);
      return { ...u, terms };
    }));
  }

  function autoFillEnd(uId: string, tIdx: number, start: string, weeks = 8) {
    const end = calcEndDate(start, weeks);
    if (end) updateTerm(uId, tIdx, 'end', end);
  }

  function removeTerm(uId: string, tIdx: number) {
    setLocal(prev => prev.map(u =>
      u.id === uId ? { ...u, terms: u.terms.filter((_, i) => i !== tIdx) } : u
    ));
  }

  const inputStyle: React.CSSProperties = {
    background: 'rgba(0,212,255,0.05)',
    border: '1px solid rgba(0,212,255,0.2)',
    color: 'var(--j-cyan)',
    padding: '3px 6px',
    fontFamily: 'Orbitron, sans-serif',
    fontSize: '0.55rem',
    outline: 'none',
    width: '100%',
  };

  return (
    <div className="j-settings-overlay">
      <div
        className="j-panel j-vros rounded-sm p-5 j-scroll"
        style={{ width: '90%', maxWidth: 660, maxHeight: '88vh', overflowY: 'auto' }}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="j-title" style={{ fontSize: '0.8rem', letterSpacing: '0.2em' }}>
            ⚙ SYSTEM CONFIGURATION
          </span>
          <button
            onClick={onClose}
            className="j-vros-btn"
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
          <div key={u.id} className="mb-6">
            {/* University header */}
            <div
              className="j-title mb-3"
              style={{ fontSize: '0.65rem', color: u.accentColor, letterSpacing: '0.15em' }}
            >
              {u.abbr} — {u.name}
              <span style={{ color: 'rgba(0,212,255,0.3)', marginLeft: 8, fontSize: '0.5rem' }}>
                {u.weekType}
              </span>
            </div>

            {/* ── Quick Add row ── */}
            <QuickAddRow u={u} onAdd={term => quickAdd(u.id, term)} />

            {/* ── Existing terms list ── */}
            {u.terms.length > 0 && (
              <div className="j-label mb-2" style={{ fontSize: '0.45rem' }}>LOADED TERMS</div>
            )}
            {u.terms.map((t, idx) => (
              <div
                key={idx}
                className="mb-1 px-2 py-1 rounded-sm"
                style={{ background: 'rgba(0,212,255,0.03)', border: '1px solid rgba(0,212,255,0.08)' }}
              >
                <div className="grid gap-2 items-center" style={{ gridTemplateColumns: '1.4fr 1fr 1fr auto auto' }}>
                  {/* Label */}
                  <input
                    style={inputStyle}
                    value={t.label}
                    onChange={e => updateTerm(u.id, idx, 'label', e.target.value)}
                    placeholder="Label"
                  />
                  {/* Start */}
                  <input
                    type="date"
                    style={inputStyle}
                    value={t.start}
                    onChange={e => updateTerm(u.id, idx, 'start', e.target.value)}
                  />
                  {/* End */}
                  <input
                    type="date"
                    style={inputStyle}
                    value={t.end}
                    onChange={e => updateTerm(u.id, idx, 'end', e.target.value)}
                  />
                  {/* Auto-fill end (8 wks from start) */}
                  <button
                    title="Auto-fill end date (8 weeks from start)"
                    onClick={() => autoFillEnd(u.id, idx, t.start, 8)}
                    style={{
                      background: 'rgba(0,212,255,0.06)',
                      border: '1px solid rgba(0,212,255,0.2)',
                      color: 'rgba(0,212,255,0.6)',
                      padding: '3px 5px',
                      cursor: 'pointer',
                      fontSize: '0.6rem',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    8w↻
                  </button>
                  {/* Remove */}
                  <button
                    onClick={() => removeTerm(u.id, idx)}
                    style={{
                      background: 'rgba(255,32,32,0.08)',
                      border: '1px solid rgba(255,32,32,0.25)',
                      color: 'var(--j-red)',
                      padding: '3px 6px',
                      cursor: 'pointer',
                      fontSize: '0.6rem',
                    }}
                  >✕</button>
                </div>
              </div>
            ))}

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

const STORAGE_KEY       = 'jarvis_universities_v3';
const ELON_STORAGE_KEY  = 'jarvis_elon_v1';
const ALERT_STORAGE_KEY = 'jarvis_alerts_dismissed_v1';

export default function JarvisDashboard() {
  const [now, setNow]           = useState(new Date());
  const [bootDone, setBootDone] = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);

  const [universities, setUniversities] = useState<UniversityConfig[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch { /* ignore */ }
    return DEFAULT_UNIVERSITIES;
  });

  const [activeAlert, setActiveAlert] = useState<AlertInfo | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  const [elon, setElon] = useState<ElonState>(() => {
    try {
      const saved = localStorage.getItem(ELON_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.timestamp && Date.now() - new Date(parsed.savedAt).getTime() < 86_400_000) {
          return parsed.state;
        }
      }
    } catch { /* ignore */ }
    return { status: 'idle', message: '', timestamp: '' };
  });

  const [newsSections, setNewsSections] = useState<NewsSection[]>(
    NEWS_FEEDS.map(f => ({ ...f, items: [], loading: true, error: false }))
  );
  const [lastNewsRefresh, setLastNewsRefresh] = useState<Date | null>(null);
  const newsIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Boot sequence
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
      if (i >= lines.length) { clearInterval(id); setTimeout(() => setBootDone(true), 600); }
    }, 250);
    return () => clearInterval(id);
  }, []);

  // Clock
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Alert check
  useEffect(() => {
    if (!bootDone) return;
    const todayKey = now.toDateString();
    let dismissed: string[] = [];
    try { dismissed = JSON.parse(localStorage.getItem(ALERT_STORAGE_KEY) || '[]'); } catch { /* ignore */ }
    if (dismissed.includes(todayKey)) return;

    const announcementUnis: string[] = [];
    const gradingUnis: string[] = [];
    universities.forEach(cfg => {
      const info = getWeekInfo(cfg, now);
      if (info.status !== 'active') return;
      if (info.isFirstDay) announcementUnis.push(cfg.abbr);
      if (info.isLastDay)  gradingUnis.push(cfg.abbr);
    });

    if (gradingUnis.length > 0)       setActiveAlert({ type: 'grading',      universities: gradingUnis });
    else if (announcementUnis.length > 0) setActiveAlert({ type: 'announcement', universities: announcementUnis });
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

  // News fetch
  const fetchNews = useCallback(async () => {
    setNewsSections(prev => prev.map(s => ({ ...s, loading: true, error: false })));
    const results = await Promise.allSettled(NEWS_FEEDS.map(f => fetchNewsSection(f)));
    setNewsSections(prev =>
      prev.map((s, i) => {
        const r = results[i];
        return r.status === 'fulfilled'
          ? { ...s, items: r.value, loading: false, error: false }
          : { ...s, loading: false, error: true };
      })
    );
    setLastNewsRefresh(new Date());
  }, []);

  useEffect(() => {
    if (!bootDone) return;
    fetchNews();
    newsIntervalRef.current = setInterval(fetchNews, 5 * 60 * 1000);
    return () => { if (newsIntervalRef.current) clearInterval(newsIntervalRef.current); };
  }, [bootDone, fetchNews]);

  // Elon approval
  function requestElonApproval() {
    setElon({ status: 'requesting', message: ELON_PROCESSING_STEPS[0], timestamp: '' });
    let step = 0;
    const stepId = setInterval(() => {
      step++;
      if (step < ELON_PROCESSING_STEPS.length) setElon(prev => ({ ...prev, message: ELON_PROCESSING_STEPS[step] }));
    }, 700);
    setTimeout(() => {
      clearInterval(stepId);
      const msg = ELON_APPROVED_MESSAGES[Math.floor(Math.random() * ELON_APPROVED_MESSAGES.length)];
      const ts  = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      const newState: ElonState = { status: 'approved', message: msg, timestamp: ts };
      setElon(newState);
      try { localStorage.setItem(ELON_STORAGE_KEY, JSON.stringify({ state: newState, savedAt: new Date().toISOString() })); } catch { /* ignore */ }
    }, ELON_PROCESSING_STEPS.length * 700 + 400);
  }

  function saveUniversities(configs: UniversityConfig[]) {
    setUniversities(configs);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(configs)); } catch { /* ignore */ }
    setShowSettings(false);
  }

  // ── Boot screen ──────────────────────────────────────────────────────────
  if (!bootDone) {
    return (
      <div className="jarvis-root flex items-center justify-center" style={{ minHeight: '100vh' }}>
        <div className="jarvis-content" style={{ minWidth: 360 }}>
          <div className="flex justify-center mb-6"><ArcReactor size={80} /></div>
          <div className="j-title text-center mb-6" style={{ fontSize: '1.4rem', letterSpacing: '0.4em', animation: 'header-glow 2s ease-in-out infinite' }}>
            J.A.R.V.I.S.
          </div>
          <div className="j-panel p-4 rounded-sm" style={{ minWidth: 340, fontFamily: 'Orbitron, sans-serif', fontSize: '0.6rem' }}>
            {bootLines.map((line, i) => (
              <div key={i} style={{ color: i === bootLines.length - 1 ? 'var(--j-cyan)' : 'rgba(0,212,255,0.45)', marginBottom: 4, animation: 'fade-up 0.3s ease both' }}>
                <span style={{ color: 'var(--j-orange)', marginRight: 8 }}>›</span>{line}
              </div>
            ))}
            <div className="j-blink mt-1" style={{ color: 'rgba(0,212,255,0.4)', fontSize: '0.55rem' }} />
          </div>
        </div>
      </div>
    );
  }

  // ── Main dashboard ───────────────────────────────────────────────────────

  const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const tickerItems = universities.map(cfg => {
    const info = getWeekInfo(cfg, now);
    const wk = info.status === 'active' ? `WK ${info.weekNum}/${info.totalWeeks}` : info.status.toUpperCase();
    return `${cfg.abbr}: ${wk}`;
  }).join('   ·   ');

  return (
    <div className="jarvis-root">
      {activeAlert && <AlertOverlay alert={activeAlert} onDismiss={dismissAlert} />}
      {showSettings && <SettingsModal universities={universities} onSave={saveUniversities} onClose={() => setShowSettings(false)} />}

      <div className="jarvis-content jarvis-scene">

        {/* HEADER */}
        <header className="jarvis-header jarvis-header-3d px-4 py-3">
          <div className="flex items-center gap-4">
            <ArcReactor size={48} />
            <div className="flex-1">
              <div className="j-title j-glow" style={{ fontSize: '1.1rem', letterSpacing: '0.35em', animation: 'header-glow 3s ease-in-out infinite' }}>
                J.A.R.V.I.S.
              </div>
              <div className="j-label" style={{ fontSize: '0.5rem', letterSpacing: '0.15em' }}>
                PERSONAL COMMAND CENTER · EDUCATIONAL OPERATIONS MODULE
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <div className="j-title j-glow" style={{ fontSize: '1.4rem', letterSpacing: '0.1em', fontVariantNumeric: 'tabular-nums' }}>
                {timeStr}
              </div>
              <div style={{ fontSize: '0.6rem', color: 'rgba(0,212,255,0.5)', letterSpacing: '0.05em' }}>{dateStr}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={fetchNews} style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', color: 'rgba(0,212,255,0.6)', padding: '4px 10px', cursor: 'pointer', fontFamily: 'Orbitron, sans-serif', fontSize: '0.55rem', letterSpacing: '0.1em' }}>
                ↺ NEWS
              </button>
              <button onClick={() => setShowSettings(true)} style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', color: 'rgba(0,212,255,0.6)', padding: '4px 10px', cursor: 'pointer', fontFamily: 'Orbitron, sans-serif', fontSize: '0.55rem', letterSpacing: '0.1em' }}>
                ⚙ CONFIG
              </button>
            </div>
          </div>
          <div className="mt-2 overflow-hidden" style={{ borderTop: '1px solid rgba(0,212,255,0.1)', paddingTop: 4, fontSize: '0.55rem', color: 'rgba(0,212,255,0.4)', fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.1em' }}>
            <div className="j-ticker">{tickerItems} &nbsp;&nbsp;&nbsp;— JARVIS ONLINE — &nbsp;&nbsp;&nbsp;{tickerItems}</div>
          </div>
        </header>

        {/* MAIN GRID */}
        <div className="p-4 gap-4" style={{ display: 'grid', gridTemplateColumns: '260px 1fr 220px', minHeight: 'calc(100vh - 100px)' }}>

          {/* LEFT: University trackers */}
          <div className="flex flex-col gap-3">
            <div className="j-label" style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}>◈ ACADEMIC TRACKER</div>
            {universities.map(cfg => <UniversityCard key={cfg.id} cfg={cfg} today={now} />)}
            <div className="j-panel rounded-sm p-2 mt-1" style={{ fontSize: '0.55rem', color: 'rgba(0,212,255,0.4)', fontFamily: 'Orbitron, sans-serif' }}>
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

          {/* CENTER: News */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="j-label" style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}>◈ INTEL FEEDS</span>
              {lastNewsRefresh && (
                <span style={{ fontSize: '0.5rem', color: 'rgba(0,212,255,0.3)', fontFamily: 'Orbitron, sans-serif' }}>
                  UPDATED {lastNewsRefresh.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </span>
              )}
            </div>
            <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
              {newsSections.map((section, i) => <NewsSectionCard key={i} section={section} delay={i * 2} />)}
            </div>
            <div className="j-panel rounded-sm p-3 mt-auto" style={{ border: '1px solid rgba(0,212,255,0.1)' }}>
              <div className="j-label mb-2" style={{ fontSize: '0.5rem' }}>◈ SYSTEM STATUS</div>
              <div className="grid grid-cols-3 gap-4">
                <StatusRow label="JARVIS CORE" value="ONLINE" dotClass="j-dot-green" />
                <StatusRow label="NEWS FEEDS" value={newsSections.every(s => !s.error) ? 'ACTIVE' : 'DEGRADED'} dotClass={newsSections.every(s => !s.error) ? 'j-dot-green' : 'j-dot-orange'} />
                <StatusRow label="UNIV. TRACKER" value="NOMINAL" dotClass="j-dot-cyan" />
              </div>
            </div>
          </div>

          {/* RIGHT: Elon + briefing */}
          <div className="flex flex-col gap-3">
            <div className="j-label" style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}>◈ AUTHORIZATION</div>
            <ElonPanel elon={elon} onRequest={requestElonApproval} />

            <div className="j-panel j-panel-inner j-vros j-depth-2 j-specular rounded-sm p-3">
              <div className="j-label mb-2" style={{ fontSize: '0.55rem' }}>◈ TODAY'S BRIEFING</div>
              <div className="j-divider mb-2" />
              {universities.map(cfg => {
                const info = getWeekInfo(cfg, now);
                return (
                  <div key={cfg.id} className="mb-2">
                    <div className="flex justify-between items-center">
                      <span className="j-title" style={{ fontSize: '0.6rem', color: cfg.accentColor }}>{cfg.abbr}</span>
                      <span style={{
                        fontSize: '0.55rem', fontFamily: 'Orbitron, sans-serif',
                        color: info.status === 'upcoming' ? 'rgba(0,212,255,0.4)'
                             : info.status === 'complete' ? 'var(--j-green)'
                             : info.isFirstDay ? 'var(--j-orange)'
                             : info.isLastDay  ? 'var(--j-red)'
                             : 'rgba(0,212,255,0.5)',
                      }}>
                        {info.status === 'upcoming' ? `STARTS ${info.nextTermDate ? fmtDate(info.nextTermDate) : '—'}`
                          : info.status === 'complete' ? '✓ DONE'
                          : info.isFirstDay ? '⚡ POST ANN.'
                          : info.isLastDay  ? '🔴 GRADE'
                          : `W${info.weekNum} D${info.daysIntoWeek + 1}`}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.5rem', color: cfg.accentColor, opacity: 0.5 }}>{info.termLabel}</div>
                  </div>
                );
              })}
            </div>

            <div className="j-panel j-panel-inner j-vros j-depth-3 j-float-slow j-float-delay-2 j-specular j-ambient-glow rounded-sm p-3 flex flex-col items-center gap-2"
              style={{ '--glow-color': 'rgba(0,212,255,0.25)', '--float-z': '20px' } as React.CSSProperties}>
              <div className="arc-reactor-vr"><ArcReactor size={40} /></div>
              <div className="j-title" style={{ fontSize: '0.55rem', letterSpacing: '0.15em', color: 'rgba(0,212,255,0.5)' }}>
                ARC REACTOR v3
              </div>
              <div style={{ fontSize: '0.55rem', color: 'rgba(0,212,255,0.35)', fontFamily: 'Orbitron, sans-serif' }}>PWR: 3.00 GJ</div>
              <div className="j-progress-track w-full">
                <div className="j-progress-fill" style={{ width: '87%' }} />
              </div>
              <div style={{ fontSize: '0.5rem', color: 'rgba(0,212,255,0.35)', fontFamily: 'Orbitron, sans-serif' }}>87% CAPACITY</div>
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <footer style={{ borderTop: '1px solid rgba(0,212,255,0.1)', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.5rem', color: 'rgba(0,212,255,0.25)', fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.1em' }}>
          <span>J.A.R.V.I.S. · PERSONAL COMMAND CENTER · v4.2.1</span>
          <span>NEWS REFRESHES EVERY 5 MIN · ALERTS AUTO-DISMISS AFTER ACK</span>
          <span>STARK INDUSTRIES © 2026</span>
        </footer>

      </div>
    </div>
  );
}
