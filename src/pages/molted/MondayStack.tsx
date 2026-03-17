import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft, Clock, MessageSquare, FileText, Mail,
  AlertTriangle, Megaphone, Zap, Check, Copy,
  ChevronDown, ChevronUp, ArrowRight, Loader2, RotateCcw,
} from 'lucide-react';
import MoltedLayout from './MoltedLayout';

/* ── Constants ──────────────────────────────────────────────────────────── */
const TEAL         = '#2563EB';
const TEAL_DIM     = 'rgba(37,99,235,0.12)';
const TEAL_BORDER  = 'rgba(37,99,235,0.28)';
const PURPLE       = '#7C3AED';
const PURPLE_DIM   = 'rgba(124,58,237,0.12)';
const PURPLE_BORDER= 'rgba(124,58,237,0.28)';
const AMBER        = '#F59E0B';
const AMBER_DIM    = 'rgba(245,158,11,0.10)';
const AMBER_BORDER = 'rgba(245,158,11,0.28)';
const GREEN        = '#10B981';
const GREEN_DIM    = 'rgba(16,185,129,0.10)';
const GREEN_BORDER = 'rgba(16,185,129,0.28)';
const RED_DIM      = 'rgba(239,68,68,0.10)';
const RED_BORDER   = 'rgba(239,68,68,0.28)';

/* ── Processing log steps ───────────────────────────────────────────────── */
const LOG_STEPS = [
  'Reading 47 discussion posts across 3 threads...',
  'Flagged 4 misconceptions · 2 strong posts · routing all 47...',
  'Drafted 47 replies in Dr. Chen\'s voice',
  'Opening 18 assignments...',
  'Grading criterion by criterion: Thesis · Evidence · Structure · Voice',
  '18 grade reports ready · avg score 81% · 2 integrity flags',
  'Reading 9 student emails...',
  'Drafted 9 replies in your voice · 2 flagged for personal review',
  'Reviewing at-risk profiles: Marcus T., Keisha L.',
  'Drafted 2 personalized intervention outreach emails',
  'Writing Week 7 announcement...',
  'Announcement drafted · Level 2 depth · ~180 words',
  'Done. Forge handled your Monday stack.',
];

/* ── Hardcoded result data ──────────────────────────────────────────────── */

const DISCUSSION_THREADS = [
  {
    thread: 'Thread 1: "What is organizational culture really?"',
    post: '"I think organizational culture is basically just the vibe of a place — like whether people are chill or stressed. It doesn\'t really affect performance that much." — Jordan M.',
    reply: 'Hi Jordan — great starting instinct! The "vibe" framing captures something real: culture is felt before it\'s documented. But research (Schein, 2010; Cameron & Quinn, 2011) shows culture directly shapes performance metrics — turnover rates, decision speed, even revenue. Think about why Southwest Airlines outperforms competitors with similar aircraft fleets. What do you think accounts for that difference?',
  },
  {
    thread: 'Thread 2: "Motivation theories — which actually works?"',
    post: '"Herzberg\'s two-factor theory seems outdated. People just want more money, end of story." — Devon A.',
    reply: 'Devon, the skepticism is healthy — and you\'re right that compensation matters. But Herzberg\'s insight was that money prevents dissatisfaction without creating lasting motivation. The Google research on psychological safety (Edmondson, 1999) backs this: teams with high autonomy and mastery outperform high-pay/low-autonomy teams. Can you think of a job you\'d take for less money — and why?',
  },
  {
    thread: 'Thread 3: "Case study — the Boeing 737 MAX crisis"',
    post: '"Boeing\'s problem was just bad engineering. I don\'t see how management or culture is relevant to this." — Priya K.',
    reply: 'Priya — this is actually one of the most important questions in the case. The MCAS software issue was an engineering failure, yes, but the congressional investigation found that Boeing\'s shift from engineering-led to finance-led leadership created pressure to suppress safety concerns. That\'s organizational behavior at work. What structures might have caught this earlier?',
  },
];

const GRADE_REPORTS = [
  {
    name: 'Aaliyah Washington',
    score: 88,
    grade: 'B+',
    feedback: 'Strong thesis with well-supported evidence; structure slightly weakened by a redundant third body paragraph. Voice is consistent and confident throughout.',
    criteria: [
      { name: 'Thesis', score: 23, possible: 25 },
      { name: 'Evidence', score: 22, possible: 25 },
      { name: 'Structure', score: 21, possible: 25 },
      { name: 'Voice', score: 22, possible: 25 },
    ],
    integrity: false,
  },
  {
    name: 'Trevor Hollis',
    score: 71,
    grade: 'C',
    feedback: 'Thesis is present but underdeveloped; two of the four evidence sources are not cited correctly. Structure improves in the second half. Voice shifts inconsistently in paragraphs 3–4.',
    criteria: [
      { name: 'Thesis', score: 17, possible: 25 },
      { name: 'Evidence', score: 18, possible: 25 },
      { name: 'Structure', score: 19, possible: 25 },
      { name: 'Voice', score: 17, possible: 25 },
    ],
    integrity: true,
    integrityNote: 'Paragraph 4 contains phrasing closely matching an unattributed online source. Recommend originality review.',
  },
];

const EMAIL_DRAFTS = [
  {
    from: 'Marcus Thompson <m.thompson@gcu.edu>',
    subject: 'Re: Missing Week 5 Discussion Post',
    original: 'Hi Dr. Chen, I\'m really sorry I missed the discussion last week. I had a family emergency and lost track of deadlines. Is there any way I can still get credit?',
    draft: 'Hi Marcus,\n\nThank you for reaching out and for letting me know what happened — I\'m sorry to hear about the family emergency. Life circumstances absolutely matter, and I appreciate you being upfront.\n\nI\'ve reviewed your standing in the course and I\'d like to discuss a path forward. The late submission window has closed for Week 5, but there may be options depending on your situation. Could you stop by office hours this week (Thursday 2–4 PM) or reply here with a time that works? I want to make sure you finish the semester strong.\n\nBest,\nDr. Chen',
    flagged: false,
  },
  {
    from: 'Destiny Clarke <d.clarke@gcu.edu>',
    subject: 'Struggling — not sure I should be in this program',
    original: 'Dr. Chen, I don\'t know if you\'ve noticed but I\'ve been really struggling. I\'m starting to think maybe I\'m just not cut out for this. I\'m considering dropping out. I\'m not doing well in any of my classes.',
    draft: '⚠️ FLAGGED: This email contains distress signals that go beyond academic performance. The student mentions questioning their fit for the program and potential withdrawal. Recommend personal human response.\n\n---\n\nSuggested opener (personalize before sending):\n\nHi Destiny,\n\nI\'m really glad you reached out — it takes courage to say what you said. I want you to know I\'ve noticed you in class, and I see someone who is working hard. What you\'re feeling is more common than you might think.\n\nPlease don\'t make any decisions about your future this week. Can we talk? I have time Thursday afternoon, or I can connect you with Student Success Services today if that feels more comfortable.\n\nYou matter in this class. Let\'s figure this out together.\n\nDr. Chen',
    flagged: true,
    flagLabel: 'Personal — recommend human review',
  },
];

const ATRISK_EMAILS = [
  {
    name: 'Marcus T.',
    gpa: '2.1',
    risk: 'Missing 3 of last 5 assignments, login gaps > 5 days',
    draft: 'Subject: Checking in — let\'s connect this week\n\nHi Marcus,\n\nI wanted to reach out personally. I\'ve noticed some gaps in your recent submissions, and I want to make sure you have everything you need to succeed this semester.\n\nYou\'re capable — your earlier work showed real promise. Sometimes the middle of the semester gets overwhelming, and that\'s completely normal. I\'d love to connect this week to reset and map out a plan for the back half of the course.\n\nThursday office hours (2–4 PM) or a quick Zoom call — whatever works for you. You don\'t have to figure this out alone.\n\nDr. Chen\nOrganizational Behavior, Section 4',
  },
  {
    name: 'Keisha L.',
    gpa: '1.8',
    risk: 'Declining scores over 4 weeks, flagged by Beacon early-warning',
    draft: 'Subject: I\'m in your corner — let\'s talk\n\nHi Keisha,\n\nI\'ve been tracking the course data this week and wanted to reach out directly. I can see that the last few weeks have been challenging, and I don\'t want you to feel like you\'re navigating this alone.\n\nYour Week 2 discussion response was one of the sharpest in the class — that student is still here. I\'d like to meet and look at what\'s changed and what support might help.\n\nBeacon flagged your profile through our early-warning system, which means the institution is paying attention and wants to see you succeed. You have resources available — and I\'m one of them.\n\nCan we connect this week? Reply here or stop by Thursday.\n\nDr. Chen',
  },
];

const ANNOUNCEMENT = `Subject: Week 7 — Power, Politics, and Organizational Change

Hi everyone,

We\'re entering one of the most practically relevant weeks of the course: how power actually flows inside organizations — and why change initiatives fail even when everyone agrees they\'re needed.

This week you\'ll encounter Kotter\'s 8-Step Model alongside more critical perspectives (Pfeffer, French & Raven). Come ready to challenge the models, not just describe them.

Key focuses this week:
• Why 70% of change efforts fail — and what the research says about why
• The difference between formal authority and real influence
• Coalition-building as a strategic leadership skill

Discussion prompt drops Wednesday at 8 AM. Essay 4 guidelines are posted — first draft checkpoint due Friday.

Office hours are open Thursday 2–4 PM and by appointment.

See you in the discussion boards,
Dr. Chen`;

/* ── Helpers ────────────────────────────────────────────────────────────── */
function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1800); }}
      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all duration-200 flex-shrink-0"
      style={{
        background: copied ? TEAL_DIM : 'rgba(148,163,184,0.10)',
        color: copied ? TEAL : '#94A3B8',
        border: `1px solid ${copied ? TEAL_BORDER : 'rgba(148,163,184,0.18)'}`,
      }}
    >
      {copied ? <Check size={11} /> : <Copy size={11} />}
      {copied ? 'Copied' : label}
    </button>
  );
}

function SectionCard({
  icon, title, badge, badgeColor, badgeBg, children, defaultOpen = false,
}: {
  icon: React.ReactNode;
  title: string;
  badge?: string;
  badgeColor?: string;
  badgeBg?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className="rounded-2xl border transition-all duration-200"
      style={{ background: 'rgba(15,23,42,0.85)', borderColor: open ? TEAL_BORDER : 'rgba(148,163,184,0.12)' }}
    >
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-6 py-5 text-left group"
      >
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0" style={{ color: TEAL }}>{icon}</div>
          <span className="font-semibold text-white text-base">{title}</span>
          {badge && (
            <span
              className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
              style={{ color: badgeColor ?? TEAL, background: badgeBg ?? TEAL_DIM, border: `1px solid ${badgeColor ? badgeColor + '44' : TEAL_BORDER}` }}
            >
              {badge}
            </span>
          )}
        </div>
        <div style={{ color: '#64748B' }}>
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>
      {open && (
        <div className="px-6 pb-6 border-t" style={{ borderColor: 'rgba(148,163,184,0.10)' }}>
          <div className="pt-5">{children}</div>
        </div>
      )}
    </div>
  );
}

/* ── Thread Tab Component ───────────────────────────────────────────────── */
function DiscussionResult() {
  const [activeTab, setActiveTab] = useState(0);
  const thread = DISCUSSION_THREADS[activeTab];
  return (
    <div>
      <div className="flex gap-2 mb-5 flex-wrap">
        {DISCUSSION_THREADS.map((t, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all duration-200"
            style={{
              background: activeTab === i ? TEAL_DIM : 'rgba(148,163,184,0.08)',
              color: activeTab === i ? TEAL : '#94A3B8',
              border: `1px solid ${activeTab === i ? TEAL_BORDER : 'rgba(148,163,184,0.12)'}`,
            }}
          >
            Thread {i + 1}
          </button>
        ))}
      </div>
      <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#64748B' }}>
        {thread.thread}
      </p>
      <div
        className="rounded-xl p-4 mb-4 text-sm italic leading-relaxed"
        style={{ background: 'rgba(100,116,139,0.08)', borderLeft: `3px solid ${AMBER}`, color: '#CBD5E1' }}
      >
        {thread.post}
      </div>
      <div className="flex items-start justify-between gap-3 mb-2">
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: TEAL }}>Forge Draft Reply</p>
        <CopyButton text={thread.reply} label="Copy reply" />
      </div>
      <div
        className="rounded-xl p-4 text-sm leading-relaxed"
        style={{ background: TEAL_DIM, border: `1px solid ${TEAL_BORDER}`, color: '#E2E8F0' }}
      >
        {thread.reply}
      </div>
      <p className="text-xs mt-3" style={{ color: '#64748B' }}>
        + 44 more replies drafted · All routed and ready to send
      </p>
    </div>
  );
}

/* ── Grade Reports Result ───────────────────────────────────────────────── */
function GradeResult() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-1">
        <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold" style={{ background: GREEN_DIM, color: GREEN, border: `1px solid ${GREEN_BORDER}` }}>
          18 total ready
        </span>
        <span className="text-xs" style={{ color: '#64748B' }}>Avg score 81% · 2 integrity flags</span>
      </div>
      {GRADE_REPORTS.map((g, i) => (
        <div
          key={i}
          className="rounded-xl border p-5"
          style={{
            background: g.integrity ? RED_DIM : 'rgba(30,41,59,0.7)',
            borderColor: g.integrity ? RED_BORDER : 'rgba(148,163,184,0.12)',
          }}
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <p className="font-semibold text-white">{g.name}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-2xl font-black" style={{ color: g.score >= 85 ? TEAL : g.score >= 75 ? AMBER : '#EF4444' }}>
                  {g.score}
                </span>
                <span className="text-sm font-bold" style={{ color: '#64748B' }}>/ 100</span>
                <span
                  className="text-sm font-bold px-2 py-0.5 rounded-lg"
                  style={{ background: 'rgba(0,0,0,0.2)', color: g.score >= 85 ? TEAL : g.score >= 75 ? AMBER : '#EF4444' }}
                >
                  {g.grade}
                </span>
                {g.integrity && (
                  <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: RED_DIM, color: '#EF4444', border: `1px solid ${RED_BORDER}` }}>
                    <AlertTriangle size={10} /> Integrity flag
                  </span>
                )}
              </div>
            </div>
            <CopyButton text={`${g.name}\nScore: ${g.score}/100 (${g.grade})\n\nFeedback: ${g.feedback}${g.integrity ? '\n\n⚠️ ' + g.integrityNote : ''}`} label="Copy report" />
          </div>
          <div className="grid grid-cols-4 gap-2 mb-3">
            {g.criteria.map((c, j) => (
              <div key={j} className="text-center rounded-lg py-2" style={{ background: 'rgba(0,0,0,0.2)' }}>
                <p className="text-xs mb-1" style={{ color: '#64748B' }}>{c.name}</p>
                <p className="text-sm font-bold" style={{ color: c.score >= 22 ? TEAL : c.score >= 18 ? AMBER : '#EF4444' }}>
                  {c.score}/{c.possible}
                </p>
              </div>
            ))}
          </div>
          <p className="text-sm leading-relaxed" style={{ color: '#CBD5E1' }}>{g.feedback}</p>
          {g.integrity && g.integrityNote && (
            <div className="mt-3 rounded-lg p-3 flex items-start gap-2 text-sm" style={{ background: 'rgba(239,68,68,0.08)', border: `1px solid ${RED_BORDER}` }}>
              <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" style={{ color: '#EF4444' }} />
              <span style={{ color: '#FCA5A5' }}>{g.integrityNote}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Email Drafts Result ────────────────────────────────────────────────── */
function EmailResult() {
  return (
    <div className="space-y-5">
      <p className="text-xs" style={{ color: '#64748B' }}>9 total drafted · 2 flagged for personal review · Showing 2 samples</p>
      {EMAIL_DRAFTS.map((e, i) => (
        <div
          key={i}
          className="rounded-xl border p-5"
          style={{
            background: e.flagged ? AMBER_DIM : 'rgba(30,41,59,0.7)',
            borderColor: e.flagged ? AMBER_BORDER : 'rgba(148,163,184,0.12)',
          }}
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="min-w-0">
              <p className="text-xs font-medium mb-0.5" style={{ color: '#64748B' }}>{e.from}</p>
              <p className="text-sm font-semibold text-white">{e.subject}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {e.flagged && (
                <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: AMBER_DIM, color: AMBER, border: `1px solid ${AMBER_BORDER}` }}>
                  <AlertTriangle size={10} /> {e.flagLabel}
                </span>
              )}
              <CopyButton text={e.draft} label="Copy draft" />
            </div>
          </div>
          <div
            className="rounded-lg p-3 mb-3 text-xs italic leading-relaxed"
            style={{ background: 'rgba(100,116,139,0.08)', borderLeft: `3px solid #475569`, color: '#94A3B8' }}
          >
            {e.original}
          </div>
          <div
            className="rounded-xl p-4 text-sm leading-relaxed whitespace-pre-line"
            style={{ background: e.flagged ? 'rgba(245,158,11,0.06)' : TEAL_DIM, border: `1px solid ${e.flagged ? AMBER_BORDER : TEAL_BORDER}`, color: '#E2E8F0' }}
          >
            {e.draft}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── At-Risk Outreach Result ────────────────────────────────────────────── */
function AtRiskResult() {
  return (
    <div className="space-y-5">
      {ATRISK_EMAILS.map((s, i) => (
        <div
          key={i}
          className="rounded-xl border p-5"
          style={{ background: AMBER_DIM, borderColor: AMBER_BORDER }}
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <p className="font-semibold text-white">{s.name}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: RED_DIM, color: '#EF4444', border: `1px solid ${RED_BORDER}` }}>
                  GPA {s.gpa}
                </span>
                <span className="text-xs" style={{ color: '#94A3B8' }}>{s.risk}</span>
              </div>
            </div>
            <CopyButton text={s.draft} label="Copy email" />
          </div>
          <div
            className="rounded-xl p-4 text-sm leading-relaxed whitespace-pre-line"
            style={{ background: 'rgba(245,158,11,0.06)', border: `1px solid ${AMBER_BORDER}`, color: '#E2E8F0' }}
          >
            {s.draft}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Announcement Result ────────────────────────────────────────────────── */
function AnnouncementResult() {
  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold" style={{ background: TEAL_DIM, color: TEAL, border: `1px solid ${TEAL_BORDER}` }}>
            Week 7
          </span>
          <span className="text-xs" style={{ color: '#64748B' }}>~180 words · Level 2 depth</span>
        </div>
        <CopyButton text={ANNOUNCEMENT} label="Copy announcement" />
      </div>
      <div
        className="rounded-xl p-5 text-sm leading-relaxed whitespace-pre-line"
        style={{ background: TEAL_DIM, border: `1px solid ${TEAL_BORDER}`, color: '#E2E8F0' }}
      >
        {ANNOUNCEMENT}
      </div>
    </div>
  );
}

/* ── Main Component ─────────────────────────────────────────────────────── */
type Phase = 'setup' | 'processing' | 'results';

export default function MondayStack() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [logLines, setLogLines] = useState<string[]>([]);
  const logRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-scroll log
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logLines]);

  // Processing animation
  useEffect(() => {
    if (phase !== 'processing') return;
    setLogLines([]);
    let index = 0;
    timerRef.current = setInterval(() => {
      if (index < LOG_STEPS.length) {
        setLogLines(prev => [...prev, LOG_STEPS[index]]);
        index++;
      } else {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }, 400);
    return () => { if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; } };
  }, [phase]);

  // Transition to results once last log line is shown
  const isDone = phase === 'processing' && logLines[logLines.length - 1] === LOG_STEPS[LOG_STEPS.length - 1];
  useEffect(() => {
    if (!isDone) return;
    const t = setTimeout(() => setPhase('results'), 600);
    return () => clearTimeout(t);
  }, [isDone]);

  function handleReset() {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setLogLines([]);
    setPhase('setup');
  }

  return (
    <MoltedLayout>
      {/* Header */}
      <div className="pt-24 pb-6 px-6" style={{ background: 'linear-gradient(180deg, rgba(124,58,237,0.08) 0%, transparent 100%)' }}>
        <div className="max-w-3xl mx-auto">
          <Link
            to="/forge"
            className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors"
            style={{ color: '#64748B' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#94A3B8')}
            onMouseLeave={e => (e.currentTarget.style.color = '#64748B')}
          >
            <ChevronLeft size={16} /> Back to Forge
          </Link>

          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${PURPLE}, #5B21B6)` }}
            >
              <Zap size={20} className="text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: PURPLE }}>Forge · Composite Demo</p>
              <h1 className="text-2xl font-black text-white leading-tight">The Monday Stack</h1>
            </div>
          </div>
          <p className="text-base leading-relaxed max-w-xl" style={{ color: '#94A3B8' }}>
            Everything a faculty member faces Monday morning — handled in minutes, not hours.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="px-6 pb-20">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* ── SETUP PHASE ── */}
          {phase === 'setup' && (
            <div
              className="rounded-3xl border overflow-hidden"
              style={{ background: 'rgba(15,23,42,0.9)', borderColor: 'rgba(148,163,184,0.12)' }}
            >
              {/* Time header */}
              <div
                className="px-8 py-6 border-b"
                style={{ background: 'rgba(124,58,237,0.06)', borderColor: 'rgba(148,163,184,0.10)' }}
              >
                <div className="flex items-center gap-3">
                  <Clock size={18} style={{ color: PURPLE }} />
                  <span className="text-lg font-black text-white tracking-tight">It's 8:04 AM Monday.</span>
                </div>
                <p className="text-sm mt-1" style={{ color: '#64748B' }}>
                  Dr. Chen · Organizational Behavior · Grand Canyon University
                </p>
              </div>

              {/* Work items */}
              <div className="px-8 py-6 space-y-4">
                {[
                  {
                    icon: <MessageSquare size={16} />,
                    color: TEAL,
                    bg: TEAL_DIM,
                    border: TEAL_BORDER,
                    label: '3 discussion threads',
                    detail: '47 unread student posts',
                    time: '90 min',
                  },
                  {
                    icon: <FileText size={16} />,
                    color: '#8B5CF6',
                    bg: PURPLE_DIM,
                    border: PURPLE_BORDER,
                    label: '18 ungraded assignments',
                    detail: 'Essay 3 — Organizational Behavior',
                    time: '110 min',
                  },
                  {
                    icon: <Mail size={16} />,
                    color: TEAL,
                    bg: TEAL_DIM,
                    border: TEAL_BORDER,
                    label: '9 unread student emails',
                    detail: 'Needing personal replies',
                    time: '35 min',
                  },
                  {
                    icon: <AlertTriangle size={16} />,
                    color: AMBER,
                    bg: AMBER_DIM,
                    border: AMBER_BORDER,
                    label: '2 flagged at-risk students',
                    detail: 'Beacon alert — Marcus T., Keisha L.',
                    time: '20 min',
                  },
                  {
                    icon: <Megaphone size={16} />,
                    color: '#64748B',
                    bg: 'rgba(100,116,139,0.10)',
                    border: 'rgba(100,116,139,0.25)',
                    label: '1 course announcement to write',
                    detail: 'Week 7 — Power & Organizational Change',
                    time: '25 min',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 rounded-xl px-4 py-3.5"
                    style={{ background: item.bg, border: `1px solid ${item.border}` }}
                  >
                    <div className="flex-shrink-0" style={{ color: item.color }}>{item.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white">{item.label}</p>
                      <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>{item.detail}</p>
                    </div>
                    <div
                      className="text-xs font-mono font-semibold px-2 py-1 rounded-lg flex-shrink-0"
                      style={{ background: 'rgba(0,0,0,0.2)', color: '#64748B' }}
                    >
                      ~{item.time}
                    </div>
                  </div>
                ))}
              </div>

              {/* Time estimate */}
              <div
                className="mx-8 mb-6 rounded-2xl px-6 py-5 flex items-center justify-between"
                style={{ background: RED_DIM, border: `1px solid ${RED_BORDER}` }}
              >
                <div className="flex items-center gap-3">
                  <Clock size={20} style={{ color: '#EF4444' }} />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: '#EF4444' }}>Estimated time if done manually</p>
                    <p className="text-3xl font-black" style={{ color: '#FCA5A5' }}>4h 20min</p>
                  </div>
                </div>
                <p className="text-sm text-right max-w-[140px]" style={{ color: '#94A3B8' }}>
                  Before your first class at 10 AM.
                </p>
              </div>

              {/* CTA */}
              <div className="px-8 pb-8">
                <button
                  onClick={() => setPhase('processing')}
                  className="w-full flex items-center justify-center gap-3 rounded-2xl py-5 text-lg font-bold text-white transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
                  style={{
                    background: `linear-gradient(135deg, ${PURPLE}, #5B21B6)`,
                    boxShadow: `0 8px 32px rgba(124,58,237,0.35)`,
                  }}
                >
                  <Zap size={22} />
                  Hand it to Forge
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* ── PROCESSING PHASE ── */}
          {phase === 'processing' && (
            <div
              className="rounded-3xl border overflow-hidden"
              style={{ background: 'rgba(15,23,42,0.95)', borderColor: PURPLE_BORDER }}
            >
              <div
                className="px-8 py-5 border-b flex items-center gap-3"
                style={{ background: 'rgba(124,58,237,0.08)', borderColor: PURPLE_BORDER }}
              >
                <Loader2 size={18} className="animate-spin" style={{ color: PURPLE }} />
                <span className="text-sm font-semibold" style={{ color: PURPLE }}>Forge is working...</span>
              </div>

              <div
                ref={logRef}
                className="px-8 py-6 font-mono text-sm space-y-2.5 overflow-y-auto"
                style={{ maxHeight: '420px', minHeight: '220px' }}
              >
                {logLines.map((line, i) => {
                  const isDoneStep = i === LOG_STEPS.length - 1 && line === LOG_STEPS[LOG_STEPS.length - 1];
                  const isReady = line.includes('ready') || line.includes('Done') || line.includes('Drafted');
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-3 animate-fadeIn"
                      style={{
                        animationDuration: '0.3s',
                        color: isDoneStep ? GREEN : isReady ? TEAL : '#94A3B8',
                      }}
                    >
                      <span className="flex-shrink-0 mt-0.5" style={{ color: isDoneStep ? GREEN : isReady ? TEAL : '#475569' }}>
                        {isDoneStep ? <Check size={14} /> : isReady ? <Check size={14} /> : <span className="inline-block w-3.5 text-center">›</span>}
                      </span>
                      <span>{line}</span>
                    </div>
                  );
                })}
                {logLines.length < LOG_STEPS.length && (
                  <div className="flex items-center gap-2 mt-1" style={{ color: '#475569' }}>
                    <Loader2 size={12} className="animate-spin" />
                    <span className="text-xs">processing...</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── RESULTS PHASE ── */}
          {phase === 'results' && (
            <>
              {/* Time saved banner */}
              <div
                className="rounded-3xl border px-8 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
                style={{ background: 'rgba(15,23,42,0.92)', borderColor: GREEN_BORDER }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${GREEN}, #059669)` }}
                  >
                    <Check size={26} className="text-white" strokeWidth={3} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: GREEN }}>New estimated time</p>
                    <p className="text-4xl font-black text-white">22 min</p>
                    <p className="text-sm mt-1" style={{ color: '#6EE7B7' }}>Review, approve, and send.</p>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl"
                    style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(16,185,129,0.20)' }}
                  >
                    <Clock size={16} style={{ color: GREEN }} />
                    <span className="text-sm font-semibold text-white">4h 20min <span style={{ color: '#6EE7B7' }}>→</span> 22 min</span>
                  </div>
                  <p className="text-xs mt-2" style={{ color: '#6EE7B7' }}>That's 3h 58min back in your day.</p>
                </div>
              </div>

              {/* Log summary (collapsed) */}
              <div
                className="rounded-2xl border px-5 py-4"
                style={{ background: 'rgba(15,23,42,0.7)', borderColor: 'rgba(148,163,184,0.10)' }}
              >
                <div className="flex items-center gap-2">
                  <Check size={14} style={{ color: GREEN }} />
                  <span className="text-sm font-semibold" style={{ color: GREEN }}>Done. Forge handled your Monday stack.</span>
                </div>
                <p className="text-xs mt-1 ml-5" style={{ color: '#475569' }}>
                  47 discussion replies · 18 grade reports · 9 email drafts · 2 at-risk outreach · 1 announcement
                </p>
              </div>

              {/* Result cards */}
              <div className="space-y-3">
                <SectionCard
                  icon={<MessageSquare size={20} />}
                  title="Discussion Replies"
                  badge="47 drafted"
                  defaultOpen={true}
                >
                  <DiscussionResult />
                </SectionCard>

                <SectionCard
                  icon={<FileText size={20} />}
                  title="Grade Reports"
                  badge="18 total ready"
                  badgeColor={GREEN}
                  badgeBg={GREEN_DIM}
                >
                  <GradeResult />
                </SectionCard>

                <SectionCard
                  icon={<Mail size={20} />}
                  title="Email Drafts"
                  badge="9 drafted · 2 flagged"
                  badgeColor={AMBER}
                  badgeBg={AMBER_DIM}
                >
                  <EmailResult />
                </SectionCard>

                <SectionCard
                  icon={<AlertTriangle size={20} />}
                  title="At-Risk Outreach"
                  badge="2 students"
                  badgeColor={AMBER}
                  badgeBg={AMBER_DIM}
                >
                  <AtRiskResult />
                </SectionCard>

                <SectionCard
                  icon={<Megaphone size={20} />}
                  title="Week 7 Announcement"
                  badge="Ready to post"
                  badgeColor={TEAL}
                  badgeBg={TEAL_DIM}
                >
                  <AnnouncementResult />
                </SectionCard>
              </div>

              {/* Reset + CTA */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{
                    background: 'rgba(148,163,184,0.08)',
                    color: '#64748B',
                    border: '1px solid rgba(148,163,184,0.15)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.color = '#94A3B8';
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(148,163,184,0.13)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.color = '#64748B';
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(148,163,184,0.08)';
                  }}
                >
                  <RotateCcw size={15} /> Reset demo
                </button>
                <a
                  href="mailto:hello@molted.ai"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    background: `linear-gradient(135deg, ${PURPLE}, #5B21B6)`,
                    boxShadow: `0 4px 20px rgba(124,58,237,0.30)`,
                  }}
                >
                  Get Forge for your faculty <ArrowRight size={15} />
                </a>
              </div>
            </>
          )}

        </div>
      </div>

      {/* Fade-in keyframes injected once */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease both; }
      `}</style>
    </MoltedLayout>
  );
}
