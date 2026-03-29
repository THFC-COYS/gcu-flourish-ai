import { useState } from 'react';
import { Bell, Moon, Sun, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onMenuClick: () => void;
}

const NOTIFICATIONS = [
  { id: 1, text: 'Spirit Agent "YJU Nursing" completed 142 interactions', time: '2h ago', unread: true },
  { id: 2, text: 'Ethical review requested for Business Spirit v2', time: '5h ago', unread: true },
  { id: 3, text: 'Pilot deployment link generated for Psychology Spirit', time: '1d ago', unread: false },
];

export default function Header({ title, subtitle, onMenuClick }: HeaderProps) {
  const { user } = useAuth();
  const { isDark, toggle } = useTheme();
  const [notifOpen, setNotifOpen] = useState(false);
  const [readIds, setReadIds] = useState<Set<number>>(new Set());

  const unreadCount = NOTIFICATIONS.filter(n => n.unread && !readIds.has(n.id)).length;

  const handleBellClick = () => {
    setNotifOpen(o => !o);
    if (!notifOpen) setReadIds(new Set(NOTIFICATIONS.map(n => n.id)));
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-[#0D0920]/90 backdrop-blur-sm border-b border-slate-200 dark:border-[#2D2050] px-4 sm:px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-white/10 dark:text-slate-400 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{title}</h1>
          {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={handleBellClick}
            className="relative p-2 rounded-lg text-slate-500 hover:text-yju-primary hover:bg-yju-primary-pale dark:hover:bg-yju-primary/10 dark:text-slate-400 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-yju-accent rounded-full" />
            )}
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-[#160D2E] border border-slate-200 dark:border-[#2D2050] rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-[#2D2050]">
                <p className="text-sm font-bold text-slate-800 dark:text-white">Notifications</p>
                <button onClick={() => setNotifOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                  <X size={14} />
                </button>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-[#2D2050]">
                {NOTIFICATIONS.map(n => (
                  <div key={n.id} className="px-4 py-3 flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${!readIds.has(n.id) ? 'bg-yju-accent' : 'bg-slate-200 dark:bg-slate-700'}`} />
                    <div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{n.text}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={toggle}
          className="p-2 rounded-lg text-slate-500 hover:text-yju-primary hover:bg-yju-primary-pale dark:hover:bg-yju-primary/10 dark:text-slate-400 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* User avatar */}
        {user && (
          <div className="flex items-center gap-2 ml-1 pl-3 border-l border-slate-200 dark:border-slate-700">
            <div className="w-8 h-8 rounded-full bg-yju-primary flex items-center justify-center text-white font-bold text-sm">
              {user.name.charAt(0)}
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-semibold text-slate-800 dark:text-white leading-tight">{user.name.split(' ')[0]}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 capitalize">{user.role}</div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
