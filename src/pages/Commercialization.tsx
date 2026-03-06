import { TrendingUp, DollarSign, Award, Heart, Plus, Building2, GraduationCap } from 'lucide-react';
import { MOCK_PARTNERSHIPS, REVENUE_DATA, MOCK_PROTOTYPES } from '../data/mockData';
import { Badge } from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';

const totalRevenue = REVENUE_DATA.reduce((s, m) => s + m.revenue, 0);
const totalReinvested = REVENUE_DATA.reduce((s, m) => s + m.reinvested, 0);
const maxRevenue = Math.max(...REVENUE_DATA.map(m => m.revenue));

function RevenueBar({ month, revenue, reinvested }: { month: string; revenue: number; reinvested: number }) {
  const pct = (revenue / maxRevenue) * 100;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-xs font-bold text-slate-700 dark:text-slate-300">${(revenue / 1000).toFixed(1)}k</div>
      <div className="relative w-full h-24 flex items-end">
        <div
          className="w-full rounded-t-md bg-gcu-purple dark:bg-gcu-purple transition-all duration-700 relative"
          style={{ height: `${pct}%` }}
        >
          <div
            className="absolute bottom-0 left-0 right-0 rounded-t-md bg-gcu-gold/50"
            style={{ height: `${(reinvested / revenue) * 100}%` }}
          />
        </div>
      </div>
      <div className="text-xs text-slate-500 dark:text-slate-500 text-center">{month}</div>
    </div>
  );
}

function PartnerTypeIcon({ type }: { type: string }) {
  const icons: Record<string, string> = {
    healthcare: '🏥',
    business: '💼',
    education: '🎓',
    church: '✝️',
    government: '🏛️',
    research: '🔬',
    nonprofit: '🤝',
  };
  return <span className="text-lg">{icons[type] ?? '🏢'}</span>;
}

export default function Commercialization() {
  const { isRole } = useAuth();

  const activePartnerships = MOCK_PARTNERSHIPS.filter(p => p.status === 'active');
  const totalPartnerValue = activePartnerships.reduce((s, p) => s + (p.value ?? 0), 0);

  const protosByCollege = MOCK_PROTOTYPES.map(p => ({
    prototype: p,
    revenue: Math.round(Math.random() * 15000 + 2000),
  })).sort((a, b) => b.revenue - a.revenue);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Summary stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: <DollarSign size={20} className="text-emerald-600" />,
            label: 'Total Revenue (6mo)',
            value: `$${(totalRevenue / 1000).toFixed(0)}k`,
            sub: 'Licensing + subscriptions',
            color: 'bg-emerald-50 dark:bg-emerald-900/20',
          },
          {
            icon: <Heart size={20} className="text-pink-600" />,
            label: 'Reinvested in Mission',
            value: `$${(totalReinvested / 1000).toFixed(0)}k`,
            sub: `${Math.round((totalReinvested / totalRevenue) * 100)}% of revenue`,
            color: 'bg-pink-50 dark:bg-pink-900/20',
          },
          {
            icon: <Building2 size={20} className="text-blue-600" />,
            label: 'Active Partnerships',
            value: activePartnerships.length,
            sub: `$${(totalPartnerValue / 1000).toFixed(0)}k partner value`,
            color: 'bg-blue-50 dark:bg-blue-900/20',
          },
          {
            icon: <GraduationCap size={20} className="text-gcu-purple" />,
            label: 'Scholarships Funded',
            value: '12',
            sub: 'From AI royalties',
            color: 'bg-gcu-purple-pale dark:bg-gcu-purple/10',
          },
        ].map(s => (
          <div key={s.label} className="stat-card flex gap-4 items-start">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${s.color}`}>
              {s.icon}
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{s.value}</p>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{s.label}</p>
              {s.sub && <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{s.sub}</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue chart */}
        <div className="page-card p-5">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-gcu-purple" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Monthly Revenue</h3>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-gcu-purple inline-block" /> Revenue</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-gcu-gold/50 inline-block" /> Reinvested</span>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {REVENUE_DATA.map(m => (
              <RevenueBar key={m.month} {...m} />
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-[#2D2050]">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              25% of all licensing revenue reinvested into GCU scholarships and AI ethics research.
            </p>
          </div>
        </div>

        {/* Revenue by prototype */}
        <div className="page-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Award size={16} className="text-gcu-gold" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Revenue by Spirit Vessel</h3>
          </div>
          <div className="space-y-3">
            {protosByCollege.slice(0, 6).map(({ prototype: p, revenue }) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="text-xl w-8 text-center">{p.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">
                      {p.name.replace('GCU Spirit ', '').replace('GCU ', '')}
                    </span>
                    <span className="text-xs font-bold text-gcu-purple dark:text-purple-300 ml-2">${(revenue / 1000).toFixed(1)}k</span>
                  </div>
                  <div className="mt-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full">
                    <div
                      className="h-full bg-gcu-purple rounded-full"
                      style={{ width: `${(revenue / 17000) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partnerships table */}
      <div className="page-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Building2 size={16} className="text-slate-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Partnership Log</h3>
          </div>
          {isRole('admin', 'faculty') && (
            <button className="btn-secondary text-xs flex items-center gap-1.5 py-1.5">
              <Plus size={13} /> Add Partnership
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-[#2D2050]">
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 pb-2">Partner</th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 pb-2 hidden sm:table-cell">College</th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 pb-2">Status</th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 pb-2 hidden md:table-cell">Revenue Model</th>
                <th className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 pb-2">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-[#2D2050]">
              {MOCK_PARTNERSHIPS.map(p => (
                <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <PartnerTypeIcon type={p.type} />
                      <div>
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{p.name}</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 sm:hidden">{p.college.replace('College of ', '').replace('Colangelo ', '')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4 hidden sm:table-cell">
                    <p className="text-xs text-slate-600 dark:text-slate-400">{p.college.replace('College of ', '').replace('Colangelo ', '')}</p>
                  </td>
                  <td className="py-3 pr-4">
                    <Badge variant={p.status === 'active' ? 'active' : 'pending'}>
                      {p.status === 'active' ? '● Active' : '◌ Pending'}
                    </Badge>
                  </td>
                  <td className="py-3 pr-4 hidden md:table-cell">
                    <p className="text-xs text-slate-500 dark:text-slate-500 max-w-[200px] truncate">{p.revenueModel}</p>
                  </td>
                  <td className="py-3 text-right">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {p.value ? `$${p.value.toLocaleString()}` : '—'}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reinvestment philosophy */}
      <div className="page-card p-5 flex items-start gap-4 bg-gcu-purple-pale dark:bg-gcu-purple/10 border-gcu-purple/20">
        <div className="w-10 h-10 rounded-xl bg-gcu-purple flex items-center justify-center flex-shrink-0">
          <Heart size={18} className="text-gcu-gold" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-gcu-purple dark:text-purple-300 mb-1">GCU Reinvestment Commitment</h3>
          <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
            At least 25% of all AI licensing revenue is reinvested into GCU scholarships, AI ethics research, and mission-aligned initiatives.
            Profit is a means to flourishing—not an end in itself. Every dollar this platform generates carries the servant-hearted spirit of GCU graduates forward.
          </p>
        </div>
      </div>
    </div>
  );
}
