import { useState, useRef } from 'react';
import { Plus, X, GripVertical, Tag, ChevronDown, ExternalLink, MessageSquare, BookOpen, BarChart3, AlertTriangle, Mail, Mic, Bot, Zap, GraduationCap, TrendingUp, Users, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import MoltedLayout from './MoltedLayout';

/* ── Types ──────────────────────────────────────────────────────────────── */
type Label = { text: string; color: string };
type DemoPreview = {
  href: string;
  color: string;
  accentColor: string;
  icon: React.ElementType;
  label: string;
  mockLines: string[];
};
type Card = {
  id: string;
  title: string;
  description?: string;
  labels?: Label[];
  assignee?: string;
  demo?: DemoPreview;
};
type Column = { id: string; title: string; accent: string; cards: Card[] };

/* ── Seed data ──────────────────────────────────────────────────────────── */
const LABEL_MAP: Record<string, Label> = {
  ai:       { text: 'AI Agent',   color: '#2563EB' },
  alp:      { text: 'ALP',        color: '#7C3AED' },
  infra:    { text: 'Infra',      color: '#475569' },
  analytics:{ text: 'Analytics',  color: '#0891B2' },
  ux:       { text: 'UX',         color: '#D97706' },
  revenue:  { text: 'Revenue',    color: '#16A34A' },
};

const INITIAL_COLUMNS: Column[] = [
  {
    id: 'backlog',
    title: 'Backlog',
    accent: '#94A3B8',
    cards: [
      {
        id: 'c1',
        title: 'Imago OS — Full Institution Transformation Layer',
        description: 'The final-form product: fully transformed AI-native university. Spec and roadmap needed.',
        labels: [LABEL_MAP.alp, LABEL_MAP.ai],
        assignee: 'Roadmap',
      },
      {
        id: 'c2',
        title: 'Mastery AI — Competency-based progression engine',
        description: 'Replaces credits with verified competency tracking across every course.',
        labels: [LABEL_MAP.ai, LABEL_MAP.alp],
        demo: {
          href: '/mastery-ai',
          color: '#6D28D9',
          accentColor: '#8B5CF6',
          icon: GraduationCap,
          label: 'Mastery AI',
          mockLines: ['Competency: Research Methods ████░ 78%', 'Competency: Data Analysis  ███░░ 60%', 'Next unlock: Advanced Stats →'],
        },
      },
      {
        id: 'c3',
        title: 'Flourish Robotics integration spec',
        description: 'Physical-digital bridge for campus AI presence.',
        labels: [LABEL_MAP.infra],
      },
      {
        id: 'c4',
        title: 'University-OS multi-tenant expansion',
        description: 'Scale command center to 5+ partner institutions with separate data isolation.',
        labels: [LABEL_MAP.infra, LABEL_MAP.alp],
      },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    accent: '#2563EB',
    cards: [
      {
        id: 'c5',
        title: 'Outpost — AI-native ALP (full build)',
        description: 'Core platform replacing Canvas/Blackboard. All 8 modules must integrate cleanly.',
        labels: [LABEL_MAP.alp, LABEL_MAP.ai],
        assignee: 'Platform Team',
        demo: {
          href: '/outpost',
          color: '#1E3A8A',
          accentColor: '#2563EB',
          icon: Zap,
          label: 'Outpost',
          mockLines: ['8 modules active', 'Lumen · Forge · Beacon · Pathway', 'Retain · Proof · Mastery · Imago'],
        },
      },
      {
        id: 'c6',
        title: 'Proof AI — Outcomes credentialing system',
        description: 'Generates verified outcome proofs tied to student learning history.',
        labels: [LABEL_MAP.ai, LABEL_MAP.analytics],
        demo: {
          href: '/proof-ai',
          color: '#065F46',
          accentColor: '#10B981',
          icon: Shield,
          label: 'Proof AI',
          mockLines: ['Credential verified ✓', 'Learning trajectory: 14 courses', 'Outcome proof generated →'],
        },
      },
      {
        id: 'c7',
        title: 'Retain AI — Stop-out risk detection',
        description: 'Behavioral pattern analysis to flag at-risk students before they disengage.',
        labels: [LABEL_MAP.ai, LABEL_MAP.analytics],
        assignee: 'AI Team',
        demo: {
          href: '/retain-ai',
          color: '#7C2D12',
          accentColor: '#F97316',
          icon: TrendingUp,
          label: 'Retain AI',
          mockLines: ['⚠ 3 students — high risk', '→ Marcus T. — 5 days offline', '→ Check-in drafted automatically'],
        },
      },
      {
        id: 'c8',
        title: 'Browser extension — Canvas/Blackboard overlay',
        description: 'Zero-integration deployment layer. Works on any existing LMS without API access.',
        labels: [LABEL_MAP.infra, LABEL_MAP.ux],
      },
    ],
  },
  {
    id: 'review',
    title: 'Review / Testing',
    accent: '#D97706',
    cards: [
      {
        id: 'c9',
        title: 'Outcomes AI — Institutional intelligence dashboard',
        description: 'Dean and provost-level reporting. Real-time outcome signals across all colleges.',
        labels: [LABEL_MAP.analytics, LABEL_MAP.ux],
        assignee: 'Design',
        demo: {
          href: '/outcomes-ai',
          color: '#1E40AF',
          accentColor: '#3B82F6',
          icon: BarChart3,
          label: 'Outcomes AI',
          mockLines: ['Retention rate: 91.4% ↑', 'At-risk flags: 47 active', 'Board report: ready to export'],
        },
      },
      {
        id: 'c10',
        title: 'Early Warning System — 5-signal risk model',
        description: 'Login gaps + grade drops + discussion silence + financial flags + course load.',
        labels: [LABEL_MAP.ai, LABEL_MAP.analytics],
        demo: {
          href: '/forge/early-warning',
          color: '#92400E',
          accentColor: '#F59E0B',
          icon: AlertTriangle,
          label: 'Early Warning',
          mockLines: ['Signal: No login — 5 days', 'Signal: Grade drop — 2 assignments', 'Action: Check-in scheduled ✓'],
        },
      },
      {
        id: 'c11',
        title: 'Founding Partner deck — GCU co-dev agreement',
        description: 'Governance rights, preferred pricing, licensing terms for first university partner.',
        labels: [LABEL_MAP.revenue],
      },
    ],
  },
  {
    id: 'live',
    title: 'Live',
    accent: '#16A34A',
    cards: [
      {
        id: 'c12',
        title: 'Lumen — AI reading companion',
        description: 'Activates in-context as students read. Deployed at 170K students.',
        labels: [LABEL_MAP.ai],
        assignee: 'Shipped',
        demo: {
          href: '/lumen',
          color: '#1E3A8A',
          accentColor: '#60A5FA',
          icon: BookOpen,
          label: 'Lumen',
          mockLines: ['Student reading: Pharmacology Ch.4', 'Lumen: "Want me to explain that?"', '→ Answers in context, instantly'],
        },
      },
      {
        id: 'c13',
        title: 'Forge — Faculty AI toolkit',
        description: 'Course architect, agentic grader, auto-respond, discussion agent. All live.',
        labels: [LABEL_MAP.ai, LABEL_MAP.ux],
        assignee: 'Shipped',
        demo: {
          href: '/forge',
          color: '#1E40AF',
          accentColor: '#2563EB',
          icon: Users,
          label: 'Forge',
          mockLines: ['Discussion agent — 4 replies sent', 'Grader — 12 submissions reviewed', 'Auto-respond — 8 emails drafted'],
        },
      },
      {
        id: 'c14',
        title: 'Discussion Agent — live in-thread AI',
        description: 'Replies to student discussion posts in real time. Deepens threads, answers questions.',
        labels: [LABEL_MAP.ai],
        assignee: 'Shipped',
        demo: {
          href: '/forge/discussion',
          color: '#1D4ED8',
          accentColor: '#3B82F6',
          icon: MessageSquare,
          label: 'Discussion Demo',
          mockLines: ['"What is cognitive load theory?"', '→ Agent replies in 4 seconds', 'Faculty reviews before publish'],
        },
      },
      {
        id: 'c15',
        title: 'Agentic Grader — AI feedback engine',
        description: 'Doctoral and undergraduate submission review. Structured rubric-based feedback.',
        labels: [LABEL_MAP.ai],
        assignee: 'Shipped',
        demo: {
          href: '/forge/agentic-grader',
          color: '#4C1D95',
          accentColor: '#7C3AED',
          icon: Bot,
          label: 'Agentic Grader',
          mockLines: ['Submission: Week 4 Essay', 'Rubric matched: 4 criteria', 'Feedback drafted — ready to send'],
        },
      },
      {
        id: 'c16',
        title: 'Auto-Respond — faculty email AI',
        description: 'Drafts replies to student email queues. Faculty approves before sending.',
        labels: [LABEL_MAP.ai],
        assignee: 'Shipped',
        demo: {
          href: '/forge/auto-respond',
          color: '#065F46',
          accentColor: '#10B981',
          icon: Mail,
          label: 'Auto-Respond',
          mockLines: ['Queue: 14 unanswered emails', '→ 14 drafts ready in 90 seconds', 'Faculty review time: ~2 min'],
        },
      },
      {
        id: 'c17',
        title: 'Course Architect — syllabus-to-course AI',
        description: 'Generates full semester course infrastructure from a single syllabus upload.',
        labels: [LABEL_MAP.ai, LABEL_MAP.ux],
        assignee: 'Shipped',
        demo: {
          href: '/forge/course-architect',
          color: '#1E3A8A',
          accentColor: '#0891B2',
          icon: GraduationCap,
          label: 'Course Architect',
          mockLines: ['Syllabus: NURS 301 uploaded', '→ 16-week plan generated', 'Discussion prompts: 32 created'],
        },
      },
      {
        id: 'c18',
        title: 'Beacon — Institutional analytics AI',
        description: 'Provost-facing intelligence layer. Enrollment, retention, outcomes in real time.',
        labels: [LABEL_MAP.analytics],
        assignee: 'Shipped',
        demo: {
          href: '/beacon',
          color: '#1E3A8A',
          accentColor: '#1D4ED8',
          icon: BarChart3,
          label: 'Beacon',
          mockLines: ['Live dashboard: 170K students', 'Risk signals: 47 flagged today', 'Outcomes trending: +12% YoY'],
        },
      },
      {
        id: 'c19',
        title: 'Pathway AI — Career outcome mapping',
        description: 'Post-graduation career trajectory intelligence tied to program completion.',
        labels: [LABEL_MAP.ai, LABEL_MAP.analytics],
        assignee: 'Shipped',
        demo: {
          href: '/pathway-ai',
          color: '#065F46',
          accentColor: '#059669',
          icon: TrendingUp,
          label: 'Pathway AI',
          mockLines: ['Program: BSN Nursing', 'Top outcome: RN placement 94%', 'Career pathway mapped: 8 roles'],
        },
      },
      {
        id: 'c20',
        title: 'Voice Demo — live agent in conversation',
        description: 'Interactive voice-mode AI agent demo. Showcases real-time conversational ALP.',
        labels: [LABEL_MAP.ai, LABEL_MAP.ux],
        assignee: 'Shipped',
        demo: {
          href: '/forge/voice-demo',
          color: '#1E3A8A',
          accentColor: '#6366F1',
          icon: Mic,
          label: 'Voice Demo',
          mockLines: ['Agent listening…', 'Student: "I don\'t understand..."', '→ Agent responds in real time'],
        },
      },
    ],
  },
];

/* ── Demo Preview Thumbnail ─────────────────────────────────────────────── */
function DemoThumbnail({ demo }: { demo: DemoPreview }) {
  const Icon = demo.icon;
  return (
    <Link
      to={demo.href}
      className="group/demo block mt-3 rounded-lg overflow-hidden border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
      style={{ borderColor: `${demo.accentColor}30` }}
      onClick={e => e.stopPropagation()}
    >
      {/* Mock screen */}
      <div className="px-3 pt-3 pb-2" style={{ background: `linear-gradient(135deg, ${demo.color}08, ${demo.accentColor}12)` }}>
        {/* Fake browser bar */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <div className="w-2 h-2 rounded-full" style={{ background: `${demo.accentColor}50` }} />
          <div className="flex-1 h-1.5 rounded-full" style={{ background: `${demo.accentColor}20` }} />
        </div>
        {/* Header row */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${demo.color}, ${demo.accentColor})` }}>
            <Icon size={10} color="white" />
          </div>
          <span className="text-xs font-black" style={{ color: demo.color }}>{demo.label}</span>
        </div>
        {/* Mock content lines */}
        <div className="space-y-1">
          {demo.mockLines.map((line, i) => (
            <p key={i} className="text-[10px] leading-snug font-mono" style={{ color: i === 0 ? '#475569' : i === demo.mockLines.length - 1 ? demo.accentColor : '#64748B' }}>
              {line}
            </p>
          ))}
        </div>
      </div>
      {/* Link footer */}
      <div className="flex items-center justify-between px-3 py-1.5"
        style={{ background: `${demo.accentColor}10`, borderTop: `1px solid ${demo.accentColor}20` }}>
        <span className="text-[10px] font-semibold" style={{ color: demo.accentColor }}>View live demo</span>
        <ExternalLink size={9} style={{ color: demo.accentColor }} className="group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5 transition-transform" />
      </div>
    </Link>
  );
}

/* ── Drag state ref type ─────────────────────────────────────────────────── */
type DragState = { cardId: string; fromColId: string } | null;

/* ── Card component ─────────────────────────────────────────────────────── */
function BoardCard({
  card,
  colId,
  onDelete,
  onDragStart,
  onDragEnd,
}: {
  card: Card;
  colId: string;
  onDelete: () => void;
  onDragStart: (cardId: string, colId: string) => void;
  onDragEnd: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      draggable
      onDragStart={() => onDragStart(card.id, colId)}
      onDragEnd={onDragEnd}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group rounded-xl p-3.5 cursor-grab active:cursor-grabbing transition-all duration-150"
      style={{
        background: '#FFFFFF',
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: hovered
          ? '0 4px 16px rgba(0,0,0,0.10)'
          : '0 1px 3px rgba(0,0,0,0.06)',
        transform: hovered ? 'translateY(-1px)' : undefined,
      }}
    >
      {/* Labels */}
      {card.labels && card.labels.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {card.labels.map((l, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
              style={{ background: `${l.color}14`, color: l.color, border: `1px solid ${l.color}30` }}
            >
              <Tag size={9} />
              {l.text}
            </span>
          ))}
        </div>
      )}

      {/* Title + delete */}
      <div className="flex items-start gap-2">
        <GripVertical size={14} className="mt-0.5 flex-shrink-0 opacity-25 group-hover:opacity-50 transition-opacity" style={{ color: '#94A3B8' }} />
        <p className="flex-1 text-sm font-semibold leading-snug" style={{ color: '#0F172A' }}>{card.title}</p>
        <button
          onClick={onDelete}
          className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-red-50"
          style={{ color: '#94A3B8' }}
        >
          <X size={13} />
        </button>
      </div>

      {/* Description */}
      {card.description && (
        <p className="mt-2 text-xs leading-relaxed pl-5" style={{ color: '#64748B' }}>
          {card.description}
        </p>
      )}

      {/* Demo preview thumbnail */}
      {card.demo && (
        <div className="pl-5">
          <DemoThumbnail demo={card.demo} />
        </div>
      )}

      {/* Assignee */}
      {card.assignee && (
        <div className="mt-2.5 pl-5 flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ background: 'linear-gradient(135deg,#2563EB,#1E3A8A)' }}
          >
            {card.assignee[0]}
          </div>
          <span className="text-xs" style={{ color: '#94A3B8' }}>{card.assignee}</span>
        </div>
      )}
    </div>
  );
}

/* ── Add-card form ──────────────────────────────────────────────────────── */
function AddCardForm({ onAdd, onCancel }: { onAdd: (title: string) => void; onCancel: () => void }) {
  const [value, setValue] = useState('');
  const submit = () => {
    if (value.trim()) { onAdd(value.trim()); }
    else onCancel();
  };
  return (
    <div className="rounded-xl p-3" style={{ background: '#FFFFFF', border: '1px solid rgba(37,99,235,0.25)', boxShadow: '0 0 0 2px rgba(37,99,235,0.10)' }}>
      <textarea
        autoFocus
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); } if (e.key === 'Escape') onCancel(); }}
        placeholder="Card title…"
        rows={2}
        className="w-full text-sm resize-none outline-none bg-transparent leading-snug"
        style={{ color: '#0F172A' }}
      />
      <div className="flex gap-2 mt-2">
        <button
          onClick={submit}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90"
          style={{ background: 'linear-gradient(120deg,#2563EB,#1E3A8A)' }}
        >
          Add card
        </button>
        <button onClick={onCancel} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:bg-black/5" style={{ color: '#64748B' }}>
          Cancel
        </button>
      </div>
    </div>
  );
}

/* ── Column component ───────────────────────────────────────────────────── */
function BoardColumn({
  col,
  onAddCard,
  onDeleteCard,
  onDragStart,
  onDragEnd,
  onDrop,
}: {
  col: Column;
  onAddCard: (colId: string, title: string) => void;
  onDeleteCard: (colId: string, cardId: string) => void;
  onDragStart: (cardId: string, colId: string) => void;
  onDragEnd: () => void;
  onDrop: (toColId: string) => void;
}) {
  const [adding, setAdding] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className="flex-shrink-0 rounded-2xl flex flex-col transition-all duration-200"
      style={{
        width: 300,
        background: dragOver ? `rgba(37,99,235,0.04)` : '#F8F9FC',
        border: dragOver ? `2px solid ${col.accent}50` : '2px solid transparent',
      }}
      onDragOver={e => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={() => { setDragOver(false); onDrop(col.id); }}
    >
      {/* Column header */}
      <div className="flex items-center gap-2.5 px-4 pt-4 pb-3">
        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: col.accent }} />
        <h3 className="flex-1 text-sm font-bold truncate" style={{ color: '#0F172A' }}>{col.title}</h3>
        <span className="text-xs font-semibold tabular-nums px-1.5 py-0.5 rounded-md" style={{ background: 'rgba(0,0,0,0.06)', color: '#64748B' }}>
          {col.cards.length}
        </span>
        <button
          onClick={() => setCollapsed(v => !v)}
          className="p-1 rounded-lg transition-all hover:bg-black/5"
          style={{ color: '#94A3B8' }}
        >
          <ChevronDown size={14} style={{ transform: collapsed ? 'rotate(-90deg)' : undefined, transition: 'transform 0.2s' }} />
        </button>
      </div>

      {!collapsed && (
        <div className="flex-1 px-3 pb-3 flex flex-col gap-2.5 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 240px)' }}>
          {col.cards.map(card => (
            <BoardCard
              key={card.id}
              card={card}
              colId={col.id}
              onDelete={() => onDeleteCard(col.id, card.id)}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            />
          ))}

          {adding ? (
            <AddCardForm
              onAdd={title => { onAddCard(col.id, title); setAdding(false); }}
              onCancel={() => setAdding(false)}
            />
          ) : (
            <button
              onClick={() => setAdding(true)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all hover:bg-black/05 group"
              style={{ color: '#94A3B8', border: '1px dashed rgba(0,0,0,0.12)' }}
            >
              <Plus size={14} className="group-hover:text-blue-600 transition-colors" />
              <span className="group-hover:text-slate-600 transition-colors">Add card</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Add column form ────────────────────────────────────────────────────── */
function AddColumnForm({ onAdd, onCancel }: { onAdd: (title: string) => void; onCancel: () => void }) {
  const [value, setValue] = useState('');
  const submit = () => { if (value.trim()) onAdd(value.trim()); };
  return (
    <div className="flex-shrink-0 rounded-2xl p-4 flex flex-col gap-3" style={{ width: 300, background: '#F8F9FC', border: '2px dashed rgba(0,0,0,0.12)' }}>
      <input
        autoFocus
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') submit(); if (e.key === 'Escape') onCancel(); }}
        placeholder="Column name…"
        className="text-sm font-semibold bg-white rounded-xl px-3 py-2 outline-none border"
        style={{ color: '#0F172A', borderColor: 'rgba(37,99,235,0.3)' }}
      />
      <div className="flex gap-2">
        <button onClick={submit} className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white" style={{ background: 'linear-gradient(120deg,#2563EB,#1E3A8A)' }}>
          Add column
        </button>
        <button onClick={onCancel} className="px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-black/5" style={{ color: '#64748B' }}>Cancel</button>
      </div>
    </div>
  );
}

/* ── Main board ─────────────────────────────────────────────────────────── */
let nextId = 200;
const uid = () => `card-${++nextId}`;
const colUid = () => `col-${++nextId}`;

const ACCENT_CYCLE = ['#2563EB', '#7C3AED', '#D97706', '#16A34A', '#DC2626', '#0891B2'];

export default function MoltBoard() {
  const [columns, setColumns] = useState<Column[]>(INITIAL_COLUMNS);
  const [addingCol, setAddingCol] = useState(false);
  const dragRef = useRef<DragState>(null);

  /* ── Card operations ── */
  const addCard = (colId: string, title: string) => {
    setColumns(cols => cols.map(c =>
      c.id === colId ? { ...c, cards: [...c.cards, { id: uid(), title }] } : c
    ));
  };

  const deleteCard = (colId: string, cardId: string) => {
    setColumns(cols => cols.map(c =>
      c.id === colId ? { ...c, cards: c.cards.filter(cd => cd.id !== cardId) } : c
    ));
  };

  /* ── Drag ── */
  const handleDragStart = (cardId: string, fromColId: string) => {
    dragRef.current = { cardId, fromColId };
  };
  const handleDragEnd = () => { dragRef.current = null; };
  const handleDrop = (toColId: string) => {
    const drag = dragRef.current;
    if (!drag || drag.fromColId === toColId) return;

    setColumns(cols => {
      const fromCol = cols.find(c => c.id === drag.fromColId);
      const card = fromCol?.cards.find(cd => cd.id === drag.cardId);
      if (!card) return cols;
      return cols.map(c => {
        if (c.id === drag.fromColId) return { ...c, cards: c.cards.filter(cd => cd.id !== drag.cardId) };
        if (c.id === toColId) return { ...c, cards: [...c.cards, card] };
        return c;
      });
    });
    dragRef.current = null;
  };

  /* ── Column operations ── */
  const addColumn = (title: string) => {
    const accent = ACCENT_CYCLE[columns.length % ACCENT_CYCLE.length];
    setColumns(cols => [...cols, { id: colUid(), title, accent, cards: [] }]);
    setAddingCol(false);
  };

  const totalCards = columns.reduce((s, c) => s + c.cards.length, 0);
  const demoCount = columns.reduce((s, c) => s + c.cards.filter(cd => cd.demo).length, 0);

  return (
    <MoltedLayout>
      {/* ── Page header ── */}
      <div className="pt-24 pb-6 px-6" style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#2563EB,#1E3A8A)' }}>
                  <span className="text-white text-xs font-black">M</span>
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#94A3B8' }}>Molt ALP</span>
              </div>
              <h1 className="text-2xl font-black tracking-tight" style={{ color: '#0F172A' }}>Product Board</h1>
              <p className="text-sm mt-1" style={{ color: '#64748B' }}>
                Track modules, features, and milestones across the Molt Agentic Learning Platform.
              </p>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-5">
                {columns.map(col => (
                  <div key={col.id} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: col.accent }} />
                    <span className="text-xs font-semibold" style={{ color: '#64748B' }}>{col.cards.length}</span>
                    <span className="text-xs hidden sm:inline" style={{ color: '#94A3B8' }}>{col.title}</span>
                  </div>
                ))}
              </div>
              <div className="h-4 w-px" style={{ background: 'rgba(0,0,0,0.1)' }} />
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(37,99,235,0.08)', color: '#2563EB' }}>
                {totalCards} cards
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(16,185,129,0.08)', color: '#059669' }}>
                {demoCount} live demos
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Board canvas ── */}
      <div
        className="px-6 py-6 overflow-x-auto"
        style={{ minHeight: 'calc(100vh - 220px)' }}
      >
        <div className="flex gap-4 items-start" style={{ width: 'max-content', minWidth: '100%' }}>
          {columns.map(col => (
            <BoardColumn
              key={col.id}
              col={col}
              onAddCard={addCard}
              onDeleteCard={deleteCard}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDrop={handleDrop}
            />
          ))}

          {addingCol ? (
            <AddColumnForm onAdd={addColumn} onCancel={() => setAddingCol(false)} />
          ) : (
            <button
              onClick={() => setAddingCol(true)}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold transition-all hover:opacity-80 group"
              style={{
                width: 300,
                background: 'rgba(37,99,235,0.06)',
                border: '2px dashed rgba(37,99,235,0.25)',
                color: '#2563EB',
              }}
            >
              <Plus size={16} />
              Add column
            </button>
          )}
        </div>
      </div>
    </MoltedLayout>
  );
}
