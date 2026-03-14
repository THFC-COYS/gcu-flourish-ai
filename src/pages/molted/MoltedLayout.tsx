import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';

function MoltedLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const textSize = { sm: 'text-lg', md: 'text-2xl', lg: 'text-4xl' }[size];
  return (
    <div className="flex items-center">
      <span className={`${textSize} font-black tracking-tight leading-none`}>
        <span className="text-molted-white/90">M</span>
        <span style={{ color: '#F5B740', textShadow: '0 0 12px rgba(245,183,64,0.8), 0 0 28px rgba(232,160,32,0.4)' }}>olt</span>
      </span>
    </div>
  );
}

/* ── Nav data ───────────────────────────────────────────────────────────── */
const THREE_PRODUCTS = [
  { label: 'Read', href: '/molted/read', segment: 'Students', color: '#E8A020', pain: 'For the student at midnight' },
  { label: 'TeachOS', href: '/molted/teachos', segment: 'Faculty', color: '#2DD4BF', pain: 'For the professor drowning in admin' },
  { label: 'Persona', href: '/molted/persona', segment: 'Institutions', color: '#E8170F', pain: 'For the provost facing the board' },
];

const CAMPUS_MODULES = [
  { label: 'Read', href: '/molted/read' },
  { label: 'TeachOS', href: '/molted/teachos' },
  { label: 'Persona', href: '/molted/persona' },
  { label: 'Pathway', href: '/molted/pathway-ai' },
  { label: 'Proof', href: '/molted/proof-ai' },
  { label: 'Retain', href: '/molted/retain-ai' },
  { label: 'Outcomes', href: '/molted/outcomes-ai' },
  { label: 'Mastery', href: '/molted/mastery-ai' },
];

/* ── Nav ────────────────────────────────────────────────────────────────── */
export function MoltedNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  function navLink(href: string, label: string, color?: string) {
    const active = location.pathname === href || location.pathname.startsWith(href + '/');
    return (
      <Link
        key={href}
        to={href}
        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:bg-white/5 ${active ? 'bg-white/5' : ''}`}
        style={
          active
            ? { color: color ?? '#F0F0F0' }
            : color
            ? { background: `linear-gradient(120deg, ${color}, ${color}cc)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }
            : undefined
        }
      >
        {label}
      </Link>
    );
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-molted-surface/90 backdrop-blur-xl border-b border-molted-border' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/molted" className="flex-shrink-0">
          <MoltedLogo size="sm" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {/* Separator */}
          {THREE_PRODUCTS.map(p => navLink(p.href, p.label, p.color))}
          <span className="w-px h-4 bg-molted-border mx-1" />
          {navLink('/molted/campus-os', 'CampusOS')}
          {navLink('/molted/about', 'About')}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="mailto:hello@molted.ai"
            className="px-5 py-2 rounded-xl text-sm font-semibold bg-molted-violet hover:bg-molted-violet-light text-white transition-all duration-200 hover:-translate-y-px"
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
        <div className="md:hidden bg-molted-surface/95 backdrop-blur-xl border-b border-molted-border max-h-[80vh] overflow-y-auto">
          <div className="max-w-6xl mx-auto px-6 py-4 space-y-1">
            <p className="text-molted-subtle text-xs font-semibold uppercase tracking-widest px-4 pb-2">Products</p>
            {THREE_PRODUCTS.map(p => (
              <Link key={p.href} to={p.href} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-all">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.color }} />
                <div>
                  <p className="text-molted-white text-sm font-semibold">{p.label}</p>
                  <p className="text-molted-muted text-xs">{p.pain}</p>
                </div>
              </Link>
            ))}
            <div className="border-t border-molted-border pt-3 mt-3">
              <Link to="/molted/campus-os" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-all border border-molted-border mb-1" style={{ background: 'linear-gradient(90deg,rgba(232,160,32,0.05),rgba(139,92,246,0.05))' }}>
                <div className="w-5 h-5 rounded-md flex-shrink-0" style={{ background: 'linear-gradient(135deg,#E8A020,#2DD4BF,#8B5CF6)' }} />
                <div>
                  <p className="text-sm font-bold" style={{ background: 'linear-gradient(120deg,#E8A020,#2DD4BF,#8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>CampusOS</p>
                  <p className="text-molted-subtle text-xs">The AI-native LMS</p>
                </div>
              </Link>
              <Link to="/molted/about" className="block px-4 py-3 rounded-lg text-sm font-medium text-molted-muted hover:text-molted-white hover:bg-white/5 transition-all">About</Link>
            </div>
            <div className="pt-3 border-t border-molted-border">
              <a href="mailto:hello@molted.ai" className="block w-full text-center px-5 py-3 rounded-xl text-sm font-semibold bg-molted-violet text-white">Get Started</a>
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
    <footer className="bg-molted-black border-t border-molted-border">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <MoltedLogo size="md" />
            <p className="mt-4 text-molted-muted text-sm leading-relaxed max-w-xs">
              Molt builds AI-native tools that transform how institutions teach,
              how students learn, and how knowledge moves.
            </p>
          </div>

          <div>
            <div className="mb-4">
              <Link to="/molted/imago-os" className="inline-flex items-center gap-2 text-sm font-black hover:opacity-80 transition-opacity" style={{ background: 'linear-gradient(120deg,#F5B740,#E8A020)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Imago — The Final Form
              </Link>
              <p className="text-molted-subtle text-xs mt-0.5">The fully transformed institution.</p>
            </div>
            <div className="mb-5">
              <Link to="/molted/campus-os" className="inline-flex items-center gap-2 text-sm font-bold hover:opacity-80 transition-opacity" style={{ background: 'linear-gradient(120deg,#E8A020,#2DD4BF,#8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Campus — The Platform
              </Link>
              <p className="text-molted-subtle text-xs mt-1">All modules. One AI-native LMS.</p>
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
              {[{ label: 'About', href: '/molted/about' }, { label: 'Contact', href: 'mailto:hello@molted.ai' }].map(l => (
                <li key={l.label}>
                  <a href={l.href} className="text-molted-muted text-sm hover:text-molted-white transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-molted-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-molted-subtle text-xs">© {new Date().getFullYear()} Molt Education. All rights reserved.</p>
          <p className="text-molted-subtle text-xs">Built with intent. Designed with purpose.</p>
        </div>
      </div>
    </footer>
  );
}

/* ── CampusOS Module Banner ─────────────────────────────────────────────── */
export function CampusOSBanner({ moduleName, moduleColor }: { moduleName: string; moduleColor: string }) {
  return (
    <div className="border-b border-molted-border" style={{ background: 'linear-gradient(90deg,rgba(232,160,32,0.05) 0%,rgba(45,212,191,0.04) 50%,rgba(139,92,246,0.05) 100%)' }}>
      <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-4 h-4 rounded-md flex-shrink-0" style={{ background: 'linear-gradient(135deg,#E8A020,#2DD4BF,#8B5CF6)' }} />
          <span className="text-xs text-molted-subtle hidden sm:inline">
            <span className="font-semibold" style={{ color: moduleColor }}>{moduleName}</span>
            {' '}is a module of
          </span>
          <Link to="/molted/campus-os" className="text-xs font-bold hover:opacity-80 transition-opacity" style={{ background: 'linear-gradient(120deg,#E8A020,#2DD4BF,#8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            CampusOS — the AI-native LMS
          </Link>
        </div>
        <Link to="/molted/campus-os" className="flex-shrink-0 flex items-center gap-1 text-xs font-semibold text-molted-muted hover:text-molted-white transition-colors">
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
