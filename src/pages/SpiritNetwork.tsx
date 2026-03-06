import { useState } from 'react';
import { Heart, Users, Zap, MessageSquare, Upload, CheckCircle2, Star, ArrowRight } from 'lucide-react';

const MOCK_TESTIMONIALS = [
  {
    id: 't1',
    name: 'Jennifer Okafor, RN',
    college: 'College of Nursing',
    year: "GCU '18",
    avatar: 'J',
    color: '#E0F2FE',
    story: 'I once sat with a frightened 84-year-old woman for 45 minutes before her surgery — not because protocol required it, but because she needed someone to hold her hand and pray with her. That\'s what GCU trained me to do. I want every AI that speaks to a patient to carry that same impulse.',
    vessel: 'Spirit Nurse Assistant',
    interactions: 12847,
  },
  {
    id: 't2',
    name: 'Dr. Michael Torres',
    college: 'Colangelo College of Business',
    year: "GCU '12",
    avatar: 'M',
    color: '#FEF9C3',
    story: 'When I faced a board pushing me to lay off 40 employees for a quarterly number, I remembered Dr. Chen\'s class on servant-leadership. I found a third way. Those 40 people are still employed, and the company is stronger. That discernment is what I\'m contributing to the Spirit Consultant.',
    vessel: 'Spirit Servant-Leader Consultant',
    interactions: 8234,
  },
  {
    id: 't3',
    name: 'Pastor Samuel Briggs',
    college: 'College of Theology',
    year: "GCU '15",
    avatar: 'S',
    color: '#EDE9FE',
    story: 'I\'ve sat with 200 people in their darkest hours. Grief, addiction, doubt, loss of faith. What I\'ve learned is this: don\'t rush to the answer. Sit in the darkness with them first. That\'s what I\'m teaching the Spirit Faith Companion — to be present before it speaks.',
    vessel: 'Spirit Faith Companion',
    interactions: 5621,
  },
  {
    id: 't4',
    name: 'Maya Chen, EdD',
    college: 'College of Education',
    year: "GCU '16",
    avatar: 'M',
    color: '#DCFCE7',
    story: 'The student nobody believed in became the one who believed in others. I teach my students that every child is a world — a whole universe of potential. That\'s not sentiment, it\'s the foundation of effective teaching. I\'m giving that conviction to the Spirit Mentor.',
    vessel: 'Spirit Mentor Avatar',
    interactions: 3892,
  },
  {
    id: 't5',
    name: 'Dr. Rachel Kim',
    college: 'College of Natural Sciences',
    year: "GCU '14",
    avatar: 'R',
    color: '#ECFDF5',
    story: 'The moment that defined my scientific career was when a colleague suggested manipulating data to secure funding. I refused, we lost the grant, and two years later our honest research led to a breakthrough that would have been impossible on false foundations. Truth is never a liability in science.',
    vessel: 'Spirit Discovery Guide',
    interactions: 2104,
  },
  {
    id: 't6',
    name: 'Carlos Mendez, LCSW',
    college: 'College of Humanities',
    year: "GCU '19",
    avatar: 'C',
    color: '#FEE2E2',
    story: 'I work with formerly incarcerated youth. The system sees statistics. I see Elijah, Marcus, and Destiny — real people with extraordinary resilience who deserve a counselor who shows up for them the way no one ever has. That\'s the spirit I\'m infusing into the Ethical Companion.',
    vessel: 'Spirit Ethical Companion',
    interactions: 1876,
  },
];

const COLLEGES_FOR_FORM = [
  'College of Nursing and Health Care Professions',
  'Colangelo College of Business (CCOB)',
  'College of Education',
  'College of Engineering and Technology',
  'College of Humanities and Social Sciences',
  'College of Natural Sciences',
  'College of Theology',
  'College of Arts and Media',
  'College of Doctoral Studies',
  'Honors College',
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Alumni Contribute', desc: 'GCU graduates submit defining stories, ethical decisions, and wisdom through the Spirit Network portal.', icon: '🎓' },
  { step: '02', title: 'CETLA Reviews', desc: 'Our ethics team verifies, contextualizes, and distills each contribution into spirit infusion parameters.', icon: '🔍' },
  { step: '03', title: 'Vessels Updated', desc: 'Living spirit vessels are enriched with new wisdom — becoming more nuanced, compassionate, and wise over time.', icon: '✨' },
  { step: '04', title: 'Impact Attributed', desc: 'Each alumnus sees a live count of how many people their contributed wisdom has served. Your spirit, multiplied.', icon: '🌍' },
];

function TestimonialCard({ t }: { t: typeof MOCK_TESTIMONIALS[0] }) {
  const [expanded, setExpanded] = useState(false);
  const preview = t.story.slice(0, 140) + (t.story.length > 140 ? '…' : '');
  return (
    <div className="page-card p-5 flex flex-col gap-4 hover:shadow-card-hover transition-all">
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-slate-700 font-black text-base flex-shrink-0"
          style={{ background: t.color }}
        >
          {t.avatar}
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-white">{t.name}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{t.college.replace('Colangelo ', '')} · {t.year}</p>
        </div>
      </div>

      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
        "{expanded ? t.story : preview}"
        {t.story.length > 140 && (
          <button
            onClick={() => setExpanded(e => !e)}
            className="ml-1 text-gcu-purple dark:text-purple-400 font-semibold not-italic hover:underline"
          >
            {expanded ? 'less' : 'more'}
          </button>
        )}
      </p>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-[#2D2050]">
        <div className="flex items-center gap-1.5">
          <Zap size={11} className="text-gcu-purple" />
          <span className="text-xs text-gcu-purple dark:text-purple-400 font-semibold">{t.vessel.replace('GCU ', '').replace('Spirit ', '')}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users size={11} className="text-slate-400" />
          <span className="text-xs text-slate-500 dark:text-slate-500 font-medium">{t.interactions.toLocaleString()} interactions served</span>
        </div>
      </div>
    </div>
  );
}

export default function SpiritNetwork() {
  const [formData, setFormData] = useState({
    name: '', college: '', yearGraduated: '', vessel: '', story: '', consent: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const totalInteractions = MOCK_TESTIMONIALS.reduce((s, t) => s + t.interactions, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-8 animate-fade-in">

      {/* ── HERO ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gcu-purple via-gcu-purple-dark to-[#1A0F35] p-8 sm:p-10">
        <svg className="absolute bottom-0 right-0 opacity-10 w-64 h-64" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#FFC627" strokeWidth="2" />
          <circle cx="100" cy="100" r="55" fill="none" stroke="#FFC627" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="30" fill="none" stroke="#FFC627" strokeWidth="1" />
        </svg>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-gcu-gold/20 border border-gcu-gold/30 text-gcu-gold text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            <Heart size={11} />
            The Spirit Network
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Your Spirit,<br />
            <span className="text-gcu-gold">Multiplied Infinitely.</span>
          </h1>
          <p className="text-white/70 text-base leading-relaxed mb-6">
            GCU graduates are not just alumni — they are the living source code of our AI.
            Every story, every hard decision, every moment of grace you've modeled becomes
            wisdom that serves thousands. Your character doesn't retire. It multiplies.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: '847', label: 'Alumni Contributors' },
              { value: totalInteractions.toLocaleString(), label: 'Interactions Served' },
              { value: '10', label: 'Spirit Vessels' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black text-gcu-gold">{s.value}</div>
                <div className="text-xs text-white/50">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div className="page-card p-6">
        <h2 className="text-base font-black text-slate-900 dark:text-white mb-5">How the Spirit Network Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HOW_IT_WORKS.map(step => (
            <div key={step.step} className="relative">
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-gcu-purple flex items-center justify-center text-gcu-gold font-black text-sm flex-shrink-0">
                    {step.step}
                  </div>
                </div>
                <div>
                  <div className="text-xl mb-1">{step.icon}</div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{step.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── TESTIMONIALS GRID ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MessageSquare size={16} className="text-slate-400" />
            <h2 className="text-base font-black text-slate-900 dark:text-white">Living Testimonies</h2>
            <span className="text-xs bg-gcu-purple/10 text-gcu-purple dark:text-purple-300 px-2 py-0.5 rounded-full font-semibold">{MOCK_TESTIMONIALS.length} featured</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-slow" />
            Live feed
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_TESTIMONIALS.map(t => <TestimonialCard key={t.id} t={t} />)}
        </div>
      </div>

      {/* ── CONTRIBUTE FORM ── */}
      <div className="page-card p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-11 h-11 rounded-xl bg-gcu-gold/20 flex items-center justify-center flex-shrink-0">
            <Heart size={20} className="text-gcu-gold" />
          </div>
          <div>
            <h2 className="text-base font-black text-slate-900 dark:text-white">Contribute Your Spirit</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Every GCU alumnus can submit wisdom, stories, and ethical decisions to living spirit vessels.
              Your contribution is reviewed by CETLA, attributed to you, and tracked for impact.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="flex items-center gap-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6">
            <CheckCircle2 size={32} className="text-emerald-500 flex-shrink-0" />
            <div>
              <p className="font-bold text-emerald-800 dark:text-emerald-300 text-base">Thank you, {formData.name.split(' ')[0] || 'Alumnus'}.</p>
              <p className="text-sm text-emerald-700 dark:text-emerald-400 mt-1">
                Your contribution is under CETLA review. Within 5–7 days, your wisdom will begin serving others through the {formData.vessel || 'Spirit Vessel'}.
                You'll receive an email when it goes live — and from that moment, every interaction it informs will be counted and attributed to you.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Full Name *</label>
              <input
                className="form-input"
                placeholder="Dr. Jane Smith"
                value={formData.name}
                onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="form-label">Year Graduated *</label>
              <input
                className="form-input"
                placeholder="e.g., 2018"
                value={formData.yearGraduated}
                onChange={e => setFormData(f => ({ ...f, yearGraduated: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="form-label">GCU College *</label>
              <select
                className="form-input"
                value={formData.college}
                onChange={e => setFormData(f => ({ ...f, college: e.target.value }))}
                required
              >
                <option value="">Select your college…</option>
                {COLLEGES_FOR_FORM.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Spirit Vessel to Contribute To *</label>
              <select
                className="form-input"
                value={formData.vessel}
                onChange={e => setFormData(f => ({ ...f, vessel: e.target.value }))}
                required
              >
                <option value="">Select a vessel…</option>
                <option>Spirit Nurse Assistant</option>
                <option>Spirit Servant-Leader Consultant</option>
                <option>Spirit Mentor Avatar</option>
                <option>Spirit Stewardship Innovator</option>
                <option>Spirit Ethical Companion</option>
                <option>Spirit Discovery Guide</option>
                <option>Spirit Faith Companion</option>
                <option>Spirit Creative Steward</option>
                <option>Spirit Research Mentor</option>
                <option>Spirit Elite Innovator</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="form-label">Your Story or Wisdom *</label>
              <div className="flex gap-2 mb-2">
                <button type="button" className="flex items-center gap-1.5 text-xs text-gcu-purple dark:text-purple-400 border border-gcu-purple/30 px-3 py-1.5 rounded-lg hover:bg-gcu-purple-pale transition-colors">
                  <Upload size={12} /> Upload video clip (2 min)
                </button>
              </div>
              <textarea
                className="form-input min-h-[140px] resize-y"
                placeholder="Share a specific story, ethical decision, moment of grace, or piece of hard-won wisdom from your career that you want the AI to carry forward…&#10;&#10;Be specific. The more concrete the story, the more authentically the AI can embody it."
                value={formData.story}
                onChange={e => setFormData(f => ({ ...f, story: e.target.value }))}
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-0.5 w-4 h-4 rounded accent-gcu-purple"
                  checked={formData.consent}
                  onChange={e => setFormData(f => ({ ...f, consent: e.target.checked }))}
                  required
                />
                <span className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  I consent to GCU using my story and wisdom to train and enrich spirit vessel AI models. I understand my contribution will be attributed to me by name (with my approval), and I will receive impact reports showing how many people my wisdom has served. GCU will never sell or share my contribution outside the Flourish AI platform without my explicit consent.
                </span>
              </label>
            </div>
            <div className="sm:col-span-2">
              <button type="submit" className="btn-primary flex items-center gap-2">
                <Heart size={16} /> Submit My Spirit Contribution <ArrowRight size={14} />
              </button>
            </div>
          </form>
        )}
      </div>

      {/* ── IMPACT LEADERBOARD ── */}
      <div className="page-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Star size={16} className="text-gcu-gold" />
          <h2 className="text-base font-black text-slate-900 dark:text-white">Top Spirit Contributors</h2>
          <span className="text-xs text-slate-400 dark:text-slate-500">by interactions served</span>
        </div>
        <div className="space-y-2">
          {MOCK_TESTIMONIALS.sort((a, b) => b.interactions - a.interactions).map((t, i) => (
            <div key={t.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#1A1235] border border-transparent hover:border-gcu-purple/20 transition-colors">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${
                i === 0 ? 'bg-gcu-gold text-gcu-purple-dark' :
                i === 1 ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300' :
                i === 2 ? 'bg-amber-600/20 text-amber-700 dark:text-amber-400' :
                'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}>{i + 1}</div>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-700 font-bold text-sm flex-shrink-0"
                style={{ background: t.color }}
              >{t.avatar}</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">{t.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{t.vessel.replace('GCU ', '')}</p>
              </div>
              <div className="flex items-center gap-1">
                <Users size={12} className="text-gcu-purple" />
                <span className="text-sm font-black text-gcu-purple dark:text-purple-300">{t.interactions.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
