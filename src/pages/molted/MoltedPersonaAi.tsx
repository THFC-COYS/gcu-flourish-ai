import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Check, Globe, Heart, Shield, Zap, Building2 } from 'lucide-react';
import MoltedLayout from './MoltedLayout';

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

/* ── Hero ──────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16 overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(255,107,53,0.09) 0%, transparent 70%)' }}
        />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-molted-ember/30 bg-molted-ember/10 text-molted-ember text-xs font-semibold mb-8 animate-fade-in">
          <Sparkles size={12} /> MoltED Ai · Product 02
        </div>

        {/* Wordmark */}
        <h1 className="animate-reveal">
          <span className="block text-5xl md:text-7xl lg:text-8xl font-black text-molted-white leading-none tracking-tight">
            Custom
          </span>
          <span
            className="block text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight mt-1"
            style={{
              background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C60 50%, #FFC27A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Spirit
          </span>
        </h1>

        {/* Tagline */}
        <p className="mt-8 text-2xl md:text-3xl font-bold text-molted-muted animate-reveal" style={{ animationDelay: '150ms' }}>
          Your values. Your voice. Always on.
        </p>

        <p className="mt-4 text-lg text-molted-muted/70 max-w-2xl mx-auto leading-relaxed animate-reveal" style={{ animationDelay: '250ms' }}>
          Every institution has a character — a way of caring, teaching, and showing up.
          Persona Ai carries all of it into every conversation, at any hour.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-reveal" style={{ animationDelay: '350ms' }}>
          <a
            href="mailto:hello@molted.ai?subject=Persona Ai Demo Request"
            className="group flex items-center gap-2.5 px-8 py-4 rounded-xl bg-molted-ember hover:bg-molted-ember-light text-white font-bold text-lg transition-all duration-200 shadow-molted-ember hover:-translate-y-px"
          >
            Create Your Spirit
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <Link
            to="/molted/paigebreaker"
            className="px-8 py-4 rounded-xl border border-molted-border text-molted-muted hover:text-molted-white font-semibold transition-all hover:border-molted-subtle"
          >
            See pAIgeBreaker instead →
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-molted-subtle animate-pulse-slow">
        <div className="w-px h-10 bg-gradient-to-b from-molted-subtle to-transparent" />
      </div>
    </section>
  );
}

/* ── The spirit idea ───────────────────────────────────────────────────── */
function TheSpiritIdea() {
  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-4xl mx-auto">
        <RevealBlock className="text-center">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-8">The idea</p>
          <p className="text-3xl md:text-5xl font-black text-molted-white leading-tight tracking-tight">
            Your institution has a soul.
          </p>
          <p className="mt-4 text-3xl md:text-5xl font-black leading-tight tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #FF6B35, #FF8C60)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Persona Ai gives it a voice.
          </p>
          <p className="mt-8 text-molted-muted text-lg leading-relaxed max-w-2xl mx-auto">
            Not a generic chatbot. Not "AI assistant." A named, trained, branded persona that speaks
            with your mission — and never stops.
          </p>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Live spirit showcase (from GCU work) ──────────────────────────────── */
function SpiritShowcase() {
  const [active, setActive] = useState(0);

  const spirits = [
    {
      icon: '🏥',
      name: 'Spirit Nurse',
      college: 'College of Nursing & Health Care Professions',
      tagline: 'Clinical care & patient support',
      detail: 'Every nursing graduate carries clinical competency and compassionate presence. Spirit Nurse carries both — available to any patient at 2 AM when fear is loudest and no one else can be there. Your faculty\'s clinical knowledge. Your graduates\' character. In the room when it matters most.',
      color: 'text-rose-400',
      bg: 'bg-rose-400/10 border-rose-400/20',
      accent: '#F87171',
    },
    {
      icon: '📚',
      name: 'Spirit Teacher',
      college: 'College of Education',
      tagline: 'Education & learning guidance',
      detail: 'Spirit Teacher is your faculty\'s pedagogy, your curriculum frameworks, and your best teaching moments — available to any student who is falling behind, any teacher who needs support, any parent trying to understand their child. The patience of your best educators. Always present. Never tired.',
      color: 'text-sky-400',
      bg: 'bg-sky-400/10 border-sky-400/20',
      accent: '#38BDF8',
    },
    {
      icon: '✝️',
      name: 'Spirit Chaplain',
      college: 'College of Theology',
      tagline: 'Grief, faith & spiritual care',
      detail: 'Spirit Chaplain carries scripture, grief, and the pastoral wisdom of GCU\'s theology program into every hard conversation about faith, loss, and doubt. A rural pastor at 2 AM. A student losing their faith. A family in the ICU. Your theology — present in the room.',
      color: 'text-amber-400',
      bg: 'bg-amber-400/10 border-amber-400/20',
      accent: '#FBBF24',
    },
    {
      icon: '💼',
      name: 'Spirit Advisor',
      college: 'Colangelo College of Business',
      tagline: 'Business ethics & leadership',
      detail: 'Spirit Advisor brings the Colangelo College\'s ethos on servant leadership, ethical business, and entrepreneurial character into every mentorship moment — career pivots, ethical dilemmas, startup challenges. Your business school\'s wisdom. Available to every graduate.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10 border-emerald-400/20',
      accent: '#34D399',
    },
    {
      icon: '⚖️',
      name: 'Spirit Counsel',
      college: 'Rundel School of Law',
      tagline: 'Legal guidance & ethics',
      detail: 'Spirit Counsel guides law students through landmark cases, ethical dilemmas, and jurisprudence questions. Study partner. Socratic partner. Never bills by the hour.',
      color: 'text-violet-400',
      bg: 'bg-violet-400/10 border-violet-400/20',
      accent: '#A78BFA',
    },
    {
      icon: '🔬',
      name: 'Spirit Scientist',
      college: 'College of Science, Engineering & Technology',
      tagline: 'Research, lab & STEM support',
      detail: 'From hypothesis design to data analysis interpretation, Spirit Scientist supports research students through the scientific method — while maintaining your program\'s standards for rigor, ethics, and methodology.',
      color: 'text-cyan-400',
      bg: 'bg-cyan-400/10 border-cyan-400/20',
      accent: '#22D3EE',
    },
  ];

  const current = spirits[active];

  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-12">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Live example</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            GCU Spirit Network
          </h2>
          <p className="mt-4 text-molted-muted max-w-xl mx-auto">
            Grand Canyon University deployed six Persona Ais — one for each college.
            This is what the platform can do.
          </p>
        </RevealBlock>

        <RevealBlock delay={150}>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Spirit selector */}
            <div className="space-y-2">
              {spirits.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all flex items-center gap-3 ${
                    active === i
                      ? 'bg-molted-elevated border-molted-ember/40 text-molted-white shadow-molted-card'
                      : 'border-molted-border text-molted-muted hover:border-molted-subtle hover:text-molted-white'
                  }`}
                >
                  <span className="text-xl flex-shrink-0">{s.icon}</span>
                  <div className="min-w-0">
                    <p className={`text-sm font-semibold ${active === i ? 'text-molted-white' : ''}`}>{s.name}</p>
                    <p className="text-xs text-molted-muted truncate">{s.tagline}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Spirit detail card */}
            <div className="md:col-span-2">
              <div className="bg-molted-elevated border border-molted-border rounded-2xl p-8 h-full">
                <div className="flex items-start gap-5">
                  <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center text-3xl flex-shrink-0 ${current.bg}`}>
                    {current.icon}
                  </div>
                  <div>
                    <h3 className="text-molted-white text-xl font-bold">{current.name}</h3>
                    <p className="text-molted-muted text-sm mt-0.5">{current.college}</p>
                    <span className={`mt-2 inline-block text-xs font-semibold px-2.5 py-1 rounded-full border ${current.bg} ${current.color}`}>
                      {current.tagline}
                    </span>
                  </div>
                </div>
                <p className="mt-6 text-molted-muted leading-relaxed">{current.detail}</p>
                <div className="mt-6 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-molted-muted text-xs">Live on GCU Flourish AI Platform</span>
                </div>
              </div>
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── How to build a Spirit ─────────────────────────────────────────────── */
function BuildProcess() {
  const steps = [
    {
      num: '01',
      title: 'Define Your Spirit',
      body: 'Name it. Give it a personality. Describe how it speaks, what it cares about, and what it represents of your institution.',
      icon: '✏️',
    },
    {
      num: '02',
      title: 'Train It',
      body: 'Upload your curriculum, policies, FAQ documents, and program materials. The Spirit learns your content — not the internet.',
      icon: '🧠',
    },
    {
      num: '03',
      title: 'Deploy Everywhere',
      body: 'Embed on your website. Integrate into your LMS. Add to your student portal. Spirit goes wherever your community is.',
      icon: '🚀',
    },
  ];

  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Getting started</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            Live in three steps.
          </h2>
        </RevealBlock>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <RevealBlock key={i} delay={i * 120}>
              <div className="relative bg-molted-elevated border border-molted-border rounded-2xl p-8 hover:border-molted-ember/30 hover:shadow-molted-card-hover transition-all">
                <span className="text-6xl font-black text-molted-border select-none">{step.num}</span>
                <span className="block text-3xl mt-3">{step.icon}</span>
                <h3 className="mt-4 text-molted-white font-bold text-lg">{step.title}</h3>
                <p className="mt-2 text-molted-muted text-sm leading-relaxed">{step.body}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── What makes it different ───────────────────────────────────────────── */
function WhyDifferent() {
  const features = [
    {
      icon: Heart,
      title: 'A Persona, Not a Chatbot',
      body: 'Generic AI assistants answer questions. Persona Ai represents your institution — with its name, voice, and values embedded in every response.',
      color: 'text-rose-400',
      bg: 'bg-rose-400/10 border-rose-400/20',
    },
    {
      icon: Shield,
      title: 'Guardrailed to Your Mission',
      body: 'Spirit never drifts outside your values or your content. Every response is bounded by what you\'ve defined as appropriate for your community.',
      color: 'text-molted-ember',
      bg: 'bg-molted-ember/10 border-molted-ember/20',
    },
    {
      icon: Globe,
      title: 'Always On, Never Tired',
      body: 'A human chaplain can\'t be in every hospital room at 3 AM. Spirit Chaplain can. Scale your mission without scaling your headcount.',
      color: 'text-sky-400',
      bg: 'bg-sky-400/10 border-sky-400/20',
    },
    {
      icon: Zap,
      title: 'Built on What\'s Proven',
      body: 'Persona Ai is built on the same architecture that powers the GCU Spirit Network — real deployments, real students, real outcomes.',
      color: 'text-molted-violet',
      bg: 'bg-molted-violet/10 border-molted-violet/20',
    },
    {
      icon: Building2,
      title: 'Institution-Scale',
      body: 'Deploy one Spirit or twenty. Serve a single campus or a global network. The platform scales with your ambition.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10 border-emerald-400/20',
    },
    {
      icon: Sparkles,
      title: 'Your Brand, Everywhere',
      body: 'Students interact with YOUR institution\'s AI — not a generic tool. Brand recognition and trust in every conversation.',
      color: 'text-amber-400',
      bg: 'bg-amber-400/10 border-amber-400/20',
    },
  ];

  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Why Persona Ai</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            Built for institutions<br />that care about character.
          </h2>
        </RevealBlock>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <RevealBlock key={i} delay={i * 80}>
              <div className="bg-molted-elevated border border-molted-border rounded-2xl p-6 hover:shadow-molted-card-hover hover:-translate-y-px transition-all">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${feat.bg}`}>
                  <feat.icon size={18} className={feat.color} />
                </div>
                <h3 className="text-molted-white font-bold mb-2">{feat.title}</h3>
                <p className="text-molted-muted text-sm leading-relaxed">{feat.body}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Pricing tiers teaser ──────────────────────────────────────────────── */
function PricingTeaser() {
  const tiers = [
    {
      name: 'Starter',
      tag: 'One Spirit. One campus.',
      features: ['1 Persona Ai persona', 'Up to 10,000 interactions/mo', 'Standard training pipeline', 'Email support'],
      cta: 'Talk to Us',
      highlight: false,
    },
    {
      name: 'Institution',
      tag: 'Full Spirit Network.',
      features: ['Up to 10 Spirit personas', 'Unlimited interactions', 'Custom training & guardrails', 'LMS integration', 'Dedicated success manager'],
      cta: 'Most Popular',
      highlight: true,
    },
    {
      name: 'Enterprise',
      tag: 'Multi-campus. Global scale.',
      features: ['Unlimited Spirits', 'White-label deployment', 'Private model hosting', 'SLA & compliance support', 'Full API access'],
      cta: 'Contact Sales',
      highlight: false,
    },
  ];

  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Investment</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            Priced for institutions,<br />not Fortune 500.
          </h2>
          <p className="mt-4 text-molted-muted">Exact pricing provided after a discovery call.</p>
        </RevealBlock>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <RevealBlock key={i} delay={i * 100}>
              <div className={`rounded-2xl p-8 h-full flex flex-col border transition-all hover:-translate-y-px ${
                tier.highlight
                  ? 'bg-gradient-to-b from-molted-ember/10 to-molted-elevated border-molted-ember/40 shadow-molted-ember'
                  : 'bg-molted-elevated border-molted-border hover:border-molted-subtle'
              }`}>
                {tier.highlight && (
                  <span className="inline-block mb-4 text-xs font-bold text-molted-ember uppercase tracking-wider">
                    ★ Most Popular
                  </span>
                )}
                <h3 className="text-molted-white font-black text-2xl">{tier.name}</h3>
                <p className="text-molted-muted text-sm mt-1 mb-6">{tier.tag}</p>
                <ul className="space-y-3 flex-1">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-molted-muted">
                      <Check size={14} className={`flex-shrink-0 mt-0.5 ${tier.highlight ? 'text-molted-ember' : 'text-molted-violet'}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="mailto:hello@molted.ai?subject=Persona Ai Pricing Inquiry"
                  className={`mt-8 block text-center px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                    tier.highlight
                      ? 'bg-molted-ember hover:bg-molted-ember-light text-white shadow-molted-ember'
                      : 'border border-molted-border hover:border-molted-subtle text-molted-muted hover:text-molted-white'
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA ───────────────────────────────────────────────────────────────── */
function CTA() {
  return (
    <section className="py-32 px-6 border-t border-molted-border">
      <div className="max-w-3xl mx-auto text-center">
        <RevealBlock>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            What does your<br />
            <span className="text-molted-ember">institution's Spirit</span><br />
            look like?
          </h2>
          <p className="mt-6 text-molted-muted text-lg">
            Let's build it together. Every Spirit starts with a conversation.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:hello@molted.ai?subject=Persona Ai Demo Request"
              className="group flex items-center gap-2.5 px-8 py-4 rounded-xl bg-molted-ember hover:bg-molted-ember-light text-white font-bold text-lg transition-all hover:-translate-y-px shadow-molted-ember"
            >
              Start the Conversation
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              to="/molted"
              className="px-8 py-4 rounded-xl border border-molted-border text-molted-muted hover:text-molted-white font-semibold transition-all hover:border-molted-subtle"
            >
              ← Back to MoltED Ai
            </Link>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

export default function MoltedPersonaAi() {
  return (
    <MoltedLayout>
      <Hero />
      <TheSpiritIdea />
      <SpiritShowcase />
      <BuildProcess />
      <WhyDifferent />
      <PricingTeaser />
      <CTA />
    </MoltedLayout>
  );
}
