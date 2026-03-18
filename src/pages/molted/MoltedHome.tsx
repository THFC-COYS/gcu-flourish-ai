import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Bot, BookOpen, BarChart3, Users, Zap, MessageSquare, AlertTriangle } from 'lucide-react';
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
    <div ref={ref} className={`opacity-0 translate-y-8 transition-all duration-700 ease-out ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ── Agent Feed ─────────────────────────────────────────────────────────── */
const FEED_EVENTS = [
  { time: '11:47 PM', event: 'Student posts confusion about cognitive load theory', action: 'Discussion agent replies in 4 seconds', role: 'Student', href: '/forge/discussion' },
  { time: '8:12 AM',  event: 'Professor uploads syllabus for NURS 301', action: 'Course architect generates full semester infrastructure', role: 'Faculty', href: '/forge/course-architect' },
  { time: '2:03 AM',  event: 'Marcus T. hasn\'t logged in for 5 days', action: 'Early warning flags risk — personalized check-in drafted', role: 'Admin', href: '/forge/early-warning' },
  { time: '9:30 AM',  event: 'Student opens Week 4 reading on pharmacology', action: 'Lumen activates — answers in context as they read', role: 'Student', href: '/lumen' },
  { time: '3:14 PM',  event: 'Student replies to discussion forum on ethics in healthcare', action: 'Agent acknowledges their insight and deepens the thread', role: 'Student', href: '/forge/discussion' },
  { time: '6:55 AM',  event: 'Auto-respond queue: 14 unanswered student emails', action: 'Auto-respond drafts replies — faculty reviews in 2 minutes', role: 'Faculty', href: '/forge/auto-respond' },
  { time: '1:22 AM',  event: 'Doctoral student stuck on methodology chapter', action: 'Agentic grader reviews draft and returns structured feedback', role: 'Student', href: '/forge/agentic-grader' },
];

function AgentFeed() {
  const [visibleEvents, setVisibleEvents] = useState(FEED_EVENTS.slice(0, 4));
  const [nextIndex, setNextIndex] = useState(4);

  useEffect(() => {
    const interval = setInterval(() => {
      const incoming = FEED_EVENTS[nextIndex % FEED_EVENTS.length];
      setTimeout(() => {
        setVisibleEvents(prev => [incoming, ...prev.slice(0, 3)]);
      }, 300);
      setNextIndex(i => i + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, [nextIndex]);

  const roleConfig = (role: string) =>
    role === 'Faculty' ? { bg: 'rgba(37,99,235,0.10)', text: '#1D4ED8', border: 'rgba(37,99,235,0.25)' }
    : role === 'Admin'  ? { bg: 'rgba(99,102,241,0.10)',  text: '#4F46E5', border: 'rgba(99,102,241,0.25)' }
    :                     { bg: 'rgba(100,116,139,0.10)', text: '#475569', border: 'rgba(100,116,139,0.25)' };

  return (
    <div className="space-y-3">
      {visibleEvents.map((item, i) => {
        const c = roleConfig(item.role);
        return (
          <Link
            key={`${item.time}-${item.event}`}
            to={item.href}
            className="group block rounded-xl p-4 border transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: 'rgba(0,0,0,0.03)',
              borderColor: 'rgba(0,0,0,0.07)',
              animation: i === 0 ? 'feedSlideIn 0.4s ease' : undefined,
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-semibold" style={{ color: '#2563EB' }}>{item.time}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border" style={{ background: c.bg, color: c.text, borderColor: c.border }}>
                  {item.role}
                </span>
                <span className="text-[10px] opacity-0 group-hover:opacity-60 transition-opacity text-molted-muted font-medium">Try it →</span>
              </div>
            </div>
            <p className="text-sm text-molted-muted mb-2 leading-relaxed">{item.event}</p>
            <p className="text-sm font-semibold text-molted-white leading-snug">↳ {item.action}</p>
          </Link>
        );
      })}
      <style>{`
        @keyframes feedSlideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ── Hero ──────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(37,99,235,0.12) 0%, transparent 65%)' }} />
        <div className="absolute top-1/2 -right-60 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(30,58,138,0.08) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(100,116,139,0.08) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Kicker pill */}
        <RevealBlock className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
            style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)', color: '#DC2626' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Canvas was built in 2008. The era is over.
          </div>
        </RevealBlock>

        {/* Headline — THE LMS IS DEAD */}
        <RevealBlock delay={80}>
          <div className="relative inline-block mb-3">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.95]"
              style={{ color: '#0F172A' }}>
              The LMS
            </h1>
            {/* Strikethrough line */}
            <div className="absolute top-1/2 left-0 w-full h-[5px] md:h-[7px] rounded-full -translate-y-1/2 pointer-events-none"
              style={{ background: 'linear-gradient(90deg, #DC2626, #EF4444)', opacity: 0.85 }} />
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.95]"
            style={{ color: '#0F172A' }}>
            is Dead.
          </h1>
        </RevealBlock>

        {/* Sub-headline — THE ALP HAS ARRIVED */}
        <RevealBlock delay={200} className="mt-6">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight"
            style={{
              background: 'linear-gradient(120deg, #2563EB 0%, #64748B 55%, #1E3A8A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
            The ALP has arrived.
          </h2>
        </RevealBlock>

        {/* Definition */}
        <RevealBlock delay={320} className="mt-6">
          <p className="text-base md:text-lg font-semibold tracking-wide" style={{ color: '#94A3B8' }}>
            ALP — Agentic Learning Platform
          </p>
        </RevealBlock>

        {/* Body */}
        <RevealBlock delay={400}>
          <p className="mt-8 text-lg md:text-xl text-molted-muted max-w-2xl mx-auto leading-relaxed">
            MoltALP is not a better LMS. It is the replacement for the LMS — a platform built from scratch for AI-native education. It watches every discussion, every reading session, every engagement signal, and responds to each student, faculty member, and administrator as an individual. Not a tool. Not a plugin. A new category.
          </p>
        </RevealBlock>

        {/* CTA row */}
        <RevealBlock delay={480} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/outpost"
            className="inline-flex items-center gap-2 px-8 py-5 rounded-2xl font-semibold text-sm transition-all duration-200 hover:-translate-y-1"
            style={{ background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.2)', color: '#2563EB' }}
          >
            Explore the Platform <ChevronRight size={14} />
          </Link>
        </RevealBlock>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-molted-subtle animate-pulse">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-molted-subtle to-transparent" />
      </div>
    </section>
  );
}

/* ── Death Certificate ──────────────────────────────────────────────────── */
function DeathCertificate() {
  const charges = [
    { year: '1990s', charge: 'Built for content delivery, not learning', verdict: 'It tracked logins. Not people.' },
    { year: '2000s', charge: 'Designed for administration, not students', verdict: 'It tracked enrollment. Not understanding.' },
    { year: '2010s', charge: 'Plastered with integrations and bolt-ons', verdict: 'It tracked completion. Not outcomes.' },
    { year: '2020s', charge: 'Survived a pandemic by doing nothing new', verdict: 'It tracked attendance. Not engagement.' },
  ];

  return (
    <section className="py-32 px-6 border-t border-molted-border relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(220,38,38,0.05) 0%, transparent 65%)' }} />
      <div className="max-w-4xl mx-auto relative z-10">
        <RevealBlock className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#DC2626' }}>
            Cause of death
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white leading-tight tracking-tight">
            The LMS had one job.
          </h2>
          <p className="text-4xl md:text-6xl font-black leading-tight tracking-tight mt-1"
            style={{ color: 'rgba(0,0,0,0.18)' }}>
            It never learned.
          </p>
          <p className="mt-10 text-molted-muted text-lg leading-relaxed max-w-2xl mx-auto">
            Thirty years. $11 billion in annual spend. The same professor with 140 students gets the same gradebook as the professor with 14. The student failing at 2 AM gets the same forum as the student who's thriving. The LMS doesn't know any of them. It never did.
          </p>
        </RevealBlock>

        <div className="grid md:grid-cols-2 gap-4">
          {charges.map((c, i) => (
            <RevealBlock key={i} delay={i * 80}>
              <div
                className="rounded-xl p-6 border"
                style={{ background: 'rgba(241,243,248,0.85)', borderColor: 'rgba(220,38,38,0.10)' }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-black px-2 py-0.5 rounded" style={{ background: 'rgba(220,38,38,0.08)', color: '#DC2626' }}>
                    {c.year}
                  </span>
                </div>
                <p className="text-molted-white font-bold text-sm mb-1.5">{c.charge}</p>
                <p className="text-molted-subtle text-xs leading-relaxed font-mono">{c.verdict}</p>
              </div>
            </RevealBlock>
          ))}
        </div>

        <RevealBlock delay={320} className="mt-12 text-center">
          <div
            className="inline-block px-8 py-4 rounded-2xl border"
            style={{ background: 'rgba(220,38,38,0.05)', borderColor: 'rgba(220,38,38,0.18)' }}
          >
            <p className="text-2xl md:text-3xl font-black" style={{ color: '#DC2626' }}>
              The LMS doesn't know anyone.
            </p>
            <p className="text-molted-muted text-sm mt-2 font-medium">
              That's not a feature gap. That's a category failure.
            </p>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── ALP Definition ─────────────────────────────────────────────────────── */
function ALPDefinition() {
  const pillars = [
    {
      label: 'Agentic',
      color: '#2563EB',
      headline: 'It acts, not just stores.',
      body: 'Agents watch every signal — discussions, reading sessions, engagement gaps, grade trajectories — and respond without waiting to be asked. The platform does the work.',
    },
    {
      label: 'Learning',
      color: '#475569',
      headline: 'Built around the student, not the course.',
      body: 'Every response is personalized to that student\'s history, their patterns, their voice. Not a template. A platform that actually knows who it\'s talking to.',
    },
    {
      label: 'Platform',
      color: '#1E3A8A',
      headline: 'One system. Every role.',
      body: 'Faculty, students, administrators — each with their own AI working for them. Not three disconnected tools. One intelligence layer that serves the entire institution.',
    },
  ];

  return (
    <section className="py-24 px-6 border-t border-molted-border relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(37,99,235,0.10) 0%, transparent 65%)' }} />
      <div className="max-w-5xl mx-auto relative z-10">
        <RevealBlock className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#2563EB' }}>
            A new category
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white leading-tight tracking-tight">
            ALP: Agentic Learning Platform.
          </h2>
          <p className="mt-6 text-molted-muted text-lg leading-relaxed max-w-2xl mx-auto">
            Not a smarter LMS. A fundamentally different architecture — built for a world where AI doesn't just assist learning, it participates in it.
          </p>
        </RevealBlock>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {pillars.map((p, i) => (
            <RevealBlock key={i} delay={i * 100}>
              <div
                className="rounded-2xl p-8 border h-full"
                style={{ background: 'rgba(248,249,252,0.95)', borderColor: `${p.color}20` }}
              >
                <div
                  className="text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-full inline-block mb-5"
                  style={{ background: `${p.color}12`, color: p.color, border: `1px solid ${p.color}25` }}
                >
                  {p.label}
                </div>
                <h3 className="text-molted-white font-black text-lg leading-snug mb-3">{p.headline}</h3>
                <p className="text-molted-muted text-sm leading-relaxed">{p.body}</p>
              </div>
            </RevealBlock>
          ))}
        </div>

        {/* Live agent feed */}
        <RevealBlock delay={200}>
          <div
            className="rounded-2xl border p-8"
            style={{ background: 'rgba(248,249,252,0.95)', borderColor: 'rgba(37,99,235,0.20)', boxShadow: '0 0 40px rgba(37,99,235,0.06)' }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#2563EB' }} />
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#2563EB' }}>
                Agents running now — this is what an ALP does
              </p>
            </div>
            <AgentFeed />
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── The Comparison ─────────────────────────────────────────────────────── */
function TheComparison() {
  const rows = [
    { label: 'Responds to students', lms: 'Never', alp: '24/7, in real time' },
    { label: 'Knows each student', lms: 'No', alp: 'Learns every individual' },
    { label: 'Faculty burden', lms: '23 hrs/week admin', alp: 'Handled by agents' },
    { label: 'Retention signal', lms: 'End-of-term report', alp: 'Live behavioral detection' },
    { label: 'Outcome proof', lms: 'Grade in a box', alp: 'Verified learning trajectory' },
    { label: 'Integration required', lms: 'API projects, IT cycles', alp: 'Zero — browser extension' },
    { label: 'Gets smarter over time', lms: 'No', alp: 'Data flywheel compounds' },
  ];

  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-4xl mx-auto">
        <RevealBlock className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#64748B' }}>
            Side by side
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white leading-tight tracking-tight">
            LMS vs. ALP.
          </h2>
          <p className="text-4xl md:text-5xl font-black leading-tight tracking-tight mt-1"
            style={{ color: 'rgba(0,0,0,0.18)' }}>
            There's no comparison.
          </p>
        </RevealBlock>

        <RevealBlock>
          <div className="rounded-2xl overflow-hidden border" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
            {/* Header */}
            <div className="grid grid-cols-3 text-xs font-black uppercase tracking-widest"
              style={{ background: 'rgba(241,243,248,0.95)', borderBottom: '1px solid rgba(0,0,0,0.08)' }}
            >
              <div className="px-5 py-4 text-molted-muted" />
              <div className="px-5 py-4 text-center border-x" style={{ borderColor: 'rgba(220,38,38,0.15)', color: '#DC2626' }}>
                The LMS
              </div>
              <div className="px-5 py-4 text-center" style={{ color: '#2563EB' }}>
                Molt ALP
              </div>
            </div>

            {rows.map((row, i) => (
              <div key={i} className={`grid grid-cols-3 text-sm border-b last:border-b-0`}
                style={{ borderColor: 'rgba(0,0,0,0.06)', background: i % 2 === 0 ? '#FFFFFF' : 'rgba(248,249,252,0.8)' }}
              >
                <div className="px-5 py-4 text-molted-muted font-medium">{row.label}</div>
                <div className="px-5 py-4 text-center border-x font-medium"
                  style={{ borderColor: 'rgba(220,38,38,0.10)', color: '#DC2626' }}>
                  {row.lms}
                </div>
                <div className="px-5 py-4 text-center font-semibold" style={{ color: '#1D4ED8' }}>
                  {row.alp}
                </div>
              </div>
            ))}
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Data Flywheel ─────────────────────────────────────────────────────── */
function DataFlywheel() {
  return (
    <section className="py-24 px-6 border-t border-molted-border relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 60% 50%, rgba(100,116,139,0.08) 0%, transparent 65%)' }} />
      <div className="max-w-5xl mx-auto relative z-10">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">The moat</p>
          <h2 className="text-3xl md:text-5xl font-black text-molted-white leading-tight tracking-tight">
            The ALP gets smarter
          </h2>
          <p className="text-3xl md:text-5xl font-black leading-tight tracking-tight mt-2"
            style={{
              background: 'linear-gradient(120deg, #64748B, #94A3B8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            with every interaction.
          </p>
          <p className="mt-8 text-molted-muted text-lg leading-relaxed max-w-2xl mx-auto">
            Every discussion reply, every intervention, every personalized response feeds back into MoltALP's understanding of how that student learns. The data flywheel compounds. Institutions that deploy early build an advantage that can't be replicated — a model trained on their students, their courses, their outcomes.
          </p>
        </RevealBlock>

        <div className="grid md:grid-cols-4 gap-4">
          {[
            { step: '01', label: 'Student interacts', detail: 'Discussion, reading, assignment — every signal captured' },
            { step: '02', label: 'Agent responds', detail: 'Personalized, in context, in real time' },
            { step: '03', label: 'Outcome logged', detail: 'What worked, what escalated, what resolved' },
            { step: '04', label: 'Platform learns', detail: 'Every institution builds its own compound advantage' },
          ].map((s, i) => (
            <RevealBlock key={i} delay={i * 80}>
              <div
                className="rounded-xl p-5 border h-full"
                style={{ background: 'rgba(241,243,248,0.85)', borderColor: 'rgba(100,116,139,0.12)' }}
              >
                <p
                  className="text-3xl font-black mb-3 leading-none"
                  style={{
                    background: 'linear-gradient(120deg, #2563EB, #64748B)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {s.step}
                </p>
                <p className="text-molted-white font-bold text-sm mb-1">{s.label}</p>
                <p className="text-molted-subtle text-xs leading-relaxed">{s.detail}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Three Roles ───────────────────────────────────────────────────────── */
const ROLES = [
  {
    icon: Users,
    role: 'Teachers',
    color: '#2563EB',
    headline: 'An AI that handles the work. You do the teaching.',
    body: 'Discussions answered while students are still online. Grades returned in minutes not weeks. Struggling students flagged before they disappear. The ALP handles 23 hours of weekly admin — so you teach instead.',
    features: ['Discussion Intelligence', 'Course Architect', 'Agentic Grader', 'Early Warning Engine', 'Auto-Respond'],
    href: '/forge',
    product: 'Forge',
  },
  {
    icon: BookOpen,
    role: 'Students',
    color: '#64748B',
    headline: "A tutor that's always there. Right where you're reading.",
    body: 'The moment a student hits something confusing, Lumen answers — in context, on the page, without switching tabs. The discussion agent replies before they can close the browser. Every student gets a personalized experience.',
    features: ['Lumen — reading companion', 'Discussion agent replies in real time', 'Personalized to each student\'s history', 'Works on Canvas, Blackboard, D2L'],
    href: '/lumen',
    product: 'Lumen',
  },
  {
    icon: BarChart3,
    role: 'Institutions',
    color: '#1E3A8A',
    headline: "Your voice. Everywhere. The moment it's needed.",
    body: "Beacon deploys your institution's values as AI — in every college, every department, every touchpoint. The ALP tracks retention signals, surfaces risk before it becomes a crisis, and makes your outcomes visible in real time.",
    features: ['Beacon — AI with your institution\'s voice', 'Retention signals across the full roster', 'Outcomes data in real time', 'Higher ed, healthcare, enterprise'],
    href: '/beacon',
    product: 'Beacon',
  },
];

function ThreeRoles() {
  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="mb-16 text-center">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">
            For everyone in the building
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            Hyperpersonalized.<br />For every role.
          </h2>
        </RevealBlock>

        <div className="grid md:grid-cols-3 gap-6">
          {ROLES.map((r, i) => {
            const Icon = r.icon;
            return (
              <RevealBlock key={r.role} delay={i * 120}>
                <Link
                  to={r.href}
                  className="group flex flex-col h-full rounded-2xl border bg-molted-elevated p-8 transition-all duration-300 hover:-translate-y-1"
                  style={{ borderColor: `${r.color}22` }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${r.color}15` }}
                  >
                    <Icon size={18} style={{ color: r.color }} />
                  </div>

                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: r.color }}>
                    {r.role}
                  </p>

                  <h3 className="text-molted-white font-bold text-lg leading-snug mb-3">
                    {r.headline}
                  </h3>

                  <p className="text-molted-muted text-sm leading-relaxed mb-6 flex-1">
                    {r.body}
                  </p>

                  <div className="space-y-1.5 mb-6">
                    {r.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs text-molted-muted">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: r.color }} />
                        {f}
                      </div>
                    ))}
                  </div>

                  <div
                    className="inline-flex items-center gap-1.5 text-xs font-bold group-hover:gap-2.5 transition-all"
                    style={{ color: r.color }}
                  >
                    Explore {r.product} <ChevronRight size={12} />
                  </div>
                </Link>
              </RevealBlock>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Instructor First ──────────────────────────────────────────────────── */
function InstructorFirst() {
  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-5xl mx-auto">
        <RevealBlock className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#2563EB' }}>
            Faculty in the loop
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-molted-white leading-tight tracking-tight">
            The ALP learns your voice.
          </h2>
          <p className="text-3xl md:text-5xl font-black leading-tight tracking-tight mt-1"
            style={{ color: 'rgba(0,0,0,0.18)' }}>
            Students never lose you.
          </p>
          <p className="mt-6 text-molted-muted text-lg leading-relaxed max-w-2xl mx-auto">
            MoltALP is not a chatbot standing in for your instructor. It is your instructor's voice, deployed everywhere you cannot be at once. Forge learns your background, your passions, your hobbies, your teaching style — and every response it drafts sounds like you wrote it.
          </p>
        </RevealBlock>

        <div className="grid md:grid-cols-2 gap-5 mb-8">
          {[
            { num: '01', title: 'Forge learns your story', body: 'Your years in the field. Your subject obsessions. Your coaching style. The hobbies that show up in your lectures. You share it once — it informs every response, forever.' },
            { num: '02', title: 'Forge learns your voice', body: 'Upload your syllabus, paste your rubrics, describe how you talk to students. Forge reads your tone and matches it — not a generic AI template.' },
            { num: '03', title: 'Forge drafts in your name', body: 'When a student posts at midnight, Forge drafts a reply grounded in your teaching philosophy and your personality. You review before anything sends.' },
            { num: '04', title: 'You always have the last word', body: 'Nothing goes to a student without your approval. Every draft surfaces for your review. The instructor leads. The ALP lifts.' },
          ].map((item, i) => (
            <RevealBlock key={i} delay={i * 80}>
              <div
                className="rounded-xl border p-6"
                style={{ background: 'rgba(241,243,248,0.85)', borderColor: 'rgba(37,99,235,0.12)' }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-black mt-0.5"
                    style={{ background: 'rgba(37,99,235,0.15)', color: '#2563EB' }}
                  >
                    {item.num}
                  </div>
                  <div>
                    <p className="text-molted-white font-bold text-sm mb-1.5">{item.title}</p>
                    <p className="text-molted-muted text-xs leading-relaxed">{item.body}</p>
                  </div>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>

        <RevealBlock delay={200} className="text-center">
          <Link
            to="/forge"
            className="inline-flex items-center gap-1.5 text-sm font-bold transition-opacity hover:opacity-70"
            style={{ color: '#2563EB' }}
          >
            See how Forge learns your voice <ChevronRight size={14} />
          </Link>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Traction ──────────────────────────────────────────────────────────── */
function Traction() {
  return (
    <section className="py-16 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 rounded-2xl border border-molted-border p-8 md:p-12"
            style={{ background: 'rgba(241,243,248,0.85)' }}>
            <div className="text-center md:text-left">
              <p className="text-molted-white font-semibold text-xl mt-2">One ALP. Every agent. Live.</p>
              <p className="text-molted-muted text-base mt-1">Built for institutions ready to move now.</p>
            </div>
            <div className="flex flex-col gap-4 text-center md:text-right">
              {[
                { value: '8', label: 'ALP modules built & ready' },
                { value: '24/7', label: 'Agents always running' },
                { value: '1', label: 'Category. Zero competitors.' },
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-3xl font-black text-molted-white">{s.value}</p>
                  <p className="text-molted-muted text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Platform Bridge ─────────────────────────────────────────────────────── */
function PlatformBridge() {
  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock>
          <Link
            to="/outpost"
            className="group block relative rounded-3xl overflow-hidden p-12 md:p-16 text-center transition-all duration-500"
            style={{ background: 'rgba(255,255,255,0.95)', boxShadow: '0 8px 48px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.07)' }}
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/4 w-[400px] h-[300px] rounded-full" style={{ background: 'radial-gradient(ellipse,rgba(37,99,235,0.12) 0%,transparent 70%)' }} />
              <div className="absolute top-0 right-1/4 w-[400px] h-[300px] rounded-full" style={{ background: 'radial-gradient(ellipse,rgba(100,116,139,0.12) 0%,transparent 70%)' }} />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full" style={{ background: 'radial-gradient(ellipse,rgba(30,58,138,0.08) 0%,transparent 70%)' }} />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6"
                style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)', color: '#2563EB' }}>
                <Zap size={11} />
                The full ALP
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6"
                style={{ background: 'linear-gradient(135deg,#2563EB 0%,#64748B 50%,#1E3A8A 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Outpost
              </h2>
              <p className="text-xl md:text-2xl font-semibold mb-4 max-w-xl mx-auto" style={{ color: '#0F172A' }}>
                Every agent. Every role. One platform.
              </p>
              <p className="text-base max-w-lg mx-auto leading-relaxed mb-8" style={{ color: '#64748B' }}>
                Forge, Lumen, and Beacon aren't integrations. They're native modules of an ALP built from scratch for the AI era — and for the students the LMS never knew.
              </p>
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all group-hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(120deg,#2563EB,#64748B,#1E3A8A)', color: '#ffffff' }}>
                See Outpost <ArrowRight size={14} />
              </div>
            </div>
          </Link>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Manifesto ─────────────────────────────────────────────────────────── */
function Manifesto() {
  return (
    <section className="py-32 px-6 border-t border-molted-border relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.07) 0%, transparent 70%)' }} />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <RevealBlock>
          <p className="text-molted-subtle text-sm uppercase tracking-widest mb-8 font-semibold">Our belief</p>
          {[
            { text: 'Everything that has been invented', accent: false },
            { text: 'will need to be reinvented.', accent: true },
            { text: 'Education is first.', accent: false },
          ].map((line, i) => (
            <p key={i} className={`text-3xl md:text-5xl font-black leading-tight tracking-tight`}
              style={{ color: line.accent ? '#2563EB' : '#0F172A' }}>
              {line.text}
            </p>
          ))}
          <p className="mt-10 text-molted-muted text-base leading-relaxed max-w-xl mx-auto">
            The LMS was built for a world without AI. The curriculum was built for a world without the internet. The classroom was built for a world without remote work. The ALP is built for what comes next — and what comes next is already here.
          </p>
          <p className="mt-6 text-molted-subtle text-sm tracking-widest">— MoltALP</p>
        </RevealBlock>

        <RevealBlock delay={200} className="mt-16">
          <div
            className="rounded-2xl border px-8 py-6 max-w-2xl mx-auto"
            style={{ background: 'rgba(37,99,235,0.04)', borderColor: 'rgba(37,99,235,0.18)' }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#2563EB' }}>
              The long game
            </p>
            <p className="text-molted-white text-lg font-semibold leading-snug">
              Every student, regardless of zip code or institution budget, deserves a learning environment that knows their name.
            </p>
            <p className="text-molted-muted text-sm leading-relaxed mt-3">
              We are selecting 12 founding university partners to go first. The long-term vision is access — bringing hyperpersonalized learning to under-resourced schools, rural campuses, and community colleges that can't afford a 1:1 tutor for every student. The ALP scales. The mission doesn't change.
            </p>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Final CTA ─────────────────────────────────────────────────────────── */
function FinalCTA() {
  return (
    <section className="py-32 px-6 border-t border-molted-border">
      <div className="max-w-3xl mx-auto text-center">
        <RevealBlock>
          <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: '#DC2626' }}>
            The LMS is over. The ALP is here.
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            Ready to leave the LMS behind?
          </h2>
          <p className="mt-6 text-molted-muted text-lg leading-relaxed">
            We're onboarding founding partners now. The conversation takes 30 minutes.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:greg.lucas@paigebreaker.com?subject=MoltALP Demo Request"
              className="group flex items-center gap-2.5 px-8 py-4 rounded-xl text-white font-bold text-lg transition-all duration-200 hover:-translate-y-px"
              style={{ background: 'linear-gradient(135deg, #2563EB 0%, #64748B 50%, #1E3A8A 100%)', color: '#ffffff' }}
            >
              Schedule a Demo
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <Link to="/founding-partners" className="px-8 py-4 rounded-xl border border-molted-border text-molted-muted hover:text-molted-white hover:border-molted-subtle font-semibold transition-all">
              Founding Partners →
            </Link>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── All Demos ─────────────────────────────────────────────────────────── */
const LIVE_DEMOS = [
  { label: 'Beacon', description: "Chat with your institution's AI voice", href: '/beacon/demo', color: '#1E3A8A', pill: 'NEW' },
  { label: 'RetainAI', description: 'Student risk analysis + intervention plan', href: '/retain-ai/demo', color: '#F43F5E', pill: 'NEW' },
  { label: 'OutcomesAI', description: 'HLC accreditation · Board report · Rankings', href: '/outcomes-ai/demo', color: '#0EA5E9', pill: 'NEW' },
  { label: 'ProofAI', description: 'Competency verification + credentials', href: '/proof-ai/demo', color: '#7C3AED', pill: 'NEW' },
  { label: 'SyllabusSync', description: 'Upload syllabus → full LMS course built instantly', href: '/syllabussync/demo', color: '#059669', pill: 'NEW' },
  { label: 'ClinicalAI', description: 'AI standardized patient for nursing simulation', href: '/clinical-ai/demo', color: '#1E40AF', pill: 'NEW' },
  { label: 'Adaptive Exam', description: 'Unique AI-generated questions · adapts in real-time', href: '/adaptive-exam/demo', color: '#6366F1', pill: 'NEW' },
  { label: 'PathwayAI', description: 'Adaptive learning map per student', href: '/pathway-ai/demo', color: '#10B981', pill: '' },
  { label: 'Lumen', description: 'In-context AI tutor while reading', href: '/lumen/demo', color: '#7B61FF', pill: '' },
  { label: 'Discussion', description: "AI responds in instructor's voice", href: '/forge/discussion', color: '#2563EB', pill: '' },
  { label: 'Agentic Grader', description: 'Grades with rubric feedback', href: '/forge/agentic-grader', color: '#2563EB', pill: '' },
  { label: 'Course Architect', description: 'Full course from a description', href: '/forge/course-architect', color: '#2563EB', pill: '' },
  { label: 'Command Center', description: 'Ask the University OS anything', href: '/command-center', color: '#F59E0B', pill: 'NEW' },
];

function AllDemos() {
  return (
    <section className="py-20 px-6" style={{ background: '#ffffff' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">Interactive Demos</p>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Try them now</h2>
          <p className="text-slate-500 mt-2 text-sm">Live AI demos. No login required.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {LIVE_DEMOS.map(demo => (
            <Link key={demo.href} to={demo.href}
              className="group flex flex-col p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              style={{
                background: '#f8fafc',
                borderColor: '#e2e8f0',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = '#ffffff';
                (e.currentTarget as HTMLElement).style.borderColor = `${demo.color}35`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px rgba(0,0,0,0.10), 0 0 0 1px ${demo.color}20`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = '#f8fafc';
                (e.currentTarget as HTMLElement).style.borderColor = '#e2e8f0';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
              }}>
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: `${demo.color}12` }}>
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: demo.color }} />
                </div>
                {demo.pill && (
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: `${demo.color}12`, color: demo.color }}>
                    {demo.pill}
                  </span>
                )}
              </div>
              <p className="text-sm font-bold text-slate-800 mb-1">{demo.label}</p>
              <p className="text-xs text-slate-500 leading-relaxed flex-1">{demo.description}</p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold transition-colors"
                style={{ color: demo.color }}>
                Try it
                <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ── Page ──────────────────────────────────────────────────────────────── */
export default function MoltedHome() {
  return (
    <MoltedLayout>
      <Hero />
      <DeathCertificate />
      <ALPDefinition />
      <TheComparison />
      <DataFlywheel />
      <ThreeRoles />
      <InstructorFirst />
      <Traction />
      <PlatformBridge />
      <AllDemos />
      <Manifesto />
      <FinalCTA />
    </MoltedLayout>
  );
}
