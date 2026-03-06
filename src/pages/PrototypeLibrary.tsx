import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, Grid3X3, List } from 'lucide-react';
import { MOCK_PROTOTYPES, COLLEGES } from '../data/mockData';
import { PrototypeStatus } from '../types';
import PrototypeCard from '../components/PrototypeCard';
import { StatusBadge } from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';

type ViewMode = 'grid' | 'list';

export default function PrototypeLibrary() {
  const navigate = useNavigate();
  const { isRole } = useAuth();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<PrototypeStatus | 'all'>('all');
  const [collegeFilter, setCollegeFilter] = useState('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const filtered = useMemo(() => {
    return MOCK_PROTOTYPES.filter(p => {
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.college.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(search.toLowerCase())) ||
        p.domain.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
      const matchesCollege = collegeFilter === 'all' || p.college === collegeFilter;
      return matchesSearch && matchesStatus && matchesCollege;
    });
  }, [search, statusFilter, collegeFilter]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            Spirit Vessel Library
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {MOCK_PROTOTYPES.length} AI prototypes across all 10 GCU colleges · {filtered.length} showing
          </p>
        </div>
        {isRole('admin', 'faculty') && (
          <button
            onClick={() => navigate('/builder')}
            className="btn-primary flex items-center gap-2 self-start"
          >
            <Plus size={16} /> New Spirit Vessel
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="page-card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              className="form-input pl-9"
              placeholder="Search by name, college, domain, or tag…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-2">
            <Filter size={15} className="text-slate-400 flex-shrink-0" />
            <select
              className="form-input py-2"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as PrototypeStatus | 'all')}
            >
              <option value="all">All statuses</option>
              <option value="prototype">Prototype</option>
              <option value="pilot">Pilot</option>
              <option value="deployed">Deployed</option>
            </select>
          </div>

          {/* College filter */}
          <select
            className="form-input py-2"
            value={collegeFilter}
            onChange={e => setCollegeFilter(e.target.value)}
          >
            <option value="all">All colleges</option>
            {COLLEGES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* View mode */}
          <div className="flex rounded-lg border border-slate-200 dark:border-[#2D2050] overflow-hidden flex-shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-gcu-purple text-white' : 'bg-white dark:bg-[#1A1235] text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              aria-label="Grid view"
            >
              <Grid3X3 size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-gcu-purple text-white' : 'bg-white dark:bg-[#1A1235] text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              aria-label="List view"
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="page-card p-12 text-center">
          <div className="text-4xl mb-3">🔍</div>
          <p className="font-semibold text-slate-700 dark:text-slate-300">No prototypes match your filters.</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Try adjusting your search or filter criteria.</p>
          <button
            onClick={() => { setSearch(''); setStatusFilter('all'); setCollegeFilter('all'); }}
            className="btn-secondary mt-4"
          >
            Clear filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(p => (
            <PrototypeCard key={p.id} prototype={p} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(p => (
            <div
              key={p.id}
              className="page-card p-4 flex items-center gap-4 hover:shadow-card-hover hover:-translate-y-0.5 transition-all cursor-pointer group"
              onClick={() => navigate(`/testing?id=${p.id}`)}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: p.colorAccent }}
              >
                {p.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-gcu-purple dark:group-hover:text-purple-300 transition-colors">
                    {p.name}
                  </h3>
                  <StatusBadge status={p.status} />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{p.college} · {p.domain}</p>
                <p className="text-xs text-slate-600 dark:text-slate-500 mt-1 line-clamp-1">{p.description}</p>
              </div>
              <div className="hidden sm:flex flex-col items-end gap-1 flex-shrink-0">
                <span className="text-sm font-bold text-gcu-purple dark:text-purple-300">{p.metrics.ethicalAlignmentScore}%</span>
                <span className="text-xs text-slate-400">ethical</span>
                <span className="text-xs text-slate-500">{p.metrics.usersReached.toLocaleString()} reached</span>
              </div>
              <button
                onClick={e => { e.stopPropagation(); navigate(`/testing?id=${p.id}`); }}
                className="btn-primary text-xs px-3 py-2 flex-shrink-0"
              >
                Demo
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Legend */}
      <div className="page-card p-4">
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">Status Legend</p>
        <div className="flex flex-wrap gap-4 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2"><StatusBadge status="prototype" /> Internal R&D phase—CETLA faculty testing</div>
          <div className="flex items-center gap-2"><StatusBadge status="pilot" /> Partner deployment with feedback collection</div>
          <div className="flex items-center gap-2"><StatusBadge status="deployed" /> Production-ready, commercially available</div>
        </div>
      </div>
    </div>
  );
}
