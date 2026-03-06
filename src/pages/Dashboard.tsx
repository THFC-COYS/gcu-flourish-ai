import { useNavigate } from 'react-router-dom';
import {
  TrendingUp, Users, FlaskConical, CheckCircle2,
  ArrowRight, Clock, Sparkles, Heart, Rocket,
  Zap, Star, Globe
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { MOCK_PROTOTYPES, MOCK_ACTIVITY } from '../data/mockData';
import PrototypeCard from '../components/PrototypeCard';
import { RoleBadge } from '../components/ui/Badge';

const COLLEGE_COUNTS = {
  total: MOCK_PROTOTYPES.length,
  pilots: MOCK_PROTOTYPES.filter(p => p.status === 'pilot').length,
  deployed: MOCK_PROTOTYPES.filter(p => p.status === 'deployed').length,
  studentsReached: MOCK_PROTOTYPES.reduce((s, p) => s + p.metrics.usersReached, 0),
  avgEthical: Math.round(MOCK_PROTOTYPES.reduce((s, p) => s + p.metrics.ethicalAlignmentScore, 0) / MOCK_PROTOTYPES.length),
};

const IMPACT_TICKER = [
  { value: '34,100+', label: 'Interactions this month', icon: Zap, color: 'text-gcu-gold' },
  { value: '94%', label: 'Avg ethical alignment', icon: CheckCircle2, color: 'text-emerald-500' },
  { value: '5', label: 'Active partnerships', icon: Globe, color: 'text-blue-500' },
  { value: '12', label: 'Scholarships funded', icon: Star, color: 'text-pink-500' },
];

function StatCard({ icon, label, value, sub, color }: {
  icon: React.ReactNode; label: string; value: string | number; sub?: string; color: string;
}) {
  return (
    <div className="stat-card flex gap-4 items-start">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-black text-slate-900 dark:text-white">{value}</p>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{label}</p>
        {sub && <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function timeAgo(ts: string) {
  const diff = Date.now() - new Date(ts).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 1) return 'Just now';
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const firstName = user?.name.split(' ')[0] ?? 'Scholar';
  const featuredProtos = MOCK_PROTOTYPES.filter(p => p.status !== 'prototype').slice(0, 2);

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-2xl purple-gradient p-6 sm:p-8">
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 800 200" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,200 Q200,60 400,100 Q600,140 800,60 L800,200 Z" fill="#FFC627" />
          </svg>
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-gcu-gold/20 border border-gcu-gold/30 text-gcu-gold text-xs font-semibold px-3 py-1 rounded-full mb-3">
              <Sparkles size={12} />
              GCU Flourish AI · World-Class Ethical AI Platform
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">
              {greeting}, {firstName}! 👋
            </h1>
            <p className="text-white/70 text-sm max-w-lg leading-relaxed">
              Infusing the Spirit of GCU Graduates to Promote Human Flourishing Through Ethical AI.
            </p>
            <div className="mt-2">
              <RoleBadge role={user?.role ?? 'viewer'} />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <button onClick={() => navigate('/library')} className="btn-gold text-xs px-4 py-2 flex items-center gap-1.5">
              <Heart size={13} /> Spirit Vessels
            </button>
            <button onClick={() => navigate('/vision')} className="border border-white/30 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-1.5">
              <Rocket size={13} /> See the Vision
            </button>
          </div>
        </div>
      </div>

      {/* Impact ticker */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {IMPACT_TICKER.map(({ value, label, icon: Icon, color }) => (
          <div key={label} className="page-card p-4 flex items-center gap-3">
            <Icon size={18} className={`${color} flex-shrink-0`} />
            <div>
              <p className="text-lg font-black text-slate-900 dark:text-white leading-tight">{value}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Global Impact Counter */}
      <div className="page-card p-5 border-l-4 border-gcu-gold">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Globe size={16} className="text-gcu-gold" />
              <span className="text-xs font-bold text-gcu-gold uppercase tracking-widest">Global Impact Goal</span>
              <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-semibold px-2 py-0.5 rounded-full">Simulated</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">10,000,000 Interactions</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Lives touched by GCU Spirit Vessels worldwide</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-3xl font-black text-gcu-purple dark:text-purple-300">487,219</p>
            <p className="text-xs text-slate-400 dark:text-slate-500">interactions to date</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Progress to 10M goal</span>
            <span className="font-bold text-gcu-purple dark:text-purple-300">4.87%</span>
          </div>
          <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gcu-purple to-gcu-gold transition-all duration-1000"
              style={{ width: '4.87%' }}
            />
          </div>
          <div className="grid grid-cols-3 gap-3 pt-1">
            {[
              { value: '12', label: 'Countries reached', icon: '🌍' },
              { value: '847', label: 'Alumni contributors', icon: '❤️' },
              { value: '$2.1M', label: 'Revenue reinvested', icon: '💰' },
            ].map(({ value, label, icon }) => (
              <div key={label} className="text-center p-2 bg-slate-50 dark:bg-[#1A1235] rounded-lg">
                <p className="text-base font-black text-slate-900 dark:text-white">{icon} {value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={<FlaskConical size={20} className="text-gcu-purple" />}
          label="Spirit Vessels"
          value={COLLEGE_COUNTS.total}
          sub="Across all 10 GCU colleges"
          color="bg-gcu-purple-pale dark:bg-gcu-purple/10"
        />
        <StatCard
          icon={<TrendingUp size={20} className="text-blue-600" />}
          label="Active Pilots"
          value={COLLEGE_COUNTS.pilots}
          sub={`${COLLEGE_COUNTS.deployed} fully deployed`}
          color="bg-blue-50 dark:bg-blue-900/20"
        />
        <StatCard
          icon={<Users size={20} className="text-emerald-600" />}
          label="People Reached"
          value={COLLEGE_COUNTS.studentsReached.toLocaleString()}
          sub="Students, faculty & partners"
          color="bg-emerald-50 dark:bg-emerald-900/20"
        />
        <StatCard
          icon={<CheckCircle2 size={20} className="text-gcu-gold-dark" />}
          label="Ethical Alignment"
          value={`${COLLEGE_COUNTS.avgEthical}%`}
          sub="Average across all prototypes"
          color="bg-gcu-gold-pale dark:bg-gcu-gold/10"
        />
      </div>

      {/* Phase 2 teaser */}
      <div
        className="page-card p-5 flex items-center gap-4 bg-gradient-to-r from-slate-900 to-gcu-purple-dark border-[#2D2050] cursor-pointer hover:shadow-card-hover transition-all group"
        onClick={() => navigate('/vision')}
      >
        <div className="w-12 h-12 rounded-xl bg-gcu-gold/20 border border-gcu-gold/30 flex items-center justify-center flex-shrink-0 text-2xl">🤖</div>
        <div className="flex-1">
          <span className="text-xs font-bold text-gcu-gold uppercase tracking-widest">Coming 2027 — Phase 2</span>
          <p className="text-sm font-bold text-white mt-0.5">Spirit Vessels get bodies.</p>
          <p className="text-xs text-slate-400 mt-0.5">The world's most compassionate robots, powered by GCU character. Nursing, education, pastoral care.</p>
        </div>
        <div className="flex items-center gap-1 text-gcu-gold group-hover:gap-2 transition-all">
          <span className="text-xs font-semibold hidden sm:block">See roadmap</span>
          <ArrowRight size={16} />
        </div>
      </div>

      {/* College grid */}
      <div className="page-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">All 10 College Spirit Vessels</h2>
          <button onClick={() => navigate('/library')} className="text-xs text-gcu-purple dark:text-purple-400 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
            Full library <ArrowRight size={12} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {MOCK_PROTOTYPES.map(p => (
            <button
              key={p.id}
              onClick={() => navigate(`/testing?id=${p.id}`)}
              className="flex flex-col items-center text-center p-3 rounded-xl bg-slate-50 dark:bg-[#241D35] hover:bg-gcu-purple-pale dark:hover:bg-gcu-purple/10 transition-colors border border-transparent hover:border-gcu-purple/20 group"
            >
              <span className="text-2xl mb-1">{p.icon}</span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 leading-tight group-hover:text-gcu-purple dark:group-hover:text-purple-300">
                {p.name.replace('GCU Spirit ', '').replace('GCU ', '')}
              </span>
              <span className={`text-xs mt-1 font-medium ${
                p.status === 'pilot' ? 'text-blue-500' :
                p.status === 'deployed' ? 'text-emerald-500' : 'text-amber-500'
              }`}>{p.status}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured pilots + Activity + Quick links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Active Pilots</h2>
            <button onClick={() => navigate('/library')} className="text-xs text-gcu-purple dark:text-purple-400 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              All vessels <ArrowRight size={12} />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {featuredProtos.map(p => <PrototypeCard key={p.id} prototype={p} compact />)}
          </div>
        </div>

        <div className="space-y-4">
          <div className="page-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={16} className="text-slate-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Recent Activity</h2>
            </div>
            <div className="space-y-3">
              {MOCK_ACTIVITY.map(entry => (
                <div key={entry.id} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-gcu-purple/10 dark:bg-gcu-purple/20 flex items-center justify-center text-gcu-purple text-xs font-bold flex-shrink-0 mt-0.5">
                    {entry.userName.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">{entry.userName}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight">{entry.action} · <span className="text-gcu-purple dark:text-purple-400">{entry.target.replace('GCU Spirit ', '').replace('GCU ', '')}</span></p>
                    <p className="text-xs text-slate-400 dark:text-slate-600 mt-0.5">{timeAgo(entry.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="page-card p-4 space-y-1">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Explore Platform</p>
            {[
              { label: 'Spirit Network', sub: '847 alumni contributors', icon: '❤️', to: '/spirit-network' },
              { label: 'Flourish API', sub: 'License the soul layer', icon: '⚡', to: '/flourish-api' },
              { label: 'Vision & Roadmap', sub: 'Phase 1 → Phase 2', icon: '🚀', to: '/vision' },
            ].map(l => (
              <button
                key={l.to}
                onClick={() => navigate(l.to)}
                className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-gcu-purple-pale dark:hover:bg-gcu-purple/10 transition-colors text-left group"
              >
                <span className="text-lg">{l.icon}</span>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-gcu-purple dark:group-hover:text-purple-300 transition-colors">{l.label}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{l.sub}</p>
                </div>
                <ArrowRight size={12} className="text-slate-300 dark:text-slate-600 group-hover:text-gcu-purple transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
