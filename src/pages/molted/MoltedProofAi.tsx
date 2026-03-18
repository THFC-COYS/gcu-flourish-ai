import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ChevronRight, Mic, MessageSquare, Award,
  Shield, BarChart3, CheckCircle, Users, BookOpen, Zap, AlertTriangle,
} from 'lucide-react';
import MoltedLayout from './MoltedLayout';
import AgentFeed, { FeedEvent } from '../../components/AgentFeed';

const PROOF_EVENTS: FeedEvent[] = [
  { time: '10:22 AM', event: 'Student submits essay on healthcare ethics — suspected AI-written', action: 'Proof schedules oral follow-up — student cannot fake a live conversation', role: 'Student', href: '/proof-ai' },
  { time: '2:15 PM',  event: 'Alexis R. begins oral AI assessment for BIO 402', action: 'Proof evaluates depth in real time — distinguishes recall from understanding', role: 'Student', href: '/proof-ai' },
  { time: '9:48 AM',  event: 'Student defends research methodology under Proof questioning', action: 'Integrity confirmed — portfolio updated, evidence tagged to SACSCOC outcome', role: 'Student', href: '/proof-ai' },
  { time: '4:05 PM',  event: 'Faculty requests accreditation evidence for NURS program', action: 'Proof generates SACSCOC-ready report — 6 weeks of evidence in 4 minutes', role: 'Faculty', href: '/proof-ai' },
  { time: '11:30 AM', event: 'Student claims prior learning — needs competency verification', action: 'Proof runs adaptive oral assessment, awards credit with documented evidence', role: 'Student', href: '/proof-ai' },
  { time: '8:00 AM',  event: 'End-of-semester portfolio review for 180 students', action: 'Proof maps all work to program outcomes — board report ready by noon', role: 'Admin', href: '/proof-ai' },
];

function ProofLiveFeed() {
  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Assessments in progress</p>
            <h2 className="text-4xl md:text-5xl font-black text-molted-white leading-tight tracking-tight mb-6">
              Proof runs 24/7.<br />
              <span style={{ color: '#64748B' }}>The evidence never sleeps.</span>
            </h2>
            <p className="text-molted-muted text-lg leading-relaxed">
              Every event below is Proof doing what accreditors require but traditional assessment can't deliver — verified understanding, documented continuously, ready when you need it.
            </p>
          </div>
          <AgentFeed events={PROOF_EVENTS} label="Proof assessments running" accentColor="#64748B" />
        </div>
      </div>
    </section>
  );
}

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

/* ── Proof accent ────────────────────────────────────────────────────── */
const ORANGE = '#F97316';
const ORANGE_DIM = 'rgba(249,115,22,0.12)';
const ORANGE_BORDER = 'rgba(249,115,22,0.25)';
const ORANGE_GLOW = '0 0 30px rgba(249,115,22,0.12), 0 0 60px rgba(249,115,22,0.14)';

/* ── Hero ──────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(249,115,22,0.14) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(30,58,138,0.10) 0%, transparent 70%)' }}
        />
      </div>

      {/* Product chip */}
      <RevealBlock className="mb-8">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase"
          style={{ background: ORANGE_DIM, border: `1px solid ${ORANGE_BORDER}`, color: ORANGE }}
        >
          <Shield size={12} />
          The first assessment platform designed after ChatGPT.
        </div>
      </RevealBlock>

      {/* Wordmark */}
      <RevealBlock delay={100}>
        <h1
          className="text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight"
          style={{ color: ORANGE, textShadow: `0 0 40px rgba(249,115,22,0.5), 0 0 80px rgba(249,115,22,0.2)` }}
        >
          Proof
        </h1>
      </RevealBlock>

      {/* Position */}
      <RevealBlock delay={200}>
        <p className="mt-6 text-xl md:text-2xl font-black text-molted-white/70 tracking-tight max-w-2xl">
          Assessment for the post-ChatGPT world.
        </p>
      </RevealBlock>

      {/* Headline */}
      <RevealBlock delay={300}>
        <p className="mt-4 text-3xl md:text-4xl font-black text-molted-white tracking-tight leading-snug max-w-3xl">
          The essay is dead.<br />
          <span style={{ color: ORANGE }}>We built what comes next.</span>
        </p>
      </RevealBlock>

      {/* Sub */}
      <RevealBlock delay={400}>
        <p className="mt-6 text-molted-muted text-lg max-w-xl leading-relaxed">
          Every professor knows it. ChatGPT writes every essay. Proof rebuilds
          assessment from the ground up — for a world where AI exists.
        </p>
      </RevealBlock>

      {/* CTAs */}
      <RevealBlock delay={500} className="mt-10 flex flex-col sm:flex-row items-center gap-4">
        <Link
          to="/proof-ai/demo"
          className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold transition-all duration-200 hover:-translate-y-px text-white"
          style={{ background: ORANGE }}
        >
          Try Live Demo
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <a
          href="#for-faculty"
          className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-molted-border hover:border-molted-subtle text-molted-muted hover:text-molted-white font-semibold transition-all duration-200"
        >
          For Faculty
          <ChevronRight size={16} />
        </a>
      </RevealBlock>

      {/* Tagline */}
      <RevealBlock delay={600} className="mt-16">
        <p className="text-molted-subtle text-sm italic tracking-wide">
          "You can't outsource a conversation."
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

/* ── The Crisis ────────────────────────────────────────────────────────── */
function TheCrisis() {
  const stats = [
    {
      stat: '89%',
      label: 'of professors suspect AI on submitted essays',
      detail: 'And they\'re right.',
    },
    {
      stat: '0%',
      label: 'of traditional assessment tests what students actually know',
      detail: 'It tests what they can produce. Different thing entirely.',
    },
    {
      stat: '$500B',
      label: 'higher education industry running on broken infrastructure',
      detail: 'Assessment hasn\'t changed. The world has.',
    },
  ];

  return (
    <section className="py-28 px-6 border-t border-molted-border">
      <div className="max-w-5xl mx-auto">
        <RevealBlock className="text-center mb-20">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">The reality</p>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            ChatGPT passed every exam<br />
            <span style={{ color: ORANGE }}>you gave last semester.</span>
          </h2>
        </RevealBlock>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {stats.map((s, i) => (
            <RevealBlock key={i} delay={i * 120}>
              <div
                className="rounded-2xl p-7 border h-full"
                style={{
                  background: 'rgba(241,243,248,0.95)',
                  borderColor: 'rgba(0,0,0,0.06)',
                }}
              >
                <p
                  className="text-5xl md:text-6xl font-black mb-3"
                  style={{ color: ORANGE }}
                >
                  {s.stat}
                </p>
                <p className="text-molted-white font-semibold text-base leading-snug mb-2">{s.label}</p>
                <p className="text-molted-muted text-sm">{s.detail}</p>
              </div>
            </RevealBlock>
          ))}
        </div>

        <RevealBlock>
          <div
            className="rounded-3xl p-10 text-center border"
            style={{
              background: ORANGE_DIM,
              borderColor: ORANGE_BORDER,
              boxShadow: ORANGE_GLOW,
            }}
          >
            <p className="text-2xl md:text-3xl font-black text-molted-white leading-snug max-w-2xl mx-auto">
              Proof doesn't try to detect AI.
            </p>
            <p className="text-2xl md:text-3xl font-black mt-2 leading-snug max-w-2xl mx-auto" style={{ color: ORANGE }}>
              It makes AI irrelevant.
            </p>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Three Assessment Modes ────────────────────────────────────────────── */
function OralAssessmentMock() {
  const bars = [3, 5, 2, 7, 4, 8, 3, 6, 5, 9, 4, 7, 3, 5, 8, 4, 6, 3, 7, 5];
  return (
    <div className="rounded-2xl border border-molted-border bg-molted-elevated p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-molted-white text-sm font-semibold">Live Assessment · Alexis R.</p>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: ORANGE }}>
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ORANGE }} />
          Recording
        </div>
      </div>
      {/* Voice waveform */}
      <div
        className="flex items-center justify-center gap-0.5 h-12 rounded-xl mb-4"
        style={{ background: ORANGE_DIM, border: `1px solid ${ORANGE_BORDER}` }}
      >
        {bars.map((h, i) => (
          <div
            key={i}
            className="w-1.5 rounded-full transition-all"
            style={{
              height: `${h * 4}px`,
              background: ORANGE,
              opacity: 0.6 + (h / 10) * 0.4,
            }}
          />
        ))}
      </div>
      <div
        className="rounded-xl p-4 text-xs leading-relaxed"
        style={{ background: 'rgba(248,249,252,0.95)', border: '1px solid rgba(0,0,0,0.06)' }}
      >
        <p className="text-molted-muted mb-1 font-semibold uppercase tracking-wide text-xs">Proof Evaluation</p>
        <p className="text-molted-white/80">
          Alexis demonstrates <span style={{ color: ORANGE }}>conceptual understanding</span> of mitosis
          but struggles with application to novel scenarios. Follow-up questions
          on cancer cell behavior revealed surface-level recall.
        </p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-molted-border">
          <span className="text-molted-muted">Depth Score</span>
          <span className="font-black text-molted-white">84 / 100</span>
        </div>
      </div>
    </div>
  );
}

function DefendYourWorkMock() {
  const messages = [
    {
      role: 'Proof',
      text: 'You wrote that mitosis results in genetically identical cells. Can you explain what that means in the context of cancer?',
      ai: true,
    },
    {
      role: 'Student',
      text: 'Um — cancer cells divide uncontrollably, so they\'re still genetically identical to each other but different from normal cells?',
      ai: false,
    },
    {
      role: 'Proof',
      text: 'Interesting. What mechanism breaks down to allow that uncontrolled division? Walk me through the cell cycle checkpoint.',
      ai: true,
    },
  ];

  return (
    <div className="rounded-2xl border border-molted-border bg-molted-elevated p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-molted-white text-sm font-semibold">Defense Session · Essay 2</p>
        <span
          className="text-xs px-2 py-0.5 rounded-full font-semibold"
          style={{ background: ORANGE_DIM, color: ORANGE, border: `1px solid ${ORANGE_BORDER}` }}
        >
          7:32 remaining
        </span>
      </div>
      <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-2.5 ${m.ai ? '' : 'flex-row-reverse'}`}>
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold"
              style={{
                background: m.ai ? ORANGE_DIM : 'rgba(0,0,0,0.07)',
                color: m.ai ? ORANGE : '#86868B',
              }}
            >
              {m.ai ? 'P' : 'S'}
            </div>
            <div
              className="flex-1 rounded-xl p-3 text-xs leading-relaxed max-w-[85%]"
              style={{
                background: m.ai ? ORANGE_DIM : 'rgba(0,0,0,0.05)',
                border: `1px solid ${m.ai ? ORANGE_BORDER : 'rgba(0,0,0,0.06)'}`,
                color: m.ai ? '#1C1C1E' : '#86868B',
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsPortfolioMock() {
  const competencies = [
    { name: 'Cell Biology — Mitosis & Meiosis', level: 'Mastered', pct: 100 },
    { name: 'Cell Cycle Regulation', level: 'Proficient', pct: 78 },
    { name: 'DNA Replication Mechanics', level: 'Mastered', pct: 100 },
    { name: 'Cancer Biology — Oncogenes', level: 'Developing', pct: 42 },
    { name: 'Protein Synthesis', level: 'Mastered', pct: 95 },
  ];
  const levelColor = (l: string) =>
    l === 'Mastered' ? '#22C55E' : l === 'Proficient' ? ORANGE : '#86868B';

  return (
    <div className="rounded-2xl border border-molted-border bg-molted-elevated p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-molted-white text-sm font-semibold">Skills Portfolio · Alexis R.</p>
        <span
          className="text-xs px-2 py-0.5 rounded-full font-semibold"
          style={{ background: 'rgba(34,197,94,0.1)', color: '#22C55E', border: '1px solid rgba(34,197,94,0.2)' }}
        >
          3 Mastered
        </span>
      </div>
      <div className="space-y-3">
        {competencies.map((c, i) => (
          <div key={i} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <p className="text-molted-white text-xs font-medium">{c.name}</p>
              <span
                className="text-xs font-semibold"
                style={{ color: levelColor(c.level) }}
              >
                {c.level}
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-molted-border overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${c.pct}%`, background: levelColor(c.level) }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-molted-muted text-xs text-center">
        Not a grade — <span className="text-molted-white">evidence of what she actually knows.</span>
      </p>
    </div>
  );
}

const MODES = [
  {
    icon: Mic,
    name: 'Oral AI Assessment',
    tagline: 'Can\'t fake a conversation.',
    description:
      'Student answers questions via voice. Proof evaluates depth of understanding in real time, handles follow-up questions, and distinguishes surface recall from genuine conceptual mastery. No script survives the follow-up.',
    bullets: [
      'Real-time speech evaluation with follow-up logic',
      'Detects surface vs. deep knowledge automatically',
      'Generates assessment report per student',
      'Calibrates difficulty based on prior responses',
    ],
    visual: 'oral',
  },
  {
    icon: MessageSquare,
    name: 'Defend Your Work',
    tagline: 'Submit it. Then prove you wrote it.',
    description:
      'Student submits work — then defends it in a 10-minute AI conversation about their own submission. If you can\'t answer questions about what you submitted, the submission doesn\'t count. AI-generated work collapses on the first follow-up.',
    bullets: [
      'Student submits, then enters live defense session',
      'Proof asks targeted questions about their specific work',
      'Inconsistency detection across submission + defense',
      'Full session transcript available for faculty review',
    ],
    visual: 'defend',
  },
  {
    icon: Award,
    name: 'Skills Portfolio',
    tagline: 'Evidence, not grades.',
    description:
      'Every assessment builds a longitudinal record of what a student has actually proven they know. Competency by competency, assessment by assessment — a portfolio of verified mastery that means something.',
    bullets: [
      'Builds from every Proof assessment automatically',
      'Maps to course learning objectives and accreditation standards',
      'Mastery levels: Developing, Proficient, Mastered',
      'Shareable with advisors, employers, institutions',
    ],
    visual: 'portfolio',
  },
];

function AssessmentModes() {
  const [active, setActive] = useState(0);
  const mode = MODES[active];
  const Icon = mode.icon;

  return (
    <section id="how-it-works" className="py-28 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Three modes</p>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            Assessment that<br />
            <span style={{ color: ORANGE }}>AI can't answer for you.</span>
          </h2>
        </RevealBlock>

        {/* Mode tabs */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10 justify-center">
          {MODES.map((m, i) => {
            const MIcon = m.icon;
            const isActive = i === active;
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="flex items-center gap-2.5 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300"
                style={{
                  background: isActive ? ORANGE_DIM : 'rgba(241,243,248,0.85)',
                  border: `1px solid ${isActive ? ORANGE_BORDER : 'rgba(0,0,0,0.06)'}`,
                  color: isActive ? ORANGE : '#86868B',
                }}
              >
                <MIcon size={15} />
                {m.name}
              </button>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Description */}
          <div
            className="rounded-2xl p-7 border"
            style={{ background: 'rgba(241,243,248,0.95)', borderColor: 'rgba(0,0,0,0.06)' }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
              style={{ background: ORANGE_DIM, border: `1px solid ${ORANGE_BORDER}` }}
            >
              <Icon size={20} style={{ color: ORANGE }} />
            </div>
            <h3 className="text-2xl font-black text-molted-white mb-1">{mode.name}</h3>
            <p className="text-molted-muted text-sm mb-5 italic">{mode.tagline}</p>
            <p className="text-molted-white/80 text-base leading-relaxed mb-6">{mode.description}</p>
            <div className="space-y-2.5">
              {mode.bullets.map((b, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-molted-muted">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ORANGE }} />
                  {b}
                </div>
              ))}
            </div>
          </div>

          {/* Visual mock */}
          <div>
            {active === 0 && <OralAssessmentMock />}
            {active === 1 && <DefendYourWorkMock />}
            {active === 2 && <SkillsPortfolioMock />}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Before / After ────────────────────────────────────────────────────── */
function BeforeAfter() {
  const before = [
    { step: '01', text: 'Assign essay topic' },
    { step: '02', text: 'Student submits document' },
    { step: '03', text: 'Professor spends 8 hours grading' },
    { step: '04', text: 'AI probably wrote it' },
    { step: '05', text: 'Grade reflects nothing real' },
  ];
  const after = [
    { step: '01', text: 'Assign topic or learning objective' },
    { step: '02', text: 'Student submits and defends in Proof' },
    { step: '03', text: 'AI verifies understanding in real time' },
    { step: '04', text: 'Grade reflects actual mastery' },
    { step: '05', text: 'Portfolio record updated automatically' },
  ];

  return (
    <section className="py-28 px-6 border-t border-molted-border relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(249,115,22,0.08) 0%, transparent 60%)' }}
      />
      <div className="max-w-5xl mx-auto relative z-10">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">The replacement</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight leading-tight">
            How Proof replaces the essay.
          </h2>
        </RevealBlock>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Before */}
          <RevealBlock>
            <div
              className="rounded-2xl p-7 border h-full"
              style={{ background: 'rgba(30,58,138,0.10)', borderColor: 'rgba(30,58,138,0.12)' }}
            >
              <div className="flex items-center gap-2.5 mb-6">
                <AlertTriangle size={16} style={{ color: '#1E3A8A' }} />
                <p className="text-sm font-bold uppercase tracking-widest" style={{ color: '#1E3A8A' }}>
                  Before — The Essay
                </p>
              </div>
              <div className="space-y-3">
                {before.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-xs font-bold text-molted-subtle mt-0.5 flex-shrink-0 w-6">{item.step}</span>
                    <p className="text-molted-muted text-sm line-through decoration-molted-subtle">{item.text}</p>
                  </div>
                ))}
              </div>
              <div
                className="mt-6 p-3 rounded-xl text-xs text-center font-semibold"
                style={{ background: 'rgba(30,58,138,0.16)', color: '#1E3A8A', border: '1px solid rgba(30,58,138,0.15)' }}
              >
                Grade reflects what AI can produce, not what students know.
              </div>
            </div>
          </RevealBlock>

          {/* After */}
          <RevealBlock delay={120}>
            <div
              className="rounded-2xl p-7 border h-full"
              style={{ background: ORANGE_DIM, borderColor: ORANGE_BORDER, boxShadow: ORANGE_GLOW }}
            >
              <div className="flex items-center gap-2.5 mb-6">
                <CheckCircle size={16} style={{ color: ORANGE }} />
                <p className="text-sm font-bold uppercase tracking-widest" style={{ color: ORANGE }}>
                  After — Proof
                </p>
              </div>
              <div className="space-y-3">
                {after.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-xs font-bold mt-0.5 flex-shrink-0 w-6" style={{ color: ORANGE }}>{item.step}</span>
                    <p className="text-molted-white text-sm">{item.text}</p>
                  </div>
                ))}
              </div>
              <div
                className="mt-6 p-3 rounded-xl text-xs text-center font-semibold"
                style={{ background: 'rgba(249,115,22,0.15)', color: ORANGE, border: `1px solid ${ORANGE_BORDER}` }}
              >
                Grade reflects actual mastery. Every time.
              </div>
            </div>
          </RevealBlock>
        </div>
      </div>
    </section>
  );
}

/* ── For Faculty ───────────────────────────────────────────────────────── */
function ForFaculty() {
  const changes = [
    {
      icon: Shield,
      title: 'No more plagiarism detection theater',
      desc: 'Stop feeding submissions to detection tools that don\'t work. Proof doesn\'t detect — it makes detection irrelevant.',
    },
    {
      icon: Zap,
      title: 'Set once. Adapts per student.',
      desc: 'Define the learning objective. Proof generates unique questions per student based on their submission and prior performance.',
    },
    {
      icon: BarChart3,
      title: 'Grades reflect actual mastery',
      desc: 'Every score comes with a full transcript of the student demonstrating (or failing to demonstrate) what they claim to know.',
    },
    {
      icon: BookOpen,
      title: 'Integrity reports, automatically',
      desc: 'Proof generates academic integrity reports for every flagged session — timestamped, transcript-backed, ready for review board.',
    },
    {
      icon: Users,
      title: 'Integrates with Forge',
      desc: 'Proof feeds directly into the Forge grading workflow. Assessment scores, portfolio records, and integrity flags — all in one place.',
    },
  ];

  return (
    <section id="for-faculty" className="py-28 px-6 border-t border-molted-border">
      <div className="max-w-5xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">For faculty</p>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            What changes for<br />
            <span style={{ color: ORANGE }}>the professor.</span>
          </h2>
          <p className="mt-6 text-molted-muted text-lg max-w-xl mx-auto">
            Less time grading. No more integrity anxiety. Actual confidence
            that your grades mean something.
          </p>
        </RevealBlock>

        <div className="grid md:grid-cols-2 gap-5">
          {changes.map((item, i) => {
            const Icon = item.icon;
            return (
              <RevealBlock key={i} delay={i * 80}>
                <div
                  className="rounded-2xl p-6 border transition-all duration-300 hover:border-orange-500/30"
                  style={{ background: 'rgba(241,243,248,0.90)', borderColor: 'rgba(0,0,0,0.06)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: ORANGE_DIM, border: `1px solid ${ORANGE_BORDER}` }}
                  >
                    <Icon size={17} style={{ color: ORANGE }} />
                  </div>
                  <h3 className="text-molted-white font-bold text-base mb-2">{item.title}</h3>
                  <p className="text-molted-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              </RevealBlock>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Pricing ───────────────────────────────────────────────────────────── */
function Pricing() {
  const tiers = [
    {
      name: 'Faculty',
      price: '$39',
      period: '/mo per instructor',
      desc: 'For professors ready to leave the essay behind.',
      features: [
        'Oral AI Assessment (unlimited)',
        'Defend Your Work sessions',
        'Academic integrity reports',
        'Up to 50 students',
      ],
      cta: 'Start Free Trial',
      highlight: false,
    },
    {
      name: 'Department',
      price: '$249',
      period: '/mo per department',
      desc: 'For departments standardizing assessment across courses.',
      features: [
        'Everything in Faculty',
        'Skills Portfolio for all students',
        'LMS grade sync (Canvas, D2L, Blackboard)',
        'Department analytics dashboard',
        'Forge integration',
        'Priority support',
      ],
      cta: 'Request Demo',
      highlight: true,
    },
    {
      name: 'Institution',
      price: 'Custom',
      period: 'institutional license',
      desc: 'For institutions deploying Proof at scale.',
      features: [
        'Everything in Department',
        'Accreditation-ready reporting',
        'Custom competency frameworks',
        'SLA + compliance',
        'Dedicated success team',
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
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            For every level of the institution.
          </h2>
        </RevealBlock>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <RevealBlock key={i} delay={i * 100}>
              <div
                className="rounded-2xl p-7 h-full flex flex-col border transition-all duration-300"
                style={{
                  background: tier.highlight ? ORANGE_DIM : 'rgba(241,243,248,0.85)',
                  borderColor: tier.highlight ? ORANGE_BORDER : 'rgba(0,0,0,0.06)',
                  boxShadow: tier.highlight ? ORANGE_GLOW : 'none',
                }}
              >
                <div className="mb-6">
                  <p className="text-sm font-semibold mb-1" style={{ color: '#86868B' }}>{tier.name}</p>
                  <p className="text-4xl font-black" style={{ color: '#1C1C1E' }}>{tier.price}</p>
                  <p className="text-sm" style={{ color: '#86868B' }}>{tier.period}</p>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: 'rgba(134,134,139,0.8)' }}>{tier.desc}</p>
                </div>
                <ul className="space-y-2.5 flex-1 mb-7">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-sm" style={{ color: '#86868B' }}>
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ORANGE }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="mailto:greg.lucas@paigebreaker.com"
                  className="block text-center px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-px"
                  style={{
                    background: tier.highlight ? ORANGE : 'rgba(0,0,0,0.06)',
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
        style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(249,115,22,0.14) 0%, transparent 60%)' }}
      />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <RevealBlock>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            Stop pretending<br />
            <span style={{ color: ORANGE }}>the essay still works.</span>
          </h2>
          <p className="mt-6 text-molted-muted text-lg leading-relaxed">
            Proof is the assessment infrastructure higher education needs.
            Your faculty deserve tools built for the world that exists now.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:greg.lucas@paigebreaker.com"
              className="group flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:-translate-y-px text-white"
              style={{ background: ORANGE }}
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
          <p className="mt-8 text-molted-subtle text-sm italic">
            "You can't outsource a conversation." — MoltED
          </p>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────── */
export default function MoltedProof() {
  return (
    <MoltedLayout>
      <Hero />
      <TheCrisis />
      <AssessmentModes />
      <ProofLiveFeed />
      <BeforeAfter />
      <ForFaculty />
      <Pricing />
      <FinalCTA />
    </MoltedLayout>
  );
}
