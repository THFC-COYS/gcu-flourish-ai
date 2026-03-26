import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, RefreshCw, Copy, Check, AlertTriangle, Sparkles, MessageSquare } from 'lucide-react';

const BLUE = '#1E3A8A';
const BLUE_DIM = 'rgba(30,58,138,0.08)';
const BLUE_BORDER = 'rgba(30,58,138,0.22)';

const CARD = '#f8fafc';
const CARD_INNER = '#f1f5f9';
const BORDER = 'rgba(148,163,184,0.20)';

const PERSONAS = [
  { id: 'aria', name: 'Aria — Student Success', description: 'Warm, faith-informed student success companion', touchpoints: ['First-day onboarding', 'Academic advising', 'Career support'] },
  { id: 'hope', name: 'Hope — Financial Aid Voice', description: 'Clear, empathetic guide through financial processes', touchpoints: ['FAFSA questions', 'Scholarship inquiries', 'Payment plans'] },
  { id: 'canyon', name: 'Canyon — Campus Life', description: 'Energetic, community-focused campus guide', touchpoints: ['Event discovery', 'Club sign-up', 'Housing questions'] },
  { id: 'grace', name: 'Grace — Pastoral Care AI', description: 'Compassionate, faith-centered support companion', touchpoints: ['Faith questions', 'Crisis support', 'Spiritual formation'] },
];

const SAMPLE_MESSAGES = [
  "I'm struggling with my coursework and don't know if I belong here.",
  "I missed the financial aid deadline — what are my options?",
  "I want to get more involved on campus. Where do I start?",
  "I'm questioning my faith and feeling really lost. Can we talk?",
  "What scholarships are available for nursing students?",
  "I'm a first-generation student and feel overwhelmed. Help.",
];

const TOUCHPOINTS = [
  'Student Portal Welcome', 'Academic Advising Chat', 'Financial Aid Inbox',
  'Campus App', 'New Student Orientation', 'Course Registration',
];

interface BeaconResult {
  reply: string;
  tone: string;
  intent: string;
  escalate: boolean;
  escalateReason: string;
  followUpSuggestions: string[];
  faithNote: string;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors"
      style={{ background: CARD_INNER, color: copied ? '#16a34a' : '#64748b', border: `1px solid ${BORDER}` }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

function ToneBadge({ tone }: { tone: string }) {
  const colors: Record<string, string> = {
    encouraging: '#16a34a', empathetic: '#7c3aed', informational: '#0284c7',
    celebratory: '#d97706', supportive: '#7c3aed', reassuring: '#16a34a',
  };
  const key = tone.toLowerCase().split(' ')[0];
  const color = colors[key] ?? '#64748b';
  return (
    <span className="px-2 py-0.5 rounded-full text-xs font-semibold capitalize"
      style={{ background: `${color}14`, color, border: `1px solid ${color}30` }}>
      {tone}
    </span>
  );
}

export default function BeaconDemo() {
  const [message, setMessage] = useState('');
  const [selectedPersona, setSelectedPersona] = useState(PERSONAS[0]);
  const [selectedTouchpoint, setSelectedTouchpoint] = useState(TOUCHPOINTS[0]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BeaconResult | null>(null);
  const [error, setError] = useState('');

  async function handleRun() {
    if (!message.trim()) return;
    setLoading(true); setError(''); setResult(null);
    try {
      const res = await fetch('/api/demos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'beacon', studentMessage: message, persona: selectedPersona.name, touchpoint: selectedTouchpoint }),
      });
      if (!res.ok) throw new Error(await res.text());
      setResult(await res.json());
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen" style={{ background: '#ffffff', color: '#0f172a' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: '#e2e8f0' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/beacon" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">Beacon</Link>
            <span className="text-slate-300">/</span>
            <span className="text-sm font-semibold" style={{ color: BLUE }}>Interactive Demo</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: BLUE_DIM, border: `1px solid ${BLUE_BORDER}`, color: BLUE }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: BLUE }} />
            Beacon AI · Live
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Title */}
        <div className="mb-10">
          <h1 className="text-3xl font-black tracking-tight mb-2 text-slate-900">Beacon — Institutional Voice AI</h1>
          <p className="text-slate-500">See how your institution's AI persona responds to real student messages — in your voice, with your values.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Input */}
          <div className="space-y-6">
            {/* Persona selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Choose Persona</label>
              <div className="grid grid-cols-2 gap-3">
                {PERSONAS.map(p => (
                  <button key={p.id} onClick={() => setSelectedPersona(p)}
                    className="p-3 rounded-xl text-left transition-all"
                    style={{
                      background: selectedPersona.id === p.id ? BLUE_DIM : CARD,
                      border: `1px solid ${selectedPersona.id === p.id ? BLUE_BORDER : BORDER}`,
                      boxShadow: selectedPersona.id === p.id ? '0 0 0 3px rgba(30,58,138,0.08)' : 'none',
                    }}>
                    <div className="text-sm font-bold text-slate-800 mb-1">{p.id.charAt(0).toUpperCase() + p.id.slice(1)}</div>
                    <div className="text-xs text-slate-500 leading-relaxed">{p.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Touchpoint */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Touchpoint</label>
              <div className="flex flex-wrap gap-2">
                {TOUCHPOINTS.map(t => (
                  <button key={t} onClick={() => setSelectedTouchpoint(t)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                    style={{
                      background: selectedTouchpoint === t ? BLUE_DIM : 'transparent',
                      border: `1px solid ${selectedTouchpoint === t ? BLUE_BORDER : BORDER}`,
                      color: selectedTouchpoint === t ? BLUE : '#64748b',
                    }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Sample messages */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Sample Messages</label>
              <div className="space-y-2">
                {SAMPLE_MESSAGES.map(m => (
                  <button key={m} onClick={() => setMessage(m)}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors hover:bg-slate-100"
                    style={{ background: CARD, border: `1px solid ${BORDER}`, color: '#475569' }}>
                    "{m}"
                  </button>
                ))}
              </div>
            </div>

            {/* Message input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Student Message</label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Type or select a student message above..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl text-sm resize-none outline-none transition-all text-slate-800 placeholder-slate-400"
                style={{ background: CARD, border: `1px solid ${BORDER}` }}
              />
            </div>

            <button
              onClick={handleRun}
              disabled={loading || !message.trim()}
              className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
              style={{
                background: loading || !message.trim() ? CARD_INNER : `linear-gradient(135deg, #1e3a8a, #2563eb)`,
                color: loading || !message.trim() ? '#94a3b8' : '#fff',
                boxShadow: loading || !message.trim() ? 'none' : '0 4px 14px rgba(30,58,138,0.25)',
              }}>
              {loading ? <RefreshCw size={16} className="animate-spin" /> : <Send size={16} />}
              {loading ? 'Beacon is responding...' : 'Send to Beacon'}
            </button>

            {error && (
              <div className="p-3 rounded-lg text-sm" style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.15)', color: '#b91c1c' }}>
                {error}
              </div>
            )}
          </div>

          {/* Right: Result */}
          <div>
            {!result && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-center py-20"
                style={{ border: `1px dashed ${BORDER}`, borderRadius: '1.25rem' }}>
                <MessageSquare size={40} className="mb-4 text-slate-300" />
                <p className="text-slate-500 font-medium">Beacon's response will appear here</p>
                <p className="text-slate-400 text-sm mt-1">Select a persona and send a student message</p>
              </div>
            )}

            {loading && (
              <div className="h-full flex flex-col items-center justify-center text-center py-20"
                style={{ border: `1px solid ${BLUE_BORDER}`, borderRadius: '1.25rem', background: BLUE_DIM }}>
                <RefreshCw size={32} className="animate-spin mb-4" style={{ color: BLUE }} />
                <p className="font-medium text-slate-700">{selectedPersona.name.split('—')[0].trim()} is composing a response...</p>
              </div>
            )}

            {result && (
              <div className="space-y-4">
                {/* Escalation alert */}
                {result.escalate && (
                  <div className="p-4 rounded-xl flex items-start gap-3"
                    style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.15)' }}>
                    <AlertTriangle size={18} className="text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-red-700 mb-1">Escalation Flagged</p>
                      <p className="text-xs text-red-600">{result.escalateReason}</p>
                    </div>
                  </div>
                )}

                {/* Persona + tone */}
                <div className="flex items-center justify-between px-4 py-3 rounded-xl"
                  style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: BLUE_DIM, border: `1px solid ${BLUE_BORDER}`, color: BLUE }}>
                      {selectedPersona.id[0].toUpperCase()}
                    </div>
                    <span className="text-sm font-semibold text-slate-700">{selectedPersona.name}</span>
                  </div>
                  <ToneBadge tone={result.tone} />
                </div>

                {/* The reply */}
                <div className="p-5 rounded-xl" style={{ background: BLUE_DIM, border: `1px solid ${BLUE_BORDER}` }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: BLUE }}>Beacon Response</span>
                    <CopyButton text={result.reply} />
                  </div>
                  <p className="text-slate-800 leading-relaxed text-sm">{result.reply}</p>
                </div>

                {/* Intent detected */}
                <div className="px-4 py-3 rounded-xl"
                  style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-500 block mb-1">Intent Detected</span>
                  <p className="text-sm text-slate-700">{result.intent}</p>
                </div>

                {/* Faith note */}
                {result.faithNote && (
                  <div className="px-4 py-3 rounded-xl"
                    style={{ background: 'rgba(217,119,6,0.06)', border: '1px solid rgba(217,119,6,0.18)' }}>
                    <span className="text-xs font-semibold uppercase tracking-widest text-amber-700 block mb-1 flex items-center gap-1">
                      <Sparkles size={11} /> Faith Integration
                    </span>
                    <p className="text-sm text-amber-900">{result.faithNote}</p>
                  </div>
                )}

                {/* Follow-up suggestions */}
                {result.followUpSuggestions?.length > 0 && (
                  <div className="px-4 py-3 rounded-xl"
                    style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                    <span className="text-xs font-semibold uppercase tracking-widest text-slate-500 block mb-2">Follow-up Suggestions</span>
                    <div className="space-y-1.5">
                      {result.followUpSuggestions.map((s, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                          <span className="w-1 h-1 rounded-full bg-slate-300 flex-shrink-0" />
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button onClick={() => { setResult(null); setMessage(''); }}
                  className="w-full py-2.5 rounded-xl text-sm font-medium transition-colors"
                  style={{ background: CARD_INNER, color: '#64748b', border: `1px solid ${BORDER}` }}>
                  Try another message
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t flex justify-between items-center" style={{ borderColor: '#e2e8f0' }}>
          <Link to="/beacon" className="text-sm text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1">← Back to Beacon</Link>
          <Link to="/retain-ai/demo" className="text-sm font-semibold flex items-center gap-1" style={{ color: '#e11d48' }}>
            Try RetainAI Demo →
          </Link>
        </div>
      </div>
    </div>
  );
}
