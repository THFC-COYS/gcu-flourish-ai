import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare, AlertTriangle, Star, Minus, Users,
  Copy, Check, ChevronLeft, ChevronDown, Loader2, ArrowRight,
  Lightbulb, Zap, BookOpen, GitBranch, Quote,
} from 'lucide-react';
import MoltedLayout from './MoltedLayout';

/* ── Constants ──────────────────────────────────────────────────────────── */
const TEAL = '#2563EB';
const TEAL_DIM = 'rgba(37,99,235,0.12)';
const TEAL_BORDER = 'rgba(37,99,235,0.25)';

type Quality = 'misconception' | 'strong' | 'adequate' | 'minimal';

const QUALITY_CONFIG: Record<Quality, { color: string; bg: string; border: string; icon: typeof AlertTriangle }> = {
  misconception: { color: '#3B82F6', bg: 'rgba(30,58,138,0.10)', border: 'rgba(30,58,138,0.22)', icon: AlertTriangle },
  strong:        { color: TEAL,      bg: TEAL_DIM,               border: TEAL_BORDER,            icon: Star },
  adequate:      { color: '#94A3B8', bg: 'rgba(148,163,184,0.08)', border: 'rgba(148,163,184,0.18)', icon: Minus },
  minimal:       { color: '#64748B', bg: 'rgba(100,116,139,0.06)', border: 'rgba(100,116,139,0.15)', icon: Minus },
};

type RoutingManual = 'reply' | 'highlight' | 'skip';
type RoutingAgentic = 'reply' | 'flag' | 'acknowledge';
type Depth = 'scaffolding' | 'probing' | 'synthesis-level';

const ROUTING_MANUAL_CONFIG: Record<RoutingManual, { color: string; bg: string; border: string; label: string }> = {
  reply:     { color: TEAL,      bg: TEAL_DIM,                      border: TEAL_BORDER,                      label: 'Reply' },
  highlight: { color: '#F59E0B', bg: 'rgba(245,158,11,0.10)',        border: 'rgba(245,158,11,0.25)',           label: 'Highlight' },
  skip:      { color: '#64748B', bg: 'rgba(100,116,139,0.08)',       border: 'rgba(100,116,139,0.15)',          label: 'Skip' },
};

const ROUTING_AGENTIC_CONFIG: Record<RoutingAgentic, { color: string; bg: string; border: string; label: string }> = {
  reply:      { color: TEAL,      bg: TEAL_DIM,                      border: TEAL_BORDER,                      label: 'Reply' },
  flag:       { color: '#EF4444', bg: 'rgba(239,68,68,0.08)',        border: 'rgba(239,68,68,0.20)',            label: 'Flag' },
  acknowledge:{ color: '#34D399', bg: 'rgba(52,211,153,0.08)',       border: 'rgba(52,211,153,0.20)',           label: 'Acknowledge' },
};

const DEPTH_CONFIG: Record<Depth, { color: string; label: string }> = {
  'scaffolding':     { color: '#F59E0B', label: 'Scaffolding' },
  'probing':         { color: TEAL,      label: 'Probing' },
  'synthesis-level': { color: '#A78BFA', label: 'Synthesis' },
};

const TRACE_TYPE_CONFIG: Record<string, { color: string }> = {
  parse:      { color: '#94A3B8' },
  plan:       { color: '#A78BFA' },
  generate:   { color: '#34D399' },
  analyze:    { color: '#3B82F6' },
  route:      { color: '#F59E0B' },
  draft:      { color: TEAL },
  revise:     { color: '#F97316' },
  synthesize: { color: '#8B5CF6' },
  insights:   { color: '#EC4899' },
};

/* ── Types ──────────────────────────────────────────────────────────────── */

interface TraceEvent {
  step: string;
  type: string;
  timestamp: number;
}

interface ManualPost {
  author: string;
  excerpt: string;
  quality: Quality;
  label: string;
  confidence: number;
  quotedEvidence: string | null;
  routingDecision: RoutingManual;
  routingReason: string;
  issue: string | null;
  draftResponse: string | null;
  draftCritique: string | null;
  draftResponseFinal: string | null;
}
interface ManualAnalysis {
  summary: string;
  instructorPost: string;
  posts: ManualPost[];
  classPattern: string | null;
  followUpPrompt: string | null;
  insights: string;
}

interface StudentPersona {
  name: string;
  year: string;
  major: string;
  background: string;
  likelyWeakness: string;
}

interface AgenticPost {
  author: string;
  post: string;
  quality: Quality;
  label: string;
  confidence: number;
  quotedEvidence: string | null;
  routingDecision: RoutingAgentic;
  routingReason: string;
  depth: Depth;
  issue: string | null;
  draftReply: string;
  draftCritique: string;
  facultyReply: string;
}
interface AgenticAnalysis {
  topic: string;
  summary: string;
  personas: StudentPersona[];
  posts: AgenticPost[];
  classPattern: string | null;
  followUpPrompt: string | null;
  insights: string;
}

/* ── Shared helpers ─────────────────────────────────────────────────────── */

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
        background: copied ? TEAL_DIM : 'rgba(0,0,0,0.06)',
        color: copied ? TEAL : '#94A3B8',
        border: `1px solid ${copied ? TEAL_BORDER : 'rgba(0,0,0,0.07)'}`,
      }}
    >
      {copied ? <Check size={11} /> : <Copy size={11} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

function initials(name: string) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
}

/* ── Trace log ──────────────────────────────────────────────────────────── */

function TraceLog({ events, loading }: { events: TraceEvent[]; loading: boolean }) {
  const [expanded, setExpanded] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom as events come in
  useEffect(() => {
    if (expanded) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [events.length, expanded]);

  // Auto-collapse 1.2s after loading finishes
  useEffect(() => {
    if (!loading && events.length > 0) {
      const t = setTimeout(() => setExpanded(false), 1200);
      return () => clearTimeout(t);
    }
  }, [loading, events.length]);

  if (events.length === 0 && !loading) return null;

  return (
    <div
      className="rounded-2xl border overflow-hidden transition-all"
      style={{ background: 'rgba(6,8,18,0.70)', borderColor: 'rgba(148,163,184,0.12)' }}
    >
      <button
        className="w-full flex items-center justify-between px-4 py-3"
        onClick={() => setExpanded(e => !e)}
      >
        <div className="flex items-center gap-2.5">
          {loading && (
            <span className="flex gap-0.5">
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="block w-1 h-1 rounded-full"
                  style={{
                    background: '#34D399',
                    animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </span>
          )}
          {!loading && events.length > 0 && (
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#34D399' }} />
          )}
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#64748B' }}>
            Agent trace
          </span>
          <span className="text-[10px]" style={{ color: '#475569' }}>
            {events.length} step{events.length !== 1 ? 's' : ''}
          </span>
        </div>
        <ChevronDown
          size={12}
          style={{
            color: '#475569',
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 200ms',
          }}
        />
      </button>

      {expanded && (
        <div className="px-4 pb-4 max-h-60 overflow-y-auto space-y-1.5 font-mono">
          {events.map((e, i) => {
            const cfg = TRACE_TYPE_CONFIG[e.type] ?? { color: '#94A3B8' };
            return (
              <div
                key={i}
                className="flex items-start gap-2.5"
                style={{ animation: 'fadeInUp 200ms ease both' }}
              >
                <span
                  className="text-[9px] px-1.5 py-0.5 rounded font-black uppercase shrink-0 mt-0.5 tracking-wide"
                  style={{ background: `${cfg.color}18`, color: cfg.color }}
                >
                  {e.type}
                </span>
                <span className="text-xs leading-relaxed" style={{ color: '#8892A4' }}>
                  {e.step}
                </span>
              </div>
            );
          })}
          {loading && (
            <div className="flex items-center gap-1.5 pt-1">
              <span className="text-xs animate-pulse" style={{ color: '#475569' }}>›_ processing...</span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   MANUAL MODE
══════════════════════════════════════════════════════════════════════════ */

function ManualPostCard({ post }: { post: ManualPost }) {
  const [expanded, setExpanded] = useState(post.routingDecision !== 'skip');
  const [showDraft, setShowDraft] = useState(false);
  const cfg = QUALITY_CONFIG[post.quality];
  const rcfg = ROUTING_MANUAL_CONFIG[post.routingDecision] ?? ROUTING_MANUAL_CONFIG.skip;
  const Icon = cfg.icon;
  const responseText = showDraft ? post.draftResponse : (post.draftResponseFinal ?? post.draftResponse);

  return (
    <div className="rounded-2xl border transition-all duration-200" style={{ background: cfg.bg, borderColor: cfg.border }}>
      <button className="w-full flex items-center gap-3 p-4 text-left" onClick={() => setExpanded(e => !e)}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
          style={{ background: 'rgba(0,0,0,0.07)', color: '#1C1C1E' }}>
          {initials(post.author)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-molted-white text-sm font-semibold">{post.author}</p>
          <p className="text-molted-muted text-xs mt-0.5 truncate">{post.excerpt}</p>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0 flex-wrap justify-end">
          {/* Quality + confidence */}
          <div className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-semibold"
            style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
            <Icon size={11} />
            {post.label}
            {post.confidence != null && (
              <span className="text-[10px] opacity-65 ml-0.5">{post.confidence}%</span>
            )}
          </div>
          {/* Routing badge */}
          <div className="text-[10px] px-2.5 py-1 rounded-full font-black"
            style={{ background: rcfg.bg, color: rcfg.color, border: `1px solid ${rcfg.border}` }}>
            {rcfg.label}
          </div>
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3">
          {/* Routing reason */}
          {post.routingReason && (
            <p className="text-xs italic" style={{ color: '#64748B' }}>{post.routingReason}</p>
          )}

          {/* Quoted evidence */}
          {post.quotedEvidence && (
            <div className="flex items-start gap-2 rounded-xl px-3 py-2.5 text-xs leading-relaxed"
              style={{ background: 'rgba(0,0,0,0.12)', borderLeft: `2px solid ${cfg.color}` }}>
              <Quote size={11} className="shrink-0 mt-0.5" style={{ color: cfg.color }} />
              <span className="italic" style={{ color: '#94A3B8' }}>"{post.quotedEvidence}"</span>
            </div>
          )}

          {/* Issue */}
          {post.issue && (
            <div className="rounded-xl p-3 text-xs leading-relaxed"
              style={{ background: 'rgba(30,58,138,0.07)', border: '1px solid rgba(30,58,138,0.15)' }}>
              <p className="text-red-400 font-semibold mb-1">Misconception detected</p>
              <p className="text-molted-muted">{post.issue}</p>
            </div>
          )}

          {/* Response + draft/revised toggle */}
          {(post.draftResponse || post.draftResponseFinal) && (
            <div className="rounded-xl p-4" style={{ background: 'rgba(148,163,184,0.05)', border: '1px solid rgba(0,0,0,0.06)' }}>
              <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <p className="text-molted-muted text-xs font-semibold uppercase tracking-wide">
                    {post.quality === 'strong' ? 'Suggested highlight' : 'Draft response'}
                  </p>
                  {post.draftResponseFinal && (
                    <div className="flex rounded-lg overflow-hidden border text-[10px] font-black"
                      style={{ borderColor: 'rgba(0,0,0,0.10)' }}>
                      <button
                        onClick={() => setShowDraft(true)}
                        className="px-2.5 py-0.5 transition-colors"
                        style={{
                          background: showDraft ? 'rgba(249,115,22,0.12)' : 'transparent',
                          color: showDraft ? '#F97316' : '#64748B',
                        }}
                      >
                        Draft
                      </button>
                      <button
                        onClick={() => setShowDraft(false)}
                        className="px-2.5 py-0.5 transition-colors"
                        style={{
                          background: !showDraft ? TEAL_DIM : 'transparent',
                          color: !showDraft ? TEAL : '#64748B',
                        }}
                      >
                        Revised ✓
                      </button>
                    </div>
                  )}
                </div>
                <CopyButton text={responseText ?? ''} />
              </div>

              {/* Critique shown when viewing draft */}
              {showDraft && post.draftCritique && (
                <div className="mb-3 px-3 py-2 rounded-lg text-xs italic"
                  style={{ background: 'rgba(249,115,22,0.07)', border: '1px solid rgba(249,115,22,0.15)', color: '#FB923C' }}>
                  Critique: {post.draftCritique}
                </div>
              )}

              <p className="text-molted-white/85 text-sm leading-relaxed">{responseText}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

type ManualFilter = 'all' | 'misconception' | 'strong';

function ManualResults({ analysis, traceEvents }: { analysis: ManualAnalysis; traceEvents: TraceEvent[] }) {
  const [filter, setFilter] = useState<ManualFilter>('all');
  const miscCount = analysis.posts.filter(p => p.quality === 'misconception').length;
  const strongCount = analysis.posts.filter(p => p.quality === 'strong').length;
  const filtered = filter === 'all' ? analysis.posts : analysis.posts.filter(p => p.quality === filter);

  const tabs: { key: ManualFilter; label: string; color: string }[] = [
    { key: 'all', label: 'All Posts', color: '#1C1C1E' },
    { key: 'misconception', label: 'Misconceptions', color: '#3B82F6' },
    { key: 'strong', label: 'Highlights', color: TEAL },
  ];

  return (
    <div className="space-y-5">
      {/* Trace log (auto-collapsed) */}
      {traceEvents.length > 0 && <TraceLog events={traceEvents} loading={false} />}

      {/* Summary bar */}
      <div className="rounded-2xl p-5 border" style={{ background: TEAL_DIM, borderColor: TEAL_BORDER }}>
        <p className="text-molted-white text-sm font-semibold mb-1">{analysis.summary}</p>
        <div className="flex gap-4 mt-2 text-xs text-molted-muted flex-wrap">
          <span>{analysis.posts.length} posts analyzed</span>
          {miscCount > 0 && <span className="text-red-400">{miscCount} misconception{miscCount > 1 ? 's' : ''}</span>}
          {strongCount > 0 && <span style={{ color: TEAL }}>{strongCount} strong post{strongCount > 1 ? 's' : ''}</span>}
          <span style={{ color: '#64748B' }}>
            {analysis.posts.filter(p => p.routingDecision === 'skip').length} skipped
          </span>
        </div>
      </div>

      {/* Instructor post */}
      {analysis.instructorPost && (
        <div className="rounded-2xl border" style={{ background: 'rgba(248,249,252,0.95)', borderColor: 'rgba(0,0,0,0.07)' }}>
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <div>
              <p className="text-molted-white text-sm font-bold">Your response</p>
              <p className="text-molted-muted text-xs mt-0.5">Ready to paste into your discussion board</p>
            </div>
            <CopyButton text={analysis.instructorPost} />
          </div>
          <div className="mx-4 mb-4 rounded-xl p-4 text-sm leading-relaxed text-molted-white/85 whitespace-pre-wrap"
            style={{ background: 'rgba(148,163,184,0.05)', border: '1px solid rgba(0,0,0,0.05)' }}>
            {analysis.instructorPost}
          </div>
        </div>
      )}

      {/* Filter tabs + post cards */}
      <div>
        <div className="flex gap-2 flex-wrap mb-4">
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setFilter(tab.key)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: filter === tab.key ? 'rgba(0,0,0,0.07)' : 'transparent',
                color: filter === tab.key ? tab.color : '#94A3B8',
                border: `1px solid ${filter === tab.key ? 'rgba(0,0,0,0.10)' : 'rgba(0,0,0,0.06)'}`,
              }}>
              {tab.label}
              <span className="text-xs px-1.5 py-0.5 rounded-full"
                style={{
                  background: filter === tab.key ? `${tab.color}20` : 'rgba(0,0,0,0.05)',
                  color: filter === tab.key ? tab.color : '#94A3B8',
                }}>
                {tab.key === 'all' ? analysis.posts.length : tab.key === 'misconception' ? miscCount : strongCount}
              </span>
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {filtered.length === 0
            ? <p className="text-molted-muted text-sm text-center py-8">No posts in this category.</p>
            : filtered.map((post, i) => <ManualPostCard key={i} post={post} />)}
        </div>
      </div>

      {/* Class-wide pattern */}
      {analysis.classPattern && (
        <div className="rounded-2xl p-5 border" style={{ background: 'rgba(139,92,246,0.08)', borderColor: 'rgba(139,92,246,0.22)' }}>
          <div className="flex items-center gap-2 mb-2">
            <Users size={13} style={{ color: '#8B5CF6' }} />
            <p className="text-xs font-bold uppercase tracking-wide" style={{ color: '#8B5CF6' }}>Class-wide pattern</p>
          </div>
          <p className="text-molted-white text-sm leading-relaxed">{analysis.classPattern}</p>
        </div>
      )}

      {/* Follow-up prompt */}
      {analysis.followUpPrompt && (
        <div className="rounded-2xl border" style={{ background: 'rgba(248,249,252,0.95)', borderColor: 'rgba(0,0,0,0.06)' }}>
          <div className="flex items-center justify-between px-5 pt-4 pb-2">
            <div className="flex items-center gap-2">
              <ArrowRight size={13} style={{ color: TEAL }} />
              <p className="text-xs font-bold uppercase tracking-wide" style={{ color: TEAL }}>Suggested follow-up prompt</p>
            </div>
            <CopyButton text={analysis.followUpPrompt} />
          </div>
          <p className="px-5 pb-4 text-sm leading-relaxed italic" style={{ color: '#CBD5E1' }}>
            "{analysis.followUpPrompt}"
          </p>
        </div>
      )}

      {/* Pedagogical insight */}
      <div className="rounded-2xl p-5 border" style={{ background: 'rgba(248,249,252,0.95)', borderColor: 'rgba(0,0,0,0.06)' }}>
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb size={14} style={{ color: '#64748B' }} />
          <p className="text-sm font-semibold text-molted-white">Pedagogical Insight</p>
        </div>
        <p className="text-molted-muted text-sm leading-relaxed">{analysis.insights}</p>
      </div>
    </div>
  );
}

interface ResponseOptions {
  tone: 'formal' | 'conversational' | 'socratic';
  wordCount: number;
  nameStudents: boolean;
}

function ChipGroup<T extends string>({
  label, options, value, onChange,
}: { label: string; options: { value: T; label: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div>
      <p className="text-molted-muted text-xs font-semibold mb-2">{label}</p>
      <div className="flex gap-2 flex-wrap">
        {options.map(opt => {
          const active = opt.value === value;
          return (
            <button key={opt.value} type="button" onClick={() => onChange(opt.value)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: active ? TEAL_DIM : 'rgba(0,0,0,0.04)',
                color: active ? TEAL : '#94A3B8',
                border: `1px solid ${active ? TEAL_BORDER : 'rgba(0,0,0,0.06)'}`,
              }}>
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ManualInputPanel({ onAnalyze, loading }: {
  onAnalyze: (thread: string, context: string, opts: ResponseOptions) => void;
  loading: boolean;
}) {
  const [thread, setThread] = useState('');
  const [context, setContext] = useState('');
  const [opts, setOpts] = useState<ResponseOptions>({ tone: 'conversational', wordCount: 200, nameStudents: true });
  const ready = thread.trim().length > 30 && !loading;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-molted-white text-sm font-semibold mb-2">Discussion thread</label>
        <p className="text-molted-muted text-xs mb-3">
          Select all and copy from Canvas, Blackboard, or any LMS — paste it here raw. Formatting doesn't need to be clean.
        </p>
        <textarea value={thread} onChange={e => setThread(e.target.value)}
          placeholder={`Jordan M.\nI think photosynthesis only happens in green leaves because that's where the chlorophyll is.\n\nKayla T.\nBuilding on Jordan's point — the relationship between ATP and glucose synthesis is more complex because...\n\nMarcus R.\nAgreed with Kayla. The light reactions and Calvin cycle work together to...`}
          rows={14}
          className="w-full rounded-2xl border text-sm text-molted-white leading-relaxed resize-none p-4 focus:outline-none transition-colors"
          style={{
            background: 'rgba(248,249,252,0.95)',
            borderColor: thread.length > 0 ? TEAL_BORDER : 'rgba(0,0,0,0.07)',
            fontFamily: 'monospace',
          }}
        />
        <p className="text-molted-subtle text-xs mt-1 text-right">{thread.length} chars</p>
      </div>

      <div>
        <label className="block text-molted-white text-sm font-semibold mb-2">
          Context <span className="text-molted-subtle font-normal">(optional)</span>
        </label>
        <textarea value={context} onChange={e => setContext(e.target.value)}
          placeholder="Week 4 · BIO 301. Learning objective: Students should understand the relationship between the light reactions and the Calvin cycle in photosynthesis."
          rows={3}
          className="w-full rounded-2xl border text-sm text-molted-muted leading-relaxed resize-none p-4 focus:outline-none transition-colors"
          style={{ background: 'rgba(248,249,252,0.95)', borderColor: context.length > 0 ? TEAL_BORDER : 'rgba(0,0,0,0.07)' }}
        />
        <p className="text-molted-muted text-xs mt-1.5">Learning objectives help the agent detect misconceptions more accurately.</p>
      </div>

      <div className="rounded-2xl border p-4 space-y-4"
        style={{ background: 'rgba(0,0,0,0.25)', borderColor: 'rgba(0,0,0,0.06)' }}>
        <p className="text-molted-white text-xs font-bold uppercase tracking-wide">Response options</p>
        <ChipGroup label="Tone" value={opts.tone} onChange={v => setOpts(o => ({ ...o, tone: v }))}
          options={[
            { value: 'conversational', label: 'Conversational' },
            { value: 'formal', label: 'Formal' },
            { value: 'socratic', label: 'Socratic' },
          ]}
        />
        <div>
          <p className="text-molted-muted text-xs font-semibold mb-2">Word count</p>
          <div className="flex items-center gap-3">
            <input type="number" min={50} max={600} value={opts.wordCount}
              onChange={e => setOpts(o => ({ ...o, wordCount: Math.min(600, Math.max(50, Number(e.target.value) || 50)) }))}
              className="w-24 rounded-lg border text-sm text-molted-white text-center py-1.5 focus:outline-none"
              style={{ background: 'rgba(248,249,252,0.95)', borderColor: TEAL_BORDER }}
            />
            <div className="flex gap-1.5">
              {[75, 150, 200, 350].map(n => (
                <button key={n} type="button" onClick={() => setOpts(o => ({ ...o, wordCount: n }))}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all"
                  style={{
                    background: opts.wordCount === n ? TEAL_DIM : 'rgba(0,0,0,0.04)',
                    color: opts.wordCount === n ? TEAL : '#94A3B8',
                    border: `1px solid ${opts.wordCount === n ? TEAL_BORDER : 'rgba(0,0,0,0.06)'}`,
                  }}>
                  {n}w
                </button>
              ))}
            </div>
          </div>
        </div>
        <div>
          <p className="text-molted-muted text-xs font-semibold mb-2">Name students</p>
          <div className="flex gap-2">
            {[{ val: true, label: 'Name them' }, { val: false, label: 'Keep anonymous' }].map(opt => {
              const active = opt.val === opts.nameStudents;
              return (
                <button key={String(opt.val)} type="button" onClick={() => setOpts(o => ({ ...o, nameStudents: opt.val }))}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                  style={{
                    background: active ? TEAL_DIM : 'rgba(0,0,0,0.04)',
                    color: active ? TEAL : '#94A3B8',
                    border: `1px solid ${active ? TEAL_BORDER : 'rgba(0,0,0,0.06)'}`,
                  }}>
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <button onClick={() => onAnalyze(thread, context, opts)} disabled={!ready}
        className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm transition-all duration-200"
        style={{
          background: ready ? TEAL : 'rgba(148,163,184,0.12)',
          color: ready ? '#0A0A0F' : '#64748B',
          cursor: ready ? 'pointer' : 'not-allowed',
        }}>
        {loading ? <><Loader2 size={16} className="animate-spin" /> Analyzing discussion...</>
          : <><MessageSquare size={16} /> Analyze Discussion</>}
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   AGENTIC MODE
══════════════════════════════════════════════════════════════════════════ */

const TOPIC_PRESETS = [
  'The ethics of AI in hiring decisions',
  'Whether social media accelerates political polarization',
  'The role of the Federal Reserve in managing inflation',
  'Nature vs. nurture in personality development',
  'Photosynthesis: light reactions vs. the Calvin cycle',
  'Is globalization a net positive for developing economies?',
];

function AgenticInputPanel({ onRun, loading }: {
  onRun: (topic: string, courseLevel: string, facultyVoice: string, numStudents: number, facultyPersona: string) => void;
  loading: boolean;
}) {
  const [topic, setTopic] = useState('');
  const [courseLevel, setCourseLevel] = useState('undergraduate');
  const [facultyVoice, setFacultyVoice] = useState('conversational');
  const [numStudents, setNumStudents] = useState(4);
  const [facultyPersona, setFacultyPersona] = useState('');
  const ready = topic.trim().length > 5 && !loading;

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-molted-white text-sm font-semibold mb-2">Discussion topic</label>
        <p className="text-molted-muted text-xs mb-3">
          Describe the topic or question you've posted to your class. The agent will generate realistic student responses and reply to each one.
        </p>
        <textarea value={topic} onChange={e => setTopic(e.target.value)}
          placeholder="e.g. Should universities use AI to grade student essays?"
          rows={3}
          className="w-full rounded-2xl border text-sm text-molted-white leading-relaxed resize-none p-4 focus:outline-none transition-colors"
          style={{ background: 'rgba(248,249,252,0.95)', borderColor: topic.length > 0 ? TEAL_BORDER : 'rgba(0,0,0,0.07)' }}
        />
      </div>

      <div>
        <p className="text-molted-muted text-xs font-semibold mb-2">Or try a preset</p>
        <div className="flex flex-wrap gap-2">
          {TOPIC_PRESETS.map(t => (
            <button key={t} type="button" onClick={() => setTopic(t)}
              className="px-3 py-1.5 rounded-full text-xs transition-all"
              style={{
                background: topic === t ? TEAL_DIM : 'rgba(0,0,0,0.04)',
                color: topic === t ? TEAL : '#94A3B8',
                border: `1px solid ${topic === t ? TEAL_BORDER : 'rgba(0,0,0,0.06)'}`,
              }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border p-4 space-y-4"
        style={{ background: 'rgba(0,0,0,0.25)', borderColor: 'rgba(0,0,0,0.06)' }}>
        <p className="text-molted-white text-xs font-bold uppercase tracking-wide">Simulation settings</p>

        <ChipGroup label="Course level" value={courseLevel} onChange={setCourseLevel}
          options={[
            { value: 'undergraduate', label: 'Undergraduate' },
            { value: 'graduate', label: 'Graduate' },
            { value: 'doctoral', label: 'Doctoral' },
          ]}
        />

        <ChipGroup label="Faculty voice" value={facultyVoice} onChange={setFacultyVoice}
          options={[
            { value: 'conversational', label: 'Conversational' },
            { value: 'socratic', label: 'Socratic' },
            { value: 'formal', label: 'Formal' },
          ]}
        />

        <div>
          <p className="text-molted-muted text-xs font-semibold mb-1">About you <span className="font-normal opacity-60">(optional)</span></p>
          <p className="text-molted-subtle text-xs mb-2">Share your personality, passions, hobbies, or teaching background — the agent will weave these into every reply.</p>
          <textarea
            value={facultyPersona}
            onChange={e => setFacultyPersona(e.target.value)}
            placeholder="e.g. I'm a former software engineer who pivoted to teaching. I'm passionate about ethics in tech, love hiking, and often use sports analogies to explain complex systems. I believe learning happens through productive discomfort."
            rows={4}
            className="w-full rounded-xl border text-xs text-molted-white leading-relaxed resize-none p-3 focus:outline-none transition-colors"
            style={{
              background: 'rgba(248,249,252,0.06)',
              borderColor: facultyPersona.length > 0 ? TEAL_BORDER : 'rgba(148,163,184,0.15)',
              color: '#CBD5E1',
            }}
          />
        </div>

        <div>
          <p className="text-molted-muted text-xs font-semibold mb-2">Number of students</p>
          <div className="flex gap-2">
            {[2, 3, 4, 5, 6].map(n => (
              <button key={n} type="button" onClick={() => setNumStudents(n)}
                className="w-10 h-9 rounded-lg text-xs font-bold transition-all"
                style={{
                  background: numStudents === n ? TEAL_DIM : 'rgba(0,0,0,0.04)',
                  color: numStudents === n ? TEAL : '#94A3B8',
                  border: `1px solid ${numStudents === n ? TEAL_BORDER : 'rgba(0,0,0,0.06)'}`,
                }}>
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button onClick={() => onRun(topic, courseLevel, facultyVoice, numStudents, facultyPersona)} disabled={!ready}
        className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm transition-all duration-200"
        style={{
          background: ready ? '#7C3AED' : 'rgba(148,163,184,0.12)',
          color: ready ? '#ffffff' : '#64748B',
          cursor: ready ? 'pointer' : 'not-allowed',
        }}>
        {loading
          ? <><Loader2 size={16} className="animate-spin" /> Running simulation...</>
          : <><Zap size={16} /> Run Agentic Simulation</>}
      </button>
    </div>
  );
}

/* ── Cohort persona cards ─────────────────────────────────────────────────── */

function PersonaSection({ personas }: { personas: StudentPersona[] }) {
  const [expanded, setExpanded] = useState(true);

  if (!personas?.length) return null;

  return (
    <div className="rounded-2xl border overflow-hidden"
      style={{ background: 'rgba(124,58,237,0.06)', borderColor: 'rgba(124,58,237,0.20)' }}>
      <button className="w-full flex items-center justify-between px-5 py-3.5"
        onClick={() => setExpanded(e => !e)}>
        <div className="flex items-center gap-2">
          <Users size={13} style={{ color: '#A78BFA' }} />
          <p className="text-xs font-bold uppercase tracking-wide" style={{ color: '#A78BFA' }}>
            Cohort plan — {personas.length} students
          </p>
        </div>
        <ChevronDown size={12} style={{
          color: '#7C3AED',
          transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 200ms',
        }} />
      </button>

      {expanded && (
        <div className="px-5 pb-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {personas.map((p, i) => (
            <div key={i} className="rounded-xl p-3.5 border"
              style={{ background: 'rgba(255,255,255,0.025)', borderColor: 'rgba(124,58,237,0.15)' }}>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0"
                  style={{ background: 'rgba(124,58,237,0.20)', color: '#A78BFA', border: '1px solid rgba(124,58,237,0.25)' }}>
                  {initials(p.name)}
                </div>
                <div>
                  <p className="text-xs font-bold text-molted-white">{p.name}</p>
                  <p className="text-[10px]" style={{ color: '#64748B' }}>{p.year} · {p.major}</p>
                </div>
              </div>
              <p className="text-[11px] leading-relaxed mb-1.5" style={{ color: '#94A3B8' }}>{p.background}</p>
              <div className="flex items-start gap-1.5">
                <AlertTriangle size={9} className="shrink-0 mt-0.5" style={{ color: '#F87171' }} />
                <p className="text-[10px] italic" style={{ color: '#F87171' }}>{p.likelyWeakness}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Agentic thread card ─────────────────────────────────────────────────── */

function AgenticThreadCard({ post, index, visible }: { post: AgenticPost; index: number; visible: boolean }) {
  const [showDraft, setShowDraft] = useState(false);
  const cfg = QUALITY_CONFIG[post.quality];
  const rcfg = ROUTING_AGENTIC_CONFIG[post.routingDecision] ?? ROUTING_AGENTIC_CONFIG.reply;
  const dcfg = DEPTH_CONFIG[post.depth] ?? DEPTH_CONFIG.probing;
  const Icon = cfg.icon;
  const replyText = showDraft ? post.draftReply : post.facultyReply;

  return (
    <div
      className="transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(14px)',
        transitionDelay: `${index * 80}ms`,
      }}
    >
      {/* Student post */}
      <div className="flex gap-3 mb-3">
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
            {initials(post.author)}
          </div>
          <div className="w-px flex-1 min-h-[24px]" style={{ background: 'rgba(148,163,184,0.12)' }} />
        </div>
        <div className="flex-1 pb-2">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-sm font-semibold text-molted-white">{post.author}</span>
            {/* Quality + confidence */}
            <div className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
              <Icon size={9} />
              {post.label}
              {post.confidence != null && (
                <span className="text-[9px] opacity-65 ml-0.5">{post.confidence}%</span>
              )}
            </div>
            {/* Routing badge */}
            <div className="text-[10px] px-2 py-0.5 rounded-full font-black"
              style={{ background: rcfg.bg, color: rcfg.color, border: `1px solid ${rcfg.border}` }}>
              {rcfg.label}
            </div>
          </div>

          <div className="rounded-2xl rounded-tl-sm p-4 text-sm text-molted-white/85 leading-relaxed"
            style={{ background: 'rgba(248,249,252,0.06)', border: '1px solid rgba(148,163,184,0.10)' }}>
            {post.post}
            {/* Quoted evidence inline */}
            {post.quotedEvidence && (
              <div className="mt-3 pt-3 border-t border-white/5 flex items-start gap-2">
                <Quote size={10} className="shrink-0 mt-0.5 opacity-50" style={{ color: cfg.color }} />
                <p className="text-xs italic opacity-60">
                  Evidence: "<span style={{ color: cfg.color }}>{post.quotedEvidence}</span>"
                </p>
              </div>
            )}
            {post.issue && (
              <div className="mt-2 pt-2 border-t border-blue-900/30">
                <p className="text-xs text-blue-400 font-semibold">
                  Misconception: <span className="font-normal text-molted-muted">{post.issue}</span>
                </p>
              </div>
            )}
          </div>

          {/* Routing reason */}
          {post.routingReason && (
            <p className="text-xs italic mt-1.5 px-1" style={{ color: '#475569' }}>{post.routingReason}</p>
          )}
        </div>
      </div>

      {/* Faculty reply */}
      <div className="flex gap-3 mb-7 pl-2">
        <div className="flex-shrink-0">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: TEAL_DIM, color: TEAL, border: `1px solid ${TEAL_BORDER}` }}>
            FA
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1.5 flex-wrap gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-sm font-semibold" style={{ color: TEAL }}>Faculty</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                style={{ background: TEAL_DIM, color: TEAL, border: `1px solid ${TEAL_BORDER}` }}>
                AI Reply
              </span>
              {/* Depth badge */}
              <span className="text-[10px] px-2 py-0.5 rounded-full font-black"
                style={{ background: `${dcfg.color}18`, color: dcfg.color, border: `1px solid ${dcfg.color}30` }}>
                {dcfg.label}
              </span>
              {/* Draft / Revised toggle */}
              {post.draftReply && post.facultyReply && (
                <div className="flex rounded-lg overflow-hidden border text-[10px] font-black"
                  style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                  <button
                    onClick={() => setShowDraft(true)}
                    className="px-2.5 py-0.5 transition-colors"
                    style={{
                      background: showDraft ? 'rgba(249,115,22,0.15)' : 'transparent',
                      color: showDraft ? '#F97316' : '#475569',
                    }}
                  >
                    Draft
                  </button>
                  <button
                    onClick={() => setShowDraft(false)}
                    className="px-2.5 py-0.5 transition-colors"
                    style={{
                      background: !showDraft ? TEAL_DIM : 'transparent',
                      color: !showDraft ? TEAL : '#475569',
                    }}
                  >
                    Revised ✓
                  </button>
                </div>
              )}
            </div>
            <CopyButton text={replyText ?? ''} />
          </div>

          {/* Draft critique */}
          {showDraft && post.draftCritique && (
            <div className="mb-2 px-3 py-2 rounded-lg text-xs italic"
              style={{ background: 'rgba(249,115,22,0.07)', border: '1px solid rgba(249,115,22,0.15)', color: '#FB923C' }}>
              Critique: {post.draftCritique}
            </div>
          )}

          <div className="rounded-2xl rounded-tl-sm p-4 text-sm leading-relaxed"
            style={{ background: 'rgba(30,58,138,0.75)', border: `1px solid ${TEAL_BORDER}`, color: '#F1F5F9' }}>
            {replyText}
          </div>
        </div>
      </div>
    </div>
  );
}

function AgenticResults({ analysis, traceEvents }: { analysis: AgenticAnalysis; traceEvents: TraceEvent[] }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCount(c => {
        if (c >= analysis.posts.length) { clearInterval(interval); return c; }
        return c + 1;
      });
    }, 400);
    return () => clearInterval(interval);
  }, [analysis]);

  const miscCount = analysis.posts.filter(p => p.quality === 'misconception').length;
  const strongCount = analysis.posts.filter(p => p.quality === 'strong').length;
  const allVisible = visibleCount >= analysis.posts.length;

  return (
    <div className="space-y-6">
      {/* Trace log (auto-collapsed) */}
      {traceEvents.length > 0 && <TraceLog events={traceEvents} loading={false} />}

      {/* Summary bar */}
      <div className="rounded-2xl p-5 border" style={{ background: 'rgba(124,58,237,0.12)', borderColor: 'rgba(124,58,237,0.25)' }}>
        <div className="flex items-center gap-2 mb-2">
          <Zap size={13} style={{ color: '#7C3AED' }} />
          <p className="text-xs font-bold uppercase tracking-wide" style={{ color: '#7C3AED' }}>Agentic Simulation</p>
        </div>
        <p className="text-molted-white text-sm font-semibold mb-1">{analysis.topic}</p>
        <p className="text-molted-muted text-xs">{analysis.summary}</p>
        <div className="flex gap-4 mt-3 text-xs flex-wrap">
          <span className="text-molted-muted">{analysis.posts.length} students simulated</span>
          {miscCount > 0 && <span className="text-red-400">{miscCount} misconception{miscCount > 1 ? 's' : ''} flagged</span>}
          {strongCount > 0 && <span style={{ color: TEAL }}>{strongCount} strong post{strongCount > 1 ? 's' : ''}</span>}
        </div>
      </div>

      {/* Cohort persona cards */}
      {analysis.personas?.length > 0 && <PersonaSection personas={analysis.personas} />}

      {/* Thread */}
      <div>
        {analysis.posts.map((post, i) => (
          <AgenticThreadCard key={i} post={post} index={i} visible={i < visibleCount} />
        ))}
      </div>

      {/* Class-wide pattern */}
      {allVisible && analysis.classPattern && (
        <div className="rounded-2xl p-5 border" style={{ background: 'rgba(139,92,246,0.08)', borderColor: 'rgba(139,92,246,0.22)' }}>
          <div className="flex items-center gap-2 mb-2">
            <GitBranch size={13} style={{ color: '#8B5CF6' }} />
            <p className="text-xs font-bold uppercase tracking-wide" style={{ color: '#8B5CF6' }}>Class-wide pattern</p>
          </div>
          <p className="text-molted-white text-sm leading-relaxed">{analysis.classPattern}</p>
        </div>
      )}

      {/* Follow-up prompt */}
      {allVisible && analysis.followUpPrompt && (
        <div className="rounded-2xl border" style={{ background: 'rgba(248,249,252,0.95)', borderColor: 'rgba(0,0,0,0.06)' }}>
          <div className="flex items-center justify-between px-5 pt-4 pb-2">
            <div className="flex items-center gap-2">
              <ArrowRight size={13} style={{ color: TEAL }} />
              <p className="text-xs font-bold uppercase tracking-wide" style={{ color: TEAL }}>Follow-up prompt for next session</p>
            </div>
            <CopyButton text={analysis.followUpPrompt} />
          </div>
          <p className="px-5 pb-4 text-sm leading-relaxed italic" style={{ color: '#CBD5E1' }}>
            "{analysis.followUpPrompt}"
          </p>
        </div>
      )}

      {/* Pedagogical insight */}
      {allVisible && (
        <div className="rounded-2xl p-5 border" style={{ background: 'rgba(248,249,252,0.95)', borderColor: 'rgba(0,0,0,0.06)' }}>
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={14} style={{ color: '#64748B' }} />
            <p className="text-sm font-semibold text-molted-white">Pedagogical Insight</p>
          </div>
          <p className="text-molted-muted text-sm leading-relaxed">{analysis.insights}</p>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════════════ */

type Mode = 'manual' | 'agentic';

export default function DiscussionDemo() {
  const [mode, setMode] = useState<Mode>('manual');
  const [manualAnalysis, setManualAnalysis] = useState<ManualAnalysis | null>(null);
  const [agenticAnalysis, setAgenticAnalysis] = useState<AgenticAnalysis | null>(null);
  const [traceEvents, setTraceEvents] = useState<TraceEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function callAPI(body: Record<string, unknown>) {
    setLoading(true);
    setError(null);
    setTraceEvents([]);

    try {
      const res = await fetch('/api/discuss', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok || !res.body) {
        let errMsg = `Server error (${res.status})`;
        try { errMsg = (await res.json()).error ?? errMsg; } catch {}
        setError(errMsg);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        // Parse complete SSE events (terminated by \n\n)
        const parts = buffer.split('\n\n');
        buffer = parts.pop() ?? '';

        for (const part of parts) {
          if (!part.trim()) continue;
          let eventType = 'message';
          let eventData = '';
          for (const line of part.split('\n')) {
            if (line.startsWith('event: ')) eventType = line.slice(7).trim();
            else if (line.startsWith('data: ')) eventData = line.slice(6).trim();
          }
          if (!eventData) continue;
          try {
            const parsed = JSON.parse(eventData);
            if (eventType === 'trace') {
              setTraceEvents(prev => [...prev, { ...parsed, timestamp: Date.now() }]);
            } else if (eventType === 'result') {
              if (body.mode === 'agentic') setAgenticAnalysis(parsed);
              else setManualAnalysis(parsed);
            } else if (eventType === 'error') {
              setError(parsed.message ?? 'Stream error');
            }
          } catch {
            // ignore malformed events
          }
        }
      }
    } catch {
      setError('Network error — check your connection.');
    } finally {
      setLoading(false);
    }
  }

  function handleManual(thread: string, context: string, opts: ResponseOptions) {
    setManualAnalysis(null);
    callAPI({ mode: 'manual', thread, context, opts });
  }

  function handleAgentic(topic: string, courseLevel: string, facultyVoice: string, numStudents: number, facultyPersona: string) {
    setAgenticAnalysis(null);
    callAPI({ mode: 'agentic', topic, courseLevel, facultyVoice, numStudents, facultyPersona });
  }

  const switchMode = (m: Mode) => { setMode(m); setError(null); };
  const hasResult = mode === 'manual' ? !!manualAnalysis : !!agenticAnalysis;

  return (
    <MoltedLayout>
      <div className="min-h-screen pt-24 pb-24 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <Link to="/teachos"
              className="inline-flex items-center gap-1.5 text-molted-muted text-sm hover:text-molted-white transition-colors mb-6">
              <ChevronLeft size={14} />
              Forge
            </Link>
            <h1 className="text-3xl md:text-4xl font-black text-molted-white tracking-tight">
              Discussion Intelligence
              <br />
              <span style={{ color: TEAL }}>Two ways to use it.</span>
            </h1>
            <p className="mt-3 text-molted-muted text-base max-w-lg leading-relaxed">
              Paste a real thread for analysis — or let the agent simulate a full discussion and respond to every student in your voice.
            </p>
          </div>

          {/* Mode toggle */}
          <div className="flex gap-2 mb-8 p-1 rounded-2xl w-fit"
            style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(148,163,184,0.10)' }}>
            <button onClick={() => switchMode('manual')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
              style={{
                background: mode === 'manual' ? 'rgba(255,255,255,0.07)' : 'transparent',
                color: mode === 'manual' ? '#E2E8F0' : '#64748B',
                border: mode === 'manual' ? '1px solid rgba(148,163,184,0.15)' : '1px solid transparent',
              }}>
              <BookOpen size={14} />
              Manual
            </button>
            <button onClick={() => switchMode('agentic')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
              style={{
                background: mode === 'agentic' ? 'rgba(124,58,237,0.15)' : 'transparent',
                color: mode === 'agentic' ? '#A78BFA' : '#64748B',
                border: mode === 'agentic' ? '1px solid rgba(124,58,237,0.30)' : '1px solid transparent',
              }}>
              <Zap size={14} />
              Agentic
              <span className="text-[10px] px-1.5 py-0.5 rounded-full font-black"
                style={{ background: 'rgba(124,58,237,0.20)', color: '#A78BFA' }}>
                NEW
              </span>
            </button>
          </div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-start">

            {/* Input panel */}
            <div className="rounded-3xl p-6 border sticky top-24"
              style={{ background: 'rgba(241,243,248,0.90)', borderColor: 'rgba(0,0,0,0.06)' }}>
              {mode === 'manual'
                ? <ManualInputPanel onAnalyze={handleManual} loading={loading} />
                : <AgenticInputPanel onRun={handleAgentic} loading={loading} />}
            </div>

            {/* Results panel */}
            <div>
              {error && (
                <div className="rounded-2xl p-5 border mb-5"
                  style={{ background: 'rgba(30,58,138,0.08)', borderColor: 'rgba(30,58,138,0.2)' }}>
                  <p className="text-red-400 text-sm font-semibold mb-1">Error</p>
                  <p className="text-molted-muted text-sm">{error}</p>
                </div>
              )}

              {/* Loading — show live trace log */}
              {loading && (
                <div className="space-y-4">
                  <TraceLog events={traceEvents} loading={true} />
                  <div className="rounded-2xl p-6 border text-center"
                    style={{
                      background: mode === 'agentic' ? 'rgba(124,58,237,0.04)' : 'rgba(241,243,248,0.06)',
                      borderColor: mode === 'agentic' ? 'rgba(124,58,237,0.15)' : 'rgba(148,163,184,0.10)',
                    }}>
                    <Loader2
                      size={18}
                      className="animate-spin mx-auto mb-2"
                      style={{ color: mode === 'agentic' ? '#A78BFA' : TEAL }}
                    />
                    <p className="text-molted-muted text-xs">
                      {mode === 'agentic'
                        ? 'Simulating cohort, generating posts, drafting and revising replies...'
                        : 'Parsing thread, routing posts, drafting and self-revising responses...'}
                    </p>
                  </div>
                </div>
              )}

              {/* Empty state */}
              {!hasResult && !loading && !error && (
                <div className="rounded-3xl p-10 border text-center"
                  style={{ background: 'rgba(248,249,252,0.95)', borderColor: 'rgba(148,163,184,0.15)' }}>
                  {mode === 'manual'
                    ? <MessageSquare size={32} className="mx-auto mb-4" style={{ color: '#64748B' }} />
                    : <Zap size={32} className="mx-auto mb-4" style={{ color: '#7C3AED' }} />}
                  <p className="font-semibold mb-2" style={{ color: '#1C1C1E' }}>
                    {mode === 'manual' ? 'Analysis will appear here' : 'Simulated thread will appear here'}
                  </p>
                  <p className="text-sm whitespace-pre-line" style={{ color: '#94A3B8' }}>
                    {mode === 'manual'
                      ? 'Paste a discussion thread and click Analyze.\nWorks with Canvas, Blackboard, D2L, or any plain text.'
                      : 'Enter a topic and click Run Agentic Simulation.\nThe agent will plan a student cohort, simulate posts,\nand draft + self-revise every faculty reply.'}
                  </p>
                </div>
              )}

              {mode === 'manual' && manualAnalysis && (
                <ManualResults analysis={manualAnalysis} traceEvents={traceEvents} />
              )}
              {mode === 'agentic' && agenticAnalysis && (
                <AgenticResults analysis={agenticAnalysis} traceEvents={traceEvents} />
              )}
            </div>
          </div>

          {/* Footer nudge */}
          <div className="mt-16 rounded-3xl p-8 border text-center"
            style={{ background: 'rgba(241,243,248,0.90)', borderColor: 'rgba(0,0,0,0.06)' }}>
            <p className="text-molted-muted text-sm mb-1">This is Forge Discussion Intelligence — beta.</p>
            <p className="text-molted-white font-semibold mb-5">
              Next: LMS integration so you never have to paste again.
            </p>
            <a href="mailto:hello@molted.ai"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:-translate-y-px"
              style={{ background: TEAL, color: '#ffffff' }}>
              Join the early access list
              <ArrowRight size={14} />
            </a>
          </div>

        </div>
      </div>
    </MoltedLayout>
  );
}
