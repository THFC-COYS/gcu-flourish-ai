import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, RefreshCw, Copy, Check, TrendingUp, TrendingDown, Minus, FileText, Award, AlertTriangle } from 'lucide-react';

const SKY = '#0EA5E9';
const SKY_DIM = 'rgba(14,165,233,0.10)';
const SKY_BORDER = 'rgba(14,165,233,0.25)';
const SKY_GLOW = '0 0 40px rgba(14,165,233,0.15)';

const REPORT_TYPES = [
  { id: 'accreditation', label: 'HLC Accreditation', icon: '🏛️', description: 'Readiness assessment against accreditation standards' },
  { id: 'board', label: 'Board Report', icon: '📊', description: 'Executive summary for board of trustees' },
  { id: 'rankings', label: 'Rankings Analysis', icon: '🏆', description: 'U.S. News & World Report improvement strategy' },
] as const;

const GCU_SAMPLE_DATA = {
  institution: 'Grand Canyon University',
  enrollmentTotal: 108000,
  graduationRate6yr: 52,
  retentionRate: 74,
  studentFacultyRatio: '18:1',
  fullTimeOnline: 96000,
  campusStudents: 12000,
  netPromoterScore: 67,
  employmentRate90days: 82,
  debtMedian: 21500,
  avgSalary5yr: 54000,
  accreditationStatus: 'Full — expires 2029',
  lastReviewYear: 2019,
  facultyWithTerminalDegrees: 71,
  researchOutput: 'Low — primarily teaching-focused',
  peerInstitutions: ['Liberty University', 'Western Governors University', 'Arizona State Online'],
  strengths: ['Online scale', 'Faith integration', 'Nursing/Healthcare programs', 'Career outcomes'],
  challenges: ['Research output', 'Selectivity metrics', 'Peer perception'],
};

type ReportType = 'accreditation' | 'board' | 'rankings';

interface StandardResult { standard: string; status: string; evidence: string; recommendation: string; }
interface KeyMetric { metric: string; value: string; trend: string; context: string; }
interface RankingFactor { factor: string; currentScore: string; benchmark: string; gap: string; actionPlan: string; }

interface AccreditationReport {
  overallReadiness: string;
  standardsAssessment: StandardResult[];
  executiveSummary: string;
  criticalGaps: string[];
  strengthHighlights: string[];
  nextSteps: string[];
}
interface BoardReport {
  headline: string;
  keyMetrics: KeyMetric[];
  narrative: string;
  watchItems: string[];
  celebrationPoints: string[];
  strategicRecommendations: string[];
}
interface RankingsReport {
  currentPositionSummary: string;
  rankingFactors: RankingFactor[];
  projectedImprovement: string;
  quickWins: string[];
  longTermInvestments: string[];
  competitorInsights: string;
}

type ReportResult = AccreditationReport | BoardReport | RankingsReport;

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium"
      style={{ background: SKY_DIM, color: copied ? '#22c55e' : '#94a3b8', border: `1px solid ${SKY_BORDER}` }}>
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Copied' : 'Copy JSON'}
    </button>
  );
}

function TrendIcon({ trend }: { trend: string }) {
  if (trend === 'up') return <TrendingUp size={14} className="text-green-400" />;
  if (trend === 'down') return <TrendingDown size={14} className="text-red-400" />;
  return <Minus size={14} className="text-slate-400" />;
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = { met: '#22c55e', partial: '#f59e0b', gap: '#ef4444' };
  const c = colors[status] ?? '#64748b';
  return (
    <span className="px-2 py-0.5 rounded-full text-xs font-bold capitalize"
      style={{ background: `${c}22`, color: c, border: `1px solid ${c}44` }}>{status}</span>
  );
}

function AccreditationView({ data }: { data: AccreditationReport }) {
  return (
    <div className="space-y-4">
      <div className="p-5 rounded-xl" style={{ background: SKY_DIM, border: `1px solid ${SKY_BORDER}` }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-sky-400">Overall Readiness</span>
          <span className="text-3xl font-black text-sky-300">{data.overallReadiness}%</span>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">{data.executiveSummary}</p>
      </div>

      <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Standards Assessment</p>
        <div className="space-y-3">
          {data.standardsAssessment?.map((s, i) => (
            <div key={i} className="border-b last:border-b-0 pb-3 last:pb-0" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold text-slate-300">{s.standard}</p>
                <StatusBadge status={s.status} />
              </div>
              <p className="text-xs text-slate-500">{s.evidence}</p>
              {s.recommendation && <p className="text-xs text-sky-400 mt-1">→ {s.recommendation}</p>}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-xl" style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.15)' }}>
          <p className="text-xs font-semibold text-red-400 mb-2 uppercase tracking-widest">Critical Gaps</p>
          <ul className="space-y-1">{data.criticalGaps?.map((g, i) => <li key={i} className="text-xs text-slate-400 flex items-start gap-1"><AlertTriangle size={10} className="text-red-400 mt-0.5 flex-shrink-0" />{g}</li>)}</ul>
        </div>
        <div className="p-4 rounded-xl" style={{ background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.15)' }}>
          <p className="text-xs font-semibold text-green-400 mb-2 uppercase tracking-widest">Strengths</p>
          <ul className="space-y-1">{data.strengthHighlights?.map((s, i) => <li key={i} className="text-xs text-slate-400 flex items-start gap-1"><Check size={10} className="text-green-400 mt-0.5 flex-shrink-0" />{s}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}

function BoardView({ data }: { data: BoardReport }) {
  return (
    <div className="space-y-4">
      <div className="p-5 rounded-xl" style={{ background: SKY_DIM, border: `1px solid ${SKY_BORDER}` }}>
        <p className="text-xs font-semibold uppercase tracking-widest text-sky-400 mb-2">Board Headline</p>
        <p className="text-lg font-bold text-slate-100">{data.headline}</p>
        <p className="text-sm text-slate-400 mt-3 leading-relaxed">{data.narrative}</p>
      </div>

      <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Key Metrics</p>
        <div className="space-y-2">
          {data.keyMetrics?.map((m, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b last:border-b-0" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              <span className="text-sm text-slate-400">{m.metric}</span>
              <div className="flex items-center gap-2">
                <TrendIcon trend={m.trend} />
                <span className="text-sm font-bold text-slate-200">{m.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-xl" style={{ background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.15)' }}>
          <p className="text-xs font-semibold text-yellow-400 mb-2 uppercase tracking-widest">Watch Items</p>
          <ul className="space-y-1">{data.watchItems?.map((w, i) => <li key={i} className="text-xs text-slate-400">• {w}</li>)}</ul>
        </div>
        <div className="p-4 rounded-xl" style={{ background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.15)' }}>
          <p className="text-xs font-semibold text-green-400 mb-2 uppercase tracking-widest">Wins</p>
          <ul className="space-y-1">{data.celebrationPoints?.map((c, i) => <li key={i} className="text-xs text-slate-400">• {c}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}

function RankingsView({ data }: { data: RankingsReport }) {
  return (
    <div className="space-y-4">
      <div className="p-5 rounded-xl" style={{ background: SKY_DIM, border: `1px solid ${SKY_BORDER}` }}>
        <p className="text-xs font-semibold uppercase tracking-widest text-sky-400 mb-2">Current Position</p>
        <p className="text-sm text-slate-200 leading-relaxed">{data.currentPositionSummary}</p>
        <p className="text-xs text-sky-300 mt-3 font-semibold">{data.projectedImprovement}</p>
      </div>

      <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Ranking Factors</p>
        <div className="space-y-3">
          {data.rankingFactors?.map((f, i) => (
            <div key={i} className="border-b last:border-b-0 pb-3 last:pb-0" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold text-slate-300">{f.factor}</p>
                <span className="text-xs text-red-400 font-bold">Gap: {f.gap}</span>
              </div>
              <div className="flex gap-4 text-xs text-slate-500 mb-1">
                <span>Current: {f.currentScore}</span>
                <span>Benchmark: {f.benchmark}</span>
              </div>
              <p className="text-xs text-sky-400">→ {f.actionPlan}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-xl" style={{ background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.15)' }}>
          <p className="text-xs font-semibold text-green-400 mb-2 uppercase tracking-widest">Quick Wins</p>
          <ul className="space-y-1">{data.quickWins?.map((w, i) => <li key={i} className="text-xs text-slate-400">• {w}</li>)}</ul>
        </div>
        <div className="p-4 rounded-xl" style={{ background: 'rgba(14,165,233,0.07)', border: '1px solid rgba(14,165,233,0.15)' }}>
          <p className="text-xs font-semibold text-sky-400 mb-2 uppercase tracking-widest">Long-Term</p>
          <ul className="space-y-1">{data.longTermInvestments?.map((l, i) => <li key={i} className="text-xs text-slate-400">• {l}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}

export default function OutcomesAIDemo() {
  const [reportType, setReportType] = useState<ReportType>('board');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReportResult | null>(null);
  const [error, setError] = useState('');

  async function handleGenerate() {
    setLoading(true); setError(''); setResult(null);
    try {
      const res = await fetch('/api/demos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'outcomes-ai', reportType, institution: GCU_SAMPLE_DATA.institution, data: GCU_SAMPLE_DATA }),
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
            <Link to="/outcomes-ai" className="text-sm text-slate-500 hover:text-slate-300">OutcomesAI</Link>
            <span className="text-slate-700">/</span>
            <span className="text-sm font-semibold" style={{ color: SKY }}>Reporting Demo</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: SKY_DIM, border: `1px solid ${SKY_BORDER}`, color: SKY }}>
            <BarChart2 size={11} />
            OutcomesAI · Institutional Intelligence
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-black tracking-tight mb-2">OutcomesAI — Institutional Reporting</h1>
          <p className="text-slate-400">Generate accreditation readiness reports, board summaries, and rankings strategy — instantly, from your institutional data.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Config */}
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Report Type</label>
              <div className="space-y-3">
                {REPORT_TYPES.map(t => (
                  <button key={t.id} onClick={() => { setReportType(t.id); setResult(null); }}
                    className="w-full p-4 rounded-xl text-left transition-all"
                    style={{
                      background: reportType === t.id ? SKY_DIM : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${reportType === t.id ? SKY_BORDER : 'rgba(255,255,255,0.07)'}`,
                      boxShadow: reportType === t.id ? SKY_GLOW : 'none',
                    }}>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{t.icon}</span>
                      <div>
                        <p className="text-sm font-bold text-slate-200">{t.label}</p>
                        <p className="text-xs text-slate-500">{t.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Institution data preview */}
            <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Institutional Data — GCU</p>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                {[
                  ['Enrollment', '108,000'],
                  ['6yr Graduation', '52%'],
                  ['Retention Rate', '74%'],
                  ['Student/Faculty', '18:1'],
                  ['Employment (90d)', '82%'],
                  ['Accreditation', 'HLC · Full'],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-slate-500">{label}</span>
                    <span className="font-semibold text-slate-300">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={handleGenerate} disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
              style={{
                background: loading ? 'rgba(255,255,255,0.05)' : `linear-gradient(135deg, #0369a1, #0ea5e9)`,
                color: loading ? '#475569' : '#fff',
                boxShadow: loading ? 'none' : SKY_GLOW,
              }}>
              {loading ? <RefreshCw size={16} className="animate-spin" /> : <FileText size={16} />}
              {loading ? 'Generating report...' : `Generate ${REPORT_TYPES.find(t => t.id === reportType)?.label}`}
            </button>

            {error && (
              <div className="p-3 rounded-lg text-sm" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5' }}>
                {error}
              </div>
            )}
          </div>

          {/* Right: Report */}
          <div>
            {!result && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-center py-24"
                style={{ border: '1px dashed rgba(255,255,255,0.07)', borderRadius: '1.25rem' }}>
                <BarChart2 size={40} className="mb-4 text-slate-700" />
                <p className="text-slate-500 font-medium">Your report will appear here</p>
                <p className="text-slate-600 text-sm mt-1">Select a report type and click Generate</p>
              </div>
            )}

            {loading && (
              <div className="h-full flex flex-col items-center justify-center text-center py-24"
                style={{ border: '1px solid rgba(14,165,233,0.2)', borderRadius: '1.25rem', background: SKY_DIM }}>
                <RefreshCw size={32} className="animate-spin mb-4" style={{ color: SKY }} />
                <p className="font-medium text-slate-300">Analyzing institutional data...</p>
              </div>
            )}

            {result && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    {REPORT_TYPES.find(t => t.id === reportType)?.label} — GCU
                  </p>
                  <CopyButton text={JSON.stringify(result, null, 2)} />
                </div>
                {reportType === 'accreditation' && <AccreditationView data={result as AccreditationReport} />}
                {reportType === 'board' && <BoardView data={result as BoardReport} />}
                {reportType === 'rankings' && <RankingsView data={result as RankingsReport} />}
                <button onClick={() => setResult(null)} className="w-full py-2.5 rounded-xl text-sm font-medium mt-4 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.04)', color: '#64748b', border: '1px solid rgba(255,255,255,0.07)' }}>
                  Generate another report
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex justify-between items-center">
          <Link to="/retain-ai/demo" className="text-sm text-slate-500 hover:text-slate-300">← RetainAI Demo</Link>
          <Link to="/proof-ai/demo" className="text-sm font-semibold flex items-center gap-1" style={{ color: '#a78bfa' }}>
            Try ProofAI Demo →
          </Link>
        </div>
      </div>
    </div>
  );
}
