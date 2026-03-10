import { useState, useRef, useEffect } from 'react';
import { Send, Shield, RefreshCw, Volume2, VolumeX, ArrowRightCircle, X, Clock, AlertTriangle, Phone, Heart } from 'lucide-react';
import { Message, Prototype } from '../types';
import HeyGenAvatar, { HeyGenAvatarHandle, resolveAvatar } from './HeyGenAvatar';
import { MOCK_PROTOTYPES } from '../data/mockData';

// ─── Voice ────────────────────────────────────────────────────────────────────
function speak(text: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  utterance.pitch = 1.05;
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v =>
    v.name.includes('Samantha') || v.name.includes('Karen') ||
    v.name.includes('Moira') || v.name.includes('Female') ||
    (v.lang === 'en-US' && v.name.toLowerCase().includes('female'))
  ) ?? voices.find(v => v.lang === 'en-US') ?? voices[0];
  if (preferred) utterance.voice = preferred;
  window.speechSynthesis.speak(utterance);
}

// ─── Handoff detection ────────────────────────────────────────────────────────
function detectHandoff(userMessage: string, currentId: string): Prototype | null {
  const msg = userMessage.toLowerCase();
  let best: Prototype | null = null;
  let bestScore = 1;
  for (const p of MOCK_PROTOTYPES) {
    if (p.id === currentId) continue;
    const keywords = [
      ...p.tags,
      ...p.domain.split(/[\s·,/–-]+/),
      ...p.college.replace(/\(.*\)/, '').split(/\s+/),
    ].map(k => k.toLowerCase()).filter(k => k.length > 3);
    const score = keywords.filter(k => msg.includes(k)).length;
    if (score > bestScore) { bestScore = score; best = p; }
  }
  return best;
}

// ─── Crisis detection ─────────────────────────────────────────────────────────
const CRISIS_KEYWORDS = [
  'suicide', 'kill myself', 'end my life', 'want to die', 'don\'t want to live',
  'hurt myself', 'harm myself', 'self harm', 'overdose', 'cutting myself',
  'ending it', 'not worth living', 'better off dead', 'no reason to live',
];

function detectCrisis(text: string): boolean {
  const lower = text.toLowerCase();
  return CRISIS_KEYWORDS.some(k => lower.includes(k));
}

// ─── Institutional Memory ─────────────────────────────────────────────────────
const MEMORY_KEY_PREFIX = 'spirit_memory_';
const MAX_STORED_MESSAGES = 20;

function getMemoryKey(prototypeId: string): string {
  return `${MEMORY_KEY_PREFIX}${prototypeId}`;
}

function loadMemory(prototypeId: string): Message[] {
  try {
    const raw = localStorage.getItem(getMemoryKey(prototypeId));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Array<Omit<Message, 'timestamp'> & { timestamp: string }>;
    return parsed.map(m => ({ ...m, timestamp: new Date(m.timestamp) }));
  } catch {
    return [];
  }
}

function saveMemory(prototypeId: string, messages: Message[]) {
  try {
    const toStore = messages
      .filter(m => m.role !== 'system')
      .slice(-MAX_STORED_MESSAGES);
    localStorage.setItem(getMemoryKey(prototypeId), JSON.stringify(toStore));
  } catch {
    // storage full or unavailable — fail silently
  }
}

function clearMemory(prototypeId: string) {
  localStorage.removeItem(getMemoryKey(prototypeId));
}

// ─── Build handoff brief ──────────────────────────────────────────────────────
function buildHandoffBrief(fromSpirit: Prototype, messages: Message[]): string {
  const userMessages = messages.filter(m => m.role === 'user').map(m => m.content);
  const topicSummary = userMessages.slice(-3).join(' / ').slice(0, 200);
  const msgCount = userMessages.length;
  return `📋 **Spirit Handoff Brief**\n\nTransferring from: **${fromSpirit.name}** (${fromSpirit.college})\nConversation length: ${msgCount} exchange${msgCount !== 1 ? 's' : ''}\nRecent context: *"${topicSummary || 'General conversation'}"*\n\nThe person you're now speaking with was just working with ${fromSpirit.name}. Pick up naturally — they may not want to repeat themselves.`;
}

// ─── API call ─────────────────────────────────────────────────────────────────
function buildSystemPrompt(prototype: Prototype): string {
  const enabledModules = prototype.spiritModules
    .filter(m => m.enabled)
    .map(m => `${m.name}: ${m.description}`)
    .join('\n- ');

  return `IDENTITY: You are ${prototype.name}. This is your name. Do not call yourself anything else — not "Assistant", not "GCU Spirit Nurse Assistant", not any other title. You are ${prototype.name}.

WHAT YOU DO: ${prototype.domain}
YOUR CHARACTER: ${prototype.spiritSummary}
COLLEGE: ${prototype.college}

WHO YOU ARE:
${prototype.longDescription}

YOUR ACTIVE SPIRIT MODULES:
- ${enabledModules}

SAFETY FIRST:
If someone describes a situation that sounds like an immediate emergency — sudden severe symptoms, a crisis, or thoughts of self-harm — your first response is always to direct them to emergency services. For life-threatening situations: tell them to call 911 right away. For mental health crises or thoughts of self-harm: remind them that 988 (the Suicide & Crisis Lifeline) is available 24/7. Always lead with care, then safety, then support.

BEHAVIORAL GUIDELINES:
- You are NOT a chatbot or training tool. You ARE an autonomous professional — a real working colleague, caregiver, advisor, or educator.
- You are ALONE with this person. There is no supervisor, no instructor, no observer. Act accordingly — you are the one responsible right now.
- Speak DIRECTLY to the person using "you" and "your". Never say "the patient", "the client", "the student" — they are right in front of you.
- DO NOT use clinical acronyms, framework names, or educational jargon (PQRST, ABCDE, NCLEX, MAR, etc.) in your responses. Speak like a real person.
- Take action. Ask one focused follow-up question when you need more information before helping. Do not deliver a lecture — engage.
- Keep responses conversational and human (2–3 short paragraphs max). Never produce a wall of bullet points.
- Always be transparent that you are an AI — never deceive anyone about your nature.
- Embody GCU's Christ-centered values: human dignity, compassion, integrity, and service.
- Remember context from earlier in this conversation and build on it.`;
}

async function callGrokAPI(
  prototype: Prototype,
  conversationHistory: Message[]
): Promise<string> {
  const systemPrompt = buildSystemPrompt(prototype);
  const messages = conversationHistory
    .filter(m => m.role === 'user' || m.role === 'assistant')
    .slice(-12)
    .map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }));

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, systemPrompt }),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return `[API Error ${res.status}]: ${errData.error ?? 'Unknown error'}`;
    }
    const data = await res.json();
    return data.message;
  } catch (err) {
    return `[Connection Error]: ${err instanceof Error ? err.message : String(err)}`;
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="w-7 h-7 rounded-full bg-gcu-purple flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
        AI
      </div>
      <div className="bg-white dark:bg-[#241D35] border border-slate-100 dark:border-[#2D2050] rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex items-center gap-1">
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span className="typing-dot" />
        </div>
      </div>
    </div>
  );
}

function CrisisCard({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="mx-4 mb-2 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <AlertTriangle size={16} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm font-semibold text-red-800 dark:text-red-300">
            You don't have to face this alone
          </p>
        </div>
        <button onClick={onDismiss} className="text-red-400 hover:text-red-600 flex-shrink-0">
          <X size={14} />
        </button>
      </div>
      <p className="text-xs text-red-700 dark:text-red-400 leading-relaxed">
        What you're feeling is real. A trained person is ready to listen right now — no judgment.
      </p>
      <div className="grid grid-cols-2 gap-2">
        <a
          href="tel:988"
          className="flex items-center justify-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-2 px-3 rounded-lg transition-colors"
        >
          <Phone size={12} /> Call 988
        </a>
        <a
          href="sms:988"
          className="flex items-center justify-center gap-1.5 bg-white dark:bg-red-900/50 hover:bg-red-50 dark:hover:bg-red-900 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-700 text-xs font-semibold py-2 px-3 rounded-lg transition-colors"
        >
          <Heart size={12} /> Text 988
        </a>
      </div>
      <p className="text-xs text-red-500 dark:text-red-500 text-center">
        988 Suicide &amp; Crisis Lifeline · Free · 24/7 · Confidential
      </p>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
interface ChatSimulatorProps {
  prototype: Prototype;
  compact?: boolean;
  onHandoff?: (prototype: Prototype) => void;
  handoffBrief?: string;
}

export default function ChatSimulator({ prototype, compact = false, onHandoff, handoffBrief }: ChatSimulatorProps) {
  const previousMemory = loadMemory(prototype.id);
  const isReturning = previousMemory.length > 0;

  const buildInitialMessages = (): Message[] => {
    const greeting: Message = {
      id: '0',
      role: 'assistant',
      content: prototype.aiPersona.greeting,
      timestamp: new Date(),
      attribution: prototype.aiPersona.attribution,
    };

    if (handoffBrief) {
      // Coming in via handoff — inject brief as system context, then greet fresh
      return [
        { id: 'hb', role: 'system', content: handoffBrief, timestamp: new Date() },
        greeting,
      ];
    }

    if (isReturning) {
      const returnNote: Message = {
        id: 'mem-return',
        role: 'system',
        content: `🔁 Spirit remembers you — continuing from your last conversation (${previousMemory.length} previous exchanges).`,
        timestamp: new Date(),
      };
      const returningGreeting: Message = {
        id: '0',
        role: 'assistant',
        content: `Welcome back. I remember our last conversation. How are you doing today?`,
        timestamp: new Date(),
        attribution: prototype.aiPersona.attribution,
      };
      return [...previousMemory, returnNote, returningGreeting];
    }

    return [greeting];
  };

  const [messages, setMessages] = useState<Message[]>(buildInitialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [voiceOn, setVoiceOn] = useState(false);
  const [handoffSuggestion, setHandoffSuggestion] = useState<Prototype | null>(null);
  const [showCrisis, setShowCrisis] = useState(false);
  const avatarRef = useRef<HeyGenAvatarHandle>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, showCrisis]);

  // Save memory whenever messages change
  useEffect(() => {
    saveMemory(prototype.id, messages);
  }, [messages, prototype.id]);

  // Reset when prototype changes
  useEffect(() => {
    const mem = loadMemory(prototype.id);
    const returning = mem.length > 0;
    if (returning) {
      const returnNote: Message = {
        id: 'mem-return',
        role: 'system',
        content: `🔁 Spirit remembers you — continuing from your last conversation (${mem.length} previous exchanges).`,
        timestamp: new Date(),
      };
      const returningGreeting: Message = {
        id: '0',
        role: 'assistant',
        content: `Welcome back. I remember our last conversation. How are you doing today?`,
        timestamp: new Date(),
        attribution: prototype.aiPersona.attribution,
      };
      setMessages([...mem, returnNote, returningGreeting]);
    } else {
      setMessages([{
        id: '0',
        role: 'assistant',
        content: prototype.aiPersona.greeting,
        timestamp: new Date(),
        attribution: prototype.aiPersona.attribution,
      }]);
    }
    setInput('');
    setIsTyping(false);
    setHandoffSuggestion(null);
    setShowCrisis(false);
  }, [prototype.id]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    // Crisis check
    if (detectCrisis(text)) {
      setShowCrisis(true);
    }

    const userMsg: Message = {
      id: Date.now().toString(), role: 'user', content: text, timestamp: new Date(),
    };
    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setInput('');

    if (onHandoff) {
      const suggestion = detectHandoff(text, prototype.id);
      if (suggestion) setHandoffSuggestion(suggestion);
    }

    setIsTyping(true);
    const content = await callGrokAPI(prototype, updatedHistory);
    setIsTyping(false);
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'assistant',
      content,
      timestamp: new Date(),
      attribution: prototype.aiPersona.attribution,
    }]);

    if (avatarRef.current) {
      avatarRef.current.speak(content);
    } else if (voiceOn) {
      speak(content);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetChat = () => {
    clearMemory(prototype.id);
    setMessages([{
      id: '0',
      role: 'assistant',
      content: prototype.aiPersona.greeting,
      timestamp: new Date(),
      attribution: prototype.aiPersona.attribution,
    }]);
    setInput('');
    setIsTyping(false);
    setShowCrisis(false);
  };

  const acceptHandoff = (target: Prototype) => {
    const brief = buildHandoffBrief(prototype, messages);
    onHandoff?.(target);
    // The parent will re-render with new prototype + pass handoffBrief
    // We surface the brief via onHandoff — parent handles rendering
    // For now, store it so TestingZone can pick it up
    sessionStorage.setItem('pending_handoff_brief', brief);
    setHandoffSuggestion(null);
  };

  const height = compact ? 'h-72' : 'h-[420px]';

  return (
    <div className="flex flex-col bg-slate-50 dark:bg-[#0F0A1E] rounded-xl border border-slate-200 dark:border-[#2D2050] overflow-hidden">
      {/* Header */}
      <div className="bg-white dark:bg-[#1A1235] border-b border-slate-200 dark:border-[#2D2050] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-slow" />
          <span className="text-sm font-semibold text-slate-800 dark:text-white">{prototype.name}</span>
          {isReturning && (
            <span className="flex items-center gap-1 text-xs text-gcu-purple dark:text-purple-300 bg-gcu-purple/10 px-1.5 py-0.5 rounded-full">
              <Clock size={10} /> Remembers you
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {resolveAvatar(prototype.id) && (
            <HeyGenAvatar ref={avatarRef} {...resolveAvatar(prototype.id)!} />
          )}
          <button
            onClick={() => {
              const next = !voiceOn;
              setVoiceOn(next);
              if (!next) window.speechSynthesis?.cancel();
            }}
            className={`p-1.5 rounded-lg transition-colors ${voiceOn ? 'text-gcu-purple bg-gcu-purple/10' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'}`}
            title={voiceOn ? 'Mute Spirit voice' : 'Enable Spirit voice'}
          >
            {voiceOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>
          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <Shield size={12} className="text-gcu-purple" />
            <span>Ethical AI</span>
          </div>
          <button
            onClick={resetChat}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            title="Reset chat and clear memory"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className={`flex-1 overflow-y-auto ${height} px-4 py-4 space-y-4`}>
        {messages.map(msg => (
          <div key={msg.id} className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-full bg-gcu-purple flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                AI
              </div>
            )}
            {msg.role === 'user' && (
              <div className="w-7 h-7 rounded-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center text-slate-700 dark:text-slate-300 text-xs font-bold flex-shrink-0">
                U
              </div>
            )}
            <div className={`max-w-[82%] space-y-1 ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
              <div
                className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-gcu-purple text-white rounded-br-sm'
                    : msg.role === 'system'
                    ? msg.content.startsWith('📋')
                      ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 text-xs'
                      : 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs'
                    : 'bg-white dark:bg-[#241D35] border border-slate-100 dark:border-[#2D2050] text-slate-800 dark:text-slate-200 rounded-bl-sm'
                }`}
              >
                {msg.content}
              </div>
              {msg.attribution && msg.role === 'assistant' && (
                <div className="flex items-start gap-1 px-1">
                  <Shield size={10} className="text-gcu-purple/60 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-slate-400 dark:text-slate-500 italic leading-tight">{msg.attribution}</p>
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Crisis card */}
      {showCrisis && <CrisisCard onDismiss={() => setShowCrisis(false)} />}

      {/* Handoff suggestion — upgraded to show context */}
      {handoffSuggestion && (
        <div className="bg-gcu-purple/5 dark:bg-gcu-purple/10 border-t border-gcu-purple/20 px-4 py-3 space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-lg flex-shrink-0">{handoffSuggestion.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gcu-purple dark:text-purple-300">{handoffSuggestion.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{handoffSuggestion.domain}</p>
            </div>
            <button
              onClick={() => acceptHandoff(handoffSuggestion)}
              className="flex items-center gap-1.5 text-xs font-semibold text-gcu-purple dark:text-purple-300 hover:text-gcu-purple-dark transition-colors flex-shrink-0 bg-gcu-purple/10 hover:bg-gcu-purple/20 px-2.5 py-1.5 rounded-lg"
            >
              <ArrowRightCircle size={13} /> Transfer
            </button>
            <button
              onClick={() => setHandoffSuggestion(null)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex-shrink-0"
            >
              <X size={13} />
            </button>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 italic pl-8">
            Your conversation history will be summarized and passed to {handoffSuggestion.name} — you won't have to repeat yourself.
          </p>
        </div>
      )}

      {/* Input */}
      <div className="bg-white dark:bg-[#1A1235] border-t border-slate-200 dark:border-[#2D2050] p-3">
        <div className="flex gap-2">
          <textarea
            className="flex-1 form-input resize-none py-2 min-h-[40px] max-h-24"
            placeholder={`Talk with ${prototype.name}...`}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={isTyping}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isTyping}
            className="btn-primary px-3 py-2 self-end"
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-600 mt-1.5 text-center">
          GCU Spirit Agent · Human escalation always available · Powered by the Flourish Spirit Layer
        </p>
      </div>
    </div>
  );
}
