import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Check, Globe, Heart, Shield, Zap, Building2 } from 'lucide-react';
import MoltedLayout, { OutpostBanner } from './MoltedLayout';

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
          style={{ background: 'radial-gradient(circle, rgba(232,160,32,0.05) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-molted-ember/30 bg-molted-ember/10 text-molted-ember text-xs font-semibold mb-8 animate-fade-in">
          <Sparkles size={12} /> Molt · Enterprise
        </div>

        {/* Wordmark */}
        <h1 className="animate-reveal">
          <span className="block text-5xl md:text-7xl lg:text-8xl font-black text-molted-white leading-none tracking-tight">
            Persona
          </span>
        </h1>

        {/* Tagline */}
        <p className="mt-8 text-2xl md:text-3xl font-bold text-molted-muted animate-reveal" style={{ animationDelay: '150ms' }}>
          Your values. Your voice. Always on.
        </p>

        <p className="mt-4 text-lg text-molted-muted/70 max-w-2xl mx-auto leading-relaxed animate-reveal" style={{ animationDelay: '250ms' }}>
          Not a chatbot. A named, trained AI persona that carries your organization's values in every conversation — at 2 AM, at scale, without a headcount increase. Already proven at a flagship university serving 50,000+ people. Now available to hospitals, health systems, and enterprises.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-reveal" style={{ animationDelay: '350ms' }}>
          <a
            href="mailto:hello@molted.ai?subject=Persona Ai Demo Request"
            className="group flex items-center gap-2.5 px-8 py-4 rounded-xl bg-molted-ember hover:bg-molted-ember-light text-white font-bold text-lg transition-all duration-200 shadow-molted-ember hover:-translate-y-px"
          >
            Create Your Beacon
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <Link
            to="/lumen"
            className="px-8 py-4 rounded-xl border border-molted-border text-molted-muted hover:text-molted-white font-semibold transition-all hover:border-molted-subtle"
          >
            See Read instead →
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-molted-subtle animate-pulse-slow">
        <div className="w-px h-10 bg-gradient-to-b from-molted-subtle to-transparent" />
      </div>
    </section>
  );
}

/* ── Live proof ────────────────────────────────────────────────────────── */
function LiveProof() {
  const stats = [
    { number: '6', label: 'AI personas deployed across 6 colleges' },
    { number: '50,000+', label: 'Students served' },
    { number: '24/7', label: 'Always on, no human required' },
  ];

  return (
    <section className="py-20 px-6 border-t border-molted-border">
      <div className="max-w-4xl mx-auto">
        <RevealBlock className="text-center mb-12">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#E8170F' }}>
            This is already running.
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            Already deployed. Already working.
          </h2>
          <p className="mt-4 text-molted-muted text-lg max-w-2xl mx-auto leading-relaxed">
            We didn't build a demo. We built it, deployed it, and ran it at scale. Here's what that looks like.
          </p>
        </RevealBlock>

        <RevealBlock delay={150}>
          <div className="grid grid-cols-3 gap-6 mb-8">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-molted-elevated border rounded-2xl p-8 text-center"
                style={{ borderColor: 'rgba(232,23,15,0.25)' }}
              >
                <p className="text-5xl md:text-6xl font-black leading-none" style={{ color: '#E8170F' }}>
                  {stat.number}
                </p>
                <p className="mt-3 text-molted-muted text-sm leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </RevealBlock>

        <RevealBlock delay={250} className="text-center">
          <p className="text-molted-muted text-sm">
            <span
              className="inline-flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              Live at a flagship university partner · Deployed 2024
            </span>
          </p>
        </RevealBlock>
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
            Your organization has a culture.
          </p>
          <p className="mt-4 text-3xl md:text-5xl font-black leading-tight tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #FF6B35, #FF8C60)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Beacon gives it a voice.
          </p>
          <p className="mt-8 text-molted-muted text-lg leading-relaxed max-w-2xl mx-auto">
            Not a generic chatbot. Not "AI assistant." A named, trained, branded persona that speaks
            with your values — in every patient room, every onboarding session, every 2 AM question. Without a headcount increase.
          </p>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Industry showcase ──────────────────────────────────────────────────── */
const INDUSTRY_PERSONAS: Record<string, {
  icon: string; name: string; context: string; tagline: string; detail: string;
  color: string; bg: string; live?: boolean;
}[]> = {
  'Higher Ed': [
    {
      icon: '🏥', name: 'The Nurse Persona', context: 'School of Nursing', tagline: 'Clinical care & patient support',
      detail: 'Every nursing graduate carries clinical competency and compassionate presence. The Nurse Beacon carries both — available to any patient at 2 AM when fear is loudest and no one else can be there. Your faculty\'s clinical knowledge. Your graduates\' character. In the room when it matters most.',
      color: 'text-rose-400', bg: 'bg-rose-400/10 border-rose-400/20', live: true,
    },
    {
      icon: '📚', name: 'The Teaching Persona', context: 'College of Education', tagline: 'Education & learning guidance',
      detail: 'The Teaching Beacon is your faculty\'s pedagogy, your curriculum frameworks, and your best teaching moments — available to any student who is falling behind, any teacher who needs support, any parent trying to understand their child. The patience of your best educators. Always present. Never tired.',
      color: 'text-sky-400', bg: 'bg-sky-400/10 border-sky-400/20', live: true,
    },
    {
      icon: '✝️', name: 'The Faith Persona', context: 'School of Divinity', tagline: 'Grief, faith & spiritual care',
      detail: 'The Faith Beacon carries scripture, grief, and the pastoral wisdom of your theology program into every hard conversation about faith, loss, and doubt. A rural pastor at 2 AM. A student losing their faith. A family in the ICU. Your theology — present in the room.',
      color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/20', live: true,
    },
    {
      icon: '💼', name: 'The Business Persona', context: 'School of Business', tagline: 'Business ethics & leadership',
      detail: 'The Business Beacon brings your business school\'s ethos on servant leadership, ethical business, and entrepreneurial character into every mentorship moment — career pivots, ethical dilemmas, startup challenges. Your business school\'s wisdom. Available to every graduate.',
      color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/20', live: true,
    },
    {
      icon: '⚖️', name: 'The Legal Persona', context: 'School of Law', tagline: 'Legal guidance & ethics',
      detail: 'The Legal Beacon guides law students through landmark cases, ethical dilemmas, and jurisprudence questions. Study partner. Socratic partner. Never bills by the hour.',
      color: 'text-violet-400', bg: 'bg-violet-400/10 border-violet-400/20', live: true,
    },
    {
      icon: '🔬', name: 'The STEM Persona', context: 'College of Engineering & Technology', tagline: 'Research, lab & STEM support',
      detail: 'From hypothesis design to data analysis interpretation, The STEM Beacon supports research students through the scientific method — while maintaining your program\'s standards for rigor, ethics, and methodology.',
      color: 'text-cyan-400', bg: 'bg-cyan-400/10 border-cyan-400/20', live: true,
    },
  ],
  Healthcare: [
    {
      icon: '🩺', name: 'Patient Navigator', context: 'Health System', tagline: 'Discharge, care plans & follow-up',
      detail: 'Most readmissions happen because patients don\'t understand their discharge instructions. The Patient Navigator speaks in plain language, answers questions at 2 AM, and follows up proactively — in your health system\'s voice, bound by your clinical protocols.',
      color: 'text-rose-400', bg: 'bg-rose-400/10 border-rose-400/20',
    },
    {
      icon: '🏠', name: 'Rural Access Persona', context: 'Community Health', tagline: 'Health literacy & access guidance',
      detail: 'For communities where the nearest specialist is 90 minutes away, the Rural Access Beacon closes the gap — answering health questions, explaining diagnoses, and triaging urgency. Your clinical expertise. Available everywhere your patients are.',
      color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/20',
    },
    {
      icon: '👶', name: 'New Parent Companion', context: 'Pediatric & Maternity', tagline: 'Postpartum support & newborn guidance',
      detail: 'The 3 AM terror of new parenthood is universal. The New Parent Companion answers the questions that fill urgent care waiting rooms — in your hospital\'s voice, with your pediatricians\' guidance — so families feel supported, not abandoned, after discharge.',
      color: 'text-sky-400', bg: 'bg-sky-400/10 border-sky-400/20',
    },
    {
      icon: '🧠', name: 'Mental Health Navigator', context: 'Behavioral Health', tagline: 'Crisis triage & ongoing support',
      detail: 'When someone reaches out at 2 AM in distress, speed and warmth matter more than anything else. The Mental Health Navigator triages urgency, provides immediate support resources, and connects patients to your clinical team — without replacing the human care that comes next.',
      color: 'text-violet-400', bg: 'bg-violet-400/10 border-violet-400/20',
    },
    {
      icon: '💊', name: 'Medication Coach', context: 'Pharmacy & Chronic Care', tagline: 'Adherence & side effect guidance',
      detail: 'Non-adherence is responsible for nearly 50% of treatment failures. The Medication Coach checks in, answers concerns about side effects in plain language, and nudges refills — turning your pharmacy\'s clinical knowledge into daily patient contact.',
      color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/20',
    },
    {
      icon: '🏥', name: 'Clinical Onboarding Persona', context: 'Hospital System', tagline: 'New staff orientation & protocol guidance',
      detail: 'A new nurse\'s first 90 days are the highest-risk period for errors and turnover. The Clinical Onboarding Beacon walks new hires through your protocols, answers policy questions, and makes the learning curve survivable — without pulling preceptors off the floor.',
      color: 'text-cyan-400', bg: 'bg-cyan-400/10 border-cyan-400/20',
    },
  ],
  Enterprise: [
    {
      icon: '🚀', name: 'Onboarding Persona', context: 'HR & People Ops', tagline: 'New hire orientation & culture',
      detail: 'The first 90 days determine whether a hire becomes a long-term contributor. The Onboarding Beacon carries your culture, your processes, and your values into every new hire\'s early questions — so managers spend less time answering the same things and new employees feel less lost.',
      color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/20',
    },
    {
      icon: '🎯', name: 'Customer Success Persona', context: 'Customer Experience', tagline: 'Retention, expansion & support',
      detail: 'Your best CSM can\'t be in every account at once. The Customer Success Beacon carries their playbook — onboarding flows, expansion signals, health check frameworks — to every customer, at every stage. Your culture of customer obsession. Always available.',
      color: 'text-sky-400', bg: 'bg-sky-400/10 border-sky-400/20',
    },
    {
      icon: '📋', name: 'Benefits Guide Persona', context: 'HR & Benefits', tagline: 'Benefits navigation & open enrollment',
      detail: 'Most employees don\'t understand their benefits. The Benefits Guide Beacon explains health plans, 401k options, and leave policies in plain language — reducing HR ticket volume by 60% and making open enrollment feel like a conversation, not a forms exercise.',
      color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/20',
    },
    {
      icon: '⚙️', name: 'Technical Support Persona', context: 'Engineering & IT', tagline: 'Tier-1 support & knowledge base',
      detail: 'Your senior engineers spend 30% of their time answering questions that are already documented somewhere. The Technical Support Beacon absorbs your documentation, your runbooks, and your tribal knowledge — and becomes the first answer for every Tier-1 question.',
      color: 'text-violet-400', bg: 'bg-violet-400/10 border-violet-400/20',
    },
    {
      icon: '🌍', name: 'Brand Ambassador Persona', context: 'Marketing & Brand', tagline: 'Brand voice at every touchpoint',
      detail: 'Every customer touchpoint is a brand moment. The Brand Ambassador Beacon carries your brand voice — your tone, your values, your positioning — into every interaction: support tickets, community forums, onboarding flows, and partner communications.',
      color: 'text-rose-400', bg: 'bg-rose-400/10 border-rose-400/20',
    },
    {
      icon: '📈', name: 'Sales Enablement Persona', context: 'Revenue Operations', tagline: 'Objection handling & competitive intel',
      detail: 'Your best sales rep knows every objection and every competitor\'s weakness cold. The Sales Enablement Beacon carries that knowledge to every rep on the team — available during every call, before every demo, at every stage of the funnel.',
      color: 'text-cyan-400', bg: 'bg-cyan-400/10 border-cyan-400/20',
    },
  ],
};

function SpiritShowcase() {
  const industries = Object.keys(INDUSTRY_PERSONAS) as (keyof typeof INDUSTRY_PERSONAS)[];
  const [activeIndustry, setActiveIndustry] = useState<string>('Higher Ed');
  const [activeIdx, setActiveIdx] = useState(0);

  const spirits = INDUSTRY_PERSONAS[activeIndustry];
  const current = spirits[activeIdx];

  function switchIndustry(ind: string) {
    setActiveIndustry(ind);
    setActiveIdx(0);
  }

  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-10">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Where Beacon works</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            Any organization. Any voice.
          </h2>
          <p className="mt-4 text-molted-muted max-w-xl mx-auto">
            The same platform proven at a flagship university — available to hospitals, health systems, and enterprises.
          </p>
        </RevealBlock>

        {/* Industry tabs */}
        <RevealBlock delay={100}>
          <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => switchIndustry(ind)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                style={{
                  background: activeIndustry === ind ? '#E8170F' : 'rgba(255,255,255,0.05)',
                  color: activeIndustry === ind ? '#fff' : '#86868B',
                  border: `1px solid ${activeIndustry === ind ? 'transparent' : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                {ind}
                {ind === 'Higher Ed' && (
                  <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-400 border border-emerald-400/30">
                    Live
                  </span>
                )}
              </button>
            ))}
          </div>
        </RevealBlock>

        <RevealBlock delay={150}>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Beacon selector */}
            <div className="space-y-2">
              {spirits.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all flex items-center gap-3 ${
                    activeIdx === i
                      ? 'bg-molted-elevated border-molted-ember/40 text-molted-white shadow-molted-card'
                      : 'border-molted-border text-molted-muted hover:border-molted-subtle hover:text-molted-white'
                  }`}
                >
                  <span className="text-xl flex-shrink-0">{s.icon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={`text-sm font-semibold ${activeIdx === i ? 'text-molted-white' : ''}`}>{s.name}</p>
                      {s.live && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-400/15 text-emerald-400 border border-emerald-400/25 leading-none">
                          Live
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-molted-muted truncate">{s.tagline}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Beacon detail */}
            <div className="md:col-span-2">
              <div className="bg-molted-elevated border border-molted-border rounded-2xl p-8 h-full">
                <div className="flex items-start gap-5">
                  <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center text-3xl flex-shrink-0 ${current.bg}`}>
                    {current.icon}
                  </div>
                  <div>
                    <h3 className="text-molted-white text-xl font-bold">{current.name}</h3>
                    <p className="text-molted-muted text-sm mt-0.5">{current.context}</p>
                    <span className={`mt-2 inline-block text-xs font-semibold px-2.5 py-1 rounded-full border ${current.bg} ${current.color}`}>
                      {current.tagline}
                    </span>
                  </div>
                </div>
                <p className="mt-6 text-molted-muted leading-relaxed">{current.detail}</p>
                {current.live ? (
                  <div className="mt-6 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-molted-muted text-xs">Live · Flagship University · 50,000+ people served</span>
                  </div>
                ) : (
                  <div className="mt-6 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: '#E8170F' }} />
                    <span className="text-molted-muted text-xs">Available now · Built on proven architecture</span>
                  </div>
                )}
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
      title: 'Define Your Beacon',
      body: 'Name it. Give it a personality. Describe how it speaks, what it cares about, and what it represents of your institution.',
      icon: '✏️',
    },
    {
      num: '02',
      title: 'Train It',
      body: 'Upload your curriculum, policies, FAQ documents, and program materials. The Beacon learns your content — not the internet.',
      icon: '🧠',
    },
    {
      num: '03',
      title: 'Deploy Everywhere',
      body: 'Embed on your website. Integrate into your LMS. Add to your student portal. Beacon goes wherever your community is.',
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
      title: 'A Beacon, Not a Chatbot',
      body: 'Generic AI assistants answer questions. Beacon represents your institution — with its name, voice, and values embedded in every response.',
      color: 'text-rose-400',
      bg: 'bg-rose-400/10 border-rose-400/20',
    },
    {
      icon: Shield,
      title: 'Guardrailed to Your Mission',
      body: 'Persona never drifts outside your values or your content. Every response is bounded by what you\'ve defined as appropriate for your community.',
      color: 'text-molted-ember',
      bg: 'bg-molted-ember/10 border-molted-ember/20',
    },
    {
      icon: Globe,
      title: 'Always On, Never Tired',
      body: 'A human chaplain can\'t be in every hospital room at 3 AM. The Faith Beacon can. Scale your mission without scaling your headcount.',
      color: 'text-sky-400',
      bg: 'bg-sky-400/10 border-sky-400/20',
    },
    {
      icon: Zap,
      title: 'Built on What\'s Proven',
      body: 'Persona is built on the same architecture that powers real deployments at a flagship university — real deployments, real students, real outcomes.',
      color: 'text-molted-violet',
      bg: 'bg-molted-violet/10 border-molted-violet/20',
    },
    {
      icon: Building2,
      title: 'Institution-Scale',
      body: 'Deploy one Beacon or twenty. Serve a single campus or a global network. The platform scales with your ambition.',
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
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Why Persona</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            Built for organizations<br />that can't afford to be generic.
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
      tag: 'One Beacon. One campus.',
      features: ['1 Persona', 'Up to 10,000 interactions/mo', 'Standard training pipeline', 'Email support'],
      cta: 'Talk to Us',
      highlight: false,
    },
    {
      name: 'Institution',
      tag: 'Full Beacon Network.',
      features: ['Up to 10 Personas', 'Unlimited interactions', 'Custom training & guardrails', 'LMS integration', 'Dedicated success manager'],
      cta: 'Most Popular',
      highlight: true,
    },
    {
      name: 'Enterprise',
      tag: 'Multi-campus. Global scale.',
      features: ['Unlimited Personas', 'White-label deployment', 'Private model hosting', 'SLA & compliance support', 'Full API access'],
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
            Priced for scale,<br />not complexity.
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

/* ── Proof callout ─────────────────────────────────────────────────────── */
function ProofCallout() {
  return (
    <section className="py-10 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <RevealBlock>
          <p className="text-xl md:text-2xl font-bold" style={{ color: '#E8170F' }}>
            The question isn't whether this works. We already proved it.
          </p>
        </RevealBlock>
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
            <span className="text-molted-ember">organization's Beacon</span><br />
            look like?
          </h2>
          <p className="mt-6 text-molted-muted text-lg">
            Higher ed. Healthcare. Enterprise. Every Beacon starts with a conversation.
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
              to="/"
              className="px-8 py-4 rounded-xl border border-molted-border text-molted-muted hover:text-molted-white font-semibold transition-all hover:border-molted-subtle"
            >
              ← Back to Molt
            </Link>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

export default function MoltedBeaconAi() {
  return (
    <MoltedLayout>
      <OutpostBanner moduleName="Beacon" moduleColor="#E8170F" />
      <Hero />
      <LiveProof />
      <TheSpiritIdea />
      <SpiritShowcase />
      <BuildProcess />
      <WhyDifferent />
      <PricingTeaser />
      <ProofCallout />
      <CTA />
    </MoltedLayout>
  );
}
