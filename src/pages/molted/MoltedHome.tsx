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
        <Link
          to="/molted/campus-os"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold tracking-wide uppercase hover:opacity-80 transition-opacity"
          style={{ borderColor: 'rgba(232,160,32,0.35)', background: 'rgba(232,160,32,0.07)' }}
        >
          <Sparkles size={12} style={{ color: '#E8A020' }} />
          <span style={{ background: 'linear-gradient(120deg,#E8A020,#2DD4BF,#8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Built on CampusOS · The AI-native LMS
          </span>
        </Link>
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
          to="/molted/campus-os"
          className="group relative flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-white font-bold transition-all duration-200 hover:-translate-y-px overflow-hidden"
          style={{ background: 'linear-gradient(120deg, #E8A020 0%, #2DD4BF 50%, #8B5CF6 100%)' }}
        >
          <span className="relative z-10 flex items-center gap-2.5">
            See CampusOS
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
        <Link
          to="/molted/teachos"
          className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-molted-border hover:border-[#2DD4BF]/40 text-molted-white font-semibold transition-all duration-200 hover:text-[#2DD4BF]"
        >
          TeachOS
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link
          to="/molted/paigebreaker"
          className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-molted-border text-molted-muted hover:text-molted-white hover:border-molted-subtle font-semibold transition-all duration-200"
        >
          pAIgeBreaker
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
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

/* ── Platform Tiers ────────────────────────────────────────────────────── */
const TIERS = [
  {
    id: 'student',
    label: 'Student Platform',
    color: '#E8A020',
    headline: 'For the student struggling at midnight.',
    products: [
      {
        name: 'pAIgeBreaker',
        tagline: 'Every question answered. Every page. Every hour.',
        desc: 'AI that turns any textbook into a live conversation. Curriculum-aligned answers instantly — at 2 AM, without a tutor.',
        href: '/molted/paigebreaker',
        live: true,
      },
      {
        name: 'PathwayAi',
        tagline: 'Every student on their own learning path.',
        desc: 'Adaptive learning engine built on real interaction data. Netflix for education.',
        href: '/molted/pathway-ai',
        live: false,
      },
      {
        name: 'MasteryAi',
        tagline: 'Stop teaching time. Start teaching mastery.',
        desc: 'Rebuilds any course as a competency-based experience — progress on proof, not the calendar.',
        href: '/molted/mastery-ai',
        live: false,
      },
    ],
  },
  {
    id: 'faculty',
    label: 'Faculty Platform',
    color: '#2DD4BF',
    headline: 'For the professor buried in admin.',
    products: [
      {
        name: 'TeachOS',
        tagline: 'The AI operating system for every educator.',
        desc: 'Reclaims 23 hours per week — grading, discussions, announcements, emails. All automated. You review, approve, teach.',
        href: '/molted/teachos',
        live: true,
      },
      {
        name: 'ProofAi',
        tagline: 'Assessment for the post-ChatGPT world.',
        desc: "Oral AI assessments and portfolio-based competency verification. You can't outsource a conversation.",
        href: '/molted/proof-ai',
        live: false,
      },
    ],
  },
  {
    id: 'institution',
    label: 'Institution Platform',
    color: '#E8170F',
    headline: 'For the provost measuring outcomes.',
    products: [
      {
        name: 'Persona Ai',
        tagline: "Your institution's voice, everywhere, always.",
        desc: 'Custom AI personas trained on your identity, values, and curriculum. Six live instances at Grand Canyon University.',
        href: '/molted/persona-ai',
        live: true,
      },
      {
        name: 'RetainAi',
        tagline: "Every student who was about to leave — didn't.",
        desc: 'Identifies departure risk weeks before students decide, triggers the right intervention at the right time.',
        href: '/molted/retain-ai',
        live: false,
      },
      {
        name: 'OutcomesAi',
        tagline: 'Finally know if any of it is working.',
        desc: 'Intelligence layer for provosts, deans, and boards. Real-time institutional analytics that actually mean something.',
        href: '/molted/outcomes-ai',
        live: false,
      },
    ],
  },
];

function PlatformTiers() {
  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <RevealBlock className="mb-16 text-center">
          <Link
            to="/molted/campus-os"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-5 hover:opacity-80 transition-opacity"
            style={{ background: 'rgba(232,160,32,0.08)', border: '1px solid rgba(232,160,32,0.2)' }}
          >
            <span style={{ background: 'linear-gradient(120deg,#E8A020,#2DD4BF,#8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              8 CampusOS modules
            </span>
            <ChevronRight size={11} style={{ color: '#E8A020' }} />
          </Link>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            Every role. Every layer.{' '}
            <span style={{
              background: 'linear-gradient(120deg, #F5B740 0%, #E8A020 55%, #E8170F 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              One platform.
            </span>
          </h2>
          <p className="mt-5 text-molted-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Start with any module today. When your institution is ready, deploy CampusOS —
            the AI-native LMS that runs them all.
          </p>
        </RevealBlock>

        {/* Three columns */}
        <div className="grid md:grid-cols-3 gap-8">
          {TIERS.map((tier, ti) => (
            <RevealBlock key={tier.id} delay={ti * 120} className="flex flex-col">

              {/* Tier header */}
              <div className="mb-6">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ background: `${tier.color}12`, color: tier.color, border: `1px solid ${tier.color}25` }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: tier.color }} />
                  {tier.label}
                </div>
                <p className="text-molted-muted text-sm leading-snug">{tier.headline}</p>
              </div>

              {/* Product cards */}
              <div className="flex flex-col gap-3 flex-1">
                {tier.products.map((p) => (
                  <Link
                    key={p.name}
                    to={p.href}
                    className="group block rounded-xl border border-molted-border bg-molted-elevated p-5 hover:border-opacity-60 transition-all duration-300 hover:-translate-y-0.5"
                    style={p.live ? { borderColor: `${tier.color}22` } : undefined}
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <p className="text-molted-white font-bold text-base">{p.name}</p>
                      {p.live ? (
                        <span className="flex items-center gap-1.5 text-xs text-green-400 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          Live module
                        </span>
                      ) : (
                        <span className="text-xs text-molted-subtle font-medium">Upcoming</span>
                      )}
                    </div>
                    <p className="text-xs font-semibold mb-2 leading-snug" style={{ color: tier.color }}>
                      {p.tagline}
                    </p>
                    <p className="text-molted-muted text-xs leading-relaxed mb-3">{p.desc}</p>
                    <div
                      className="inline-flex items-center gap-1.5 text-xs font-semibold group-hover:gap-2.5 transition-all"
                      style={{ color: tier.color }}
                    >
                      Explore <ChevronRight size={12} />
                    </div>
                  </Link>
                ))}
              </div>

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

              <div
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all group-hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(120deg,#E8A020,#2DD4BF,#8B5CF6)', color: '#0A0A0F' }}
              >
                See CampusOS <ArrowRight size={14} />
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
      <PlatformTiers />
      <PlatformTeaser />
      <Stats />
      <Manifesto />
      <FinalCTA />
    </MoltedLayout>
  );
}
