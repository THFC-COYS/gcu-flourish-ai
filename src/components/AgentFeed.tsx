import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export interface FeedEvent {
  time: string;
  event: string;
  action: string;
  role: 'Student' | 'Faculty' | 'Admin';
  href: string;
}

const roleColor = (role: string) =>
  role === 'Faculty' ? { bg: 'rgba(45,212,191,0.15)', text: '#2DD4BF' }
  : role === 'Admin'  ? { bg: 'rgba(232,23,15,0.15)',  text: '#E8170F' }
  :                     { bg: 'rgba(232,160,32,0.15)', text: '#E8A020' };

export default function AgentFeed({
  events,
  label = 'Agents running now',
  accentColor = '#2DD4BF',
}: {
  events: FeedEvent[];
  label?: string;
  accentColor?: string;
}) {
  const [visible, setVisible] = useState(events.slice(0, 4));
  const [nextIdx, setNextIdx] = useState(4);

  useEffect(() => {
    const id = setInterval(() => {
      const incoming = events[nextIdx % events.length];
      setTimeout(() => {
        setVisible(prev => [incoming, ...prev.slice(0, 3)]);
      }, 300);
      setNextIdx(i => i + 1);
    }, 3500);
    return () => clearInterval(id);
  }, [nextIdx, events]);

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: accentColor }} />
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: accentColor }}>
          {label}
        </p>
      </div>
      <div className="space-y-3">
        {visible.map((item) => {
          const c = roleColor(item.role);
          return (
            <Link
              key={`${item.time}-${item.event}`}
              to={item.href}
              className="group block rounded-xl p-4 border transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: `rgba(${accentColor === '#E8A020' ? '232,160,32' : accentColor === '#E8170F' ? '232,23,15' : '45,212,191'},0.04)`,
                borderColor: `rgba(${accentColor === '#E8A020' ? '232,160,32' : accentColor === '#E8170F' ? '232,23,15' : '45,212,191'},0.1)`,
                animation: 'agentFeedSlideIn 0.4s ease',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono" style={{ color: accentColor }}>{item.time}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: c.bg, color: c.text }}>
                    {item.role}
                  </span>
                  <span className="text-[10px] text-molted-muted/0 group-hover:text-molted-muted/60 transition-colors font-medium">
                    Try it →
                  </span>
                </div>
              </div>
              <p className="text-molted-muted text-xs mb-2 leading-relaxed">{item.event}</p>
              <p className="text-xs font-semibold text-molted-white leading-snug">↳ {item.action}</p>
            </Link>
          );
        })}
      </div>
      <style>{`
        @keyframes agentFeedSlideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
