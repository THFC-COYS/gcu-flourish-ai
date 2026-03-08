import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, X, Sparkles, ChevronRight, Shield, Users, Globe, TrendingUp } from 'lucide-react';

// ── Shared data ──────────────────────────────────────────────────────────────

const AGENTS = [
  { icon: '🏥', name: 'Spirit Nurse', domain: 'Clinical care & patient support' },
  { icon: '📚', name: 'Spirit Teacher', domain: 'Education & learning guidance' },
  { icon: '✝️', name: 'Spirit Chaplain', domain: 'Grief, faith & spiritual care' },
  { icon: '💼', name: 'Spirit Advisor', domain: 'Business ethics & leadership' },
  { icon: '🤝', name: 'Spirit Companion', domain: 'Mental health & emotional support' },
  { icon: '🔬', name: 'Spirit Researcher', domain: 'Scientific inquiry & integrity' },
  { icon: '⚙️', name: 'Spirit Engineer', domain: 'Ethical engineering practice' },
  { icon: '🎨', name: 'Spirit Creative', domain: 'Arts, media & creative process' },
  { icon: '🎓', name: 'Spirit Dissertation', domain: 'Doctoral research & completion' },
  { icon: '💡', name: 'Spirit Innovator', domain: 'Honors & entrepreneurial thinking' },
];

const SCENES = [
  { src: '/scenes/bedside.jpg',   label: 'Bedside Tablet',              phase: 'Now'  },
  { src: '/scenes/lobby.jpg',     label: 'Hospital Lobby Kiosk',        phase: 'Now'  },
  { src: '/scenes/classroom.jpg', label: 'Life-Size Classroom Avatar',  phase: '2026' },
  { src: '/scenes/wearable.jpg',  label: 'Wearable AR — Nurse\'s View', phase: '2027' },
  { src: '/scenes/robotics.jpg',  label: 'Flourish Robotics',           phase: '2028' },
];

const ASKS = [
  {
    number: '01',
    title: 'Authorize Phase 1 Investment',
    body: 'Approve $3.2M for infrastructure, team, and the first three external pilot deployments. This funds the transition from prototype to production platform.',
    accent: 'border-gcu-purple',
    glow: 'text-purple-300',
  },
  {
    number: '02',
    title: 'Activate Faculty Participation',
    body: "Commission all 10 colleges to formally contribute faculty expertise into their Spirit Agent. This is GCU's unique moat — no other institution on earth can replicate it.",
    accent: 'border-gcu-gold',
    glow: 'text-gcu-gold',
  },
  {
    number: '03',
    title: 'Greenlight the First External Deployment',
    body: 'Approve the first clinical or educational partnership. The first real-world deployment establishes GCU as the pioneer and generates the data that proves the model.',
    accent: 'border-emerald-500',
    glow: 'text-emerald-300',
  },
];

const TOTAL_SLIDES = 9;

// ── Layout helpers ────────────────────────────────────────────────────────────

function Slide({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full flex items-center justify-center px-8 py-10">
      <div className="w-full max-w-5xl mx-auto">{children}</div>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-gcu-gold text-xs font-bold uppercase tracking-widest mb-4">{children}</p>
  );
}

// ── Individual slides ─────────────────────────────────────────────────────────

function SlideHero() {
  return (
    <Slide>
      <div className="text-center max-w-3xl mx-auto">
        <Eyebrow>GCU Flourish AI · Executive Briefing</Eyebrow>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
          What if GCU could be present<br />
          <span className="text-gcu-gold">at every moment that matters</span><br />
          for every person it has ever trained to serve?
        </h1>
        <p className="text-white/50 text-lg leading-relaxed mb-10">
          This is not a hypothetical. This is what we have built.
        </p>
        <p className="text-white/20 text-sm">Use arrow keys or click Next to advance</p>
      </div>
    </Slide>
  );
}

function SlideProblem() {
  const scenarios = [
    { icon: '🏥', who: 'A patient alone at 2 AM', moment: "with a diagnosis they don't understand and no nurse to call" },
    { icon: '📖', who: 'A student in academic crisis', moment: "convinced they can't finish, with no advisor available until Monday" },
    { icon: '💔', who: 'A grieving family at the ER', moment: 'not knowing what to ask, who to trust, or where to go' },
  ];
  return (
    <Slide>
      <div className="text-center mb-10">
        <Eyebrow>The Unmet Need</Eyebrow>
        <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
          People face their most important moments<br />with no one in the room.
        </h2>
        <p className="text-white/50 text-base max-w-2xl mx-auto">
          GCU has spent 77 years training people who combine deep expertise with human dignity. Until now, only those standing in our classrooms could benefit.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {scenarios.map(s => (
          <div key={s.who} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-left">
            <div className="text-3xl mb-3">{s.icon}</div>
            <p className="text-white font-bold text-sm mb-1">{s.who}</p>
            <p className="text-white/50 text-xs leading-relaxed">{s.moment}</p>
          </div>
        ))}
      </div>
    </Slide>
  );
}

function SlideWeAreGCU() {
  const sources  = ['Faculty Expertise', 'Curriculum & Pedagogy', 'Research & Scholarship', 'Institutional Values', 'Student & Staff IP'];
  const surfaces = ['Bedside Tablet', 'Hospital Kiosk', 'Classroom Avatar', 'Wearable AR', 'Flourish Robotics'];
  return (
    <Slide>
      <div className="text-center mb-10">
        <Eyebrow>The Collective</Eyebrow>
        <h2 className="text-6xl sm:text-7xl font-black leading-none mb-3">
          <span className="text-white">We </span>
          <span className="text-gcu-gold">Are</span>
          <span className="text-white"> GCU.</span>
        </h2>
        <p className="text-purple-300/70 text-lg font-semibold italic">Physical and digital — one soul.</p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
        <div className="flex flex-col gap-2 min-w-[210px]">
          {sources.map(s => (
            <div key={s} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gcu-purple flex-shrink-0" />
              <span className="text-xs text-white/80 font-medium">{s}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center px-10">
          <div className="w-1 h-8 bg-gradient-to-b from-transparent to-gcu-purple/40 mb-2 hidden md:block" />
          <div className="relative w-20 h-20 flex-shrink-0">
            <div className="absolute inset-0 rounded-full border-2 border-gcu-purple/30 animate-ping" style={{ animationDuration: '3s' }} />
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-gcu-purple to-indigo-800 flex items-center justify-center shadow-lg shadow-gcu-purple/40">
              <Sparkles size={18} className="text-gcu-gold" />
            </div>
          </div>
          <p className="text-gcu-gold text-[10px] font-bold uppercase tracking-widest mt-2 text-center">Spirit<br />Layer</p>
          <div className="w-1 h-8 bg-gradient-to-b from-gcu-purple/40 to-transparent mt-2 hidden md:block" />
        </div>
        <div className="flex flex-col gap-2 min-w-[210px]">
          {surfaces.map(s => (
            <div key={s} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gcu-gold flex-shrink-0" />
              <span className="text-xs text-white/80 font-medium">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

function SlidePlatform() {
  return (
    <Slide>
      <div className="text-center mb-8">
        <Eyebrow>What We've Built</Eyebrow>
        <h2 className="text-4xl sm:text-5xl font-black text-white">
          10 Spirit Agents.<br />
          <span className="text-gcu-gold">One for every GCU college.</span>
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {AGENTS.map(a => (
          <div key={a.name} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center hover:border-gcu-purple/40 transition-colors">
            <div className="text-2xl mb-1.5">{a.icon}</div>
            <p className="text-white text-xs font-bold leading-tight mb-1">{a.name}</p>
            <p className="text-white/40 text-[10px] leading-tight">{a.domain}</p>
          </div>
        ))}
      </div>
      <p className="text-center text-white/30 text-xs mt-5">
        Each agent is a live prototype — deployable today, growing continuously through the GCU Spirit Network.
      </p>
    </Slide>
  );
}

function SlideEverywhere() {
  return (
    <Slide>
      <div className="text-center mb-8">
        <Eyebrow>The Deployment Vision</Eyebrow>
        <h2 className="text-4xl sm:text-5xl font-black text-white mb-2">Spirit Everywhere.</h2>
        <p className="text-white/50 text-base">The form changes. The soul does not.</p>
      </div>
      <div className="grid grid-cols-5 gap-3">
        {SCENES.map(s => (
          <div key={s.label} className="flex flex-col gap-2">
            <div className="relative h-36 rounded-xl overflow-hidden">
              <img src={s.src} alt={s.label} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-2 left-2 text-[9px] font-bold text-gcu-gold uppercase tracking-wider">{s.phase}</span>
            </div>
            <p className="text-white/60 text-[10px] font-semibold text-center leading-tight">{s.label}</p>
          </div>
        ))}
      </div>
    </Slide>
  );
}

function SlideMarket() {
  const stats = [
    { value: '33,000+', label: 'Christian institutions globally',      sub: 'With no ethical AI framework — until GCU builds it',             Icon: Globe,       color: 'text-blue-400'    },
    { value: '2.6B',    label: 'Christians worldwide',                  sub: 'The largest underserved market for faith-aligned AI',             Icon: Users,       color: 'text-emerald-400' },
    { value: '$0',      label: 'Current ethical AI competition',        sub: 'No institution on earth is doing this. GCU creates the category.', Icon: TrendingUp,  color: 'text-gcu-gold'    },
  ];
  return (
    <Slide>
      <div className="text-center mb-10">
        <Eyebrow>The Market Opportunity</Eyebrow>
        <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
          GCU doesn't enter a market.<br />
          <span className="text-gcu-gold">GCU creates one.</span>
        </h2>
        <p className="text-white/50 text-base max-w-2xl mx-auto">
          Every Christian university, hospital system, and faith-based organization on earth needs an ethical AI framework. None exists. GCU builds it first — and licenses the standard globally.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {stats.map(s => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <s.Icon size={24} className={`${s.color} mx-auto mb-3`} />
            <p className={`text-5xl font-black ${s.color} mb-2`}>{s.value}</p>
            <p className="text-white font-bold text-sm mb-2">{s.label}</p>
            <p className="text-white/40 text-xs leading-relaxed">{s.sub}</p>
          </div>
        ))}
      </div>
    </Slide>
  );
}

function SlideRevenue() {
  const rows = [
    { year: 'Year 1', period: '2025–2026', amount: '$3.2M',  note: 'Internal savings + 3 pilots + API licensing + grants',                        color: 'text-slate-300'   },
    { year: 'Year 2', period: '2026–2027', amount: '$14.5M', note: '25 partner institutions + enterprise API + Flourish Standard certification',    color: 'text-purple-300'  },
    { year: 'Year 3', period: '2027–2028', amount: '$52M',   note: '100+ certified institutions worldwide + wearables + robotics platform',         color: 'text-gcu-gold'    },
  ];
  return (
    <Slide>
      <div className="text-center mb-10">
        <Eyebrow>The Business Case</Eyebrow>
        <h2 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight">
          A platform that funds GCU's mission<br />
          <span className="text-gcu-gold">for generations.</span>
        </h2>
        <p className="text-white/50 text-base">25% of all revenue reinvested into GCU scholarships and AI ethics research.</p>
      </div>
      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        {rows.map(r => (
          <div key={r.year} className="flex items-center gap-6 bg-white/5 border border-white/10 rounded-2xl px-6 py-5">
            <div className="flex-shrink-0 text-center w-20">
              <p className="text-white font-black text-sm">{r.year}</p>
              <p className="text-white/30 text-xs">{r.period}</p>
            </div>
            <div className="flex-1">
              <p className="text-white/50 text-xs leading-relaxed">{r.note}</p>
            </div>
            <p className={`text-3xl font-black flex-shrink-0 ${r.color}`}>{r.amount}</p>
          </div>
        ))}
      </div>
      <p className="text-center text-white/20 text-xs mt-5">
        Conservative projections based on comparable faith-based SaaS and AI platform benchmarks.
      </p>
    </Slide>
  );
}

function SlideAsk() {
  return (
    <Slide>
      <div className="text-center mb-10">
        <Eyebrow>What We Need from Leadership</Eyebrow>
        <h2 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight">
          Three decisions that change<br />
          <span className="text-gcu-gold">GCU's trajectory.</span>
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {ASKS.map(a => (
          <div key={a.number} className={`bg-white/5 border-t-4 ${a.accent} rounded-2xl p-6`}>
            <p className={`text-5xl font-black mb-4 ${a.glow} opacity-30`}>{a.number}</p>
            <h3 className="text-white font-black text-base mb-3 leading-tight">{a.title}</h3>
            <p className="text-white/50 text-xs leading-relaxed">{a.body}</p>
          </div>
        ))}
      </div>
    </Slide>
  );
}

function SlideLegacy({ onEnter }: { onEnter: () => void }) {
  return (
    <Slide>
      <div className="text-center max-w-3xl mx-auto">
        <Eyebrow>The Legacy</Eyebrow>
        <h2 className="text-5xl sm:text-6xl font-black text-white leading-tight mb-6">
          GCU doesn't just build Spirit Agents.<br />
          <span className="text-gcu-gold">GCU writes the standard<br />the entire industry follows.</span>
        </h2>
        <p className="text-white/50 text-lg leading-relaxed mb-4 max-w-2xl mx-auto">
          By 2028, every hospital, university, and faith-based organization deploying AI will ask one question:
        </p>
        <p className="text-2xl font-black text-white mb-10">
          "Is it <span className="text-gcu-gold">Spirit-Certified</span>?"
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onEnter}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gcu-gold text-gcu-purple-dark font-black text-base hover:bg-yellow-400 transition-colors shadow-lg shadow-gcu-gold/20"
          >
            Enter the Platform <ChevronRight size={18} />
          </button>
          <button
            onClick={onEnter}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/10 border border-white/20 text-white font-bold text-base hover:bg-white/15 transition-colors"
          >
            <Shield size={16} /> View the Flourish Standard
          </button>
        </div>
        <p className="text-white/20 text-xs mt-10">GCU Flourish AI · 77 years of character, deployed at scale</p>
      </div>
    </Slide>
  );
}

// ── Slide router ──────────────────────────────────────────────────────────────

function SlideContent({ index, onEnter }: { index: number; onEnter: () => void }) {
  switch (index) {
    case 0: return <SlideHero />;
    case 1: return <SlideProblem />;
    case 2: return <SlideWeAreGCU />;
    case 3: return <SlidePlatform />;
    case 4: return <SlideEverywhere />;
    case 5: return <SlideMarket />;
    case 6: return <SlideRevenue />;
    case 7: return <SlideAsk />;
    case 8: return <SlideLegacy onEnter={onEnter} />;
    default: return null;
  }
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ExecutiveTour() {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);

  const goNext = useCallback(() => setSlide(s => Math.min(s + 1, TOTAL_SLIDES - 1)), []);
  const goPrev = useCallback(() => setSlide(s => Math.max(s - 1, 0)), []);
  const enterPlatform = useCallback(() => navigate('/login'), [navigate]);

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
    <div className="fixed inset-0 flex flex-col overflow-hidden" style={{ background: 'linear-gradient(135deg, #080414 0%, #100820 100%)' }}>
      {/* Subtle gold wave */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <svg viewBox="0 0 1440 900" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,900 Q360,200 720,500 Q1080,800 1440,200 L1440,900 Z" fill="#FFC627" />
        </svg>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-8 py-5 flex-shrink-0 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gcu-gold flex items-center justify-center">
            <span className="font-black text-gcu-purple-dark text-sm">GCU</span>
          </div>
          <span className="text-white/35 text-sm font-medium">Flourish AI &nbsp;·&nbsp; Executive Tour</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-white/20 text-sm tabular-nums">{slide + 1} / {TOTAL_SLIDES}</span>
          <button
            onClick={enterPlatform}
            className="text-white/25 hover:text-white/60 transition-colors flex items-center gap-1.5 text-xs font-medium"
          >
            Exit <X size={13} />
          </button>
        </div>
      </div>

      {/* Slide (key forces fade-in on change) */}
      <div key={slide} className="relative z-10 flex-1 overflow-y-auto animate-fade-in">
        <SlideContent index={slide} onEnter={enterPlatform} />
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-center justify-between px-8 py-5 flex-shrink-0 border-t border-white/5">
        {/* Progress dots */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`rounded-full transition-all duration-300 ${
                i === slide   ? 'w-6 h-2 bg-gcu-gold' :
                i < slide     ? 'w-2 h-2 bg-white/30' :
                                'w-2 h-2 bg-white/10 hover:bg-white/25'
              }`}
            />
          ))}
        </div>

        {/* Nav */}
        <div className="flex items-center gap-2">
          <button
            onClick={goPrev}
            disabled={slide === 0}
            className="p-2 rounded-xl border border-white/15 text-white/50 hover:text-white hover:border-white/30 disabled:opacity-20 transition-all"
          >
            <ArrowLeft size={15} />
          </button>
          {isLast ? (
            <button
              onClick={enterPlatform}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gcu-gold text-gcu-purple-dark font-black text-sm hover:bg-yellow-400 transition-colors"
            >
              Enter the Platform <ChevronRight size={15} />
            </button>
          ) : (
            <button
              onClick={goNext}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gcu-purple text-white font-bold text-sm hover:bg-gcu-purple/80 transition-colors"
            >
              Next <ArrowRight size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
