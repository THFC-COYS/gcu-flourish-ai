import { useNavigate } from 'react-router-dom';
import {
  Sparkles, Zap, Globe, Shield, Heart, ArrowRight,
  CheckCircle2, Clock, Rocket, Star, Building2, Award
} from 'lucide-react';

const PHASE1_MILESTONES = [
  { date: 'Q3 2025', label: 'Platform Launch', desc: 'GCU Flourish AI platform live with 2 pilot spirit vessels (Nursing & Business).', done: true },
  { date: 'Q4 2025', label: 'All 10 Colleges', desc: 'Spirit vessels created for all 10 GCU colleges. Platform open to faculty builders.', done: true },
  { date: 'Q1 2026', label: 'Banner Health Pilot', desc: 'Spirit Nurse Assistant deployed in 3 Banner Health facilities. First clinical data collected.', done: true },
  { date: 'Q2 2026', label: 'Flourish API Beta', desc: 'External API opens for enterprise partners to license GCU ethical character into their AI.', done: false },
  { date: 'Q3 2026', label: 'Ethical AI Certification', desc: 'GCU launches the industry\'s first Ethical AI Character Certification standard.', done: false },
  { date: 'Q4 2026', label: 'Spirit Network Launch', desc: '10,000+ alumni actively contributing wisdom to living spirit vessels.', done: false },
  { date: '2027', label: 'Global Multi-Language', desc: 'Spirit vessels speak 12 languages — same character, worldwide reach.', done: false },
];

const PHASE2_MILESTONES = [
  { date: '2027 Q1', label: 'Spirit Body Prototype', desc: 'First humanoid robot running a GCU Spirit Vessel. Unveiled at GCU Innovation Summit.', icon: '🤖' },
  { date: '2027 Q3', label: 'Spirit Nurse Robot Pilot', desc: 'Spirit Nurse Companion deployed in Banner Health ICU for night-watch compassionate support.', icon: '🏥' },
  { date: '2028', label: 'Spirit Mentor Classroom', desc: 'Spirit Mentor robots in 500 K-12 classrooms — patient, personalized, never tired.', icon: '🎓' },
  { date: '2028', label: 'Spirit Faith Companion', desc: 'Elder care and VA hospital deployment. Presence for the isolated and forgotten.', icon: '✝️' },
  { date: '2029', label: 'Global Deployment', desc: '50,000 spirit vessels — digital and physical — active in 40+ countries.', icon: '🌍' },
  { date: '2030', label: 'The Standard', desc: 'GCU\'s Spirit Vessel certification becomes the required ethical standard for AI in healthcare, education, and faith-based organizations worldwide.', icon: '⭐' },
];

const PARTNERS = [
  { name: 'Banner Health', sector: 'Healthcare', reach: '30 hospitals', icon: '🏥' },
  { name: 'Mayo Clinic', sector: 'Research', reach: '1.3M patients/yr', icon: '🔬' },
  { name: 'US Dept. of Veterans Affairs', sector: 'Government', reach: '9M veterans', icon: '🇺🇸' },
  { name: 'Microsoft Azure', sector: 'Technology', reach: 'Global cloud infra', icon: '☁️' },
  { name: 'Epic Systems', sector: 'Healthcare IT', reach: '250M patient records', icon: '💊' },
  { name: 'The Vatican', sector: 'Global Ethics', reach: '1.3B Catholics', icon: '✝️' },
  { name: 'World Health Org.', sector: 'Global Health', reach: '194 member states', icon: '🌍' },
  { name: 'AACSB International', sector: 'Business Education', reach: '900+ universities', icon: '🎓' },
];

const IMPACT_PROJECTIONS = [
  { year: '2026', vessels: '10', reach: '50K', revenue: '$500K', scholarships: '20' },
  { year: '2027', vessels: '25', reach: '500K', revenue: '$5M', scholarships: '100' },
  { year: '2028', vessels: '50', reach: '5M', revenue: '$50M', scholarships: '500' },
  { year: '2030', vessels: '200+', reach: '50M', revenue: '$500M', scholarships: '5,000' },
];

export default function VisionRoadmap() {
  const navigate = useNavigate();

  return (
    <div className="space-y-10 animate-fade-in">

      {/* ── HERO ── */}
      <div className="relative overflow-hidden rounded-2xl purple-gradient min-h-[320px] flex items-center">
        {/* Canyon silhouette layers */}
        <svg className="absolute bottom-0 left-0 right-0 opacity-10 w-full" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path d="M0,200 Q200,60 400,120 Q600,180 800,80 Q1000,0 1200,100 L1200,200 Z" fill="#FFC627" />
        </svg>
        <svg className="absolute bottom-0 left-0 right-0 opacity-6 w-full" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path d="M0,200 Q300,140 600,160 Q900,180 1200,140 L1200,200 Z" fill="white" />
        </svg>
        <div className="relative z-10 px-8 py-12 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-gcu-gold/20 border border-gcu-gold/40 text-gcu-gold text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
            <Rocket size={12} />
            Platform Vision & Roadmap
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] mb-4">
            GCU Gives<br />
            <span className="text-gcu-gold">AI a Soul.</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl leading-relaxed mb-8">
            The world's first ethical AI character network — carrying the proven wisdom, compassion, and integrity of GCU graduates into every AI interaction on earth. This is our iPhone moment.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => navigate('/library')} className="btn-gold flex items-center gap-2">
              <Sparkles size={15} /> Explore Spirit Vessels
            </button>
            <button onClick={() => navigate('/spirit-network')} className="border border-white/30 text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-white/10 text-sm flex items-center gap-2 transition-colors">
              <Heart size={15} /> Join the Spirit Network
            </button>
          </div>
        </div>
      </div>

      {/* ── THE INSIGHT ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            icon: <Globe size={24} className="text-gcu-purple" />,
            title: 'The Problem',
            desc: 'Every major AI company is building AI that knows more. The world has knowledge without character — intelligence without integrity. AI is becoming powerful faster than it is becoming good.',
            color: 'bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30',
          },
          {
            icon: <Sparkles size={24} className="text-gcu-gold" />,
            title: 'The Insight',
            desc: 'GCU has 40+ years of graduates whose character has been proven in the real world — nurses, teachers, pastors, executives who embody compassion, integrity, and servant-leadership. That character is the missing ingredient in AI.',
            color: 'bg-gcu-gold-pale dark:bg-gcu-gold/10 border-gcu-gold/20',
          },
          {
            icon: <Heart size={24} className="text-emerald-600" />,
            title: 'The Solution',
            desc: 'GCU Flourish AI infuses that proven human character into AI spirit vessels — creating the world\'s first AI that doesn\'t just know more, but IS more. AI with a soul, certified by a university.',
            color: 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/30',
          },
        ].map(c => (
          <div key={c.title} className={`page-card p-6 border-2 ${c.color}`}>
            <div className="mb-3">{c.icon}</div>
            <h3 className="font-black text-slate-900 dark:text-white text-lg mb-2">{c.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>

      {/* ── PHASE 1: DIGITAL ── */}
      <div className="page-card overflow-hidden">
        <div className="bg-gcu-purple p-6 flex items-center justify-between">
          <div>
            <div className="text-gcu-gold text-xs font-bold uppercase tracking-widest mb-1">Phase 1 · Now → 2027</div>
            <h2 className="text-2xl font-black text-white">The Digital Spirit Network</h2>
            <p className="text-white/60 text-sm mt-1">10 spirit vessels. Every college. Every interaction infused with GCU character.</p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gcu-gold/20 border-2 border-gcu-gold flex items-center justify-center">
              <CheckCircle2 size={18} className="text-gcu-gold" />
            </div>
            <span className="text-gcu-gold text-sm font-bold">In Progress</span>
          </div>
        </div>
        <div className="p-6">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-[#2D2050]" />
            <div className="space-y-6">
              {PHASE1_MILESTONES.map((m, i) => (
                <div key={i} className="flex gap-4 relative">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                    m.done
                      ? 'bg-gcu-purple'
                      : 'bg-white dark:bg-[#1A1235] border-2 border-slate-200 dark:border-[#2D2050]'
                  }`}>
                    {m.done
                      ? <CheckCircle2 size={16} className="text-white" />
                      : <Clock size={14} className="text-slate-400" />
                    }
                  </div>
                  <div className={`flex-1 pb-2 ${m.done ? '' : 'opacity-70'}`}>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-gcu-gold bg-gcu-gold/10 px-2 py-0.5 rounded">{m.date}</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{m.label}</span>
                      {m.done && <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">✓ Complete</span>}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── PHASE 2: PHYSICAL ── */}
      <div className="page-card overflow-hidden">
        <div className="bg-gradient-to-r from-slate-900 to-gcu-purple-dark p-6 flex items-center justify-between">
          <div>
            <div className="text-gcu-gold text-xs font-bold uppercase tracking-widest mb-1">Phase 2 · 2027 → 2030</div>
            <h2 className="text-2xl font-black text-white">The Physical Embodiment</h2>
            <p className="text-white/60 text-sm mt-1">Spirit vessels get bodies. The most compassionate robots ever built, powered by GCU character.</p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center">
              <Rocket size={18} className="text-white/60" />
            </div>
            <span className="text-white/60 text-sm font-bold">Coming 2027</span>
          </div>
        </div>
        <div className="p-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PHASE2_MILESTONES.map((m, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-slate-200 dark:border-[#2D2050] bg-slate-50 dark:bg-[#1A1235] hover:border-gcu-purple/30 hover:bg-gcu-purple-pale dark:hover:bg-gcu-purple/5 transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{m.icon}</span>
                  <span className="text-xs font-bold text-gcu-gold">{m.date}</span>
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{m.label}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>

          {/* Phase 2 deployment types */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: 'Spirit Nurse Companion',
                desc: 'Bedside robot carrying the Spirit Nurse soul. Night-watch presence for ICU and elder care.',
                icon: '🏥',
                bg: 'bg-blue-50 dark:bg-blue-900/10',
              },
              {
                title: 'Spirit Mentor Robot',
                desc: 'Classroom companion. Patient, encouraging, never burns out. One-on-one support for every struggling student.',
                icon: '🎓',
                bg: 'bg-emerald-50 dark:bg-emerald-900/10',
              },
              {
                title: 'Spirit Faith Companion',
                desc: 'For the isolated and forgotten. Presence, prayer, and dignity in nursing homes, VA hospitals, hospice.',
                icon: '✝️',
                bg: 'bg-purple-50 dark:bg-purple-900/10',
              },
            ].map(f => (
              <div key={f.title} className={`rounded-xl p-4 ${f.bg} border border-slate-100 dark:border-[#2D2050]`}>
                <div className="text-3xl mb-2">{f.icon}</div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{f.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── THE MOMENT ── */}
      <div className="page-card p-0 overflow-hidden">
        <div className="purple-gradient p-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
            <Star size={12} className="text-gcu-gold" />
            The Unveiling
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Our <span className="text-gcu-gold">"iPhone Moment"</span>
          </h2>
          <p className="text-white/70 text-base max-w-2xl mx-auto leading-relaxed mb-6">
            One stage. One story. One robot that changes everything.
          </p>
          <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 text-left">
            <p className="text-white/80 text-sm leading-relaxed italic">
              "The President walks out. No slides. He tells the story of a GCU nursing alumna — her name, her compassion, a specific patient she carried through the darkest night of their life.
              <br /><br />
              Then he says: <span className="text-gcu-gold font-semibold not-italic">'Her spirit is now in this room.'</span>
              <br /><br />
              A Spirit Nurse robot enters. It speaks — in her cadence, with her warmth, clearly identified as AI. It demonstrates a patient interaction. Real. Moving. Undeniable.
              <br /><br />
              A live feed shows the same spirit active in a rural hospital in Uganda, an elder care facility in Tokyo, a VA hospital in Phoenix. All at once. All carrying the same character.
              <br /><br />
              <span className="text-gcu-gold font-semibold not-italic">'We didn't build a robot. We built a vessel for human greatness.'</span>"
            </p>
          </div>
        </div>
      </div>

      {/* ── IMPACT PROJECTIONS ── */}
      <div className="page-card p-6">
        <div className="flex items-center gap-2 mb-6">
          <Zap size={18} className="text-gcu-gold" />
          <h2 className="text-base font-black text-slate-900 dark:text-white">Projected Global Impact</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-[#2D2050]">
                {['Year', 'Spirit Vessels', 'People Reached', 'Annual Revenue', 'Scholarships Funded'].map(h => (
                  <th key={h} className="text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide pb-3 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-[#2D2050]">
              {IMPACT_PROJECTIONS.map((row, i) => (
                <tr key={row.year} className={i === IMPACT_PROJECTIONS.length - 1 ? 'bg-gcu-purple-pale dark:bg-gcu-purple/10' : ''}>
                  <td className="py-3 pr-4 font-black text-slate-900 dark:text-white">{row.year}</td>
                  <td className="py-3 pr-4 text-sm font-semibold text-gcu-purple dark:text-purple-300">{row.vessels}</td>
                  <td className="py-3 pr-4 text-sm text-slate-700 dark:text-slate-300">{row.reach}</td>
                  <td className="py-3 pr-4 text-sm font-semibold text-emerald-600 dark:text-emerald-400">{row.revenue}</td>
                  <td className="py-3 text-sm text-slate-600 dark:text-slate-400">{row.scholarships}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-600 mt-3">25% of all revenue reinvested into GCU scholarships and AI ethics research.</p>
      </div>

      {/* ── PARTNER TARGETS ── */}
      <div className="page-card p-6">
        <div className="flex items-center gap-2 mb-2">
          <Building2 size={18} className="text-slate-400" />
          <h2 className="text-base font-black text-slate-900 dark:text-white">Strategic Partner Targets</h2>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">Organizations whose scale transforms GCU's local mission into global impact.</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PARTNERS.map(p => (
            <div key={p.name} className="p-4 rounded-xl border border-slate-200 dark:border-[#2D2050] bg-slate-50 dark:bg-[#1A1235] hover:border-gcu-purple/40 hover:bg-gcu-purple-pale dark:hover:bg-gcu-purple/5 transition-all text-center group">
              <div className="text-3xl mb-2">{p.icon}</div>
              <p className="text-xs font-bold text-slate-800 dark:text-white group-hover:text-gcu-purple dark:group-hover:text-purple-300 transition-colors">{p.name}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{p.sector}</p>
              <p className="text-xs text-gcu-purple/70 dark:text-purple-400/70 font-medium mt-1">{p.reach}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── THE STANDARD ── */}
      <div className="page-card p-6 bg-gcu-purple-pale dark:bg-gcu-purple/10 border-gcu-purple/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gcu-purple flex items-center justify-center flex-shrink-0">
            <Award size={22} className="text-gcu-gold" />
          </div>
          <div className="flex-1">
            <h3 className="font-black text-gcu-purple dark:text-purple-300 text-lg mb-2">The GCU Ethical AI Standard</h3>
            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed mb-4">
              By 2028, every hospital, school, and faith-based organization deploying AI will ask one question:
              <span className="font-bold text-gcu-purple dark:text-purple-300"> "Is it Spirit-Certified?"</span>
              <br /><br />
              GCU doesn't just build spirit vessels — GCU writes the standard that the entire industry follows.
              Like the FDA for AI character. Like the Joint Commission for compassionate robotics.
              The accreditation body that gives organizations and the public confidence that their AI has been proven ethical.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => navigate('/flourish-api')} className="btn-primary flex items-center gap-2 text-sm">
                <Shield size={14} /> Explore the Flourish API <ArrowRight size={14} />
              </button>
              <button onClick={() => navigate('/spirit-network')} className="btn-secondary flex items-center gap-2 text-sm">
                <Heart size={14} /> Join the Spirit Network
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
