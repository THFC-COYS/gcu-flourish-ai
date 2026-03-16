import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Check, TrendingUp, AlertTriangle, BarChart2,
  FileText, Zap, Database, Eye, Clock, Award, BookOpen,
} from 'lucide-react';
import MoltedLayout from './MoltedLayout';

const SKY = '#0EA5E9';

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
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full"
          style={{ background: `radial-gradient(ellipse at center, ${SKY}14 0%, transparent 70%)` }}
        />
        <div
          className="absolute bottom-0 right-1/3 w-[500px] h-[400px] rounded-full"
          style={{ background: `radial-gradient(circle, ${SKY}08 0%, transparent 70%)` }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold mb-8 animate-fade-in"
          style={{ borderColor: `${SKY}40`, background: `${SKY}12`, color: SKY }}
        >
          <Eye size={12} /> MoltED · Institutional Intelligence Layer
        </div>

        {/* Wordmark */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight animate-reveal"
          style={{ color: SKY, textShadow: `0 0 40px ${SKY}40` }}
        >
          Outcomes
        </h1>

        {/* Position */}
        <p className="mt-6 text-molted-muted text-sm font-semibold uppercase tracking-widest animate-reveal" style={{ animationDelay: '100ms' }}>
          The intelligence layer for institutional leadership
        </p>

        {/* Tagline */}
        <p className="mt-4 text-2xl md:text-3xl font-bold text-molted-white animate-reveal" style={{ animationDelay: '150ms' }}>
          Finally know if any of it is working.
        </p>

        <p className="mt-5 text-lg text-molted-muted/80 max-w-2xl mx-auto leading-relaxed animate-reveal" style={{ animationDelay: '250ms' }}>
          Every product Molt builds generates data. Outcomes turns that data into decisions.
        </p>

        {/* Callout chip */}
        <div
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium animate-reveal"
          style={{ borderColor: `${SKY}30`, background: `${SKY}0D`, color: SKY, animationDelay: '300ms' }}
        >
          <Zap size={13} />
          Accreditation reports auto-generated in minutes, not weeks.
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-reveal" style={{ animationDelay: '350ms' }}>
          <a
            href="mailto:hello@molted.ai?subject=Outcomes Demo Request"
            className="group flex items-center gap-2.5 px-8 py-4 rounded-xl text-white font-bold text-lg transition-all duration-200 hover:-translate-y-px"
            style={{ background: SKY, boxShadow: `0 0 24px ${SKY}40` }}
          >
            See a Demo
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <Link
            to="/"
            className="px-8 py-4 rounded-xl border border-molted-border text-molted-muted hover:text-molted-white font-semibold transition-all hover:border-molted-subtle"
          >
            View Products →
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-molted-subtle animate-pulse">
        <div className="w-px h-10 bg-gradient-to-b from-molted-subtle to-transparent" />
      </div>
    </section>
  );
}

/* ── The Blind Spot ─────────────────────────────────────────────────────── */
function TheBlindSpot() {
  const problems = [
    'Grade distributions arrive weeks after it matters',
    'Retention data lives in 6 different systems',
    'Faculty performance is invisible to leadership',
    'Board reports take 6 weeks to compile manually',
    'Accreditation cycles cause annual institution-wide panic',
  ];

  const brokenTools = [
    { name: 'Banner', color: 'text-red-400' },
    { name: 'Canvas', color: 'text-orange-400' },
    { name: 'Blackboard', color: 'text-yellow-400' },
    { name: 'Excel', color: 'text-green-400' },
    { name: 'Manual Reports', color: 'text-blue-400' },
  ];

  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">The problem</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight leading-tight">
            The Blind Spot
          </h2>
        </RevealBlock>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: copy */}
          <RevealBlock>
            <p className="text-2xl md:text-3xl font-bold text-molted-white leading-tight mb-8">
              You are running a{' '}
              <span style={{ color: SKY }}>$500M institution</span>{' '}
              and can't see what's working in real time.
            </p>
            <ul className="space-y-4">
              {problems.map((p, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-molted-ember/20 border border-molted-ember/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <AlertTriangle size={10} className="text-molted-ember" />
                  </div>
                  <span className="text-molted-muted leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </RevealBlock>

          {/* Right: mock "Old Way" dashboard */}
          <RevealBlock delay={150}>
            <div className="bg-molted-elevated border border-molted-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
                <span className="ml-2 text-molted-muted text-xs font-mono">institutional-tools.old</span>
              </div>
              <p className="text-molted-muted text-xs font-semibold uppercase tracking-widest mb-4">
                Current State · Disconnected
              </p>
              <div className="space-y-3">
                {brokenTools.map((tool, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-3 rounded-xl bg-molted-surface border border-molted-border"
                  >
                    <div className="flex items-center gap-3">
                      <Database size={14} className={tool.color} />
                      <span className="text-molted-white text-sm font-medium">{tool.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-molted-muted text-xs">No API</span>
                      <div className="w-5 h-5 rounded-full bg-molted-ember/20 border border-molted-ember/40 flex items-center justify-center">
                        <span className="text-molted-ember text-xs font-bold">✕</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-molted-border flex items-center gap-2">
                <AlertTriangle size={13} className="text-molted-ember" />
                <span className="text-molted-ember text-xs">5 data sources. Zero unified view.</span>
              </div>
            </div>
          </RevealBlock>
        </div>
      </div>
    </section>
  );
}

/* ── What Outcomes Sees ───────────────────────────────────────────────── */
function WhatItSees() {
  const metrics = [
    {
      icon: TrendingUp,
      label: 'Learning Velocity',
      sub: 'Avg knowledge gain per student per week',
      value: '+2.3 SD',
      detail: 'above baseline',
      color: SKY,
    },
    {
      icon: Award,
      label: 'Retention Risk Index',
      sub: 'Predicted persistence this semester',
      value: '94.2%',
      detail: 'predicted persistence',
      color: '#10B981',
    },
    {
      icon: Eye,
      label: 'Faculty Effectiveness',
      sub: 'Anonymous · aggregated · institution-wide',
      value: '8.7 / 10',
      detail: 'composite score',
      color: '#F59E0B',
    },
    {
      icon: BarChart2,
      label: 'Engagement Depth',
      sub: 'Students actively participating vs. last semester',
      value: '78%',
      detail: 'vs 61% last semester',
      color: '#8B5CF6',
    },
    {
      icon: Clock,
      label: 'Time to Mastery',
      sub: 'Average weeks per unit of study',
      value: '4.2 wks',
      detail: 'down from 6.1',
      color: '#EC4899',
    },
    {
      icon: BookOpen,
      label: 'Outcome Alignment',
      sub: 'Course outcomes met at institution level',
      value: '87%',
      detail: 'of outcomes verified',
      color: SKY,
    },
  ];

  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Intelligence</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            What Outcomes sees.
          </h2>
          <p className="mt-4 text-molted-muted max-w-xl mx-auto">
            Real metrics. Real time. No spreadsheets required.
          </p>
        </RevealBlock>

        <div className="grid md:grid-cols-3 gap-5">
          {metrics.map((m, i) => (
            <RevealBlock key={i} delay={i * 80}>
              <div className="bg-molted-elevated border border-molted-border rounded-2xl p-6 hover:-translate-y-px hover:shadow-molted-card-hover transition-all">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${m.color}14`, border: `1px solid ${m.color}30` }}
                >
                  <m.icon size={18} style={{ color: m.color }} />
                </div>
                <p className="text-molted-muted text-xs font-semibold uppercase tracking-widest mb-1">{m.label}</p>
                <p className="text-molted-muted/60 text-xs mb-3 leading-snug">{m.sub}</p>
                <p className="text-3xl font-black text-molted-white" style={{ color: m.color }}>{m.value}</p>
                <p className="text-molted-muted text-xs mt-1">{m.detail}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Live Dashboard Mock ────────────────────────────────────────────────── */
function LiveDashboardMock() {
  const colleges = [
    { name: 'Nursing', value: 91, color: '#F87171' },
    { name: 'Education', value: 87, color: SKY },
    { name: 'Business', value: 94, color: '#34D399' },
    { name: 'Engineering', value: 82, color: '#FBBF24' },
    { name: 'Theology', value: 96, color: '#A78BFA' },
    { name: 'Law', value: 88, color: '#F97316' },
  ];

  const flags = [
    {
      college: 'College of Nursing',
      note: '12% grade decline in NURS301 cohort — action recommended',
      severity: 'high',
    },
    {
      college: 'College of Engineering',
      note: 'Retention risk elevated in junior cohort — 23 students flagged',
      severity: 'medium',
    },
    {
      college: 'Institution-Wide',
      note: 'SACSCOC standard 8.2a evidence package ready for review',
      severity: 'info',
    },
  ];

  const severityColor: Record<string, string> = {
    high: '#1E3A8A',
    medium: '#F59E0B',
    info: SKY,
  };

  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-12">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Live view</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            Your institution. Live.
          </h2>
          <p className="mt-4 text-molted-muted max-w-xl mx-auto">
            One dashboard. Every signal. No manual compilation.
          </p>
        </RevealBlock>

        <RevealBlock delay={150}>
          <div className="bg-molted-elevated border border-molted-border rounded-2xl overflow-hidden">
            {/* Dashboard header bar */}
            <div className="bg-molted-surface border-b border-molted-border px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: SKY }} />
                <span className="ml-2 text-molted-muted text-xs font-mono">outcomes.molted.ai · Live</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-molted-muted text-xs">Live</span>
              </div>
            </div>

            <div className="p-6">
              {/* Institution + semester label */}
              <div className="mb-6">
                <h3 className="text-molted-white font-bold text-lg">Flagship University</h3>
                <p className="text-molted-muted text-sm">Spring 2026 · Real-time snapshot</p>
              </div>

              {/* KPI bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Enrollment', value: '22,847', icon: '🎓' },
                  { label: 'Predicted Graduates', value: '21,103', icon: '🏆' },
                  { label: 'Risk Flags', value: '127', icon: '⚠️', highlight: true },
                  { label: 'Accreditation Score', value: '94.2%', icon: '✅' },
                ].map((kpi, i) => (
                  <div
                    key={i}
                    className={`rounded-xl p-4 border ${
                      kpi.highlight
                        ? 'bg-molted-ember/10 border-molted-ember/30'
                        : 'bg-molted-surface border-molted-border'
                    }`}
                  >
                    <p className="text-lg mb-1">{kpi.icon}</p>
                    <p className={`text-xl font-black ${kpi.highlight ? 'text-molted-ember' : 'text-molted-white'}`}>
                      {kpi.value}
                    </p>
                    <p className="text-molted-muted text-xs mt-0.5">{kpi.label}</p>
                  </div>
                ))}
              </div>

              {/* Bar chart: Learning Outcomes by College */}
              <div className="mb-8">
                <p className="text-molted-muted text-xs font-semibold uppercase tracking-widest mb-4">
                  Learning Outcomes by College
                </p>
                <div className="space-y-3">
                  {colleges.map((col, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-molted-muted text-xs w-24 text-right flex-shrink-0">{col.name}</span>
                      <div className="flex-1 h-6 bg-molted-surface rounded-lg overflow-hidden">
                        <div
                          className="h-full rounded-lg transition-all"
                          style={{ width: `${col.value}%`, background: col.color, opacity: 0.8 }}
                        />
                      </div>
                      <span className="text-molted-white text-xs font-bold w-8 flex-shrink-0">{col.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flagged Insights */}
              <div>
                <p className="text-molted-muted text-xs font-semibold uppercase tracking-widest mb-4">
                  Flagged Insights · {flags.length} active
                </p>
                <div className="space-y-3">
                  {flags.map((flag, i) => (
                    <div
                      key={i}
                      className="flex items-start justify-between gap-4 p-4 rounded-xl border bg-molted-surface"
                      style={{ borderColor: `${severityColor[flag.severity]}30` }}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                          style={{ background: severityColor[flag.severity] }}
                        />
                        <div className="min-w-0">
                          <p className="text-molted-white text-sm font-semibold">{flag.college}</p>
                          <p className="text-molted-muted text-xs mt-0.5 leading-relaxed">{flag.note}</p>
                        </div>
                      </div>
                      <button
                        className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:-translate-y-px"
                        style={{ background: `${severityColor[flag.severity]}18`, color: severityColor[flag.severity], border: `1px solid ${severityColor[flag.severity]}30` }}
                      >
                        Review
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Accreditation on Autopilot ─────────────────────────────────────────── */
function AccreditationAutopilot() {
  const [visibleSections, setVisibleSections] = useState(2);

  const reportSections = [
    { id: '3.1', title: 'Institutional Mission', status: 'complete' },
    { id: '4.1', title: 'Academic Program Quality', status: 'complete' },
    { id: '5.2', title: 'Faculty Credentials & Qualifications', status: 'generating' },
    { id: '6.1', title: 'Financial Resources', status: 'pending' },
    { id: '7.3', title: 'Institutional Effectiveness', status: 'pending' },
    { id: '8.2', title: 'Student Outcomes Assessment', status: 'pending' },
  ];

  const statusColor: Record<string, string> = {
    complete: '#10B981',
    generating: SKY,
    pending: '#3A3A40',
  };

  const statusLabel: Record<string, string> = {
    complete: '✓ Complete',
    generating: '⟳ Generating…',
    pending: '○ Queued',
  };

  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Compliance</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            Accreditation on Autopilot.
          </h2>
        </RevealBlock>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: copy */}
          <RevealBlock>
            <p className="text-2xl font-bold text-molted-white mb-6 leading-tight">
              SACSCOC. HLC. WASC. ACEN.<br />
              <span className="text-molted-muted font-normal text-xl mt-2 block">
                Every accreditation cycle takes 6 weeks of faculty time — compiling evidence that Outcomes has been collecting all year.
              </span>
            </p>
            <ul className="space-y-4">
              {[
                'Evidence auto-tagged to standards as it\'s generated',
                'Narrative sections drafted from institutional data',
                'Faculty workload reduced by an estimated 80%',
                'Continuous compliance — no more annual panic',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${SKY}18`, border: `1px solid ${SKY}30` }}
                  >
                    <Check size={10} style={{ color: SKY }} />
                  </div>
                  <span className="text-molted-muted leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-molted-border text-molted-muted text-sm">
              <FileText size={13} />
              Supports: SACSCOC · HLC · WASC · ACEN · CAEP · AACSB
            </div>
          </RevealBlock>

          {/* Right: auto-generating report mock */}
          <RevealBlock delay={150}>
            <div className="bg-molted-elevated border border-molted-border rounded-2xl overflow-hidden">
              <div className="bg-molted-surface border-b border-molted-border px-5 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText size={14} style={{ color: SKY }} />
                  <span className="text-molted-white text-sm font-semibold">SACSCOC Self-Study · 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: SKY }} />
                  <span className="text-xs" style={{ color: SKY }}>Auto-generating</span>
                </div>
              </div>

              <div className="p-5">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-molted-muted text-xs">Report completion</span>
                    <span className="text-xs font-bold" style={{ color: SKY }}>
                      {Math.round((visibleSections / reportSections.length) * 100)}%
                    </span>
                  </div>
                  <div className="h-2 bg-molted-surface rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(visibleSections / reportSections.length) * 100}%`,
                        background: `linear-gradient(90deg, ${SKY}, #38BDF8)`,
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2.5">
                  {reportSections.map((sec, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-lg border"
                      style={{ borderColor: `${statusColor[sec.status]}25`, background: `${statusColor[sec.status]}08` }}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-molted-muted text-xs font-mono">{sec.id}</span>
                        <span className="text-molted-white text-sm">{sec.title}</span>
                      </div>
                      <span className="text-xs font-medium" style={{ color: statusColor[sec.status] }}>
                        {statusLabel[sec.status]}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setVisibleSections(v => Math.min(v + 1, reportSections.length))}
                  className="mt-4 w-full py-2.5 rounded-xl text-xs font-semibold transition-all hover:-translate-y-px"
                  style={{ background: `${SKY}15`, color: SKY, border: `1px solid ${SKY}30` }}
                >
                  ▶ Continue generating…
                </button>
              </div>
            </div>
          </RevealBlock>
        </div>
      </div>
    </section>
  );
}

/* ── Integration ────────────────────────────────────────────────────────── */
function Integration() {
  const sources = [
    { name: 'Lumen', desc: 'Student learning interactions', color: '#64748B' },
    { name: 'Persona Ai', desc: 'Student support conversations', color: '#1E3A8A' },
    { name: 'Forge', desc: 'Faculty & curriculum signals', color: '#10B981' },
    { name: 'More coming', desc: 'Expanding ecosystem', color: '#3A3A40' },
  ];

  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Ecosystem</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            Outcomes reads every<br />Molt product.
          </h2>
          <p className="mt-4 text-molted-muted max-w-xl mx-auto">
            Every interaction, every session, every signal — unified into one institutional view.
          </p>
        </RevealBlock>

        <RevealBlock delay={150}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
            {sources.map((src, i) => (
              <div key={i} className="flex items-center gap-4 md:gap-0">
                <div
                  className="bg-molted-elevated border rounded-2xl px-6 py-5 text-center min-w-[140px]"
                  style={{ borderColor: `${src.color}30` }}
                >
                  <p className="text-molted-white font-bold text-sm">{src.name}</p>
                  <p className="text-molted-muted text-xs mt-1">{src.desc}</p>
                </div>
                {i < sources.length - 1 && (
                  <div className="flex items-center gap-1 mx-2 md:mx-3 text-molted-muted">
                    <div className="w-6 md:w-8 h-px bg-molted-border" />
                    <ArrowRight size={14} style={{ color: SKY }} />
                  </div>
                )}
              </div>
            ))}
            <div className="flex items-center gap-4 md:gap-0 mt-4 md:mt-0">
              <div className="flex items-center gap-1 mx-2 md:mx-3 text-molted-muted">
                <div className="w-6 md:w-8 h-px bg-molted-border" />
                <ArrowRight size={14} style={{ color: SKY }} />
              </div>
              <div
                className="bg-molted-elevated border-2 rounded-2xl px-8 py-6 text-center"
                style={{ borderColor: SKY, boxShadow: `0 0 32px ${SKY}20` }}
              >
                <p className="text-lg font-black" style={{ color: SKY }}>Outcomes</p>
                <p className="text-molted-muted text-xs mt-1">Intelligence layer</p>
              </div>
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Pricing ────────────────────────────────────────────────────────────── */
function Pricing() {
  const tiers = [
    {
      name: 'Department',
      price: '$399',
      period: '/mo',
      tag: 'Department-level analytics.',
      features: [
        'Department-wide outcome tracking',
        'Learning velocity & engagement metrics',
        'Weekly automated reports',
        'Lumen & Persona Ai integration',
        'Email support',
      ],
      cta: 'Start with a Department',
      highlight: false,
    },
    {
      name: 'Institution',
      price: 'Custom',
      period: '',
      tag: 'Full institutional intelligence.',
      features: [
        'All Department features',
        'Cross-college unified dashboard',
        'Accreditation auto-generation (SACSCOC, HLC, WASC)',
        'Board-ready report packages',
        'Risk flagging & intervention workflows',
        'Teach & full Molt suite integration',
        'Dedicated success manager',
        'SLA & compliance support',
      ],
      cta: 'Talk to Our Team',
      highlight: true,
    },
  ];

  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-4xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Investment</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            Priced for institutions.
          </h2>
          <p className="mt-4 text-molted-muted">Start at department level. Scale to the whole institution.</p>
        </RevealBlock>

        <div className="grid md:grid-cols-2 gap-6">
          {tiers.map((tier, i) => (
            <RevealBlock key={i} delay={i * 120}>
              <div
                className={`rounded-2xl p-8 h-full flex flex-col border transition-all hover:-translate-y-px ${
                  tier.highlight
                    ? 'bg-molted-elevated border-2'
                    : 'bg-molted-elevated border-molted-border hover:border-molted-subtle'
                }`}
                style={tier.highlight ? { borderColor: SKY, boxShadow: `0 0 40px ${SKY}15` } : {}}
              >
                {tier.highlight && (
                  <span className="inline-block mb-4 text-xs font-bold uppercase tracking-wider" style={{ color: SKY }}>
                    ★ Recommended
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
                      <Check size={14} className="flex-shrink-0 mt-0.5" style={{ color: tier.highlight ? SKY : '#86868B' }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={`mailto:hello@molted.ai?subject=Outcomes ${tier.name} Inquiry`}
                  className="mt-8 block text-center px-6 py-3.5 rounded-xl font-semibold text-sm transition-all hover:-translate-y-px"
                  style={
                    tier.highlight
                      ? { background: SKY, color: '#fff', boxShadow: `0 0 20px ${SKY}35` }
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
            Stop flying blind.
          </h2>
          <p className="mt-6 text-molted-muted text-xl leading-relaxed max-w-xl mx-auto">
            Outcomes gives you the view your institution has always deserved.
            Know what's working. Fix what isn't. Prove it to your board.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@university.edu"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 w-full px-5 py-4 rounded-xl bg-molted-elevated border border-molted-border text-molted-white placeholder:text-molted-muted text-sm focus:outline-none focus:border-sky-500 transition-colors"
            />
            <a
              href={`mailto:hello@molted.ai?subject=Outcomes Demo&body=From: ${email}`}
              className="flex-shrink-0 flex items-center gap-2 px-6 py-4 rounded-xl font-bold text-sm text-white transition-all hover:-translate-y-px"
              style={{ background: SKY, boxShadow: `0 0 20px ${SKY}35` }}
            >
              Request Demo
              <ArrowRight size={16} />
            </a>
          </div>
          <div className="mt-10 pt-8 border-t border-molted-border flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/"
              className="text-molted-muted hover:text-molted-white text-sm transition-colors"
            >
              ← Back to MoltED
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
export default function MoltedOutcomes() {
  return (
    <MoltedLayout>
      <Hero />
      <TheBlindSpot />
      <WhatItSees />
      <LiveDashboardMock />
      <AccreditationAutopilot />
      <Integration />
      <Pricing />
      <CTA />
    </MoltedLayout>
  );
}
