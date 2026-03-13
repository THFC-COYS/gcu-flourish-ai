import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Globe, Users, Zap, ChevronRight } from 'lucide-react';
import MoltedLayout from './MoltedLayout';

/* ── Scroll reveal hook ────────────────────────────────────────────────── */
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
    <div
      ref={ref}
      className={`opacity-0 translate-y-8 transition-all duration-700 ease-out ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ── Ambient orbs ──────────────────────────────────────────────────────── */
function AmbientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(ellipse at center, rgba(232,160,32,0.08) 0%, transparent 70%)' }}
      />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(ellipse at center, rgba(232,23,15,0.06) 0%, transparent 70%)' }}
      />
      <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(ellipse at center, rgba(45,212,191,0.04) 0%, transparent 70%)' }}
      />
    </div>
  );
}

/* ── Hero ──────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <AmbientOrbs />

      {/* Tagline chip */}
      <RevealBlock className="mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-molted-violet/30 bg-molted-violet/10 text-molted-violet text-xs font-semibold tracking-wide uppercase">
          <Sparkles size={12} />
          AI EdTech · Nine Products · One Platform
        </div>
      </RevealBlock>

      {/* Main headline */}
      <RevealBlock delay={100}>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-molted-white leading-[1.02] tracking-tight max-w-5xl">
          Education.{' '}
          <span
            style={{
              background: 'linear-gradient(120deg, #F5B740 0%, #E8A020 55%, #E8170F 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Transformed.
          </span>
        </h1>
      </RevealBlock>

      {/* Sub-headline */}
      <RevealBlock delay={200}>
        <p className="mt-8 text-lg md:text-xl text-molted-muted max-w-xl leading-relaxed">
          From the student struggling at midnight to the provost measuring outcomes —
          MoltED Ai covers the entire education stack.
        </p>
      </RevealBlock>

      {/* CTAs */}
      <RevealBlock delay={300} className="mt-10 flex flex-col sm:flex-row items-center gap-4 flex-wrap justify-center">
        <Link
          to="/molted/paigebreaker"
          className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-molted-violet hover:bg-molted-violet-light text-white font-semibold transition-all duration-200 hover:-translate-y-px"
        >
          pAIgeBreaker
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link
          to="/molted/teachos"
          className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-molted-border hover:border-[#2DD4BF]/40 text-molted-white font-semibold transition-all duration-200 hover:text-[#2DD4BF]"
        >
          TeachOS
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link
          to="/molted/campus-os"
          className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-molted-border text-molted-muted hover:text-molted-white hover:border-molted-subtle font-semibold transition-all duration-200"
        >
          CampusOS
          <ChevronRight size={16} />
        </Link>
      </RevealBlock>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-molted-subtle animate-pulse">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-molted-subtle to-transparent" />
      </div>
    </section>
  );
}

/* ── Mission ───────────────────────────────────────────────────────────── */
function Mission() {
  const ref = useReveal();
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div ref={ref} className="opacity-0 translate-y-8 transition-all duration-1000 ease-out">
          <p className="text-3xl md:text-5xl lg:text-6xl font-black text-molted-white leading-[1.1] tracking-tight">
            "The best schools in the world have great teachers.
          </p>
          <p
            className="mt-4 text-3xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight"
            style={{
              background: 'linear-gradient(120deg, #F5B740 0%, #E8A020 55%, #E8170F 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            We give every student the world's best teacher."
          </p>
          <p className="mt-8 text-molted-muted text-base">— MoltED Ai</p>
        </div>
      </div>
    </section>
  );
}

/* ── Products — Available Now ──────────────────────────────────────────── */
const LIVE_PRODUCTS = [
  {
    num: '01',
    name: 'pAIgeBreaker',
    color: '#E8A020',
    glow: 'rgba(232,160,32,0.15)',
    audience: 'For Students',
    tagline: 'Every question answered. Every page. Every hour.',
    desc: 'AI that turns any textbook or document into a live conversation. Students ask in plain English, get curriculum-aligned answers instantly — at 2 AM, without a tutor.',
    href: '/molted/paigebreaker',
    live: true,
  },
  {
    num: '02',
    name: 'Persona Ai',
    color: '#E8170F',
    glow: 'rgba(232,23,15,0.12)',
    audience: 'For Institutions',
    tagline: "Your institution's voice, everywhere, always.",
    desc: 'Custom AI personas trained on your identity, values, and curriculum. Not a chatbot. A persona. Six live instances deployed at Grand Canyon University.',
    href: '/molted/persona-ai',
    live: true,
  },
  {
    num: '03',
    name: 'TeachOS',
    color: '#2DD4BF',
    glow: 'rgba(45,212,191,0.12)',
    audience: 'For Faculty',
    tagline: 'The AI operating system for every educator.',
    desc: 'Reclaims the 23 hours per week faculty spend on administration — grading, discussion boards, announcements, student emails. All automated. You review, approve, teach.',
    href: '/molted/teachos',
    live: true,
  },
];

function LiveProducts() {
  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="mb-12">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-2">Available now</p>
              <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
                Three products. In production.
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-green-400">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              All systems live
            </div>
          </div>
        </RevealBlock>

        <div className="grid md:grid-cols-3 gap-6">
          {LIVE_PRODUCTS.map((p, i) => (
            <RevealBlock key={p.num} delay={i * 100}>
              <Link
                to={p.href}
                className="group block rounded-2xl border border-molted-border bg-molted-elevated p-7 h-full hover:border-opacity-60 transition-all duration-300 hover:-translate-y-1"
                style={{ '--glow': p.glow } as React.CSSProperties}
              >
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{ background: `${p.color}15`, color: p.color, border: `1px solid ${p.color}25` }}
                  >
                    {p.audience}
                  </span>
                  <span className="text-molted-subtle text-xs">{p.num}</span>
                </div>
                <h3
                  className="text-2xl font-black tracking-tight mb-3 transition-colors"
                  style={{ color: '#F5F5F7' }}
                >
                  {p.name}
                </h3>
                <p className="text-sm font-semibold mb-3" style={{ color: p.color }}>
                  {p.tagline}
                </p>
                <p className="text-molted-muted text-sm leading-relaxed mb-6">{p.desc}</p>
                <div
                  className="inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all"
                  style={{ color: p.color }}
                >
                  Explore <ChevronRight size={14} />
                </div>
              </Link>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Products — In Development ─────────────────────────────────────────── */
const COMING_PRODUCTS = [
  {
    name: 'PathwayAi',
    color: '#8B5CF6',
    audience: 'Students',
    tagline: 'Every student on their own learning path.',
    desc: 'Adaptive learning engine built on real interaction data. Netflix for education.',
    href: '/molted/pathway-ai',
  },
  {
    name: 'ProofAi',
    color: '#F97316',
    audience: 'Faculty',
    tagline: "Assessment for the post-ChatGPT world.",
    desc: 'Oral AI assessments, portfolio-based competency verification. You can\'t outsource a conversation.',
    href: '/molted/proof-ai',
  },
  {
    name: 'RetainAi',
    color: '#F43F5E',
    audience: 'Institutions',
    tagline: 'Every student who was about to leave — didn\'t.',
    desc: 'Identifies departure risk weeks before students decide, triggers the right intervention.',
    href: '/molted/retain-ai',
  },
  {
    name: 'OutcomesAi',
    color: '#0EA5E9',
    audience: 'Leadership',
    tagline: 'Finally know if any of it is working.',
    desc: 'Intelligence layer for provosts, deans, and boards. Real-time institutional analytics.',
    href: '/molted/outcomes-ai',
  },
  {
    name: 'MasteryAi',
    color: '#10B981',
    audience: 'Curriculum',
    tagline: 'Stop teaching time. Start teaching mastery.',
    desc: 'Rebuilds any existing course as a competency-based learning experience — in minutes.',
    href: '/molted/mastery-ai',
  },
];

function ComingProducts() {
  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="mb-12">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-2">In development</p>
              <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
                Four products. Building now.
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-molted-muted">
              <div className="w-1.5 h-1.5 rounded-full bg-molted-muted" />
              Early access available
            </div>
          </div>
        </RevealBlock>

        <div className="grid md:grid-cols-2 gap-5">
          {COMING_PRODUCTS.map((p, i) => (
            <RevealBlock key={p.name} delay={i * 80}>
              <Link
                to={p.href}
                className="group flex gap-5 p-6 rounded-2xl border border-molted-border bg-molted-elevated/50 hover:bg-molted-elevated hover:border-opacity-80 transition-all duration-300"
              >
                <div
                  className="w-10 h-10 rounded-xl flex-shrink-0 mt-0.5"
                  style={{ background: `${p.color}15`, border: `1px solid ${p.color}25` }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-molted-white font-bold">{p.name}</p>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: `${p.color}10`, color: p.color, border: `1px solid ${p.color}20` }}
                    >
                      {p.audience}
                    </span>
                  </div>
                  <p className="text-sm font-semibold mb-1.5" style={{ color: p.color }}>{p.tagline}</p>
                  <p className="text-molted-muted text-sm leading-relaxed">{p.desc}</p>
                </div>
                <ChevronRight
                  size={16}
                  className="text-molted-subtle group-hover:text-molted-muted flex-shrink-0 mt-1 group-hover:translate-x-1 transition-all"
                />
              </Link>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CampusOS Platform Teaser ──────────────────────────────────────────── */
function PlatformTeaser() {
  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock>
          <Link
            to="/molted/campus-os"
            className="group block relative rounded-3xl overflow-hidden border border-molted-border p-12 md:p-16 text-center hover:border-opacity-60 transition-all duration-500"
            style={{ background: 'rgba(10,10,15,0.8)' }}
          >
            {/* Multi-color ambient */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/4 w-[400px] h-[300px] rounded-full"
                style={{ background: 'radial-gradient(ellipse, rgba(232,160,32,0.06) 0%, transparent 70%)' }} />
              <div className="absolute top-0 right-1/4 w-[400px] h-[300px] rounded-full"
                style={{ background: 'radial-gradient(ellipse, rgba(45,212,191,0.06) 0%, transparent 70%)' }} />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full"
                style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.05) 0%, transparent 70%)' }} />
            </div>

            <div className="relative z-10">
              <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-6">The platform</p>
              <h2
                className="text-5xl md:text-7xl font-black tracking-tight mb-6"
                style={{
                  background: 'linear-gradient(135deg, #E8A020 0%, #2DD4BF 50%, #8B5CF6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                CampusOS
              </h2>
              <p className="text-xl md:text-2xl text-molted-white/80 font-semibold mb-4 max-w-xl mx-auto">
                The AI-native LMS built for the world that exists now.
              </p>
              <p className="text-molted-muted text-base max-w-lg mx-auto leading-relaxed mb-8">
                Canvas was built before the iPhone was a year old. We're building the replacement —
                from scratch, for the AI era. Every MoltED product becomes a native feature.
              </p>

              {/* Product orbit mockup */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {['pAIgeBreaker', 'Persona Ai', 'TeachOS', 'PathwayAi', 'ProofAi', 'RetainAi', 'OutcomesAi', 'MasteryAi'].map((name, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-full text-xs font-medium border border-molted-border text-molted-muted"
                  >
                    {name}
                  </span>
                ))}
                <span
                  className="px-3 py-1.5 rounded-full text-xs font-bold border text-molted-white"
                  style={{ borderColor: 'rgba(139,92,246,0.4)', background: 'rgba(139,92,246,0.1)' }}
                >
                  All built in.
                </span>
              </div>

              <div className="inline-flex items-center gap-2 text-molted-muted font-semibold group-hover:text-molted-white group-hover:gap-3 transition-all">
                Explore CampusOS <ArrowRight size={16} />
              </div>
            </div>
          </Link>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Stats ─────────────────────────────────────────────────────────────── */
function Stats() {
  const stats = [
    { value: '50K+', label: 'Student interactions served', icon: Users, color: 'text-molted-violet' },
    { value: '6', label: 'Spirit personas deployed', icon: Sparkles, color: 'text-molted-ember' },
    { value: '24/7', label: 'Always available', icon: Zap, color: 'text-emerald-400' },
    { value: '1', label: 'Flagship university partner', icon: Globe, color: 'text-sky-400' },
  ];

  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">By the numbers</p>
          <h2 className="text-3xl md:text-5xl font-black text-molted-white tracking-tight">
            Real impact. Already.
          </h2>
        </RevealBlock>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <RevealBlock key={i} delay={i * 100}>
              <div className="bg-molted-elevated border border-molted-border rounded-2xl p-6 text-center hover:border-molted-border/80 transition-all">
                <s.icon size={24} className={`mx-auto mb-4 ${s.color}`} />
                <p className="text-4xl font-black text-molted-white">{s.value}</p>
                <p className="text-molted-muted text-sm mt-2 leading-snug">{s.label}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Manifesto ─────────────────────────────────────────────────────────── */
function Manifesto() {
  return (
    <section className="py-32 px-6 border-t border-molted-border relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(232,160,32,0.04) 0%, transparent 70%)' }}
      />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <RevealBlock>
          {[
            { text: 'Education is the highest-leverage act', accent: false },
            { text: 'in human civilization.', accent: false },
            { text: 'We are building the tools', accent: false },
            { text: 'that make it radically better.', accent: true },
          ].map((line, i) => (
            <p
              key={i}
              className={`text-3xl md:text-5xl font-black leading-tight tracking-tight ${
                line.accent ? 'text-molted-violet' : 'text-molted-white'
              }`}
            >
              {line.text}
            </p>
          ))}
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
            Ready to transform<br />
            <span className="text-molted-ember">your institution?</span>
          </h2>
          <p className="mt-6 text-molted-muted text-lg leading-relaxed">
            MoltED Ai is actively onboarding institutional partners.
            Let's build your future together.
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
            <Link
              to="/molted/about"
              className="px-8 py-4 rounded-xl border border-molted-border text-molted-muted hover:text-molted-white hover:border-molted-subtle font-semibold transition-all"
            >
              Learn About MoltED
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
      <Mission />
      <LiveProducts />
      <ComingProducts />
      <PlatformTeaser />
      <Stats />
      <Manifesto />
      <FinalCTA />
    </MoltedLayout>
  );
}
