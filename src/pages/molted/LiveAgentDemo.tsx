import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Send, Bot, User, Loader2, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import MoltedLayout from './MoltedLayout';

const TEAL = '#2DD4BF';
const TEAL_DIM = 'rgba(45,212,191,0.10)';
const TEAL_BORDER = 'rgba(45,212,191,0.22)';
const AMBER = '#F5B740';
const AMBER_DIM = 'rgba(245,183,64,0.10)';
const AMBER_BORDER = 'rgba(245,183,64,0.22)';

const SAMPLE_PROMPTS = [
  {
    topic: 'Human Development',
    prompt: 'Week 5 Discussion: Reflect on Erikson\'s stages of psychosocial development. Which stage do you think has the most lasting impact on adult identity, and why? Use at least one real-world example to support your argument.',
  },
  {
    topic: 'Intro to Business',
    prompt: 'Week 3 Discussion: In your own words, explain the difference between a company\'s mission statement and its vision statement. Why does the distinction matter? Find a real company and critique whether their published mission and vision are effective.',
  },
  {
    topic: 'Nursing Fundamentals',
    prompt: 'Week 2 Discussion: Describe a situation (real or hypothetical) where a nurse\'s communication style could directly affect patient outcomes. What communication principles would you apply, and why?',
  },
];

export default function LiveAgentDemo() {
  const [voiceOpen, setVoiceOpen] = useState(true);
  const [voice, setVoice] = useState('');
  const [selectedPromptIdx, setSelectedPromptIdx] = useState(0);
  const [studentPost, setStudentPost] = useState('');
  const [reply, setReply] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const replyRef = useRef<HTMLDivElement>(null);

  const selected = SAMPLE_PROMPTS[selectedPromptIdx];

  async function handleSubmit() {
    if (!studentPost.trim() || loading) return;
    setLoading(true);
    setError(null);
    setReply(null);

    try {
      const res = await fetch('/api/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: selected.prompt,
          studentPost: studentPost.trim(),
          courseId: `demo-${selected.topic.replace(/\s+/g, '-').toLowerCase()}`,
          voice: voice.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Agent failed. Is the backend running?');
        return;
      }

      if (data.type === 'reply') {
        setReply(data.content);
        setTimeout(() => replyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      } else if (data.type === 'flag') {
        setReply(`[Flagged for instructor review: ${data.reason}]`);
      } else {
        setReply('[Agent decided no response needed for this post.]');
      }
    } catch {
      setError('Network error — make sure the agent backend is running on port 3001.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <MoltedLayout>
      <div className="min-h-screen pt-24 pb-32 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Back nav */}
          <Link
            to="/molted/forge"
            className="inline-flex items-center gap-1.5 text-molted-muted text-sm hover:text-molted-white transition-colors mb-8"
          >
            <ChevronLeft size={14} />
            Forge
          </Link>

          {/* Header */}
          <div className="mb-10">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ background: TEAL_DIM, color: TEAL, border: `1px solid ${TEAL_BORDER}` }}
            >
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: TEAL }} />
              Live Agent Demo
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-molted-white tracking-tight leading-tight mb-3">
              Watch the agent reply.
            </h1>
            <p className="text-molted-muted text-lg leading-relaxed">
              Student posts to a discussion. Agent responds in real time — in your voice.
            </p>
          </div>

          {/* Instructor voice setup */}
          <div
            className="rounded-2xl border mb-6 overflow-hidden"
            style={{ borderColor: voice.trim() ? TEAL_BORDER : 'rgba(255,255,255,0.08)', background: 'rgba(17,17,24,0.8)' }}
          >
            <button
              onClick={() => setVoiceOpen(v => !v)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <div>
                <p className="text-molted-white text-sm font-semibold">
                  Your voice{' '}
                  <span className="text-molted-subtle font-normal">(optional)</span>
                </p>
                <p className="text-molted-muted text-xs mt-0.5">
                  The agent will respond in your style, referencing your background and interests.
                </p>
              </div>
              {voiceOpen
                ? <ChevronUp size={16} className="text-molted-muted flex-shrink-0" />
                : <ChevronDown size={16} className="text-molted-muted flex-shrink-0" />
              }
            </button>
            {voiceOpen && (
              <div className="px-5 pb-5">
                <textarea
                  value={voice}
                  onChange={e => setVoice(e.target.value)}
                  placeholder="e.g. I've been teaching human development for 8 years. Former high school counselor turned professor. I love hiking and always use outdoors analogies — 'personal growth is like a trail: you don't see the summit until you're halfway up.' I'm warm but direct. I hate generic textbook answers. I want students to connect theory to their own lives."
                  rows={4}
                  className="w-full rounded-xl border text-sm text-molted-muted leading-relaxed resize-none p-3 focus:outline-none transition-colors"
                  style={{
                    background: 'rgba(10,10,15,0.9)',
                    borderColor: voice.length > 0 ? TEAL_BORDER : 'rgba(255,255,255,0.08)',
                  }}
                />
              </div>
            )}
          </div>

          {/* Discussion prompt selector */}
          <div className="mb-6">
            <p className="text-molted-muted text-xs font-semibold uppercase tracking-widest mb-3">
              Discussion prompt
            </p>
            <div className="space-y-2">
              {SAMPLE_PROMPTS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => { setSelectedPromptIdx(i); setReply(null); setStudentPost(''); }}
                  className="w-full text-left p-4 rounded-2xl border transition-all duration-200"
                  style={{
                    background: selectedPromptIdx === i ? TEAL_DIM : 'rgba(17,17,24,0.6)',
                    borderColor: selectedPromptIdx === i ? TEAL_BORDER : 'rgba(255,255,255,0.06)',
                  }}
                >
                  <p className="text-xs font-semibold mb-1" style={{ color: selectedPromptIdx === i ? TEAL : '#86868B' }}>
                    {p.topic}
                  </p>
                  <p className="text-molted-muted text-xs leading-relaxed line-clamp-2">{p.prompt}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Thread view */}
          <div
            className="rounded-2xl border overflow-hidden mb-6"
            style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(17,17,24,0.8)' }}
          >
            {/* Thread header */}
            <div className="px-5 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <div className="flex items-center justify-between">
                <p className="text-molted-white text-sm font-semibold">{selected.topic} · Week Discussion</p>
                <div className="flex items-center gap-1.5 text-xs" style={{ color: TEAL }}>
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: TEAL }} />
                  Agent watching
                </div>
              </div>
            </div>

            {/* Instructor prompt post */}
            <div className="p-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <div className="flex gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(232,160,32,0.15)', color: '#E8A020' }}
                >
                  I
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-molted-muted mb-1">Instructor · Discussion Prompt</p>
                  <p className="text-molted-white text-sm leading-relaxed">{selected.prompt}</p>
                </div>
              </div>
            </div>

            {/* Student response input */}
            <div className="p-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <div className="flex gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  <User size={14} className="text-molted-muted" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-molted-muted mb-2">Student</p>
                  <textarea
                    value={studentPost}
                    onChange={e => setStudentPost(e.target.value)}
                    placeholder="Type the student's response here…"
                    rows={4}
                    className="w-full rounded-xl border text-sm text-molted-muted leading-relaxed resize-none p-3 focus:outline-none transition-colors"
                    style={{
                      background: 'rgba(10,10,15,0.9)',
                      borderColor: studentPost.length > 0 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)',
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit();
                    }}
                  />
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-molted-muted text-xs opacity-50">⌘↵ to post</p>
                    <button
                      onClick={handleSubmit}
                      disabled={!studentPost.trim() || loading}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-px"
                      style={{
                        background: studentPost.trim() && !loading ? TEAL : 'rgba(45,212,191,0.15)',
                        color: studentPost.trim() && !loading ? '#0A0A0F' : TEAL,
                      }}
                    >
                      {loading
                        ? <><Loader2 size={14} className="animate-spin" /> Agent thinking…</>
                        : <><Send size={14} /> Post Response</>
                      }
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Agent reply */}
            {(reply || loading) && (
              <div className="p-5" ref={replyRef}>
                <div className="flex gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: AMBER_DIM, border: `1px solid ${AMBER_BORDER}` }}
                  >
                    <Bot size={14} style={{ color: AMBER }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-xs font-semibold" style={{ color: AMBER }}>Molt Agent</p>
                      <div
                        className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                        style={{ background: AMBER_DIM, color: AMBER, border: `1px solid ${AMBER_BORDER}` }}
                      >
                        <Sparkles size={9} />
                        AI response
                      </div>
                    </div>
                    {loading && !reply
                      ? (
                        <div className="space-y-2">
                          <div className="h-3 rounded-full w-3/4 animate-pulse" style={{ background: 'rgba(255,255,255,0.06)' }} />
                          <div className="h-3 rounded-full w-5/6 animate-pulse" style={{ background: 'rgba(255,255,255,0.06)' }} />
                          <div className="h-3 rounded-full w-2/3 animate-pulse" style={{ background: 'rgba(255,255,255,0.06)' }} />
                        </div>
                      )
                      : <p className="text-molted-muted text-sm leading-relaxed">{reply}</p>
                    }
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div
              className="rounded-xl border p-4 text-sm mb-6"
              style={{ background: 'rgba(232,23,15,0.08)', borderColor: 'rgba(232,23,15,0.25)', color: '#FF3D35' }}
            >
              {error}
            </div>
          )}

          {/* How to run */}
          <div
            className="rounded-2xl border p-5 text-xs leading-relaxed"
            style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(17,17,24,0.5)', color: '#86868B' }}
          >
            <p className="font-semibold text-molted-muted mb-2">To run this demo locally:</p>
            <code className="block space-y-1" style={{ fontFamily: 'monospace' }}>
              <span className="block">cd molt-agent/agent && npm run dev</span>
              <span className="block text-molted-subtle"># Then reload this page and post a student response</span>
            </code>
          </div>

        </div>
      </div>
    </MoltedLayout>
  );
}
