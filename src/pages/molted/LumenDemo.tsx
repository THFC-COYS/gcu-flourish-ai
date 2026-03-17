import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft, Loader2, BookOpen, MessageSquare, RefreshCw, Link2,
  AlertTriangle, Check, ArrowRight, Zap,
} from 'lucide-react';
import MoltedLayout from './MoltedLayout';

/* ── Constants ─────────────────────────────────────────────────────────── */
const VIOLET = '#7B61FF';
const VIOLET_DIM = 'rgba(123,97,255,0.10)';
const VIOLET_BORDER = 'rgba(123,97,255,0.25)';

/* ── Sample passages ───────────────────────────────────────────────────── */
const SAMPLE_PASSAGES = [
  {
    label: 'Nursing · Cardiac Output',
    course: 'NURS 340',
    text: `Cardiac output (CO) is defined as the volume of blood ejected by the heart per minute and is the product of heart rate (HR) and stroke volume (SV): CO = HR × SV. Normal CO in adults ranges from 4 to 8 L/min at rest.

Stroke volume is influenced by three primary factors: preload, afterload, and contractility. Preload refers to the end-diastolic volume — the degree of ventricular stretch before contraction. According to the Frank-Starling mechanism, increased preload within physiological limits leads to more forceful ventricular contraction and higher stroke volume.

Afterload represents the resistance the ventricle must overcome to eject blood — primarily determined by systemic vascular resistance (SVR) and aortic valve competence. Elevated afterload (as seen in hypertension) reduces stroke volume and can precipitate heart failure if sustained.

Contractility is the intrinsic ability of cardiac muscle to generate force independent of preload and afterload. It is modulated by the autonomic nervous system: sympathetic stimulation increases contractility via beta-1 adrenergic receptor activation, while parasympathetic tone decreases it.`,
  },
  {
    label: 'Pharmacology · First-Pass Metabolism',
    course: 'PHARM 310',
    text: `First-pass metabolism (also called presystemic metabolism) refers to the phenomenon in which a drug is substantially metabolized before reaching systemic circulation. When a drug is administered orally, it is absorbed through the gastrointestinal tract and transported via the portal vein directly to the liver — where it may undergo significant metabolic transformation before entering the bloodstream.

The primary enzymes responsible for hepatic first-pass metabolism are the cytochrome P450 (CYP450) superfamily, particularly CYP3A4, which metabolizes approximately 50% of clinically used drugs. The gut wall also contains CYP3A4 and contributes to presystemic extraction.

The clinical consequence of extensive first-pass metabolism is reduced oral bioavailability. For example, morphine has an oral bioavailability of approximately 25–33% due to significant first-pass effect, requiring oral doses 3× higher than parenteral doses to achieve equivalent analgesia. Nitroglycerin undergoes near-complete hepatic first-pass extraction, making sublingual or transdermal administration essential.

Factors affecting first-pass metabolism include hepatic blood flow, enzyme induction or inhibition (e.g., rifampin induces CYP3A4; grapefruit juice inhibits it), hepatic disease, and genetic polymorphisms in CYP450 enzymes.`,
  },
  {
    label: 'Biology · DNA Replication',
    course: 'BIO 202',
    text: `DNA replication is the process by which a cell duplicates its DNA prior to cell division, ensuring each daughter cell receives a complete copy of the genetic information. Replication is semi-conservative: each new double helix consists of one original (template) strand and one newly synthesized strand.

Replication begins at specific sites called origins of replication. In prokaryotes, there is typically a single origin; in eukaryotes, thousands of origins fire simultaneously to replicate the large genome within the time constraints of the cell cycle.

The key enzyme is DNA polymerase, which synthesizes new DNA by adding deoxyribonucleotides in the 5'→3' direction, using the existing strand as a template. Because both strands are antiparallel, one strand (the leading strand) is synthesized continuously, while the other (the lagging strand) is synthesized in discontinuous segments called Okazaki fragments, later joined by DNA ligase.

Other essential proteins include: helicase (unwinds the double helix at the replication fork), primase (synthesizes short RNA primers to initiate synthesis), single-strand binding proteins (stabilize unwound DNA), and topoisomerase (relieves torsional strain ahead of the fork).`,
  },
];

/* ── Mode tabs ─────────────────────────────────────────────────────────── */
type Mode = 'qa' | 'explain3ways' | 'spacedRep' | 'crossCourse';

const MODES: { id: Mode; label: string; icon: typeof BookOpen; description: string }[] = [
  { id: 'qa',           label: 'Q&A',            icon: MessageSquare, description: 'Ask anything about the passage' },
  { id: 'explain3ways', label: 'Explain 3 Ways',  icon: Zap,           description: 'Visual · Narrative · Analogy' },
  { id: 'spacedRep',    label: 'Spaced Review',   icon: RefreshCw,     description: 'Surface concepts to review now' },
  { id: 'crossCourse',  label: 'Cross-Course',    icon: Link2,         description: 'Connect to what you learned before' },
];

/* ── Result renderers ──────────────────────────────────────────────────── */
function QAResult({ data }: { data: any }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border p-5" style={{ background: VIOLET_DIM, borderColor: VIOLET_BORDER }}>
        <p className="text-molted-muted text-xs font-semibold uppercase tracking-wider mb-3">Lumen answers</p>
        <p className="text-molted-white/90 text-sm leading-relaxed whitespace-pre-line">{data.answer}</p>
      </div>
      <div className="rounded-xl border border-molted-border bg-molted-elevated p-4">
        <p className="text-xs font-semibold text-molted-muted uppercase tracking-wide mb-1">Key takeaway</p>
        <p className="text-sm text-molted-white">{data.keyTakeaway}</p>
      </div>
      {data.followUpQuestions?.length > 0 && (
        <div className="rounded-xl border border-molted-border bg-molted-elevated p-4">
          <p className="text-xs font-semibold text-molted-muted uppercase tracking-wide mb-3">Go deeper</p>
          <div className="space-y-2">
            {data.followUpQuestions.map((q: string, i: number) => (
              <div key={i} className="flex items-start gap-2 text-sm text-molted-muted">
                <ArrowRight size={12} style={{ color: VIOLET }} className="flex-shrink-0 mt-0.5" />
                {q}
              </div>
            ))}
          </div>
        </div>
      )}
      {data.relatedConcepts?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {data.relatedConcepts.map((c: string, i: number) => (
            <span key={i} className="text-xs px-2.5 py-1 rounded-full border" style={{ color: VIOLET, borderColor: VIOLET_BORDER, background: VIOLET_DIM }}>{c}</span>
          ))}
        </div>
      )}
    </div>
  );
}

function Explain3WaysResult({ data }: { data: any }) {
  const modes = [
    { key: 'visual',    color: '#14B8A6', border: 'rgba(20,184,166,0.30)',  bg: 'rgba(20,184,166,0.08)' },
    { key: 'narrative', color: VIOLET,    border: VIOLET_BORDER,            bg: VIOLET_DIM },
    { key: 'analogy',   color: '#F59E0B', border: 'rgba(245,158,11,0.30)',  bg: 'rgba(245,158,11,0.08)' },
  ];
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-molted-border bg-molted-elevated p-4 text-center">
        <p className="text-xs text-molted-muted font-semibold uppercase tracking-wide mb-1">Concept</p>
        <p className="text-molted-white font-black text-lg">{data.concept}</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {modes.map(m => {
          const modeData = data[m.key];
          if (!modeData) return null;
          return (
            <div key={m.key} className="rounded-2xl border p-5 flex flex-col" style={{ borderColor: m.border, background: m.bg }}>
              <p className="font-black text-base mb-3" style={{ color: m.color }}>{modeData.label}</p>
              <p className="text-molted-muted text-sm leading-relaxed flex-1">{modeData.explanation}</p>
            </div>
          );
        })}
      </div>
      {data.bestFor && (
        <div className="rounded-xl border border-molted-border bg-molted-elevated p-4">
          <p className="text-xs font-semibold text-molted-muted uppercase tracking-wide mb-1">Best for</p>
          <p className="text-sm text-molted-white/80">{data.bestFor}</p>
        </div>
      )}
    </div>
  );
}

function SpacedRepResult({ data }: { data: any }) {
  const strengthColors: Record<string, { color: string; border: string; bg: string }> = {
    strong:  { color: '#14B8A6', border: 'rgba(20,184,166,0.30)',  bg: 'rgba(20,184,166,0.08)' },
    fading:  { color: '#F59E0B', border: 'rgba(245,158,11,0.30)',  bg: 'rgba(245,158,11,0.08)' },
    weak:    { color: '#EF4444', border: 'rgba(239,68,68,0.30)',   bg: 'rgba(239,68,68,0.08)'  },
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-molted-border bg-molted-elevated p-4">
        <p className="text-xs text-molted-muted font-semibold uppercase tracking-wide mb-1">Currently reading about</p>
        <p className="text-molted-white text-sm font-semibold">{data.currentTopic}</p>
      </div>
      <div className="space-y-3">
        {data.reviewConcepts?.map((c: any, i: number) => {
          const s = strengthColors[c.strength] ?? strengthColors.fading;
          const [showAnswer, setShowAnswer] = useState(false);
          return (
            <div key={i} className="rounded-2xl border bg-molted-elevated p-5" style={{ borderColor: s.border }}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="text-molted-white font-bold text-sm">{c.concept}</p>
                  <p className="text-molted-muted text-xs mt-0.5">{c.course} · {c.weeksAgo} weeks ago</p>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0" style={{ color: s.color, background: s.bg, border: `1px solid ${s.border}` }}>
                  {c.strength}
                </span>
              </div>
              <p className="text-molted-muted text-sm leading-relaxed mb-4">{c.connectionToCurrentReading}</p>
              <div className="rounded-xl border p-3" style={{ borderColor: VIOLET_BORDER, background: VIOLET_DIM }}>
                <p className="text-xs font-semibold mb-2" style={{ color: VIOLET }}>Quick review</p>
                <p className="text-sm text-molted-white/90 mb-3">{c.reviewQuestion}</p>
                <button
                  onClick={() => setShowAnswer(a => !a)}
                  className="text-xs font-semibold transition-colors"
                  style={{ color: VIOLET }}
                >
                  {showAnswer ? 'Hide answer ↑' : 'Show answer ↓'}
                </button>
                {showAnswer && (
                  <p className="text-sm text-molted-muted leading-relaxed mt-2 pt-2 border-t" style={{ borderColor: VIOLET_BORDER }}>
                    {c.reviewAnswer}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {data.priorityReview && (
        <div className="rounded-xl border p-4" style={{ borderColor: VIOLET_BORDER, background: VIOLET_DIM }}>
          <p className="text-xs font-semibold mb-1" style={{ color: VIOLET }}>Priority</p>
          <p className="text-sm text-molted-white/90">{data.priorityReview}</p>
        </div>
      )}
    </div>
  );
}

function CrossCourseResult({ data }: { data: any }) {
  const strengthColor: Record<string, string> = {
    direct: VIOLET,
    supporting: '#14B8A6',
    foundational: '#F59E0B',
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-molted-border bg-molted-elevated p-4 flex items-center gap-4">
        <div>
          <p className="text-xs text-molted-muted font-semibold uppercase tracking-wide">Currently in</p>
          <p className="text-molted-white text-sm font-bold">{data.currentCourse} · {data.currentConcept}</p>
        </div>
      </div>
      <div className="space-y-3">
        {data.connections?.map((conn: any, i: number) => {
          const color = strengthColor[conn.connectionStrength] ?? VIOLET;
          return (
            <div key={i} className="rounded-2xl border bg-molted-elevated p-5 hover:border-molted-violet/30 transition-all" style={{ borderColor: 'rgba(100,116,139,0.20)' }}>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-molted-surface border border-molted-border">
                  <p className="text-xs font-semibold text-molted-muted">{conn.priorCourse}</p>
                  <span className="text-molted-subtle">·</span>
                  <p className="text-xs text-molted-white">{conn.priorConcept}</p>
                </div>
                <ArrowRight size={13} style={{ color }} />
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ color, background: `${color}18`, border: `1px solid ${color}30` }}>
                  {conn.connectionStrength}
                </span>
              </div>
              <p className="text-molted-muted text-sm leading-relaxed mb-3">{conn.insight}</p>
              <div className="rounded-xl border p-3 italic" style={{ borderColor: VIOLET_BORDER, background: VIOLET_DIM }}>
                <p className="text-sm" style={{ color: VIOLET }}>{conn.bridgingStatement}</p>
              </div>
            </div>
          );
        })}
      </div>
      {data.recommendation && (
        <div className="rounded-xl border p-4" style={{ borderColor: VIOLET_BORDER, background: VIOLET_DIM }}>
          <div className="flex items-start gap-2">
            <Check size={13} style={{ color: VIOLET }} className="flex-shrink-0 mt-0.5" />
            <p className="text-sm text-molted-white/90">{data.recommendation}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main demo ─────────────────────────────────────────────────────────── */
export default function LumenDemo() {
  const [activeMode, setActiveMode] = useState<Mode>('qa');
  const [passageIdx, setPassageIdx] = useState(0);
  const [customPassage, setCustomPassage] = useState('');
  const [question, setQuestion] = useState('');
  const [concept, setConcept] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const passage = customPassage || SAMPLE_PASSAGES[passageIdx].text;
  const currentCourse = SAMPLE_PASSAGES[passageIdx].course;

  const handleRun = async () => {
    if (loading) return;
    if (activeMode === 'qa' && !question.trim()) return;
    if (activeMode === 'explain3ways' && !concept.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const body: Record<string, string> = { mode: activeMode, passage };
      if (activeMode === 'qa') body.question = question;
      if (activeMode === 'explain3ways') body.concept = concept;
      if (activeMode === 'crossCourse') body.concept = currentCourse;

      const res = await fetch('/api/lumen-companion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');
      setResult(data);
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const canRun = () => {
    if (loading) return false;
    if (activeMode === 'qa') return question.trim().length > 2;
    if (activeMode === 'explain3ways') return concept.trim().length > 2;
    return true; // spacedRep and crossCourse just need the passage
  };

  return (
    <MoltedLayout>
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-molted-border bg-molted-surface/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/lumen" className="flex items-center gap-1.5 text-molted-muted hover:text-molted-white transition-colors text-sm">
              <ChevronLeft size={16} />
              Lumen
            </Link>
            <div className="w-px h-4 bg-molted-border" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center bg-molted-violet/10 border border-molted-violet/20">
                <BookOpen size={12} className="text-molted-violet" />
              </div>
              <span className="text-molted-white font-bold text-sm">Learning Companion Demo</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-molted-violet/30 bg-molted-violet/10">
            <div className="w-2 h-2 rounded-full bg-molted-violet animate-pulse" />
            <span className="text-xs font-semibold text-molted-violet">Live AI</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: passage + controls */}
          <div className="space-y-5">
            {/* Passage selector */}
            <div className="bg-molted-elevated border border-molted-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-molted-white font-bold text-sm">Reading</p>
                <div className="flex gap-1">
                  {SAMPLE_PASSAGES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setPassageIdx(i); setCustomPassage(''); setResult(null); }}
                      className="text-xs px-2.5 py-1 rounded-lg border transition-all"
                      style={{
                        borderColor: passageIdx === i && !customPassage ? VIOLET_BORDER : 'rgba(100,116,139,0.20)',
                        background: passageIdx === i && !customPassage ? VIOLET_DIM : 'transparent',
                        color: passageIdx === i && !customPassage ? VIOLET : '#94A3B8',
                      }}
                    >
                      {SAMPLE_PASSAGES[i].label.split(' · ')[0]}
                    </button>
                  ))}
                </div>
              </div>
              {!customPassage && (
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-md border border-molted-border text-molted-muted">{SAMPLE_PASSAGES[passageIdx].course}</span>
                  <span className="text-xs text-molted-muted">{SAMPLE_PASSAGES[passageIdx].label.split(' · ')[1]}</span>
                </div>
              )}
              <textarea
                value={customPassage || passage}
                onChange={e => { setCustomPassage(e.target.value); setResult(null); }}
                rows={12}
                className="w-full rounded-xl border text-xs text-molted-muted/90 p-4 focus:outline-none resize-none leading-relaxed"
                style={{
                  background: 'rgba(10,10,11,0.5)',
                  borderColor: customPassage ? VIOLET_BORDER : 'rgba(100,116,139,0.18)',
                }}
              />
              {customPassage && (
                <button
                  onClick={() => { setCustomPassage(''); setResult(null); }}
                  className="mt-2 text-xs text-molted-muted hover:text-molted-white transition-colors"
                >
                  ← Use sample passage
                </button>
              )}
            </div>

            {/* Mode tabs */}
            <div className="grid grid-cols-2 gap-2">
              {MODES.map(m => (
                <button
                  key={m.id}
                  onClick={() => { setActiveMode(m.id); setResult(null); }}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl border text-left transition-all"
                  style={{
                    borderColor: activeMode === m.id ? VIOLET_BORDER : 'rgba(100,116,139,0.20)',
                    background: activeMode === m.id ? VIOLET_DIM : 'transparent',
                  }}
                >
                  <m.icon size={14} style={{ color: activeMode === m.id ? VIOLET : '#64748B', flexShrink: 0 }} />
                  <div>
                    <p className="text-xs font-bold" style={{ color: activeMode === m.id ? VIOLET : '#94A3B8' }}>{m.label}</p>
                    <p className="text-[10px] text-molted-subtle">{m.description}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Mode-specific inputs */}
            {activeMode === 'qa' && (
              <div>
                <label className="block text-molted-muted text-xs font-semibold uppercase tracking-wide mb-2">Your question</label>
                <textarea
                  value={question}
                  onChange={e => { setQuestion(e.target.value); setResult(null); }}
                  placeholder="e.g. Why does increased afterload reduce stroke volume? What's the clinical implication in hypertension?"
                  rows={3}
                  className="w-full rounded-xl border text-sm text-molted-white p-4 focus:outline-none resize-none"
                  style={{
                    background: 'rgba(10,10,11,0.6)',
                    borderColor: question.trim() ? VIOLET_BORDER : 'rgba(100,116,139,0.20)',
                  }}
                />
              </div>
            )}

            {activeMode === 'explain3ways' && (
              <div>
                <label className="block text-molted-muted text-xs font-semibold uppercase tracking-wide mb-2">Concept to explain</label>
                <input
                  type="text"
                  value={concept}
                  onChange={e => { setConcept(e.target.value); setResult(null); }}
                  placeholder="e.g. Frank-Starling mechanism, first-pass metabolism, DNA replication fork"
                  className="w-full rounded-xl border text-sm text-molted-white p-4 focus:outline-none"
                  style={{
                    background: 'rgba(10,10,11,0.6)',
                    borderColor: concept.trim() ? VIOLET_BORDER : 'rgba(100,116,139,0.20)',
                  }}
                />
                <p className="text-molted-subtle text-xs mt-1.5">Type any concept — from the passage or from your course</p>
              </div>
            )}

            {(activeMode === 'spacedRep' || activeMode === 'crossCourse') && (
              <div
                className="rounded-xl border p-4"
                style={{ borderColor: VIOLET_BORDER, background: VIOLET_DIM }}
              >
                <p className="text-xs font-semibold mb-1" style={{ color: VIOLET }}>
                  {activeMode === 'spacedRep' ? 'Spaced Repetition' : 'Cross-Course Intelligence'}
                </p>
                <p className="text-xs text-molted-muted">
                  {activeMode === 'spacedRep'
                    ? 'Lumen will analyze the passage and surface concepts from earlier courses that need review right now — with targeted review questions.'
                    : 'Lumen will identify what you learned in prior courses that directly applies to this reading — and make those connections explicit.'}
                </p>
              </div>
            )}

            <button
              onClick={handleRun}
              disabled={!canRun()}
              className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold text-sm transition-all hover:-translate-y-px disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
              style={{ background: VIOLET, color: '#0A0A0B', boxShadow: `0 0 24px rgba(123,97,255,0.30)` }}
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <BookOpen size={16} />}
              {loading ? 'Lumen is thinking…' : `Run ${MODES.find(m => m.id === activeMode)?.label}`}
            </button>
          </div>

          {/* Right: result */}
          <div className="space-y-4">
            {!result && !loading && !error && (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 px-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-molted-violet/10 border border-molted-violet/20">
                  <BookOpen size={24} className="text-molted-violet" />
                </div>
                <p className="text-molted-white font-bold text-lg mb-2">Lumen is watching.</p>
                <p className="text-molted-muted text-sm max-w-xs leading-relaxed">
                  Choose a mode, fill in the input, and hit Run. Lumen responds to what you're reading — not the internet.
                </p>
              </div>
            )}

            {loading && (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <Loader2 size={28} className="animate-spin mb-4" style={{ color: VIOLET }} />
                <p className="text-molted-muted text-sm">Lumen is thinking…</p>
              </div>
            )}

            {error && (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/08 p-5 flex gap-3">
                <AlertTriangle size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {result && !loading && (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-molted-violet" />
                  <p className="text-xs text-molted-muted font-semibold uppercase tracking-wide">
                    {MODES.find(m => m.id === activeMode)?.label} · Lumen response
                  </p>
                </div>
                {activeMode === 'qa'           && <QAResult data={result} />}
                {activeMode === 'explain3ways' && <Explain3WaysResult data={result} />}
                {activeMode === 'spacedRep'    && <SpacedRepResult data={result} />}
                {activeMode === 'crossCourse'  && <CrossCourseResult data={result} />}
              </>
            )}
          </div>
        </div>

        {/* Footer nav */}
        <div className="mt-10 pt-6 border-t border-molted-border flex items-center justify-between text-sm">
          <Link to="/lumen" className="text-molted-muted hover:text-molted-white transition-colors">
            ← Back to Lumen
          </Link>
          <Link to="/pathway-ai/demo" className="text-molted-muted hover:text-molted-white transition-colors">
            Try PathwayAI Demo →
          </Link>
        </div>
      </div>
    </MoltedLayout>
  );
}
