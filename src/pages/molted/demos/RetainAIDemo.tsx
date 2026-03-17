import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, TrendingDown, RefreshCw, Copy, Check, User, Send, ChevronDown, ChevronUp, Shield } from 'lucide-react';

const ROSE = '#F43F5E';
const ROSE_DIM = 'rgba(244,63,94,0.10)';
const ROSE_BORDER = 'rgba(244,63,94,0.25)';
const ROSE_GLOW = '0 0 40px rgba(244,63,94,0.15)';

const SAMPLE_STUDENTS = [
  {
    name: 'Marcus J.',
    gpa: 1.9,
    missedAssignments: 6,
    loginDaysLast14: 2,
    financialHold: true,
    lastLoginDaysAgo: 7,
    major: 'Business Administration',
    advisorName: 'Dr. Sarah Chen',
  },
  {
    name: 'Alicia M.',
    gpa: 2.4,
    missedAssignments: 3,
    loginDaysLast14: 5,
    financialHold: false,
    lastLoginDaysAgo: 3,
    major: 'Nursing (BSN)',
    advisorName: 'Prof. James Holloway',
  },
  {
    name: 'Devon T.',
    gpa: 3.1,
    missedAssignments: 1,
    loginDaysLast14: 11,
    financialHold: false,
    lastLoginDaysAgo: 1,
    major: 'Psychology',
    advisorName: 'Dr. Maria Santos',
  },
];

interface RiskFactor { factor: string; weight: string; detail: string; }
interface InterventionAction { action: string; owner: string; urgency: string; template: string; }
interface RetainResult {
  riskScore: number;
  riskLevel: string;
  riskFactors: RiskFactor[];
  predictedOutcome: string;
  interventionPlan: InterventionAction[];
  emailDraft: string;
  retentionProbability: { withoutIntervention: number; withIntervention: number; };
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors"
      style={{ background: ROSE_DIM, color: copied ? '#22c55e' : '#94a3b8', border: `1px solid ${ROSE_BORDER}` }}>
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

function RiskMeter({ score }: { score: number }) {
  const color = score >= 75 ? '#ef4444' : score >= 50 ? '#f59e0b' : '#22c55e';
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Risk Score</span>
        <span className="text-2xl font-black" style={{ color }}>{score}</span>
      </div>
      <div className="h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
        <div className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${score}%`, background: `linear-gradient(90deg, ${color}88, ${color})` }} />
      </div>
    </div>
  );
}

function WeightBadge({ weight }: { weight: string }) {
  const color = weight === 'high' ? '#ef4444' : weight === 'medium' ? '#f59e0b' : '#64748b';
  return (
    <span className="px-2 py-0.5 rounded-full text-xs font-semibold capitalize"
      style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}>{weight}</span>
  );
}

function StudentCard({ student, selected, onClick }: { student: typeof SAMPLE_STUDENTS[0]; selected: boolean; onClick: () => void }) {
  const riskColor = student.missedAssignments >= 5 ? '#ef4444' : student.missedAssignments >= 3 ? '#f59e0b' : '#22c55e';
  return (
    <button onClick={onClick}
      className="w-full p-4 rounded-xl text-left transition-all"
      style={{
        background: selected ? ROSE_DIM : 'rgba(255,255,255,0.03)',
        border: `1px solid ${selected ? ROSE_BORDER : 'rgba(255,255,255,0.07)'}`,
        boxShadow: selected ? ROSE_GLOW : 'none',
      }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: `${riskColor}22`, color: riskColor }}>
            {student.name[0]}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-200">{student.name}</p>
            <p className="text-xs text-slate-500">{student.major}</p>
          </div>
        </div>
        <span className="text-xs font-bold" style={{ color: riskColor }}>
          {student.missedAssignments >= 5 ? 'HIGH RISK' : student.missedAssignments >= 3 ? 'AT RISK' : 'WATCH'}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="px-2 py-1.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <p className="text-xs font-bold" style={{ color: student.gpa < 2 ? '#ef4444' : '#94a3b8' }}>{student.gpa}</p>
          <p className="text-xs text-slate-600">GPA</p>
        </div>
        <div className="px-2 py-1.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <p className="text-xs font-bold" style={{ color: student.missedAssignments > 4 ? '#ef4444' : '#f59e0b' }}>{student.missedAssignments}</p>
          <p className="text-xs text-slate-600">Missed</p>
        </div>
        <div className="px-2 py-1.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <p className="text-xs font-bold" style={{ color: student.loginDaysLast14 < 4 ? '#ef4444' : '#94a3b8' }}>{student.loginDaysLast14}</p>
          <p className="text-xs text-slate-600">Logins/14d</p>
        </div>
      </div>
    </button>
  );
}

export default function RetainAIDemo() {
  const [selectedStudent, setSelectedStudent] = useState(SAMPLE_STUDENTS[0]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RetainResult | null>(null);
  const [error, setError] = useState('');
  const [emailOpen, setEmailOpen] = useState(false);

  async function handleAnalyze() {
    setLoading(true); setError(''); setResult(null); setEmailOpen(false);
    try {
      const res = await fetch('/api/demos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'retain-ai', student: selectedStudent }),
      });
      if (!res.ok) throw new Error(await res.text());
      setResult(await res.json());
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }

  const urgencyColor: Record<string, string> = { today: '#ef4444', 'this week': '#f59e0b', 'this month': '#64748b' };
  const ownerColor: Record<string, string> = { advisor: '#a78bfa', system: '#38bdf8', counselor: '#f59e0b' };

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0f', color: '#f1f5f9' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/retain-ai" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">RetainAI</Link>
            <span className="text-slate-700">/</span>
            <span className="text-sm font-semibold" style={{ color: ROSE }}>Student Risk Demo</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: ROSE_DIM, border: `1px solid ${ROSE_BORDER}`, color: ROSE }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ROSE }} />
            RetainAI · Monitoring
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-black tracking-tight mb-2">RetainAI — Student Retention Intelligence</h1>
          <p className="text-slate-400">Select an at-risk student. RetainAI analyzes signals and generates a complete intervention plan with a ready-to-send email.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Student selector */}
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">At-Risk Student Roster</label>
              <div className="space-y-3">
                {SAMPLE_STUDENTS.map(s => (
                  <StudentCard key={s.name} student={s} selected={selectedStudent.name === s.name} onClick={() => { setSelectedStudent(s); setResult(null); }} />
                ))}
              </div>
            </div>

            {/* Selected student details */}
            <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Signal Details — {selectedStudent.name}</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  ['GPA', selectedStudent.gpa.toString(), selectedStudent.gpa < 2],
                  ['Missed Assignments', selectedStudent.missedAssignments.toString(), selectedStudent.missedAssignments > 4],
                  ['Logins (14 days)', selectedStudent.loginDaysLast14.toString(), selectedStudent.loginDaysLast14 < 4],
                  ['Last Login', `${selectedStudent.lastLoginDaysAgo} days ago`, selectedStudent.lastLoginDaysAgo > 5],
                  ['Financial Hold', selectedStudent.financialHold ? 'Yes' : 'No', selectedStudent.financialHold],
                  ['Advisor', selectedStudent.advisorName, false],
                ].map(([label, value, alert]) => (
                  <div key={String(label)} className="flex justify-between items-center">
                    <span className="text-slate-500">{label}</span>
                    <span className="font-semibold" style={{ color: alert ? '#ef4444' : '#e2e8f0' }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={handleAnalyze} disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
              style={{
                background: loading ? 'rgba(255,255,255,0.05)' : `linear-gradient(135deg, #be123c, #f43f5e)`,
                color: loading ? '#475569' : '#fff',
                boxShadow: loading ? 'none' : ROSE_GLOW,
              }}>
              {loading ? <RefreshCw size={16} className="animate-spin" /> : <Shield size={16} />}
              {loading ? 'Analyzing risk signals...' : `Analyze ${selectedStudent.name}`}
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
                <TrendingDown size={40} className="mb-4 text-slate-700" />
                <p className="text-slate-500 font-medium">Intervention plan will appear here</p>
                <p className="text-slate-600 text-sm mt-1">Select a student and click Analyze</p>
              </div>
            )}

            {loading && (
              <div className="h-full flex flex-col items-center justify-center text-center py-24"
                style={{ border: '1px solid rgba(244,63,94,0.2)', borderRadius: '1.25rem', background: ROSE_DIM }}>
                <RefreshCw size={32} className="animate-spin mb-4" style={{ color: ROSE }} />
                <p className="font-medium text-slate-300">Analyzing risk signals...</p>
              </div>
            )}

            {result && (
              <div className="space-y-4">
                {/* Risk score */}
                <div className="p-5 rounded-xl" style={{ background: ROSE_DIM, border: `1px solid ${ROSE_BORDER}` }}>
                  <RiskMeter score={result.riskScore} />
                  <p className="text-xs text-slate-400 mt-3 leading-relaxed">{result.predictedOutcome}</p>
                </div>

                {/* Retention probability */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}>
                    <p className="text-2xl font-black text-red-400">{result.retentionProbability.withoutIntervention}%</p>
                    <p className="text-xs text-slate-500 mt-1">Without intervention</p>
                  </div>
                  <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)' }}>
                    <p className="text-2xl font-black text-green-400">{result.retentionProbability.withIntervention}%</p>
                    <p className="text-xs text-slate-500 mt-1">With intervention</p>
                  </div>
                </div>

                {/* Risk factors */}
                <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Risk Factors</p>
                  <div className="space-y-3">
                    {result.riskFactors.map((f, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <WeightBadge weight={f.weight} />
                        <div>
                          <p className="text-sm font-semibold text-slate-300">{f.factor}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{f.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Intervention plan */}
                <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Intervention Plan</p>
                  <div className="space-y-2">
                    {result.interventionPlan.map((a, i) => (
                      <div key={i} className="flex items-center gap-3 py-2 border-b last:border-b-0" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                        <span className="text-xs font-bold px-2 py-0.5 rounded"
                          style={{ background: `${urgencyColor[a.urgency] ?? '#64748b'}22`, color: urgencyColor[a.urgency] ?? '#64748b' }}>
                          {a.urgency}
                        </span>
                        <span className="flex-1 text-sm text-slate-300">{a.action}</span>
                        <span className="text-xs capitalize px-2 py-0.5 rounded"
                          style={{ background: `${ownerColor[a.owner] ?? '#64748b'}22`, color: ownerColor[a.owner] ?? '#64748b' }}>
                          {a.owner}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Email draft */}
                <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                  <button onClick={() => setEmailOpen(o => !o)}
                    className="w-full flex items-center justify-between p-4 transition-colors"
                    style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <div className="flex items-center gap-2">
                      <Send size={14} className="text-slate-400" />
                      <span className="text-sm font-semibold text-slate-300">AI-Drafted Intervention Email</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CopyButton text={result.emailDraft} />
                      {emailOpen ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />}
                    </div>
                  </button>
                  {emailOpen && (
                    <div className="px-4 pb-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{result.emailDraft}</p>
                    </div>
                  )}
                </div>

                <button onClick={() => setResult(null)}
                  className="w-full py-2.5 rounded-xl text-sm font-medium transition-colors"
                  style={{ background: 'rgba(255,255,255,0.04)', color: '#64748b', border: '1px solid rgba(255,255,255,0.07)' }}>
                  Analyze another student
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-white/5 flex justify-between items-center">
          <Link to="/beacon/demo" className="text-sm text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1">← Beacon Demo</Link>
          <Link to="/outcomes-ai/demo" className="text-sm font-semibold flex items-center gap-1" style={{ color: '#0ea5e9' }}>
            Try OutcomesAI Demo →
          </Link>
        </div>
      </div>
    </div>
  );
}
