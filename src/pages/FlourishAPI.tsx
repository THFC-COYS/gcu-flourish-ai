import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code2, Shield, Globe, Zap, CheckCircle2, Copy, Check, ArrowRight, Building2 } from 'lucide-react';

const CODE_EXAMPLE = `// The Flourish API — The Soul Layer for AI
// Give any AI system GCU-certified ethical character

import { FlourishClient } from '@gcu/flourish-api';

const flourish = new FlourishClient({
  apiKey: process.env.FLOURISH_API_KEY,
  vessel: 'spirit-nurse-assistant',  // or any of 10 vessels
});

// Infuse GCU spirit character into any AI response
const response = await flourish.infuse({
  userMessage: "My patient is anxious about surgery tomorrow.",
  baseResponse: await yourAI.generate(userMessage),
  context: { setting: 'pre-op', patientAge: 72 },
});

console.log(response.message);
// → "I understand how unsettling this must feel. Many patients
//    experience anxiety before surgery — it's a deeply human response.
//    Let me walk through what tomorrow will look like, step by step..."

console.log(response.attribution);
// → "This reflects the compassionate pre-op care spirit of GCU
//    nursing alumni (95%+ NCLEX pass rate, Banner Health partners)."

console.log(response.ethicalAlignmentScore);  // → 97
console.log(response.spiritModulesApplied);   // → ['empathy', 'ethics', 'domain']`;

const TIERS = [
  {
    name: 'Internal',
    price: 'Free',
    sub: 'GCU colleges & departments',
    highlight: false,
    features: [
      'All 10 spirit vessels',
      'Full Spirit Infusion Builder',
      'CETLA ethical oversight',
      'Up to 10,000 API calls/month',
      'Testing Zone access',
      'Impact reporting',
    ],
    cta: 'Start Building',
    ctaVariant: 'secondary',
  },
  {
    name: 'Partner',
    price: '$1,200',
    sub: 'per year / per organization',
    highlight: true,
    features: [
      'Choose 2 spirit vessels',
      'Up to 100,000 API calls/month',
      'White-label integration support',
      'CETLA ethical certification badge',
      'Quarterly alignment reviews',
      'Alumni story attribution',
      'Priority support',
    ],
    cta: 'Become a Partner',
    ctaVariant: 'primary',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    sub: 'for health systems, districts, platforms',
    highlight: false,
    features: [
      'All 10 spirit vessels',
      'Unlimited API calls',
      'Custom spirit vessel creation',
      'Dedicated CETLA ethics liaison',
      'EHR / LMS / CRM integration',
      'Phase 2 robotics roadmap access',
      'Co-branding & white-label',
      'SLA guarantee',
    ],
    cta: 'Contact Us',
    ctaVariant: 'secondary',
  },
];

const INTEGRATIONS = [
  { name: 'Epic Systems', desc: 'Infuse Spirit Nurse into EHR patient communication workflows', icon: '💊', category: 'Healthcare' },
  { name: 'Salesforce', desc: 'Give CRM AI the Spirit Servant-Leader ethical coaching layer', icon: '☁️', category: 'Business' },
  { name: 'Canvas LMS', desc: 'Spirit Mentor Avatar inside every course for student support', icon: '📚', category: 'Education' },
  { name: 'Microsoft Teams', desc: 'Spirit Servant-Leader in Copilot for ethical meeting guidance', icon: '💼', category: 'Business' },
  { name: 'Zoom', desc: 'Spirit Nurse Assistant in telehealth visit workflows', icon: '📹', category: 'Healthcare' },
  { name: 'Church Management SW', desc: 'Spirit Faith Companion for pastoral care platforms', icon: '✝️', category: 'Faith' },
  { name: 'AWS Bedrock', desc: 'Flourish API as a character layer over any foundation model', icon: '⚡', category: 'Technology' },
  { name: 'Google Workspace', desc: 'Spirit Research Mentor in Docs for doctoral students', icon: '🔬', category: 'Education' },
];

const CERTIFICATION_STEPS = [
  { step: 1, title: 'Submit Application', desc: 'Organization describes their AI use case and target population.' },
  { step: 2, title: 'CETLA Review', desc: 'GCU\'s ethics team evaluates alignment with human flourishing principles.' },
  { step: 3, title: 'Integration Audit', desc: 'Technical review ensures spirit modules are faithfully implemented.' },
  { step: 4, title: 'Pilot Monitoring', desc: '90-day supervised pilot with real feedback collection.' },
  { step: 5, title: 'Certification Granted', desc: 'Organization receives the "Spirit-Certified AI" seal, valid 1 year.' },
];

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative rounded-xl bg-[#0D0920] border border-[#2D2050] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#2D2050]">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          {copied ? <><Check size={12} className="text-emerald-400" /> Copied</> : <><Copy size={12} /> Copy</>}
        </button>
      </div>
      <pre className="p-5 text-xs text-slate-300 overflow-x-auto leading-relaxed font-mono whitespace-pre">
        {code.split('\n').map((line, i) => {
          const isComment = line.trim().startsWith('//');
          const isKey = /^\s+(const|import|await|console)\b/.test(line);
          return (
            <div key={i} className={isComment ? 'text-slate-500 italic' : isKey ? 'text-purple-300' : ''}>
              {line}
            </div>
          );
        })}
      </pre>
    </div>
  );
}

export default function FlourishAPI() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Healthcare', 'Business', 'Education', 'Faith', 'Technology'];
  const filtered = activeCategory === 'All' ? INTEGRATIONS : INTEGRATIONS.filter(i => i.category === activeCategory);

  return (
    <div className="space-y-8 animate-fade-in">

      {/* ── HERO ── */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0D0920] p-8 sm:p-10 border border-[#2D2050]">
        <div className="absolute inset-0 opacity-5">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            {Array.from({ length: 8 }).map((_, i) => (
              <circle key={i} cx="200" cy="200" r={30 + i * 25} fill="none" stroke="#4B2E83" strokeWidth="1" />
            ))}
          </svg>
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-gcu-purple/30 border border-gcu-purple/40 text-purple-300 text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            <Code2 size={11} />
            Flourish API · Developer Preview
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
            The Soul Layer<br />
            <span className="text-gcu-gold">for Any AI.</span>
          </h1>
          <p className="text-slate-400 text-base leading-relaxed mb-6 max-w-2xl">
            A single API call. GCU-certified ethical character infused into your existing AI.
            Any model. Any platform. Any use case. The same spirit of GCU graduates — serving your users.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="btn-gold flex items-center gap-2 text-sm">
              <Zap size={14} /> Request API Access
            </button>
            <button onClick={() => navigate('/vision')} className="border border-[#2D2050] text-slate-300 font-semibold px-4 py-2.5 rounded-lg hover:bg-white/5 text-sm flex items-center gap-2 transition-colors">
              See the Vision <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ── CODE EXAMPLE ── */}
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <div className="flex items-center gap-2 mb-3">
            <Code2 size={16} className="text-gcu-purple" />
            <h2 className="text-base font-black text-slate-900 dark:text-white">3 Lines to a Soul</h2>
          </div>
          <CodeBlock code={CODE_EXAMPLE} />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <div className="page-card p-5">
            <h3 className="text-sm font-black text-slate-900 dark:text-white mb-4">What the API Gives You</h3>
            <div className="space-y-3">
              {[
                { icon: '✨', title: 'Infused Response', desc: 'Your AI\'s output, re-voiced through the spirit module — same answer, transformed character.' },
                { icon: '🔢', title: 'Ethical Score', desc: 'Real-time 0–100 ethical alignment score for every response generated.' },
                { icon: '📖', title: 'Attribution', desc: 'Transparent citation of which GCU alumni character and curriculum informed the response.' },
                { icon: '🛡️', title: 'Safety Flags', desc: 'Automatic escalation flags when a query exceeds AI competence boundaries.' },
                { icon: '📊', title: 'Impact Metrics', desc: 'Aggregate data on how your users are being served by the spirit layer.' },
              ].map(f => (
                <div key={f.title} className="flex items-start gap-3">
                  <span className="text-lg">{f.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{f.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── PRICING ── */}
      <div>
        <div className="text-center mb-6">
          <h2 className="text-xl font-black text-slate-900 dark:text-white">Licensing Tiers</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Every tier includes CETLA ethical oversight. Revenue reinvested in scholarships.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TIERS.map(tier => (
            <div
              key={tier.name}
              className={`page-card p-6 flex flex-col ${
                tier.highlight
                  ? 'border-gcu-purple ring-2 ring-gcu-purple/20 shadow-gcu'
                  : ''
              }`}
            >
              {tier.highlight && (
                <div className="text-center mb-3">
                  <span className="text-xs bg-gcu-purple text-white font-bold px-3 py-1 rounded-full uppercase tracking-wide">Most Popular</span>
                </div>
              )}
              <div className="mb-5">
                <h3 className="font-black text-slate-900 dark:text-white text-lg">{tier.name}</h3>
                <div className="flex items-end gap-1 mt-1">
                  <span className="text-3xl font-black text-gcu-purple dark:text-purple-300">{tier.price}</span>
                  {tier.price !== 'Custom' && tier.price !== 'Free' && (
                    <span className="text-slate-400 text-sm mb-1">/yr</span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{tier.sub}</p>
              </div>
              <ul className="space-y-2 flex-1 mb-6">
                {tier.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <CheckCircle2 size={13} className="text-gcu-purple mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={tier.ctaVariant === 'primary' ? 'btn-primary w-full' : 'btn-secondary w-full'}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── INTEGRATIONS ── */}
      <div className="page-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Globe size={16} className="text-slate-400" />
          <h2 className="text-base font-black text-slate-900 dark:text-white">Integration Ecosystem</h2>
        </div>
        <div className="flex flex-wrap gap-2 mb-5">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                activeCategory === c
                  ? 'bg-gcu-purple text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {filtered.map(intg => (
            <div key={intg.name} className="p-4 rounded-xl border border-slate-200 dark:border-[#2D2050] hover:border-gcu-purple/40 hover:bg-gcu-purple-pale dark:hover:bg-gcu-purple/5 transition-all group">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{intg.icon}</span>
                <span className="text-xs font-bold text-gcu-purple/60 dark:text-purple-400/60">{intg.category}</span>
              </div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-gcu-purple dark:group-hover:text-purple-300 transition-colors">{intg.name}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{intg.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CERTIFICATION PROCESS ── */}
      <div className="page-card p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-11 h-11 rounded-xl bg-gcu-purple flex items-center justify-center flex-shrink-0">
            <Shield size={20} className="text-gcu-gold" />
          </div>
          <div>
            <h2 className="text-base font-black text-slate-900 dark:text-white">Spirit-Certified AI: The Process</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              The "Spirit-Certified" seal tells your users: this AI has been proven ethical by the university that pioneered ethical AI character.
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-5 gap-3">
          {CERTIFICATION_STEPS.map((s, i) => (
            <div key={s.step} className="flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gcu-purple flex items-center justify-center text-gcu-gold font-black text-sm flex-shrink-0">
                {s.step}
              </div>
              {i < CERTIFICATION_STEPS.length - 1 && (
                <div className="hidden sm:block absolute w-full h-0.5 bg-slate-200 dark:bg-[#2D2050]" />
              )}
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{s.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="page-card p-6 purple-gradient text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
          <Building2 size={12} />
          Ready to Give Your AI a Soul?
        </div>
        <h2 className="text-2xl font-black text-white mb-3">Start with the Flourish API</h2>
        <p className="text-white/60 text-sm max-w-lg mx-auto mb-6">
          Join Banner Health, the Arizona Christian Business Alliance, and Intel in building AI that doesn't just perform — it cares.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button className="btn-gold flex items-center gap-2">
            <Zap size={15} /> Request Access
          </button>
          <button onClick={() => navigate('/vision')} className="border border-white/30 text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-white/10 text-sm flex items-center gap-2 transition-colors">
            Read the Vision <ArrowRight size={14} />
          </button>
        </div>
      </div>

    </div>
  );
}
