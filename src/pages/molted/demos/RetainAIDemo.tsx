import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle, TrendingDown, RefreshCw, Copy, Check, Send,
  ChevronDown, ChevronUp, Shield, UserCheck, Zap, CheckCircle,
  Mail, Activity, Clock, Bot,
} from 'lucide-react';

const ROSE = '#F43F5E';
const ROSE_DIM = 'rgba(244,63,94,0.10)';
const ROSE_BORDER = 'rgba(244,63,94,0.25)';
const ROSE_GLOW = '0 0 40px rgba(244,63,94,0.15)';
const GREEN = '#22C55E';
const GREEN_DIM = 'rgba(34,197,94,0.10)';
const GREEN_BORDER = 'rgba(34,197,94,0.25)';
const AMBER = '#F59E0B';
const AMBER_DIM = 'rgba(245,158,11,0.10)';
const AMBER_BORDER = 'rgba(245,158,11,0.25)';

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

/* ── Helpers ─────────────────────────────────────────────────────────────── */
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

/* ── Mode Toggle ─────────────────────────────────────────────────────────── */
function ModeToggle({ mode, onChange }: { mode: 'advisor' | 'auto'; onChange: (m: 'advisor' | 'auto') => void }) {
  return (
    <div
      className="inline-flex p-1 rounded-xl gap-1"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <button
        onClick={() => onChange('advisor')}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all"
        style={{
          background: mode === 'advisor' ? AMBER_DIM : 'transparent',
          color: mode === 'advisor' ? AMBER : '#64748B',
          border: `1px solid ${mode === 'advisor' ? AMBER_BORDER : 'transparent'}`,
        }}
      >
        <UserCheck size={13} />
        Advisor Review
      </button>
      <button
        onClick={() => onChange('auto')}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all"
        style={{
          background: mode === 'auto' ? ROSE_DIM : 'transparent',
          color: mode === 'auto' ? ROSE : '#64748B',
          border: `1px solid ${mode === 'auto' ? ROSE_BORDER : 'transparent'}`,
        }}
      >
        <Zap size={13} />
        Auto Intervention
      </button>
    </div>
  );
}

/* ── Auto Intervention Mode ──────────────────────────────────────────────── */
const AUTO_TRACES = [
  { wait: 0,    step: 'Scanning 847 enrolled students for risk signals…', type: 'scan' },
  { wait: 800,  step: 'Flagging students with GPA < 2.0 or 5+ missed assignments…', type: 'scan' },
  { wait: 700,  step: 'Cross-referencing login frequency data (last 14 days)…', type: 'analyze' },
  { wait: 650,  step: 'Checking financial holds and registration status…', type: 'analyze' },
  { wait: 700,  step: 'Prioritizing by composite risk score — highest first…', type: 'rank' },
  { wait: 600,  step: 'Marcus J. flagged — Risk Score 91 (Critical)…', type: 'flag' },
  { wait: 500,  step: 'Generating personalized intervention plan…', type: 'plan' },
  { wait: 700,  step: 'Drafting outreach email in advisor voice (Dr. Sarah Chen)…', type: 'draft' },
  { wait: 600,  step: 'Reviewing email for tone, empathy, and GCU faith alignment…', type: 'review' },
  { wait: 500,  step: 'Scheduling delivery — optimal open-rate window: 9:00 AM…', type: 'send' },
  { wait: 400,  step: 'Email dispatched · Advisor notified · Case logged…', type: 'done' },
];

const TRACE_COLORS: Record<string, string> = {
  scan: '#38BDF8',
  analyze: '#A78BFA',
  rank: '#F59E0B',
  flag: '#EF4444',
  plan: '#2563EB',
  draft: '#22C55E',
  review: '#F59E0B',
  send: '#22C55E',
  done: '#22C55E',
};

function AutoInterventionMode() {
  const [started, setStarted] = useState(false);
  const [traces, setTraces] = useState<Array<{ step: string; type: string }>>([]);
  const [result, setResult] = useState<RetainResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const tracesRef = useRef<HTMLDivElement>(null);
  const highRiskStudent = SAMPLE_STUDENTS[0]; // Marcus J. — highest risk

  useEffect(() => {
    if (tracesRef.current) {
      tracesRef.current.scrollTop = tracesRef.current.scrollHeight;
    }
  }, [traces]);

  async function runAgent() {
    setStarted(true);
    setLoading(true);
    setTraces([]);
    setResult(null);
    setSent(false);

    // Run traces and API call in parallel
    async function runTraces() {
      for (const t of AUTO_TRACES) {
        await new Promise(r => setTimeout(r, t.wait));
        setTraces(prev => [...prev, { step: t.step, type: t.type }]);
      }
    }

    async function fetchResult() {
      const res = await fetch('/api/demos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'retain-ai', student: highRiskStudent }),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    }

    try {
      const [data] = await Promise.all([fetchResult(), runTraces()]);
      setResult(data);
      setSent(true);
    } catch (e) {
      setTraces(prev => [...prev, { step: `Error: ${String(e)}`, type: 'flag' }]);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setStarted(false);
    setTraces([]);
    setResult(null);
    setSent(false);
    setLoading(false);
  }

  const urgencyColor: Record<string, string> = { today: '#ef4444', 'this week': '#f59e0b', 'this month': '#64748b' };
  const ownerColor: Record<string, string> = { advisor: '#a78bfa', system: '#38bdf8', counselor: '#f59e0b' };

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="p-5 rounded-2xl" style={{ background: ROSE_DIM, border: `1px solid ${ROSE_BORDER}` }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: ROSE }} />
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: ROSE }}>Full Agentic · Autonomous</span>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">
          RetainAI continuously monitors all enrolled students. When a student crosses a risk threshold, the agent automatically generates a personalized intervention plan and dispatches outreach — no human trigger required.
        </p>
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { label: '847', sub: 'Students monitored' },
            { label: '< 2 min', sub: 'Detection to outreach' },
            { label: '24/7', sub: 'Continuous scanning' },
          ].map(({ label, sub }) => (
            <div key={sub} className="text-center p-3 rounded-xl" style={{ background: 'rgba(0,0,0,0.3)' }}>
              <p className="font-black text-lg text-white">{label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
      </div>

      {!started ? (
        <button
          onClick={runAgent}
          className="w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:-translate-y-px"
          style={{ background: `linear-gradient(135deg, #be123c, #f43f5e)`, color: '#fff', boxShadow: ROSE_GLOW }}
        >
          <Zap size={16} />
          Trigger Auto Intervention Agent
        </button>
      ) : (
        <div className="space-y-4">
          {/* Live trace feed */}
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ background: 'rgba(0,0,0,0.6)', borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-2">
                <Bot size={13} style={{ color: ROSE }} />
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Agent trace · live</p>
              </div>
              {loading && <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: ROSE }} />}
              {sent && <CheckCircle size={13} style={{ color: GREEN }} />}
            </div>
            <div ref={tracesRef} className="p-4 space-y-1.5 max-h-64 overflow-y-auto font-mono">
              {traces.map((t, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs">
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: TRACE_COLORS[t.type] ?? '#64748B' }}
                  />
                  <span style={{ color: TRACE_COLORS[t.type] ?? '#94A3B8' }}>{t.step}</span>
                </div>
              ))}
              {loading && !sent && (
                <div className="flex items-center gap-2.5 text-xs pt-1">
                  <RefreshCw size={10} className="animate-spin" style={{ color: ROSE }} />
                  <span style={{ color: ROSE }}>Agent running…</span>
                </div>
              )}
            </div>
          </div>

          {/* Sent confirmation */}
          {sent && result && (
            <div
              className="p-4 rounded-2xl flex items-center gap-3"
              style={{ background: GREEN_DIM, border: `1px solid ${GREEN_BORDER}` }}
            >
              <CheckCircle size={20} style={{ color: GREEN }} className="flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white">Outreach sent automatically</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Email dispatched to {highRiskStudent.name} · {highRiskStudent.advisorName} notified · Case opened in CRM
                </p>
              </div>
              <div
                className="px-3 py-1 rounded-full text-xs font-bold flex-shrink-0"
                style={{ background: GREEN_DIM, color: GREEN, border: `1px solid ${GREEN_BORDER}` }}
              >
                Sent 2m ago
              </div>
            </div>
          )}

          {/* Result display */}
          {result && (
            <div className="space-y-4">
              {/* Risk score */}
              <div className="p-5 rounded-xl" style={{ background: ROSE_DIM, border: `1px solid ${ROSE_BORDER}` }}>
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle size={14} style={{ color: ROSE }} />
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: ROSE }}>
                    {highRiskStudent.name} · Risk Assessment
                  </span>
                </div>
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

              {/* Auto-dispatched email */}
              <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(34,197,94,0.2)' }}>
                <div className="flex items-center justify-between p-4" style={{ background: GREEN_DIM }}>
                  <div className="flex items-center gap-2">
                    <Mail size={14} style={{ color: GREEN }} />
                    <span className="text-sm font-semibold text-slate-300">Auto-Dispatched Outreach Email</span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: GREEN_DIM, color: GREEN, border: `1px solid ${GREEN_BORDER}` }}>
                      Sent
                    </span>
                  </div>
                  <CopyButton text={result.emailDraft} />
                </div>
                <div className="px-4 pb-4 pt-3" style={{ background: 'rgba(34,197,94,0.03)' }}>
                  <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{result.emailDraft}</p>
                </div>
              </div>

              <button onClick={reset}
                className="w-full py-2.5 rounded-xl text-sm font-medium transition-colors"
                style={{ background: 'rgba(255,255,255,0.04)', color: '#64748b', border: '1px solid rgba(255,255,255,0.07)' }}>
                Run again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Advisor Review Mode ─────────────────────────────────────────────────── */
function AdvisorReviewMode() {
  const [selectedStudent, setSelectedStudent] = useState(SAMPLE_STUDENTS[0]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RetainResult | null>(null);
  const [error, setError] = useState('');
  const [emailOpen, setEmailOpen] = useState(false);
  const [emailDraft, setEmailDraft] = useState('');
  const [editingEmail, setEditingEmail] = useState(false);
  const [approved, setApproved] = useState(false);

  async function handleAnalyze() {
    setLoading(true); setError(''); setResult(null); setEmailOpen(false); setApproved(false);
    try {
      const res = await fetch('/api/demos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'retain-ai', student: selectedStudent }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setResult(data);
      setEmailDraft(data.emailDraft);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }

  const urgencyColor: Record<string, string> = { today: '#ef4444', 'this week': '#f59e0b', 'this month': '#64748b' };
  const ownerColor: Record<string, string> = { advisor: '#a78bfa', system: '#38bdf8', counselor: '#f59e0b' };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left: Student selector */}
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">At-Risk Student Roster</label>
          <div className="space-y-3">
            {SAMPLE_STUDENTS.map(s => (
              <StudentCard key={s.name} student={s} selected={selectedStudent.name === s.name}
                onClick={() => { setSelectedStudent(s); setResult(null); setApproved(false); }} />
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

        {approved && (
          <div
            className="rounded-2xl border p-10 text-center"
            style={{ background: GREEN_DIM, borderColor: GREEN_BORDER }}
          >
            <CheckCircle size={32} style={{ color: GREEN }} className="mx-auto mb-4" />
            <p className="text-lg font-black text-white mb-1">Outreach Approved & Sent</p>
            <p className="text-slate-400 text-sm mb-4">
              Email dispatched to {selectedStudent.name} · {selectedStudent.advisorName} notified
            </p>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{ background: GREEN_DIM, color: GREEN, border: `1px solid ${GREEN_BORDER}` }}
            >
              <CheckCircle size={12} />
              Case logged · Student notified
            </div>
            <div className="mt-6">
              <button onClick={() => { setResult(null); setApproved(false); }}
                className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
                Analyze another student
              </button>
            </div>
          </div>
        )}

        {result && !approved && (
          <div className="space-y-4">
            {/* Risk score */}
            <div className="p-5 rounded-xl" style={{ background: ROSE_DIM, border: `1px solid ${ROSE_BORDER}` }}>
              <div className="flex items-center gap-2 mb-3">
                <UserCheck size={13} style={{ color: AMBER }} />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: AMBER }}>Advisor Review</span>
              </div>
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

            {/* Editable email draft */}
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
              <button onClick={() => setEmailOpen(o => !o)}
                className="w-full flex items-center justify-between p-4 transition-colors"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-slate-400" />
                  <span className="text-sm font-semibold text-slate-300">AI-Drafted Intervention Email</span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: AMBER_DIM, color: AMBER, border: `1px solid ${AMBER_BORDER}` }}>
                    Review & edit
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {emailOpen ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />}
                </div>
              </button>
              {emailOpen && (
                <div className="px-4 pb-4 pt-2 space-y-3" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500">Edit the email before sending, or approve as-is.</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingEmail(e => !e)}
                        className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                        style={{ background: editingEmail ? AMBER_DIM : 'rgba(148,163,184,0.08)', color: editingEmail ? AMBER : '#94a3b8', border: `1px solid ${editingEmail ? AMBER_BORDER : 'transparent'}` }}
                      >
                        {editingEmail ? 'Done editing' : 'Edit'}
                      </button>
                      <CopyButton text={emailDraft} />
                    </div>
                  </div>
                  {editingEmail ? (
                    <textarea
                      value={emailDraft}
                      onChange={e => setEmailDraft(e.target.value)}
                      rows={12}
                      className="w-full rounded-xl border text-sm text-slate-300 leading-relaxed resize-none p-3 focus:outline-none"
                      style={{ background: 'rgba(255,255,255,0.05)', borderColor: AMBER_BORDER }}
                    />
                  ) : (
                    <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{emailDraft}</p>
                  )}
                </div>
              )}
            </div>

            {/* Approve & Send */}
            <div
              className="rounded-2xl border p-5"
              style={{ background: 'rgba(34,197,94,0.05)', borderColor: GREEN_BORDER }}
            >
              <div className="flex items-start gap-3 mb-4">
                <UserCheck size={16} style={{ color: GREEN }} className="flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-white mb-0.5">Ready to send?</p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Review the risk assessment and email above. Edit if needed, then approve to dispatch the outreach and open the case.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setApproved(true)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all hover:-translate-y-px"
                style={{ background: `linear-gradient(135deg, #16a34a, #22c55e)`, color: '#fff' }}
              >
                <Send size={15} />
                Approve & Send Outreach
              </button>
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
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function RetainAIDemo() {
  const [mode, setMode] = useState<'advisor' | 'auto'>('advisor');

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
          <p className="text-slate-400 mb-6">
            Two modes: advisor reviews AI analysis and approves outreach, or the agent monitors and intervenes fully autonomously.
          </p>

          {/* Mode toggle */}
          <div className="flex items-center gap-4 flex-wrap">
            <ModeToggle mode={mode} onChange={m => setMode(m)} />
            <p className="text-xs text-slate-500">
              {mode === 'advisor'
                ? 'Advisor reviews risk analysis, edits email, then approves before sending.'
                : 'Agent monitors all students continuously and fires outreach automatically.'}
            </p>
          </div>
        </div>

        {mode === 'advisor' ? <AdvisorReviewMode /> : <AutoInterventionMode />}

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
