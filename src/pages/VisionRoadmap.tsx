import { useNavigate } from 'react-router-dom';
import {
  Sparkles, Zap, Globe, Shield, Heart, ArrowRight,
  CheckCircle2, Clock, Rocket, Star, Building2, Award, Users, TrendingUp
} from 'lucide-react';

const GLOBAL_REGIONS = [
  {
    region: 'North America',
    flag: '🇺🇸',
    institutions: '2,800+',
    focus: 'Christian universities, healthcare, military chaplaincy',
    status: 'Active',
    statusColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    highlights: ['Banner Health', 'US Military Chaplains', 'GCU Partner Network'],
    color: 'border-emerald-300 dark:border-emerald-700',
    population: '350M',
  },
  {
    region: 'Latin America',
    flag: '🌎',
    institutions: '3,400+',
    focus: 'Catholic & evangelical universities, pastoral networks',
    status: 'Year 2 Target',
    statusColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    highlights: ['Brazil evangelical network (50M believers)', 'Colombia, Mexico, Argentina', 'Portuguese + Spanish Spirit Vessels'],
    color: 'border-blue-300 dark:border-blue-700',
    population: '660M',
  },
  {
    region: 'Sub-Saharan Africa',
    flag: '🌍',
    institutions: '8,200+',
    focus: 'Fastest-growing Christian population on earth',
    status: 'Year 3 Target',
    statusColor: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    highlights: ['Nigeria, Kenya, Ethiopia, South Africa', '700M+ Christians by 2030', 'Healthcare deserts — AI fills the gap'],
    color: 'border-yellow-300 dark:border-yellow-700',
    population: '1.4B',
  },
  {
    region: 'Middle East & North Africa',
    flag: '🕌',
    institutions: '1,200+',
    focus: 'Interfaith ethics AI, minority Christian communities',
    status: 'Year 3 Target',
    statusColor: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    highlights: ['UAE, Jordan, Lebanon', 'Human dignity AI applicable across faiths', 'Government AI ethics partnerships'],
    color: 'border-orange-300 dark:border-orange-700',
    population: '600M',
  },
  {
    region: 'Asia-Pacific',
    flag: '🌏',
    institutions: '12,000+',
    focus: 'South Korea, Philippines, India, Australia — growing Christian presence',
    status: 'Year 3 Target',
    statusColor: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    highlights: ['Philippines (90% Catholic)', 'South Korea (Christian university system)', 'India evangelical networks'],
    color: 'border-purple-300 dark:border-purple-700',
    population: '4.6B',
  },
  {
    region: 'Europe',
    flag: '🇪🇺',
    institutions: '5,400+',
    focus: 'EU AI Act compliance + Christian heritage institutions',
    status: 'Year 2 Target',
    statusColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    highlights: ['UK, Germany, Netherlands, Poland', 'EU AI Act alignment = Flourish Standard advantage', 'Church of England, Catholic educational networks'],
    color: 'border-blue-300 dark:border-blue-700',
    population: '450M',
  },
];

const PHASE1_MILESTONES = [
  { date: 'Q3 2025', label: 'Platform Launch', desc: 'GCU Flourish AI platform live with 2 pilot spirit vessels (Nursing & Business).', done: true },
  { date: 'Q4 2025', label: 'All 10 Colleges', desc: 'Spirit vessels created for all 10 GCU colleges. Platform open to faculty builders.', done: true },
  { date: 'Q1 2026', label: '3 External Partner Pilots', desc: 'Pilot Spirit Vessels with 3 external partners (Banner Health, SUSD, AZ Church Network). First real-world data collected.', done: false },
  { date: 'Q2 2026', label: 'Flourish API Beta', desc: 'External API opens for enterprise partners to license GCU ethical character into their AI.', done: false },
  { date: 'Q3 2026', label: 'Ethical AI Certification', desc: 'GCU launches the industry\'s first Ethical AI Character Certification standard.', done: false },
  { date: 'Q4 2026', label: 'Spirit Network Launch', desc: '10,000+ alumni actively contributing wisdom to living spirit vessels.', done: false },
  { date: '2027', label: 'Global Multi-Language', desc: 'Spirit vessels speak 12 languages — same character, worldwide reach.', done: false },
  { date: '2027 Q2', label: 'Wearable API Launch', desc: 'Flourish API certified for smart glasses (Meta Ray-Ban, Apple) and enterprise AR. Spirit Vessels leave the screen and enter the field.', done: false },
];

const PHASE2_MILESTONES = [
  { date: '2027 Q1', label: 'Spirit Body Prototype', desc: 'First humanoid robot running a GCU Spirit Vessel. Unveiled at GCU Innovation Summit.', icon: '🤖' },
  { date: '2027 Q3', label: 'Spirit Nurse Robot Pilot', desc: 'Spirit Nurse Companion deployed in Banner Health ICU for night-watch compassionate support.', icon: '🏥' },
  { date: '2028', label: 'Spirit Mentor Classroom', desc: 'Spirit Mentor robots in 500 K-12 classrooms — patient, personalized, never tired.', icon: '🎓' },
  { date: '2028', label: 'Spirit Faith Companion', desc: 'Elder care and VA hospital deployment. Presence for the isolated and forgotten.', icon: '✝️' },
  { date: '2029', label: 'Global Deployment', desc: '50,000 spirit vessels — digital and physical — active in 40+ countries.', icon: '🌍' },
  { date: '2030', label: 'The Standard', desc: 'GCU\'s Spirit Vessel certification becomes the required ethical standard for AI in healthcare, education, and faith-based organizations worldwide.', icon: '⭐' },
];

const PHASE3_MILESTONES = [
  { date: '2027 Q2', label: 'Flourish API on Smart Glasses', desc: 'Spirit Vessels streamed live to Meta Ray-Ban smart glasses. Nurses see patient vitals + compassionate prompts in their field of vision. Teachers get real-time student engagement coaching.', icon: '👓' },
  { date: '2027 Q4', label: 'Enterprise AR Rollout', desc: 'Apple Vision Pro and Meta Quest enterprise integrations. Spirit Vessels become ambient work companions — always present, never intrusive.', icon: '🥽' },
  { date: '2028 Q2', label: 'Neural Interface Beta', desc: 'Flourish API connects to Synchron BrainOS and early Neuralink developer program — silent, thought-triggered Spirit guidance for users with accessibility needs and elite professionals.', icon: '🧠' },
  { date: '2028 Q4', label: 'Wearable Spirit Certification', desc: 'GCU certifies Spirit-Safe wearable AI interactions — the first ethical standard for ambient, always-on AI companions worn on the body.', icon: '🏅' },
  { date: '2029', label: '1 Billion Wearable Moments', desc: 'Spirit Vessels embedded in 50M+ wearable devices globally. A nurse in Lagos, a teacher in Seoul, a pastor in São Paulo — all receiving Spirit guidance in real time.', icon: '🌍' },
];

const WEARABLE_DEVICES = [
  {
    name: 'Meta Ray-Ban Smart Glasses',
    company: 'Meta',
    icon: '👓',
    color: 'bg-blue-50 dark:bg-blue-900/15',
    border: 'border-blue-200 dark:border-blue-800',
    useCase: 'Real-time Spirit coaching overlaid in field of vision. Nurses see patient context + care prompts. Teachers see student engagement signals.',
    timeline: '2027',
    status: 'Priority target',
  },
  {
    name: 'Apple Vision Pro',
    company: 'Apple',
    icon: '🥽',
    color: 'bg-slate-50 dark:bg-slate-800/30',
    border: 'border-slate-200 dark:border-slate-700',
    useCase: 'Immersive Spirit simulations for training. Surgeons, engineers, and social workers practice scenarios in full spatial environments.',
    timeline: '2027',
    status: 'Priority target',
  },
  {
    name: 'Neuralink N1',
    company: 'Neuralink',
    icon: '🧠',
    color: 'bg-purple-50 dark:bg-purple-900/15',
    border: 'border-purple-200 dark:border-purple-800',
    useCase: 'Silent, thought-triggered Spirit guidance. Zero-latency ethical prompts for high-stakes decisions. Accessibility: communication for non-verbal users.',
    timeline: '2028',
    status: 'Exploratory',
  },
  {
    name: 'Synchron BrainOS',
    company: 'Synchron',
    icon: '⚡',
    color: 'bg-amber-50 dark:bg-amber-900/15',
    border: 'border-amber-200 dark:border-amber-800',
    useCase: 'FDA-cleared neural interface. Spirit Vessels accessible to paralyzed and locked-in patients — dignity and connection restored through thought alone.',
    timeline: '2028',
    status: 'Exploratory',
  },
  {
    name: 'Samsung Galaxy AR Ring',
    company: 'Samsung',
    icon: '💍',
    color: 'bg-teal-50 dark:bg-teal-900/15',
    border: 'border-teal-200 dark:border-teal-800',
    useCase: 'Haptic Spirit prompts — a gentle pulse when ethical guidance is recommended. Ambient wellness coaching through biometric-triggered Spirit interventions.',
    timeline: '2028',
    status: 'Exploratory',
  },
  {
    name: 'Meta Quest Enterprise',
    company: 'Meta',
    icon: '🎮',
    color: 'bg-indigo-50 dark:bg-indigo-900/15',
    border: 'border-indigo-200 dark:border-indigo-800',
    useCase: 'Full-immersion Spirit simulation training. Medical, legal, and pastoral care scenarios in photorealistic virtual environments.',
    timeline: '2027',
    status: 'Priority target',
  },
];

const WORKER_USE_CASES = [
  {
    role: 'ICU Nurse',
    device: 'Meta Ray-Ban Glasses',
    icon: '🏥',
    moment: 'Walking to Room 4B. Spirit Nurse whispers: "Patient reported anxiety about surgery. Last interaction: daughter visited 2hrs ago. Suggested opener: ask how she\'s feeling."',
    impact: 'Every patient interaction is personalized before the nurse enters the room.',
  },
  {
    role: 'K-12 Teacher',
    device: 'Smart Glasses',
    icon: '🎓',
    moment: 'Mid-lesson. Spirit Mentor overlay: "Marcus — disengaged 8 min. Check in privately after class. Suggested: \'You seem quiet today — everything okay?\'"',
    impact: 'No student slips through unnoticed. The teacher\'s instincts, amplified.',
  },
  {
    role: 'Hospital Chaplain',
    device: 'Earpiece + AR Overlay',
    icon: '✝️',
    moment: 'Entering palliative care. Spirit Faith Companion: "Patient is Muslim. Family present. Culturally: avoid direct reference to death. Focus on peace, legacy, being surrounded by love."',
    impact: 'Culturally competent spiritual care at the bedside — for every tradition.',
  },
  {
    role: 'Field Engineer',
    device: 'Apple Vision Pro',
    icon: '⚙️',
    moment: 'Reviewing bridge design overlay. Spirit Innovator: "Flagged: load calculation uses 2019 standard. Updated 2024 seismic code changes this tolerance by 12%. Review before sign-off."',
    impact: 'Creation-care ethics and safety standards checked in real time.',
  },
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
  { name: 'Meta Reality Labs', sector: 'Smart Glasses / AR', reach: '3B+ users', icon: '👓' },
  { name: 'Apple Vision', sector: 'Spatial Computing', reach: 'Enterprise AR', icon: '🥽' },
  { name: 'Neuralink', sector: 'Neural Interface', reach: 'Next frontier', icon: '🧠' },
  { name: 'Synchron', sector: 'FDA-cleared BCI', reach: 'Accessibility + elite', icon: '⚡' },
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

      {/* ── PHASE 3: WEARABLES ── */}
      <div className="page-card overflow-hidden">
        <div className="bg-gradient-to-r from-[#0D0920] via-[#1A0A3E] to-slate-900 p-6 flex items-center justify-between">
          <div>
            <div className="text-gcu-gold text-xs font-bold uppercase tracking-widest mb-1">Phase 3 · 2027 → 2029</div>
            <h2 className="text-2xl font-black text-white">The Wearable Spirit Network</h2>
            <p className="text-white/60 text-sm mt-1">Spirit Vessels leave the screen. Smart glasses, neural interfaces, and AR — Spirit guidance at the point of need.</p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-3xl">👓</span>
            <span className="text-white/40 text-sm font-bold">Coming 2027</span>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Simulated disclaimer */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl p-3 flex items-start gap-2">
            <span className="text-amber-500 flex-shrink-0">⚠</span>
            <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">All wearable integrations and neural interface partnerships shown below are conceptual targets — not confirmed. Simulated for demonstration purposes only.</p>
          </div>

          {/* Phase 3 timeline */}
          <div className="relative">
            <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-[#2D2050]" />
            <div className="space-y-5">
              {PHASE3_MILESTONES.map((m, i) => (
                <div key={i} className="flex gap-4 relative">
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-[#1A1235] border-2 border-slate-200 dark:border-[#2D2050] flex items-center justify-center flex-shrink-0 z-10 text-sm">
                    {m.icon}
                  </div>
                  <div className="flex-1 pb-2 opacity-80">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-gcu-gold bg-gcu-gold/10 px-2 py-0.5 rounded">{m.date}</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{m.label}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Device showcase */}
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white mb-1">Target Devices & Platforms</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">The Flourish API is device-agnostic — any wearable that can make an API call can host a Spirit Vessel.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {WEARABLE_DEVICES.map(device => (
                <div key={device.name} className={`rounded-xl p-4 border ${device.color} ${device.border}`}>
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl flex-shrink-0">{device.icon}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{device.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-slate-500 dark:text-slate-400">{device.company}</span>
                        <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${device.status === 'Priority target' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'}`}>
                          {device.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{device.useCase}</p>
                  <p className="text-xs text-gcu-purple dark:text-purple-400 font-semibold mt-2">Target: {device.timeline}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Real-world worker moments */}
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white mb-1">Spirit in the Field — Real-Time Worker Moments</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">The most powerful Spirit Vessel is the one that shows up exactly when a worker needs it — before they even know they need it.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {WORKER_USE_CASES.map(uc => (
                <div key={uc.role} className="rounded-xl border border-slate-200 dark:border-[#2D2050] bg-slate-50 dark:bg-[#1A1235] p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{uc.icon}</span>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{uc.role}</p>
                      <p className="text-xs text-gcu-purple dark:text-purple-400 font-medium">{uc.device}</p>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-[#0F0A1E] border border-slate-200 dark:border-[#2D2050] rounded-lg p-3 mb-3">
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wide mb-1">Spirit says:</p>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">"{uc.moment}"</p>
                  </div>
                  <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">→ {uc.impact}</p>
                </div>
              ))}
            </div>
          </div>

          {/* The Neuralink vision */}
          <div className="rounded-2xl bg-gradient-to-r from-[#0D0920] to-[#1A0A3E] p-6 border border-purple-900/40">
            <div className="flex items-start gap-4">
              <span className="text-4xl flex-shrink-0">🧠</span>
              <div>
                <div className="text-xs font-bold text-gcu-gold uppercase tracking-widest mb-1">The Long Horizon · 2028+</div>
                <h4 className="text-lg font-black text-white mb-2">When Spirit Becomes Thought</h4>
                <p className="text-sm text-white/60 leading-relaxed max-w-2xl">
                  Neural interfaces like Neuralink and Synchron represent the ultimate convergence: Spirit guidance that arrives not as a sound or image, but as a subtle, silent prompt — indistinguishable from intuition. A nurse who just <em>knows</em> to check on Room 7. A teacher who <em>feels</em> a student needs attention. The GCU spirit, woven into human consciousness itself.
                </p>
                <p className="text-xs text-gcu-gold/60 mt-3 italic">⚠ Exploratory concept · Dependent on neural interface technology maturity and regulatory approval · Not a current product</p>
              </div>
            </div>
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

      {/* ── SPIRIT EVERYWHERE — VISUAL JOURNEY ── */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Rocket size={20} className="text-gcu-purple" />
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Spirit Everywhere</h2>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
          The Flourish platform does not end at a chat window. It is a layer of character that moves across every surface where people face moments that matter.
        </p>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

          {/* Scene 1 — Tablet at Bedside */}
          <div className="page-card overflow-hidden group">
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 h-52 flex items-end">
              {/* Room background */}
              <svg viewBox="0 0 320 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
                {/* Wall */}
                <rect width="320" height="200" fill="#1e293b" />
                {/* Window with soft glow */}
                <rect x="200" y="20" width="90" height="60" rx="4" fill="#0f172a" />
                <rect x="202" y="22" width="86" height="56" rx="3" fill="#1e3a5f" opacity="0.8" />
                <ellipse cx="245" cy="50" rx="30" ry="30" fill="#3b82f6" opacity="0.15" />
                {/* Bed */}
                <rect x="20" y="120" width="160" height="60" rx="6" fill="#334155" />
                <rect x="20" y="108" width="30" height="20" rx="4" fill="#475569" />
                <rect x="30" y="100" width="140" height="22" rx="6" fill="#94a3b8" opacity="0.3" />
                {/* Patient silhouette */}
                <ellipse cx="100" cy="105" rx="18" ry="18" fill="#64748b" />
                <rect x="30" y="118" width="140" height="30" rx="4" fill="#64748b" opacity="0.5" />
                {/* Nightstand */}
                <rect x="185" y="130" width="50" height="50" rx="4" fill="#1e293b" />
                <rect x="188" y="128" width="44" height="5" rx="2" fill="#334155" />
                {/* Tablet on nightstand */}
                <rect x="190" y="100" width="40" height="30" rx="4" fill="#0f172a" stroke="#6d28d9" strokeWidth="1.5" />
                <rect x="192" y="102" width="36" height="24" rx="2" fill="#1e1b4b" />
                {/* Tablet screen content */}
                <rect x="194" y="105" width="22" height="2" rx="1" fill="#a78bfa" opacity="0.8" />
                <rect x="194" y="109" width="30" height="1.5" rx="1" fill="#94a3b8" opacity="0.5" />
                <rect x="194" y="112" width="26" height="1.5" rx="1" fill="#94a3b8" opacity="0.4" />
                <circle cx="213" cy="119" rx="4" ry="4" fill="#6d28d9" opacity="0.6" />
                <text x="211" y="121" fontSize="4" fill="white" textAnchor="middle">AI</text>
                {/* Purple glow from tablet */}
                <ellipse cx="210" cy="115" rx="25" ry="20" fill="#6d28d9" opacity="0.08" />
                {/* Soft ambient light */}
                <ellipse cx="160" cy="180" rx="120" ry="30" fill="#6d28d9" opacity="0.05" />
              </svg>
              <div className="relative z-10 p-4">
                <span className="text-xs font-bold text-gcu-gold uppercase tracking-widest">Now · Phase 1</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-black text-slate-900 dark:text-white mb-1">Bedside Companion</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Spirit Nurse on a tablet at 2 AM. A patient wakes confused about their diagnosis. No one is there — except Spirit, who stays, listens, and knows when to say "call your nurse right now."</p>
            </div>
          </div>

          {/* Scene 2 — Hospital Lobby Kiosk */}
          <div className="page-card overflow-hidden group">
            <div className="relative bg-gradient-to-br from-slate-700 to-slate-900 h-52 flex items-end">
              <svg viewBox="0 0 320 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
                {/* Lobby floor */}
                <rect width="320" height="200" fill="#1e293b" />
                <rect y="160" width="320" height="40" fill="#0f172a" />
                {/* Floor reflection */}
                <rect y="158" width="320" height="4" fill="#334155" opacity="0.5" />
                {/* Back wall windows */}
                <rect x="0" y="0" width="320" height="80" fill="#0f172a" />
                {/* Large lobby windows */}
                <rect x="10" y="10" width="80" height="65" rx="3" fill="#1e3a5f" opacity="0.7" />
                <rect x="100" y="10" width="80" height="65" rx="3" fill="#1e3a5f" opacity="0.7" />
                <rect x="190" y="10" width="80" height="65" rx="3" fill="#1e3a5f" opacity="0.7" />
                <rect x="280" y="10" width="35" height="65" rx="3" fill="#1e3a5f" opacity="0.7" />
                {/* Kiosk stand */}
                <rect x="135" y="75" width="50" height="85" rx="4" fill="#334155" />
                <rect x="148" y="155" width="24" height="8" rx="2" fill="#1e293b" />
                {/* Kiosk screen */}
                <rect x="128" y="55" width="64" height="48" rx="6" fill="#0f172a" stroke="#6d28d9" strokeWidth="2" />
                <rect x="131" y="58" width="58" height="40" rx="4" fill="#1e1b4b" />
                {/* Avatar on screen */}
                <ellipse cx="160" cy="72" rx="10" ry="10" fill="#6d28d9" opacity="0.7" />
                <text x="160" y="75" fontSize="7" fill="white" textAnchor="middle" fontWeight="bold">AI</text>
                <rect x="134" y="86" width="30" height="2" rx="1" fill="#a78bfa" opacity="0.7" />
                <rect x="134" y="90" width="24" height="1.5" rx="1" fill="#94a3b8" opacity="0.4" />
                {/* Glow from screen */}
                <ellipse cx="160" cy="80" rx="35" ry="25" fill="#6d28d9" opacity="0.1" />
                {/* Waiting person silhouette */}
                <ellipse cx="80" cy="108" rx="12" ry="12" fill="#475569" />
                <rect x="68" y="118" width="24" height="35" rx="6" fill="#475569" opacity="0.8" />
                {/* Another person */}
                <ellipse cx="240" cy="112" rx="11" ry="11" fill="#475569" />
                <rect x="229" y="121" width="22" height="32" rx="6" fill="#475569" opacity="0.7" />
                {/* Signage */}
                <rect x="10" y="82" width="60" height="20" rx="3" fill="#1e293b" opacity="0.8" />
                <rect x="13" y="86" width="35" height="2" rx="1" fill="#94a3b8" opacity="0.4" />
                <rect x="13" y="90" width="28" height="1.5" rx="1" fill="#94a3b8" opacity="0.3" />
              </svg>
              <div className="relative z-10 p-4">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Now · Phase 1</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-black text-slate-900 dark:text-white mb-1">Hospital Lobby Kiosk</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">A family arrives at the ER not knowing what to do or who to ask. A Spirit kiosk in the lobby orients them, translates, and connects them to the right care team — before they ever reach the front desk.</p>
            </div>
          </div>

          {/* Scene 3 — Life-Size Avatar in Classroom */}
          <div className="page-card overflow-hidden group">
            <div className="relative bg-gradient-to-br from-indigo-950 to-slate-900 h-52 flex items-end">
              <svg viewBox="0 0 320 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
                {/* Classroom */}
                <rect width="320" height="200" fill="#1e1b4b" />
                {/* Floor */}
                <rect y="165" width="320" height="35" fill="#0f0a1e" />
                {/* Whiteboard */}
                <rect x="60" y="20" width="200" height="90" rx="4" fill="#f1f5f9" opacity="0.08" stroke="#4f46e5" strokeWidth="1" />
                {/* Student desks silhouettes */}
                <rect x="10" y="140" width="60" height="20" rx="3" fill="#312e81" opacity="0.6" />
                <rect x="80" y="140" width="60" height="20" rx="3" fill="#312e81" opacity="0.6" />
                <rect x="150" y="140" width="60" height="20" rx="3" fill="#312e81" opacity="0.6" />
                <rect x="220" y="140" width="80" height="20" rx="3" fill="#312e81" opacity="0.6" />
                {/* Student silhouettes */}
                <ellipse cx="40" cy="130" rx="10" ry="10" fill="#4338ca" opacity="0.7" />
                <ellipse cx="110" cy="130" rx="10" ry="10" fill="#4338ca" opacity="0.7" />
                <ellipse cx="180" cy="130" rx="10" ry="10" fill="#4338ca" opacity="0.7" />
                <ellipse cx="255" cy="130" rx="10" ry="10" fill="#4338ca" opacity="0.7" />
                {/* 2D Avatar — life-size projected on screen */}
                {/* Projection glow */}
                <ellipse cx="160" cy="80" rx="50" ry="60" fill="#6d28d9" opacity="0.12" />
                <ellipse cx="160" cy="80" rx="30" ry="45" fill="#6d28d9" opacity="0.1" />
                {/* Avatar figure — stylized 2D */}
                {/* Head */}
                <circle cx="160" cy="38" r="16" fill="#a78bfa" opacity="0.9" />
                {/* Face */}
                <circle cx="155" cy="35" r="2" fill="#1e1b4b" />
                <circle cx="165" cy="35" r="2" fill="#1e1b4b" />
                <path d="M154 42 Q160 47 166 42" stroke="#1e1b4b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                {/* Body */}
                <rect x="145" y="55" width="30" height="50" rx="8" fill="#7c3aed" opacity="0.85" />
                {/* GCU badge on chest */}
                <rect x="153" y="62" width="14" height="10" rx="2" fill="#fbbf24" opacity="0.8" />
                <text x="160" y="70" fontSize="4" fill="#1e1b4b" textAnchor="middle" fontWeight="bold">GCU</text>
                {/* Arms */}
                <path d="M145 65 Q130 75 132 90" stroke="#7c3aed" strokeWidth="8" strokeLinecap="round" fill="none" />
                <path d="M175 65 Q190 75 188 90" stroke="#7c3aed" strokeWidth="8" strokeLinecap="round" fill="none" />
                {/* Legs */}
                <rect x="148" y="104" width="10" height="30" rx="5" fill="#5b21b6" opacity="0.85" />
                <rect x="162" y="104" width="10" height="30" rx="5" fill="#5b21b6" opacity="0.85" />
                {/* Vertical light beam from projector */}
                <rect x="155" y="0" width="10" height="20" fill="#a78bfa" opacity="0.05" />
                {/* "SPIRIT TEACHER LIVE" label */}
                <rect x="110" y="15" width="100" height="14" rx="3" fill="#6d28d9" opacity="0.7" />
                <text x="160" y="25" fontSize="6" fill="white" textAnchor="middle" fontWeight="bold" letterSpacing="1">SPIRIT TEACHER · LIVE</text>
              </svg>
              <div className="relative z-10 p-4">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Phase 2 · 2026</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-black text-slate-900 dark:text-white mb-1">Life-Size Classroom Avatar</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Spirit Teacher projected life-size at the front of a classroom. Not a slide deck — a presence. Responds to student questions in real time, adapts to the room, remembers who struggled last Tuesday.</p>
            </div>
          </div>

          {/* Scene 4 — Wearable POV */}
          <div className="page-card overflow-hidden group">
            <div className="relative bg-gradient-to-br from-slate-900 to-emerald-950 h-52 flex items-end">
              <svg viewBox="0 0 320 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
                {/* Wearable lens view — slight barrel distortion feel via rounded rect mask */}
                <defs>
                  <radialGradient id="lensVignette" cx="50%" cy="50%" r="50%">
                    <stop offset="70%" stopColor="transparent" />
                    <stop offset="100%" stopColor="#000" stopOpacity="0.6" />
                  </radialGradient>
                </defs>
                {/* Scene: looking at a patient chart on a desk */}
                <rect width="320" height="200" fill="#0f1a0f" />
                {/* Desk surface */}
                <rect x="0" y="110" width="320" height="90" rx="0" fill="#1a2e1a" />
                {/* Chart / clipboard */}
                <rect x="80" y="80" width="160" height="100" rx="6" fill="#f8fafc" opacity="0.9" />
                <rect x="88" y="90" width="80" height="6" rx="2" fill="#334155" opacity="0.5" />
                <rect x="88" y="100" width="120" height="3" rx="1" fill="#94a3b8" opacity="0.4" />
                <rect x="88" y="106" width="100" height="3" rx="1" fill="#94a3b8" opacity="0.35" />
                <rect x="88" y="112" width="110" height="3" rx="1" fill="#94a3b8" opacity="0.35" />
                <rect x="88" y="118" width="90" height="3" rx="1" fill="#94a3b8" opacity="0.3" />
                {/* AR overlay on chart — green highlight boxes */}
                <rect x="85" y="96" width="88" height="9" rx="2" fill="#10b981" opacity="0.2" stroke="#10b981" strokeWidth="1" />
                <rect x="85" y="108" width="116" height="9" rx="2" fill="#6d28d9" opacity="0.15" stroke="#a78bfa" strokeWidth="0.8" />
                {/* HUD elements — AR corners */}
                <path d="M10 10 L10 30 M10 10 L30 10" stroke="#10b981" strokeWidth="2" fill="none" opacity="0.7" />
                <path d="M310 10 L310 30 M310 10 L290 10" stroke="#10b981" strokeWidth="2" fill="none" opacity="0.7" />
                <path d="M10 190 L10 170 M10 190 L30 190" stroke="#10b981" strokeWidth="2" fill="none" opacity="0.7" />
                <path d="M310 190 L310 170 M310 190 L290 190" stroke="#10b981" strokeWidth="2" fill="none" opacity="0.7" />
                {/* Spirit AI overlay panel — top right */}
                <rect x="198" y="14" width="110" height="65" rx="6" fill="#0f172a" opacity="0.88" stroke="#6d28d9" strokeWidth="1" />
                <rect x="202" y="18" width="40" height="40" rx="4" fill="#6d28d9" opacity="0.4" />
                <circle cx="222" cy="38" r="10" fill="#a78bfa" opacity="0.7" />
                <text x="222" y="41" fontSize="6" fill="white" textAnchor="middle" fontWeight="bold">AI</text>
                <rect x="248" y="22" width="55" height="3" rx="1" fill="#a78bfa" opacity="0.7" />
                <rect x="248" y="28" width="45" height="2" rx="1" fill="#94a3b8" opacity="0.5" />
                <rect x="248" y="33" width="50" height="2" rx="1" fill="#94a3b8" opacity="0.4" />
                <rect x="248" y="38" width="40" height="2" rx="1" fill="#94a3b8" opacity="0.4" />
                <rect x="248" y="44" width="52" height="2" rx="1" fill="#94a3b8" opacity="0.35" />
                <rect x="202" y="62" width="100" height="12" rx="3" fill="#6d28d9" opacity="0.5" />
                <text x="252" y="71" fontSize="5" fill="white" textAnchor="middle">Spirit Nurse · Listening</text>
                {/* Pulse / vitals indicator */}
                <rect x="12" y="14" width="100" height="22" rx="4" fill="#0f172a" opacity="0.85" stroke="#10b981" strokeWidth="0.8" />
                <path d="M16 25 L28 25 L32 18 L36 32 L40 22 L44 25 L108 25" stroke="#10b981" strokeWidth="1.5" fill="none" />
                <text x="16" y="44" fontSize="5" fill="#10b981" opacity="0.8">VITALS NORMAL</text>
                {/* Lens vignette */}
                <rect width="320" height="200" fill="url(#lensVignette)" />
              </svg>
              <div className="relative z-10 p-4">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Phase 3 · 2027</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-black text-slate-900 dark:text-white mb-1">Wearable AR — Nurse's View</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">A GCU-trained nurse wears Spirit-powered smart glasses. As she reviews a chart, Spirit overlays context, flags anomalies, and whispers a quiet reminder: "Last time this patient refused the medication — here's why."</p>
            </div>
          </div>

          {/* Scene 5 — Robot at Nursing Station */}
          <div className="page-card overflow-hidden group md:col-span-2 xl:col-span-1">
            <div className="relative bg-gradient-to-br from-slate-900 to-purple-950 h-52 flex items-end">
              <svg viewBox="0 0 320 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
                {/* Nursing station */}
                <rect width="320" height="200" fill="#1e1b4b" />
                {/* Floor */}
                <rect y="170" width="320" height="30" fill="#0f0a1e" />
                {/* Counter */}
                <rect x="0" y="115" width="320" height="55" rx="0" fill="#312e81" opacity="0.5" />
                <rect x="0" y="112" width="320" height="6" rx="2" fill="#4f46e5" opacity="0.4" />
                {/* Computer monitors on desk */}
                <rect x="20" y="80" width="55" height="35" rx="3" fill="#0f172a" stroke="#4f46e5" strokeWidth="1" />
                <rect x="22" y="82" width="51" height="28" rx="2" fill="#1e1b4b" />
                <rect x="25" y="85" width="30" height="2" rx="1" fill="#818cf8" opacity="0.6" />
                <rect x="25" y="89" width="42" height="1.5" rx="1" fill="#64748b" opacity="0.4" />
                <rect x="25" y="93" width="38" height="1.5" rx="1" fill="#64748b" opacity="0.4" />
                <rect x="240" y="82" width="55" height="33" rx="3" fill="#0f172a" stroke="#4f46e5" strokeWidth="1" />
                <rect x="242" y="84" width="51" height="26" rx="2" fill="#1e1b4b" />
                <rect x="245" y="87" width="28" height="2" rx="1" fill="#818cf8" opacity="0.6" />
                <rect x="245" y="91" width="40" height="1.5" rx="1" fill="#64748b" opacity="0.4" />
                {/* Nurse silhouette at desk */}
                <ellipse cx="50" cy="105" rx="10" ry="10" fill="#4338ca" />
                <rect x="40" y="114" width="20" height="10" rx="4" fill="#4338ca" opacity="0.7" />
                {/* ROBOT — center stage */}
                {/* Base / wheels */}
                <ellipse cx="160" cy="168" rx="28" ry="8" fill="#4f46e5" opacity="0.5" />
                {/* Body */}
                <rect x="140" y="100" width="40" height="65" rx="10" fill="#4f46e5" opacity="0.85" />
                {/* Body highlight */}
                <rect x="143" y="103" width="15" height="55" rx="6" fill="white" opacity="0.06" />
                {/* Arms */}
                <path d="M140 120 Q118 130 115 145" stroke="#4f46e5" strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.9" />
                <path d="M180 120 Q202 130 205 145" stroke="#4f46e5" strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.9" />
                {/* Hand holding tray */}
                <rect x="100" y="143" width="30" height="6" rx="3" fill="#6366f1" opacity="0.8" />
                <rect x="104" y="136" width="5" height="8" rx="2" fill="#a78bfa" opacity="0.6" />
                <rect x="112" y="132" width="5" height="12" rx="2" fill="#a78bfa" opacity="0.6" />
                <rect x="120" y="135" width="5" height="9" rx="2" fill="#a78bfa" opacity="0.6" />
                {/* Head */}
                <rect x="143" y="62" width="34" height="40" rx="10" fill="#4f46e5" opacity="0.9" />
                {/* Screen face */}
                <rect x="147" y="67" width="26" height="26" rx="5" fill="#1e1b4b" />
                {/* Eyes (friendly) */}
                <ellipse cx="155" cy="78" rx="4" ry="5" fill="#a78bfa" />
                <ellipse cx="167" cy="78" rx="4" ry="5" fill="#a78bfa" />
                <ellipse cx="155" cy="79" rx="2.5" ry="3" fill="white" opacity="0.9" />
                <ellipse cx="167" cy="79" rx="2.5" ry="3" fill="white" opacity="0.9" />
                {/* Smile */}
                <path d="M152 88 Q160 93 168 88" stroke="#a78bfa" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                {/* GCU badge */}
                <rect x="150" y="108" width="20" height="12" rx="3" fill="#fbbf24" opacity="0.85" />
                <text x="160" y="117" fontSize="5" fill="#1e1b4b" textAnchor="middle" fontWeight="bold">GCU</text>
                {/* Ambient glow */}
                <ellipse cx="160" cy="140" rx="45" ry="20" fill="#6d28d9" opacity="0.12" />
                {/* Spirit label above robot */}
                <rect x="120" y="46" width="80" height="14" rx="4" fill="#6d28d9" opacity="0.8" />
                <text x="160" y="56" fontSize="6" fill="white" textAnchor="middle" fontWeight="bold" letterSpacing="0.5">FLOURISH ROBOTICS</text>
              </svg>
              <div className="relative z-10 p-4">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Phase 4 · 2028</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-black text-slate-900 dark:text-white mb-1">Flourish Robotics — Nursing Station</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">A Spirit-powered robot moves through the ward — delivering medications, flagging missed vitals, and checking on patients between nurse rounds. It has the efficiency of a machine and the character of a GCU nurse.</p>
            </div>
          </div>

        </div>
        <p className="text-xs text-slate-400 dark:text-slate-600 mt-4 text-center">
          Each surface is a new deployment of the same Spirit Layer — the same character, the same values, the same GCU mission. The form changes. The soul does not.
        </p>
      </div>

      {/* ── GLOBAL MARKET MAP ── */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Globe size={20} className="text-blue-500" />
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Global Market Opportunity</h2>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
          We are not creating a product for GCU. We are creating an industry for the world.
          33,000+ Christian institutions across 6 continents have no ethical AI framework to follow — until now.
        </p>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="page-card p-5 text-center">
            <Globe size={22} className="text-blue-500 mx-auto mb-2" />
            <p className="text-3xl font-black text-slate-900 dark:text-white">33,000+</p>
            <p className="text-xs font-semibold text-slate-500 mt-1">Christian Institutions Globally</p>
          </div>
          <div className="page-card p-5 text-center">
            <Users size={22} className="text-gcu-purple mx-auto mb-2" />
            <p className="text-3xl font-black text-slate-900 dark:text-white">2.6B</p>
            <p className="text-xs font-semibold text-slate-500 mt-1">Christians Worldwide</p>
          </div>
          <div className="page-card p-5 text-center">
            <TrendingUp size={22} className="text-gcu-gold mx-auto mb-2" />
            <p className="text-3xl font-black text-slate-900 dark:text-white">$0</p>
            <p className="text-xs font-semibold text-slate-500 mt-1">Current Ethical AI Market (GCU Creates It)</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {GLOBAL_REGIONS.map(r => (
            <div key={r.region} className={`page-card p-5 border-l-4 ${r.color}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{r.flag}</span>
                  <div>
                    <h3 className="font-black text-slate-900 dark:text-white">{r.region}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Population: {r.population}</p>
                  </div>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${r.statusColor}`}>{r.status}</span>
              </div>
              <p className="text-2xl font-black text-gcu-purple dark:text-purple-300 mb-1">{r.institutions}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">{r.focus}</p>
              <ul className="space-y-1">
                {r.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                    <Star size={10} className="text-gcu-gold mt-0.5 flex-shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-gradient-to-r from-gcu-purple/10 to-blue-500/10 dark:from-gcu-purple/20 dark:to-blue-500/10 border border-gcu-purple/20 p-5 text-center">
          <p className="text-sm font-bold text-slate-800 dark:text-white mb-1">
            The network effect is irreversible at 25 institutions.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Once 25 universities and health systems adopt the Flourish Standard, GCU becomes the accrediting authority. Every institution that joins after that strengthens GCU's position — not weakens it.
            The industry will not form around a startup. It will form around the university that had the courage to define it first.
          </p>
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
