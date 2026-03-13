import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, BookOpen, MessageSquare, CheckSquare, Zap,
  UploadCloud, Bell, Users, TrendingUp, Shield, Clock,
  ChevronRight, Play, Layers, Bot, Cpu, BarChart3,
} from 'lucide-react';
import MoltedLayout from './MoltedLayout';

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

/* ── TeachOS accent color ──────────────────────────────────────────────── */
const TEAL = '#2DD4BF';
const TEAL_DIM = 'rgba(45,212,191,0.15)';
const TEAL_BORDER = 'rgba(45,212,191,0.25)';
const TEAL_GLOW = '0 0 30px rgba(45,212,191,0.15), 0 0 60px rgba(45,212,191,0.07)';

/* ── Hero ──────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(45,212,191,0.07) 0%, transparent 70%)' }}
        />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(232,160,32,0.05) 0%, transparent 70%)' }}
        />
      </div>

      {/* Product label */}
      <RevealBlock className="mb-8">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase"
          style={{ background: TEAL_DIM, border: `1px solid ${TEAL_BORDER}`, color: TEAL }}
        >
          <Cpu size={12} />
          Product 03 · MoltED Ai
        </div>
      </RevealBlock>

      {/* Wordmark */}
      <RevealBlock delay={100}>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight">
          <span className="text-molted-white/90">Teach</span>
          <span style={{ color: TEAL, textShadow: `0 0 40px rgba(45,212,191,0.4), 0 0 80px rgba(45,212,191,0.15)` }}>OS</span>
        </h1>
      </RevealBlock>

      {/* Tagline */}
      <RevealBlock delay={200}>
        <p className="mt-8 text-2xl md:text-3xl font-black text-molted-white/80 tracking-tight max-w-2xl leading-snug">
          The AI operating system<br />
          <span className="text-molted-muted font-medium text-xl md:text-2xl">for every faculty member on earth.</span>
        </p>
      </RevealBlock>

      {/* Sub */}
      <RevealBlock delay={300}>
        <p className="mt-6 text-molted-muted text-lg max-w-lg leading-relaxed">
          TeachOS handles your course administration, grading, student communication,
          and early intervention — so you can spend every hour doing the one thing
          AI never will: actually teaching.
        </p>
      </RevealBlock>

      {/* CTAs */}
      <RevealBlock delay={400} className="mt-10 flex flex-col sm:flex-row items-center gap-4">
        <a
          href="mailto:hello@molted.ai"
          className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-molted-black font-bold transition-all duration-200 hover:-translate-y-px"
          style={{ background: TEAL }}
        >
          Request Early Access
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </a>
        <Link
          to="/molted"
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
          style={{ background: 'rgba(10,10,15,0.8)', borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <Clock size={14} className="text-molted-muted" />
          <p className="text-molted-muted text-sm">
            The average professor spends{' '}
            <span className="text-molted-white font-semibold">23 hours/week</span>
            {' '}on tasks TeachOS handles automatically.
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
            TeachOS automates all of it.{' '}
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
      'TeachOS reads your entire discussion board, identifies the quality of student reasoning, flags misconceptions, and drafts pedagogically-sound response suggestions — sorted by urgency and depth. You review. You click post.',
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
      'Drop your syllabus into TeachOS. It reads your learning objectives, your schedule, your topics — and builds your entire semester infrastructure: week-by-week announcements, module introductions, student FAQs, and reminder sequences. All in your voice.',
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
      'Upload your rubric once. TeachOS reads every submission against it, writes individualized feedback for each student citing their specific work, assigns scores with justification, and flags any academic integrity signals. You review in minutes, not hours.',
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
      'Set your policies once. TeachOS learns what you always say about deadlines, extensions, exam format, office hours, and grading. When students ask, it answers in your voice — 24/7. Complex academic questions are flagged for your personal attention.',
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
      'TeachOS monitors engagement signals across your entire roster — login frequency, submission timing, discussion participation, grade trajectory. When a student\'s pattern changes, you know within hours, not at the end of the semester.',
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
                background: p.flag ? 'rgba(232,23,15,0.1)' : `${TEAL_DIM}`,
                color: p.flag ? '#FF3D35' : TEAL,
                border: `1px solid ${p.flag ? 'rgba(232,23,15,0.2)' : TEAL_BORDER}`,
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
                  background: item.status === 'Generated' ? TEAL_DIM : 'rgba(232,160,32,0.1)',
                  color: item.status === 'Generated' ? TEAL : '#E8A020',
                  border: `1px solid ${item.status === 'Generated' ? TEAL_BORDER : 'rgba(232,160,32,0.2)'}`,
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
            { name: 'Jordan M.', score: '78/100', tag: 'Lacks textual evidence in sections 2–3', color: '#E8A020' },
            { name: 'Casey T.', score: '61/100', tag: 'Similarity to source material — flagged', color: '#E8170F' },
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
                style={{ background: c.auto ? TEAL_DIM : 'rgba(232,160,32,0.15)' }}
              >
                <Bot size={10} style={{ color: c.auto ? TEAL : '#E8A020' }} />
              </div>
              <p className="text-xs leading-relaxed" style={{ color: c.auto ? '#F5F5F7' : '#86868B' }}>{c.a}</p>
            </div>
            <div className="flex justify-end">
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{
                  background: c.auto ? TEAL_DIM : 'rgba(232,160,32,0.1)',
                  color: c.auto ? TEAL : '#E8A020',
                  border: `1px solid ${c.auto ? TEAL_BORDER : 'rgba(232,160,32,0.2)'}`,
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
          { name: 'Marcus T.', signal: 'No login in 5 days · Essay 2 not submitted', risk: 'High', color: '#E8170F' },
          { name: 'Priya S.', signal: 'Grade drop: A→C over 3 weeks', risk: 'Medium', color: '#E8A020' },
          { name: 'Alex W.', signal: 'Last 4 discussions: 0 participation', risk: 'Medium', color: '#E8A020' },
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
      <div className="mt-3 p-3 rounded-xl text-xs" style={{ background: 'rgba(232,23,15,0.08)', border: '1px solid rgba(232,23,15,0.15)', color: '#FF3D35' }}>
        ✦ Personalized check-in drafts ready for Marcus, Priya, and Alex
      </div>
    </div>
  );
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
                    border: `1px solid ${isActive ? TEAL_BORDER : 'rgba(255,255,255,0.06)'}`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: isActive ? `${TEAL}20` : 'rgba(255,255,255,0.05)' }}
                    >
                      <Icon size={15} style={{ color: isActive ? TEAL : '#86868B' }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: isActive ? '#F5F5F7' : '#86868B' }}>
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
              style={{ background: 'rgba(17,17,24,0.8)', borderColor: 'rgba(255,255,255,0.06)' }}
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

            {/* Try it link for Discussion Intelligence */}
            {active.visual === 'discussion' && (
              <Link
                to="/molted/teachos/discussion"
                className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:-translate-y-px"
                style={{ background: TEAL_DIM, color: TEAL, border: `1px solid ${TEAL_BORDER}` }}
              >
                <Play size={14} />
                Try Discussion Intelligence — paste any thread
                <ArrowRight size={14} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── The Agentic Future ────────────────────────────────────────────────── */
function AgenticFuture() {
  const milestones = [
    {
      phase: 'Today',
      title: 'AI assists.',
      items: ['Draft discussion responses', 'Grade with your rubric', 'Answer routine questions', 'Surface at-risk students'],
      live: true,
    },
    {
      phase: 'Next',
      title: 'AI acts.',
      items: ['Post approved responses autonomously', 'Submit grades to the LMS directly', 'Send personalized student check-ins', 'Build next semester from this one'],
      live: false,
    },
    {
      phase: 'Future',
      title: 'AI teaches.',
      items: ['Real-time adaptive lesson adjustment', 'Every student on a personalized learning path', 'AI TA holds office hours in your absence', 'You set the vision — TeachOS runs the system'],
      live: false,
    },
  ];

  return (
    <section className="py-28 px-6 border-t border-molted-border relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(45,212,191,0.04) 0%, transparent 60%)' }}
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
                  background: m.live ? `${TEAL}08` : 'rgba(17,17,24,0.6)',
                  borderColor: m.live ? TEAL_BORDER : 'rgba(255,255,255,0.06)',
                  boxShadow: m.live ? TEAL_GLOW : 'none',
                }}
              >
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{
                      background: m.live ? TEAL_DIM : 'rgba(255,255,255,0.05)',
                      color: m.live ? TEAL : '#86868B',
                      border: `1px solid ${m.live ? TEAL_BORDER : 'rgba(255,255,255,0.08)'}`,
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
                  style={{ color: m.live ? TEAL : '#F5F5F7' }}
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
            TeachOS removes that ceiling — permanently."
          </p>
          <p className="mt-3 text-molted-subtle text-sm">— MoltED Ai</p>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── How It Works ──────────────────────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Connect your LMS.',
      desc: 'TeachOS integrates with Canvas, Blackboard, D2L, and Moodle. Your courses, students, submissions, and gradebook — synced in minutes.',
      icon: Layers,
    },
    {
      num: '02',
      title: 'Upload your syllabus.',
      desc: 'Drop your syllabus and TeachOS extracts your learning objectives, schedule, policies, and voice. You configure once. It runs forever.',
      icon: UploadCloud,
    },
    {
      num: '03',
      title: 'Review. Approve. Done.',
      desc: 'Everything TeachOS does gets surfaced for your review before it goes live. You stay in control. It does the heavy lifting.',
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

        <div className="grid md:grid-cols-3 gap-8">
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
                    background: 'rgba(17,17,24,0.6)',
                    borderColor: 'rgba(255,255,255,0.06)',
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
      desc: 'For departments deploying TeachOS across multiple courses.',
      features: ['Everything in Faculty', 'Agentic Grader', 'Unlimited Auto-Respond', 'LMS deep integration', 'Priority support'],
      cta: 'Request Demo',
      highlight: true,
    },
    {
      name: 'Institution',
      price: 'Custom',
      period: 'institutional license',
      desc: 'For universities deploying TeachOS at scale across all colleges.',
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
                  background: tier.highlight ? `${TEAL}0A` : 'rgba(17,17,24,0.6)',
                  borderColor: tier.highlight ? TEAL_BORDER : 'rgba(255,255,255,0.06)',
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
                  href="mailto:hello@molted.ai"
                  className="block text-center px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-px"
                  style={{
                    background: tier.highlight ? TEAL : 'rgba(255,255,255,0.06)',
                    color: tier.highlight ? '#000000' : '#F5F5F7',
                    border: tier.highlight ? 'none' : '1px solid rgba(255,255,255,0.08)',
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
        style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(45,212,191,0.06) 0%, transparent 60%)' }}
      />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <RevealBlock>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            Stop administrating.<br />
            <span style={{ color: TEAL }}>Start teaching.</span>
          </h2>
          <p className="mt-6 text-molted-muted text-lg leading-relaxed">
            TeachOS is accepting early access partners.<br />
            Be among the first faculty to get 23 hours back every week.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:hello@molted.ai"
              className="group flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:-translate-y-px text-molted-black"
              style={{ background: TEAL }}
            >
              Request Early Access
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              to="/molted"
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
export default function MoltedTeachOS() {
  return (
    <MoltedLayout>
      <Hero />
      <TheProblem />
      <CoreTools />
      <AgenticFuture />
      <HowItWorks />
      <Integrations />
      <TeachStats />
      <PricingTeaser />
      <CTA />
    </MoltedLayout>
  );
}
