import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Send, Bot, Loader2, Sparkles, Mic, ChevronDown, ChevronUp, User, Zap } from 'lucide-react';
import MoltLMSLayout from './MoltedLayout';

const TEAL = '#2563EB';
const TEAL_DIM = 'rgba(37,99,235,0.10)';
const TEAL_BORDER = 'rgba(37,99,235,0.22)';
const AMBER = '#94A3B8';
const AMBER_DIM = 'rgba(245,183,64,0.10)';
const AMBER_BORDER = 'rgba(245,183,64,0.22)';

/* ── Sample discussion prompts ─────────────────────────────────────────── */
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

/* ── Starter voice prompts ─────────────────────────────────────────────── */
const VOICE_STARTERS = [
  "I've been teaching human development for 8 years. Former high school counselor turned professor. I love hiking and always use outdoors analogies — \"growth is like a trail, you can't see the summit until you're halfway up.\" Warm but direct. I hate generic textbook answers.",
  "Nursing faculty with 15 years in the ICU before moving to academia. I speak plainly and don't sugarcoat. I use clinical stories constantly. I expect precision but I also tell students when they've done something genuinely right.",
  "Business professor and former startup founder. I use sports metaphors constantly — mainly basketball. I push students to apply everything to a real company. I'm impatient with vague answers but generous with students who take intellectual risks.",
];

const LIVE_DEMOS = [
  { label: 'Forge Voice', href: '/forge/voice-demo', color: '#2563EB', active: true },
  { label: 'Beacon', href: '/beacon/demo', color: '#1E3A8A', pill: 'NEW' },
  { label: 'RetainAI', href: '/retain-ai/demo', color: '#F43F5E', pill: 'NEW' },
  { label: 'OutcomesAI', href: '/outcomes-ai/demo', color: '#0EA5E9', pill: 'NEW' },
  { label: 'ProofAI', href: '/proof-ai/demo', color: '#7C3AED', pill: 'NEW' },
  { label: 'Lumen', href: '/lumen/demo', color: '#7B61FF' },
  { label: 'Discussion', href: '/forge/discussion', color: '#2563EB' },
  { label: 'Agentic Grader', href: '/forge/agentic-grader', color: '#2563EB' },
  { label: 'Command Center', href: '/portal/university-os/command-center', color: '#F59E0B', pill: 'NEW' },
];

function NowLiveBanner() {
  return (
    <div className="border-b border-molted-border" style={{ background: 'rgba(0,0,0,0.30)' }}>
      <div className="flex items-center overflow-hidden">
        {/* Badge */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-r border-molted-border flex-shrink-0"
          style={{ background: 'rgba(37,99,235,0.15)' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          <Zap size={11} className="text-blue-400" />
          <span className="text-[11px] font-black uppercase tracking-widest text-blue-400 whitespace-nowrap">Now Live</span>
        </div>

        {/* Scrollable pill list */}
        <div className="flex items-center gap-2 overflow-x-auto px-4 py-2" style={{ scrollbarWidth: 'none' }}>
          {LIVE_DEMOS.map(demo => (
            <Link key={demo.href} to={demo.href}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-all hover:scale-105 whitespace-nowrap"
              style={{
                background: demo.active ? `${demo.color}20` : 'rgba(255,255,255,0.04)',
                border: `1px solid ${demo.active ? `${demo.color}50` : 'rgba(255,255,255,0.08)'}`,
                color: demo.active ? demo.color : '#64748b',
              }}>
              {demo.active && <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: demo.color }} />}
              {demo.label}
              {demo.pill && (
                <span className="text-[8px] font-black px-1 py-0.5 rounded-full ml-0.5"
                  style={{ background: `${demo.color}25`, color: demo.color }}>
                  {demo.pill}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const DEFAULT_STUDENT_POSTS = [
  "I think the Identity vs. Role Confusion stage has the biggest impact because that's when you figure out who you really are. If you don't get that right you spend your whole adult life confused about what you want. I've seen this with my older brother who still doesn't know what career he wants at 28.",
  "I looked up Nike's mission and vision statements. Their mission is 'to bring inspiration and innovation to every athlete in the world.' and their vision is about being the best athletic company in the world. I think the distinction matters because the mission is what you do every day and the vision is where you're trying to get to.",
  "I think communication is super important in nursing because if a patient doesn't understand what you're telling them they might not follow the care plan. A nurse should speak clearly and make sure the patient understands. I would use therapeutic communication techniques.",
];

export default function ForgeVoiceDemo() {
  const [voiceOpen, setVoiceOpen] = useState(true);
  const [voice, setVoice] = useState('');
  const [selectedPromptIdx, setSelectedPromptIdx] = useState(0);
  const [studentPost, setStudentPost] = useState(DEFAULT_STUDENT_POSTS[0]);
  const [editingPost, setEditingPost] = useState(false);
  const [reply, setReply] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const replyRef = useRef<HTMLDivElement>(null);

  const selected = SAMPLE_PROMPTS[selectedPromptIdx];

  async function handleSubmit() {
    if (!voice.trim() || loading) return;
    setLoading(true);
    setError(null);
    setReply(null);
    setEditingPost(false);

    try {
      const res = await fetch('/api/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: selected.prompt,
          studentPost: studentPost.trim(),
          courseId: `forge-voice-demo-${selected.topic.replace(/\s+/g, '-').toLowerCase()}`,
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
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <MoltLMSLayout>
      <NowLiveBanner />
      <div className="min-h-screen pt-24 pb-32 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Back nav */}
          <Link
            to="/forge"
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
              <Mic size={12} />
              Forge Voice Demo
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-molted-white tracking-tight leading-tight mb-3">
              Hear your voice back.
            </h1>
            <p className="text-molted-muted text-lg leading-relaxed">
              Tell Forge who you are — your background, your passions, your teaching style.
              Then watch it draft a discussion reply that sounds like <em>you</em> wrote it.
            </p>
          </div>

          {/* Voice input — the star of the show */}
          <div
            className="rounded-2xl border mb-6 overflow-hidden"
            style={{
              borderColor: voice.trim() ? TEAL_BORDER : 'rgba(0,0,0,0.07)',
              background: 'rgba(241,243,248,0.95)',
              boxShadow: voice.trim() ? `0 0 0 1px ${TEAL_BORDER}` : 'none',
            }}
          >
            <button
              onClick={() => setVoiceOpen(v => !v)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <Mic size={14} style={{ color: TEAL }} />
                  <p className="text-molted-white text-sm font-semibold">
                    Who are you?
                  </p>
                  {voice.trim() && (
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: TEAL_DIM, color: TEAL, border: `1px solid ${TEAL_BORDER}` }}
                    >
                      Voice captured
                    </span>
                  )}
                </div>
                <p className="text-molted-muted text-xs mt-0.5">
                  Your background, years of experience, hobbies, how you talk to students — this is what Forge uses to match your voice.
                </p>
              </div>
              {voiceOpen
                ? <ChevronUp size={16} className="text-molted-muted flex-shrink-0" />
                : <ChevronDown size={16} className="text-molted-muted flex-shrink-0" />
              }
            </button>

            {voiceOpen && (
              <div className="px-5 pb-5 space-y-3">
                <textarea
                  value={voice}
                  onChange={e => setVoice(e.target.value)}
                  placeholder="e.g. I've been teaching human development for 8 years. Former high school counselor turned professor. I love hiking and always use outdoors analogies — 'personal growth is like a trail: you don't see the summit until you're halfway up.' I'm warm but direct. I hate generic textbook answers."
                  rows={5}
                  className="w-full rounded-xl border text-sm text-molted-muted leading-relaxed resize-none p-3 focus:outline-none transition-colors"
                  style={{
                    background: 'rgba(248,249,252,0.97)',
                    borderColor: voice.length > 0 ? TEAL_BORDER : 'rgba(0,0,0,0.07)',
                  }}
                />

                {/* Quick-fill starters */}
                <div>
                  <p className="text-molted-muted text-xs mb-2 font-medium">Or start with one of these:</p>
                  <div className="space-y-1.5">
                    {VOICE_STARTERS.map((starter, i) => (
                      <button
                        key={i}
                        onClick={() => setVoice(starter)}
                        className="w-full text-left px-3 py-2 rounded-xl border text-xs text-molted-muted hover:text-molted-white transition-all line-clamp-1"
                        style={{
                          borderColor: voice === starter ? TEAL_BORDER : 'rgba(0,0,0,0.06)',
                          background: voice === starter ? TEAL_DIM : 'rgba(0,0,0,0.03)',
                          color: voice === starter ? TEAL : undefined,
                        }}
                      >
                        {starter}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Discussion prompt selector */}
          <div className="mb-6">
            <p className="text-molted-muted text-xs font-semibold uppercase tracking-widest mb-3">
              Pick a discussion prompt
            </p>
            <div className="space-y-2">
              {SAMPLE_PROMPTS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => { setSelectedPromptIdx(i); setStudentPost(DEFAULT_STUDENT_POSTS[i]); setReply(null); setEditingPost(false); }}
                  className="w-full text-left p-4 rounded-2xl border transition-all duration-200"
                  style={{
                    background: selectedPromptIdx === i ? TEAL_DIM : 'rgba(241,243,248,0.85)',
                    borderColor: selectedPromptIdx === i ? TEAL_BORDER : 'rgba(0,0,0,0.06)',
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

          {/* Preview card: what student post Forge will reply to */}
          <div
            className="rounded-2xl border overflow-hidden mb-6"
            style={{ borderColor: 'rgba(0,0,0,0.07)', background: 'rgba(241,243,248,0.95)' }}
          >
            <div className="px-5 py-4 border-b" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
              <div className="flex items-center justify-between">
                <p className="text-molted-white text-sm font-semibold">{selected.topic} · Student post</p>
                <button
                  onClick={() => setEditingPost(e => !e)}
                  className="text-xs font-semibold transition-colors"
                  style={{ color: editingPost ? TEAL : '#64748b' }}
                >
                  {editingPost ? 'Done editing' : 'Edit post'}
                </button>
              </div>
            </div>

            {/* Student post — read or edit */}
            <div className="p-5 border-b" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
              <div className="flex gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(0,0,0,0.06)' }}
                >
                  <User size={14} className="text-molted-muted" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-molted-muted mb-2">Student</p>
                  {editingPost
                    ? (
                      <textarea
                        value={studentPost}
                        onChange={e => setStudentPost(e.target.value)}
                        rows={4}
                        className="w-full rounded-xl border text-sm text-molted-muted leading-relaxed resize-none p-3 focus:outline-none transition-colors"
                        style={{ background: 'rgba(248,249,252,0.97)', borderColor: TEAL_BORDER }}
                        placeholder="Type the student's post here…"
                      />
                    )
                    : <p className="text-molted-muted text-sm leading-relaxed">{studentPost}</p>
                  }
                </div>
              </div>
            </div>

            {/* Submit / reply zone */}
            <div className="p-5">
              {!reply && !loading && (
                <div className="flex items-center justify-between">
                  <p className="text-molted-muted text-xs opacity-60">
                    {voice.trim()
                      ? 'Voice captured — Forge is ready to reply in your style.'
                      : 'Add your background above so Forge can match your voice.'}
                  </p>
                  <button
                    onClick={handleSubmit}
                    disabled={!voice.trim() || loading}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-px"
                    style={{
                      background: voice.trim() ? TEAL : 'rgba(37,99,235,0.15)',
                      color: voice.trim() ? '#0A0A0F' : TEAL,
                    }}
                  >
                    <Send size={14} />
                    Draft reply in my voice
                  </button>
                </div>
              )}

              {/* Agent reply */}
              {(reply || loading) && (
                <div ref={replyRef}>
                  <div className="flex gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: AMBER_DIM, border: `1px solid ${AMBER_BORDER}` }}
                    >
                      <Bot size={14} style={{ color: AMBER }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-xs font-semibold" style={{ color: AMBER }}>Forge · Your voice</p>
                        <div
                          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                          style={{ background: AMBER_DIM, color: AMBER, border: `1px solid ${AMBER_BORDER}` }}
                        >
                          <Sparkles size={9} />
                          Drafted in your style
                        </div>
                      </div>
                      {loading && !reply
                        ? (
                          <div className="space-y-2">
                            <div className="h-3 rounded-full w-3/4 animate-pulse" style={{ background: 'rgba(0,0,0,0.06)' }} />
                            <div className="h-3 rounded-full w-5/6 animate-pulse" style={{ background: 'rgba(0,0,0,0.06)' }} />
                            <div className="h-3 rounded-full w-2/3 animate-pulse" style={{ background: 'rgba(0,0,0,0.06)' }} />
                          </div>
                        )
                        : <p className="text-molted-muted text-sm leading-relaxed">{reply}</p>
                      }

                      {reply && (
                        <div className="mt-4 flex items-center gap-3">
                          <button
                            onClick={() => { setReply(null); }}
                            className="text-xs text-molted-muted hover:text-molted-white transition-colors"
                          >
                            Try with different voice
                          </button>
                          <span className="text-molted-border">·</span>
                          <button
                            onClick={handleSubmit}
                            className="text-xs transition-colors"
                            style={{ color: TEAL }}
                          >
                            Regenerate
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              className="rounded-xl border p-4 text-sm mb-6"
              style={{ background: 'rgba(30,58,138,0.08)', borderColor: 'rgba(30,58,138,0.25)', color: '#3B82F6' }}
            >
              {error}
            </div>
          )}


        </div>
      </div>
    </MoltLMSLayout>
  );
}
