import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ChevronRight, TrendingDown, Bell, AlertTriangle,
  Users, DollarSign, Activity, MessageSquare, Clock, BarChart3,
  CheckCircle, Send, RefreshCw,
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

/* ── RetainAi accent ───────────────────────────────────────────────────── */
const ROSE = '#F43F5E';
const ROSE_DIM = 'rgba(244,63,94,0.12)';
const ROSE_BORDER = 'rgba(244,63,94,0.25)';
const ROSE_GLOW = '0 0 30px rgba(244,63,94,0.12), 0 0 60px rgba(244,63,94,0.06)';

/* ── Hero ──────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(244,63,94,0.06) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(232,23,15,0.03) 0%, transparent 70%)' }}
        />
      </div>

      {/* ROI chip */}
      <RevealBlock className="mb-8">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase"
          style={{ background: ROSE_DIM, border: `1px solid ${ROSE_BORDER}`, color: ROSE }}
        >
          <DollarSign size={12} />
          Every 1% improvement in retention = $1–3M in annual revenue.
        </div>
      </RevealBlock>

      {/* Wordmark */}
      <RevealBlock delay={100}>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight">
          <span className="text-molted-white/90">Retain</span>
          <span
            style={{
              color: ROSE,
              textShadow: `0 0 40px rgba(244,63,94,0.5), 0 0 80px rgba(244,63,94,0.2)`,
            }}
          >
            Ai
          </span>
        </h1>
      </RevealBlock>

      {/* Position */}
      <RevealBlock delay={200}>
        <p className="mt-6 text-xl md:text-2xl font-black text-molted-white/70 tracking-tight max-w-2xl">
          The most expensive problem in higher education. Solved.
        </p>
      </RevealBlock>

      {/* Headline */}
      <RevealBlock delay={300}>
        <p className="mt-4 text-3xl md:text-4xl font-black text-molted-white tracking-tight leading-snug max-w-3xl">
          40% of students leave before they graduate.
          <br />
          <span style={{ color: ROSE }}>Most of them never say why.</span>
        </p>
      </RevealBlock>

      {/* Sub */}
      <RevealBlock delay={400}>
        <p className="mt-6 text-molted-muted text-lg max-w-xl leading-relaxed">
          RetainAi identifies students at risk of leaving — weeks before they decide —
          and puts the right support in front of them before it's too late.
        </p>
      </RevealBlock>

      {/* CTAs */}
      <RevealBlock delay={500} className="mt-10 flex flex-col sm:flex-row items-center gap-4">
        <a
          href="#early-warning"
          className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold transition-all duration-200 hover:-translate-y-px text-white"
          style={{ background: ROSE }}
        >
          See Early Warning in Action
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </a>
        <a
          href="#roi"
          className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-molted-border hover:border-molted-subtle text-molted-muted hover:text-molted-white font-semibold transition-all duration-200"
        >
          Calculate Your ROI
          <ChevronRight size={16} />
        </a>
      </RevealBlock>

      {/* Tagline */}
      <RevealBlock delay={600} className="mt-16">
        <p className="text-molted-subtle text-sm italic tracking-wide">
          "Every student who was about to leave — didn't."
        </p>
      </RevealBlock>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-molted-subtle animate-pulse">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-molted-subtle to-transparent" />
      </div>
    </section>
  );
}

/* ── The Silent Departure ──────────────────────────────────────────────── */
function SilentDeparture() {
  const weeks = [
    { week: 'Wk 1', label: 'Enrolled, excited', status: 'good' },
    { week: 'Wk 3', label: 'First assignment missed', status: 'signal', retainSpot: true },
    { week: 'Wk 5', label: 'Engagement drops', status: 'warning', retainSpot: true },
    { week: 'Wk 7', label: 'Stops logging in', status: 'danger', retainSpot: true },
    { week: 'Wk 9', label: 'Drops course', status: 'lost' },
    { week: 'Wk 12', label: 'Withdraws', status: 'lost', traditionalSpot: true },
  ];

  const statusColor = (s: string) => {
    if (s === 'good') return '#22C55E';
    if (s === 'signal') return '#F59E0B';
    if (s === 'warning') return '#F97316';
    if (s === 'danger') return ROSE;
    return '#3A3A40';
  };

  return (
    <section id="early-warning" className="py-28 px-6 border-t border-molted-border">
      <div className="max-w-5xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">The pattern</p>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            Students don't leave suddenly.
            <br />
            <span style={{ color: ROSE }}>They leave slowly, then all at once.</span>
          </h2>
          <p className="mt-6 text-molted-muted text-lg max-w-xl mx-auto">
            The signals are always there. Traditional systems see them too late.
          </p>
        </RevealBlock>

        <RevealBlock>
          <div
            className="rounded-3xl p-8 border overflow-x-auto"
            style={{ background: 'rgba(17,17,24,0.8)', borderColor: 'rgba(255,255,255,0.06)' }}
          >
            {/* Traditional label */}
            <div className="flex justify-end mb-3">
              <div className="flex items-center gap-2 text-xs text-molted-muted">
                <div className="w-3 h-0.5 bg-molted-subtle" />
                Traditional systems see it here
              </div>
            </div>

            {/* Timeline */}
            <div className="relative min-w-[500px]">
              {/* Connecting line */}
              <div className="absolute top-5 left-8 right-8 h-px bg-molted-border" />

              {/* Nodes */}
              <div className="relative flex justify-between">
                {weeks.map((w, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 flex-1">
                    <div
                      className="w-10 h-10 rounded-full border-2 flex items-center justify-center z-10 relative"
                      style={{
                        background: `${statusColor(w.status)}20`,
                        borderColor: statusColor(w.status),
                      }}
                    >
                      {w.status === 'lost' ? (
                        <div className="w-2 h-2 rounded-full" style={{ background: statusColor(w.status) }} />
                      ) : (
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ background: statusColor(w.status) }}
                        />
                      )}
                    </div>
                    <p className="text-xs font-bold text-molted-muted">{w.week}</p>
                    <p className="text-xs text-molted-subtle text-center leading-tight max-w-[70px]">{w.label}</p>

                    {/* RetainAi intervention marker */}
                    {w.retainSpot && (
                      <div
                        className="mt-2 px-2 py-1 rounded-lg text-xs font-semibold text-center"
                        style={{ background: ROSE_DIM, color: ROSE, border: `1px solid ${ROSE_BORDER}` }}
                      >
                        RetainAi
                        <br />intervenes
                      </div>
                    )}

                    {/* Traditional marker */}
                    {w.traditionalSpot && (
                      <div
                        className="mt-2 px-2 py-1 rounded-lg text-xs font-semibold text-center"
                        style={{ background: 'rgba(255,255,255,0.05)', color: '#86868B', border: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        Traditional
                        <br />finds out
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-molted-border grid md:grid-cols-2 gap-4">
              <div
                className="rounded-xl p-4 text-sm"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <p className="text-molted-muted font-semibold mb-1">Traditional approach</p>
                <p className="text-molted-subtle text-xs">Discovers student has withdrawn at Week 12. Sends a survey. Student doesn't respond. Slot stays empty.</p>
              </div>
              <div
                className="rounded-xl p-4 text-sm"
                style={{ background: ROSE_DIM, border: `1px solid ${ROSE_BORDER}` }}
              >
                <p className="font-semibold mb-1" style={{ color: ROSE }}>RetainAi approach</p>
                <p className="text-molted-white/70 text-xs">Detects first signal at Week 3. Advisor is notified. Personalized outreach sent. Student gets support. Student stays.</p>
              </div>
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Signal Cards ──────────────────────────────────────────────────────── */
const SIGNALS = [
  {
    icon: Activity,
    signal: 'Login frequency drop',
    trigger: 'No login in 3+ days',
    why: "Disengagement always starts here. It's the first measurable signal before grades move.",
    action: 'Automated check-in drafted for advisor review.',
  },
  {
    icon: Clock,
    signal: 'Submission timing drift',
    trigger: 'Late submissions trending over 3 weeks',
    why: 'Late → missed → withdrawn. The trajectory is predictable and preventable.',
    action: 'Academic support referral queued automatically.',
  },
  {
    icon: MessageSquare,
    signal: 'Discussion silence',
    trigger: 'Zero participation in last 2 weeks',
    why: 'Social belonging is the #1 predictor of retention. Silence is disconnection.',
    action: 'Peer connection suggestion + instructor alert.',
  },
  {
    icon: TrendingDown,
    signal: 'Grade trajectory decline',
    trigger: 'Week-over-week grade drop for 2+ weeks',
    why: 'Academic struggle compounds. Early tutoring referral changes outcomes.',
    action: 'Tutoring center referral + faculty alert.',
  },
  {
    icon: DollarSign,
    signal: 'Financial aid anomalies',
    trigger: 'Aid disbursement issues or enrollment holds',
    why: 'Financial barriers are the #1 reason students leave. Most never ask for help.',
    action: 'Financial aid office notification + emergency fund check.',
  },
  {
    icon: BarChart3,
    signal: 'Course load vs. historical',
    trigger: 'Credit hours below student\'s typical semester',
    why: 'Reduced enrollment precedes withdrawal. The intention is already forming.',
    action: 'Advisor meeting suggestion with academic planning context.',
  },
  {
    icon: Bell,
    signal: 'Communication silence',
    trigger: 'Not responding to instructor messages for 5+ days',
    why: 'When students stop communicating, they\'ve mentally started to leave.',
    action: 'Escalated to advisor with full engagement history.',
  },
];

function WhatRetainDetects() {
  return (
    <section className="py-28 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Signal intelligence</p>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            Seven signals.<br />
            <span style={{ color: ROSE }}>Every one actionable.</span>
          </h2>
          <p className="mt-6 text-molted-muted text-lg max-w-xl mx-auto">
            RetainAi watches for behavioral patterns that predict departure —
            weeks before a student consciously decides to leave.
          </p>
        </RevealBlock>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SIGNALS.map((s, i) => {
            const Icon = s.icon;
            return (
              <RevealBlock key={i} delay={i * 60}>
                <div
                  className="rounded-2xl p-6 border h-full flex flex-col transition-all duration-300"
                  style={{ background: 'rgba(17,17,24,0.7)', borderColor: 'rgba(255,255,255,0.06)' }}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: ROSE_DIM, border: `1px solid ${ROSE_BORDER}` }}
                    >
                      <Icon size={15} style={{ color: ROSE }} />
                    </div>
                    <div>
                      <p className="text-molted-white text-sm font-bold">{s.signal}</p>
                      <p className="text-molted-muted text-xs mt-0.5">{s.trigger}</p>
                    </div>
                  </div>
                  <p className="text-molted-muted text-xs leading-relaxed flex-1 mb-4">{s.why}</p>
                  <div
                    className="rounded-lg p-2.5 text-xs"
                    style={{ background: ROSE_DIM, color: ROSE, border: `1px solid ${ROSE_BORDER}` }}
                  >
                    <span className="font-semibold">RetainAi: </span>{s.action}
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

/* ── Intervention Engine ───────────────────────────────────────────────── */
function InterventionEngine() {
  const steps = [
    { label: 'Signal detected', desc: 'RetainAi flags behavioral pattern', icon: Activity },
    { label: 'Risk score calculated', desc: 'Multi-signal model assigns 0–100 score', icon: BarChart3 },
    { label: 'Advisor notified', desc: 'Alert with full context delivered instantly', icon: Bell },
    { label: 'Check-in drafted', desc: 'Personalized outreach ready in your voice', icon: MessageSquare },
    { label: 'One-click send', desc: 'Advisor reviews, approves, sends', icon: Send },
    { label: 'Response tracked', desc: 'Outcome recorded: replied, met, resolved', icon: CheckCircle },
    { label: 'Model improves', desc: 'Every interaction makes RetainAi smarter', icon: RefreshCw },
  ];

  return (
    <section className="py-28 px-6 border-t border-molted-border relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(244,63,94,0.04) 0%, transparent 60%)' }}
      />
      <div className="max-w-5xl mx-auto relative z-10">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">The intervention engine</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight leading-tight">
            From signal to outreach<br />
            <span style={{ color: ROSE }}>in minutes, not weeks.</span>
          </h2>
        </RevealBlock>

        <div className="grid md:grid-cols-[1fr_400px] gap-10 items-start">
          {/* Flow steps */}
          <div className="space-y-3">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <RevealBlock key={i} delay={i * 80}>
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: ROSE_DIM, border: `1px solid ${ROSE_BORDER}` }}
                      >
                        <Icon size={16} style={{ color: ROSE }} />
                      </div>
                      {i < steps.length - 1 && (
                        <div className="w-px h-3 mt-1" style={{ background: ROSE_BORDER }} />
                      )}
                    </div>
                    <div>
                      <p className="text-molted-white text-sm font-semibold">{step.label}</p>
                      <p className="text-molted-muted text-xs">{step.desc}</p>
                    </div>
                  </div>
                </RevealBlock>
              );
            })}
          </div>

          {/* Intervention card mock */}
          <RevealBlock delay={200}>
            <div
              className="rounded-2xl border p-6"
              style={{ background: ROSE_DIM, borderColor: ROSE_BORDER, boxShadow: ROSE_GLOW }}
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-molted-white text-sm font-bold">Intervention Alert</p>
                <div className="flex items-center gap-1.5 text-xs" style={{ color: ROSE }}>
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ROSE }} />
                  High Priority
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                    style={{ background: 'rgba(255,255,255,0.1)', color: '#F5F5F7' }}
                  >
                    MT
                  </div>
                  <div>
                    <p className="text-molted-white font-semibold text-sm">Marcus T.</p>
                    <p className="text-molted-muted text-xs">Junior · Business Administration</p>
                  </div>
                </div>

                <div
                  className="rounded-xl p-3"
                  style={{ background: 'rgba(17,17,24,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-molted-muted text-xs font-semibold uppercase tracking-wide">Risk Score</p>
                    <p className="text-2xl font-black" style={{ color: ROSE }}>87<span className="text-sm text-molted-muted">/100</span></p>
                  </div>
                  <div className="w-full h-2 rounded-full bg-molted-border overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: '87%', background: ROSE }} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <p className="text-molted-muted text-xs font-semibold uppercase tracking-wide">3 Signals Detected</p>
                  {['No login in 6 days', 'Essay 2 not submitted (4 days late)', 'Financial hold on account'].map((sig, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-molted-muted">
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: ROSE }} />
                      {sig}
                    </div>
                  ))}
                </div>

                <div
                  className="rounded-xl p-3 text-xs"
                  style={{ background: 'rgba(17,17,24,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <p className="text-molted-muted font-semibold mb-1">Suggested Action</p>
                  <p className="text-molted-white/80">Personal outreach + Financial Aid referral</p>
                </div>

                <button
                  className="w-full py-2.5 rounded-xl text-sm font-bold transition-all hover:-translate-y-px text-white"
                  style={{ background: ROSE }}
                >
                  Send Draft Outreach
                </button>
              </div>
            </div>
          </RevealBlock>
        </div>
      </div>
    </section>
  );
}

/* ── ROI Calculator ────────────────────────────────────────────────────── */
function ROISection() {
  const [students, setStudents] = useState(10000);
  const [retentionRate, setRetentionRate] = useState(72);

  const improvement = 3.2;
  const additionalStudents = Math.round((students * improvement) / 100);
  const revenuePerStudent = 18000; // avg annual tuition
  const revenue = Math.round((additionalStudents * revenuePerStudent) / 1000000 * 10) / 10;

  return (
    <section id="roi" className="py-28 px-6 border-t border-molted-border">
      <div className="max-w-5xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Return on investment</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight leading-tight">
            RetainAi pays for itself<br />
            <span style={{ color: ROSE }}>in the first week.</span>
          </h2>
        </RevealBlock>

        <RevealBlock>
          <div
            className="rounded-3xl p-8 md:p-12 border"
            style={{ background: 'rgba(17,17,24,0.9)', borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Inputs */}
              <div className="space-y-7">
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-molted-white text-sm font-semibold">Institution size</label>
                    <span className="text-sm font-black" style={{ color: ROSE }}>{students.toLocaleString()} students</span>
                  </div>
                  <input
                    type="range"
                    min={1000}
                    max={50000}
                    step={500}
                    value={students}
                    onChange={e => setStudents(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{ accentColor: ROSE }}
                  />
                  <div className="flex justify-between mt-1 text-xs text-molted-subtle">
                    <span>1,000</span>
                    <span>50,000</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-molted-white text-sm font-semibold">Current retention rate</label>
                    <span className="text-sm font-black" style={{ color: ROSE }}>{retentionRate}%</span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={95}
                    step={1}
                    value={retentionRate}
                    onChange={e => setRetentionRate(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{ accentColor: ROSE }}
                  />
                  <div className="flex justify-between mt-1 text-xs text-molted-subtle">
                    <span>50%</span>
                    <span>95%</span>
                  </div>
                </div>

                <div
                  className="rounded-xl p-4 text-sm"
                  style={{ background: ROSE_DIM, border: `1px solid ${ROSE_BORDER}` }}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-molted-muted">Predicted improvement</span>
                    <span className="font-bold" style={{ color: ROSE }}>+{improvement}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-molted-muted">Additional students retained</span>
                    <span className="font-bold text-molted-white">+{additionalStudents.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Result */}
              <div className="text-center">
                <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Annual revenue impact</p>
                <p
                  className="text-6xl md:text-7xl font-black mb-2"
                  style={{ color: ROSE }}
                >
                  ${revenue}M
                </p>
                <p className="text-molted-muted text-sm">per year in retained tuition revenue</p>
                <div
                  className="mt-8 p-4 rounded-2xl text-sm"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <p className="text-molted-muted leading-relaxed">
                    RetainAi Growth plan at {students.toLocaleString()} students costs{' '}
                    <span className="text-molted-white font-semibold">
                      ~${Math.min(Math.ceil(students / 10000) * 4999, 9999).toLocaleString()}/mo
                    </span>
                    . Revenue impact:{' '}
                    <span style={{ color: ROSE }} className="font-bold">
                      ${revenue}M/year.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── TeachOS Integration ───────────────────────────────────────────────── */
function TeachOSIntegration() {
  const teachSignals = [
    'Discussion participation rate',
    'Assignment submission timing',
    'Grade trajectory week-over-week',
    'Faculty early warning flags',
    'Course access frequency',
  ];
  const retainSignals = [
    'Financial aid status and holds',
    'Enrollment and drop activity',
    'Communication response rates',
    'Housing and food insecurity flags',
    'Multi-course engagement patterns',
  ];

  return (
    <section className="py-28 px-6 border-t border-molted-border">
      <div className="max-w-5xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Powered by the platform</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight leading-tight">
            RetainAi + TeachOS.<br />
            <span style={{ color: ROSE }}>The complete picture.</span>
          </h2>
          <p className="mt-6 text-molted-muted text-lg max-w-xl mx-auto">
            TeachOS sees what happens in the classroom. RetainAi sees the full life
            of the student. Together, they leave nothing to chance.
          </p>
        </RevealBlock>

        <RevealBlock>
          <div className="grid md:grid-cols-2 gap-6">
            <div
              className="rounded-2xl p-7 border"
              style={{ background: 'rgba(45,212,191,0.05)', borderColor: 'rgba(45,212,191,0.15)' }}
            >
              <p className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: '#2DD4BF' }}>
                TeachOS signals
              </p>
              <div className="space-y-2.5">
                {teachSignals.map((s, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-molted-muted">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#2DD4BF' }} />
                    {s}
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-2xl p-7 border"
              style={{ background: ROSE_DIM, borderColor: ROSE_BORDER }}
            >
              <p className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: ROSE }}>
                RetainAi signals
              </p>
              <div className="space-y-2.5">
                {retainSignals.map((s, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-molted-muted">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ROSE }} />
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="mt-6 rounded-2xl p-6 border text-center"
            style={{ background: 'rgba(17,17,24,0.8)', borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <p className="text-molted-white font-semibold">
              One unified advisor view. Faculty sees engagement.
              <span style={{ color: ROSE }}> Advisors see everything.</span>
            </p>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Pricing ───────────────────────────────────────────────────────────── */
function Pricing() {
  const tiers = [
    {
      name: 'Starter',
      price: '$1,999',
      period: '/mo · up to 2,500 students',
      desc: 'For smaller institutions ready to take retention seriously.',
      features: [
        '7-signal early warning engine',
        'Advisor intervention dashboard',
        'Personalized outreach drafting',
        'Outcome tracking and reporting',
        'Email + Slack notifications',
      ],
      cta: 'Request Demo',
      highlight: false,
    },
    {
      name: 'Growth',
      price: '$4,999',
      period: '/mo · up to 10,000 students',
      desc: 'For mid-size institutions with complex retention challenges.',
      features: [
        'Everything in Starter',
        'Financial aid anomaly detection',
        'TeachOS deep integration',
        'Multi-advisor workflow',
        'ROI reporting for leadership',
        'Priority support',
      ],
      cta: 'Request Demo',
      highlight: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'institutional pricing',
      desc: 'For large universities and systems with multiple campuses.',
      features: [
        'Everything in Growth',
        'Multi-campus deployment',
        'Custom signal configuration',
        'SIS + ERP integration',
        'Dedicated success team',
        'SLA + compliance',
      ],
      cta: 'Talk to Sales',
      highlight: false,
    },
  ];

  return (
    <section className="py-28 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight leading-tight">
            Institution-only pricing.<br />
            <span style={{ color: ROSE }}>Because this is an institutional problem.</span>
          </h2>
        </RevealBlock>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <RevealBlock key={i} delay={i * 100}>
              <div
                className="rounded-2xl p-7 h-full flex flex-col border transition-all duration-300"
                style={{
                  background: tier.highlight ? ROSE_DIM : 'rgba(17,17,24,0.6)',
                  borderColor: tier.highlight ? ROSE_BORDER : 'rgba(255,255,255,0.06)',
                  boxShadow: tier.highlight ? ROSE_GLOW : 'none',
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
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ROSE }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="mailto:hello@molted.ai"
                  className="block text-center px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-px"
                  style={{
                    background: tier.highlight ? ROSE : 'rgba(255,255,255,0.06)',
                    color: tier.highlight ? '#ffffff' : '#F5F5F7',
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

/* ── Final CTA ─────────────────────────────────────────────────────────── */
function FinalCTA() {
  return (
    <section className="py-32 px-6 border-t border-molted-border relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(244,63,94,0.07) 0%, transparent 60%)' }}
      />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <RevealBlock>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            Stop losing students<br />
            <span style={{ color: ROSE }}>you could have saved.</span>
          </h2>
          <p className="mt-6 text-molted-muted text-lg leading-relaxed">
            Every student who leaves represents a failure of systems, not character.
            RetainAi gives you the systems to do better.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:hello@molted.ai"
              className="group flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:-translate-y-px text-white"
              style={{ background: ROSE }}
            >
              Request a Demo
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              to="/molted"
              className="px-8 py-4 rounded-xl border border-molted-border text-molted-muted hover:text-molted-white hover:border-molted-subtle font-semibold transition-all"
            >
              See All Products
            </Link>
          </div>
          <p className="mt-8 text-molted-subtle text-sm italic">
            "Every student who was about to leave — didn't." — MoltED Ai
          </p>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────── */
export default function MoltedRetainAi() {
  return (
    <MoltedLayout>
      <Hero />
      <SilentDeparture />
      <WhatRetainDetects />
      <InterventionEngine />
      <ROISection />
      <TeachOSIntegration />
      <Pricing />
      <FinalCTA />
    </MoltedLayout>
  );
}
