import { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw, Flag, ChevronLeft } from 'lucide-react';
import { Message, Prototype } from '../types';
import { TrainingScenario } from '../data/trainingData';

interface TrainingSimulatorProps {
  prototype: Prototype;
  scenario: TrainingScenario;
  onExit: () => void;
}

function buildTrainingPrompt(prototype: Prototype, scenario: TrainingScenario): string {
  return `TRAINING MODE: You are playing a character in a professional development exercise. You are NOT ${prototype.name}. You ARE ${scenario.characterName}.

CHARACTER PROFILE:
Name: ${scenario.characterName}
Situation: ${scenario.characterSetup}
Emotional State & Personality: ${scenario.characterPersonality}

THE STUDENT: Is practicing as a ${scenario.studentRole}. They are learning how to handle real, difficult human situations.

YOUR RULES:
- Stay fully in character as ${scenario.characterName} at all times. Be realistic, human, and don't make it easy.
- Express your character's fears, confusion, resistance, or emotion naturally and authentically.
- Do NOT give the student hints or coaching about how to handle you.
- Do NOT be artificially cooperative. Be a real person, not a demo subject.
- Do NOT break character or reference that this is a training exercise — unless you receive [END SESSION].

WHEN YOU RECEIVE [END SESSION]:
Immediately step fully out of character and respond as ${prototype.name}, giving structured, specific feedback. Use this exact format:

**What you did well:**
[2-3 specific, genuine observations about what the student handled effectively]

**What to work on:**
[1-2 specific, honest areas for growth — be constructive, not harsh]

**GCU Character Check:**
[Reflect on whether the student demonstrated dignity, compassion, patience, and integrity in how they engaged]

DO NOT open with your character's line now — wait for the student to speak first and respond as ${scenario.characterName} naturally from there. If the student's first message seems like a greeting or opening, respond in character as ${scenario.characterName} from the situation described.`;
}

async function callGrokTraining(
  prototype: Prototype,
  scenario: TrainingScenario,
  conversationHistory: Message[]
): Promise<string> {
  const systemPrompt = buildTrainingPrompt(prototype, scenario);
  const messages = conversationHistory
    .filter(m => m.role === 'user' || m.role === 'assistant')
    .slice(-16)
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

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
        {String.fromCodePoint(0x1F3AD)}
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

const DIFFICULTY_COLORS = {
  Foundational: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  Intermediate: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Advanced: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export default function TrainingSimulator({ prototype, scenario, onExit }: TrainingSimulatorProps) {
  const openerMessage: Message = {
    id: '0',
    role: 'assistant',
    content: scenario.characterOpener,
    timestamp: new Date(),
  };

  const [messages, setMessages] = useState<Message[]>([openerMessage]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [debriefMode, setDebriefMode] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const userMessageCount = messages.filter(m => m.role === 'user').length;
  const canEndSession = userMessageCount >= 3 && !debriefMode;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };
    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setInput('');
    setIsTyping(true);
    const reply = await callGrokTraining(prototype, scenario, updatedHistory);
    setIsTyping(false);
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'assistant',
      content: reply,
      timestamp: new Date(),
    }]);
  };

  const endSession = async () => {
    if (isTyping) return;
    setDebriefMode(true);
    const endMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: '[END SESSION]',
      timestamp: new Date(),
    };
    const updatedHistory = [...messages, endMsg];
    setMessages(updatedHistory);
    setIsTyping(true);
    const debrief = await callGrokTraining(prototype, scenario, updatedHistory);
    setIsTyping(false);
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'system',
      content: debrief,
      timestamp: new Date(),
    }]);
  };

  const reset = () => {
    setMessages([openerMessage]);
    setInput('');
    setIsTyping(false);
    setDebriefMode(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#0F0A1E] rounded-xl border border-slate-200 dark:border-[#2D2050] overflow-hidden">
      {/* Header */}
      <div className="bg-white dark:bg-[#1A1235] border-b border-slate-200 dark:border-[#2D2050] px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onExit}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors flex-shrink-0"
            title="Back to scenarios"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-lg flex-shrink-0">{scenario.icon}</span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">{scenario.title}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">You are playing: <span className="font-medium text-gcu-purple dark:text-purple-300">{scenario.studentRole}</span></p>
          </div>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${DIFFICULTY_COLORS[scenario.difficulty]}`}>
            {scenario.difficulty}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={reset}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            title="Try again"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* Character badge */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800/40 px-4 py-2 flex items-center gap-2 flex-shrink-0">
        <span className="text-lg">🎭</span>
        <p className="text-xs text-amber-800 dark:text-amber-300 font-medium">
          <span className="font-bold">{prototype.name}</span> is playing the role of <span className="font-bold">{scenario.characterName}</span> — engage as a {scenario.studentRole}
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs flex-shrink-0">
                🎭
              </div>
            )}
            {msg.role === 'user' && (
              <div className="w-7 h-7 rounded-full bg-gcu-purple flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                U
              </div>
            )}
            {msg.role === 'system' && (
              <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs flex-shrink-0">
                ✓
              </div>
            )}
            <div className={`max-w-[82%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
              {msg.role === 'system' ? (
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-2xl px-4 py-3 text-sm text-emerald-900 dark:text-emerald-100 leading-relaxed whitespace-pre-wrap">
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-2 uppercase tracking-wide">
                    {prototype.name} — Session Debrief
                  </p>
                  {msg.content}
                </div>
              ) : (
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-gcu-purple text-white rounded-br-sm'
                    : 'bg-white dark:bg-[#241D35] border border-slate-100 dark:border-[#2D2050] text-slate-800 dark:text-slate-200 rounded-bl-sm'
                }`}>
                  {msg.id === '0' && (
                    <p className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-1">{scenario.characterName}:</p>
                  )}
                  {msg.content}
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* End session banner */}
      {canEndSession && (
        <div className="bg-gcu-purple/5 dark:bg-gcu-purple/10 border-t border-gcu-purple/20 px-4 py-2 flex items-center justify-between flex-shrink-0">
          <p className="text-xs text-gcu-purple dark:text-purple-300 font-medium">
            Ready to wrap up? Get feedback from {prototype.name}.
          </p>
          <button
            onClick={endSession}
            disabled={isTyping}
            className="flex items-center gap-1.5 text-xs bg-gcu-purple text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-gcu-purple/90 transition-colors disabled:opacity-40"
          >
            <Flag size={12} />
            End Session & Get Feedback
          </button>
        </div>
      )}

      {/* Debrief done — try again / new scenario */}
      {debriefMode && !isTyping && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border-t border-emerald-200 dark:border-emerald-800/40 px-4 py-3 flex items-center gap-3 flex-shrink-0">
          <button
            onClick={reset}
            className="flex-1 text-sm bg-white dark:bg-[#1A1235] border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-lg font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={onExit}
            className="flex-1 text-sm bg-gcu-purple text-white px-4 py-2 rounded-lg font-semibold hover:bg-gcu-purple/90 transition-colors"
          >
            New Scenario
          </button>
        </div>
      )}

      {/* Input */}
      {!debriefMode && (
        <div className="bg-white dark:bg-[#1A1235] border-t border-slate-200 dark:border-[#2D2050] p-3 flex-shrink-0">
          <div className="flex gap-2">
            <textarea
              className="flex-1 form-input resize-none py-2 min-h-[40px] max-h-24"
              placeholder={`Respond to ${scenario.characterName}...`}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(input);
                }
              }}
              rows={1}
              disabled={isTyping}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isTyping}
              className="btn-primary px-3 py-2 self-end"
              aria-label="Send"
            >
              <Send size={16} />
            </button>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-600 mt-1.5 text-center">
            Training simulation · {userMessageCount < 3 ? `${3 - userMessageCount} more exchange${3 - userMessageCount !== 1 ? 's' : ''} until feedback is available` : 'Feedback available when ready'}
          </p>
        </div>
      )}
    </div>
  );
}
