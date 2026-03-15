import { useState } from 'react';
import {
  TrendingUp, Users, DollarSign, ShieldCheck, ChevronRight,
  CheckCircle2, GraduationCap, Brain, UserCheck, Minus, Plus,
  ArrowRight, Building2, BookOpen, Award
} from 'lucide-react';

// ── Data ─────────────────────────────────────────────────────────────────────

const GROWTH_SCENARIOS = [
  {
    year: 2025,
    enrollment: 105_000,
    headcountTraditional: 7_200,
    headcountWithAI: 7_200,
    scholarshipFundTraditional: 48_000_000,
    scholarshipFundWithAI: 48_000_000,
    note: 'Baseline — AI pilot begins',
  },
  {
    year: 2026,
    enrollment: 112_000,
    headcountTraditional: 7_680,
    headcountWithAI: 7_280,
    scholarshipFundTraditional: 51_200_000,
    scholarshipFundWithAI: 57_400_000,
    note: 'Forge agents absorb 7,000 student growth',
  },
  {
    year: 2027,
    enrollment: 122_000,
    headcountTraditional: 8_360,
    headcountWithAI: 7_380,
    scholarshipFundTraditional: 55_700_000,
    scholarshipFundWithAI: 71_200_000,
    note: 'Natural attrition + AI scale; no layoffs',
  },
  {
    year: 2028,
    enrollment: 135_000,
    headcountTraditional: 9_240,
    headcountWithAI: 7_500,
    scholarshipFundTraditional: 61_400_000,
    scholarshipFundWithAI: 92_000_000,
    note: 'Scholarship fund doubles vs. traditional model',
  },
  {
    year: 2029,
    enrollment: 150_000,
    headcountTraditional: 10_260,
    headcountWithAI: 7_650,
    scholarshipFundTraditional: 68_200_000,
    scholarshipFundWithAI: 118_000_000,
    note: '150K students. $118M in scholarships. 3,060 fewer hires.',
  },
];

const ROLE_EVOLUTION = [
  {
    role: 'Academic Advisor',
    current: '1 advisor per 400 students',
    withAI: '1 advisor per 1,200 students',
    aiHandles: ['Routine check-ins', 'Degree audit pulls', 'Course registration FAQ', 'Transcript requests'],
    humanHandles: ['Career pivots', 'Academic dismissal', 'Disability accommodations', 'Complex petitions'],
    hlcNote: 'HLC expects human judgment on academic standing decisions. AI surfaces the data; human decides.',
    headcountImpact: '−67% new hires needed per 1,000 student growth',
  },
  {
    role: 'Discussion Facilitator / Adjunct',
    current: '1 instructor per 25 students (online discussion)',
    withAI: '1 instructor per 120 students',
    aiHandles: ['First-response to discussion posts', 'Socratic follow-up questions', 'Resource suggestions', 'Late-week reminders'],
    humanHandles: ['Grading final posts', 'Office hours', 'Student appeals', 'Syllabus and learning outcomes'],
    hlcNote: 'Faculty member remains instructor of record. AI is a teaching assistant — never the instructor of record.',
    headcountImpact: '−79% adjunct hiring need per 1,000 online students',
  },
  {
    role: 'Admissions Counselor',
    current: '1 counselor per 800 annual inquiries',
    withAI: '1 counselor per 3,200 annual inquiries',
    aiHandles: ['24/7 inquiry response', 'Application status updates', 'Financial aid FAQ', 'Campus event info'],
    humanHandles: ['Final enrollment conversations', 'Scholarship negotiation', 'At-risk applicant outreach', 'Transfer evaluations'],
    hlcNote: 'No HLC restrictions on admissions AI. Human oversight of final enrollment decisions recommended.',
    headcountImpact: '−75% counselor hiring need per 1,000 new inquiries',
  },
  {
    role: 'Student Success Coach',
    current: '1 coach per 300 at-risk students',
    withAI: '1 coach per 900 at-risk students',
    aiHandles: ['Daily engagement scoring', 'Early warning flag generation', 'Automated check-in messages', 'Resource routing'],
    humanHandles: ['Crisis intervention', 'Financial hold resolution', 'Leave of absence', 'Mentorship relationships'],
    hlcNote: 'Human coach must act on all Early Warning flags. AI identifies; human responds.',
    headcountImpact: '−67% new coach hires needed as enrollment grows',
  },
  {
    role: 'Grader / Teaching Assistant',
    current: '1 TA per 40 students (weekly grading)',
    withAI: 'Faculty handles final grades; AI drafts all rubric feedback',
    aiHandles: ['First-draft rubric scoring', 'Plagiarism signal detection', 'Feedback generation', 'Grade entry prep'],
    humanHandles: ['Final grade approval', 'Academic integrity decisions', 'Grade appeals', 'Subjective assessment'],
    hlcNote: 'Faculty must approve all final grades. AI drafts; faculty signs. This is standard TA practice — AI is a better TA.',
    headcountImpact: '−85% TA hiring need; faculty time redirected to high-value mentorship',
  },
];

const HLC_CRITERIA = [
  {
    criterion: 'Criterion 4A — Evaluation of Student Learning',
    requirement: 'The institution demonstrates that its processes for evaluating student learning are organized, systematic, and sustained.',
    compliance: 'AgenticGrader provides structured, rubric-based feedback on every submission. Faculty approve all grades. The AI audit trail creates more documentation of consistent evaluation than the traditional TA model.',
    status: 'compliant',
  },
  {
    criterion: 'Criterion 4B — Qualified Instruction',
    requirement: 'All instructors are appropriately credentialed for the courses they teach.',
    compliance: 'AI is never the instructor of record. Every section has a credentialed human instructor. AI functions as a teaching assistant — a role with no credential requirement. GCU already uses thousands of TAs and peer tutors.',
    status: 'compliant',
  },
  {
    criterion: 'Criterion 5A — Resource Sufficiency',
    requirement: 'The institution has the human and financial resources it needs to accomplish its mission.',
    compliance: 'The AI model increases per-student resources by redirecting saved labor costs to scholarships and student support. The governance QA board demonstrates sustained investment in quality assurance.',
    status: 'compliant',
  },
  {
    criterion: 'Credit Hour Definition (34 CFR 600.2)',
    requirement: 'One credit hour = one hour of classroom instruction + two hours outside work per week. Online: equivalent amount of work.',
    compliance: 'Course design, learning outcomes, and instructional load remain defined by faculty. AI does not replace instructional hours — it handles administrative overhead, freeing faculty for more instructional contact.',
    status: 'compliant',
  },
  {
    criterion: 'FERPA (20 U.S.C. § 1232g)',
    requirement: 'Educational records may not be shared with unauthorized parties.',
    compliance: 'AI agents operate within student-specific session contexts. The FERPA QA audit flag (demonstrated in Governance Board) catches any cross-student data leakage automatically.',
    status: 'requires-attention',
  },
  {
    criterion: 'ADA / Section 504 Accessibility',
    requirement: 'All educational programs and services must be accessible to students with disabilities.',
    compliance: 'AI interfaces must meet WCAG 2.1 AA standards. Agent responses must work with screen readers. Disability Services staff remain human — AI may not make accommodation decisions.',
    status: 'requires-attention',
  },
];

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(0)}M`;
  return `$${(n / 1_000).toFixed(0)}K`;
}

function fmtNum(n: number) {
  return n.toLocaleString();
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function ScalingModel() {
  const [activeRole, setActiveRole] = useState(0);
  const [selectedYear, setSelectedYear] = useState(4); // index into GROWTH_SCENARIOS

  const scenario = GROWTH_SCENARIOS[selectedYear];
  const headcountSaved = scenario.headcountTraditional - scenario.headcountWithAI;
  const scholarshipDelta = scenario.scholarshipFundWithAI - scenario.scholarshipFundTraditional;

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">

      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gcu-gold/15 border border-gcu-gold/30 text-gcu-gold text-xs font-semibold uppercase tracking-wider mb-3">
          <TrendingUp size={12} /> Scale Without Headcount
        </div>
        <h1 className="text-white text-2xl font-bold mb-2">The Growth Arbitrage Model</h1>
        <p className="text-white/60 text-base max-w-3xl leading-relaxed">
          This is not about replacing employees. It is about growing enrollment from 105,000 to 150,000 students
          without proportionally growing headcount — and redirecting the difference into student scholarships.
          Natural attrition handles the transition. Nobody gets fired. The mission expands.
        </p>
      </div>

      {/* The core thesis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-3 bg-gcu-purple/20 border border-gcu-purple/40 rounded-xl p-5">
          <div className="flex flex-wrap gap-8 items-center justify-center text-center">
            <div>
              <p className="text-white/50 text-sm mb-1">Traditional model to serve 150K students</p>
              <p className="text-3xl font-black text-red-400">10,260 <span className="text-lg font-normal">staff</span></p>
              <p className="text-white/40 text-xs mt-1">+3,060 new hires over 4 years</p>
            </div>
            <ArrowRight size={28} className="text-white/20 hidden md:block" />
            <div>
              <p className="text-white/50 text-sm mb-1">AI-assisted model to serve 150K students</p>
              <p className="text-3xl font-black text-emerald-400">7,650 <span className="text-lg font-normal">staff</span></p>
              <p className="text-white/40 text-xs mt-1">Natural attrition fills the gap. Zero layoffs.</p>
            </div>
            <ArrowRight size={28} className="text-white/20 hidden md:block" />
            <div>
              <p className="text-white/50 text-sm mb-1">Redirected to student scholarships</p>
              <p className="text-3xl font-black text-gcu-gold">$118M <span className="text-lg font-normal">fund</span></p>
              <p className="text-white/40 text-xs mt-1">vs. $68M in the traditional model</p>
            </div>
          </div>
        </div>
      </div>

      {/* Year-by-year slider */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-5">
        <h2 className="text-white font-semibold">Growth Projection — Move the Year</h2>

        <div className="flex gap-2">
          {GROWTH_SCENARIOS.map((s, i) => (
            <button
              key={s.year}
              onClick={() => setSelectedYear(i)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedYear === i
                  ? 'bg-gcu-purple text-white'
                  : 'bg-white/5 text-white/40 hover:text-white hover:bg-white/10'
              }`}
            >
              {s.year}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-1">Enrollment</p>
            <p className="text-white text-2xl font-bold">{fmtNum(scenario.enrollment)}</p>
            <p className="text-white/30 text-xs mt-0.5">students</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-1">Headcount w/ AI</p>
            <p className="text-emerald-400 text-2xl font-bold">{fmtNum(scenario.headcountWithAI)}</p>
            <p className="text-white/30 text-xs mt-0.5">vs. {fmtNum(scenario.headcountTraditional)} traditional</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-1">Hires Avoided</p>
            <p className="text-gcu-gold text-2xl font-bold">{fmtNum(headcountSaved)}</p>
            <p className="text-white/30 text-xs mt-0.5">positions not created</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-1">Scholarship Fund</p>
            <p className="text-gcu-gold text-2xl font-bold">{fmt(scenario.scholarshipFundWithAI)}</p>
            <p className="text-white/30 text-xs mt-0.5">+{fmt(scholarshipDelta)} vs traditional</p>
          </div>
        </div>

        {/* Visual bar comparison */}
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs text-white/50 mb-1.5">
              <span>Traditional headcount</span>
              <span>{fmtNum(scenario.headcountTraditional)} staff</span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-red-400/60 rounded-full" style={{ width: `${(scenario.headcountTraditional / 10_260) * 100}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-white/50 mb-1.5">
              <span>AI-assisted headcount</span>
              <span>{fmtNum(scenario.headcountWithAI)} staff</span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${(scenario.headcountWithAI / 10_260) * 100}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-white/50 mb-1.5">
              <span>Scholarship fund (AI model)</span>
              <span>{fmt(scenario.scholarshipFundWithAI)}</span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gcu-gold rounded-full" style={{ width: `${(scenario.scholarshipFundWithAI / 118_000_000) * 100}%` }} />
            </div>
          </div>
        </div>

        <p className="text-white/40 text-sm italic border-l-2 border-gcu-gold/40 pl-3">{scenario.note}</p>
      </div>

      {/* How it actually happens */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
        <h2 className="text-white font-semibold">How the Transition Happens — No Layoffs Required</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: <Minus size={18} className="text-amber-400" />,
              label: 'Natural Attrition',
              desc: 'GCU has ~8–10% annual staff turnover like any large organization. Over 4 years, that is roughly 2,000–3,000 positions that simply are not backfilled. AI absorbs the workload of those open seats.',
            },
            {
              icon: <Plus size={18} className="text-emerald-400" />,
              label: 'Role Elevation',
              desc: 'Existing advisors, coaches, and adjuncts handle more students at higher quality. Their jobs become more strategic, not more repetitive. Job satisfaction research consistently shows this is a retention driver.',
            },
            {
              icon: <ArrowRight size={18} className="text-gcu-gold" />,
              label: 'Growth Absorption',
              desc: 'Every 1,000 new students traditionally requires ~70 new hires. With AI, that number drops to ~12. GCU can enroll 45,000 more students over 4 years and hire only 450 net new staff instead of 3,060.',
            },
          ].map((item) => (
            <div key={item.label} className="bg-white/5 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2">
                {item.icon}
                <span className="text-white font-medium">{item.label}</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Role Evolution Map */}
      <div className="space-y-4">
        <h2 className="text-white font-semibold">Role Evolution Map — What Changes, What Stays Human</h2>

        <div className="flex gap-2 flex-wrap">
          {ROLE_EVOLUTION.map((r, i) => (
            <button
              key={r.role}
              onClick={() => setActiveRole(i)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                activeRole === i
                  ? 'bg-gcu-purple text-white font-medium'
                  : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10'
              }`}
            >
              {r.role}
            </button>
          ))}
        </div>

        {ROLE_EVOLUTION[activeRole] && (() => {
          const r = ROLE_EVOLUTION[activeRole];
          return (
            <div className="border border-white/10 rounded-xl overflow-hidden">
              <div className="px-5 py-4 bg-white/5 border-b border-white/8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-white font-semibold">{r.role}</h3>
                    <div className="flex items-center gap-3 mt-1 text-sm">
                      <span className="text-white/40 line-through">{r.current}</span>
                      <ChevronRight size={14} className="text-white/20" />
                      <span className="text-emerald-400 font-medium">{r.withAI}</span>
                    </div>
                  </div>
                  <div className="px-3 py-1.5 rounded-full bg-gcu-gold/15 border border-gcu-gold/30 text-gcu-gold text-sm font-medium">
                    {r.headcountImpact}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/8">
                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <Brain size={14} className="text-gcu-purple-light" />
                    <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">AI Handles</span>
                  </div>
                  {r.aiHandles.map((task) => (
                    <div key={task} className="flex items-start gap-2">
                      <CheckCircle2 size={13} className="text-gcu-purple-light mt-0.5 flex-shrink-0" />
                      <span className="text-white/70 text-sm">{task}</span>
                    </div>
                  ))}
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <UserCheck size={14} className="text-gcu-gold" />
                    <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Human Handles</span>
                  </div>
                  {r.humanHandles.map((task) => (
                    <div key={task} className="flex items-start gap-2">
                      <CheckCircle2 size={13} className="text-gcu-gold mt-0.5 flex-shrink-0" />
                      <span className="text-white/70 text-sm">{task}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-5 py-4 bg-gcu-purple/10 border-t border-gcu-purple/20 flex items-start gap-3">
                <ShieldCheck size={15} className="text-gcu-gold flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-gcu-gold text-xs font-semibold uppercase tracking-wider">HLC Compliance Note · </span>
                  <span className="text-white/60 text-sm">{r.hlcNote}</span>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* HLC Compliance Checklist */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Award size={20} className="text-gcu-gold" />
          <h2 className="text-white font-semibold">HLC Accreditation Compliance Framework</h2>
        </div>

        <div className="space-y-3">
          {HLC_CRITERIA.map((c) => (
            <div
              key={c.criterion}
              className={`border rounded-xl p-5 space-y-2 ${
                c.status === 'compliant'
                  ? 'border-emerald-700/40 bg-emerald-950/10'
                  : 'border-amber-700/40 bg-amber-950/10'
              }`}
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-start gap-3">
                  {c.status === 'compliant'
                    ? <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    : <ShieldCheck size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
                  }
                  <div>
                    <p className="text-white font-medium text-sm">{c.criterion}</p>
                    <p className="text-white/50 text-xs mt-0.5 italic">{c.requirement}</p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border flex-shrink-0 ${
                  c.status === 'compliant'
                    ? 'bg-emerald-900/30 border-emerald-700/40 text-emerald-400'
                    : 'bg-amber-900/30 border-amber-700/40 text-amber-400'
                }`}>
                  {c.status === 'compliant' ? 'COMPLIANT' : 'NEEDS ATTENTION'}
                </span>
              </div>
              <p className="text-white/65 text-sm leading-relaxed pl-7">{c.compliance}</p>
            </div>
          ))}
        </div>
      </div>

      {/* The real economic model */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
        <h2 className="text-white font-semibold">The Real Economic Argument — For Brian Mueller</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-3">
            <p className="text-gcu-gold font-medium text-sm uppercase tracking-wider">What this is</p>
            {[
              'Absorbing 45,000 student growth with 450 net new staff instead of 3,060',
              'Redirecting ~$50M in avoided labor costs to scholarships over 4 years',
              'Elevating every advisor, coach, and instructor to more meaningful work',
              'Building a defensible, HLC-compliant operating model at scale',
              'Achieving Brian Mueller\'s mission of radical affordability through operational discipline',
            ].map((s) => (
              <div key={s} className="flex items-start gap-2">
                <CheckCircle2 size={13} className="text-emerald-400 flex-shrink-0 mt-1" />
                <span className="text-white/70 text-sm">{s}</span>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <p className="text-red-400 font-medium text-sm uppercase tracking-wider">What this is not</p>
            {[
              'Mass layoffs or forced reductions in force',
              'AI replacing credentialed faculty as instructors of record',
              'Removing human judgment from high-stakes student decisions',
              'A compliance shortcut — every HLC criterion is preserved',
              'A short-term cost play — this is a 4-year structural transformation',
            ].map((s) => (
              <div key={s} className="flex items-start gap-2">
                <div className="w-3 h-3 rounded-full border border-red-400/50 flex-shrink-0 mt-1" />
                <span className="text-white/50 text-sm">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footnote */}
      <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-white/3 border border-white/8 text-white/40 text-xs leading-relaxed">
        <BookOpen size={13} className="flex-shrink-0 mt-0.5" />
        <p>
          Headcount and scholarship projections are illustrative and based on GCU's publicly reported enrollment data and
          industry averages for higher ed staff-to-student ratios. Actual savings will depend on implementation scope,
          attrition rates, and collective bargaining agreements. FERPA and ADA compliance items require legal review
          before production deployment. HLC Criterion citations reference the 2020 Criteria for Accreditation.
        </p>
      </div>
    </div>
  );
}
