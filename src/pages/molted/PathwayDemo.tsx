import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft, Loader2, Brain, GitBranch, AlertTriangle, Check,
  ArrowRight, Shield, TrendingUp, RefreshCw, Zap, BookOpen, FileText,
} from 'lucide-react';
import MoltedLayout from './MoltedLayout';

/* ── Constants ─────────────────────────────────────────────────────────── */
const VIOLET = '#8B5CF6';
const VIOLET_DIM = 'rgba(139,92,246,0.12)';
const VIOLET_BORDER = 'rgba(139,92,246,0.22)';

/* ── Types ─────────────────────────────────────────────────────────────── */
type ConceptStatus = 'mastered' | 'solid' | 'shaky' | 'struggling' | 'gap' | 'not_started';

interface Concept {
  concept: string;
  status: ConceptStatus;
  confidence: number;
  change?: string;
  note?: string;
}

interface PathwayResult {
  updatedConcepts: Concept[];
  signalAnalysis: {
    signalType: string;
    depthOfUnderstanding: string;
    keyInsight: string;
    hiddenGap: string;
  };
  pathAdjustment: {
    action: string;
    nextConcept: string;
    skipConcepts: string[];
    insertConcepts: string[];
    reason: string;
  };
  retainAI: {
    riskLevel: string;
    trigger: string;
    action: string;
  };
  forgeSignal: {
    detected: boolean;
    insight: string;
  };
}

/* ── Default student state ─────────────────────────────────────────────── */
const DEFAULT_CONCEPTS: Concept[] = [
  { concept: 'Cell Structure', status: 'mastered', confidence: 95 },
  { concept: 'Mitosis', status: 'solid', confidence: 82 },
  { concept: 'Meiosis', status: 'shaky', confidence: 54 },
  { concept: 'ATP Synthesis', status: 'struggling', confidence: 31 },
  { concept: 'DNA Replication', status: 'gap', confidence: 20 },
  { concept: 'Photosynthesis', status: 'mastered', confidence: 91 },
  { concept: 'Protein Synthesis', status: 'not_started', confidence: 0 },
  { concept: 'Genetics Basics', status: 'not_started', confidence: 0 },
];

const COURSES = ['Biology 201', 'Nursing 340', 'Chemistry 202', 'Pharmacology 310'];

const SIGNAL_PRESETS = [
  {
    label: 'Lumen confusion signal',
    type: 'lumen_confusion',
    icon: BookOpen,
    text: 'Student re-read the Meiosis II section 4 times in 12 minutes. Highlighted 60% of the passage. Asked Lumen: "why does meiosis need two divisions?" — then asked the same question again 3 minutes later in different words.',
  },
  {
    label: 'Forge grading pattern',
    type: 'forge_grade',
    icon: FileText,
    text: 'Forge graded the Week 5 lab report: student scored 72/100. Lost points on "explain the role of ATP in muscle contraction" — wrote a correct but surface-level answer. Previous two assignments showed the same pattern: correct but shallow on energy metabolism concepts.',
  },
  {
    label: 'Study session signal',
    type: 'study_session',
    icon: Brain,
    text: 'Student completed the DNA Replication module in 8 minutes (estimated 25 minutes). Skipped the interactive diagram. Scored 6/10 on the quick check but took 4 minutes on a question that should take 30 seconds.',
  },
];

/* ── Status styles ─────────────────────────────────────────────────────── */
const STATUS_STYLE: Record<ConceptStatus, { color: string; border: string; bg: string; label: string }> = {
  mastered:    { color: '#14B8A6',   border: 'rgba(20,184,166,0.35)',    bg: 'rgba(20,184,166,0.10)', label: 'Mastered' },
  solid:       { color: '#3B82F6',   border: 'rgba(59,130,246,0.35)',    bg: 'rgba(59,130,246,0.10)', label: 'Solid' },
  shaky:       { color: '#F59E0B',   border: 'rgba(245,158,11,0.35)',    bg: 'rgba(245,158,11,0.08)', label: 'Shaky' },
  struggling:  { color: '#EF4444',   border: 'rgba(239,68,68,0.35)',     bg: 'rgba(239,68,68,0.08)',  label: 'Struggling' },
  gap:         { color: '#EF4444',   border: 'rgba(239,68,68,0.60)',     bg: 'transparent',           label: 'Gap detected' },
  not_started: { color: '#64748B',   border: 'rgba(100,116,139,0.25)',   bg: 'rgba(100,116,139,0.06)',label: 'Not started' },
};

const RISK_STYLE: Record<string, { color: string; border: string; bg: string }> = {
  none:    { color: '#14B8A6',  border: 'rgba(20,184,166,0.30)',  bg: 'rgba(20,184,166,0.08)' },
  watch:   { color: '#F59E0B',  border: 'rgba(245,158,11,0.30)',  bg: 'rgba(245,158,11,0.08)' },
  flag:    { color: '#F97316',  border: 'rgba(249,115,22,0.30)',  bg: 'rgba(249,115,22,0.08)' },
  urgent:  { color: '#EF4444',  border: 'rgba(239,68,68,0.30)',   bg: 'rgba(239,68,68,0.08)'  },
};

const ACTION_STYLE: Record<string, { color: string; label: string }> = {
  accelerate:   { color: VIOLET,     label: 'Accelerate' },
  remediate:    { color: '#EF4444',  label: 'Remediate' },
  reinforce:    { color: '#F59E0B',  label: 'Reinforce' },
  branch:       { color: '#14B8A6',  label: 'Branch path' },
  stay_course:  { color: '#64748B',  label: 'Stay course' },
};

/* ── Knowledge Graph (grid) ────────────────────────────────────────────── */
function KnowledgeGraph({ concepts }: { concepts: Concept[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {concepts.map((c, i) => {
        const s = STATUS_STYLE[c.status] ?? STATUS_STYLE.not_started;
        return (
          <div key={i} className="rounded-xl border p-3 text-center transition-all" style={{ borderColor: s.border, background: s.bg }}>
            <p className="text-xs font-semibold leading-snug mb-1.5" style={{ color: s.color }}>{c.concept}</p>
            <p className="text-[10px] mb-1.5" style={{ color: s.color, opacity: 0.8 }}>{s.label}</p>
            {c.confidence > 0 && (
              <div className="w-full h-1 rounded-full bg-molted-border overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${c.confidence}%`, background: s.color }} />
              </div>
            )}
            {c.change && c.change !== 'unchanged' && (
              <p className="text-[9px] mt-1 font-semibold uppercase tracking-wide" style={{ color: s.color }}>
                {c.change === 'improved' ? '↑' : c.change === 'declined' ? '↓' : c.change === 'newly_detected' ? '⚡' : ''} {c.change.replace('_', ' ')}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── SVG Path Visualization ────────────────────────────────────────────── */
const NODE_W = 108;
const NODE_H = 52;
const NODE_RX = 10;
const H_GAP = 28;   // horizontal gap between nodes
const V_GAP = 44;   // vertical gap between rows
const ROW_MAX = 4;  // nodes per row
const SVG_PAD = 20;

type GraphNode = {
  id: string;
  label: string;
  status: ConceptStatus | 'inserted' | 'skipped';
  col: number;
  row: number;
  x: number;
  y: number;
};

type GraphEdge = {
  fromId: string;
  toId: string;
};

function buildGraph(
  concepts: Concept[],
  insertConcepts: string[],
  skipConcepts: string[],
): { nodes: GraphNode[]; edges: GraphEdge[]; svgW: number; svgH: number } {
  // Build ordered list: interleave inserted concepts before the first "not_started" concept
  const baseNames = concepts.map(c => c.concept);
  const insertSet = new Set(insertConcepts.map(s => s.toLowerCase()));
  const skipSet = new Set(skipConcepts.map(s => s.toLowerCase()));

  // Build merged sequence
  const sequence: Array<{ label: string; status: ConceptStatus | 'inserted' | 'skipped' }> = [];

  for (const c of concepts) {
    const isSkipped = skipSet.has(c.concept.toLowerCase());
    sequence.push({
      label: c.concept,
      status: isSkipped ? 'skipped' : c.status,
    });
  }

  // Insert remediation nodes after the last "struggling" / "gap" node
  let insertAfterIdx = -1;
  for (let i = sequence.length - 1; i >= 0; i--) {
    const st = sequence[i].status;
    if (st === 'struggling' || st === 'gap' || st === 'shaky') {
      insertAfterIdx = i;
      break;
    }
  }
  if (insertAfterIdx < 0) insertAfterIdx = sequence.length - 1;

  const insertItems = insertConcepts
    .filter(ic => !baseNames.some(b => b.toLowerCase() === ic.toLowerCase()))
    .map(ic => ({ label: ic, status: 'inserted' as const }));

  // Splice inserted items in
  sequence.splice(insertAfterIdx + 1, 0, ...insertItems);

  // Assign grid positions
  const nodes: GraphNode[] = sequence.map((item, i) => {
    const col = i % ROW_MAX;
    const row = Math.floor(i / ROW_MAX);
    return {
      id: `node-${i}`,
      label: item.label,
      status: item.status,
      col,
      row,
      x: SVG_PAD + col * (NODE_W + H_GAP),
      y: SVG_PAD + row * (NODE_H + V_GAP),
    };
  });

  // Edges: sequential chain
  const edges: GraphEdge[] = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    edges.push({ fromId: nodes[i].id, toId: nodes[i + 1].id });
  }

  const cols = Math.min(sequence.length, ROW_MAX);
  const rows = Math.ceil(sequence.length / ROW_MAX);
  const svgW = SVG_PAD * 2 + cols * NODE_W + (cols - 1) * H_GAP;
  const svgH = SVG_PAD * 2 + rows * NODE_H + (rows - 1) * V_GAP;

  return { nodes, edges, svgW, svgH };
}

function nodeColor(status: ConceptStatus | 'inserted' | 'skipped'): { fill: string; stroke: string; text: string } {
  if (status === 'inserted')  return { fill: 'rgba(139,92,246,0.18)', stroke: '#8B5CF6', text: '#C4B5FD' };
  if (status === 'skipped')   return { fill: 'rgba(100,116,139,0.08)', stroke: 'rgba(100,116,139,0.30)', text: '#475569' };
  const s = STATUS_STYLE[status as ConceptStatus] ?? STATUS_STYLE.not_started;
  return { fill: s.bg, stroke: s.border, text: s.color };
}

function ArrowMarker({ id, color }: { id: string; color: string }) {
  return (
    <marker id={id} markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill={color} />
    </marker>
  );
}

function PathVisualization({
  concepts,
  insertConcepts,
  skipConcepts,
  animate,
}: {
  concepts: Concept[];
  insertConcepts: string[];
  skipConcepts: string[];
  animate: boolean;
}) {
  const [phase, setPhase] = useState<'before' | 'after'>('before');

  useEffect(() => {
    if (animate) {
      setPhase('before');
      const t = setTimeout(() => setPhase('after'), 1200);
      return () => clearTimeout(t);
    } else {
      setPhase('after');
    }
  }, [animate]);

  // BEFORE: just original concepts, no inserted/skipped transforms
  const beforeGraph = buildGraph(concepts, [], []);
  // AFTER: with inserted + skipped
  const afterGraph = buildGraph(concepts, insertConcepts, skipConcepts);

  const { nodes, edges, svgW, svgH } = phase === 'before' ? beforeGraph : afterGraph;

  return (
    <div>
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: VIOLET }}>
          {phase === 'before' ? 'Original path' : 'Adapted path'}
        </p>
        {animate && phase === 'before' && (
          <span className="text-xs text-molted-muted animate-pulse">Pathway is adapting…</span>
        )}
        {phase === 'after' && (
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ color: VIOLET, background: VIOLET_DIM, border: `1px solid ${VIOLET_BORDER}` }}>
            AI adapted
          </span>
        )}

        {/* Legend */}
        <div className="ml-auto flex items-center gap-3 flex-wrap">
          {[
            { label: 'Mastered', color: '#14B8A6' },
            { label: 'Solid', color: '#3B82F6' },
            { label: 'Shaky', color: '#F59E0B' },
            { label: 'Gap / Struggling', color: '#EF4444' },
            { label: 'Remediation', color: '#8B5CF6' },
            { label: 'Skipped', color: '#64748B' },
          ].map(l => (
            <span key={l.label} className="flex items-center gap-1 text-[10px] text-molted-muted">
              <span className="w-2.5 h-2.5 rounded-sm inline-block flex-shrink-0" style={{ background: `${l.color}30`, border: `1.5px solid ${l.color}80` }} />
              {l.label}
            </span>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-molted-border bg-molted-surface/40 p-3">
        <svg
          width={svgW}
          height={svgH}
          viewBox={`0 0 ${svgW} ${svgH}`}
          style={{ minWidth: svgW, display: 'block' }}
        >
          <defs>
            <ArrowMarker id="arrow-default" color="rgba(100,116,139,0.60)" />
            <ArrowMarker id="arrow-inserted" color="#8B5CF6" />
          </defs>

          {/* Edges */}
          {edges.map((edge, i) => {
            const fromNode = nodes.find(n => n.id === edge.fromId)!;
            const toNode = nodes.find(n => n.id === edge.toId)!;
            if (!fromNode || !toNode) return null;

            const isInsertedEdge =
              fromNode.status === 'inserted' || toNode.status === 'inserted';

            // Same row: horizontal arrow
            if (fromNode.row === toNode.row) {
              const x1 = fromNode.x + NODE_W;
              const y1 = fromNode.y + NODE_H / 2;
              const x2 = toNode.x - 2;
              const y2 = toNode.y + NODE_H / 2;
              return (
                <line
                  key={i}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={isInsertedEdge ? '#8B5CF6' : 'rgba(100,116,139,0.45)'}
                  strokeWidth={isInsertedEdge ? 2 : 1.5}
                  strokeDasharray={isInsertedEdge ? '4 3' : undefined}
                  markerEnd={isInsertedEdge ? 'url(#arrow-inserted)' : 'url(#arrow-default)'}
                />
              );
            }

            // Row wrap: elbow down-then-across
            const x1 = fromNode.x + NODE_W / 2;
            const y1 = fromNode.y + NODE_H;
            const mid_y = fromNode.y + NODE_H + V_GAP / 2;
            const x2 = toNode.x + NODE_W / 2;
            const y2 = toNode.y - 2;
            const pathD = `M ${x1} ${y1} L ${x1} ${mid_y} L ${x2} ${mid_y} L ${x2} ${y2}`;
            return (
              <path
                key={i}
                d={pathD}
                fill="none"
                stroke={isInsertedEdge ? '#8B5CF6' : 'rgba(100,116,139,0.45)'}
                strokeWidth={isInsertedEdge ? 2 : 1.5}
                strokeDasharray={isInsertedEdge ? '4 3' : undefined}
                markerEnd={isInsertedEdge ? 'url(#arrow-inserted)' : 'url(#arrow-default)'}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map(node => {
            const colors = nodeColor(node.status);
            const isInserted = node.status === 'inserted';
            const isSkipped = node.status === 'skipped';
            const isAnimatingIn = animate && phase === 'after' && isInserted;

            return (
              <g
                key={node.id}
                style={{
                  opacity: isAnimatingIn ? undefined : 1,
                  animation: isAnimatingIn ? 'fadeSlideIn 0.45s ease forwards' : undefined,
                }}
              >
                <rect
                  x={node.x}
                  y={node.y}
                  width={NODE_W}
                  height={NODE_H}
                  rx={NODE_RX}
                  ry={NODE_RX}
                  fill={colors.fill}
                  stroke={colors.stroke}
                  strokeWidth={isInserted ? 2 : 1.5}
                  strokeDasharray={isSkipped ? '4 3' : undefined}
                />

                {/* "New →" badge for inserted nodes */}
                {isInserted && (
                  <g>
                    <rect
                      x={node.x + NODE_W - 34}
                      y={node.y - 9}
                      width={34}
                      height={14}
                      rx={5}
                      fill="#8B5CF6"
                    />
                    <text
                      x={node.x + NODE_W - 17}
                      y={node.y - 1}
                      textAnchor="middle"
                      fontSize={8}
                      fontWeight="bold"
                      fill="white"
                    >
                      New →
                    </text>
                  </g>
                )}

                {/* Label text (two lines if long) */}
                {(() => {
                  const words = node.label.split(' ');
                  const mid = Math.ceil(words.length / 2);
                  const line1 = words.slice(0, mid).join(' ');
                  const line2 = words.slice(mid).join(' ');
                  const hasTwo = words.length > 2 && line2;
                  return hasTwo ? (
                    <>
                      <text
                        x={node.x + NODE_W / 2}
                        y={node.y + NODE_H / 2 - 6}
                        textAnchor="middle"
                        fontSize={10}
                        fontWeight="600"
                        fill={colors.text}
                        style={{ textDecoration: isSkipped ? 'line-through' : 'none' }}
                      >
                        {line1}
                      </text>
                      <text
                        x={node.x + NODE_W / 2}
                        y={node.y + NODE_H / 2 + 8}
                        textAnchor="middle"
                        fontSize={10}
                        fontWeight="600"
                        fill={colors.text}
                        style={{ textDecoration: isSkipped ? 'line-through' : 'none' }}
                      >
                        {line2}
                      </text>
                    </>
                  ) : (
                    <text
                      x={node.x + NODE_W / 2}
                      y={node.y + NODE_H / 2 + 4}
                      textAnchor="middle"
                      fontSize={10}
                      fontWeight="600"
                      fill={colors.text}
                      style={{ textDecoration: isSkipped ? 'line-through' : 'none' }}
                    >
                      {node.label}
                    </text>
                  );
                })()}
              </g>
            );
          })}
        </svg>
      </div>

      {/* CSS animation for nodes sliding in */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ── Before / After Comparison ─────────────────────────────────────────── */
function BeforeAfterComparison({
  originalConcepts,
  result,
}: {
  originalConcepts: Concept[];
  result: PathwayResult;
}) {
  const insertSet = new Set(result.pathAdjustment.insertConcepts.map(s => s.toLowerCase()));
  const skipSet = new Set(result.pathAdjustment.skipConcepts.map(s => s.toLowerCase()));
  const updatedMap = new Map(result.updatedConcepts.map(c => [c.concept.toLowerCase(), c]));

  // After list: insert remediation concepts before the next scheduled concept
  const nextIdx = originalConcepts.findIndex(
    c => c.concept.toLowerCase() === result.pathAdjustment.nextConcept?.toLowerCase()
  );
  const insertBeforeIdx = nextIdx >= 0 ? nextIdx : originalConcepts.length;

  const afterList: Array<{ label: string; tag: 'inserted' | 'skipped' | 'changed' | 'normal' }> = [];
  for (let i = 0; i < originalConcepts.length; i++) {
    if (i === insertBeforeIdx) {
      for (const ic of result.pathAdjustment.insertConcepts) {
        afterList.push({ label: ic, tag: 'inserted' });
      }
    }
    const c = originalConcepts[i];
    const isSkipped = skipSet.has(c.concept.toLowerCase());
    const updated = updatedMap.get(c.concept.toLowerCase());
    const hasChanged = updated && updated.status !== c.status;
    afterList.push({
      label: c.concept,
      tag: isSkipped ? 'skipped' : hasChanged ? 'changed' : 'normal',
    });
  }
  if (insertBeforeIdx >= originalConcepts.length) {
    for (const ic of result.pathAdjustment.insertConcepts) {
      if (!afterList.find(a => a.label.toLowerCase() === ic.toLowerCase())) {
        afterList.push({ label: ic, tag: 'inserted' });
      }
    }
  }

  const tagStyle = {
    inserted: { color: '#A78BFA', bg: 'rgba(139,92,246,0.15)', border: 'rgba(139,92,246,0.35)', strikethrough: false },
    skipped:  { color: '#64748B', bg: 'rgba(100,116,139,0.08)', border: 'rgba(100,116,139,0.20)', strikethrough: true },
    changed:  { color: '#F59E0B', bg: 'rgba(245,158,11,0.10)', border: 'rgba(245,158,11,0.30)', strikethrough: false },
    normal:   { color: '#94A3B8', bg: 'transparent', border: 'rgba(100,116,139,0.15)', strikethrough: false },
  };

  return (
    <div className="rounded-2xl border border-molted-border bg-molted-elevated p-6">
      <div className="flex items-center gap-2 mb-5">
        <GitBranch size={14} style={{ color: VIOLET }} />
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: VIOLET }}>Before / After Comparison</p>
      </div>

      <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-4 items-start">
        {/* Before */}
        <div>
          <p className="text-xs font-semibold text-molted-muted uppercase tracking-wide mb-3">Original path</p>
          <div className="space-y-1.5">
            {originalConcepts.map((c, i) => {
              const s = STATUS_STYLE[c.status] ?? STATUS_STYLE.not_started;
              return (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border text-xs transition-all"
                  style={{ borderColor: s.border, background: s.bg, color: s.color }}
                >
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                  <span className="font-medium">{c.concept}</span>
                  <span className="ml-auto text-[10px] opacity-70">{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Arrow connector */}
        <div className="flex flex-col items-center justify-center gap-2 py-8 hidden sm:flex">
          <div className="w-px flex-1 bg-molted-border" />
          <div className="rounded-full px-3 py-2 text-center text-[10px] font-bold whitespace-nowrap" style={{ background: VIOLET_DIM, border: `1px solid ${VIOLET_BORDER}`, color: VIOLET }}>
            Pathway AI<br />adapted
          </div>
          <ArrowRight size={16} style={{ color: VIOLET }} />
          <div className="w-px flex-1 bg-molted-border" />
        </div>

        {/* After */}
        <div>
          <p className="text-xs font-semibold text-molted-muted uppercase tracking-wide mb-3">Adapted path</p>
          <div className="space-y-1.5">
            {afterList.map((item, i) => {
              const ts = tagStyle[item.tag];
              return (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border text-xs transition-all"
                  style={{ borderColor: ts.border, background: ts.bg, color: ts.color }}
                >
                  {item.tag === 'inserted' && (
                    <span className="text-[9px] font-bold px-1 rounded" style={{ background: '#8B5CF6', color: 'white' }}>New</span>
                  )}
                  {item.tag !== 'inserted' && (
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ts.color }} />
                  )}
                  <span
                    className="font-medium"
                    style={{ textDecoration: ts.strikethrough ? 'line-through' : 'none' }}
                  >
                    {item.label}
                  </span>
                  {item.tag === 'inserted' && (
                    <span className="ml-auto text-[10px] opacity-80">Remediation</span>
                  )}
                  {item.tag === 'skipped' && (
                    <span className="ml-auto text-[10px] opacity-70">Skipped</span>
                  )}
                  {item.tag === 'changed' && (
                    <span className="ml-auto text-[10px] opacity-70">Updated</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile arrow */}
      <div className="flex sm:hidden items-center justify-center gap-2 mt-3 mb-1">
        <div className="flex-1 h-px bg-molted-border" />
        <span className="text-[10px] font-bold px-2" style={{ color: VIOLET }}>Pathway AI adapted ↓</span>
        <div className="flex-1 h-px bg-molted-border" />
      </div>
    </div>
  );
}

/* ── Result Panel ──────────────────────────────────────────────────────── */
function ResultPanel({
  result,
  originalConcepts,
}: {
  result: PathwayResult;
  originalConcepts: Concept[];
}) {
  const riskStyle = RISK_STYLE[result.retainAI.riskLevel] ?? RISK_STYLE.none;
  const actionStyle = ACTION_STYLE[result.pathAdjustment.action] ?? ACTION_STYLE.stay_course;
  const [graphVisible, setGraphVisible] = useState(false);

  // Trigger animation after mount
  useEffect(() => {
    const t = setTimeout(() => setGraphVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-5">
      {/* Signal analysis */}
      <div className="rounded-2xl border p-5" style={{ background: VIOLET_DIM, borderColor: VIOLET_BORDER }}>
        <div className="flex items-center gap-2 mb-3">
          <Zap size={14} style={{ color: VIOLET }} />
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: VIOLET }}>Signal analysis</p>
        </div>
        <p className="text-molted-white/90 text-sm leading-relaxed mb-3">{result.signalAnalysis.keyInsight}</p>
        {result.signalAnalysis.hiddenGap && (
          <div className="rounded-xl border p-3 bg-molted-surface/40" style={{ borderColor: 'rgba(249,115,22,0.25)' }}>
            <p className="text-xs font-semibold text-orange-400 mb-1">Hidden gap detected</p>
            <p className="text-xs text-molted-muted leading-relaxed">{result.signalAnalysis.hiddenGap}</p>
          </div>
        )}
        <div className="mt-3 flex items-center gap-3 flex-wrap">
          <span className="text-xs px-2 py-1 rounded-md bg-molted-border/30 text-molted-muted">
            {result.signalAnalysis.signalType.replace(/_/g, ' ')}
          </span>
          <span className="text-xs px-2 py-1 rounded-md bg-molted-border/30 text-molted-muted">
            depth: {result.signalAnalysis.depthOfUnderstanding}
          </span>
        </div>
      </div>

      {/* Updated knowledge graph */}
      <div className="rounded-2xl border border-molted-border bg-molted-elevated p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-molted-muted mb-4">Updated knowledge map</p>
        <KnowledgeGraph concepts={result.updatedConcepts} />
      </div>

      {/* Path adjustment */}
      <div className="rounded-2xl border border-molted-border bg-molted-elevated p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <GitBranch size={14} style={{ color: VIOLET }} />
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: VIOLET }}>Path adjustment</p>
          </div>
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ color: actionStyle.color, background: `${actionStyle.color}18`, border: `1px solid ${actionStyle.color}30` }}
          >
            {actionStyle.label}
          </span>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-start gap-2.5">
            <ArrowRight size={13} style={{ color: VIOLET }} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-molted-muted font-semibold uppercase tracking-wide mb-0.5">Next concept</p>
              <p className="text-sm text-molted-white font-semibold">{result.pathAdjustment.nextConcept}</p>
            </div>
          </div>

          {result.pathAdjustment.insertConcepts.length > 0 && (
            <div className="flex items-start gap-2.5">
              <AlertTriangle size={13} className="text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-molted-muted font-semibold uppercase tracking-wide mb-1">Inserted first</p>
                <div className="flex flex-wrap gap-1.5">
                  {result.pathAdjustment.insertConcepts.map((c, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded-md bg-orange-400/10 text-orange-400 border border-orange-400/20">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {result.pathAdjustment.skipConcepts.length > 0 && (
            <div className="flex items-start gap-2.5">
              <Check size={13} style={{ color: VIOLET }} className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-molted-muted font-semibold uppercase tracking-wide mb-1">Skipped (already mastered)</p>
                <div className="flex flex-wrap gap-1.5">
                  {result.pathAdjustment.skipConcepts.map((c, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded-md text-molted-muted bg-molted-border/20 border border-molted-border">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <p className="text-sm text-molted-muted leading-relaxed border-t border-molted-border pt-4">{result.pathAdjustment.reason}</p>
      </div>

      {/* RetainAI + Forge row */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border p-4" style={{ borderColor: riskStyle.border, background: riskStyle.bg }}>
          <div className="flex items-center gap-2 mb-2">
            <Shield size={13} style={{ color: riskStyle.color }} />
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: riskStyle.color }}>
              RetainAI · {result.retainAI.riskLevel === 'none' ? 'No risk' : result.retainAI.riskLevel.charAt(0).toUpperCase() + result.retainAI.riskLevel.slice(1)}
            </p>
          </div>
          {result.retainAI.trigger ? (
            <p className="text-xs text-molted-muted leading-relaxed">{result.retainAI.trigger}</p>
          ) : (
            <p className="text-xs text-molted-muted">Student is on track. No intervention needed.</p>
          )}
          {result.retainAI.action && (
            <p className="text-xs mt-2 font-semibold" style={{ color: riskStyle.color }}>{result.retainAI.action}</p>
          )}
        </div>

        <div
          className="rounded-2xl border p-4"
          style={{
            borderColor: result.forgeSignal.detected ? 'rgba(245,158,11,0.30)' : 'rgba(100,116,139,0.20)',
            background: result.forgeSignal.detected ? 'rgba(245,158,11,0.06)' : 'rgba(100,116,139,0.05)',
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={13} className={result.forgeSignal.detected ? 'text-amber-400' : 'text-molted-subtle'} />
            <p className="text-xs font-semibold uppercase tracking-wide text-molted-muted">Forge Signal</p>
          </div>
          <p className="text-xs text-molted-muted leading-relaxed">
            {result.forgeSignal.detected ? result.forgeSignal.insight : 'No grading patterns flagged yet for this concept set.'}
          </p>
        </div>
      </div>

      {/* ── Path Visualization section ── */}
      <div className="rounded-2xl border border-molted-border bg-molted-elevated p-6">
        <div className="flex items-center gap-2 mb-1">
          <GitBranch size={14} style={{ color: VIOLET }} />
          <p className="text-molted-white font-bold text-sm">Path Visualization</p>
        </div>
        <p className="text-xs text-molted-muted mb-5">
          Visual representation of the learning path. Purple nodes with "New →" badge are remediation concepts inserted by PathwayAI. Strikethrough nodes were skipped.
        </p>
        <PathVisualization
          concepts={result.updatedConcepts}
          insertConcepts={result.pathAdjustment.insertConcepts}
          skipConcepts={result.pathAdjustment.skipConcepts}
          animate={graphVisible}
        />
      </div>

      {/* ── Before / After Comparison ── */}
      <BeforeAfterComparison
        originalConcepts={originalConcepts}
        result={result}
      />
    </div>
  );
}

/* ── Main demo ─────────────────────────────────────────────────────────── */
export default function PathwayDemo() {
  const [concepts, setConcepts] = useState<Concept[]>(DEFAULT_CONCEPTS);
  const [originalConcepts, setOriginalConcepts] = useState<Concept[]>(DEFAULT_CONCEPTS);
  const [course, setCourse] = useState(COURSES[0]);
  const [studentName] = useState('Jordan M.');
  const [signal, setSignal] = useState('');
  const [signalType, setSignalType] = useState('lumen_confusion');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PathwayResult | null>(null);
  const [error, setError] = useState('');

  const handlePreset = (preset: typeof SIGNAL_PRESETS[0]) => {
    setSignal(preset.text);
    setSignalType(preset.type);
  };

  const handleSubmit = async () => {
    if (!signal.trim() || loading) return;
    setLoading(true);
    setError('');
    setResult(null);

    // Snapshot the concepts before the API call for Before/After
    const snapshotConcepts = [...concepts];

    try {
      const res = await fetch('/api/pathway-adapt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentName, course, concepts, newSignal: signal, signalType }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');
      setResult(data);
      setOriginalConcepts(snapshotConcepts);
      if (data.updatedConcepts?.length > 0) setConcepts(data.updatedConcepts);
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MoltedLayout>
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-molted-border bg-molted-surface/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/pathway-ai" className="flex items-center gap-1.5 text-molted-muted hover:text-molted-white transition-colors text-sm">
              <ChevronLeft size={16} />
              PathwayAI
            </Link>
            <div className="w-px h-4 bg-molted-border" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: VIOLET_DIM, border: `1px solid ${VIOLET_BORDER}` }}>
                <Brain size={12} style={{ color: VIOLET }} />
              </div>
              <span className="text-molted-white font-bold text-sm">Adaptive Engine Demo</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border" style={{ borderColor: VIOLET_BORDER, background: VIOLET_DIM }}>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: VIOLET }} />
            <span className="text-xs font-semibold" style={{ color: VIOLET }}>Live AI</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        {/* Student header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-molted-white">Jordan M.</h1>
            <div className="flex items-center gap-3 mt-1">
              <select
                value={course}
                onChange={e => setCourse(e.target.value)}
                className="text-sm text-molted-muted bg-transparent border-none focus:outline-none cursor-pointer"
              >
                {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <span className="text-molted-border">·</span>
              <span className="text-xs text-molted-muted">Week 6 of 16</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw
              size={14}
              className="text-molted-muted cursor-pointer hover:text-molted-white transition-colors"
              onClick={() => { setConcepts(DEFAULT_CONCEPTS); setOriginalConcepts(DEFAULT_CONCEPTS); setResult(null); }}
            />
            <span className="text-xs text-molted-muted">Reset map</span>
          </div>
        </div>

        {/* Current knowledge graph */}
        <div className="bg-molted-elevated border border-molted-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-molted-white font-bold text-sm">Current Knowledge Map</p>
            <span className="text-xs text-molted-muted">{concepts.filter(c => c.status === 'mastered' || c.status === 'solid').length}/{concepts.length} solid or mastered</span>
          </div>
          <KnowledgeGraph concepts={concepts} />
        </div>

        {/* Signal input */}
        <div className="bg-molted-elevated border border-molted-border rounded-2xl p-6 space-y-5">
          <div>
            <p className="text-molted-white font-bold text-sm mb-1">Send a learning signal</p>
            <p className="text-molted-muted text-xs">Describe what the student just did — Pathway will analyze it and re-sequence the path.</p>
          </div>

          {/* Presets */}
          <div>
            <p className="text-molted-muted text-xs font-semibold uppercase tracking-wide mb-2">Quick presets</p>
            <div className="grid sm:grid-cols-3 gap-2">
              {SIGNAL_PRESETS.map((preset, i) => (
                <button
                  key={i}
                  onClick={() => handlePreset(preset)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl border text-left transition-all hover:-translate-y-px"
                  style={{
                    borderColor: signal === preset.text ? VIOLET_BORDER : 'rgba(100,116,139,0.20)',
                    background: signal === preset.text ? VIOLET_DIM : 'rgba(100,116,139,0.05)',
                  }}
                >
                  <preset.icon size={13} style={{ color: signal === preset.text ? VIOLET : '#64748B', flexShrink: 0 }} />
                  <span className="text-xs font-medium" style={{ color: signal === preset.text ? VIOLET : '#94A3B8' }}>{preset.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom signal */}
          <div>
            <p className="text-molted-muted text-xs font-semibold uppercase tracking-wide mb-2">Or describe the signal</p>
            <textarea
              value={signal}
              onChange={e => setSignal(e.target.value)}
              placeholder="e.g. Student spent 18 minutes on the ATP synthesis section and asked Lumen 'why does the cell need ATP if glucose has energy?'"
              rows={4}
              className="w-full rounded-xl border text-sm text-molted-white p-4 focus:outline-none resize-none transition-colors"
              style={{
                background: 'rgba(10,10,11,0.6)',
                borderColor: signal.trim().length > 10 ? VIOLET_BORDER : 'rgba(100,116,139,0.25)',
                color: '#E5E7EB',
              }}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!signal.trim() || loading}
            className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold text-sm transition-all hover:-translate-y-px disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
            style={{ background: VIOLET, color: '#0A0A0B', boxShadow: `0 0 24px rgba(139,92,246,0.30)` }}
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Brain size={16} />}
            {loading ? 'Pathway is analyzing…' : 'Run Pathway Adaptive Engine'}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/08 p-4 flex gap-3">
            <AlertTriangle size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Result */}
        {result && <ResultPanel result={result} originalConcepts={originalConcepts} />}

        {/* Footer nav */}
        <div className="pt-4 border-t border-molted-border flex items-center justify-between text-sm">
          <Link to="/pathway-ai" className="text-molted-muted hover:text-molted-white transition-colors">
            ← Back to PathwayAI
          </Link>
          <Link to="/lumen/demo" className="text-molted-muted hover:text-molted-white transition-colors">
            Try Lumen Demo →
          </Link>
        </div>
      </div>
    </MoltedLayout>
  );
}
