import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, TrendingUp, Database, Users, Shield, Zap, Globe, Lock, BarChart3, Bot } from 'lucide-react';
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

/* ── Hero ──────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden pt-24">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.07) 0%, transparent 65%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(37,99,235,0.04) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <RevealBlock className="mb-6">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border"
            style={{ background: 'rgba(139,92,246,0.08)', borderColor: 'rgba(139,92,246,0.25)', color: '#8B5CF6' }}
          >
            <Lock size={10} /> Strategic Opportunity
          </span>
        </RevealBlock>

        <RevealBlock delay={80}>
          <h1 className="text-5xl md:text-7xl font-black text-molted-white leading-[1.02] tracking-tight">
            The infrastructure layer
          </h1>
          <h1 className="text-5xl md:text-7xl font-black leading-[1.02] tracking-tight mt-1"
            style={{
              background: 'linear-gradient(120deg, #8B5CF6 0%, #2563EB 60%, #64748B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            education is missing.
          </h1>
        </RevealBlock>

        <RevealBlock delay={200}>
          <p className="mt-8 text-lg md:text-xl text-molted-muted max-w-2xl mx-auto leading-relaxed">
            MoltED is not an edtech app. It is the agentic operating system for learning — the platform that sits between every institution and every student, making both smarter with every interaction. We are raising to accelerate what is already working.
          </p>
        </RevealBlock>

        <RevealBlock delay={320} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:hello@molted.ai?subject=Investor Inquiry"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base transition-all duration-200 hover:-translate-y-px"
            style={{ background: 'linear-gradient(120deg, #8B5CF6, #2563EB)', color: '#0a0a0f' }}
          >
            Request Materials
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base text-molted-muted hover:text-molted-white border border-molted-border hover:border-molted-subtle transition-all"
          >
            See the Platform
          </Link>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── The Market ────────────────────────────────────────────────────────── */
function TheMarket() {
  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-5xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">The opportunity</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white leading-tight tracking-tight">
            A $300B industry running on<br />
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>2008 infrastructure.</span>
          </h2>
          <p className="mt-8 text-molted-muted text-lg leading-relaxed max-w-2xl mx-auto">
            Canvas was built before the iPhone 3G. Blackboard before the iPad. The global LMS market is $25B and growing — but every incumbent is a content or workflow tool. Nobody has built the intelligence layer. Until now.
          </p>
        </RevealBlock>

        <div className="grid md:grid-cols-3 gap-5">
          {[
            { value: '$25B', label: 'Global LMS market', sub: 'Growing at 19% CAGR' },
            { value: '1.5B', label: 'Learners worldwide', sub: 'Higher ed, workforce, healthcare' },
            { value: '$0', label: 'Agentic LMS revenue', sub: 'Category does not exist yet — we are building it' },
          ].map((s, i) => (
            <RevealBlock key={i} delay={i * 80}>
              <div
                className="rounded-2xl border p-8 text-center"
                style={{ background: 'rgba(17,17,24,0.7)', borderColor: 'rgba(139,92,246,0.15)' }}
              >
                <p
                  className="text-5xl font-black leading-none mb-3"
                  style={{
                    background: 'linear-gradient(120deg, #8B5CF6, #2563EB)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {s.value}
                </p>
                <p className="text-molted-white font-bold text-sm mb-1">{s.label}</p>
                <p className="text-molted-subtle text-xs leading-relaxed">{s.sub}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── The Moat ──────────────────────────────────────────────────────────── */
function TheMoat() {
  return (
    <section className="py-24 px-6 border-t border-molted-border relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 60% 40%, rgba(37,99,235,0.04) 0%, transparent 65%)' }} />
      <div className="max-w-5xl mx-auto relative z-10">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Why this is defensible</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white leading-tight tracking-tight">
            Three moats. Each one compounds.
          </h2>
        </RevealBlock>

        <div className="space-y-5">
          {[
            {
              icon: Database,
              color: '#2563EB',
              title: 'The data flywheel',
              body: 'Every discussion reply, every reading session, every early-warning flag trains the platform on how that institution\'s students learn. An institution running Molt for two years has a model trained on their students, their courses, their outcomes. That data cannot be replicated. A new entrant starts from zero. Molt compounds.',
              tag: 'Data moat',
            },
            {
              icon: Users,
              color: '#64748B',
              title: 'The faculty relationship',
              body: "Forge doesn't just serve faculty — it learns them. Their background, their teaching style, their hobbies, their voice. A professor who has spent a semester training Forge has built something deeply personal. Switching cost is not a contract term. It's an identity. That relationship is the stickiest asset in edtech.",
              tag: 'Relationship moat',
            },
            {
              icon: Globe,
              color: '#8B5CF6',
              title: 'The network effect',
              body: "As more institutions deploy Molt, the platform's understanding of how different student populations learn improves for every institution on the network. Community college students, research university students, nursing students, MBA students — cross-institutional signal benefits every node. The value of being on Molt increases as Molt grows.",
              tag: 'Network moat',
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <RevealBlock key={i} delay={i * 100}>
                <div
                  className="rounded-2xl border p-8 flex flex-col md:flex-row gap-6"
                  style={{ background: 'rgba(17,17,24,0.7)', borderColor: `${item.color}20` }}
                >
                  <div className="flex-shrink-0 flex flex-col items-center md:items-start gap-3">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ background: `${item.color}15` }}
                    >
                      <Icon size={20} style={{ color: item.color }} />
                    </div>
                    <span
                      className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                      style={{ background: `${item.color}12`, color: item.color }}
                    >
                      {item.tag}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-molted-white font-black text-xl mb-3">{item.title}</h3>
                    <p className="text-molted-muted text-sm leading-relaxed">{item.body}</p>
                  </div>
                </div>
              </RevealBlock>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Standalone vs Strategic ───────────────────────────────────────────── */
function TwoScenarios() {
  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-5xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">The paths</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white leading-tight tracking-tight">
            Two ways Molt wins.<br />
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>Both are large.</span>
          </h2>
        </RevealBlock>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Standalone */}
          <RevealBlock delay={0}>
            <div
              className="rounded-2xl border p-8 h-full flex flex-col"
              style={{ background: 'rgba(17,17,24,0.7)', borderColor: 'rgba(37,99,235,0.2)' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(37,99,235,0.12)' }}>
                  <TrendingUp size={18} style={{ color: '#2563EB' }} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#2563EB' }}>Path A</p>
                  <p className="text-molted-white font-black text-lg leading-tight">Standalone platform</p>
                </div>
              </div>
              <p className="text-molted-muted text-sm leading-relaxed mb-6 flex-1">
                Molt scales independently — the agentic LMS category it creates becomes a $5B+ company. Every institution on Canvas, Blackboard, or D2L is a prospect. The platform grows module by module across Outpost's eight tools. Each new institution feeds the data flywheel. The moat deepens every quarter.
              </p>
              <div className="space-y-2.5">
                {[
                  '50,000 users today. Path to 5M+',
                  'Land with Forge or Lumen. Expand to full Outpost',
                  'Enterprise pricing unlocks with Beacon deployments',
                  'Healthcare and workforce training are adjacent markets',
                ].map((p, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-molted-muted">
                    <div className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0" style={{ background: '#2563EB' }} />
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>

          {/* Strategic */}
          <RevealBlock delay={120}>
            <div
              className="rounded-2xl border p-8 h-full flex flex-col"
              style={{ background: 'rgba(17,17,24,0.7)', borderColor: 'rgba(139,92,246,0.2)' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(139,92,246,0.12)' }}>
                  <Zap size={18} style={{ color: '#8B5CF6' }} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#8B5CF6' }}>Path B</p>
                  <p className="text-molted-white font-black text-lg leading-tight">Strategic acquisition</p>
                </div>
              </div>
              <p className="text-molted-muted text-sm leading-relaxed mb-6 flex-1">
                MoltED is the intelligence layer that Cengage, Pearson, Instructure, or Anthology cannot build fast enough. They own distribution, institutional relationships, and content libraries. Molt owns the agentic infrastructure, the faculty voice data, and the student relationship layer. The combination is the category-defining platform in global education.
              </p>
              <div className="space-y-2.5">
                {[
                  'Cengage / Pearson: content + intelligence = personalized at scale',
                  'Instructure (Canvas): LMS distribution + agentic layer = defensible',
                  'Anthology (Blackboard): 3,000 institutions + Molt = instant category shift',
                  'Private equity: roll-up play across all verticals',
                ].map((p, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-molted-muted">
                    <div className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0" style={{ background: '#8B5CF6' }} />
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>

        {/* Hansen response */}
        <RevealBlock delay={200} className="mt-8">
          <div
            className="rounded-2xl border p-8"
            style={{ background: 'rgba(139,92,246,0.04)', borderColor: 'rgba(139,92,246,0.15)' }}
          >
            <p className="text-molted-subtle text-xs uppercase tracking-widest mb-4 font-semibold">The question the market is asking</p>
            <p className="text-molted-white text-lg font-semibold leading-snug italic mb-3">
              "Would I buy Molt? The honest answer is — I'd want to before someone else does. The faculty voice piece is the thing that changes the conversation. Nobody has cracked the instructor side."
            </p>
            <p className="text-molted-subtle text-xs">— Michael Hansen, CEO, Cengage</p>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Traction ──────────────────────────────────────────────────────────── */
function Traction() {
  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-5xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Live. Not projected.</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white leading-tight tracking-tight">
            Already in market.
          </h2>
        </RevealBlock>

        <div className="grid md:grid-cols-4 gap-5 mb-10">
          {[
            { value: '50,000+', label: 'Active users', color: '#2563EB' },
            { value: '6', label: 'AI personas deployed', color: '#64748B' },
            { value: '3', label: 'Core products live', color: '#8B5CF6' },
            { value: '24/7', label: 'Agents running', color: '#1E3A8A' },
          ].map((s, i) => (
            <RevealBlock key={i} delay={i * 70}>
              <div
                className="rounded-2xl border p-6 text-center"
                style={{ background: 'rgba(17,17,24,0.7)', borderColor: `${s.color}18` }}
              >
                <p
                  className="text-4xl font-black leading-none mb-2"
                  style={{ color: s.color }}
                >
                  {s.value}
                </p>
                <p className="text-molted-muted text-xs leading-snug">{s.label}</p>
              </div>
            </RevealBlock>
          ))}
        </div>

        <RevealBlock delay={200}>
          <div
            className="rounded-2xl border p-8 md:p-10"
            style={{ background: 'rgba(17,17,24,0.6)', borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                { icon: BarChart3, label: 'Deployed at a top-25 US university', color: '#2563EB' },
                { icon: Bot, label: 'Agents active across 8 course types', color: '#64748B' },
                { icon: Shield, label: 'Zero data incidents. FERPA-aligned architecture', color: '#8B5CF6' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex flex-col items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${item.color}12` }}
                    >
                      <Icon size={18} style={{ color: item.color }} />
                    </div>
                    <p className="text-molted-muted text-sm leading-snug">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Use of Funds ──────────────────────────────────────────────────────── */
function UseOfFunds() {
  return (
    <section className="py-24 px-6 border-t border-molted-border">
      <div className="max-w-4xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <p className="text-molted-muted text-sm font-semibold uppercase tracking-widest mb-4">Capital plan</p>
          <h2 className="text-4xl md:text-5xl font-black text-molted-white leading-tight tracking-tight">
            Built to scale. Not to exist.
          </h2>
          <p className="mt-6 text-molted-muted text-lg leading-relaxed max-w-xl mx-auto">
            We are raising to do three things: deepen the data flywheel, expand the faculty voice infrastructure, and reach the under-resourced institutions that need this most.
          </p>
        </RevealBlock>

        <div className="space-y-4">
          {[
            { pct: '40%', label: 'Platform & infrastructure', detail: 'Outpost expansion — Pathway, Retain, Mastery modules. Data flywheel architecture. Faculty voice at scale.', color: '#2563EB' },
            { pct: '30%', label: 'Institution growth', detail: 'Founding partner expansion. Sales infrastructure for higher ed, healthcare, and enterprise verticals.', color: '#8B5CF6' },
            { pct: '20%', label: 'Faculty voice & research', detail: "Solving Hansen's challenge: faculty relationship at scale. Voice onboarding, approval workflows, personal AI model training.", color: '#64748B' },
            { pct: '10%', label: 'Access initiative', detail: 'Subsidized deployment for community colleges and under-resourced institutions. This is the long game.', color: '#1E3A8A' },
          ].map((item, i) => (
            <RevealBlock key={i} delay={i * 80}>
              <div
                className="rounded-xl border p-6 flex flex-col md:flex-row items-start md:items-center gap-4"
                style={{ background: 'rgba(17,17,24,0.6)', borderColor: `${item.color}18` }}
              >
                <p
                  className="text-3xl font-black flex-shrink-0 w-16"
                  style={{ color: item.color }}
                >
                  {item.pct}
                </p>
                <div>
                  <p className="text-molted-white font-bold text-sm mb-1">{item.label}</p>
                  <p className="text-molted-muted text-xs leading-relaxed">{item.detail}</p>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA ────────────────────────────────────────────────────────────────── */
function CTA() {
  return (
    <section className="py-32 px-6 border-t border-molted-border">
      <div className="max-w-3xl mx-auto text-center">
        <RevealBlock>
          <h2 className="text-4xl md:text-6xl font-black text-molted-white tracking-tight leading-tight">
            The conversation<br />starts here.
          </h2>
          <p className="mt-6 text-molted-muted text-lg leading-relaxed max-w-xl mx-auto">
            We share a full data room with qualified investors and strategic partners. The conversation takes 30 minutes.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:hello@molted.ai?subject=Investor Inquiry"
              className="group flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:-translate-y-px"
              style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #2563EB 100%)', color: '#0A0A0F' }}
            >
              Request Data Room
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              to="/"
              className="px-8 py-4 rounded-xl border border-molted-border text-molted-muted hover:text-molted-white hover:border-molted-subtle font-semibold transition-all"
            >
              See the platform <ChevronRight size={14} className="inline" />
            </Link>
          </div>
          <p className="mt-8 text-molted-subtle text-xs">
            This page is for qualified investors and strategic partners only. Nothing on this page constitutes an offer to sell or solicitation to buy securities.
          </p>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────── */
export default function MoltedInvestors() {
  return (
    <MoltedLayout>
      <Hero />
      <TheMarket />
      <TheMoat />
      <TwoScenarios />
      <Traction />
      <UseOfFunds />
      <CTA />
    </MoltedLayout>
  );
}
