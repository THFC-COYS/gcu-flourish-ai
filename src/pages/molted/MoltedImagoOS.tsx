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

function RevealBlock({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
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

/* ── ImagoOS color tokens ───────────────────────────────────────────────── */
const IMAGO_AMBER  = '#F5B740';
const IMAGO_GOLD   = '#E8A020';
const IMAGO_WARM   = '#FDE68A';
const IMAGO_GRADIENT = 'linear-gradient(135deg, #F5B740 0%, #E8A020 60%, #D97706 100%)';

/* ── Hero ──────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Ambient — warm amber glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(245,183,64,0.09) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-[-5%] left-[10%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(232,160,32,0.05) 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-[30%] right-[-5%] w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(245,183,64,0.04) 0%, transparent 70%)' }}
        />
      </div>

      {/* Eyebrow */}
      <RevealBlock className="mb-8">
        <Link
          to="/molted/outpost"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold tracking-widest uppercase hover:opacity-80 transition-opacity"
          style={{ borderColor: 'rgba(245,183,64,0.25)', background: 'rgba(245,183,64,0.05)', color: IMAGO_AMBER }}
        >
          Built on Outpost
          <ChevronRight size={11} />
        </Link>
      </RevealBlock>

      {/* Wordmark */}
      <RevealBlock delay={120}>
        <h1
          className="text-7xl md:text-9xl font-black leading-none tracking-tight"
          style={{
            background: IMAGO_GRADIENT,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Imago
        </h1>
      </RevealBlock>

      {/* Definition */}
      <RevealBlock delay={200}>
        <p className="mt-4 text-molted-subtle text-sm tracking-widest font-medium italic">
          ima·go — the final adult form of an insect, reached after all molts are complete
        </p>
      </RevealBlock>

      {/* Tagline */}
      <RevealBlock delay={320}>
        <p className="mt-6 text-xl md:text-2xl font-semibold tracking-wide" style={{ color: IMAGO_WARM }}>
          The final form.
        </p>
      </RevealBlock>

      {/* Sub */}
      <RevealBlock delay={380}>
        <p className="mt-4 text-sm text-molted-subtle tracking-wide max-w-xs mx-auto leading-relaxed">
          What your institution becomes when the transformation is complete.
        </p>
      </RevealBlock>

      {/* CTA */}
      <RevealBlock delay={520} className="mt-12 flex flex-col sm:flex-row items-center gap-4">
        <a
          href="mailto:hello@molted.ai"
          className="group inline-flex items-center gap-3 px-9 py-4 rounded-2xl font-bold text-lg transition-all duration-200 hover:-translate-y-px hover:shadow-2xl"
          style={{ background: IMAGO_GRADIENT, color: '#0a0a0f' }}
        >
          Begin the Transformation
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </a>
        <Link
          to="/molted/outpost"
          className="text-sm font-semibold text-molted-muted hover:text-molted-white transition-colors flex items-center gap-1.5"
        >
          Start with Outpost <ChevronRight size={13} />
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

/* ── The Molt Metaphor ──────────────────────────────────────────────────── */
function TheMoltMetaphor() {
  return (
    <section className="py-32 px-6 border-t border-molted-border">
      <div className="max-w-4xl mx-auto">
        <RevealBlock>
          <h2 className="text-5xl md:text-7xl font-black text-molted-white tracking-tight leading-tight">
            Every institution
            <br />
            is mid-molt.
          </h2>
        </RevealBlock>

        <RevealBlock delay={140}>
          <p className="mt-8 text-xl text-molted-muted leading-relaxed max-w-3xl">
            Molting isn't a moment. It's a process — the old skin constrains the organism
            until it can no longer grow inside it. Then comes the shedding.
            Then comes the imago: the final, perfected adult form.
          </p>
        </RevealBlock>

        <RevealBlock delay={260} className="my-16">
          <p
            className="text-3xl md:text-4xl font-black leading-snug"
            style={{
              background: IMAGO_GRADIENT,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            "Education is molting.
            <br />
            Molt is what it becomes."
          </p>
        </RevealBlock>

        <div className="space-y-8">
          <RevealBlock delay={80}>
            <p className="text-molted-white/80 text-lg leading-relaxed">
              The old skin is Canvas. Blackboard. D2L. Fixed semesters, letter grades,
              one-size-fits-all curricula built for an era that no longer exists.
              Institutions aren't failing because of bad teachers or unmotivated students.
              They're failing because the infrastructure was built for a different world.
            </p>
          </RevealBlock>

          <RevealBlock delay={180}>
            <p className="text-molted-white/80 text-lg leading-relaxed">
              Outpost is the shedding — the replacement infrastructure, built AI-native from
              the first line of code. But infrastructure is the means, not the end.
            </p>
          </RevealBlock>

          <RevealBlock delay={280}>
            <p className="font-semibold text-lg leading-relaxed" style={{ color: IMAGO_AMBER }}>
              Imago is the end. The institution that emerges on the other side —
              fully transformed, unrecognizable from what it was.
            </p>
          </RevealBlock>
        </div>
      </div>
    </section>
  );
}

/* ── The Three Stages ───────────────────────────────────────────────────── */
function ThreeStages() {
  const stages = [
    {
      label: 'Stage 1',
      name: 'The Old Skin',
      color: '#E8170F',
      bg: 'rgba(232,23,15,0.04)',
      border: 'rgba(232,23,15,0.12)',
      traits: [
        'Canvas, Blackboard, or D2L',
        'AI bolted on as a plugin',
        'Fixed semesters and course shells',
        'Grades as the unit of truth',
        'Admin overhead consuming faculty',
        'Retention handled reactively',
      ],
    },
    {
      label: 'Stage 2',
      name: 'Outpost',
      color: '#E8A020',
      bg: 'rgba(232,160,32,0.05)',
      border: 'rgba(232,160,32,0.2)',
      traits: [
        'AI-native LMS from the ground up',
        'All modules unified in one platform',
        'Mastery replaces grades',
        'Continuous learning, no end dates',
        'Teach automates faculty admin',
        'Retain predicts student risk early',
      ],
    },
    {
      label: 'Stage 3',
      name: 'Imago',
      color: IMAGO_AMBER,
      bg: 'rgba(245,183,64,0.06)',
      border: 'rgba(245,183,64,0.25)',
      traits: [
        'Zero admin overhead — fully autonomous',
        'Every student on a personalized path',
        'Real-time outcomes visible to leadership',
        'AI personas embedded in every interaction',
        'Departure risk eliminated before it forms',
        'Learning extends lifelong, beyond graduation',
      ],
    },
  ];

  return (
    <section className="py-32 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">
            The lifecycle
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            Three stages.
            <br />
            One direction.
          </h2>
        </RevealBlock>

        <div className="grid md:grid-cols-3 gap-6">
          {stages.map((s, i) => (
            <RevealBlock key={s.name} delay={i * 140}>
              <div
                className="rounded-2xl p-8 border h-full relative overflow-hidden"
                style={{ background: s.bg, borderColor: s.border }}
              >
                {i === 2 && (
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${IMAGO_AMBER}, transparent)` }}
                  />
                )}
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: s.color }}>
                  {s.label}
                </p>
                <p className="text-2xl font-black text-molted-white mb-6">{s.name}</p>
                <ul className="space-y-3">
                  {s.traits.map((t, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-molted-muted/90 leading-snug">
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                        style={{ background: s.color, opacity: i === 0 ? 0.5 : 1 }}
                      />
                      <span className={i === 0 ? 'line-through decoration-molted-subtle decoration-1' : ''}>
                        {t}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          ))}
        </div>

        {/* Flow arrows */}
        <RevealBlock delay={500} className="mt-6 flex justify-center items-center gap-4 text-molted-subtle text-xs font-semibold uppercase tracking-widest">
          <span style={{ color: '#E8170F' }}>Old Skin</span>
          <ChevronRight size={14} />
          <span style={{ color: '#E8A020' }}>Outpost</span>
          <ChevronRight size={14} />
          <span style={{ color: IMAGO_AMBER }}>Imago</span>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── What ImagoOS Institutions Do Differently ───────────────────────────── */
const DIFFERENCES = [
  {
    headline: 'No admin.',
    body: 'Every grading, discussion, announcement, and outreach task is autonomous. Faculty teach. Administrators lead. Nothing is wasted on process.',
    color: IMAGO_AMBER,
  },
  {
    headline: 'No one-size.',
    body: "Every student is on a path built for them — their pace, their strengths, their goals. Pathway rebuilds the curriculum around the learner, not the lecture schedule.",
    color: IMAGO_GOLD,
  },
  {
    headline: 'No surprises.',
    body: 'Retain surfaces departure risk weeks before students decide. Outcomes gives leadership real-time visibility into every outcome metric that matters.',
    color: IMAGO_AMBER,
  },
  {
    headline: 'No walls.',
    body: 'Learning extends beyond graduation. Outpost follows learners into careers, continuing education, and lifelong development. The institution never loses the relationship.',
    color: IMAGO_GOLD,
  },
];

function WhatsDifferent() {
  return (
    <section className="py-32 px-6 border-t border-molted-border relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(245,183,64,0.04) 0%, transparent 60%)' }}
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">
            The imago state
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            What changes.
            <br />
            <span
              style={{
                background: IMAGO_GRADIENT,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Everything.
            </span>
          </h2>
        </RevealBlock>

        <div className="grid md:grid-cols-2 gap-6">
          {DIFFERENCES.map((d, i) => (
            <RevealBlock key={i} delay={i * 120}>
              <div
                className="rounded-2xl p-10 border h-full"
                style={{
                  background: 'rgba(17,17,24,0.7)',
                  borderColor: `rgba(245,183,64,0.12)`,
                }}
              >
                <p
                  className="text-5xl md:text-6xl font-black mb-6 leading-none"
                  style={{ color: d.color }}
                >
                  {d.headline}
                </p>
                <p className="text-molted-muted text-base leading-relaxed">{d.body}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── The Architecture ───────────────────────────────────────────────────── */
function Architecture() {
  const modules = [
    { name: 'Teach', color: '#2DD4BF', role: 'Faculty' },
    { name: 'Read', color: '#E8A020', role: 'Students' },
    { name: 'Beacon', color: '#E8170F', role: 'Institution' },
    { name: 'Pathway', color: '#8B5CF6', role: 'Students' },
    { name: 'Proof', color: '#F97316', role: 'Faculty' },
    { name: 'Retain', color: '#F43F5E', role: 'Institution' },
    { name: 'Outcomes', color: '#0EA5E9', role: 'Leadership' },
    { name: 'Mastery', color: '#10B981', role: 'Curriculum' },
  ];

  return (
    <section className="py-32 px-6 border-t border-molted-border">
      <div className="max-w-5xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">
            The stack
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            Imago = Outpost +<br />all 8 modules, fully deployed.
          </h2>
          <p className="mt-6 text-molted-muted text-base max-w-xl mx-auto leading-relaxed">
            Each module can be adopted individually. Imago is the state you reach
            when every layer is running — nothing missing, nothing bolted on.
          </p>
        </RevealBlock>

        {/* ImagoOS crown */}
        <RevealBlock>
          <div className="flex justify-center mb-4">
            <div
              className="rounded-3xl px-12 py-6 text-center border relative overflow-hidden"
              style={{
                background: 'rgba(10,10,15,0.98)',
                borderColor: 'transparent',
                boxShadow: `0 0 0 1px rgba(245,183,64,0.6),
                             0 0 0 4px rgba(245,183,64,0.15),
                             0 0 60px rgba(245,183,64,0.10)`,
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${IMAGO_AMBER}, transparent)` }}
              />
              <p
                className="text-3xl font-black"
                style={{
                  background: IMAGO_GRADIENT,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Imago
              </p>
              <p className="text-molted-subtle text-xs mt-1">The final form</p>
            </div>
          </div>
        </RevealBlock>

        {/* Outpost layer */}
        <RevealBlock delay={100}>
          <div className="flex justify-center mb-4">
            <div
              className="w-px h-8"
              style={{ background: `linear-gradient(to bottom, ${IMAGO_AMBER}, rgba(232,160,32,0.3))` }}
            />
          </div>
          <Link
            to="/molted/outpost"
            className="group flex justify-center mb-4"
          >
            <div
              className="rounded-2xl px-10 py-4 text-center border hover:border-opacity-80 transition-colors"
              style={{
                background: 'rgba(10,10,15,0.95)',
                boxShadow: '0 0 0 1px rgba(232,160,32,0.35), 0 0 0 3px rgba(45,212,191,0.12), 0 0 0 6px rgba(139,92,246,0.07)',
              }}
            >
              <p
                className="text-xl font-black"
                style={{
                  background: 'linear-gradient(135deg, #E8A020 0%, #2DD4BF 50%, #8B5CF6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Outpost
              </p>
              <p className="text-molted-subtle text-xs mt-0.5">The AI-native LMS</p>
            </div>
          </Link>
        </RevealBlock>

        {/* Connector */}
        <RevealBlock delay={180}>
          <div className="flex justify-center mb-4">
            <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, rgba(232,160,32,0.3), rgba(139,92,246,0.2))' }} />
          </div>
        </RevealBlock>

        {/* Module grid */}
        <RevealBlock delay={260}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {modules.map((m) => (
              <div
                key={m.name}
                className="rounded-xl p-3 border text-center"
                style={{
                  background: `rgba(${parseInt(m.color.slice(1,3),16)},${parseInt(m.color.slice(3,5),16)},${parseInt(m.color.slice(5,7),16)},0.05)`,
                  borderColor: `rgba(${parseInt(m.color.slice(1,3),16)},${parseInt(m.color.slice(3,5),16)},${parseInt(m.color.slice(5,7),16)},0.18)`,
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full mx-auto mb-1.5" style={{ background: m.color }} />
                <p className="text-molted-white text-xs font-bold">{m.name}</p>
                <p className="text-molted-subtle text-xs mt-0.5">{m.role}</p>
              </div>
            ))}
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── The Molt is Not Optional ───────────────────────────────────────────── */
function MoltManifesto() {
  return (
    <section className="py-40 px-6 border-t border-molted-border relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(245,183,64,0.05) 0%, transparent 65%)' }}
      />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <RevealBlock>
          <p className="text-4xl md:text-6xl lg:text-7xl font-black text-molted-white tracking-tight leading-tight">
            The molt is not optional.
          </p>
        </RevealBlock>
        <RevealBlock delay={200}>
          <p className="mt-10 text-xl text-molted-muted max-w-2xl mx-auto leading-relaxed">
            Every institution running legacy infrastructure is already constrained by it.
            The question isn't whether education transforms.
            The question is whether your institution leads that transformation or follows it.
          </p>
        </RevealBlock>
        <RevealBlock delay={380}>
          <p
            className="mt-12 text-3xl md:text-4xl font-black leading-tight"
            style={{
              background: IMAGO_GRADIENT,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            The imago is waiting.
          </p>
        </RevealBlock>
        <RevealBlock delay={520}>
          <p className="mt-8 text-molted-subtle text-sm tracking-widest font-medium">
            — Molt
          </p>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── CTA ────────────────────────────────────────────────────────────────── */
function TransformCTA() {
  return (
    <section className="py-32 px-6 border-t border-molted-border relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(245,183,64,0.07) 0%, transparent 60%)' }}
      />
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <RevealBlock>
          <p
            className="text-xs font-bold uppercase tracking-widest mb-6"
            style={{ color: IMAGO_AMBER }}
          >
            Begin the molt
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight leading-tight">
            Ready to reach Imago?
          </h2>
          <p className="mt-6 text-molted-muted text-lg leading-relaxed">
            Start with a single module. Build toward Outpost.
            Arrive at the final form.
          </p>
        </RevealBlock>

        <RevealBlock delay={200} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:hello@molted.ai"
            className="group inline-flex items-center gap-3 px-9 py-4 rounded-2xl font-bold text-lg transition-all duration-200 hover:-translate-y-px"
            style={{ background: IMAGO_GRADIENT, color: '#0a0a0f' }}
          >
            Begin the Transformation
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </RevealBlock>

        <RevealBlock delay={340} className="mt-10 flex items-center justify-center gap-6 text-sm">
          <Link
            to="/molted/outpost"
            className="text-molted-muted hover:text-molted-white transition-colors flex items-center gap-1.5"
          >
            Outpost <ChevronRight size={13} />
          </Link>
          <span className="text-molted-border">·</span>
          <Link
            to="/molted"
            className="text-molted-muted hover:text-molted-white transition-colors"
          >
            All modules
          </Link>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────── */
export default function MoltedImagoOS() {
  return (
    <MoltedLayout>
      <Hero />
      <TheMoltMetaphor />
      <ThreeStages />
      <WhatsDifferent />
      <Architecture />
      <MoltManifesto />
      <TransformCTA />
    </MoltedLayout>
  );
}
