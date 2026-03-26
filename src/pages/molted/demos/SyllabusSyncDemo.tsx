import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  RefreshCw, Upload, CheckCircle, BookOpen, AlertTriangle,
  ChevronDown, ChevronUp, Zap, FileText,
} from 'lucide-react';

const EMERALD = '#059669';
const EMERALD_DIM = 'rgba(5,150,105,0.08)';
const EMERALD_BORDER = 'rgba(5,150,105,0.22)';

const CARD = '#f8fafc';
const CARD_INNER = '#f1f5f9';
const BORDER = 'rgba(148,163,184,0.20)';
const DIVIDER = 'rgba(148,163,184,0.15)';

const SAMPLE_SYLLABI = [
  {
    id: 'nursing',
    label: 'NUR-412 · Bioethics in Clinical Practice',
    courseType: 'Nursing Ethics — upper division BSN',
    text: `NUR-412: Bioethics in Clinical Practice (3 credits)
Instructor: Dr. Sarah Mitchell, DNP, RN | Office Hours: Mon/Wed 2-4pm
Course Duration: 8 weeks | Delivery: Online asynchronous with one synchronous session

COURSE DESCRIPTION
This course examines ethical dilemmas encountered in clinical nursing practice using the four principles of biomedical ethics: autonomy, beneficence, non-maleficence, and justice. Students will analyze real and hypothetical cases, develop moral reasoning frameworks, and apply faith-integrated ethical decision-making aligned with a Christian worldview.

LEARNING OUTCOMES
Upon completion, students will: (1) Apply the four principles of bioethics to clinical scenarios; (2) Analyze ethical conflicts using multiple ethical frameworks; (3) Demonstrate advocacy skills for vulnerable patient populations; (4) Integrate Christian values into ethical decision-making.

REQUIRED TEXTS
- Beauchamp & Childress, Principles of Biomedical Ethics, 8th ed.
- Selected case studies (provided via LMS)

GRADING
Weekly Discussion Posts: 30% | Case Analysis Papers (3): 40% | Midterm Exam: 15% | Final Reflection: 15%

WEEKLY OUTLINE
Week 1: Foundations — autonomy and informed consent
Week 2: Beneficence and non-maleficence in clinical settings
Week 3: Justice, equity, and resource allocation
Week 4: End-of-life ethics and advance directives
Week 5: Research ethics and vulnerable populations
Week 6: Mental health ethics and capacity
Week 7: Faith, culture, and clinical ethics
Week 8: Integration and professional identity`,
  },
  {
    id: 'business',
    label: 'BUS-601 · Strategic Management',
    courseType: 'MBA Strategic Management — graduate level',
    text: `BUS-601: Strategic Management (3 credits)
Instructor: Prof. James Holloway, MBA | Contact: j.holloway@university.edu
Duration: 7 weeks | Format: Online

DESCRIPTION
An advanced examination of strategic analysis, competitive positioning, and leadership decision-making. Students apply frameworks including Porter's Five Forces, SWOT, and Blue Ocean Strategy to real organizations. Integration of Christian ethics in corporate strategy is emphasized.

GRADING DISTRIBUTION
Strategic Analysis Posts: 25% | Case Presentation: 20% | Competitive Analysis Paper: 30% | Final Strategic Plan: 25%

COURSE SCHEDULE
Week 1: Introduction to Strategic Thinking & Mission Alignment
Week 2: External Environment Analysis — Porter's Five Forces
Week 3: Internal Capabilities — Resource-Based View
Week 4: Competitive Strategy and Differentiation
Week 5: Growth Strategies and Innovation
Week 6: Strategy Execution and Change Management
Week 7: Ethics, Faith-Integration, and Sustainable Strategy

ASSESSMENTS
- Weekly discussion (min 250 words + 2 peer responses)
- Mid-course case presentation (15 min recorded)
- Competitive analysis paper (2000-2500 words, APA 7)
- Final strategic plan (3500 words with financial projections)`,
  },
  {
    id: 'education',
    label: 'EDU-550 · Curriculum Design & Assessment',
    courseType: 'MEd Curriculum Design — graduate level',
    text: `EDU-550: Curriculum Design and Assessment (3 credits)
Instructor: Dr. Maria Santos, EdD | Program: Master of Education
Term Length: 8 weeks | Modality: Online asynchronous

COURSE OVERVIEW
Students will design comprehensive curriculum units using backward design principles (Wiggins & McTighe), develop authentic assessments aligned with learning standards, and apply differentiated instruction strategies. The course emphasizes data-driven iteration and universal design for learning (UDL).

STUDENT LEARNING OUTCOMES
1. Design standards-aligned curriculum units using Understanding by Design (UbD)
2. Create authentic performance assessments with clear success criteria
3. Apply UDL principles to support diverse learner populations
4. Use formative assessment data to adjust instruction
5. Integrate technology as a purposeful instructional tool

GRADING BREAKDOWN
Weekly Discussions: 20% | Design Artifacts (4): 40% | Curriculum Portfolio: 30% | Peer Review: 10%

COURSE SCHEDULE
Week 1: Backward Design — Starting with Outcomes
Week 2: Standards Alignment and Learning Progressions
Week 3: Authentic Assessment Design
Week 4: Differentiation and UDL Principles
Week 5: Formative Assessment and Data Use
Week 6: Technology Integration in Curriculum
Week 7: Diversity, Equity, and Culturally Responsive Curriculum
Week 8: Portfolio Completion and Peer Review`,
  },
];

const TYPE_COLORS: Record<string, string> = {
  discussion: '#0284c7',
  paper: '#7c3aed',
  quiz: '#d97706',
  reflection: '#059669',
  project: '#dc2626',
};

interface Assignment { title: string; type: string; points: number; due: string; }
interface Module { week: number; title: string; topics: string[]; assignments: Assignment[]; }
interface GradingItem { category: string; weight: number; points: number; }
interface AutoCreated { discussions: number; rubrics: number; assignments: number; quizzes: number; gradebook: boolean; calendarEvents: number; }

interface SyllabusResult {
  courseName: string;
  courseCode: string;
  credits: number;
  term: string;
  totalPoints: number;
  learningObjectives: string[];
  modules: Module[];
  gradingBreakdown: GradingItem[];
  accreditationTags: string[];
  syllabusGaps: string[];
  autoCreated: AutoCreated;
  timeSavedHours: number;
}

function AssignmentBadge({ type }: { type: string }) {
  const color = TYPE_COLORS[type] ?? '#64748b';
  return (
    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase"
      style={{ background: `${color}14`, color, border: `1px solid ${color}25` }}>
      {type}
    </span>
  );
}

function StatCard({ icon, value, label, color }: { icon: React.ReactNode; value: string | number; label: string; color: string }) {
  return (
    <div className="flex flex-col items-center p-4 rounded-xl text-center"
      style={{ background: `${color}08`, border: `1px solid ${color}20` }}>
      <div className="mb-1" style={{ color }}>{icon}</div>
      <p className="text-xl font-black" style={{ color }}>{value}</p>
      <p className="text-xs text-slate-500 mt-0.5">{label}</p>
    </div>
  );
}

export default function SyllabusSyncDemo() {
  const [selected, setSelected] = useState(SAMPLE_SYLLABI[0]);
  const [customText, setCustomText] = useState('');
  const [useCustom, setUseCustom] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SyllabusResult | null>(null);
  const [error, setError] = useState('');
  const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(new Set([1, 2]));

  async function handleSync() {
    setLoading(true); setError(''); setResult(null);
    setExpandedWeeks(new Set([1, 2]));
    try {
      const res = await fetch('/api/demos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'syllabussync',
          syllabusText: useCustom ? customText : selected.text,
          courseType: useCustom ? 'General course' : selected.courseType,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      setResult(await res.json());
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }

  function toggleWeek(w: number) {
    setExpandedWeeks(prev => {
      const next = new Set(prev);
      next.has(w) ? next.delete(w) : next.add(w);
      return next;
    });
  }

  const syllabusText = useCustom ? customText : selected.text;

  return (
    <div className="min-h-screen" style={{ background: '#ffffff', color: '#0f172a' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: '#e2e8f0' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">Home</Link>
            <span className="text-slate-300">/</span>
            <span className="text-sm font-semibold" style={{ color: EMERALD }}>SyllabusSync Demo</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: EMERALD_DIM, border: `1px solid ${EMERALD_BORDER}`, color: EMERALD }}>
            <Zap size={11} />
            SyllabusSync · Course Builder
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Title */}
        <div className="mb-10">
          <h1 className="text-3xl font-black tracking-tight mb-2 text-slate-900">SyllabusSync — Upload a Syllabus. Get a Full Course.</h1>
          <p className="text-slate-500">Drop any syllabus PDF or paste text. AI reads it and auto-builds the entire LMS course — modules, assignments, rubrics, gradebook, calendar — in seconds.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Input */}
          <div className="space-y-5">
            {/* Sample selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">Sample Syllabi</label>
                <button onClick={() => setUseCustom(u => !u)}
                  className="text-xs font-medium px-3 py-1 rounded-full transition-colors"
                  style={{ background: useCustom ? EMERALD_DIM : CARD_INNER, color: useCustom ? EMERALD : '#64748b', border: `1px solid ${useCustom ? EMERALD_BORDER : BORDER}` }}>
                  {useCustom ? '← Use sample' : 'Paste your own'}
                </button>
              </div>
              {!useCustom && (
                <div className="space-y-2">
                  {SAMPLE_SYLLABI.map(s => (
                    <button key={s.id} onClick={() => setSelected(s)}
                      className="w-full p-3 rounded-xl text-left transition-all"
                      style={{
                        background: selected.id === s.id ? EMERALD_DIM : CARD,
                        border: `1px solid ${selected.id === s.id ? EMERALD_BORDER : BORDER}`,
                        boxShadow: selected.id === s.id ? '0 0 0 3px rgba(5,150,105,0.08)' : 'none',
                      }}>
                      <div className="flex items-center gap-2">
                        <FileText size={14} style={{ color: selected.id === s.id ? EMERALD : '#94a3b8' }} />
                        <p className="text-sm font-bold text-slate-800">{s.label}</p>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 ml-5">{s.courseType}</p>
                    </button>
                  ))}
                </div>
              )}
              {useCustom && (
                <textarea
                  value={customText}
                  onChange={e => setCustomText(e.target.value)}
                  placeholder="Paste your syllabus text here..."
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl text-sm resize-none outline-none text-slate-800 placeholder-slate-400"
                  style={{ background: CARD, border: `1px solid ${BORDER}` }}
                />
              )}
            </div>

            {/* Syllabus preview */}
            <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${BORDER}` }}>
              <div className="px-4 py-3 flex items-center gap-2" style={{ background: CARD }}>
                <FileText size={13} className="text-slate-400" />
                <span className="text-xs font-semibold text-slate-600">
                  {useCustom ? 'Your syllabus' : selected.label}
                </span>
                <span className="ml-auto text-xs text-slate-400">{syllabusText.length} chars</span>
              </div>
              <div className="px-4 py-3 max-h-48 overflow-y-auto" style={{ background: CARD_INNER }}>
                <p className="text-xs text-slate-500 leading-relaxed font-mono whitespace-pre-wrap">
                  {syllabusText.slice(0, 800)}{syllabusText.length > 800 ? '…' : ''}
                </p>
              </div>
            </div>

            {/* CTA */}
            <button onClick={handleSync} disabled={loading || !syllabusText.trim()}
              className="w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:-translate-y-px"
              style={{
                background: loading || !syllabusText.trim() ? CARD_INNER : `linear-gradient(135deg, #047857, #059669)`,
                color: loading || !syllabusText.trim() ? '#94a3b8' : '#fff',
                boxShadow: loading || !syllabusText.trim() ? 'none' : '0 4px 14px rgba(5,150,105,0.30)',
              }}>
              {loading ? <RefreshCw size={16} className="animate-spin" /> : <Upload size={16} />}
              {loading ? 'Building your course...' : 'Sync to LMS — Build Course'}
            </button>

            {error && (
              <div className="p-3 rounded-lg text-sm" style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.15)', color: '#b91c1c' }}>
                {error}
              </div>
            )}

            {/* What gets built */}
            {!result && !loading && (
              <div className="p-4 rounded-xl" style={{ background: EMERALD_DIM, border: `1px solid ${EMERALD_BORDER}` }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: EMERALD }}>What SyllabusSync builds automatically</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Course modules & weeks',
                    'Assignment schedules',
                    'Grading rubrics',
                    'Discussion boards',
                    'Gradebook weights',
                    'Accreditation tags',
                  ].map(label => (
                    <div key={label} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle size={12} style={{ color: EMERALD }} />
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Result */}
          <div>
            {!result && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-center py-24"
                style={{ border: `1px dashed ${BORDER}`, borderRadius: '1.25rem' }}>
                <BookOpen size={44} className="mb-4 text-slate-300" />
                <p className="text-slate-500 font-semibold text-lg mb-1">Your course will be built here</p>
                <p className="text-slate-400 text-sm">Select a syllabus and click Sync to LMS</p>
                <div className="mt-6 flex flex-col gap-2 text-left">
                  {['Modules auto-created', 'Assignments scheduled', 'Rubrics generated', 'Gradebook configured'].map(t => (
                    <div key={t} className="flex items-center gap-2 text-sm text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {loading && (
              <div className="h-full flex flex-col items-center justify-center text-center py-24"
                style={{ border: `1px solid ${EMERALD_BORDER}`, borderRadius: '1.25rem', background: EMERALD_DIM }}>
                <RefreshCw size={36} className="animate-spin mb-5" style={{ color: EMERALD }} />
                <p className="font-bold text-slate-700 mb-2">Reading syllabus…</p>
                <div className="space-y-1.5 text-sm text-slate-500">
                  {['Parsing course structure', 'Generating modules', 'Building assignments', 'Creating rubrics', 'Mapping accreditation tags'].map((s, i) => (
                    <p key={i} className="flex items-center gap-2 justify-center">
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: EMERALD }} />
                      {s}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {result && (
              <div className="space-y-4">
                {/* Course header */}
                <div className="p-5 rounded-xl" style={{ background: EMERALD_DIM, border: `1px solid ${EMERALD_BORDER}` }}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: EMERALD }}>Course Built</p>
                      <p className="text-lg font-black text-slate-800">{result.courseName}</p>
                      <p className="text-sm text-slate-500">{result.courseCode} · {result.credits} credits · {result.term}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black" style={{ color: EMERALD }}>{result.timeSavedHours}h</p>
                      <p className="text-xs text-slate-500">saved</p>
                    </div>
                  </div>

                  {/* Auto-created stats */}
                  <div className="grid grid-cols-4 gap-2 mt-4">
                    {[
                      { v: result.autoCreated?.assignments ?? 0, l: 'Assignments' },
                      { v: result.autoCreated?.discussions ?? 0, l: 'Discussions' },
                      { v: result.autoCreated?.rubrics ?? 0, l: 'Rubrics' },
                      { v: result.autoCreated?.calendarEvents ?? 0, l: 'Calendar' },
                    ].map(({ v, l }) => (
                      <div key={l} className="text-center p-2.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.7)' }}>
                        <p className="text-lg font-black text-slate-800">{v}</p>
                        <p className="text-[10px] text-slate-500">{l}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grading breakdown */}
                <div className="p-4 rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Gradebook — Auto-Configured</p>
                  <div className="space-y-2">
                    {result.gradingBreakdown?.map((g, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-sm text-slate-600 w-28 flex-shrink-0">{g.category}</span>
                        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
                          <div className="h-full rounded-full" style={{ width: `${g.weight}%`, background: EMERALD }} />
                        </div>
                        <span className="text-sm font-bold text-slate-700 w-12 text-right">{g.weight}%</span>
                        <span className="text-xs text-slate-400 w-16 text-right">{g.points} pts</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modules */}
                <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${BORDER}` }}>
                  <div className="px-4 py-3" style={{ background: CARD }}>
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Course Modules — {result.modules?.length} weeks</p>
                  </div>
                  <div className="divide-y" style={{ borderColor: DIVIDER }}>
                    {result.modules?.map((mod, i) => (
                      <div key={i}>
                        <button onClick={() => toggleWeek(mod.week)}
                          className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors hover:bg-slate-50">
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                              style={{ background: EMERALD_DIM, color: EMERALD }}>
                              {mod.week}
                            </span>
                            <div>
                              <p className="text-sm font-semibold text-slate-800">{mod.title}</p>
                              <p className="text-xs text-slate-500">{mod.assignments?.length ?? 0} assignments</p>
                            </div>
                          </div>
                          {expandedWeeks.has(mod.week)
                            ? <ChevronUp size={16} className="text-slate-400" />
                            : <ChevronDown size={16} className="text-slate-400" />}
                        </button>
                        {expandedWeeks.has(mod.week) && (
                          <div className="px-4 pb-3 space-y-2" style={{ background: CARD_INNER }}>
                            <div className="flex flex-wrap gap-1.5 mb-2">
                              {mod.topics?.map((t, j) => (
                                <span key={j} className="text-xs px-2 py-0.5 rounded-full text-slate-600"
                                  style={{ background: '#e2e8f0' }}>{t}</span>
                              ))}
                            </div>
                            {mod.assignments?.map((a, j) => (
                              <div key={j} className="flex items-center gap-2 py-1.5 px-3 rounded-lg"
                                style={{ background: '#fff', border: `1px solid ${BORDER}` }}>
                                <AssignmentBadge type={a.type} />
                                <span className="flex-1 text-xs text-slate-700">{a.title}</span>
                                <span className="text-xs text-slate-400">{a.due}</span>
                                <span className="text-xs font-bold text-slate-500">{a.points}pts</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Accreditation tags + gaps */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl" style={{ background: EMERALD_DIM, border: `1px solid ${EMERALD_BORDER}` }}>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: EMERALD }}>Accreditation Tags</p>
                    <div className="flex flex-wrap gap-1.5">
                      {result.accreditationTags?.map((t, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{ background: 'rgba(255,255,255,0.7)', color: EMERALD, border: `1px solid ${EMERALD_BORDER}` }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: 'rgba(217,119,6,0.06)', border: '1px solid rgba(217,119,6,0.15)' }}>
                    <p className="text-xs font-semibold text-amber-700 uppercase tracking-widest mb-2">Syllabus Gaps Found</p>
                    <ul className="space-y-1">
                      {result.syllabusGaps?.map((g, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-slate-600">
                          <AlertTriangle size={10} className="text-amber-600 mt-0.5 flex-shrink-0" />
                          {g}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button onClick={() => setResult(null)}
                  className="w-full py-2.5 rounded-xl text-sm font-medium transition-colors"
                  style={{ background: CARD_INNER, color: '#64748b', border: `1px solid ${BORDER}` }}>
                  Sync another syllabus
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t flex justify-between items-center" style={{ borderColor: '#e2e8f0' }}>
          <Link to="/proof-ai/demo" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">← ProofAI Demo</Link>
          <Link to="/clinical-ai/demo" className="text-sm font-semibold flex items-center gap-1" style={{ color: '#1e3a8a' }}>
            Try ClinicalAI Demo →
          </Link>
        </div>
      </div>
    </div>
  );
}
