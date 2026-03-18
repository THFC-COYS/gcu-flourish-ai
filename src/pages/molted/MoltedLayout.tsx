import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, ChevronDown } from 'lucide-react';

function MoltedLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const textSize = { sm: 'text-lg', md: 'text-2xl', lg: 'text-4xl' }[size];
  return (
    <div className="flex flex-col leading-none">
      <span className={`${textSize} font-black tracking-tight leading-none`}>
        <span className="text-molted-white/90">M</span>
        <span style={{ color: '#2563EB' }}>olt</span>
        <span className="text-molted-white/90">ALP</span>
      </span>
      <span className="text-[9px] font-medium tracking-widest uppercase" style={{ color: '#64748B' }}>By PaigeBreaker LLC</span>
    </div>
  );
}

/* ── Nav data ───────────────────────────────────────────────────────────── */
const THREE_PRODUCTS = [
  { label: 'Lumen', href: '/lumen', segment: 'Students', color: '#64748B', pain: 'For the student at midnight' },
  { label: 'Forge', href: '/forge', segment: 'Faculty', color: '#2563EB', pain: 'For the professor drowning in admin' },
  { label: 'Beacon', href: '/beacon', segment: 'Institutions', color: '#1E3A8A', pain: 'For the provost facing the board' },
];

const NAV_DEMOS = [
  { label: 'Lumen', description: 'In-context AI tutor while reading', href: '/lumen/demo', color: '#7B61FF' },
  { label: 'Discussion', description: "AI responds in instructor's voice", href: '/forge/discussion', color: '#2563EB' },
  { label: 'Agentic Grader', description: 'Grades with rubric feedback', href: '/forge/agentic-grader', color: '#2563EB' },
  { label: 'Beacon', description: "Chat with your institution's AI voice", href: '/beacon/demo', color: '#1E3A8A' },
  { label: 'RetainAI', description: 'Student risk analysis + intervention', href: '/retain-ai/demo', color: '#F43F5E' },
  { label: 'Command Center', description: 'Ask the University OS anything', href: '/command-center', color: '#F59E0B' },
];

const CAMPUS_MODULES = [
  { label: 'Lumen', href: '/lumen' },
  { label: 'Forge', href: '/forge' },
  { label: 'Beacon', href: '/beacon' },
  { label: 'Pathway', href: '/pathway-ai' },
  { label: 'Proof', href: '/proof-ai' },
  { label: 'Retain', href: '/retain-ai' },
  { label: 'Outcomes', href: '/outcomes-ai' },
  { label: 'Mastery', href: '/mastery-ai' },
];

/* ── Nav ────────────────────────────────────────────────────────────────── */
export function MoltedNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [demosOpen, setDemosOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const demosDropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setProductsOpen(false); setDemosOpen(false); }, [location]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
      if (demosDropdownRef.current && !demosDropdownRef.current.contains(e.target as Node)) {
        setDemosOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const aboutActive = location.pathname === '/about';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'backdrop-blur-xl border-b' : 'bg-transparent'}`}
      style={scrolled ? { background: 'rgba(255,255,255,0.95)', borderColor: 'rgba(0,0,0,0.08)' } : undefined}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex-shrink-0">
          <MoltedLogo size="sm" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {/* Products dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProductsOpen(v => !v)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
              style={{ color: productsOpen ? '#0F172A' : '#475569', background: productsOpen ? 'rgba(0,0,0,0.06)' : undefined }}
            >
              Products <ChevronDown size={13} className={`transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`} />
            </button>

            {productsOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl border shadow-xl overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.98)', borderColor: 'rgba(0,0,0,0.08)', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
              >
                {THREE_PRODUCTS.map(p => (
                  <Link key={p.href} to={p.href}
                    className="flex items-center gap-3 px-5 py-4 transition-all"
                    style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.03)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
                    <div>
                      <p className="text-sm font-bold" style={{ color: '#0F172A' }}>{p.label}</p>
                      <p className="text-xs" style={{ color: '#64748B' }}>{p.pain}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Demos dropdown */}
          <div className="relative" ref={demosDropdownRef}>
            <button
              onClick={() => setDemosOpen(v => !v)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
              style={{ color: demosOpen ? '#0F172A' : '#475569', background: demosOpen ? 'rgba(0,0,0,0.06)' : undefined }}
            >
              Demos <ChevronDown size={13} className={`transition-transform duration-200 ${demosOpen ? 'rotate-180' : ''}`} />
            </button>

            {demosOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl border shadow-xl overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.98)', borderColor: 'rgba(0,0,0,0.08)', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
              >
                {NAV_DEMOS.map(d => (
                  <Link key={d.href} to={d.href}
                    className="flex items-center gap-3 px-5 py-4 transition-all"
                    style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.03)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                    <div>
                      <p className="text-sm font-bold" style={{ color: '#0F172A' }}>{d.label}</p>
                      <p className="text-xs" style={{ color: '#64748B' }}>{d.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/about"
            className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
            style={{ background: aboutActive ? 'rgba(0,0,0,0.06)' : undefined, color: aboutActive ? '#0F172A' : '#475569' }}
          >
            About
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="mailto:greg.lucas@paigebreaker.com"
            className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-px"
            style={{ background: 'linear-gradient(120deg, #2563EB, #1E3A8A)' }}
          >
            Get Started
          </a>
        </div>

        <button
          className="md:hidden p-2 text-molted-muted hover:text-molted-white transition-colors"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden backdrop-blur-xl border-b max-h-[80vh] overflow-y-auto"
          style={{ background: 'rgba(255,255,255,0.98)', borderColor: 'rgba(0,0,0,0.08)' }}
        >
          <div className="max-w-6xl mx-auto px-6 py-4 space-y-1">
            <p className="text-xs font-semibold uppercase tracking-widest px-4 pb-2" style={{ color: '#64748B' }}>Products</p>
            {THREE_PRODUCTS.map(p => (
              <Link key={p.href} to={p.href} className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
                style={{ background: 'transparent' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.04)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.color }} />
                <div>
                  <p className="text-molted-white text-sm font-semibold">{p.label}</p>
                  <p className="text-molted-muted text-xs">{p.pain}</p>
                </div>
              </Link>
            ))}
            <div className="pt-3 mt-3" style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
              <p className="text-xs font-semibold uppercase tracking-widest px-4 pb-2" style={{ color: '#64748B' }}>Demos</p>
              {NAV_DEMOS.map(d => (
                <Link key={d.href} to={d.href} className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
                  style={{ background: 'transparent' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.04)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                  <div>
                    <p className="text-molted-white text-sm font-semibold">{d.label}</p>
                    <p className="text-molted-muted text-xs">{d.description}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="pt-3 mt-3" style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
              <Link to="/about" className="block px-4 py-3 rounded-lg text-sm font-medium text-molted-muted hover:text-molted-white transition-all">About</Link>
            </div>
            <div className="pt-3" style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
              <a href="mailto:greg.lucas@paigebreaker.com" className="block w-full text-center px-5 py-3 rounded-xl text-sm font-semibold text-white"
                style={{ background: 'linear-gradient(120deg, #2563EB, #1E3A8A)' }}
              >Get Started</a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ── Footer ─────────────────────────────────────────────────────────────── */
export function MoltedFooter() {
  return (
    <footer style={{ background: '#F8F9FC', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <MoltedLogo size="md" />
            <p className="mt-4 text-molted-muted text-sm leading-relaxed max-w-xs">
              MoltALP builds AI-native tools that transform how institutions teach,
              how students learn, and how knowledge moves.
            </p>
          </div>

          <div>
            <div className="mb-4">
              <Link to="/imago-os" className="inline-flex items-center gap-2 text-sm font-black hover:opacity-80 transition-opacity" style={{ background: 'linear-gradient(120deg,#64748B,#475569)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Imago — The Final Form
              </Link>
              <p className="text-molted-subtle text-xs mt-0.5">The fully transformed institution.</p>
            </div>
            <div className="mb-5">
              <Link to="/outpost" className="inline-flex items-center gap-2 text-sm font-bold hover:opacity-80 transition-opacity" style={{ background: 'linear-gradient(120deg,#2563EB,#1E3A8A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Outpost — The Platform
              </Link>
              <p className="text-molted-subtle text-xs mt-1">All modules. One Agentic Learning Platform.</p>
            </div>
            <p className="text-molted-white text-sm font-semibold mb-3">Modules</p>
            <ul className="space-y-2">
              {CAMPUS_MODULES.map(l => (
                <li key={l.href}>
                  <Link to={l.href} className="text-molted-muted text-sm hover:text-molted-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-molted-white text-sm font-semibold mb-4">Company</p>
            <ul className="space-y-2.5">
              {[{ label: 'About', href: '/about' }, { label: 'Investors', href: '/investors' }, { label: 'Contact', href: 'mailto:greg.lucas@paigebreaker.com' }].map(l => (
                <li key={l.label}>
                  <a href={l.href} className="text-molted-muted text-sm hover:text-molted-white transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
          <p className="text-molted-subtle text-xs">© {new Date().getFullYear()} MoltALP. All rights reserved.</p>
          <p className="text-molted-subtle text-xs">Built with intent. Designed with purpose.</p>
        </div>
      </div>
    </footer>
  );
}

/* ── Outpost Module Banner ─────────────────────────────────────────────── */
export function OutpostBanner({ moduleName, moduleColor }: { moduleName: string; moduleColor: string }) {
  return (
    <div style={{ background: 'rgba(248,249,252,0.95)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
      <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-4 h-4 rounded-md flex-shrink-0" style={{ background: 'linear-gradient(135deg,#64748B,#2563EB,#8B5CF6)' }} />
          <span className="text-xs text-molted-subtle hidden sm:inline">
            <span className="font-semibold" style={{ color: moduleColor }}>{moduleName}</span>
            {' '}is a module of
          </span>
          <Link to="/outpost" className="text-xs font-bold hover:opacity-80 transition-opacity" style={{ background: 'linear-gradient(120deg,#64748B,#2563EB,#8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Outpost — the ALP
          </Link>
        </div>
        <Link to="/outpost" className="flex-shrink-0 flex items-center gap-1 text-xs font-semibold text-molted-muted hover:text-molted-white transition-colors">
          See the full platform <ChevronRight size={11} />
        </Link>
      </div>
    </div>
  );
}

export default function MoltedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-molted-black min-h-screen">
      <MoltedNav />
      <main>{children}</main>
      <MoltedFooter />
    </div>
  );
}
