import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft, Loader2, Copy, Check, CheckSquare,
  AlertTriangle, ArrowRight, Shield, ThumbsUp, TrendingUp,
  ChevronDown, ChevronUp, MessageSquare, UserCheck, RefreshCw,
  Zap, GraduationCap, Play, CheckCircle, BookOpen, Clock,
} from 'lucide-react';
import MoltedLayout from './MoltedLayout';

/* ── Constants ─────────────────────────────────────────────────────────── */
const TEAL = '#2563EB';
const TEAL_DIM = 'rgba(37,99,235,0.12)';
const TEAL_BORDER = 'rgba(37,99,235,0.25)';
const GOLD = '#64748B';
const RED = '#1E3A8A';
const AMBER = '#F59E0B';
const AMBER_DIM = 'rgba(245,158,11,0.10)';
const AMBER_BORDER = 'rgba(245,158,11,0.25)';
const GREEN = '#22C55E';
const GREEN_DIM = 'rgba(34,197,94,0.10)';
const GREEN_BORDER = 'rgba(34,197,94,0.25)';

/* ── Types ─────────────────────────────────────────────────────────────── */
interface Criterion {
  name: string;
  score: number;
  possible: number;
  feedback: string;
  quote: string;
}

interface GradeResult {
  totalScore: number;
  totalPossible: number;
  letterGrade: string;
  summary: string;
  criteria: Criterion[];
  strengths: string[];
  improvements: string[];
  integrityFlag: boolean;
  integrityNote: string;
}

interface NegotiationExchange {
  facultyFeedback: string;
  revisedScore: number;
  revisedFeedback: string;
  agentReasoning: string;
  accepted: boolean;
  changeAmount: number;
}

/* ── Student Scenarios (Live Student Mode) ─────────────────────────────── */
const STUDENT_SCENARIOS = [
  {
    id: 'nursing',
    label: 'Nursing Ethics Essay',
    course: 'NUR-412 · Bioethics in Clinical Practice',
    prompt: 'Analyze a real or hypothetical ethical dilemma encountered in a clinical setting using the four principles of biomedical ethics (autonomy, beneficence, non-maleficence, and justice). Explain how you would navigate the dilemma and justify your reasoning.',
    totalPoints: '100',
    assignmentType: 'Essay',
    rubric: `Ethical Framework Application (25 pts)
Excellent (23–25): Accurately defines and applies all four principles of biomedical ethics to the scenario with depth and precision.
Satisfactory (18–22): Applies most principles correctly but with some surface-level treatment.
Needs Work (0–17): Misapplies or omits key principles; framework is unclear.

Case Analysis & Specificity (25 pts)
Excellent (23–25): Dilemma is described with clinical detail; stakeholders, competing interests, and contextual factors are clearly identified.
Satisfactory (18–22): Dilemma is described but lacks depth in stakeholder analysis.
Needs Work (0–17): Scenario is vague or underdeveloped.

Critical Reasoning & Position (25 pts)
Excellent (23–25): Student takes a clear, justified position; reasoning is nuanced and considers counterarguments.
Satisfactory (18–22): Position is stated but counterarguments are minimal.
Needs Work (0–17): No clear position or reasoning is circular.

APA Format & Professional Writing (25 pts)
Excellent (23–25): Correct APA 7th ed. citations, professional tone throughout, no major errors.
Satisfactory (18–22): Minor APA errors; writing is clear but informal in places.
Needs Work (0–17): Multiple citation errors, grammar issues, or unprofessional tone.`,
    submission: `During my final clinical rotation at Banner Desert Medical Center, I encountered a situation that challenged my understanding of ethical practice. A 78-year-old patient, Mr. H., was admitted with late-stage COPD and had previously completed an advance directive clearly stating he did not want mechanical ventilation. When his oxygen saturation dropped critically during my shift, his adult daughter — who held healthcare power of attorney — demanded we intubate him, saying "he didn't really mean it."

The four principles of biomedical ethics help frame this conflict clearly. Autonomy, the right of a competent patient to make informed decisions about their own care, is the central issue here. Mr. H. had clearly exercised his autonomy through the advance directive. The challenge is that his daughter was now attempting to override that documented choice.

Beneficence requires that we act in the patient's best interest. At first glance, intubation seems beneficial — it keeps him alive. But beneficence must be understood in the context of the patient's own values and expressed wishes. Prolonging life against explicit wishes may not constitute benefit in any meaningful sense.

Non-maleficence is equally compelling. Intubating a patient who has clearly refused it would cause harm — physical discomfort, loss of dignity, and a violation of his expressed will. The potential harm here is not just medical but deeply ethical.

Finally, justice requires that we apply our ethical standards consistently and fairly. If we override Mr. H.'s directive based on a family member's emotional distress, we undermine the entire system of advance care planning that protects all patients.

In navigating this dilemma, I supported the charge nurse in convening an emergency ethics consultation. I documented the situation clearly and advocated for honoring the directive. The attending physician ultimately upheld the advance directive after consulting with the ethics board and the hospital's legal team.

This experience reinforced that advocacy for patient autonomy is not passive — it requires active, sometimes uncomfortable intervention on behalf of the patient's documented wishes.`,
  },
  {
    id: 'business',
    label: 'Business Leadership Case Study',
    course: 'MBA-520 · Leadership Ethics & Christian Stewardship',
    prompt: 'Select a documented corporate failure from the past 20 years. Analyze the root causes through the lens of leadership ethics and Christian stewardship principles. What should the leaders have done differently, and what systemic changes would you recommend?',
    totalPoints: '100',
    assignmentType: 'Case Study',
    rubric: `Ethical Leadership Analysis (30 pts)
Excellent (27–30): Identifies specific leadership failures; applies ethical frameworks (utilitarian, deontological, virtue ethics) with precision.
Satisfactory (21–26): Identifies failures but analysis is surface-level; one framework applied.
Needs Work (0–20): Vague attribution of blame without structured ethical reasoning.

Christian Stewardship Integration (25 pts)
Excellent (23–25): Authentically integrates stewardship principles (servant leadership, accountability, transparency) with specific scripture or theological grounding.
Satisfactory (18–22): Stewardship is mentioned but integration feels forced or generic.
Needs Work (0–17): Stewardship absent or tacked on without substance.

Root Cause & Systemic Thinking (25 pts)
Excellent (23–25): Distinguishes proximate vs. root causes; systemic recommendations are specific and actionable.
Satisfactory (18–22): Identifies some causes but recommendations are broad.
Needs Work (0–17): Focuses only on individual blame without systemic analysis.

Writing Quality & Citations (20 pts)
Excellent (18–20): APA 7th ed. throughout, clear professional prose, no major errors.
Satisfactory (14–17): Minor errors; writing is readable.
Needs Work (0–13): Significant errors in citation or grammar.`,
    submission: `The collapse of Enron Corporation in 2001 — though slightly more than 20 years ago — remains the definitive case study in catastrophic ethical leadership failure. I will use it because its patterns have repeated in every major corporate scandal since, including Wells Fargo (2016) and FTX (2022).

Enron's leaders — Ken Lay, Jeff Skilling, and Andrew Fastow — failed on every dimension of ethical leadership. From a deontological perspective, they violated the most fundamental duties of fiduciary stewardship: transparency to shareholders, honest accounting, and truthful communication to markets. From a virtue ethics standpoint, Skilling cultivated a corporate culture that explicitly rewarded ruthlessness and punished caution, destroying the moral character of the organization over time.

Christian stewardship theory offers a lens that secular frameworks sometimes miss. Proverbs 11:1 states, "Dishonest scales are an abomination to the Lord, but an accurate weight is His delight." Enron's special purpose entities — used to hide billions in debt — were exactly that: dishonest scales. Stewardship requires not just legal compliance but a posture of transparency before all stakeholders, treating shareholder capital as a trust, not a tool.

The root causes go beyond individual greed. The proximate cause was the SPE accounting manipulation. But the root causes were structural: a board that failed to exercise independent oversight, an audit committee that approved what it did not understand, and a compensation structure that rewarded short-term stock price over long-term integrity. Arthur Andersen's complicity illustrates how institutional incentives can corrupt even external checks.

My systemic recommendations: First, executive compensation must be restructured to include 5-year clawback provisions tied to ethical audits, not just financial performance. Second, boards must include members with genuine technical expertise — not just business relationships with management. Third, corporations should adopt a stewardship charter that explicitly defines their obligations to shareholders, employees, customers, and community — consistent with the stakeholder theory that Freeman (1984) articulated and that Christian ethics demands.

The leaders should have asked not "Is this legal?" but "Is this honest?" Those are different questions, and Enron's tragedy is that no one in power seemed to understand the difference.`,
  },
  {
    id: 'psychology',
    label: 'Psychology Research Summary',
    course: 'PSY-350 · Research Methods in Behavioral Science',
    prompt: 'Write a critical summary of a peer-reviewed article on an evidence-based psychological intervention. Summarize the study\'s methodology, findings, and limitations, and evaluate the strength of the evidence for use in clinical practice.',
    totalPoints: '100',
    assignmentType: 'Short Answer',
    rubric: `Methodology Summary (25 pts)
Excellent (23–25): Accurately describes study design, sample, measures, and procedures with appropriate terminology.
Satisfactory (18–22): Summary present but omits key methodological details.
Needs Work (0–17): Methodology misrepresented or missing.

Findings & Results (25 pts)
Excellent (23–25): Results reported accurately with effect sizes or statistical significance noted; distinguishes statistical from clinical significance.
Satisfactory (18–22): Findings noted but no engagement with effect sizes or significance.
Needs Work (0–17): Findings vague, inaccurate, or absent.

Critical Evaluation & Limitations (25 pts)
Excellent (23–25): Student independently identifies methodological limitations beyond what authors report; discusses generalizability and research gaps.
Satisfactory (18–22): Restates author-reported limitations without critical engagement.
Needs Work (0–17): No critical evaluation; accepts findings uncritically.

Clinical Implications (25 pts)
Excellent (23–25): Connects evidence to clinical practice with specificity; addresses who benefits, under what conditions, and what questions remain.
Satisfactory (18–22): Clinical connection is present but generic.
Needs Work (0–17): Clinical implications absent or unfounded.`,
    submission: `For this critical summary I reviewed: Hofmann, S. G., Asnaani, A., Vonk, I. J. J., Sawyer, A. T., & Fang, A. (2012). The Efficacy of Cognitive Behavioral Therapy: A Review of Meta-Analyses. Cognitive Therapy and Research, 36(5), 427–440.

Methodology: This article is a meta-analytic review rather than a primary study. Hofmann and colleagues synthesized findings from 269 meta-analyses examining CBT across 16 distinct diagnostic categories. The review used a systematic search strategy across PsycINFO and PubMed. Because this is a review of reviews, the sample size is enormous in aggregate, though the quality of included studies varied substantially. The authors note heterogeneity across primary studies as a limitation of their approach.

Findings: The review found strong effect sizes for CBT across numerous domains: unipolar depression (d = 1.32), anxiety disorders (d = 0.80–1.31), somatoform disorders, eating disorders, anger control, and general stress. Effect sizes for CBT with schizophrenia and substance use were moderate and more variable. These are large effect sizes by convention (Cohen, 1988), suggesting CBT outperforms control conditions substantially across most conditions reviewed.

Limitations: The authors acknowledge that most included meta-analyses compared CBT to waitlist or no-treatment controls rather than active treatments. This inflates apparent efficacy. Comparative effectiveness against other bona fide therapies — such as psychodynamic therapy or interpersonal therapy — is much less clear from this evidence base. Additionally, because this is a review of meta-analyses, publication bias in primary studies compounds through each layer of analysis. The authors report this but do not quantify how much it may affect conclusions.

A limitation they do not fully address is sample diversity: most included studies overrepresent white, Western, educated, college-aged participants. Generalizability to YJU's diverse student population, which includes large numbers of working adults, military-connected students, and first-generation learners, is an open question.

Clinical Implications: The evidence supports CBT as a first-line intervention for most anxiety and depressive disorders in traditional clinical contexts. However, clinicians should not apply these findings uncritically. For clients from underrepresented backgrounds, or those with complex trauma histories, modifications to standard CBT protocols may be necessary. The research gap around long-term maintenance effects — most trials measure outcomes at 3–6 months — also warrants caution when making promises about lasting change.`,
  },
];

/* ── Trace types for student mode ──────────────────────────────────────── */
const TRACE_COLORS: Record<string, string> = {
  read: '#38BDF8',
  parse: '#A78BFA',
  analyze: '#F59E0B',
  score: '#2563EB',
  integrity: '#EF4444',
  feedback: '#22C55E',
  finalize: '#64748B',
  reveal: '#2563EB',
};

/* ── Helpers ───────────────────────────────────────────────────────────── */
function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1800); }}
      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
      style={{
        background: copied ? TEAL_DIM : 'rgba(148,163,184,0.10)',
        color: copied ? TEAL : '#94A3B8',
        border: `1px solid ${copied ? TEAL_BORDER : 'rgba(0,0,0,0.08)'}`,
      }}
    >
      {copied ? <Check size={11} /> : <Copy size={11} />}
      {copied ? 'Copied' : label}
    </button>
  );
}

function scoreColor(score: number, possible: number) {
  const pct = score / possible;
  if (pct >= 0.9) return TEAL;
  if (pct >= 0.75) return GOLD;
  return RED;
}

function letterColor(grade: string) {
  if (grade.startsWith('A')) return TEAL;
  if (grade.startsWith('B')) return GOLD;
  return RED;
}

/* ── Mode Toggle ───────────────────────────────────────────────────────── */
function ModeToggle({ mode, onChange }: { mode: 'faculty' | 'student'; onChange: (m: 'faculty' | 'student') => void }) {
  return (
    <div
      className="inline-flex p-1 rounded-xl gap-1"
      style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(148,163,184,0.12)' }}
    >
      <button
        onClick={() => onChange('faculty')}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all"
        style={{
          background: mode === 'faculty' ? AMBER_DIM : 'transparent',
          color: mode === 'faculty' ? AMBER : '#64748B',
          border: `1px solid ${mode === 'faculty' ? AMBER_BORDER : 'transparent'}`,
        }}
      >
        <UserCheck size={13} />
        Faculty Review
      </button>
      <button
        onClick={() => onChange('student')}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all"
        style={{
          background: mode === 'student' ? TEAL_DIM : 'transparent',
          color: mode === 'student' ? TEAL : '#64748B',
          border: `1px solid ${mode === 'student' ? TEAL_BORDER : 'transparent'}`,
        }}
      >
        <Zap size={13} />
        Live Student Mode
      </button>
    </div>
  );
}

/* ── Human in control badge ─────────────────────────────────────────────── */
function HumanInControlBadge() {
  return (
    <div
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ background: AMBER_DIM, color: AMBER, border: `1px solid ${AMBER_BORDER}` }}
    >
      <UserCheck size={10} />
      Faculty in the loop
    </div>
  );
}

function LiveModeBadge() {
  return (
    <div
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ background: TEAL_DIM, color: TEAL, border: `1px solid ${TEAL_BORDER}` }}
    >
      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: TEAL }} />
      Full agentic · real-time
    </div>
  );
}

/* ── Negotiation panel for a single criterion ───────────────────────────── */
function NegotiationPanel({
  criterion,
  submission,
  rubric,
  onScoreUpdate,
}: {
  criterion: Criterion;
  submission: string;
  rubric: string;
  onScoreUpdate: (criterionName: string, newScore: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exchanges, setExchanges] = useState<NegotiationExchange[]>([]);

  const currentScore = exchanges.length > 0
    ? exchanges[exchanges.length - 1].revisedScore
    : criterion.score;

  async function handleSubmitPushback() {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);

    const originalGrade = {
      score: currentScore,
      possible: criterion.possible,
      feedback: exchanges.length > 0
        ? exchanges[exchanges.length - 1].revisedFeedback
        : criterion.feedback,
      quote: criterion.quote,
    };

    try {
      const res = await fetch('/api/grader-negotiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalGrade,
          criterionName: criterion.name,
          facultyFeedback: input.trim(),
          submission,
          rubric,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? 'Something went wrong.'); return; }

      const newExchange: NegotiationExchange = {
        facultyFeedback: input.trim(),
        revisedScore: data.revisedScore,
        revisedFeedback: data.revisedFeedback,
        agentReasoning: data.agentReasoning,
        accepted: data.accepted,
        changeAmount: data.changeAmount,
      };
      setExchanges(prev => [...prev, newExchange]);
      setInput('');
      if (data.accepted) {
        onScoreUpdate(criterion.name, data.revisedScore);
      }
    } catch {
      setError('Network error — please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  const totalAdjustment = exchanges.reduce((sum, ex) => sum + (ex.changeAmount || 0), 0);

  return (
    <div className="mt-3">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-semibold transition-all hover:-translate-y-px"
          style={{ background: AMBER_DIM, color: AMBER, border: `1px solid ${AMBER_BORDER}` }}
        >
          <MessageSquare size={11} />
          Push back on this score
        </button>
      ) : (
        <div
          className="rounded-xl border p-4 space-y-4"
          style={{ background: 'rgba(245,158,11,0.05)', borderColor: AMBER_BORDER }}
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <MessageSquare size={13} style={{ color: AMBER }} />
              <span className="text-xs font-bold" style={{ color: AMBER }}>Rubric Negotiation</span>
              <HumanInControlBadge />
            </div>
            <button onClick={() => setOpen(false)} className="text-molted-muted text-xs hover:text-molted-white transition-colors">
              Close
            </button>
          </div>

          {exchanges.length > 0 && (
            <div className="space-y-3">
              {exchanges.map((ex, i) => (
                <div key={i} className="space-y-2">
                  <div className="rounded-xl p-3 text-xs leading-relaxed" style={{ background: AMBER_DIM, borderLeft: `3px solid ${AMBER}` }}>
                    <p className="font-semibold mb-1" style={{ color: AMBER }}>You said:</p>
                    <p className="text-molted-white/80">{ex.facultyFeedback}</p>
                  </div>
                  <div
                    className="rounded-xl p-3 text-xs leading-relaxed"
                    style={{ background: ex.accepted ? TEAL_DIM : 'rgba(148,163,184,0.07)', borderLeft: `3px solid ${ex.accepted ? TEAL : '#64748B'}` }}
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                      <p className="font-bold" style={{ color: ex.accepted ? TEAL : '#94A3B8' }}>
                        {ex.accepted
                          ? `Adjusted: ${currentScore - ex.changeAmount} → ${ex.revisedScore} (+${ex.changeAmount} pts)`
                          : 'Maintaining original score'}
                      </p>
                      {ex.accepted && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: TEAL_DIM, color: TEAL }}>
                          Score updated
                        </span>
                      )}
                    </div>
                    <p className="text-molted-muted mb-1">{ex.agentReasoning}</p>
                    {ex.accepted && ex.revisedFeedback && (
                      <p className="text-molted-white/70 mt-2 pt-2 border-t border-white/10">
                        <span className="font-semibold text-molted-muted">Revised feedback: </span>
                        {ex.revisedFeedback}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              {totalAdjustment !== 0 && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold" style={{ background: TEAL_DIM, color: TEAL, border: `1px solid ${TEAL_BORDER}` }}>
                  <Check size={11} />
                  Net adjustment: {totalAdjustment > 0 ? '+' : ''}{totalAdjustment} pts
                  &nbsp;({criterion.score} → {currentScore}/{criterion.possible})
                </div>
              )}
            </div>
          )}

          <div className="space-y-2">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={
                exchanges.length === 0
                  ? "Tell Forge why you disagree with this score...\n\nExamples:\n• This student is a first-gen learner who showed genuine effort despite limited research access\n• You were too harsh — the evidence was there but imprecisely cited\n• The student misread the prompt but clearly understood the core concept"
                  : "Continue the conversation — provide additional context or reasoning..."
              }
              rows={4}
              disabled={loading}
              className="w-full rounded-xl border text-xs text-molted-white leading-relaxed resize-none p-3 focus:outline-none transition-all"
              style={{
                background: 'rgba(248,249,252,0.95)',
                borderColor: input.trim() ? AMBER_BORDER : 'rgba(0,0,0,0.08)',
                opacity: loading ? 0.6 : 1,
              }}
            />
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button
              onClick={handleSubmitPushback}
              disabled={!input.trim() || loading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all"
              style={{
                background: input.trim() && !loading ? AMBER : 'rgba(148,163,184,0.10)',
                color: input.trim() && !loading ? '#0A0A0F' : '#64748B',
                cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
              }}
            >
              {loading
                ? <><Loader2 size={12} className="animate-spin" />Forge is reconsidering…</>
                : <><RefreshCw size={12} />Submit pushback</>
              }
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Criterion card ────────────────────────────────────────────────────── */
function CriterionCard({
  c,
  index,
  submission,
  rubric,
  onScoreUpdate,
  showNegotiation = true,
}: {
  c: Criterion;
  index: number;
  submission: string;
  rubric: string;
  onScoreUpdate: (criterionName: string, newScore: number) => void;
  showNegotiation?: boolean;
}) {
  const [open, setOpen] = useState(true);
  const pct = Math.round((c.score / c.possible) * 100);
  const color = scoreColor(c.score, c.possible);

  return (
    <div
      className="rounded-2xl border transition-all"
      style={{ background: 'rgba(241,243,248,0.95)', borderColor: 'rgba(148,163,184,0.12)' }}
    >
      <button
        className="w-full flex items-center gap-4 p-4 text-left"
        onClick={() => setOpen(o => !o)}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0"
          style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}
        >
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-molted-white text-sm font-bold truncate">{c.name}</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 h-1 rounded-full bg-molted-border overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
            </div>
            <span className="text-xs font-bold flex-shrink-0" style={{ color }}>{c.score}/{c.possible}</span>
          </div>
        </div>
        {open ? <ChevronUp size={14} className="text-molted-muted flex-shrink-0" /> : <ChevronDown size={14} className="text-molted-muted flex-shrink-0" />}
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-3">
          <p className="text-sm text-molted-white/80 leading-relaxed">{c.feedback}</p>
          {c.quote && (
            <div
              className="rounded-xl p-3 text-xs text-molted-muted leading-relaxed italic border-l-2"
              style={{ background: 'rgba(0,0,0,0.3)', borderLeftColor: color }}
            >
              "{c.quote}"
            </div>
          )}
          {showNegotiation && (
            <NegotiationPanel
              criterion={c}
              submission={submission}
              rubric={rubric}
              onScoreUpdate={onScoreUpdate}
            />
          )}
        </div>
      )}
    </div>
  );
}

/* ── Faculty Grade View ────────────────────────────────────────────────── */
function FacultyGradeView({
  result,
  assignmentTitle,
  submission,
  rubric,
}: {
  result: GradeResult;
  assignmentTitle: string;
  submission: string;
  rubric: string;
}) {
  const [criteria, setCriteria] = useState<Criterion[]>(result.criteria);
  const [totalScore, setTotalScore] = useState(result.totalScore);
  const [approved, setApproved] = useState(false);

  function handleScoreUpdate(criterionName: string, newScore: number) {
    setCriteria(prev => {
      const updated = prev.map(c => {
        if (c.name === criterionName) {
          const diff = newScore - c.score;
          setTotalScore(t => t + diff);
          return { ...c, score: newScore };
        }
        return c;
      });
      return updated;
    });
  }

  const pct = Math.round((totalScore / result.totalPossible) * 100);
  const lColor = letterColor(result.letterGrade);

  const fullFeedback = [
    assignmentTitle ? `Assignment: ${assignmentTitle}` : '',
    `Score: ${totalScore}/${result.totalPossible} (${pct}%) — ${result.letterGrade}`,
    '',
    result.summary,
    '',
    '── Criteria ──',
    ...criteria.map(c =>
      `${c.name}: ${c.score}/${c.possible}\n${c.feedback}${c.quote ? `\n"${c.quote}"` : ''}`
    ),
    '',
    '── Strengths ──',
    ...result.strengths.map(s => `• ${s}`),
    '',
    '── Areas for Improvement ──',
    ...result.improvements.map(i => `• ${i}`),
    result.integrityFlag ? `\n⚠ Academic Integrity Note: ${result.integrityNote}` : '',
  ].filter(Boolean).join('\n');

  if (approved) {
    return (
      <div
        className="rounded-3xl border p-10 text-center"
        style={{ background: GREEN_DIM, borderColor: GREEN_BORDER }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{ background: GREEN_DIM, border: `1px solid ${GREEN_BORDER}` }}
        >
          <CheckCircle size={28} style={{ color: GREEN }} />
        </div>
        <p className="text-lg font-black text-molted-white mb-1">Grade Released to Student</p>
        <p className="text-molted-muted text-sm mb-4">
          {assignmentTitle || 'Submission'} · {totalScore}/{result.totalPossible} ({pct}%) · {result.letterGrade}
        </p>
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
          style={{ background: GREEN_DIM, color: GREEN, border: `1px solid ${GREEN_BORDER}` }}
        >
          <CheckCircle size={12} />
          Posted to gradebook · Student notified
        </div>
        <div className="mt-6">
          <CopyButton text={fullFeedback} label="Copy full feedback" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Score header */}
      <div className="rounded-2xl border p-6" style={{ background: TEAL_DIM, borderColor: TEAL_BORDER }}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="text-molted-muted text-xs font-semibold uppercase tracking-wide">
                {assignmentTitle || 'Graded Submission'}
              </p>
              <HumanInControlBadge />
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-black" style={{ color: lColor }}>{result.letterGrade}</span>
              <div>
                <p className="text-molted-white text-xl font-black">
                  {totalScore}<span className="text-molted-muted font-medium text-base">/{result.totalPossible}</span>
                </p>
                <p className="text-molted-muted text-sm">{pct}%</p>
              </div>
            </div>
          </div>
          <CopyButton text={fullFeedback} label="Copy all feedback" />
        </div>
        <p className="mt-4 text-molted-white/80 text-sm leading-relaxed">{result.summary}</p>
      </div>

      {/* Integrity flag */}
      {result.integrityFlag && (
        <div
          className="rounded-2xl border p-4 flex gap-3"
          style={{ background: 'rgba(30,58,138,0.08)', borderColor: 'rgba(30,58,138,0.2)' }}
        >
          <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" style={{ color: RED }} />
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: RED }}>Academic Integrity Flag</p>
            <p className="text-molted-muted text-sm leading-relaxed">{result.integrityNote}</p>
          </div>
        </div>
      )}

      {/* Criteria */}
      <div>
        <p className="text-molted-muted text-xs font-semibold uppercase tracking-wide mb-3">Rubric breakdown</p>
        <div className="space-y-3">
          {criteria.map((c, i) => (
            <CriterionCard
              key={i}
              c={c}
              index={i}
              submission={submission}
              rubric={rubric}
              onScoreUpdate={handleScoreUpdate}
              showNegotiation={true}
            />
          ))}
        </div>
      </div>

      {/* Strengths + Improvements */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border p-4" style={{ background: 'rgba(241,243,248,0.95)', borderColor: 'rgba(148,163,184,0.12)' }}>
          <div className="flex items-center gap-2 mb-3">
            <ThumbsUp size={13} style={{ color: TEAL }} />
            <p className="text-xs font-semibold text-molted-muted uppercase tracking-wide">Strengths</p>
          </div>
          <ul className="space-y-2">
            {result.strengths.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm text-molted-white/80">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: TEAL }} />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border p-4" style={{ background: 'rgba(241,243,248,0.95)', borderColor: 'rgba(148,163,184,0.12)' }}>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={13} style={{ color: GOLD }} />
            <p className="text-xs font-semibold text-molted-muted uppercase tracking-wide">Improve</p>
          </div>
          <ul className="space-y-2">
            {result.improvements.map((imp, i) => (
              <li key={i} className="flex gap-2 text-sm text-molted-white/80">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: GOLD }} />
                {imp}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Approve & Release */}
      <div
        className="rounded-2xl border p-5"
        style={{ background: 'rgba(34,197,94,0.05)', borderColor: GREEN_BORDER }}
      >
        <div className="flex items-start gap-3 mb-4">
          <Shield size={16} style={{ color: GREEN }} className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-molted-white mb-0.5">Ready to release?</p>
            <p className="text-xs text-molted-muted leading-relaxed">
              Review the scores and feedback above. Use the "Push back" panels to negotiate any criterion you disagree with. When you're satisfied, approve to post the grade and notify the student.
            </p>
          </div>
        </div>
        <button
          onClick={() => setApproved(true)}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all hover:-translate-y-px"
          style={{ background: `linear-gradient(135deg, #16a34a, #22c55e)`, color: '#fff' }}
        >
          <CheckCircle size={16} />
          Approve & Release to Student
        </button>
      </div>
    </div>
  );
}

/* ── Student Grade View (Live Mode result) ──────────────────────────────── */
function StudentGradeView({ result, assignmentTitle }: { result: GradeResult; assignmentTitle: string }) {
  const pct = Math.round((result.totalScore / result.totalPossible) * 100);
  const lColor = letterColor(result.letterGrade);

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Score */}
      <div className="rounded-2xl border p-6 text-center" style={{ background: TEAL_DIM, borderColor: TEAL_BORDER }}>
        <p className="text-molted-muted text-xs font-semibold uppercase tracking-wide mb-3">{assignmentTitle}</p>
        <div className="text-6xl font-black mb-2" style={{ color: lColor }}>{result.letterGrade}</div>
        <p className="text-2xl font-black text-molted-white">
          {result.totalScore}<span className="text-molted-muted font-normal text-lg">/{result.totalPossible}</span>
          <span className="text-molted-muted font-normal text-base ml-2">({pct}%)</span>
        </p>
        <p className="mt-4 text-molted-white/80 text-sm leading-relaxed max-w-md mx-auto">{result.summary}</p>
      </div>

      {result.integrityFlag && (
        <div className="rounded-2xl border p-4 flex gap-3" style={{ background: 'rgba(30,58,138,0.08)', borderColor: 'rgba(30,58,138,0.2)' }}>
          <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" style={{ color: RED }} />
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: RED }}>Academic Integrity Note</p>
            <p className="text-molted-muted text-sm">{result.integrityNote}</p>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {result.criteria.map((c, i) => (
          <CriterionCard
            key={i}
            c={c}
            index={i}
            submission=""
            rubric=""
            onScoreUpdate={() => {}}
            showNegotiation={false}
          />
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border p-4" style={{ background: 'rgba(241,243,248,0.95)', borderColor: 'rgba(148,163,184,0.12)' }}>
          <div className="flex items-center gap-2 mb-3">
            <ThumbsUp size={13} style={{ color: TEAL }} />
            <p className="text-xs font-semibold text-molted-muted uppercase tracking-wide">Strengths</p>
          </div>
          <ul className="space-y-2">
            {result.strengths.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm text-molted-white/80">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: TEAL }} />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border p-4" style={{ background: 'rgba(241,243,248,0.95)', borderColor: 'rgba(148,163,184,0.12)' }}>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={13} style={{ color: GOLD }} />
            <p className="text-xs font-semibold text-molted-muted uppercase tracking-wide">Work on</p>
          </div>
          <ul className="space-y-2">
            {result.improvements.map((imp, i) => (
              <li key={i} className="flex gap-2 text-sm text-molted-white/80">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: GOLD }} />
                {imp}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ── Live Student Mode View ─────────────────────────────────────────────── */
function LiveStudentView() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [essay, setEssay] = useState(STUDENT_SCENARIOS[0].submission);
  const [traces, setTraces] = useState<Array<{ step: string; type: string }>>([]);
  const [criteria, setCriteria] = useState<Criterion[]>([]);
  const [result, setResult] = useState<GradeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const tracesRef = useRef<HTMLDivElement>(null);

  const scenario = STUDENT_SCENARIOS[scenarioIdx];

  // Auto-scroll trace feed
  useEffect(() => {
    if (tracesRef.current) {
      tracesRef.current.scrollTop = tracesRef.current.scrollHeight;
    }
  }, [traces, criteria]);

  function handleScenarioChange(idx: number) {
    setScenarioIdx(idx);
    setEssay(STUDENT_SCENARIOS[idx].submission);
    setTraces([]);
    setCriteria([]);
    setResult(null);
    setError(null);
    setSubmitted(false);
  }

  async function handleSubmit() {
    if (essay.trim().length < 30 || loading) return;
    setSubmitted(true);
    setLoading(true);
    setTraces([]);
    setCriteria([]);
    setResult(null);
    setError(null);

    try {
      const res = await fetch('/api/agentic-grader?stream=true', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rubric: scenario.rubric,
          submission: essay,
          assignmentTitle: scenario.label,
          assignmentType: scenario.assignmentType,
          totalPoints: scenario.totalPoints,
        }),
      });

      if (!res.body) throw new Error('No response body');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let currentEvent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (line.startsWith('event: ')) {
            currentEvent = line.slice(7).trim();
          } else if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (currentEvent === 'trace') {
                setTraces(t => [...t, data]);
              } else if (currentEvent === 'criterion') {
                setCriteria(c => [...c, data]);
              } else if (currentEvent === 'result') {
                setResult(data);
              } else if (currentEvent === 'error') {
                setError(data.message);
              }
            } catch { /* skip malformed */ }
          }
        }
      }
    } catch (e: any) {
      setError(e?.message ?? 'Network error');
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setSubmitted(false);
    setLoading(false);
    setTraces([]);
    setCriteria([]);
    setResult(null);
    setError(null);
    setEssay(scenario.submission);
  }

  return (
    <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-start">
      {/* Left — student submission panel */}
      <div
        className="rounded-3xl p-6 border sticky top-24 space-y-5"
        style={{ background: 'rgba(241,243,248,0.90)', borderColor: 'rgba(148,163,184,0.10)' }}
      >
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <GraduationCap size={15} style={{ color: TEAL }} />
            <span className="text-sm font-bold text-molted-white">Student Submission Portal</span>
          </div>
          <LiveModeBadge />
        </div>

        {/* Scenario tabs */}
        {!submitted && (
          <div>
            <p className="text-xs font-semibold text-molted-muted uppercase tracking-widest mb-2">Select assignment</p>
            <div className="space-y-1.5">
              {STUDENT_SCENARIOS.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => handleScenarioChange(i)}
                  className="w-full text-left px-4 py-3 rounded-xl transition-all"
                  style={{
                    background: scenarioIdx === i ? TEAL_DIM : 'rgba(148,163,184,0.06)',
                    border: `1px solid ${scenarioIdx === i ? TEAL_BORDER : 'rgba(148,163,184,0.10)'}`,
                  }}
                >
                  <p className="text-sm font-bold" style={{ color: scenarioIdx === i ? TEAL : '#CBD5E1' }}>{s.label}</p>
                  <p className="text-xs text-molted-muted mt-0.5">{s.course}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Assignment prompt */}
        <div
          className="rounded-xl p-4"
          style={{ background: 'rgba(37,99,235,0.06)', border: `1px solid ${TEAL_BORDER}` }}
        >
          <div className="flex items-center gap-2 mb-2">
            <BookOpen size={12} style={{ color: TEAL }} />
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: TEAL }}>Assignment Prompt</p>
          </div>
          <p className="text-xs text-molted-white/80 leading-relaxed">{scenario.prompt}</p>
          <p className="text-xs text-molted-muted mt-2">
            <span className="font-semibold">{scenario.course}</span> · {scenario.totalPoints} pts
          </p>
        </div>

        {/* Essay textarea */}
        {!submitted && (
          <>
            <div>
              <label className="block text-sm font-bold text-molted-white mb-2">Your submission</label>
              <textarea
                value={essay}
                onChange={e => setEssay(e.target.value)}
                placeholder="Write or paste your response here…"
                rows={12}
                className="w-full rounded-xl border text-sm text-molted-white leading-relaxed resize-none p-3 focus:outline-none"
                style={{
                  background: 'rgba(248,249,252,0.95)',
                  borderColor: essay.trim() ? TEAL_BORDER : 'rgba(0,0,0,0.08)',
                }}
              />
              <p className="text-xs text-molted-muted mt-1">{essay.trim().split(/\s+/).filter(Boolean).length} words</p>
            </div>
            <button
              onClick={handleSubmit}
              disabled={essay.trim().length < 30}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm transition-all hover:-translate-y-px"
              style={{
                background: essay.trim().length >= 30
                  ? `linear-gradient(135deg, ${TEAL}, #1d4ed8)`
                  : 'rgba(148,163,184,0.10)',
                color: essay.trim().length >= 30 ? '#fff' : '#64748B',
              }}
            >
              <Play size={15} />
              Submit Assignment
            </button>
          </>
        )}

        {submitted && !result && (
          <div
            className="rounded-xl p-4 text-center"
            style={{ background: TEAL_DIM, border: `1px solid ${TEAL_BORDER}` }}
          >
            <Loader2 size={20} style={{ color: TEAL }} className="animate-spin mx-auto mb-2" />
            <p className="text-sm font-semibold text-molted-white">Grading in progress…</p>
            <p className="text-xs text-molted-muted mt-1">Your feedback is being generated in real-time</p>
          </div>
        )}

        {submitted && result && (
          <button
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors"
            style={{ background: 'rgba(148,163,184,0.08)', color: '#64748B', border: '1px solid rgba(148,163,184,0.12)' }}
          >
            <RefreshCw size={13} />
            Submit another
          </button>
        )}
      </div>

      {/* Right — live feed + results */}
      <div className="space-y-4">
        {!submitted && (
          <div
            className="rounded-3xl p-10 border text-center"
            style={{ background: 'rgba(241,243,248,0.80)', borderColor: 'rgba(148,163,184,0.08)' }}
          >
            <div className="grid grid-cols-3 gap-3 mb-8 max-w-xs mx-auto">
              {[
                { icon: Play, label: 'Submit to grade' },
                { icon: Clock, label: 'Real-time feedback' },
                { icon: CheckSquare, label: 'Instant results' },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="rounded-2xl p-4 flex flex-col items-center gap-2"
                  style={{ background: 'rgba(148,163,184,0.07)', border: '1px solid rgba(148,163,184,0.08)' }}
                >
                  <Icon size={18} className="text-molted-subtle" />
                  <p className="text-molted-subtle text-xs text-center">{label}</p>
                </div>
              ))}
            </div>
            <p className="text-molted-muted font-semibold mb-2">Select an assignment and submit to see live grading</p>
            <p className="text-molted-subtle text-sm">Watch Forge grade your submission criterion by criterion in real-time.</p>
          </div>
        )}

        {/* Live trace feed */}
        {submitted && (traces.length > 0 || criteria.length > 0) && (
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ background: 'rgba(0,0,0,0.6)', borderColor: 'rgba(148,163,184,0.10)' }}
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: 'rgba(148,163,184,0.08)' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: TEAL }} />
              <p className="text-xs font-bold text-molted-muted uppercase tracking-widest">Agent trace</p>
            </div>
            <div
              ref={tracesRef}
              className="p-4 space-y-1.5 max-h-56 overflow-y-auto font-mono"
            >
              {traces.map((t, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs">
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: TRACE_COLORS[t.type] ?? '#64748B' }}
                  />
                  <span style={{ color: TRACE_COLORS[t.type] ?? '#94A3B8' }}>{t.step}</span>
                </div>
              ))}
              {criteria.length > 0 && (
                <div className="flex items-center gap-2.5 text-xs pt-1">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: GREEN }} />
                  <span style={{ color: GREEN }}>{criteria.length} criterion score{criteria.length > 1 ? 's' : ''} ready</span>
                </div>
              )}
              {result && (
                <div className="flex items-center gap-2.5 text-xs pt-1">
                  <CheckCircle size={10} style={{ color: GREEN }} />
                  <span style={{ color: GREEN }} className="font-bold">Grade report complete</span>
                </div>
              )}
              {loading && !result && (
                <div className="flex items-center gap-2.5 text-xs pt-1">
                  <Loader2 size={10} className="animate-spin" style={{ color: TEAL }} />
                  <span style={{ color: TEAL }}>Processing…</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Criteria reveal — appear one by one */}
        {criteria.length > 0 && !result && (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-molted-muted uppercase tracking-widest">
              Scores revealed so far…
            </p>
            {criteria.map((c, i) => (
              <CriterionCard
                key={i}
                c={c}
                index={i}
                submission=""
                rubric=""
                onScoreUpdate={() => {}}
                showNegotiation={false}
              />
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-2xl p-5 border" style={{ background: 'rgba(30,58,138,0.08)', borderColor: 'rgba(30,58,138,0.2)' }}>
            <p className="text-red-400 text-sm font-semibold mb-1">Error</p>
            <p className="text-molted-muted text-sm">{error}</p>
          </div>
        )}

        {/* Full result */}
        {result && (
          <StudentGradeView
            result={result}
            assignmentTitle={scenario.label}
          />
        )}
      </div>
    </div>
  );
}

/* ── Input form (Faculty mode) ─────────────────────────────────────────── */
const ASSIGNMENT_TYPES = ['Essay', 'Discussion Post', 'Short Answer', 'Lab Report', 'Case Study', 'Presentation', 'Project'];

function InputForm({ onSubmit, loading }: {
  onSubmit: (data: Record<string, string>) => void;
  loading: boolean;
}) {
  const [form, setForm] = useState({
    assignmentTitle: '',
    assignmentType: 'Essay',
    totalPoints: '100',
    rubric: '',
    submission: '',
    voice: '',
  });

  const set = (k: string) => (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const ready = form.rubric.trim().length > 20 && form.submission.trim().length > 30 && !loading;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-molted-white text-sm font-semibold mb-2">Assignment title</label>
          <input
            type="text"
            value={form.assignmentTitle}
            onChange={set('assignmentTitle')}
            placeholder="e.g. Essay 2 — Globalization"
            className="w-full rounded-xl border text-sm text-molted-white p-3 focus:outline-none"
            style={{
              background: 'rgba(248,249,252,0.95)',
              borderColor: form.assignmentTitle ? TEAL_BORDER : 'rgba(0,0,0,0.08)',
            }}
          />
        </div>
        <div>
          <label className="block text-molted-muted text-xs font-semibold mb-2">Type</label>
          <div className="flex flex-wrap gap-1.5">
            {ASSIGNMENT_TYPES.map(t => {
              const active = form.assignmentType === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, assignmentType: t }))}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all"
                  style={{
                    background: active ? TEAL_DIM : 'rgba(148,163,184,0.08)',
                    color: active ? TEAL : '#94A3B8',
                    border: `1px solid ${active ? TEAL_BORDER : 'rgba(148,163,184,0.12)'}`,
                  }}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-molted-white text-sm font-semibold mb-1">
          Rubric <span className="text-molted-subtle font-normal text-xs">(required)</span>
        </label>
        <p className="text-molted-muted text-xs mb-2">
          List your criteria and point values. Plain text is fine.
        </p>
        <textarea
          value={form.rubric}
          onChange={set('rubric')}
          placeholder={`Thesis & Argument (25 pts)\nExcellent: Clear, original thesis that drives the essay.\nSatisfactory: Thesis present but somewhat generic.\nNeeds Work: Thesis absent or unclear.\n\nEvidence & Support (25 pts)\nExcellent: All claims supported by specific, relevant evidence.\n...`}
          rows={7}
          className="w-full rounded-xl border text-sm text-molted-white leading-relaxed resize-none p-3 focus:outline-none"
          style={{
            background: 'rgba(248,249,252,0.95)',
            borderColor: form.rubric ? TEAL_BORDER : 'rgba(0,0,0,0.08)',
          }}
        />
      </div>

      <div>
        <label className="block text-molted-white text-sm font-semibold mb-1">
          Student submission <span className="text-molted-subtle font-normal text-xs">(required)</span>
        </label>
        <textarea
          value={form.submission}
          onChange={set('submission')}
          placeholder="Paste the student's submission here…"
          rows={8}
          className="w-full rounded-xl border text-sm text-molted-white leading-relaxed resize-none p-3 focus:outline-none"
          style={{
            background: 'rgba(248,249,252,0.95)',
            borderColor: form.submission ? TEAL_BORDER : 'rgba(0,0,0,0.08)',
          }}
        />
      </div>

      <div>
        <label className="block text-molted-white text-sm font-semibold mb-1">
          Your voice <span className="text-molted-subtle font-normal text-xs">(optional)</span>
        </label>
        <textarea
          value={form.voice}
          onChange={set('voice')}
          placeholder="e.g. I'm direct and high-standards. I expect specific evidence and clean argument structure."
          rows={3}
          className="w-full rounded-xl border text-sm text-molted-muted leading-relaxed resize-none p-3 focus:outline-none"
          style={{
            background: 'rgba(248,249,252,0.95)',
            borderColor: form.voice ? TEAL_BORDER : 'rgba(0,0,0,0.08)',
          }}
        />
      </div>

      <button
        onClick={() => onSubmit(form)}
        disabled={!ready}
        className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm transition-all"
        style={{
          background: ready ? TEAL : 'rgba(148,163,184,0.10)',
          color: ready ? '#0A0A0F' : '#64748B',
          cursor: ready ? 'pointer' : 'not-allowed',
        }}
      >
        {loading ? (
          <><Loader2 size={16} className="animate-spin" />Grading submission…</>
        ) : (
          <><CheckSquare size={16} />Grade This Submission</>
        )}
      </button>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────── */
export default function AgenticGrader() {
  const [mode, setMode] = useState<'faculty' | 'student'>('faculty');
  const [result, setResult] = useState<GradeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [lastForm, setLastForm] = useState<Record<string, string>>({});

  function handleModeChange(m: 'faculty' | 'student') {
    setMode(m);
    setResult(null);
    setError(null);
  }

  async function handleSubmit(form: Record<string, string>) {
    setLoading(true);
    setError(null);
    setResult(null);
    setTitle(form.assignmentTitle || 'Graded Submission');
    setLastForm(form);

    try {
      const res = await fetch('/api/agentic-grader', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? 'Something went wrong.'); return; }
      setResult(data);
    } catch {
      setError('Network error — please check your connection and try again.');
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

            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ background: TEAL_DIM, color: TEAL, border: `1px solid ${TEAL_BORDER}` }}
            >
              <CheckSquare size={11} />
              Agentic Grader · Beta
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-molted-white tracking-tight">
              Your rubric. Your standards.
              <br />
              <span style={{ color: TEAL }}>Zero friction.</span>
            </h1>
            <p className="mt-3 text-molted-muted text-base max-w-lg leading-relaxed">
              Two modes: faculty review with full score negotiation and one-click approval, or live student mode where feedback streams in real-time the moment a submission lands.
            </p>

            {/* Mode Toggle */}
            <div className="mt-6">
              <ModeToggle mode={mode} onChange={handleModeChange} />
            </div>

            {/* Mode description */}
            <div className="mt-4">
              {mode === 'faculty' ? (
                <div className="flex items-center gap-2 text-xs text-molted-muted">
                  <HumanInControlBadge />
                  <span>Review scores, push back on any criterion, then approve to release.</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs text-molted-muted">
                  <LiveModeBadge />
                  <span>Student submits → agent grades in real-time → feedback appears criterion by criterion.</span>
                </div>
              )}
            </div>
          </div>

          {/* Mode content */}
          {mode === 'faculty' ? (
            <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-start">
              <div
                className="rounded-3xl p-6 border sticky top-24"
                style={{ background: 'rgba(241,243,248,0.90)', borderColor: 'rgba(148,163,184,0.10)' }}
              >
                <InputForm onSubmit={handleSubmit} loading={loading} />
              </div>

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

                {!result && !loading && !error && (
                  <div
                    className="rounded-3xl p-10 border text-center"
                    style={{ background: 'rgba(241,243,248,0.80)', borderColor: 'rgba(148,163,184,0.08)' }}
                  >
                    <div className="grid grid-cols-3 gap-3 mb-8 max-w-xs mx-auto">
                      {[
                        { icon: CheckSquare, label: 'Rubric scoring' },
                        { icon: Shield, label: 'Integrity check' },
                        { icon: TrendingUp, label: 'Actionable feedback' },
                      ].map(({ icon: Icon, label }) => (
                        <div
                          key={label}
                          className="rounded-2xl p-4 flex flex-col items-center gap-2"
                          style={{ background: 'rgba(148,163,184,0.07)', border: '1px solid rgba(148,163,184,0.08)' }}
                        >
                          <Icon size={18} className="text-molted-subtle" />
                          <p className="text-molted-subtle text-xs text-center">{label}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-molted-muted font-semibold mb-2">Your grade report will appear here</p>
                    <p className="text-molted-subtle text-sm">
                      Paste your rubric and submission on the left, then click Grade.
                    </p>
                  </div>
                )}

                {loading && (
                  <div
                    className="rounded-3xl p-10 border text-center"
                    style={{ background: 'rgba(241,243,248,0.80)', borderColor: TEAL_BORDER }}
                  >
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                      style={{ background: TEAL_DIM, border: `1px solid ${TEAL_BORDER}` }}
                    >
                      <Loader2 size={20} style={{ color: TEAL }} className="animate-spin" />
                    </div>
                    <p className="text-molted-white font-semibold mb-1">Reading the submission…</p>
                    <p className="text-molted-muted text-sm">
                      Grading criterion by criterion and writing personalized feedback.
                      <br />This usually takes 10–20 seconds.
                    </p>
                  </div>
                )}

                {result && (
                  <FacultyGradeView
                    result={result}
                    assignmentTitle={title}
                    submission={lastForm.submission ?? ''}
                    rubric={lastForm.rubric ?? ''}
                  />
                )}
              </div>
            </div>
          ) : (
            <LiveStudentView />
          )}

          {/* Footer nudge */}
          <div
            className="mt-16 rounded-3xl p-8 border text-center"
            style={{ background: 'rgba(241,243,248,0.90)', borderColor: 'rgba(148,163,184,0.10)' }}
          >
            <p className="text-molted-muted text-sm mb-1">This is Forge Agentic Grader — beta.</p>
            <p className="text-molted-white font-semibold mb-5">
              Next: batch-grade entire class rosters in one upload.
            </p>
            <a
              href="mailto:hello@molted.ai"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:-translate-y-px"
              style={{ background: TEAL, color: '#ffffff' }}
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
