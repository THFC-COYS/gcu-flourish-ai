import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Library, Wand2, FlaskConical,
  TrendingUp, BookOpen, LogOut, ChevronLeft, ChevronRight,
  Shield, X, Heart, Code2, Rocket, Bot, Briefcase, Award
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { RoleBadge } from '../ui/Badge';

const NAV_SECTIONS = [
  {
    label: 'Main',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, to: '/' },
      { label: 'Prototype Library', icon: Library, to: '/library' },
      { label: 'Spirit Builder', icon: Wand2, to: '/builder' },
      { label: 'Deployment Console', icon: FlaskConical, to: '/testing' },
    ],
  },
  {
    label: 'Network',
    items: [
      { label: 'Spirit Network', icon: Heart, to: '/spirit-network' },
      { label: 'Flourish API', icon: Code2, to: '/flourish-api' },
      { label: 'Flourish Robotics', icon: Bot, to: '/flourish-robotics' },
    ],
  },
  {
    label: 'Commerce',
    items: [
      { label: 'Impact Tracker', icon: TrendingUp, to: '/commercialization' },
    ],
  },
  {
    label: 'Vision',
    items: [
      { label: 'Vision & Roadmap', icon: Rocket, to: '/vision' },
      { label: 'Flourish Standard', icon: Award, to: '/flourish-standard' },
      { label: 'Executive Briefing', icon: Briefcase, to: '/executive-brief' },
    ],
  },
  {
    label: 'Governance',
    items: [
      { label: 'Resources', icon: BookOpen, to: '/resources' },
    ],
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo / Brand */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gcu-gold flex items-center justify-center flex-shrink-0">
              <span className="font-black text-gcu-purple-dark text-sm leading-none">GCU</span>
            </div>
            <div>
              <div className="text-white font-bold text-sm leading-tight">Flourish AI</div>
              <div className="text-white/50 text-xs">Ethical AI Platform</div>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-9 h-9 rounded-lg bg-gcu-gold flex items-center justify-center mx-auto">
            <span className="font-black text-gcu-purple-dark text-xs leading-none">GCU</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="hidden lg:flex p-1 rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
        <button onClick={onMobileClose} className="lg:hidden p-1 rounded-md text-white/50 hover:text-white">
          <X size={16} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-4 overflow-y-auto">
        {NAV_SECTIONS.map(section => (
          <div key={section.label}>
            {!collapsed && (
              <p className="text-white/30 text-xs font-semibold uppercase tracking-widest px-3 pb-1.5">
                {section.label}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map(({ label, icon: Icon, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  onClick={onMobileClose}
                  className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  {!collapsed && <span>{label}</span>}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="border-t border-white/10 px-3 py-4 space-y-1">
        {user && !collapsed && (
          <div className="px-3 py-2 mb-1">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-full bg-gcu-gold/20 flex items-center justify-center text-gcu-gold font-bold text-sm flex-shrink-0">
                {user.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="text-white text-sm font-medium truncate">{user.name}</div>
                <RoleBadge role={user.role} />
              </div>
            </div>
          </div>
        )}

        <NavLink
          to="/resources"
          onClick={onMobileClose}
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <Shield size={18} className="flex-shrink-0" />
          {!collapsed && <span>Ethics & Policy</span>}
        </NavLink>

        <button onClick={handleLogout} className="sidebar-link w-full text-left hover:text-red-300">
          <LogOut size={18} className="flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className={`hidden lg:flex flex-col flex-shrink-0 purple-gradient transition-all duration-300 ${collapsed ? 'w-[68px]' : 'w-64'}`}>
        {sidebarContent}
      </aside>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60" onClick={onMobileClose} />
          <aside className="relative w-72 purple-gradient flex flex-col animate-slide-in">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
