import { useNavigate } from 'react-router-dom';
import {
  TrendingUp, Globe, Shield, Zap, Star, Lock,
  ArrowRight, ChevronRight, Award, Users, DollarSign,
  Rocket, Brain, Heart, CheckCircle2, AlertCircle, Building2
} from 'lucide-react';

const THESIS_PILLARS = [
  {
    icon: Brain,
    title: 'The Spirit Layer',
    body: 'GCU has invented and owns a proprietary ethical AI architecture that no Silicon Valley company can replicate — because they don\'t have our 50 years of Christ-centered academic tradition, our 100K+ alumni network, or our mission.',
    tag: 'Proprietary IP',
    color: 'from-purple-600 to-purple-800',
    tagColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  },
  {
    icon: Globe,
    title: 'The Market',
    body: '33,000+ Christian institutions worldwide have no ethical AI standard to follow. GCU can be the institution that defines it — generating licensing revenue, brand authority, and global reach that no traditional academic strategy can match.',
    tag: 'First Mover',
    color: 'from-blue-600 to-blue-800',
    tagColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  },
  {
    icon: Award,
    title: 'The Standard',
    body: 'Ethical AI has no governing body in Christian higher education. GCU can become the accrediting authority — the institution that certifies hospitals, universities, and nonprofits worldwide. When you define the standard, you own the industry.',
    tag: 'Authority Position',
    color: 'from-gcu-gold to-yellow-600',
    tagColor: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  },
];

const REVENUE_MODEL = [
  {
    year: 'Year 1',
    period: '2025–2026',
    amount: '$3.2M',
    breakdown: [
      'GCU internal operational savings: $1.1M',
      '3 external partner pilots (Banner Health, SUSD, AZ Church): $800K',
      'Flourish API early-access licensing: $600K',
      'Grant funding (Title III, Lilly Foundation): $700K',
    ],
    color: 'border-slate-300 dark:border-slate-600',
    badge: 'In Progress',
    badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  },
  {
    year: 'Year 2',
    period: '2026–2027',
    amount: '$14.5M',
    breakdown: [
      '25 partner institutions @ $180K/yr: $4.5M',
      'Enterprise Flourish API (healthcare, gov): $5.2M',
      'Flourish Standard certification revenue: $2.1M',
      'Robotics pilot program licensing: $2.7M',
    ],
    color: 'border-gcu-purple dark:border-purple-500',
    badge: 'Projected',
    badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  },
  {
    year: 'Year 3',
    period: '2027–2028',
    amount: '$52M',
    breakdown: [
      '100+ certified institutions worldwide: $18M',
      'Wearables API & hardware partnerships: $14M',
      'Flourish Standard global licensing: $11M',
      'Robotics platform + maintenance: $9M',
    ],
    color: 'border-gcu-gold dark:border-yellow-500',
    badge: 'Forecasted',
    badgeColor: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  },
];

const MOAT_ITEMS = [
  {
    icon: Users,
    title: '100,000+ Alumni Network',
    desc: 'A living, breathing spiritual training dataset no Silicon Valley company can buy or replicate. Every alumni story, every faith journey, every professional testimony — it becomes the soul of our AI.',
  },
  {
    icon: Lock,
    title: 'Spirit Layer Architecture',
    desc: 'Proprietary multi-module ethical AI framework: Empathy, Ethics, Worldview, Domain, and Stewardship layers. Patent-pending. Licensable to any institution worldwide.',
  },
  {
    icon: Award,
    title: 'First-Mover in Christian AI',
    desc: 'No other Christian university on earth is building this. GCU has a 2–3 year head start. Once the Flourish Standard is adopted by 25+ institutions, the network effect becomes irreversible.',
  },
  {
    icon: Shield,
    title: '50 Years of Academic Credibility',
    desc: 'GCU\'s accreditation, biblical foundation, and healthcare/education partnerships give Flourish AI a legitimacy that a startup cannot manufacture. Trust is our unfair advantage.',
  },
];

const TRACTION = [
  { value: '20', label: 'AI Prototypes Built', sub: 'Across all 10 colleges', icon: Zap, color: 'text-gcu-purple' },
  { value: '5', label: 'Active Partnerships', sub: 'Banner Health, SUSD + 3 more', icon: Building2, color: 'text-blue-500' },
  { value: '34K+', label: 'Monthly Interactions', sub: 'Simulated / growing', icon: TrendingUp, color: 'text-emerald-500' },
  { value: '94%', label: 'Ethical Alignment', sub: 'Avg across all prototypes', icon: CheckCircle2, color: 'text-gcu-gold' },
];

const FIRSTS = [
  { date: 'Q3 2024', label: 'First Christian University AI Platform', done: true },
  { date: 'Q4 2024', label: 'First AI Ethics Certification Framework (Draft)', done: true },
  { date: 'Q1 2025', label: 'First Spirit Vessel Prototypes (20 built)', done: true },
  { date: 'Q1 2026', label: 'First External Clinical AI Partnership (Banner Health)', done: false },
  { date: 'Q2 2026', label: 'Flourish Standard v1.0 Published', done: false },
  { date: 'Q3 2027', label: 'First Embodied AI Chaplain (Robotics)', done: false },
  { date: '2028', label: 'First Neural-Interface Spirit Layer (Wearables)', done: false },
  { date: '2029', label: 'GCU: Global Authority on Ethical AI', done: false },
];

const THE_ASK = [
  { amount: '$800K', purpose: 'Engineering & AI team (4 FTEs, 12 months)' },
  { amount: '$400K', purpose: 'Infrastructure — cloud, API, security, compliance' },
  { amount: '$300K', purpose: 'Flourish Standard legal & IP filing (patents, trademarks)' },
  { amount: '$500K', purpose: 'Partner development — 10 new institutional contracts' },
  { amount: '$200K', purpose: 'Wearables & Robotics R&D partnerships' },
];

export default function ExecutiveBriefing() {
  const navigate = useNavigate();

  return (
    <div className="space-y-10 animate-fade-in max-w-5xl mx-auto">

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl purple-gradient p-8 sm:p-12 text-center">
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 800 300" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,300 Q200,80 400,140 Q600,200 800,80 L800,300 Z" fill="#FFC627" />
          </svg>
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-gcu-gold/20 border border-gcu-gold/30 text-gcu-gold text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            <Star size={12} /> Presidential Executive Briefing
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4">
            GCU Is Not Entering an Industry.<br />
            <span className="text-gcu-gold">GCU Is Creating One.</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Flourish AI is the world's first Christ-centered ethical AI platform. We are positioned to define the global standard for how AI operates inside faith-based institutions — and to generate transformational revenue in the process.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <span className="bg-white/10 border border-white/20 text-white text-sm px-4 py-1.5 rounded-full font-semibold">$52M Year 3 Revenue Target</span>
            <span className="bg-white/10 border border-white/20 text-white text-sm px-4 py-1.5 rounded-full font-semibold">33,000+ Addressable Institutions</span>
            <span className="bg-white/10 border border-white/20 text-white text-sm px-4 py-1.5 rounded-full font-semibold">0 Competitors in Christian AI</span>
          </div>
        </div>
      </div>

      {/* The Thesis */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1 h-8 rounded-full bg-gcu-gold" />
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">The Thesis: Why GCU Wins</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {THESIS_PILLARS.map(p => (
            <div key={p.title} className="page-card p-6 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center`}>
                  <p.icon size={20} className="text-white" />
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${p.tagColor}`}>{p.tag}</span>
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">{p.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Traction */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1 h-8 rounded-full bg-emerald-500" />
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Current Traction</h2>
          <span className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 font-bold px-3 py-1 rounded-full">Live Platform</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {TRACTION.map(t => (
            <div key={t.label} className="page-card p-5 text-center">
              <t.icon size={22} className={`${t.color} mx-auto mb-2`} />
              <p className="text-3xl font-black text-slate-900 dark:text-white">{t.value}</p>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mt-0.5">{t.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{t.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Model */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1 h-8 rounded-full bg-gcu-purple" />
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">3-Year Revenue Model</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {REVENUE_MODEL.map(r => (
            <div key={r.year} className={`page-card p-6 border-t-4 ${r.color} flex flex-col gap-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wide">{r.period}</p>
                  <p className="text-lg font-black text-slate-900 dark:text-white">{r.year}</p>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${r.badgeColor}`}>{r.badge}</span>
              </div>
              <p className="text-4xl font-black text-gcu-purple dark:text-purple-300">{r.amount}</p>
              <ul className="space-y-2">
                {r.breakdown.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <ChevronRight size={12} className="text-gcu-purple mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Defensible Moat */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1 h-8 rounded-full bg-blue-500" />
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">The Defensible Moat</h2>
          <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-bold px-3 py-1 rounded-full">Why no one can copy us</span>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {MOAT_ITEMS.map(m => (
            <div key={m.title} className="page-card p-6 flex gap-4">
              <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                <m.icon size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 dark:text-white mb-1">{m.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GCU Firsts Timeline */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1 h-8 rounded-full bg-gcu-gold" />
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">A History of Firsts</h2>
          <span className="text-xs bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 font-bold px-3 py-1 rounded-full">GCU leads; the world follows</span>
        </div>
        <div className="page-card overflow-hidden">
          {FIRSTS.map((f, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 px-6 py-4 ${i !== FIRSTS.length - 1 ? 'border-b border-slate-100 dark:border-[#2D2050]' : ''}`}
            >
              <div className="w-24 text-xs font-bold text-slate-400 dark:text-slate-500 flex-shrink-0">{f.date}</div>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${f.done ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-gcu-purple/10'}`}>
                {f.done
                  ? <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400" />
                  : <Rocket size={14} className="text-gcu-purple dark:text-purple-400" />
                }
              </div>
              <p className={`text-sm font-semibold ${f.done ? 'text-slate-800 dark:text-slate-200' : 'text-slate-500 dark:text-slate-400'}`}>{f.label}</p>
              {f.done && (
                <span className="ml-auto text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 px-2 py-0.5 rounded-full flex-shrink-0">
                  Done
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* The Ask */}
      <div className="page-card overflow-hidden border-l-4 border-gcu-gold">
        <div className="p-6 bg-gradient-to-r from-gcu-gold/10 to-transparent dark:from-gcu-gold/5">
          <div className="flex items-center gap-3 mb-1">
            <DollarSign size={22} className="text-gcu-gold" />
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">The Investment Request</h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-5">
            $2.2M seed allocation to establish GCU as the global authority on ethical AI in Christian higher education.
          </p>
          <div className="space-y-3">
            {THE_ASK.map((a, i) => (
              <div key={i} className="flex items-center gap-4 bg-white dark:bg-[#1A1235] rounded-xl px-4 py-3">
                <span className="text-lg font-black text-gcu-gold w-20 flex-shrink-0">{a.amount}</span>
                <span className="text-sm text-slate-700 dark:text-slate-300">{a.purpose}</span>
              </div>
            ))}
            <div className="flex items-center gap-4 bg-gcu-purple rounded-xl px-4 py-3">
              <span className="text-lg font-black text-gcu-gold w-20 flex-shrink-0">$2.2M</span>
              <span className="text-sm text-white font-bold">Total · 12-month runway to $14.5M Year 2 revenue</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="page-card p-5 flex items-start gap-4">
          <AlertCircle size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-black text-slate-900 dark:text-white mb-1">Why Now?</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">The AI gold rush is happening. In 18 months, every major tech company will be targeting Christian institutions. GCU must plant the flag first — or become a customer instead of the authority.</p>
          </div>
        </div>
        <div className="page-card p-5 flex items-start gap-4">
          <Heart size={20} className="text-pink-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-black text-slate-900 dark:text-white mb-1">The GCU Difference</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">We are not selling AI. We are encoding GCU's soul — 50 years of Christ-centered education — into technology that can serve millions of people worldwide, indefinitely.</p>
          </div>
        </div>
        <div className="page-card p-5 flex items-start gap-4">
          <Globe size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-black text-slate-900 dark:text-white mb-1">The Legacy</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">In 10 years, when historians write about ethical AI in Christian higher education, they will write about GCU. This is not a product decision. It is a legacy decision.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-center pb-4">
        <button onClick={() => navigate('/flourish-standard')} className="btn-primary flex items-center gap-2">
          <Award size={16} /> View the Flourish Standard <ArrowRight size={14} />
        </button>
        <button onClick={() => navigate('/vision')} className="btn-secondary flex items-center gap-2">
          <Rocket size={16} /> Full Vision & Roadmap
        </button>
        <button onClick={() => navigate('/commercialization')} className="btn-secondary flex items-center gap-2">
          <TrendingUp size={16} /> Impact Tracker
        </button>
      </div>

    </div>
  );
}
