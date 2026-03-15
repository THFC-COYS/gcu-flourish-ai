import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, Bot, TrendingUp, DollarSign, ArrowRight, Zap,
  Building2, GraduationCap, Heart, Megaphone, BookOpen,
  Shield, FlaskConical, Cpu, Wrench, Library, UserCheck,
  Scale, BarChart3, ChevronRight, Activity, CheckCircle2,
  Star, Globe, Sparkles, Clock, AlertCircle
} from 'lucide-react';

// ─── Data ──────────────────────────────────────────────────────────────────

export const DEPARTMENTS = [
  {
    id: 'admissions',
    name: 'Admissions & Enrollment',
    icon: GraduationCap,
    emoji: '🎓',
    color: 'blue',
    humanLead: 'Director of Enrollment',
    agentCount: 5,
    agents: [
      { name: 'Enrollment Concierge AI', role: 'Handles 24/7 inquiries, prospective student Q&A', status: 'active', tasksToday: 847 },
      { name: 'Application Review AI', role: 'Reviews apps, scores completeness, flags edge cases', status: 'active', tasksToday: 312 },
      { name: 'Scholarship Match AI', role: 'Identifies best-fit scholarships per applicant profile', status: 'active', tasksToday: 203 },
      { name: 'Virtual Tour AI', role: 'Guides prospective students through immersive campus tours', status: 'active', tasksToday: 178 },
      { name: 'CRM & Nurture AI', role: 'Personalized follow-up sequences, yield campaign management', status: 'idle', tasksToday: 94 },
    ],
    kpis: { tasksToday: 1634, responseTime: '< 2 min', automationRate: 94, humanEscalations: 18 },
    savings: 420000,
    replaces: '14 FTEs',
    highlight: 'Enrolled 2,847 students this cycle with 94% of touchpoints fully automated.',
  },
  {
    id: 'marketing',
    name: 'Marketing & Brand',
    icon: Megaphone,
    emoji: '📣',
    color: 'pink',
    humanLead: 'VP of Marketing',
    agentCount: 4,
    agents: [
      { name: 'Content Creator AI', role: 'Blogs, social posts, email campaigns, ad copy', status: 'active', tasksToday: 64 },
      { name: 'Campaign Manager AI', role: 'A/B tests, budget optimization, ROAS tracking', status: 'active', tasksToday: 22 },
      { name: 'Social Listening AI', role: 'Brand monitoring, sentiment analysis, real-time response', status: 'active', tasksToday: 1200 },
      { name: 'SEO & Analytics AI', role: 'Keyword strategy, performance reports, competitive tracking', status: 'active', tasksToday: 18 },
    ],
    kpis: { tasksToday: 1304, responseTime: '< 5 min', automationRate: 91, humanEscalations: 6 },
    savings: 380000,
    replaces: '12 FTEs',
    highlight: '340% increase in organic traffic. All social channels running 24/7 with 1 human approver.',
  },
  {
    id: 'academic-affairs',
    name: 'Academic Affairs',
    icon: BookOpen,
    emoji: '📚',
    color: 'purple',
    humanLead: 'Provost Support Officer',
    agentCount: 5,
    agents: [
      { name: 'Curriculum Designer AI', role: 'Designs, revises, and benchmarks course content', status: 'active', tasksToday: 47 },
      { name: 'Schedule Builder AI', role: 'Optimizes class schedules, resolves conflicts', status: 'active', tasksToday: 33 },
      { name: 'Assessment AI', role: 'Designs assessments, rubrics, alignment checks', status: 'active', tasksToday: 89 },
      { name: 'Accreditation AI', role: 'Tracks compliance, formats accreditation reports', status: 'active', tasksToday: 14 },
      { name: 'Faculty Coordinator AI', role: 'Workload balancing, assignments, committee tracking', status: 'idle', tasksToday: 28 },
    ],
    kpis: { tasksToday: 211, responseTime: '< 1 hr', automationRate: 88, humanEscalations: 9 },
    savings: 510000,
    replaces: '17 FTEs',
    highlight: 'Spring semester schedule built in 4 hours. Previously took 3 weeks and 6 coordinators.',
  },
  {
    id: 'student-success',
    name: 'Student Success',
    icon: Heart,
    emoji: '💛',
    color: 'amber',
    humanLead: 'Dean of Students Support Officer',
    agentCount: 6,
    agents: [
      { name: 'Academic Advisor AI', role: 'Degree planning, early alert, check-ins at scale', status: 'active', tasksToday: 1847 },
      { name: 'Financial Aid AI', role: 'FAFSA guidance, packaging, appeals support', status: 'active', tasksToday: 412 },
      { name: 'Mental Health Triage AI', role: 'First-response support, crisis escalation, referrals', status: 'active', tasksToday: 93 },
      { name: 'Career Coach AI', role: 'Resume review, interview prep, job matching', status: 'active', tasksToday: 284 },
      { name: 'Housing & Dining AI', role: 'Applications, room change requests, dining issues', status: 'active', tasksToday: 167 },
      { name: 'Registrar AI', role: 'Transcripts, enrollment verification, grade corrections', status: 'active', tasksToday: 334 },
    ],
    kpis: { tasksToday: 3137, responseTime: '< 3 min', automationRate: 96, humanEscalations: 47 },
    savings: 680000,
    replaces: '23 FTEs',
    highlight: '1 advisor AI handles what 23 traditional advisors did — every student touched weekly.',
  },
  {
    id: 'faculty-development',
    name: 'Faculty Development',
    icon: Star,
    emoji: '⭐',
    color: 'yellow',
    humanLead: 'Chief Learning Officer Support',
    agentCount: 4,
    agents: [
      { name: 'PD Coach AI', role: 'Personalized professional development pathways', status: 'active', tasksToday: 112 },
      { name: 'Instructional Design AI', role: 'Course build support, accessibility reviews', status: 'active', tasksToday: 78 },
      { name: 'Peer Review AI', role: 'Facilitates blind peer observation cycles', status: 'idle', tasksToday: 24 },
      { name: 'Research Support AI', role: 'Grant writing assistance, IRB prep, lit reviews', status: 'active', tasksToday: 56 },
    ],
    kpis: { tasksToday: 270, responseTime: '< 30 min', automationRate: 82, humanEscalations: 11 },
    savings: 290000,
    replaces: '10 FTEs',
    highlight: 'Every faculty member has a personal AI coach that knows their career goals and gaps.',
  },
  {
    id: 'human-resources',
    name: 'Human Resources',
    icon: UserCheck,
    emoji: '🤝',
    color: 'green',
    humanLead: 'Chief People Officer',
    agentCount: 5,
    agents: [
      { name: 'Talent Scout AI', role: 'Job postings, candidate screening, interview scheduling', status: 'active', tasksToday: 234 },
      { name: 'Onboarding AI', role: 'New employee setup, paperwork, system access', status: 'active', tasksToday: 47 },
      { name: 'Benefits Concierge AI', role: '24/7 benefits Q&A, enrollment support', status: 'active', tasksToday: 189 },
      { name: 'Compliance Training AI', role: 'Mandatory training delivery and tracking', status: 'active', tasksToday: 312 },
      { name: 'Employee Relations AI', role: 'Conflict first-response, policy lookup, mediation prep', status: 'idle', tasksToday: 34 },
    ],
    kpis: { tasksToday: 816, responseTime: '< 5 min', automationRate: 89, humanEscalations: 22 },
    savings: 450000,
    replaces: '15 FTEs',
    highlight: 'Onboarding time cut from 2 weeks to 2 days. Benefits questions answered instantly, 24/7.',
  },
  {
    id: 'finance',
    name: 'Finance & Budget',
    icon: DollarSign,
    emoji: '💰',
    color: 'emerald',
    humanLead: 'CFO Support Officer',
    agentCount: 4,
    agents: [
      { name: 'Budget Analyst AI', role: 'Departmental budget tracking, variance alerts', status: 'active', tasksToday: 88 },
      { name: 'Accounts Payable AI', role: 'Invoice processing, approval routing, vendor payments', status: 'active', tasksToday: 342 },
      { name: 'Financial Reporting AI', role: 'Live dashboards, board reports, regulatory filings', status: 'active', tasksToday: 22 },
      { name: 'Audit Prep AI', role: 'Documentation gathering, compliance evidence packages', status: 'idle', tasksToday: 15 },
    ],
    kpis: { tasksToday: 467, responseTime: '< 10 min', automationRate: 92, humanEscalations: 8 },
    savings: 520000,
    replaces: '17 FTEs',
    highlight: 'Month-end close reduced from 10 days to 1.5 days. Zero invoices lost in 6 months.',
  },
  {
    id: 'it',
    name: 'IT & Digital Infrastructure',
    icon: Cpu,
    emoji: '💻',
    color: 'cyan',
    humanLead: 'CTO Support Officer',
    agentCount: 4,
    agents: [
      { name: 'Help Desk AI', role: 'Tier 1-2 support, password resets, troubleshooting', status: 'active', tasksToday: 1247 },
      { name: 'Security Monitor AI', role: 'Threat detection, anomaly alerts, incident response', status: 'active', tasksToday: 8400 },
      { name: 'Systems Admin AI', role: 'User provisioning, access management, patch tracking', status: 'active', tasksToday: 312 },
      { name: 'Data Steward AI', role: 'Data quality, FERPA governance, reporting pipelines', status: 'active', tasksToday: 144 },
    ],
    kpis: { tasksToday: 10103, responseTime: '< 90 sec', automationRate: 97, humanEscalations: 31 },
    savings: 590000,
    replaces: '20 FTEs',
    highlight: '97% of help desk tickets resolved without human intervention. MTTR reduced 80%.',
  },
  {
    id: 'facilities',
    name: 'Facilities & Operations',
    icon: Wrench,
    emoji: '🏗️',
    color: 'orange',
    humanLead: 'Director of Facilities',
    agentCount: 3,
    agents: [
      { name: 'Maintenance AI', role: 'Work order creation, technician dispatch, SLA tracking', status: 'active', tasksToday: 178 },
      { name: 'Space Scheduler AI', role: 'Room reservations, utilization optimization, conflict resolution', status: 'active', tasksToday: 234 },
      { name: 'Vendor Manager AI', role: 'Contract renewals, performance tracking, invoice matching', status: 'active', tasksToday: 44 },
    ],
    kpis: { tasksToday: 456, responseTime: '< 15 min', automationRate: 85, humanEscalations: 19 },
    savings: 310000,
    replaces: '10 FTEs',
    highlight: 'Space utilization improved 34%. Maintenance backlog eliminated in 60 days.',
  },
  {
    id: 'research-library',
    name: 'Research & Library',
    icon: Library,
    emoji: '🔬',
    color: 'indigo',
    humanLead: 'Dean of Research Support',
    agentCount: 3,
    agents: [
      { name: 'Research Navigator AI', role: 'Database searching, citation management, lit reviews', status: 'active', tasksToday: 312 },
      { name: 'Library Concierge AI', role: 'Resource requests, interlibrary loans, reserves setup', status: 'active', tasksToday: 187 },
      { name: 'Grant Writer AI', role: 'Federal/foundation grant drafting and submission support', status: 'active', tasksToday: 28 },
    ],
    kpis: { tasksToday: 527, responseTime: '< 20 min', automationRate: 87, humanEscalations: 14 },
    savings: 260000,
    replaces: '9 FTEs',
    highlight: 'Grant submission rate up 4x. Every student has a 24/7 research librarian AI.',
  },
  {
    id: 'alumni-development',
    name: 'Alumni & Development',
    icon: Globe,
    emoji: '🌍',
    color: 'violet',
    humanLead: 'VP of Development',
    agentCount: 4,
    agents: [
      { name: 'Alumni Engagement AI', role: 'Event invites, newsletter, life milestone recognition', status: 'active', tasksToday: 2847 },
      { name: 'Donor Relations AI', role: 'Major gift cultivation, stewardship calls, proposals', status: 'active', tasksToday: 184 },
      { name: 'Annual Fund AI', role: 'Giving campaigns, lapsed donor re-engagement', status: 'active', tasksToday: 1200 },
      { name: 'Events AI', role: 'Event logistics, registration, follow-up, post-event surveys', status: 'active', tasksToday: 312 },
    ],
    kpis: { tasksToday: 4543, responseTime: '< 5 min', automationRate: 93, humanEscalations: 12 },
    savings: 370000,
    replaces: '12 FTEs',
    highlight: 'Alumni engagement up 210%. Annual fund raised $3.2M with 1 human development officer.',
  },
  {
    id: 'legal-compliance',
    name: 'Legal & Compliance',
    icon: Scale,
    emoji: '⚖️',
    color: 'slate',
    humanLead: 'General Counsel Support',
    agentCount: 3,
    agents: [
      { name: 'Policy AI', role: 'Drafts, reviews, and versions institutional policies', status: 'active', tasksToday: 34 },
      { name: 'Privacy & FERPA AI', role: 'Compliance monitoring, training, breach response', status: 'active', tasksToday: 89 },
      { name: 'Risk Assessment AI', role: 'Identifies institutional risks, flags for legal review', status: 'active', tasksToday: 22 },
    ],
    kpis: { tasksToday: 145, responseTime: '< 2 hr', automationRate: 78, humanEscalations: 4 },
    savings: 280000,
    replaces: '9 FTEs',
    highlight: 'Policy handbook stays current automatically. FERPA incidents down 90%.',
  },
  {
    id: 'institutional-research',
    name: 'Institutional Research',
    icon: BarChart3,
    emoji: '📊',
    color: 'teal',
    humanLead: 'VP of Strategic Planning',
    agentCount: 3,
    agents: [
      { name: 'Survey AI', role: 'Designs, deploys, and analyzes institutional surveys', status: 'active', tasksToday: 147 },
      { name: 'Accreditation Data AI', role: 'Collects and formats SACSCOC/HLC data packages', status: 'active', tasksToday: 88 },
      { name: 'Strategic Planning AI', role: 'Environmental scans, benchmarking, competitive intel', status: 'active', tasksToday: 34 },
    ],
    kpis: { tasksToday: 269, responseTime: '< 1 hr', automationRate: 86, humanEscalations: 7 },
    savings: 240000,
    replaces: '8 FTEs',
    highlight: 'Accreditation self-study written in 3 weeks. Previously 6 months and 4 researchers.',
  },
];

const TOTAL_AGENTS = DEPARTMENTS.reduce((s, d) => s + d.agentCount, 0);
const TOTAL_TASKS_TODAY = DEPARTMENTS.reduce((s, d) => s + d.kpis.tasksToday, 0);
const TOTAL_SAVINGS = DEPARTMENTS.reduce((s, d) => s + d.savings, 0);
const TOTAL_FTES_REPLACED = 176;

const COLOR_MAP: Record<string, { bg: string; border: string; text: string; badge: string; icon: string }> = {
  blue:    { bg: 'bg-blue-50 dark:bg-blue-900/10',    border: 'border-blue-200 dark:border-blue-800',    text: 'text-blue-700 dark:text-blue-300',    badge: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',    icon: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' },
  pink:    { bg: 'bg-pink-50 dark:bg-pink-900/10',    border: 'border-pink-200 dark:border-pink-800',    text: 'text-pink-700 dark:text-pink-300',    badge: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300',    icon: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400' },
  purple:  { bg: 'bg-purple-50 dark:bg-purple-900/10',border: 'border-purple-200 dark:border-purple-800',text: 'text-purple-700 dark:text-purple-300',  badge: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',  icon: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' },
  amber:   { bg: 'bg-amber-50 dark:bg-amber-900/10',  border: 'border-amber-200 dark:border-amber-800',  text: 'text-amber-700 dark:text-amber-300',   badge: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',   icon: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' },
  yellow:  { bg: 'bg-yellow-50 dark:bg-yellow-900/10',border: 'border-yellow-200 dark:border-yellow-800',text: 'text-yellow-700 dark:text-yellow-300',  badge: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',  icon: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' },
  green:   { bg: 'bg-green-50 dark:bg-green-900/10',  border: 'border-green-200 dark:border-green-800',  text: 'text-green-700 dark:text-green-300',   badge: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',   icon: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' },
  emerald: { bg: 'bg-emerald-50 dark:bg-emerald-900/10', border: 'border-emerald-200 dark:border-emerald-800', text: 'text-emerald-700 dark:text-emerald-300', badge: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300', icon: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' },
  cyan:    { bg: 'bg-cyan-50 dark:bg-cyan-900/10',    border: 'border-cyan-200 dark:border-cyan-800',    text: 'text-cyan-700 dark:text-cyan-300',    badge: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300',    icon: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400' },
  orange:  { bg: 'bg-orange-50 dark:bg-orange-900/10',border: 'border-orange-200 dark:border-orange-800',text: 'text-orange-700 dark:text-orange-300',  badge: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',  icon: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' },
  indigo:  { bg: 'bg-indigo-50 dark:bg-indigo-900/10',border: 'border-indigo-200 dark:border-indigo-800',text: 'text-indigo-700 dark:text-indigo-300',  badge: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300',  icon: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' },
  violet:  { bg: 'bg-violet-50 dark:bg-violet-900/10',border: 'border-violet-200 dark:border-violet-800',text: 'text-violet-700 dark:text-violet-300',  badge: 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300',  icon: 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400' },
  slate:   { bg: 'bg-slate-50 dark:bg-slate-800/30',  border: 'border-slate-200 dark:border-slate-700',  text: 'text-slate-700 dark:text-slate-300',   badge: 'bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300',   icon: 'bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400' },
  teal:    { bg: 'bg-teal-50 dark:bg-teal-900/10',    border: 'border-teal-200 dark:border-teal-800',    text: 'text-teal-700 dark:text-teal-300',    badge: 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300',    icon: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400' },
};

// ─── Components ────────────────────────────────────────────────────────────

function DepartmentCard({ dept, onClick }: { dept: typeof DEPARTMENTS[0]; onClick: () => void }) {
  const c = COLOR_MAP[dept.color];
  const Icon = dept.icon;
  const activeAgents = dept.agents.filter(a => a.status === 'active').length;

  return (
    <div
      onClick={onClick}
      className={`page-card p-5 cursor-pointer hover:shadow-card-hover transition-all group border ${c.border} hover:-translate-y-0.5`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${c.icon}`}>
          <Icon size={20} />
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.badge}`}>
            {activeAgents}/{dept.agentCount} active
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">1 human lead</span>
        </div>
      </div>

      <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-0.5 leading-tight">{dept.name}</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{dept.humanLead}</p>

      {/* Agents list */}
      <div className="space-y-1 mb-3">
        {dept.agents.slice(0, 3).map(agent => (
          <div key={agent.name} className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${agent.status === 'active' ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
            <span className="text-xs text-slate-600 dark:text-slate-400 truncate">{agent.name}</span>
          </div>
        ))}
        {dept.agents.length > 3 && (
          <p className="text-xs text-slate-400 dark:text-slate-500 pl-3.5">+{dept.agents.length - 3} more agents</p>
        )}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className={`rounded-lg p-2 ${c.bg}`}>
          <p className="text-xs font-black text-slate-900 dark:text-white">{dept.kpis.tasksToday.toLocaleString()}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">tasks today</p>
        </div>
        <div className={`rounded-lg p-2 ${c.bg}`}>
          <p className="text-xs font-black text-slate-900 dark:text-white">{dept.kpis.automationRate}%</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">automated</p>
        </div>
      </div>

      {/* Savings */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Replaces <span className="font-semibold text-slate-700 dark:text-slate-300">{dept.replaces}</span></p>
          <p className={`text-xs font-bold ${c.text}`}>${(dept.savings / 1000).toFixed(0)}K/yr saved</p>
        </div>
        <ChevronRight size={14} className="text-slate-300 dark:text-slate-600 group-hover:text-gcu-purple transition-colors" />
      </div>
    </div>
  );
}

function HumanTeamMember({ name, role, department, emoji }: { name: string; role: string; department: string; emoji: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#241D35] hover:bg-gcu-purple-pale dark:hover:bg-gcu-purple/10 transition-colors">
      <div className="w-9 h-9 rounded-full bg-gcu-gold/20 border border-gcu-gold/30 flex items-center justify-center text-lg flex-shrink-0">
        {emoji}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{name}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{role}</p>
        <p className="text-xs text-gcu-purple dark:text-purple-400 truncate">{department}</p>
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────

export default function UniversityOS() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'departments' | 'team' | 'economics'>('departments');

  const HUMAN_TEAM = [
    // Executive Layer
    { name: 'Dr. Sarah Chen', role: 'Chief AI Officer', department: 'Executive', emoji: '👩‍💼' },
    { name: 'Marcus Williams', role: 'Provost Support Officer', department: 'Academic Affairs', emoji: '👨‍🎓' },
    { name: 'Priya Sharma', role: 'CFO Support Officer', department: 'Finance', emoji: '👩‍💻' },
    { name: 'James Okonkwo', role: 'Chief People Officer', department: 'HR', emoji: '🤝' },
    { name: 'Elena Rodriguez', role: "President's Chief of Staff", department: 'Executive', emoji: '⭐' },
    // Department Leads
    { name: 'Tyler Brooks', role: 'Director of Enrollment', department: 'Admissions', emoji: '🎓' },
    { name: 'Amara Diallo', role: 'VP of Marketing', department: 'Marketing', emoji: '📣' },
    { name: 'Dr. Lisa Park', role: 'Dean of Students Support', department: 'Student Success', emoji: '💛' },
    { name: 'Nathan Cruz', role: 'CTO Support Officer', department: 'IT & Infrastructure', emoji: '💻' },
    { name: 'Sofia Petrov', role: 'VP of Development', department: 'Alumni & Development', emoji: '🌍' },
    { name: 'David Nakamura', role: 'Director of Facilities', department: 'Facilities', emoji: '🏗️' },
    { name: 'Rachel Kim', role: 'General Counsel Support', department: 'Legal & Compliance', emoji: '⚖️' },
    { name: 'Dr. Ahmed Hassan', role: 'Dean of Research Support', department: 'Research', emoji: '🔬' },
    { name: 'Jennifer Walsh', role: 'VP of Strategic Planning', department: 'Institutional Research', emoji: '📊' },
    // AI Engineering Team
    { name: 'Chris Tanner', role: 'Lead Agent Engineer', department: 'AI Engineering', emoji: '🤖' },
    { name: 'Mei Lin', role: 'AI Ethicist', department: 'AI Engineering', emoji: '🛡️' },
    { name: 'Ryan O\'Brien', role: 'Agent Trainer', department: 'AI Engineering', emoji: '⚙️' },
    { name: 'Fatima Al-Said', role: 'Data Engineer', department: 'AI Engineering', emoji: '📡' },
    { name: 'Greg Hoffman', role: 'Security & Compliance', department: 'AI Engineering', emoji: '🔐' },
    // Quality & Mission
    { name: 'Pastor Michael Torres', role: 'Spirit & Ethics Reviewer', department: 'Mission Integrity', emoji: '✝️' },
    { name: 'Dr. Angela Moore', role: 'Quality Assurance Lead', department: 'Mission Integrity', emoji: '✅' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-gcu-purple-dark to-[#0D0920] p-6 sm:p-8">
        <div className="absolute inset-0 opacity-5">
          <svg viewBox="0 0 1200 300" preserveAspectRatio="none" className="w-full h-full">
            <circle cx="200" cy="150" r="200" fill="#FFC627" />
            <circle cx="800" cy="100" r="150" fill="#4B2E83" />
            <circle cx="1100" cy="200" r="100" fill="#FFC627" />
          </svg>
        </div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-gcu-gold/20 border border-gcu-gold/30 text-gcu-gold text-xs font-semibold px-3 py-1 rounded-full mb-4">
                <Sparkles size={12} />
                University OS — The Future of Higher Education Operations
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white mb-3 leading-tight">
                1 University.<br />
                <span className="text-gcu-gold">30 Humans.</span><br />
                Infinite Impact.
              </h1>
              <p className="text-white/70 text-sm max-w-xl leading-relaxed">
                Every department. Every operation. Every student touchpoint — managed by a lean team of
                mission-driven humans and their AI agent teams. Not replacing compassion. Amplifying it.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => navigate('/university-os/command-center')}
                  className="btn-gold text-xs px-4 py-2 flex items-center gap-1.5"
                >
                  <Activity size={13} /> Live Command Center
                </button>
                <button
                  onClick={() => setActiveTab('economics')}
                  className="border border-white/30 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-1.5"
                >
                  <DollarSign size={13} /> See the Economics
                </button>
              </div>
            </div>

            {/* Stats cluster */}
            <div className="grid grid-cols-2 gap-3 lg:w-72 flex-shrink-0">
              {[
                { value: '30–50', label: 'Human team members', icon: Users, color: 'text-gcu-gold' },
                { value: TOTAL_AGENTS, label: 'AI agents deployed', icon: Bot, color: 'text-purple-300' },
                { value: TOTAL_TASKS_TODAY.toLocaleString(), label: 'Tasks handled today', icon: Zap, color: 'text-emerald-400' },
                { value: `$${(TOTAL_SAVINGS / 1000000).toFixed(1)}M`, label: 'Annual savings', icon: TrendingUp, color: 'text-blue-300' },
              ].map(({ value, label, icon: Icon, color }) => (
                <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <Icon size={16} className={`${color} mb-2`} />
                  <p className="text-xl font-black text-white">{value}</p>
                  <p className="text-xs text-white/50 leading-tight">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* The Comparison */}
      <div className="page-card p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-5">
          <Building2 size={16} className="text-gcu-purple dark:text-purple-400" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Traditional University vs. University OS</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Traditional */}
          <div className="rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-900/10 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <AlertCircle size={16} className="text-red-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Traditional Model</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">3,000+ employees · $180M+ payroll</p>
              </div>
            </div>
            <div className="space-y-2">
              {[
                ['700 Administrative Staff', 'Processing forms, answering emails, scheduling'],
                ['150 Advisors', '1 advisor per 400 students (national avg)'],
                ['80 IT Help Desk', '2-day avg ticket resolution time'],
                ['60 HR Generalists', 'Benefits, recruiting, compliance, payroll'],
                ['45 Finance Staff', 'Month-end close takes 10+ days'],
                ['40 Marketing Team', 'Content production takes weeks'],
                ['35 Facilities Staff', 'Work orders backlog 3–6 weeks'],
                ['2,000+ Faculty & support', 'Overwhelmed, under-resourced'],
              ].map(([role, desc]) => (
                <div key={role} className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{role}: </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* University OS */}
          <div className="rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50 dark:bg-emerald-900/10 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <CheckCircle2 size={16} className="text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">University OS Model</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">30–50 humans · {TOTAL_AGENTS} agents · $8M total cost</p>
              </div>
            </div>
            <div className="space-y-2">
              {[
                ['13 Department Leads', 'Each manages a pod of 3-6 specialized AI agents'],
                [`1 Advisor AI per student`, 'Personalized, 24/7, proactive — not reactive'],
                ['IT Help Desk AI', '97% resolution rate, avg < 90 seconds'],
                ['HR Pod (1 human + 5 agents)', 'Onboarding in 2 days, 24/7 benefits support'],
                ['Finance Pod (1 human + 4 agents)', 'Month-end close in 1.5 days'],
                ['Marketing Pod (1 human + 4 agents)', 'Content publishing 24/7, brand-consistent'],
                ['Facilities Pod (1 human + 3 agents)', 'Zero work order backlog'],
                ['5 Executives + 10 AI Engineers', 'They train, govern, and grow the system'],
              ].map(([role, desc]) => (
                <div key={role} className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 size={10} className="text-emerald-500" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{role}: </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-100 dark:bg-[#1A1235] rounded-xl w-fit">
        {[
          { id: 'departments', label: 'All Departments', icon: Building2 },
          { id: 'team', label: 'The 30-Person Team', icon: Users },
          { id: 'economics', label: 'Economics', icon: DollarSign },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as typeof activeTab)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === id
                ? 'bg-white dark:bg-gcu-purple text-gcu-purple dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Icon size={13} />
            {label}
          </button>
        ))}
      </div>

      {/* Tab: Departments */}
      {activeTab === 'departments' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">All 13 Department Pods</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{TOTAL_AGENTS} agents, each supervised by 1 human lead</p>
            </div>
            <button
              onClick={() => navigate('/university-os/command-center')}
              className="text-xs text-gcu-purple dark:text-purple-400 font-semibold flex items-center gap-1 hover:gap-2 transition-all"
            >
              Command Center <ArrowRight size={12} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {DEPARTMENTS.map(dept => (
              <DepartmentCard
                key={dept.id}
                dept={dept}
                onClick={() => navigate(`/university-os/department/${dept.id}`)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Tab: Team */}
      {activeTab === 'team' && (
        <div className="space-y-5">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1">The 21-Person Core Team</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">These are the humans who make the magic happen. Each one is a force multiplier.</p>
          </div>

          {/* Org layers */}
          {[
            { title: 'Executive Layer', subtitle: '5 humans · University-wide oversight', color: 'gcu-gold', members: HUMAN_TEAM.slice(0, 5) },
            { title: 'Department Leads', subtitle: '9 humans · Each manages a full agent pod', color: 'gcu-purple', members: HUMAN_TEAM.slice(5, 14) },
            { title: 'AI Engineering Team', subtitle: '5 humans · Build, train, and govern all agents', color: 'blue-500', members: HUMAN_TEAM.slice(14, 19) },
            { title: 'Mission & Quality', subtitle: '2 humans · Ethics review, Spirit alignment', color: 'emerald-500', members: HUMAN_TEAM.slice(19) },
          ].map(({ title, subtitle, color, members }) => (
            <div key={title} className="page-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-2 h-2 rounded-full bg-${color}`} />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{title}</h3>
                <span className="text-xs text-slate-400 dark:text-slate-500">— {subtitle}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {members.map(m => (
                  <HumanTeamMember key={m.name} {...m} />
                ))}
              </div>
            </div>
          ))}

          {/* Remaining 9-29 */}
          <div className="page-card p-5 border-dashed border-2 border-gcu-purple/20 dark:border-gcu-purple/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gcu-purple-pale dark:bg-gcu-purple/10 flex items-center justify-center flex-shrink-0">
                <Users size={18} className="text-gcu-purple dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Slots 22–50: Scaling Roles</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg mt-0.5">
                  As the university grows, additional agent trainers, specialized advisors, clinical partners, and mission officers join —
                  but the ratio stays radical: every human multiplied by dozens of AI agents working 24/7.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Economics */}
      {activeTab === 'economics' && (
        <div className="space-y-5">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1">The Economics of University OS</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">What this model costs, what it saves, and where the difference goes.</p>
          </div>

          {/* Big numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Traditional Model Cost', value: '$182M/yr', sub: '3,000 employees avg fully-loaded', color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/40' },
              { label: 'University OS Total Cost', value: '$8.4M/yr', sub: '30-50 humans + all AI infrastructure', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-900/40' },
              { label: 'Annual Reinvestment Potential', value: '$173M/yr', sub: 'Back into students, scholarships, mission', color: 'text-gcu-purple dark:text-purple-400', bg: 'bg-gcu-purple-pale dark:bg-gcu-purple/10 border-gcu-purple/20 dark:border-gcu-purple/30' },
            ].map(({ label, value, sub, color, bg }) => (
              <div key={label} className={`page-card p-5 border ${bg}`}>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">{label}</p>
                <p className={`text-3xl font-black ${color} mb-1`}>{value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{sub}</p>
              </div>
            ))}
          </div>

          {/* Cost breakdown */}
          <div className="page-card p-5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">University OS Cost Breakdown ($8.4M/yr)</h3>
            <div className="space-y-3">
              {[
                { label: 'Human team salaries (30–50 people)', amount: 4200000, pct: 50, color: 'bg-gcu-purple' },
                { label: 'AI infrastructure & compute', amount: 1800000, pct: 21, color: 'bg-blue-500' },
                { label: 'Agent training & fine-tuning', amount: 1200000, pct: 14, color: 'bg-gcu-gold' },
                { label: 'Security, compliance & audit', amount: 720000, pct: 9, color: 'bg-emerald-500' },
                { label: 'Contingency & mission reserve', amount: 480000, pct: 6, color: 'bg-slate-400' },
              ].map(({ label, amount, pct, color }) => (
                <div key={label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 dark:text-slate-400">{label}</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">${(amount / 1000000).toFixed(1)}M <span className="text-slate-400">({pct}%)</span></span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Per-department savings */}
          <div className="page-card p-5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Savings by Department</h3>
            <div className="space-y-2">
              {[...DEPARTMENTS].sort((a, b) => b.savings - a.savings).map(dept => {
                const pct = Math.round((dept.savings / TOTAL_SAVINGS) * 100);
                const c = COLOR_MAP[dept.color];
                return (
                  <div key={dept.id} className="flex items-center gap-3">
                    <span className="text-sm flex-shrink-0 w-6 text-center">{dept.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-600 dark:text-slate-400 truncate">{dept.name}</span>
                        <span className="font-bold text-slate-700 dark:text-slate-300 flex-shrink-0 ml-2">${(dept.savings / 1000).toFixed(0)}K · {dept.replaces}</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${c.icon.replace('bg-', 'bg-').split(' ')[0]}`} style={{ width: `${pct * 3}%`, maxWidth: '100%' }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Total Annual Savings vs. Traditional Model</span>
              <span className="text-sm font-black text-emerald-600">${(TOTAL_SAVINGS / 1000000).toFixed(1)}M</span>
            </div>
          </div>

          {/* Where does the money go */}
          <div className="page-card p-5 border-l-4 border-gcu-gold">
            <div className="flex items-center gap-2 mb-3">
              <Heart size={16} className="text-gcu-gold" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Where the $173M Reinvestment Goes</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { emoji: '🎓', label: 'Full-ride scholarships', value: '$60M', desc: '3,000 students get free tuition annually' },
                { emoji: '🏥', label: 'Student mental health', value: '$25M', desc: 'World-class counseling, zero waitlists' },
                { emoji: '🌍', label: 'Global mission work', value: '$40M', desc: 'Take the flourish model to 5 continents' },
                { emoji: '🔬', label: 'Faculty research grants', value: '$28M', desc: 'Every faculty member funded to discover' },
                { emoji: '🤖', label: 'AI ethics & governance', value: '$12M', desc: 'Setting the global standard for ethical AI' },
                { emoji: '❤️', label: 'Mission reserve', value: '$8M', desc: 'Emergency student assistance, community need' },
              ].map(({ emoji, label, value, desc }) => (
                <div key={label} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#241D35]">
                  <span className="text-2xl flex-shrink-0">{emoji}</span>
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{value} → {label}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div
            className="page-card p-5 flex items-center gap-4 bg-gradient-to-r from-slate-900 to-gcu-purple-dark border-[#2D2050] cursor-pointer hover:shadow-card-hover transition-all group"
            onClick={() => navigate('/university-os/command-center')}
          >
            <div className="w-12 h-12 rounded-xl bg-gcu-gold/20 border border-gcu-gold/30 flex items-center justify-center flex-shrink-0 text-2xl">⚡</div>
            <div className="flex-1">
              <span className="text-xs font-bold text-gcu-gold uppercase tracking-widest">See it live</span>
              <p className="text-sm font-bold text-white mt-0.5">Open the Live Command Center</p>
              <p className="text-xs text-slate-400 mt-0.5">Watch all {TOTAL_AGENTS} agents working in real time across all 13 departments.</p>
            </div>
            <div className="flex items-center gap-1 text-gcu-gold group-hover:gap-2 transition-all">
              <span className="text-xs font-semibold hidden sm:block">Open</span>
              <ArrowRight size={16} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
