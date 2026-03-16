import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Bot, Users, CheckCircle2, Clock, Zap,
  MessageSquare, TrendingUp, Shield, ChevronRight, Send,
  Activity, AlertCircle, BarChart3, Settings
} from 'lucide-react';
import { DEPARTMENTS } from './UniversityOS';

const COLOR_MAP: Record<string, { bg: string; border: string; text: string; badge: string; icon: string; gradient: string }> = {
  blue:    { bg: 'bg-blue-50 dark:bg-blue-900/10',    border: 'border-blue-200 dark:border-blue-800',    text: 'text-blue-700 dark:text-blue-300',    badge: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',    icon: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',    gradient: 'from-blue-600 to-blue-800' },
  pink:    { bg: 'bg-pink-50 dark:bg-pink-900/10',    border: 'border-pink-200 dark:border-pink-800',    text: 'text-pink-700 dark:text-pink-300',    badge: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300',    icon: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400',    gradient: 'from-pink-600 to-pink-800' },
  purple:  { bg: 'bg-purple-50 dark:bg-purple-900/10',border: 'border-purple-200 dark:border-purple-800',text: 'text-purple-700 dark:text-purple-300',  badge: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',  icon: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',  gradient: 'from-purple-600 to-purple-900' },
  amber:   { bg: 'bg-amber-50 dark:bg-amber-900/10',  border: 'border-amber-200 dark:border-amber-800',  text: 'text-amber-700 dark:text-amber-300',   badge: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',   icon: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',   gradient: 'from-amber-500 to-amber-700' },
  yellow:  { bg: 'bg-yellow-50 dark:bg-yellow-900/10',border: 'border-yellow-200 dark:border-yellow-800',text: 'text-yellow-700 dark:text-yellow-300',  badge: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',  icon: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',  gradient: 'from-yellow-500 to-yellow-700' },
  green:   { bg: 'bg-green-50 dark:bg-green-900/10',  border: 'border-green-200 dark:border-green-800',  text: 'text-green-700 dark:text-green-300',   badge: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',   icon: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',   gradient: 'from-green-600 to-green-800' },
  emerald: { bg: 'bg-emerald-50 dark:bg-emerald-900/10', border: 'border-emerald-200 dark:border-emerald-800', text: 'text-emerald-700 dark:text-emerald-300', badge: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300', icon: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400', gradient: 'from-emerald-600 to-emerald-800' },
  cyan:    { bg: 'bg-cyan-50 dark:bg-cyan-900/10',    border: 'border-cyan-200 dark:border-cyan-800',    text: 'text-cyan-700 dark:text-cyan-300',    badge: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300',    icon: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400',    gradient: 'from-cyan-600 to-cyan-800' },
  orange:  { bg: 'bg-orange-50 dark:bg-orange-900/10',border: 'border-orange-200 dark:border-orange-800',text: 'text-orange-700 dark:text-orange-300',  badge: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',  icon: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',  gradient: 'from-orange-500 to-orange-700' },
  indigo:  { bg: 'bg-indigo-50 dark:bg-indigo-900/10',border: 'border-indigo-200 dark:border-indigo-800',text: 'text-indigo-700 dark:text-indigo-300',  badge: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300',  icon: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',  gradient: 'from-indigo-600 to-indigo-800' },
  violet:  { bg: 'bg-violet-50 dark:bg-violet-900/10',border: 'border-violet-200 dark:border-violet-800',text: 'text-violet-700 dark:text-violet-300',  badge: 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300',  icon: 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400',  gradient: 'from-violet-600 to-violet-900' },
  slate:   { bg: 'bg-slate-50 dark:bg-slate-800/30',  border: 'border-slate-200 dark:border-slate-700',  text: 'text-slate-700 dark:text-slate-300',   badge: 'bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300',   icon: 'bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400',   gradient: 'from-slate-600 to-slate-800' },
  teal:    { bg: 'bg-teal-50 dark:bg-teal-900/10',    border: 'border-teal-200 dark:border-teal-800',    text: 'text-teal-700 dark:text-teal-300',    badge: 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300',    icon: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400',    gradient: 'from-teal-600 to-teal-800' },
};

// Per-department mock Q&A
const DEPT_CHAT: Record<string, { q: string; a: string }[]> = {
  admissions: [
    { q: 'How many applications came in today?', a: 'We received 312 new applications today. Enrollment Concierge AI has processed 298 and flagged 14 for manual review due to incomplete transcripts. Average processing time is 4.2 minutes per application.' },
    { q: 'What is our yield rate this cycle?', a: 'Current yield rate is 38.4%, up from 31.2% last cycle. The CRM & Nurture AI personalized follow-up sequences are the primary driver — students who received 3+ touchpoints enrolled at 64% yield vs. 28% for those with 0–1 touchpoints.' },
  ],
  'student-success': [
    { q: 'How many at-risk students were flagged this week?', a: 'Academic Advisor AI flagged 147 students in the early alert system this week — 89 for academic performance dips, 41 for missed advising appointments, and 17 for financial holds. I\'ve automatically assigned outreach tasks to relevant support staff.' },
    { q: 'What is our mental health escalation protocol?', a: 'Mental Health Triage AI follows a 3-tier protocol: (1) Supportive first response and resource sharing for mild distress, (2) Appointment scheduling with a counselor for moderate distress within 24 hrs, (3) Immediate human escalation for crisis language or safety concerns. Today we had 1 Tier-3 escalation at 10:40 AM — counselor was notified within 90 seconds.' },
  ],
  finance: [
    { q: 'Where do we stand on this month\'s budget?', a: 'We are 94.2% through the month with 91.7% of budget utilized — tracking $180K under budget. Largest variance is Facilities ($47K under) due to deferred equipment purchases. I\'ve flagged 2 invoices totaling $23,400 that require your approval before EOD.' },
    { q: 'When will month-end close be complete?', a: 'Based on current data pipeline status, month-end close will complete in approximately 14 hours — targeting tomorrow at 9 AM. This is 8.5 days faster than our pre-University OS average. All 13 departmental reconciliations are running in parallel.' },
  ],
  it: [
    { q: 'What is our current security posture?', a: 'Current threat level: LOW. Security Monitor AI has analyzed 8,400 events today, flagged 1 anomaly (suspicious VPN login — awaiting your review), and blocked 34 automated scan attempts. All critical systems are patched. Last vulnerability scan: 6 hours ago. No known active threats.' },
    { q: 'How is the help desk performing?', a: 'Help Desk AI has resolved 1,247 tickets today with an average resolution time of 47 seconds. Escalation rate to human staff: 2.5% (31 tickets). Most common issues: password resets (34%), VPN configuration (18%), software access requests (12%). CSAT score from automated follow-up surveys: 4.7/5.' },
  ],
};

const DEFAULT_CHATS = [
  { q: 'What are the top priorities for this department today?', a: 'Good morning! Based on your department\'s current data, the top priorities are: (1) 3 items flagged for your personal review and approval, (2) A weekly status report ready for your signature, and (3) One pending escalation from an AI agent that requires human judgment. Would you like me to walk you through each?' },
  { q: 'Give me a quick performance summary', a: 'Your department agents completed ' + Math.floor(Math.random() * 500 + 100) + ' tasks today with a 91% automation rate. Human escalations are down 18% from last week. Your agents are operating within ethical parameters — all responses have been reviewed by the Ethics Firewall. Overall department health: Excellent.' },
];

type ChatMessage = { role: 'user' | 'agent'; text: string };

export default function DepartmentConsole() {
  const { deptId } = useParams<{ deptId: string }>();
  const navigate = useNavigate();
  const [activeAgent, setActiveAgent] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'agent', text: 'Hello! I\'m your Department Lead AI — I coordinate all agents in this pod and serve as your single point of contact. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState<'agents' | 'tasks' | 'chat' | 'analytics'>('agents');

  const dept = DEPARTMENTS.find(d => d.id === deptId);

  if (!dept) {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 text-slate-400">
        <Bot size={40} className="mb-3 opacity-30" />
        <p className="text-sm font-semibold">Department not found.</p>
        <button onClick={() => navigate('/university-os')} className="mt-3 text-xs text-gcu-purple hover:underline">
          Back to University OS
        </button>
      </div>
    );
  }

  const c = COLOR_MAP[dept.color];
  const Icon = dept.icon;
  const deptChats = DEPT_CHAT[deptId ?? ''] ?? DEFAULT_CHATS;

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput('');
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);

    // Find a matching response
    const match = deptChats.find(c => userMsg.toLowerCase().includes(c.q.toLowerCase().split(' ').slice(0, 3).join(' ')));
    const response = match?.a ?? `Processing your request... Based on current department data, I can confirm that all ${dept.agentCount} agents are operating normally. For specific queries, I'm pulling data from our live systems. Is there a particular area you'd like me to focus on — agent performance, pending tasks, or department analytics?`;

    setTimeout(() => {
      setChatMessages(prev => [...prev, { role: 'agent', text: response }]);
    }, 800);
  };

  return (
    <div className="space-y-5 animate-fade-in">

      {/* Breadcrumb + header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => navigate('/university-os')}
            className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-gcu-purple transition-colors"
          >
            <ArrowLeft size={12} />
            University OS
          </button>
          <span className="text-slate-300 dark:text-slate-600">/</span>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{dept.emoji} {dept.name}</span>
        </div>
        <button className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
          <Settings size={13} />
          Configure
        </button>
      </div>

      {/* Department Hero */}
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${c.gradient} p-5 sm:p-6`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-3xl flex-shrink-0">
              {dept.emoji}
            </div>
            <div>
              <h1 className="text-xl font-black text-white">{dept.name}</h1>
              <p className="text-white/70 text-sm">Supervised by: <span className="text-white font-semibold">{dept.humanLead}</span></p>
              <p className="text-white/50 text-xs mt-0.5">{dept.agentCount} AI agents · 1 human lead · {dept.kpis.automationRate}% automated</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { label: 'Tasks Today', value: dept.kpis.tasksToday.toLocaleString() },
              { label: 'Response Time', value: dept.kpis.responseTime },
              { label: 'Escalations', value: dept.kpis.humanEscalations },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-center">
                <p className="text-lg font-black text-white leading-tight">{value}</p>
                <p className="text-xs text-white/50">{label}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Highlight bar */}
        <div className="mt-4 p-3 bg-white/10 border border-white/10 rounded-xl">
          <p className="text-xs text-white/90 leading-relaxed">
            <span className="font-bold text-white">Today's highlight:</span> {dept.highlight}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-100 dark:bg-[#1A1235] rounded-xl w-fit flex-wrap">
        {[
          { id: 'agents',    label: 'Agent Roster', icon: Bot },
          { id: 'tasks',     label: 'Task Queue',   icon: CheckCircle2 },
          { id: 'chat',      label: 'Chat with Pod', icon: MessageSquare },
          { id: 'analytics', label: 'Analytics',    icon: BarChart3 },
        ].map(({ id, label, icon: TabIcon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as typeof activeTab)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === id
                ? 'bg-white dark:bg-gcu-purple text-gcu-purple dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <TabIcon size={12} />
            {label}
          </button>
        ))}
      </div>

      {/* Tab: Agents */}
      {activeTab === 'agents' && (
        <div className="space-y-3">
          {dept.agents.map((agent, i) => (
            <div
              key={agent.name}
              className={`page-card p-4 cursor-pointer transition-all ${activeAgent === i ? `border-2 ${c.border}` : 'hover:shadow-card-hover'}`}
              onClick={() => setActiveAgent(activeAgent === i ? null : i)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${c.icon}`}>
                    <Bot size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">{agent.name}</h3>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        agent.status === 'active'
                          ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
                          : 'bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400'
                      }`}>
                        {agent.status === 'active' ? '● Active' : '○ Idle'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{agent.role}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-lg font-black text-slate-900 dark:text-white">{agent.tasksToday.toLocaleString()}</p>
                  <p className="text-xs text-slate-400">tasks today</p>
                </div>
              </div>

              {activeAgent === i && (
                <div className={`mt-4 p-4 rounded-xl ${c.bg} border ${c.border} space-y-3`}>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Uptime', value: '99.9%' },
                      { label: 'Avg Latency', value: '1.4s' },
                      { label: 'Ethical Score', value: '97%' },
                    ].map(({ label, value }) => (
                      <div key={label} className="text-center">
                        <p className={`text-base font-black ${c.text}`}>{value}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Last 5 completed tasks:</p>
                    <div className="space-y-1">
                      {[
                        'Processed incoming request and generated response (0.8s)',
                        'Ethics firewall check passed — response delivered',
                        'Escalation evaluation: No escalation required',
                        'Task logged to department audit trail',
                        'User satisfaction follow-up queued',
                      ].map((task, ti) => (
                        <div key={ti} className="flex items-center gap-2">
                          <CheckCircle2 size={10} className="text-emerald-500 flex-shrink-0" />
                          <span className="text-xs text-slate-500 dark:text-slate-400">{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${c.badge} flex items-center gap-1`}>
                      <Activity size={11} /> View Full Logs
                    </button>
                    <button className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400 flex items-center gap-1">
                      <Settings size={11} /> Configure Agent
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Human lead card */}
          <div className="page-card p-4 border-2 border-gcu-gold/30 bg-gcu-gold-pale dark:bg-gcu-gold/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gcu-gold/20 border border-gcu-gold/30 flex items-center justify-center flex-shrink-0">
                <Users size={18} className="text-gcu-gold-dark" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">{dept.humanLead}</h3>
                  <span className="text-xs bg-gcu-gold/20 text-gcu-gold-dark dark:text-gcu-gold px-2 py-0.5 rounded-full font-bold">Human Lead</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Approves escalations · Sets agent priorities · Makes judgment calls · Guardian of department ethics
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                Available
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Tasks */}
      {activeTab === 'tasks' && (
        <div className="space-y-3">
          <div className="page-card p-5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Live Task Queue</h3>
            <div className="space-y-2">
              {[
                { agent: dept.agents[0]?.name ?? 'Agent', task: 'Processing 12 incoming requests from the web portal', status: 'running', priority: 'normal', started: '2 min ago' },
                { agent: dept.agents[1 % dept.agents.length]?.name ?? 'Agent', task: 'Generating weekly summary report for human lead', status: 'running', priority: 'normal', started: '5 min ago' },
                { agent: dept.agents[2 % dept.agents.length]?.name ?? 'Agent', task: 'Reviewing and categorizing 47 new items in queue', status: 'running', priority: 'high', started: '8 min ago' },
                { agent: dept.agents[0]?.name ?? 'Agent', task: 'Flagged item — awaiting human approval before proceeding', status: 'waiting', priority: 'high', started: '12 min ago' },
                { agent: dept.agents[1 % dept.agents.length]?.name ?? 'Agent', task: 'Preparing data export for accreditation review', status: 'queued', priority: 'low', started: 'Queued' },
              ].map((task, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#241D35] border border-slate-100 dark:border-slate-700">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${
                    task.status === 'running' ? 'bg-emerald-500 animate-pulse' :
                    task.status === 'waiting' ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-600'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${c.badge}`}>{task.agent}</span>
                      {task.priority === 'high' && (
                        <span className="text-xs bg-red-50 dark:bg-red-900/20 text-red-500 px-1.5 py-0.5 rounded font-semibold">HIGH</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{task.task}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-600 mt-0.5">{task.started}</p>
                  </div>
                  <span className={`text-xs font-medium flex-shrink-0 ${
                    task.status === 'running' ? 'text-emerald-500' :
                    task.status === 'waiting' ? 'text-amber-500' : 'text-slate-400'
                  }`}>{task.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="page-card p-5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Pending Human Approvals</h3>
            {dept.kpis.humanEscalations > 0 ? (
              <div className="space-y-2">
                {Array.from({ length: Math.min(dept.kpis.humanEscalations, 3) }, (_, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30">
                    <AlertCircle size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">Agent reached policy boundary — needs your judgment</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {dept.agents[i % dept.agents.length]?.name} encountered a case outside its decision authority. Review and approve or redirect.
                      </p>
                    </div>
                    <div className="flex gap-1.5">
                      <button className="text-xs font-semibold px-2 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded">Approve</button>
                      <button className="text-xs font-semibold px-2 py-1 bg-red-50 dark:bg-red-900/20 text-red-500 rounded">Redirect</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-slate-400">
                <CheckCircle2 size={24} className="mx-auto mb-2 text-emerald-500" />
                <p className="text-sm font-semibold">No pending approvals</p>
                <p className="text-xs">All agents operating within authority bounds</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab: Chat */}
      {activeTab === 'chat' && (
        <div className="page-card overflow-hidden flex flex-col" style={{ height: '520px' }}>
          <div className={`flex items-center gap-3 p-4 border-b border-slate-100 dark:border-slate-700 ${c.bg}`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${c.icon}`}>
              <Icon size={16} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{dept.name} — Department Lead AI</p>
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Online · All {dept.agentCount} agents reporting
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'agent' && (
                  <div className={`w-6 h-6 rounded-full mr-2 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs ${c.icon}`}>
                    <Bot size={12} />
                  </div>
                )}
                <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-gcu-purple text-white rounded-tr-sm'
                    : `${c.bg} border ${c.border} text-slate-700 dark:text-slate-300 rounded-tl-sm`
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Suggested prompts */}
          <div className="px-4 pb-2">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {deptChats.map(({ q }) => (
                <button
                  key={q}
                  onClick={() => { setInput(q); }}
                  className={`text-xs px-3 py-1.5 rounded-full flex-shrink-0 ${c.badge} hover:opacity-80 transition-opacity`}
                >
                  {q.length > 35 ? q.slice(0, 35) + '…' : q}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-3 border-t border-slate-100 dark:border-slate-700 flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder={`Ask the ${dept.name} pod anything...`}
              className="flex-1 text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#241D35] text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gcu-purple/30"
            />
            <button
              onClick={handleSend}
              className="w-8 h-8 rounded-xl bg-gcu-purple flex items-center justify-center text-white hover:bg-gcu-purple-dark transition-colors flex-shrink-0"
            >
              <Send size={13} />
            </button>
          </div>
        </div>
      )}

      {/* Tab: Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-4">
          {/* 7-day trend (simulated) */}
          <div className="page-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={15} className={c.text.split(' ')[0]} />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">7-Day Task Volume</h3>
            </div>
            <div className="flex items-end gap-1 h-24">
              {[72, 89, 95, 88, 100, 94, dept.kpis.automationRate].map((pct, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-t-sm" style={{ height: `${pct}%`, background: `linear-gradient(to top, var(--tw-gradient-stops))` }}>
                    <div className={`w-full h-full rounded-t-sm ${c.icon.split(' ')[0]}`} />
                  </div>
                  <span className="text-xs text-slate-400">{['M', 'T', 'W', 'T', 'F', 'S', 'Su'][i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Tasks Today', value: dept.kpis.tasksToday.toLocaleString(), icon: Zap, sub: 'vs 612 yesterday' },
              { label: 'Automation Rate', value: `${dept.kpis.automationRate}%`, icon: Bot, sub: 'Target: 90%' },
              { label: 'Avg Response', value: dept.kpis.responseTime, icon: Clock, sub: 'SLA: met' },
              { label: 'Escalations', value: dept.kpis.humanEscalations, icon: AlertCircle, sub: 'This week' },
            ].map(({ label, value, icon: KIcon, sub }) => (
              <div key={label} className={`rounded-xl p-4 border ${c.bg} ${c.border}`}>
                <KIcon size={14} className={`${c.text} mb-2`} />
                <p className="text-xl font-black text-slate-900 dark:text-white">{value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
                <p className="text-xs text-slate-400 dark:text-slate-600 mt-0.5">{sub}</p>
              </div>
            ))}
          </div>

          {/* Ethics metrics */}
          <div className="page-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Shield size={15} className="text-gcu-purple dark:text-purple-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Ethics & Compliance Metrics</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Responses within ethical guardrails', value: 99.7, color: 'bg-emerald-500' },
                { label: 'Bias audit score (last review)', value: 96, color: 'bg-gcu-purple' },
                { label: 'Transparency disclosure compliance', value: 100, color: 'bg-gcu-gold' },
                { label: 'Human escalation accuracy', value: 94, color: 'bg-blue-500' },
              ].map(({ label, value, color }) => (
                <div key={label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 dark:text-slate-400">{label}</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{value}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cost savings */}
          <div className={`page-card p-5 border-l-4 ${c.border}`}>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Department Cost Impact</p>
            <p className="text-3xl font-black text-slate-900 dark:text-white mb-1">${(dept.savings / 1000).toFixed(0)}K<span className="text-base font-semibold text-slate-400">/year saved</span></p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              This pod replaces <span className={`font-bold ${c.text}`}>{dept.replaces}</span> with 1 human and {dept.agentCount} AI agents working 24/7.
            </p>
            <div className="mt-3 flex items-center gap-3">
              <div className={`flex-1 p-3 rounded-xl ${c.bg} text-center`}>
                <p className="text-sm font-black text-slate-900 dark:text-white">$8.4M</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Pod annual cost</p>
              </div>
              <ChevronRight size={16} className="text-slate-300" />
              <div className="flex-1 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 text-center">
                <p className="text-sm font-black text-emerald-600">${(dept.savings / 1000).toFixed(0)}K</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Net savings</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
