import { useState, useRef } from 'react';
import { Plus, X, GripVertical, Tag, ChevronDown } from 'lucide-react';
import MoltedLayout from './MoltedLayout';

/* ── Types ──────────────────────────────────────────────────────────────── */
type Label = { text: string; color: string };
type Card = {
  id: string;
  title: string;
  description?: string;
  labels?: Label[];
  assignee?: string;
};
type Column = { id: string; title: string; accent: string; cards: Card[] };

/* ── Seed data ──────────────────────────────────────────────────────────── */
const LABEL_MAP: Record<string, Label> = {
  ai:       { text: 'AI Agent',   color: '#2563EB' },
  lms:      { text: 'Platform',   color: '#7C3AED' },
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
      { id: 'c1', title: 'Imago OS — Full Institution Transformation Layer', description: 'The final-form product: fully transformed AI-native university. Spec and roadmap needed.', labels: [LABEL_MAP.lms, LABEL_MAP.ai], assignee: 'Roadmap' },
      { id: 'c2', title: 'Mastery AI — Competency-based progression engine', description: 'Replaces credits with verified competency tracking across every course.', labels: [LABEL_MAP.ai, LABEL_MAP.lms] },
      { id: 'c3', title: 'Flourish Robotics integration spec', description: 'Physical-digital bridge for campus AI presence.', labels: [LABEL_MAP.infra] },
      { id: 'c4', title: 'University-OS multi-tenant expansion', description: 'Scale command center to 5+ partner institutions with separate data isolation.', labels: [LABEL_MAP.infra, LABEL_MAP.lms] },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    accent: '#2563EB',
    cards: [
      { id: 'c5', title: 'Outpost — AI-native LMS (full build)', description: 'Core platform replacing Canvas/Blackboard. All 8 modules must integrate cleanly.', labels: [LABEL_MAP.lms, LABEL_MAP.ai], assignee: 'Platform Team' },
      { id: 'c6', title: 'Proof AI — Outcomes credentialing system', description: 'Generates verified outcome proofs tied to student learning history.', labels: [LABEL_MAP.ai, LABEL_MAP.analytics] },
      { id: 'c7', title: 'Retain AI — Stop-out risk detection', description: 'Behavioral pattern analysis to flag at-risk students before they disengage.', labels: [LABEL_MAP.ai, LABEL_MAP.analytics], assignee: 'AI Team' },
      { id: 'c8', title: 'Browser extension — Canvas/Blackboard overlay', description: 'Zero-integration deployment layer. Works on any LMS without API access.', labels: [LABEL_MAP.infra, LABEL_MAP.ux] },
    ],
  },
  {
    id: 'review',
    title: 'Review / Testing',
    accent: '#D97706',
    cards: [
      { id: 'c9', title: 'Outcomes AI — Institutional intelligence dashboard', description: 'Dean and provost-level reporting. Real-time outcome signals across all colleges.', labels: [LABEL_MAP.analytics, LABEL_MAP.ux], assignee: 'Design' },
      { id: 'c10', title: 'Early Warning System — 5-signal risk model', description: 'Login gaps + grade drops + discussion silence + financial flags + course load.', labels: [LABEL_MAP.ai, LABEL_MAP.analytics] },
      { id: 'c11', title: 'Founding Partner deck — GCU co-dev agreement', description: 'Governance rights, preferred pricing, licensing terms for first university partner.', labels: [LABEL_MAP.revenue] },
    ],
  },
  {
    id: 'live',
    title: 'Live',
    accent: '#16A34A',
    cards: [
      { id: 'c12', title: 'Lumen — AI reading companion', description: 'Activates in-context as students read. Deployed at 170K students.', labels: [LABEL_MAP.ai], assignee: 'Shipped' },
      { id: 'c13', title: 'Forge — Faculty AI toolkit', description: 'Course architect, agentic grader, auto-respond, discussion agent. All live.', labels: [LABEL_MAP.ai, LABEL_MAP.ux], assignee: 'Shipped' },
      { id: 'c14', title: 'Beacon — Institutional analytics', description: 'Provost-facing intelligence layer. Enrollment, retention, outcomes.', labels: [LABEL_MAP.analytics], assignee: 'Shipped' },
      { id: 'c15', title: 'Pathway AI — Career outcome mapping', description: 'Post-graduation career trajectory intelligence tied to program completion.', labels: [LABEL_MAP.ai, LABEL_MAP.analytics], assignee: 'Shipped' },
      { id: 'c16', title: 'Agentic Grader — AI feedback engine', description: 'Doctoral and undergraduate submission review. Structured rubric-based feedback.', labels: [LABEL_MAP.ai], assignee: 'Shipped' },
    ],
  },
];

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
        width: 280,
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
    <div className="flex-shrink-0 rounded-2xl p-4 flex flex-col gap-3" style={{ width: 280, background: '#F8F9FC', border: '2px dashed rgba(0,0,0,0.12)' }}>
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
let nextId = 100;
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
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#94A3B8' }}>Molt Platform</span>
              </div>
              <h1 className="text-2xl font-black tracking-tight" style={{ color: '#0F172A' }}>Product Board</h1>
              <p className="text-sm mt-1" style={{ color: '#64748B' }}>
                Track modules, features, and milestones across the Molt intelligence platform.
              </p>
            </div>

            <div className="flex items-center gap-4">
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
                {totalCards} total
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
                width: 280,
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
