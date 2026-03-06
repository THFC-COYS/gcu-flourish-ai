import { useNavigate } from 'react-router-dom';
import {
  Shield, Award, Globe, Heart, Eye, Lightbulb,
  CheckCircle2, ArrowRight, Star, Users, Building2,
  ChevronRight, Zap, Lock, Rocket
} from 'lucide-react';

const PILLARS = [
  {
    id: '01',
    icon: Eye,
    title: 'Truth & Transparency',
    desc: 'Every AI interaction must be clearly identified as AI. Users always know they are speaking with an AI, understand its limitations, and retain full agency over their decisions. No manipulation, no deception.',
    principles: ['AI identity always disclosed', 'Uncertainty communicated clearly', 'Human override available at all times', 'Data sources attributable'],
    color: 'from-blue-500 to-blue-700',
    bg: 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    id: '02',
    icon: Heart,
    title: 'Human Dignity',
    desc: 'AI must honor the Imago Dei — the image of God in every person. No interaction may demean, reduce, or replace the irreplaceable value of human connection, pastoral care, or clinical judgment.',
    principles: ['No AI substitution for pastoral crisis care', 'Emotional sensitivity required in all responses', 'Vulnerable populations receive elevated protections', 'Cultural and spiritual context respected'],
    color: 'from-pink-500 to-rose-700',
    bg: 'bg-pink-50 dark:bg-pink-900/10 border-pink-200 dark:border-pink-800',
    iconBg: 'bg-pink-100 dark:bg-pink-900/30',
    iconColor: 'text-pink-600 dark:text-pink-400',
  },
  {
    id: '03',
    icon: Shield,
    title: 'Ethical Stewardship',
    desc: 'Organizations deploying Flourish-certified AI accept fiduciary responsibility for how the AI is used. Revenue generated must be reinvested in student outcomes, community benefit, or mission-aligned causes.',
    principles: ['Revenue reinvestment audit required annually', 'Ethical impact reporting to governing board', 'No use in predatory or manipulative systems', 'Mission alignment review every 24 months'],
    color: 'from-gcu-purple to-purple-800',
    bg: 'bg-purple-50 dark:bg-purple-900/10 border-purple-200 dark:border-purple-800',
    iconBg: 'bg-purple-100 dark:bg-purple-900/30',
    iconColor: 'text-gcu-purple dark:text-purple-400',
  },
  {
    id: '04',
    icon: Lightbulb,
    title: 'Discernment by Design',
    desc: 'AI systems must be designed to guide users toward wisdom, not dependence. The goal is always human flourishing — building capacity, not creating reliance. AI should make people more capable, not less.',
    principles: ['No addictive or engagement-maximizing patterns', 'Users directed to human professionals when needed', 'Critical thinking scaffolded, not replaced', 'Dependency patterns flagged and addressed'],
    color: 'from-amber-500 to-yellow-600',
    bg: 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800',
    iconBg: 'bg-yellow-100 dark:bg-yellow-900/30',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
  },
  {
    id: '05',
    icon: Globe,
    title: 'Service to the World',
    desc: 'Flourish-certified AI must demonstrate measurable positive impact beyond the organization itself — in communities, healthcare access, educational equity, and global mission. Profit is never the primary purpose.',
    principles: ['Annual community impact report required', 'Minimum 10% of net revenue to mission', 'Accessibility standards for all users', 'International equity provisions for low-resource settings'],
    color: 'from-emerald-500 to-teal-700',
    bg: 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
];

const TIERS = [
  {
    name: 'Foundation',
    icon: '🏛️',
    price: '$8,500/yr',
    forWho: 'Small nonprofits, local churches, community colleges',
    features: [
      'Flourish Standard compliance audit',
      'Certified badge for digital properties',
      'Annual self-assessment toolkit',
      'Access to Flourish Standard policy library',
    ],
    color: 'border-slate-300 dark:border-slate-600',
    badge: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  },
  {
    name: 'Practitioner',
    icon: '⚡',
    price: '$24,000/yr',
    forWho: 'Universities, mid-size healthcare systems, denominations',
    features: [
      'Everything in Foundation',
      'GCU Spirit Layer API access (50K calls/mo)',
      'On-site compliance training (2 sessions/yr)',
      'Quarterly ethical alignment review',
      'Listed in Flourish Standard global registry',
    ],
    color: 'border-gcu-purple dark:border-purple-500',
    badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    featured: true,
  },
  {
    name: 'Architect',
    icon: '🚀',
    price: '$85,000/yr',
    forWho: 'Large health systems, government, global mission orgs',
    features: [
      'Everything in Practitioner',
      'Custom Spirit Layer configuration',
      'Unlimited API access',
      'Dedicated Flourish AI advisor',
      'Co-authorship in Standard updates',
      'Early access to Robotics & Wearables modules',
    ],
    color: 'border-gcu-gold dark:border-yellow-500',
    badge: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  },
];

const SECTORS = [
  {
    icon: Building2,
    title: 'Christian Higher Education',
    count: '33,000+',
    unit: 'institutions globally',
    desc: 'From GCU to universities in Nigeria, Brazil, South Korea, and beyond — every Christian campus needs an ethical AI framework they can trust.',
    color: 'text-gcu-purple',
    bg: 'bg-purple-50 dark:bg-purple-900/10',
  },
  {
    icon: Heart,
    title: 'Faith-Based Healthcare',
    count: '600+',
    unit: 'US hospital systems',
    desc: 'Banner Health, Intermountain Health, Adventist Health, and hundreds more are actively searching for ethical AI frameworks aligned with their mission.',
    color: 'text-pink-500',
    bg: 'bg-pink-50 dark:bg-pink-900/10',
  },
  {
    icon: Users,
    title: 'Church Networks & Denominations',
    count: '45,000+',
    unit: 'US congregations with staff',
    desc: 'Pastoral counseling, youth ministry coaching, grief support, discipleship mentoring — every church can have an AI spirit vessel grounded in their doctrine.',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-900/10',
  },
  {
    icon: Globe,
    title: 'Government & Military Chaplaincy',
    count: '2,300+',
    unit: 'active military chaplains (US)',
    desc: 'The US military, prison systems, and VA hospitals all employ chaplains. Flourish-certified AI can extend their reach to underserved populations at scale.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-900/10',
  },
];

const COMPARISON = [
  { criterion: 'Christian worldview integrated', flourish: true, ieee: false, euAiAct: false, openAiPolicy: false },
  { criterion: 'Imago Dei as ethical foundation', flourish: true, ieee: false, euAiAct: false, openAiPolicy: false },
  { criterion: 'Spirit Layer / soul architecture', flourish: true, ieee: false, euAiAct: false, openAiPolicy: false },
  { criterion: 'Pastoral & clinical guidance built-in', flourish: true, ieee: false, euAiAct: false, openAiPolicy: false },
  { criterion: 'Mission revenue reinvestment required', flourish: true, ieee: false, euAiAct: false, openAiPolicy: false },
  { criterion: 'Academic credentialing authority', flourish: true, ieee: true, euAiAct: false, openAiPolicy: false },
  { criterion: 'Bias & fairness standards', flourish: true, ieee: true, euAiAct: true, openAiPolicy: true },
  { criterion: 'Privacy & data protection', flourish: true, ieee: true, euAiAct: true, openAiPolicy: true },
];

function Check({ val }: { val: boolean }) {
  return val
    ? <CheckCircle2 size={16} className="text-emerald-500 mx-auto" />
    : <span className="text-slate-300 dark:text-slate-700 text-lg leading-none mx-auto block text-center">—</span>;
}

export default function FlourishStandard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-10 animate-fade-in max-w-5xl mx-auto">

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1A0D3A] to-[#4B2E83] p-8 sm:p-12">
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 800 300" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,300 Q400,50 800,200 L800,300 Z" fill="#FFC627" />
          </svg>
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-gcu-gold/20 border border-gcu-gold/30 text-gcu-gold text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            <Award size={12} /> The Flourish Standard · v1.0 Draft
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
            The World's First Ethical AI Certification Framework for Faith-Based Institutions
          </h1>
          <p className="text-white/70 text-base leading-relaxed mb-6">
            Developed by Grand Canyon University, the Flourish Standard establishes the global benchmark for how artificial intelligence must be designed, deployed, and governed inside organizations that operate from a faith-based, Christ-centered, or human dignity-first mission.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="bg-white/10 border border-white/20 text-white text-sm px-4 py-1.5 rounded-full font-semibold flex items-center gap-1.5"><Lock size={12} /> GCU-Owned IP</span>
            <span className="bg-white/10 border border-white/20 text-white text-sm px-4 py-1.5 rounded-full font-semibold flex items-center gap-1.5"><Globe size={12} /> Global Applicability</span>
            <span className="bg-white/10 border border-white/20 text-white text-sm px-4 py-1.5 rounded-full font-semibold flex items-center gap-1.5"><Star size={12} /> Zero Competitors</span>
          </div>
        </div>
      </div>

      {/* 5 Pillars */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-8 rounded-full bg-gcu-purple" />
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">The Five Pillars</h2>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 ml-4">Every Flourish-certified organization must demonstrate compliance across all five pillars annually.</p>
        <div className="space-y-4">
          {PILLARS.map(p => (
            <div key={p.id} className={`page-card border ${p.bg} overflow-hidden`}>
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${p.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <p.icon size={22} className={p.iconColor} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-black text-slate-400 dark:text-slate-500 tracking-widest">PILLAR {p.id}</span>
                      <h3 className="text-lg font-black text-slate-900 dark:text-white">{p.title}</h3>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{p.desc}</p>
                    <div className="grid sm:grid-cols-2 gap-1.5">
                      {p.principles.map((pr, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <ChevronRight size={13} className={`${p.iconColor} mt-0.5 flex-shrink-0`} />
                          <span className="text-xs text-slate-600 dark:text-slate-400">{pr}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certification Tiers */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1 h-8 rounded-full bg-gcu-gold" />
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Certification Tiers</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {TIERS.map(t => (
            <div key={t.name} className={`page-card p-6 border-t-4 ${t.color} flex flex-col gap-4 ${t.featured ? 'ring-2 ring-gcu-purple dark:ring-purple-500' : ''}`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl mr-1">{t.icon}</span>
                  <span className="text-lg font-black text-slate-900 dark:text-white">{t.name}</span>
                </div>
                {t.featured && (
                  <span className="text-xs font-bold bg-gcu-purple text-white px-2.5 py-1 rounded-full">Most Popular</span>
                )}
              </div>
              <div>
                <p className="text-3xl font-black text-gcu-purple dark:text-purple-300">{t.price}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.forWho}</p>
              </div>
              <ul className="space-y-2 flex-1">
                {t.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <CheckCircle2 size={13} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button className="btn-secondary w-full text-sm flex items-center justify-center gap-2 mt-2">
                Apply for Certification <ArrowRight size={13} />
              </button>
            </div>
          ))}
        </div>
        <p className="text-xs text-center text-slate-400 mt-3">* All pricing illustrative. GCU retains full ownership of the Flourish Standard trademark and certification process.</p>
      </div>

      {/* Who Needs This */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1 h-8 rounded-full bg-blue-500" />
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">The Addressable Market</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {SECTORS.map(s => (
            <div key={s.title} className={`page-card p-6 ${s.bg}`}>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-white dark:bg-[#1A1235] shadow-sm flex items-center justify-center flex-shrink-0">
                  <s.icon size={20} className={s.color} />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 dark:text-white mb-0.5">{s.title}</h3>
                  <p className="text-2xl font-black text-slate-700 dark:text-slate-300">{s.count} <span className="text-sm font-semibold text-slate-500">{s.unit}</span></p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1 h-8 rounded-full bg-emerald-500" />
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">How We Compare</h2>
        </div>
        <div className="page-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-[#2D2050]">
                  <th className="text-left px-4 py-3 font-black text-slate-700 dark:text-slate-300 w-1/2">Criterion</th>
                  <th className="px-4 py-3 font-black text-gcu-purple dark:text-purple-300 text-center">
                    <div className="flex flex-col items-center gap-0.5">
                      <Award size={14} />
                      Flourish Standard
                    </div>
                  </th>
                  <th className="px-4 py-3 font-semibold text-slate-500 text-center text-xs">IEEE Ethics</th>
                  <th className="px-4 py-3 font-semibold text-slate-500 text-center text-xs">EU AI Act</th>
                  <th className="px-4 py-3 font-semibold text-slate-500 text-center text-xs">OpenAI Policy</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={i} className={`border-b border-slate-50 dark:border-[#2D2050]/50 ${i % 2 === 0 ? 'bg-slate-50/50 dark:bg-white/[0.02]' : ''}`}>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-medium">{row.criterion}</td>
                    <td className="px-4 py-3"><Check val={row.flourish} /></td>
                    <td className="px-4 py-3"><Check val={row.ieee} /></td>
                    <td className="px-4 py-3"><Check val={row.euAiAct} /></td>
                    <td className="px-4 py-3"><Check val={row.openAiPolicy} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Vision statement */}
      <div className="rounded-2xl bg-gradient-to-br from-[#0D0920] to-[#1A0D3A] p-8 text-center">
        <Zap size={32} className="text-gcu-gold mx-auto mb-4" />
        <h2 className="text-2xl font-black text-white mb-3">
          "We are not building a product.<br />We are writing the rulebook."
        </h2>
        <p className="text-white/60 text-sm max-w-2xl mx-auto leading-relaxed mb-6">
          When GCU publishes the Flourish Standard and 25 institutions adopt it, we become the accrediting authority for ethical AI in Christian higher education. That network effect is irreversible. The institutions that delay will become our customers — not our competitors.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={() => navigate('/executive-brief')} className="btn-primary flex items-center gap-2">
            <Rocket size={16} /> Executive Briefing <ArrowRight size={14} />
          </button>
          <button onClick={() => navigate('/flourish-api')} className="btn-secondary flex items-center gap-2">
            <Zap size={16} /> Flourish API
          </button>
        </div>
      </div>

    </div>
  );
}
