import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Bot, BookOpen, BarChart3, Users } from 'lucide-react';
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

/* ── Hero ──────────────────────────────────────────────────────────────── */
/* ── Agent Feed ────────────────────────────────────────────────────────── */
const FEED_EVENTS = [
  { time: '11:47 PM', event: 'Student posts confusion about cognitive load theory', action: 'Discussion agent replies in 4 seconds', role: 'Student', href: '/forge/discussion' },
  { time: '8:12 AM',  event: 'Professor uploads syllabus for NURS 301', action: 'Course architect generates full semester infrastructure', role: 'Faculty', href: '/forge/course-architect' },
  { time: '2:03 AM',  event: 'Marcus T. hasn\'t logged in for 5 days', action: 'Early warning flags risk — personalized check-in drafted', role: 'Admin', href: '/forge/early-warning' },
  { time: '9:30 AM',  event: 'Student opens Week 4 reading on pharmacology', action: 'Lumen activates — answers in context as they read', role: 'Student', href: '/lumen' },
  { time: '3:14 PM',  event: 'Student replies to discussion forum on ethics in healthcare', action: 'Agent acknowledges their insight and deepens the thread with a follow-up question', role: 'Student', href: '/forge/discussion' },
  { time: '6:55 AM',  event: 'Auto-respond queue: 14 unanswered student emails', action: 'Auto-respond drafts replies — faculty reviews in 2 minutes', role: 'Faculty', href: '/forge/auto-respond' },
  { time: '1:22 AM',  event: 'Doctoral student stuck on methodology chapter', action: 'Agentic grader reviews draft and returns structured feedback', role: 'Student', href: '/forge/agentic-grader' },
];

function AgentFeed() {
  const [visibleEvents, setVisibleEvents] = useState(FEED_EVENTS.slice(0, 4));
  const [nextIndex, setNextIndex] = useState(4);
  const [fadingIn, setFadingIn] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const incoming = FEED_EVENTS[nextIndex % FEED_EVENTS.length];
      setFadingIn(0);
      setTimeout(() => {
        setVisibleEvents(prev => [incoming, ...prev.slice(0, 3)]);
        setFadingIn(null);
      }, 300);
      setNextIndex(i => i + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, [nextIndex]);

  const roleColor = (role: string) =>
    role === 'Faculty' ? { bg: 'rgba(45,212,191,0.15)', text: '#2DD4BF' }
    : role === 'Admin'  ? { bg: 'rgba(232,23,15,0.15)',  text: '#E8170F' }
    :                     { bg: 'rgba(232,160,32,0.15)', text: '#E8A020' };

  return (
    <div className="space-y-3">
      {visibleEvents.map((item, i) => {
        const c = roleColor(item.role);
        const isNew = i === 0 && fadingIn === null;
        return (
          <Link
            key={`${item.time}-${item.event}`}
            to={item.href}
            className="group block rounded-xl p-4 border transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: 'rgba(45,212,191,0.04)',
              borderColor: 'rgba(45,212,191,0.1)',
              opacity: isNew ? 1 : i === 0 ? 1 : 1,
              animation: i === 0 ? 'feedSlideIn 0.4s ease' : undefined,
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono" style={{ color: '#2DD4BF' }}>{item.time}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: c.bg, color: c.text }}>
                  {item.role}
                </span>
                <span className="text-[10px] text-molted-muted/0 group-hover:text-molted-muted/60 transition-colors font-medium">Try it →</span>
              </div>
            </div>
            <p className="text-molted-muted text-xs mb-2 leading-relaxed">{item.event}</p>
            <p className="text-xs font-semibold text-molted-white leading-snug">↳ {item.action}</p>
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

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(45,212,191,0.06) 0%, transparent 65%)' }} />
        <div className="absolute top-1/2 -right-60 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(232,23,15,0.04) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(232,160,32,0.04) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Kicker */}
        <RevealBlock className="mb-8">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest">
            Canvas was built in 2008.
          </p>
        </RevealBlock>

        {/* Headline */}
        <RevealBlock delay={80}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-molted-white leading-[1.02] tracking-tight">
            The LMS that knows{' '}
            <span style={{
              background: 'linear-gradient(120deg, #2DD4BF 0%, #E8A020 55%, #E8170F 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              everyone.
            </span>
          </h1>
        </RevealBlock>

        {/* Sub */}
        <RevealBlock delay={200}>
          <p className="mt-8 text-lg md:text-xl text-molted-muted max-w-2xl mx-auto leading-relaxed">
            MoltED is an agentic learning platform. It watches every discussion, every reading session, every engagement signal — and responds to each teacher, student, and admin as an individual. Not a tool. Not a plugin. A platform that never stops working.
          </p>
        </RevealBlock>

        {/* CTAs */}
        <RevealBlock delay={320} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:hello@molted.ai?subject=MoltED Demo Request"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base transition-all duration-200 hover:-translate-y-px"
            style={{ background: 'linear-gradient(120deg, #2DD4BF 0%, #E8A020 50%, #E8170F 100%)', color: '#0a0a0f' }}
          >
            See It Live
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <Link
            to="/outpost"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base text-molted-muted hover:text-molted-white border border-molted-border hover:border-molted-subtle transition-all"
          >
            Explore the Platform
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

/* ── The Problem ───────────────────────────────────────────────────────── */
function TheProblem() {
  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-4xl mx-auto">
        <RevealBlock className="text-center">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-8">The problem</p>
          <p className="text-3xl md:text-5xl font-black text-molted-white leading-tight tracking-tight">
            Every LMS treats everyone
          </p>
          <p className="text-3xl md:text-5xl font-black leading-tight tracking-tight mt-2"
            style={{ color: 'rgba(255,255,255,0.25)' }}>
            exactly the same.
          </p>
          <p className="mt-10 text-molted-muted text-lg leading-relaxed max-w-2xl mx-auto">
            The professor with 140 students gets the same gradebook the professor with 14 gets.
            The student failing silently at 11 PM gets the same discussion board as the student who's thriving.
            The admin watching retention collapse gets the same reports that were built in 2009.
          </p>
          <p className="mt-6 text-molted-white text-xl font-bold">
            The LMS doesn't know any of them.
          </p>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── The Platform ──────────────────────────────────────────────────────── */
function ThePlatform() {
  return (
    <section className="py-24 px-6 border-t border-molted-border relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(45,212,191,0.04) 0%, transparent 65%)' }} />
      <div className="max-w-4xl mx-auto relative z-10">
        <RevealBlock className="text-center">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-8">The answer</p>
          <h2 className="text-3xl md:text-5xl font-black text-molted-white leading-tight tracking-tight">
            MoltED is an agentic LMS.
          </h2>
          <p className="mt-4 text-3xl md:text-5xl font-black leading-tight tracking-tight"
            style={{
              background: 'linear-gradient(120deg, #2DD4BF, #E8A020)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            It never stops working.
          </p>
          <p className="mt-10 text-molted-muted text-lg leading-relaxed max-w-2xl mx-auto">
            Agents watch every discussion board, every reading session, every engagement signal — in real time. When something needs a response, the platform acts. When something needs a human, it escalates. The LMS learns everyone. And responds to each of them as an individual.
          </p>
        </RevealBlock>

        {/* Agent loop */}
        <RevealBlock delay={200} className="mt-16">
          <div
            className="rounded-2xl border p-8"
            style={{ background: 'rgba(17,17,24,0.8)', borderColor: 'rgba(45,212,191,0.2)' }}
          >
            <div className="flex items-center gap-2 mb-8">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#2DD4BF' }} />
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#2DD4BF' }}>
                Agents running now
              </p>
            </div>
            <AgentFeed />
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
        style={{ background: 'radial-gradient(ellipse at 60% 50%, rgba(232,160,32,0.04) 0%, transparent 65%)' }} />
      <div className="max-w-5xl mx-auto relative z-10">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">The moat</p>
          <h2 className="text-3xl md:text-5xl font-black text-molted-white leading-tight tracking-tight">
            The platform gets smarter
          </h2>
          <p className="text-3xl md:text-5xl font-black leading-tight tracking-tight mt-2"
            style={{
              background: 'linear-gradient(120deg, #E8A020, #F5B740)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            with every interaction.
          </p>
          <p className="mt-8 text-molted-muted text-lg leading-relaxed max-w-2xl mx-auto">
            Every discussion reply, every intervention, every personalized response feeds back into MoltED's understanding of how that student learns. The data flywheel compounds. Institutions that deploy early build an advantage that can't be replicated — the model trained on their students, their courses, their outcomes.
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
                style={{ background: 'rgba(17,17,24,0.6)', borderColor: 'rgba(232,160,32,0.12)' }}
              >
                <p
                  className="text-3xl font-black mb-3 leading-none"
                  style={{
                    background: 'linear-gradient(120deg, #E8A020, #F5B740)',
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
    color: '#2DD4BF',
    headline: 'An AI that handles the work. You do the teaching.',
    body: 'Discussions answered while students are still online. Grades returned in minutes not weeks. Struggling students flagged before they disappear. The agent handles 23 hours of weekly admin — so you teach instead.',
    features: ['Discussion Intelligence', 'Course Architect', 'Agentic Grader', 'Early Warning Engine', 'Auto-Respond'],
    href: '/molted/forge',
    product: 'Forge',
  },
  {
    icon: BookOpen,
    role: 'Students',
    color: '#E8A020',
    headline: "A tutor that's always there. Right where you're reading.",
    body: 'The moment a student hits something confusing, Lumen answers — in context, on the page, without switching tabs. The discussion agent replies before they can close the browser. Every student gets a personalized experience.',
    features: ['Lumen — reading companion', 'Discussion agent replies in real time', 'Personalized to each student\'s history', 'Works on Canvas, Blackboard, D2L'],
    href: '/molted/lumen',
    product: 'Lumen',
  },
  {
    icon: BarChart3,
    role: 'Institutions',
    color: '#E8170F',
    headline: "Your voice. Everywhere. The moment it's needed.",
    body: "Beacon deploys your institution's values as AI — in every college, every department, every touchpoint. The platform tracks retention signals, surfaces risk before it becomes a crisis, and makes your outcomes visible in real time.",
    features: ['Beacon — AI with your institution\'s voice', 'Retention signals across the full roster', 'Outcomes data in real time', 'Higher ed, healthcare, enterprise'],
    href: '/molted/beacon',
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
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#2DD4BF' }}>
            Faculty in the loop
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-molted-white leading-tight tracking-tight">
            The agent learns your voice.
          </h2>
          <p className="text-3xl md:text-5xl font-black leading-tight tracking-tight mt-1"
            style={{ color: 'rgba(255,255,255,0.25)' }}>
            Students never lose you.
          </p>
          <p className="mt-6 text-molted-muted text-lg leading-relaxed max-w-2xl mx-auto">
            MoltED is not a chatbot standing in for your instructor. It is your instructor's voice, deployed everywhere you cannot be at once. Forge learns your background, your passions, your hobbies, your teaching style — and every response it drafts sounds like you wrote it.
          </p>
        </RevealBlock>

        <div className="grid md:grid-cols-2 gap-5 mb-8">
          {[
            { num: '01', title: 'Forge learns your story', body: 'Your years in the field. Your subject obsessions. Your coaching style. The hobbies that show up in your lectures. You share it once — it informs every response, forever.' },
            { num: '02', title: 'Forge learns your voice', body: 'Upload your syllabus, paste your rubrics, describe how you talk to students. Forge reads your tone and matches it — not a generic AI template.' },
            { num: '03', title: 'Forge drafts in your name', body: 'When a student posts at midnight, Forge drafts a reply grounded in your teaching philosophy and your personality. You review before anything sends.' },
            { num: '04', title: 'You always have the last word', body: 'Nothing goes to a student without your approval. Every draft surfaces for your review. The instructor leads. The agent lifts.' },
          ].map((item, i) => (
            <RevealBlock key={i} delay={i * 80}>
              <div
                className="rounded-xl border p-6"
                style={{ background: 'rgba(17,17,24,0.6)', borderColor: 'rgba(45,212,191,0.12)' }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-black mt-0.5"
                    style={{ background: 'rgba(45,212,191,0.15)', color: '#2DD4BF' }}
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
            style={{ color: '#2DD4BF' }}
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
            style={{ background: 'rgba(17,17,24,0.6)' }}>
            <div className="text-center md:text-left">
              <p
                className="text-7xl md:text-8xl font-black leading-none"
                style={{
                  background: 'linear-gradient(120deg, #F5B740, #E8A020)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                50,000+
              </p>
              <p className="text-molted-white font-semibold text-xl mt-2">people. One platform.</p>
              <p className="text-molted-muted text-base mt-1">Live today. Not a projection.</p>
            </div>
            <div className="flex flex-col gap-4 text-center md:text-right">
              {[
                { value: '6', label: 'AI personas deployed' },
                { value: '24/7', label: 'Agents always running' },
                { value: '3', label: 'Products. One platform.' },
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

/* ── Campus Bridge ─────────────────────────────────────────────────────── */
function CampusBridge() {
  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock>
          <Link
            to="/outpost"
            className="group block relative rounded-3xl overflow-hidden border border-molted-border p-12 md:p-16 text-center hover:border-opacity-60 transition-all duration-500"
            style={{ background: 'rgba(10,10,15,0.8)' }}
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/4 w-[400px] h-[300px] rounded-full" style={{ background: 'radial-gradient(ellipse,rgba(45,212,191,0.06) 0%,transparent 70%)' }} />
              <div className="absolute top-0 right-1/4 w-[400px] h-[300px] rounded-full" style={{ background: 'radial-gradient(ellipse,rgba(232,160,32,0.06) 0%,transparent 70%)' }} />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full" style={{ background: 'radial-gradient(ellipse,rgba(232,23,15,0.04) 0%,transparent 70%)' }} />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#86868B' }}>
                <Bot size={11} />
                The full platform
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6"
                style={{ background: 'linear-gradient(135deg,#2DD4BF 0%,#E8A020 50%,#E8170F 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Outpost
              </h2>
              <p className="text-xl md:text-2xl text-molted-white/80 font-semibold mb-4 max-w-xl mx-auto">
                Every agent. Every role. One platform.
              </p>
              <p className="text-molted-muted text-base max-w-lg mx-auto leading-relaxed mb-8">
                Forge, Lumen, and Beacon aren't integrations. They're native features of an LMS built from scratch for the AI era.
              </p>
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all group-hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(120deg,#2DD4BF,#E8A020,#E8170F)', color: '#0A0A0F' }}>
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
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(45,212,191,0.03) 0%, transparent 70%)' }} />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <RevealBlock>
          <p className="text-molted-subtle text-sm uppercase tracking-widest mb-8 font-semibold">Our belief</p>
          {[
            { text: 'Everything that has been invented', accent: false },
            { text: 'will need to be reinvented.', accent: true },
            { text: 'This starts with education.', accent: false },
          ].map((line, i) => (
            <p key={i} className={`text-3xl md:text-5xl font-black leading-tight tracking-tight ${line.accent ? 'text-molted-violet' : 'text-molted-white'}`}>
              {line.text}
            </p>
          ))}
          <p className="mt-10 text-molted-muted text-base leading-relaxed max-w-xl mx-auto">
            The LMS was built for a world without AI. The curriculum was built for a world without the internet. The classroom was built for a world without remote work. We are building for what comes next.
          </p>
          <p className="mt-6 text-molted-subtle text-sm tracking-widest">— MoltED</p>
        </RevealBlock>

        <RevealBlock delay={200} className="mt-16">
          <div
            className="rounded-2xl border px-8 py-6 max-w-2xl mx-auto"
            style={{ background: 'rgba(139,92,246,0.06)', borderColor: 'rgba(139,92,246,0.2)' }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#8B5CF6' }}>
              The long game
            </p>
            <p className="text-molted-white text-lg font-semibold leading-snug">
              Every student, regardless of zip code or institution budget, deserves a learning environment that knows their name.
            </p>
            <p className="text-molted-muted text-sm leading-relaxed mt-3">
              The institutions deploying Molt today are proof. The long-term vision is access — bringing hyperpersonalized learning to under-resourced schools, rural campuses, and community colleges that can't afford a 1:1 tutor for every student. The platform scales. The mission doesn't change.
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
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            Ready to molt?
          </h2>
          <p className="mt-6 text-molted-muted text-lg leading-relaxed">
            We're onboarding founding partners now. The conversation takes 30 minutes.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:hello@molted.ai?subject=MoltED Demo Request"
              className="group flex items-center gap-2.5 px-8 py-4 rounded-xl text-white font-bold text-lg transition-all duration-200 hover:-translate-y-px"
              style={{ background: 'linear-gradient(135deg, #2DD4BF 0%, #E8A020 50%, #E8170F 100%)', color: '#0A0A0F' }}
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

/* ── Page ──────────────────────────────────────────────────────────────── */
export default function MoltedHome() {
  return (
    <MoltedLayout>
      <Hero />
      <TheProblem />
      <ThePlatform />
      <DataFlywheel />
      <ThreeRoles />
      <InstructorFirst />
      <Traction />
      <CampusBridge />
      <Manifesto />
      <FinalCTA />
    </MoltedLayout>
  );
}
