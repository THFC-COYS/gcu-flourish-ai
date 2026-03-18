import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, CheckCircle, XCircle, Zap, BarChart2, Brain, ShieldCheck } from 'lucide-react';

const INDIGO = '#6366F1';
const INDIGO_DIM = 'rgba(99,102,241,0.08)';
const INDIGO_BORDER = 'rgba(99,102,241,0.22)';

const CARD = '#f8fafc';
const CARD_INNER = '#f1f5f9';
const BORDER = 'rgba(148,163,184,0.20)';
const DIVIDER = 'rgba(148,163,184,0.15)';

const EXAM_TOPICS = [
  { id: 'nursing-pharm', label: 'Nursing Pharmacology', description: 'Drug classes, mechanisms, NCLEX-style', color: '#1e40af' },
  { id: 'business-stats', label: 'Business Statistics', description: 'Probability, hypothesis testing, regression', color: '#059669' },
  { id: 'bioethics', label: 'Biomedical Ethics', description: 'Autonomy, beneficence, ethical frameworks', color: '#7c3aed' },
  { id: 'pathophysiology', label: 'Pathophysiology', description: 'Disease mechanisms, clinical manifestations', color: '#dc2626' },
  { id: 'strategic-mgmt', label: 'Strategic Management', description: 'Porter, SWOT, competitive strategy', color: '#d97706' },
];

interface ExamQuestion {
  id: string;
  question: string;
  options: { A: string; B: string; C: string; D: string };
  correct: string;
  explanation: string;
  difficulty: number;
  subtopic: string;
  competency: string;
  bloom: string;
}

interface ExamData {
  examTitle: string;
  topic: string;
  questions: ExamQuestion[];
}

interface AnsweredQuestion {
  question: ExamQuestion;
  chosen: string;
  correct: boolean;
  timeMs: number;
}

const BLOOM_COLORS: Record<string, string> = {
  remember: '#64748b', understand: '#0284c7', apply: '#059669',
  analyze: '#d97706', evaluate: '#7c3aed', create: '#dc2626',
};

function DifficultyDots({ level, max = 5 }: { level: number; max?: number }) {
  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: max }, (_, i) => (
        <div key={i} className="w-2 h-2 rounded-full transition-all"
          style={{ background: i < level ? INDIGO : '#e2e8f0' }} />
      ))}
      <span className="text-xs text-slate-500 ml-1">Lvl {level}</span>
    </div>
  );
}

export default function AdaptiveExamDemo() {
  const [topic, setTopic] = useState(EXAM_TOPICS[0]);
  const [phase, setPhase] = useState<'setup' | 'loading' | 'exam' | 'results'>('setup');
  const [examData, setExamData] = useState<ExamData | null>(null);
  const [queue, setQueue] = useState<ExamQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState<ExamQuestion | null>(null);
  const [chosen, setChosen] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [answered, setAnswered] = useState<AnsweredQuestion[]>([]);
  const [questionStart, setQuestionStart] = useState(Date.now());
  const [error, setError] = useState('');

  async function startExam() {
    setPhase('loading'); setError('');
    try {
      const res = await fetch('/api/demos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'adaptive-exam', topic: topic.label, questionCount: 8 }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data: ExamData = await res.json();
      setExamData(data);
      // Start with a mid-difficulty question
      const sorted = [...data.questions].sort((a, b) => Math.abs(a.difficulty - 2.5) - Math.abs(b.difficulty - 2.5));
      const first = sorted[0];
      const rest = data.questions.filter(q => q.id !== first.id);
      setCurrentQ(first);
      setQueue(rest);
      setAnswered([]);
      setChosen(null);
      setRevealed(false);
      setQuestionStart(Date.now());
      setPhase('exam');
    } catch (e) {
      setError(String(e));
      setPhase('setup');
    }
  }

  function selectAnswer(opt: string) {
    if (revealed) return;
    setChosen(opt);
  }

  function confirmAnswer() {
    if (!chosen || !currentQ) return;
    const isCorrect = chosen === currentQ.correct;
    const timeMs = Date.now() - questionStart;
    const newAnswered = [...answered, { question: currentQ, chosen, correct: isCorrect, timeMs }];
    setAnswered(newAnswered);
    setRevealed(true);

    // Schedule next question selection
    setTimeout(() => {
      if (queue.length === 0 || newAnswered.length >= 7) {
        setPhase('results');
        return;
      }
      // Adaptive selection: correct → pick harder, incorrect → pick easier
      const targetDiff = isCorrect
        ? Math.min(currentQ.difficulty + 1, 5)
        : Math.max(currentQ.difficulty - 1, 1);

      const sorted = [...queue].sort((a, b) =>
        Math.abs(a.difficulty - targetDiff) - Math.abs(b.difficulty - targetDiff)
      );
      const next = sorted[0];
      setCurrentQ(next);
      setQueue(queue.filter(q => q.id !== next.id));
      setChosen(null);
      setRevealed(false);
      setQuestionStart(Date.now());
    }, 2200);
  }

  function reset() {
    setPhase('setup');
    setExamData(null);
    setQueue([]);
    setCurrentQ(null);
    setChosen(null);
    setRevealed(false);
    setAnswered([]);
    setError('');
  }

  const score = answered.length > 0 ? Math.round((answered.filter(a => a.correct).length / answered.length) * 100) : 0;
  const difficultyProgression = answered.map(a => a.question.difficulty);
  const avgDifficulty = difficultyProgression.length > 0
    ? (difficultyProgression.reduce((s, d) => s + d, 0) / difficultyProgression.length).toFixed(1)
    : '–';

  // Group results by subtopic for mastery map
  const subtopicMap: Record<string, { correct: number; total: number }> = {};
  answered.forEach(a => {
    const st = a.question.subtopic;
    if (!subtopicMap[st]) subtopicMap[st] = { correct: 0, total: 0 };
    subtopicMap[st].total++;
    if (a.correct) subtopicMap[st].correct++;
  });

  return (
    <div className="min-h-screen" style={{ background: '#ffffff', color: '#0f172a' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: '#e2e8f0' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">Home</Link>
            <span className="text-slate-300">/</span>
            <span className="text-sm font-semibold" style={{ color: INDIGO }}>Adaptive Exam Demo</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: INDIGO_DIM, border: `1px solid ${INDIGO_BORDER}`, color: INDIGO }}>
            <Brain size={11} />
            AdaptiveExam · AI Assessment
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight mb-2 text-slate-900">Adaptive Exam — Every Test is Unique</h1>
          <p className="text-slate-500">AI generates fresh questions every time. Difficulty adapts in real-time to your performance. Sharing answers becomes structurally pointless.</p>
        </div>

        {/* Setup */}
        {phase === 'setup' && (
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Select Topic</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {EXAM_TOPICS.map(t => (
                  <button key={t.id} onClick={() => setTopic(t)}
                    className="p-4 rounded-xl text-left transition-all"
                    style={{
                      background: topic.id === t.id ? `${t.color}0a` : CARD,
                      border: `1px solid ${topic.id === t.id ? `${t.color}35` : BORDER}`,
                      boxShadow: topic.id === t.id ? `0 0 0 3px ${t.color}14` : 'none',
                    }}>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full" style={{ background: t.color }} />
                      <p className="text-sm font-bold text-slate-800">{t.label}</p>
                    </div>
                    <p className="text-xs text-slate-500">{t.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* How it works */}
            <div className="p-5 rounded-2xl" style={{ background: INDIGO_DIM, border: `1px solid ${INDIGO_BORDER}` }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: INDIGO }}>How AdaptiveExam works</p>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { icon: <Brain size={18} />, title: 'AI-Generated Questions', desc: 'Every exam is freshly generated — no static question bank to share' },
                  { icon: <Zap size={18} />, title: 'Real-Time Adaptation', desc: 'Correct → harder. Wrong → easier. Difficulty adapts after every answer' },
                  { icon: <ShieldCheck size={18} />, title: 'Cheating-Resistant', desc: 'Unique questions per session make answer sharing structurally useless' },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="p-3 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.7)' }}>
                    <div className="flex justify-center mb-2" style={{ color: INDIGO }}>{icon}</div>
                    <p className="text-sm font-bold text-slate-800 mb-1">{title}</p>
                    <p className="text-xs text-slate-500">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg text-sm" style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.15)', color: '#b91c1c' }}>
                {error}
              </div>
            )}

            <button onClick={startExam}
              className="w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:-translate-y-px"
              style={{ background: `linear-gradient(135deg, #4f46e5, #6366f1)`, color: '#fff', boxShadow: '0 4px 14px rgba(99,102,241,0.30)' }}>
              <Zap size={16} />
              Start Adaptive Exam — {topic.label}
            </button>
          </div>
        )}

        {/* Loading */}
        {phase === 'loading' && (
          <div className="flex flex-col items-center justify-center py-32"
            style={{ border: `1px solid ${INDIGO_BORDER}`, borderRadius: '1.5rem', background: INDIGO_DIM }}>
            <RefreshCw size={36} className="animate-spin mb-5" style={{ color: INDIGO }} />
            <p className="font-bold text-slate-700 mb-2">Generating unique questions…</p>
            <p className="text-sm text-slate-500">AI is writing fresh questions for this session only</p>
          </div>
        )}

        {/* Exam */}
        {phase === 'exam' && currentQ && (
          <div className="space-y-5">
            {/* Progress bar */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
                <div className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${(answered.length / 7) * 100}%`, background: INDIGO }} />
              </div>
              <span className="text-xs font-bold text-slate-500 flex-shrink-0">{answered.length + 1} of 7</span>
            </div>

            {/* Difficulty + metadata */}
            <div className="flex items-center gap-3 flex-wrap">
              <DifficultyDots level={currentQ.difficulty} />
              <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: `${BLOOM_COLORS[currentQ.bloom] ?? '#64748b'}12`, color: BLOOM_COLORS[currentQ.bloom] ?? '#64748b', border: `1px solid ${BLOOM_COLORS[currentQ.bloom] ?? '#64748b'}25` }}>
                {currentQ.bloom}
              </span>
              <span className="text-xs text-slate-400">{currentQ.subtopic}</span>
              <span className="text-xs text-slate-300">·</span>
              <span className="text-xs text-slate-400">{currentQ.competency}</span>
              {answered.length > 0 && (
                <div className="ml-auto flex items-center gap-1.5 text-xs text-slate-400">
                  <span className="text-green-600 font-bold">{answered.filter(a => a.correct).length}✓</span>
                  <span>/</span>
                  <span className="text-red-600 font-bold">{answered.filter(a => !a.correct).length}✗</span>
                </div>
              )}
            </div>

            {/* Question card */}
            <div className="p-6 rounded-2xl" style={{ background: CARD, border: `1px solid ${BORDER}`, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <p className="text-base font-semibold text-slate-800 leading-relaxed mb-6">{currentQ.question}</p>

              <div className="space-y-3">
                {(['A', 'B', 'C', 'D'] as const).map(opt => {
                  const isChosen = chosen === opt;
                  const isCorrect = opt === currentQ.correct;
                  let bg = CARD_INNER, border = BORDER, color = '#475569';

                  if (revealed) {
                    if (isCorrect) { bg = 'rgba(22,163,74,0.08)'; border = 'rgba(22,163,74,0.3)'; color = '#15803d'; }
                    else if (isChosen && !isCorrect) { bg = 'rgba(220,38,38,0.06)'; border = 'rgba(220,38,38,0.25)'; color = '#b91c1c'; }
                  } else if (isChosen) {
                    bg = INDIGO_DIM; border = INDIGO_BORDER; color = INDIGO;
                  }

                  return (
                    <button key={opt} onClick={() => selectAnswer(opt)}
                      className="w-full flex items-start gap-3 p-4 rounded-xl text-left transition-all"
                      style={{ background: bg, border: `1px solid ${border}` }}
                      disabled={revealed}>
                      <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0"
                        style={{ background: revealed && isCorrect ? 'rgba(22,163,74,0.15)' : revealed && isChosen && !isCorrect ? 'rgba(220,38,38,0.12)' : isChosen ? INDIGO_DIM : '#e2e8f0', color }}>
                        {revealed && isCorrect ? '✓' : revealed && isChosen && !isCorrect ? '✗' : opt}
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color }}>{currentQ.options[opt]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {revealed && (
                <div className="mt-4 p-4 rounded-xl" style={{ background: 'rgba(99,102,241,0.06)', border: `1px solid ${INDIGO_BORDER}` }}>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: INDIGO }}>Explanation</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{currentQ.explanation}</p>
                </div>
              )}

              {/* CTA */}
              {!revealed ? (
                <button onClick={confirmAnswer} disabled={!chosen}
                  className="w-full py-3.5 rounded-xl font-bold text-sm mt-5 transition-all"
                  style={{
                    background: chosen ? `linear-gradient(135deg, #4f46e5, #6366f1)` : CARD_INNER,
                    color: chosen ? '#fff' : '#94a3b8',
                    boxShadow: chosen ? '0 4px 14px rgba(99,102,241,0.25)' : 'none',
                  }}>
                  Submit Answer
                </button>
              ) : (
                <div className="mt-5 flex items-center gap-3">
                  {chosen === currentQ.correct
                    ? <div className="flex items-center gap-2 text-green-700 font-bold text-sm"><CheckCircle size={18} /> Correct! Difficulty increasing…</div>
                    : <div className="flex items-center gap-2 text-red-700 font-bold text-sm"><XCircle size={18} /> Incorrect. Adjusting difficulty…</div>}
                  {queue.length === 0 || answered.length >= 6 ? (
                    <button onClick={() => setPhase('results')}
                      className="ml-auto py-2.5 px-5 rounded-xl font-bold text-sm"
                      style={{ background: INDIGO, color: '#fff' }}>
                      See Results →
                    </button>
                  ) : (
                    <div className="ml-auto flex items-center gap-1 text-xs text-slate-400">
                      <RefreshCw size={11} className="animate-spin" /> Next question…
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Difficulty tracker */}
            {answered.length > 0 && (
              <div className="p-4 rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Difficulty Progression</p>
                <div className="flex items-end gap-2 h-10">
                  {difficultyProgression.map((d, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full rounded-t transition-all duration-500"
                        style={{ height: `${d * 8}px`, background: answered[i].correct ? INDIGO : '#dc2626', opacity: 0.7 + (i / difficultyProgression.length) * 0.3 }} />
                    </div>
                  ))}
                  <div className="flex-1 opacity-30">
                    <div className="w-full rounded-t" style={{ height: `${(currentQ?.difficulty ?? 3) * 8}px`, background: INDIGO }} />
                  </div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-slate-400">Easier</span>
                  <span className="text-xs text-slate-400">Avg difficulty: {avgDifficulty}</span>
                  <span className="text-xs text-slate-400">Harder</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Results */}
        {phase === 'results' && (
          <div className="space-y-6">
            {/* Score header */}
            <div className="p-6 rounded-2xl" style={{ background: INDIGO_DIM, border: `1px solid ${INDIGO_BORDER}` }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: INDIGO }}>Exam Complete — {topic.label}</p>
                  <p className="text-5xl font-black" style={{ color: score >= 80 ? '#16a34a' : score >= 65 ? '#d97706' : '#dc2626' }}>{score}%</p>
                  <p className="text-slate-600 mt-1">{answered.filter(a => a.correct).length} of {answered.length} correct</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.7)' }}>
                    <p className="text-lg font-black text-slate-800">{avgDifficulty}</p>
                    <p className="text-xs text-slate-500">Avg difficulty</p>
                  </div>
                  <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.7)' }}>
                    <p className="text-lg font-black text-slate-800">
                      {Math.round(answered.reduce((s, a) => s + a.timeMs, 0) / answered.length / 1000)}s
                    </p>
                    <p className="text-xs text-slate-500">Avg time/Q</p>
                  </div>
                </div>
              </div>

              {/* Difficulty bar */}
              <div>
                <p className="text-xs text-slate-500 mb-2">Difficulty progression</p>
                <div className="flex items-end gap-1.5 h-8">
                  {difficultyProgression.map((d, i) => (
                    <div key={i} className="flex-1 rounded transition-all"
                      style={{ height: `${d * 6}px`, background: answered[i].correct ? INDIGO : '#dc2626', opacity: 0.8 }} />
                  ))}
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {/* Mastery map */}
              <div className="p-5 rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <div className="flex items-center gap-2 mb-4">
                  <BarChart2 size={14} style={{ color: INDIGO }} />
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Mastery by Subtopic</p>
                </div>
                <div className="space-y-3">
                  {Object.entries(subtopicMap).map(([st, { correct, total }]) => {
                    const pct = Math.round((correct / total) * 100);
                    const color = pct >= 80 ? '#16a34a' : pct >= 60 ? '#d97706' : '#dc2626';
                    return (
                      <div key={st}>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-slate-700 font-medium">{st}</span>
                          <span className="text-xs font-bold" style={{ color }}>{pct}%</span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
                          <div className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${pct}%`, background: color }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Q-by-Q review */}
              <div className="p-5 rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Question Review</p>
                <div className="space-y-2">
                  {answered.map((a, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 border-b last:border-0" style={{ borderColor: DIVIDER }}>
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0`}
                        style={{ background: a.correct ? 'rgba(22,163,74,0.12)' : 'rgba(220,38,38,0.10)' }}>
                        {a.correct
                          ? <CheckCircle size={13} className="text-green-600" />
                          : <XCircle size={13} className="text-red-600" />}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-700 truncate">{a.question.subtopic}</p>
                        <p className="text-xs text-slate-400">Lvl {a.question.difficulty} · {(a.timeMs / 1000).toFixed(0)}s</p>
                      </div>
                      <span className="text-xs font-bold" style={{ color: a.correct ? '#16a34a' : '#dc2626' }}>
                        {a.chosen} {a.correct ? '✓' : `→${a.question.correct}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Academic integrity note */}
            <div className="p-4 rounded-xl flex items-start gap-3"
              style={{ background: 'rgba(99,102,241,0.06)', border: `1px solid ${INDIGO_BORDER}` }}>
              <ShieldCheck size={18} style={{ color: INDIGO }} className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-slate-800 mb-0.5">Academic integrity by design</p>
                <p className="text-xs text-slate-600">
                  Every exam session generates entirely new questions from the learning objectives. No two students receive the same test.
                  Sharing answers with classmates provides zero advantage — the questions won't match.
                </p>
              </div>
            </div>

            <button onClick={reset}
              className="w-full py-4 rounded-xl font-bold text-sm transition-all hover:-translate-y-px"
              style={{ background: `linear-gradient(135deg, #4f46e5, #6366f1)`, color: '#fff', boxShadow: '0 4px 14px rgba(99,102,241,0.30)' }}>
              Try Another Topic
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 pt-8 border-t flex justify-between items-center" style={{ borderColor: '#e2e8f0' }}>
          <Link to="/clinical-ai/demo" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">← ClinicalAI Demo</Link>
          <Link to="/retain-ai/demo" className="text-sm font-semibold flex items-center gap-1" style={{ color: '#e11d48' }}>
            Try RetainAI Demo →
          </Link>
        </div>
      </div>
    </div>
  );
}
