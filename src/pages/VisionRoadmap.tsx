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
