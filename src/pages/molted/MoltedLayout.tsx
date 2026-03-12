import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function MoltedLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: { mark: 'w-7 h-7 text-xs', text: 'text-base' },
    md: { mark: 'w-9 h-9 text-sm', text: 'text-xl' },
    lg: { mark: 'w-14 h-14 text-lg', text: 'text-3xl' },
  };
  const s = sizes[size];

  return (
    <div className="flex items-center gap-2.5">
      <div className={`${s.mark} rounded-xl bg-gradient-to-br from-molted-violet to-molted-ember flex items-center justify-center font-black text-white shadow-molted-violet relative overflow-hidden`}>
        <span className="relative z-10">M</span>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/10" />
      </div>
      <span className={`${s.text} font-black text-molted-white tracking-tight`}>
        Molt<span className="text-molted-violet">ED</span>{' '}
        <span className="text-molted-ember font-light italic">Ai</span>
      </span>
    </div>
  );
}

const NAV_LINKS = [
  { label: 'Products', href: '/molted' },
  { label: 'pAIgeBreaker', href: '/molted/paigebreaker' },
  { label: 'Custom Spirit', href: '/molted/custom-spirit' },
  { label: 'About', href: '/molted/about' },
];

export function MoltedNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

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
          {NAV_LINKS.map(link => {
            const active = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'text-molted-violet bg-molted-violet/10'
                    : 'text-molted-muted hover:text-molted-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="mailto:hello@molted.ai"
            className="px-5 py-2 rounded-xl text-sm font-semibold bg-molted-violet hover:bg-molted-violet-light text-white transition-all duration-200 shadow-molted-violet hover:shadow-molted-violet hover:-translate-y-px"
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
        <div className="md:hidden bg-molted-surface/95 backdrop-blur-xl border-b border-molted-border">
          <div className="max-w-6xl mx-auto px-6 py-4 space-y-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className="block px-4 py-3 rounded-lg text-sm font-medium text-molted-muted hover:text-molted-white hover:bg-white/5 transition-all"
              >
                {link.label}
              </Link>
            ))}
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
            <ul className="space-y-2.5">
              {[
                { label: 'pAIgeBreaker', href: '/molted/paigebreaker' },
                { label: 'Custom Spirit', href: '/molted/custom-spirit' },
              ].map(l => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="text-molted-muted text-sm hover:text-molted-white transition-colors"
                  >
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
                  <a
                    href={l.href}
                    className="text-molted-muted text-sm hover:text-molted-white transition-colors"
                  >
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
