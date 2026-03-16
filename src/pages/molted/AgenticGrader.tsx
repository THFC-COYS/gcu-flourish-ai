import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft, Loader2, Copy, Check, CheckSquare,
  AlertTriangle, ArrowRight, Shield, ThumbsUp, TrendingUp,
  ChevronDown, ChevronUp,
} from 'lucide-react';
import MoltedLayout from './MoltedLayout';

/* ── Constants ─────────────────────────────────────────────────────────── */
const TEAL = '#2563EB';
const TEAL_DIM = 'rgba(37,99,235,0.12)';
const TEAL_BORDER = 'rgba(37,99,235,0.25)';
const GOLD = '#64748B';
const RED = '#1E3A8A';

/* ── Types ─────────────────────────────────────────────────────────────── */
interface Criterion {
  name: string;
  score: number;
  possible: number;
  feedback: string;
  quote: string;
}

interface GradeResult {
  totalScore: number;
  totalPossible: number;
  letterGrade: string;
  summary: string;
  criteria: Criterion[];
  strengths: string[];
  improvements: string[];
  integrityFlag: boolean;
  integrityNote: string;
}

/* ── Helpers ───────────────────────────────────────────────────────────── */
function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1800); }}
      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
      style={{
        background: copied ? TEAL_DIM : 'rgba(255,255,255,0.06)',
        color: copied ? TEAL : '#86868B',
        border: `1px solid ${copied ? TEAL_BORDER : 'rgba(255,255,255,0.08)'}`,
      }}
    >
      {copied ? <Check size={11} /> : <Copy size={11} />}
      {copied ? 'Copied' : label}
    </button>
  );
}

function scoreColor(score: number, possible: number) {
  const pct = score / possible;
  if (pct >= 0.9) return TEAL;
  if (pct >= 0.75) return GOLD;
  return RED;
}

function letterColor(grade: string) {
  if (grade.startsWith('A')) return TEAL;
  if (grade.startsWith('B')) return GOLD;
  return RED;
}

/* ── Criterion card ────────────────────────────────────────────────────── */
function CriterionCard({ c, index }: { c: Criterion; index: number }) {
  const [open, setOpen] = useState(true);
  const pct = Math.round((c.score / c.possible) * 100);
  const color = scoreColor(c.score, c.possible);

  return (
    <div
      className="rounded-2xl border transition-all"
      style={{ background: 'rgba(17,17,24,0.8)', borderColor: 'rgba(255,255,255,0.07)' }}
    >
      <button
        className="w-full flex items-center gap-4 p-4 text-left"
        onClick={() => setOpen(o => !o)}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0"
          style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}
        >
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-molted-white text-sm font-bold truncate">{c.name}</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 h-1 rounded-full bg-molted-border overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
            </div>
            <span className="text-xs font-bold flex-shrink-0" style={{ color }}>{c.score}/{c.possible}</span>
          </div>
        </div>
        {open ? <ChevronUp size={14} className="text-molted-muted flex-shrink-0" /> : <ChevronDown size={14} className="text-molted-muted flex-shrink-0" />}
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-3">
          <p className="text-sm text-molted-white/80 leading-relaxed">{c.feedback}</p>
          {c.quote && (
            <div
              className="rounded-xl p-3 text-xs text-molted-muted leading-relaxed italic border-l-2"
              style={{ background: 'rgba(0,0,0,0.3)', borderLeftColor: color }}
            >
              "{c.quote}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Result view ───────────────────────────────────────────────────────── */
function GradeView({ result, assignmentTitle }: { result: GradeResult; assignmentTitle: string }) {
  const pct = Math.round((result.totalScore / result.totalPossible) * 100);
  const lColor = letterColor(result.letterGrade);

  const fullFeedback = [
    assignmentTitle ? `Assignment: ${assignmentTitle}` : '',
    `Score: ${result.totalScore}/${result.totalPossible} (${pct}%) — ${result.letterGrade}`,
    '',
    result.summary,
    '',
    '── Criteria ──',
    ...result.criteria.map(c =>
      `${c.name}: ${c.score}/${c.possible}\n${c.feedback}${c.quote ? `\n"${c.quote}"` : ''}`
    ),
    '',
    '── Strengths ──',
    ...result.strengths.map(s => `• ${s}`),
    '',
    '── Areas for Improvement ──',
    ...result.improvements.map(i => `• ${i}`),
    result.integrityFlag ? `\n⚠ Academic Integrity Note: ${result.integrityNote}` : '',
  ].filter(Boolean).join('\n');

  return (
    <div className="space-y-5">
      {/* Score header */}
      <div
        className="rounded-2xl border p-6"
        style={{ background: TEAL_DIM, borderColor: TEAL_BORDER }}
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-molted-muted text-xs font-semibold uppercase tracking-wide mb-1">
              {assignmentTitle || 'Graded Submission'}
            </p>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-black" style={{ color: lColor }}>{result.letterGrade}</span>
              <div>
                <p className="text-molted-white text-xl font-black">
                  {result.totalScore}<span className="text-molted-muted font-medium text-base">/{result.totalPossible}</span>
                </p>
                <p className="text-molted-muted text-sm">{pct}%</p>
              </div>
            </div>
          </div>
          <CopyButton text={fullFeedback} label="Copy all feedback" />
        </div>
        <p className="mt-4 text-molted-white/80 text-sm leading-relaxed">{result.summary}</p>
      </div>

      {/* Integrity flag */}
      {result.integrityFlag && (
        <div
          className="rounded-2xl border p-4 flex gap-3"
          style={{ background: 'rgba(30,58,138,0.08)', borderColor: 'rgba(30,58,138,0.2)' }}
        >
          <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" style={{ color: RED }} />
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: RED }}>Academic Integrity Flag</p>
            <p className="text-molted-muted text-sm leading-relaxed">{result.integrityNote}</p>
          </div>
        </div>
      )}

      {/* Criteria */}
      <div>
        <p className="text-molted-muted text-xs font-semibold uppercase tracking-wide mb-3">Rubric breakdown</p>
        <div className="space-y-3">
          {result.criteria.map((c, i) => <CriterionCard key={i} c={c} index={i} />)}
        </div>
      </div>

      {/* Strengths + Improvements */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div
          className="rounded-2xl border p-4"
          style={{ background: 'rgba(17,17,24,0.8)', borderColor: 'rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <ThumbsUp size={13} style={{ color: TEAL }} />
            <p className="text-xs font-semibold text-molted-muted uppercase tracking-wide">Strengths</p>
          </div>
          <ul className="space-y-2">
            {result.strengths.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm text-molted-white/80">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: TEAL }} />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div
          className="rounded-2xl border p-4"
          style={{ background: 'rgba(17,17,24,0.8)', borderColor: 'rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={13} style={{ color: GOLD }} />
            <p className="text-xs font-semibold text-molted-muted uppercase tracking-wide">Improve</p>
          </div>
          <ul className="space-y-2">
            {result.improvements.map((imp, i) => (
              <li key={i} className="flex gap-2 text-sm text-molted-white/80">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: GOLD }} />
                {imp}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ── Input form ────────────────────────────────────────────────────────── */
const ASSIGNMENT_TYPES = ['Essay', 'Discussion Post', 'Short Answer', 'Lab Report', 'Case Study', 'Presentation', 'Project'];

function InputForm({ onSubmit, loading }: {
  onSubmit: (data: Record<string, string>) => void;
  loading: boolean;
}) {
  const [form, setForm] = useState({
    assignmentTitle: '',
    assignmentType: 'Essay',
    totalPoints: '100',
    rubric: '',
    submission: '',
    voice: '',
  });

  const set = (k: string) => (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const ready = form.rubric.trim().length > 20 && form.submission.trim().length > 30 && !loading;

  return (
    <div className="space-y-5">
      {/* Title + Type */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-molted-white text-sm font-semibold mb-2">Assignment title</label>
          <input
            type="text"
            value={form.assignmentTitle}
            onChange={set('assignmentTitle')}
            placeholder="e.g. Essay 2 — Globalization"
            className="w-full rounded-xl border text-sm text-molted-white p-3 focus:outline-none"
            style={{
              background: 'rgba(17,17,24,0.9)',
              borderColor: form.assignmentTitle ? TEAL_BORDER : 'rgba(255,255,255,0.08)',
            }}
          />
        </div>
        <div>
          <label className="block text-molted-muted text-xs font-semibold mb-2">Type</label>
          <div className="flex flex-wrap gap-1.5">
            {ASSIGNMENT_TYPES.map(t => {
              const active = form.assignmentType === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, assignmentType: t }))}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all"
                  style={{
                    background: active ? TEAL_DIM : 'rgba(255,255,255,0.04)',
                    color: active ? TEAL : '#86868B',
                    border: `1px solid ${active ? TEAL_BORDER : 'rgba(255,255,255,0.07)'}`,
                  }}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Rubric */}
      <div>
        <label className="block text-molted-white text-sm font-semibold mb-1">
          Rubric <span className="text-molted-subtle font-normal text-xs">(required)</span>
        </label>
        <p className="text-molted-muted text-xs mb-2">
          List your criteria and point values. Plain text is fine — paste from a rubric doc or type it out.
        </p>
        <textarea
          value={form.rubric}
          onChange={set('rubric')}
          placeholder={`Thesis & Argument (25 pts)\nExcellent: Clear, original thesis that drives the essay. Fully developed argument with no logical gaps.\nSatisfactory: Thesis present but somewhat generic. Argument mostly coherent.\nNeeds Work: Thesis absent or unclear. Argument is underdeveloped.\n\nEvidence & Support (25 pts)\nExcellent: All claims supported by specific, relevant evidence cited correctly.\n...`}
          rows={7}
          className="w-full rounded-xl border text-sm text-molted-white leading-relaxed resize-none p-3 focus:outline-none"
          style={{
            background: 'rgba(17,17,24,0.9)',
            borderColor: form.rubric ? TEAL_BORDER : 'rgba(255,255,255,0.08)',
          }}
        />
      </div>

      {/* Submission */}
      <div>
        <label className="block text-molted-white text-sm font-semibold mb-1">
          Student submission <span className="text-molted-subtle font-normal text-xs">(required)</span>
        </label>
        <p className="text-molted-muted text-xs mb-2">
          Paste the student's full submission. You can include their name at the top if you want it in the feedback.
        </p>
        <textarea
          value={form.submission}
          onChange={set('submission')}
          placeholder="Paste the student's submission here…"
          rows={8}
          className="w-full rounded-xl border text-sm text-molted-white leading-relaxed resize-none p-3 focus:outline-none"
          style={{
            background: 'rgba(17,17,24,0.9)',
            borderColor: form.submission ? TEAL_BORDER : 'rgba(255,255,255,0.08)',
          }}
        />
      </div>

      {/* Voice */}
      <div>
        <label className="block text-molted-white text-sm font-semibold mb-1">
          Your voice <span className="text-molted-subtle font-normal text-xs">(optional)</span>
        </label>
        <p className="text-molted-muted text-xs mb-2">
          Describe your feedback style — direct, encouraging, blunt, detailed, etc. Feedback will match your tone.
        </p>
        <textarea
          value={form.voice}
          onChange={set('voice')}
          placeholder="e.g. I'm direct and high-standards. I expect specific evidence and clean argument structure. I don't sugarcoat but I always point to exactly how to improve."
          rows={3}
          className="w-full rounded-xl border text-sm text-molted-muted leading-relaxed resize-none p-3 focus:outline-none"
          style={{
            background: 'rgba(17,17,24,0.9)',
            borderColor: form.voice ? TEAL_BORDER : 'rgba(255,255,255,0.08)',
          }}
        />
      </div>

      <button
        onClick={() => onSubmit(form)}
        disabled={!ready}
        className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm transition-all"
        style={{
          background: ready ? TEAL : 'rgba(255,255,255,0.06)',
          color: ready ? '#0A0A0F' : '#3A3A40',
          cursor: ready ? 'pointer' : 'not-allowed',
        }}
      >
        {loading ? (
          <><Loader2 size={16} className="animate-spin" />Grading submission…</>
        ) : (
          <><CheckSquare size={16} />Grade This Submission</>
        )}
      </button>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────── */
export default function AgenticGrader() {
  const [result, setResult] = useState<GradeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('');

  async function handleSubmit(form: Record<string, string>) {
    setLoading(true);
    setError(null);
    setResult(null);
    setTitle(form.assignmentTitle || 'Graded Submission');

    try {
      const res = await fetch('/api/agentic-grader', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? 'Something went wrong.'); return; }
      setResult(data);
    } catch {
      setError('Network error — please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <MoltedLayout>
      <div className="min-h-screen pt-24 pb-24 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-10">
            <Link
              to="/teachos"
              className="inline-flex items-center gap-1.5 text-molted-muted text-sm hover:text-molted-white transition-colors mb-6"
            >
              <ChevronLeft size={14} />
              Forge
            </Link>

            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ background: TEAL_DIM, color: TEAL, border: `1px solid ${TEAL_BORDER}` }}
            >
              <CheckSquare size={11} />
              Agentic Grader · Beta
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-molted-white tracking-tight">
              Your rubric. Your standards.
              <br />
              <span style={{ color: TEAL }}>Zero friction.</span>
            </h1>
            <p className="mt-3 text-molted-muted text-base max-w-lg leading-relaxed">
              Paste your rubric and a student submission. Agentic Grader reads
              every criterion, writes individualized feedback citing the student's
              own words, assigns scores with justification, and flags any academic
              integrity signals.
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-start">

            {/* Input */}
            <div
              className="rounded-3xl p-6 border sticky top-24"
              style={{ background: 'rgba(17,17,24,0.7)', borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <InputForm onSubmit={handleSubmit} loading={loading} />
            </div>

            {/* Results */}
            <div>
              {error && (
                <div
                  className="rounded-2xl p-5 border mb-6"
                  style={{ background: 'rgba(30,58,138,0.08)', borderColor: 'rgba(30,58,138,0.2)' }}
                >
                  <p className="text-red-400 text-sm font-semibold mb-1">Error</p>
                  <p className="text-molted-muted text-sm">{error}</p>
                </div>
              )}

              {!result && !loading && !error && (
                <div
                  className="rounded-3xl p-10 border text-center"
                  style={{ background: 'rgba(17,17,24,0.5)', borderColor: 'rgba(255,255,255,0.04)' }}
                >
                  <div className="grid grid-cols-3 gap-3 mb-8 max-w-xs mx-auto">
                    {[
                      { icon: CheckSquare, label: 'Rubric scoring' },
                      { icon: Shield, label: 'Integrity check' },
                      { icon: TrendingUp, label: 'Actionable feedback' },
                    ].map(({ icon: Icon, label }) => (
                      <div
                        key={label}
                        className="rounded-2xl p-4 flex flex-col items-center gap-2"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                      >
                        <Icon size={18} className="text-molted-subtle" />
                        <p className="text-molted-subtle text-xs text-center">{label}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-molted-muted font-semibold mb-2">Your grade report will appear here</p>
                  <p className="text-molted-subtle text-sm">
                    Paste your rubric and submission on the left, then click Grade.
                  </p>
                </div>
              )}

              {loading && (
                <div
                  className="rounded-3xl p-10 border text-center"
                  style={{ background: 'rgba(17,17,24,0.5)', borderColor: TEAL_BORDER }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: TEAL_DIM, border: `1px solid ${TEAL_BORDER}` }}
                  >
                    <Loader2 size={20} style={{ color: TEAL }} className="animate-spin" />
                  </div>
                  <p className="text-molted-white font-semibold mb-1">Reading the submission…</p>
                  <p className="text-molted-muted text-sm">
                    Grading criterion by criterion and writing personalized feedback.
                    <br />This usually takes 10–20 seconds.
                  </p>
                </div>
              )}

              {result && <GradeView result={result} assignmentTitle={title} />}
            </div>
          </div>

          {/* Footer nudge */}
          <div
            className="mt-16 rounded-3xl p-8 border text-center"
            style={{ background: 'rgba(17,17,24,0.7)', borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <p className="text-molted-muted text-sm mb-1">This is Forge Agentic Grader — beta.</p>
            <p className="text-molted-white font-semibold mb-5">
              Next: batch-grade entire class rosters in one upload.
            </p>
            <a
              href="mailto:hello@molted.ai"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:-translate-y-px"
              style={{ background: TEAL, color: '#0A0A0F' }}
            >
              Join the early access list
              <ArrowRight size={14} />
            </a>
          </div>

        </div>
      </div>
    </MoltedLayout>
  );
}
