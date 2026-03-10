import { useState } from 'react';
import {
  TrendingUp, Users, Star, Shield, Activity,
  BarChart3, PieChart, Award, ChevronUp, ChevronDown,
  Download, Filter, Calendar
} from 'lucide-react';
import { MOCK_PROTOTYPES } from '../data/mockData';

const MONTHLY_DATA = [
  { month: 'Sep', sessions: 320, users: 210, ethicalScore: 94 },
  { month: 'Oct', sessions: 450, users: 290, ethicalScore: 95 },
  { month: 'Nov', sessions: 610, users: 380, ethicalScore: 96 },
  { month: 'Dec', sessions: 520, users: 340, ethicalScore: 95 },
  { month: 'Jan', sessions: 780, users: 490, ethicalScore: 97 },
  { month: 'Feb', sessions: 940, users: 610, ethicalScore: 97 },
  { month: 'Mar', sessions: 1120, users: 720, ethicalScore: 98 },
];

const TOP_N = 5;

export default function AnalyticsInsights() {
  const [timeRange, setTimeRange] = useState<'30d' | '90d' | '6m' | '1y'>('6m');
  const [metricSort, setMetricSort] = useState<'engagement' | 'ethical' | 'users' | 'rating'>('users');
  const [sortDir, setSortDir] = useState<'desc' | 'asc'>('desc');

  const sortedPrototypes = [...MOCK_PROTOTYPES].sort((a, b) => {
    const key = {
      engagement: 'engagementScore',
      ethical: 'ethicalAlignmentScore',
      users: 'usersReached',
      rating: 'averageRating',
    }[metricSort] as keyof typeof a.metrics;
    return sortDir === 'desc'
      ? b.metrics[key] - a.metrics[key]
      : a.metrics[key] - b.metrics[key];
  });

  const totalUsers = MOCK_PROTOTYPES.reduce((s, p) => s + p.metrics.usersReached, 0);
  const totalFeedback = MOCK_PROTOTYPES.reduce((s, p) => s + p.metrics.feedbackCount, 0);
  const avgEthical = Math.round(
    MOCK_PROTOTYPES.reduce((s, p) => s + p.metrics.ethicalAlignmentScore, 0) / MOCK_PROTOTYPES.length
  );
  const avgRating = (
    MOCK_PROTOTYPES.reduce((s, p) => s + p.metrics.averageRating, 0) / MOCK_PROTOTYPES.length
  ).toFixed(1);

  const maxSessions = Math.max(...MONTHLY_DATA.map(d => d.sessions));

  const statusCounts = {
    deployed: MOCK_PROTOTYPES.filter(p => p.status === 'deployed').length,
    pilot: MOCK_PROTOTYPES.filter(p => p.status === 'pilot').length,
    prototype: MOCK_PROTOTYPES.filter(p => p.status === 'prototype').length,
  };
  const total = MOCK_PROTOTYPES.length;

  const collegeBreakdown = MOCK_PROTOTYPES.reduce<Record<string, number>>((acc, p) => {
    const short = p.college.replace(/\(.*\)/, '').trim().replace('College of ', '').replace('Colangelo ', '');
    acc[short] = (acc[short] || 0) + p.metrics.usersReached;
    return acc;
  }, {});
  const collegeEntries = Object.entries(collegeBreakdown).sort((a, b) => b[1] - a[1]);
  const maxCollegeUsers = Math.max(...collegeEntries.map(([, v]) => v));

  function toggleSort(key: typeof metricSort) {
    if (metricSort === key) setSortDir(d => (d === 'desc' ? 'asc' : 'desc'));
    else { setMetricSort(key); setSortDir('desc'); }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="text-gcu-purple" size={26} />
            Analytics &amp; Insights
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Platform-wide performance metrics across all Spirit vessels
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={15} className="text-gray-400" />
          <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 text-xs font-medium">
            {(['30d', '90d', '6m', '1y'] as const).map(r => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1.5 transition-colors ${
                  timeRange === r
                    ? 'bg-gcu-purple text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Download size={13} />
            Export
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Students Reached', value: totalUsers.toLocaleString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20', trend: '+18%' },
          { label: 'Total Feedback Items', value: totalFeedback.toLocaleString(), icon: Activity, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20', trend: '+24%' },
          { label: 'Avg Ethical Alignment', value: `${avgEthical}%`, icon: Shield, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20', trend: '+2%' },
          { label: 'Avg Spirit Rating', value: `${avgRating}/5.0`, icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-900/20', trend: '+0.2' },
        ].map(({ label, value, icon: Icon, color, bg, trend }) => (
          <div key={label} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center mb-3`}>
              <Icon size={20} className={color} />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</div>
            <div className="flex items-center gap-1 mt-2 text-xs text-green-600 font-medium">
              <TrendingUp size={11} />
              {trend} vs prior period
            </div>
          </div>
        ))}
      </div>

      {/* Session Trend Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Monthly Session Trend</h2>
        <div className="flex items-end gap-3 h-40">
          {MONTHLY_DATA.map(({ month, sessions }) => (
            <div key={month} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {sessions >= 1000 ? `${(sessions / 1000).toFixed(1)}k` : sessions}
              </span>
              <div
                className="w-full rounded-t-md bg-gcu-purple/80 hover:bg-gcu-purple transition-colors cursor-default"
                style={{ height: `${(sessions / maxSessions) * 120}px` }}
                title={`${month}: ${sessions} sessions`}
              />
              <span className="text-xs text-gray-400">{month}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Session volume reflects interactions across all Spirit vessels. Ethical alignment score held ≥94% throughout.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Spirit Status Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <PieChart size={16} className="text-gcu-purple" />
            Spirit Status Distribution
          </h2>
          <div className="space-y-3">
            {[
              { label: 'Deployed', count: statusCounts.deployed, color: 'bg-green-500', textColor: 'text-green-700 dark:text-green-400' },
              { label: 'Pilot', count: statusCounts.pilot, color: 'bg-gcu-gold', textColor: 'text-yellow-700 dark:text-yellow-400' },
              { label: 'Prototype', count: statusCounts.prototype, color: 'bg-gray-400', textColor: 'text-gray-600 dark:text-gray-300' },
            ].map(({ label, count, color, textColor }) => (
              <div key={label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className={`font-medium ${textColor}`}>{label}</span>
                  <span className="text-gray-500 dark:text-gray-400">{count}/{total}</span>
                </div>
                <div className="h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${color} rounded-full transition-all duration-500`}
                    style={{ width: `${(count / total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4">
            {Math.round((statusCounts.deployed / total) * 100)}% of spirits are live in production.
          </p>
        </div>

        {/* College User Reach */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Award size={16} className="text-gcu-purple" />
            User Reach by College
          </h2>
          <div className="space-y-3">
            {collegeEntries.slice(0, 6).map(([college, users]) => (
              <div key={college}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-700 dark:text-gray-300 font-medium truncate max-w-[70%]" title={college}>{college}</span>
                  <span className="text-gray-500 dark:text-gray-400">{users.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gcu-purple/70 hover:bg-gcu-purple rounded-full transition-all duration-500"
                    style={{ width: `${(users / maxCollegeUsers) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Spirit Performance Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <TrendingUp size={16} className="text-gcu-purple" />
            Spirit Performance Rankings
          </h2>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Filter size={12} />
            Click column header to sort
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-750">
                <th className="text-left px-5 py-3 text-gray-500 dark:text-gray-400 font-medium">Spirit</th>
                {[
                  { key: 'users' as const, label: 'Users Reached' },
                  { key: 'engagement' as const, label: 'Engagement' },
                  { key: 'ethical' as const, label: 'Ethical Score' },
                  { key: 'rating' as const, label: 'Rating' },
                ].map(({ key, label }) => (
                  <th
                    key={key}
                    className="px-4 py-3 text-gray-500 dark:text-gray-400 font-medium cursor-pointer hover:text-gcu-purple dark:hover:text-gcu-gold select-none"
                    onClick={() => toggleSort(key)}
                  >
                    <span className="flex items-center gap-1 justify-end">
                      {label}
                      {metricSort === key ? (
                        sortDir === 'desc' ? <ChevronDown size={12} /> : <ChevronUp size={12} />
                      ) : null}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
              {sortedPrototypes.slice(0, TOP_N * 2).map((p, i) => (
                <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{p.icon}</span>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white text-xs">{p.name}</div>
                        <div className="text-gray-400 text-xs truncate max-w-[160px]">
                          {p.college.replace('College of ', '').replace(/\s*\(.*\)/, '')}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300 font-medium">
                    {p.metrics.usersReached.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`font-semibold ${p.metrics.engagementScore >= 85 ? 'text-green-600' : 'text-yellow-600'}`}>
                      {p.metrics.engagementScore}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`font-semibold ${p.metrics.ethicalAlignmentScore >= 95 ? 'text-green-600' : 'text-yellow-500'}`}>
                      {p.metrics.ethicalAlignmentScore}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Star size={12} className="text-yellow-400 fill-yellow-400" />
                      <span className="font-medium text-gray-700 dark:text-gray-300">{p.metrics.averageRating.toFixed(1)}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendations panel */}
      <div className="bg-gcu-purple/5 dark:bg-gcu-purple/10 border border-gcu-purple/20 rounded-xl p-6">
        <h2 className="text-base font-semibold text-gcu-purple dark:text-gcu-gold mb-3 flex items-center gap-2">
          <Activity size={16} />
          AI-Generated Insights
        </h2>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 w-4 h-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
              <ChevronUp size={10} className="text-green-600" />
            </span>
            <span><strong>Spirit Nurse</strong> leads all spirits in user reach (1,840) and ethical alignment (97%). Consider expanding the Banner Health pilot to additional sites.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 w-4 h-4 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center flex-shrink-0">
              <TrendingUp size={10} className="text-yellow-600" />
            </span>
            <span>Monthly sessions grew <strong>250%</strong> from Sep to Mar — Prototype Library expansion and Training Academy launch are driving engagement.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
              <Shield size={10} className="text-blue-600" />
            </span>
            <span>Ethical alignment scores are trending upward month-over-month. Recommend scheduling a quarterly Flourish Standard review to maintain ≥95% target across all spirits.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 w-4 h-4 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
              <Users size={10} className="text-purple-600" />
            </span>
            <span>Spirits in the <strong>prototype</strong> stage have 40% fewer feedback entries. Prioritize deploying them to limited cohorts to collect baseline training data.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
