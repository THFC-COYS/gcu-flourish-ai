import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, BookOpen, MessageSquare, CheckSquare, Zap,
  UploadCloud, Bell, Users, TrendingUp, Shield, Clock,
  ChevronRight, Play, Layers, Bot, Cpu, BarChart3,
  GraduationCap, Sparkles, Database, Lock, FlaskConical,
  PieChart, FileCheck, UserCog, BrainCircuit,
} from 'lucide-react';
import MoltedLayout, { OutpostBanner } from './MoltedLayout';

/* ── Scroll reveal ─────────────────────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('opacity-100', 'translate-y-0');
          el.classList.remove('opacity-0', 'translate-y-8');
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function RevealBlock({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className={`opacity-0 translate-y-8 transition-all duration-700 ease-out ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ── Forge accent color ──────────────────────────────────────────────── */
const TEAL = '#2563EB';
const TEAL_DIM = 'rgba(37,99,235,0.15)';
const TEAL_BORDER = 'rgba(37,99,235,0.25)';
const TEAL_GLOW = '0 0 30px rgba(37,99,235,0.15), 0 0 60px rgba(37,99,235,0.07)';
const GOLD = '#64748B';

/* ── Hero ──────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(37,99,235,0.07) 0%, transparent 70%)' }}
        />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(100,116,139,0.05) 0%, transparent 70%)' }}
        />
      </div>

      {/* Product label */}
      <RevealBlock className="mb-8">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase"
          style={{ background: TEAL_DIM, border: `1px solid ${TEAL_BORDER}`, color: TEAL }}
        >
          <Cpu size={12} />
          MoltALP · Faculty
        </div>
      </RevealBlock>

      {/* Wordmark */}
      <RevealBlock delay={100}>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight">
          <span className="text-molted-white/90">Teach</span>
        </h1>
      </RevealBlock>

      {/* Tagline */}
      <RevealBlock delay={200}>
        <p className="mt-8 text-2xl md:text-3xl font-black text-molted-white/80 tracking-tight max-w-2xl leading-snug">
          An AI that never leaves your classroom.
          <br />
          <span className="text-molted-muted font-medium text-xl md:text-2xl">Always watching. Always responding. Always on.</span>
        </p>
      </RevealBlock>

      {/* Sub */}
      <RevealBlock delay={300}>
        <p className="mt-6 text-molted-muted text-lg max-w-lg leading-relaxed">
          Teach watches every discussion board in real time. The moment a student
          posts a question, the agent responds — while they're still on the page.
          No integration. No IT project. Works on top of whatever LMS you already have.
        </p>
      </RevealBlock>

      {/* CTAs */}
      <RevealBlock delay={400} className="mt-10 flex flex-col sm:flex-row items-center gap-4">
        <a
          href="mailto:greg.lucas@paigebreaker.com"
          className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-molted-black font-bold transition-all duration-200 hover:-translate-y-px"
          style={{ background: TEAL }}
        >
          Request Early Access
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </a>
        <Link
          to="/"
          className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-molted-border hover:border-molted-subtle text-molted-muted hover:text-molted-white font-semibold transition-all duration-200"
        >
          See All Products
          <ChevronRight size={16} />
        </Link>
      </RevealBlock>

      {/* Time audit callout */}
      <RevealBlock delay={500} className="mt-20">
        <div
          className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border"
          style={{ background: 'rgba(248,249,252,0.95)', borderColor: 'rgba(0,0,0,0.06)' }}
        >
          <Clock size={14} className="text-molted-muted" />
          <p className="text-molted-muted text-sm">
            The average professor spends{' '}
            <span className="text-molted-white font-semibold">23 hours/week</span>
            {' '}on tasks Forge handles automatically.
          </p>
        </div>
      </RevealBlock>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-molted-subtle animate-pulse">
        <span className="text-xs tracking-widest uppercase">Explore</span>
        <div className="w-px h-8 bg-gradient-to-b from-molted-subtle to-transparent" />
      </div>
    </section>
  );
}

/* ── The Problem ───────────────────────────────────────────────────────── */
function TheProblem() {
  const breakdown = [
    { task: 'Reading & responding to discussion boards', hours: 6, pct: 26 },
    { task: 'Grading assignments & writing feedback', hours: 8, pct: 35 },
    { task: 'Answering repetitive student emails', hours: 4, pct: 17 },
    { task: 'Building course materials & announcements', hours: 5, pct: 22 },
  ];

  return (
    <section className="py-28 px-6 border-t border-molted-border">
      <div className="max-w-5xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">The faculty reality</p>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            23 hours a week.<br />
            <span style={{ color: TEAL }}>None of it is teaching.</span>
          </h2>
          <p className="mt-6 text-molted-muted text-lg max-w-xl mx-auto">
            The best professors aren't limited by their expertise. They're limited
            by the administrative weight that surrounds it.
          </p>
        </RevealBlock>

        <div className="space-y-4">
          {breakdown.map((item, i) => (
            <RevealBlock key={i} delay={i * 80}>
              <div className="flex items-center gap-4 p-5 rounded-2xl border border-molted-border bg-molted-elevated">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-molted-white text-sm font-medium">{item.task}</p>
                    <p className="text-molted-muted text-sm font-semibold ml-4 flex-shrink-0">{item.hours}h / week</p>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-molted-border overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${item.pct}%`, background: TEAL, opacity: 0.7 }}
                    />
                  </div>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>

        <RevealBlock delay={400} className="mt-10 text-center">
          <p className="text-molted-muted text-base">
            Forge automates all of it.{' '}
            <span className="text-molted-white font-semibold">Returning those 23 hours to teaching.</span>
          </p>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Core Tools ────────────────────────────────────────────────────────── */
const TOOLS = [
  {
    icon: MessageSquare,
    name: 'Discussion Intelligence',
    tagline: 'Read every post. Draft every response.',
    description:
      'Forge reads your entire discussion board, identifies the quality of student reasoning, flags misconceptions, and drafts pedagogically-sound response suggestions — sorted by urgency and depth. You review. You click post.',
    bullets: [
      'Detects misconceptions before they spread',
      'Surfaces the best student contributions automatically',
      'Drafts differentiated replies per student voice',
      'Flags at-risk students who haven\'t participated',
    ],
    visual: 'discussion',
  },
  {
    icon: UploadCloud,
    name: 'Course Architect',
    tagline: 'Upload your syllabus. Get your semester.',
    description:
      'Drop your syllabus into Forge. It reads your learning objectives, your schedule, your topics — and builds your entire semester infrastructure: week-by-week announcements, module introductions, student FAQs, and reminder sequences. All in your voice.',
    bullets: [
      'Auto-generates all semester announcements',
      'Builds per-module introductions and objectives',
      'Creates student FAQ documents from your syllabus',
      'Schedules emails, reminders, and milestone alerts',
    ],
    visual: 'architect',
  },
  {
    icon: CheckSquare,
    name: 'Agentic Grader',
    tagline: 'Your rubric. Your standards. Zero friction.',
    description:
      'Upload your rubric once. Forge reads every submission against it, writes individualized feedback for each student citing their specific work, assigns scores with justification, and flags any academic integrity signals. You review in minutes, not hours.',
    bullets: [
      'Grades to your exact rubric — line by line',
      'Writes personalized feedback per student',
      'Cites student\'s own text in every comment',
      'Academic integrity pattern detection built in',
    ],
    visual: 'grader',
  },
  {
    icon: Zap,
    name: 'Auto-Respond',
    tagline: 'Routine questions answered. Instantly. Always.',
    description:
      'Set your policies once. Forge learns what you always say about deadlines, extensions, exam format, office hours, and grading. When students ask, it answers in your voice — 24/7. Complex academic questions are flagged for your personal attention.',
    bullets: [
      'Handles 80% of student emails automatically',
      'Answers in your documented voice and policies',
      'Smart escalation for questions that need you',
      'Available at 2 AM without bothering you',
    ],
    visual: 'autorespond',
  },
  {
    icon: TrendingUp,
    name: 'Early Warning Engine',
    tagline: 'See who is struggling before they give up.',
    description:
      'Forge monitors engagement signals across your entire roster — login frequency, submission timing, discussion participation, grade trajectory. When a student\'s pattern changes, you know within hours, not at the end of the semester.',
    bullets: [
      'Real-time engagement monitoring across all students',
      'Personalized check-in drafts ready to send',
      'Intervention history tracked and logged',
      'Integrates with Canvas, Blackboard, D2L',
    ],
    visual: 'warning',
  },
];

function ToolVisual({ type }: { type: string }) {
  if (type === 'discussion') {
    const posts = [
      { initials: 'KM', text: '"I think photosynthesis only happens in leaves" — misconception flagged', flag: true, urgency: 'Review' },
      { initials: 'JT', text: '"The relationship between ATP and glucose synthesis is..." — strong analytical reasoning', flag: false, urgency: 'Highlight' },
      { initials: 'SR', text: 'Has not posted this week — 3 days overdue', flag: true, urgency: 'At Risk' },
    ];
    return (
      <div className="rounded-2xl border border-molted-border bg-molted-elevated p-5 space-y-3">
        <div className="flex items-center justify-between mb-4">
          <p className="text-molted-white text-sm font-semibold">Week 4 Discussion · 28 posts analyzed</p>
          <div className="flex items-center gap-1.5 text-xs" style={{ color: TEAL }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: TEAL }} />
            Live
          </div>
        </div>
        {posts.map((p, i) => (
          <div key={i} className="bg-molted-surface rounded-xl p-3 border border-molted-border flex gap-3 items-start">
            <div className="w-7 h-7 rounded-full bg-molted-border flex items-center justify-center text-xs font-bold text-molted-muted flex-shrink-0">
              {p.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-molted-muted text-xs leading-relaxed line-clamp-2">{p.text}</p>
            </div>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5"
              style={{
                background: p.flag ? 'rgba(30,58,138,0.1)' : `${TEAL_DIM}`,
                color: p.flag ? '#3B82F6' : TEAL,
                border: `1px solid ${p.flag ? 'rgba(30,58,138,0.2)' : TEAL_BORDER}`,
              }}
            >
              {p.urgency}
            </span>
          </div>
        ))}
        <div
          className="mt-3 p-3 rounded-xl text-xs"
          style={{ background: TEAL_DIM, border: `1px solid ${TEAL_BORDER}`, color: TEAL }}
        >
          ✦ Draft response to KM ready — addresses misconception with Socratic follow-up
        </div>
      </div>
    );
  }

  if (type === 'architect') {
    const items = [
      { label: 'Week 1 Announcement', status: 'Generated', icon: '📣' },
      { label: 'Module 3 Introduction', status: 'Generated', icon: '📖' },
      { label: 'Midterm Reminder Sequence', status: 'Generated', icon: '⏰' },
      { label: 'Student FAQ Document', status: 'Generated', icon: '❓' },
      { label: 'Week 8 Check-in Email', status: 'Scheduled', icon: '📧' },
    ];
    return (
      <div className="rounded-2xl border border-molted-border bg-molted-elevated p-5">
        <div className="flex items-center gap-3 mb-5 p-3 rounded-xl bg-molted-surface border border-molted-border">
          <UploadCloud size={16} className="text-molted-muted" />
          <div className="flex-1">
            <p className="text-molted-white text-xs font-semibold">BIO301_Syllabus_Spring.pdf</p>
            <p className="text-molted-muted text-xs">Uploaded · 47 pages · 16 weeks analyzed</p>
          </div>
          <div className="w-2 h-2 rounded-full" style={{ background: TEAL }} />
        </div>
        <div className="space-y-2.5">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-molted-surface border border-molted-border">
              <span className="text-base">{item.icon}</span>
              <p className="text-molted-white text-xs font-medium flex-1">{item.label}</p>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-semibold"
                style={{
                  background: item.status === 'Generated' ? TEAL_DIM : 'rgba(100,116,139,0.1)',
                  color: item.status === 'Generated' ? TEAL : '#64748B',
                  border: `1px solid ${item.status === 'Generated' ? TEAL_BORDER : 'rgba(100,116,139,0.2)'}`,
                }}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
        <p className="text-molted-muted text-xs mt-4 text-center">32 items generated from 1 syllabus</p>
      </div>
    );
  }

  if (type === 'grader') {
    return (
      <div className="rounded-2xl border border-molted-border bg-molted-elevated p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-molted-white text-sm font-semibold">Essay 2 · 24 submissions</p>
          <p className="text-xs text-molted-muted">Graded in 4 min</p>
        </div>
        <div className="space-y-3">
          {[
            { name: 'Alexis R.', score: '94/100', tag: 'Strong thesis, clear argument structure', color: TEAL },
            { name: 'Jordan M.', score: '78/100', tag: 'Lacks textual evidence in sections 2–3', color: '#64748B' },
            { name: 'Casey T.', score: '61/100', tag: 'Similarity to source material — flagged', color: '#1E3A8A' },
          ].map((s, i) => (
            <div key={i} className="bg-molted-surface rounded-xl p-4 border border-molted-border">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-molted-white text-sm font-semibold">{s.name}</p>
                <p className="text-sm font-bold" style={{ color: s.color }}>{s.score}</p>
              </div>
              <p className="text-molted-muted text-xs">{s.tag}</p>
            </div>
          ))}
        </div>
        <div
          className="mt-3 p-3 rounded-xl text-xs"
          style={{ background: TEAL_DIM, border: `1px solid ${TEAL_BORDER}`, color: TEAL }}
        >
          ✦ Full rubric-cited feedback drafted for all 24 students — review & approve
        </div>
      </div>
    );
  }

  if (type === 'autorespond') {
    const convos = [
      { q: 'When is the final exam?', a: 'The final is Dec 12, 8–10 AM in our usual room. Per the syllabus, it covers all material from weeks 10–16.', auto: true },
      { q: 'Can I get an extension on Essay 2?', a: 'Escalated to professor — requires personal response.', auto: false },
      { q: 'How do I access the course readings?', a: 'All readings are in Module Resources on Canvas — organized by week. Let me know if you can\'t find one!', auto: true },
    ];
    return (
      <div className="rounded-2xl border border-molted-border bg-molted-elevated p-5 space-y-3">
        <div className="flex items-center justify-between mb-1">
          <p className="text-molted-white text-sm font-semibold">Inbox · Handled automatically</p>
          <p style={{ color: TEAL }} className="text-xs font-semibold">12 today</p>
        </div>
        {convos.map((c, i) => (
          <div key={i} className="bg-molted-surface rounded-xl p-3 border border-molted-border space-y-2">
            <p className="text-molted-muted text-xs">Student: "{c.q}"</p>
            <div className="flex gap-2 items-start">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: c.auto ? TEAL_DIM : 'rgba(100,116,139,0.15)' }}
              >
                <Bot size={10} style={{ color: c.auto ? TEAL : '#64748B' }} />
              </div>
              <p className="text-xs leading-relaxed" style={{ color: c.auto ? '#1C1C1E' : '#86868B' }}>{c.a}</p>
            </div>
            <div className="flex justify-end">
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{
                  background: c.auto ? TEAL_DIM : 'rgba(100,116,139,0.1)',
                  color: c.auto ? TEAL : '#64748B',
                  border: `1px solid ${c.auto ? TEAL_BORDER : 'rgba(100,116,139,0.2)'}`,
                }}
              >
                {c.auto ? 'Auto-handled' : 'Needs you'}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // warning
  return (
    <div className="rounded-2xl border border-molted-border bg-molted-elevated p-5">
      <div className="flex items-center justify-between mb-5">
        <p className="text-molted-white text-sm font-semibold">Roster · 32 students</p>
        <div className="flex items-center gap-1.5 text-xs text-red-400">
          <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          3 alerts
        </div>
      </div>
      <div className="space-y-2.5">
        {[
          { name: 'Marcus T.', signal: 'No login in 5 days · Essay 2 not submitted', risk: 'High', color: '#1E3A8A' },
          { name: 'Priya S.', signal: 'Grade drop: A→C over 3 weeks', risk: 'Medium', color: '#64748B' },
          { name: 'Alex W.', signal: 'Last 4 discussions: 0 participation', risk: 'Medium', color: '#64748B' },
          { name: 'Jordan L.', signal: 'All submissions on time · Grade: 96%', risk: 'On Track', color: TEAL },
        ].map((s, i) => (
          <div key={i} className="bg-molted-surface rounded-xl p-3 border border-molted-border flex items-center gap-3">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
            <div className="flex-1 min-w-0">
              <p className="text-molted-white text-xs font-semibold">{s.name}</p>
              <p className="text-molted-muted text-xs mt-0.5 truncate">{s.signal}</p>
            </div>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0"
              style={{
                background: `${s.color}15`,
                color: s.color,
                border: `1px solid ${s.color}30`,
              }}
            >
              {s.risk}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 p-3 rounded-xl text-xs" style={{ background: 'rgba(30,58,138,0.08)', border: '1px solid rgba(30,58,138,0.15)', color: '#3B82F6' }}>
        ✦ Personalized check-in drafts ready for Marcus, Priya, and Alex
      </div>
    </div>
  );

  return null;
}

function CoreTools() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = TOOLS[activeIdx];

  return (
    <section className="py-28 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Five core tools</p>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            Every part of your job.<br />
            <span style={{ color: TEAL }}>Handled.</span>
          </h2>
        </RevealBlock>

        <div className="grid md:grid-cols-[340px_1fr] gap-8 items-start">
          {/* Tool selector */}
          <div className="space-y-2">
            {TOOLS.map((tool, i) => {
              const Icon = tool.icon;
              const isActive = i === activeIdx;
              return (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className="w-full text-left p-4 rounded-2xl transition-all duration-300"
                  style={{
                    background: isActive ? TEAL_DIM : 'transparent',
                    border: `1px solid ${isActive ? TEAL_BORDER : 'rgba(0,0,0,0.06)'}`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: isActive ? `${TEAL}20` : 'rgba(0,0,0,0.05)' }}
                    >
                      <Icon size={15} style={{ color: isActive ? TEAL : '#86868B' }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: isActive ? '#1C1C1E' : '#86868B' }}>
                        {tool.name}
                      </p>
                      <p className="text-xs mt-0.5 text-molted-muted">{tool.tagline}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active tool detail */}
          <div className="space-y-6">
            {/* Description */}
            <div
              className="rounded-2xl p-6 border"
              style={{ background: 'rgba(241,243,248,0.95)', borderColor: 'rgba(0,0,0,0.06)' }}
            >
              <p className="text-molted-white text-lg leading-relaxed mb-6">{active.description}</p>
              <div className="space-y-2.5">
                {active.bullets.map((b, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-molted-muted">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: TEAL }} />
                    {b}
                  </div>
                ))}
              </div>
            </div>

            {/* Visual mock */}
            <ToolVisual type={active.visual} />

            {/* Try it links */}
            {active.visual === 'architect' && (
              <Link
                to="/forge/course-architect"
                className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:-translate-y-px"
                style={{ background: TEAL_DIM, color: TEAL, border: `1px solid ${TEAL_BORDER}` }}
              >
                <Play size={14} />
                Try Course Architect — build a semester in minutes
                <ArrowRight size={14} />
              </Link>
            )}
            {active.visual === 'discussion' && (
              <Link
                to="/forge/discussion"
                className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:-translate-y-px"
                style={{ background: TEAL_DIM, color: TEAL, border: `1px solid ${TEAL_BORDER}` }}
              >
                <Play size={14} />
                Try Discussion Intelligence — paste any thread
                <ArrowRight size={14} />
              </Link>
            )}
            {active.visual === 'grader' && (
              <Link
                to="/forge/agentic-grader"
                className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:-translate-y-px"
                style={{ background: TEAL_DIM, color: TEAL, border: `1px solid ${TEAL_BORDER}` }}
              >
                <Play size={14} />
                Try Agentic Grader — paste a rubric and submission
                <ArrowRight size={14} />
              </Link>
            )}
            {active.visual === 'autorespond' && (
              <Link
                to="/forge/auto-respond"
                className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:-translate-y-px"
                style={{ background: TEAL_DIM, color: TEAL, border: `1px solid ${TEAL_BORDER}` }}
              >
                <Play size={14} />
                Try Auto-Respond — paste a student question
                <ArrowRight size={14} />
              </Link>
            )}
            {active.visual === 'warning' && (
              <Link
                to="/forge/early-warning"
                className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:-translate-y-px"
                style={{ background: TEAL_DIM, color: TEAL, border: `1px solid ${TEAL_BORDER}` }}
              >
                <Play size={14} />
                Try Early Warning Engine — scan your roster
                <ArrowRight size={14} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── LMS Killer ────────────────────────────────────────────────────────── */
function LMSKiller() {
  const pillars = [
    {
      num: '01',
      problem: 'The LMS is a filing cabinet.',
      solution: 'Forge is a living curriculum.',
      detail: 'Canvas and Blackboard store files. They\'ve never updated a syllabus, generated an assignment, or noticed that Week 6 confuses every cohort. Forge learns — semester over semester — and makes every course smarter than the last.',
      versus: ['Static content upload', 'Manual date-copying each term', 'Same course forever'],
      wins:   ['Adaptive paths per student', 'Zero-setup semester cloning', 'Courses that improve automatically'],
      color: TEAL,
      colorDim: TEAL_DIM,
      colorBorder: TEAL_BORDER,
    },
    {
      num: '02',
      problem: 'The gradebook is a spreadsheet with pretensions.',
      solution: 'Forge closes the loop.',
      detail: 'Legacy LMS gradebooks record what happened. Forge predicts what\'s about to happen — flags the student trending toward a D in week 4, not week 14. Grades become a live signal, not a lagging report card.',
      versus: ['Manual rubric application', 'Grades discovered at the end', 'Integrity flagged by vendors, not context'],
      wins:   ['Agentic grading with rubric citations', '8-week grade trajectory forecasting', 'Integrity analysis with style-drift detection'],
      color: '#A78BFA',
      colorDim: 'rgba(167,139,250,0.10)',
      colorBorder: 'rgba(167,139,250,0.22)',
    },
    {
      num: '03',
      problem: 'When a great professor leaves, everything leaves.',
      solution: 'Forge is institutional memory.',
      detail: 'Every great instructor has a playbook — the way they explain late work, the discussion prompts that spark real debate, the rubric language students actually understand. Today it disappears when they retire. Forge vaults it, transfers it, and compounds it.',
      versus: ['Knowledge exits with the professor', 'Every section rebuilt from zero', 'Zero cross-course student insight'],
      wins:   ['Faculty DNA captured and transferable', 'Program-level analytics across all courses', 'Student risk visible institution-wide'],
      color: GOLD,
      colorDim: 'rgba(100,116,139,0.10)',
      colorBorder: 'rgba(100,116,139,0.22)',
    },
  ];

  return (
    <section className="py-28 px-6 border-t border-molted-border relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 0% 50%, rgba(37,99,235,0.04) 0%, transparent 50%)' }} />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-5"
            style={{ background: TEAL_DIM, color: TEAL, border: `1px solid ${TEAL_BORDER}` }}
          >
            <Zap size={10} />
            Why legacy LMS loses
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight mb-4">
            Three reasons they're<br />
            <span style={{ color: TEAL }}>already obsolete.</span>
          </h2>
          <p className="text-molted-muted text-base leading-relaxed">
            Legacy LMS platforms have three structural weaknesses they can't patch.
            Forge was designed around all three.
          </p>
        </div>

        {/* Pillars */}
        <div className="space-y-6">
          {pillars.map((p) => (
            <div
              key={p.num}
              className="rounded-3xl border overflow-hidden"
              style={{ background: 'rgba(241,243,248,0.85)', borderColor: 'rgba(0,0,0,0.06)' }}
            >
              {/* Top bar */}
              <div
                className="px-8 py-5 border-b flex flex-wrap items-center gap-4"
                style={{ background: p.colorDim, borderColor: p.colorBorder }}
              >
                <span className="text-5xl font-black opacity-20" style={{ color: p.color }}>{p.num}</span>
                <div>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: p.color }}>The problem</p>
                  <p className="text-lg font-black" style={{ color: '#1C1C1E' }}>{p.problem}</p>
                </div>
                <div className="ml-auto hidden md:block">
                  <p className="text-xs font-semibold mb-0.5 text-right" style={{ color: p.color }}>The fix</p>
                  <p className="text-lg font-black text-right" style={{ color: p.color }}>{p.solution}</p>
                </div>
              </div>

              {/* Body */}
              <div className="px-8 py-7 grid md:grid-cols-[1fr_auto_1fr] gap-8 items-start">
                {/* Detail */}
                <p className="text-sm leading-relaxed" style={{ color: '#86868B' }}>{p.detail}</p>

                {/* Divider arrow */}
                <div className="hidden md:flex items-center justify-center">
                  <ChevronRight size={20} style={{ color: p.color, opacity: 0.5 }} />
                </div>

                {/* Versus */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs font-bold mb-2" style={{ color: '#3A3A40' }}>Legacy LMS</p>
                    <div className="space-y-1.5">
                      {p.versus.map((v, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-xs mt-0.5" style={{ color: '#3A3A40' }}>✕</span>
                          <span className="text-xs leading-snug" style={{ color: '#586068' }}>{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold mb-2" style={{ color: p.color }}>Forge</p>
                    <div className="space-y-1.5">
                      {p.wins.map((w, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-xs mt-0.5" style={{ color: p.color }}>✓</span>
                          <span className="text-xs leading-snug" style={{ color: '#C7C7CC' }}>{w}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Coming Soon ───────────────────────────────────────────────────────── */
function ComingSoon() {
  const pillars = [
    {
      label: 'Content Layer',
      color: TEAL,
      colorDim: TEAL_DIM,
      colorBorder: TEAL_BORDER,
      items: [
        { icon: BrainCircuit, name: 'Adaptive Learning Paths', desc: 'Different content sequence per student based on real-time mastery signals.' },
        { icon: FlaskConical, name: 'Assignment Generator', desc: 'Describe a learning objective — get 5 assignments with rubrics, mapped to your accreditation standards.' },
        { icon: Sparkles,     name: 'Zero-Setup Semester Clone', desc: 'Import last semester → Forge updates all dates, refreshes stale examples, flags outdated citations.' },
        { icon: Bot,          name: 'Student AI Tutor', desc: 'Answers questions using only your course materials. Escalates to you when it can\'t. Office hours at 2 AM.' },
      ],
    },
    {
      label: 'Gradebook Layer',
      color: '#A78BFA',
      colorDim: 'rgba(167,139,250,0.10)',
      colorBorder: 'rgba(167,139,250,0.22)',
      items: [
        { icon: FileCheck,  name: 'Accreditation Autopilot', desc: 'Every assignment auto-tagged to HLC/SACSCOC/program outcomes. Evidence portfolio built continuously.' },
        { icon: Users,      name: 'Peer Review Intelligence', desc: 'Calibrates peer scores against your rubric. Flags outlier reviewers before grades land.' },
        { icon: Shield,     name: 'Academic Integrity Shield', desc: 'Writing style drift over time, cross-cohort pattern matching — evidence, not just a score.' },
        { icon: PieChart,   name: 'Financial Aid Early Flag', desc: 'Surfaces students approaching SAP thresholds weeks before the registrar does.' },
      ],
    },
    {
      label: 'Institutional Memory',
      color: GOLD,
      colorDim: 'rgba(100,116,139,0.10)',
      colorBorder: 'rgba(100,116,139,0.22)',
      items: [
        { icon: Database,      name: 'Faculty DNA Vault', desc: 'Capture grading philosophy, FAQ banks, discussion style. Course survives faculty turnover.' },
        { icon: BarChart3,     name: 'Semester Intelligence', desc: '"Week 6 causes grade dips in this course every year. Here\'s what worked last time."' },
        { icon: GraduationCap, name: 'Program-Level Dashboard', desc: 'How is Student X performing across all 5 courses this semester? Which departments are bleeding retention?' },
        { icon: UserCog,       name: 'Success Prediction', desc: '8-week-out final grade forecast with specific intervention paths — not just a warning.' },
      ],
    },
  ];

  return (
    <section className="py-28 px-6 border-t border-molted-border relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.04) 0%, transparent 60%)' }} />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-5"
            style={{ background: 'rgba(0,0,0,0.05)', color: '#86868B', border: '1px solid rgba(0,0,0,0.07)' }}
          >
            <Lock size={10} />
            What's coming next
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight mb-4">
            The full extinction event.<br />
            <span style={{ color: TEAL }}>In three layers.</span>
          </h2>
          <p className="text-molted-muted text-base max-w-xl mx-auto leading-relaxed">
            The five tools above reclaim your time. What's below replaces the LMS entirely with an ALP —
            starting with the Student AI Tutor, shipping next.
          </p>
        </div>

        {/* Pillars */}
        <div className="space-y-10">
          {pillars.map(pillar => (
            <div key={pillar.label}>
              {/* Pillar label */}
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px flex-1" style={{ background: 'rgba(0,0,0,0.06)' }} />
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: pillar.colorDim, color: pillar.color, border: `1px solid ${pillar.colorBorder}` }}
                >
                  {pillar.label}
                </span>
                <div className="h-px flex-1" style={{ background: 'rgba(0,0,0,0.06)' }} />
              </div>

              {/* Feature cards grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {pillar.items.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-5 border relative group"
                    style={{
                      background: 'rgba(241,243,248,0.85)',
                      borderColor: 'rgba(0,0,0,0.06)',
                    }}
                  >
                    {/* Coming soon badge */}
                    <div
                      className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{ background: 'rgba(0,0,0,0.05)', color: '#3A3A40', border: '1px solid rgba(0,0,0,0.06)' }}
                    >
                      <Lock size={8} />
                      Soon
                    </div>

                    {/* Icon */}
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: pillar.colorDim }}
                    >
                      <item.icon size={16} style={{ color: pillar.color }} />
                    </div>

                    <p className="text-sm font-bold mb-1.5" style={{ color: '#1C1C1E' }}>{item.name}</p>
                    <p className="text-xs leading-relaxed" style={{ color: '#86868B' }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Early access nudge */}
        <div className="mt-14 text-center">
          <p className="text-molted-muted text-sm mb-4">
            Early access subscribers get first access to each tool as it ships.
          </p>
          <a
            href="mailto:greg.lucas@paigebreaker.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:-translate-y-px"
            style={{ background: TEAL, color: '#ffffff' }}
          >
            Get early access
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Agent Loop ────────────────────────────────────────────────────────── */
function AgentLoop() {
  const steps = [
    {
      num: '01',
      label: 'Student posts',
      detail: 'Student types a question or reply in Canvas, Blackboard, or D2L.',
      color: TEAL,
    },
    {
      num: '02',
      label: 'Agent detects it instantly',
      detail: 'Forge detects the activity instantly via the platform\'s real-time event layer — no refresh, no polling.',
      color: TEAL,
    },
    {
      num: '03',
      label: 'Claude evaluates context',
      detail: 'The agent fetches course objectives and the student\'s history, then decides: respond, flag, or skip.',
      color: TEAL,
    },
    {
      num: '04',
      label: 'Reply appears in real time',
      detail: 'If the student is still on the page, the answer appears in the thread before they can even tab away.',
      color: TEAL,
    },
  ];

  return (
    <section className="py-28 px-6 border-t border-molted-border relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.04) 0%, transparent 65%)' }}
      />
      <div className="max-w-5xl mx-auto relative z-10">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">How the agent works</p>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            Zero seconds between<br />
            <span style={{ color: TEAL }}>question and answer.</span>
          </h2>
          <p className="mt-6 text-molted-muted text-lg max-w-xl mx-auto">
            Not a chatbot students have to open. An agent that finds them — in the thread,
            while they're still there.
          </p>
        </RevealBlock>

        {/* Flow steps */}
        <div className="relative">
          {/* Connecting line */}
          <div
            className="absolute left-7 top-8 bottom-8 w-px hidden md:block"
            style={{ background: `linear-gradient(to bottom, ${TEAL}, rgba(37,99,235,0.1))` }}
          />

          <div className="space-y-6">
            {steps.map((step, i) => (
              <RevealBlock key={i} delay={i * 100}>
                <div className="flex items-start gap-6 pl-0 md:pl-0">
                  {/* Node */}
                  <div
                    className="w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center font-black text-sm relative z-10"
                    style={{ background: `${TEAL}15`, border: `1px solid ${TEAL_BORDER}`, color: TEAL }}
                  >
                    {step.num}
                  </div>
                  {/* Content */}
                  <div
                    className="flex-1 rounded-2xl p-6 border"
                    style={{ background: 'rgba(241,243,248,0.85)', borderColor: 'rgba(0,0,0,0.06)' }}
                  >
                    <p className="text-molted-white font-bold text-lg mb-1">{step.label}</p>
                    <p className="text-molted-muted text-sm leading-relaxed">{step.detail}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>

        {/* No integration callout */}
        <RevealBlock delay={500} className="mt-12">
          <div
            className="rounded-2xl p-6 border text-center"
            style={{ background: `${TEAL}08`, borderColor: TEAL_BORDER }}
          >
            <p className="text-molted-white font-bold text-lg mb-2">
              Native to Outpost. No API. No IT project.
            </p>
            <p className="text-molted-muted text-sm max-w-lg mx-auto">
              Forge is a built-in module of the Outpost ALP — not an add-on, not an integration. It ships with the platform.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {['Canvas', 'Blackboard', 'D2L Brightspace', 'Moodle', 'Any web LMS'].map((lms) => (
                <span
                  key={lms}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                  style={{ background: 'rgba(37,99,235,0.08)', border: `1px solid ${TEAL_BORDER}`, color: TEAL }}
                >
                  {lms}
                </span>
              ))}
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── The Agentic Future ────────────────────────────────────────────────── */
function AgenticFuture() {
  const milestones = [
    {
      phase: 'Today',
      title: 'AI acts.',
      items: ['Watches every discussion board in real time', 'Responds to student questions while they\'re still on the page', 'Grades with your rubric autonomously', 'Flags at-risk students before advisors know'],
      live: true,
    },
    {
      phase: 'Next',
      title: 'AI runs the course.',
      items: ['Submits grades to the LMS directly', 'Sends personalized student check-ins', 'Holds office hours in your absence', 'Builds next semester from this one'],
      live: false,
    },
    {
      phase: 'Future',
      title: 'AI teaches.',
      items: ['Real-time adaptive lesson adjustment', 'Every student on a personalized learning path', 'AI TA holds office hours in your absence', 'You set the vision — Forge runs the system'],
      live: false,
    },
  ];

  return (
    <section className="py-28 px-6 border-t border-molted-border relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.04) 0%, transparent 60%)' }}
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">The agentic roadmap</p>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            We are building toward<br />
            <span style={{ color: TEAL }}>full teaching autonomy.</span>
          </h2>
          <p className="mt-6 text-molted-muted text-lg max-w-2xl mx-auto">
            Not a chatbot. Not a dashboard. A system that runs your course —
            the way you would run it, at a scale no human could match.
          </p>
        </RevealBlock>

        <div className="grid md:grid-cols-3 gap-6">
          {milestones.map((m, i) => (
            <RevealBlock key={i} delay={i * 120}>
              <div
                className="rounded-2xl p-7 h-full border transition-all duration-300"
                style={{
                  background: m.live ? `${TEAL}08` : 'rgba(241,243,248,0.85)',
                  borderColor: m.live ? TEAL_BORDER : 'rgba(0,0,0,0.06)',
                  boxShadow: m.live ? TEAL_GLOW : 'none',
                }}
              >
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{
                      background: m.live ? TEAL_DIM : 'rgba(0,0,0,0.05)',
                      color: m.live ? TEAL : '#86868B',
                      border: `1px solid ${m.live ? TEAL_BORDER : 'rgba(0,0,0,0.07)'}`,
                    }}
                  >
                    {m.phase}
                  </span>
                  {m.live && (
                    <div className="flex items-center gap-1.5 text-xs" style={{ color: TEAL }}>
                      <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: TEAL }} />
                      Shipping
                    </div>
                  )}
                </div>

                <h3
                  className="text-2xl font-black mb-5 tracking-tight"
                  style={{ color: m.live ? TEAL : '#1C1C1E' }}
                >
                  {m.title}
                </h3>

                <ul className="space-y-3">
                  {m.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-molted-muted">
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                        style={{ background: m.live ? TEAL : '#3A3A40' }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          ))}
        </div>

        <RevealBlock delay={400} className="mt-12 text-center">
          <p className="text-molted-muted text-base max-w-2xl mx-auto">
            "The best teacher in the world can only be in one classroom at a time.
            Forge removes that ceiling — permanently."
          </p>
          <p className="mt-3 text-molted-subtle text-sm">— Molt</p>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── How It Works ──────────────────────────────────────────────────────── */
/* ── Faculty Voice ──────────────────────────────────────────────────────── */
function FacultyVoice() {
  const voiceInputs = [
    {
      icon: GraduationCap,
      label: 'Your background',
      example: '"15 years in trauma nursing before teaching. I have seen what happens when students aren\'t prepared."',
      why: 'Forge grounds every response in real-world authority — not textbook authority.',
    },
    {
      icon: Sparkles,
      label: 'Your passion',
      example: '"I love when students connect theory to what\'s happening in the world right now. That click is everything."',
      why: 'Replies reflect genuine enthusiasm — students feel the care, not the algorithm.',
    },
    {
      icon: BrainCircuit,
      label: 'Your teaching style',
      example: '"I push students with Socratic questions. I rarely give the answer directly — I guide them there."',
      why: 'Forge asks follow-up questions the same way you would, not the way a chatbot would.',
    },
    {
      icon: UserCog,
      label: 'Your hobbies & life',
      example: '"I coach my kid\'s soccer team. I use game-film breakdowns as metaphors constantly."',
      why: 'The small personal details are what make a reply feel human. Students notice.',
    },
  ];

  return (
    <section className="py-28 px-6 border-t border-molted-border relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 40% 50%, rgba(37,99,235,0.04) 0%, transparent 65%)' }} />
      <div className="max-w-5xl mx-auto relative z-10">
        <RevealBlock className="text-center mb-6">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: TEAL }}>
            Faculty in the loop
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white leading-tight tracking-tight">
            The agent learns your voice.
          </h2>
          <p className="text-3xl md:text-4xl font-black leading-tight tracking-tight mt-2"
            style={{ color: 'rgba(15,23,42,0.35)' }}>
            Students never lose you.
          </p>
        </RevealBlock>

        <RevealBlock delay={100} className="text-center mb-16">
          <p className="text-molted-muted text-lg leading-relaxed max-w-2xl mx-auto">
            Forge doesn't replace you. It studies you. Every discussion reply, every intervention, every check-in is written in your voice — shaped by your background, your passions, and the way you actually teach. The instructor is still the soul of this.
          </p>
        </RevealBlock>

        <div className="grid md:grid-cols-2 gap-5 mb-14">
          {voiceInputs.map((item, i) => {
            const Icon = item.icon;
            return (
              <RevealBlock key={i} delay={i * 80}>
                <div
                  className="rounded-2xl border p-6 h-full"
                  style={{ background: 'rgba(241,243,248,0.90)', borderColor: TEAL_BORDER }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: TEAL_DIM }}>
                      <Icon size={16} style={{ color: TEAL }} />
                    </div>
                    <p className="text-molted-white font-bold text-sm">{item.label}</p>
                  </div>
                  <div
                    className="rounded-xl px-4 py-3 mb-4 text-xs leading-relaxed italic"
                    style={{ background: 'rgba(37,99,235,0.06)', borderLeft: `2px solid ${TEAL}`, color: '#A0A0B0' }}
                  >
                    {item.example}
                  </div>
                  <p className="text-molted-subtle text-xs leading-relaxed">{item.why}</p>
                </div>
              </RevealBlock>
            );
          })}
        </div>

        <RevealBlock delay={200}>
          <div
            className="rounded-2xl border p-8 md:p-10 text-center"
            style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.05) 0%, rgba(241,243,248,0.95) 100%)', borderColor: TEAL_BORDER, boxShadow: TEAL_GLOW }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: TEAL }}>
              The rule
            </p>
            <p className="text-2xl md:text-3xl font-black text-molted-white leading-snug mb-4">
              Nothing leaves without your approval.
            </p>
            <p className="text-molted-muted text-base leading-relaxed max-w-xl mx-auto">
              Every discussion reply, every early-warning message, every graded response is surfaced to you first. You review. You approve. You can edit one word or rewrite from scratch. The agent does the first draft in your voice — you make the call.
            </p>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Connect your course.',
      desc: 'Forge is already inside Outpost. Set up your course in minutes — no credentials, no IT approval, no installation.',
      icon: Layers,
    },
    {
      num: '02',
      title: 'Upload your syllabus.',
      desc: 'Drop your syllabus and Forge extracts your learning objectives, schedule, policies, and communication style. You configure once. It runs forever.',
      icon: UploadCloud,
    },
    {
      num: '03',
      title: 'Tell Forge who you are.',
      desc: 'Share your background, your passion for the subject, your hobbies, your teaching philosophy. The more you share, the more every agent response sounds like you — not a chatbot.',
      icon: UserCog,
    },
    {
      num: '04',
      title: 'Review. Approve. Done.',
      desc: 'Everything Forge does gets surfaced for your review before it goes live. You stay in control. The agent does the work — in your voice.',
      icon: CheckSquare,
    },
  ];

  return (
    <section className="py-28 px-6 border-t border-molted-border">
      <div className="max-w-5xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Setup</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            Live in one afternoon.
          </h2>
        </RevealBlock>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <RevealBlock key={i} delay={i * 120}>
                <div className="relative">
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-px"
                      style={{ background: `linear-gradient(90deg, ${TEAL_BORDER}, transparent)`, zIndex: 0 }}
                    />
                  )}
                  <div className="relative z-10">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                      style={{ background: TEAL_DIM, border: `1px solid ${TEAL_BORDER}` }}
                    >
                      <Icon size={22} style={{ color: TEAL }} />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: TEAL }}>
                      Step {step.num}
                    </p>
                    <h3 className="text-xl font-black text-molted-white mb-3">{step.title}</h3>
                    <p className="text-molted-muted text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </RevealBlock>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── LMS Integrations ──────────────────────────────────────────────────── */
function Integrations() {
  const lms = ['Canvas', 'Blackboard', 'D2L Brightspace', 'Moodle', 'Google Classroom', 'Microsoft Teams EDU'];

  return (
    <section className="py-16 px-6 border-t border-molted-border">
      <div className="max-w-4xl mx-auto text-center">
        <RevealBlock>
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-8">Works with every major LMS</p>
          <div className="flex flex-wrap justify-center gap-3">
            {lms.map((name, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full text-sm font-medium text-molted-muted border border-molted-border"
              >
                {name}
              </span>
            ))}
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Stats ─────────────────────────────────────────────────────────────── */
function TeachStats() {
  const stats = [
    { value: '23h', label: 'Admin hours reclaimed per week', icon: Clock },
    { value: '80%', label: 'Student emails handled automatically', icon: MessageSquare },
    { value: '4 min', label: 'Average time to grade 24 essays', icon: CheckSquare },
    { value: '100%', label: 'Personalized feedback, every student', icon: Users },
  ];

  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-molted-white tracking-tight">
            The numbers.
          </h2>
        </RevealBlock>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <RevealBlock key={i} delay={i * 80}>
                <div
                  className="rounded-2xl p-6 text-center border hover:scale-[1.02] transition-transform"
                  style={{
                    background: 'rgba(241,243,248,0.85)',
                    borderColor: 'rgba(0,0,0,0.06)',
                  }}
                >
                  <Icon size={22} className="mx-auto mb-4" style={{ color: TEAL }} />
                  <p className="text-4xl font-black text-molted-white">{s.value}</p>
                  <p className="text-molted-muted text-xs mt-2 leading-snug">{s.label}</p>
                </div>
              </RevealBlock>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Pricing Teaser ────────────────────────────────────────────────────── */
function PricingTeaser() {
  const tiers = [
    {
      name: 'Faculty',
      price: '$29',
      period: '/mo per instructor',
      desc: 'For individual faculty members ready to reclaim their time.',
      features: ['Discussion Intelligence', 'Course Architect', 'Auto-Respond (100 msg/mo)', 'Early Warning alerts'],
      cta: 'Start Free Trial',
      highlight: false,
    },
    {
      name: 'Department',
      price: '$199',
      period: '/mo per department',
      desc: 'For departments deploying Forge across multiple courses.',
      features: ['Everything in Faculty', 'Agentic Grader', 'Unlimited Auto-Respond', 'LMS deep integration', 'Priority support'],
      cta: 'Request Demo',
      highlight: true,
    },
    {
      name: 'Institution',
      price: 'Custom',
      period: 'institutional license',
      desc: 'For universities deploying Forge at scale across all colleges.',
      features: ['Everything in Department', 'Full agentic mode (coming soon)', 'Custom LMS integration', 'Dedicated success team', 'SLA + compliance'],
      cta: 'Talk to Sales',
      highlight: false,
    },
  ];

  return (
    <section className="py-28 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Pricing</p>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            Every level.<br />
            <span style={{ color: TEAL }}>Every institution.</span>
          </h2>
        </RevealBlock>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <RevealBlock key={i} delay={i * 100}>
              <div
                className="rounded-2xl p-7 h-full flex flex-col border transition-all duration-300"
                style={{
                  background: tier.highlight ? `${TEAL}0A` : 'rgba(241,243,248,0.85)',
                  borderColor: tier.highlight ? TEAL_BORDER : 'rgba(0,0,0,0.06)',
                  boxShadow: tier.highlight ? TEAL_GLOW : 'none',
                }}
              >
                <div className="mb-6">
                  <p className="text-molted-muted text-sm font-semibold mb-1">{tier.name}</p>
                  <p className="text-4xl font-black text-molted-white">{tier.price}</p>
                  <p className="text-molted-muted text-sm">{tier.period}</p>
                  <p className="mt-3 text-molted-muted/80 text-sm leading-relaxed">{tier.desc}</p>
                </div>

                <ul className="space-y-2.5 flex-1 mb-7">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-sm text-molted-muted">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: TEAL }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="mailto:greg.lucas@paigebreaker.com"
                  className="block text-center px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-px"
                  style={{
                    background: tier.highlight ? TEAL : 'rgba(0,0,0,0.06)',
                    color: tier.highlight ? '#000000' : '#1C1C1E',
                    border: tier.highlight ? 'none' : '1px solid rgba(0,0,0,0.07)',
                  }}
                >
                  {tier.cta}
                </a>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA ───────────────────────────────────────────────────────────────── */
function CTA() {
  return (
    <section className="py-32 px-6 border-t border-molted-border relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(37,99,235,0.06) 0%, transparent 60%)' }}
      />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <RevealBlock>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            Stop administrating.<br />
            <span style={{ color: TEAL }}>Start teaching.</span>
          </h2>
          <p className="mt-6 text-molted-muted text-lg leading-relaxed">
            Forge is accepting early access partners.<br />
            Be among the first faculty to get 23 hours back every week.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:greg.lucas@paigebreaker.com"
              className="group flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:-translate-y-px text-molted-black"
              style={{ background: TEAL }}
            >
              Request Early Access
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              to="/"
              className="px-8 py-4 rounded-xl border border-molted-border text-molted-muted hover:text-molted-white hover:border-molted-subtle font-semibold transition-all"
            >
              See All Products
            </Link>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────── */
export default function MoltedForge() {
  return (
    <MoltedLayout>
      <OutpostBanner moduleName="Forge" moduleColor="#2563EB" />
      <Hero />
      <TheProblem />
      <CoreTools />
      <AgentLoop />
      <FacultyVoice />
      <ComingSoon />
      <LMSKiller />
      <AgenticFuture />
      <HowItWorks />
      <Integrations />
      <TeachStats />
      <PricingTeaser />
      <CTA />
    </MoltedLayout>
  );
}
