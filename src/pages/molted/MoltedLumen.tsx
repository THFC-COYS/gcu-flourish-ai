import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, MessageSquare, Zap, GraduationCap, ArrowRight, Check, Users, Target, Clock, Video, Mic, Image, AlignLeft, RefreshCw, Link2 } from 'lucide-react';
import MoltLMSLayout, { OutpostBanner } from './MoltedLayout';
import AgentFeed, { FeedEvent } from '../../components/AgentFeed';

const GOLD = '#64748B';

const LUMEN_EVENTS: FeedEvent[] = [
  { time: '9:30 AM',  event: 'Student opens Week 4 reading on pharmacology', action: 'Lumen activates — answers terminology confusion in context, mid-paragraph', role: 'Student', href: '/lumen' },
  { time: '11:52 PM', event: 'Student re-reads the same passage on cardiac output 3 times', action: 'Lumen detects struggle, offers an alternative explanation unprompted', role: 'Student', href: '/lumen' },
  { time: '8:20 AM',  event: 'Cohort of 34 students opens the same pathophysiology chapter', action: 'Lumen logs common confusion points — flags for faculty to address', role: 'Faculty', href: '/lumen' },
  { time: '2:45 AM',  event: 'Student working through ethics case study at 2 AM', action: 'Lumen surfaces related concepts from Week 2 — connects the dots', role: 'Student', href: '/lumen' },
  { time: '10:14 AM', event: 'Student highlights 40% of a paragraph — signals overwhelm', action: 'Lumen simplifies the section without dumbing it down', role: 'Student', href: '/lumen' },
  { time: '4:30 PM',  event: 'Faculty uploads new reading on leadership theory', action: 'Lumen indexes content — ready to answer questions before students open it', role: 'Faculty', href: '/lumen' },
];

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
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(123,97,255,0.18) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Product badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-molted-violet/30 bg-molted-violet/10 text-molted-violet text-xs font-semibold mb-8 animate-fade-in">
          <BookOpen size={12} /> MoltLMS · Students
        </div>

        {/* Hero wordmark */}
        <h1 className="animate-reveal">
          <span
            className="block text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #3D2DB0 0%, #7B61FF 55%, #9D8FFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Lumen
          </span>
        </h1>

        {/* Tagline */}
        <p className="mt-8 text-2xl md:text-3xl font-bold text-molted-muted animate-reveal" style={{ animationDelay: '150ms' }}>
          The tutor that reads with you.
        </p>

        <p className="mt-4 text-lg text-molted-muted/70 max-w-2xl mx-auto leading-relaxed animate-reveal" style={{ animationDelay: '250ms' }}>
          Lumen watches what you're reading. The moment you hit something confusing — a term you don't know, a paragraph that doesn't click — it answers. No search. No tab switching. Just understanding, right there on the page.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-reveal" style={{ animationDelay: '350ms' }}>
          <a
            href="mailto:greg.lucas@paigebreaker.com?subject=Lumen Demo Request"
            className="group flex items-center gap-2.5 px-8 py-4 rounded-xl bg-molted-violet hover:bg-molted-violet-light text-white font-bold text-lg transition-all duration-200 shadow-molted-violet hover:-translate-y-px"
          >
            Request Early Access
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <Link
            to="/lumen/demo"
            className="px-8 py-4 rounded-xl border border-molted-border text-molted-muted hover:text-molted-white font-semibold transition-all hover:border-molted-subtle"
          >
            Try the Demo →
          </Link>
        </div>
      </div>

      {/* Scroll */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-molted-subtle animate-pulse-slow">
        <div className="w-px h-10 bg-gradient-to-b from-molted-subtle to-transparent" />
      </div>
    </section>
  );
}

/* ── The problem / insight ─────────────────────────────────────────────── */
function TheInsight() {
  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-4xl mx-auto">
        <RevealBlock className="text-center">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-8">The insight</p>
          <p className="text-3xl md:text-5xl font-black text-molted-white leading-tight tracking-tight">
            Students don't fail because they're not smart.
          </p>
          <p className="mt-4 text-3xl md:text-5xl font-black leading-tight tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #7B61FF, #9D8FFF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            They fail because they're alone.
          </p>
          <p className="mt-8 text-molted-muted text-lg leading-relaxed max-w-2xl mx-auto">
            A student stuck on a passage at 11 PM has no one to ask. They close the book.
            Lumen is the answer that's always there.
          </p>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── How it works ──────────────────────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    {
      num: '01',
      icon: BookOpen,
      title: 'Upload or open any text',
      body: 'A chapter. A PDF. A reading assignment. An article. Lumen handles anything your curriculum uses.',
    },
    {
      num: '02',
      icon: MessageSquare,
      title: 'Ask in plain English',
      body: 'No special commands. No formatting. Students just ask what\'s confusing them, in their own words.',
    },
    {
      num: '03',
      icon: Zap,
      title: 'Get curriculum-aligned answers',
      body: 'Answers rooted in the document, aligned to your program\'s standards — not random internet results.',
    },
  ];

  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">How it works</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            Three steps. That's it.
          </h2>
        </RevealBlock>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <RevealBlock key={i} delay={i * 120}>
              <div className="relative bg-molted-elevated border border-molted-border rounded-2xl p-8 hover:border-molted-violet/30 hover:shadow-molted-card-hover transition-all">
                <span className="text-6xl font-black text-molted-border select-none">{step.num}</span>
                <div className="mt-4 w-10 h-10 rounded-xl bg-molted-violet/10 border border-molted-violet/20 flex items-center justify-center">
                  <step.icon size={18} className="text-molted-violet" />
                </div>
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

/* ── How Lumen Works ───────────────────────────────────────────────────── */
function HowLumenWorks() {
  const steps = [
    {
      num: '01',
      title: 'You open your reading',
      body: 'Canvas assignment, PDF, textbook, anything in your browser.',
    },
    {
      num: '02',
      title: 'Lumen is already watching',
      body: 'The extension runs silently alongside whatever you\'re reading. No setup. No prompts.',
    },
    {
      num: '03',
      title: 'You hit something confusing',
      body: 'Highlight a passage. Type a question. Or just pause — Lumen detects when you\'re stuck.',
    },
    {
      num: '04',
      title: 'Answer appears instantly',
      body: 'Not a search result. Not a link. A direct answer, in context, while you\'re still on the page.',
    },
  ];

  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-4xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">How Lumen works</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            Always present. Always ready.
          </h2>
          <p className="mt-4 text-molted-muted text-lg max-w-xl mx-auto">
            Lumen isn't something you open. It's already there — watching alongside you from the moment you start.
          </p>
        </RevealBlock>

        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-[#64748B]/60 via-[#64748B]/30 to-transparent hidden md:block" aria-hidden />

          <div className="space-y-6">
            {steps.map((step, i) => (
              <RevealBlock key={i} delay={i * 130}>
                <div className="relative flex items-start gap-6 bg-molted-elevated border border-molted-border rounded-2xl p-7 hover:border-[#64748B]/30 hover:shadow-molted-card-hover transition-all">
                  {/* Numbered node */}
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-black text-sm"
                    style={{
                      background: 'rgba(100,116,139,0.12)',
                      border: '1.5px solid rgba(100,116,139,0.35)',
                      color: '#64748B',
                    }}
                  >
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-molted-white font-bold text-lg">{step.title}</h3>
                    <p className="mt-1.5 text-molted-muted text-sm leading-relaxed">{step.body}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>

        {/* LMS callout */}
        <RevealBlock delay={560} className="mt-10">
          <div
            className="rounded-2xl p-6 text-center border"
            style={{
              background: 'rgba(100,116,139,0.14)',
              borderColor: 'rgba(100,116,139,0.25)',
            }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: '#64748B' }}>
              Works on top of your LMS
            </p>
            <p className="text-molted-muted leading-relaxed">
              Canvas, Blackboard, D2L, PDFs, web articles — if it's in your browser, Lumen works on it. No integration required.
            </p>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Features ──────────────────────────────────────────────────────────── */
function Features() {
  const features = [
    {
      icon: Target,
      title: 'Curriculum-Aligned',
      body: 'Answers don\'t wander. Every response is grounded in the source material and aligned to your program\'s standards.',
      color: 'text-molted-violet',
      bg: 'bg-molted-violet/10 border-molted-violet/20',
    },
    {
      icon: Users,
      title: 'Personalized Depth',
      body: 'A high schooler and a PhD candidate can ask the same question and get the right answer for their level.',
      color: 'text-molted-ember',
      bg: 'bg-molted-ember/10 border-molted-ember/20',
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      body: '2 AM before an exam. Sunday morning before a paper is due. Lumen is never off-duty.',
      color: 'text-sky-400',
      bg: 'bg-sky-400/10 border-sky-400/20',
    },
    {
      icon: GraduationCap,
      title: 'Institutional Control',
      body: 'Upload your materials. Set your guardrails. The AI stays within your curriculum, not the open internet.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10 border-emerald-400/20',
    },
  ];

  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Built differently</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            Not a search engine. A tutor.
          </h2>
          <p className="mt-4 text-molted-muted text-lg max-w-xl mx-auto">
            Every decision in Lumen was made asking one question: does this make the student more capable?
          </p>
        </RevealBlock>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feat, i) => (
            <RevealBlock key={i} delay={i * 100}>
              <div className="bg-molted-elevated border border-molted-border rounded-2xl p-8 hover:shadow-molted-card-hover hover:-translate-y-px transition-all">
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-5 ${feat.bg}`}>
                  <feat.icon size={20} className={feat.color} />
                </div>
                <h3 className="text-molted-white font-bold text-xl mb-3">{feat.title}</h3>
                <p className="text-molted-muted leading-relaxed">{feat.body}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Who it's for ──────────────────────────────────────────────────────── */
function Audiences() {
  const audiences = [
    {
      icon: '🎓',
      title: 'College Students',
      description: 'Dense textbooks. Late nights. High stakes. Lumen is the study partner who actually read the chapter.',
      features: ['Graduate-level text comprehension', 'Citation-ready explanations', 'Essay ideation from source material'],
    },
    {
      icon: '🏫',
      title: 'K-12 Learners',
      description: 'Every student deserves a patient, knowledgeable guide. Even in a classroom of thirty.',
      features: ['Age-appropriate language', 'Scaffolded difficulty', 'Homework and test prep'],
    },
    {
      icon: '🏢',
      title: 'Professional Training',
      description: 'Onboarding manuals. Compliance docs. Technical standards. Lumen makes training stick.',
      features: ['Enterprise documentation', 'Industry-specific knowledge', 'Custom training modules'],
    },
  ];

  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Who it serves</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            Every learner. Every level.
          </h2>
        </RevealBlock>

        <div className="grid md:grid-cols-3 gap-8">
          {audiences.map((a, i) => (
            <RevealBlock key={i} delay={i * 120}>
              <div className="bg-molted-elevated border border-molted-border rounded-2xl p-8 h-full hover:border-molted-violet/30 transition-all">
                <span className="text-4xl">{a.icon}</span>
                <h3 className="mt-4 text-molted-white font-bold text-xl">{a.title}</h3>
                <p className="mt-3 text-molted-muted text-sm leading-relaxed">{a.description}</p>
                <ul className="mt-6 space-y-2.5">
                  {a.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-molted-muted">
                      <Check size={14} className="text-molted-violet flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Live Feed ─────────────────────────────────────────────────────────── */
function LumenLiveFeed() {
  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Reading in real time</p>
            <h2 className="text-4xl md:text-5xl font-black text-molted-white leading-tight tracking-tight mb-6">
              Lumen watches.<br />
              <span style={{ color: GOLD }}>Then it answers.</span>
            </h2>
            <p className="text-molted-muted text-lg leading-relaxed">
              Every event below is a student hitting a wall — and Lumen meeting them there. No search. No tab switching. Understanding delivered exactly where the confusion happened.
            </p>
          </div>
          <AgentFeed events={LUMEN_EVENTS} label="Lumen active sessions" accentColor={GOLD} />
        </div>
      </div>
    </section>
  );
}

/* ── Multi-Modal ───────────────────────────────────────────────────────── */
const VIOLET = '#7B61FF';
const VIOLET_DIM = 'rgba(123,97,255,0.10)';
const VIOLET_BORDER = 'rgba(123,97,255,0.25)';

function MultiModal() {
  const formats = [
    {
      icon: AlignLeft,
      title: 'Text passages',
      body: 'PDFs, Canvas readings, web articles, textbook chapters. The original Lumen capability — and it still works everywhere.',
      tag: 'Available now',
      tagColor: '#7B61FF',
      tagBg: VIOLET_DIM,
      tagBorder: VIOLET_BORDER,
    },
    {
      icon: Video,
      title: 'Lecture videos',
      body: "Lumen transcribes and understands recorded lectures. Students ask questions about the video's content the same way they ask about a chapter.",
      tag: 'In development',
      tagColor: '#F59E0B',
      tagBg: 'rgba(245,158,11,0.08)',
      tagBorder: 'rgba(245,158,11,0.25)',
    },
    {
      icon: Mic,
      title: 'Audio recordings',
      body: 'Podcasts, oral explanations, professor voice notes, interview recordings — Lumen listens and answers from what it heard.',
      tag: 'In development',
      tagColor: '#F59E0B',
      tagBg: 'rgba(245,158,11,0.08)',
      tagBorder: 'rgba(245,158,11,0.25)',
    },
    {
      icon: Image,
      title: 'Visual content',
      body: 'Diagrams, charts, lab images, slides. Lumen reads what the image shows and connects it to the surrounding curriculum.',
      tag: 'Coming soon',
      tagColor: '#64748B',
      tagBg: 'rgba(100,116,139,0.08)',
      tagBorder: 'rgba(100,116,139,0.20)',
    },
  ];

  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Multi-modal learning</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight leading-tight">
            Students don't just read.<br />
            <span className="text-molted-violet">Lumen knows that now.</span>
          </h2>
          <p className="mt-6 text-molted-muted text-lg max-w-2xl mx-auto">
            A nursing lecture video. A chemistry diagram. A recorded discussion. Lumen meets students in whatever format their course delivers content.
          </p>
        </RevealBlock>

        <div className="grid md:grid-cols-2 gap-5">
          {formats.map((f, i) => (
            <RevealBlock key={i} delay={i * 100}>
              <div className="bg-molted-elevated border border-molted-border rounded-2xl p-7 h-full hover:-translate-y-px transition-all">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-molted-violet/10 border border-molted-violet/20 flex items-center justify-center flex-shrink-0">
                    <f.icon size={20} className="text-molted-violet" />
                  </div>
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full border flex-shrink-0"
                    style={{ color: f.tagColor, background: f.tagBg, borderColor: f.tagBorder }}
                  >
                    {f.tag}
                  </span>
                </div>
                <h3 className="text-molted-white font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-molted-muted text-sm leading-relaxed">{f.body}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Explain 3 Ways ────────────────────────────────────────────────────── */
function ExplainThreeWays() {
  const modes = [
    {
      label: 'Visual',
      icon: Image,
      color: '#14B8A6',
      border: 'rgba(20,184,166,0.30)',
      bg: 'rgba(20,184,166,0.08)',
      description: 'Described as a spatial diagram or process map you can picture.',
      example: '"Think of the cell membrane as a nightclub bouncer. The phospholipid bilayer is the velvet rope — nonpolar molecules slip through, polar ones need a pass."',
    },
    {
      label: 'Narrative',
      icon: BookOpen,
      color: '#7B61FF',
      border: VIOLET_BORDER,
      bg: VIOLET_DIM,
      description: 'Told as a story with characters, cause and effect, and stakes.',
      example: '"When a pathogen enters your bloodstream, it\'s like an intruder in a fortress. The innate immune system is the first responder — fast, non-specific, and already on patrol."',
    },
    {
      label: 'Analogy',
      icon: Link2,
      color: '#F59E0B',
      border: 'rgba(245,158,11,0.30)',
      bg: 'rgba(245,158,11,0.08)',
      description: 'Mapped to something the student already understands from daily life.',
      example: '"ATP is the currency of the cell. Every process that needs energy — movement, building proteins, sending signals — pays in ATP. Run out, and the cell goes bankrupt."',
    },
  ];

  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Explain 3 ways</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            One concept.<br />
            <span className="text-molted-violet">Three doorways in.</span>
          </h2>
          <p className="mt-6 text-molted-muted text-lg max-w-2xl mx-auto">
            When a student is stuck, the answer isn't always more of the same explanation. Lumen tries again — in a completely different mode — until something clicks.
          </p>
        </RevealBlock>

        <div className="grid md:grid-cols-3 gap-6">
          {modes.map((m, i) => (
            <RevealBlock key={i} delay={i * 120}>
              <div
                className="rounded-2xl border p-7 h-full flex flex-col hover:-translate-y-px transition-all"
                style={{ borderColor: m.border, background: m.bg }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: m.bg, border: `1px solid ${m.border}` }}
                  >
                    <m.icon size={18} style={{ color: m.color }} />
                  </div>
                  <span className="font-black text-lg" style={{ color: m.color }}>{m.label}</span>
                </div>
                <p className="text-molted-muted text-sm mb-4 leading-relaxed">{m.description}</p>
                <div
                  className="rounded-xl p-4 border text-xs text-molted-muted leading-relaxed italic flex-1 mt-auto"
                  style={{ background: 'rgba(0,0,0,0.15)', borderColor: 'rgba(255,255,255,0.06)' }}
                >
                  {m.example}
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>

        <RevealBlock delay={400} className="mt-8">
          <div
            className="rounded-2xl border p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            style={{ borderColor: VIOLET_BORDER, background: VIOLET_DIM }}
          >
            <div>
              <p className="text-molted-white font-bold text-sm">Live in the Lumen demo</p>
              <p className="text-molted-muted text-xs mt-1">
                Type any concept from your curriculum and watch Lumen explain it three different ways — in real time.
              </p>
            </div>
            <Link
              to="/lumen/demo"
              className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all hover:-translate-y-px"
              style={{ background: VIOLET, color: '#0A0A0B' }}
            >
              Try it now →
            </Link>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Spaced Repetition ─────────────────────────────────────────────────── */
function SpacedRepetition() {
  const cards = [
    { concept: 'Cardiac Output', course: 'NURS 220', daysAgo: 12, strength: 'Weak', color: '#EF4444', border: 'rgba(239,68,68,0.30)', bg: 'rgba(239,68,68,0.08)' },
    { concept: 'Pharmacokinetics', course: 'PHARM 310', daysAgo: 8, strength: 'Fading', color: '#F59E0B', border: 'rgba(245,158,11,0.30)', bg: 'rgba(245,158,11,0.08)' },
    { concept: 'Homeostasis', course: 'BIO 101', daysAgo: 21, strength: 'Strong', color: '#14B8A6', border: 'rgba(20,184,166,0.30)', bg: 'rgba(20,184,166,0.08)' },
  ];

  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <RevealBlock>
            <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Spaced repetition</p>
            <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight leading-tight mb-6">
              Learning doesn't end<br />
              <span className="text-molted-violet">when the chapter does.</span>
            </h2>
            <p className="text-molted-muted text-lg leading-relaxed mb-6">
              Lumen tracks which concepts a student struggled with — and resurfaces them at exactly the right interval before they fade. Not at the end of the semester. Before the student needs them.
            </p>
            <div className="space-y-3">
              {['Resurfaces weak concepts before exam season', 'Calculates optimal review timing per student', 'Weaves review into current reading — not a separate app', 'Flagged concepts feed back into PathwayAI for path adjustments'].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-molted-muted">
                  <Check size={14} className="text-molted-violet flex-shrink-0 mt-0.5" />
                  {item}
                </div>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={150}>
            <div className="bg-molted-elevated border border-molted-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <p className="text-molted-white font-bold text-sm">Jordan M. — Review Queue</p>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-molted-violet/30 bg-molted-violet/10">
                  <RefreshCw size={11} className="text-molted-violet" />
                  <span className="text-xs font-semibold text-molted-violet">3 concepts due</span>
                </div>
              </div>
              <div className="space-y-3">
                {cards.map((card, i) => (
                  <div key={i} className="rounded-xl border p-4" style={{ borderColor: card.border, background: card.bg }}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-bold text-sm text-molted-white">{card.concept}</p>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ color: card.color, background: `${card.color}15` }}>{card.strength}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-molted-muted">{card.course} · {card.daysAgo} days ago</p>
                      <button
                        className="text-xs font-semibold px-3 py-1 rounded-lg transition-all hover:-translate-y-px"
                        style={{ color: card.color, background: `${card.color}15`, border: `1px solid ${card.border}` }}
                      >
                        Review now →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="mt-4 rounded-xl border p-4"
                style={{ borderColor: VIOLET_BORDER, background: VIOLET_DIM }}
              >
                <p className="text-xs text-molted-muted leading-relaxed">
                  <span className="font-semibold text-molted-violet">Lumen insight:</span> Cardiac Output shows up in your current NURS 340 reading. Reviewing it now will compound your understanding — want to do a quick re-visit before continuing?
                </p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </div>
    </section>
  );
}

/* ── Cross-Course ──────────────────────────────────────────────────────── */
function CrossCourse() {
  const connections = [
    {
      currentCourse: 'NURS 340',
      currentConcept: 'Fluid-Electrolyte Balance',
      priorCourse: 'BIO 101',
      priorConcept: 'Osmosis & Diffusion',
      insight: 'The osmotic pressure driving fluid shifts in NURS 340 is the same mechanism you studied in BIO 101 Week 3. Your notes on semipermeable membranes apply directly here.',
    },
    {
      currentCourse: 'PHARM 310',
      currentConcept: 'Drug Metabolism',
      priorCourse: 'BIO 202',
      priorConcept: 'Liver Function & Enzymes',
      insight: "The CYP450 enzyme system in PHARM 310 is the same enzyme family you explored in BIO 202. Understanding that context makes first-pass metabolism significantly easier.",
    },
    {
      currentCourse: 'NURS 420',
      currentConcept: 'Sepsis Management',
      priorCourse: 'NURS 220',
      priorConcept: 'Cardiac Output',
      insight: "Septic shock's hemodynamic instability is a direct extension of the cardiac output principles from NURS 220. You already understand the mechanism — now you're applying it under crisis.",
    },
  ];

  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Cross-course intelligence</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight leading-tight">
            "You learned this in BIO 101.<br />
            <span className="text-molted-violet">Here it is in NURS 340."</span>
          </h2>
          <p className="mt-6 text-molted-muted text-lg max-w-2xl mx-auto">
            Every course a student has taken is context for every course they're taking now. Lumen makes those connections visible — exactly when the student needs them.
          </p>
        </RevealBlock>

        <div className="space-y-4">
          {connections.map((conn, i) => (
            <RevealBlock key={i} delay={i * 120}>
              <div className="bg-molted-elevated border border-molted-border rounded-2xl p-6 hover:border-molted-violet/30 transition-all">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  {/* Prior course */}
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-molted-border/20 border border-molted-border">
                    <p className="text-xs font-semibold text-molted-muted">{conn.priorCourse}</p>
                    <span className="text-molted-subtle">·</span>
                    <p className="text-xs text-molted-white font-medium">{conn.priorConcept}</p>
                  </div>
                  <ArrowRight size={14} className="text-molted-violet flex-shrink-0 hidden md:block" />
                  {/* Current course */}
                  <div
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border"
                    style={{ borderColor: VIOLET_BORDER, background: VIOLET_DIM }}
                  >
                    <p className="text-xs font-semibold" style={{ color: VIOLET }}>{conn.currentCourse}</p>
                    <span className="text-molted-subtle">·</span>
                    <p className="text-xs font-medium text-molted-white">{conn.currentConcept}</p>
                  </div>
                </div>
                <p className="text-sm text-molted-muted leading-relaxed border-l-2 pl-4" style={{ borderColor: VIOLET_BORDER }}>
                  <span className="font-semibold text-molted-violet">Lumen: </span>{conn.insight}
                </p>
              </div>
            </RevealBlock>
          ))}
        </div>

        <RevealBlock delay={400} className="mt-8">
          <div
            className="rounded-2xl border p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            style={{ borderColor: VIOLET_BORDER, background: VIOLET_DIM }}
          >
            <div>
              <p className="text-molted-white font-bold text-sm">See it live in the Lumen demo</p>
              <p className="text-molted-muted text-xs mt-1">Paste any reading and watch Lumen surface cross-course connections in real time.</p>
            </div>
            <Link
              to="/lumen/demo"
              className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all hover:-translate-y-px"
              style={{ background: VIOLET, color: '#0A0A0B' }}
            >
              Try the demo →
            </Link>
          </div>
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
            See Lumen<br />
            <span className="text-molted-violet">in action.</span>
          </h2>
          <p className="mt-6 text-molted-muted text-lg">
            We're partnering with early institutions to shape the product.
            Join us in building the future of reading.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:greg.lucas@paigebreaker.com?subject=Lumen Demo Request"
              className="group flex items-center gap-2.5 px-8 py-4 rounded-xl bg-molted-violet hover:bg-molted-violet-light text-white font-bold text-lg transition-all hover:-translate-y-px shadow-molted-violet"
            >
              Request a Demo
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              to="/"
              className="px-8 py-4 rounded-xl border border-molted-border text-molted-muted hover:text-molted-white font-semibold transition-all hover:border-molted-subtle"
            >
              ← Back to MoltLMS
            </Link>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

export default function MoltLMSLumen() {
  return (
    <MoltLMSLayout>
      <OutpostBanner moduleName="Lumen" moduleColor="#64748B" />
      <Hero />
      <TheInsight />
      <HowItWorks />
      <HowLumenWorks />
      <LumenLiveFeed />
      <MultiModal />
      <ExplainThreeWays />
      <SpacedRepetition />
      <CrossCourse />
      <Features />
      <Audiences />
      <CTA />
    </MoltLMSLayout>
  );
}
