import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Eye, EyeOff, AlertCircle, Sparkles, CheckCircle2,
  ArrowRight, Shield, Heart, Zap, Users, Star, Building2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DEMO_CREDENTIALS } from '../data/mockData';

const STATS = [
  { value: '2.4M+', label: 'Patient & Student Interactions' },
  { value: '94%', label: 'Ethical Alignment Score' },
  { value: '127', label: 'Partner Organizations' },
  { value: '0', label: 'Data Sold. Ever.' },
];

const INDUSTRIES = [
  { icon: '🏥', label: 'Healthcare', desc: 'Nurse burnout, patient education, discharge coaching' },
  { icon: '🎓', label: 'Education', desc: 'Advisor bots, tutoring, career mentorship' },
  { icon: '💼', label: 'Enterprise', desc: 'HR onboarding, servant-leader coaching, ethics training' },
  { icon: '⛪', label: 'Nonprofits', desc: 'Community outreach, spiritual care, counseling support' },
];

const TRUST_BADGES = [
  { icon: Shield, label: 'HIPAA Ready' },
  { icon: CheckCircle2, label: 'SOC 2 Type II' },
  { icon: Star, label: 'Ethical AI Certified' },
  { icon: Heart, label: 'Christ-Centered Values' },
];

type Panel = 'login' | 'demo';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [panel, setPanel] = useState<Panel>('login');

  // Login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Demo request state
  const [demoName, setDemoName] = useState('');
  const [demoOrg, setDemoOrg] = useState('');
  const [demoEmail, setDemoEmail] = useState('');
  const [demoUseCase, setDemoUseCase] = useState('');
  const [demoSent, setDemoSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error ?? 'Login failed.');
    }
  };

  const handleDemoRequest = (e: FormEvent) => {
    e.preventDefault();
    setDemoSent(true);
  };

  const fillDemo = (cred: typeof DEMO_CREDENTIALS[0]) => {
    setEmail(cred.email);
    setPassword(cred.password);
    setError('');
  };

  return (
    <div className="min-h-screen flex canyon-bg">

      {/* ── Left panel – marketing ─────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[58%] purple-gradient relative overflow-hidden flex-col justify-between p-12">
        {/* Canyon silhouette */}
        <svg className="absolute bottom-0 left-0 right-0 opacity-10" viewBox="0 0 800 200" preserveAspectRatio="none">
          <path d="M0,200 L0,120 Q100,60 200,100 Q300,140 400,80 Q500,20 600,70 Q700,120 800,90 L800,200 Z" fill="white" />
        </svg>
        <svg className="absolute bottom-0 left-0 right-0 opacity-6" viewBox="0 0 800 200" preserveAspectRatio="none">
          <path d="M0,200 L0,150 Q150,90 300,130 Q450,170 600,110 Q700,80 800,120 L800,200 Z" fill="#FFC627" />
        </svg>

        {/* Logo */}
        <div className="flex items-center gap-3 z-10">
          <div className="w-12 h-12 rounded-xl bg-gcu-gold flex items-center justify-center">
            <span className="font-black text-gcu-purple-dark text-lg">GCU</span>
          </div>
          <div>
            <div className="text-white font-bold text-xl">Flourish AI</div>
            <div className="text-white/50 text-sm">Grand Canyon University</div>
          </div>
        </div>

        {/* Hero copy */}
        <div className="z-10 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-gcu-gold/20 border border-gcu-gold/30 text-gcu-gold text-sm font-semibold px-4 py-2 rounded-full mb-5">
              <Sparkles size={14} />
              The World's First Soul-Infused AI Platform
            </div>
            <h1 className="text-4xl xl:text-5xl font-black text-white leading-tight mb-4">
              AI that acts with{' '}
              <span className="text-gcu-gold">compassion,</span>
              <br />not just intelligence.
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-lg">
              We embed the character of GCU's most compassionate graduates — servant-leadership,
              integrity, and Christ-centered values — directly into AI tools your organization can deploy today.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-4 gap-3">
            {STATS.map(s => (
              <div key={s.label} className="glass-card rounded-xl p-3 text-center">
                <div className="text-xl font-black text-gcu-gold">{s.value}</div>
                <div className="text-white/60 text-xs mt-0.5 leading-tight">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Industries */}
          <div>
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">Built for your industry</p>
            <div className="grid grid-cols-2 gap-2">
              {INDUSTRIES.map(ind => (
                <div key={ind.label} className="glass-card rounded-xl p-3 flex items-start gap-3">
                  <span className="text-xl flex-shrink-0">{ind.icon}</span>
                  <div>
                    <div className="text-white text-sm font-bold">{ind.label}</div>
                    <div className="text-white/50 text-xs leading-tight mt-0.5">{ind.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="glass-card rounded-2xl p-5">
            <p className="text-white/80 text-sm leading-relaxed italic">
              "Flourish AI reduced our nursing documentation time by 34% — but more importantly,
              our staff said it actually <span className="text-gcu-gold font-semibold">felt human.</span> That's something no other platform delivered."
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-8 h-8 rounded-full bg-gcu-gold/20 border border-gcu-gold/30 flex items-center justify-center text-gcu-gold font-bold text-sm">B</div>
              <div>
                <div className="text-white text-sm font-semibold">Banner Health System</div>
                <div className="text-white/40 text-xs">Pilot Partner · Phoenix, AZ</div>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 bg-white/10 border border-white/20 text-white/80 text-xs font-semibold px-3 py-1.5 rounded-full">
                <Icon size={12} className="text-gcu-gold" />
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="z-10 text-white/30 text-xs">
          © 2026 Grand Canyon University · Flourish AI Platform · All rights reserved.
        </div>
      </div>

      {/* ── Right panel – login / demo request ────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-white dark:bg-[#0D0920]">
        <div className="w-full max-w-sm animate-slide-up">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gcu-purple flex items-center justify-center">
              <span className="font-black text-gcu-gold text-sm">GCU</span>
            </div>
            <div>
              <div className="text-slate-900 dark:text-white font-bold text-lg">Flourish AI</div>
              <div className="text-slate-500 text-xs">Ethical AI Platform</div>
            </div>
          </div>

          {/* Tab switcher */}
          <div className="flex bg-slate-100 dark:bg-[#1A1235] rounded-xl p-1 mb-8">
            <button
              onClick={() => setPanel('login')}
              className={`flex-1 text-sm font-semibold py-2 rounded-lg transition-all ${
                panel === 'login'
                  ? 'bg-white dark:bg-[#2D2050] text-gcu-purple dark:text-purple-300 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Partner Login
            </button>
            <button
              onClick={() => setPanel('demo')}
              className={`flex-1 text-sm font-semibold py-2 rounded-lg transition-all ${
                panel === 'demo'
                  ? 'bg-white dark:bg-[#2D2050] text-gcu-purple dark:text-purple-300 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Request a Demo
            </button>
          </div>

          {/* ── Login form ── */}
          {panel === 'login' && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Welcome back</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
                  Sign in to your Flourish AI workspace.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="you@flourishai.edu"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label className="form-label">Password</label>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      className="form-input pr-10"
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      onClick={() => setShowPass(s => !s)}
                    >
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="flex items-start gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg px-3 py-2.5 text-sm">
                    <AlertCircle size={15} className="mt-0.5 flex-shrink-0" />
                    {error}
                  </div>
                )}

                <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing in…
                    </span>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-4">
                Not a partner yet?{' '}
                <button
                  onClick={() => setPanel('demo')}
                  className="text-gcu-purple dark:text-purple-400 font-semibold hover:underline"
                >
                  Request a demo →
                </button>
              </p>

              {/* Demo credentials */}
              <div className="mt-6 p-4 bg-gcu-purple-pale dark:bg-gcu-purple/10 rounded-xl border border-gcu-purple/20">
                <p className="text-xs font-bold text-gcu-purple dark:text-purple-300 mb-3 uppercase tracking-wide">
                  Demo Credentials
                </p>
                <div className="space-y-2">
                  {DEMO_CREDENTIALS.map(cred => (
                    <button
                      key={cred.email}
                      onClick={() => fillDemo(cred)}
                      className="w-full text-left flex items-center justify-between px-3 py-2 rounded-lg bg-white dark:bg-[#1A1235] border border-slate-200 dark:border-[#2D2050] hover:border-gcu-purple/40 transition-colors group"
                    >
                      <div>
                        <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">{cred.name}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{cred.role} · {cred.email}</div>
                      </div>
                      <span className="text-xs text-gcu-purple dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">Use →</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── Demo request form ── */}
          {panel === 'demo' && !demoSent && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">See it in action</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
                  Get a personalized walkthrough for your organization. We'll reach out within 24 hours.
                </p>
              </div>

              <form onSubmit={handleDemoRequest} className="space-y-4">
                <div>
                  <label className="form-label">Your name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Jane Smith"
                    value={demoName}
                    onChange={e => setDemoName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Organization</label>
                  <div className="relative">
                    <Building2 size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      className="form-input pl-9"
                      placeholder="Banner Health, SUSD, etc."
                      value={demoOrg}
                      onChange={e => setDemoOrg(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label">Work email</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="jane@yourorg.com"
                    value={demoEmail}
                    onChange={e => setDemoEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Primary use case</label>
                  <select
                    className="form-input"
                    value={demoUseCase}
                    onChange={e => setDemoUseCase(e.target.value)}
                    required
                  >
                    <option value="">Select your focus area…</option>
                    <option value="nursing">Healthcare / Nursing Support</option>
                    <option value="education">Student Advising & Tutoring</option>
                    <option value="hr">HR Onboarding & Training</option>
                    <option value="pastoral">Pastoral & Spiritual Care</option>
                    <option value="enterprise">Enterprise AI Ethics</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <button type="submit" className="btn-gold w-full py-3 text-base flex items-center justify-center gap-2">
                  <Zap size={16} />
                  Request My Demo
                </button>
              </form>

              <div className="mt-4 flex items-start gap-2 text-xs text-slate-400 dark:text-slate-500">
                <Shield size={13} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                We never share your data. No spam — just a focused demo tailored to your use case.
              </div>

              <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-5">
                Already a partner?{' '}
                <button
                  onClick={() => setPanel('login')}
                  className="text-gcu-purple dark:text-purple-400 font-semibold hover:underline"
                >
                  Sign in →
                </button>
              </p>
            </>
          )}

          {/* ── Demo sent confirmation ── */}
          {panel === 'demo' && demoSent && (
            <div className="text-center py-6 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-emerald-500" />
              </div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2">You're on the list!</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                We've received your request for <span className="font-semibold text-slate-700 dark:text-slate-300">{demoOrg}</span>.
                A Flourish AI specialist will reach out to <span className="font-semibold text-slate-700 dark:text-slate-300">{demoEmail}</span> within 24 hours.
              </p>
              <div className="space-y-2 text-left mb-6">
                {[
                  'Personalized platform walkthrough',
                  'Custom spirit vessel scoped to your org',
                  'Pricing & partnership options',
                ].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <ArrowRight size={14} className="text-gcu-gold flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => { setDemoSent(false); setDemoName(''); setDemoOrg(''); setDemoEmail(''); setDemoUseCase(''); }}
                  className="flex-1 border border-slate-200 dark:border-[#2D2050] text-slate-600 dark:text-slate-300 text-sm font-semibold py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                >
                  Submit Another
                </button>
                <button
                  onClick={() => setPanel('login')}
                  className="flex-1 btn-primary py-2.5 text-sm"
                >
                  Sign In Instead
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
