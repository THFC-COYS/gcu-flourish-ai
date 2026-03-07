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

          {/* Scene 1 — Hospital Bedside 2AM */}
          <div className="page-card overflow-hidden group">
            <div className="relative h-52 flex items-end">
              <svg viewBox="0 0 320 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id="s1bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#060b14"/><stop offset="100%" stopColor="#0a1320"/></linearGradient>
                  <radialGradient id="s1tglow" cx="68%" cy="52%" r="32%"><stop offset="0%" stopColor="#60a5fa" stopOpacity="0.55"/><stop offset="100%" stopColor="#60a5fa" stopOpacity="0"/></radialGradient>
                  <radialGradient id="s1mongreen" cx="87%" cy="52%" r="15%"><stop offset="0%" stopColor="#22c55e" stopOpacity="0.18"/><stop offset="100%" stopColor="#22c55e" stopOpacity="0"/></radialGradient>
                  <radialGradient id="s1vig" cx="50%" cy="50%" r="70%"><stop offset="55%" stopColor="transparent"/><stop offset="100%" stopColor="#000" stopOpacity="0.82"/></radialGradient>
                  <linearGradient id="s1sheet" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#b8cce0"/><stop offset="55%" stopColor="#d8e8f4"/><stop offset="100%" stopColor="#7890a8"/></linearGradient>
                </defs>
                <rect width="320" height="200" fill="url(#s1bg)"/>
                <rect width="320" height="52" fill="#0c1624" opacity="0.7"/>
                {/* City window */}
                <rect x="215" y="12" width="88" height="62" rx="2" fill="#08141e"/>
                <rect x="218" y="15" width="82" height="56" fill="#0b1a30"/>
                <rect x="224" y="38" width="7" height="18" fill="#f59e0b" opacity="0.5"/>
                <rect x="238" y="34" width="6" height="22" fill="#f59e0b" opacity="0.4"/>
                <rect x="250" y="40" width="9" height="14" fill="#f59e0b" opacity="0.45"/>
                <rect x="264" y="36" width="5" height="20" fill="#60a5fa" opacity="0.38"/>
                <rect x="274" y="44" width="8" height="12" fill="#f59e0b" opacity="0.4"/>
                <rect x="288" y="38" width="6" height="18" fill="#fbbf24" opacity="0.35"/>
                <ellipse cx="258" cy="58" rx="50" ry="32" fill="#1a3050" opacity="0.35"/>
                {/* Floor */}
                <rect y="162" width="320" height="38" fill="#040810"/>
                <rect y="160" width="320" height="3" fill="#0d1828" opacity="0.8"/>
                {/* Headboard */}
                <rect x="15" y="88" width="17" height="82" rx="3" fill="#141e2e"/>
                <rect x="17" y="91" width="13" height="76" rx="2" fill="#1c2d3e"/>
                {/* Bed frame */}
                <rect x="15" y="152" width="215" height="16" rx="3" fill="#0f1828"/>
                {/* Mattress */}
                <rect x="32" y="98" width="192" height="56" rx="5" fill="#1c2c3e"/>
                {/* Sheets */}
                <rect x="32" y="93" width="192" height="58" rx="5" fill="url(#s1sheet)"/>
                <path d="M32 108 Q120 103 224 110" stroke="#98aec4" strokeWidth="1" fill="none" opacity="0.55"/>
                <path d="M32 122 Q100 118 224 124" stroke="#98aec4" strokeWidth="0.8" fill="none" opacity="0.4"/>
                <path d="M32 136 Q90 133 200 138" stroke="#98aec4" strokeWidth="0.7" fill="none" opacity="0.3"/>
                <ellipse cx="108" cy="136" rx="55" ry="13" fill="#7890a8" opacity="0.38"/>
                {/* Pillow */}
                <ellipse cx="88" cy="98" rx="44" ry="12" fill="#e4eef8"/>
                <ellipse cx="88" cy="97" rx="42" ry="10" fill="#d8e8f4"/>
                {/* Patient head */}
                <ellipse cx="88" cy="91" rx="16" ry="15" fill="#c8a47e"/>
                <path d="M72 88 Q88 79 104 88 Q102 83 88 80 Q74 83 72 88Z" fill="#3d2e1e"/>
                <ellipse cx="83" cy="91" rx="2" ry="2.5" fill="#a07050" opacity="0.35"/>
                <ellipse cx="93" cy="91" rx="2" ry="2.5" fill="#a07050" opacity="0.35"/>
                {/* IV pole */}
                <rect x="240" y="50" width="2.5" height="110" rx="1" fill="#2a3848"/>
                <ellipse cx="241" cy="50" rx="7" ry="3" fill="#38485a"/>
                <path d="M234 54 Q241 51 248 54 L246 76 Q241 80 236 76Z" fill="#a8c8e8" opacity="0.6"/>
                <rect x="240" y="76" width="2" height="24" fill="#88b0d0" opacity="0.5"/>
                {/* Nightstand */}
                <rect x="208" y="116" width="48" height="46" rx="3" fill="#0c1520"/>
                <rect x="208" y="114" width="50" height="5" rx="2" fill="#141e2e"/>
                {/* Tablet propped on stand */}
                <g transform="rotate(-10, 228, 108)">
                  <rect x="214" y="93" width="30" height="22" rx="4" fill="#08101a" stroke="#2a3848" strokeWidth="1.5"/>
                  <rect x="216" y="95" width="26" height="18" rx="2.5" fill="#dff0ff"/>
                  <rect x="216" y="95" width="26" height="4.5" rx="2" fill="#4f46e5"/>
                  <circle cx="220" cy="97.5" r="2" fill="#a78bfa"/>
                  <text x="220" y="99" fontSize="2.5" fill="white" textAnchor="middle" fontWeight="bold">AI</text>
                  <rect x="224" y="96.5" width="16" height="1" rx="0.5" fill="white" opacity="0.8"/>
                  <rect x="224" y="98.5" width="12" height="1" rx="0.5" fill="white" opacity="0.55"/>
                  <rect x="217" y="101" width="21" height="5" rx="2" fill="white"/>
                  <rect x="219" y="102.5" width="15" height="1" rx="0.3" fill="#94a3b8" opacity="0.5"/>
                  <rect x="219" y="104" width="10" height="1" rx="0.3" fill="#94a3b8" opacity="0.4"/>
                  <rect x="219" y="108" width="21" height="4" rx="2" fill="#4f46e5" opacity="0.75"/>
                  <rect x="221" y="109.5" width="14" height="1" rx="0.3" fill="white" opacity="0.7"/>
                  <rect x="216" y="113" width="26" height="3" rx="1" fill="#e2e8f0" opacity="0.85"/>
                </g>
                {/* Screen glow */}
                <rect width="320" height="200" fill="url(#s1tglow)"/>
                {/* ECG monitor */}
                <rect x="260" y="96" width="44" height="28" rx="3" fill="#08100e" stroke="#1c2c28" strokeWidth="1"/>
                <rect x="262" y="98" width="40" height="20" rx="2" fill="#040c06"/>
                <path d="M264 108 L270 108 L272 102 L275 114 L278 106 L281 108 L300 108" stroke="#22c55e" strokeWidth="1.5" fill="none" opacity="0.9"/>
                <text x="262" y="124" fontSize="3.8" fill="#22c55e" opacity="0.7">HR 72  SpO2 98%</text>
                <rect width="320" height="200" fill="url(#s1mongreen)"/>
                {/* Ceiling light cone */}
                <path d="M155 0 L125 70 L185 70Z" fill="white" opacity="0.008"/>
                {/* Vignette */}
                <rect width="320" height="200" fill="url(#s1vig)"/>
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
            <div className="relative h-52 flex items-end">
              <svg viewBox="0 0 320 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id="s2sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#bfd8f8"/><stop offset="100%" stopColor="#e8f4ff"/></linearGradient>
                  <linearGradient id="s2lobby" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#dce8f4"/><stop offset="100%" stopColor="#c8d8ea"/></linearGradient>
                  <linearGradient id="s2floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#d0dcea"/><stop offset="100%" stopColor="#b8c8d8"/></linearGradient>
                  <radialGradient id="s2kglow" cx="50%" cy="35%" r="30%"><stop offset="0%" stopColor="#818cf8" stopOpacity="0.5"/><stop offset="100%" stopColor="#818cf8" stopOpacity="0"/></radialGradient>
                  <radialGradient id="s2sun" cx="80%" cy="5%" r="60%"><stop offset="0%" stopColor="#fff7ed" stopOpacity="0.6"/><stop offset="100%" stopColor="#fff7ed" stopOpacity="0"/></radialGradient>
                  <radialGradient id="s2vig" cx="50%" cy="50%" r="70%"><stop offset="60%" stopColor="transparent"/><stop offset="100%" stopColor="#000" stopOpacity="0.45"/></radialGradient>
                </defs>
                {/* Exterior sky through windows */}
                <rect width="320" height="200" fill="url(#s2lobby)"/>
                {/* Sunlight wash */}
                <rect width="320" height="200" fill="url(#s2sun)"/>
                {/* Ceiling */}
                <rect width="320" height="22" fill="#e8f0f8"/>
                {/* Ceiling coffers */}
                <rect x="0" y="18" width="320" height="3" fill="#c8d8e8" opacity="0.6"/>
                <rect x="80" y="0" width="2" height="22" fill="#c8d8e8" opacity="0.4"/>
                <rect x="160" y="0" width="2" height="22" fill="#c8d8e8" opacity="0.4"/>
                <rect x="240" y="0" width="2" height="22" fill="#c8d8e8" opacity="0.4"/>
                {/* Ceiling lights */}
                <ellipse cx="80" cy="20" rx="8" ry="3" fill="#fffde7" opacity="0.9"/>
                <ellipse cx="160" cy="20" rx="8" ry="3" fill="#fffde7" opacity="0.9"/>
                <ellipse cx="240" cy="20" rx="8" ry="3" fill="#fffde7" opacity="0.9"/>
                {/* Back wall - large floor-to-ceiling windows */}
                <rect x="0" y="22" width="85" height="120" fill="#bdd4ee"/>
                <rect x="2" y="24" width="81" height="116" fill="url(#s2sky)"/>
                <rect x="90" y="22" width="85" height="120" fill="#bdd4ee"/>
                <rect x="92" y="24" width="81" height="116" fill="url(#s2sky)"/>
                <rect x="180" y="22" width="85" height="120" fill="#bdd4ee"/>
                <rect x="182" y="24" width="81" height="116" fill="url(#s2sky)"/>
                <rect x="270" y="22" width="50" height="120" fill="#bdd4ee"/>
                <rect x="272" y="24" width="46" height="116" fill="url(#s2sky)"/>
                {/* Window mullions */}
                <rect x="85" y="22" width="5" height="120" fill="#d0dcea"/>
                <rect x="175" y="22" width="5" height="120" fill="#d0dcea"/>
                <rect x="265" y="22" width="5" height="120" fill="#d0dcea"/>
                {/* Polished floor */}
                <rect y="142" width="320" height="58" fill="url(#s2floor)"/>
                <rect y="140" width="320" height="4" fill="#c0d0e0"/>
                {/* Floor tile lines */}
                <line x1="0" y1="155" x2="320" y2="155" stroke="#b8c8d8" strokeWidth="0.8" opacity="0.6"/>
                <line x1="0" y1="168" x2="320" y2="168" stroke="#b8c8d8" strokeWidth="0.8" opacity="0.5"/>
                <line x1="0" y1="182" x2="320" y2="182" stroke="#b8c8d8" strokeWidth="0.6" opacity="0.4"/>
                <line x1="80" y1="142" x2="80" y2="200" stroke="#b8c8d8" strokeWidth="0.8" opacity="0.5"/>
                <line x1="160" y1="142" x2="160" y2="200" stroke="#b8c8d8" strokeWidth="0.8" opacity="0.5"/>
                <line x1="240" y1="142" x2="240" y2="200" stroke="#b8c8d8" strokeWidth="0.6" opacity="0.4"/>
                {/* Reception desk background */}
                <rect x="0" y="100" width="60" height="42" rx="2" fill="#c0d0e0" opacity="0.7"/>
                <rect x="2" y="102" width="56" height="38" rx="1" fill="#b0c0d0" opacity="0.5"/>
                {/* Receptionist silhouette */}
                <ellipse cx="30" cy="100" rx="9" ry="9" fill="#7890a8" opacity="0.7"/>
                <rect x="21" y="108" width="18" height="14" rx="3" fill="#7890a8" opacity="0.6"/>
                {/* KIOSK - center */}
                {/* Base */}
                <ellipse cx="160" cy="156" rx="22" ry="6" fill="#9090b0" opacity="0.4"/>
                {/* Pole */}
                <rect x="154" y="108" width="12" height="48" rx="3" fill="#9898b8" opacity="0.8"/>
                <rect x="155" y="109" width="5" height="46" rx="2" fill="white" opacity="0.1"/>
                {/* Screen housing */}
                <rect x="128" y="58" width="64" height="52" rx="8" fill="#282060" stroke="#4f46e5" strokeWidth="1.5"/>
                {/* Screen */}
                <rect x="131" y="61" width="58" height="44" rx="6" fill="#1e1b4b"/>
                {/* Avatar on screen */}
                <ellipse cx="160" cy="74" rx="11" ry="12" fill="#7c6aba"/>
                <ellipse cx="160" cy="70" rx="9" ry="9" fill="#a78bfa" opacity="0.9"/>
                <ellipse cx="156" cy="68" rx="2" ry="2.5" fill="#1e1b4b"/>
                <ellipse cx="164" cy="68" rx="2" ry="2.5" fill="#1e1b4b"/>
                <path d="M155 73 Q160 77 165 73" stroke="#1e1b4b" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                {/* Body outline on screen */}
                <rect x="154" y="82" width="12" height="18" rx="4" fill="#7c3aed" opacity="0.7"/>
                {/* Screen text */}
                <rect x="134" y="92" width="30" height="2" rx="1" fill="#a78bfa" opacity="0.8"/>
                <rect x="134" y="96" width="22" height="1.5" rx="1" fill="#c4b5fd" opacity="0.5"/>
                <rect x="134" y="99" width="26" height="1.5" rx="1" fill="#c4b5fd" opacity="0.45"/>
                {/* Kiosk glow on floor */}
                <ellipse cx="160" cy="155" rx="40" ry="10" fill="#6366f1" opacity="0.15"/>
                {/* Screen glow on wall */}
                <rect width="320" height="200" fill="url(#s2kglow)"/>
                {/* PEOPLE silhouettes */}
                {/* Family approaching left */}
                <ellipse cx="72" cy="134" rx="10" ry="10" fill="#4b5563" opacity="0.85"/>
                <path d="M62 144 Q72 148 82 144 L80 175 Q72 178 64 175 Z" fill="#4b5563" opacity="0.8"/>
                {/* Child beside adult */}
                <ellipse cx="88" cy="142" rx="7" ry="7" fill="#4b5563" opacity="0.75"/>
                <path d="M81 149 Q88 153 95 149 L93 172 Q88 175 83 172 Z" fill="#4b5563" opacity="0.7"/>
                {/* Person on right */}
                <ellipse cx="248" cy="138" rx="9" ry="9" fill="#4b5563" opacity="0.7"/>
                <path d="M239 147 Q248 151 257 147 L255 175 Q248 178 241 175 Z" fill="#4b5563" opacity="0.65"/>
                {/* Floor reflections of people */}
                <ellipse cx="72" cy="175" rx="10" ry="4" fill="#4b5563" opacity="0.12"/>
                <ellipse cx="160" cy="157" rx="22" ry="4" fill="#4040a0" opacity="0.1"/>
                {/* Vignette */}
                <rect width="320" height="200" fill="url(#s2vig)"/>
              </svg>
              <div className="relative z-10 p-4">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Now · Phase 1</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-black text-slate-900 dark:text-white mb-1">Hospital Lobby Kiosk</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">A family arrives at the ER not knowing what to do or who to ask. A Spirit kiosk in the lobby orients them, translates, and connects them to the right care team — before they ever reach the front desk.</p>
            </div>
          </div>

          {/* Scene 3 — Life-Size Classroom Avatar */}
          <div className="page-card overflow-hidden group">
            <div className="relative h-52 flex items-end">
              <svg viewBox="0 0 320 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id="s3bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#09071a"/><stop offset="100%" stopColor="#0e0b22"/></linearGradient>
                  <radialGradient id="s3screen" cx="50%" cy="30%" r="45%"><stop offset="0%" stopColor="#ece8ff" stopOpacity="0.95"/><stop offset="70%" stopColor="#c4b5fd" stopOpacity="0.3"/><stop offset="100%" stopColor="#c4b5fd" stopOpacity="0"/></radialGradient>
                  <radialGradient id="s3projector" cx="50%" cy="0%" r="55%"><stop offset="0%" stopColor="#d8d0ff" stopOpacity="0.15"/><stop offset="100%" stopColor="#d8d0ff" stopOpacity="0"/></radialGradient>
                  <radialGradient id="s3vig" cx="50%" cy="50%" r="70%"><stop offset="50%" stopColor="transparent"/><stop offset="100%" stopColor="#000" stopOpacity="0.75"/></radialGradient>
                  <linearGradient id="s3avatar" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ddd6fe"/><stop offset="100%" stopColor="#7c3aed"/></linearGradient>
                </defs>
                <rect width="320" height="200" fill="url(#s3bg)"/>
                {/* Ceiling - barely visible */}
                <rect width="320" height="20" fill="#0d0b20"/>
                {/* Projector beam from ceiling */}
                <path d="M155 0 L108 108 L212 108Z" fill="#c4b5fd" opacity="0.04"/>
                <path d="M158 0 L118 108 L202 108Z" fill="#c4b5fd" opacity="0.03"/>
                {/* Projector unit */}
                <rect x="148" y="0" width="24" height="8" rx="2" fill="#2a2040"/>
                <ellipse cx="160" cy="8" rx="5" ry="3" fill="#a78bfa" opacity="0.5"/>
                {/* PROJECTION SCREEN */}
                <rect x="60" y="15" width="200" height="115" rx="4" fill="#0d0b1e" stroke="#2a2050" strokeWidth="1"/>
                {/* Screen surface lit by projection */}
                <rect x="62" y="17" width="196" height="111" rx="3" fill="url(#s3screen)"/>
                {/* Screen glow wash on ceiling and walls */}
                <rect width="320" height="200" fill="url(#s3projector)"/>
                {/* LIVE AVATAR ON SCREEN */}
                {/* Avatar glow/halo */}
                <ellipse cx="160" cy="75" rx="40" ry="55" fill="#7c3aed" opacity="0.12"/>
                {/* Avatar head */}
                <ellipse cx="160" cy="34" rx="18" ry="19" fill="url(#s3avatar)"/>
                {/* Face features */}
                <ellipse cx="153" cy="31" rx="3" ry="3.5" fill="#1e1b4b"/>
                <ellipse cx="167" cy="31" rx="3" ry="3.5" fill="#1e1b4b"/>
                <ellipse cx="153" cy="30" rx="1.5" ry="2" fill="white" opacity="0.4"/>
                <ellipse cx="167" cy="30" rx="1.5" ry="2" fill="white" opacity="0.4"/>
                <path d="M153 40 Q160 45 167 40" stroke="#1e1b4b" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                {/* Hair */}
                <path d="M142 28 Q160 18 178 28 Q176 20 160 17 Q144 20 142 28Z" fill="#2a1a50"/>
                {/* Neck */}
                <rect x="155" y="53" width="10" height="8" rx="2" fill="#c4b5fd" opacity="0.7"/>
                {/* Body - blazer */}
                <path d="M138 62 Q160 58 182 62 L185 125 Q160 130 135 125Z" fill="#5b21b6" opacity="0.9"/>
                <path d="M160 62 L160 128" stroke="#4c1d95" strokeWidth="1" opacity="0.5"/>
                {/* Collar */}
                <path d="M150 62 Q160 68 170 62" fill="#7c3aed" opacity="0.5"/>
                {/* GCU badge */}
                <rect x="152" y="70" width="16" height="11" rx="2" fill="#fbbf24" opacity="0.9"/>
                <text x="160" y="78.5" fontSize="4.5" fill="#1e1b4b" textAnchor="middle" fontWeight="bold">GCU</text>
                {/* Arms */}
                <path d="M138 70 Q118 82 116 100" stroke="#5b21b6" strokeWidth="11" strokeLinecap="round" fill="none" opacity="0.9"/>
                <path d="M182 70 Q202 82 204 100" stroke="#5b21b6" strokeWidth="11" strokeLinecap="round" fill="none" opacity="0.9"/>
                {/* Hands */}
                <ellipse cx="116" cy="103" rx="6" ry="5" fill="#c4b5fd" opacity="0.7"/>
                <ellipse cx="204" cy="103" rx="6" ry="5" fill="#c4b5fd" opacity="0.7"/>
                {/* Legs */}
                <rect x="148" y="124" width="11" height="28" rx="5" fill="#4c1d95" opacity="0.9"/>
                <rect x="161" y="124" width="11" height="28" rx="5" fill="#4c1d95" opacity="0.9"/>
                {/* LIVE badge on screen */}
                <rect x="64" y="19" width="36" height="11" rx="3" fill="#dc2626" opacity="0.9"/>
                <text x="82" y="27" fontSize="5.5" fill="white" textAnchor="middle" fontWeight="bold">● LIVE</text>
                {/* SPIRIT TEACHER label */}
                <rect x="190" y="19" width="64" height="11" rx="3" fill="#4f46e5" opacity="0.8"/>
                <text x="222" y="27" fontSize="5" fill="white" textAnchor="middle" fontWeight="bold">SPIRIT TEACHER</text>
                {/* Floor */}
                <rect y="170" width="320" height="30" fill="#080614"/>
                {/* STUDENT ROWS */}
                {/* Back row desks */}
                <rect x="0" y="148" width="65" height="18" rx="2" fill="#1a1530" opacity="0.8"/>
                <rect x="75" y="148" width="65" height="18" rx="2" fill="#1a1530" opacity="0.8"/>
                <rect x="150" y="148" width="65" height="18" rx="2" fill="#1a1530" opacity="0.8"/>
                <rect x="225" y="148" width="80" height="18" rx="2" fill="#1a1530" opacity="0.8"/>
                {/* Student heads — lit from screen */}
                <ellipse cx="33" cy="140" rx="10" ry="10" fill="#2a2240" opacity="0.9"/>
                <ellipse cx="33" cy="140" rx="8" ry="8" fill="#c4b5fd" opacity="0.08"/>
                <ellipse cx="108" cy="138" rx="10" ry="10" fill="#2a2240" opacity="0.9"/>
                <ellipse cx="108" cy="138" rx="8" ry="8" fill="#c4b5fd" opacity="0.1"/>
                <ellipse cx="183" cy="136" rx="10" ry="10" fill="#2a2240" opacity="0.9"/>
                <ellipse cx="183" cy="136" rx="8" ry="8" fill="#c4b5fd" opacity="0.12"/>
                <ellipse cx="258" cy="137" rx="10" ry="10" fill="#2a2240" opacity="0.9"/>
                <ellipse cx="258" cy="137" rx="8" ry="8" fill="#c4b5fd" opacity="0.1"/>
                {/* Laptop screens at desks glowing */}
                <rect x="20" y="151" width="28" height="14" rx="2" fill="#1e1b4b" opacity="0.7"/>
                <rect x="95" y="151" width="28" height="14" rx="2" fill="#1e1b4b" opacity="0.7"/>
                <rect x="170" y="151" width="28" height="14" rx="2" fill="#1e1b4b" opacity="0.7"/>
                {/* Vignette */}
                <rect width="320" height="200" fill="url(#s3vig)"/>
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

          {/* Scene 4 — Wearable AR POV */}
          <div className="page-card overflow-hidden group">
            <div className="relative h-52 flex items-end">
              <svg viewBox="0 0 320 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id="s4room" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1a2a20"/><stop offset="100%" stopColor="#243830"/></linearGradient>
                  <linearGradient id="s4floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#243830"/><stop offset="100%" stopColor="#1a2820"/></linearGradient>
                  <radialGradient id="s4vig" cx="50%" cy="50%" r="60%"><stop offset="40%" stopColor="transparent"/><stop offset="100%" stopColor="#000" stopOpacity="0.88"/></radialGradient>
                  <linearGradient id="s4bed" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c8d8e8"/><stop offset="100%" stopColor="#a8b8c8"/></linearGradient>
                </defs>
                {/* Clinical room */}
                <rect width="320" height="200" fill="url(#s4room)"/>
                {/* Ceiling with fluorescent strip */}
                <rect width="320" height="18" fill="#243830"/>
                <rect x="80" y="6" width="160" height="6" rx="2" fill="#d4f5dc" opacity="0.7"/>
                <ellipse cx="160" cy="12" rx="80" ry="14" fill="#d4f5dc" opacity="0.08"/>
                {/* Wall */}
                <rect y="18" width="320" height="105" fill="#1e3028"/>
                {/* Window */}
                <rect x="240" y="25" width="65" height="55" rx="2" fill="#1a3040"/>
                <rect x="243" y="28" width="59" height="49" fill="#2a4858" opacity="0.8"/>
                <ellipse cx="272" cy="52" rx="25" ry="20" fill="#60a5fa" opacity="0.12"/>
                {/* Floor */}
                <rect y="123" width="320" height="77" fill="url(#s4floor)"/>
                {/* Floor tile */}
                <line x1="0" y1="145" x2="320" y2="145" stroke="#2a4030" strokeWidth="1" opacity="0.6"/>
                <line x1="0" y1="167" x2="320" y2="167" stroke="#2a4030" strokeWidth="1" opacity="0.5"/>
                <line x1="0" y1="189" x2="320" y2="189" stroke="#2a4030" strokeWidth="0.8" opacity="0.4"/>
                {/* PATIENT IN BED */}
                {/* Bed frame */}
                <rect x="30" y="95" width="200" height="55" rx="5" fill="#1c2c3c" opacity="0.9"/>
                {/* Sheets */}
                <rect x="30" y="90" width="200" height="55" rx="5" fill="url(#s4bed)"/>
                <path d="M30 105 Q130 100 230 106" stroke="#98b0c4" strokeWidth="0.8" fill="none" opacity="0.5"/>
                {/* Patient head */}
                <ellipse cx="80" cy="92" rx="15" ry="14" fill="#c8a47a"/>
                <path d="M65 89 Q80 81 95 89 Q93 84 80 81 Q67 84 65 89Z" fill="#3d2e1e"/>
                {/* IV pole */}
                <rect x="228" y="45" width="2" height="95" rx="1" fill="#3a5048"/>
                <ellipse cx="229" cy="45" rx="6" ry="3" fill="#4a6058"/>
                <path d="M222 48 Q229 45 236 48 L234 68 Q229 72 224 68Z" fill="#90c8a8" opacity="0.55"/>
                {/* NURSE standing with clipboard */}
                <ellipse cx="262" cy="88" rx="12" ry="12" fill="#3a6050"/>
                <path d="M250 100 Q262 106 274 100 L272 145 Q262 149 252 145Z" fill="#3a6050" opacity="0.9"/>
                {/* Clipboard in nurse hand */}
                <rect x="274" y="108" width="18" height="24" rx="2" fill="#d8e8d0" opacity="0.8"/>
                <rect x="276" y="112" width="12" height="1.5" rx="0.5" fill="#4a6048" opacity="0.5"/>
                <rect x="276" y="115" width="10" height="1.5" rx="0.5" fill="#4a6048" opacity="0.4"/>
                <rect x="276" y="118" width="11" height="1.5" rx="0.5" fill="#4a6048" opacity="0.4"/>
                {/* ── AR HUD OVERLAY ── */}
                {/* Corner brackets */}
                <path d="M12 12 L12 32 M12 12 L32 12" stroke="#00e676" strokeWidth="2.5" fill="none" opacity="0.85"/>
                <path d="M308 12 L308 32 M308 12 L288 12" stroke="#00e676" strokeWidth="2.5" fill="none" opacity="0.85"/>
                <path d="M12 188 L12 168 M12 188 L32 188" stroke="#00e676" strokeWidth="2.5" fill="none" opacity="0.85"/>
                <path d="M308 188 L308 168 M308 188 L288 188" stroke="#00e676" strokeWidth="2.5" fill="none" opacity="0.85"/>
                {/* AR target on patient */}
                <circle cx="80" cy="92" r="20" stroke="#00e676" strokeWidth="1" fill="none" opacity="0.5" strokeDasharray="4 3"/>
                <line x1="80" y1="68" x2="80" y2="74" stroke="#00e676" strokeWidth="1" opacity="0.6"/>
                <line x1="80" y1="110" x2="80" y2="116" stroke="#00e676" strokeWidth="1" opacity="0.6"/>
                <line x1="56" y1="92" x2="62" y2="92" stroke="#00e676" strokeWidth="1" opacity="0.6"/>
                <line x1="98" y1="92" x2="104" y2="92" stroke="#00e676" strokeWidth="1" opacity="0.6"/>
                {/* VITALS panel — top left */}
                <rect x="12" y="15" width="108" height="42" rx="5" fill="#0a1a12" opacity="0.88" stroke="#00e676" strokeWidth="0.8"/>
                <text x="18" y="26" fontSize="5" fill="#00e676" fontWeight="bold" opacity="0.9">PATIENT 4B · JOHNSON</text>
                <path d="M16 34 L24 34 L26 28 L29 40 L32 30 L35 34 L55 34" stroke="#00e676" strokeWidth="1.5" fill="none" opacity="0.9"/>
                <text x="60" y="34" fontSize="4.5" fill="#00e676" opacity="0.8">HR 72</text>
                <text x="16" y="46" fontSize="4.2" fill="#4ade80" opacity="0.7">SpO2 98%  BP 118/76  Temp 98.4°F</text>
                <text x="16" y="54" fontSize="4" fill="#00e676" opacity="0.6">VITALS STABLE</text>
                {/* SPIRIT panel — top right */}
                <rect x="200" y="15" width="108" height="70" rx="5" fill="#0a0c1a" opacity="0.90" stroke="#6d28d9" strokeWidth="0.8"/>
                <rect x="203" y="18" width="36" height="36" rx="4" fill="#3b1f6e" opacity="0.7"/>
                <ellipse cx="221" cy="36" rx="11" ry="12" fill="#a78bfa" opacity="0.85"/>
                <ellipse cx="218" cy="33" rx="2" ry="2.5" fill="#1e1b4b"/>
                <ellipse cx="224" cy="33" rx="2" ry="2.5" fill="#1e1b4b"/>
                <path d="M218 39 Q221 42 224 39" stroke="#1e1b4b" strokeWidth="1" fill="none" strokeLinecap="round"/>
                <text x="244" y="26" fontSize="5" fill="#a78bfa" fontWeight="bold" opacity="0.9">SPIRIT NURSE</text>
                <rect x="244" y="29" width="58" height="2" rx="1" fill="#a78bfa" opacity="0.6"/>
                <text x="244" y="37" fontSize="4" fill="#c4b5fd" opacity="0.75">Last visit: 3h ago</text>
                <text x="244" y="43" fontSize="4" fill="#c4b5fd" opacity="0.7">Allergies: Penicillin</text>
                <text x="244" y="49" fontSize="4" fill="#fbbf24" opacity="0.8">⚠ Refused meds 2×</text>
                <rect x="203" y="57" width="102" height="24" rx="3" fill="#3b1f6e" opacity="0.6"/>
                <text x="254" y="65" fontSize="4.2" fill="#ddd6fe" textAnchor="middle" fontWeight="bold">SPIRIT SAYS:</text>
                <text x="254" y="72" fontSize="3.8" fill="#c4b5fd" textAnchor="middle" opacity="0.85">"Ask about medication concern</text>
                <text x="254" y="77" fontSize="3.8" fill="#c4b5fd" textAnchor="middle" opacity="0.85">before morning rounds."</text>
                {/* Lens vignette */}
                <rect width="320" height="200" fill="url(#s4vig)"/>
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

          {/* Scene 5 — Flourish Robotics */}
          <div className="page-card overflow-hidden group md:col-span-2 xl:col-span-1">
            <div className="relative h-52 flex items-end">
              <svg viewBox="0 0 320 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id="s5bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#d8e8f4"/><stop offset="100%" stopColor="#c0d4e8"/></linearGradient>
                  <linearGradient id="s5floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#d0e0f0"/><stop offset="100%" stopColor="#b8cce0"/></linearGradient>
                  <linearGradient id="s5robot" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#818cf8"/><stop offset="100%" stopColor="#4f46e5"/></linearGradient>
                  <linearGradient id="s5robotbody" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#4338ca"/></linearGradient>
                  <radialGradient id="s5glow" cx="50%" cy="75%" r="35%"><stop offset="0%" stopColor="#6366f1" stopOpacity="0.25"/><stop offset="100%" stopColor="#6366f1" stopOpacity="0"/></radialGradient>
                  <radialGradient id="s5ceil" cx="50%" cy="0%" r="60%"><stop offset="0%" stopColor="#f0f8ff" stopOpacity="0.8"/><stop offset="100%" stopColor="#f0f8ff" stopOpacity="0"/></radialGradient>
                  <radialGradient id="s5vig" cx="50%" cy="50%" r="70%"><stop offset="55%" stopColor="transparent"/><stop offset="100%" stopColor="#000" stopOpacity="0.4"/></radialGradient>
                </defs>
                {/* Bright clinical environment */}
                <rect width="320" height="200" fill="url(#s5bg)"/>
                <rect width="320" height="200" fill="url(#s5ceil)"/>
                {/* Ceiling */}
                <rect width="320" height="16" fill="#e8f2fc"/>
                {/* Fluorescent light panels */}
                <rect x="40" y="4" width="90" height="8" rx="2" fill="#fffef0" opacity="0.95"/>
                <rect x="190" y="4" width="90" height="8" rx="2" fill="#fffef0" opacity="0.95"/>
                <ellipse cx="85" cy="12" rx="55" ry="16" fill="#f0f8ff" opacity="0.4"/>
                <ellipse cx="235" cy="12" rx="55" ry="16" fill="#f0f8ff" opacity="0.4"/>
                {/* Back wall */}
                <rect y="16" width="320" height="115" fill="#ccdde8" opacity="0.5"/>
                {/* Nursing station counter - U-shape */}
                <rect x="0" y="110" width="320" height="50" fill="#b8c8d8"/>
                <rect x="0" y="108" width="320" height="5" rx="1" fill="#a0b4c8"/>
                {/* Counter surface highlights */}
                <rect x="2" y="109" width="316" height="2" fill="white" opacity="0.3"/>
                {/* Monitors on counter */}
                <rect x="15" y="75" width="60" height="36" rx="3" fill="#1a2030" stroke="#3040a0" strokeWidth="1"/>
                <rect x="17" y="77" width="56" height="30" rx="2" fill="#0a1020"/>
                <rect x="19" y="79" width="35" height="2" rx="1" fill="#6080d0" opacity="0.7"/>
                <rect x="19" y="83" width="48" height="1.5" rx="1" fill="#4060a0" opacity="0.5"/>
                <rect x="19" y="87" width="40" height="1.5" rx="1" fill="#4060a0" opacity="0.45"/>
                <rect x="19" y="91" width="44" height="1.5" rx="1" fill="#4060a0" opacity="0.4"/>
                <rect x="245" y="76" width="58" height="34" rx="3" fill="#1a2030" stroke="#3040a0" strokeWidth="1"/>
                <rect x="247" y="78" width="54" height="28" rx="2" fill="#0a1020"/>
                <rect x="249" y="81" width="32" height="2" rx="1" fill="#6080d0" opacity="0.6"/>
                <rect x="249" y="85" width="45" height="1.5" rx="1" fill="#4060a0" opacity="0.45"/>
                {/* Medical supplies on counter */}
                <rect x="170" y="98" width="18" height="14" rx="2" fill="#e8f4f0" opacity="0.9"/>
                <rect x="195" y="95" width="14" height="17" rx="2" fill="#d0e8f4" opacity="0.9"/>
                <rect x="215" y="99" width="20" height="12" rx="2" fill="#f0e8d8" opacity="0.9"/>
                {/* Nurse silhouette at left */}
                <ellipse cx="52" cy="88" rx="12" ry="12" fill="#5a7090"/>
                <path d="M40 100 Q52 106 64 100 L62 135 Q52 140 42 135Z" fill="#5a7090" opacity="0.9"/>
                {/* Nurse's scrubs detail */}
                <rect x="46" y="103" width="12" height="8" rx="2" fill="#4a6080" opacity="0.5"/>
                {/* Second staff member right */}
                <ellipse cx="278" cy="90" rx="11" ry="11" fill="#5a7090" opacity="0.7"/>
                <path d="M267 101 Q278 107 289 101 L287 132 Q278 137 269 132Z" fill="#5a7090" opacity="0.65"/>
                {/* ROBOT — center stage */}
                {/* Shadow under robot */}
                <ellipse cx="160" cy="170" rx="32" ry="9" fill="#8090b0" opacity="0.3"/>
                {/* Wheel base */}
                <rect x="136" y="162" width="48" height="12" rx="6" fill="#3730a3" opacity="0.9"/>
                <ellipse cx="148" cy="174" rx="10" ry="5" fill="#312e81"/>
                <ellipse cx="172" cy="174" rx="10" ry="5" fill="#312e81"/>
                <rect x="141" y="163" width="8" height="6" rx="2" fill="#4338ca" opacity="0.6"/>
                <rect x="171" y="163" width="8" height="6" rx="2" fill="#4338ca" opacity="0.6"/>
                {/* Body lower */}
                <rect x="138" y="118" width="44" height="46" rx="8" fill="url(#s5robotbody)"/>
                <rect x="140" y="120" width="16" height="42" rx="5" fill="white" opacity="0.07"/>
                {/* Body panel lines */}
                <rect x="142" y="130" width="36" height="1" rx="0.5" fill="white" opacity="0.15"/>
                <rect x="142" y="140" width="36" height="1" rx="0.5" fill="white" opacity="0.12"/>
                <rect x="142" y="150" width="36" height="1" rx="0.5" fill="white" opacity="0.1"/>
                {/* GCU badge */}
                <rect x="148" y="123" width="24" height="14" rx="3" fill="#fbbf24" opacity="0.95"/>
                <text x="160" y="133" fontSize="6" fill="#1e1b4b" textAnchor="middle" fontWeight="bold">GCU</text>
                {/* Torso/shoulder join */}
                <rect x="133" y="113" width="54" height="9" rx="4" fill="url(#s5robot)" opacity="0.9"/>
                {/* Arms */}
                <path d="M138 122 Q112 132 108 150" stroke="#4f46e5" strokeWidth="12" strokeLinecap="round" fill="none" opacity="0.9"/>
                <path d="M182 122 Q208 132 212 150" stroke="#4f46e5" strokeWidth="12" strokeLinecap="round" fill="none" opacity="0.9"/>
                {/* Arm highlights */}
                <path d="M138 122 Q114 130 110 148" stroke="#818cf8" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.25"/>
                {/* Left hand with medication tray */}
                <rect x="95" y="148" width="32" height="8" rx="4" fill="#6366f1" opacity="0.9"/>
                <rect x="97" y="140" width="6" height="9" rx="3" fill="#a78bfa" opacity="0.8"/>
                <rect x="106" y="136" width="6" height="13" rx="3" fill="#c4b5fd" opacity="0.75"/>
                <rect x="115" y="139" width="6" height="10" rx="3" fill="#a78bfa" opacity="0.8"/>
                {/* Right hand open/gesturing */}
                <ellipse cx="212" cy="153" rx="8" ry="6" fill="#6366f1" opacity="0.85"/>
                {/* Robot HEAD */}
                <rect x="140" y="68" width="40" height="47" rx="12" fill="url(#s5robot)"/>
                {/* Head highlight */}
                <rect x="142" y="70" width="14" height="43" rx="6" fill="white" opacity="0.08"/>
                {/* FACE SCREEN */}
                <rect x="145" y="74" width="30" height="30" rx="7" fill="#0c0e24"/>
                {/* Friendly eyes */}
                <ellipse cx="154" cy="86" rx="5" ry="6" fill="#a78bfa"/>
                <ellipse cx="166" cy="86" rx="5" ry="6" fill="#a78bfa"/>
                <ellipse cx="154" cy="85" rx="3" ry="3.5" fill="white" opacity="0.92"/>
                <ellipse cx="166" cy="85" rx="3" ry="3.5" fill="white" opacity="0.92"/>
                <ellipse cx="155" cy="84" rx="1.5" ry="2" fill="#1e1b4b"/>
                <ellipse cx="167" cy="84" rx="1.5" ry="2" fill="#1e1b4b"/>
                {/* Smile arc */}
                <path d="M150 96 Q160 103 170 96" stroke="#a78bfa" strokeWidth="2" fill="none" strokeLinecap="round"/>
                {/* Robot ears/side panels */}
                <rect x="136" y="78" width="6" height="18" rx="3" fill="#4338ca" opacity="0.8"/>
                <rect x="178" y="78" width="6" height="18" rx="3" fill="#4338ca" opacity="0.8"/>
                {/* FLOURISH ROBOTICS label */}
                <rect x="110" y="50" width="100" height="16" rx="5" fill="#3730a3" opacity="0.9"/>
                <text x="160" y="61" fontSize="6.5" fill="white" textAnchor="middle" fontWeight="bold" letterSpacing="0.3">FLOURISH ROBOTICS</text>
                {/* Robot glow on floor */}
                <rect width="320" height="200" fill="url(#s5glow)"/>
                {/* Vignette */}
                <rect width="320" height="200" fill="url(#s5vig)"/>
              </svg>
              <div className="relative z-10 p-4">
                <span className="text-xs font-bold text-purple-600 uppercase tracking-widest">Phase 4 · 2028</span>
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

      {/* ── WE ARE GCU ── */}
      <div className="relative overflow-hidden rounded-2xl border border-gcu-purple/20 dark:border-gcu-purple/30 bg-gradient-to-br from-[#1A0A30] via-[#120820] to-[#0a0618]">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(124,58,237,0.18) 0%, transparent 70%)' }} />

        <div className="relative z-10 px-8 py-12 md:py-16 text-center">
          {/* Overline */}
          <div className="inline-flex items-center gap-2 bg-gcu-purple/20 border border-gcu-purple/40 text-purple-300 text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
            <Sparkles size={12} />
            The Collective
          </div>

          {/* Headline */}
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none mb-2">
            We <span className="text-gcu-gold">Are</span> GCU.
          </h2>
          <p className="text-purple-300/70 text-lg font-medium mb-10 max-w-xl mx-auto">
            The AI is not built from the internet. It is built from <em>us</em>.
          </p>

          {/* Flow diagram */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-0 max-w-4xl mx-auto mb-12">

            {/* Sources column */}
            <div className="flex flex-col gap-2.5 text-left min-w-[200px]">
              {[
                { icon: '🎓', label: 'Faculty Expertise', sub: 'Decades of clinical, academic & pastoral mastery' },
                { icon: '📚', label: 'Curriculum & Content', sub: "GCU's entire academic catalog and pedagogy" },
                { icon: '🔬', label: 'Research & Publications', sub: 'Peer-reviewed scholarship and original findings' },
                { icon: '🏛️', label: 'Institutional Memory', sub: 'Values, culture, and 77 years of mission' },
                { icon: '💡', label: 'Student & Staff IP', sub: 'Projects, presentations, and lived experience' },
              ].map(s => (
                <div key={s.label} className="flex items-start gap-2.5 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 hover:border-gcu-purple/40 transition-colors group">
                  <span className="text-xl flex-shrink-0 mt-0.5">{s.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-white group-hover:text-purple-200 transition-colors leading-tight">{s.label}</p>
                    <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{s.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Arrow / Spirit Layer */}
            <div className="flex md:flex-col items-center gap-0 px-2 md:px-6 py-4 md:py-0">
              {/* Arrows on both sides */}
              <div className="hidden md:flex flex-col items-center gap-1 text-gcu-purple/40 mb-3">
                <div className="w-px h-8 bg-gradient-to-b from-transparent to-gcu-purple/40" />
                <ArrowRight size={14} className="rotate-90 text-gcu-purple/60" />
              </div>
              <ArrowRight size={20} className="md:hidden text-gcu-purple/50 rotate-0 mx-2" />

              {/* Spirit Layer nucleus */}
              <div className="flex flex-col items-center gap-2 my-2">
                <div className="relative w-28 h-28 md:w-32 md:h-32 flex-shrink-0">
                  {/* Pulsing ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-gcu-purple/30 animate-ping" style={{ animationDuration: '3s' }} />
                  <div className="absolute inset-2 rounded-full border border-gcu-purple/20" />
                  {/* Core */}
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-gcu-purple via-purple-700 to-indigo-800 flex items-center justify-center shadow-lg shadow-gcu-purple/40">
                    <div className="text-center">
                      <Sparkles size={16} className="text-gcu-gold mx-auto mb-0.5" />
                      <p className="text-white text-[9px] font-black uppercase tracking-wide leading-tight">Spirit<br/>Layer</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs font-bold text-purple-300 uppercase tracking-widest">Synthesis</p>
              </div>

              <div className="hidden md:flex flex-col items-center gap-1 text-gcu-purple/40 mt-3">
                <ArrowRight size={14} className="rotate-90 text-gcu-purple/60" />
                <div className="w-px h-8 bg-gradient-to-b from-gcu-purple/40 to-transparent" />
              </div>
              <ArrowRight size={20} className="md:hidden text-gcu-purple/50 mx-2" />
            </div>

            {/* Deployment surfaces column */}
            <div className="flex flex-col gap-2.5 text-left min-w-[200px]">
              {[
                { icon: '📱', label: 'Bedside Tablet', sub: 'Spirit Nurse at 2 AM — present when humans cannot be' },
                { icon: '🖥️', label: 'Hospital Lobby Kiosk', sub: 'Orienting families in their most frightened moments' },
                { icon: '🧑‍🏫', label: 'Classroom Avatar', sub: 'Spirit Teacher — life-size, live, and responsive' },
                { icon: '🥽', label: 'Wearable AR', sub: "Overlaying Spirit's guidance on the nurse's world" },
                { icon: '🤖', label: 'Flourish Robotics', sub: "A physical presence with GCU's character embedded" },
              ].map(s => (
                <div key={s.label} className="flex items-start gap-2.5 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 hover:border-gcu-gold/30 transition-colors group">
                  <span className="text-xl flex-shrink-0 mt-0.5">{s.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-white group-hover:text-gcu-gold transition-colors leading-tight">{s.label}</p>
                    <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{s.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Closing statement */}
          <div className="max-w-3xl mx-auto">
            <blockquote className="text-lg sm:text-xl text-white/80 leading-relaxed font-medium italic border-l-4 border-gcu-gold/60 pl-5 text-left">
              "Every Spirit Agent carries the accumulated knowledge, values, and character of GCU's faculty, researchers, students, and staff — not as a database query, but as a living professional presence. When a patient speaks with Spirit Nurse at 2 AM, they are speaking with the collective wisdom of every GCU nurse educator who ever taught with compassion and conviction. <span className="text-gcu-gold not-italic font-black">We are GCU.</span>"
            </blockquote>
          </div>
        </div>
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
