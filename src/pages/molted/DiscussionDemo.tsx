import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare, AlertTriangle, Star, Minus, Users,
  Copy, Check, ChevronLeft, Loader2, ArrowRight, Lightbulb,
  Zap, BookOpen,
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

/* ══════════════════════════════════════════════════════════════════════════
   MANUAL MODE
══════════════════════════════════════════════════════════════════════════ */

interface ManualPost {
  author: string;
  excerpt: string;
  quality: Quality;
  label: string;
  issue: string | null;
  draftResponse: string | null;
}
interface ManualAnalysis {
  summary: string;
  instructorPost: string;
  posts: ManualPost[];
  insights: string;
}

function ManualPostCard({ post }: { post: ManualPost }) {
  const [expanded, setExpanded] = useState(post.quality === 'misconception');
  const cfg = QUALITY_CONFIG[post.quality];
  const Icon = cfg.icon;

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
        <div className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-semibold flex-shrink-0"
          style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
          <Icon size={11} />
          {post.label}
        </div>
      </button>

      {expanded && post.draftResponse && (
        <div className="px-4 pb-4 space-y-3">
          {post.issue && (
            <div className="rounded-xl p-3 text-xs leading-relaxed"
              style={{ background: 'rgba(148,163,184,0.05)', border: '1px solid rgba(0,0,0,0.06)' }}>
              <p className="text-red-400 font-semibold mb-1">Issue detected</p>
              <p className="text-molted-muted">{post.issue}</p>
            </div>
          )}
          <div className="rounded-xl p-4" style={{ background: 'rgba(148,163,184,0.05)', border: '1px solid rgba(0,0,0,0.06)' }}>
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

type ManualFilter = 'all' | 'misconception' | 'strong';

function ManualResults({ analysis }: { analysis: ManualAnalysis }) {
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
    <div className="space-y-6">
      <div className="rounded-2xl p-5 border" style={{ background: TEAL_DIM, borderColor: TEAL_BORDER }}>
        <p className="text-molted-white text-sm font-semibold mb-1">{analysis.summary}</p>
        <div className="flex gap-4 mt-3 text-xs text-molted-muted">
          <span>{analysis.posts.length} posts analyzed</span>
          {miscCount > 0 && <span className="text-red-400">{miscCount} misconception{miscCount > 1 ? 's' : ''}</span>}
          {strongCount > 0 && <span style={{ color: TEAL }}>{strongCount} strong post{strongCount > 1 ? 's' : ''}</span>}
        </div>
      </div>

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

      <div>
        <div className="flex gap-2 flex-wrap mb-5">
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

interface AgenticPost {
  author: string;
  post: string;
  quality: Quality;
  label: string;
  issue: string | null;
  facultyReply: string;
}
interface AgenticAnalysis {
  topic: string;
  summary: string;
  posts: AgenticPost[];
  insights: string;
}

const TOPIC_PRESETS = [
  'The ethics of AI in hiring decisions',
  'Whether social media accelerates political polarization',
  'The role of the Federal Reserve in managing inflation',
  'Nature vs. nurture in personality development',
  'Photosynthesis: light reactions vs. the Calvin cycle',
  'Is globalization a net positive for developing economies?',
];

function AgenticInputPanel({ onRun, loading }: {
  onRun: (topic: string, courseLevel: string, facultyVoice: string, numStudents: number) => void;
  loading: boolean;
}) {
  const [topic, setTopic] = useState('');
  const [courseLevel, setCourseLevel] = useState('undergraduate');
  const [facultyVoice, setFacultyVoice] = useState('conversational');
  const [numStudents, setNumStudents] = useState(4);
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

      {/* Preset chips */}
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

      <button onClick={() => onRun(topic, courseLevel, facultyVoice, numStudents)} disabled={!ready}
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

/* ── Agentic thread card ─────────────────────────────────────────────────── */
function AgenticThreadCard({ post, index, visible }: { post: AgenticPost; index: number; visible: boolean }) {
  const cfg = QUALITY_CONFIG[post.quality];
  const Icon = cfg.icon;

  return (
    <div
      className="transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
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
          <div className="w-px flex-1 min-h-[24px]" style={{ background: 'rgba(148,163,184,0.15)' }} />
        </div>
        <div className="flex-1 pb-2">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-sm font-semibold text-molted-white">{post.author}</span>
            <div className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
              <Icon size={9} />
              {post.label}
            </div>
          </div>
          <div className="rounded-2xl rounded-tl-sm p-4 text-sm text-molted-white/85 leading-relaxed"
            style={{ background: 'rgba(248,249,252,0.06)', border: '1px solid rgba(148,163,184,0.10)' }}>
            {post.post}
            {post.issue && (
              <div className="mt-3 pt-3 border-t border-blue-900/30">
                <p className="text-xs text-blue-400 font-semibold">Misconception detected: <span className="font-normal text-molted-muted">{post.issue}</span></p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Faculty reply */}
      <div className="flex gap-3 mb-6 pl-2">
        <div className="flex-shrink-0">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: TEAL_DIM, color: TEAL, border: `1px solid ${TEAL_BORDER}` }}>
            FA
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold" style={{ color: TEAL }}>Faculty</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                style={{ background: TEAL_DIM, color: TEAL, border: `1px solid ${TEAL_BORDER}` }}>
                AI Reply
              </span>
            </div>
            <CopyButton text={post.facultyReply} />
          </div>
          <div className="rounded-2xl rounded-tl-sm p-4 text-sm leading-relaxed"
            style={{ background: TEAL_DIM, border: `1px solid ${TEAL_BORDER}`, color: '#E2E8F0' }}>
            {post.facultyReply}
          </div>
        </div>
      </div>
    </div>
  );
}

function AgenticResults({ analysis }: { analysis: AgenticAnalysis }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    // Stagger reveal of each thread card
    const interval = setInterval(() => {
      setVisibleCount(c => {
        if (c >= analysis.posts.length) {
          clearInterval(interval);
          return c;
        }
        return c + 1;
      });
    }, 400);
    return () => clearInterval(interval);
  }, [analysis]);

  const miscCount = analysis.posts.filter(p => p.quality === 'misconception').length;
  const strongCount = analysis.posts.filter(p => p.quality === 'strong').length;

  return (
    <div className="space-y-6">
      {/* Summary bar */}
      <div className="rounded-2xl p-5 border" style={{ background: 'rgba(124,58,237,0.12)', borderColor: 'rgba(124,58,237,0.25)' }}>
        <div className="flex items-center gap-2 mb-2">
          <Zap size={13} style={{ color: '#7C3AED' }} />
          <p className="text-xs font-bold uppercase tracking-wide" style={{ color: '#7C3AED' }}>Agentic Simulation</p>
        </div>
        <p className="text-molted-white text-sm font-semibold mb-1">{analysis.topic}</p>
        <p className="text-molted-muted text-xs">{analysis.summary}</p>
        <div className="flex gap-4 mt-3 text-xs text-molted-muted">
          <span>{analysis.posts.length} students simulated</span>
          {miscCount > 0 && <span className="text-red-400">{miscCount} misconception{miscCount > 1 ? 's' : ''} flagged</span>}
          {strongCount > 0 && <span style={{ color: TEAL }}>{strongCount} strong post{strongCount > 1 ? 's' : ''}</span>}
        </div>
      </div>

      {/* Thread */}
      <div>
        {analysis.posts.map((post, i) => (
          <AgenticThreadCard key={i} post={post} index={i} visible={i < visibleCount} />
        ))}
      </div>

      {/* Insights */}
      {visibleCount >= analysis.posts.length && (
        <div className="rounded-2xl p-5 border animate-fade-in"
          style={{ background: 'rgba(248,249,252,0.95)', borderColor: 'rgba(0,0,0,0.06)' }}>
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function callAPI(body: Record<string, unknown>) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/discuss', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        let errMsg = 'Something went wrong.';
        try {
          const errData = await res.json();
          errMsg = errData.error ?? errMsg;
        } catch {
          errMsg = `Server error (${res.status})`;
        }
        setError(errMsg);
        return;
      }

      const data = await res.json();
      if (body.mode === 'agentic') {
        setAgenticAnalysis(data);
      } else {
        setManualAnalysis(data);
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

  function handleAgentic(topic: string, courseLevel: string, facultyVoice: string, numStudents: number) {
    setAgenticAnalysis(null);
    callAPI({ mode: 'agentic', topic, courseLevel, facultyVoice, numStudents });
  }

  const switchMode = (m: Mode) => {
    setMode(m);
    setError(null);
  };

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
                <div className="rounded-2xl p-5 border mb-6"
                  style={{ background: 'rgba(30,58,138,0.08)', borderColor: 'rgba(30,58,138,0.2)' }}>
                  <p className="text-red-400 text-sm font-semibold mb-1">Error</p>
                  <p className="text-molted-muted text-sm">{error}</p>
                </div>
              )}

              {!hasResult && !loading && !error && (
                <div className="rounded-3xl p-10 border text-center"
                  style={{ background: 'rgba(248,249,252,0.95)', borderColor: 'rgba(148,163,184,0.15)' }}>
                  {mode === 'manual'
                    ? <MessageSquare size={32} className="mx-auto mb-4" style={{ color: '#64748B' }} />
                    : <Zap size={32} className="mx-auto mb-4" style={{ color: '#7C3AED' }} />}
                  <p className="font-semibold mb-2" style={{ color: '#1C1C1E' }}>
                    {mode === 'manual' ? 'Analysis will appear here' : 'Simulated thread will appear here'}
                  </p>
                  <p className="text-sm" style={{ color: '#94A3B8' }}>
                    {mode === 'manual'
                      ? 'Paste a discussion thread and click Analyze.\nWorks with Canvas, Blackboard, D2L, or any plain text.'
                      : 'Enter a topic and click Run Agentic Simulation.\nThe agent will generate student posts and reply to each one.'}
                  </p>
                </div>
              )}

              {loading && (
                <div className="rounded-3xl p-10 border text-center"
                  style={{
                    background: mode === 'agentic' ? 'rgba(124,58,237,0.06)' : 'rgba(241,243,248,0.80)',
                    borderColor: mode === 'agentic' ? 'rgba(124,58,237,0.25)' : TEAL_BORDER,
                  }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{
                      background: mode === 'agentic' ? 'rgba(124,58,237,0.15)' : TEAL_DIM,
                      border: `1px solid ${mode === 'agentic' ? 'rgba(124,58,237,0.30)' : TEAL_BORDER}`,
                    }}>
                    <Loader2 size={20} className="animate-spin"
                      style={{ color: mode === 'agentic' ? '#A78BFA' : TEAL }} />
                  </div>
                  <p className="text-molted-white font-semibold mb-1">
                    {mode === 'agentic' ? 'Simulating discussion...' : 'Reading the thread...'}
                  </p>
                  <p className="text-molted-muted text-sm">
                    {mode === 'agentic'
                      ? 'Generating student posts, flagging misconceptions, drafting faculty replies with follow-up questions.'
                      : 'Detecting misconceptions, scoring reasoning quality, drafting responses.'}
                  </p>
                </div>
              )}

              {mode === 'manual' && manualAnalysis && <ManualResults analysis={manualAnalysis} />}
              {mode === 'agentic' && agenticAnalysis && <AgenticResults analysis={agenticAnalysis} />}
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
