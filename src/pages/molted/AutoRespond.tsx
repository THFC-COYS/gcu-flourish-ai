import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft, Loader2, Copy, Check, ArrowRight,
  MessageCircle, ShieldCheck, AlertCircle, Zap, Tag,
  ChevronDown, ChevronUp, BookOpen,
} from 'lucide-react';
import MoltLMSLayout from './MoltedLayout';

/* ── Constants ─────────────────────────────────────────────────────────── */
const TEAL = '#2563EB';
const TEAL_DIM = 'rgba(37,99,235,0.12)';
const TEAL_BORDER = 'rgba(37,99,235,0.25)';
const GOLD = '#64748B';
const RED = '#1E3A8A';

/* ── Types ─────────────────────────────────────────────────────────────── */
type Confidence = 'conservative' | 'balanced' | 'proactive';

interface PolicyRef {
  policy: string;
  excerpt: string;
}

interface AutoRespondResult {
  shouldAutoRespond: boolean;
  confidenceScore: number; // 0–100
  category: string;
  categoryIcon: string;
  draftResponse: string;
  policyRefs: PolicyRef[];
  escalationReason: string;
  escalationSuggestion: string;
  insight: string;
}

/* ── Helpers ───────────────────────────────────────────────────────────── */
function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }}
      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
      style={{
        background: copied ? TEAL_DIM : 'rgba(148,163,184,0.10)',
        color: copied ? TEAL : '#94A3B8',
        border: `1px solid ${copied ? TEAL_BORDER : 'rgba(0,0,0,0.08)'}`,
      }}
    >
      {copied ? <Check size={11} /> : <Copy size={11} />}
      {copied ? 'Copied' : label}
    </button>
  );
}

function ConfidenceBar({ score }: { score: number }) {
  const color = score >= 80 ? TEAL : score >= 55 ? GOLD : RED;
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs" style={{ color: '#94A3B8' }}>Response confidence</span>
        <span className="text-sm font-bold" style={{ color }}>{score}%</span>
      </div>
      <div className="h-1.5 rounded-full" style={{ background: 'rgba(0,0,0,0.08)' }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${score}%`, background: color }}
        />
      </div>
    </div>
  );
}

function PolicyCard({ ref: pRef, idx }: { ref: PolicyRef; idx: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{ borderColor: 'rgba(148,163,184,0.12)', background: 'rgba(148,163,184,0.07)' }}
    >
      <button
        className="w-full flex items-center justify-between px-4 py-3 text-left"
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex items-center gap-2">
          <BookOpen size={12} style={{ color: TEAL }} />
          <span className="text-xs font-semibold" style={{ color: '#1C1C1E' }}>
            Policy reference {idx + 1}: {pRef.policy}
          </span>
        </div>
        {open ? <ChevronUp size={13} style={{ color: '#94A3B8' }} /> : <ChevronDown size={13} style={{ color: '#94A3B8' }} />}
      </button>
      {open && (
        <div className="px-4 pb-3">
          <p className="text-xs leading-relaxed" style={{ color: '#94A3B8' }}>"{pRef.excerpt}"</p>
        </div>
      )}
    </div>
  );
}

/* ── Mock generator ─────────────────────────────────────────────────────── */
function generateMockResult(
  question: string,
  policies: string,
  threshold: Confidence,
): AutoRespondResult {
  const q = question.toLowerCase();
  const thresholdMin = threshold === 'conservative' ? 85 : threshold === 'balanced' ? 65 : 45;

  // Detect category
  let category = 'General';
  let categoryIcon = '💬';
  if (q.includes('syllabus') || q.includes('schedule') || q.includes('textbook')) {
    category = 'Syllabus / Course Info'; categoryIcon = '📋';
  } else if (q.includes('due') || q.includes('deadline') || q.includes('late') || q.includes('extension')) {
    category = 'Deadlines & Extensions'; categoryIcon = '📅';
  } else if (q.includes('grade') || q.includes('score') || q.includes('rubric') || q.includes('points')) {
    category = 'Grading & Rubric'; categoryIcon = '📊';
  } else if (q.includes('submit') || q.includes('canvas') || q.includes('upload') || q.includes('assignment')) {
    category = 'Submission & Tech'; categoryIcon = '📤';
  } else if (q.includes('office hours') || q.includes('meet') || q.includes('appointment')) {
    category = 'Office Hours / Meetings'; categoryIcon = '🗓️';
  } else if (q.includes('group') || q.includes('partner') || q.includes('team')) {
    category = 'Group Work'; categoryIcon = '👥';
  }

  // Score based on how policy-covered the question seems
  const hasPolicyCoverage = policies.length > 100;
  const isSpecific = q.length > 40;
  const baseScore = hasPolicyCoverage ? 78 : 52;
  const adjustedScore = Math.min(97, baseScore + (isSpecific ? 8 : 0) + (Math.random() * 12 | 0));

  const shouldAutoRespond = adjustedScore >= thresholdMin;

  // Build draft in instructor voice
  const firstName = 'Hi there';
  let draft = '';
  if (category === 'Deadlines & Extensions') {
    draft = `${firstName},\n\nThanks for reaching out. Per our course policy, late work is accepted within 48 hours of the original deadline with a 10% deduction per day. If you're dealing with extenuating circumstances, please reach out before the deadline and we can discuss options.\n\nThe submission portal on Canvas will remain open — just make sure to note it's late in your submission comments.\n\nLet me know if you have any other questions!\n\n— [Instructor Name]`;
  } else if (category === 'Grading & Rubric') {
    draft = `${firstName},\n\nGreat question about grading. The rubric is posted in the Assignment Details section on Canvas — I'd encourage you to review the "Exceeds Expectations" column as a guide for what A-level work looks like.\n\nIf after reviewing it you still have concerns about a specific grade, you're welcome to request a regrade within 5 business days of receiving your score. Just email me with the assignment name and the specific criteria you'd like reconsidered.\n\nHope that helps clarify things!\n\n— [Instructor Name]`;
  } else if (category === 'Submission & Tech') {
    draft = `${firstName},\n\nFor submissions, please use the Assignment link directly in Canvas — not the Files section. Make sure your file is in .pdf or .docx format, and named as follows: LastName_AssignmentName.\n\nIf you run into any technical issues during submission, contact Canvas Support at support.instructure.com and CC me on that email so I'm aware. Submissions that fail due to documented tech issues won't be penalized.\n\nLet me know if you need anything else!\n\n— [Instructor Name]`;
  } else if (category === 'Office Hours / Meetings') {
    draft = `${firstName},\n\nOffice hours are held Tuesdays and Thursdays 2–4 PM via Zoom (link pinned in Canvas). No appointment needed — just drop in!\n\nIf those times don't work, reply here with 2–3 windows you're free and I'll do my best to find an alternate time.\n\nLooking forward to connecting!\n\n— [Instructor Name]`;
  } else {
    draft = `${firstName},\n\nThanks for your message! Based on the course syllabus, ${question.trim().endsWith('?') ? question.slice(0, -1).toLowerCase() : question.toLowerCase()} is addressed in our course policies.\n\nPlease review Section 3 of the syllabus for full details. If after reading it your question isn't answered, feel free to reply and I'll be happy to help further.\n\nTalk soon!\n\n— [Instructor Name]`;
  }

  const policyRefs: PolicyRef[] = [];
  if (policies.length > 50) {
    policyRefs.push({
      policy: category,
      excerpt: policies.slice(0, 160) + (policies.length > 160 ? '…' : ''),
    });
  }

  const escalationReason = shouldAutoRespond
    ? ''
    : `Confidence ${adjustedScore}% is below your ${thresholdMin}% threshold. The question may involve nuanced judgment (grade disputes, accommodations, personal circumstances) that benefits from a human response.`;

  const escalationSuggestion = shouldAutoRespond
    ? ''
    : `Suggested action: Review draft above, personalise the middle paragraph, then send manually. Estimated time: 90 seconds.`;

  const insight = shouldAutoRespond
    ? `Forge matched this question to your ${category} policy with ${adjustedScore}% confidence. Responding in your documented voice — no manual action needed.`
    : `This question touches on areas where your personal judgment adds value. The draft above covers the policy angle; a brief personal note from you will close it well.`;

  return {
    shouldAutoRespond,
    confidenceScore: adjustedScore,
    category,
    categoryIcon,
    draftResponse: draft,
    policyRefs,
    escalationReason,
    escalationSuggestion,
    insight,
  };
}

/* ── Input Panel ────────────────────────────────────────────────────────── */
const THRESHOLDS: { value: Confidence; label: string; desc: string }[] = [
  { value: 'conservative', label: 'Conservative', desc: 'Auto-respond only when 85%+ confident' },
  { value: 'balanced',     label: 'Balanced',     desc: 'Auto-respond at 65%+ confidence' },
  { value: 'proactive',    label: 'Proactive',    desc: 'Auto-respond at 45%+ confidence' },
];

interface InputState {
  policies: string;
  question: string;
  courseContext: string;
  threshold: Confidence;
}

function InputPanel({
  state, setState, onSubmit, loading,
}: {
  state: InputState;
  setState: (s: InputState) => void;
  onSubmit: () => void;
  loading: boolean;
}) {
  const set = (k: keyof InputState) => (val: string) => setState({ ...state, [k]: val });
  const ready = state.policies.trim().length > 20 && state.question.trim().length > 8;

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-xs font-semibold mb-2" style={{ color: '#94A3B8' }}>
          INSTRUCTOR POLICIES & VOICE
        </label>
        <textarea
          rows={5}
          value={state.policies}
          onChange={e => set('policies')(e.target.value)}
          placeholder="Paste your syllabus policies, late work rules, grading approach, or describe how you speak to students. Forge uses this as your voice baseline."
          className="w-full rounded-xl px-4 py-3 text-sm resize-none outline-none transition-all"
          style={{
            background: 'rgba(148,163,184,0.08)',
            border: '1px solid rgba(0,0,0,0.08)',
            color: '#1C1C1E',
          }}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold mb-2" style={{ color: '#94A3B8' }}>
          STUDENT QUESTION
        </label>
        <textarea
          rows={3}
          value={state.question}
          onChange={e => set('question')(e.target.value)}
          placeholder="Paste the student's question exactly as received…"
          className="w-full rounded-xl px-4 py-3 text-sm resize-none outline-none transition-all"
          style={{
            background: 'rgba(148,163,184,0.08)',
            border: '1px solid rgba(0,0,0,0.08)',
            color: '#1C1C1E',
          }}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold mb-2" style={{ color: '#94A3B8' }}>
          COURSE CONTEXT <span style={{ color: '#64748B' }}>(optional)</span>
        </label>
        <input
          type="text"
          value={state.courseContext}
          onChange={e => set('courseContext')(e.target.value)}
          placeholder="e.g. PSYC 201 — Week 8, midterm graded last Friday"
          className="w-full rounded-xl px-4 py-3 text-sm outline-none"
          style={{
            background: 'rgba(148,163,184,0.08)',
            border: '1px solid rgba(0,0,0,0.08)',
            color: '#1C1C1E',
          }}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold mb-2" style={{ color: '#94A3B8' }}>
          AUTO-RESPOND THRESHOLD
        </label>
        <div className="flex flex-col gap-2">
          {THRESHOLDS.map(t => (
            <button
              key={t.value}
              onClick={() => set('threshold')(t.value)}
              className="flex items-start gap-3 px-4 py-3 rounded-xl text-left transition-all"
              style={{
                background: state.threshold === t.value ? TEAL_DIM : 'rgba(148,163,184,0.07)',
                border: `1px solid ${state.threshold === t.value ? TEAL_BORDER : 'rgba(148,163,184,0.10)'}`,
              }}
            >
              <div
                className="mt-0.5 w-3.5 h-3.5 rounded-full flex-shrink-0 border-2 flex items-center justify-center"
                style={{ borderColor: state.threshold === t.value ? TEAL : '#64748B' }}
              >
                {state.threshold === t.value && (
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: TEAL }} />
                )}
              </div>
              <div>
                <p className="text-xs font-semibold" style={{ color: state.threshold === t.value ? TEAL : '#1C1C1E' }}>
                  {t.label}
                </p>
                <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>{t.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={!ready || loading}
        className="w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
        style={{
          background: ready && !loading ? TEAL : 'rgba(148,163,184,0.10)',
          color: ready && !loading ? '#0A0A0F' : '#64748B',
          cursor: ready && !loading ? 'pointer' : 'not-allowed',
        }}
      >
        {loading ? (
          <><Loader2 size={15} className="animate-spin" /> Analyzing question…</>
        ) : (
          <><Zap size={15} /> Evaluate & Draft Response</>
        )}
      </button>
    </div>
  );
}

/* ── Results ────────────────────────────────────────────────────────────── */
function Results({ result }: { result: AutoRespondResult }) {
  return (
    <div className="space-y-5">
      {/* Decision header */}
      <div
        className="rounded-2xl p-5 border"
        style={{
          background: result.shouldAutoRespond ? TEAL_DIM : 'rgba(100,116,139,0.08)',
          borderColor: result.shouldAutoRespond ? TEAL_BORDER : 'rgba(100,116,139,0.25)',
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          {result.shouldAutoRespond
            ? <ShieldCheck size={20} style={{ color: TEAL }} />
            : <AlertCircle size={20} style={{ color: GOLD }} />}
          <div>
            <p className="text-sm font-black" style={{ color: result.shouldAutoRespond ? TEAL : GOLD }}>
              {result.shouldAutoRespond ? 'Safe to auto-respond' : 'Escalate to instructor'}
            </p>
            <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>
              {result.categoryIcon} {result.category}
            </p>
          </div>
          <div className="ml-auto">
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
              style={{
                background: 'rgba(148,163,184,0.10)',
                color: result.shouldAutoRespond ? TEAL : GOLD,
              }}
            >
              <Tag size={10} />{result.category}
            </span>
          </div>
        </div>
        <ConfidenceBar score={result.confidenceScore} />
      </div>

      {/* Escalation block (if applicable) */}
      {!result.shouldAutoRespond && (
        <div
          className="rounded-2xl p-5 border"
          style={{ background: 'rgba(100,116,139,0.06)', borderColor: 'rgba(100,116,139,0.18)' }}
        >
          <p className="text-xs font-bold mb-1.5" style={{ color: GOLD }}>Why escalation is recommended</p>
          <p className="text-xs leading-relaxed mb-3" style={{ color: '#94A3B8' }}>{result.escalationReason}</p>
          {result.escalationSuggestion && (
            <p className="text-xs leading-relaxed" style={{ color: '#C0A060' }}>{result.escalationSuggestion}</p>
          )}
        </div>
      )}

      {/* Draft response */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ background: 'rgba(241,243,248,0.90)', borderColor: 'rgba(148,163,184,0.12)' }}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: 'rgba(148,163,184,0.10)' }}>
          <div className="flex items-center gap-2">
            <MessageCircle size={13} style={{ color: TEAL }} />
            <span className="text-xs font-semibold" style={{ color: '#1C1C1E' }}>
              Draft response — in your voice
            </span>
          </div>
          <CopyButton text={result.draftResponse} label="Copy response" />
        </div>
        <div className="px-5 py-4">
          <pre
            className="text-xs leading-relaxed whitespace-pre-wrap font-sans"
            style={{ color: '#C7C7CC' }}
          >
            {result.draftResponse}
          </pre>
        </div>
      </div>

      {/* Policy references */}
      {result.policyRefs.length > 0 && (
        <div>
          <p className="text-xs font-semibold mb-2" style={{ color: '#94A3B8' }}>POLICIES CITED</p>
          <div className="space-y-2">
            {result.policyRefs.map((p, i) => (
              <PolicyCard key={i} ref={p} idx={i} />
            ))}
          </div>
        </div>
      )}

      {/* Insight */}
      <div
        className="rounded-2xl p-5 border"
        style={{ background: 'rgba(100,116,139,0.07)', borderColor: 'rgba(100,116,139,0.18)' }}
      >
        <div className="flex items-start gap-3">
          <Zap size={15} style={{ color: GOLD, flexShrink: 0, marginTop: 2 }} />
          <div>
            <p className="text-xs font-bold mb-1" style={{ color: GOLD }}>Forge insight</p>
            <p className="text-xs leading-relaxed" style={{ color: '#94A3B8' }}>{result.insight}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────────────────── */
const EMPTY_STATE: InputState = {
  policies: '',
  question: '',
  courseContext: '',
  threshold: 'balanced',
};

export default function AutoRespond() {
  const [state, setState] = useState<InputState>(EMPTY_STATE);
  const [result, setResult] = useState<AutoRespondResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit() {
    setLoading(true);
    setResult(null);
    setError('');
    try {
      await new Promise(r => setTimeout(r, 1600));
      setResult(generateMockResult(state.question, state.policies, state.threshold));
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <MoltLMSLayout>
      <div className="min-h-screen pt-24 pb-24 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-10">
            <Link
              to="/teachos"
              className="inline-flex items-center gap-1.5 text-xs mb-6 transition-colors hover:opacity-80"
              style={{ color: '#94A3B8' }}
            >
              <ChevronLeft size={14} /> Forge
            </Link>

            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ background: TEAL_DIM, color: TEAL, border: `1px solid ${TEAL_BORDER}` }}
            >
              <MessageCircle size={11} />
              Auto-Respond · Beta
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-molted-white tracking-tight">
              Your policies, answered<br />
              <span style={{ color: TEAL }}>24/7 in your voice.</span>
            </h1>

            <p className="mt-3 text-molted-muted text-base max-w-lg leading-relaxed">
              Paste your syllabus policies once. Forge evaluates every student question,
              drafts a response in your voice, and knows when to escalate instead.
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-start">

            {/* Left: Input */}
            <div
              className="rounded-3xl p-6 border sticky top-24"
              style={{ background: 'rgba(241,243,248,0.90)', borderColor: 'rgba(148,163,184,0.10)' }}
            >
              <InputPanel
                state={state}
                setState={setState}
                onSubmit={handleSubmit}
                loading={loading}
              />
            </div>

            {/* Right: Results */}
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
                  style={{ background: 'rgba(241,243,248,0.80)', borderColor: 'rgba(148,163,184,0.08)' }}
                >
                  <div className="flex justify-center gap-4 mb-6 opacity-30">
                    {[ShieldCheck, MessageCircle, AlertCircle].map((Icon, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: TEAL_DIM }}
                      >
                        <Icon size={18} style={{ color: TEAL }} />
                      </div>
                    ))}
                  </div>
                  <p className="text-molted-white font-semibold mb-2">Ready to respond</p>
                  <p className="text-molted-muted text-sm max-w-xs mx-auto leading-relaxed">
                    Paste your policies and a student question to see a confidence score,
                    draft response, and send/escalate decision.
                  </p>
                </div>
              )}

              {loading && (
                <div
                  className="rounded-3xl p-10 border text-center"
                  style={{ background: 'rgba(241,243,248,0.80)', borderColor: TEAL_BORDER }}
                >
                  <Loader2 size={28} style={{ color: TEAL }} className="animate-spin mx-auto mb-4" />
                  <p className="text-molted-white font-semibold mb-1">Analyzing question…</p>
                  <p className="text-molted-muted text-sm">Matching to your policies · Drafting response · Scoring confidence</p>
                </div>
              )}

              {result && <Results result={result} />}
            </div>
          </div>

          {/* Footer CTA */}
          <div
            className="mt-16 rounded-3xl p-8 border text-center"
            style={{ background: 'rgba(241,243,248,0.90)', borderColor: 'rgba(148,163,184,0.10)' }}
          >
            <p className="text-molted-muted text-sm mb-1">This is Forge Auto-Respond — beta.</p>
            <p className="text-molted-white font-semibold mb-5">
              Next: sync Auto-Respond directly with Canvas Inbox and Gmail.
            </p>
            <a
              href="mailto:greg.lucas@paigebreaker.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:-translate-y-px"
              style={{ background: TEAL, color: '#ffffff' }}
            >
              Join the early access list
              <ArrowRight size={14} />
            </a>
          </div>

        </div>
      </div>
    </MoltLMSLayout>
  );
}
