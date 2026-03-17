import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity, Bot, CheckCircle2, AlertCircle, Clock, Zap,
  Users, TrendingUp, ArrowLeft, RefreshCw, ChevronRight,
  Shield, Cpu, Globe, ArrowRight, Radio, Send, Sparkles,
  TrendingDown, Minus,
} from 'lucide-react';
import { DEPARTMENTS } from './UniversityOS';

// ─── Live Feed Data ─────────────────────────────────────────────────────────

const LIVE_EVENTS = [
  { id: 1,  time: '10:42:18', dept: '🎓', deptName: 'Admissions',        agent: 'Enrollment Concierge AI',  event: 'Responded to 14 prospective student inquiries', type: 'success' },
  { id: 2,  time: '10:42:11', dept: '💛', deptName: 'Student Success',   agent: 'Academic Advisor AI',       event: 'Generated 47 personalized degree plan updates', type: 'success' },
  { id: 3,  time: '10:42:05', dept: '💻', deptName: 'IT',                agent: 'Help Desk AI',              event: 'Resolved password reset for 23 users', type: 'success' },
  { id: 4,  time: '10:41:59', dept: '🔐', deptName: 'IT Security',       agent: 'Security Monitor AI',       event: 'Anomaly detected — VPN login from new location. Flagged for human review.', type: 'warning' },
  { id: 5,  time: '10:41:47', dept: '📣', deptName: 'Marketing',         agent: 'Social Listening AI',       event: 'Brand mention spike on Instagram. Sentiment: 92% positive', type: 'success' },
  { id: 6,  time: '10:41:33', dept: '💰', deptName: 'Finance',           agent: 'Accounts Payable AI',       event: 'Processed 34 vendor invoices, routed 2 for CFO approval', type: 'success' },
  { id: 7,  time: '10:41:21', dept: '🤝', deptName: 'HR',                agent: 'Talent Scout AI',           event: 'Screened 89 applications for 3 open faculty positions', type: 'success' },
  { id: 8,  time: '10:41:08', dept: '📚', deptName: 'Academic Affairs',  agent: 'Curriculum Designer AI',    event: 'Completed accessibility review for 5 course syllabi', type: 'success' },
  { id: 9,  time: '10:40:55', dept: '🌍', deptName: 'Alumni',            agent: 'Donor Relations AI',        event: 'Drafted 12 personalized stewardship letters for major donors', type: 'success' },
  { id: 10, time: '10:40:43', dept: '💛', deptName: 'Student Success',   agent: 'Mental Health Triage AI',   event: 'Escalation to human counselor — student flagged for immediate support', type: 'escalation' },
  { id: 11, time: '10:40:31', dept: '📊', deptName: 'Inst. Research',    agent: 'Accreditation Data AI',     event: 'Collected and formatted HLC data for 7 departments', type: 'success' },
  { id: 12, time: '10:40:19', dept: '🏗️', deptName: 'Facilities',        agent: 'Maintenance AI',            event: 'Dispatched technician for HVAC unit in Wilson Hall', type: 'success' },
  { id: 13, time: '10:40:07', dept: '🎓', deptName: 'Admissions',        agent: 'Scholarship Match AI',      event: 'Matched 7 applicants to newly available scholarship packages', type: 'success' },
  { id: 14, time: '10:39:52', dept: '⚖️', deptName: 'Legal',             agent: 'Privacy & FERPA AI',        event: 'Quarterly FERPA compliance report generated and filed', type: 'success' },
  { id: 15, time: '10:39:44', dept: '⭐', deptName: 'Faculty Dev',       agent: 'PD Coach AI',               event: 'Sent personalized professional development nudges to 148 faculty', type: 'success' },
];

const SYSTEM_HEALTH = [
  { name: 'AI Inference Engine',   status: 'healthy',  latency: '42ms',  uptime: '99.97%' },
  { name: 'Student Data Layer',    status: 'healthy',  latency: '18ms',  uptime: '99.99%' },
  { name: 'Ethics Firewall',       status: 'healthy',  latency: '8ms',   uptime: '100%' },
  { name: 'Human Escalation Bus',  status: 'healthy',  latency: '120ms', uptime: '99.94%' },
  { name: 'Audit & Logging',       status: 'healthy',  latency: '5ms',   uptime: '100%' },
  { name: 'Agent Orchestrator',    status: 'warning',  latency: '210ms', uptime: '99.82%' },
];

const HUMAN_ONCALL = [
  { name: 'Dr. Sarah Chen',     role: 'Chief AI Officer',       status: 'available', avatar: '👩‍💼' },
  { name: 'Tyler Brooks',       role: 'Enrollment Director',    status: 'available', avatar: '🎓' },
  { name: 'Dr. Lisa Park',      role: 'Dean of Students',       status: 'busy',      avatar: '💛' },
  { name: 'Nathan Cruz',        role: 'CTO Support',            status: 'available', avatar: '💻' },
  { name: 'Mei Lin',            role: 'AI Ethicist',            status: 'available', avatar: '🛡️' },
  { name: 'Marcus Williams',    role: 'Provost Support',        status: 'busy',      avatar: '👨‍🎓' },
];

// ─── Components ────────────────────────────────────────────────────────────

function EventRow({ event, index }: { event: typeof LIVE_EVENTS[0]; index: number }) {
  const typeStyles = {
    success:   { dot: 'bg-emerald-500', row: '', badge: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' },
    warning:   { dot: 'bg-amber-500',   row: 'bg-amber-50/50 dark:bg-amber-900/5', badge: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' },
    escalation:{ dot: 'bg-red-500 animate-pulse', row: 'bg-red-50/50 dark:bg-red-900/5', badge: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' },
  };
  const s = typeStyles[event.type as keyof typeof typeStyles];

  return (
    <div className={`flex items-start gap-3 px-4 py-2.5 rounded-lg ${s.row} ${index === 0 ? 'animate-fade-in' : ''}`}>
      <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${s.dot}`} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-mono text-slate-400 dark:text-slate-500 flex-shrink-0">{event.time}</span>
          <span className="text-xs">{event.dept}</span>
          <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${s.badge}`}>{event.agent}</span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">{event.event}</p>
      </div>
      {event.type === 'escalation' && (
        <span className="text-xs font-bold text-red-500 flex-shrink-0 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-full animate-pulse">
          HUMAN NEEDED
        </span>
      )}
      {event.type === 'warning' && (
        <span className="text-xs font-bold text-amber-500 flex-shrink-0">REVIEW</span>
      )}
    </div>
  );
}

function AgentStatusRow({ dept }: { dept: typeof DEPARTMENTS[0] }) {
  const activeCount = dept.agents.filter(a => a.status === 'active').length;
  const pct = Math.round((activeCount / dept.agentCount) * 100);

  return (
    <div
      className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-[#1A1235] transition-colors cursor-pointer group"
    >
      <span className="text-lg flex-shrink-0 w-7 text-center">{dept.emoji}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">{dept.name}</p>
          <span className="text-xs text-slate-400 dark:text-slate-500 flex-shrink-0">{activeCount}/{dept.agentCount}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gcu-purple to-gcu-gold transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 flex-shrink-0">{dept.kpis.tasksToday.toLocaleString()}</span>
        </div>
      </div>
      <ChevronRight size={12} className="text-slate-300 dark:text-slate-600 group-hover:text-gcu-purple transition-colors flex-shrink-0" />
    </div>
  );
}

// ─── Ask the OS ──────────────────────────────────────────────────────────────

const SAMPLE_QUERIES = [
  'How is student retention trending this semester?',
  'Are there any at-risk students I should know about?',
  'What is our admissions pipeline looking like right now?',
  'Give me a board-ready summary of this week\'s performance.',
  'What are the top 3 things needing my attention today?',
];

interface OSResponse {
  answer: string;
  relevantDepts: string[];
  keyMetrics: { label: string; value: string; trend: string }[];
  alerts: string[];
  recommendation: string;
  confidence: string;
  humanNote: string;
}

function AskTheOS() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OSResponse | null>(null);
  const [error, setError] = useState('');

  async function handleAsk() {
    if (!query.trim()) return;
    setLoading(true); setError(''); setResult(null);
    try {
      const res = await fetch('/api/demos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'command-center', query }),
      });
      if (!res.ok) throw new Error(await res.text());
      setResult(await res.json());
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }

  const trendIcon = (t: string) => t === 'up' ? <TrendingUp size={12} className="text-emerald-400" /> : t === 'down' ? <TrendingDown size={12} className="text-red-400" /> : <Minus size={12} className="text-slate-400" />;

  return (
    <div className="page-card p-5 border-l-4 border-gcu-purple">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={15} className="text-gcu-purple dark:text-purple-400" />
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Ask the University OS</h3>
        <span className="text-xs bg-gcu-purple-pale dark:bg-gcu-purple/10 text-gcu-purple dark:text-purple-400 px-2 py-0.5 rounded-full font-semibold">AI</span>
      </div>

      {/* Sample queries */}
      <div className="flex flex-wrap gap-2 mb-3">
        {SAMPLE_QUERIES.map(q => (
          <button key={q} onClick={() => setQuery(q)}
            className="text-xs px-2.5 py-1 rounded-full transition-colors hover:bg-gcu-purple/10 dark:hover:bg-gcu-purple/20"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8' }}>
            {q}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAsk()}
          placeholder="Ask anything about your university..."
          className="flex-1 px-3 py-2 rounded-lg text-sm outline-none dark:bg-[#1A1235] dark:text-white dark:border-slate-700 bg-slate-50 border border-slate-200 text-slate-800"
        />
        <button onClick={handleAsk} disabled={loading || !query.trim()}
          className="px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-all disabled:opacity-40"
          style={{ background: 'linear-gradient(135deg, #4f1d96, #6d28d9)', color: '#fff' }}>
          {loading ? <RefreshCw size={13} className="animate-spin" /> : <Send size={13} />}
          Ask
        </button>
      </div>

      {error && <p className="text-xs text-red-400 mb-3">{error}</p>}

      {loading && (
        <div className="flex items-center gap-2 py-4 text-sm text-slate-400">
          <RefreshCw size={14} className="animate-spin text-gcu-purple" />
          Querying all 15 department pods...
        </div>
      )}

      {result && (
        <div className="space-y-3">
          {/* Main answer */}
          <div className="p-4 rounded-xl bg-gcu-purple-pale dark:bg-gcu-purple/10 border border-gcu-purple/20">
            <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">{result.answer}</p>
          </div>

          {/* Metrics */}
          {result.keyMetrics?.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {result.keyMetrics.map((m, i) => (
                <div key={i} className="p-3 rounded-lg bg-slate-50 dark:bg-[#1A1235] border border-slate-100 dark:border-slate-700 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">{trendIcon(m.trend)}</div>
                  <p className="text-sm font-black text-slate-900 dark:text-white">{m.value}</p>
                  <p className="text-xs text-slate-400 leading-tight mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Alerts */}
          {result.alerts?.length > 0 && (
            <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800">
              <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1 uppercase tracking-widest">Active Alerts</p>
              {result.alerts.map((a, i) => <p key={i} className="text-xs text-amber-700 dark:text-amber-300">• {a}</p>)}
            </div>
          )}

          {/* Recommendation */}
          {result.recommendation && (
            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800">
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1 uppercase tracking-widest">Strategic Recommendation</p>
              <p className="text-xs text-emerald-700 dark:text-emerald-300">{result.recommendation}</p>
            </div>
          )}

          {/* Human note */}
          {result.humanNote && (
            <p className="text-xs text-slate-400 italic">⚠ {result.humanNote}</p>
          )}

          <button onClick={() => { setResult(null); setQuery(''); }}
            className="text-xs text-slate-400 hover:text-slate-600 transition-colors">
            Ask another question →
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main ───────────────────────────────────────────────────────────────────

export default function CommandCenter() {
  const navigate = useNavigate();
  const [tick, setTick] = useState(0);
  const [events, setEvents] = useState(LIVE_EVENTS);

  // Simulate live feed updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
      setEvents(prev => {
        const newEvents = [
          {
            id: Date.now(),
            time: new Date().toTimeString().slice(0, 8),
            dept: ['🎓', '💛', '💻', '📣', '💰', '🤝', '📚', '🌍', '⭐', '🔬'][Math.floor(Math.random() * 10)],
            deptName: ['Admissions', 'Student Success', 'IT', 'Marketing', 'Finance', 'HR', 'Academic Affairs', 'Alumni', 'Faculty Dev', 'Research'][Math.floor(Math.random() * 10)],
            agent: ['Enrollment Concierge AI', 'Academic Advisor AI', 'Help Desk AI', 'Content Creator AI', 'Budget Analyst AI'][Math.floor(Math.random() * 5)],
            event: [
              'Processed 12 new student inquiries with 100% response rate',
              'Updated degree plans for 28 students flagged by early alert system',
              'Resolved 8 help desk tickets — avg resolution time 47 seconds',
              'Published 3 social media posts, engagement tracking active',
              'Monthly variance report delivered to CFO dashboard',
            ][Math.floor(Math.random() * 5)],
            type: Math.random() > 0.9 ? 'warning' : 'success',
          } as typeof LIVE_EVENTS[0],
          ...prev.slice(0, 19),
        ];
        return newEvents;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const totalTasksToday = DEPARTMENTS.reduce((s, d) => s + d.kpis.tasksToday, 0);
  const totalAgents = DEPARTMENTS.reduce((s, d) => s + d.agentCount, 0);
  const activeAgents = DEPARTMENTS.reduce((s, d) => s + d.agents.filter(a => a.status === 'active').length, 0);
  const escalations = 3;

  return (
    <div className="space-y-5 animate-fade-in">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/university-os')}
            className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-gcu-purple transition-colors"
          >
            <ArrowLeft size={14} />
            University OS
          </button>
          <span className="text-slate-300 dark:text-slate-600">/</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-base font-bold text-slate-900 dark:text-white">Live Command Center</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded-lg font-semibold">
            <Radio size={12} className="animate-pulse" />
            Live · updating every 4s
          </div>
          <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1A1235] transition-colors text-slate-400">
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Tasks Completed Today', value: (totalTasksToday + tick * 3).toLocaleString(), icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
          { label: 'Agents Active Now', value: `${activeAgents}/${totalAgents}`, icon: Bot, color: 'text-gcu-purple dark:text-purple-400', bg: 'bg-gcu-purple-pale dark:bg-gcu-purple/10' },
          { label: 'Human Escalations Today', value: `${escalations}`, icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
          { label: 'Avg Response Time', value: '< 3 min', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="page-card p-4 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${bg}`}>
              <Icon size={18} className={color} />
            </div>
            <div>
              <p className="text-lg font-black text-slate-900 dark:text-white leading-tight">{value}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 3-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Live Event Feed — 2 cols */}
        <div className="lg:col-span-2 page-card overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <Activity size={15} className="text-gcu-purple dark:text-purple-400" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Live Agent Event Feed</h2>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <span className="text-xs text-slate-400 dark:text-slate-500">{events.length} events</span>
          </div>
          <div className="p-3 space-y-0.5 max-h-[520px] overflow-y-auto">
            {events.map((ev, i) => (
              <EventRow key={ev.id} event={ev} index={i} />
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">

          {/* Human On-Call */}
          <div className="page-card">
            <div className="flex items-center gap-2 p-4 border-b border-slate-100 dark:border-slate-700">
              <Users size={15} className="text-gcu-purple dark:text-purple-400" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Humans On Call</h2>
              <span className="text-xs bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-semibold">
                {HUMAN_ONCALL.filter(h => h.status === 'available').length} available
              </span>
            </div>
            <div className="p-3 space-y-1">
              {HUMAN_ONCALL.map(person => (
                <div key={person.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-[#1A1235] transition-colors">
                  <span className="text-lg flex-shrink-0">{person.avatar}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">{person.name}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{person.role}</p>
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-medium flex-shrink-0 ${
                    person.status === 'available'
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-amber-600 dark:text-amber-400'
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      person.status === 'available' ? 'bg-emerald-500' : 'bg-amber-500'
                    }`} />
                    {person.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Health */}
          <div className="page-card">
            <div className="flex items-center gap-2 p-4 border-b border-slate-100 dark:border-slate-700">
              <Shield size={15} className="text-gcu-purple dark:text-purple-400" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">System Health</h2>
            </div>
            <div className="p-3 space-y-2">
              {SYSTEM_HEALTH.map(sys => (
                <div key={sys.name} className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    sys.status === 'healthy' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-700 dark:text-slate-300 truncate">{sys.name}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-mono text-slate-500 dark:text-slate-400">{sys.latency}</p>
                    <p className={`text-xs font-semibold ${
                      sys.status === 'healthy' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                    }`}>{sys.uptime}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Department Agent Status Grid */}
      <div className="page-card">
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <Cpu size={15} className="text-gcu-purple dark:text-purple-400" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">All Department Pods</h2>
            <span className="text-xs text-slate-400">— tasks handled today</span>
          </div>
          <button
            onClick={() => navigate('/university-os')}
            className="text-xs text-gcu-purple dark:text-purple-400 font-semibold flex items-center gap-1 hover:gap-2 transition-all"
          >
            Full overview <ArrowRight size={12} />
          </button>
        </div>
        <div className="p-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-1">
          {DEPARTMENTS.map(dept => (
            <AgentStatusRow key={dept.id} dept={dept} />
          ))}
        </div>
      </div>

      {/* Ask the OS */}
      <AskTheOS />

      {/* Ethics & Escalation Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="page-card p-5 border-l-4 border-amber-400">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle size={15} className="text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Today's Human Escalations</h3>
          </div>
          <div className="space-y-3">
            {[
              { dept: '💛 Student Success', agent: 'Mental Health Triage AI', reason: 'Student expressed crisis language — escalated to counselor immediately', time: '10:40', severity: 'high' },
              { dept: '🔐 IT Security',     agent: 'Security Monitor AI',     reason: 'Suspicious login pattern flagged — awaiting CTO review', time: '10:41', severity: 'medium' },
              { dept: '⚖️ Legal',           agent: 'Risk Assessment AI',      reason: 'New FERPA inquiry requires legal counsel interpretation', time: '09:12', severity: 'medium' },
            ].map(esc => (
              <div key={esc.reason} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-[#241D35] border border-slate-100 dark:border-slate-700">
                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${esc.severity === 'high' ? 'bg-red-500 animate-pulse' : 'bg-amber-500'}`} />
                <div>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{esc.dept} · {esc.agent}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{esc.reason}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-600 mt-1">Escalated at {esc.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="page-card p-5 border-l-4 border-gcu-gold">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={15} className="text-gcu-gold" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Today's Peak Moments</h3>
          </div>
          <div className="space-y-3">
            {[
              { emoji: '🎓', highlight: 'Admissions surge',      detail: 'Enrollment Concierge AI handled 847 inquiries in 6 hours — zero dropped', value: '847' },
              { emoji: '🔬', highlight: 'IT security sweep',     detail: 'Security Monitor AI analyzed 8,400 events, flagged 1 for human review', value: '8,400' },
              { emoji: '🌍', highlight: 'Alumni giving campaign', detail: 'Annual Fund AI contacted 1,200 lapsed donors — 14% re-engagement so far', value: '14%' },
              { emoji: '💛', highlight: 'Advising record',       detail: 'Academic Advisor AI completed 1,847 personalized advising interactions', value: '1,847' },
            ].map(peak => (
              <div key={peak.highlight} className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0 mt-0.5">{peak.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{peak.highlight}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{peak.detail}</p>
                </div>
                <span className="text-sm font-black text-gcu-gold flex-shrink-0">{peak.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Global Principle */}
      <div className="page-card p-5 bg-gradient-to-r from-slate-900 to-gcu-purple-dark border-[#2D2050]">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gcu-gold/20 border border-gcu-gold/30 flex items-center justify-center flex-shrink-0 text-xl">✝️</div>
          <div>
            <p className="text-xs font-bold text-gcu-gold uppercase tracking-widest mb-1">The GCU Flourish Standard</p>
            <p className="text-sm font-bold text-white mb-1">Every agent. Every interaction. Every escalation.</p>
            <p className="text-xs text-white/60 leading-relaxed max-w-2xl">
              University OS is governed by the GCU Flourish Standard — 7 ethical principles embedded in every agent's decision layer.
              When in doubt, agents escalate to humans. The goal is never efficiency for efficiency's sake.
              The goal is human flourishing — students, faculty, staff, and community — served with compassion, dignity, and integrity.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {['Human Dignity', 'Transparency', 'Compassion First', 'Stewardship', 'Christ-Centered', 'Always Escalatable', 'Mission-Aligned'].map(p => (
                <span key={p} className="text-xs bg-white/10 text-white/70 px-2 py-0.5 rounded-full">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
