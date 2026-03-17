import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, RefreshCw, Copy, Check, Shield, BookOpen, Star } from 'lucide-react';

const VIOLET = '#7C3AED';
const VIOLET_DIM = 'rgba(124,58,237,0.10)';
const VIOLET_BORDER = 'rgba(124,58,237,0.25)';
const VIOLET_GLOW = '0 0 40px rgba(124,58,237,0.18)';

const PROGRAMS = [
  {
    id: 'nursing',
    label: 'BSN — Nursing Leadership',
    competencies: [
      'Clinical Decision-Making Under Uncertainty',
      'Patient Advocacy & Ethical Reasoning',
      'Interdisciplinary Team Communication',
      'Evidence-Based Practice Integration',
    ],
    sample: `In my final clinical rotation at Banner Desert Medical Center, I managed a 6-patient load independently for the first time. One patient presented with conflicting symptoms — elevated troponin but no typical chest pain narrative. Rather than defer to the attending's initial dismissal, I documented my concern, flagged it in the chart, and requested a cardiology consult. The patient was ultimately diagnosed with a NSTEMI. I also led our team huddle that week, coordinating handoff communication between night and day shift nursing staff using SBAR protocol, which reduced medication discrepancy errors by two instances in our unit.`,
  },
  {
    id: 'business',
    label: 'MBA — Business Ethics',
    competencies: [
      'Ethical Leadership & Moral Reasoning',
      'Stakeholder Analysis & Decision Frameworks',
      'Faith-Integrated Business Practice',
      'Crisis Communication & Transparency',
    ],
    sample: `In the Enron case analysis I submitted, I examined the ethical failures through both a secular and Christian stewardship lens. I argued that the core failure was not complexity or ignorance, but deliberate opacity — a violation of the fiduciary duty that constitutes a form of theft from shareholders. I proposed a stakeholder accountability model drawing on both Freeman's stakeholder theory and Proverbs 11:1 ("dishonest scales are an abomination"). My recommendation framework would require executives to submit to an independent ethics board with binding authority, not advisory-only.`,
  },
  {
    id: 'education',
    label: 'MEd — Instructional Design',
    competencies: [
      'Learning Theory Application',
      'Technology-Enhanced Assessment Design',
      'Differentiated Instruction for Diverse Learners',
      'Data-Driven Curriculum Iteration',
    ],
    sample: `For my capstone, I redesigned a 7th-grade science unit on ecosystems using UDL principles. I replaced the single end-of-unit test with a portfolio-based assessment that allowed students to demonstrate mastery through video explanation, written analysis, or a physical model. Post-implementation data showed a 23% increase in mastery attainment among students with IEPs. I used the evidence from formative checkpoints to adjust pacing mid-unit, slowing the food web module by two days when class-wide quiz scores flagged a conceptual gap in trophic levels.`,
  },
];

const MASTERY_COLORS: Record<string, string> = {
  mastered: '#22c55e',
  proficient: '#38bdf8',
  developing: '#f59e0b',
  emerging: '#ef4444',
};

interface CompetencyResult {
  competency: string;
  masteryLevel: string;
  score: number;
  evidence: string;
  feedback: string;
  verified: boolean;
}

interface ProofResult {
  verificationId: string;
  studentName: string;
  program: string;
  verifiedAt: string;
  overallMasteryLevel: string;
  competencyResults: CompetencyResult[];
  credentialRecommendation: string;
  narrativeSummary: string;
  nextMilestone: string;
  employerStatement: string;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium"
      style={{ background: VIOLET_DIM, color: copied ? '#22c55e' : '#94a3b8', border: `1px solid ${VIOLET_BORDER}` }}>
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

function MasteryBadge({ level }: { level: string }) {
  const c = MASTERY_COLORS[level] ?? '#64748b';
  return (
    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold capitalize"
      style={{ background: `${c}20`, color: c, border: `1px solid ${c}44` }}>{level}</span>
  );
}

function ScoreBar({ score, color }: { score: number; color: string }) {
  return (
    <div className="h-2 rounded-full overflow-hidden mt-2" style={{ background: 'rgba(255,255,255,0.07)' }}>
      <div className="h-full rounded-full transition-all duration-700"
        style={{ width: `${score}%`, background: `linear-gradient(90deg, ${color}80, ${color})` }} />
    </div>
  );
}

export default function ProofAIDemo() {
  const [selectedProgram, setSelectedProgram] = useState(PROGRAMS[0]);
  const [studentName, setStudentName] = useState('Jordan A.');
  const [submission, setSubmission] = useState(PROGRAMS[0].sample);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProofResult | null>(null);
  const [error, setError] = useState('');

  async function handleVerify() {
    if (!submission.trim()) return;
    setLoading(true); setError(''); setResult(null);
    try {
      const res = await fetch('/api/proof-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName,
          program: selectedProgram.label,
          submission,
          competencies: selectedProgram.competencies,
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

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0f', color: '#f1f5f9' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/proof-ai" className="text-sm text-slate-500 hover:text-slate-300">ProofAI</Link>
            <span className="text-slate-700">/</span>
            <span className="text-sm font-semibold" style={{ color: '#a78bfa' }}>Competency Verification</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: VIOLET_DIM, border: `1px solid ${VIOLET_BORDER}`, color: '#a78bfa' }}>
            <Shield size={11} />
            ProofAI · Verification Engine
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-black tracking-tight mb-2">ProofAI — Competency Verification</h1>
          <p className="text-slate-400">Submit student work. ProofAI verifies mastery against program competencies and issues a credential-ready assessment.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Input */}
          <div className="space-y-5">
            {/* Program selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Program</label>
              <div className="space-y-2">
                {PROGRAMS.map(p => (
                  <button key={p.id} onClick={() => { setSelectedProgram(p); setSubmission(p.sample); setResult(null); }}
                    className="w-full p-3 rounded-xl text-left transition-all"
                    style={{
                      background: selectedProgram.id === p.id ? VIOLET_DIM : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${selectedProgram.id === p.id ? VIOLET_BORDER : 'rgba(255,255,255,0.07)'}`,
                      boxShadow: selectedProgram.id === p.id ? VIOLET_GLOW : 'none',
                    }}>
                    <p className="text-sm font-bold text-slate-200">{p.label}</p>
                    <p className="text-xs text-slate-500 mt-1">{p.competencies.length} competencies</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Competencies */}
            <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Competencies to Verify</p>
              <ul className="space-y-1.5">
                {selectedProgram.competencies.map((c, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-400">
                    <BookOpen size={12} className="text-slate-600 flex-shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {/* Student name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Student Name</label>
              <input value={studentName} onChange={e => setStudentName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#f1f5f9' }} />
            </div>

            {/* Submission */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Student Submission</label>
              <textarea value={submission} onChange={e => setSubmission(e.target.value)}
                rows={8}
                className="w-full px-4 py-3 rounded-xl text-sm resize-none outline-none"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#f1f5f9' }} />
            </div>

            <button onClick={handleVerify} disabled={loading || !submission.trim()}
              className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
              style={{
                background: loading || !submission.trim() ? 'rgba(255,255,255,0.05)' : `linear-gradient(135deg, #5b21b6, #7c3aed)`,
                color: loading || !submission.trim() ? '#475569' : '#fff',
                boxShadow: loading || !submission.trim() ? 'none' : VIOLET_GLOW,
              }}>
              {loading ? <RefreshCw size={16} className="animate-spin" /> : <Award size={16} />}
              {loading ? 'Verifying competencies...' : 'Verify & Issue Credential Assessment'}
            </button>

            {error && (
              <div className="p-3 rounded-lg text-sm" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5' }}>
                {error}
              </div>
            )}
          </div>

          {/* Right: Result */}
          <div>
            {!result && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-center py-24"
                style={{ border: '1px dashed rgba(255,255,255,0.07)', borderRadius: '1.25rem' }}>
                <Award size={40} className="mb-4 text-slate-700" />
                <p className="text-slate-500 font-medium">Credential assessment will appear here</p>
                <p className="text-slate-600 text-sm mt-1">Submit student work to verify competencies</p>
              </div>
            )}

            {loading && (
              <div className="h-full flex flex-col items-center justify-center text-center py-24"
                style={{ border: '1px solid rgba(124,58,237,0.2)', borderRadius: '1.25rem', background: VIOLET_DIM }}>
                <RefreshCw size={32} className="animate-spin mb-4" style={{ color: '#a78bfa' }} />
                <p className="font-medium text-slate-300">Verifying competency evidence...</p>
              </div>
            )}

            {result && (
              <div className="space-y-4">
                {/* Credential header */}
                <div className="p-5 rounded-xl" style={{ background: VIOLET_DIM, border: `1px solid ${VIOLET_BORDER}`, boxShadow: VIOLET_GLOW }}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-1">Verification ID</p>
                      <p className="text-xs font-mono text-slate-400">{result.verificationId}</p>
                    </div>
                    <MasteryBadge level={result.overallMasteryLevel} />
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{result.narrativeSummary}</p>
                </div>

                {/* Credential recommendation */}
                <div className="p-4 rounded-xl flex items-start gap-3"
                  style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
                  <Award size={18} className="text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-green-400 uppercase tracking-widest mb-1">Credential Recommendation</p>
                    <p className="text-sm text-slate-300">{result.credentialRecommendation}</p>
                  </div>
                </div>

                {/* Competency results */}
                <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Competency Results</p>
                  <div className="space-y-4">
                    {result.competencyResults?.map((c, i) => {
                      const color = MASTERY_COLORS[c.masteryLevel] ?? '#64748b';
                      return (
                        <div key={i} className="border-b last:border-b-0 pb-4 last:pb-0" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-semibold text-slate-300 flex-1 mr-2">{c.competency}</p>
                            <MasteryBadge level={c.masteryLevel} />
                          </div>
                          <ScoreBar score={c.score} color={color} />
                          <p className="text-xs text-slate-500 mt-2 italic">"{c.evidence}"</p>
                          <p className="text-xs text-slate-400 mt-1">↳ {c.feedback}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Employer statement */}
                <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Employer Statement</p>
                    <CopyButton text={result.employerStatement} />
                  </div>
                  <p className="text-sm text-slate-300 italic">"{result.employerStatement}"</p>
                </div>

                {/* Next milestone */}
                <div className="p-4 rounded-xl" style={{ background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.15)' }}>
                  <p className="text-xs font-semibold text-yellow-400 uppercase tracking-widest mb-1">Next Milestone</p>
                  <p className="text-sm text-slate-300">{result.nextMilestone}</p>
                </div>

                <button onClick={() => setResult(null)} className="w-full py-2.5 rounded-xl text-sm font-medium transition-colors"
                  style={{ background: 'rgba(255,255,255,0.04)', color: '#64748b', border: '1px solid rgba(255,255,255,0.07)' }}>
                  Verify another submission
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex justify-between items-center">
          <Link to="/outcomes-ai/demo" className="text-sm text-slate-500 hover:text-slate-300">← OutcomesAI Demo</Link>
          <Link to="/gcu/university-os/command-center" className="text-sm font-semibold flex items-center gap-1" style={{ color: '#38bdf8' }}>
            See Command Center →
          </Link>
        </div>
      </div>
    </div>
  );
}
