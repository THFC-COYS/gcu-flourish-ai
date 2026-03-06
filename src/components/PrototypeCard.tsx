import { useNavigate } from 'react-router-dom';
import { MessageSquare, ChevronRight, Users, Star } from 'lucide-react';
import { Prototype } from '../types';
import { StatusBadge } from './ui/Badge';

interface PrototypeCardProps {
  prototype: Prototype;
  compact?: boolean;
}

export default function PrototypeCard({ prototype: p, compact = false }: PrototypeCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="page-card p-5 flex flex-col gap-4 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
      style={{ borderTop: `3px solid ${p.colorAccent === '#FEF9C3' ? '#FFC627' : '#4B2E83'}` }}
      onClick={() => navigate(`/testing?id=${p.id}`)}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: p.colorAccent }}
          >
            {p.icon}
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-tight group-hover:text-gcu-purple dark:group-hover:text-purple-300 transition-colors">
              {p.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{p.college}</p>
          </div>
        </div>
        <StatusBadge status={p.status} />
      </div>

      {/* Description */}
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
        {p.description}
      </p>

      {/* Spirit summary */}
      <div className="bg-gcu-purple-pale dark:bg-gcu-purple/10 rounded-lg px-3 py-2">
        <p className="text-xs font-semibold text-gcu-purple dark:text-purple-300">Spirit Infusion</p>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{p.spiritSummary}</p>
      </div>

      {!compact && (
        <>
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {p.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
            {p.tags.length > 3 && (
              <span className="text-xs text-slate-400 dark:text-slate-500">+{p.tags.length - 3} more</span>
            )}
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-100 dark:border-[#2D2050]">
            <div className="text-center">
              <div className="text-sm font-bold text-gcu-purple dark:text-purple-300">{p.metrics.ethicalAlignmentScore}%</div>
              <div className="text-xs text-slate-500 dark:text-slate-500">Ethical Score</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-0.5">
                <Star size={10} className="text-gcu-gold fill-gcu-gold" />
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{p.metrics.averageRating}</span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-500">Rating</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-0.5">
                <Users size={10} className="text-slate-400" />
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{p.metrics.usersReached.toLocaleString()}</span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-500">Reached</div>
            </div>
          </div>
        </>
      )}

      {/* Action */}
      <div className="flex gap-2 pt-1">
        <button
          onClick={e => { e.stopPropagation(); navigate(`/testing?id=${p.id}`); }}
          className="flex-1 flex items-center justify-center gap-1.5 btn-primary py-2 text-xs"
        >
          <MessageSquare size={13} />
          Quick Demo
        </button>
        <button
          onClick={e => { e.stopPropagation(); navigate(`/library?highlight=${p.id}`); }}
          className="flex items-center gap-1 btn-secondary py-2 px-3 text-xs"
        >
          Details <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
}
