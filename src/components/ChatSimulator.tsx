import { useState, useRef, useEffect } from 'react';
import { Send, Shield, RefreshCw } from 'lucide-react';
import { Message, Prototype } from '../types';

interface ChatSimulatorProps {
  prototype: Prototype;
  compact?: boolean;
}

function generateResponse(prototype: Prototype, userMessage: string): { content: string; attribution: string } {
  const lower = userMessage.toLowerCase();
  const { responses, defaultResponse, attribution } = prototype.aiPersona;

  for (const resp of responses) {
    if (resp.keywords.some(kw => lower.includes(kw))) {
      return { content: resp.message, attribution };
    }
  }

  return { content: defaultResponse, attribution };
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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: prototype.aiPersona.greeting,
      timestamp: new Date(),
      attribution: prototype.aiPersona.attribution,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

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
  }, [prototype.id]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking delay (1–2.5s)
    const delay = 1000 + Math.random() * 1500;
    await new Promise(r => setTimeout(r, delay));

    const { content, attribution } = generateResponse(prototype, text);

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content,
      timestamp: new Date(),
      attribution,
    };

    setIsTyping(false);
    setMessages(prev => [...prev, aiMsg]);
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
  };

  const height = compact ? 'h-72' : 'h-[480px]';

  return (
    <div className="flex flex-col bg-slate-50 dark:bg-[#0F0A1E] rounded-xl border border-slate-200 dark:border-[#2D2050] overflow-hidden">
      {/* Chat header */}
      <div className="bg-white dark:bg-[#1A1235] border-b border-slate-200 dark:border-[#2D2050] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-slow" />
          <span className="text-sm font-semibold text-slate-800 dark:text-white">{prototype.name}</span>
        </div>
        <div className="flex items-center gap-2">
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

            <div className={`max-w-[80%] space-y-1 ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
              <div
                className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-gcu-purple text-white rounded-br-sm'
                    : 'bg-white dark:bg-[#241D35] border border-slate-100 dark:border-[#2D2050] text-slate-800 dark:text-slate-200 rounded-bl-sm'
                }`}
              >
                {msg.content}
              </div>
              {msg.attribution && msg.role === 'assistant' && (
                <div className="flex items-start gap-1 px-1">
                  <Shield size={10} className="text-gcu-purple/60 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-slate-400 dark:text-slate-500 italic leading-tight">
                    {msg.attribution}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="bg-white dark:bg-[#1A1235] border-t border-slate-200 dark:border-[#2D2050] p-3">
        <div className="flex gap-2">
          <textarea
            className="flex-1 form-input resize-none py-2 min-h-[40px] max-h-24"
            placeholder={`Message ${prototype.name}...`}
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
          AI simulation · Responses are illustrative · Always defer to qualified professionals
        </p>
      </div>
    </div>
  );
}
