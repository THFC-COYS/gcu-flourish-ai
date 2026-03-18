import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Mic, Send, Loader2, Copy, Check, RefreshCw, Sparkles, ArrowRight } from 'lucide-react';
import MoltLMSLayout from './MoltedLayout';

/* ── Color palette ─────────────────────────────────────────────────────── */
const BLUE = '#2563EB';
const BLUE_DIM = 'rgba(37,99,235,0.10)';
const BLUE_BORDER = 'rgba(37,99,235,0.22)';
const BLUE_TINT = 'rgba(37,99,235,0.06)';

const AMBER = '#D97706';
const AMBER_DIM = 'rgba(217,119,6,0.10)';
const AMBER_BORDER = 'rgba(217,119,6,0.22)';
const AMBER_TINT = 'rgba(217,119,6,0.05)';

const GREEN = '#059669';
const GREEN_DIM = 'rgba(5,150,105,0.10)';
const GREEN_BORDER = 'rgba(5,150,105,0.22)';
const GREEN_TINT = 'rgba(5,150,105,0.05)';

/* ── Voice configs ─────────────────────────────────────────────────────── */
interface VoiceConfig {
  id: 'A' | 'B' | 'C';
  label: string;
  name: string;
  description: string;
  color: string;
  dim: string;
  border: string;
  tint: string;
}

const DEFAULT_VOICES: VoiceConfig[] = [
  {
    id: 'A',
    label: 'Voice A',
    name: 'Dr. Sarah Chen, Nursing Faculty',
    description:
      '15 years in the ICU before coming to academia. I speak plainly and don\'t sugarcoat. I use clinical stories constantly. I expect precision — vague answers frustrate me — but I explicitly celebrate when students get something exactly right. Direct and warm.',
    color: BLUE,
    dim: BLUE_DIM,
    border: BLUE_BORDER,
    tint: BLUE_TINT,
  },
  {
    id: 'B',
    label: 'Voice B',
    name: 'Prof. Marcus Webb, Business Faculty',
    description:
      'Former startup founder, 3 exits. I use sports metaphors constantly — mainly basketball. I push every student to name a real company. I\'m impatient with theory for theory\'s sake but very generous with students who take intellectual risks. Fast-paced and energetic.',
    color: AMBER,
    dim: AMBER_DIM,
    border: AMBER_BORDER,
    tint: AMBER_TINT,
  },
  {
    id: 'C',
    label: 'Voice C',
    name: 'Dr. Amara Osei, Sociology Faculty',
    description:
      'Community organizer turned academic. I center lived experience alongside theory. I ask a lot of questions and rarely give answers directly — I guide. I\'m warm, patient, and I never let students forget that ideas have real consequences for real people.',
    color: GREEN,
    dim: GREEN_DIM,
    border: GREEN_BORDER,
    tint: GREEN_TINT,
  },
];

/* ── Student post presets ──────────────────────────────────────────────── */
interface StudentPost {
  id: number;
  label: string;
  topic: string;
  text: string;
}

const STUDENT_POSTS: StudentPost[] = [
  {
    id: 1,
    label: 'Healthcare Communication',
    topic: 'Week discussion: therapeutic communication in nursing',
    text: 'I think communication in healthcare is important because patients need to understand what\'s happening. A nurse should explain things clearly and make sure the patient feels comfortable. Therapeutic communication techniques would help with this.',
  },
  {
    id: 2,
    label: 'Mission vs. Vision',
    topic: 'Week discussion: mission and vision statements in business',
    text: 'Amazon\'s mission is to be the most customer-centric company on Earth. I think this makes their mission and vision basically the same thing since they\'re both about customers. The distinction between mission and vision seems kind of arbitrary to me.',
  },
  {
    id: 3,
    label: 'Political Polarization',
    topic: 'Week discussion: social media and political polarization',
    text: 'Social media probably does increase political polarization because the algorithm shows you content you agree with. People stop seeing other perspectives and just stay in their echo chambers.',
  },
];

/* ── Types ─────────────────────────────────────────────────────────────── */
type ReplyState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'done'; text: string }
  | { status: 'error'; message: string };

interface ColumnState {
  voice: VoiceConfig;
  editingDesc: boolean;
  editedDesc: string;
  reply: ReplyState;
  copied: boolean;
}

/* ── Skeleton ──────────────────────────────────────────────────────────── */
function LoadingSkeleton() {
  return (
    <div className="space-y-2 pt-1">
      {[80, 95, 70, 85, 60].map((w, i) => (
        <div
          key={i}
          className="h-3 rounded-full animate-pulse"
          style={{ width: `${w}%`, background: 'rgba(0,0,0,0.07)' }}
        />
      ))}
    </div>
  );
}

/* ── CopyButton ────────────────────────────────────────────────────────── */
function CopyButton({ text, color }: { text: string; color: string }) {
  const [copied, setCopied] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:-translate-y-px"
      style={{
        background: copied ? `${color}18` : 'rgba(0,0,0,0.04)',
        border: `1px solid ${copied ? color + '40' : 'rgba(0,0,0,0.07)'}`,
        color: copied ? color : '#64748b',
      }}
    >
      {copied ? <Check size={11} /> : <Copy size={11} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

/* ── ReplyColumn ───────────────────────────────────────────────────────── */
function ReplyColumn({ col }: { col: ColumnState }) {
  const { voice, reply } = col;

  return (
    <div
      className="flex flex-col rounded-2xl border overflow-hidden"
      style={{
        background: `rgba(241,243,248,0.95)`,
        borderColor: reply.status === 'done' ? voice.border : 'rgba(0,0,0,0.07)',
        boxShadow: reply.status === 'done' ? `0 0 0 1px ${voice.border}` : 'none',
      }}
    >
      {/* Column header */}
      <div
        className="px-4 py-3 border-b"
        style={{ background: voice.tint, borderColor: 'rgba(0,0,0,0.06)' }}
      >
        <div className="flex items-center gap-2 mb-1">
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-black"
            style={{ background: voice.dim, color: voice.color, border: `1px solid ${voice.border}` }}
          >
            {voice.id}
          </div>
          <span className="text-xs font-black uppercase tracking-widest" style={{ color: voice.color }}>
            {voice.label}
          </span>
        </div>
        <p className="text-sm font-semibold text-molted-white leading-snug">{voice.name}</p>
        <p className="text-xs text-molted-muted mt-1 line-clamp-2 leading-relaxed">{col.editedDesc}</p>
      </div>

      {/* Reply body */}
      <div className="flex-1 p-4 min-h-[200px]">
        {reply.status === 'idle' && (
          <p className="text-xs text-molted-muted opacity-40 italic pt-2">
            Reply will appear here after generating.
          </p>
        )}
        {reply.status === 'loading' && <LoadingSkeleton />}
        {reply.status === 'error' && (
          <p className="text-xs text-red-400 leading-relaxed">{reply.message}</p>
        )}
        {reply.status === 'done' && (
          <p className="text-sm text-molted-muted leading-relaxed">{reply.text}</p>
        )}
      </div>

      {/* Footer */}
      {reply.status === 'done' && (
        <div
          className="px-4 py-3 border-t flex items-center justify-between"
          style={{ borderColor: 'rgba(0,0,0,0.06)' }}
        >
          <div
            className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold"
            style={{ background: voice.dim, color: voice.color, border: `1px solid ${voice.border}` }}
          >
            <Sparkles size={9} />
            {voice.name.split(',')[0]}
          </div>
          <CopyButton text={reply.text} color={voice.color} />
        </div>
      )}
    </div>
  );
}

/* ── Analysis differences ──────────────────────────────────────────────── */
interface AnalysisDimension {
  dimension: string;
  voiceA: string;
  voiceB: string;
  voiceC: string;
}

const ANALYSIS_DIMENSIONS: AnalysisDimension[] = [
  {
    dimension: 'Tone',
    voiceA: 'Direct and clinically precise — affirms clearly when something is right, pushes when it\'s vague.',
    voiceB: 'High-energy and challenge-forward — treats ideas like a fast break, keeps the student moving.',
    voiceC: 'Warm and deliberate — never rushed, every response feels like a conversation, not a correction.',
  },
  {
    dimension: 'Vocabulary',
    voiceA: 'Medical and procedural language. Words like "evidence," "mechanism," and "outcomes" appear naturally.',
    voiceB: 'Business vernacular and sports idiom. "Play," "move," "real-world," "company" — concrete and transactional.',
    voiceC: 'Social and relational language. "Community," "experience," "people," "consequences" — humanizing.',
  },
  {
    dimension: 'Analogies & stories',
    voiceA: 'Clinical anecdotes from the ICU — patient scenarios used to illustrate abstract concepts.',
    voiceB: 'Sports metaphors (basketball-heavy) and startup war stories. Success and failure as game frames.',
    voiceC: 'Community organizing examples and stories from lived civic experience. People as the unit of analysis.',
  },
  {
    dimension: 'Question style',
    voiceA: 'Focused and specific: "What would you do differently?" Expects a precise answer, not reflection.',
    voiceB: 'Challenge-framed: "Name a company that did this." Forces application, not elaboration.',
    voiceC: 'Open and guiding: "What do you think that means for...?" Invites the student to arrive at the answer.',
  },
];

/* ── Main component ────────────────────────────────────────────────────── */
export default function VoiceABDemo() {
  const [selectedPostIdx, setSelectedPostIdx] = useState(0);
  const [customPost, setCustomPost] = useState('');
  const [useCustomPost, setUseCustomPost] = useState(false);
  const [generating, setGenerating] = useState(false);

  const [columns, setColumns] = useState<ColumnState[]>(
    DEFAULT_VOICES.map(v => ({
      voice: v,
      editingDesc: false,
      editedDesc: v.description,
      reply: { status: 'idle' },
      copied: false,
    }))
  );

  const activePost = useCustomPost
    ? customPost
    : STUDENT_POSTS[selectedPostIdx].text;

  const activeTopic = useCustomPost
    ? 'Week discussion: [custom topic]'
    : STUDENT_POSTS[selectedPostIdx].topic;

  const allDone = columns.every(c => c.reply.status === 'done');
  const anyLoading = columns.some(c => c.reply.status === 'loading');

  function updateColumn(idx: number, patch: Partial<ColumnState>) {
    setColumns(prev => prev.map((c, i) => (i === idx ? { ...c, ...patch } : c)));
  }

  function updateReply(idx: number, reply: ReplyState) {
    setColumns(prev => prev.map((c, i) => (i === idx ? { ...c, reply } : c)));
  }

  async function handleGenerate() {
    if (generating || !activePost.trim()) return;
    setGenerating(true);

    // Mark all columns as loading immediately
    setColumns(prev => prev.map(c => ({ ...c, reply: { status: 'loading' } })));

    const calls = columns.map((col, idx) =>
      fetch('/api/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: activeTopic,
          studentPost: activePost.trim(),
          courseId: 'voice-ab-demo',
          voice: col.editedDesc,
        }),
      })
        .then(async res => {
          const data = await res.json();
          if (!res.ok) {
            updateReply(idx, { status: 'error', message: data.error ?? 'API error.' });
            return;
          }
          if (data.type === 'reply') {
            updateReply(idx, { status: 'done', text: data.content });
          } else if (data.type === 'flag') {
            updateReply(idx, { status: 'done', text: `[Flagged: ${data.reason}]` });
          } else {
            updateReply(idx, { status: 'done', text: '[No response needed for this post.]' });
          }
        })
        .catch(() => {
          updateReply(idx, { status: 'error', message: 'Request failed. Is the backend running?' });
        })
    );

    await Promise.allSettled(calls);
    setGenerating(false);
  }

  function handleReset() {
    setColumns(prev => prev.map(c => ({ ...c, reply: { status: 'idle' } })));
  }

  return (
    <MoltLMSLayout>
      {/* Page-level top bar */}
      <div className="border-b border-molted-border" style={{ background: 'rgba(0,0,0,0.30)', marginTop: 64 }}>
        <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-widest text-blue-400">Forge · Voice A/B Demo</span>
          </div>
          <Link
            to="/forge"
            className="text-[11px] font-semibold text-molted-muted hover:text-molted-white transition-colors flex items-center gap-1"
          >
            See Forge <ArrowRight size={10} />
          </Link>
        </div>
      </div>

      <div className="min-h-screen pb-32 px-6 pt-10">
        <div className="max-w-7xl mx-auto">

          {/* Back nav */}
          <Link
            to="/forge"
            className="inline-flex items-center gap-1.5 text-molted-muted text-sm hover:text-molted-white transition-colors mb-8"
          >
            <ChevronLeft size={14} />
            Forge
          </Link>

          {/* Hero header */}
          <div className="mb-12">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ background: BLUE_DIM, color: BLUE, border: `1px solid ${BLUE_BORDER}` }}
            >
              <Mic size={12} />
              Voice A/B Comparison
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-molted-white tracking-tight leading-tight mb-4">
              Forge has no voice of its own.
              <br />
              <span style={{ color: BLUE }}>It borrows yours.</span>
            </h1>
            <p className="text-molted-muted text-lg leading-relaxed max-w-2xl">
              The same student post. Three different faculty. Watch how radically the replies change —
              same AI, same post, three completely different humans behind the keyboard.
            </p>
          </div>

          {/* ── Two-column layout ─────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start">

            {/* LEFT PANEL — Inputs */}
            <div className="space-y-6 lg:sticky lg:top-24">

              {/* Student post selector */}
              <div
                className="rounded-2xl border overflow-hidden"
                style={{ background: 'rgba(241,243,248,0.95)', borderColor: 'rgba(0,0,0,0.07)' }}
              >
                <div className="px-5 py-4 border-b" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                  <p className="text-sm font-semibold text-molted-white">Student post</p>
                  <p className="text-xs text-molted-muted mt-0.5">All three voices will reply to this post.</p>
                </div>

                <div className="p-4 space-y-2">
                  {STUDENT_POSTS.map((post, i) => (
                    <button
                      key={post.id}
                      onClick={() => { setSelectedPostIdx(i); setUseCustomPost(false); handleReset(); }}
                      className="w-full text-left p-3 rounded-xl border transition-all duration-200"
                      style={{
                        background: !useCustomPost && selectedPostIdx === i ? BLUE_DIM : 'rgba(0,0,0,0.03)',
                        borderColor: !useCustomPost && selectedPostIdx === i ? BLUE_BORDER : 'rgba(0,0,0,0.06)',
                      }}
                    >
                      <p
                        className="text-xs font-semibold mb-1"
                        style={{ color: !useCustomPost && selectedPostIdx === i ? BLUE : '#86868B' }}
                      >
                        Post {post.id} — {post.label}
                      </p>
                      <p className="text-xs text-molted-muted line-clamp-2 leading-relaxed">{post.text}</p>
                    </button>
                  ))}

                  {/* Custom post */}
                  <div>
                    <button
                      onClick={() => { setUseCustomPost(true); handleReset(); }}
                      className="w-full text-left p-3 rounded-xl border transition-all duration-200 mb-2"
                      style={{
                        background: useCustomPost ? BLUE_DIM : 'rgba(0,0,0,0.03)',
                        borderColor: useCustomPost ? BLUE_BORDER : 'rgba(0,0,0,0.06)',
                      }}
                    >
                      <p
                        className="text-xs font-semibold"
                        style={{ color: useCustomPost ? BLUE : '#86868B' }}
                      >
                        Paste your own post
                      </p>
                    </button>
                    {useCustomPost && (
                      <textarea
                        value={customPost}
                        onChange={e => setCustomPost(e.target.value)}
                        placeholder="Paste a student discussion post here..."
                        rows={4}
                        className="w-full rounded-xl border text-sm text-molted-muted leading-relaxed resize-none p-3 focus:outline-none transition-colors"
                        style={{
                          background: 'rgba(248,249,252,0.97)',
                          borderColor: customPost.length > 0 ? BLUE_BORDER : 'rgba(0,0,0,0.07)',
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Faculty voice slots */}
              <div
                className="rounded-2xl border overflow-hidden"
                style={{ background: 'rgba(241,243,248,0.95)', borderColor: 'rgba(0,0,0,0.07)' }}
              >
                <div className="px-5 py-4 border-b" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                  <p className="text-sm font-semibold text-molted-white">Faculty voices</p>
                  <p className="text-xs text-molted-muted mt-0.5">Edit any voice description to see how the reply changes.</p>
                </div>

                <div className="p-4 space-y-3">
                  {columns.map((col, idx) => (
                    <div
                      key={col.voice.id}
                      className="rounded-xl border overflow-hidden"
                      style={{
                        background: col.voice.tint,
                        borderColor: col.voice.border,
                      }}
                    >
                      <div className="px-3 py-2.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black"
                            style={{ background: col.voice.dim, color: col.voice.color, border: `1px solid ${col.voice.border}` }}
                          >
                            {col.voice.id}
                          </div>
                          <div>
                            <span className="text-xs font-bold" style={{ color: col.voice.color }}>
                              {col.voice.label}
                            </span>
                            <span className="text-xs text-molted-muted ml-1.5 hidden sm:inline">
                              — {col.voice.name.split(',')[0]}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => updateColumn(idx, { editingDesc: !col.editingDesc })}
                          className="text-[11px] font-semibold transition-colors"
                          style={{ color: col.editingDesc ? col.voice.color : '#64748b' }}
                        >
                          {col.editingDesc ? 'Done' : 'Change'}
                        </button>
                      </div>

                      {col.editingDesc ? (
                        <div className="px-3 pb-3">
                          <textarea
                            value={col.editedDesc}
                            onChange={e => updateColumn(idx, { editedDesc: e.target.value })}
                            rows={4}
                            className="w-full rounded-lg border text-xs text-molted-muted leading-relaxed resize-none p-2.5 focus:outline-none transition-colors"
                            style={{
                              background: 'rgba(248,249,252,0.97)',
                              borderColor: col.voice.border,
                            }}
                          />
                        </div>
                      ) : (
                        <div className="px-3 pb-3">
                          <p className="text-[11px] text-molted-muted leading-relaxed line-clamp-2">
                            {col.editedDesc}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Generate button */}
              <button
                onClick={allDone ? handleReset : handleGenerate}
                disabled={anyLoading || (useCustomPost && !customPost.trim())}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-sm font-black transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-px"
                style={{
                  background: allDone
                    ? 'rgba(0,0,0,0.06)'
                    : `linear-gradient(120deg, ${BLUE}, #1E3A8A)`,
                  color: allDone ? '#64748b' : '#fff',
                  border: allDone ? '1px solid rgba(0,0,0,0.08)' : 'none',
                }}
              >
                {anyLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Generating...
                  </>
                ) : allDone ? (
                  <>
                    <RefreshCw size={15} />
                    Reset &amp; try again
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Generate all 3
                    <ArrowRight size={14} />
                  </>
                )}
              </button>

              {(useCustomPost && !customPost.trim()) && (
                <p className="text-xs text-molted-muted text-center -mt-3 opacity-60">
                  Paste a student post above to continue.
                </p>
              )}
            </div>

            {/* RIGHT PANEL — Results */}
            <div className="space-y-8">

              {/* Three reply columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {columns.map(col => (
                  <ReplyColumn key={col.voice.id} col={col} />
                ))}
              </div>

              {/* "What's different?" analysis */}
              {allDone && (
                <div
                  className="rounded-2xl border overflow-hidden"
                  style={{ background: 'rgba(241,243,248,0.95)', borderColor: 'rgba(0,0,0,0.07)' }}
                >
                  <div
                    className="px-5 py-4 border-b flex items-center gap-2"
                    style={{ borderColor: 'rgba(0,0,0,0.06)', background: 'rgba(0,0,0,0.03)' }}
                  >
                    <Sparkles size={14} style={{ color: BLUE }} />
                    <p className="text-sm font-semibold text-molted-white">What's different?</p>
                    <span className="text-xs text-molted-muted ml-1">Key stylistic differences across the three voices</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                      <thead>
                        <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                          <th className="text-left px-5 py-3 text-xs font-semibold text-molted-muted w-32">Dimension</th>
                          {columns.map(col => (
                            <th key={col.voice.id} className="text-left px-4 py-3 text-xs font-semibold" style={{ color: col.voice.color }}>
                              {col.voice.label} — {col.voice.name.split(',')[0]}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {ANALYSIS_DIMENSIONS.map((row, i) => (
                          <tr
                            key={row.dimension}
                            style={{
                              borderBottom: i < ANALYSIS_DIMENSIONS.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                            }}
                          >
                            <td className="px-5 py-4 text-xs font-bold text-molted-white align-top whitespace-nowrap">
                              {row.dimension}
                            </td>
                            <td className="px-4 py-4 text-xs text-molted-muted leading-relaxed align-top"
                              style={{ background: BLUE_TINT }}>
                              {row.voiceA}
                            </td>
                            <td className="px-4 py-4 text-xs text-molted-muted leading-relaxed align-top"
                              style={{ background: AMBER_TINT }}>
                              {row.voiceB}
                            </td>
                            <td className="px-4 py-4 text-xs text-molted-muted leading-relaxed align-top"
                              style={{ background: GREEN_TINT }}>
                              {row.voiceC}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Footer insight */}
                  <div
                    className="px-5 py-4 border-t"
                    style={{ borderColor: 'rgba(0,0,0,0.06)', background: 'rgba(0,0,0,0.02)' }}
                  >
                    <p className="text-xs text-molted-muted leading-relaxed max-w-2xl">
                      <span className="font-semibold text-molted-white">The model didn't change.</span>{' '}
                      The student post didn't change. Only the faculty voice description changed —
                      and yet the replies read as if three completely different humans wrote them.
                      That's what Forge does: it amplifies <em>your</em> pedagogy, not a generic AI's.
                    </p>
                  </div>
                </div>
              )}

              {/* Idle state prompt */}
              {columns.every(c => c.reply.status === 'idle') && (
                <div
                  className="rounded-2xl border p-10 flex flex-col items-center justify-center text-center"
                  style={{ borderColor: 'rgba(0,0,0,0.06)', background: 'rgba(241,243,248,0.60)', borderStyle: 'dashed' }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: BLUE_DIM, border: `1px solid ${BLUE_BORDER}` }}
                  >
                    <Mic size={22} style={{ color: BLUE }} />
                  </div>
                  <p className="text-sm font-semibold text-molted-white mb-1">Three voices, one post</p>
                  <p className="text-xs text-molted-muted max-w-xs leading-relaxed">
                    Select a student post, review the faculty voice descriptions, then hit <strong className="text-molted-white">Generate all 3</strong> to see Forge match each voice in parallel.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom CTA */}
          <div
            className="mt-16 rounded-2xl border p-8 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{ background: 'rgba(37,99,235,0.06)', borderColor: BLUE_BORDER }}
          >
            <div>
              <p className="text-sm font-black text-molted-white mb-1">Ready to set up your own voice?</p>
              <p className="text-xs text-molted-muted leading-relaxed max-w-md">
                Forge learns from a short description you write once. It uses it every time it drafts a reply — in every course, every week, every student.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link
                to="/forge"
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-molted-muted border transition-all hover:-translate-y-px"
                style={{ borderColor: 'rgba(255,255,255,0.10)', background: 'rgba(255,255,255,0.04)' }}
              >
                Learn about Forge
              </Link>
              <a
                href="mailto:greg.lucas@paigebreaker.com"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-px"
                style={{ background: `linear-gradient(120deg, ${BLUE}, #1E3A8A)` }}
              >
                Get started
                <ArrowRight size={14} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </MoltLMSLayout>
  );
}
