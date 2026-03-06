import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FlaskConical, Star, ThumbsUp, ThumbsDown, Download,
  Share2, BarChart3, Shield, Zap, Mic, MicOff
} from 'lucide-react';
import { MOCK_PROTOTYPES } from '../data/mockData';
import { Prototype } from '../types';
import ChatSimulator from '../components/ChatSimulator';
import { StatusBadge } from '../components/ui/Badge';

function MetricBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-slate-600 dark:text-slate-400">{label}</span>
        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{value}%</span>
      </div>
      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
    </div>
  );
}

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <button
          key={i}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(i)}
          className="transition-transform hover:scale-110"
        >
          <Star
            size={20}
            className={`transition-colors ${i <= (hover || value) ? 'text-gcu-gold fill-gcu-gold' : 'text-slate-300 dark:text-slate-600'}`}
          />
        </button>
      ))}
    </div>
  );
}

export default function TestingZone() {
  const [searchParams] = useSearchParams();
  const [selected, setSelected] = useState<Prototype>(MOCK_PROTOTYPES[0]);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [deployMsg, setDeployMsg] = useState('');
  const [voiceMode, setVoiceMode] = useState(false);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      const found = MOCK_PROTOTYPES.find(p => p.id === id);
      if (found) setSelected(found);
    }
  }, [searchParams]);

  const handleFeedbackSubmit = () => {
    if (!rating) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setRating(0);
    setFeedback('');
  };

  const handleDeploy = () => {
    const link = `https://gcu-flourish-ai.vercel.app/pilot/${selected.id}?token=${Math.random().toString(36).slice(2, 10)}`;
    setDeployMsg(link);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Prototype selector */}
      <div className="page-card p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <FlaskConical size={18} className="text-gcu-purple" />
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Testing:</label>
          </div>
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2">
            {MOCK_PROTOTYPES.map(p => (
              <button
                key={p.id}
                onClick={() => { setSelected(p); setSubmitted(false); setDeployMsg(''); }}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                  selected.id === p.id
                    ? 'bg-gcu-purple text-white border-gcu-purple shadow-gcu'
                    : 'bg-white dark:bg-[#1A1235] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-[#2D2050] hover:border-gcu-purple/40'
                }`}
              >
                <span className="text-sm">{p.icon}</span>
                <span className="truncate hidden sm:block">{p.name.replace('GCU Spirit ', '').replace('GCU ', '')}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat simulator */}
        <div className="lg:col-span-2 space-y-4">
          {/* Selected prototype info */}
          <div className="page-card p-4 flex items-start gap-4 relative">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: selected.colorAccent }}
            >
              {selected.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-bold text-slate-900 dark:text-white">{selected.name}</h2>
                <StatusBadge status={selected.status} />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{selected.college}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">{selected.description}</p>
              <div className="mt-2">
                <p className="text-xs text-gcu-purple dark:text-purple-400 font-medium italic">"{selected.spiritSummary}"</p>
              </div>
            </div>
            {/* Voice mode toggle */}
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <button
                onClick={() => setVoiceMode(v => !v)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  voiceMode
                    ? 'bg-gcu-purple text-white border-gcu-purple shadow-gcu'
                    : 'bg-white dark:bg-[#1A1235] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-[#2D2050] hover:border-gcu-purple/40'
                }`}
              >
                {voiceMode ? <Mic size={14} /> : <MicOff size={14} />}
                <span>{voiceMode ? 'Voice On' : 'Voice Off'}</span>
              </button>
              {voiceMode && (
                <div className="flex items-center gap-1.5 text-xs text-gcu-purple dark:text-purple-400 font-medium">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gcu-purple opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-gcu-purple"></span>
                  </span>
                  Listening…
                  <span className="text-amber-500 dark:text-amber-400">(Simulated)</span>
                </div>
              )}
            </div>
          </div>

          <ChatSimulator prototype={selected} />

          {/* Sample prompts */}
          <div className="page-card p-4">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">Try These Sample Prompts</p>
            <div className="flex flex-wrap gap-2">
              {selected.aiPersona.responses.slice(0, 3).map((r, i) => (
                <span
                  key={i}
                  className="text-xs bg-gcu-purple-pale dark:bg-gcu-purple/10 text-gcu-purple dark:text-purple-300 border border-gcu-purple/20 px-3 py-1.5 rounded-lg cursor-default"
                >
                  "{r.keywords[0]}"
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel: metrics + feedback + actions */}
        <div className="space-y-4">
          {/* Metrics */}
          <div className="page-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 size={16} className="text-slate-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Prototype Metrics</h3>
            </div>
            <div className="space-y-4">
              <MetricBar
                label="Ethical Alignment"
                value={selected.metrics.ethicalAlignmentScore}
                color="#4B2E83"
              />
              <MetricBar
                label="Engagement Score"
                value={selected.metrics.engagementScore}
                color="#FFC627"
              />
              <MetricBar
                label="Avg Rating"
                value={Math.round((selected.metrics.averageRating / 5) * 100)}
                color="#10B981"
              />
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-[#2D2050] grid grid-cols-2 gap-3">
              <div className="text-center">
                <p className="text-lg font-black text-slate-900 dark:text-white">{selected.metrics.feedbackCount}</p>
                <p className="text-xs text-slate-500 dark:text-slate-500">Feedback items</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-black text-slate-900 dark:text-white">{selected.metrics.usersReached.toLocaleString()}</p>
                <p className="text-xs text-slate-500 dark:text-slate-500">Users reached</p>
              </div>
            </div>
          </div>

          {/* Spirit Modules active */}
          <div className="page-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <Shield size={16} className="text-gcu-purple" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Active Spirit Modules</h3>
            </div>
            <div className="space-y-2">
              {selected.spiritModules.filter(m => m.enabled).map(m => (
                <div key={m.id} className="flex items-center gap-2 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{m.name}</span>
                </div>
              ))}
              {selected.spiritModules.filter(m => !m.enabled).map(m => (
                <div key={m.id} className="flex items-center gap-2 text-xs opacity-40">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  <span className="text-slate-500 line-through">{m.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback form */}
          <div className="page-card p-5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Session Feedback</h3>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">Rate this prototype:</p>
                <StarRating value={rating} onChange={setRating} />
              </div>

              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 text-xs text-emerald-600 border border-emerald-200 dark:border-emerald-800 dark:text-emerald-400 px-3 py-1.5 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
                  <ThumbsUp size={12} /> Helpful
                </button>
                <button className="flex items-center gap-1.5 text-xs text-red-500 border border-red-200 dark:border-red-800 dark:text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                  <ThumbsDown size={12} /> Needs work
                </button>
              </div>

              <textarea
                className="form-input min-h-[80px] resize-y text-xs"
                placeholder="Share your feedback on ethical alignment, response quality, or spirit infusion accuracy…"
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
              />

              {submitted ? (
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">✓ Thank you! Feedback logged for CETLA review.</div>
              ) : (
                <button onClick={handleFeedbackSubmit} disabled={!rating} className="btn-primary text-xs w-full disabled:opacity-40">
                  Submit Feedback
                </button>
              )}
            </div>
          </div>

          {/* Deployment actions */}
          <div className="page-card p-5 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Deployment Actions</h3>

            <button
              onClick={handleDeploy}
              className="btn-gold w-full text-xs flex items-center justify-center gap-2"
            >
              <Zap size={13} /> Deploy to Pilot
            </button>

            {deployMsg && (
              <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3">
                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mb-1">Pilot link generated:</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-500 break-all font-mono">{deployMsg}</p>
              </div>
            )}

            <button className="btn-secondary w-full text-xs flex items-center justify-center gap-2">
              <Download size={13} /> Export Code (GitHub)
            </button>

            <button className="w-full text-xs text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-[#2D2050] hover:border-gcu-purple/40 rounded-lg py-2 flex items-center justify-center gap-2 transition-colors">
              <Share2 size={13} /> Share Demo Link
            </button>

            {selected.pilotPartner && (
              <div className="text-xs text-slate-500 dark:text-slate-400 text-center pt-1">
                Pilot partner: <span className="font-semibold text-gcu-purple dark:text-purple-400">{selected.pilotPartner}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
