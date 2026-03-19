import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, X, ChevronRight, Lock } from 'lucide-react';

/* ── GCU Brand ──────────────────────────────────────────────────────────── */
const GCU_PURPLE = '#522D80';
const GCU_WHITE   = '#FFFFFF';
const GCU_LIGHT_PURPLE = '#9B6FD4';

const TOTAL_SLIDES = 16;

/* ── Shared primitives ──────────────────────────────────────────────────── */
function Slide({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full flex items-center justify-center px-8 py-16">
      <div className="max-w-5xl w-full mx-auto">{children}</div>
    </div>
  );
}

function Eyebrow({ children, gold }: { children: React.ReactNode; gold?: boolean }) {
  return (
    <p
      className="text-xs font-bold uppercase tracking-[0.2em] mb-6"
      style={{ color: gold ? GCU_WHITE : GCU_LIGHT_PURPLE }}
    >
      {children}
    </p>
  );
}

function GCULogo({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const ts = size === 'sm' ? 'text-base' : 'text-2xl';
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="rounded-lg flex items-center justify-center font-black text-white"
        style={{
          background: `linear-gradient(135deg, ${GCU_PURPLE}, ${GCU_LIGHT_PURPLE})`,
          width: size === 'sm' ? 28 : 36,
          height: size === 'sm' ? 28 : 36,
          fontSize: size === 'sm' ? 11 : 14,
        }}
      >
        GCU
      </div>
      <span className={`${ts} font-black tracking-tight`} style={{ color: '#F8F8F8' }}>
        Grand Canyon<span style={{ color: GCU_WHITE }}>.</span>
      </span>
    </div>
  );
}

/* ── Slides ─────────────────────────────────────────────────────────────── */

function SlideHero() {
  return (
    <Slide>
      <div className="text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-12"
          style={{ borderColor: `${GCU_WHITE}40`, background: `${GCU_WHITE}08` }}
        >
          <Lock size={10} style={{ color: GCU_WHITE }} />
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: GCU_WHITE }}>
            Confidential · GCU Leadership
          </span>
        </div>

        <div className="mb-6 flex justify-center">
          <GCULogo size="md" />
        </div>

        <h1 className="text-6xl md:text-8xl font-black leading-[1.0] tracking-tight mb-8 text-white">
          Halo was the{' '}
          <span
            style={{
              background: `linear-gradient(120deg, ${GCU_PURPLE} 0%, ${GCU_LIGHT_PURPLE} 50%, ${GCU_WHITE} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            beginning.
          </span>
        </h1>

        <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-4">
          What you built proved the thesis: a university that owns its learning infrastructure outperforms one that rents it.
          The next chapter is called{' '}
          <span className="font-bold" style={{ color: GCU_WHITE }}>Empyrean.</span>
        </p>

        <p className="mt-8 text-white/30 text-sm">Use arrow keys or the buttons below to navigate</p>
      </div>
    </Slide>
  );
}

function SlideHaloLegacy() {
  const achievements = [
    { stat: '25K+',  label: 'campus students on Halo today' },
    { stat: '100K+', label: 'GCU Online students served' },
    { stat: '200+',  label: 'academic programs in one platform' },
    { stat: '15 yrs', label: 'of institutional data GCU owns' },
  ];
  return (
    <Slide>
      <Eyebrow>What GCU Built</Eyebrow>
      <h2 className="text-5xl md:text-6xl font-black text-white leading-tight mb-6">
        You didn't buy an LMS.<br />
        <span style={{ color: GCU_WHITE }}>You built an ALP.</span>
      </h2>
      <p className="text-white/60 text-lg max-w-2xl mb-12 leading-relaxed">
        When every vendor fell short, GCU built Halo from scratch. That decision — to own the learning layer — is the single most strategically important infrastructure choice the university has made in two decades.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {achievements.map(a => (
          <div
            key={a.stat}
            className="p-6 rounded-2xl border text-center"
            style={{ borderColor: `${GCU_WHITE}25`, background: `${GCU_WHITE}06` }}
          >
            <div className="text-4xl font-black mb-2" style={{ color: GCU_WHITE }}>{a.stat}</div>
            <div className="text-white/55 text-sm leading-snug">{a.label}</div>
          </div>
        ))}
      </div>
    </Slide>
  );
}

function SlideHaloGap() {
  return (
    <Slide>
      <Eyebrow>The Next Frontier</Eyebrow>
      <h2 className="text-5xl md:text-6xl font-black text-white leading-tight mb-8">
        Halo stores the journey.<br />
        <span className="text-white/40">It doesn't guide it.</span>
      </h2>
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.03]">
          <h3 className="text-white font-bold text-lg mb-4">What Halo does brilliantly</h3>
          <ul className="space-y-3 text-white/55">
            {[
              'Delivers course content reliably',
              'Accepts assignments, sends grades',
              'Manages enrollment across 200+ programs',
              'Keeps GCU data inside GCU',
            ].map(i => (
              <li key={i} className="flex items-center gap-3">
                <span style={{ color: GCU_WHITE }}>✓</span> {i}
              </li>
            ))}
          </ul>
        </div>
        <div
          className="p-8 rounded-2xl border"
          style={{ borderColor: `${GCU_PURPLE}40`, background: `${GCU_PURPLE}08` }}
        >
          <h3 className="text-white font-bold text-lg mb-4">What Empyrean adds</h3>
          <ul className="space-y-3 text-white/55">
            {[
              'Watches every engagement signal in real time',
              'Responds to each student individually at 2 AM',
              'Flags stop-out risk 8 weeks before it happens',
              'Generates SACSCOC reports continuously — not at year-end',
            ].map(i => (
              <li key={i} className="flex items-center gap-3">
                <span style={{ color: GCU_LIGHT_PURPLE }}>→</span> {i}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="text-white/30 text-sm text-center">
        Empyrean is not a replacement. It's the intelligence layer Halo was always meant to have.
      </p>
    </Slide>
  );
}

function SlideEmpyrean() {
  return (
    <Slide>
      <Eyebrow gold>Introducing Empyrean</Eyebrow>
      <h2 className="text-5xl md:text-6xl font-black text-white leading-tight mb-8">
        The highest heaven.<br />
        <span
          style={{
            background: `linear-gradient(120deg, ${GCU_PURPLE} 0%, ${GCU_LIGHT_PURPLE} 50%, ${GCU_WHITE} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          GCU's Agentic Learning Platform.
        </span>
      </h2>
      <p className="text-white/60 text-lg max-w-2xl leading-relaxed mb-12">
        In Christian cosmology, the Empyrean is above all celestial spheres — the realm of pure divine light, the dwelling place of God. Where Halo was a ring of light around a single figure, Empyrean is the whole luminous realm. Every student, every faculty member, every institutional goal — seen, supported, and guided.
      </p>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {[
          { name: 'Lumen', desc: 'Students' },
          { name: 'Forge', desc: 'Faculty' },
          { name: 'Beacon', desc: 'Retention' },
          { name: 'Pathway', desc: 'Planning' },
          { name: 'Proof', desc: 'Compliance' },
          { name: 'Retain', desc: 'Persistence' },
        ].map(p => (
          <div
            key={p.name}
            className="p-4 rounded-xl border text-center"
            style={{ borderColor: `${GCU_PURPLE}35`, background: `${GCU_PURPLE}08` }}
          >
            <div className="text-xs font-bold uppercase tracking-wider" style={{ color: GCU_WHITE }}>{p.name}</div>
            <div className="text-white/40 text-[10px] mt-0.5">{p.desc}</div>
          </div>
        ))}
      </div>
    </Slide>
  );
}

const GCU_MODULES = [
  {
    icon: '💡',
    name: 'Lumen',
    tagline: 'Adaptive learning for every GCU student',
    color: GCU_WHITE,
    detail: 'GCU serves 25,000 traditional and 100,000+ online students across 200+ programs — each with different learning paces, contexts, and goals. Lumen reads comprehension signals in real time and adjusts pacing, modality, and depth for each student, without adding a single hour to faculty workload. The same course, 125,000 individual paths.',
    stat: '125K',
    statLabel: 'individual learning paths, one course shell',
  },
  {
    icon: '🔨',
    name: 'Forge',
    tagline: 'Give your faculty their calling back',
    color: GCU_LIGHT_PURPLE,
    detail: 'GCU faculty answer thousands of student messages weekly. Forge handles the inbox — grading routine discussions, responding to common questions at 2 AM, drafting course content, and flagging the messages that actually need a human. The result: faculty spending their time on what no AI can replace — mentoring, teaching, relationship.',
    stat: '23 hrs',
    statLabel: 'per week returned to each faculty member',
  },
  {
    icon: '🧠',
    name: 'Beacon',
    tagline: 'Stop-out prevention at GCU scale',
    color: GCU_PURPLE,
    detail: 'GCU retention model depends on catching struggling students before they disappear. Beacon watches late submissions, discussion silence, grade trajectory, and login patterns — not one signal, but all of them simultaneously — and surfaces students at risk weeks before they would stop out. Not a dashboard for advisors to check. An agent that acts.',
    stat: '8–12 wks',
    statLabel: 'early warning before a student stops out',
  },
  {
    icon: '🛤️',
    name: 'Pathway AI',
    tagline: 'One plan per student, across 200+ programs',
    color: GCU_WHITE,
    detail: 'GCU program breadth is a strength and a complexity. A student changing majors, adding a concentration, or transferring credits faces a maze that advisors currently navigate manually. Pathway AI maps each student declared major, transfer credits, financial aid window, and career goals into a live, adaptive plan — and flags conflicts before they cost a semester.',
    stat: '200+',
    statLabel: 'programs, one intelligent navigation layer',
  },
  {
    icon: '📊',
    name: 'Proof AI',
    tagline: 'SACSCOC compliance without the scramble',
    color: GCU_LIGHT_PURPLE,
    detail: 'Every accreditation cycle, GCU staff spend months mapping student work to learning outcomes and assembling evidence portfolios. Proof AI does this continuously. Every assignment, every discussion, every assessment is automatically mapped against GCU learning outcomes in real time — so when SACSCOC comes, the report is already written.',
    stat: 'Days',
    statLabel: 'for accreditation reports, down from months',
  },
  {
    icon: '🔁',
    name: 'Retain AI',
    tagline: 'GCU Online persistence, at 100K scale',
    color: GCU_PURPLE,
    detail: 'Online students stop out quietly. No campus presence means no one notices until they are gone. Retain AI identifies stop-out risk at the behavioral level — engagement patterns, financial stress signals, course load changes — and triggers personalized outreach, advisor connections, and re-enrollment pathways. No CRM layer needed. Built into the platform.',
    stat: '11%',
    statLabel: 'first-year retention improvement at pilot scale',
  },
];

function SlideModule({ mod }: { mod: typeof GCU_MODULES[0] }) {
  return (
    <div className="min-h-full flex items-center justify-center px-8 py-16">
      <div className="max-w-4xl w-full mx-auto">
        <div className="flex items-start gap-8">
          <div
            className="flex-shrink-0 w-20 h-20 rounded-2xl border flex items-center justify-center text-4xl"
            style={{ borderColor: `${mod.color}30`, background: `${mod.color}08` }}
          >
            {mod.icon}
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: mod.color }}>
              {mod.tagline}
            </p>
            <h2 className="text-5xl font-black text-white mb-6">{mod.name}</h2>
            <p className="text-xl text-white/60 leading-relaxed max-w-2xl mb-8">{mod.detail}</p>
            <div
              className="inline-flex items-baseline gap-2 px-5 py-3 rounded-xl border"
              style={{ borderColor: `${mod.color}25`, background: `${mod.color}06` }}
            >
              <span className="text-3xl font-black" style={{ color: mod.color }}>{mod.stat}</span>
              <span className="text-white/50 text-sm">{mod.statLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideSpiritLayer() {
  return (
    <Slide>
      <Eyebrow gold>The Spirit Layer</Eyebrow>
      <h2 className="text-5xl md:text-6xl font-black text-white leading-tight mb-8">
        AI that speaks<br />
        <span style={{ color: GCU_WHITE }}>in GCU's voice.</span>
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <p className="text-white/60 text-lg leading-relaxed">
            Generic AI gives every student the same experience. Empyrean's{' '}
            <strong className="text-white">Spirit Layer</strong> encodes GCU's Christian mission —
            its values, its pastoral care, its Lopes identity — into every agent interaction.
          </p>
          <p className="text-white/60 text-lg leading-relaxed">
            When a student messages at midnight about academic anxiety, they don't get a generic
            bot response. They get an answer shaped by GCU's faith-centered approach to student
            success — at 2 AM, without a counselor needing to be on call.
          </p>
        </div>
        <div className="space-y-4">
          {[
            {
              label: 'Academic Advisor Agent',
              desc: '24/7 advising in GCU\'s voice, with GCU\'s program knowledge and values',
              color: GCU_WHITE,
            },
            {
              label: 'Pastoral Care Agent',
              desc: 'Faith-centered spiritual support, grief guidance, and crisis triage — built on GCU\'s Christian mission',
              color: GCU_LIGHT_PURPLE,
            },
            {
              label: 'Doctoral Mentor Agent',
              desc: 'Dissertation and doctoral support for GCU\'s growing doctoral programs',
              color: GCU_PURPLE,
            },
          ].map(s => (
            <div
              key={s.label}
              className="p-5 rounded-xl border"
              style={{ borderColor: `${s.color}25`, background: `${s.color}06` }}
            >
              <div className="text-sm font-bold mb-1" style={{ color: s.color }}>{s.label}</div>
              <div className="text-white/50 text-sm leading-snug">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

function SlideEmpyreanVision() {
  return (
    <Slide>
      <Eyebrow>What Empyrean Looks Like</Eyebrow>
      <h2 className="text-5xl font-black text-white leading-tight mb-12">
        One platform. Every signal.<br />
        <span className="text-white/40">Nothing falls through.</span>
      </h2>
      <div className="grid md:grid-cols-3 gap-5 mb-10">
        {[
          {
            title: 'Student View',
            items: ['Personalized learning path', 'Proactive advisor outreach', '24/7 AI support in GCU voice', 'Career-mapped degree plan'],
            color: GCU_WHITE,
          },
          {
            title: 'Faculty View',
            items: ['AI-handled inbox & grading', 'Course content co-creation', 'At-risk student alerts', 'Outcome mapping auto-filled'],
            color: GCU_LIGHT_PURPLE,
          },
          {
            title: 'Leadership View',
            items: ['Live retention dashboard', 'SACSCOC reports, always ready', 'Program performance by cohort', 'Workforce outcomes tracking'],
            color: GCU_PURPLE,
          },
        ].map(v => (
          <div
            key={v.title}
            className="p-7 rounded-2xl border"
            style={{ borderColor: `${v.color}25`, background: `${v.color}06` }}
          >
            <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: v.color }}>{v.title}</div>
            <ul className="space-y-2.5">
              {v.items.map(i => (
                <li key={i} className="flex items-center gap-2.5 text-white/60 text-sm">
                  <span style={{ color: v.color }}>·</span> {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="text-white/30 text-sm text-center">
        All agents share one intelligence layer. No duct tape. No integrations. Halo's data — Empyrean's mind.
      </p>
    </Slide>
  );
}

function SlidePartnership() {
  return (
    <Slide>
      <Eyebrow gold>The Partnership Model</Eyebrow>
      <h2 className="text-5xl font-black text-white leading-tight mb-8">
        GCU doesn't license software.<br />
        <span style={{ color: GCU_WHITE }}>GCU shapes the category.</span>
      </h2>
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div className="space-y-6">
          <p className="text-white/60 text-lg leading-relaxed">
            As a Founding Partner, GCU co-develops Empyrean — your institutional priorities, your data, your mission encoded into the platform from day one, not bolted on later.
          </p>
          <p className="text-white/60 text-lg leading-relaxed">
            In return, GCU gets platform governance rights, permanent preferred pricing, and the ability to license Empyrean as a GCU-originated product to peer institutions — turning an operational investment into a revenue stream.
          </p>
        </div>
        <div className="space-y-4">
          {[
            { label: 'Co-development', desc: 'GCU priorities drive the product roadmap. Your edge cases are the platform\'s first-class features.', color: GCU_WHITE },
            { label: 'Data sovereignty', desc: 'Empyrean runs on GCU\'s Halo data. GCU owns the model weights trained on its students.', color: GCU_LIGHT_PURPLE },
            { label: 'Licensing upside', desc: 'License Empyrean to peer institutions under a GCU-originated product model.', color: GCU_PURPLE },
          ].map(r => (
            <div key={r.label} className="p-5 rounded-xl border" style={{ borderColor: `${r.color}25`, background: `${r.color}06` }}>
              <div className="text-sm font-bold mb-1" style={{ color: r.color }}>{r.label}</div>
              <div className="text-white/50 text-sm">{r.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

function SlideTimeline() {
  const phases = [
    {
      phase: 'Phase 1',
      label: 'Forge + Beacon pilot',
      date: 'Semester 1',
      desc: 'Deploy Forge across one college (~200 faculty). Beacon running across full online cohort. Baseline metrics established.',
      done: false,
      active: true,
    },
    {
      phase: 'Phase 2',
      label: 'Full Empyrean integration',
      date: 'Semester 2–3',
      desc: 'Lumen, Pathway, Retain, and Proof AI live across campus and GCU Online. Spirit Layer encoding complete.',
      done: false,
      active: false,
    },
    {
      phase: 'Phase 3',
      label: 'Halo → Empyrean migration',
      date: 'Year 2',
      desc: 'Empyrean becomes the primary learning layer. Halo data fully migrated. SACSCOC reporting automated.',
      done: false,
      active: false,
    },
    {
      phase: 'Phase 4',
      label: 'GCU as the model',
      date: 'Year 3',
      desc: 'GCU presents Empyrean at HLC, EDUCAUSE. Licensing conversations begin. GCU infrastructure becomes an asset to the sector.',
      done: false,
      active: false,
    },
  ];
  return (
    <Slide>
      <Eyebrow>Implementation Path</Eyebrow>
      <h2 className="text-5xl font-black text-white leading-tight mb-12">
        From Halo to Empyrean.<br />
        <span className="text-white/40">Four phases. No disruption.</span>
      </h2>
      <div className="space-y-4">
        {phases.map((p, i) => (
          <div
            key={i}
            className="flex items-start gap-6 p-6 rounded-2xl border"
            style={{
              borderColor: p.active ? `${GCU_WHITE}35` : 'rgba(255,255,255,0.07)',
              background: p.active ? `${GCU_WHITE}05` : 'rgba(255,255,255,0.02)',
            }}
          >
            <div className="flex-shrink-0 text-center w-24">
              <div
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: p.active ? GCU_WHITE : 'rgba(255,255,255,0.25)' }}
              >
                {p.phase}
              </div>
              <div
                className="text-sm font-semibold mt-1"
                style={{ color: p.active ? 'white' : 'rgba(255,255,255,0.2)' }}
              >
                {p.date}
              </div>
            </div>
            <div className="flex-1">
              <div
                className="font-bold mb-1"
                style={{ color: p.active ? 'white' : 'rgba(255,255,255,0.35)' }}
              >
                {p.label}
              </div>
              <div
                className="text-sm leading-relaxed"
                style={{ color: p.active ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.2)' }}
              >
                {p.desc}
              </div>
            </div>
            {p.active && (
              <div className="flex-shrink-0 text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: `${GCU_WHITE}20`, color: GCU_WHITE }}>
                Start here
              </div>
            )}
          </div>
        ))}
      </div>
    </Slide>
  );
}

function SlideLegacy({ onExit }: { onExit: () => void }) {
  return (
    <Slide>
      <div className="text-center">
        <Eyebrow gold>The Decision</Eyebrow>
        <h2 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8">
          GCU built Halo{' '}
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>when no one else would.</span>
          <br />
          <span
            style={{
              background: `linear-gradient(120deg, ${GCU_PURPLE} 0%, ${GCU_LIGHT_PURPLE} 50%, ${GCU_WHITE} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Build Empyrean next.
          </span>
        </h2>
        <p className="text-white/55 text-lg max-w-2xl mx-auto leading-relaxed mb-4">
          In 2049, GCU turns 100. The question is what higher education looks like by then — and whether GCU's technology led the way or followed it.
        </p>
        <p className="text-white/30 text-sm max-w-xl mx-auto leading-relaxed mb-16">
          Empyrean is not an IT project. It's the infrastructure decision that determines whether GCU's mission reaches 125,000 students with the same care it reaches 25.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={onExit}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-black text-white text-lg transition-all hover:scale-105"
            style={{ background: `linear-gradient(120deg, ${GCU_PURPLE} 0%, ${GCU_LIGHT_PURPLE} 100%)` }}
          >
            Explore the Platform <ChevronRight size={20} />
          </button>
        </div>
        <p className="mt-8 text-white/25 text-xs">
          greg.lucas@paigebreaker.com &nbsp;·&nbsp; greg.lucas@paigebreaker.com
        </p>
      </div>
    </Slide>
  );
}

/* ── Slide router ────────────────────────────────────────────────────────── */
function SlideContent({ index, onExit }: { index: number; onExit: () => void }) {
  // Module slides occupy indices 4–9
  if (index >= 4 && index <= 9) {
    return <SlideModule mod={GCU_MODULES[index - 4]} />;
  }
  switch (index) {
    case 0:  return <SlideHero />;
    case 1:  return <SlideHaloLegacy />;
    case 2:  return <SlideHaloGap />;
    case 3:  return <SlideEmpyrean />;
    case 10: return <SlideSpiritLayer />;
    case 11: return <SlideEmpyreanVision />;
    case 12: return <SlidePartnership />;
    case 13: return <SlideTimeline />;
    case 14: return <SlideLegacy onExit={onExit} />;
    default: return null;
  }
}

/* ── Main ────────────────────────────────────────────────────────────────── */
export default function GCULeadershipDeck() {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);

  const goNext = useCallback(() => setSlide(s => Math.min(s + 1, TOTAL_SLIDES - 2)), []);
  const goPrev = useCallback(() => setSlide(s => Math.max(s - 1, 0)), []);
  const exitDeck = useCallback(() => navigate('/'), [navigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') goNext();
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')                    goPrev();
      if (e.key === 'Escape')                                                exitDeck();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev, exitDeck]);

  const isLast = slide === TOTAL_SLIDES - 2;

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0A0005 0%, #0F0818 50%, #0A0A12 100%)' }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div
          className="absolute -top-60 left-1/3 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-[0.07]"
          style={{ background: `radial-gradient(ellipse, ${GCU_PURPLE} 0%, transparent 65%)` }}
        />
        <div
          className="absolute bottom-0 right-0 w-[600px] h-[500px] rounded-full opacity-[0.05]"
          style={{ background: `radial-gradient(ellipse, ${GCU_WHITE} 0%, transparent 70%)` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 left-0 w-[400px] h-[600px] rounded-full opacity-[0.04]"
          style={{ background: `radial-gradient(ellipse, ${GCU_LIGHT_PURPLE} 0%, transparent 65%)` }}
        />
      </div>

      {/* Header */}
      <div
        className="relative z-10 flex items-center justify-between px-8 py-5 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <GCULogo size="sm" />
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: `${GCU_WHITE}12`, border: `1px solid ${GCU_WHITE}25` }}>
          <Lock size={9} style={{ color: GCU_WHITE }} />
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: GCU_WHITE }}>Leadership Only</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-white/30 text-sm tabular-nums">{slide + 1} / {TOTAL_SLIDES - 1}</span>
          <button
            onClick={exitDeck}
            className="text-white/30 hover:text-white/60 transition-colors flex items-center gap-1.5 text-xs font-medium"
          >
            Exit <X size={13} />
          </button>
        </div>
      </div>

      {/* Slide */}
      <div
        key={slide}
        className="relative z-10 flex-1 overflow-y-auto"
        style={{ animation: 'gcuFadeSlide 0.35s ease' }}
      >
        <SlideContent index={slide} onExit={exitDeck} />
      </div>

      {/* Footer */}
      <div
        className="relative z-10 flex items-center justify-between px-8 py-5 flex-shrink-0"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Progress */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: TOTAL_SLIDES - 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === slide ? 24 : 8,
                height: 8,
                background: i === slide
                  ? GCU_WHITE
                  : i < slide
                  ? `${GCU_LIGHT_PURPLE}60`
                  : 'rgba(255,255,255,0.12)',
              }}
            />
          ))}
        </div>

        {/* Nav */}
        <div className="flex items-center gap-2">
          <button
            onClick={goPrev}
            disabled={slide === 0}
            className="p-2 rounded-xl border text-white/50 hover:text-white disabled:opacity-20 transition-all"
            style={{ borderColor: 'rgba(255,255,255,0.10)' }}
          >
            <ArrowLeft size={15} />
          </button>
          {isLast ? (
            <button
              onClick={exitDeck}
              className="flex items-center gap-2 px-5 py-2 rounded-xl font-black text-white text-sm transition-all hover:scale-105"
              style={{ background: `linear-gradient(120deg, ${GCU_PURPLE}, ${GCU_LIGHT_PURPLE})` }}
            >
              Explore Platform <ChevronRight size={15} />
            </button>
          ) : (
            <button
              onClick={goNext}
              className="flex items-center gap-2 px-5 py-2 rounded-xl border font-bold text-sm transition-all"
              style={{ borderColor: `${GCU_WHITE}35`, color: GCU_WHITE }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${GCU_WHITE}10`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
            >
              Next <ArrowRight size={15} />
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes gcuFadeSlide {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
