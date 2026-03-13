import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Check, Brain, GitBranch, Zap, BarChart2,
  TrendingUp, Users, BookOpen, Sparkles,
} from 'lucide-react';
import MoltedLayout from './MoltedLayout';

const VIOLET = '#8B5CF6';

/* ── Reveal helpers ─────────────────────────────────────────────────────── */
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

function RevealBlock({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
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

/* ── Hero ───────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] rounded-full"
          style={{ background: `radial-gradient(ellipse at center, ${VIOLET}12 0%, transparent 70%)` }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[500px] h-[400px] rounded-full"
          style={{ background: `radial-gradient(circle, ${VIOLET}08 0%, transparent 70%)` }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold mb-8 animate-fade-in"
          style={{ borderColor: `${VIOLET}40`, background: `${VIOLET}12`, color: VIOLET }}
        >
          <GitBranch size={12} /> MoltED Ai · Adaptive Learning Engine
        </div>

        {/* Wordmark */}
        <h1 className="animate-reveal">
          <span className="block text-5xl md:text-7xl lg:text-8xl font-black text-molted-white leading-none tracking-tight">
            Pathway
          </span>
          <span
            className="block text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight mt-1"
            style={{ color: VIOLET, textShadow: `0 0 40px ${VIOLET}40` }}
          >
            Ai
          </span>
        </h1>

        {/* Position */}
        <p className="mt-6 text-molted-muted text-sm font-semibold uppercase tracking-widest animate-reveal" style={{ animationDelay: '100ms' }}>
          Every student on their own learning path
        </p>

        {/* Tagline */}
        <p className="mt-4 text-2xl md:text-3xl font-bold text-molted-white animate-reveal" style={{ animationDelay: '150ms' }}>
          The Netflix moment for education.
        </p>

        <p className="mt-5 text-lg text-molted-muted/80 max-w-2xl mx-auto leading-relaxed animate-reveal" style={{ animationDelay: '250ms' }}>
          Every student is different. Finally, so is their education.
        </p>

        <p className="mt-3 text-base text-molted-muted/60 max-w-xl mx-auto leading-relaxed animate-reveal" style={{ animationDelay: '300ms' }}>
          PathwayAi learns what each student knows, what they don't, and what they need next —
          then builds a personalized learning path in real time.
        </p>

        {/* Callout chip */}
        <div
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium animate-reveal"
          style={{ borderColor: `${VIOLET}30`, background: `${VIOLET}0D`, color: VIOLET, animationDelay: '320ms' }}
        >
          <Sparkles size={13} />
          Powered by every pAIgeBreaker interaction.
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-reveal" style={{ animationDelay: '380ms' }}>
          <a
            href="mailto:hello@molted.ai?subject=PathwayAi Student Access"
            className="group flex items-center gap-2.5 px-8 py-4 rounded-xl text-white font-bold text-lg transition-all duration-200 hover:-translate-y-px"
            style={{ background: VIOLET, boxShadow: `0 0 24px ${VIOLET}40` }}
          >
            Start Learning
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="mailto:hello@molted.ai?subject=PathwayAi Institution Inquiry"
            className="px-8 py-4 rounded-xl border border-molted-border text-molted-muted hover:text-molted-white font-semibold transition-all hover:border-molted-subtle"
          >
            For Institutions →
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-molted-subtle animate-pulse">
        <div className="w-px h-10 bg-gradient-to-b from-molted-subtle to-transparent" />
      </div>
    </section>
  );
}

/* ── The Flat Road Problem ──────────────────────────────────────────────── */
function FlatRoadProblem() {
  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">The problem</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight leading-tight">
            Every student takes the exact same path.<br />
            <span className="text-molted-muted font-normal text-3xl md:text-4xl mt-2 block">
              None of them are the same.
            </span>
          </h2>
          <p className="mt-6 text-molted-muted max-w-2xl mx-auto text-lg leading-relaxed">
            The standard model is a straight road. Everyone moves at the same pace,
            through the same content, regardless of what they already know or where they're stuck.
            Some sprint ahead bored. Others fall behind in silence.
          </p>
        </RevealBlock>

        {/* Branching path diagram */}
        <RevealBlock delay={150}>
          <div className="bg-molted-elevated border border-molted-border rounded-2xl p-8 md:p-12 overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Old Way */}
              <div className="mb-10">
                <p className="text-molted-muted text-xs font-semibold uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-molted-ember" /> Old Way · One path
                </p>
                <div className="flex items-center gap-0">
                  {['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'].map((w, i) => (
                    <div key={i} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-molted-surface border border-molted-border flex items-center justify-center">
                          <span className="text-molted-muted text-xs">👤</span>
                        </div>
                        <span className="text-molted-muted text-xs mt-1.5 text-center">{w}</span>
                      </div>
                      {i < 5 && <div className="w-12 h-px bg-molted-border mx-1 flex-shrink-0" />}
                    </div>
                  ))}
                  <div className="ml-3 px-3 py-1.5 rounded-lg bg-molted-ember/15 border border-molted-ember/30 text-molted-ember text-xs font-semibold flex-shrink-0">
                    30% lost
                  </div>
                </div>
              </div>

              {/* PathwayAi */}
              <div>
                <p className="text-molted-muted text-xs font-semibold uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: VIOLET }} /> PathwayAi · Adaptive branches
                </p>
                {/* Start node */}
                <div className="flex flex-col">
                  <div className="flex items-start gap-3">
                    {/* Root */}
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xs"
                        style={{ background: VIOLET, boxShadow: `0 0 16px ${VIOLET}40` }}
                      >
                        Start
                      </div>
                    </div>

                    <div className="w-8 h-px bg-molted-border mt-6 flex-shrink-0" />

                    {/* Branches */}
                    <div className="flex flex-col gap-4">
                      {[
                        { label: 'Advanced track', detail: 'Skip mastered units', color: '#10B981', students: '23%' },
                        { label: 'Standard track', detail: 'Steady progression', color: VIOLET, students: '48%' },
                        { label: 'Remediation track', detail: 'Fill knowledge gaps first', color: '#F59E0B', students: '29%' },
                      ].map((branch, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div
                            className="px-4 py-2.5 rounded-xl border text-xs font-semibold flex-shrink-0"
                            style={{ borderColor: `${branch.color}35`, background: `${branch.color}10`, color: branch.color }}
                          >
                            {branch.label}
                          </div>
                          <span className="text-molted-muted text-xs">{branch.detail}</span>
                          <div className="ml-auto px-2 py-1 rounded-full bg-molted-surface border border-molted-border text-molted-muted text-xs flex-shrink-0">
                            {branch.students}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="ml-auto flex flex-col items-center flex-shrink-0">
                      <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center text-xs font-bold mt-1" style={{ borderColor: VIOLET, color: VIOLET }}>
                        ✓
                      </div>
                      <span className="text-molted-muted text-xs mt-1.5">Mastery</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 pl-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: VIOLET }} />
                    <span className="text-molted-muted text-xs">Paths reconverge when mastery is achieved. No one gets left behind. No one gets held back.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── How PathwayAi Learns ───────────────────────────────────────────────── */
function HowItLearns() {
  const steps = [
    {
      num: '01',
      icon: BookOpen,
      title: 'You interact with pAIgeBreaker.',
      body: 'Every question you ask, every concept you struggle with, every topic you click through with ease — PathwayAi records your knowledge state in real time. Nothing is lost. Everything is signal.',
      color: '#E8A020',
    },
    {
      num: '02',
      icon: Brain,
      title: 'PathwayAi maps what you know.',
      body: 'A knowledge graph builds around you. Mastered concepts glow. Gaps appear. Dependencies between concepts become visible — so the system knows what you need to learn before you can move forward.',
      color: VIOLET,
    },
    {
      num: '03',
      icon: Zap,
      title: 'Your path adjusts in real time.',
      body: 'Before you even know you need it, PathwayAi surfaces the right concept at the right moment. Not a suggestion. A path — built for where you actually are right now.',
      color: '#0EA5E9',
    },
  ];

  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">The engine</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            How PathwayAi learns you.
          </h2>
        </RevealBlock>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-molted-border to-transparent pointer-events-none" />

          {steps.map((step, i) => (
            <RevealBlock key={i} delay={i * 130}>
              <div className="bg-molted-elevated border border-molted-border rounded-2xl p-8 hover:-translate-y-px hover:shadow-molted-card-hover transition-all h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-5xl font-black text-molted-border select-none">{step.num}</span>
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: `${step.color}14`, border: `1px solid ${step.color}30` }}
                  >
                    <step.icon size={20} style={{ color: step.color }} />
                  </div>
                </div>
                <h3 className="text-molted-white font-bold text-lg mb-3 leading-snug">{step.title}</h3>
                <p className="text-molted-muted text-sm leading-relaxed">{step.body}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Knowledge Graph Mock ───────────────────────────────────────────────── */
function KnowledgeGraphMock() {
  type NodeStatus = 'mastered' | 'struggling' | 'next' | 'locked' | 'current';

  const nodes: { id: string; label: string; status: NodeStatus; x: number; y: number; emoji?: string }[] = [
    { id: 'cell', label: 'Cell Biology', status: 'current', x: 50, y: 50, emoji: '🔬' },
    { id: 'mitosis', label: 'Mitosis', status: 'mastered', x: 22, y: 22, emoji: '✓' },
    { id: 'meiosis', label: 'Meiosis', status: 'struggling', x: 78, y: 22, emoji: '✗' },
    { id: 'atp', label: 'ATP Synthesis', status: 'struggling', x: 15, y: 60, emoji: '⚡' },
    { id: 'photo', label: 'Photosynthesis', status: 'mastered', x: 85, y: 60, emoji: '✓' },
    { id: 'dna', label: 'DNA Replication', status: 'next', x: 30, y: 82, emoji: '→' },
    { id: 'protein', label: 'Protein Synthesis', status: 'next', x: 70, y: 82, emoji: '→' },
    { id: 'genetics', label: 'Genetics', status: 'locked', x: 50, y: 18, emoji: '🔒' },
  ];

  const statusStyle: Record<NodeStatus, { bg: string; border: string; text: string; glow?: string }> = {
    mastered: { bg: `${VIOLET}20`, border: VIOLET, text: VIOLET, glow: `0 0 16px ${VIOLET}40` },
    struggling: { bg: '#F59E0B20', border: '#F59E0B', text: '#F59E0B', glow: '0 0 12px #F59E0B30' },
    next: { bg: '#0EA5E920', border: '#0EA5E9', text: '#0EA5E9' },
    locked: { bg: '#3A3A4020', border: '#3A3A40', text: '#3A3A40' },
    current: { bg: `${VIOLET}30`, border: VIOLET, text: '#fff', glow: `0 0 24px ${VIOLET}50` },
  };

  const connections = [
    ['cell', 'mitosis'],
    ['cell', 'meiosis'],
    ['cell', 'atp'],
    ['cell', 'photo'],
    ['cell', 'dna'],
    ['cell', 'protein'],
    ['mitosis', 'genetics'],
    ['meiosis', 'genetics'],
  ];

  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-12">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Knowledge graph</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            See exactly where you are.
          </h2>
          <p className="mt-4 text-molted-muted max-w-xl mx-auto">
            PathwayAi builds a live map of your knowledge — showing what you've mastered,
            where you're stuck, and what comes next.
          </p>
        </RevealBlock>

        <RevealBlock delay={150}>
          <div className="bg-molted-elevated border border-molted-border rounded-2xl overflow-hidden">
            {/* Window chrome */}
            <div className="bg-molted-surface border-b border-molted-border px-5 py-3 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: VIOLET }} />
              <span className="ml-2 text-molted-muted text-xs font-mono">pathway.molted.ai · Knowledge Graph · Alex T.</span>
            </div>

            {/* Graph area */}
            <div className="relative" style={{ height: '420px', background: 'rgba(0,0,0,0.2)' }}>
              {/* SVG connections */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {connections.map(([from, to], i) => {
                  const a = nodes.find(n => n.id === from)!;
                  const b = nodes.find(n => n.id === to)!;
                  const isActive = a.status !== 'locked' && b.status !== 'locked';
                  return (
                    <line
                      key={i}
                      x1={`${a.x}%`} y1={`${a.y}%`}
                      x2={`${b.x}%`} y2={`${b.y}%`}
                      stroke={isActive ? `${VIOLET}30` : '#3A3A4040'}
                      strokeWidth="0.3"
                    />
                  );
                })}
              </svg>

              {/* Nodes */}
              {nodes.map((node) => {
                const style = statusStyle[node.status];
                const isCenter = node.id === 'cell';
                return (
                  <div
                    key={node.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  >
                    <div
                      className={`rounded-full border-2 flex items-center justify-center font-bold text-xs transition-all ${
                        isCenter ? 'w-16 h-16' : 'w-12 h-12'
                      }`}
                      style={{
                        background: style.bg,
                        borderColor: style.border,
                        color: style.text,
                        boxShadow: style.glow,
                      }}
                    >
                      <div className="flex flex-col items-center leading-none">
                        <span className={isCenter ? 'text-base' : 'text-sm'}>{node.emoji}</span>
                      </div>
                    </div>
                    <span
                      className="text-center font-semibold leading-snug"
                      style={{
                        color: style.text,
                        fontSize: isCenter ? '11px' : '9px',
                        maxWidth: '72px',
                        textAlign: 'center',
                      }}
                    >
                      {node.label}
                    </span>
                  </div>
                );
              })}

              {/* Legend */}
              <div className="absolute bottom-4 left-4 flex flex-wrap gap-3">
                {[
                  { label: 'Mastered', color: VIOLET },
                  { label: 'Struggling', color: '#F59E0B' },
                  { label: 'Up next', color: '#0EA5E9' },
                  { label: 'Locked', color: '#3A3A40' },
                ].map((l, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
                    <span className="text-molted-muted text-xs">{l.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Insight bar */}
            <div
              className="px-6 py-5 border-t border-molted-border flex flex-col md:flex-row md:items-center justify-between gap-4"
              style={{ background: `${VIOLET}0A` }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${VIOLET}20`, border: `1px solid ${VIOLET}30` }}
                >
                  <Brain size={15} style={{ color: VIOLET }} />
                </div>
                <div>
                  <p className="text-molted-white text-sm font-semibold">PathwayAi says:</p>
                  <p className="text-molted-muted text-sm mt-0.5">
                    You've mastered mitosis but <span className="text-yellow-400 font-medium">meiosis is blocking your path to genetics.</span>{' '}
                    Let's fix that now.
                  </p>
                </div>
              </div>
              <button
                className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-px"
                style={{ background: VIOLET, boxShadow: `0 0 16px ${VIOLET}40` }}
              >
                Start Meiosis →
              </button>
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Student Experience Comparison ─────────────────────────────────────── */
function StudentExperience() {
  const before = [
    'Linear syllabus, same for every student',
    'Student guesses what to study',
    'Generic feedback on assessments',
    'Struggles are invisible to the system',
    'One pace for everyone',
    'Catch-up is the student\'s problem',
  ];

  const after = [
    'Adaptive path built around your knowledge state',
    'Proactive suggestions before you fall behind',
    'Targeted feedback tied to your specific gaps',
    'Struggles are surfaced and addressed automatically',
    'Your pace, your gaps, your wins',
    'System intervenes before you fall behind',
  ];

  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Impact</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            The difference is total.
          </h2>
        </RevealBlock>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Before */}
          <RevealBlock>
            <div className="bg-molted-elevated border border-molted-ember/20 rounded-2xl p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-molted-ember/15 border border-molted-ember/30 flex items-center justify-center">
                  <span className="text-molted-ember text-sm">✕</span>
                </div>
                <div>
                  <p className="text-molted-white font-bold">Before PathwayAi</p>
                  <p className="text-molted-muted text-xs">The standard model</p>
                </div>
              </div>
              <ul className="space-y-3">
                {before.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-molted-ember/15 border border-molted-ember/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-molted-ember text-xs">✕</span>
                    </div>
                    <span className="text-molted-muted text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>

          {/* After */}
          <RevealBlock delay={150}>
            <div
              className="rounded-2xl p-8 h-full border-2"
              style={{ background: `${VIOLET}08`, borderColor: `${VIOLET}30`, boxShadow: `0 0 40px ${VIOLET}10` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: `${VIOLET}20`, border: `1px solid ${VIOLET}30` }}
                >
                  <Zap size={15} style={{ color: VIOLET }} />
                </div>
                <div>
                  <p className="text-molted-white font-bold">After PathwayAi</p>
                  <p className="text-molted-muted text-xs">Adaptive education</p>
                </div>
              </div>
              <ul className="space-y-3">
                {after.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${VIOLET}20`, border: `1px solid ${VIOLET}35` }}
                    >
                      <Check size={10} style={{ color: VIOLET }} />
                    </div>
                    <span className="text-molted-white text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>
        </div>
      </div>
    </section>
  );
}

/* ── For Institutions ───────────────────────────────────────────────────── */
function ForInstitutions() {
  const reasons = [
    {
      icon: TrendingUp,
      title: 'Completion rates rise',
      body: 'Students who get the right content at the right time don\'t drop out. PathwayAi reduces the gaps that cause quiet failure.',
      color: '#10B981',
    },
    {
      icon: Users,
      title: 'Students feel seen',
      body: 'Adaptive learning signals to every student that their path is designed for them — not assembled from a shelf.',
      color: VIOLET,
    },
    {
      icon: BarChart2,
      title: 'Faculty get class-level gap reports',
      body: 'PathwayAi surfaces where the entire cohort is struggling — so faculty can intervene in the classroom before it\'s too late.',
      color: '#0EA5E9',
    },
    {
      icon: GitBranch,
      title: 'Connects directly to TeachOS',
      body: 'Pathway data flows into TeachOS — giving instructors a real-time view of student knowledge states across the class.',
      color: '#F59E0B',
    },
  ];

  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-12">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Institutional value</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            Why institutions buy PathwayAi.
          </h2>
          <p className="mt-6 text-molted-muted text-lg max-w-2xl mx-auto leading-relaxed">
            The first adaptive learning system that works because it's built on{' '}
            <span style={{ color: VIOLET }}>real student interaction data</span> —
            not content trees assembled by designers.
          </p>
        </RevealBlock>

        <div className="grid md:grid-cols-2 gap-5 mb-12">
          {reasons.map((r, i) => (
            <RevealBlock key={i} delay={i * 80}>
              <div className="bg-molted-elevated border border-molted-border rounded-2xl p-6 hover:-translate-y-px hover:shadow-molted-card-hover transition-all flex gap-5">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${r.color}14`, border: `1px solid ${r.color}25` }}
                >
                  <r.icon size={20} style={{ color: r.color }} />
                </div>
                <div>
                  <h3 className="text-molted-white font-bold mb-2">{r.title}</h3>
                  <p className="text-molted-muted text-sm leading-relaxed">{r.body}</p>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Pricing ────────────────────────────────────────────────────────────── */
function Pricing() {
  const tiers = [
    {
      name: 'Student',
      price: '$9',
      period: '/mo',
      tag: 'Your path. Your pace.',
      features: [
        'Full adaptive learning path',
        'Personal knowledge graph',
        'Proactive gap detection',
        'pAIgeBreaker integration',
        '3 active course subjects',
      ],
      cta: 'Start Learning',
      highlight: false,
    },
    {
      name: 'Department',
      price: '$299',
      period: '/mo',
      tag: 'Department-wide adaptive learning.',
      features: [
        'All Student features for your class',
        'Faculty cohort gap reports',
        'Class-level knowledge heatmaps',
        'TeachOS integration',
        'Unlimited students',
        'Weekly insight reports',
      ],
      cta: 'Most Popular',
      highlight: true,
    },
    {
      name: 'Institution',
      price: 'Custom',
      period: '',
      tag: 'Institution-wide adaptive education.',
      features: [
        'All Department features',
        'Cross-course knowledge mapping',
        'OutcomesAi integration',
        'Accreditation outcome alignment',
        'Custom curriculum integration',
        'Dedicated success manager',
      ],
      cta: 'Contact Us',
      highlight: false,
    },
  ];

  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Investment</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            Built for students and institutions.
          </h2>
          <p className="mt-4 text-molted-muted">Start as a student. Scale to the institution.</p>
        </RevealBlock>

        <div className="grid md:grid-cols-3 gap-5">
          {tiers.map((tier, i) => (
            <RevealBlock key={i} delay={i * 100}>
              <div
                className={`rounded-2xl p-8 h-full flex flex-col border transition-all hover:-translate-y-px ${
                  tier.highlight
                    ? 'border-2'
                    : 'bg-molted-elevated border-molted-border hover:border-molted-subtle'
                }`}
                style={
                  tier.highlight
                    ? {
                        background: `${VIOLET}08`,
                        borderColor: VIOLET,
                        boxShadow: `0 0 40px ${VIOLET}15`,
                      }
                    : {}
                }
              >
                {tier.highlight && (
                  <span className="inline-block mb-4 text-xs font-bold uppercase tracking-wider" style={{ color: VIOLET }}>
                    ★ Most Popular
                  </span>
                )}
                <h3 className="text-molted-white font-black text-2xl">{tier.name}</h3>
                <div className="flex items-baseline gap-1 my-3">
                  <span className="text-4xl font-black text-molted-white">{tier.price}</span>
                  {tier.period && <span className="text-molted-muted text-sm">{tier.period}</span>}
                </div>
                <p className="text-molted-muted text-sm mb-6">{tier.tag}</p>
                <ul className="space-y-3 flex-1">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-molted-muted">
                      <Check
                        size={14}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: tier.highlight ? VIOLET : '#86868B' }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={`mailto:hello@molted.ai?subject=PathwayAi ${tier.name} Inquiry`}
                  className="mt-8 block text-center px-6 py-3.5 rounded-xl font-semibold text-sm transition-all hover:-translate-y-px"
                  style={
                    tier.highlight
                      ? { background: VIOLET, color: '#fff', boxShadow: `0 0 20px ${VIOLET}35` }
                      : { border: '1px solid #3A3A40', color: '#86868B' }
                  }
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

/* ── CTA ────────────────────────────────────────────────────────────────── */
function CTA() {
  return (
    <section className="py-32 px-6 border-t border-molted-border">
      <div className="max-w-3xl mx-auto text-center">
        <RevealBlock>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            Your students deserve a path{' '}
            <span style={{ color: VIOLET }}>built for them.</span>
          </h2>
          <p className="mt-6 text-molted-muted text-xl leading-relaxed max-w-xl mx-auto">
            Generic education is a solved problem. The only question is whether your institution
            is ready to leave it behind.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:hello@molted.ai?subject=PathwayAi Demo Request"
              className="group flex items-center gap-2.5 px-8 py-4 rounded-xl text-white font-bold text-lg transition-all duration-200 hover:-translate-y-px"
              style={{ background: VIOLET, boxShadow: `0 0 24px ${VIOLET}40` }}
            >
              Start the Conversation
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              to="/molted"
              className="px-8 py-4 rounded-xl border border-molted-border text-molted-muted hover:text-molted-white font-semibold transition-all hover:border-molted-subtle"
            >
              ← Back to MoltED Ai
            </Link>
          </div>
          <div className="mt-10 pt-8 border-t border-molted-border flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-molted-muted">
            <Link to="/molted/paigebreaker" className="hover:text-molted-white transition-colors">
              pAIgeBreaker →
            </Link>
            <Link to="/molted/teachos" className="hover:text-molted-white transition-colors">
              TeachOS →
            </Link>
            <Link to="/molted/outcomes-ai" className="hover:text-molted-white transition-colors">
              OutcomesAi →
            </Link>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Page export ────────────────────────────────────────────────────────── */
export default function MoltedPathwayAi() {
  return (
    <MoltedLayout>
      <Hero />
      <FlatRoadProblem />
      <HowItLearns />
      <KnowledgeGraphMock />
      <StudentExperience />
      <ForInstitutions />
      <Pricing />
      <CTA />
    </MoltedLayout>
  );
}
