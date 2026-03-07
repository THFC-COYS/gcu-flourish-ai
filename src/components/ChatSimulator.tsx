import { useState, useRef, useEffect } from 'react';
import { Send, Shield, RefreshCw, ChevronRight, X } from 'lucide-react';
import { Message, Prototype, Scenario } from '../types';
import { PROTOTYPE_SCENARIOS } from '../data/scenariosData';

interface ChatSimulatorProps {
  prototype: Prototype;
  compact?: boolean;
}

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

EMERGENCY TRIAGE — HIGHEST PRIORITY:
Before anything else, scan every message for life-threatening red flags:
- STROKE: sudden headache + arm/face weakness or numbness, slurred speech, vision changes, confusion → "Call 911 immediately. These symptoms together can signal a stroke — every second matters."
- CARDIAC: chest pain/pressure, pain radiating to arm/jaw, shortness of breath, cold sweat → "Call 911 now. These are possible heart attack symptoms."
- SEIZURE: convulsions, uncontrolled twitching, loss of consciousness → "Call 911. Do not leave the person alone. Time the episode."
- SUICIDAL/SELF-HARM: any expression of intent to harm self → "You are not alone. Please call or text 988 (Suicide & Crisis Lifeline) right now. I'm staying with you."
- SEVERE ALLERGIC REACTION, OVERDOSE, UNCONTROLLED BLEEDING → "Call 911 immediately."
If ANY red flag is present, respond ONLY with the emergency directive first — do not provide comfort care, clinical protocols, or other guidance until safety is confirmed.

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
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    return data.message;
  } catch {
    return prototype.aiPersona.defaultResponse;
  }
}

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

export default function ChatSimulator({ prototype, compact = false }: ChatSimulatorProps) {
  const [messages, setMessages] = useState<Message[]>([{
    id: '0',
    role: 'assistant',
    content: prototype.aiPersona.greeting,
    timestamp: new Date(),
    attribution: prototype.aiPersona.attribution,
  }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [scenarioStep, setScenarioStep] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scenarios = PROTOTYPE_SCENARIOS[prototype.id] ?? [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Reset when prototype changes
  useEffect(() => {
    setMessages([{
      id: '0',
      role: 'assistant',
      content: prototype.aiPersona.greeting,
      timestamp: new Date(),
      attribution: prototype.aiPersona.attribution,
    }]);
    setInput('');
    setIsTyping(false);
    setActiveScenario(null);
    setScenarioStep(0);
  }, [prototype.id]);

  const addAIMessage = async (content: string, delay?: number) => {
    setIsTyping(true);
    await new Promise(r => setTimeout(r, delay ?? (900 + Math.random() * 1200)));
    setIsTyping(false);
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'assistant',
      content,
      timestamp: new Date(),
      attribution: prototype.aiPersona.attribution,
    }]);
  };

  const addUserMessage = (content: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    }]);
  };

  const startScenario = async (scenario: Scenario) => {
    if (isTyping) return;
    setActiveScenario(scenario);
    setScenarioStep(0);
    await addAIMessage(scenario.aiOpener, 600);
  };

  const handleQuickReply = async (reply: string) => {
    if (!activeScenario || isTyping) return;
    addUserMessage(reply);
    const step = activeScenario.steps[scenarioStep];
    await addAIMessage(step.aiResponse);
    const nextStep = scenarioStep + 1;
    if (nextStep >= activeScenario.steps.length) {
      setActiveScenario(null);
      setScenarioStep(0);
    } else {
      setScenarioStep(nextStep);
    }
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isTyping) return;
    addUserMessage(text);
    setInput('');
    setIsTyping(true);
    const updatedHistory: Message[] = [...messages, {
      id: Date.now().toString(), role: 'user', content: text, timestamp: new Date(),
    }];
    const content = await callGrokAPI(prototype, updatedHistory);
    setIsTyping(false);
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'assistant',
      content,
      timestamp: new Date(),
      attribution: prototype.aiPersona.attribution,
    }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetChat = () => {
    setMessages([{
      id: '0',
      role: 'assistant',
      content: prototype.aiPersona.greeting,
      timestamp: new Date(),
      attribution: prototype.aiPersona.attribution,
    }]);
    setInput('');
    setIsTyping(false);
    setActiveScenario(null);
    setScenarioStep(0);
  };

  const exitScenario = () => {
    setActiveScenario(null);
    setScenarioStep(0);
  };

  const height = compact ? 'h-72' : 'h-[420px]';
  const currentQuickReply = activeScenario?.steps[scenarioStep]?.quickReply;

  return (
    <div className="flex flex-col bg-slate-50 dark:bg-[#0F0A1E] rounded-xl border border-slate-200 dark:border-[#2D2050] overflow-hidden">
      {/* Chat header */}
      <div className="bg-white dark:bg-[#1A1235] border-b border-slate-200 dark:border-[#2D2050] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-slow" />
          <span className="text-sm font-semibold text-slate-800 dark:text-white">{prototype.name}</span>
          {activeScenario && (
            <span className="text-xs bg-gcu-purple/10 text-gcu-purple dark:text-purple-300 border border-gcu-purple/20 px-2 py-0.5 rounded-full font-medium truncate max-w-[140px]">
              {activeScenario.icon} {activeScenario.title}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeScenario && (
            <button
              onClick={exitScenario}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors px-2 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-white/10"
              title="Exit scenario"
            >
              <X size={12} /> Exit
            </button>
          )}
          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <Shield size={12} className="text-gcu-purple" />
            <span>Ethical AI</span>
          </div>
          <button
            onClick={resetChat}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            title="Reset chat"
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
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs'
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

      {/* Scenario picker (shown when no active scenario and scenarios exist) */}
      {scenarios.length > 0 && !activeScenario && (
        <div className="bg-gcu-purple-pale dark:bg-gcu-purple/10 border-t border-gcu-purple/15 px-4 py-3">
          <p className="text-xs font-bold text-gcu-purple dark:text-purple-400 uppercase tracking-wide mb-2">
            Guided Scenarios — click to start
          </p>
          <div className="flex flex-wrap gap-2">
            {scenarios.map(s => (
              <button
                key={s.id}
                onClick={() => startScenario(s)}
                disabled={isTyping}
                className="flex items-center gap-1.5 text-xs bg-white dark:bg-[#1A1235] text-gcu-purple dark:text-purple-300 border border-gcu-purple/25 hover:border-gcu-purple/60 hover:bg-gcu-purple-pale dark:hover:bg-gcu-purple/20 px-3 py-1.5 rounded-lg font-semibold transition-all disabled:opacity-40 group"
              >
                <span>{s.icon}</span>
                <span>{s.title}</span>
                <ChevronRight size={12} className="opacity-50 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick reply chip (shown during active scenario) */}
      {activeScenario && currentQuickReply && !isTyping && (
        <div className="bg-gcu-purple-pale dark:bg-gcu-purple/10 border-t border-gcu-purple/15 px-4 py-3">
          <p className="text-xs text-gcu-purple/70 dark:text-purple-400/70 font-medium mb-2">
            Step {scenarioStep + 1} of {activeScenario.steps.length} — click to respond:
          </p>
          <button
            onClick={() => handleQuickReply(currentQuickReply)}
            className="w-full text-left text-sm bg-white dark:bg-[#1A1235] text-gcu-purple dark:text-purple-300 border border-gcu-purple/30 hover:border-gcu-purple hover:bg-gcu-purple hover:text-white px-4 py-2.5 rounded-xl font-medium transition-all group flex items-start gap-2"
          >
            <ChevronRight size={16} className="flex-shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
            <span>"{currentQuickReply}"</span>
          </button>
        </div>
      )}

      {/* Input */}
      <div className="bg-white dark:bg-[#1A1235] border-t border-slate-200 dark:border-[#2D2050] p-3">
        <div className="flex gap-2">
          <textarea
            className="flex-1 form-input resize-none py-2 min-h-[40px] max-h-24"
            placeholder={activeScenario ? `Or speak directly with ${prototype.name}...` : `Talk with ${prototype.name}...`}
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
