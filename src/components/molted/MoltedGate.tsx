import { useState, useEffect, createContext, useContext } from 'react';
import { ArrowRight, Lock } from 'lucide-react';

const ACCESS_KEY = 'molted_access';
const PASSCODE = 'molted2025';

/* ── Context ─────────────────────────────────────────────────────────── */
const GateContext = createContext(false);
export const useMoltLMSAccess = () => useContext(GateContext);

/* ── Gate screen ─────────────────────────────────────────────────────── */
function GateScreen({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (value.trim().toLowerCase() === PASSCODE) {
      localStorage.setItem(ACCESS_KEY, '1');
      onUnlock();
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: '#0a0a0f' }}
    >
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(37,99,235,0.12) 0%, transparent 65%)' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-sm text-center">
        {/* Logo mark */}
        <div className="mb-10 flex flex-col items-center gap-3">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #2563EB, #1E3A8A)' }}
          >
            <Lock size={20} color="#fff" />
          </div>
          <div>
            <p
              className="text-2xl font-black tracking-tight"
              style={{
                background: 'linear-gradient(120deg, #2563EB, #94A3B8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              MoltLMS
            </p>
            <p className="text-xs text-molted-muted mt-0.5 tracking-widest uppercase">Private access</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={submit} className={shaking ? 'animate-shake' : ''}>
          <div
            className="rounded-2xl border p-6"
            style={{ background: 'rgba(17,17,24,0.8)', borderColor: 'rgba(37,99,235,0.18)' }}
          >
            <p className="text-molted-white font-semibold text-sm mb-1">Enter your access code</p>
            <p className="text-molted-muted text-xs mb-5 leading-relaxed">
              This is a private demo. Enter your code to continue.
            </p>

            <input
              type="password"
              autoFocus
              placeholder="Access code"
              value={value}
              onChange={e => { setValue(e.target.value); setError(false); }}
              className="w-full rounded-xl px-4 py-3 text-sm font-mono text-molted-white placeholder-molted-subtle outline-none border transition-colors"
              style={{
                background: 'rgba(255,255,255,0.04)',
                borderColor: error ? 'rgba(239,68,68,0.5)' : 'rgba(37,99,235,0.2)',
              }}
            />

            {error && (
              <p className="text-xs mt-2 text-left" style={{ color: '#EF4444' }}>
                Incorrect code. Try again.
              </p>
            )}

            <button
              type="submit"
              className="group mt-4 w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(120deg, #2563EB 0%, #1E3A8A 100%)',
                color: '#fff',
              }}
            >
              Enter
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>

        <p className="mt-6 text-xs text-molted-subtle">
          Need access?{' '}
          <a
            href="mailto:greg.lucas@paigebreaker.com?subject=Access Request"
            className="underline underline-offset-2 hover:text-molted-muted transition-colors"
          >
            hello@molted.ai
          </a>
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-6px); }
          40%      { transform: translateX(6px); }
          60%      { transform: translateX(-4px); }
          80%      { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.45s ease; }
      `}</style>
    </div>
  );
}

/* ── Gate wrapper ────────────────────────────────────────────────────── */
export default function MoltLMSGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);

  useEffect(() => {
    setUnlocked(localStorage.getItem(ACCESS_KEY) === '1');
  }, []);

  // Avoid flash before localStorage is read
  if (unlocked === null) return null;

  if (!unlocked) {
    return <GateScreen onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <GateContext.Provider value={true}>
      {children}
    </GateContext.Provider>
  );
}
