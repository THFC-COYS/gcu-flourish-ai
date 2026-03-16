import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export interface FeedEvent {
  time: string;
  event: string;
  action: string;
  role: 'Student' | 'Faculty' | 'Admin';
  href: string;
}

const roleColor = (role: string) =>
  role === 'Faculty' ? { bg: 'rgba(37,99,235,0.15)', text: '#2563EB' }
  : role === 'Admin'  ? { bg: 'rgba(30,58,138,0.15)',  text: '#1E3A8A' }
  :                     { bg: 'rgba(100,116,139,0.15)', text: '#64748B' };

/* Typewriter for the top (newest) event's action line */
function useTypewriter(text: string, speed = 28) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const prev = useRef('');

  useEffect(() => {
    if (text === prev.current) return;
    prev.current = text;
    setDisplayed('');
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return { displayed, done };
}

/* Single feed card — isTyping drives the typewriter */
function FeedCard({
  item,
  isTyping,
  accentColor,
}: {
  item: FeedEvent;
  isTyping: boolean;
  accentColor: string;
}) {
  const { displayed, done } = useTypewriter(isTyping ? item.action : '');
  const c = roleColor(item.role);

  const rgbMatch = accentColor === '#64748B' ? '232,160,32'
    : accentColor === '#1E3A8A' ? '232,23,15'
    : '45,212,191';

  const actionText = isTyping ? displayed : item.action;
  const showCursor = isTyping && !done;

  return (
    <Link
      to={item.href}
      className="group block rounded-xl p-4 border transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: `rgba(${rgbMatch},0.07)`,
        borderColor: `rgba(${rgbMatch},${isTyping ? '0.30' : '0.15'})`,
        animation: isTyping ? 'agentFeedSlideIn 0.4s ease' : undefined,
        transition: 'border-color 0.4s ease',
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono" style={{ color: accentColor }}>{item.time}</span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: c.bg, color: c.text }}>
            {item.role}
          </span>
          {!isTyping && (
            <span className="text-[10px] text-molted-muted/0 group-hover:text-molted-muted/60 transition-colors font-medium">
              Try it →
            </span>
          )}
          {isTyping && (
            <span className="text-[10px] font-mono animate-pulse" style={{ color: accentColor }}>
              responding
            </span>
          )}
        </div>
      </div>
      <p className="text-molted-muted text-xs mb-2 leading-relaxed">{item.event}</p>
      <p className="text-xs font-semibold text-molted-white leading-snug font-mono">
        ↳ {actionText}
        {showCursor && (
          <span
            className="inline-block w-[2px] h-[12px] ml-[2px] align-middle animate-pulse"
            style={{ background: accentColor }}
          />
        )}
      </p>
    </Link>
  );
}

export default function AgentFeed({
  events,
  label = 'Agents running now',
  accentColor = '#2563EB',
}: {
  events: FeedEvent[];
  label?: string;
  accentColor?: string;
}) {
  const [visible, setVisible] = useState(events.slice(0, 4));
  const [nextIdx, setNextIdx] = useState(4);
  const [typingKey, setTypingKey] = useState(0); // bumped each cycle to reset typewriter

  useEffect(() => {
    const id = setInterval(() => {
      const incoming = events[nextIdx % events.length];
      setTimeout(() => {
        setVisible(prev => [incoming, ...prev.slice(0, 3)]);
        setTypingKey(k => k + 1);
      }, 300);
      setNextIdx(i => i + 1);
    }, 4500); // slightly longer to let the typewriter finish
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
        {visible.map((item, i) => (
          <FeedCard
            key={`${typingKey}-${i}-${item.time}`}
            item={item}
            isTyping={i === 0}
            accentColor={accentColor}
          />
        ))}
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
