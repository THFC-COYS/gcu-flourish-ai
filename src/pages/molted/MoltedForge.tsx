import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, MessageSquare, CheckSquare, Bell, FileText,
  AlertTriangle, Cpu, Clock, ChevronRight, Mic,
} from 'lucide-react';
import MoltLMSLayout, { OutpostBanner } from './MoltedLayout';
import AgentFeed, { FeedEvent } from '../../components/AgentFeed';

const TEAL = '#2563EB';

const FORGE_EVENTS: FeedEvent[] = [
  { time: '8:12 AM',  event: 'Professor uploads syllabus for NURS 301', action: 'Course architect generates full semester infrastructure in 40 seconds', role: 'Faculty', href: '/forge/course-architect' },
  { time: '11:47 PM', event: 'Student posts confusion about cognitive load theory', action: 'Discussion agent replies with clarity — 4 seconds', role: 'Student', href: '/forge/discussion' },
  { time: '6:55 AM',  event: 'Auto-respond queue: 14 unanswered student emails', action: 'Drafts all replies — faculty reviews and approves in 2 minutes', role: 'Faculty', href: '/forge/auto-respond' },
  { time: '1:22 AM',  event: 'Doctoral student submits methodology chapter draft', action: 'Agentic grader returns structured feedback with rubric alignment', role: 'Student', href: '/forge/agentic-grader' },
  { time: '2:03 AM',  event: 'Marcus T. — no login in 5 days, grade declining', action: 'Early warning flags risk, personalized check-in drafted for advisor', role: 'Admin', href: '/forge/early-warning' },
  { time: '3:14 PM',  event: 'Student replies to ethics forum — insightful argument', action: 'Agent acknowledges the insight, deepens thread with a follow-up question', role: 'Student', href: '/forge/discussion' },
  { time: '9:05 AM',  event: 'Faculty inbox: 22 unread messages across 4 courses', action: 'Auto-respond categorises, drafts, and queues — cleared in 3 minutes', role: 'Faculty', href: '/forge/auto-respond' },
];

function ForgeLiveFeed() {
  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Always working</p>
            <h2 className="text-4xl md:text-5xl font-black text-molted-white leading-tight tracking-tight mb-6">
              Forge doesn't wait<br />
              <span style={{ color: TEAL }}>for office hours.</span>
            </h2>
            <p className="text-molted-muted text-lg leading-relaxed">
              Every event below is a real workflow Forge handles autonomously — drafting, grading, flagging, responding. Faculty review and approve. The queue never backs up.
            </p>
          </div>
          <AgentFeed events={FORGE_EVENTS} label="Forge agents running now" accentColor={TEAL} />
        </div>
      </div>
    </section>
  );
}
const TEAL_DIM = 'rgba(37,99,235,0.10)';
const TEAL_BORDER = 'rgba(37,99,235,0.22)';

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

/* ── Hero ──────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(37,99,235,0.07) 0%, transparent 70%)' }}
        />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(100,116,139,0.10) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <RevealBlock className="mb-8">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase"
            style={{ background: TEAL_DIM, border: `1px solid ${TEAL_BORDER}`, color: TEAL }}
          >
            <Cpu size={12} />
            MoltLMS · Faculty
          </div>
        </RevealBlock>

        <RevealBlock delay={80}>
          <h1>
            <span
              className="block text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #0A6B62 0%, #2563EB 55%, #5EF0E3 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Forge
            </span>
          </h1>
        </RevealBlock>

        <RevealBlock delay={180}>
          <p className="mt-8 text-2xl md:text-3xl font-bold text-molted-muted tracking-tight">
            Your voice. Everywhere you can't be.
          </p>
        </RevealBlock>

        <RevealBlock delay={280}>
          <p className="mt-4 text-molted-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Forge learns your background, your passions, your teaching style, the hobbies that show up in your analogies.
            Then it drafts discussion replies, grades assignments, and handles student emails — all in a voice that sounds
            like <em>you</em> wrote it.
          </p>
        </RevealBlock>

        <RevealBlock delay={380} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/forge/voice-demo"
            className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-molted-black transition-all duration-200 hover:-translate-y-px"
            style={{ background: TEAL }}
          >
            <Mic size={16} />
            Hear your voice back
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="mailto:greg.lucas@paigebreaker.com?subject=Forge Demo Request"
            className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-molted-border hover:border-molted-subtle text-molted-muted hover:text-molted-white font-semibold transition-all duration-200"
          >
            Request a demo
            <ChevronRight size={16} />
          </a>
        </RevealBlock>

        <RevealBlock delay={480} className="mt-16">
          <div
            className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border"
            style={{ background: 'rgba(248,249,252,0.95)', borderColor: 'rgba(0,0,0,0.06)' }}
          >
            <Clock size={14} style={{ color: '#86868B' }} />
            <p className="text-sm" style={{ color: '#86868B' }}>
              The average professor spends{' '}
              <span className="font-semibold" style={{ color: '#1C1C1E' }}>23 hours/week</span>
              {' '}on tasks Forge handles automatically.
            </p>
          </div>
        </RevealBlock>
      </div>

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
                      className="h-full rounded-full"
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

/* ── How Forge learns your voice ───────────────────────────────────────── */
function HowForgeWorks() {
  const steps = [
    {
      num: '01',
      title: 'You share your story',
      body: "Your years in the field. Your subject obsessions. The hobbies that show up in your lectures. The way you talk to students when they're stuck. You share it once — it informs every response, forever.",
    },
    {
      num: '02',
      title: 'Forge learns your voice',
      body: 'Upload your syllabus, paste your rubrics, describe your tone. Forge reads the way you write and matches it — not a generic AI template. Not a chatbot. Your voice.',
    },
    {
      num: '03',
      title: 'Forge drafts in your name',
      body: 'When a student posts at midnight, Forge drafts a reply grounded in your teaching philosophy and your personality. You review before anything sends.',
    },
  ];

  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-4xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">How it works</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            It sounds like you wrote it.
          </h2>
          <p className="mt-4 text-molted-muted text-lg max-w-xl mx-auto">
            Because in a very real sense, you did — by teaching Forge who you are.
          </p>
        </RevealBlock>

        <div className="relative">
          <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-[#2563EB]/60 via-[#2563EB]/30 to-transparent hidden md:block" aria-hidden />

          <div className="space-y-6">
            {steps.map((step, i) => (
              <RevealBlock key={i} delay={i * 130}>
                <div
                  className="relative flex items-start gap-6 bg-molted-elevated border border-molted-border rounded-2xl p-7 transition-all"
                  style={{ ['--tw-border-opacity' as string]: '1' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = TEAL_BORDER)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '')}
                >
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-black text-sm"
                    style={{
                      background: 'rgba(37,99,235,0.12)',
                      border: '1.5px solid rgba(37,99,235,0.35)',
                      color: TEAL,
                    }}
                  >
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-molted-white font-bold text-lg">{step.title}</h3>
                    <p className="mt-1.5 text-molted-muted text-sm leading-relaxed">{step.body}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>

        <RevealBlock delay={450} className="mt-10 text-center">
          <Link
            to="/forge/voice-demo"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:-translate-y-px"
            style={{ background: TEAL_DIM, color: TEAL, border: `1px solid ${TEAL_BORDER}` }}
          >
            <Mic size={14} />
            Try the voice demo — see a reply in your voice
            <ArrowRight size={14} />
          </Link>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Feature demos ─────────────────────────────────────────────────────── */
function FeatureDemos() {
  const demos = [
    {
      icon: Mic,
      label: 'Voice Demo',
      title: 'Hear your voice back',
      description: 'Type your background and hobbies. See a discussion reply Forge would draft — in your words, your style, your voice.',
      href: '/forge/voice-demo',
      cta: 'Try the demo',
      accent: TEAL,
      accentDim: TEAL_DIM,
      accentBorder: TEAL_BORDER,
      live: true,
    },
    {
      icon: MessageSquare,
      label: 'Discussion Agent',
      title: 'Live discussion reply',
      description: 'Post a student response to a real discussion prompt. Watch the agent reply in real time — in the instructor\'s voice.',
      href: '/forge/discussion',
      cta: 'Try it live',
      accent: TEAL,
      accentDim: TEAL_DIM,
      accentBorder: TEAL_BORDER,
      live: true,
    },
    {
      icon: CheckSquare,
      label: 'Agentic Grader',
      title: 'AI grading with rubrics',
      description: 'Upload a student submission and rubric. Forge scores it, writes feedback, and flags anything that needs instructor attention.',
      href: '/forge/agentic-grader',
      cta: 'See it grade',
      accent: TEAL,
      accentDim: TEAL_DIM,
      accentBorder: TEAL_BORDER,
    },
    {
      icon: FileText,
      label: 'Course Architect',
      title: 'Build an entire course',
      description: 'Describe your subject and level. Forge generates a full syllabus, discussion prompts, rubrics, and reading list.',
      href: '/forge/course-architect',
      cta: 'Build a course',
      accent: TEAL,
      accentDim: TEAL_DIM,
      accentBorder: TEAL_BORDER,
    },
    {
      icon: Bell,
      label: 'Auto-Respond',
      title: 'Student email replies',
      description: 'Paste a student email and your course context. Forge drafts a reply that sounds like you, handles the question, and stays on policy.',
      href: '/forge/auto-respond',
      cta: 'Draft a reply',
      accent: TEAL,
      accentDim: TEAL_DIM,
      accentBorder: TEAL_BORDER,
    },
    {
      icon: AlertTriangle,
      label: 'Early Warning',
      title: 'Spot at-risk students',
      description: 'Forge analyzes engagement patterns, missed deadlines, and discussion quality to flag students before they fall off the roster.',
      href: '/forge/early-warning',
      cta: 'See the signals',
      accent: TEAL,
      accentDim: TEAL_DIM,
      accentBorder: TEAL_BORDER,
    },
  ];

  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Live demos</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            Every tool. Interactive.
          </h2>
          <p className="mt-4 text-molted-muted text-lg max-w-xl mx-auto">
            Don't take our word for it. Run them yourself.
          </p>
        </RevealBlock>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map((demo, i) => (
            <RevealBlock key={i} delay={i * 70}>
              <Link
                to={demo.href}
                className="group flex flex-col h-full bg-molted-elevated border border-molted-border rounded-2xl p-7 hover:shadow-molted-card-hover hover:-translate-y-px transition-all"
                style={{ ['--hover-border' as string]: demo.accentBorder }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = demo.accentBorder)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '')}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: demo.accentDim, border: `1px solid ${demo.accentBorder}` }}
                  >
                    <demo.icon size={18} style={{ color: demo.accent }} />
                  </div>
                  {demo.live && (
                    <span className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: demo.accent }}>
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: demo.accent }} />
                      Live
                    </span>
                  )}
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: demo.accent }}>
                  {demo.label}
                </p>
                <h3 className="text-molted-white font-bold text-lg mb-2">{demo.title}</h3>
                <p className="text-molted-muted text-sm leading-relaxed flex-1">{demo.description}</p>
                <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold transition-all" style={{ color: demo.accent }}>
                  {demo.cta}
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
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
    <section className="py-32 px-6 border-t border-molted-border">
      <div className="max-w-3xl mx-auto text-center">
        <RevealBlock>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            Give your voice<br />
            <span style={{ color: TEAL }}>a place to be everywhere.</span>
          </h2>
          <p className="mt-6 text-molted-muted text-lg">
            Forge is in early access with partner institutions. Request a demo and see it work with your own course.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:greg.lucas@paigebreaker.com?subject=Forge Demo Request"
              className="group flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:-translate-y-px text-molted-black"
              style={{ background: TEAL }}
            >
              Request Early Access
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              to="/"
              className="px-8 py-4 rounded-xl border border-molted-border text-molted-muted hover:text-molted-white font-semibold transition-all hover:border-molted-subtle"
            >
              ← Back to MoltLMS
            </Link>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

export default function MoltLMSForge() {
  return (
    <MoltLMSLayout>
      <OutpostBanner moduleName="Forge" moduleColor="#2563EB" />
      <Hero />
      <TheProblem />
      <HowForgeWorks />
      <ForgeLiveFeed />
      <FeatureDemos />
      <CTA />
    </MoltLMSLayout>
  );
}
