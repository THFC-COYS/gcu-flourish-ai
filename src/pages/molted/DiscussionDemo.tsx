import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft, Send, Loader2, User, Sparkles, RotateCcw, Copy, Check, ArrowRight,
} from 'lucide-react';
import MoltLMSLayout from './MoltedLayout';

/* ── Constants ──────────────────────────────────────────────────────────── */
const TEAL = '#2563EB';
const TEAL_DIM = 'rgba(37,99,235,0.12)';
const TEAL_BORDER = 'rgba(37,99,235,0.25)';

/* ── Subject data ────────────────────────────────────────────────────────── */
const SUBJECTS = [
  {
    id: 'nursing',
    code: 'NUR 101',
    label: 'Nursing Fundamentals',
    week: 'Week 2 Discussion',
    instructor: 'Dr. Ramirez',
    initials: 'JR',
    prompt:
      "Describe a situation where a nurse's communication style could directly affect patient outcomes. What communication principles would you apply, and why do they matter in a clinical setting?",
    defaultPost:
      "I think communication is really important in nursing. If a nurse doesn't explain things clearly the patient might not follow their care plan. I would use therapeutic communication and speak plainly so the patient understands everything before they leave.",
    voice:
      "ICU nurse turned professor. 15 years clinical before academia. Speaks plainly, uses real patient scenarios. Expects precision but celebrates intellectual risk-taking.",
  },
  {
    id: 'psychology',
    code: 'PSY 220',
    label: 'Human Development',
    week: 'Week 5 Discussion',
    instructor: 'Prof. Chen',
    initials: 'MC',
    prompt:
      "Reflect on Erikson's stages of psychosocial development. Which stage do you think has the most lasting impact on adult identity, and why? Support your answer with a real-world example.",
    defaultPost:
      "I think the Identity vs. Role Confusion stage has the biggest impact because that's when you figure out who you really are. If you don't resolve it you spend your whole adult life unsure of what you want. I've seen this with my older brother who still doesn't know what career he wants at 28.",
    voice:
      "Former high school counselor turned professor, 8 years teaching. Uses outdoors analogies — 'growth is like a trail.' Warm but direct. Dislikes generic textbook answers.",
  },
  {
    id: 'business',
    code: 'BUS 101',
    label: 'Intro to Business',
    week: 'Week 3 Discussion',
    instructor: 'Prof. Williams',
    initials: 'TW',
    prompt:
      "Explain the difference between a company's mission statement and its vision statement. Choose a real company and critique whether their published mission and vision are effective. Be specific.",
    defaultPost:
      "I looked up Nike's mission — 'to bring inspiration and innovation to every athlete in the world.' Their vision is about being the best athletic company. I think the mission is what you do daily and the vision is the long-term destination.",
    voice:
      "Former startup founder turned business professor. Uses sports metaphors constantly. Pushes students to apply concepts to real companies. Generous with original thinkers.",
  },
];

/* ── CopyButton ─────────────────────────────────────────────────────────── */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1800); }}
      className="flex items-center gap-1.5 text-xs transition-colors px-2.5 py-1 rounded-lg"
      style={{
        background: copied ? TEAL_DIM : 'rgba(148,163,184,0.08)',
        color: copied ? TEAL : '#94A3B8',
        border: `1px solid ${copied ? TEAL_BORDER : 'rgba(148,163,184,0.12)'}`,
      }}
    >
      {copied ? <Check size={11} /> : <Copy size={11} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════════════ */

export default function DiscussionDemo() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [studentPost, setStudentPost] = useState(SUBJECTS[0].defaultPost);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullReply, setFullReply] = useState<string | null>(null);
  const [displayedReply, setDisplayedReply] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const replyRef = useRef<HTMLDivElement>(null);

  const subject = SUBJECTS[selectedIdx];

  /* Character-by-character streaming animation */
  useEffect(() => {
    if (!fullReply) return;
    setIsStreaming(true);
    setDisplayedReply('');
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayedReply(fullReply.slice(0, i));
      if (i >= fullReply.length) {
        setIsStreaming(false);
        clearInterval(interval);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [fullReply]);

  /* Auto-scroll reply into view while streaming */
  useEffect(() => {
    if (isStreaming && replyRef.current) {
      replyRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [isStreaming]);

  async function handleSubmit() {
    if (studentPost.trim().length < 10 || loading) return;
    setSubmitted(true);
    setLoading(true);
    setFullReply(null);
    setDisplayedReply('');
    setError(null);

    try {
      const res = await fetch('/api/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: subject.prompt,
          studentPost,
          voice: subject.voice,
          courseId: 'discussion-demo',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Agent failed. Is the backend running?');
        return;
      }

      if (data.type === 'reply') {
        setFullReply(data.content);
      } else if (data.type === 'flag') {
        setFullReply(`[Flagged for instructor review: ${data.reason}]`);
      } else {
        setFullReply('[Agent decided no response needed for this post.]');
      }
    } catch {
      setError('Network error — check your connection.');
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setSubmitted(false);
    setFullReply(null);
    setDisplayedReply('');
    setIsStreaming(false);
    setError(null);
  }

  function handleSubjectChange(idx: number) {
    setSelectedIdx(idx);
    setStudentPost(SUBJECTS[idx].defaultPost);
    setSubmitted(false);
    setFullReply(null);
    setDisplayedReply('');
    setIsStreaming(false);
    setError(null);
  }

  const ready = studentPost.trim().length > 10 && !loading;

  return (
    <MoltLMSLayout>
      <div className="min-h-screen pt-24 pb-24 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="mb-10">
            <Link to="/teachos"
              className="inline-flex items-center gap-1.5 text-molted-muted text-sm hover:text-molted-white transition-colors mb-6">
              <ChevronLeft size={14} />
              Forge
            </Link>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#34D399' }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#34D399' }}>Live Demo</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-molted-white tracking-tight">
              You're the student.
            </h1>
            <p className="mt-3 text-molted-muted text-base leading-relaxed">
              Pick a class, respond to the discussion question, and watch your instructor reply — instantly.
            </p>
          </div>

          {/* Subject selector */}
          <div className="flex gap-3 mb-8 flex-wrap">
            {SUBJECTS.map((s, i) => (
              <button key={s.id} onClick={() => handleSubjectChange(i)}
                className="flex flex-col items-start px-4 py-3 rounded-2xl border text-left transition-all duration-200"
                style={{
                  background: selectedIdx === i ? TEAL_DIM : 'rgba(248,249,252,0.85)',
                  borderColor: selectedIdx === i ? TEAL_BORDER : 'rgba(0,0,0,0.06)',
                  boxShadow: selectedIdx === i ? `0 0 0 1px ${TEAL_BORDER}` : 'none',
                }}>
                <span className="text-xs font-bold mb-0.5"
                  style={{ color: selectedIdx === i ? TEAL : '#64748B' }}>
                  {s.code}
                </span>
                <span className="text-xs font-medium"
                  style={{ color: selectedIdx === i ? '#CBD5E1' : '#94A3B8' }}>
                  {s.label}
                </span>
              </button>
            ))}
          </div>

          {/* Discussion thread */}
          <div className="space-y-3">

            {/* Faculty prompt */}
            <div className="rounded-3xl border p-6"
              style={{ background: 'rgba(241,243,248,0.90)', borderColor: 'rgba(0,0,0,0.06)' }}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black"
                  style={{ background: TEAL, color: '#ffffff' }}>
                  {subject.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-sm font-bold text-molted-white">{subject.instructor}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                      style={{ background: TEAL_DIM, color: TEAL, border: `1px solid ${TEAL_BORDER}` }}>
                      Instructor
                    </span>
                    <span className="text-xs text-molted-muted ml-auto">{subject.week}</span>
                  </div>
                  <p className="text-sm text-molted-white/90 leading-relaxed">{subject.prompt}</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 px-2">
              <div className="flex-1 h-px" style={{ background: 'rgba(148,163,184,0.10)' }} />
              <span className="text-xs text-molted-subtle">Your response</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(148,163,184,0.10)' }} />
            </div>

            {/* Student input */}
            {!submitted ? (
              <div className="rounded-3xl border p-6"
                style={{ background: 'rgba(241,243,248,0.90)', borderColor: 'rgba(0,0,0,0.06)' }}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(148,163,184,0.15)' }}>
                    <User size={16} className="text-molted-muted" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-bold text-molted-white">You</span>
                      <span className="text-xs text-molted-muted">· Student</span>
                      <span className="text-xs text-molted-subtle ml-auto">Edit to try your own</span>
                    </div>
                    <textarea
                      value={studentPost}
                      onChange={e => setStudentPost(e.target.value)}
                      rows={5}
                      placeholder="Type your discussion response..."
                      className="w-full rounded-2xl border text-sm leading-relaxed resize-none p-4 focus:outline-none transition-colors"
                      style={{
                        background: 'rgba(15,20,40,0.6)',
                        borderColor: studentPost.length > 0 ? TEAL_BORDER : 'rgba(148,163,184,0.15)',
                        color: '#CBD5E1',
                      }}
                    />
                    <div className="mt-3 flex justify-end">
                      <button onClick={handleSubmit} disabled={!ready}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 hover:-translate-y-px"
                        style={{
                          background: ready ? TEAL : 'rgba(148,163,184,0.12)',
                          color: ready ? '#ffffff' : '#64748B',
                          cursor: ready ? 'pointer' : 'not-allowed',
                        }}>
                        <Send size={14} />
                        Post Response
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Submitted student post */}
                <div className="rounded-3xl border p-6"
                  style={{ background: 'rgba(241,243,248,0.90)', borderColor: 'rgba(0,0,0,0.06)' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(148,163,184,0.15)' }}>
                      <User size={16} className="text-molted-muted" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-bold text-molted-white">You</span>
                        <span className="text-xs text-molted-muted">· just now</span>
                      </div>
                      <p className="text-sm text-molted-white/85 leading-relaxed">{studentPost}</p>
                    </div>
                  </div>
                </div>

                {/* Instructor reply */}
                <div ref={replyRef} className="rounded-3xl border p-6 transition-all duration-300"
                  style={{
                    background: loading ? 'rgba(37,99,235,0.04)' : 'rgba(20,40,100,0.80)',
                    borderColor: TEAL_BORDER,
                    boxShadow: loading ? 'none' : `0 0 0 1px ${TEAL_BORDER}`,
                  }}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black transition-all"
                      style={{ background: loading ? 'rgba(37,99,235,0.25)' : TEAL, color: loading ? TEAL : '#ffffff' }}>
                      {loading
                        ? <Loader2 size={15} className="animate-spin" />
                        : subject.initials}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-sm font-bold"
                          style={{ color: loading ? '#64748B' : '#E2E8F0' }}>
                          {subject.instructor}
                        </span>
                        {loading ? (
                          <span className="text-xs text-molted-muted animate-pulse">is responding…</span>
                        ) : (
                          <>
                            <span className="text-xs text-molted-muted">· just now</span>
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                              style={{ background: TEAL_DIM, color: TEAL, border: `1px solid ${TEAL_BORDER}` }}>
                              <Sparkles size={9} />
                              Forge
                            </span>
                          </>
                        )}
                      </div>

                      {/* Typing dots */}
                      {loading && (
                        <div className="flex gap-1.5 pt-1">
                          <span className="w-2 h-2 rounded-full animate-bounce"
                            style={{ background: TEAL, animationDelay: '0ms' }} />
                          <span className="w-2 h-2 rounded-full animate-bounce"
                            style={{ background: TEAL, animationDelay: '150ms' }} />
                          <span className="w-2 h-2 rounded-full animate-bounce"
                            style={{ background: TEAL, animationDelay: '300ms' }} />
                        </div>
                      )}

                      {/* Streamed reply text */}
                      {displayedReply && (
                        <p className="text-sm leading-relaxed" style={{ color: '#F1F5F9' }}>
                          {displayedReply}
                          {isStreaming && (
                            <span className="inline-block w-0.5 h-4 ml-0.5 align-middle animate-pulse"
                              style={{ background: TEAL }} />
                          )}
                        </p>
                      )}

                      {error && (
                        <p className="text-sm text-red-400">{error}</p>
                      )}

                      {/* Actions after reply finishes */}
                      {fullReply && !isStreaming && (
                        <div className="mt-4 flex items-center gap-3">
                          <CopyButton text={fullReply} />
                          <button onClick={handleReset}
                            className="flex items-center gap-1.5 text-xs text-molted-muted hover:text-molted-white transition-colors">
                            <RotateCcw size={11} />
                            Try a different response
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer nudge */}
          <div className="mt-16 rounded-3xl p-8 border text-center"
            style={{ background: 'rgba(241,243,248,0.90)', borderColor: 'rgba(0,0,0,0.06)' }}>
            <p className="text-molted-muted text-sm mb-1">This is Forge Discussion Intelligence — beta.</p>
            <p className="text-molted-white font-semibold mb-5">
              Next: LMS integration so you never have to paste again.
            </p>
            <a href="mailto:greg.lucas@paigebreaker.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:-translate-y-px"
              style={{ background: TEAL, color: '#ffffff' }}>
              Join the early access list
              <ArrowRight size={14} />
            </a>
          </div>

        </div>
      </div>
    </MoltLMSLayout>
  );
}
