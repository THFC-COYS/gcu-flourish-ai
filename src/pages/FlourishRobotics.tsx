import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Globe, Heart, Shield, Clock } from 'lucide-react';

const ROBOT_CATEGORIES = [
  {
    icon: '🤖',
    name: 'Nursing Companion Bot',
    college: 'Nursing & Health Care Professions',
    description: 'Provides patient check-ins, medication reminders, and empathetic bedside support. Infused with GCU Nursing spirit modules for compassionate, ethical care.',
    status: 'Concept',
    statusColor: 'text-amber-500',
    eta: '2027',
    specs: ['Natural language interaction', 'Vital sign monitoring integration', 'Family communication relay', 'Spirit-infused empathy module'],
  },
  {
    icon: '🎓',
    name: 'Classroom Teaching Bot',
    college: 'College of Education',
    description: 'Supports educators with real-time tutoring, student engagement tracking, and personalized learning pathways aligned with GCU\'s learner-centered approach.',
    status: 'Concept',
    statusColor: 'text-amber-500',
    eta: '2027',
    specs: ['Adaptive curriculum delivery', 'Student sentiment detection', 'Inclusive learning support', 'Christ-centered pedagogy module'],
  },
  {
    icon: '✝️',
    name: 'Pastoral Care Bot',
    college: 'Theology & Ministry',
    description: 'Offers spiritual guidance, prayer support, and scripture-based counseling for churches, hospitals, and care facilities worldwide.',
    status: 'Concept',
    statusColor: 'text-amber-500',
    eta: '2028',
    specs: ['Multi-denominational theology', 'Crisis spiritual support', 'Scripture integration', 'Human chaplain handoff protocol'],
  },
  {
    icon: '💼',
    name: 'Business Mentor Bot',
    college: 'Colangelo College of Business',
    description: 'Coaches entrepreneurs and professionals with ethical business principles, financial literacy, and leadership development rooted in GCU values.',
    status: 'Concept',
    statusColor: 'text-amber-500',
    eta: '2028',
    specs: ['Ethical decision frameworks', 'Financial coaching modules', 'Leadership scenario simulation', 'Servant leadership core'],
  },
];

const TIMELINE = [
  {
    phase: 'Phase 1',
    label: 'Digital Spirit Vessels',
    years: '2024–2026',
    active: true,
    description: 'AI coaching + simulation prototypes deployed across all 10 GCU colleges. Platform commercialized via Flourish API.',
    icon: '💬',
  },
  {
    phase: 'Phase 2',
    label: 'Physical Embodiment',
    years: '2027–2028',
    active: false,
    description: 'First Flourish Robots enter pilot deployments at partner hospitals, schools, and churches. Spirit Vessels get bodies.',
    icon: '🤖',
  },
  {
    phase: 'Phase 3',
    label: 'Global Standard',
    years: '2029+',
    active: false,
    description: 'Flourish Robotics becomes the world\'s leading ethical AI robotics platform. GCU character embedded in every institution.',
    icon: '🌍',
  },
];

const HARDWARE_PARTNERS = [
  { name: 'Boston Dynamics', logo: '🦾', type: 'Mobility Platform', status: 'Exploratory' },
  { name: 'SoftBank Robotics', logo: '🤝', type: 'Social Robot Hardware', status: 'Exploratory' },
  { name: 'NVIDIA Jetson', logo: '⚡', type: 'Edge AI Compute', status: 'Exploratory' },
  { name: 'Intuitive Surgical', logo: '🏥', type: 'Medical Robotics', status: 'Exploratory' },
];

export default function FlourishRobotics() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-gcu-purple-dark to-[#0D0920] p-8 sm:p-12">
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 800 300" preserveAspectRatio="none" className="w-full h-full">
            <circle cx="700" cy="50" r="200" fill="#FFC627" />
            <circle cx="100" cy="250" r="150" fill="#4B2E83" />
          </svg>
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-gcu-gold/20 border border-gcu-gold/40 text-gcu-gold text-xs font-bold px-3 py-1.5 rounded-full mb-4">
            🤖 FLOURISH ROBOTICS · Phase 2 Vision · Launching 2027
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4">
            Spirit Vessels<br />
            <span className="text-gcu-gold">Get Bodies.</span>
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mb-6">
            The next frontier of GCU Flourish AI: physical robots infused with the character,
            compassion, and ethics of GCU graduates. The world's most human-centered robots —
            serving in hospitals, classrooms, and churches worldwide.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/vision')}
              className="btn-gold flex items-center gap-2"
            >
              <ArrowRight size={16} /> Full Vision & Roadmap
            </button>
            <button
              onClick={() => navigate('/library')}
              className="border border-white/30 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <Heart size={16} /> View Spirit Vessels
            </button>
          </div>
        </div>
        <div className="absolute bottom-6 right-8 text-8xl opacity-10 hidden lg:block">🤖</div>
      </div>

      {/* Simulated disclaimer */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl p-4 flex items-start gap-3">
        <span className="text-amber-500 text-lg flex-shrink-0">⚠</span>
        <div>
          <p className="text-xs font-bold text-amber-700 dark:text-amber-400">CONCEPT STAGE — SIMULATED FOR DEMONSTRATION PURPOSES ONLY</p>
          <p className="text-xs text-amber-600 dark:text-amber-500 mt-0.5">
            All robot designs, partner relationships, timelines, and specifications shown below are conceptual and illustrative.
            No hardware development has begun. This page represents a future vision, not current products.
          </p>
        </div>
      </div>

      {/* Mission stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Globe, value: '150+', label: 'Target countries', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
          { icon: Heart, value: '1M+', label: 'Lives impacted (goal)', color: 'text-pink-500', bg: 'bg-pink-50 dark:bg-pink-900/20' },
          { icon: Shield, value: '100%', label: 'Ethics-first design', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
          { icon: Zap, value: '4', label: 'Robot categories planned', color: 'text-gcu-gold', bg: 'bg-gcu-gold-pale dark:bg-gcu-gold/10' },
        ].map(({ icon: Icon, value, label, color, bg }) => (
          <div key={label} className="page-card p-5 flex items-center gap-4">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${bg}`}>
              <Icon size={20} className={color} />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900 dark:text-white leading-tight">{value}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Robot categories */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">Planned Robot Categories</h2>
          <span className="text-xs text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-[#1A1235] px-3 py-1 rounded-full">Concept · Not yet built</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ROBOT_CATEGORIES.map(robot => (
            <div key={robot.name} className="page-card p-6 hover:shadow-card-hover hover:-translate-y-0.5 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gcu-purple-pale dark:bg-gcu-purple/10 flex items-center justify-center text-3xl flex-shrink-0">
                  {robot.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">{robot.name}</h3>
                    <span className={`text-xs font-semibold ${robot.statusColor}`}>{robot.status}</span>
                  </div>
                  <p className="text-xs text-gcu-purple dark:text-purple-400 font-medium">{robot.college}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock size={11} className="text-slate-400" />
                    <span className="text-xs text-slate-400">Target: {robot.eta}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{robot.description}</p>
              <div className="space-y-1.5">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Key Capabilities (Planned)</p>
                {robot.specs.map(spec => (
                  <div key={spec} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-gcu-purple/50 flex-shrink-0" />
                    {spec}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Roadmap timeline */}
      <div className="page-card p-6">
        <h2 className="text-lg font-black text-slate-900 dark:text-white mb-6">Development Roadmap</h2>
        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-gcu-purple via-gcu-purple/30 to-slate-200 dark:to-[#2D2050]" />
          <div className="space-y-6">
            {TIMELINE.map((step, i) => (
              <div key={i} className="flex items-start gap-5">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 relative z-10 ${step.active ? 'bg-gcu-purple shadow-gcu' : 'bg-slate-100 dark:bg-[#1A1235]'}`}>
                  {step.icon}
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-gcu-purple dark:text-purple-400 uppercase tracking-widest">{step.phase}</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500">{step.years}</span>
                    {step.active && (
                      <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-full">Active Now</span>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">{step.label}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hardware partners */}
      <div className="page-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">Potential Hardware Partners</h2>
          <span className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 px-3 py-1 rounded-full font-semibold">Exploratory · Not confirmed</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {HARDWARE_PARTNERS.map(partner => (
            <div key={partner.name} className="flex flex-col items-center text-center p-4 rounded-xl bg-slate-50 dark:bg-[#1A1235] border border-slate-100 dark:border-[#2D2050]">
              <span className="text-3xl mb-2">{partner.logo}</span>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{partner.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{partner.type}</p>
              <span className="text-xs text-amber-600 dark:text-amber-500 mt-2 font-medium">{partner.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="page-card p-6 bg-gradient-to-r from-gcu-purple/5 to-gcu-gold/5 border-gcu-purple/20 text-center">
        <div className="text-4xl mb-3">🌍</div>
        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">
          The Most Compassionate Robots on Earth
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl mx-auto mb-5">
          Imagine a world where every hospital, classroom, and church has access to an AI companion
          embodying the character of GCU graduates — ethical, compassionate, and Spirit-infused.
          That's Flourish Robotics.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button onClick={() => navigate('/vision')} className="btn-primary flex items-center gap-2">
            <ArrowRight size={16} /> See Full Vision
          </button>
          <button onClick={() => navigate('/flourish-api')} className="btn-secondary flex items-center gap-2">
            <Zap size={16} /> Flourish API
          </button>
        </div>
      </div>
    </div>
  );
}
