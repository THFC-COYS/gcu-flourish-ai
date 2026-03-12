import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Sparkles, Globe, Users, Zap, ChevronRight } from 'lucide-react';
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
      { threshold: 0.15 }
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
      {/* Violet primary orb */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(ellipse at center, rgba(232,160,32,0.10) 0%, transparent 70%)' }}
      />
      {/* Ember accent orb */}
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full animate-glow-pulse"
        style={{ background: 'radial-gradient(ellipse at center, rgba(232,23,15,0.07) 0%, transparent 70%)' }}
      />
      {/* Bottom violet */}
      <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(ellipse at center, rgba(232,160,32,0.05) 0%, transparent 70%)' }}
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
      <div className="relative z-10 mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-molted-violet/30 bg-molted-violet/10 text-molted-violet text-xs font-semibold tracking-wide uppercase animate-fade-in">
        <Sparkles size={12} />
        AI EdTech · Two Products · One Mission
      </div>

      {/* Main headline */}
      <h1 className="relative z-10 text-5xl md:text-7xl lg:text-8xl font-black text-molted-white leading-[1.02] tracking-tight max-w-5xl animate-reveal">
        Education.{' '}
        <span
          className="inline-block"
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

      {/* Sub-headline */}
      <p className="relative z-10 mt-8 text-lg md:text-xl text-molted-muted max-w-xl leading-relaxed animate-reveal" style={{ animationDelay: '150ms' }}>
        Two AIs that make institutions better at their most human work.
      </p>

      {/* CTAs */}
      <div className="relative z-10 mt-10 flex flex-col sm:flex-row items-center gap-4 animate-reveal" style={{ animationDelay: '300ms' }}>
        <Link
          to="/molted/paigebreaker"
          className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-molted-violet hover:bg-molted-violet-light text-white font-semibold transition-all duration-200 shadow-molted-violet hover:-translate-y-px"
        >
          pAIgeBreaker
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link
          to="/molted/persona-ai"
          className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-molted-border hover:border-molted-ember/50 text-molted-white hover:text-molted-ember font-semibold transition-all duration-200 hover:bg-molted-ember/5"
        >
          Persona Ai
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-molted-subtle animate-pulse-slow">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-molted-subtle to-transparent" />
      </div>
    </section>
  );
}

/* ── Mission statement ─────────────────────────────────────────────────── */
function Mission() {
  const ref = useReveal();
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div
          ref={ref}
          className="opacity-0 translate-y-8 transition-all duration-1000 ease-out"
        >
          <p className="text-3xl md:text-5xl lg:text-6xl font-black text-molted-white leading-[1.1] tracking-tight">
            "The best schools in the world have great teachers.
          </p>
          <p className="mt-4 text-3xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight"
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

/* ── pAIgeBreaker product section ──────────────────────────────────────── */
function PAIgeBreakerSection() {
  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <RevealBlock>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-molted-violet/10 border border-molted-violet/20 text-molted-violet text-xs font-semibold mb-6">
                <BookOpen size={12} /> Product 01
              </div>
            </RevealBlock>

            <RevealBlock delay={100}>
              <h2 className="text-4xl md:text-6xl font-black text-molted-white leading-tight tracking-tight">
                pAIge<span className="text-molted-violet">Breaker</span>
              </h2>
            </RevealBlock>

            <RevealBlock delay={200}>
              <p className="mt-6 text-xl text-molted-muted leading-relaxed">
                Every student. Every page. Every question — answered.
              </p>
            </RevealBlock>

            <RevealBlock delay={300}>
              <p className="mt-4 text-molted-muted/70 leading-relaxed">
                pAIgeBreaker turns any textbook, document, or reading assignment into a live
                conversation. Students ask in plain English. They get curriculum-aligned
                answers instantly — at 2 AM, without a tutor, without waiting.
              </p>
            </RevealBlock>

            <RevealBlock delay={400}>
              <div className="mt-8 space-y-3">
                {[
                  'Ask any question about any text',
                  'Aligned to your curriculum standards',
                  'Personalized to each student\'s level',
                  'Available every hour of every day',
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-molted-muted">
                    <div className="w-1.5 h-1.5 rounded-full bg-molted-violet flex-shrink-0" />
                    {feat}
                  </div>
                ))}
              </div>
            </RevealBlock>

            <RevealBlock delay={500}>
              <Link
                to="/molted/paigebreaker"
                className="mt-8 inline-flex items-center gap-2 text-molted-violet font-semibold hover:gap-3 transition-all"
              >
                Explore pAIgeBreaker <ChevronRight size={16} />
              </Link>
            </RevealBlock>
          </div>

          {/* Visual mock */}
          <RevealBlock delay={200} className="md:order-last">
            <div className="relative">
              <div className="rounded-2xl border border-molted-border bg-molted-elevated overflow-hidden shadow-molted-glow">
                {/* Mock browser chrome */}
                <div className="bg-molted-surface px-4 py-3 flex items-center gap-2 border-b border-molted-border">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="flex-1 mx-4 bg-molted-border rounded-md h-6 flex items-center px-3">
                    <span className="text-molted-muted text-xs">paigebreaker.com</span>
                  </div>
                </div>

                {/* Mock chat interface */}
                <div className="p-6 space-y-4 min-h-[320px]">
                  {/* Document excerpt */}
                  <div className="bg-molted-surface rounded-xl p-4 border border-molted-border">
                    <p className="text-molted-muted text-xs leading-relaxed">
                      <span className="text-molted-white font-medium">Chapter 4 · Mitosis</span>
                      <br />
                      <span className="bg-molted-violet/20 text-molted-violet-light px-0.5">
                        Mitosis is the process of cell division
                      </span>{' '}
                      that results in two daughter cells each having the same number and
                      kind of chromosomes as the parent cell...
                    </p>
                  </div>

                  {/* Student question */}
                  <div className="flex justify-end">
                    <div className="bg-molted-violet/20 border border-molted-violet/30 rounded-xl rounded-br-sm px-4 py-3 max-w-xs">
                      <p className="text-molted-white text-sm">
                        Wait — what's the difference between mitosis and meiosis again?
                      </p>
                    </div>
                  </div>

                  {/* pAIgeBreaker answer */}
                  <div className="flex gap-3">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-molted-violet to-molted-ember flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                      p
                    </div>
                    <div className="bg-molted-surface border border-molted-border rounded-xl rounded-bl-sm px-4 py-3 flex-1">
                      <p className="text-molted-muted text-sm leading-relaxed">
                        Great question. Think of it this way: <span className="text-molted-violet-light">mitosis = copy</span> (same DNA, body growth),{' '}
                        <span className="text-molted-ember-light">meiosis = remix</span> (half DNA, for reproduction).
                        Your textbook just covered mitosis — want me to pull up a quick comparison?
                      </p>
                    </div>
                  </div>

                  {/* Typing indicator */}
                  <div className="flex items-center gap-1 pl-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-molted-violet/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-molted-violet/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-molted-violet/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>

              {/* Floating accent */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(123,97,255,0.2) 0%, transparent 70%)' }}
              />
            </div>
          </RevealBlock>
        </div>
      </div>
    </section>
  );
}

/* ── Persona Ai product section ─────────────────────────────────────── */
function PersonaAiSection() {
  const SPIRITS = [
    { icon: '🏥', name: 'Spirit Nurse', domain: 'Clinical care' },
    { icon: '📚', name: 'Spirit Teacher', domain: 'Education' },
    { icon: '✝️', name: 'Spirit Chaplain', domain: 'Faith & grief' },
    { icon: '💼', name: 'Spirit Advisor', domain: 'Business ethics' },
    { icon: '⚖️', name: 'Spirit Counsel', domain: 'Legal guidance' },
    { icon: '🔬', name: 'Spirit Scientist', domain: 'Research support' },
  ];

  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Visual mock — left side */}
          <RevealBlock delay={200}>
            <div className="relative">
              <div className="rounded-2xl border border-molted-border bg-molted-elevated p-6 shadow-molted-glow">
                <p className="text-molted-muted text-xs font-semibold uppercase tracking-wider mb-5">
                  Spirit Network · Grand Canyon University
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {SPIRITS.map((s, i) => (
                    <div
                      key={i}
                      className="bg-molted-surface border border-molted-border rounded-xl p-4 hover:border-molted-ember/40 transition-colors group"
                    >
                      <span className="text-2xl block mb-2">{s.icon}</span>
                      <p className="text-molted-white text-sm font-semibold group-hover:text-molted-ember-light transition-colors">
                        {s.name}
                      </p>
                      <p className="text-molted-muted text-xs mt-0.5">{s.domain}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-5 border-t border-molted-border flex items-center justify-between">
                  <p className="text-molted-muted text-xs">6 active Spirits · GCU Network</p>
                  <div className="flex items-center gap-1.5 text-xs text-green-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    All systems live
                  </div>
                </div>
              </div>

              {/* Floating accent */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(255,107,53,0.15) 0%, transparent 70%)' }}
              />
            </div>
          </RevealBlock>

          {/* Text */}
          <div>
            <RevealBlock>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-molted-ember/10 border border-molted-ember/20 text-molted-ember text-xs font-semibold mb-6">
                <Sparkles size={12} /> Product 02
              </div>
            </RevealBlock>

            <RevealBlock delay={100}>
              <h2 className="text-4xl md:text-6xl font-black text-molted-white leading-tight tracking-tight">
                Custom<br />
                <span className="text-molted-ember">Spirit</span>
              </h2>
            </RevealBlock>

            <RevealBlock delay={200}>
              <p className="mt-6 text-xl text-molted-muted leading-relaxed">
                Your institution's voice. Present everywhere. Always.
              </p>
            </RevealBlock>

            <RevealBlock delay={300}>
              <p className="mt-4 text-molted-muted/70 leading-relaxed">
                Every institution has a character — values, expertise, and a way of seeing the world.
                Persona Ai carries all of it into every conversation, every hour, everywhere
                your community needs it. Not a chatbot. A persona.
              </p>
            </RevealBlock>

            <RevealBlock delay={400}>
              <div className="mt-8 space-y-3">
                {[
                  'Named, branded, and trained on your identity',
                  'Domain expertise from your curriculum',
                  'Deployed wherever your students are',
                  'Scales from one campus to the world',
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-molted-muted">
                    <div className="w-1.5 h-1.5 rounded-full bg-molted-ember flex-shrink-0" />
                    {feat}
                  </div>
                ))}
              </div>
            </RevealBlock>

            <RevealBlock delay={500}>
              <Link
                to="/molted/persona-ai"
                className="mt-8 inline-flex items-center gap-2 text-molted-ember font-semibold hover:gap-3 transition-all"
              >
                Explore Persona Ai <ChevronRight size={16} />
              </Link>
            </RevealBlock>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Stats ─────────────────────────────────────────────────────────────── */
function Stats() {
  const stats = [
    { value: '50K+', label: 'Student interactions', icon: Users, color: 'text-molted-violet' },
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
              <div className="bg-molted-elevated border border-molted-border rounded-2xl p-6 text-center hover:border-molted-border/80 hover:shadow-molted-card-hover transition-all">
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

/* ── Manifesto / philosophy ────────────────────────────────────────────── */
function Manifesto() {
  const lines = [
    { text: 'Education is the highest-leverage act', accent: false },
    { text: 'in human civilization.', accent: false },
    { text: 'We are building the tools', accent: false },
    { text: 'that make it radically better.', accent: true },
  ];

  return (
    <section className="py-32 px-6 border-t border-molted-border relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(232,160,32,0.05) 0%, transparent 70%)' }}
      />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <RevealBlock>
          {lines.map((line, i) => (
            <p
              key={i}
              className={`text-3xl md:text-5xl font-black leading-tight tracking-tight ${
                line.accent
                  ? 'text-molted-violet'
                  : 'text-molted-white'
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
              className="group flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-molted-violet to-molted-ember text-white font-bold text-lg transition-all duration-200 hover:-translate-y-px hover:shadow-molted-violet"
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
      <PAIgeBreakerSection />
      <PersonaAiSection />
      <Stats />
      <Manifesto />
      <FinalCTA />
    </MoltedLayout>
  );
}
