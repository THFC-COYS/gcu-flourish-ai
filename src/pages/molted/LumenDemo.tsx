import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft, Loader2, BookOpen, MessageSquare, RefreshCw, Link2,
  AlertTriangle, Check, ArrowRight, Zap, Eye,
} from 'lucide-react';
import MoltedLayout from './MoltedLayout';

/* ── Constants ─────────────────────────────────────────────────────────── */
const VIOLET = '#7B61FF';
const VIOLET_DIM = 'rgba(123,97,255,0.10)';
const VIOLET_BORDER = 'rgba(123,97,255,0.25)';

/* ── Sentence annotation types ─────────────────────────────────────────── */
type AnnotationType = 'medical' | 'core' | 'dense';

interface SentenceAnnotation {
  sentenceIndex: number;
  type: AnnotationType;
  comment: string;
}

interface AnnotatedPassage {
  sentences: string[];
  annotations: SentenceAnnotation[];
}

/* ── Sample passages ───────────────────────────────────────────────────── */
const SAMPLE_PASSAGES = [
  {
    label: 'Nursing · Cardiac Output',
    course: 'NURS 340',
    text: `Cardiac output (CO) is defined as the volume of blood ejected by the heart per minute and is the product of heart rate (HR) and stroke volume (SV): CO = HR × SV. Normal CO in adults ranges from 4 to 8 L/min at rest.

Stroke volume is influenced by three primary factors: preload, afterload, and contractility. Preload refers to the end-diastolic volume — the degree of ventricular stretch before contraction. According to the Frank-Starling mechanism, increased preload within physiological limits leads to more forceful ventricular contraction and higher stroke volume.

Afterload represents the resistance the ventricle must overcome to eject blood — primarily determined by systemic vascular resistance (SVR) and aortic valve competence. Elevated afterload (as seen in hypertension) reduces stroke volume and can precipitate heart failure if sustained.

Contractility is the intrinsic ability of cardiac muscle to generate force independent of preload and afterload. It is modulated by the autonomic nervous system: sympathetic stimulation increases contractility via beta-1 adrenergic receptor activation, while parasympathetic tone decreases it.`,
  },
  {
    label: 'Pharmacology · First-Pass Metabolism',
    course: 'PHARM 310',
    text: `First-pass metabolism (also called presystemic metabolism) refers to the phenomenon in which a drug is substantially metabolized before reaching systemic circulation. When a drug is administered orally, it is absorbed through the gastrointestinal tract and transported via the portal vein directly to the liver — where it may undergo significant metabolic transformation before entering the bloodstream.

The primary enzymes responsible for hepatic first-pass metabolism are the cytochrome P450 (CYP450) superfamily, particularly CYP3A4, which metabolizes approximately 50% of clinically used drugs. The gut wall also contains CYP3A4 and contributes to presystemic extraction.

The clinical consequence of extensive first-pass metabolism is reduced oral bioavailability. For example, morphine has an oral bioavailability of approximately 25–33% due to significant first-pass effect, requiring oral doses 3× higher than parenteral doses to achieve equivalent analgesia. Nitroglycerin undergoes near-complete hepatic first-pass extraction, making sublingual or transdermal administration essential.

Factors affecting first-pass metabolism include hepatic blood flow, enzyme induction or inhibition (e.g., rifampin induces CYP3A4; grapefruit juice inhibits it), hepatic disease, and genetic polymorphisms in CYP450 enzymes.`,
  },
  {
    label: 'Biology · DNA Replication',
    course: 'BIO 202',
    text: `DNA replication is the process by which a cell duplicates its DNA prior to cell division, ensuring each daughter cell receives a complete copy of the genetic information. Replication is semi-conservative: each new double helix consists of one original (template) strand and one newly synthesized strand.

Replication begins at specific sites called origins of replication. In prokaryotes, there is typically a single origin; in eukaryotes, thousands of origins fire simultaneously to replicate the large genome within the time constraints of the cell cycle.

The key enzyme is DNA polymerase, which synthesizes new DNA by adding deoxyribonucleotides in the 5'→3' direction, using the existing strand as a template. Because both strands are antiparallel, one strand (the leading strand) is synthesized continuously, while the other (the lagging strand) is synthesized in discontinuous segments called Okazaki fragments, later joined by DNA ligase.

Other essential proteins include: helicase (unwinds the double helix at the replication fork), primase (synthesizes short RNA primers to initiate synthesis), single-strand binding proteins (stabilize unwound DNA), and topoisomerase (relieves torsional strain ahead of the fork).`,
  },
];

/* ── Pre-seeded annotations per passage ────────────────────────────────── */
// Sentences are indexed after splitting on ". " within each passage.
// We split on period+space to match the parsing logic.
const PASSAGE_ANNOTATIONS: SentenceAnnotation[][] = [
  // Passage 0: Nursing · Cardiac Output
  [
    {
      sentenceIndex: 0,
      type: 'medical',
      comment:
        'Lumen: This is where most students get tripped up. CO = HR × SV looks simple, but the clinical exam question usually hides one variable and asks you to infer the third — make sure you can solve for any of the three.',
    },
    {
      sentenceIndex: 4,
      type: 'core',
      comment:
        'Lumen: This is the core insight of the whole paragraph — if you understand this, the rest falls into place. The Frank-Starling mechanism explains why your heart pumps harder when it\'s filled more: more stretch → more recoil force.',
    },
    {
      sentenceIndex: 6,
      type: 'medical',
      comment:
        'Lumen: This is where most students get tripped up. "SVR" and "afterload" are often used interchangeably in early coursework but aren\'t identical — afterload is the total load, SVR is one major contributor. Know both terms.',
    },
    {
      sentenceIndex: 9,
      type: 'dense',
      comment:
        'Lumen: Want me to break this down with an analogy? This sentence packs autonomic pharmacology, receptor subtypes, and cardiac physiology into one sentence — it\'s dense on purpose because exams love to test beta-1 vs beta-2 distinctions.',
    },
  ],
  // Passage 1: Pharmacology · First-Pass Metabolism
  [
    {
      sentenceIndex: 0,
      type: 'core',
      comment:
        'Lumen: This is the core insight of the whole paragraph — if you understand this, the rest falls into place. First-pass metabolism is the reason why oral and IV doses of the same drug can be radically different.',
    },
    {
      sentenceIndex: 2,
      type: 'medical',
      comment:
        'Lumen: This is where most students get tripped up. CYP3A4 is the most clinically important isoenzyme — it metabolizes half of all drugs AND is the target of most drug-drug interactions. If a question mentions "enzyme induction," CYP3A4 is almost always involved.',
    },
    {
      sentenceIndex: 5,
      type: 'medical',
      comment:
        'Lumen: This is where most students get tripped up. The morphine example is high-yield: 25–33% oral bioavailability means you need roughly 3× the oral dose to match IV. If you see a dosing conversion question on an exam, this ratio is the math behind it.',
    },
    {
      sentenceIndex: 7,
      type: 'dense',
      comment:
        'Lumen: Want me to break this down with an analogy? This sentence lists four independent variables that all converge on the same pathway — hepatic blood flow, enzyme activity, disease state, and genetics. Each one is a separate exam question in disguise.',
    },
  ],
  // Passage 2: Biology · DNA Replication
  [
    {
      sentenceIndex: 1,
      type: 'core',
      comment:
        'Lumen: This is the core insight of the whole paragraph — if you understand this, the rest falls into place. "Semi-conservative" means every new DNA molecule is half old, half new — this was proven by the Meselson-Stahl experiment, which professors love to ask about.',
    },
    {
      sentenceIndex: 3,
      type: 'medical',
      comment:
        'Lumen: This is where most students get tripped up. The eukaryote vs. prokaryote origin-of-replication distinction is a classic compare/contrast question. The key number to remember: eukaryotes have thousands of origins firing in parallel — otherwise replication would take days.',
    },
    {
      sentenceIndex: 4,
      type: 'dense',
      comment:
        'Lumen: Want me to break this down with an analogy? DNA polymerase only works 5\'→3\', which forces the lagging strand to be built in fragments — this directionality constraint is the source of every Okazaki fragment question you\'ll ever see.',
    },
    {
      sentenceIndex: 6,
      type: 'medical',
      comment:
        'Lumen: This is where most students get tripped up. This sentence names five different proteins. On exams you\'ll be given a function and asked to name the enzyme — helicase, primase, SSBPs, topoisomerase, and ligase each have exactly one job. Map each name to its function.',
    },
  ],
];

/* ── Passage sentence parser ────────────────────────────────────────────── */
function parsePassageToSentences(text: string): string[] {
  // Split on sentence-ending punctuation followed by whitespace or end-of-string
  const raw = text.split(/(?<=[.!?])\s+/);
  return raw.filter(s => s.trim().length > 0);
}

function buildAnnotatedPassage(passageIdx: number): AnnotatedPassage {
  const text = SAMPLE_PASSAGES[passageIdx].text;
  const sentences = parsePassageToSentences(text);
  const annotations = PASSAGE_ANNOTATIONS[passageIdx] ?? [];
  return { sentences, annotations };
}

/* ── Mode tabs ─────────────────────────────────────────────────────────── */
type Mode = 'qa' | 'explain3ways' | 'spacedRep' | 'crossCourse' | 'readingMode';

const MODES: { id: Mode; label: string; icon: typeof BookOpen; description: string }[] = [
  { id: 'qa',           label: 'Q&A',            icon: MessageSquare, description: 'Ask anything about the passage' },
  { id: 'explain3ways', label: 'Explain 3 Ways',  icon: Zap,           description: 'Visual · Narrative · Analogy' },
  { id: 'spacedRep',    label: 'Spaced Review',   icon: RefreshCw,     description: 'Surface concepts to review now' },
  { id: 'crossCourse',  label: 'Cross-Course',    icon: Link2,         description: 'Connect to what you learned before' },
  { id: 'readingMode',  label: 'Reading Mode',    icon: Eye,           description: 'Annotated sentence-by-sentence' },
];

/* ── Result renderers ──────────────────────────────────────────────────── */
function QAResult({ data }: { data: any }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border p-5" style={{ background: VIOLET_DIM, borderColor: VIOLET_BORDER }}>
        <p className="text-molted-muted text-xs font-semibold uppercase tracking-wider mb-3">Lumen answers</p>
        <p className="text-molted-white/90 text-sm leading-relaxed whitespace-pre-line">{data.answer}</p>
      </div>
      <div className="rounded-xl border border-molted-border bg-molted-elevated p-4">
        <p className="text-xs font-semibold text-molted-muted uppercase tracking-wide mb-1">Key takeaway</p>
        <p className="text-sm text-molted-white">{data.keyTakeaway}</p>
      </div>
      {data.followUpQuestions?.length > 0 && (
        <div className="rounded-xl border border-molted-border bg-molted-elevated p-4">
          <p className="text-xs font-semibold text-molted-muted uppercase tracking-wide mb-3">Go deeper</p>
          <div className="space-y-2">
            {data.followUpQuestions.map((q: string, i: number) => (
              <div key={i} className="flex items-start gap-2 text-sm text-molted-muted">
                <ArrowRight size={12} style={{ color: VIOLET }} className="flex-shrink-0 mt-0.5" />
                {q}
              </div>
            ))}
          </div>
        </div>
      )}
      {data.relatedConcepts?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {data.relatedConcepts.map((c: string, i: number) => (
            <span key={i} className="text-xs px-2.5 py-1 rounded-full border" style={{ color: VIOLET, borderColor: VIOLET_BORDER, background: VIOLET_DIM }}>{c}</span>
          ))}
        </div>
      )}
    </div>
  );
}

function Explain3WaysResult({ data }: { data: any }) {
  const modes = [
    { key: 'visual',    color: '#14B8A6', border: 'rgba(20,184,166,0.30)',  bg: 'rgba(20,184,166,0.08)' },
    { key: 'narrative', color: VIOLET,    border: VIOLET_BORDER,            bg: VIOLET_DIM },
    { key: 'analogy',   color: '#F59E0B', border: 'rgba(245,158,11,0.30)',  bg: 'rgba(245,158,11,0.08)' },
  ];
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-molted-border bg-molted-elevated p-4 text-center">
        <p className="text-xs text-molted-muted font-semibold uppercase tracking-wide mb-1">Concept</p>
        <p className="text-molted-white font-black text-lg">{data.concept}</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {modes.map(m => {
          const modeData = data[m.key];
          if (!modeData) return null;
          return (
            <div key={m.key} className="rounded-2xl border p-5 flex flex-col" style={{ borderColor: m.border, background: m.bg }}>
              <p className="font-black text-base mb-3" style={{ color: m.color }}>{modeData.label}</p>
              <p className="text-molted-muted text-sm leading-relaxed flex-1">{modeData.explanation}</p>
            </div>
          );
        })}
      </div>
      {data.bestFor && (
        <div className="rounded-xl border border-molted-border bg-molted-elevated p-4">
          <p className="text-xs font-semibold text-molted-muted uppercase tracking-wide mb-1">Best for</p>
          <p className="text-sm text-molted-white/80">{data.bestFor}</p>
        </div>
      )}
    </div>
  );
}

function SpacedRepResult({ data }: { data: any }) {
  const strengthColors: Record<string, { color: string; border: string; bg: string }> = {
    strong:  { color: '#14B8A6', border: 'rgba(20,184,166,0.30)',  bg: 'rgba(20,184,166,0.08)' },
    fading:  { color: '#F59E0B', border: 'rgba(245,158,11,0.30)',  bg: 'rgba(245,158,11,0.08)' },
    weak:    { color: '#EF4444', border: 'rgba(239,68,68,0.30)',   bg: 'rgba(239,68,68,0.08)'  },
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-molted-border bg-molted-elevated p-4">
        <p className="text-xs text-molted-muted font-semibold uppercase tracking-wide mb-1">Currently reading about</p>
        <p className="text-molted-white text-sm font-semibold">{data.currentTopic}</p>
      </div>
      <div className="space-y-3">
        {data.reviewConcepts?.map((c: any, i: number) => {
          const s = strengthColors[c.strength] ?? strengthColors.fading;
          const [showAnswer, setShowAnswer] = useState(false);
          return (
            <div key={i} className="rounded-2xl border bg-molted-elevated p-5" style={{ borderColor: s.border }}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="text-molted-white font-bold text-sm">{c.concept}</p>
                  <p className="text-molted-muted text-xs mt-0.5">{c.course} · {c.weeksAgo} weeks ago</p>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0" style={{ color: s.color, background: s.bg, border: `1px solid ${s.border}` }}>
                  {c.strength}
                </span>
              </div>
              <p className="text-molted-muted text-sm leading-relaxed mb-4">{c.connectionToCurrentReading}</p>
              <div className="rounded-xl border p-3" style={{ borderColor: VIOLET_BORDER, background: VIOLET_DIM }}>
                <p className="text-xs font-semibold mb-2" style={{ color: VIOLET }}>Quick review</p>
                <p className="text-sm text-molted-white/90 mb-3">{c.reviewQuestion}</p>
                <button
                  onClick={() => setShowAnswer(a => !a)}
                  className="text-xs font-semibold transition-colors"
                  style={{ color: VIOLET }}
                >
                  {showAnswer ? 'Hide answer ↑' : 'Show answer ↓'}
                </button>
                {showAnswer && (
                  <p className="text-sm text-molted-muted leading-relaxed mt-2 pt-2 border-t" style={{ borderColor: VIOLET_BORDER }}>
                    {c.reviewAnswer}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {data.priorityReview && (
        <div className="rounded-xl border p-4" style={{ borderColor: VIOLET_BORDER, background: VIOLET_DIM }}>
          <p className="text-xs font-semibold mb-1" style={{ color: VIOLET }}>Priority</p>
          <p className="text-sm text-molted-white/90">{data.priorityReview}</p>
        </div>
      )}
    </div>
  );
}

function CrossCourseResult({ data }: { data: any }) {
  const strengthColor: Record<string, string> = {
    direct: VIOLET,
    supporting: '#14B8A6',
    foundational: '#F59E0B',
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-molted-border bg-molted-elevated p-4 flex items-center gap-4">
        <div>
          <p className="text-xs text-molted-muted font-semibold uppercase tracking-wide">Currently in</p>
          <p className="text-molted-white text-sm font-bold">{data.currentCourse} · {data.currentConcept}</p>
        </div>
      </div>
      <div className="space-y-3">
        {data.connections?.map((conn: any, i: number) => {
          const color = strengthColor[conn.connectionStrength] ?? VIOLET;
          return (
            <div key={i} className="rounded-2xl border bg-molted-elevated p-5 hover:border-molted-violet/30 transition-all" style={{ borderColor: 'rgba(100,116,139,0.20)' }}>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-molted-surface border border-molted-border">
                  <p className="text-xs font-semibold text-molted-muted">{conn.priorCourse}</p>
                  <span className="text-molted-subtle">·</span>
                  <p className="text-xs text-molted-white">{conn.priorConcept}</p>
                </div>
                <ArrowRight size={13} style={{ color }} />
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ color, background: `${color}18`, border: `1px solid ${color}30` }}>
                  {conn.connectionStrength}
                </span>
              </div>
              <p className="text-molted-muted text-sm leading-relaxed mb-3">{conn.insight}</p>
              <div className="rounded-xl border p-3 italic" style={{ borderColor: VIOLET_BORDER, background: VIOLET_DIM }}>
                <p className="text-sm" style={{ color: VIOLET }}>{conn.bridgingStatement}</p>
              </div>
            </div>
          );
        })}
      </div>
      {data.recommendation && (
        <div className="rounded-xl border p-4" style={{ borderColor: VIOLET_BORDER, background: VIOLET_DIM }}>
          <div className="flex items-start gap-2">
            <Check size={13} style={{ color: VIOLET }} className="flex-shrink-0 mt-0.5" />
            <p className="text-sm text-molted-white/90">{data.recommendation}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Reading Mode ───────────────────────────────────────────────────────── */
function ReadingMode({ passageIdx }: { passageIdx: number }) {
  const { sentences, annotations } = buildAnnotatedPassage(passageIdx);
  const annotationMap = new Map<number, SentenceAnnotation>(
    annotations.map(a => [a.sentenceIndex, a])
  );

  const [activeSentence, setActiveSentence] = useState<number | null>(null);
  const [followUpLoading, setFollowUpLoading] = useState(false);
  const [followUpResult, setFollowUpResult] = useState<string | null>(null);
  const [followUpError, setFollowUpError] = useState('');
  const [followUpAction, setFollowUpAction] = useState<string | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const activeAnnotation = activeSentence !== null ? annotationMap.get(activeSentence) : undefined;
  const activeSentenceText = activeSentence !== null ? sentences[activeSentence] : '';

  useEffect(() => {
    // Reset follow-up when changing sentences
    setFollowUpResult(null);
    setFollowUpError('');
    setFollowUpAction(null);
  }, [activeSentence]);

  const handleFollowUp = async (action: 'explain' | 'analogy' | 'test') => {
    if (!activeSentenceText || followUpLoading) return;
    setFollowUpLoading(true);
    setFollowUpError('');
    setFollowUpResult(null);
    setFollowUpAction(action);

    const actionModeMap: Record<string, string> = {
      explain: 'qa',
      analogy: 'explain3ways',
      test: 'spacedRep',
    };
    const questionMap: Record<string, string> = {
      explain: `Please explain this sentence in deeper detail: "${activeSentenceText}"`,
      analogy: `Give me a memorable analogy to understand: "${activeSentenceText}"`,
      test: `Create a short quiz question to test my understanding of: "${activeSentenceText}"`,
    };

    try {
      const res = await fetch('/api/lumen-companion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'qa',
          passage: SAMPLE_PASSAGES[passageIdx].text,
          question: questionMap[action],
          sentenceContext: activeSentenceText,
          followUpAction: action,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');
      setFollowUpResult(data.answer ?? data.explanation ?? JSON.stringify(data));
    } catch (err: any) {
      setFollowUpError(err.message ?? 'Something went wrong.');
    } finally {
      setFollowUpLoading(false);
    }
  };

  const annotationTypeStyles: Record<AnnotationType, { badge: string; badgeBg: string; badgeBorder: string }> = {
    medical:  { badge: 'Tricky term', badgeBg: 'rgba(239,68,68,0.10)',    badgeBorder: 'rgba(239,68,68,0.30)' },
    core:     { badge: 'Core insight', badgeBg: 'rgba(123,97,255,0.12)',  badgeBorder: VIOLET_BORDER },
    dense:    { badge: 'Dense concept', badgeBg: 'rgba(245,158,11,0.10)', badgeBorder: 'rgba(245,158,11,0.30)' },
  };
  const annotationTypeColors: Record<AnnotationType, string> = {
    medical: '#EF4444',
    core: VIOLET,
    dense: '#F59E0B',
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-[600px]">
      {/* Left: Passage (60%) */}
      <div className="lg:w-[60%] flex-shrink-0">
        <div className="bg-molted-elevated border border-molted-border rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Eye size={14} style={{ color: VIOLET }} />
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: VIOLET }}>Reading Mode</p>
            <span className="text-xs text-molted-muted ml-auto">
              {annotations.length} annotations · click any sentence
            </span>
          </div>
          <div className="text-sm leading-[1.9] text-molted-white/85 font-normal">
            {sentences.map((sentence, i) => {
              const hasAnnotation = annotationMap.has(i);
              const isActive = activeSentence === i;

              return (
                <span
                  key={i}
                  onClick={() => setActiveSentence(isActive ? null : i)}
                  className="cursor-pointer rounded transition-all duration-150 relative"
                  style={{
                    background: isActive
                      ? 'rgba(123,97,255,0.22)'
                      : hasAnnotation
                      ? 'rgba(123,97,255,0.07)'
                      : 'transparent',
                    outline: isActive ? `1.5px solid ${VIOLET_BORDER}` : 'none',
                    outlineOffset: '1px',
                    padding: '1px 2px',
                    marginRight: '1px',
                    // Underline dot indicator for annotated sentences
                    textDecoration: hasAnnotation && !isActive ? 'underline dotted' : 'none',
                    textDecorationColor: VIOLET,
                    textUnderlineOffset: '3px',
                  }}
                  title={hasAnnotation ? 'Click to see Lumen\'s note' : undefined}
                >
                  {sentence}{' '}
                </span>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-molted-border flex items-center gap-4 text-[10px] text-molted-muted">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-0.5 border-b border-dotted" style={{ borderColor: VIOLET }} />
              Lumen annotation
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-sm" style={{ background: 'rgba(123,97,255,0.22)', border: `1px solid ${VIOLET_BORDER}` }} />
              Selected
            </span>
          </div>
        </div>
      </div>

      {/* Right: Lumen sidebar (40%) */}
      <div className="lg:w-[40%]" ref={sidebarRef}>
        {activeSentence === null ? (
          <div className="bg-molted-elevated border border-molted-border rounded-2xl p-6 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: VIOLET_DIM, border: `1px solid ${VIOLET_BORDER}` }}>
              <Eye size={20} style={{ color: VIOLET }} />
            </div>
            <p className="text-molted-white font-bold text-sm mb-2">Lumen is watching.</p>
            <p className="text-molted-muted text-xs leading-relaxed max-w-[220px]">
              Click any sentence in the passage — dotted underlines mark where Lumen has a note for you.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Active sentence preview */}
            <div className="rounded-2xl border p-4" style={{ background: 'rgba(123,97,255,0.06)', borderColor: VIOLET_BORDER }}>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-molted-muted mb-2">Selected sentence</p>
              <p className="text-xs text-molted-white/80 leading-relaxed italic">"{activeSentenceText}"</p>
            </div>

            {/* Annotation card */}
            {activeAnnotation ? (
              <div className="rounded-2xl border p-5 space-y-4" style={{ background: VIOLET_DIM, borderColor: VIOLET_BORDER }}>
                <div className="flex items-start gap-3">
                  <div
                    className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5"
                    style={{ background: `${annotationTypeColors[activeAnnotation.type]}20`, border: `1px solid ${annotationTypeColors[activeAnnotation.type]}40` }}
                  >
                    <BookOpen size={12} style={{ color: annotationTypeColors[activeAnnotation.type] }} />
                  </div>
                  <div className="flex-1">
                    <span
                      className="text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded mb-2 inline-block"
                      style={{
                        color: annotationTypeColors[activeAnnotation.type],
                        background: annotationTypeStyles[activeAnnotation.type].badgeBg,
                        border: `1px solid ${annotationTypeStyles[activeAnnotation.type].badgeBorder}`,
                      }}
                    >
                      {annotationTypeStyles[activeAnnotation.type].badge}
                    </span>
                    <p className="text-sm text-molted-white/90 leading-relaxed">{activeAnnotation.comment}</p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-molted-border/50">
                  {[
                    { id: 'explain', label: 'Explain deeper' },
                    { id: 'analogy', label: 'Give an analogy' },
                    { id: 'test',    label: 'Test me on this' },
                  ].map(btn => (
                    <button
                      key={btn.id}
                      onClick={() => handleFollowUp(btn.id as 'explain' | 'analogy' | 'test')}
                      disabled={followUpLoading}
                      className="flex-1 text-xs font-semibold py-2 px-3 rounded-lg border transition-all hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
                      style={{
                        borderColor: followUpAction === btn.id && followUpLoading ? VIOLET_BORDER : 'rgba(123,97,255,0.20)',
                        background: followUpAction === btn.id && followUpLoading ? VIOLET_DIM : 'rgba(123,97,255,0.06)',
                        color: VIOLET,
                      }}
                    >
                      {followUpAction === btn.id && followUpLoading ? (
                        <span className="flex items-center justify-center gap-1.5">
                          <Loader2 size={10} className="animate-spin" />
                          Thinking…
                        </span>
                      ) : btn.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border p-5" style={{ borderColor: 'rgba(100,116,139,0.20)', background: 'rgba(100,116,139,0.05)' }}>
                <p className="text-xs text-molted-muted leading-relaxed">
                  No specific annotation for this sentence. Use the buttons below to ask Lumen about it.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 mt-3">
                  {[
                    { id: 'explain', label: 'Explain deeper' },
                    { id: 'analogy', label: 'Give an analogy' },
                    { id: 'test',    label: 'Test me on this' },
                  ].map(btn => (
                    <button
                      key={btn.id}
                      onClick={() => handleFollowUp(btn.id as 'explain' | 'analogy' | 'test')}
                      disabled={followUpLoading}
                      className="flex-1 text-xs font-semibold py-2 px-3 rounded-lg border transition-all hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
                      style={{
                        borderColor: 'rgba(123,97,255,0.20)',
                        background: 'rgba(123,97,255,0.06)',
                        color: VIOLET,
                      }}
                    >
                      {followUpAction === btn.id && followUpLoading ? (
                        <span className="flex items-center justify-center gap-1.5">
                          <Loader2 size={10} className="animate-spin" />
                          Thinking…
                        </span>
                      ) : btn.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Follow-up response */}
            {followUpError && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/08 p-4 flex gap-2">
                <AlertTriangle size={13} className="text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-red-400">{followUpError}</p>
              </div>
            )}

            {followUpResult && !followUpLoading && (
              <div className="rounded-2xl border p-5" style={{ background: 'rgba(123,97,255,0.06)', borderColor: VIOLET_BORDER }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full" style={{ background: VIOLET }} />
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-molted-muted">
                    Lumen · {followUpAction === 'explain' ? 'Deeper explanation' : followUpAction === 'analogy' ? 'Analogy' : 'Quiz question'}
                  </p>
                </div>
                <p className="text-sm text-molted-white/90 leading-relaxed whitespace-pre-line">{followUpResult}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Main demo ─────────────────────────────────────────────────────────── */
export default function LumenDemo() {
  const [activeMode, setActiveMode] = useState<Mode>('qa');
  const [passageIdx, setPassageIdx] = useState(0);
  const [customPassage, setCustomPassage] = useState('');
  const [question, setQuestion] = useState('');
  const [concept, setConcept] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const passage = customPassage || SAMPLE_PASSAGES[passageIdx].text;
  const currentCourse = SAMPLE_PASSAGES[passageIdx].course;

  const handleRun = async () => {
    if (loading) return;
    if (activeMode === 'qa' && !question.trim()) return;
    if (activeMode === 'explain3ways' && !concept.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const body: Record<string, string> = { mode: activeMode, passage };
      if (activeMode === 'qa') body.question = question;
      if (activeMode === 'explain3ways') body.concept = concept;
      if (activeMode === 'crossCourse') body.concept = currentCourse;

      const res = await fetch('/api/lumen-companion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');
      setResult(data);
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const canRun = () => {
    if (loading) return false;
    if (activeMode === 'qa') return question.trim().length > 2;
    if (activeMode === 'explain3ways') return concept.trim().length > 2;
    return true; // spacedRep and crossCourse just need the passage
  };

  const isReadingMode = activeMode === 'readingMode';

  return (
    <MoltedLayout>
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-molted-border bg-molted-surface/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/lumen" className="flex items-center gap-1.5 text-molted-muted hover:text-molted-white transition-colors text-sm">
              <ChevronLeft size={16} />
              Lumen
            </Link>
            <div className="w-px h-4 bg-molted-border" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center bg-molted-violet/10 border border-molted-violet/20">
                <BookOpen size={12} className="text-molted-violet" />
              </div>
              <span className="text-molted-white font-bold text-sm">Learning Companion Demo</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-molted-violet/30 bg-molted-violet/10">
            <div className="w-2 h-2 rounded-full bg-molted-violet animate-pulse" />
            <span className="text-xs font-semibold text-molted-violet">Live AI</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Mode tabs — full-width row of 5 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-8">
          {MODES.map(m => (
            <button
              key={m.id}
              onClick={() => { setActiveMode(m.id); setResult(null); }}
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl border text-left transition-all"
              style={{
                borderColor: activeMode === m.id ? VIOLET_BORDER : 'rgba(100,116,139,0.20)',
                background: activeMode === m.id ? VIOLET_DIM : 'transparent',
              }}
            >
              <m.icon size={14} style={{ color: activeMode === m.id ? VIOLET : '#64748B', flexShrink: 0 }} />
              <div>
                <p className="text-xs font-bold" style={{ color: activeMode === m.id ? VIOLET : '#94A3B8' }}>{m.label}</p>
                <p className="text-[10px] text-molted-subtle hidden sm:block">{m.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Reading Mode: full-width two-column layout */}
        {isReadingMode ? (
          <div className="space-y-5">
            {/* Passage selector for reading mode */}
            <div className="flex items-center gap-3 flex-wrap">
              <p className="text-xs text-molted-muted font-semibold uppercase tracking-wide">Passage:</p>
              {SAMPLE_PASSAGES.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setPassageIdx(i)}
                  className="text-xs px-3 py-1.5 rounded-lg border transition-all"
                  style={{
                    borderColor: passageIdx === i ? VIOLET_BORDER : 'rgba(100,116,139,0.20)',
                    background: passageIdx === i ? VIOLET_DIM : 'transparent',
                    color: passageIdx === i ? VIOLET : '#94A3B8',
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <ReadingMode passageIdx={passageIdx} />
          </div>
        ) : (
          /* Other modes: original two-column layout */
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: passage + controls */}
            <div className="space-y-5">
              {/* Passage selector */}
              <div className="bg-molted-elevated border border-molted-border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-molted-white font-bold text-sm">Reading</p>
                  <div className="flex gap-1">
                    {SAMPLE_PASSAGES.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => { setPassageIdx(i); setCustomPassage(''); setResult(null); }}
                        className="text-xs px-2.5 py-1 rounded-lg border transition-all"
                        style={{
                          borderColor: passageIdx === i && !customPassage ? VIOLET_BORDER : 'rgba(100,116,139,0.20)',
                          background: passageIdx === i && !customPassage ? VIOLET_DIM : 'transparent',
                          color: passageIdx === i && !customPassage ? VIOLET : '#94A3B8',
                        }}
                      >
                        {SAMPLE_PASSAGES[i].label.split(' · ')[0]}
                      </button>
                    ))}
                  </div>
                </div>
                {!customPassage && (
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-md border border-molted-border text-molted-muted">{SAMPLE_PASSAGES[passageIdx].course}</span>
                    <span className="text-xs text-molted-muted">{SAMPLE_PASSAGES[passageIdx].label.split(' · ')[1]}</span>
                  </div>
                )}
                <textarea
                  value={customPassage || passage}
                  onChange={e => { setCustomPassage(e.target.value); setResult(null); }}
                  rows={12}
                  className="w-full rounded-xl border text-xs text-molted-muted/90 p-4 focus:outline-none resize-none leading-relaxed"
                  style={{
                    background: 'rgba(10,10,11,0.5)',
                    borderColor: customPassage ? VIOLET_BORDER : 'rgba(100,116,139,0.18)',
                  }}
                />
                {customPassage && (
                  <button
                    onClick={() => { setCustomPassage(''); setResult(null); }}
                    className="mt-2 text-xs text-molted-muted hover:text-molted-white transition-colors"
                  >
                    ← Use sample passage
                  </button>
                )}
              </div>

              {/* Mode-specific inputs */}
              {activeMode === 'qa' && (
                <div>
                  <label className="block text-molted-muted text-xs font-semibold uppercase tracking-wide mb-2">Your question</label>
                  <textarea
                    value={question}
                    onChange={e => { setQuestion(e.target.value); setResult(null); }}
                    placeholder="e.g. Why does increased afterload reduce stroke volume? What's the clinical implication in hypertension?"
                    rows={3}
                    className="w-full rounded-xl border text-sm text-molted-white p-4 focus:outline-none resize-none"
                    style={{
                      background: 'rgba(10,10,11,0.6)',
                      borderColor: question.trim() ? VIOLET_BORDER : 'rgba(100,116,139,0.20)',
                    }}
                  />
                </div>
              )}

              {activeMode === 'explain3ways' && (
                <div>
                  <label className="block text-molted-muted text-xs font-semibold uppercase tracking-wide mb-2">Concept to explain</label>
                  <input
                    type="text"
                    value={concept}
                    onChange={e => { setConcept(e.target.value); setResult(null); }}
                    placeholder="e.g. Frank-Starling mechanism, first-pass metabolism, DNA replication fork"
                    className="w-full rounded-xl border text-sm text-molted-white p-4 focus:outline-none"
                    style={{
                      background: 'rgba(10,10,11,0.6)',
                      borderColor: concept.trim() ? VIOLET_BORDER : 'rgba(100,116,139,0.20)',
                    }}
                  />
                  <p className="text-molted-subtle text-xs mt-1.5">Type any concept — from the passage or from your course</p>
                </div>
              )}

              {(activeMode === 'spacedRep' || activeMode === 'crossCourse') && (
                <div
                  className="rounded-xl border p-4"
                  style={{ borderColor: VIOLET_BORDER, background: VIOLET_DIM }}
                >
                  <p className="text-xs font-semibold mb-1" style={{ color: VIOLET }}>
                    {activeMode === 'spacedRep' ? 'Spaced Repetition' : 'Cross-Course Intelligence'}
                  </p>
                  <p className="text-xs text-molted-muted">
                    {activeMode === 'spacedRep'
                      ? 'Lumen will analyze the passage and surface concepts from earlier courses that need review right now — with targeted review questions.'
                      : 'Lumen will identify what you learned in prior courses that directly applies to this reading — and make those connections explicit.'}
                  </p>
                </div>
              )}

              <button
                onClick={handleRun}
                disabled={!canRun()}
                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold text-sm transition-all hover:-translate-y-px disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
                style={{ background: VIOLET, color: '#0A0A0B', boxShadow: `0 0 24px rgba(123,97,255,0.30)` }}
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <BookOpen size={16} />}
                {loading ? 'Lumen is thinking…' : `Run ${MODES.find(m => m.id === activeMode)?.label}`}
              </button>
            </div>

            {/* Right: result */}
            <div className="space-y-4">
              {!result && !loading && !error && (
                <div className="h-full flex flex-col items-center justify-center text-center py-20 px-6">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-molted-violet/10 border border-molted-violet/20">
                    <BookOpen size={24} className="text-molted-violet" />
                  </div>
                  <p className="text-molted-white font-bold text-lg mb-2">Lumen is watching.</p>
                  <p className="text-molted-muted text-sm max-w-xs leading-relaxed">
                    Choose a mode, fill in the input, and hit Run. Lumen responds to what you're reading — not the internet.
                  </p>
                </div>
              )}

              {loading && (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <Loader2 size={28} className="animate-spin mb-4" style={{ color: VIOLET }} />
                  <p className="text-molted-muted text-sm">Lumen is thinking…</p>
                </div>
              )}

              {error && (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/08 p-5 flex gap-3">
                  <AlertTriangle size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              {result && !loading && (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-molted-violet" />
                    <p className="text-xs text-molted-muted font-semibold uppercase tracking-wide">
                      {MODES.find(m => m.id === activeMode)?.label} · Lumen response
                    </p>
                  </div>
                  {activeMode === 'qa'           && <QAResult data={result} />}
                  {activeMode === 'explain3ways' && <Explain3WaysResult data={result} />}
                  {activeMode === 'spacedRep'    && <SpacedRepResult data={result} />}
                  {activeMode === 'crossCourse'  && <CrossCourseResult data={result} />}
                </>
              )}
            </div>
          </div>
        )}

        {/* Footer nav */}
        <div className="mt-10 pt-6 border-t border-molted-border flex items-center justify-between text-sm">
          <Link to="/lumen" className="text-molted-muted hover:text-molted-white transition-colors">
            ← Back to Lumen
          </Link>
          <Link to="/pathway-ai/demo" className="text-molted-muted hover:text-molted-white transition-colors">
            Try PathwayAI Demo →
          </Link>
        </div>
      </div>
    </MoltedLayout>
  );
}
