import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Check, GitBranch, Zap, Map, Brain,
  BookOpen, AlertTriangle, ChevronRight, Users, BarChart2, Lightbulb,
} from 'lucide-react';
import MoltedLayout from './MoltedLayout';

const VIOLET = '#8B5CF6';
const VIOLET_DIM = 'rgba(139,92,246,0.12)';
const VIOLET_BORDER = 'rgba(139,92,246,0.22)';

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
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[700px] rounded-full"
          style={{ background: `radial-gradient(ellipse at center, rgba(139,92,246,0.10) 0%, transparent 70%)` }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[500px] h-[400px] rounded-full"
          style={{ background: `radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)` }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Status chip */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold mb-8 animate-fade-in"
          style={{ borderColor: VIOLET_BORDER, background: VIOLET_DIM, color: VIOLET }}
        >
          <GitBranch size={12} /> In Development · Early Access
        </div>

        {/* Wordmark */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight animate-reveal"
          style={{ color: VIOLET, textShadow: '0 0 40px rgba(139,92,246,0.35)' }}
        >
          Pathway
        </h1>

        {/* Headline */}
        <p
          className="mt-8 text-2xl md:text-3xl lg:text-4xl font-bold text-molted-white leading-tight animate-reveal"
          style={{ animationDelay: '100ms' }}
        >
          Every student on their own learning path.
        </p>

        {/* Subtext */}
        <p
          className="mt-5 text-lg text-molted-muted/80 max-w-2xl mx-auto leading-relaxed animate-reveal"
          style={{ animationDelay: '200ms' }}
        >
          Pathway learns what each student knows, what they're missing, and what they need
          next — then builds a personalized learning path in real time. Not the same road for
          everyone. A different road for every student.
        </p>

        {/* CTAs */}
        <div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-reveal"
          style={{ animationDelay: '280ms' }}
        >
          <a
            href="mailto:hello@molted.ai?subject=Pathway Early Access"
            className="group flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:-translate-y-px"
            style={{ background: VIOLET, color: '#0A0A0B', boxShadow: `0 0 28px rgba(139,92,246,0.35)` }}
          >
            Get Early Access
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#how-it-learns"
            className="px-8 py-4 rounded-xl border border-molted-border text-molted-muted hover:text-molted-white font-semibold transition-all hover:border-molted-subtle"
          >
            Learn More →
          </a>
        </div>

        {/* Callout chip */}
        <div
          className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium animate-reveal"
          style={{ borderColor: VIOLET_BORDER, background: VIOLET_DIM, color: VIOLET, animationDelay: '340ms' }}
        >
          <Zap size={13} />
          Powered by every Lumen interaction — no extra setup required.
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-molted-subtle animate-pulse">
        <div className="w-px h-10 bg-gradient-to-b from-molted-subtle to-transparent" />
      </div>
    </section>
  );
}

/* ── The Problem ────────────────────────────────────────────────────────── */
function TheProblem() {
  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">The problem</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight leading-tight">
            Every student takes the exact same road.<br />
            <span className="text-molted-muted font-normal text-3xl md:text-4xl">None of them are the same person.</span>
          </h2>
        </RevealBlock>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: stat copy */}
          <RevealBlock>
            <div className="space-y-6">
              <p className="text-molted-muted text-lg leading-relaxed">
                The traditional curriculum is a straight line. Every student starts at mile 0
                and walks to mile 100.
              </p>
              <div className="bg-molted-elevated border border-molted-border rounded-2xl p-6 space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-molted-ember/20 border border-molted-ember/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <AlertTriangle size={10} className="text-molted-ember" />
                  </div>
                  <p className="text-molted-muted text-sm leading-relaxed">
                    Whether they already know miles 1–30.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-molted-ember/20 border border-molted-ember/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <AlertTriangle size={10} className="text-molted-ember" />
                  </div>
                  <p className="text-molted-muted text-sm leading-relaxed">
                    Whether miles 40–60 are where they break.
                  </p>
                </div>
                <div className="pt-4 border-t border-molted-border">
                  <p className="text-molted-white text-sm font-semibold">
                    Students who know the material are bored. Students with gaps are lost.
                    Nobody gets what they actually need.
                  </p>
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* Right: road metaphor — CSS only, no SVG */}
          <RevealBlock delay={150}>
            <div className="bg-molted-elevated border border-molted-border rounded-2xl p-6 space-y-8">
              <p className="text-molted-muted text-xs font-semibold uppercase tracking-widest">
                Two paths. One winner.
              </p>

              {/* Traditional road */}
              <div>
                <p className="text-molted-muted text-xs font-semibold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-molted-subtle inline-block" />
                  Traditional
                </p>
                <div className="flex items-center gap-0">
                  {['Mile 0', 'Mile 25', 'Mile 50', 'Mile 75', 'Mile 100'].map((m, i) => (
                    <div key={i} className="flex items-center flex-1 last:flex-none">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-molted-subtle border border-molted-border" />
                        <span className="text-molted-subtle text-[10px] whitespace-nowrap">{m}</span>
                      </div>
                      {i < 4 && <div className="flex-1 h-px bg-molted-border mx-1" />}
                    </div>
                  ))}
                </div>
                <p className="text-molted-muted/50 text-xs mt-2 italic">Same road. Every student. No exceptions.</p>
              </div>

              {/* Pathway branching road */}
              <div>
                <p className="text-xs font-semibold mb-3 flex items-center gap-2" style={{ color: VIOLET }}>
                  <span className="w-2 h-2 rounded-full inline-block" style={{ background: VIOLET }} />
                  Pathway
                </p>
                <div className="space-y-2.5">
                  {/* Entry */}
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: VIOLET }} />
                    <div className="h-px flex-1" style={{ background: VIOLET_BORDER }} />
                    <span className="text-xs text-molted-muted px-2 py-0.5 rounded bg-molted-surface border border-molted-border">
                      Where you actually are
                    </span>
                  </div>
                  {/* Branch nodes */}
                  <div className="ml-1.5 pl-4 border-l-2 space-y-2" style={{ borderColor: VIOLET_BORDER }}>
                    <div
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs border"
                      style={{ background: VIOLET_DIM, borderColor: VIOLET_BORDER, color: VIOLET }}
                    >
                      <Check size={11} /> You already know this → skip
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs border border-amber-500/30 bg-amber-500/10 text-amber-400">
                      <AlertTriangle size={11} /> Gap detected
                    </div>
                    <div
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs border"
                      style={{ background: VIOLET_DIM, borderColor: VIOLET_BORDER, color: VIOLET }}
                    >
                      <GitBranch size={11} /> Custom route built
                    </div>
                  </div>
                  {/* Exit */}
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: VIOLET }} />
                    <div className="h-px flex-1" style={{ background: VIOLET_BORDER }} />
                    <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ color: VIOLET, background: VIOLET_DIM }}>
                      Mastery — your way
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </div>
    </section>
  );
}

/* ── How Pathway Learns ───────────────────────────────────────────────── */
function HowItLearns() {
  const steps = [
    {
      num: '01',
      icon: BookOpen,
      title: 'Every interaction is intelligence.',
      body: 'Lumen logs each question, each concept, each struggle. Pathway reads the signal.',
    },
    {
      num: '02',
      icon: Brain,
      title: 'Your knowledge graph builds.',
      body: 'Mastered concepts light up. Gaps appear. Dependencies become visible.',
    },
    {
      num: '03',
      icon: Map,
      title: 'Your path adjusts before you fall.',
      body: "Pathway surfaces what you need next — not what the syllabus says is next. The difference is everything.",
    },
  ];

  return (
    <section id="how-it-learns" className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">How it works</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            How Pathway learns.
          </h2>
          <p className="mt-4 text-molted-muted max-w-xl mx-auto">
            No surveys. No onboarding quizzes. It learns by watching students learn.
          </p>
        </RevealBlock>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <RevealBlock key={i} delay={i * 120}>
              <div
                className="bg-molted-elevated border border-molted-border rounded-2xl p-7 h-full flex flex-col hover:-translate-y-px transition-all"
                style={i === 2 ? { borderColor: VIOLET_BORDER } : {}}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-4xl font-black leading-none" style={{ color: VIOLET_BORDER }}>
                    {s.num}
                  </span>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: VIOLET_DIM, border: `1px solid ${VIOLET_BORDER}` }}
                  >
                    <s.icon size={18} style={{ color: VIOLET }} />
                  </div>
                </div>
                <h3 className="text-molted-white font-bold text-lg leading-snug mb-3">{s.title}</h3>
                <p className="text-molted-muted text-sm leading-relaxed flex-1">{s.body}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Knowledge Graph Mock ───────────────────────────────────────────────── */
type NodeStatus = 'mastered' | 'gap' | 'struggling' | 'next' | 'unreached';

interface GraphNode {
  label: string;
  status: NodeStatus;
  badge: string;
}

const GRAPH_NODES: GraphNode[] = [
  { label: 'Mitosis ✓', status: 'mastered', badge: 'Mastered' },
  { label: 'Meiosis', status: 'gap', badge: 'Gap detected' },
  { label: 'ATP Synthesis', status: 'struggling', badge: 'Struggling' },
  { label: 'Photosynthesis ✓', status: 'mastered', badge: 'Mastered' },
  { label: 'DNA Replication → next', status: 'next', badge: 'Up next' },
  { label: 'Protein Synthesis', status: 'unreached', badge: 'Not reached' },
];

const NODE_STYLE: Record<NodeStatus, { border: string; color: string; bg: string }> = {
  mastered: { border: VIOLET_BORDER, color: VIOLET, bg: VIOLET_DIM },
  gap: { border: 'rgba(245,158,11,0.40)', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)' },
  struggling: { border: 'rgba(239,68,68,0.35)', color: '#EF4444', bg: 'rgba(239,68,68,0.08)' },
  next: { border: 'rgba(20,184,166,0.40)', color: '#14B8A6', bg: 'rgba(20,184,166,0.08)' },
  unreached: { border: '#3A3A40', color: '#86868B', bg: 'rgba(58,58,64,0.20)' },
};

// Six surrounding nodes mapped to absolute positions around a center box
const NODE_POSITIONS = [
  'top-2 left-1/2 -translate-x-1/2',   // top center
  'top-2 right-2',                       // top right
  'top-1/2 right-2 -translate-y-1/2',   // mid right
  'bottom-2 right-2',                    // bottom right
  'bottom-2 left-2',                     // bottom left
  'top-1/2 left-2 -translate-y-1/2',    // mid left
];

function KnowledgeGraphMock() {
  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Knowledge graph</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            See exactly where each student stands.
          </h2>
          <p className="mt-4 text-molted-muted max-w-xl mx-auto">
            A live map of what they know, what they don't, and what's blocking them.
          </p>
        </RevealBlock>

        <RevealBlock delay={100}>
          <div className="bg-molted-elevated border border-molted-border rounded-2xl p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-molted-white font-bold text-lg">Jordan M. · Knowledge Map</p>
                <p className="text-molted-muted text-sm">Biology 201 · Week 6 of 16</p>
              </div>
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border"
                style={{ borderColor: VIOLET_BORDER, background: VIOLET_DIM }}
              >
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: VIOLET }} />
                <span className="text-xs font-semibold" style={{ color: VIOLET }}>Live graph</span>
              </div>
            </div>

            {/* Graph area — central concept + surrounding nodes via divs */}
            <div className="relative h-64 md:h-80 mb-8">
              {/* Center node */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 px-5 py-3 rounded-2xl border-2 text-center"
                style={{ borderColor: VIOLET, background: VIOLET_DIM, boxShadow: `0 0 32px rgba(139,92,246,0.20)` }}
              >
                <p className="text-molted-white font-black text-base">Cell Biology</p>
                <p className="text-molted-muted text-xs mt-0.5">Core concept</p>
              </div>

              {/* Surrounding nodes */}
              {GRAPH_NODES.map((node, i) => {
                const s = NODE_STYLE[node.status];
                return (
                  <div
                    key={i}
                    className={`absolute px-3 py-2 rounded-xl border text-center ${NODE_POSITIONS[i]}`}
                    style={{ borderColor: s.border, background: s.bg, minWidth: 110 }}
                  >
                    <p className="text-xs font-semibold" style={{ color: s.color }}>{node.label}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: s.color, opacity: 0.7 }}>{node.badge}</p>
                    {node.status === 'next' && (
                      <span
                        className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-ping"
                        style={{ background: s.color, opacity: 0.6 }}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Pathway suggestion card */}
            <div
              className="rounded-2xl border p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              style={{ borderColor: VIOLET_BORDER, background: VIOLET_DIM }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: VIOLET_DIM, border: `1px solid ${VIOLET_BORDER}` }}
                >
                  <Lightbulb size={15} style={{ color: VIOLET }} />
                </div>
                <div>
                  <p className="text-molted-muted text-xs font-semibold uppercase tracking-wider mb-1">Pathway Suggestion</p>
                  <p className="text-molted-white text-sm leading-relaxed">
                    You've mastered Mitosis but Meiosis is blocking your path to Genetics.
                    Let's fix that now.
                  </p>
                </div>
              </div>
              <button
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-px whitespace-nowrap"
                style={{ background: VIOLET, color: '#0A0A0B' }}
              >
                Start this module →
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Before / After ─────────────────────────────────────────────────────── */
function BeforeAfter() {
  const before = [
    'Linear syllabus — same for every student',
    'Student guesses what to study',
    'Generic feedback after the fact',
    'Falls behind without warning',
    'Teacher discovers gaps at exam time',
  ];

  const after = [
    'Adaptive path personalized to knowledge state',
    "Pathway tells you exactly what's next",
    'Proactive gap detection in real time',
    'Targeted intervention before falling behind',
    'Teacher gets class-level gap reports weekly',
  ];

  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">The difference</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            Before Pathway. After Pathway.
          </h2>
        </RevealBlock>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Before */}
          <RevealBlock>
            <div className="bg-molted-elevated border border-molted-border rounded-2xl p-7 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-xl bg-molted-ember/15 border border-molted-ember/30 flex items-center justify-center">
                  <AlertTriangle size={15} className="text-molted-ember" />
                </div>
                <div>
                  <p className="text-molted-white font-bold text-base">Before Pathway</p>
                  <p className="text-molted-muted text-xs">The old way</p>
                </div>
              </div>
              <ul className="space-y-3">
                {before.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-molted-muted">
                    <div className="w-4 h-4 rounded-full bg-molted-ember/15 border border-molted-ember/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-molted-ember text-[9px] font-bold">✕</span>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>

          {/* After */}
          <RevealBlock delay={120}>
            <div
              className="bg-molted-elevated rounded-2xl p-7 h-full border-2"
              style={{ borderColor: VIOLET_BORDER, boxShadow: `0 0 40px rgba(139,92,246,0.10)` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: VIOLET_DIM, border: `1px solid ${VIOLET_BORDER}` }}
                >
                  <GitBranch size={15} style={{ color: VIOLET }} />
                </div>
                <div>
                  <p className="text-molted-white font-bold text-base">After Pathway</p>
                  <p className="text-xs" style={{ color: VIOLET }}>The right way</p>
                </div>
              </div>
              <ul className="space-y-3">
                {after.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-molted-muted">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: VIOLET_DIM, border: `1px solid ${VIOLET_BORDER}` }}
                    >
                      <Check size={9} style={{ color: VIOLET }} />
                    </div>
                    {item}
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
  const benefits = [
    {
      icon: BarChart2,
      title: "Completion rates rise when students don't fall through the cracks.",
      body: "When students get the right content at the right time, they finish. Pathway catches the gaps that become quiet departures.",
    },
    {
      icon: Users,
      title: 'Faculty get class-level gap reports.',
      body: 'See exactly where your cohort is struggling — aggregated, anonymous, actionable — before exam week.',
    },
    {
      icon: Lightbulb,
      title: 'Students feel seen, not processed.',
      body: 'A curriculum that responds to who they are — not who the average student is. Engagement and belonging follow.',
    },
    {
      icon: Brain,
      title: 'Built on real interaction data — not invented learning science.',
      body: 'Pathway works from actual Lumen interactions: what students asked, struggled with, and mastered. Real signal.',
    },
  ];

  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">For institutions</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            Why institutions deploy Pathway.
          </h2>
          <p className="mt-4 text-molted-muted max-w-xl mx-auto">
            Personalized learning isn't just a student benefit. It's an institutional outcome.
          </p>
        </RevealBlock>

        <div className="grid md:grid-cols-2 gap-5">
          {benefits.map((b, i) => (
            <RevealBlock key={i} delay={i * 100}>
              <div className="bg-molted-elevated border border-molted-border rounded-2xl p-7 h-full hover:-translate-y-px transition-all">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: VIOLET_DIM, border: `1px solid ${VIOLET_BORDER}` }}
                >
                  <b.icon size={18} style={{ color: VIOLET }} />
                </div>
                <h3 className="text-molted-white font-bold text-base mb-2 leading-snug">{b.title}</h3>
                <p className="text-molted-muted text-sm leading-relaxed">{b.body}</p>
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
      tag: 'Personal adaptive learning.',
      features: [
        'Personalized learning path',
        'Knowledge gap detection',
        'Real-time path adjustment',
        'Works with any Lumen session',
      ],
      cta: 'Get Early Access',
      highlight: false,
    },
    {
      name: 'Department',
      price: '$299',
      period: '/mo',
      tag: 'Up to 500 students.',
      features: [
        'All Student features',
        'Class-level gap reports for faculty',
        'Cohort knowledge dashboards',
        'Weekly automated insights',
        'Faculty alert system',
        'Lumen integration',
      ],
      cta: 'Start a Department',
      highlight: true,
    },
    {
      name: 'Institution',
      price: 'Custom',
      period: '',
      tag: 'Unlimited students. Full integration.',
      features: [
        'All Department features',
        'Unlimited student seats',
        'Cross-department analytics',
        'Forge & OutcomesAi integration',
        'Accreditation reporting layer',
        'Dedicated success manager',
      ],
      cta: 'Talk to Our Team',
      highlight: false,
    },
  ];

  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-5xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            Start with one student. Scale to a university.
          </h2>
        </RevealBlock>

        <div className="grid md:grid-cols-3 gap-5">
          {tiers.map((tier, i) => (
            <RevealBlock key={i} delay={i * 100}>
              <div
                className={`rounded-2xl p-7 h-full flex flex-col border transition-all hover:-translate-y-px ${
                  tier.highlight ? 'border-2 bg-molted-elevated' : 'border-molted-border bg-molted-elevated'
                }`}
                style={tier.highlight ? { borderColor: VIOLET, boxShadow: `0 0 40px rgba(139,92,246,0.12)` } : {}}
              >
                {tier.highlight && (
                  <span className="inline-block mb-4 text-xs font-bold uppercase tracking-wider" style={{ color: VIOLET }}>
                    ★ Most popular
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
                        size={13}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: tier.highlight ? VIOLET : '#86868B' }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={`mailto:hello@molted.ai?subject=Pathway ${tier.name} Inquiry`}
                  className="mt-8 block text-center px-6 py-3.5 rounded-xl font-semibold text-sm transition-all hover:-translate-y-px"
                  style={
                    tier.highlight
                      ? { background: VIOLET, color: '#0A0A0B', boxShadow: `0 0 20px rgba(139,92,246,0.30)` }
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
  const [email, setEmail] = useState('');

  return (
    <section className="py-32 px-6 border-t border-molted-border">
      <div className="max-w-3xl mx-auto text-center">
        <RevealBlock>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            Your students deserve a path built for them.
          </h2>
          <p className="mt-6 text-molted-muted text-xl leading-relaxed max-w-xl mx-auto">
            Pathway is in early access. Be among the first institutions to give every student
            their own road.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@university.edu"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 w-full px-5 py-4 rounded-xl bg-molted-elevated border border-molted-border text-molted-white placeholder:text-molted-muted text-sm focus:outline-none focus:border-violet-500 transition-colors"
            />
            <a
              href={`mailto:hello@molted.ai?subject=Pathway Early Access&body=From: ${email}`}
              className="flex-shrink-0 flex items-center gap-2 px-6 py-4 rounded-xl font-bold text-sm transition-all hover:-translate-y-px"
              style={{ background: VIOLET, color: '#0A0A0B', boxShadow: `0 0 20px rgba(139,92,246,0.30)` }}
            >
              Request Access
              <ArrowRight size={16} />
            </a>
          </div>
          <div className="mt-10 pt-8 border-t border-molted-border flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/"
              className="text-molted-muted hover:text-molted-white text-sm transition-colors"
            >
              ← Back to Molt
            </Link>
            <Link
              to="/paigebreaker"
              className="text-molted-muted hover:text-molted-white text-sm transition-colors"
            >
              Explore Lumen →
            </Link>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Page export ────────────────────────────────────────────────────────── */
export default function MoltedPathway() {
  return (
    <MoltedLayout>
      <Hero />
      <TheProblem />
      <HowItLearns />
      <KnowledgeGraphMock />
      <BeforeAfter />
      <ForInstitutions />
      <Pricing />
      <CTA />
    </MoltedLayout>
  );
}
