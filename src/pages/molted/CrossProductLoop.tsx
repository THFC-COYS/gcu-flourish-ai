import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  MessageSquare,
  AlertTriangle,
  Heart,
  GitBranch,
  BookOpen,
  ArrowRight,
  ArrowDown,
  Play,
  RotateCcw,
  Check,
  Copy,
  Users,
  Zap,
} from 'lucide-react';
import MoltLMSLayout from './MoltedLayout';

/* ── Product config ─────────────────────────────────────────────────────── */
const PRODUCTS = [
  { id: 'forge',   label: 'Forge',      sub: 'Discussion Intelligence', color: '#2563EB', icon: MessageSquare },
  { id: 'beacon',  label: 'Beacon',     sub: 'Student Risk Monitor',    color: '#1E3A8A', icon: AlertTriangle },
  { id: 'retain',  label: 'Retain AI',  sub: 'Intervention Planner',    color: '#EF4444', icon: Users },
  { id: 'pathway', label: 'Pathway AI', sub: 'Adaptive Learning',       color: '#8B5CF6', icon: GitBranch },
  { id: 'lumen',   label: 'Lumen',      sub: 'Reading Companion',       color: '#7B61FF', icon: BookOpen },
] as const;

/* ── Helpers ────────────────────────────────────────────────────────────── */
function hex(color: string, alpha: number) {
  // convert hex → rgba
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/* ── Sub-components ─────────────────────────────────────────────────────── */

function StudentCard({ onStart }: { onStart: () => void }) {
  return (
    <div
      className="rounded-2xl p-6 border max-w-lg w-full mx-auto"
      style={{
        background: 'rgba(15,23,42,0.90)',
        borderColor: 'rgba(255,255,255,0.10)',
        boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
      }}
    >
      {/* Avatar row */}
      <div className="flex items-center gap-4 mb-5">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #2563EB, #8B5CF6)' }}
        >
          JM
        </div>
        <div>
          <p className="text-white font-semibold text-base leading-tight">Jordan Martinez</p>
          <p className="text-white/50 text-sm">Junior · BIOL 301</p>
        </div>
        <span
          className="ml-auto text-xs px-2.5 py-1 rounded-full font-medium"
          style={{ background: 'rgba(239,68,68,0.12)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.25)' }}
        >
          At Risk
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div
          className="rounded-xl p-3"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p className="text-white/40 text-xs mb-1">Last Active</p>
          <p className="text-white/80 text-sm font-medium">2 days ago</p>
        </div>
        <div
          className="rounded-xl p-3"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p className="text-white/40 text-xs mb-1">Quiz Score (Wk 6)</p>
          <p className="text-sm font-bold" style={{ color: '#EF4444' }}>34%</p>
          <p className="text-white/30 text-xs">DNA Replication</p>
        </div>
        <div
          className="rounded-xl p-3 col-span-2"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p className="text-white/40 text-xs mb-2">Discussion Participation</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <div
                className="h-2 rounded-full transition-all"
                style={{ width: '12%', background: '#EF4444' }}
              />
            </div>
            <span className="text-white/60 text-xs whitespace-nowrap">85% → <span style={{ color: '#EF4444' }}>12%</span> this week</span>
          </div>
        </div>
      </div>

      <button
        onClick={onStart}
        className="w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-95"
        style={{ background: 'linear-gradient(135deg, #2563EB, #8B5CF6)' }}
      >
        <Play size={16} />
        Watch what happens next
        <ArrowRight size={16} />
      </button>
    </div>
  );
}

/* Pulsing connector between steps */
function Connector({ color, active }: { color: string; active: boolean }) {
  return (
    <div className="flex flex-col items-center my-1" style={{ minHeight: 40 }}>
      <div
        className="w-px transition-all duration-700"
        style={{
          height: 40,
          background: active
            ? `linear-gradient(to bottom, ${color}, ${hex(color, 0.3)})`
            : 'rgba(255,255,255,0.08)',
          boxShadow: active ? `0 0 8px ${hex(color, 0.6)}` : 'none',
        }}
      />
      {active && (
        <div
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ background: color, boxShadow: `0 0 8px ${hex(color, 0.8)}`, marginTop: -4 }}
        />
      )}
    </div>
  );
}

/* ── Step cards ─────────────────────────────────────────────────────────── */

function ForgeCard() {
  return (
    <div className="space-y-3">
      <p className="text-white/60 text-sm">
        Jordan's Week 6 post contains a fundamental misconception about DNA replication
        directionality. <span style={{ color: '#2563EB' }}>Confidence: 91%.</span> Routing: Socratic reply.
      </p>
      <div
        className="rounded-xl p-4"
        style={{ background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.18)' }}
      >
        <p className="text-white/40 text-xs uppercase tracking-wide mb-2">Student post excerpt</p>
        <p className="text-white/70 text-sm italic">
          "DNA polymerase reads the template strand in the 3'→5' direction so it must build
          the new strand in the same direction..."
        </p>
      </div>
      <div
        className="rounded-xl p-4"
        style={{ background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.18)' }}
      >
        <p className="text-white/40 text-xs uppercase tracking-wide mb-2">Drafted Socratic reply</p>
        <p className="text-white/80 text-sm">
          "Jordan, you've correctly identified the directionality of reading — that precision
          matters here. What happens if both strands were built in the same direction given
          they're antiparallel?"
        </p>
      </div>
    </div>
  );
}

function BeaconCard({ visibleSignals }: { visibleSignals: number }) {
  const signals = [
    'Discussion engagement drop (85%→12%)',
    'Quiz score 34% (below 60% threshold)',
    'LMS login frequency: -60% this week',
    'Assignment submission: 2 days late',
  ];
  return (
    <div className="space-y-3">
      <p className="text-white/60 text-sm">
        Signal received from Forge. Cross-referencing{' '}
        <span className="font-semibold" style={{ color: '#60A5FA' }}>6 behavioral signals...</span>
      </p>
      <div
        className="rounded-xl p-4 space-y-2"
        style={{ background: 'rgba(30,58,138,0.08)', border: '1px solid rgba(30,58,138,0.25)' }}
      >
        {signals.map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-sm transition-all duration-500"
            style={{ opacity: i < visibleSignals ? 1 : 0.2 }}
          >
            <Check
              size={14}
              style={{ color: i < visibleSignals ? '#34D399' : 'rgba(255,255,255,0.2)', flexShrink: 0 }}
            />
            <span className="text-white/70">{s}</span>
          </div>
        ))}
        <div
          className="mt-3 pt-3 flex items-center gap-2 text-sm font-semibold"
          style={{
            borderTop: '1px solid rgba(30,58,138,0.25)',
            opacity: visibleSignals >= signals.length ? 1 : 0.2,
            transition: 'opacity 0.5s',
          }}
        >
          <ArrowRight size={14} style={{ color: '#EF4444' }} />
          <span style={{ color: '#EF4444' }}>Risk classification: HIGH</span>
          <span className="text-white/40 font-normal">·</span>
          <span className="text-white/60 font-normal">Early Warning triggered</span>
        </div>
      </div>
    </div>
  );
}

function RetainCard({ copied, onCopy }: { copied: boolean; onCopy: () => void }) {
  const email = `Subject: Checking in — Jordan

Jordan,

I wanted to personally reach out because I noticed you've been less active this week, and your Week 6 quiz showed some confusion around DNA replication that I'd love to work through with you.

Could we find 15 minutes this week? I have office hours Thu 2–4pm, or I'm happy to set up a separate time.

— Dr. Chen`;

  return (
    <div className="space-y-3">
      <p className="text-white/60 text-sm">
        Drafting personalized outreach from <span style={{ color: '#EF4444' }}>Dr. Chen...</span>
      </p>
      <div
        className="rounded-xl p-4 relative"
        style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.18)' }}
      >
        <pre className="text-white/75 text-xs whitespace-pre-wrap font-mono leading-relaxed">{email}</pre>
        <button
          onClick={onCopy}
          className="absolute top-3 right-3 flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg transition-all"
          style={{
            background: copied ? 'rgba(52,211,153,0.12)' : 'rgba(255,255,255,0.06)',
            border: copied ? '1px solid rgba(52,211,153,0.3)' : '1px solid rgba(255,255,255,0.10)',
            color: copied ? '#34D399' : 'rgba(255,255,255,0.5)',
          }}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
}

function PathwayCard() {
  return (
    <div className="space-y-3">
      <p className="text-white/60 text-sm">
        Learning path updated for Jordan <span style={{ color: '#8B5CF6' }}>in real time.</span>
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div
          className="rounded-xl p-4"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p className="text-white/30 text-xs uppercase tracking-wide mb-2">Before</p>
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: '#64748B' }}
            />
            <span className="text-white/50 text-xs">Week 7 → Protein Synthesis</span>
          </div>
          <p className="text-white/25 text-xs mt-1 ml-4">scheduled</p>
        </div>
        <div
          className="rounded-xl p-4"
          style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.25)' }}
        >
          <p className="text-xs uppercase tracking-wide mb-2" style={{ color: '#A78BFA' }}>After</p>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-start gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0" style={{ background: '#8B5CF6' }} />
              <span className="text-white/70">DNA Replication Fundamentals (2 units)</span>
            </div>
            <div className="flex items-start gap-1.5 ml-2">
              <ArrowDown size={10} className="mt-0.5 flex-shrink-0 text-white/30" />
              <span className="text-white/50">Replication Fidelity &amp; Error Correction</span>
            </div>
            <div className="flex items-start gap-1.5 ml-2">
              <ArrowDown size={10} className="mt-0.5 flex-shrink-0 text-white/30" />
              <span className="text-white/50">THEN Protein Synthesis</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full"
        style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)', color: '#A78BFA' }}
      >
        <Zap size={12} />
        Path extended by 3 units · Est. catch-up: 4 days
      </div>
    </div>
  );
}

function LumenCard() {
  const [replied, setReplied] = useState<string | null>(null);
  return (
    <div className="space-y-3">
      <p className="text-white/60 text-sm">
        Jordan opens the Week 7 reading. <span style={{ color: '#7B61FF' }}>Lumen is ready.</span>
      </p>
      <div
        className="rounded-xl p-4"
        style={{ background: 'rgba(123,97,255,0.06)', border: '1px solid rgba(123,97,255,0.20)' }}
      >
        <p className="text-white/40 text-xs uppercase tracking-wide mb-3">Week 7 Reading</p>
        <p className="text-white/70 text-sm leading-relaxed mb-3">
          DNA polymerase synthesizes new strands exclusively in the{' '}
          <span
            className="px-1 rounded"
            style={{ background: 'rgba(123,97,255,0.25)', color: '#A78BFA' }}
          >
            5'→3' direction
          </span>
          , which creates an asymmetry between the leading and lagging strands...
        </p>
        {/* Tooltip */}
        <div
          className="rounded-xl p-3 mb-3"
          style={{
            background: 'rgba(123,97,255,0.12)',
            border: '1px solid rgba(123,97,255,0.35)',
          }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <BookOpen size={13} style={{ color: '#7B61FF' }} />
            <span className="text-xs font-semibold" style={{ color: '#A78BFA' }}>Lumen</span>
          </div>
          <p className="text-white/70 text-xs leading-relaxed">
            Jordan — you flagged uncertainty about strand directionality earlier. This paragraph
            explains exactly why. Want me to break it down with an analogy?
          </p>
        </div>
        {/* Response options */}
        {!replied ? (
          <div className="flex flex-wrap gap-2">
            {['Yes, explain it', 'I think I understand now', 'Skip'].map((opt) => (
              <button
                key={opt}
                onClick={() => setReplied(opt)}
                className="text-xs px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
                style={{
                  background: 'rgba(123,97,255,0.10)',
                  border: '1px solid rgba(123,97,255,0.28)',
                  color: 'rgba(255,255,255,0.65)',
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-white/40 text-xs italic">Jordan selected: "{replied}"</p>
        )}
      </div>
    </div>
  );
}

/* ── Step wrapper card ──────────────────────────────────────────────────── */
interface StepCardProps {
  step: number;
  visible: boolean;
  children: React.ReactNode;
}

function StepCard({ step, visible, children }: StepCardProps) {
  const product = PRODUCTS[step - 1];
  const Icon = product.icon;

  return (
    <div
      className="max-w-lg w-full mx-auto transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(48px)',
      }}
    >
      <div
        className="rounded-2xl p-5 border"
        style={{
          background: 'rgba(15,23,42,0.90)',
          borderColor: hex(product.color, 0.25),
          boxShadow: `0 4px 32px rgba(0,0,0,0.4), 0 0 0 1px ${hex(product.color, 0.08)}`,
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: hex(product.color, 0.15), border: `1px solid ${hex(product.color, 0.3)}` }}
          >
            <Icon size={17} style={{ color: product.color }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold text-sm">{product.label}</span>
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: hex(product.color, 0.12), color: product.color, border: `1px solid ${hex(product.color, 0.25)}` }}
              >
                Step {step}
              </span>
            </div>
            <p className="text-white/40 text-xs">{product.sub}</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ── Main page ──────────────────────────────────────────────────────────── */
export default function CrossProductLoop() {
  const [phase, setPhase] = useState<'idle' | 'playing' | 'done'>('idle');
  const [currentStep, setCurrentStep] = useState(0); // 0 = none revealed
  const [beaconSignals, setBeaconSignals] = useState(0);
  const [emailCopied, setEmailCopied] = useState(false);

  // Auto-advance steps
  useEffect(() => {
    if (phase !== 'playing') return;
    if (currentStep >= 5) {
      setPhase('done');
      return;
    }
    const timer = setTimeout(() => {
      setCurrentStep((s) => s + 1);
    }, 1500);
    return () => clearTimeout(timer);
  }, [phase, currentStep]);

  // Beacon signals: animate in one by one after step 2 appears
  useEffect(() => {
    if (currentStep < 2) {
      setBeaconSignals(0);
      return;
    }
    if (beaconSignals >= 4) return;
    const timer = setTimeout(() => setBeaconSignals((n) => n + 1), 400);
    return () => clearTimeout(timer);
  }, [currentStep, beaconSignals]);

  function handleStart() {
    setPhase('playing');
    setCurrentStep(1);
    setBeaconSignals(0);
    setEmailCopied(false);
  }

  function handleReplay() {
    setPhase('idle');
    setCurrentStep(0);
    setBeaconSignals(0);
    setEmailCopied(false);
  }

  function handleCopyEmail() {
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  }

  return (
    <MoltLMSLayout>
      <div className="min-h-screen" style={{ background: '#060B18' }}>
        {/* Hero header */}
        <div className="pt-24 pb-8 px-4 text-center">
          <Link
            to="/forge"
            className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors mb-6"
          >
            <ChevronLeft size={15} />
            Back to Forge
          </Link>

          <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(37,99,235,0.10)', border: '1px solid rgba(37,99,235,0.22)', color: '#60A5FA' }}>
            <Zap size={12} />
            Live Demo
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-3">
            The Connected Loop
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            One student signal. Five AI agents. Watch the cascade unfold in real time.
          </p>

          {/* Product flow pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {PRODUCTS.map((p, i) => (
              <span key={p.id} className="flex items-center gap-1.5">
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{
                    background: hex(p.color, 0.12),
                    border: `1px solid ${hex(p.color, 0.28)}`,
                    color: p.color,
                    opacity: currentStep > i ? 1 : 0.45,
                    transition: 'opacity 0.4s',
                  }}
                >
                  {p.label}
                </span>
                {i < PRODUCTS.length - 1 && (
                  <ArrowRight size={12} className="text-white/20" />
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Main flow */}
        <div className="px-4 pb-24 flex flex-col items-center">

          {/* Student card / play trigger */}
          {phase === 'idle' ? (
            <StudentCard onStart={handleStart} />
          ) : (
            /* Compact student chip */
            <div
              className="flex items-center gap-3 px-4 py-2.5 rounded-full border mb-2"
              style={{ background: 'rgba(15,23,42,0.85)', borderColor: 'rgba(255,255,255,0.10)' }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #2563EB, #8B5CF6)' }}
              >
                JM
              </div>
              <span className="text-white/70 text-sm">Jordan Martinez</span>
              <span className="text-white/30 text-sm">·</span>
              <span className="text-white/40 text-xs">BIOL 301</span>
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(239,68,68,0.12)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.25)' }}
              >
                At Risk
              </span>
            </div>
          )}

          {/* Steps */}
          {phase !== 'idle' && (
            <>
              {/* Step 1 — Forge */}
              <Connector color={PRODUCTS[0].color} active={currentStep >= 1} />
              <StepCard step={1} visible={currentStep >= 1}>
                <ForgeCard />
              </StepCard>

              {/* Step 2 — Beacon */}
              <Connector color={PRODUCTS[1].color} active={currentStep >= 2} />
              <StepCard step={2} visible={currentStep >= 2}>
                <BeaconCard visibleSignals={beaconSignals} />
              </StepCard>

              {/* Step 3 — Retain */}
              <Connector color={PRODUCTS[2].color} active={currentStep >= 3} />
              <StepCard step={3} visible={currentStep >= 3}>
                <RetainCard copied={emailCopied} onCopy={handleCopyEmail} />
              </StepCard>

              {/* Step 4 — Pathway */}
              <Connector color={PRODUCTS[3].color} active={currentStep >= 4} />
              <StepCard step={4} visible={currentStep >= 4}>
                <PathwayCard />
              </StepCard>

              {/* Step 5 — Lumen */}
              <Connector color={PRODUCTS[4].color} active={currentStep >= 5} />
              <StepCard step={5} visible={currentStep >= 5}>
                <LumenCard />
              </StepCard>
            </>
          )}

          {/* Synthesis card */}
          {phase === 'done' && (
            <>
              <div className="flex flex-col items-center my-2">
                <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, #7B61FF, rgba(123,97,255,0.1))' }} />
              </div>
              <div
                className="max-w-lg w-full mx-auto rounded-2xl p-6 border animate-fadeIn"
                style={{
                  background: 'linear-gradient(135deg, rgba(37,99,235,0.08), rgba(139,92,246,0.10))',
                  borderColor: 'rgba(139,92,246,0.30)',
                  boxShadow: '0 4px 40px rgba(139,92,246,0.15)',
                  animation: 'slideInFromRight 0.6s ease forwards',
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Zap size={18} style={{ color: '#A78BFA' }} />
                  <p className="text-white font-bold text-lg">One signal. Five agents. Zero manual work.</p>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { stat: '<2 min', label: 'Jordan identified' },
                    { stat: 'Before login', label: 'Path adjusted' },
                    { stat: 'Draft ready', label: 'Dr. Chen notified' },
                  ].map(({ stat, label }) => (
                    <div
                      key={label}
                      className="rounded-xl p-3 text-center"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                    >
                      <p className="text-white font-bold text-base" style={{ color: '#A78BFA' }}>{stat}</p>
                      <p className="text-white/40 text-xs mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/forge/discussion"
                    className="flex-1 py-3 rounded-xl font-semibold text-white text-center flex items-center justify-center gap-2 transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #2563EB, #8B5CF6)' }}
                  >
                    Try it with your own student
                    <ArrowRight size={15} />
                  </Link>
                  <button
                    onClick={handleReplay}
                    className="py-3 px-5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-80"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: 'rgba(255,255,255,0.60)',
                    }}
                  >
                    <RotateCcw size={15} />
                    Replay
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Playing state: show a replay/reset button */}
          {phase === 'playing' && (
            <button
              onClick={handleReplay}
              className="mt-8 flex items-center gap-1.5 text-xs text-white/25 hover:text-white/50 transition-colors"
            >
              <RotateCcw size={12} />
              Reset
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideInFromRight {
          from { opacity: 0; transform: translateX(32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </MoltLMSLayout>
  );
}
