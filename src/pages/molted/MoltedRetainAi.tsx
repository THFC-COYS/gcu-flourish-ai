import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ChevronRight, TrendingDown, Bell, AlertTriangle,
  Users, DollarSign, Activity, MessageSquare, Clock, BarChart3,
  CheckCircle, Send, RefreshCw, Zap, Eye, Brain, GitBranch,
  Shield, PlayCircle, ChevronDown,
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

/* ── Retain accent ───────────────────────────────────────────────────── */
const ROSE = '#F43F5E';
const ROSE_DIM = 'rgba(244,63,94,0.12)';
const ROSE_BORDER = 'rgba(244,63,94,0.25)';
const ROSE_GLOW = '0 0 30px rgba(244,63,94,0.12), 0 0 60px rgba(244,63,94,0.06)';

/* ── Hero ──────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(244,63,94,0.06) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(30,58,138,0.03) 0%, transparent 70%)' }}
        />
      </div>

      {/* Agent status chip */}
      <RevealBlock className="mb-8">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase"
          style={{ background: ROSE_DIM, border: `1px solid ${ROSE_BORDER}`, color: ROSE }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ROSE }} />
          Agent active · monitoring your students right now
        </div>
      </RevealBlock>

      {/* Wordmark */}
      <RevealBlock delay={100}>
        <h1
          className="text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight"
          style={{ color: ROSE, textShadow: `0 0 40px rgba(244,63,94,0.5), 0 0 80px rgba(244,63,94,0.2)` }}
        >
          Retain
        </h1>
      </RevealBlock>

      {/* Reframe */}
      <RevealBlock delay={200}>
        <p className="mt-6 text-xl md:text-2xl font-black text-molted-white/70 tracking-tight max-w-2xl">
          Not a dashboard you check. An agent that acts.
        </p>
      </RevealBlock>

      {/* Headline */}
      <RevealBlock delay={300}>
        <p className="mt-4 text-3xl md:text-4xl font-black text-molted-white tracking-tight leading-snug max-w-3xl">
          40% of students leave before they graduate.
          <br />
          <span style={{ color: ROSE }}>Retain is already working to change that.</span>
        </p>
      </RevealBlock>

      {/* Sub */}
      <RevealBlock delay={400}>
        <p className="mt-6 text-molted-muted text-lg max-w-xl leading-relaxed">
          A fully autonomous retention agent — monitoring signals, running intervention
          playbooks, and coordinating support across your campus. Without being asked.
        </p>
      </RevealBlock>

      {/* CTAs */}
      <RevealBlock delay={500} className="mt-10 flex flex-col sm:flex-row items-center gap-4">
        <Link
          to="/retain-ai/demo"
          className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold transition-all duration-200 hover:-translate-y-px text-white"
          style={{ background: ROSE }}
        >
          Try Live Demo
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <a
          href="#roi"
          className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-molted-border hover:border-molted-subtle text-molted-muted hover:text-molted-white font-semibold transition-all duration-200"
        >
          Calculate Your ROI
          <ChevronRight size={16} />
        </a>
      </RevealBlock>

      <RevealBlock delay={600} className="mt-16">
        <p className="text-molted-subtle text-sm italic tracking-wide">
          "Every student who was about to leave — didn't."
        </p>
      </RevealBlock>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-molted-subtle animate-pulse">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-molted-subtle to-transparent" />
      </div>
    </section>
  );
}

/* ── Agent Loop ────────────────────────────────────────────────────────── */
const LOOP_STEPS = [
  {
    id: 'observe',
    icon: Eye,
    label: 'Observe',
    desc: 'Continuously ingests signals from every system — LMS, SIS, financial aid, communication logs — without human initiation.',
  },
  {
    id: 'analyze',
    icon: Brain,
    label: 'Analyze',
    desc: 'Multi-signal risk model scores every student 0–100. Patterns that humans would never catch — across weeks and across systems.',
  },
  {
    id: 'decide',
    icon: GitBranch,
    label: 'Decide',
    desc: 'Selects the right playbook for the right student at the right moment. Not a generic alert — a specific, tailored intervention strategy.',
  },
  {
    id: 'act',
    icon: Zap,
    label: 'Act',
    desc: 'Drafts outreach. Alerts advisors. Routes to financial aid. Schedules check-ins. Triggers the intervention — humans review and approve.',
  },
  {
    id: 'learn',
    icon: RefreshCw,
    label: 'Learn',
    desc: 'Every outcome — resolved, escalated, ignored — feeds back into the model. The agent gets smarter with every student interaction.',
  },
];

function AgentLoop() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % LOOP_STEPS.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-28 px-6 border-t border-molted-border relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(244,63,94,0.04) 0%, transparent 60%)' }}
      />
      <div className="max-w-5xl mx-auto relative z-10">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">The autonomous loop</p>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            It never stops running.<br />
            <span style={{ color: ROSE }}>It never needs to be asked.</span>
          </h2>
          <p className="mt-6 text-molted-muted text-lg max-w-xl mx-auto">
            Traditional retention tools wait for humans to act. Retain runs a continuous
            autonomous loop — 24 hours a day, across every student, every signal.
          </p>
        </RevealBlock>

        <RevealBlock>
          <div
            className="rounded-3xl p-8 md:p-12 border"
            style={{ background: 'rgba(248,249,252,0.95)', borderColor: 'rgba(0,0,0,0.06)' }}
          >
            {/* Loop visualization */}
            <div className="flex items-center justify-center gap-0 mb-12 flex-wrap">
              {LOOP_STEPS.map((step, i) => {
                const Icon = step.icon;
                const isActive = active === i;
                return (
                  <div key={step.id} className="flex items-center">
                    <button
                      onClick={() => setActive(i)}
                      className="flex flex-col items-center gap-2 px-3 transition-all duration-500"
                    >
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500"
                        style={{
                          background: isActive ? ROSE_DIM : 'rgba(0,0,0,0.04)',
                          border: `2px solid ${isActive ? ROSE : 'rgba(0,0,0,0.07)'}`,
                          boxShadow: isActive ? ROSE_GLOW : 'none',
                          transform: isActive ? 'scale(1.15)' : 'scale(1)',
                        }}
                      >
                        <Icon size={20} style={{ color: isActive ? ROSE : '#86868B' }} />
                      </div>
                      <p
                        className="text-xs font-bold uppercase tracking-wide transition-colors duration-300"
                        style={{ color: isActive ? ROSE : '#86868B' }}
                      >
                        {step.label}
                      </p>
                    </button>
                    {i < LOOP_STEPS.length - 1 && (
                      <div
                        className="w-6 h-px mb-6 transition-all duration-500"
                        style={{ background: active > i ? ROSE_BORDER : 'rgba(0,0,0,0.07)' }}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Active step description */}
            <div
              className="rounded-2xl p-6 text-center transition-all duration-500"
              style={{ background: ROSE_DIM, border: `1px solid ${ROSE_BORDER}` }}
            >
              <p className="font-bold mb-2" style={{ color: ROSE }}>
                {LOOP_STEPS[active].label}
              </p>
              <p className="text-molted-white/80 text-sm leading-relaxed max-w-xl mx-auto">
                {LOOP_STEPS[active].desc}
              </p>
            </div>

            <div className="mt-6 flex justify-center">
              <div className="flex items-center gap-2 text-xs text-molted-subtle">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ROSE }} />
                Loop running continuously · no human action required
              </div>
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Silent Departure ──────────────────────────────────────────────────── */
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
            The signals are always there. The agent starts acting at Week 3 —
            not when the student is already gone.
          </p>
        </RevealBlock>

        <RevealBlock>
          <div
            className="rounded-3xl p-8 border overflow-x-auto"
            style={{ background: 'rgba(241,243,248,0.95)', borderColor: 'rgba(0,0,0,0.06)' }}
          >
            <div className="flex justify-end mb-3">
              <div className="flex items-center gap-2 text-xs text-molted-muted">
                <div className="w-3 h-0.5 bg-molted-subtle" />
                Traditional systems see it here
              </div>
            </div>

            <div className="relative min-w-[500px]">
              <div className="absolute top-5 left-8 right-8 h-px bg-molted-border" />
              <div className="relative flex justify-between">
                {weeks.map((w, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 flex-1">
                    <div
                      className="w-10 h-10 rounded-full border-2 flex items-center justify-center z-10 relative"
                      style={{ background: `${statusColor(w.status)}20`, borderColor: statusColor(w.status) }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ background: statusColor(w.status) }} />
                    </div>
                    <p className="text-xs font-bold text-molted-muted">{w.week}</p>
                    <p className="text-xs text-molted-subtle text-center leading-tight max-w-[70px]">{w.label}</p>
                    {w.retainSpot && (
                      <div
                        className="mt-2 px-2 py-1 rounded-lg text-xs font-semibold text-center"
                        style={{ background: ROSE_DIM, color: ROSE, border: `1px solid ${ROSE_BORDER}` }}
                      >
                        Agent<br />acts
                      </div>
                    )}
                    {w.traditionalSpot && (
                      <div
                        className="mt-2 px-2 py-1 rounded-lg text-xs font-semibold text-center"
                        style={{ background: 'rgba(0,0,0,0.05)', color: '#86868B', border: '1px solid rgba(0,0,0,0.07)' }}
                      >
                        Traditional<br />finds out
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-molted-border grid md:grid-cols-2 gap-4">
              <div className="rounded-xl p-4 text-sm" style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)' }}>
                <p className="text-molted-muted font-semibold mb-1">Without Retain</p>
                <p className="text-molted-subtle text-xs">Advisor discovers withdrawal at Week 12. Sends a survey. Student doesn't respond. Slot stays empty. Revenue gone.</p>
              </div>
              <div className="rounded-xl p-4 text-sm" style={{ background: ROSE_DIM, border: `1px solid ${ROSE_BORDER}` }}>
                <p className="font-semibold mb-1" style={{ color: ROSE }}>With Retain agent</p>
                <p className="text-molted-white/70 text-xs">Agent detects signal at Week 3. Playbook launched. Advisor receives draft outreach with full context. Student gets support. Student stays.</p>
              </div>
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Playbooks ─────────────────────────────────────────────────────────── */
const PLAYBOOKS = [
  {
    name: 'Financial Distress',
    color: '#F59E0B',
    trigger: 'Financial hold detected on account',
    icon: DollarSign,
    urgency: 'High',
    steps: [
      { agent: true, text: 'Financial hold detected on student account' },
      { agent: true, text: 'Enrollment status verified — still enrolled' },
      { agent: true, text: 'Emergency fund availability checked — funds available' },
      { agent: true, text: 'Financial Aid office alerted with full student context' },
      { agent: true, text: 'Personalized outreach drafted for advisor review' },
      { human: true, text: 'Advisor reviews and approves outreach in one click' },
      { agent: true, text: 'Follow-up scheduled: 48h check-in if no response' },
      { agent: true, text: 'If no response: auto-escalates to Student Success director' },
    ],
  },
  {
    name: 'Academic Drift',
    color: '#F97316',
    trigger: 'Grade drop + engagement decline over 2+ weeks',
    icon: TrendingDown,
    urgency: 'Medium',
    steps: [
      { agent: true, text: 'Week-over-week grade decline detected across 2+ courses' },
      { agent: true, text: 'Correlated with assignment submission timing drift' },
      { agent: true, text: 'Faculty notified with engagement summary' },
      { agent: true, text: 'Tutoring center referral queued with course-specific context' },
      { agent: true, text: 'Personalized study resource package assembled' },
      { human: true, text: 'Advisor reviews recommended intervention path' },
      { agent: true, text: 'Academic recovery plan sent to student from advisor' },
      { agent: true, text: 'Progress tracked weekly — playbook repeats if drift continues' },
    ],
  },
  {
    name: 'Social Isolation',
    color: '#8B5CF6',
    trigger: 'Zero discussion participation · 2+ weeks',
    icon: MessageSquare,
    urgency: 'Medium',
    steps: [
      { agent: true, text: 'Discussion board participation drops to zero' },
      { agent: true, text: 'Cross-referenced: also not attending virtual office hours' },
      { agent: true, text: 'Belonging risk flag raised — social isolation pattern detected' },
      { agent: true, text: 'Peer connection opportunities identified in same program cohort' },
      { human: true, text: 'Advisor sends warm introduction to peer study group' },
      { agent: true, text: 'Faculty alerted to acknowledge student in next class session' },
      { agent: true, text: 'Student Success team notified for optional 1:1 check-in' },
    ],
  },
  {
    name: 'Ghost Student',
    color: ROSE,
    trigger: 'No LMS login in 5+ days',
    icon: AlertTriangle,
    urgency: 'Critical',
    steps: [
      { agent: true, text: 'No LMS activity detected for 5 consecutive days' },
      { agent: true, text: 'Cross-checked: not in hospital/leave system — unexplained absence' },
      { agent: true, text: 'Welfare check flag raised — escalated to High priority' },
      { agent: true, text: 'All enrolled faculty notified simultaneously' },
      { human: true, text: 'Advisor initiates direct phone outreach immediately' },
      { agent: true, text: 'Emergency contact protocol prepared if no response in 24h' },
      { agent: true, text: 'Student Success director looped in at 24h mark automatically' },
      { agent: true, text: 'Resolution logged — outcome feeds back into model' },
    ],
  },
];

function Playbooks() {
  const [active, setActive] = useState(0);
  const p = PLAYBOOKS[active];

  return (
    <section id="playbooks" className="py-28 px-6 border-t border-molted-border">
      <div className="max-w-5xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Autonomous intervention</p>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            Four playbooks.<br />
            <span style={{ color: ROSE }}>All running without you.</span>
          </h2>
          <p className="mt-6 text-molted-muted text-lg max-w-xl mx-auto">
            Retain doesn't just alert you. It selects the right playbook,
            executes the steps, and only surfaces what needs a human decision.
          </p>
        </RevealBlock>

        <RevealBlock>
          {/* Tab selector */}
          <div className="flex flex-wrap gap-3 mb-8">
            {PLAYBOOKS.map((pb, i) => {
              const Icon = pb.icon;
              return (
                <button
                  key={pb.name}
                  onClick={() => setActive(i)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{
                    background: active === i ? `${pb.color}15` : 'rgba(0,0,0,0.04)',
                    border: `1px solid ${active === i ? pb.color + '40' : 'rgba(0,0,0,0.07)'}`,
                    color: active === i ? pb.color : '#86868B',
                  }}
                >
                  <Icon size={14} />
                  {pb.name}
                  {pb.urgency === 'Critical' && (
                    <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: `${ROSE}20`, color: ROSE }}>!</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Playbook detail */}
          <div
            className="rounded-3xl p-8 border transition-all duration-300"
            style={{ background: 'rgba(248,249,252,0.95)', borderColor: 'rgba(0,0,0,0.06)' }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <p className="text-xl font-black text-molted-white">{p.name} Playbook</p>
                  <span
                    className="text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wide"
                    style={{ background: `${p.color}15`, color: p.color, border: `1px solid ${p.color}30` }}
                  >
                    {p.urgency}
                  </span>
                </div>
                <p className="text-molted-muted text-sm">Triggered by: {p.trigger}</p>
              </div>
              <div className="flex items-center gap-2 text-xs" style={{ color: p.color }}>
                <PlayCircle size={14} />
                Runs autonomously
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-2.5">
              {p.steps.map((step, i) => (
                <div key={i} className="flex items-center gap-4">
                  {/* Step connector */}
                  <div className="flex flex-col items-center flex-shrink-0 w-6">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        background: step.human ? 'rgba(0,0,0,0.07)' : `${p.color}20`,
                        border: `1px solid ${step.human ? 'rgba(0,0,0,0.10)' : p.color + '40'}`,
                        color: step.human ? '#1C1C1E' : p.color,
                      }}
                    >
                      {i + 1}
                    </div>
                    {i < p.steps.length - 1 && (
                      <div className="w-px h-2 mt-1" style={{ background: 'rgba(0,0,0,0.06)' }} />
                    )}
                  </div>

                  <div
                    className="flex-1 flex items-center justify-between rounded-xl px-4 py-2.5 text-sm"
                    style={{
                      background: step.human ? 'rgba(0,0,0,0.05)' : `${p.color}08`,
                      border: `1px solid ${step.human ? 'rgba(0,0,0,0.07)' : p.color + '15'}`,
                    }}
                  >
                    <p style={{ color: step.human ? '#1C1C1E' : '#D1D1D6' }}>{step.text}</p>
                    <span
                      className="ml-4 text-xs font-semibold flex-shrink-0 px-2 py-0.5 rounded-full"
                      style={{
                        background: step.human ? 'rgba(0,0,0,0.07)' : `${p.color}15`,
                        color: step.human ? '#86868B' : p.color,
                      }}
                    >
                      {step.human ? 'Human' : 'Agent'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Human ratio */}
            <div className="mt-6 pt-5 border-t border-molted-border flex items-center justify-between text-xs text-molted-muted flex-wrap gap-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                  Agent steps: {p.steps.filter(s => s.agent).length}
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-molted-muted" />
                  Human steps: {p.steps.filter(s => s.human).length}
                </div>
              </div>
              <p style={{ color: p.color }} className="font-semibold">
                {Math.round((p.steps.filter(s => s.agent).length / p.steps.length) * 100)}% autonomous
              </p>
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Live Agent Feed ───────────────────────────────────────────────────── */
const FEED_EVENTS = [
  { time: 'Just now', msg: 'Marcus T. — Risk 87/100. Financial Distress Playbook launched. Outreach drafted for advisor review.', urgent: true },
  { time: '4m ago', msg: 'Retention risk resolved: Priya K. responded to academic check-in. Tutoring session scheduled.', urgent: false },
  { time: '11m ago', msg: 'Ghost Student Playbook triggered for Devon A. — 7 days no login. Faculty notified. Escalation in 24h.', urgent: true },
  { time: '23m ago', msg: 'Social Isolation Playbook: 3 students flagged in NURS-301. Peer connection outreach sent.', urgent: false },
  { time: '41m ago', msg: 'Financial Distress resolved: emergency fund application submitted for 2 students.', urgent: false },
  { time: '58m ago', msg: 'Academic Drift detected in BUS-201 cohort — 6 students. Tutoring center alerted. Playbooks running.', urgent: true },
  { time: '1h ago', msg: 'Weekly risk report delivered to VP of Student Success. 14 active playbooks. 8 resolved this week.', urgent: false },
  { time: '2h ago', msg: 'New signal correlation identified: late add/drop + financial hold = 3.4x higher withdrawal probability.', urgent: false },
];

function AgentFeed() {
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const t = setInterval(() => {
      setVisibleCount(c => Math.min(c + 1, FEED_EVENTS.length));
    }, 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-28 px-6 border-t border-molted-border">
      <div className="max-w-5xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Agent activity</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight leading-tight">
            This is what autonomy looks like.<br />
            <span style={{ color: ROSE }}>It doesn't stop.</span>
          </h2>
          <p className="mt-6 text-molted-muted text-lg max-w-xl mx-auto">
            A simulated view of Retain's agent log.
            At a real institution, this runs 24 hours a day.
          </p>
        </RevealBlock>

        <RevealBlock>
          <div
            className="rounded-3xl border overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.97)', borderColor: 'rgba(0,0,0,0.06)' }}
          >
            {/* Terminal header */}
            <div
              className="flex items-center justify-between px-6 py-3 border-b"
              style={{ borderColor: 'rgba(0,0,0,0.06)', background: 'rgba(0,0,0,0.03)' }}
            >
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <p className="text-molted-muted text-xs font-mono ml-3">retainai · agent.log</p>
              </div>
              <div className="flex items-center gap-2 text-xs" style={{ color: ROSE }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ROSE }} />
                LIVE
              </div>
            </div>

            {/* Feed */}
            <div className="p-6 space-y-3 min-h-[300px]">
              {FEED_EVENTS.slice(0, visibleCount).map((event, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-xl p-4 transition-all duration-700"
                  style={{
                    background: event.urgent ? ROSE_DIM : 'rgba(0,0,0,0.03)',
                    border: `1px solid ${event.urgent ? ROSE_BORDER : 'rgba(0,0,0,0.06)'}`,
                    animation: i === visibleCount - 1 ? 'fadeIn 0.5s ease-out' : 'none',
                  }}
                >
                  <div className="flex flex-col items-center gap-1 flex-shrink-0 mt-0.5">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: event.urgent ? ROSE : '#3A3A40' }}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-molted-white/80 text-xs leading-relaxed font-mono">{event.msg}</p>
                  </div>
                  <p className="text-molted-subtle text-xs flex-shrink-0 font-mono">{event.time}</p>
                </div>
              ))}

              {visibleCount < FEED_EVENTS.length && (
                <div className="flex items-center gap-2 text-molted-subtle text-xs font-mono">
                  <span className="animate-pulse">▋</span>
                  Processing...
                </div>
              )}
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Human in the Loop ─────────────────────────────────────────────────── */
function HumanInLoop() {
  return (
    <section className="py-28 px-6 border-t border-molted-border">
      <div className="max-w-5xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Human oversight</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight leading-tight">
            The agent does the work.<br />
            <span style={{ color: ROSE }}>You make the call.</span>
          </h2>
          <p className="mt-6 text-molted-muted text-lg max-w-xl mx-auto">
            Retain never contacts students without human approval.
            Advisors review, approve, and override. The agent handles everything else.
          </p>
        </RevealBlock>

        <RevealBlock>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Advisor queue mock */}
            <div
              className="rounded-2xl border p-6"
              style={{ background: 'rgba(248,249,252,0.95)', borderColor: 'rgba(0,0,0,0.06)', boxShadow: ROSE_GLOW }}
            >
              <div className="flex items-center justify-between mb-5">
                <p className="text-molted-white font-bold text-sm">Your Review Queue</p>
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-bold"
                  style={{ background: ROSE_DIM, color: ROSE, border: `1px solid ${ROSE_BORDER}` }}
                >
                  3 pending
                </span>
              </div>

              {[
                { name: 'Marcus T.', risk: 87, playbook: 'Financial Distress', preview: 'Hi Marcus, I wanted to check in about your account hold...' },
                { name: 'Devon A.', risk: 92, playbook: 'Ghost Student', preview: "Devon, we haven't seen you in class this week and wanted to..." },
                { name: 'Keisha W.', risk: 64, playbook: 'Academic Drift', preview: 'Hi Keisha, I noticed your grades in two courses and wanted...' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="mb-3 p-4 rounded-xl border transition-all"
                  style={{ background: 'rgba(0,0,0,0.03)', borderColor: 'rgba(0,0,0,0.06)' }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-molted-white text-sm font-semibold">{item.name}</p>
                      <p className="text-xs text-molted-muted">{item.playbook} Playbook</p>
                    </div>
                    <span className="text-lg font-black" style={{ color: ROSE }}>{item.risk}</span>
                  </div>
                  <p className="text-molted-subtle text-xs mb-3 italic">"{item.preview}"</p>
                  <div className="flex gap-2">
                    <button
                      className="flex-1 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:-translate-y-px"
                      style={{ background: ROSE }}
                    >
                      Approve & Send
                    </button>
                    <button
                      className="py-1.5 px-3 rounded-lg text-xs font-semibold text-molted-muted border border-molted-border hover:border-molted-subtle transition-all"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* What the advisor sees vs does */}
            <div className="space-y-5">
              {[
                {
                  label: 'The agent handles',
                  color: ROSE,
                  items: [
                    'Signal detection across all systems',
                    'Risk scoring and playbook selection',
                    'Drafting personalized outreach',
                    'Routing to the right support team',
                    'Scheduling follow-up check-ins',
                    'Logging outcomes and learning',
                  ],
                },
                {
                  label: 'You handle',
                  color: '#22C55E',
                  items: [
                    'Review the drafted outreach',
                    'Approve, edit, or override',
                    'Make the judgment calls',
                    'Build the student relationship',
                  ],
                },
              ].map((block) => (
                <div
                  key={block.label}
                  className="rounded-2xl p-6 border"
                  style={{ background: `${block.color}08`, borderColor: `${block.color}25` }}
                >
                  <p className="text-sm font-bold uppercase tracking-wide mb-4" style={{ color: block.color }}>
                    {block.label}
                  </p>
                  <div className="space-y-2">
                    {block.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-sm text-molted-muted">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: block.color }} />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Ecosystem ─────────────────────────────────────────────────────────── */
function EcosystemCoordination() {
  const connections = [
    {
      product: 'Forge',
      color: '#2563EB',
      role: 'Feeds classroom signals',
      signals: ['Assignment submission timing', 'Discussion participation rate', 'Grade trajectory', 'Faculty early-warning flags'],
    },
    {
      product: 'Persona Ai',
      color: '#1E3A8A',
      role: 'Delivers outreach in your voice',
      signals: ['Outreach sent in institution voice', 'Tone matched to student history', 'Channel-aware (email vs. SMS vs. portal)'],
    },
    {
      product: 'Lumen',
      color: '#64748B',
      role: 'Routes academic support',
      signals: ['Struggling students routed to tutoring AI', 'Subject-specific help triggered', 'Engagement with support content tracked'],
    },
    {
      product: 'OutcomesAi',
      color: '#0EA5E9',
      role: 'Reports to leadership',
      signals: ['Retention cohort data', 'Playbook effectiveness by type', 'Revenue impact reporting for board'],
    },
  ];

  return (
    <section className="py-28 px-6 border-t border-molted-border">
      <div className="max-w-5xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Platform coordination</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight leading-tight">
            Retain doesn't work alone.<br />
            <span style={{ color: ROSE }}>It coordinates the whole stack.</span>
          </h2>
          <p className="mt-6 text-molted-muted text-lg max-w-xl mx-auto">
            This is where the agentic vision becomes real. Retain pulls signals from
            every Molt product and pushes actions back through them.
          </p>
        </RevealBlock>

        <RevealBlock>
          <div className="grid md:grid-cols-2 gap-5">
            {connections.map((c, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 border"
                style={{ background: `${c.color}08`, borderColor: `${c.color}20` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ background: `${c.color}20`, border: `1px solid ${c.color}30` }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                  </div>
                  <div>
                    <p className="text-molted-white font-bold text-sm">{c.product}</p>
                    <p className="text-xs text-molted-muted">{c.role}</p>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {c.signals.map((s, j) => (
                    <div key={j} className="flex items-center gap-2 text-xs text-molted-muted">
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: c.color }} />
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-6 rounded-2xl p-5 border text-center"
            style={{ background: 'rgba(241,243,248,0.95)', borderColor: 'rgba(0,0,0,0.06)' }}
          >
            <p className="text-molted-white font-semibold text-sm">
              Retain is the agent that ties the platform together.
              <span style={{ color: ROSE }}> It's what turns tools into a system.</span>
            </p>
          </div>
        </RevealBlock>
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
  const revenuePerStudent = 18000;
  const revenue = Math.round((additionalStudents * revenuePerStudent) / 1000000 * 10) / 10;

  return (
    <section id="roi" className="py-28 px-6 border-t border-molted-border">
      <div className="max-w-5xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Return on investment</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight leading-tight">
            Retain pays for itself<br />
            <span style={{ color: ROSE }}>in the first week.</span>
          </h2>
        </RevealBlock>

        <RevealBlock>
          <div
            className="rounded-3xl p-8 md:p-12 border"
            style={{ background: 'rgba(248,249,252,0.95)', borderColor: 'rgba(0,0,0,0.06)' }}
          >
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="space-y-7">
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-molted-white text-sm font-semibold">Institution size</label>
                    <span className="text-sm font-black" style={{ color: ROSE }}>{students.toLocaleString()} students</span>
                  </div>
                  <input
                    type="range" min={1000} max={50000} step={500} value={students}
                    onChange={e => setStudents(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{ accentColor: ROSE }}
                  />
                  <div className="flex justify-between mt-1 text-xs text-molted-subtle">
                    <span>1,000</span><span>50,000</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-molted-white text-sm font-semibold">Current retention rate</label>
                    <span className="text-sm font-black" style={{ color: ROSE }}>{retentionRate}%</span>
                  </div>
                  <input
                    type="range" min={50} max={95} step={1} value={retentionRate}
                    onChange={e => setRetentionRate(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{ accentColor: ROSE }}
                  />
                  <div className="flex justify-between mt-1 text-xs text-molted-subtle">
                    <span>50%</span><span>95%</span>
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

              <div className="text-center">
                <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Annual revenue impact</p>
                <p className="text-6xl md:text-7xl font-black mb-2" style={{ color: ROSE }}>
                  ${revenue}M
                </p>
                <p className="text-molted-muted text-sm">per year in retained tuition revenue</p>
                <div
                  className="mt-8 p-4 rounded-2xl text-sm"
                  style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)' }}
                >
                  <p className="text-molted-muted leading-relaxed">
                    Retain Growth at {students.toLocaleString()} students costs{' '}
                    <span className="text-molted-white font-semibold">
                      ~${Math.min(Math.ceil(students / 10000) * 4999, 9999).toLocaleString()}/mo
                    </span>.{' '}
                    Revenue impact:{' '}
                    <span style={{ color: ROSE }} className="font-bold">${revenue}M/year.</span>
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

/* ── Pricing ───────────────────────────────────────────────────────────── */
function Pricing() {
  const tiers = [
    {
      name: 'Starter',
      price: '$1,999',
      period: '/mo · up to 2,500 students',
      desc: 'For smaller institutions ready to take retention seriously.',
      features: [
        '4 autonomous playbooks',
        '7-signal monitoring engine',
        'Advisor review queue',
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
      desc: 'For mid-size institutions deploying the full agentic loop.',
      features: [
        'Everything in Starter',
        'Financial aid anomaly detection',
        'Full ecosystem coordination (Forge, Persona Ai)',
        'Multi-advisor workflow',
        'Custom playbook configuration',
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
      desc: 'For large universities and multi-campus systems.',
      features: [
        'Everything in Growth',
        'Multi-campus agent deployment',
        'SIS + ERP integration',
        'Custom signal model training',
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
                  background: tier.highlight ? ROSE_DIM : 'rgba(241,243,248,0.85)',
                  borderColor: tier.highlight ? ROSE_BORDER : 'rgba(0,0,0,0.06)',
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
                  href="mailto:greg.lucas@paigebreaker.com"
                  className="block text-center px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-px"
                  style={{
                    background: tier.highlight ? ROSE : 'rgba(0,0,0,0.06)',
                    color: tier.highlight ? '#ffffff' : '#1C1C1E',
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
            Your campus deserves<br />
            <span style={{ color: ROSE }}>an agent that never sleeps.</span>
          </h2>
          <p className="mt-6 text-molted-muted text-lg leading-relaxed">
            While your advisors rest, Retain is watching your students,
            running playbooks, and making sure the right person gets the right
            support before it's too late.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:greg.lucas@paigebreaker.com"
              className="group flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:-translate-y-px text-white"
              style={{ background: ROSE }}
            >
              Deploy the Agent
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              to="/"
              className="px-8 py-4 rounded-xl border border-molted-border text-molted-muted hover:text-molted-white hover:border-molted-subtle font-semibold transition-all"
            >
              See All Products
            </Link>
          </div>
          <p className="mt-8 text-molted-subtle text-sm italic">
            "Every student who was about to leave — didn't." — MoltED
          </p>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────── */
export default function MoltedRetain() {
  return (
    <MoltedLayout>
      <Hero />
      <AgentLoop />
      <SilentDeparture />
      <Playbooks />
      <AgentFeed />
      <HumanInLoop />
      <EcosystemCoordination />
      <ROISection />
      <Pricing />
      <FinalCTA />
    </MoltedLayout>
  );
}
