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

/* ── CampusOS accent tokens ─────────────────────────────────────────────── */
const CAMPUS_GOLD = '#E8A020';
const CAMPUS_TEAL = '#2DD4BF';
const CAMPUS_VIOLET = '#8B5CF6';
const CAMPUS_GRADIENT =
  'linear-gradient(135deg, #E8A020 0%, #2DD4BF 50%, #8B5CF6 100%)';

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

/* ── Hero ──────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-10%] left-[15%] w-[700px] h-[700px] rounded-full"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(232,160,32,0.07) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-[0%] right-[5%] w-[600px] h-[600px] rounded-full"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(45,212,191,0.07) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-[25%] right-[-5%] w-[500px] h-[500px] rounded-full"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(139,92,246,0.07) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Wordmark */}
      <RevealBlock delay={100}>
        <h1 className="text-7xl md:text-9xl font-black leading-none tracking-tight">
          <span className="text-molted-white">Campus</span>
          <span
            style={{
              background: CAMPUS_GRADIENT,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            OS
          </span>
        </h1>
      </RevealBlock>

      {/* Tagline */}
      <RevealBlock delay={250}>
        <p className="mt-8 text-lg md:text-xl text-molted-muted tracking-wide font-medium">
          The AI-native learning management system.
        </p>
      </RevealBlock>

      {/* Subtext */}
      <RevealBlock delay={380}>
        <p className="mt-3 text-sm text-molted-subtle tracking-wide max-w-xs mx-auto">
          Everything else MoltED builds is a feature of this.
        </p>
      </RevealBlock>

      {/* CTA */}
      <RevealBlock delay={520} className="mt-12">
        <a
          href="mailto:hello@molted.ai"
          className="group inline-flex items-center gap-3 px-9 py-4 rounded-2xl font-bold text-lg transition-all duration-200 hover:-translate-y-px hover:shadow-2xl"
          style={{
            background: CAMPUS_GRADIENT,
            color: '#0a0a0f',
          }}
        >
          Join the Waitlist
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </RevealBlock>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-molted-subtle animate-pulse">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-molted-subtle to-transparent" />
      </div>
    </section>
  );
}

/* ── The Infrastructure Problem ─────────────────────────────────────────── */
function InfrastructureProblem() {
  return (
    <section className="py-32 px-6 border-t border-molted-border">
      <div className="max-w-4xl mx-auto">
        <RevealBlock>
          <h2 className="text-5xl md:text-7xl font-black text-molted-white tracking-tight leading-tight">
            Canvas was built in 2008.
          </h2>
        </RevealBlock>

        <RevealBlock delay={140}>
          <p className="mt-8 text-xl text-molted-muted leading-relaxed max-w-3xl">
            Before the iPhone was a year old. Before cloud computing was ubiquitous. Before AI
            existed. Before a single current student was in high school.
          </p>
        </RevealBlock>

        <RevealBlock delay={280} className="my-16">
          <p
            className="text-3xl md:text-4xl font-black leading-snug"
            style={{
              background: CAMPUS_GRADIENT,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            "The LMS is not a feature problem.
            <br />
            It's an architecture problem."
          </p>
        </RevealBlock>

        <div className="space-y-8">
          <RevealBlock delay={80}>
            <p className="text-molted-white/80 text-lg leading-relaxed">
              You can't bolt AI onto a system that was never designed for it. Canvas, Blackboard,
              D2L — they were built on the assumption that courses are fixed, semesters are real,
              and grades are the unit of truth. None of those assumptions are still valid.
            </p>
          </RevealBlock>

          <RevealBlock delay={180}>
            <p className="text-molted-white/80 text-lg leading-relaxed">
              Every EdTech company is building plugins for broken infrastructure. Better
              gradebooks. Smarter calendars. AI-assisted syllabi. But the foundation is wrong,
              and you can't fix a wrong foundation by painting the walls.
            </p>
          </RevealBlock>

          <RevealBlock delay={280}>
            <p className="text-molted-white text-lg font-semibold leading-relaxed">
              CampusOS starts from scratch. Built for the world that exists now.
            </p>
          </RevealBlock>
        </div>
      </div>
    </section>
  );
}

/* ── What CampusOS Removes ──────────────────────────────────────────────── */
function WhatCampusOSRemoves() {
  const oldAssumptions = [
    'Fixed semester calendar',
    'Same course for every student',
    'Grade as unit of truth',
    'Courses are self-contained islands',
    'Learning stops at graduation',
    'LMS is where learning happens',
  ];
  const newReality = [
    'Continuous learning, no artificial end dates',
    'Every path is personalized',
    'Mastery replaces grades',
    'Everything is connected',
    'Education is lifelong',
    'Learning happens everywhere CampusOS is',
  ];

  return (
    <section className="py-32 px-6 border-t border-molted-border">
      <div className="max-w-5xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">
            The replacement
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            What changes. Everything.
          </h2>
        </RevealBlock>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Old assumptions */}
          <RevealBlock>
            <div
              className="rounded-2xl p-8 border h-full"
              style={{
                background: 'rgba(232,23,15,0.04)',
                borderColor: 'rgba(232,23,15,0.10)',
              }}
            >
              <p
                className="text-sm font-bold uppercase tracking-widest mb-6"
                style={{ color: '#E8170F' }}
              >
                The Old Assumptions
              </p>
              <ul className="space-y-4">
                {oldAssumptions.map((item, i) => (
                  <li
                    key={i}
                    className="text-molted-muted text-base line-through decoration-molted-subtle decoration-1"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>

          {/* New reality */}
          <RevealBlock delay={150}>
            <div
              className="rounded-2xl p-8 border h-full"
              style={{
                background: 'rgba(45,212,191,0.04)',
                borderColor: 'rgba(45,212,191,0.15)',
              }}
            >
              <p
                className="text-sm font-bold uppercase tracking-widest mb-6"
                style={{ color: CAMPUS_TEAL }}
              >
                The New Reality
              </p>
              <ul className="space-y-4">
                {newReality.map((item, i) => (
                  <li key={i} className="text-molted-white text-base flex items-start gap-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ background: CAMPUS_TEAL }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>
        </div>
      </div>
    </section>
  );
}

/* ── Platform Architecture ──────────────────────────────────────────────── */
const PRODUCT_NODES: { name: string; color: string; desc: string }[] = [
  { name: 'pAIgeBreaker', color: '#3B82F6', desc: 'Student engagement' },
  { name: 'Persona Ai', color: '#EC4899', desc: 'Adaptive identity' },
  { name: 'TeachOS', color: '#F59E0B', desc: 'Faculty dashboard' },
  { name: 'PathwayAi', color: '#06B6D4', desc: 'Adaptive paths' },
  { name: 'ProofAi', color: '#F97316', desc: 'AI assessment' },
  { name: 'RetainAi', color: '#EF4444', desc: 'Student success' },
  { name: 'OutcomesAi', color: '#A78BFA', desc: 'Institutional outcomes' },
  { name: 'MasteryAi', color: '#10B981', desc: 'CBE redesign' },
];

function ProductNode({ node }: { node: (typeof PRODUCT_NODES)[0] }) {
  return (
    <div
      className="rounded-xl p-4 border text-center"
      style={{
        background: `rgba(${hexToRgb(node.color)}, 0.06)`,
        borderColor: `rgba(${hexToRgb(node.color)}, 0.22)`,
      }}
    >
      <div
        className="w-2 h-2 rounded-full mx-auto mb-2"
        style={{ background: node.color }}
      />
      <p className="text-molted-white text-xs font-bold leading-tight">{node.name}</p>
      <p className="text-molted-muted text-xs mt-0.5">{node.desc}</p>
    </div>
  );
}

function PlatformArchitecture() {
  return (
    <section className="py-32 px-6 border-t border-molted-border relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.04) 0%, transparent 60%)',
        }}
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">
            The platform
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            Everything feeds CampusOS.
          </h2>
        </RevealBlock>

        {/* Top row */}
        <RevealBlock delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {PRODUCT_NODES.slice(0, 4).map((node, i) => (
              <ProductNode key={i} node={node} />
            ))}
          </div>
        </RevealBlock>

        {/* Central CampusOS card */}
        <RevealBlock delay={220}>
          <div className="flex justify-center my-4">
            <div
              className="rounded-3xl p-10 text-center w-full max-w-sm border"
              style={{
                background: 'rgba(10,10,15,0.98)',
                borderColor: 'transparent',
                boxShadow: `0 0 0 1px rgba(232,160,32,0.45),
                             0 0 0 4px rgba(45,212,191,0.18),
                             0 0 0 8px rgba(139,92,246,0.10),
                             0 0 80px rgba(139,92,246,0.12)`,
              }}
            >
              <h3
                className="text-4xl font-black mb-2"
                style={{
                  background: CAMPUS_GRADIENT,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                CampusOS
              </h3>
              <p className="text-molted-muted text-sm">The AI-native LMS</p>
              <p className="mt-4 text-xs text-molted-subtle italic">
                The platform. Everything else is a feature.
              </p>
            </div>
          </div>
        </RevealBlock>

        {/* Bottom row */}
        <RevealBlock delay={340}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {PRODUCT_NODES.slice(4).map((node, i) => (
              <ProductNode key={i} node={node} />
            ))}
          </div>
        </RevealBlock>

        <RevealBlock delay={460} className="text-center mt-10">
          <p className="text-molted-muted text-sm italic tracking-wide">
            Not integrations. Not plugins.{' '}
            <span className="text-molted-white font-semibold">Features.</span>
          </p>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Three Principles ───────────────────────────────────────────────────── */
const PRINCIPLES: { heading: string; body: string; color: string }[] = [
  {
    heading: 'No courses.',
    body: "Learning is continuous. Students advance when they're ready, not when the calendar says so.",
    color: CAMPUS_GOLD,
  },
  {
    heading: 'No grades.',
    body: 'Mastery portfolios replace GPAs. Evidence of what you know, not points for what you submitted.',
    color: CAMPUS_TEAL,
  },
  {
    heading: 'No end.',
    body: 'CampusOS follows learners into careers, continuing education, and lifelong development.',
    color: CAMPUS_VIOLET,
  },
];

function ThreePrinciples() {
  return (
    <section className="py-32 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">
            First principles
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight">
            Three things CampusOS doesn't have.
          </h2>
        </RevealBlock>

        <div className="grid md:grid-cols-3 gap-6">
          {PRINCIPLES.map((p, i) => (
            <RevealBlock key={i} delay={i * 150}>
              <div
                className="rounded-2xl p-10 border h-full"
                style={{
                  background: 'rgba(17,17,24,0.6)',
                  borderColor: `rgba(${hexToRgb(p.color)}, 0.18)`,
                }}
              >
                <p
                  className="text-5xl md:text-6xl font-black mb-6 leading-none"
                  style={{ color: p.color }}
                >
                  {p.heading}
                </p>
                <p className="text-molted-muted text-base leading-relaxed">{p.body}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Vision Statement ───────────────────────────────────────────────────── */
function VisionStatement() {
  return (
    <section className="py-40 px-6 border-t border-molted-border">
      <div className="max-w-4xl mx-auto text-center">
        <RevealBlock>
          <p className="text-4xl md:text-6xl lg:text-7xl font-black text-molted-white tracking-tight leading-tight">
            In 10 years, every institution
            <br />
            that matters will run on an
            <br />
            AI-native LMS.
          </p>
        </RevealBlock>

        <RevealBlock delay={450}>
          <p
            className="mt-12 text-3xl md:text-4xl font-black leading-tight"
            style={{
              background: CAMPUS_GRADIENT,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Most of them will run on ours.
          </p>
        </RevealBlock>

        <RevealBlock delay={650}>
          <p className="mt-8 text-molted-muted text-sm tracking-widest font-medium">
            — MoltED Ai
          </p>
        </RevealBlock>

        <RevealBlock delay={800} className="mt-16">
          <Link
            to="/molted/imago-os"
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-2xl border hover:border-opacity-60 transition-all duration-300"
            style={{
              borderColor: 'rgba(245,183,64,0.25)',
              background: 'rgba(245,183,64,0.05)',
            }}
          >
            <div className="w-5 h-5 rounded-md flex-shrink-0" style={{ background: 'linear-gradient(135deg,#F5B740,#E8A020)', boxShadow: '0 0 10px rgba(245,183,64,0.3)' }} />
            <div className="text-left">
              <p
                className="text-sm font-black"
                style={{ background: 'linear-gradient(120deg,#F5B740,#E8A020)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              >
                ImagoOS — The final form
              </p>
              <p className="text-molted-subtle text-xs mt-0.5">CampusOS is the path. This is where it leads.</p>
            </div>
            <ChevronRight size={14} className="text-molted-subtle group-hover:translate-x-0.5 transition-transform ml-1" />
          </Link>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Waitlist CTA ───────────────────────────────────────────────────────── */
function WaitlistCTA() {
  return (
    <section className="py-32 px-6 border-t border-molted-border relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(139,92,246,0.07) 0%, transparent 60%)',
        }}
      />
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <RevealBlock>
          <p
            className="text-xs font-bold uppercase tracking-widest mb-6"
            style={{ color: CAMPUS_VIOLET }}
          >
            Private Development
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight leading-tight">
            CampusOS is in private development.
          </h2>
          <p className="mt-6 text-molted-muted text-lg leading-relaxed">
            Currently accepting{' '}
            <span className="text-molted-white font-semibold">
              12 founding institutional partners.
            </span>
          </p>
        </RevealBlock>

        <RevealBlock delay={200} className="mt-10">
          <a
            href="mailto:hello@molted.ai"
            className="group inline-flex items-center gap-3 px-9 py-4 rounded-2xl font-bold text-lg transition-all duration-200 hover:-translate-y-px"
            style={{ background: CAMPUS_GRADIENT, color: '#0a0a0f' }}
          >
            Join the Waitlist
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </RevealBlock>

        <RevealBlock delay={360} className="mt-12">
          <div
            className="rounded-2xl p-7 border text-left"
            style={{
              background: 'rgba(17,17,24,0.7)',
              borderColor: `rgba(${hexToRgb(CAMPUS_VIOLET)}, 0.2)`,
            }}
          >
            <p className="text-molted-muted text-xs font-bold uppercase tracking-widest mb-5">
              Founding partners receive
            </p>
            <ul className="space-y-4">
              {[
                'Perpetual pricing lock — locked forever at founding rate',
                "Co-development input — shape the platform's direction",
                '1-year head start — deploy before the market exists',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-molted-white/80">
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{ background: CAMPUS_VIOLET }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </RevealBlock>

        <RevealBlock delay={520} className="mt-10">
          <Link
            to="/molted"
            className="text-molted-muted hover:text-molted-white text-sm transition-colors"
          >
            See all MoltED products
          </Link>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────── */
export default function MoltedCampusOS() {
  return (
    <MoltedLayout>
      <Hero />
      <InfrastructureProblem />
      <WhatCampusOSRemoves />
      <PlatformArchitecture />
      <ThreePrinciples />
      <VisionStatement />
      <WaitlistCTA />
    </MoltedLayout>
  );
}
