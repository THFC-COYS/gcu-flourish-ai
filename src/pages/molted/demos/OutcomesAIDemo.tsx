import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, RefreshCw, Copy, Check, TrendingUp, TrendingDown, Minus, FileText, AlertTriangle } from 'lucide-react';

const SKY = '#0284C7';
const SKY_DIM = 'rgba(2,132,199,0.08)';
const SKY_BORDER = 'rgba(2,132,199,0.22)';

const CARD = '#f8fafc';
const CARD_INNER = '#f1f5f9';
const BORDER = 'rgba(148,163,184,0.20)';
const DIVIDER = 'rgba(148,163,184,0.15)';

const REPORT_TYPES = [
  { id: 'accreditation', label: 'HLC Accreditation', icon: '🏛️', description: 'Readiness assessment against accreditation standards' },
  { id: 'board', label: 'Board Report', icon: '📊', description: 'Executive summary for board of trustees' },
  { id: 'rankings', label: 'Rankings Analysis', icon: '🏆', description: 'U.S. News & World Report improvement strategy' },
] as const;

const YJU_SAMPLE_DATA = {
  institution: 'Lakewood University',
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
      style={{ background: CARD_INNER, color: copied ? '#16a34a' : '#64748b', border: `1px solid ${BORDER}` }}>
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Copied' : 'Copy JSON'}
    </button>
  );
}

function TrendIcon({ trend }: { trend: string }) {
  if (trend === 'up') return <TrendingUp size={14} className="text-green-600" />;
  if (trend === 'down') return <TrendingDown size={14} className="text-red-600" />;
  return <Minus size={14} className="text-slate-400" />;
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = { met: '#16a34a', partial: '#d97706', gap: '#dc2626' };
  const c = colors[status] ?? '#64748b';
  return (
    <span className="px-2 py-0.5 rounded-full text-xs font-bold capitalize"
      style={{ background: `${c}14`, color: c, border: `1px solid ${c}30` }}>{status}</span>
  );
}

function AccreditationView({ data }: { data: AccreditationReport }) {
  return (
    <div className="space-y-4">
      <div className="p-5 rounded-xl" style={{ background: SKY_DIM, border: `1px solid ${SKY_BORDER}` }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: SKY }}>Overall Readiness</span>
          <span className="text-3xl font-black" style={{ color: SKY }}>{data.overallReadiness}%</span>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">{data.executiveSummary}</p>
      </div>

      <div className="p-4 rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Standards Assessment</p>
        <div className="space-y-3">
          {data.standardsAssessment?.map((s, i) => (
            <div key={i} className="border-b last:border-b-0 pb-3 last:pb-0" style={{ borderColor: DIVIDER }}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold text-slate-700">{s.standard}</p>
                <StatusBadge status={s.status} />
              </div>
              <p className="text-xs text-slate-500">{s.evidence}</p>
              {s.recommendation && <p className="text-xs mt-1 font-medium" style={{ color: SKY }}>→ {s.recommendation}</p>}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-xl" style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.15)' }}>
          <p className="text-xs font-semibold text-red-700 mb-2 uppercase tracking-widest">Critical Gaps</p>
          <ul className="space-y-1">{data.criticalGaps?.map((g, i) => <li key={i} className="text-xs text-slate-600 flex items-start gap-1"><AlertTriangle size={10} className="text-red-600 mt-0.5 flex-shrink-0" />{g}</li>)}</ul>
        </div>
        <div className="p-4 rounded-xl" style={{ background: 'rgba(22,163,74,0.06)', border: '1px solid rgba(22,163,74,0.15)' }}>
          <p className="text-xs font-semibold text-green-700 mb-2 uppercase tracking-widest">Strengths</p>
          <ul className="space-y-1">{data.strengthHighlights?.map((s, i) => <li key={i} className="text-xs text-slate-600 flex items-start gap-1"><Check size={10} className="text-green-600 mt-0.5 flex-shrink-0" />{s}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}

function BoardView({ data }: { data: BoardReport }) {
  return (
    <div className="space-y-4">
      <div className="p-5 rounded-xl" style={{ background: SKY_DIM, border: `1px solid ${SKY_BORDER}` }}>
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: SKY }}>Board Headline</p>
        <p className="text-lg font-bold text-slate-800">{data.headline}</p>
        <p className="text-sm text-slate-600 mt-3 leading-relaxed">{data.narrative}</p>
      </div>

      <div className="p-4 rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Key Metrics</p>
        <div className="space-y-2">
          {data.keyMetrics?.map((m, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b last:border-b-0" style={{ borderColor: DIVIDER }}>
              <span className="text-sm text-slate-600">{m.metric}</span>
              <div className="flex items-center gap-2">
                <TrendIcon trend={m.trend} />
                <span className="text-sm font-bold text-slate-800">{m.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-xl" style={{ background: 'rgba(217,119,6,0.06)', border: '1px solid rgba(217,119,6,0.15)' }}>
          <p className="text-xs font-semibold text-amber-700 mb-2 uppercase tracking-widest">Watch Items</p>
          <ul className="space-y-1">{data.watchItems?.map((w, i) => <li key={i} className="text-xs text-slate-600">• {w}</li>)}</ul>
        </div>
        <div className="p-4 rounded-xl" style={{ background: 'rgba(22,163,74,0.06)', border: '1px solid rgba(22,163,74,0.15)' }}>
          <p className="text-xs font-semibold text-green-700 mb-2 uppercase tracking-widest">Wins</p>
          <ul className="space-y-1">{data.celebrationPoints?.map((c, i) => <li key={i} className="text-xs text-slate-600">• {c}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}

function RankingsView({ data }: { data: RankingsReport }) {
  return (
    <div className="space-y-4">
      <div className="p-5 rounded-xl" style={{ background: SKY_DIM, border: `1px solid ${SKY_BORDER}` }}>
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: SKY }}>Current Position</p>
        <p className="text-sm text-slate-700 leading-relaxed">{data.currentPositionSummary}</p>
        <p className="text-xs mt-3 font-semibold" style={{ color: SKY }}>{data.projectedImprovement}</p>
      </div>

      <div className="p-4 rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Ranking Factors</p>
        <div className="space-y-3">
          {data.rankingFactors?.map((f, i) => (
            <div key={i} className="border-b last:border-b-0 pb-3 last:pb-0" style={{ borderColor: DIVIDER }}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold text-slate-700">{f.factor}</p>
                <span className="text-xs text-red-600 font-bold">Gap: {f.gap}</span>
              </div>
              <div className="flex gap-4 text-xs text-slate-500 mb-1">
                <span>Current: {f.currentScore}</span>
                <span>Benchmark: {f.benchmark}</span>
              </div>
              <p className="text-xs font-medium" style={{ color: SKY }}>→ {f.actionPlan}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-xl" style={{ background: 'rgba(22,163,74,0.06)', border: '1px solid rgba(22,163,74,0.15)' }}>
          <p className="text-xs font-semibold text-green-700 mb-2 uppercase tracking-widest">Quick Wins</p>
          <ul className="space-y-1">{data.quickWins?.map((w, i) => <li key={i} className="text-xs text-slate-600">• {w}</li>)}</ul>
        </div>
        <div className="p-4 rounded-xl" style={{ background: SKY_DIM, border: `1px solid ${SKY_BORDER}` }}>
          <p className="text-xs font-semibold mb-2 uppercase tracking-widest" style={{ color: SKY }}>Long-Term</p>
          <ul className="space-y-1">{data.longTermInvestments?.map((l, i) => <li key={i} className="text-xs text-slate-600">• {l}</li>)}</ul>
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
        body: JSON.stringify({ type: 'outcomes-ai', reportType, institution: YJU_SAMPLE_DATA.institution, data: YJU_SAMPLE_DATA }),
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
    <div className="min-h-screen" style={{ background: '#ffffff', color: '#0f172a' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: '#e2e8f0' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/outcomes-ai" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">OutcomesAI</Link>
            <span className="text-slate-300">/</span>
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
          <h1 className="text-3xl font-black tracking-tight mb-2 text-slate-900">OutcomesAI — Institutional Reporting</h1>
          <p className="text-slate-500">Generate accreditation readiness reports, board summaries, and rankings strategy — instantly, from your institutional data.</p>
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
                      background: reportType === t.id ? SKY_DIM : CARD,
                      border: `1px solid ${reportType === t.id ? SKY_BORDER : BORDER}`,
                      boxShadow: reportType === t.id ? '0 0 0 3px rgba(2,132,199,0.08)' : 'none',
                    }}>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{t.icon}</span>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{t.label}</p>
                        <p className="text-xs text-slate-500">{t.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Institution data preview */}
            <div className="p-4 rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Institutional Data — Sample</p>
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
                    <span className="font-semibold text-slate-700">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={handleGenerate} disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
              style={{
                background: loading ? CARD_INNER : `linear-gradient(135deg, #0369a1, #0284c7)`,
                color: loading ? '#94a3b8' : '#fff',
                boxShadow: loading ? 'none' : '0 4px 14px rgba(2,132,199,0.25)',
              }}>
              {loading ? <RefreshCw size={16} className="animate-spin" /> : <FileText size={16} />}
              {loading ? 'Generating report...' : `Generate ${REPORT_TYPES.find(t => t.id === reportType)?.label}`}
            </button>

            {error && (
              <div className="p-3 rounded-lg text-sm" style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.15)', color: '#b91c1c' }}>
                {error}
              </div>
            )}
          </div>

          {/* Right: Report */}
          <div>
            {!result && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-center py-24"
                style={{ border: `1px dashed ${BORDER}`, borderRadius: '1.25rem' }}>
                <BarChart2 size={40} className="mb-4 text-slate-300" />
                <p className="text-slate-500 font-medium">Your report will appear here</p>
                <p className="text-slate-400 text-sm mt-1">Select a report type and click Generate</p>
              </div>
            )}

            {loading && (
              <div className="h-full flex flex-col items-center justify-center text-center py-24"
                style={{ border: `1px solid ${SKY_BORDER}`, borderRadius: '1.25rem', background: SKY_DIM }}>
                <RefreshCw size={32} className="animate-spin mb-4" style={{ color: SKY }} />
                <p className="font-medium text-slate-700">Analyzing institutional data...</p>
              </div>
            )}

            {result && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    {REPORT_TYPES.find(t => t.id === reportType)?.label} — Sample
                  </p>
                  <CopyButton text={JSON.stringify(result, null, 2)} />
                </div>
                {reportType === 'accreditation' && <AccreditationView data={result as AccreditationReport} />}
                {reportType === 'board' && <BoardView data={result as BoardReport} />}
                {reportType === 'rankings' && <RankingsView data={result as RankingsReport} />}
                <button onClick={() => setResult(null)} className="w-full py-2.5 rounded-xl text-sm font-medium mt-4 transition-colors"
                  style={{ background: CARD_INNER, color: '#64748b', border: `1px solid ${BORDER}` }}>
                  Generate another report
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t flex justify-between items-center" style={{ borderColor: '#e2e8f0' }}>
          <Link to="/retain-ai/demo" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">← RetainAI Demo</Link>
          <Link to="/proof-ai/demo" className="text-sm font-semibold flex items-center gap-1" style={{ color: '#7c3aed' }}>
            Try ProofAI Demo →
          </Link>
        </div>
      </div>
    </div>
  );
}
