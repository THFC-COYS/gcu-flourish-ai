import { Bell, Moon, Sun, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onMenuClick: () => void;
}

export default function Header({ title, subtitle, onMenuClick }: HeaderProps) {
  const { user } = useAuth();
  const { isDark, toggle } = useTheme();

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
        <button className="relative p-2 rounded-lg text-slate-500 hover:text-gcu-purple hover:bg-gcu-purple-pale dark:hover:bg-gcu-purple/10 dark:text-slate-400 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gcu-gold rounded-full"></span>
        </button>

        {/* Dark mode toggle */}
        <button
          onClick={toggle}
          className="p-2 rounded-lg text-slate-500 hover:text-gcu-purple hover:bg-gcu-purple-pale dark:hover:bg-gcu-purple/10 dark:text-slate-400 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* User avatar */}
        {user && (
          <div className="flex items-center gap-2 ml-1 pl-3 border-l border-slate-200 dark:border-slate-700">
            <div className="w-8 h-8 rounded-full bg-gcu-purple flex items-center justify-center text-white font-bold text-sm">
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
