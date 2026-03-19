import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft, Loader2, Copy, Check, ArrowRight,
  AlertTriangle, Activity, TrendingDown, MessageSquare,
  Users, ChevronDown, ChevronUp, Zap, UserCheck,
} from 'lucide-react';
import MoltedLayout from './MoltedLayout';

/* ── Constants ─────────────────────────────────────────────────────────── */
const TEAL = '#2563EB';
const TEAL_DIM = 'rgba(37,99,235,0.12)';
const TEAL_BORDER = 'rgba(37,99,235,0.25)';
const GOLD = '#64748B';
const RED = '#1E3A8A';
const RED_DIM = 'rgba(30,58,138,0.10)';
const RED_BORDER = 'rgba(30,58,138,0.22)';
const GOLD_DIM = 'rgba(100,116,139,0.10)';
const GOLD_BORDER = 'rgba(100,116,139,0.22)';

/* ── Types ─────────────────────────────────────────────────────────────── */
type RiskTier = 'high' | 'medium' | 'low';
type CheckInStyle = 'supportive' | 'direct' | 'brief';

interface Signal {
  label: string;
  value: string;
  flag: boolean;
}

interface StudentRisk {
  name: string;
  tier: RiskTier;
  riskScore: number;
  signals: Signal[];
  checkInDraft: string;
}

interface WarningResult {
  courseName: string;
  weekNumber: string;
  totalStudents: number;
  highRisk: number;
  mediumRisk: number;
  lowRisk: number;
  students: StudentRisk[];
  insight: string;
}

/* ── Helpers ────────────────────────────────────────────────────────────── */
function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }}
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

function tierColor(tier: RiskTier) {
  return tier === 'high' ? RED : tier === 'medium' ? GOLD : TEAL;
}
function tierBg(tier: RiskTier) {
  return tier === 'high' ? RED_DIM : tier === 'medium' ? GOLD_DIM : TEAL_DIM;
}
function tierBorder(tier: RiskTier) {
  return tier === 'high' ? RED_BORDER : tier === 'medium' ? GOLD_BORDER : TEAL_BORDER;
}
function tierLabel(tier: RiskTier) {
  return tier === 'high' ? 'High Risk' : tier === 'medium' ? 'Medium Risk' : 'On Track';
}

function StudentCard({ student }: { student: StudentRisk }) {
  const [open, setOpen] = useState(student.tier === 'high');
  const color = tierColor(student.tier);
  const bg = tierBg(student.tier);
  const border = tierBorder(student.tier);

  return (
    <div className="rounded-2xl border overflow-hidden" style={{ borderColor: border, background: bg }}>
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left"
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
            style={{ background: 'rgba(0,0,0,0.08)', color }}
          >
            {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: '#1C1C1E' }}>{student.name}</p>
            <p className="text-xs mt-0.5" style={{ color }}>
              {tierLabel(student.tier)} · {student.riskScore}% risk score
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {student.tier !== 'low' && (
            <span
              className="text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{ background: 'rgba(148,163,184,0.12)', color }}
            >
              {student.signals.filter(s => s.flag).length} signals
            </span>
          )}
          {open ? <ChevronUp size={14} style={{ color: '#94A3B8' }} /> : <ChevronDown size={14} style={{ color: '#94A3B8' }} />}
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-4">
          {/* Signals */}
          <div className="grid grid-cols-2 gap-2">
            {student.signals.map((sig, i) => (
              <div
                key={i}
                className="rounded-xl px-3 py-2 flex flex-col gap-0.5"
                style={{
                  background: sig.flag ? 'rgba(148,163,184,0.10)' : 'rgba(148,163,184,0.06)',
                  border: `1px solid ${sig.flag ? 'rgba(0,0,0,0.08)' : 'rgba(148,163,184,0.08)'}`,
                }}
              >
                <span className="text-xs" style={{ color: '#94A3B8' }}>{sig.label}</span>
                <span className="text-xs font-semibold" style={{ color: sig.flag ? color : '#94A3B8' }}>
                  {sig.value}
                </span>
              </div>
            ))}
          </div>

          {/* Check-in draft */}
          {student.tier !== 'low' && (
            <div
              className="rounded-xl border overflow-hidden"
              style={{ background: 'rgba(241,243,248,0.85)', borderColor: 'rgba(148,163,184,0.12)' }}
            >
              <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ borderColor: 'rgba(148,163,184,0.10)' }}>
                <div className="flex items-center gap-1.5">
                  <MessageSquare size={11} style={{ color: TEAL }} />
                  <span className="text-xs font-semibold" style={{ color: '#1C1C1E' }}>Check-in draft</span>
                </div>
                <CopyButton text={student.checkInDraft} label="Copy message" />
              </div>
              <div className="px-4 py-3">
                <pre className="text-xs leading-relaxed whitespace-pre-wrap font-sans" style={{ color: '#C7C7CC' }}>
                  {student.checkInDraft}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Mock generator ─────────────────────────────────────────────────────── */
const FIRST_NAMES = ['Alex', 'Jordan', 'Morgan', 'Taylor', 'Casey', 'Riley', 'Avery', 'Quinn', 'Peyton', 'Dakota', 'Skylar', 'Reese'];
const LAST_NAMES  = ['Chen', 'Patel', 'Williams', 'Garcia', 'Kim', 'Johnson', 'Martinez', 'Lee', 'Brown', 'Davis', 'Rodriguez', 'Wilson'];

function randomName(seed: number) {
  return `${FIRST_NAMES[seed % FIRST_NAMES.length]} ${LAST_NAMES[(seed * 3 + 1) % LAST_NAMES.length]}`;
}

function buildCheckIn(name: string, tier: RiskTier, style: CheckInStyle, signals: Signal[], course: string, week: string): string {
  const first = name.split(' ')[0];
  const highFlags = signals.filter(s => s.flag).map(s => s.label.toLowerCase());

  if (style === 'brief') {
    return `Hi ${first},\n\nJust checking in — how are things going in ${course || 'class'}? Let me know if you need anything.\n\n— [Instructor Name]`;
  }

  if (style === 'direct') {
    const flagText = highFlags.length > 0
      ? `I noticed ${highFlags.join(' and ')} over the past week or two,`
      : 'I wanted to reach out';
    return `Hi ${first},\n\n${flagText} and wanted to check in directly.\n\nWe're in Week ${week || '?'} now — a pivotal point in the course. If you're running into obstacles, let's address them now while there's still time to turn things around.\n\nAre you available for a quick 10-minute call this week?\n\n— [Instructor Name]`;
  }

  // supportive (default)
  if (tier === 'high') {
    return `Hi ${first},\n\nI hope you're doing okay. I wanted to reach out personally because I've noticed some changes in your engagement over the past week or two — ${highFlags.length > 0 ? highFlags.join(', ') : 'fewer submissions and logins than usual'}.\n\nSometimes life gets complicated and coursework takes a back seat — that's completely understandable. I just want to make sure you know I'm here and that there are options available to us.\n\nWould you be open to a quick 15-minute conversation this week? I'm flexible on timing.\n\n— [Instructor Name]`;
  }

  return `Hi ${first},\n\nJust a quick check-in — we're at the halfway point of the course now and I want to make sure everyone feels supported.\n\nIs there anything about the material or upcoming assignments I can clarify for you? My office hours are open and I'm always happy to respond here.\n\nHope Week ${week || '?'} is going well!\n\n— [Instructor Name]`;
}

function parseRosterLine(line: string, idx: number, style: CheckInStyle, course: string, week: string): StudentRisk {
  // Try to parse: Name, lastLogin (days ago), submitted assignments, grade%
  // e.g. "Alex Chen, 12, 3/8, 42%"
  const parts = line.split(',').map(s => s.trim());
  const name = parts[0] || randomName(idx);

  const daysSinceLogin = parseInt(parts[1]) || Math.floor(Math.random() * 20);
  const submittedRaw = parts[2] || '?/?';
  const [submitted, total] = submittedRaw.split('/').map(Number);
  const submissionRate = (submitted && total) ? submitted / total : Math.random();
  const gradeRaw = parts[3] || '';
  const grade = parseInt(gradeRaw) || Math.floor(40 + Math.random() * 55);

  const signals: Signal[] = [
    {
      label: 'Days since login',
      value: `${daysSinceLogin}d ago`,
      flag: daysSinceLogin >= 7,
    },
    {
      label: 'Submissions',
      value: (submitted && total) ? `${submitted}/${total}` : submittedRaw,
      flag: submissionRate < 0.6,
    },
    {
      label: 'Current grade',
      value: `${grade}%`,
      flag: grade < 65,
    },
    {
      label: 'Discussion posts',
      value: daysSinceLogin > 10 ? '0 this week' : daysSinceLogin > 5 ? '1 this week' : '3 this week',
      flag: daysSinceLogin > 10,
    },
  ];

  const flagCount = signals.filter(s => s.flag).length;
  const riskScore = Math.min(99, Math.round(flagCount * 22 + (100 - grade) * 0.3 + daysSinceLogin * 1.5));

  const tier: RiskTier = riskScore >= 65 ? 'high' : riskScore >= 35 ? 'medium' : 'low';

  return {
    name,
    tier,
    riskScore,
    signals,
    checkInDraft: buildCheckIn(name, tier, style, signals, course, week),
  };
}

function generateMockResult(
  rosterText: string,
  courseName: string,
  weekNumber: string,
  style: CheckInStyle,
): WarningResult {
  const lines = rosterText.split('\n').map(l => l.trim()).filter(Boolean);

  // If no roster provided, generate sample students
  const dataLines = lines.length >= 2 ? lines : [
    'Jordan Martinez, 14, 2/7, 48%',
    'Taylor Kim, 1, 6/7, 88%',
    'Casey Brown, 9, 4/7, 62%',
    'Riley Patel, 18, 1/7, 35%',
    'Morgan Chen, 3, 7/7, 91%',
    'Avery Wilson, 6, 5/7, 73%',
  ];

  const students = dataLines.map((line, i) => parseRosterLine(line, i, style, courseName, weekNumber));
  students.sort((a, b) => b.riskScore - a.riskScore);

  const high = students.filter(s => s.tier === 'high').length;
  const medium = students.filter(s => s.tier === 'medium').length;
  const low = students.filter(s => s.tier === 'low').length;

  const insight = high > 0
    ? `${high} student${high > 1 ? 's are' : ' is'} showing 3+ engagement risk signals simultaneously — historically a strong predictor of course withdrawal. Proactive outreach this week is your highest-leverage action.`
    : medium > 0
    ? `No students are in the high-risk zone this week. ${medium} student${medium > 1 ? 's' : ''} warrant a light check-in — early nudges prevent drift before midterms.`
    : 'Your roster looks healthy this week. All students are engaged and on track. Keep it up!';

  return {
    courseName: courseName || 'Your course',
    weekNumber: weekNumber || '?',
    totalStudents: students.length,
    highRisk: high,
    mediumRisk: medium,
    lowRisk: low,
    students,
    insight,
  };
}

/* ── Input ──────────────────────────────────────────────────────────────── */
const STYLES: { value: CheckInStyle; label: string; desc: string }[] = [
  { value: 'supportive', label: 'Supportive', desc: 'Warm, empathetic tone — meets students where they are' },
  { value: 'direct',     label: 'Direct',     desc: 'Clear and action-oriented — great for advanced students' },
  { value: 'brief',      label: 'Brief',      desc: 'Short check-in — low-pressure, easy to send at scale' },
];

interface InputState {
  roster: string;
  courseName: string;
  weekNumber: string;
  style: CheckInStyle;
}

function InputPanel({
  state, setState, onSubmit, loading,
}: {
  state: InputState;
  setState: (s: InputState) => void;
  onSubmit: () => void;
  loading: boolean;
}) {
  const set = (k: keyof InputState) => (val: string) => setState({ ...state, [k]: val });
  const ready = true; // always allow (will use sample data if empty)

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-xs font-semibold mb-1.5" style={{ color: '#94A3B8' }}>
          STUDENT ROSTER DATA
        </label>
        <p className="text-xs mb-2" style={{ color: '#64748B' }}>
          One student per line: Name, days since login, assignments submitted/total, grade%
        </p>
        <textarea
          rows={7}
          value={state.roster}
          onChange={e => set('roster')(e.target.value)}
          placeholder={`Jordan Martinez, 14, 2/7, 48%\nTaylor Kim, 1, 6/7, 88%\nCasey Brown, 9, 4/7, 62%\n\nLeave blank to use sample data`}
          className="w-full rounded-xl px-4 py-3 text-sm resize-none outline-none font-mono"
          style={{
            background: 'rgba(148,163,184,0.08)',
            border: '1px solid rgba(0,0,0,0.08)',
            color: '#1C1C1E',
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: '#94A3B8' }}>
            COURSE NAME
          </label>
          <input
            type="text"
            value={state.courseName}
            onChange={e => set('courseName')(e.target.value)}
            placeholder="e.g. PSYC 201"
            className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
            style={{
              background: 'rgba(148,163,184,0.08)',
              border: '1px solid rgba(0,0,0,0.08)',
              color: '#1C1C1E',
            }}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: '#94A3B8' }}>
            CURRENT WEEK
          </label>
          <input
            type="text"
            value={state.weekNumber}
            onChange={e => set('weekNumber')(e.target.value)}
            placeholder="e.g. 8"
            className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
            style={{
              background: 'rgba(148,163,184,0.08)',
              border: '1px solid rgba(0,0,0,0.08)',
              color: '#1C1C1E',
            }}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold mb-2" style={{ color: '#94A3B8' }}>
          CHECK-IN STYLE
        </label>
        <div className="flex flex-col gap-2">
          {STYLES.map(s => (
            <button
              key={s.value}
              onClick={() => set('style')(s.value)}
              className="flex items-start gap-3 px-4 py-3 rounded-xl text-left transition-all"
              style={{
                background: state.style === s.value ? TEAL_DIM : 'rgba(148,163,184,0.07)',
                border: `1px solid ${state.style === s.value ? TEAL_BORDER : 'rgba(148,163,184,0.10)'}`,
              }}
            >
              <div
                className="mt-0.5 w-3.5 h-3.5 rounded-full flex-shrink-0 border-2 flex items-center justify-center"
                style={{ borderColor: state.style === s.value ? TEAL : '#64748B' }}
              >
                {state.style === s.value && (
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: TEAL }} />
                )}
              </div>
              <div>
                <p className="text-xs font-semibold" style={{ color: state.style === s.value ? TEAL : '#1C1C1E' }}>
                  {s.label}
                </p>
                <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>{s.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={!ready || loading}
        className="w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
        style={{
          background: !loading ? TEAL : 'rgba(148,163,184,0.10)',
          color: !loading ? '#0A0A0F' : '#64748B',
          cursor: !loading ? 'pointer' : 'not-allowed',
        }}
      >
        {loading ? (
          <><Loader2 size={15} className="animate-spin" /> Analyzing roster…</>
        ) : (
          <><Activity size={15} /> Run Early Warning Scan</>
        )}
      </button>
    </div>
  );
}

/* ── Results ────────────────────────────────────────────────────────────── */
function Results({ result }: { result: WarningResult }) {
  const [activeFilter, setActiveFilter] = useState<RiskTier | 'all'>('all');
  const filtered = activeFilter === 'all'
    ? result.students
    : result.students.filter(s => s.tier === activeFilter);

  const FILTERS: { value: RiskTier | 'all'; label: string; count: number }[] = [
    { value: 'all',    label: 'All',    count: result.totalStudents },
    { value: 'high',   label: 'High',   count: result.highRisk },
    { value: 'medium', label: 'Medium', count: result.mediumRisk },
    { value: 'low',    label: 'On Track', count: result.lowRisk },
  ];

  return (
    <div className="space-y-5">
      {/* Summary header */}
      <div
        className="rounded-2xl p-5 border"
        style={{ background: TEAL_DIM, borderColor: TEAL_BORDER }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Users size={16} style={{ color: TEAL }} />
          <p className="text-sm font-black" style={{ color: TEAL }}>
            {result.courseName} · Week {result.weekNumber}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'High Risk', count: result.highRisk, color: RED },
            { label: 'Medium Risk', count: result.mediumRisk, color: GOLD },
            { label: 'On Track', count: result.lowRisk, color: TEAL },
          ].map(stat => (
            <div
              key={stat.label}
              className="rounded-xl p-3 text-center"
              style={{ background: 'rgba(148,163,184,0.08)' }}
            >
              <p className="text-2xl font-black" style={{ color: stat.color }}>{stat.count}</p>
              <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
            style={{
              background: activeFilter === f.value ? TEAL_DIM : 'rgba(148,163,184,0.08)',
              color: activeFilter === f.value ? TEAL : '#94A3B8',
              border: `1px solid ${activeFilter === f.value ? TEAL_BORDER : 'rgba(148,163,184,0.12)'}`,
            }}
          >
            {f.label}
            <span
              className="px-1.5 py-0.5 rounded-full text-xs"
              style={{ background: 'rgba(0,0,0,0.08)', color: 'inherit' }}
            >
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Student cards */}
      <div className="space-y-3">
        {filtered.map((s, i) => (
          <StudentCard key={i} student={s} />
        ))}
        {filtered.length === 0 && (
          <div
            className="rounded-2xl p-8 border text-center"
            style={{ background: 'rgba(241,243,248,0.80)', borderColor: 'rgba(148,163,184,0.08)' }}
          >
            <UserCheck size={24} style={{ color: TEAL }} className="mx-auto mb-2" />
            <p className="text-xs" style={{ color: '#94A3B8' }}>No students in this tier.</p>
          </div>
        )}
      </div>

      {/* Insight */}
      <div
        className="rounded-2xl p-5 border"
        style={{ background: GOLD_DIM, borderColor: GOLD_BORDER }}
      >
        <div className="flex items-start gap-3">
          <Zap size={15} style={{ color: GOLD, flexShrink: 0, marginTop: 2 }} />
          <div>
            <p className="text-xs font-bold mb-1" style={{ color: GOLD }}>Forge insight</p>
            <p className="text-xs leading-relaxed" style={{ color: '#94A3B8' }}>{result.insight}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────────────────── */
const EMPTY_STATE: InputState = {
  roster: '',
  courseName: '',
  weekNumber: '',
  style: 'supportive',
};

export default function EarlyWarning() {
  const [state, setState] = useState<InputState>(EMPTY_STATE);
  const [result, setResult] = useState<WarningResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit() {
    setLoading(true);
    setResult(null);
    setError('');
    try {
      await new Promise(r => setTimeout(r, 1800));
      setResult(generateMockResult(state.roster, state.courseName, state.weekNumber, state.style));
    } catch {
      setError('Something went wrong. Please try again.');
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
              className="inline-flex items-center gap-1.5 text-xs mb-6 transition-colors hover:opacity-80"
              style={{ color: '#94A3B8' }}
            >
              <ChevronLeft size={14} /> Forge
            </Link>

            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ background: TEAL_DIM, color: TEAL, border: `1px solid ${TEAL_BORDER}` }}
            >
              <AlertTriangle size={11} />
              Early Warning Engine · Beta
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-molted-white tracking-tight">
              See who's slipping before<br />
              <span style={{ color: TEAL }}>they disappear.</span>
            </h1>

            <p className="mt-3 text-molted-muted text-base max-w-lg leading-relaxed">
              Paste your roster engagement data once a week. Forge scores every student,
              surfaces risk signals, and writes check-in messages ready to send.
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 items-start">

            {/* Left: Input */}
            <div
              className="rounded-3xl p-6 border sticky top-24"
              style={{ background: 'rgba(241,243,248,0.90)', borderColor: 'rgba(148,163,184,0.10)' }}
            >
              <InputPanel
                state={state}
                setState={setState}
                onSubmit={handleSubmit}
                loading={loading}
              />
            </div>

            {/* Right: Results */}
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
                  <div className="flex justify-center gap-4 mb-6 opacity-30">
                    {[AlertTriangle, TrendingDown, MessageSquare].map((Icon, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: TEAL_DIM }}
                      >
                        <Icon size={18} style={{ color: TEAL }} />
                      </div>
                    ))}
                  </div>
                  <p className="text-molted-white font-semibold mb-2">Ready to scan</p>
                  <p className="text-molted-muted text-sm max-w-xs mx-auto leading-relaxed">
                    Paste your roster data or leave it blank to see a sample. Forge will
                    tier every student and draft personalized check-ins.
                  </p>
                </div>
              )}

              {loading && (
                <div
                  className="rounded-3xl p-10 border text-center"
                  style={{ background: 'rgba(241,243,248,0.80)', borderColor: TEAL_BORDER }}
                >
                  <Loader2 size={28} style={{ color: TEAL }} className="animate-spin mx-auto mb-4" />
                  <p className="text-molted-white font-semibold mb-1">Scanning roster…</p>
                  <p className="text-molted-muted text-sm">
                    Scoring engagement signals · Tiering students · Drafting check-ins
                  </p>
                </div>
              )}

              {result && <Results result={result} />}
            </div>
          </div>

          {/* Footer CTA */}
          <div
            className="mt-16 rounded-3xl p-8 border text-center"
            style={{ background: 'rgba(241,243,248,0.90)', borderColor: 'rgba(148,163,184,0.10)' }}
          >
            <p className="text-molted-muted text-sm mb-1">This is Forge Early Warning Engine — beta.</p>
            <p className="text-molted-white font-semibold mb-5">
              Next: live sync from Canvas LMS — no manual data export needed.
            </p>
            <a
              href="mailto:greg.lucas@paigebreaker.com"
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
