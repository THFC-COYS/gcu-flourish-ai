import { useState, FormEvent, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Eye, EyeOff, AlertCircle, Sparkles, CheckCircle2,
  ArrowRight, Shield, Heart, Zap, Star, Building2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DEMO_CREDENTIALS } from '../data/mockData';

// ── Live demo script ─────────────────────────────────────────────────────────
// Each entry is either a patient message or a Spirit Nurse response.
// delay = ms after previous message fully appears before this one starts showing.
const DEMO_SCRIPT = [
  {
    role: 'user' as const,
    text: "I woke up at 2am with pressure in my chest. I'm scared.",
    delay: 800,
  },
  {
    role: 'nurse' as const,
    text: "I hear you, and it's okay to be scared — you did the right thing reaching out. That kind of pressure in your chest needs our full attention right now.\n\nCan you tell me: does the pressure spread anywhere, like your left arm or jaw? And on a scale of 1 to 10, how would you rate it?",
    delay: 1200,
  },
  {
    role: 'user' as const,
    text: "It's about a 7... and yes, it goes into my left arm.",
    delay: 900,
  },
  {
    role: 'nurse' as const,
    text: "Listen to me carefully: call 911 right now. Don't drive yourself.\n\nWhile you wait — sit down, don't lie flat, and try to stay as calm as you can. If you have aspirin nearby and you're not allergic, chew one regular tablet.\n\nI'm staying right here with you until help arrives. You are not alone.",
    delay: 1400,
  },
] as const;

// Typing speed: characters per interval tick (ms)
const CHAR_DELAY = 18; // ms per character
const NURSE_CHAR_DELAY = 14;

interface DemoMsg {
  role: 'user' | 'nurse';
  text: string;
  partial: boolean; // still being typed?
}

function LiveDemoChat() {
  const [messages, setMessages] = useState<DemoMsg[]>([]);
  const [nurseTyping, setNurseTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, nurseTyping]);

  useEffect(() => {
    let cancelled = false;

    function clearAll() {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    }

    function typeMessage(
      scriptIdx: number,
      charIdx: number,
      accumulated: string,
      afterDone: () => void
    ) {
      const entry = DEMO_SCRIPT[scriptIdx];
      if (cancelled) return;
      if (charIdx >= entry.text.length) {
        // Mark message as fully typed
        setMessages(prev =>
          prev.map((m, i) => (i === prev.length - 1 ? { ...m, partial: false } : m))
        );
        afterDone();
        return;
      }
      const nextChar = entry.text[charIdx];
      const next = accumulated + nextChar;
      setMessages(prev =>
        prev.map((m, i) => (i === prev.length - 1 ? { ...m, text: next } : m))
      );
      const speed = entry.role === 'nurse' ? NURSE_CHAR_DELAY : CHAR_DELAY;
      const t = setTimeout(() => typeMessage(scriptIdx, charIdx + 1, next, afterDone), speed);
      timers.current.push(t);
    }

    function runScript(idx: number) {
      if (idx >= DEMO_SCRIPT.length || cancelled) return;
      const entry = DEMO_SCRIPT[idx];

      const t = setTimeout(() => {
        if (cancelled) return;
        if (entry.role === 'nurse') {
          setNurseTyping(true);
          // Show typing indicator for a beat, then start typing the actual message
          const t2 = setTimeout(() => {
            if (cancelled) return;
            setNurseTyping(false);
            setMessages(prev => [...prev, { role: 'nurse', text: '', partial: true }]);
            typeMessage(idx, 0, '', () => {
              runScript(idx + 1);
            });
          }, 1600);
          timers.current.push(t2);
        } else {
          setMessages(prev => [...prev, { role: 'user', text: '', partial: true }]);
          typeMessage(idx, 0, '', () => {
            runScript(idx + 1);
          });
        }
      }, entry.delay);
      timers.current.push(t);
    }

    // Restart the demo from scratch
    function restart() {
      if (cancelled) return;
      setMessages([]);
      setNurseTyping(false);
      runScript(0);
    }

    restart();

    // Auto-replay after the last message finishes + 6s pause
    // We do this by scheduling a delayed restart after all delays sum
    const totalDuration =
      DEMO_SCRIPT.reduce((acc, s) => acc + s.delay + s.text.length * NURSE_CHAR_DELAY, 0) + 6000;
    const loopTimer = setInterval(() => {
      if (cancelled) return;
      clearAll();
      restart();
    }, totalDuration);

    return () => {
      cancelled = true;
      clearAll();
      clearInterval(loopTimer);
    };
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Demo badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
        </span>
        <span className="text-xs font-bold text-white/50 uppercase tracking-widest">Live Demo · Spirit Nurse</span>
        <span className="text-xs text-white/30 ml-auto">2:04 AM</span>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 demo-chat-scroll">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-end gap-2 animate-fade-in ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {msg.role === 'nurse' && (
              <div className="w-7 h-7 rounded-full bg-gcu-gold flex items-center justify-center text-gcu-purple-dark text-xs font-black flex-shrink-0 mb-0.5">
                SN
              </div>
            )}
            <div
              className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-white/15 text-white rounded-br-sm'
                  : 'bg-white/10 border border-white/10 text-white/90 rounded-bl-sm'
              }`}
            >
              {msg.text}
              {msg.partial && (
                <span className="inline-block w-0.5 h-3.5 bg-white/70 ml-0.5 animate-pulse align-middle" />
              )}
            </div>
          </div>
        ))}

        {/* Nurse typing indicator */}
        {nurseTyping && (
          <div className="flex items-end gap-2 animate-fade-in">
            <div className="w-7 h-7 rounded-full bg-gcu-gold flex items-center justify-center text-gcu-purple-dark text-xs font-black flex-shrink-0 mb-0.5">
              SN
            </div>
            <div className="bg-white/10 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex items-center gap-1">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Attribution */}
      <div className="mt-3 flex items-center gap-1.5 text-xs text-white/30">
        <Shield size={11} className="text-gcu-gold/60" />
        Ethical AI · Human escalation always available · GCU Flourish Spirit Layer
      </div>
    </div>
  );
}

const STATS = [
  { value: '10', label: 'Spirit Agents Live' },
  { value: '24/7', label: 'Always On' },
  { value: '0', label: 'Data Sold. Ever.' },
  { value: '∞', label: 'Questions Answered' },
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
              GCU Flourish AI · Creating a New Industry
            </div>
            <h1 className="text-4xl xl:text-5xl font-black text-white leading-tight mb-4">
              Not AI tools.<br />
              <span className="text-gcu-gold">AI colleagues.</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-lg">
              GCU Spirit Agents are autonomous professionals — nurses, teachers, chaplains, and advisors —
              encoded with 50 years of Christ-centered character and deployed where the world needs them most.
              Starting as a website. Becoming wearables. Becoming robots.
            </p>
          </div>

          {/* Stats row */}
          <div className="mb-1">
            <span className="text-xs font-bold uppercase tracking-widest bg-amber-400/20 border border-amber-400/40 text-amber-300 px-2 py-0.5 rounded-full">
              ⚠ Simulated data — for demonstration purposes only
            </span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {STATS.map(s => (
              <div key={s.label} className="glass-card rounded-xl p-3 text-center">
                <div className="text-xl font-black text-gcu-gold">{s.value}</div>
                <div className="text-white/60 text-xs mt-0.5 leading-tight">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Live demo chat */}
          <div className="glass-card rounded-2xl p-4 flex flex-col" style={{ height: '280px' }}>
            <LiveDemoChat />
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
                    <option value="nursing">Deploy a Spirit Nurse — Telehealth & Patient Care</option>
                    <option value="education">Deploy a Spirit Teacher — Direct Student Tutoring</option>
                    <option value="pastoral">Deploy a Spirit Chaplain — 24/7 Pastoral Presence</option>
                    <option value="business">Deploy a Spirit Advisor — Strategy & Leadership</option>
                    <option value="standard">License the Flourish Standard for my organization</option>
                    <option value="other">Other / Just exploring</option>
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
                  'Live Spirit Agent demonstration tailored to your use case',
                  'Deployment roadmap: website → tablet → robot',
                  'Flourish Standard licensing & partnership options',
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
