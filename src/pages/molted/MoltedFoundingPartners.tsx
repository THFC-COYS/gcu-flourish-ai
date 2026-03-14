import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Lock, Users, TrendingUp, Zap } from 'lucide-react';
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
    <div
      ref={ref}
      className={`opacity-0 translate-y-8 transition-all duration-700 ease-out ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ── Color tokens ──────────────────────────────────────────────────────── */
const GOLD = '#E8A020';
const TEAL = '#2DD4BF';
const EMBER = '#E8170F';
const VIOLET = '#8B5CF6';
const AMBER = '#F5B740';

/* ── 01 · Cover ────────────────────────────────────────────────────────── */
function Cover() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(232,160,32,0.07) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-[5%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(45,212,191,0.05) 0%, transparent 70%)' }} />
        <div className="absolute top-[30%] right-[-5%] w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.05) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <RevealBlock>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold tracking-widest uppercase mb-10"
            style={{ borderColor: 'rgba(232,160,32,0.3)', background: 'rgba(232,160,32,0.06)', color: GOLD }}>
            <Lock size={11} />
            Founding Partner Program · 12 Spots
          </div>
        </RevealBlock>

        <RevealBlock delay={100}>
          <h1 className="text-6xl md:text-8xl lg:text-[110px] font-black leading-none tracking-tight">
            <span className="text-molted-white">You're one</span>
            <br />
            <span style={{ background: `linear-gradient(120deg, ${GOLD}, ${TEAL}, ${VIOLET})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              of 12.
            </span>
          </h1>
        </RevealBlock>

        <RevealBlock delay={250}>
          <p className="mt-8 text-xl md:text-2xl text-molted-muted max-w-2xl mx-auto leading-relaxed">
            Molt is accepting exactly 12 founding institutional partners.
            Not 100. Not 50. Twelve — so we can build this right, with you.
          </p>
        </RevealBlock>

        <RevealBlock delay={400} className="mt-12">
          <a
            href="mailto:hello@molted.ai?subject=Founding Partner Inquiry"
            className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-200 hover:-translate-y-px hover:shadow-2xl"
            style={{ background: `linear-gradient(135deg, ${GOLD}, ${TEAL})`, color: '#0a0a0f' }}
          >
            Schedule a Conversation
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </RevealBlock>

        <RevealBlock delay={550} className="mt-8">
          <p className="text-molted-subtle text-sm">hello@molted.ai · respond within 24 hours</p>
        </RevealBlock>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-molted-subtle animate-pulse">
        <span className="text-xs tracking-widest uppercase">Read on</span>
        <div className="w-px h-8 bg-gradient-to-b from-molted-subtle to-transparent" />
      </div>
    </section>
  );
}

/* ── 02 · The Problem ──────────────────────────────────────────────────── */
function TheProblem() {
  return (
    <section className="py-32 px-6 border-t border-molted-border">
      <div className="max-w-4xl mx-auto">
        <RevealBlock>
          <h2 className="text-5xl md:text-7xl font-black text-molted-white tracking-tight leading-tight">
            Canvas was built<br />in 2008.
          </h2>
        </RevealBlock>

        <RevealBlock delay={150}>
          <p className="mt-8 text-xl text-molted-muted leading-relaxed max-w-3xl">
            Before the iPhone was a year old. Before cloud computing was ubiquitous.
            Before AI existed. Before a single current college student was in high school.
          </p>
        </RevealBlock>

        <RevealBlock delay={280} className="my-14">
          <p className="text-3xl md:text-4xl font-black leading-snug"
            style={{ background: `linear-gradient(120deg, ${GOLD}, ${TEAL})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            "The LMS is not a feature problem.<br />
            It's an architecture problem."
          </p>
        </RevealBlock>

        <div className="space-y-6">
          {[
            'Every EdTech company is building plugins for broken infrastructure. Better gradebooks. Smarter calendars. AI-assisted syllabi. But the foundation is wrong — and you cannot fix a wrong foundation by painting the walls.',
            'The institutions that partner with Molt now won\'t be adopting AI. They\'ll be rebuilding from the first line of code — with us, ahead of everyone else.',
          ].map((p, i) => (
            <RevealBlock key={i} delay={i * 120}>
              <p className="text-molted-white/80 text-lg leading-relaxed">{p}</p>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 03 · The Proof ────────────────────────────────────────────────────── */
function TheProof() {
  const stats = [
    { num: '50,000+', label: 'Students served', color: GOLD },
    { num: '6', label: 'AI personas deployed', color: TEAL },
    { num: '24/7', label: 'Always on, no human required', color: VIOLET },
    { num: '3', label: 'Products live right now', color: EMBER },
  ];

  return (
    <section className="py-32 px-6 border-t border-molted-border relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(232,160,32,0.04) 0%, transparent 65%)' }} />
      <div className="max-w-5xl mx-auto relative z-10">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">The proof</p>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight">
            This isn't a concept.<br />
            <span style={{ color: GOLD }}>It's already running.</span>
          </h2>
          <p className="mt-6 text-molted-muted text-lg max-w-xl mx-auto">
            Deployed at a flagship university partner. Live in production.
            Not a pilot — a full deployment.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <RevealBlock key={i} delay={i * 80}>
              <div className="rounded-2xl p-6 border text-center h-full"
                style={{ background: `rgba(10,10,15,0.8)`, borderColor: `${s.color}25` }}>
                <p className="text-4xl md:text-5xl font-black mb-2" style={{ color: s.color }}>{s.num}</p>
                <p className="text-molted-muted text-sm leading-snug">{s.label}</p>
              </div>
            </RevealBlock>
          ))}
        </div>

        <RevealBlock delay={400} className="mt-8">
          <div className="rounded-2xl p-6 border text-center"
            style={{ background: 'rgba(232,160,32,0.04)', borderColor: 'rgba(232,160,32,0.15)' }}>
            <p className="text-molted-muted text-sm">
              <span className="text-molted-white font-semibold">Flagship university partner</span>
              {' '}· Deployed 2024 · Actively serving students
            </p>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── 04 · Three Products ───────────────────────────────────────────────── */
function ThreeProducts() {
  const products = [
    {
      name: 'Read',
      segment: 'Students',
      color: GOLD,
      tagline: 'The tutor that reads with you.',
      body: 'Watches any reading assignment in the browser. The moment a student hits something confusing, Read answers — in context, in real time, without leaving the page.',
      live: true,
      href: '/molted/lumen',
    },
    {
      name: 'Teach',
      segment: 'Faculty',
      color: TEAL,
      tagline: 'An AI that never leaves your classroom.',
      body: 'Watches every discussion board in real time. Responds to student questions while they\'re still on the page. Grades, flags at-risk students, handles the 23 hours/week of admin. Works on top of any LMS — no integration required.',
      live: true,
      href: '/molted/forge',
    },
    {
      name: 'Beacon',
      segment: 'Institutions',
      color: EMBER,
      tagline: 'Your institution\'s voice, everywhere, always on.',
      body: 'Deploy custom AI personas trained on your institution\'s identity — one per college, department, or program. Already live with six personas serving 50,000+ students.',
      live: true,
      href: '/molted/beacon',
    },
  ];

  return (
    <section className="py-32 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">The products</p>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight">
            Three entry points.<br />One direction.
          </h2>
          <p className="mt-6 text-molted-muted text-lg max-w-2xl mx-auto">
            Each product solves a specific problem for a specific person.
            All three feed into Outpost — the AI-native LMS that replaces your infrastructure.
          </p>
        </RevealBlock>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <RevealBlock key={i} delay={i * 120}>
              <Link to={p.href} className="block h-full group">
                <div className="rounded-2xl p-8 border h-full transition-all duration-300 group-hover:-translate-y-1"
                  style={{ background: `${p.color}08`, borderColor: `${p.color}25` }}>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: p.color }}>{p.segment}</p>
                      <p className="text-3xl font-black text-molted-white">{p.name}</p>
                    </div>
                    {p.live && (
                      <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                        style={{ background: `${p.color}15`, border: `1px solid ${p.color}30`, color: p.color }}>
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: p.color }} />
                        Live
                      </div>
                    )}
                  </div>
                  <p className="text-molted-white font-semibold text-lg mb-3 leading-snug">{p.tagline}</p>
                  <p className="text-molted-muted text-sm leading-relaxed">{p.body}</p>
                  <div className="mt-6 flex items-center gap-1 text-xs font-semibold" style={{ color: p.color }}>
                    See {p.name} <ChevronRight size={12} />
                  </div>
                </div>
              </Link>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 05 · The Agent ────────────────────────────────────────────────────── */
function TheAgent() {
  return (
    <section className="py-32 px-6 border-t border-molted-border relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(45,212,191,0.04) 0%, transparent 65%)' }} />
      <div className="max-w-4xl mx-auto relative z-10">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">The technology</p>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            Not a chatbot.<br />
            <span style={{ color: TEAL }}>A system that never sleeps.</span>
          </h2>
          <p className="mt-6 text-molted-muted text-lg max-w-2xl mx-auto">
            Molt's agents don't wait to be asked. They watch. The moment a student
            posts a question, the agent responds — while the student is still on the page.
          </p>
        </RevealBlock>

        {/* Live loop visual */}
        <RevealBlock delay={100}>
          <div className="rounded-3xl border overflow-hidden"
            style={{ background: 'rgba(10,10,15,0.95)', borderColor: 'rgba(45,212,191,0.2)' }}>
            {/* Header */}
            <div className="px-6 py-4 border-b flex items-center gap-3"
              style={{ borderColor: 'rgba(45,212,191,0.15)', background: 'rgba(45,212,191,0.04)' }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: TEAL }} />
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: TEAL }}>
                Teach Agent · Live · Watching discussion boards
              </p>
            </div>

            {/* Steps */}
            <div className="p-6 space-y-4">
              {[
                { event: 'student.post', detail: 'Student posts in Canvas discussion board', time: '11:47 PM' },
                { event: 'agent.detect', detail: 'MutationObserver fires · Student still on page', time: '11:47:00' },
                { event: 'claude.evaluate', detail: 'Fetching course context + student history...', time: '11:47:01' },
                { event: 'agent.reply', detail: 'Response posted · Student sees it in 2.3s', time: '11:47:03', highlight: true },
              ].map((step, i) => (
                <div key={i} className={`flex items-start gap-4 p-4 rounded-xl ${step.highlight ? 'border' : ''}`}
                  style={step.highlight ? { background: `${TEAL}10`, borderColor: `${TEAL}30` } : {}}>
                  <span className="text-xs font-mono mt-0.5 flex-shrink-0"
                    style={{ color: step.highlight ? TEAL : '#3A3A40' }}>{step.time}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wider mb-0.5"
                      style={{ color: step.highlight ? TEAL : '#555' }}>{step.event}</p>
                    <p className="text-sm" style={{ color: step.highlight ? '#e0e0e0' : '#666' }}>{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealBlock>

        <RevealBlock delay={300} className="mt-8 grid md:grid-cols-3 gap-4">
          {[
            { icon: Zap, label: 'No API required', body: 'Browser extension runs on top of any LMS. Canvas, Blackboard, D2L. No IT project.', color: GOLD },
            { icon: Users, label: 'Every student', body: 'The agent watches every discussion board simultaneously. One agent, unlimited scale.', color: TEAL },
            { icon: TrendingUp, label: 'Always improving', body: 'Every interaction trains the model on your institution\'s voice and your students\' needs.', color: VIOLET },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="rounded-xl p-5 border"
                style={{ background: 'rgba(17,17,24,0.7)', borderColor: 'rgba(255,255,255,0.06)' }}>
                <Icon size={18} className="mb-3" style={{ color: item.color }} />
                <p className="text-molted-white font-bold text-sm mb-1.5">{item.label}</p>
                <p className="text-molted-muted text-xs leading-relaxed">{item.body}</p>
              </div>
            );
          })}
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── 06 · The Platform ─────────────────────────────────────────────────── */
function ThePlatform() {
  const modules = [
    { name: 'Read', color: GOLD }, { name: 'Teach', color: TEAL },
    { name: 'Beacon', color: EMBER }, { name: 'Pathway', color: VIOLET },
    { name: 'Proof', color: '#F97316' }, { name: 'Retain', color: '#F43F5E' },
    { name: 'Outcomes', color: '#0EA5E9' }, { name: 'Mastery', color: '#10B981' },
  ];

  return (
    <section className="py-32 px-6 border-t border-molted-border">
      <div className="max-w-5xl mx-auto text-center">
        <RevealBlock className="mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">The destination</p>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            Each product you adopt<br />
            <span style={{ background: `linear-gradient(120deg, ${GOLD}, ${TEAL}, ${VIOLET})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              builds toward Outpost.
            </span>
          </h2>
          <p className="mt-6 text-molted-muted text-lg max-w-2xl mx-auto">
            Campus is the AI-native LMS — everything Molt builds is a module of it.
            Founding partners get there first, at founding rates, locked forever.
          </p>
        </RevealBlock>

        {/* Architecture diagram */}
        <RevealBlock delay={100}>
          <div className="flex justify-center mb-4">
            <div className="rounded-3xl px-14 py-6 border"
              style={{ background: 'rgba(10,10,15,0.98)', boxShadow: `0 0 0 1px rgba(232,160,32,0.4), 0 0 0 3px rgba(45,212,191,0.12), 0 0 0 6px rgba(139,92,246,0.08), 0 0 60px rgba(139,92,246,0.08)` }}>
              <p className="text-2xl font-black"
                style={{ background: `linear-gradient(135deg, ${GOLD}, ${TEAL}, ${VIOLET})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Campus
              </p>
              <p className="text-molted-subtle text-xs mt-1">The AI-native LMS</p>
            </div>
          </div>
        </RevealBlock>

        <RevealBlock delay={180}>
          <div className="flex justify-center mb-4">
            <div className="w-px h-8" style={{ background: `linear-gradient(to bottom, rgba(232,160,32,0.4), rgba(139,92,246,0.15))` }} />
          </div>
        </RevealBlock>

        <RevealBlock delay={250}>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {modules.map((m) => (
              <div key={m.name} className="rounded-xl p-3 border text-center"
                style={{ background: `${m.color}08`, borderColor: `${m.color}20` }}>
                <div className="w-1.5 h-1.5 rounded-full mx-auto mb-1.5" style={{ background: m.color }} />
                <p className="text-molted-white text-xs font-bold">{m.name}</p>
              </div>
            ))}
          </div>
        </RevealBlock>

        <RevealBlock delay={380} className="mt-10">
          <Link to="/molted/outpost"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: GOLD }}>
            See the full platform <ChevronRight size={14} />
          </Link>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── 07 · The Offer ────────────────────────────────────────────────────── */
function TheOffer() {
  const perks = [
    {
      icon: Lock,
      title: 'Perpetual pricing lock',
      body: 'Whatever per-student rate you sign at, that\'s your rate forever. Not for 3 years. Not until the next contract cycle. Forever. Every institution that joins after you pays more.',
      color: GOLD,
    },
    {
      icon: Users,
      title: 'Co-development input',
      body: 'You shape the product. Quarterly roadmap sessions with the founding team. Your use cases become features. Your feedback ships.',
      color: TEAL,
    },
    {
      icon: TrendingUp,
      title: '1-year head start',
      body: 'Your students get AI that works while your competitors are still in vendor evaluation. In a market moving this fast, a year is a decade.',
      color: VIOLET,
    },
    {
      icon: Zap,
      title: 'White-glove onboarding',
      body: 'We deploy with you, not at you. Your IT team does nothing. The founding team configures every agent, trains every persona, and stays until it\'s running.',
      color: EMBER,
    },
  ];

  return (
    <section className="py-32 px-6 border-t border-molted-border relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(232,160,32,0.05) 0%, transparent 60%)' }} />
      <div className="max-w-6xl mx-auto relative z-10">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">What founding partners get</p>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight">
            This offer exists once.<br />
            <span style={{ color: GOLD }}>For 12 institutions.</span>
          </h2>
          <p className="mt-6 text-molted-muted text-lg max-w-xl mx-auto">
            After the 12 spots fill, the founding program closes permanently.
            The next cohort pays market rate.
          </p>
        </RevealBlock>

        <div className="grid md:grid-cols-2 gap-6">
          {perks.map((p, i) => {
            const Icon = p.icon;
            return (
              <RevealBlock key={i} delay={i * 100}>
                <div className="rounded-2xl p-8 border h-full"
                  style={{ background: 'rgba(17,17,24,0.7)', borderColor: `${p.color}18` }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 border"
                    style={{ background: `${p.color}12`, borderColor: `${p.color}25` }}>
                    <Icon size={18} style={{ color: p.color }} />
                  </div>
                  <h3 className="text-molted-white font-bold text-xl mb-3">{p.title}</h3>
                  <p className="text-molted-muted leading-relaxed">{p.body}</p>
                </div>
              </RevealBlock>
            );
          })}
        </div>

        {/* Pricing signal */}
        <RevealBlock delay={450} className="mt-10">
          <div className="rounded-2xl border p-8"
            style={{ background: `${GOLD}06`, borderColor: `${GOLD}20` }}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <p className="text-molted-white font-bold text-lg mb-1">Founding partner pricing</p>
                <p className="text-molted-muted text-sm">Per-student annual license · All three products · Locked forever</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-black" style={{ color: GOLD }}>$18<span className="text-xl font-semibold text-molted-muted">/student/yr</span></p>
                <p className="text-molted-subtle text-xs mt-1">Market rate after founding: $42+</p>
              </div>
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── 08 · The Ask ──────────────────────────────────────────────────────── */
function TheAsk() {
  return (
    <section className="py-40 px-6 border-t border-molted-border relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(232,160,32,0.06) 0%, transparent 65%)' }} />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <RevealBlock>
          <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: GOLD }}>
            {/* Spots counter */}
            12 spots · First come, first locked
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-molted-white tracking-tight leading-tight">
            One conversation.<br />
            <span style={{ color: GOLD }}>That's all we're asking.</span>
          </h2>
          <p className="mt-8 text-molted-muted text-lg leading-relaxed max-w-xl mx-auto">
            No RFP. No vendor portal. No 6-month evaluation cycle.
            Email us. We'll show you the agent running live on your LMS in the first call.
          </p>
        </RevealBlock>

        <RevealBlock delay={200} className="mt-12">
          <a
            href="mailto:hello@molted.ai?subject=Founding Partner — Let's Talk"
            className="group inline-flex items-center gap-3 px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-200 hover:-translate-y-px hover:shadow-2xl"
            style={{ background: `linear-gradient(135deg, ${GOLD}, ${TEAL})`, color: '#0a0a0f' }}
          >
            hello@molted.ai
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </RevealBlock>

        <RevealBlock delay={350} className="mt-8 text-molted-subtle text-sm">
          We respond within 24 hours. We'll demo the agent live on your LMS in the first call.
        </RevealBlock>

        <RevealBlock delay={480} className="mt-16 flex items-center justify-center gap-8 text-sm">
          <Link to="/molted" className="text-molted-muted hover:text-molted-white transition-colors">
            ← Back to Molt
          </Link>
          <span className="text-molted-border">·</span>
          <Link to="/molted/outpost" className="text-molted-muted hover:text-molted-white transition-colors flex items-center gap-1">
            See Outpost <ChevronRight size={13} />
          </Link>
          <span className="text-molted-border">·</span>
          <Link to="/molted/imago-os" className="text-molted-muted hover:text-molted-white transition-colors flex items-center gap-1">
            See Imago <ChevronRight size={13} />
          </Link>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────── */
export default function MoltedFoundingPartners() {
  return (
    <MoltedLayout>
      <Cover />
      <TheProblem />
      <TheProof />
      <ThreeProducts />
      <TheAgent />
      <ThePlatform />
      <TheOffer />
      <TheAsk />
    </MoltedLayout>
  );
}
