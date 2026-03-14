import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, UploadCloud, Map, CheckSquare, Award, BookOpen, BarChart3, Layers, Zap } from 'lucide-react';
import MoltedLayout from './MoltedLayout';

const EMERALD = '#10B981';
const EMERALD_DIM = 'rgba(16,185,129,0.12)';
const EMERALD_BORDER = 'rgba(16,185,129,0.22)';
const EMERALD_GLOW = '0 0 40px rgba(16,185,129,0.15), 0 0 80px rgba(16,185,129,0.06)';

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
    <div ref={ref} className={`opacity-0 translate-y-8 transition-all duration-700 ease-out ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ── Hero ──────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.07) 0%, transparent 70%)' }}
        />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(232,160,32,0.04) 0%, transparent 70%)' }}
        />
      </div>

      <RevealBlock className="mb-8">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase"
          style={{ background: EMERALD_DIM, border: `1px solid ${EMERALD_BORDER}`, color: EMERALD }}
        >
          <Award size={12} />
          In Development · Early Access · Molt
        </div>
      </RevealBlock>

      <RevealBlock delay={100}>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight">
          <span style={{ color: EMERALD, textShadow: `0 0 40px rgba(16,185,129,0.4), 0 0 80px rgba(16,185,129,0.15)` }}>Mastery</span>
        </h1>
      </RevealBlock>

      <RevealBlock delay={200}>
        <p className="mt-8 text-2xl md:text-3xl font-black text-molted-white/80 tracking-tight max-w-2xl leading-snug">
          Every course rebuilt<br />
          <span className="text-molted-muted font-medium text-xl md:text-2xl">for the era of competency.</span>
        </p>
      </RevealBlock>

      <RevealBlock delay={300}>
        <p className="mt-6 text-molted-muted text-lg max-w-lg leading-relaxed">
          Mastery takes your existing course and rebuilds it as a competency-based
          learning experience — where students advance when they prove mastery,
          not when the semester ends.
        </p>
      </RevealBlock>

      <RevealBlock delay={400} className="mt-10 flex flex-col sm:flex-row items-center gap-4">
        <a
          href="mailto:hello@molted.ai"
          className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-molted-black transition-all duration-200 hover:-translate-y-px"
          style={{ background: EMERALD }}
        >
          Get Early Access
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </a>
        <Link
          to="/molted"
          className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-molted-border text-molted-muted hover:text-molted-white font-semibold transition-all duration-200"
        >
          See All Products <ChevronRight size={16} />
        </Link>
      </RevealBlock>

      <RevealBlock delay={500} className="mt-16">
        <div
          className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border"
          style={{ background: 'rgba(10,10,15,0.8)', borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <UploadCloud size={14} className="text-molted-muted" />
          <p className="text-molted-muted text-sm">
            Upload a syllabus. Get a mastery-based course.{' '}
            <span className="text-molted-white font-semibold">Built in minutes.</span>
          </p>
        </div>
      </RevealBlock>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-molted-subtle animate-pulse">
        <span className="text-xs tracking-widest uppercase">Explore</span>
        <div className="w-px h-8 bg-gradient-to-b from-molted-subtle to-transparent" />
      </div>
    </section>
  );
}

/* ── The Problem ───────────────────────────────────────────────────────── */
function TheProblem() {
  return (
    <section className="py-28 px-6 border-t border-molted-border">
      <div className="max-w-5xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">The broken model</p>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            You're teaching time.<br />
            <span style={{ color: EMERALD }}>Not mastery.</span>
          </h2>
        </RevealBlock>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              stat: '71%',
              headline: 'Passes. Moves forward.',
              detail: 'Missing 29% of the foundation. That gap compounds every week. By graduation, it\'s a canyon.',
            },
            {
              stat: '80%',
              headline: 'Already knows the unit.',
              detail: 'Sits through it anyway. Disengages. Wonders why they\'re paying for this. They\'re right to wonder.',
            },
            {
              stat: '0%',
              headline: 'Of grades tell employers what a student knows.',
              detail: 'A B+ in Biology means nothing. A portfolio proving mastery of 7 competencies means everything.',
            },
          ].map((item, i) => (
            <RevealBlock key={i} delay={i * 100}>
              <div className="rounded-2xl border border-molted-border bg-molted-elevated p-7">
                <p className="text-5xl font-black mb-3" style={{ color: EMERALD }}>{item.stat}</p>
                <p className="text-molted-white font-bold mb-3 leading-snug">{item.headline}</p>
                <p className="text-molted-muted text-sm leading-relaxed">{item.detail}</p>
              </div>
            </RevealBlock>
          ))}
        </div>

        <RevealBlock className="text-center">
          <p className="text-molted-white text-xl font-semibold max-w-2xl mx-auto leading-relaxed">
            Mastery doesn't improve the time-based model.{' '}
            <span style={{ color: EMERALD }}>It replaces it.</span>
          </p>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── The Transformation ────────────────────────────────────────────────── */
function TheTransformation() {
  return (
    <section className="py-28 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Before & after</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            Same course. Rebuilt from the ground up.
          </h2>
        </RevealBlock>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Before */}
          <RevealBlock>
            <div className="rounded-2xl border border-molted-border bg-molted-elevated p-7 h-full">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-red-500/60" />
                <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest">Before · Traditional Structure</p>
              </div>
              <p className="text-molted-white font-bold mb-4">BIO301 · Cell Biology</p>
              <div className="space-y-2">
                {[
                  'Week 1: Chapter 1 — Cell Structure',
                  'Week 2: Chapter 2 — Cell Membrane',
                  'Week 3: Chapter 3 — Mitosis',
                  'Week 4: Chapter 4 — Meiosis',
                  'Week 5: Chapter 5 — ATP Synthesis',
                  'Week 6: Chapter 6 — DNA Replication',
                  '…',
                  'Week 16: Final Exam',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-molted-border/50 last:border-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-molted-subtle flex-shrink-0" />
                    <p className="text-molted-muted text-sm">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 p-3 rounded-xl bg-red-500/8 border border-red-500/15">
                <p className="text-red-400 text-xs">Everyone moves at the same pace · Final grade = letter · Nobody knows what was actually learned</p>
              </div>
            </div>
          </RevealBlock>

          {/* After */}
          <RevealBlock delay={150}>
            <div className="rounded-2xl border p-7 h-full" style={{ borderColor: EMERALD_BORDER, background: `${EMERALD}06`, boxShadow: EMERALD_GLOW }}>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: EMERALD }} />
                <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: EMERALD }}>After · Mastery Structure</p>
              </div>
              <p className="text-molted-white font-bold mb-4">BIO301 · 7 Competencies Mapped</p>
              <div className="space-y-2.5">
                {[
                  { code: 'C1', label: 'Cell structure fundamentals', type: 'Foundation', color: EMERALD },
                  { code: 'C2', label: 'Mitosis mechanics', type: 'Builds on C1', color: EMERALD },
                  { code: 'C3', label: 'Meiosis & genetic variation', type: 'Builds on C2', color: EMERALD },
                  { code: 'C4', label: 'ATP synthesis pathway', type: 'Parallel to C2', color: '#E8A020' },
                  { code: 'C5', label: 'DNA replication', type: 'Builds on C3+C4', color: EMERALD },
                  { code: 'C6', label: 'Protein synthesis', type: 'Builds on C5', color: EMERALD },
                  { code: 'C7', label: 'Cell regulation & cancer', type: 'Capstone', color: '#E8170F' },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-molted-surface border border-molted-border">
                    <span className="text-xs font-bold w-6 flex-shrink-0" style={{ color: c.color }}>{c.code}</span>
                    <p className="text-molted-white text-sm flex-1">{c.label}</p>
                    <span className="text-molted-muted text-xs flex-shrink-0">{c.type}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 p-3 rounded-xl" style={{ background: EMERALD_DIM, border: `1px solid ${EMERALD_BORDER}` }}>
                <p className="text-xs" style={{ color: EMERALD }}>Students advance when they prove mastery · No artificial end date · Portfolio proves what was learned</p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </div>
    </section>
  );
}

/* ── How It Works ──────────────────────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    {
      num: '01',
      icon: UploadCloud,
      title: 'Upload your existing course.',
      desc: 'Syllabus, readings, assignments, learning objectives — everything you already have. Mastery reads it all.',
    },
    {
      num: '02',
      icon: Map,
      title: 'Mastery maps your competencies.',
      desc: 'Extracts implied competencies from your objectives. Identifies prerequisite relationships. Surfaces gaps in the existing structure.',
    },
    {
      num: '03',
      icon: CheckSquare,
      title: 'Your course is rebuilt.',
      desc: 'New competency-based structure with mastery milestones, linked learning activities, and ProofAi-ready assessments.',
    },
  ];

  return (
    <section className="py-28 px-6 border-t border-molted-border">
      <div className="max-w-5xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Three steps</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            From syllabus to mastery framework.<br />
            <span style={{ color: EMERALD }}>In under 10 minutes.</span>
          </h2>
        </RevealBlock>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <RevealBlock key={i} delay={i * 120}>
                <div className="relative">
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-7 left-full w-full h-px"
                      style={{ background: `linear-gradient(90deg, ${EMERALD_BORDER}, transparent)` }}
                    />
                  )}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: EMERALD_DIM, border: `1px solid ${EMERALD_BORDER}` }}
                  >
                    <Icon size={22} style={{ color: EMERALD }} />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: EMERALD }}>Step {step.num}</p>
                  <h3 className="text-xl font-black text-molted-white mb-3">{step.title}</h3>
                  <p className="text-molted-muted text-sm leading-relaxed">{step.desc}</p>
                </div>
              </RevealBlock>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── What Mastery Generates ──────────────────────────────────────────── */
function WhatItGenerates() {
  const outputs = [
    { icon: Layers, label: 'Competency Framework', desc: '6–12 competencies extracted and organized from your existing objectives' },
    { icon: Map, label: 'Prerequisite Map', desc: 'What must be known before what — visualized as a learning dependency graph' },
    { icon: CheckSquare, label: 'Mastery Criteria', desc: 'Clear, observable definitions of what "mastered" looks like for each competency' },
    { icon: BookOpen, label: 'ProofAi Assessments', desc: 'Conversational assessments per competency, ready to deploy — no essay required' },
    { icon: BarChart3, label: 'Faculty Dashboard Template', desc: 'Track competency attainment across the class in real time' },
    { icon: Award, label: 'Student Portfolio Template', desc: 'Longitudinal record of proven competencies — shareable with employers' },
    { icon: Zap, label: 'PathwayAi Integration', desc: 'Each competency becomes a node in PathwayAi\'s adaptive learning engine' },
    { icon: BarChart3, label: 'OutcomesAi Feed', desc: 'Competency attainment data flows directly to institutional analytics' },
  ];

  return (
    <section className="py-28 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Outputs</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            Everything your course needs.<br />
            <span style={{ color: EMERALD }}>Generated. Not manually built.</span>
          </h2>
        </RevealBlock>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {outputs.map((o, i) => {
            const Icon = o.icon;
            return (
              <RevealBlock key={i} delay={i * 60}>
                <div
                  className="rounded-2xl border p-5 h-full transition-all duration-300 hover:-translate-y-1"
                  style={{ background: 'rgba(17,17,24,0.6)', borderColor: 'rgba(255,255,255,0.06)' }}
                >
                  <Icon size={18} className="mb-3" style={{ color: EMERALD }} />
                  <p className="text-molted-white text-sm font-semibold mb-1.5 leading-snug">{o.label}</p>
                  <p className="text-molted-muted text-xs leading-relaxed">{o.desc}</p>
                </div>
              </RevealBlock>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── CBE Stats / Why It Matters ────────────────────────────────────────── */
function WhyCBE() {
  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-5xl mx-auto">
        <RevealBlock className="text-center mb-12">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Why competency-based education</p>
          <h2 className="text-3xl md:text-5xl font-black text-molted-white tracking-tight">
            The world is catching up.
          </h2>
        </RevealBlock>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              headline: 'Accreditation bodies are requiring it.',
              body: 'SACSCOC, HLC, and WASC increasingly require evidence of learning outcomes — not just course completion. CBE provides that evidence by design.',
            },
            {
              headline: 'Employers trust portfolios over GPAs.',
              body: 'A portfolio proving mastery of 7 specific competencies tells an employer exactly what a graduate can do. A transcript tells them almost nothing.',
            },
            {
              headline: 'Federal aid is moving toward CBE.',
              body: 'The Department of Education has expanded financial aid eligibility for competency-based programs. Early movers have a structural advantage.',
            },
            {
              headline: 'Students who demonstrate mastery perform better.',
              body: 'CBE graduates show higher job performance and faster advancement because they were held to mastery, not grades.',
            },
          ].map((item, i) => (
            <RevealBlock key={i} delay={i * 80}>
              <div className="p-6 rounded-2xl border border-molted-border bg-molted-elevated">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: EMERALD }} />
                  <div>
                    <p className="text-molted-white font-bold mb-2">{item.headline}</p>
                    <p className="text-molted-muted text-sm leading-relaxed">{item.body}</p>
                  </div>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Integration Map ───────────────────────────────────────────────────── */
function Integrations() {
  const connections = [
    { name: 'ProofAi', color: '#F97316', desc: 'Mastery assessments for every competency' },
    { name: 'PathwayAi', color: '#8B5CF6', desc: 'Competencies become adaptive path nodes' },
    { name: 'Forge', color: '#2DD4BF', desc: 'Faculty dashboard tracks competency progress' },
    { name: 'OutcomesAi', color: '#0EA5E9', desc: 'Attainment data feeds institutional analytics' },
  ];

  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-4xl mx-auto text-center">
        <RevealBlock className="mb-10">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Built to connect</p>
          <h2 className="text-3xl md:text-4xl font-black text-molted-white tracking-tight">
            Mastery is the foundation.<br />Everything else builds on it.
          </h2>
        </RevealBlock>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {connections.map((c, i) => (
            <RevealBlock key={i} delay={i * 80}>
              <div className="p-5 rounded-2xl border border-molted-border bg-molted-elevated text-left">
                <div className="w-2 h-2 rounded-full mb-3" style={{ background: c.color }} />
                <p className="text-molted-white text-sm font-bold mb-1.5">{c.name}</p>
                <p className="text-molted-muted text-xs leading-relaxed">{c.desc}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Pricing ───────────────────────────────────────────────────────────── */
function Pricing() {
  const tiers = [
    {
      name: 'Faculty',
      price: '$49',
      period: '/mo per instructor',
      desc: 'For individual faculty redesigning their own courses.',
      features: ['Up to 5 courses', 'Competency extraction & mapping', 'Mastery criteria generation', 'ProofAi-ready assessments', 'Student portfolio template'],
      highlight: false,
      cta: 'Get Early Access',
    },
    {
      name: 'Department',
      price: '$399',
      period: '/mo per department',
      desc: 'For departments transitioning to competency-based delivery.',
      features: ['Unlimited courses', 'Everything in Faculty', 'PathwayAi integration', 'Faculty analytics dashboard', 'Priority support'],
      highlight: true,
      cta: 'Request Demo',
    },
    {
      name: 'Institution',
      price: 'Custom',
      period: 'institutional license',
      desc: 'For full institutional CBE transformation.',
      features: ['Unlimited courses', 'Full Molt suite integration', 'Outcomes data feed', 'Accreditation documentation auto-generated', 'Dedicated success team'],
      highlight: false,
      cta: 'Talk to Sales',
    },
  ];

  return (
    <section className="py-28 px-6 border-t border-molted-border">
      <div className="max-w-6xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white tracking-tight">
            Every level of transformation.
          </h2>
        </RevealBlock>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <RevealBlock key={i} delay={i * 100}>
              <div
                className="rounded-2xl border p-7 h-full flex flex-col transition-all duration-300"
                style={{
                  background: tier.highlight ? `${EMERALD}08` : 'rgba(17,17,24,0.6)',
                  borderColor: tier.highlight ? EMERALD_BORDER : 'rgba(255,255,255,0.06)',
                  boxShadow: tier.highlight ? EMERALD_GLOW : 'none',
                }}
              >
                <div className="mb-6">
                  <p className="text-molted-muted text-sm font-semibold mb-1">{tier.name}</p>
                  <p className="text-4xl font-black text-molted-white">{tier.price}</p>
                  <p className="text-molted-muted text-sm">{tier.period}</p>
                  <p className="mt-3 text-molted-muted/80 text-sm leading-relaxed">{tier.desc}</p>
                </div>
                <ul className="space-y-2.5 flex-1 mb-7">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-sm text-molted-muted">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: EMERALD }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="mailto:hello@molted.ai"
                  className="block text-center px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-px"
                  style={{
                    background: tier.highlight ? EMERALD : 'rgba(255,255,255,0.06)',
                    color: tier.highlight ? '#000000' : '#F5F5F7',
                    border: tier.highlight ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  }}
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
    <section className="py-32 px-6 border-t border-molted-border relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(16,185,129,0.05) 0%, transparent 60%)' }}
      />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <RevealBlock>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            The semester is an artifact.<br />
            <span style={{ color: EMERALD }}>Mastery is the goal.</span>
          </h2>
          <p className="mt-6 text-molted-muted text-lg leading-relaxed">
            Mastery is accepting early access partners.<br />
            Help us build the standard for competency-based education.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:hello@molted.ai"
              className="group flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:-translate-y-px text-molted-black"
              style={{ background: EMERALD }}
            >
              Get Early Access
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              to="/molted"
              className="px-8 py-4 rounded-xl border border-molted-border text-molted-muted hover:text-molted-white hover:border-molted-subtle font-semibold transition-all"
            >
              See All Products
            </Link>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────── */
export default function MoltedMastery() {
  return (
    <MoltedLayout>
      <Hero />
      <TheProblem />
      <TheTransformation />
      <HowItWorks />
      <WhatItGenerates />
      <WhyCBE />
      <Integrations />
      <Pricing />
      <CTA />
    </MoltedLayout>
  );
}
