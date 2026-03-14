import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lightbulb, Target, Heart } from 'lucide-react';
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

function Hero() {
  return (
    <section className="relative pt-40 pb-24 px-6 text-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px]"
          style={{ background: 'radial-gradient(ellipse at center, rgba(123,97,255,0.08) 0%, transparent 70%)' }}
        />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-molted-border bg-molted-elevated text-molted-muted text-xs font-semibold mb-8 animate-fade-in">
          Molt · About
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-molted-white tracking-tight leading-tight animate-reveal">
          We didn't build<br />
          <span
            style={{
              background: 'linear-gradient(120deg, #F5B740 0%, #E8A020 55%, #E8170F 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            tools for schools.
          </span>
        </h1>
        <p className="mt-6 text-xl text-molted-muted leading-relaxed max-w-2xl mx-auto animate-reveal" style={{ animationDelay: '150ms' }}>
          We built schools that never sleep.
        </p>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-3xl mx-auto">
        <RevealBlock>
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-8">The story</p>
        </RevealBlock>

        <div className="space-y-8">
          {[
            {
              text: 'Molt started with a simple observation: the best human moments in education — a patient teacher, a caring chaplain, a knowledgeable nurse — are impossibly scarce. And the students who need them most are usually the ones who have the least access.',
            },
            {
              text: 'The name is intentional. Molting is transformation through shedding — a snake sheds to grow, a lobster sheds to rebuild. We believe education is overdue for a molt. The old model — lectures at fixed times, one teacher per thirty students, content locked in textbooks — needs to shed.',
            },
            {
              text: 'We proved the concept at a flagship university: six custom AI personas, each trained on a college\'s identity, deployed to serve students across nursing, education, theology, business, law, and STEM. Over 50,000 students. Zero caveats.',
            },
            {
              text: 'From that work, three products emerged: Read — for any student who needs answers right now. Teach — for faculty drowning in admin. Beacon — for institutions that want their values and expertise present everywhere, always.',
            },
          ].map((p, i) => (
            <RevealBlock key={i} delay={i * 100}>
              <p className="text-molted-muted text-lg leading-relaxed">{p.text}</p>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

function Values() {
  const values = [
    {
      icon: Lightbulb,
      title: 'Clarity over cleverness',
      body: 'The technology should disappear. What remains is a student who understands, a patient who feels heard, a professional who is prepared.',
      color: 'text-molted-violet',
      bg: 'bg-molted-violet/10 border-molted-violet/20',
    },
    {
      icon: Heart,
      title: 'Human at the center',
      body: 'We build AI that makes human relationships richer — not ones that replace them. The Spirit is present so the human can be freed.',
      color: 'text-rose-400',
      bg: 'bg-rose-400/10 border-rose-400/20',
    },
    {
      icon: Target,
      title: 'Ruthless focus',
      body: 'Three products. Not thirty. We build fewer things better. Depth over breadth, always.',
      color: 'text-molted-ember',
      bg: 'bg-molted-ember/10 border-molted-ember/20',
    },
  ];

  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">What we believe</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            Principles, not policies.
          </h2>
        </RevealBlock>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <RevealBlock key={i} delay={i * 120}>
              <div className="bg-molted-elevated border border-molted-border rounded-2xl p-8">
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-6 ${v.bg}`}>
                  <v.icon size={20} className={v.color} />
                </div>
                <h3 className="text-molted-white font-bold text-xl mb-3">{v.title}</h3>
                <p className="text-molted-muted leading-relaxed">{v.body}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatusNote() {
  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-3xl mx-auto">
        <RevealBlock>
          <div className="bg-molted-elevated border border-molted-border rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">🏛️</span>
              </div>
              <div>
                <h3 className="text-molted-white font-bold text-lg mb-3">Company Status</h3>
                <p className="text-molted-muted leading-relaxed mb-4">
                  Molt is an active company. Products are live and deployed at a flagship university partner
                  serving 50,000+ students. We are currently accepting founding institutional partners.
                </p>
                <div className="space-y-2">
                  {[
                    { label: 'Company formation', status: '✓ Active', color: 'text-emerald-400' },
                    { label: 'Product development', status: '✓ Live', color: 'text-emerald-400' },
                    { label: 'Flagship university deployment', status: '✓ 50,000+ students', color: 'text-emerald-400' },
                    { label: 'Founding institutional partners', status: '⏳ 12 spots open', color: 'text-amber-400' },
                    { label: 'General availability', status: '→ 2025', color: 'text-molted-muted' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-molted-border last:border-0">
                      <span className="text-molted-muted text-sm">{item.label}</span>
                      <span className={`text-xs font-semibold ${item.color}`}>{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="py-32 px-6 border-t border-molted-border">
      <div className="max-w-3xl mx-auto text-center">
        <RevealBlock>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            Let's build<br />
            <span className="text-molted-violet">something together.</span>
          </h2>
          <p className="mt-6 text-molted-muted text-lg">
            Whether you're an institution curious about AI, an investor aligned with our mission,
            or someone who wants to join the team — we want to hear from you.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:hello@molted.ai"
              className="group flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-molted-violet to-molted-ember text-white font-bold text-lg transition-all hover:-translate-y-px"
            >
              hello@molted.ai
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

export default function MoltedAbout() {
  return (
    <MoltedLayout>
      <Hero />
      <Story />
      <Values />
      <StatusNote />
      <Contact />
    </MoltedLayout>
  );
}
