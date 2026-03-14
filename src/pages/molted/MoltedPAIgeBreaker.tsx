import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, MessageSquare, Zap, GraduationCap, ArrowRight, Check, Users, Target, Clock } from 'lucide-react';
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
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(123,97,255,0.10) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Product badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-molted-violet/30 bg-molted-violet/10 text-molted-violet text-xs font-semibold mb-8 animate-fade-in">
          <BookOpen size={12} /> Molt · Students
        </div>

        {/* Hero wordmark */}
        <h1 className="animate-reveal">
          <span
            className="block text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #F5F5F7 0%, #9D8FFF 50%, #7B61FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Read
          </span>
        </h1>

        {/* Tagline */}
        <p className="mt-8 text-2xl md:text-3xl font-bold text-molted-muted animate-reveal" style={{ animationDelay: '150ms' }}>
          The tutor that reads with you.
        </p>

        <p className="mt-4 text-lg text-molted-muted/70 max-w-2xl mx-auto leading-relaxed animate-reveal" style={{ animationDelay: '250ms' }}>
          Read watches what you're reading. The moment you hit something confusing — a term you don't know, a paragraph that doesn't click — it answers. No search. No tab switching. Just understanding, right there on the page.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-reveal" style={{ animationDelay: '350ms' }}>
          <a
            href="mailto:hello@molted.ai?subject=Read Demo Request"
            className="group flex items-center gap-2.5 px-8 py-4 rounded-xl bg-molted-violet hover:bg-molted-violet-light text-white font-bold text-lg transition-all duration-200 shadow-molted-violet hover:-translate-y-px"
          >
            Request Early Access
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <Link
            to="/molted/persona-ai"
            className="px-8 py-4 rounded-xl border border-molted-border text-molted-muted hover:text-molted-white font-semibold transition-all hover:border-molted-subtle"
          >
            See Persona Ai instead →
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
            Read is the answer that's always there.
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
      body: 'A chapter. A PDF. A reading assignment. An article. Read handles anything your curriculum uses.',
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

/* ── How Read Works ────────────────────────────────────────────────────── */
function HowReadWorks() {
  const steps = [
    {
      num: '01',
      title: 'You open your reading',
      body: 'Canvas assignment, PDF, textbook, anything in your browser.',
    },
    {
      num: '02',
      title: 'Read is already watching',
      body: 'The extension runs silently alongside whatever you\'re reading. No setup. No prompts.',
    },
    {
      num: '03',
      title: 'You hit something confusing',
      body: 'Highlight a passage. Type a question. Or just pause — Read detects when you\'re stuck.',
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
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">How Read works</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            Always present. Always ready.
          </h2>
          <p className="mt-4 text-molted-muted text-lg max-w-xl mx-auto">
            Read isn't something you open. It's already there — watching alongside you from the moment you start.
          </p>
        </RevealBlock>

        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-[#E8A020]/60 via-[#E8A020]/30 to-transparent hidden md:block" aria-hidden />

          <div className="space-y-6">
            {steps.map((step, i) => (
              <RevealBlock key={i} delay={i * 130}>
                <div className="relative flex items-start gap-6 bg-molted-elevated border border-molted-border rounded-2xl p-7 hover:border-[#E8A020]/30 hover:shadow-molted-card-hover transition-all">
                  {/* Numbered node */}
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-black text-sm"
                    style={{
                      background: 'rgba(232,160,32,0.12)',
                      border: '1.5px solid rgba(232,160,32,0.35)',
                      color: '#E8A020',
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
              background: 'rgba(232,160,32,0.06)',
              borderColor: 'rgba(232,160,32,0.25)',
            }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: '#E8A020' }}>
              Works on top of your LMS
            </p>
            <p className="text-molted-muted leading-relaxed">
              Canvas, Blackboard, D2L, PDFs, web articles — if it's in your browser, Read works on it. No integration required.
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
      body: '2 AM before an exam. Sunday morning before a paper is due. Read is never off-duty.',
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
            Every decision in Read was made asking one question: does this make the student more capable?
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
      description: 'Dense textbooks. Late nights. High stakes. Read is the study partner who actually read the chapter.',
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
      description: 'Onboarding manuals. Compliance docs. Technical standards. Read makes training stick.',
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

/* ── CTA ───────────────────────────────────────────────────────────────── */
function CTA() {
  return (
    <section className="py-32 px-6 border-t border-molted-border">
      <div className="max-w-3xl mx-auto text-center">
        <RevealBlock>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            See Read<br />
            <span className="text-molted-violet">in action.</span>
          </h2>
          <p className="mt-6 text-molted-muted text-lg">
            We're partnering with early institutions to shape the product.
            Join us in building the future of reading.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:hello@molted.ai?subject=Read Demo Request"
              className="group flex items-center gap-2.5 px-8 py-4 rounded-xl bg-molted-violet hover:bg-molted-violet-light text-white font-bold text-lg transition-all hover:-translate-y-px shadow-molted-violet"
            >
              Request a Demo
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              to="/molted"
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

export default function MoltedPAIgeBreaker() {
  return (
    <MoltedLayout>
      <OutpostBanner moduleName="Read" moduleColor="#E8A020" />
      <Hero />
      <TheInsight />
      <HowItWorks />
      <HowReadWorks />
      <Features />
      <Audiences />
      <CTA />
    </MoltedLayout>
  );
}
