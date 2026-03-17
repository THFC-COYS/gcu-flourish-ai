import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft, Loader2, Brain, GitBranch, AlertTriangle, Check,
  ArrowRight, Shield, TrendingUp, RefreshCw, Zap, BookOpen, FileText,
} from 'lucide-react';
import MoltedLayout from './MoltedLayout';

/* ── Constants ─────────────────────────────────────────────────────────── */
const VIOLET = '#8B5CF6';
const VIOLET_DIM = 'rgba(139,92,246,0.12)';
const VIOLET_BORDER = 'rgba(139,92,246,0.22)';

/* ── Types ─────────────────────────────────────────────────────────────── */
type ConceptStatus = 'mastered' | 'solid' | 'shaky' | 'struggling' | 'gap' | 'not_started';

interface Concept {
  concept: string;
  status: ConceptStatus;
  confidence: number;
  change?: string;
  note?: string;
}

interface PathwayResult {
  updatedConcepts: Concept[];
  signalAnalysis: {
    signalType: string;
    depthOfUnderstanding: string;
    keyInsight: string;
    hiddenGap: string;
  };
  pathAdjustment: {
    action: string;
    nextConcept: string;
    skipConcepts: string[];
    insertConcepts: string[];
    reason: string;
  };
  retainAI: {
    riskLevel: string;
    trigger: string;
    action: string;
  };
  forgeSignal: {
    detected: boolean;
    insight: string;
  };
}

/* ── Default student state ─────────────────────────────────────────────── */
const DEFAULT_CONCEPTS: Concept[] = [
  { concept: 'Cell Structure', status: 'mastered', confidence: 95 },
  { concept: 'Mitosis', status: 'solid', confidence: 82 },
  { concept: 'Meiosis', status: 'shaky', confidence: 54 },
  { concept: 'ATP Synthesis', status: 'struggling', confidence: 31 },
  { concept: 'DNA Replication', status: 'gap', confidence: 20 },
  { concept: 'Photosynthesis', status: 'mastered', confidence: 91 },
  { concept: 'Protein Synthesis', status: 'not_started', confidence: 0 },
  { concept: 'Genetics Basics', status: 'not_started', confidence: 0 },
];

const COURSES = ['Biology 201', 'Nursing 340', 'Chemistry 202', 'Pharmacology 310'];

const SIGNAL_PRESETS = [
  {
    label: 'Lumen confusion signal',
    type: 'lumen_confusion',
    icon: BookOpen,
    text: 'Student re-read the Meiosis II section 4 times in 12 minutes. Highlighted 60% of the passage. Asked Lumen: "why does meiosis need two divisions?" — then asked the same question again 3 minutes later in different words.',
  },
  {
    label: 'Forge grading pattern',
    type: 'forge_grade',
    icon: FileText,
    text: 'Forge graded the Week 5 lab report: student scored 72/100. Lost points on "explain the role of ATP in muscle contraction" — wrote a correct but surface-level answer. Previous two assignments showed the same pattern: correct but shallow on energy metabolism concepts.',
  },
  {
    label: 'Study session signal',
    type: 'study_session',
    icon: Brain,
    text: 'Student completed the DNA Replication module in 8 minutes (estimated 25 minutes). Skipped the interactive diagram. Scored 6/10 on the quick check but took 4 minutes on a question that should take 30 seconds.',
  },
];

/* ── Status styles ─────────────────────────────────────────────────────── */
const STATUS_STYLE: Record<ConceptStatus, { color: string; border: string; bg: string; label: string }> = {
  mastered:    { color: VIOLET,      border: VIOLET_BORDER,              bg: VIOLET_DIM,              label: 'Mastered' },
  solid:       { color: '#14B8A6',   border: 'rgba(20,184,166,0.35)',    bg: 'rgba(20,184,166,0.08)', label: 'Solid' },
  shaky:       { color: '#F59E0B',   border: 'rgba(245,158,11,0.35)',    bg: 'rgba(245,158,11,0.08)', label: 'Shaky' },
  struggling:  { color: '#EF4444',   border: 'rgba(239,68,68,0.35)',     bg: 'rgba(239,68,68,0.08)',  label: 'Struggling' },
  gap:         { color: '#F97316',   border: 'rgba(249,115,22,0.35)',    bg: 'rgba(249,115,22,0.08)', label: 'Gap detected' },
  not_started: { color: '#64748B',   border: 'rgba(100,116,139,0.25)',   bg: 'rgba(100,116,139,0.06)',label: 'Not started' },
};

const RISK_STYLE: Record<string, { color: string; border: string; bg: string }> = {
  none:    { color: '#14B8A6',  border: 'rgba(20,184,166,0.30)',  bg: 'rgba(20,184,166,0.08)' },
  watch:   { color: '#F59E0B',  border: 'rgba(245,158,11,0.30)',  bg: 'rgba(245,158,11,0.08)' },
  flag:    { color: '#F97316',  border: 'rgba(249,115,22,0.30)',  bg: 'rgba(249,115,22,0.08)' },
  urgent:  { color: '#EF4444',  border: 'rgba(239,68,68,0.30)',   bg: 'rgba(239,68,68,0.08)'  },
};

const ACTION_STYLE: Record<string, { color: string; label: string }> = {
  accelerate:   { color: VIOLET,     label: 'Accelerate' },
  remediate:    { color: '#EF4444',  label: 'Remediate' },
  reinforce:    { color: '#F59E0B',  label: 'Reinforce' },
  branch:       { color: '#14B8A6',  label: 'Branch path' },
  stay_course:  { color: '#64748B',  label: 'Stay course' },
};

/* ── Knowledge Graph ───────────────────────────────────────────────────── */
function KnowledgeGraph({ concepts }: { concepts: Concept[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {concepts.map((c, i) => {
        const s = STATUS_STYLE[c.status] ?? STATUS_STYLE.not_started;
        return (
          <div key={i} className="rounded-xl border p-3 text-center transition-all" style={{ borderColor: s.border, background: s.bg }}>
            <p className="text-xs font-semibold leading-snug mb-1.5" style={{ color: s.color }}>{c.concept}</p>
            <p className="text-[10px] mb-1.5" style={{ color: s.color, opacity: 0.8 }}>{s.label}</p>
            {c.confidence > 0 && (
              <div className="w-full h-1 rounded-full bg-molted-border overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${c.confidence}%`, background: s.color }} />
              </div>
            )}
            {c.change && c.change !== 'unchanged' && (
              <p className="text-[9px] mt-1 font-semibold uppercase tracking-wide" style={{ color: s.color }}>
                {c.change === 'improved' ? '↑' : c.change === 'declined' ? '↓' : c.change === 'newly_detected' ? '⚡' : ''} {c.change.replace('_', ' ')}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Result Panel ──────────────────────────────────────────────────────── */
function ResultPanel({ result }: { result: PathwayResult }) {
  const riskStyle = RISK_STYLE[result.retainAI.riskLevel] ?? RISK_STYLE.none;
  const actionStyle = ACTION_STYLE[result.pathAdjustment.action] ?? ACTION_STYLE.stay_course;

  return (
    <div className="space-y-5">
      {/* Signal analysis */}
      <div className="rounded-2xl border p-5" style={{ background: VIOLET_DIM, borderColor: VIOLET_BORDER }}>
        <div className="flex items-center gap-2 mb-3">
          <Zap size={14} style={{ color: VIOLET }} />
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: VIOLET }}>Signal analysis</p>
        </div>
        <p className="text-molted-white/90 text-sm leading-relaxed mb-3">{result.signalAnalysis.keyInsight}</p>
        {result.signalAnalysis.hiddenGap && (
          <div className="rounded-xl border p-3 bg-molted-surface/40" style={{ borderColor: 'rgba(249,115,22,0.25)' }}>
            <p className="text-xs font-semibold text-orange-400 mb-1">Hidden gap detected</p>
            <p className="text-xs text-molted-muted leading-relaxed">{result.signalAnalysis.hiddenGap}</p>
          </div>
        )}
        <div className="mt-3 flex items-center gap-3 flex-wrap">
          <span className="text-xs px-2 py-1 rounded-md bg-molted-border/30 text-molted-muted">
            {result.signalAnalysis.signalType.replace(/_/g, ' ')}
          </span>
          <span className="text-xs px-2 py-1 rounded-md bg-molted-border/30 text-molted-muted">
            depth: {result.signalAnalysis.depthOfUnderstanding}
          </span>
        </div>
      </div>

      {/* Updated knowledge graph */}
      <div className="rounded-2xl border border-molted-border bg-molted-elevated p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-molted-muted mb-4">Updated knowledge map</p>
        <KnowledgeGraph concepts={result.updatedConcepts} />
      </div>

      {/* Path adjustment */}
      <div className="rounded-2xl border border-molted-border bg-molted-elevated p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <GitBranch size={14} style={{ color: VIOLET }} />
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: VIOLET }}>Path adjustment</p>
          </div>
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ color: actionStyle.color, background: `${actionStyle.color}18`, border: `1px solid ${actionStyle.color}30` }}
          >
            {actionStyle.label}
          </span>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-start gap-2.5">
            <ArrowRight size={13} style={{ color: VIOLET }} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-molted-muted font-semibold uppercase tracking-wide mb-0.5">Next concept</p>
              <p className="text-sm text-molted-white font-semibold">{result.pathAdjustment.nextConcept}</p>
            </div>
          </div>

          {result.pathAdjustment.insertConcepts.length > 0 && (
            <div className="flex items-start gap-2.5">
              <AlertTriangle size={13} className="text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-molted-muted font-semibold uppercase tracking-wide mb-1">Inserted first</p>
                <div className="flex flex-wrap gap-1.5">
                  {result.pathAdjustment.insertConcepts.map((c, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded-md bg-orange-400/10 text-orange-400 border border-orange-400/20">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {result.pathAdjustment.skipConcepts.length > 0 && (
            <div className="flex items-start gap-2.5">
              <Check size={13} style={{ color: VIOLET }} className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-molted-muted font-semibold uppercase tracking-wide mb-1">Skipped (already mastered)</p>
                <div className="flex flex-wrap gap-1.5">
                  {result.pathAdjustment.skipConcepts.map((c, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded-md text-molted-muted bg-molted-border/20 border border-molted-border">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <p className="text-sm text-molted-muted leading-relaxed border-t border-molted-border pt-4">{result.pathAdjustment.reason}</p>
      </div>

      {/* RetainAI + Forge row */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border p-4" style={{ borderColor: riskStyle.border, background: riskStyle.bg }}>
          <div className="flex items-center gap-2 mb-2">
            <Shield size={13} style={{ color: riskStyle.color }} />
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: riskStyle.color }}>
              RetainAI · {result.retainAI.riskLevel === 'none' ? 'No risk' : result.retainAI.riskLevel.charAt(0).toUpperCase() + result.retainAI.riskLevel.slice(1)}
            </p>
          </div>
          {result.retainAI.trigger ? (
            <p className="text-xs text-molted-muted leading-relaxed">{result.retainAI.trigger}</p>
          ) : (
            <p className="text-xs text-molted-muted">Student is on track. No intervention needed.</p>
          )}
          {result.retainAI.action && (
            <p className="text-xs mt-2 font-semibold" style={{ color: riskStyle.color }}>{result.retainAI.action}</p>
          )}
        </div>

        <div
          className="rounded-2xl border p-4"
          style={{
            borderColor: result.forgeSignal.detected ? 'rgba(245,158,11,0.30)' : 'rgba(100,116,139,0.20)',
            background: result.forgeSignal.detected ? 'rgba(245,158,11,0.06)' : 'rgba(100,116,139,0.05)',
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={13} className={result.forgeSignal.detected ? 'text-amber-400' : 'text-molted-subtle'} />
            <p className="text-xs font-semibold uppercase tracking-wide text-molted-muted">Forge Signal</p>
          </div>
          <p className="text-xs text-molted-muted leading-relaxed">
            {result.forgeSignal.detected ? result.forgeSignal.insight : 'No grading patterns flagged yet for this concept set.'}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Main demo ─────────────────────────────────────────────────────────── */
export default function PathwayDemo() {
  const [concepts, setConcepts] = useState<Concept[]>(DEFAULT_CONCEPTS);
  const [course, setCourse] = useState(COURSES[0]);
  const [studentName] = useState('Jordan M.');
  const [signal, setSignal] = useState('');
  const [signalType, setSignalType] = useState('lumen_confusion');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PathwayResult | null>(null);
  const [error, setError] = useState('');

  const handlePreset = (preset: typeof SIGNAL_PRESETS[0]) => {
    setSignal(preset.text);
    setSignalType(preset.type);
  };

  const handleSubmit = async () => {
    if (!signal.trim() || loading) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/pathway-adapt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentName, course, concepts, newSignal: signal, signalType }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');
      setResult(data);
      if (data.updatedConcepts?.length > 0) setConcepts(data.updatedConcepts);
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MoltedLayout>
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-molted-border bg-molted-surface/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/pathway-ai" className="flex items-center gap-1.5 text-molted-muted hover:text-molted-white transition-colors text-sm">
              <ChevronLeft size={16} />
              PathwayAI
            </Link>
            <div className="w-px h-4 bg-molted-border" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: VIOLET_DIM, border: `1px solid ${VIOLET_BORDER}` }}>
                <Brain size={12} style={{ color: VIOLET }} />
              </div>
              <span className="text-molted-white font-bold text-sm">Adaptive Engine Demo</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border" style={{ borderColor: VIOLET_BORDER, background: VIOLET_DIM }}>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: VIOLET }} />
            <span className="text-xs font-semibold" style={{ color: VIOLET }}>Live AI</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        {/* Student header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-molted-white">Jordan M.</h1>
            <div className="flex items-center gap-3 mt-1">
              <select
                value={course}
                onChange={e => setCourse(e.target.value)}
                className="text-sm text-molted-muted bg-transparent border-none focus:outline-none cursor-pointer"
              >
                {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <span className="text-molted-border">·</span>
              <span className="text-xs text-molted-muted">Week 6 of 16</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw
              size={14}
              className="text-molted-muted cursor-pointer hover:text-molted-white transition-colors"
              onClick={() => { setConcepts(DEFAULT_CONCEPTS); setResult(null); }}
            />
            <span className="text-xs text-molted-muted">Reset map</span>
          </div>
        </div>

        {/* Current knowledge graph */}
        <div className="bg-molted-elevated border border-molted-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-molted-white font-bold text-sm">Current Knowledge Map</p>
            <span className="text-xs text-molted-muted">{concepts.filter(c => c.status === 'mastered' || c.status === 'solid').length}/{concepts.length} solid or mastered</span>
          </div>
          <KnowledgeGraph concepts={concepts} />
        </div>

        {/* Signal input */}
        <div className="bg-molted-elevated border border-molted-border rounded-2xl p-6 space-y-5">
          <div>
            <p className="text-molted-white font-bold text-sm mb-1">Send a learning signal</p>
            <p className="text-molted-muted text-xs">Describe what the student just did — Pathway will analyze it and re-sequence the path.</p>
          </div>

          {/* Presets */}
          <div>
            <p className="text-molted-muted text-xs font-semibold uppercase tracking-wide mb-2">Quick presets</p>
            <div className="grid sm:grid-cols-3 gap-2">
              {SIGNAL_PRESETS.map((preset, i) => (
                <button
                  key={i}
                  onClick={() => handlePreset(preset)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl border text-left transition-all hover:-translate-y-px"
                  style={{
                    borderColor: signal === preset.text ? VIOLET_BORDER : 'rgba(100,116,139,0.20)',
                    background: signal === preset.text ? VIOLET_DIM : 'rgba(100,116,139,0.05)',
                  }}
                >
                  <preset.icon size={13} style={{ color: signal === preset.text ? VIOLET : '#64748B', flexShrink: 0 }} />
                  <span className="text-xs font-medium" style={{ color: signal === preset.text ? VIOLET : '#94A3B8' }}>{preset.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom signal */}
          <div>
            <p className="text-molted-muted text-xs font-semibold uppercase tracking-wide mb-2">Or describe the signal</p>
            <textarea
              value={signal}
              onChange={e => setSignal(e.target.value)}
              placeholder="e.g. Student spent 18 minutes on the ATP synthesis section and asked Lumen 'why does the cell need ATP if glucose has energy?'"
              rows={4}
              className="w-full rounded-xl border text-sm text-molted-white p-4 focus:outline-none resize-none transition-colors"
              style={{
                background: 'rgba(10,10,11,0.6)',
                borderColor: signal.trim().length > 10 ? VIOLET_BORDER : 'rgba(100,116,139,0.25)',
                color: '#E5E7EB',
              }}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!signal.trim() || loading}
            className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold text-sm transition-all hover:-translate-y-px disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
            style={{ background: VIOLET, color: '#0A0A0B', boxShadow: `0 0 24px rgba(139,92,246,0.30)` }}
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Brain size={16} />}
            {loading ? 'Pathway is analyzing…' : 'Run Pathway Adaptive Engine'}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/08 p-4 flex gap-3">
            <AlertTriangle size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Result */}
        {result && <ResultPanel result={result} />}

        {/* Footer nav */}
        <div className="pt-4 border-t border-molted-border flex items-center justify-between text-sm">
          <Link to="/pathway-ai" className="text-molted-muted hover:text-molted-white transition-colors">
            ← Back to PathwayAI
          </Link>
          <Link to="/lumen/demo" className="text-molted-muted hover:text-molted-white transition-colors">
            Try Lumen Demo →
          </Link>
        </div>
      </div>
    </MoltedLayout>
  );
}
