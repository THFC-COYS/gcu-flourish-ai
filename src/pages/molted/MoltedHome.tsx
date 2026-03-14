import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import MoltedLayout from './MoltedLayout';

/* ── Scroll reveal ─────────────────────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('opacity-100', 'translate-y-0');
          el.classList.remove('opacity-0', 'translate-y-8');
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function RevealBlock({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`opacity-0 translate-y-8 transition-all duration-700 ease-out ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ── Hero ──────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(232,160,32,0.07) 0%, transparent 70%)' }} />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(232,23,15,0.05) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Provocation */}
        <RevealBlock className="mb-6">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest">
            Canvas was built in 2008.
          </p>
        </RevealBlock>

        {/* Headline */}
        <RevealBlock delay={80}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-molted-white leading-[1.02] tracking-tight">
            We built{' '}
            <span style={{
              background: 'linear-gradient(120deg, #F5B740 0%, #E8A020 55%, #E8170F 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              what comes next.
            </span>
          </h1>
        </RevealBlock>

        {/* Sub */}
        <RevealBlock delay={200}>
          <p className="mt-6 text-lg md:text-xl text-molted-muted max-w-lg mx-auto leading-relaxed">
            Three products. Three problems that have never been solved.
            One platform that unifies them all.
          </p>
        </RevealBlock>

        {/* Single CTA */}
        <RevealBlock delay={320} className="mt-10">
          <a
            href="mailto:hello@molted.ai"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base transition-all duration-200 hover:-translate-y-px"
            style={{ background: 'linear-gradient(120deg, #E8A020 0%, #2DD4BF 50%, #8B5CF6 100%)', color: '#0a0a0f' }}
          >
            Get Started
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </RevealBlock>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-molted-subtle animate-pulse">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-molted-subtle to-transparent" />
      </div>
    </section>
  );
}

/* ── Traction ──────────────────────────────────────────────────────────── */
function Traction() {
  return (
    <section className="py-16 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 rounded-2xl border border-molted-border p-8 md:p-12"
            style={{ background: 'rgba(17,17,24,0.6)' }}>
            <div className="text-center md:text-left">
              <p
                className="text-7xl md:text-8xl font-black leading-none"
                style={{
                  background: 'linear-gradient(120deg, #F5B740, #E8A020)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                50,000+
              </p>
              <p className="text-molted-white font-semibold text-xl mt-2">student interactions.</p>
              <p className="text-molted-muted text-base mt-1">Live today. Not a projection.</p>
            </div>
            <div className="flex flex-col gap-4 text-center md:text-right">
              {[
                { value: '6', label: 'AI personas deployed' },
                { value: '24/7', label: 'Always available' },
                { value: '1', label: 'Flagship university partner' },
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-3xl font-black text-molted-white">{s.value}</p>
                  <p className="text-molted-muted text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Three Segments ────────────────────────────────────────────────────── */
const SEGMENTS = [
  {
    segment: 'Students',
    color: '#E8A020',
    person: 'The student at 11:47 PM.',
    pain: '"I don\'t understand this and my exam is at 8 AM."',
    product: 'Read',
    href: '/molted/read',
    tagline: 'Answers any question about any text. Right now.',
    live: true,
  },
  {
    segment: 'Faculty',
    color: '#2DD4BF',
    person: 'The professor who hasn\'t eaten lunch since Tuesday.',
    pain: '"I have 140 students and zero time to actually teach."',
    product: 'Teach',
    href: '/molted/teachos',
    tagline: 'Reclaims 23 hours of admin per week.',
    live: true,
  },
  {
    segment: 'Institutions',
    color: '#E8170F',
    person: 'The provost standing in front of the board on Thursday.',
    pain: '"I can\'t prove any of this is working."',
    product: 'Persona',
    href: '/molted/persona',
    tagline: 'Your institution\'s voice, everywhere, always on.',
    live: true,
  },
];

function ThreeSegments() {
  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="mb-16 text-center">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">
            Three people. Three products.
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            Start with the person in pain.
          </h2>
        </RevealBlock>

        <div className="grid md:grid-cols-3 gap-6">
          {SEGMENTS.map((s, i) => (
            <RevealBlock key={s.segment} delay={i * 120}>
              <Link
                to={s.href}
                className="group flex flex-col h-full rounded-2xl border bg-molted-elevated p-8 transition-all duration-300 hover:-translate-y-1"
                style={{ borderColor: `${s.color}22` }}
              >
                {/* Segment badge */}
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 self-start"
                  style={{ background: `${s.color}12`, color: s.color, border: `1px solid ${s.color}25` }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
                  {s.segment}
                </div>

                {/* Person */}
                <p className="text-molted-white text-sm font-semibold mb-2">{s.person}</p>

                {/* Pain quote */}
                <p className="text-molted-muted text-sm italic leading-relaxed mb-8 flex-1">
                  {s.pain}
                </p>

                {/* Product */}
                <div className="border-t pt-6" style={{ borderColor: `${s.color}20` }}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-2xl font-black text-molted-white">{s.product}</p>
                    <span className="flex items-center gap-1.5 text-xs text-green-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      Live
                    </span>
                  </div>
                  <p className="text-sm leading-snug mb-4" style={{ color: s.color }}>{s.tagline}</p>
                  <div
                    className="inline-flex items-center gap-1.5 text-xs font-bold group-hover:gap-2.5 transition-all"
                    style={{ color: s.color }}
                  >
                    Explore {s.product} <ChevronRight size={12} />
                  </div>
                </div>
              </Link>
            </RevealBlock>
          ))}
        </div>

        {/* Campus bridge */}
        <RevealBlock delay={400} className="mt-10 text-center">
          <p className="text-molted-muted text-sm">
            When all three run on the same campus —{' '}
            <Link to="/molted/campus-os" className="font-bold hover:opacity-80 transition-opacity" style={{ background: 'linear-gradient(120deg,#E8A020,#2DD4BF,#8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              that's Campus.
            </Link>
          </p>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Campus Teaser ─────────────────────────────────────────────────────── */
function CampusTeaser() {
  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock>
          <Link
            to="/molted/campus-os"
            className="group block relative rounded-3xl overflow-hidden border border-molted-border p-12 md:p-16 text-center hover:border-opacity-60 transition-all duration-500"
            style={{ background: 'rgba(10,10,15,0.8)' }}
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/4 w-[400px] h-[300px] rounded-full" style={{ background: 'radial-gradient(ellipse,rgba(232,160,32,0.06) 0%,transparent 70%)' }} />
              <div className="absolute top-0 right-1/4 w-[400px] h-[300px] rounded-full" style={{ background: 'radial-gradient(ellipse,rgba(45,212,191,0.06) 0%,transparent 70%)' }} />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full" style={{ background: 'radial-gradient(ellipse,rgba(139,92,246,0.05) 0%,transparent 70%)' }} />
            </div>
            <div className="relative z-10">
              <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-6">The platform</p>
              <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6"
                style={{ background: 'linear-gradient(135deg,#E8A020 0%,#2DD4BF 50%,#8B5CF6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Campus
              </h2>
              <p className="text-xl md:text-2xl text-molted-white/80 font-semibold mb-4 max-w-xl mx-auto">
                The AI-native LMS. Canvas was built in 2008.
              </p>
              <p className="text-molted-muted text-base max-w-lg mx-auto leading-relaxed mb-8">
                Built from scratch for the AI era. Read, Teach, and Persona become native features —
                not integrations, not plugins. Features.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {['Read', 'Teach', 'Persona', 'Pathway', 'Proof', 'Retain', 'Outcomes', 'Mastery'].map((name, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full text-xs font-medium border border-molted-border text-molted-muted">{name}</span>
                ))}
              </div>
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all group-hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(120deg,#E8A020,#2DD4BF,#8B5CF6)', color: '#0A0A0F' }}>
                See Campus <ArrowRight size={14} />
              </div>
            </div>
          </Link>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Pricing Signal ────────────────────────────────────────────────────── */
function PricingSignal() {
  return (
    <section className="py-16 px-6 border-t border-molted-border">
      <div className="max-w-4xl mx-auto text-center">
        <RevealBlock>
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Pricing</p>
          <p className="text-3xl md:text-4xl font-black text-molted-white tracking-tight">
            Per-student pricing. No surprises.
          </p>
          <p className="mt-4 text-molted-muted text-lg max-w-xl mx-auto leading-relaxed">
            Module-based licensing means you adopt what you need. Transparent contracts.
            No enterprise sales labyrinth. Pricing provided after a 30-minute discovery call.
          </p>
          <a href="mailto:hello@molted.ai?subject=Pricing Inquiry"
            className="mt-8 inline-flex items-center gap-2 text-sm font-bold hover:opacity-80 transition-opacity"
            style={{ color: '#E8A020' }}>
            Request pricing <ChevronRight size={14} />
          </a>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Manifesto ─────────────────────────────────────────────────────────── */
function Manifesto() {
  return (
    <section className="py-32 px-6 border-t border-molted-border relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(232,160,32,0.04) 0%, transparent 70%)' }} />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <RevealBlock>
          {[
            { text: 'Education is the highest-leverage act', accent: false },
            { text: 'in human civilization.', accent: false },
            { text: 'We are building the tools', accent: false },
            { text: 'that make it radically better.', accent: true },
          ].map((line, i) => (
            <p key={i} className={`text-3xl md:text-5xl font-black leading-tight tracking-tight ${line.accent ? 'text-molted-violet' : 'text-molted-white'}`}>
              {line.text}
            </p>
          ))}
          <p className="mt-10 text-molted-muted text-sm tracking-widest">— Molt</p>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Final CTA ─────────────────────────────────────────────────────────── */
function FinalCTA() {
  return (
    <section className="py-32 px-6 border-t border-molted-border">
      <div className="max-w-3xl mx-auto text-center">
        <RevealBlock>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            Ready to molt?
          </h2>
          <p className="mt-6 text-molted-muted text-lg leading-relaxed">
            We're actively onboarding institutional partners. The conversation takes 30 minutes.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:hello@molted.ai"
              className="group flex items-center gap-2.5 px-8 py-4 rounded-xl text-white font-bold text-lg transition-all duration-200 hover:-translate-y-px"
              style={{ background: 'linear-gradient(135deg, #E8A020 0%, #E8170F 100%)' }}
            >
              Schedule a Demo
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <Link to="/molted/about" className="px-8 py-4 rounded-xl border border-molted-border text-molted-muted hover:text-molted-white hover:border-molted-subtle font-semibold transition-all">
              About Molt
            </Link>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────── */
export default function MoltedHome() {
  return (
    <MoltedLayout>
      <Hero />
      <Traction />
      <ThreeSegments />
      <CampusTeaser />
      <PricingSignal />
      <Manifesto />
      <FinalCTA />
    </MoltedLayout>
  );
}
