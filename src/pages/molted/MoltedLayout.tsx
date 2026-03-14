import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';

function MoltedLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const textSize = { sm: 'text-lg', md: 'text-2xl', lg: 'text-4xl' }[size];

  return (
    <div className="flex items-center">
      <span className={`${textSize} font-black tracking-tight leading-none`}>
        <span className="text-molted-white/90">molt</span>
        <span
          style={{
            color: '#F5B740',
            textShadow: '0 0 12px rgba(245,183,64,0.9), 0 0 30px rgba(232,160,32,0.5), 0 0 60px rgba(232,160,32,0.2)',
          }}
        >
          ed
        </span>
        <span style={{ color: '#E8170F', fontWeight: 900, letterSpacing: '-0.01em' }}>Ai</span>
      </span>
    </div>
  );
}

const PRODUCTS_NOW = [
  {
    label: 'pAIgeBreaker',
    href: '/molted/paigebreaker',
    desc: 'AI that answers any question about any text',
    color: '#E8A020',
    audience: 'Students',
  },
  {
    label: 'Persona Ai',
    href: '/molted/persona-ai',
    desc: "Your institution's voice, everywhere, always",
    color: '#E8170F',
    audience: 'Institutions',
  },
  {
    label: 'TeachOS',
    href: '/molted/teachos',
    desc: 'AI operating system for every faculty member',
    color: '#2DD4BF',
    audience: 'Faculty',
  },
];

const PRODUCTS_COMING = [
  {
    label: 'PathwayAi',
    href: '/molted/pathway-ai',
    desc: 'Adaptive learning paths for every student',
    color: '#8B5CF6',
    audience: 'Students',
  },
  {
    label: 'ProofAi',
    href: '/molted/proof-ai',
    desc: 'Assessment for the post-ChatGPT world',
    color: '#F97316',
    audience: 'Faculty',
  },
  {
    label: 'RetainAi',
    href: '/molted/retain-ai',
    desc: 'Stop student departure before it happens',
    color: '#F43F5E',
    audience: 'Institutions',
  },
  {
    label: 'OutcomesAi',
    href: '/molted/outcomes-ai',
    desc: 'Intelligence layer for institutional leadership',
    color: '#0EA5E9',
    audience: 'Leadership',
  },
  {
    label: 'MasteryAi',
    href: '/molted/mastery-ai',
    desc: 'Competency-based course redesign in minutes',
    color: '#10B981',
    audience: 'Curriculum',
  },
];

const PLATFORM = {
  label: 'CampusOS',
  href: '/molted/campus-os',
  desc: 'The AI-native LMS. Everything MoltED builds in one platform.',
  color: '#E8A020',
};

const IMAGO = {
  label: 'ImagoOS',
  href: '/molted/imago-os',
  desc: 'The final form. The fully transformed institution.',
  color: '#F5B740',
};

function ProductsDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const isActive = location.pathname.startsWith('/molted/') && location.pathname !== '/molted/about';

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          isActive
            ? 'text-molted-white bg-white/5'
            : 'text-molted-muted hover:text-molted-white hover:bg-white/5'
        }`}
      >
        Products
        <ChevronDown size={13} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[640px] rounded-2xl border border-molted-border bg-molted-surface/95 backdrop-blur-xl shadow-2xl overflow-hidden"
          style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.6)' }}
        >
          {/* ImagoOS apex bar */}
          <Link
            to={IMAGO.href}
            className="group flex items-center gap-3 px-5 py-3 border-b border-molted-border hover:bg-white/5 transition-colors"
            style={{ background: 'linear-gradient(90deg, rgba(245,183,64,0.07) 0%, rgba(232,160,32,0.04) 100%)' }}
          >
            <div
              className="w-5 h-5 rounded-md flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #F5B740 0%, #E8A020 100%)', boxShadow: '0 0 10px rgba(245,183,64,0.3)' }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <p
                  className="text-xs font-black tracking-wide"
                  style={{
                    background: 'linear-gradient(120deg, #F5B740, #E8A020)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  ImagoOS
                </p>
                <p className="text-molted-subtle text-xs">The final form — the fully transformed institution</p>
              </div>
            </div>
            <ChevronDown size={11} className="text-molted-subtle -rotate-90 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          {/* CampusOS header bar */}
          <Link
            to={PLATFORM.href}
            className="group flex items-center gap-3 px-5 py-3.5 border-b border-molted-border hover:bg-white/5 transition-colors"
            style={{ background: 'linear-gradient(90deg, rgba(232,160,32,0.06) 0%, rgba(45,212,191,0.04) 50%, rgba(139,92,246,0.06) 100%)' }}
          >
            <div
              className="w-7 h-7 rounded-lg flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #E8A020 0%, #2DD4BF 50%, #8B5CF6 100%)' }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <p
                  className="text-sm font-bold"
                  style={{
                    background: 'linear-gradient(120deg, #E8A020, #2DD4BF, #8B5CF6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  CampusOS
                </p>
                <p className="text-molted-subtle text-xs">The AI-native LMS — all modules, one platform</p>
              </div>
            </div>
            <ChevronDown size={12} className="text-molted-subtle -rotate-90 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <div className="p-5">
            {/* Live modules */}
            <p className="text-molted-muted text-xs font-semibold uppercase tracking-widest mb-3">Live Modules</p>
            <div className="grid grid-cols-3 gap-2 mb-5">
              {PRODUCTS_NOW.map(p => (
                <Link
                  key={p.href}
                  to={p.href}
                  className="group p-3 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
                    <p className="text-molted-white text-sm font-semibold group-hover:text-white transition-colors">
                      {p.label}
                    </p>
                  </div>
                  <p className="text-molted-muted text-xs leading-relaxed">{p.desc}</p>
                  <p className="text-xs mt-1.5 font-medium" style={{ color: p.color }}>{p.audience}</p>
                </Link>
              ))}
            </div>

            {/* Upcoming modules */}
            <div className="border-t border-molted-border pt-4">
              <p className="text-molted-muted text-xs font-semibold uppercase tracking-widest mb-3">Upcoming Modules</p>
              <div className="grid grid-cols-4 gap-2">
                {PRODUCTS_COMING.map(p => (
                  <Link
                    key={p.href}
                    to={p.href}
                    className="group p-3 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1.5 h-1.5 rounded-full opacity-60" style={{ background: p.color }} />
                      <p className="text-molted-muted text-xs font-semibold group-hover:text-molted-white transition-colors">
                        {p.label}
                      </p>
                    </div>
                    <p className="text-molted-subtle text-xs leading-relaxed">{p.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

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

  const allProducts = [...PRODUCTS_NOW, ...PRODUCTS_COMING, PLATFORM];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-molted-surface/90 backdrop-blur-xl border-b border-molted-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/molted" className="flex-shrink-0">
          <MoltedLogo size="sm" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          <Link
            to="/molted/imago-os"
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:bg-white/5 ${
              location.pathname === '/molted/imago-os' ? 'bg-white/5' : ''
            }`}
            style={{
              color: location.pathname === '/molted/imago-os' ? '#F5B740' : undefined,
              background: location.pathname === '/molted/imago-os'
                ? undefined
                : 'linear-gradient(120deg, #F5B740, #E8A020, #D97706)',
              WebkitBackgroundClip: location.pathname === '/molted/imago-os' ? undefined : 'text',
              WebkitTextFillColor: location.pathname === '/molted/imago-os' ? undefined : 'transparent',
              backgroundClip: location.pathname === '/molted/imago-os' ? undefined : 'text',
              textShadow: location.pathname === '/molted/imago-os' ? '0 0 20px rgba(245,183,64,0.4)' : undefined,
            }}
          >
            ImagoOS
          </Link>
          <Link
            to="/molted/campus-os"
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              location.pathname === '/molted/campus-os'
                ? 'text-molted-white bg-white/5'
                : 'hover:bg-white/5'
            }`}
            style={{
              background: location.pathname === '/molted/campus-os'
                ? undefined
                : 'linear-gradient(120deg, #E8A020, #2DD4BF, #8B5CF6)',
              WebkitBackgroundClip: location.pathname === '/molted/campus-os' ? undefined : 'text',
              WebkitTextFillColor: location.pathname === '/molted/campus-os' ? undefined : 'transparent',
              backgroundClip: location.pathname === '/molted/campus-os' ? undefined : 'text',
            }}
          >
            CampusOS
          </Link>
          <ProductsDropdown />
          <Link
            to="/molted/about"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              location.pathname === '/molted/about'
                ? 'text-molted-white bg-white/5'
                : 'text-molted-muted hover:text-molted-white hover:bg-white/5'
            }`}
          >
            About
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="mailto:hello@molted.ai"
            className="px-5 py-2 rounded-xl text-sm font-semibold bg-molted-violet hover:bg-molted-violet-light text-white transition-all duration-200 hover:-translate-y-px"
          >
            Get Started
          </a>
        </div>

        {/* Mobile menu toggle */}
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
          <div className="max-w-6xl mx-auto px-6 py-4">
            {/* ImagoOS */}
            <Link
              to="/molted/imago-os"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-all mb-2 border"
              style={{ background: 'rgba(245,183,64,0.06)', borderColor: 'rgba(245,183,64,0.2)' }}
            >
              <div className="w-5 h-5 rounded-md flex-shrink-0" style={{ background: 'linear-gradient(135deg, #F5B740, #E8A020)', boxShadow: '0 0 8px rgba(245,183,64,0.3)' }} />
              <div>
                <p className="text-sm font-black" style={{ background: 'linear-gradient(120deg,#F5B740,#E8A020)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>ImagoOS</p>
                <p className="text-molted-subtle text-xs">The final form</p>
              </div>
            </Link>
            {/* CampusOS */}
            <Link
              to="/molted/campus-os"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-all mb-2 border border-molted-border"
              style={{ background: 'linear-gradient(90deg, rgba(232,160,32,0.06), rgba(139,92,246,0.06))' }}
            >
              <div className="w-5 h-5 rounded-md flex-shrink-0" style={{ background: 'linear-gradient(135deg, #E8A020 0%, #2DD4BF 50%, #8B5CF6 100%)' }} />
              <div>
                <p className="text-sm font-bold" style={{ background: 'linear-gradient(120deg,#E8A020,#2DD4BF,#8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>CampusOS</p>
                <p className="text-molted-subtle text-xs">The full AI-native LMS</p>
              </div>
            </Link>
            <p className="text-molted-muted text-xs font-semibold uppercase tracking-widest px-4 mb-2 mt-4">Live Modules</p>
            {PRODUCTS_NOW.map(p => (
              <Link
                key={p.href}
                to={p.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-all"
              >
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.color }} />
                <div>
                  <p className="text-molted-white text-sm font-semibold">{p.label}</p>
                  <p className="text-molted-muted text-xs">{p.desc}</p>
                </div>
              </Link>
            ))}
            <p className="text-molted-muted text-xs font-semibold uppercase tracking-widest px-4 mt-4 mb-2">Upcoming Modules</p>
            {PRODUCTS_COMING.map(p => (
              <Link
                key={p.href}
                to={p.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-all"
              >
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-60" style={{ background: p.color }} />
                <div>
                  <p className="text-molted-muted text-sm font-semibold">{p.label}</p>
                  <p className="text-molted-subtle text-xs">{p.desc}</p>
                </div>
              </Link>
            ))}
            <div className="border-t border-molted-border mt-3 pt-3 space-y-1">
              <Link to="/molted/about" className="block px-4 py-3 rounded-lg text-sm font-medium text-molted-muted hover:text-molted-white hover:bg-white/5 transition-all">
                About
              </Link>
            </div>
            <div className="pt-3 border-t border-molted-border mt-3">
              <a
                href="mailto:hello@molted.ai"
                className="block w-full text-center px-5 py-3 rounded-xl text-sm font-semibold bg-molted-violet text-white"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export function MoltedFooter() {
  return (
    <footer className="bg-molted-black border-t border-molted-border">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <MoltedLogo size="md" />
            <p className="mt-4 text-molted-muted text-sm leading-relaxed max-w-xs">
              MoltED Ai builds AI-native tools that transform how institutions teach,
              how students learn, and how knowledge moves.
            </p>
            <p className="mt-6 text-molted-subtle text-xs">
              LLC formation pending · Name availability verification in progress
            </p>
          </div>

          <div>
            <div className="mb-4">
              <Link
                to="/molted/imago-os"
                className="inline-flex items-center gap-2 text-sm font-black hover:opacity-80 transition-opacity"
                style={{
                  background: 'linear-gradient(120deg, #F5B740, #E8A020)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                ImagoOS — The Final Form
              </Link>
              <p className="text-molted-subtle text-xs mt-0.5">The fully transformed institution.</p>
            </div>
            <div className="mb-5">
              <Link
                to="/molted/campus-os"
                className="inline-flex items-center gap-2 text-sm font-bold hover:opacity-80 transition-opacity"
                style={{
                  background: 'linear-gradient(120deg, #E8A020, #2DD4BF, #8B5CF6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                CampusOS — The Platform
              </Link>
              <p className="text-molted-subtle text-xs mt-1">All modules. One AI-native LMS.</p>
            </div>
            <p className="text-molted-white text-sm font-semibold mb-3">Modules</p>
            <ul className="space-y-2">
              {[...PRODUCTS_NOW, ...PRODUCTS_COMING].map(l => (
                <li key={l.href}>
                  <Link to={l.href} className="text-molted-muted text-sm hover:text-molted-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-molted-white text-sm font-semibold mb-4">Company</p>
            <ul className="space-y-2.5">
              {[
                { label: 'About', href: '/molted/about' },
                { label: 'Contact', href: 'mailto:hello@molted.ai' },
              ].map(l => (
                <li key={l.label}>
                  <a href={l.href} className="text-molted-muted text-sm hover:text-molted-white transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-molted-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-molted-subtle text-xs">
            © {new Date().getFullYear()} MoltED Ai LLC. All rights reserved.
          </p>
          <p className="text-molted-subtle text-xs">
            Built with intent. Designed with purpose.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ── CampusOS Module Banner ─────────────────────────────────────────────── */
export function CampusOSBanner({ moduleName, moduleColor }: { moduleName: string; moduleColor: string }) {
  return (
    <div
      className="border-b border-molted-border"
      style={{ background: 'linear-gradient(90deg, rgba(232,160,32,0.05) 0%, rgba(45,212,191,0.04) 50%, rgba(139,92,246,0.05) 100%)' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-4 h-4 rounded-md flex-shrink-0" style={{ background: 'linear-gradient(135deg,#E8A020,#2DD4BF,#8B5CF6)' }} />
          <span className="text-xs text-molted-subtle hidden sm:inline">
            <span className="font-semibold" style={{ color: moduleColor }}>{moduleName}</span>
            {' '}is a module of
          </span>
          <Link
            to="/molted/campus-os"
            className="text-xs font-bold hover:opacity-80 transition-opacity"
            style={{ background: 'linear-gradient(120deg,#E8A020,#2DD4BF,#8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
          >
            CampusOS — the AI-native LMS
          </Link>
        </div>
        <Link
          to="/molted/campus-os"
          className="flex-shrink-0 flex items-center gap-1 text-xs font-semibold text-molted-muted hover:text-molted-white transition-colors"
        >
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
