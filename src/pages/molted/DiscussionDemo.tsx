import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare, AlertTriangle, Star, Minus, Users,
  Copy, Check, ChevronLeft, Loader2, ArrowRight, Lightbulb,
} from 'lucide-react';
import MoltedLayout from './MoltedLayout';

/* ── Types ─────────────────────────────────────────────────────────────── */
type Quality = 'misconception' | 'strong' | 'adequate' | 'minimal';

interface Post {
  author: string;
  excerpt: string;
  quality: Quality;
  label: string;
  issue: string | null;
  draftResponse: string | null;
}

interface Analysis {
  summary: string;
  instructorPost: string;
  posts: Post[];
  insights: string;
}

/* ── Colors ────────────────────────────────────────────────────────────── */
const TEAL = '#2563EB';
const TEAL_DIM = 'rgba(37,99,235,0.12)';
const TEAL_BORDER = 'rgba(37,99,235,0.25)';

const QUALITY_CONFIG: Record<Quality, { color: string; bg: string; border: string; icon: typeof AlertTriangle }> = {
  misconception: {
    color: '#3B82F6',
    bg: 'rgba(30,58,138,0.10)',
    border: 'rgba(30,58,138,0.22)',
    icon: AlertTriangle,
  },
  strong: {
    color: TEAL,
    bg: TEAL_DIM,
    border: TEAL_BORDER,
    icon: Star,
  },
  adequate: {
    color: '#86868B',
    bg: 'rgba(255,255,255,0.04)',
    border: 'rgba(255,255,255,0.08)',
    icon: Minus,
  },
  minimal: {
    color: '#3A3A40',
    bg: 'rgba(255,255,255,0.02)',
    border: 'rgba(255,255,255,0.06)',
    icon: Minus,
  },
};

/* ── CopyButton ────────────────────────────────────────────────────────── */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button
      onClick={copy}
      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
      style={{
        background: copied ? TEAL_DIM : 'rgba(255,255,255,0.06)',
        color: copied ? TEAL : '#86868B',
        border: `1px solid ${copied ? TEAL_BORDER : 'rgba(255,255,255,0.08)'}`,
      }}
    >
      {copied ? <Check size={11} /> : <Copy size={11} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

/* ── PostCard ──────────────────────────────────────────────────────────── */
function PostCard({ post }: { post: Post }) {
  const [expanded, setExpanded] = useState(post.quality === 'misconception');
  const cfg = QUALITY_CONFIG[post.quality];
  const Icon = cfg.icon;

  return (
    <div
      className="rounded-2xl border transition-all duration-200"
      style={{ background: cfg.bg, borderColor: cfg.border }}
    >
      {/* Header */}
      <button
        className="w-full flex items-center gap-3 p-4 text-left"
        onClick={() => setExpanded(e => !e)}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
          style={{ background: 'rgba(255,255,255,0.08)', color: '#F5F5F7' }}
        >
          {post.author.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-molted-white text-sm font-semibold">{post.author}</p>
          <p className="text-molted-muted text-xs mt-0.5 truncate">{post.excerpt}</p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <div
            className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-semibold"
            style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
          >
            <Icon size={11} />
            {post.label}
          </div>
        </div>
      </button>

      {/* Expanded detail */}
      {expanded && post.draftResponse && (
        <div className="px-4 pb-4 space-y-3">
          {post.issue && (
            <div
              className="rounded-xl p-3 text-xs leading-relaxed"
              style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <p className="text-red-400 font-semibold mb-1">Issue detected</p>
              <p className="text-molted-muted">{post.issue}</p>
            </div>
          )}

          <div
            className="rounded-xl p-4"
            style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-molted-muted text-xs font-semibold uppercase tracking-wide">
                {post.quality === 'strong' ? 'Suggested highlight' : 'Draft response'}
              </p>
              <CopyButton text={post.draftResponse} />
            </div>
            <p className="text-molted-white/85 text-sm leading-relaxed">{post.draftResponse}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Filter tabs ───────────────────────────────────────────────────────── */
type Filter = 'all' | 'misconception' | 'strong';

function FilterTabs({
  filter, setFilter, posts,
}: {
  filter: Filter; setFilter: (f: Filter) => void; posts: Post[];
}) {
  const counts = {
    all: posts.length,
    misconception: posts.filter(p => p.quality === 'misconception').length,
    strong: posts.filter(p => p.quality === 'strong').length,
  };

  const tabs: { key: Filter; label: string; color: string }[] = [
    { key: 'all', label: 'All Posts', color: '#F5F5F7' },
    { key: 'misconception', label: 'Misconceptions', color: '#3B82F6' },
    { key: 'strong', label: 'Highlights', color: TEAL },
  ];

  return (
    <div className="flex gap-2 flex-wrap mb-5">
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => setFilter(tab.key)}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all"
          style={{
            background: filter === tab.key ? 'rgba(255,255,255,0.08)' : 'transparent',
            color: filter === tab.key ? tab.color : '#86868B',
            border: `1px solid ${filter === tab.key ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)'}`,
          }}
        >
          {tab.label}
          <span
            className="text-xs px-1.5 py-0.5 rounded-full"
            style={{
              background: filter === tab.key ? `${tab.color}20` : 'rgba(255,255,255,0.05)',
              color: filter === tab.key ? tab.color : '#3A3A40',
            }}
          >
            {counts[tab.key]}
          </span>
        </button>
      ))}
    </div>
  );
}

/* ── Results ────────────────────────────────────────────────────────────  */
function Results({ analysis }: { analysis: Analysis }) {
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = filter === 'all'
    ? analysis.posts
    : analysis.posts.filter(p => p.quality === filter);

  const miscCount = analysis.posts.filter(p => p.quality === 'misconception').length;
  const strongCount = analysis.posts.filter(p => p.quality === 'strong').length;

  return (
    <div className="space-y-6">
      {/* Summary bar */}
      <div
        className="rounded-2xl p-5 border"
        style={{ background: TEAL_DIM, borderColor: TEAL_BORDER }}
      >
        <p className="text-molted-white text-sm font-semibold mb-1">{analysis.summary}</p>
        <div className="flex gap-4 mt-3 text-xs text-molted-muted">
          <span>{analysis.posts.length} posts analyzed</span>
          {miscCount > 0 && <span className="text-red-400">{miscCount} misconception{miscCount > 1 ? 's' : ''} found</span>}
          {strongCount > 0 && <span style={{ color: TEAL }}>{strongCount} strong post{strongCount > 1 ? 's' : ''}</span>}
        </div>
      </div>

      {/* Instructor response */}
      {analysis.instructorPost && (
        <div
          className="rounded-2xl border"
          style={{ background: 'rgba(17,17,24,0.9)', borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <div>
              <p className="text-molted-white text-sm font-bold">Your response</p>
              <p className="text-molted-muted text-xs mt-0.5">Ready to paste into your discussion board</p>
            </div>
            <CopyButton text={analysis.instructorPost} />
          </div>
          <div
            className="mx-4 mb-4 rounded-xl p-4 text-sm leading-relaxed text-molted-white/85 whitespace-pre-wrap"
            style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            {analysis.instructorPost}
          </div>
        </div>
      )}

      {/* Posts */}
      <div>
        <FilterTabs filter={filter} setFilter={setFilter} posts={analysis.posts} />
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <p className="text-molted-muted text-sm text-center py-8">No posts in this category.</p>
          ) : (
            filtered.map((post, i) => <PostCard key={i} post={post} />)
          )}
        </div>
      </div>

      {/* Insights */}
      <div
        className="rounded-2xl p-5 border"
        style={{ background: 'rgba(17,17,24,0.9)', borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb size={14} style={{ color: '#64748B' }} />
          <p className="text-sm font-semibold text-molted-white">Pedagogical Insight</p>
        </div>
        <p className="text-molted-muted text-sm leading-relaxed">{analysis.insights}</p>
      </div>
    </div>
  );
}

/* ── ResponseOptions ───────────────────────────────────────────────────── */
interface ResponseOptions {
  tone: 'formal' | 'conversational' | 'socratic';
  wordCount: number;
  nameStudents: boolean;
}

function ChipGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <p className="text-molted-muted text-xs font-semibold mb-2">{label}</p>
      <div className="flex gap-2 flex-wrap">
        {options.map(opt => {
          const active = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: active ? TEAL_DIM : 'rgba(255,255,255,0.04)',
                color: active ? TEAL : '#86868B',
                border: `1px solid ${active ? TEAL_BORDER : 'rgba(255,255,255,0.07)'}`,
              }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Input panel ───────────────────────────────────────────────────────── */
function InputPanel({
  onAnalyze,
  loading,
}: {
  onAnalyze: (thread: string, context: string, opts: ResponseOptions) => void;
  loading: boolean;
}) {
  const [thread, setThread] = useState('');
  const [context, setContext] = useState('');
  const [opts, setOpts] = useState<ResponseOptions>({
    tone: 'conversational',
    wordCount: 200,
    nameStudents: true,
  });

  const ready = thread.trim().length > 30 && !loading;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-molted-white text-sm font-semibold mb-2">
          Discussion thread
        </label>
        <p className="text-molted-muted text-xs mb-3">
          Select all and copy from Canvas, Blackboard, or any LMS — paste it here raw.
          Formatting doesn't need to be clean.
        </p>
        <textarea
          value={thread}
          onChange={e => setThread(e.target.value)}
          placeholder={`Jordan M.\nI think photosynthesis only happens in green leaves because that's where the chlorophyll is.\n\nKayla T.\nBuilding on Jordan's point — the relationship between ATP and glucose synthesis is more complex because...\n\nMarcus R.\nAgreed with Kayla. The light reactions and Calvin cycle work together to...`}
          rows={14}
          className="w-full rounded-2xl border text-sm text-molted-white leading-relaxed resize-none p-4 focus:outline-none transition-colors"
          style={{
            background: 'rgba(17,17,24,0.9)',
            borderColor: thread.length > 0 ? TEAL_BORDER : 'rgba(255,255,255,0.08)',
            fontFamily: 'monospace',
          }}
        />
        <p className="text-molted-subtle text-xs mt-1 text-right">{thread.length} chars</p>
      </div>

      <div>
        <label className="block text-molted-white text-sm font-semibold mb-2">
          Context <span className="text-molted-subtle font-normal">(optional)</span>
        </label>
        <textarea
          value={context}
          onChange={e => setContext(e.target.value)}
          placeholder="Week 4 · BIO 301. Learning objective: Students should understand the relationship between the light reactions and the Calvin cycle in photosynthesis."
          rows={3}
          className="w-full rounded-2xl border text-sm text-molted-muted leading-relaxed resize-none p-4 focus:outline-none transition-colors"
          style={{
            background: 'rgba(17,17,24,0.9)',
            borderColor: context.length > 0 ? TEAL_BORDER : 'rgba(255,255,255,0.08)',
          }}
        />
        <p className="text-molted-muted text-xs mt-1.5">
          Learning objectives help the agent detect misconceptions more accurately.
        </p>
      </div>

      {/* Response options */}
      <div
        className="rounded-2xl border p-4 space-y-4"
        style={{ background: 'rgba(0,0,0,0.25)', borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <p className="text-molted-white text-xs font-bold uppercase tracking-wide">
          Response options
        </p>
        <ChipGroup
          label="Tone"
          value={opts.tone}
          onChange={v => setOpts(o => ({ ...o, tone: v }))}
          options={[
            { value: 'conversational', label: 'Conversational' },
            { value: 'formal', label: 'Formal' },
            { value: 'socratic', label: 'Socratic' },
          ]}
        />
        <div>
          <p className="text-molted-muted text-xs font-semibold mb-2">Word count</p>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min={50}
              max={600}
              value={opts.wordCount}
              onChange={e => {
                const v = Math.min(600, Math.max(50, Number(e.target.value) || 50));
                setOpts(o => ({ ...o, wordCount: v }));
              }}
              className="w-24 rounded-lg border text-sm text-molted-white text-center py-1.5 focus:outline-none"
              style={{
                background: 'rgba(17,17,24,0.9)',
                borderColor: TEAL_BORDER,
              }}
            />
            <div className="flex gap-1.5">
              {[75, 150, 200, 350].map(n => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setOpts(o => ({ ...o, wordCount: n }))}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all"
                  style={{
                    background: opts.wordCount === n ? TEAL_DIM : 'rgba(255,255,255,0.04)',
                    color: opts.wordCount === n ? TEAL : '#86868B',
                    border: `1px solid ${opts.wordCount === n ? TEAL_BORDER : 'rgba(255,255,255,0.07)'}`,
                  }}
                >
                  {n}w
                </button>
              ))}
            </div>
          </div>
        </div>
        <div>
          <p className="text-molted-muted text-xs font-semibold mb-2">Name students</p>
          <div className="flex gap-2">
            {[
              { val: true, label: 'Name them' },
              { val: false, label: 'Keep anonymous' },
            ].map(opt => {
              const active = opt.val === opts.nameStudents;
              return (
                <button
                  key={String(opt.val)}
                  type="button"
                  onClick={() => setOpts(o => ({ ...o, nameStudents: opt.val }))}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                  style={{
                    background: active ? TEAL_DIM : 'rgba(255,255,255,0.04)',
                    color: active ? TEAL : '#86868B',
                    border: `1px solid ${active ? TEAL_BORDER : 'rgba(255,255,255,0.07)'}`,
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <button
        onClick={() => onAnalyze(thread, context, opts)}
        disabled={!ready}
        className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm transition-all duration-200"
        style={{
          background: ready ? TEAL : 'rgba(255,255,255,0.06)',
          color: ready ? '#0A0A0F' : '#3A3A40',
          cursor: ready ? 'pointer' : 'not-allowed',
        }}
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Analyzing discussion...
          </>
        ) : (
          <>
            <MessageSquare size={16} />
            Analyze Discussion
          </>
        )}
      </button>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────── */
export default function DiscussionDemo() {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAnalyze(thread: string, context: string, opts: ResponseOptions) {
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const res = await fetch('/api/discuss', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ thread, context, opts }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Something went wrong.');
        return;
      }

      setAnalysis(data);
    } catch {
      setError('Network error — check your connection.');
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

            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
                  style={{ background: TEAL_DIM, color: TEAL, border: `1px solid ${TEAL_BORDER}` }}
                >
                  <MessageSquare size={11} />
                  Discussion Intelligence · Beta
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-molted-white tracking-tight">
                  Paste your discussion board.
                  <br />
                  <span style={{ color: TEAL }}>Get your analysis.</span>
                </h1>
                <p className="mt-3 text-molted-muted text-base max-w-lg leading-relaxed">
                  No Canvas API required. Copy the thread from any LMS,
                  paste it below, and the agent reads every post — flagging
                  misconceptions and drafting your responses.
                </p>
              </div>
            </div>
          </div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-start">

            {/* Input */}
            <div
              className="rounded-3xl p-6 border sticky top-24"
              style={{ background: 'rgba(17,17,24,0.7)', borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <InputPanel onAnalyze={handleAnalyze} loading={loading} />
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

              {!analysis && !loading && !error && (
                <div
                  className="rounded-3xl p-10 border text-center"
                  style={{ background: 'rgba(17,17,24,0.5)', borderColor: 'rgba(255,255,255,0.04)' }}
                >
                  <MessageSquare size={32} className="mx-auto mb-4 text-molted-subtle" />
                  <p className="text-molted-muted font-semibold mb-2">Analysis will appear here</p>
                  <p className="text-molted-subtle text-sm">
                    Paste a discussion thread and click Analyze.
                    <br />
                    Works with Canvas, Blackboard, D2L, or any plain text.
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
                  <p className="text-molted-white font-semibold mb-1">Reading the thread...</p>
                  <p className="text-molted-muted text-sm">
                    Detecting misconceptions, scoring reasoning quality,
                    drafting responses.
                  </p>
                </div>
              )}

              {analysis && <Results analysis={analysis} />}
            </div>
          </div>

          {/* Next step nudge */}
          <div
            className="mt-16 rounded-3xl p-8 border text-center"
            style={{ background: 'rgba(17,17,24,0.7)', borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <p className="text-molted-muted text-sm mb-1">This is Forge Discussion Intelligence — beta.</p>
            <p className="text-molted-white font-semibold mb-5">
              Next: LMS integration so you never have to paste again.
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
