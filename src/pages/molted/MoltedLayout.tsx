import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

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
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[620px] rounded-2xl border border-molted-border bg-molted-surface/95 backdrop-blur-xl p-5 shadow-2xl"
          style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.6)' }}
        >
          {/* Available now */}
          <p className="text-molted-muted text-xs font-semibold uppercase tracking-widest mb-3">Available Now</p>
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

          {/* Coming soon */}
          <div className="border-t border-molted-border pt-4 mb-4">
            <p className="text-molted-muted text-xs font-semibold uppercase tracking-widest mb-3">In Development</p>
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

          {/* Platform */}
          <div className="border-t border-molted-border pt-4">
            <Link
              to={PLATFORM.href}
              className="group flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors"
            >
              <div
                className="w-8 h-8 rounded-lg flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #E8A020 0%, #2DD4BF 50%, #8B5CF6 100%)' }}
              />
              <div>
                <p className="text-molted-white text-sm font-bold group-hover:text-white transition-colors">
                  {PLATFORM.label}
                  <span className="ml-2 text-xs font-medium text-molted-subtle">The Platform</span>
                </p>
                <p className="text-molted-muted text-xs">{PLATFORM.desc}</p>
              </div>
            </Link>
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
          <ProductsDropdown />
          <Link
            to="/molted/campus-os"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              location.pathname === '/molted/campus-os'
                ? 'text-molted-white bg-white/5'
                : 'text-molted-muted hover:text-molted-white hover:bg-white/5'
            }`}
          >
            Platform
          </Link>
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
            <p className="text-molted-muted text-xs font-semibold uppercase tracking-widest px-4 mb-2">Available Now</p>
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
            <p className="text-molted-muted text-xs font-semibold uppercase tracking-widest px-4 mt-4 mb-2">In Development</p>
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
              <Link to="/molted/campus-os" className="block px-4 py-3 rounded-lg text-sm font-medium text-molted-muted hover:text-molted-white hover:bg-white/5 transition-all">
                Platform (CampusOS)
              </Link>
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
            <p className="text-molted-white text-sm font-semibold mb-4">Products</p>
            <ul className="space-y-2">
              {[...PRODUCTS_NOW, ...PRODUCTS_COMING].map(l => (
                <li key={l.href}>
                  <Link to={l.href} className="text-molted-muted text-sm hover:text-molted-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/molted/campus-os" className="text-molted-muted text-sm hover:text-molted-white transition-colors">
                  CampusOS
                </Link>
              </li>
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

export default function MoltedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-molted-black min-h-screen">
      <MoltedNav />
      <main>{children}</main>
      <MoltedFooter />
    </div>
  );
}
