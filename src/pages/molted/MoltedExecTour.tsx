import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, X, ChevronRight } from 'lucide-react';

const TOTAL_SLIDES = 17;

const PRODUCTS = [
  { icon: '🧠', name: 'Beacon AI', tagline: 'Early-warning retention engine', detail: 'Watches every signal — late submissions, discussion silence, grade trajectory — and surfaces students at risk before they stop out. Not a dashboard. An intervention layer that acts.' },
  { icon: '🔨', name: 'Forge', tagline: 'Faculty AI workbench', detail: 'Drafts course content, grades discussions, answers student questions at 2 AM, and auto-responds to the inbox queue. Restores what faculty came to do: teach.' },
  { icon: '💡', name: 'Lumen', tagline: 'Adaptive learning engine', detail: 'Every student gets a different path through the same course. Lumen reads comprehension signals in real time and adjusts — pacing, modality, depth — without faculty intervention.' },
  { icon: '🛤️', name: 'Pathway AI', tagline: 'Degree & career planning agent', detail: "Maps each student's declared major, transfer credits, financial aid window, and career goals into a live plan. Flags scheduling conflicts before they become problems." },
  { icon: '📊', name: 'Proof AI', tagline: 'Accreditation & outcomes engine', detail: 'Continuously maps student work to learning outcomes. Generates SACSCOC-ready reports in hours, not weeks. Turns compliance from a semester scramble into an always-on process.' },
  { icon: '🔁', name: 'Retain AI', tagline: 'Persistence & re-enrollment system', detail: 'Identifies stop-out risk 8–12 weeks before a student disappears. Triggers personalized outreach, connects advisors, and tracks re-enrollment without a CRM layer.' },
];

/* ── Slide shell ─────────────────────────────────────────────────────────── */
function Slide({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full flex items-center justify-center px-8 py-16">
      <div className="max-w-5xl w-full mx-auto">{children}</div>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-molted-gold text-xs font-bold uppercase tracking-[0.2em] mb-6">{children}</p>
  );
}

/* ── Slides ──────────────────────────────────────────────────────────────── */

function SlideHero() {
  return (
    <Slide>
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-molted-gold/30 bg-molted-gold/5 mb-12">
          <div className="w-2 h-2 rounded-full bg-molted-gold animate-pulse" />
          <span className="text-molted-gold text-xs font-semibold tracking-widest uppercase">Executive Tour</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-molted-white leading-[1.0] tracking-tight mb-8">
          The platform{' '}
          <span style={{
            background: 'linear-gradient(120deg, #2563EB 0%, #64748B 55%, #1E3A8A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            universities run on.
          </span>
        </h1>
        <p className="text-xl text-molted-muted max-w-2xl mx-auto leading-relaxed">
          MoltALP is an agentic learning platform built for scale. Every student. Every course. Every outcome — tracked, supported, and optimized in real time.
        </p>
        <p className="mt-8 text-molted-muted/50 text-sm">Use arrow keys or the buttons below to navigate</p>
      </div>
    </Slide>
  );
}

function SlideProblem() {
  const problems = [
    { stat: '40%', label: 'of students who enroll never graduate', color: '#1E3A8A' },
    { stat: '2.3M', label: 'students stopped out in 2023 alone', color: '#64748B' },
    { stat: '$6B+', label: 'in tuition revenue lost to stop-out annually', color: '#1E3A8A' },
    { stat: '1:400', label: 'average advisor-to-student ratio at scale universities', color: '#64748B' },
  ];
  return (
    <Slide>
      <Eyebrow>The Problem</Eyebrow>
      <h2 className="text-5xl md:text-6xl font-black text-molted-white leading-tight mb-6">
        Higher ed has a scale problem.<br />
        <span className="text-molted-muted">No one has solved it.</span>
      </h2>
      <p className="text-molted-muted text-lg max-w-2xl mb-16 leading-relaxed">
        The tools universities run on — SIS platforms, LMSes, CRMs — were built for administration, not for students. They track enrollment. They don't track people.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {problems.map(p => (
          <div key={p.stat} className="p-6 rounded-2xl border border-white/8 bg-white/[0.03] text-center">
            <div className="text-4xl font-black mb-2" style={{ color: p.color }}>{p.stat}</div>
            <div className="text-molted-muted text-sm leading-snug">{p.label}</div>
          </div>
        ))}
      </div>
    </Slide>
  );
}

function SlideCanvas() {
  return (
    <Slide>
      <Eyebrow>The Status Quo</Eyebrow>
      <h2 className="text-5xl md:text-6xl font-black text-molted-white leading-tight mb-8">
        Canvas was built in 2008.
      </h2>
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="p-8 rounded-2xl border border-white/8 bg-white/[0.03]">
          <h3 className="text-molted-white font-bold text-lg mb-4">What the LMS does</h3>
          <ul className="space-y-3 text-molted-muted">
            {['Stores content', 'Accepts assignment uploads', 'Sends grade notifications', 'Generates compliance reports'].map(i => (
              <li key={i} className="flex items-center gap-3">
                <span className="text-molted-red">✕</span> {i}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-8 rounded-2xl border border-molted-gold/20 bg-molted-gold/[0.04]">
          <h3 className="text-molted-white font-bold text-lg mb-4">What MoltALP does</h3>
          <ul className="space-y-3 text-molted-muted">
            {['Watches every engagement signal', 'Responds to each student individually', 'Flags risk before it becomes dropout', 'Generates compliance data continuously'].map(i => (
              <li key={i} className="flex items-center gap-3">
                <span className="text-molted-gold">✓</span> {i}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="text-molted-muted/60 text-sm text-center">
        $1B+ in annual LMS spend. Zero AI-native alternatives until now.
      </p>
    </Slide>
  );
}

function SlideMolt() {
  return (
    <Slide>
      <Eyebrow>The Platform</Eyebrow>
      <h2 className="text-5xl md:text-6xl font-black text-molted-white leading-tight mb-8">
        MoltALP is not a plugin.<br />
        <span style={{
          background: 'linear-gradient(120deg, #64748B 0%, #1E3A8A 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>It's the operating layer.</span>
      </h2>
      <p className="text-molted-muted text-lg max-w-2xl leading-relaxed mb-12">
        Every agent in the Molt platform shares a single intelligence layer — watching the same signals, trained on the same institutional knowledge, reporting to the same outcomes dashboard. No integrations. No duct tape. One system.
      </p>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {['Beacon', 'Forge', 'Lumen', 'Pathway', 'Proof', 'Retain'].map(name => (
          <div key={name} className="p-4 rounded-xl border border-white/8 bg-white/[0.03] text-center">
            <div className="text-molted-gold text-xs font-bold uppercase tracking-wider">{name}</div>
          </div>
        ))}
      </div>
    </Slide>
  );
}

function SlideProductDetail({ product, index }: { product: typeof PRODUCTS[0]; index: number }) {
  const colors = ['#2563EB', '#64748B', '#1E3A8A', '#2563EB', '#64748B', '#1E3A8A'];
  const color = colors[index % colors.length];
  return (
    <div className="min-h-full flex items-center justify-center px-8 py-16">
      <div className="max-w-4xl w-full mx-auto">
        <div className="flex items-start gap-8">
          <div className="flex-shrink-0 w-20 h-20 rounded-2xl border flex items-center justify-center text-4xl"
            style={{ borderColor: `${color}30`, background: `${color}08` }}>
            {product.icon}
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color }}>{product.tagline}</p>
            <h2 className="text-5xl font-black text-molted-white mb-6">{product.name}</h2>
            <p className="text-xl text-molted-muted leading-relaxed max-w-2xl">{product.detail}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideProof() {
  const results = [
    { metric: '170K+', label: 'students on Molt infrastructure at launch' },
    { metric: '3 min', label: 'average advisor response time vs. 3 days' },
    { metric: '11%', label: 'improvement in first-year retention' },
    { metric: '94%', label: 'faculty satisfaction with Forge workbench' },
  ];
  return (
    <Slide>
      <Eyebrow>Proof at Scale</Eyebrow>
      <h2 className="text-5xl md:text-6xl font-black text-molted-white leading-tight mb-6">
        Not a pilot.<br />
        <span className="text-molted-muted">Live at 170,000 students.</span>
      </h2>
      <p className="text-molted-muted text-lg max-w-2xl leading-relaxed mb-12">
        Molt launched at scale with one of the largest private universities in the United States — full platform, across every college, every agent, day one. The numbers speak for themselves.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {results.map(r => (
          <div key={r.metric} className="p-6 rounded-2xl border border-molted-gold/20 bg-molted-gold/[0.04] text-center">
            <div className="text-3xl font-black text-molted-gold mb-2">{r.metric}</div>
            <div className="text-molted-muted text-sm leading-snug">{r.label}</div>
          </div>
        ))}
      </div>
      <div className="p-6 rounded-2xl border border-white/8 bg-white/[0.02]">
        <p className="text-molted-muted/80 text-sm italic leading-relaxed">
          "We didn't want an AI vendor. We wanted a partner willing to rebuild how a university actually operates. Molt was the only platform that thought at that level."
        </p>
        <p className="text-molted-muted/40 text-xs mt-3 uppercase tracking-widest">— Founding Partner University Leadership</p>
      </div>
    </Slide>
  );
}

function SlideMissionLayer() {
  return (
    <Slide>
      <Eyebrow>The Mission Layer</Eyebrow>
      <h2 className="text-5xl md:text-6xl font-black text-molted-white leading-tight mb-8">
        Every university has a soul.<br />
        <span className="text-molted-muted">MoltALP carries it.</span>
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <p className="text-molted-muted text-lg leading-relaxed">
            Generic AI gives every student the same experience. MoltALP's <strong className="text-molted-white">Spirit Layer</strong> encodes institutional character — values, voice, pastoral care — into every agent so students feel the university, not a chatbot.
          </p>
          <p className="text-molted-muted text-lg leading-relaxed">
            Each university licenses its own Spirit Layer configuration. The agents respond in the institution's voice, with its values, at 2 AM when no one else is there.
          </p>
        </div>
        <div className="space-y-4">
          {[
            { label: 'Academic Advisor Agent', desc: '24/7 advising in the institution\'s voice and values' },
            { label: 'Pastoral Care Agent', desc: 'Spiritual support, grief, and faith guidance for mission-driven universities' },
            { label: 'Doctoral Mentor Agent', desc: 'Dissertation support for the hardest stretch of the academic journey' },
          ].map(s => (
            <div key={s.label} className="p-5 rounded-xl border border-white/8 bg-white/[0.02]">
              <div className="text-molted-gold text-sm font-bold mb-1">{s.label}</div>
              <div className="text-molted-muted text-sm">{s.desc}</div>
            </div>
          ))}
          <p className="text-molted-muted/50 text-xs mt-2">
            Licensable. Any university can encode its own mission into Molt agents.
          </p>
        </div>
      </div>
    </Slide>
  );
}

function SlideMarket() {
  return (
    <Slide>
      <Eyebrow>Market Opportunity</Eyebrow>
      <h2 className="text-5xl md:text-6xl font-black text-molted-white leading-tight mb-8">
        $47B market.<br />
        <span className="text-molted-muted">No AI-native competitor.</span>
      </h2>
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          { label: 'LMS Market (2024)', value: '$11B', sub: 'Canvas, Blackboard, D2L' },
          { label: 'EdTech AI (projected 2028)', value: '$47B', sub: 'No dominant platform yet' },
          { label: 'Stop-out Revenue Loss', value: '$6B+', sub: 'Annual, US universities alone' },
        ].map(m => (
          <div key={m.label} className="p-7 rounded-2xl border border-white/8 bg-white/[0.03] text-center">
            <div className="text-4xl font-black text-molted-gold mb-2">{m.value}</div>
            <div className="text-molted-white text-sm font-semibold mb-1">{m.label}</div>
            <div className="text-molted-muted text-xs">{m.sub}</div>
          </div>
        ))}
      </div>
      <p className="text-molted-muted text-center text-sm">
        Molt targets the full stack: LMS replacement + retention infrastructure + outcomes reporting + faculty tooling.
      </p>
    </Slide>
  );
}

function SlideModel() {
  return (
    <Slide>
      <Eyebrow>Business Model</Eyebrow>
      <h2 className="text-5xl font-black text-molted-white leading-tight mb-12">
        Three revenue streams. One platform.
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            tier: 'Platform License',
            price: '$12–28 / student / yr',
            color: '#2563EB',
            items: ['Full Molt OS', 'All agents included', 'Outcomes dashboard', 'Spirit Layer custom encoding'],
          },
          {
            tier: 'Forge SaaS',
            price: '$3,600 / faculty seat / yr',
            color: '#64748B',
            items: ['Faculty AI workbench', 'Grading automation', 'Course content generation', 'Discussion facilitation'],
          },
          {
            tier: 'Proof Compliance',
            price: '$0.80 / student / yr',
            color: '#1E3A8A',
            items: ['Accreditation reporting', 'SACSCOC / HLC / WASC', 'Continuous outcomes mapping', 'Audit-ready exports'],
          },
        ].map(m => (
          <div key={m.tier} className="p-7 rounded-2xl border flex flex-col" style={{ borderColor: `${m.color}25`, background: `${m.color}05` }}>
            <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: m.color }}>{m.tier}</div>
            <div className="text-2xl font-black text-molted-white mb-6">{m.price}</div>
            <ul className="space-y-2 mt-auto">
              {m.items.map(i => (
                <li key={i} className="text-molted-muted text-sm flex items-center gap-2">
                  <span style={{ color: m.color }}>·</span> {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Slide>
  );
}

function SlideRoadmap() {
  const phases = [
    { phase: 'Phase 1', label: 'GCU at scale', date: '2024', desc: 'Full platform live at 170K students. All six agents deployed. Outcomes baseline established.', done: true },
    { phase: 'Phase 2', label: 'Regional expansion', date: 'Q2 2025', desc: '5 additional university partners. Forge and Beacon as standalone SaaS for LMS-adjacent entry.', done: true },
    { phase: 'Phase 3', label: 'Platform standard', date: '2026', desc: 'Molt API open to third-party integrations. Community college system contracts. International pilots.', done: false },
    { phase: 'Phase 4', label: 'Market leadership', date: '2027', desc: '100+ institutions. Proof AI as the de facto accreditation layer. Series B.', done: false },
  ];
  return (
    <Slide>
      <Eyebrow>Roadmap</Eyebrow>
      <h2 className="text-5xl font-black text-molted-white leading-tight mb-12">
        From GCU to the market standard.
      </h2>
      <div className="space-y-4">
        {phases.map((p, i) => (
          <div key={i} className={`flex items-start gap-6 p-6 rounded-2xl border ${p.done ? 'border-molted-gold/20 bg-molted-gold/[0.04]' : 'border-white/6 bg-white/[0.02]'}`}>
            <div className="flex-shrink-0 text-center w-20">
              <div className={`text-xs font-bold uppercase tracking-wider ${p.done ? 'text-molted-gold' : 'text-molted-muted/40'}`}>{p.phase}</div>
              <div className={`text-sm font-semibold mt-1 ${p.done ? 'text-molted-white' : 'text-molted-muted/30'}`}>{p.date}</div>
            </div>
            <div className="flex-1">
              <div className={`font-bold mb-1 ${p.done ? 'text-molted-white' : 'text-molted-muted/50'}`}>{p.label}</div>
              <div className={`text-sm leading-relaxed ${p.done ? 'text-molted-muted' : 'text-molted-muted/30'}`}>{p.desc}</div>
            </div>
            {p.done && <div className="flex-shrink-0 text-molted-gold text-lg">✓</div>}
          </div>
        ))}
      </div>
    </Slide>
  );
}

function SlideAsk() {
  return (
    <Slide>
      <Eyebrow>The Ask</Eyebrow>
      <h2 className="text-5xl md:text-6xl font-black text-molted-white leading-tight mb-8">
        Series A · $24M
      </h2>
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          { label: 'Platform', pct: '40%', amt: '$9.6M', desc: 'Molt OS infrastructure, agent training, API layer' },
          { label: 'Sales & Partnerships', pct: '35%', amt: '$8.4M', desc: 'University BD team, founding partner program' },
          { label: 'Research', pct: '25%', amt: '$6M', desc: 'Outcomes research, Spirit Layer R&D, accreditor relationships' },
        ].map(a => (
          <div key={a.label} className="p-7 rounded-2xl border border-white/8 bg-white/[0.02]">
            <div className="text-molted-gold text-xs font-bold uppercase tracking-widest mb-3">{a.label}</div>
            <div className="text-3xl font-black text-molted-white mb-1">{a.pct}</div>
            <div className="text-molted-muted text-sm font-semibold mb-3">{a.amt}</div>
            <div className="text-molted-muted/70 text-xs leading-relaxed">{a.desc}</div>
          </div>
        ))}
      </div>
      <p className="text-molted-muted text-sm text-center">
        18-month runway to 10 partner institutions and $4.2M ARR.
      </p>
    </Slide>
  );
}

function SlideLegacy({ onEnter }: { onEnter: () => void }) {
  return (
    <Slide>
      <div className="text-center">
        <Eyebrow>The Last Slide</Eyebrow>
        <h2 className="text-5xl md:text-7xl font-black text-molted-white leading-tight mb-8">
          The LMS that{' '}
          <span style={{
            background: 'linear-gradient(120deg, #2563EB 0%, #64748B 55%, #1E3A8A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            knows everyone.
          </span>
        </h2>
        <p className="text-molted-muted text-lg max-w-2xl mx-auto leading-relaxed mb-4">
          GCU proved it works at 170,000 students. The question now is which universities run on Molt — and which ones don't.
        </p>
        <p className="text-molted-muted/50 text-sm max-w-xl mx-auto leading-relaxed mb-16">
          Every year we wait, another 2.3 million students stop out. Molt exists to close that gap — one institution at a time, until this is how every university operates.
        </p>
        <button
          onClick={onEnter}
          className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-black text-molted-surface text-lg transition-all hover:scale-105"
          style={{ background: 'linear-gradient(120deg, #64748B 0%, #1E3A8A 100%)' }}
        >
          Explore the Platform <ChevronRight size={20} />
        </button>
      </div>
    </Slide>
  );
}

/* ── Slide router ────────────────────────────────────────────────────────── */
function SlideContent({ index, onEnter }: { index: number; onEnter: () => void }) {
  // Product slides occupy indices 4–9
  if (index >= 4 && index <= 9) {
    return <SlideProductDetail product={PRODUCTS[index - 4]} index={index - 4} />;
  }
  switch (index) {
    case 0:  return <SlideHero />;
    case 1:  return <SlideProblem />;
    case 2:  return <SlideCanvas />;
    case 3:  return <SlideMolt />;
    case 10: return <SlideProof />;
    case 11: return <SlideMissionLayer />;
    case 12: return <SlideMarket />;
    case 13: return <SlideModel />;
    case 14: return <SlideRoadmap />;
    case 15: return <SlideAsk />;
    case 16: return <SlideLegacy onEnter={onEnter} />;
    default: return null;
  }
}

/* ── Main ────────────────────────────────────────────────────────────────── */
export default function MoltedExecTour() {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);

  const goNext = useCallback(() => setSlide(s => Math.min(s + 1, TOTAL_SLIDES - 1)), []);
  const goPrev = useCallback(() => setSlide(s => Math.max(s - 1, 0)), []);
  const enterPlatform = useCallback(() => navigate('/'), [navigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') goNext();
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')                    goPrev();
      if (e.key === 'Escape')                                                enterPlatform();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev, enterPlatform]);

  const isLast = slide === TOTAL_SLIDES - 1;

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #000000 0%, #0A0A0F 100%)' }}
    >
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute -top-60 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(ellipse, #64748B 0%, transparent 65%)' }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(ellipse, #1E3A8A 0%, transparent 70%)' }} />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-white/5 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #64748B, #1E3A8A)' }}>
            <span className="font-black text-white text-xs">M</span>
          </div>
          <span className="text-molted-muted text-sm font-medium">MoltALP &nbsp;·&nbsp; Executive Tour</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-molted-muted/40 text-sm tabular-nums">{slide + 1} / {TOTAL_SLIDES}</span>
          <button
            onClick={enterPlatform}
            className="text-molted-muted/40 hover:text-molted-muted transition-colors flex items-center gap-1.5 text-xs font-medium"
          >
            Exit <X size={13} />
          </button>
        </div>
      </div>

      {/* Slide */}
      <div key={slide} className="relative z-10 flex-1 overflow-y-auto" style={{ animation: 'fadeSlide 0.35s ease' }}>
        <SlideContent index={slide} onEnter={enterPlatform} />
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-center justify-between px-8 py-5 border-t border-white/5 flex-shrink-0">
        {/* Progress dots */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === slide ? 24 : 8,
                height: 8,
                background: i === slide ? '#64748B' : i < slide ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.07)',
              }}
            />
          ))}
        </div>

        {/* Nav */}
        <div className="flex items-center gap-2">
          <button
            onClick={goPrev}
            disabled={slide === 0}
            className="p-2 rounded-xl border border-white/10 text-molted-muted hover:text-molted-white hover:border-white/25 disabled:opacity-20 transition-all"
          >
            <ArrowLeft size={15} />
          </button>
          {isLast ? (
            <button
              onClick={enterPlatform}
              className="flex items-center gap-2 px-5 py-2 rounded-xl font-black text-molted-surface text-sm transition-all hover:scale-105"
              style={{ background: 'linear-gradient(120deg, #64748B, #1E3A8A)' }}
            >
              Explore Molt <ChevronRight size={15} />
            </button>
          ) : (
            <button
              onClick={goNext}
              className="flex items-center gap-2 px-5 py-2 rounded-xl border border-molted-gold/30 text-molted-gold hover:bg-molted-gold/10 font-bold text-sm transition-all"
            >
              Next <ArrowRight size={15} />
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
