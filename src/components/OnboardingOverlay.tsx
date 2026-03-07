import { useState, useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';

const MOMENTS = [
  {
    eyebrow: 'The Problem',
    headline: 'Every day, millions of people face moments where they need an expert and a human being at the same time.',
    body: 'A patient alone at midnight with a diagnosis they don\'t understand. A founder making a decision that could end everything. A grieving family with nowhere to turn. Most of them face those moments alone.',
    cta: 'Keep reading',
    bg: 'from-[#0F0A1E] to-[#1A1235]',
  },
  {
    eyebrow: 'The Answer',
    headline: 'GCU has spent 77 years training people who are both.',
    body: 'Nurses who sit with fear. Teachers who stay with struggle. Chaplains who carry grief. Business leaders who know that how you treat people in a crisis is the measure of everything you\'ve built. That spirit has always lived here. Until now, it could only reach the people standing in our classrooms.',
    cta: 'See what changed',
    bg: 'from-[#1A1235] to-[#2D1A5E]',
  },
  {
    eyebrow: 'The Platform',
    headline: 'Flourish AI puts that spirit in the room with anyone who needs it.',
    body: 'Ten Spirit Agents — one for each GCU college — available to any person, anywhere, at any moment of need. Not a chatbot. Not a search engine. An autonomous professional who knows what they\'re doing and cares about who they\'re doing it for.',
    cta: 'Enter the platform',
    bg: 'from-[#2D1A5E] to-[#3D1F8A]',
    last: true,
  },
];

const STORAGE_KEY = 'flourish_onboarded_v1';

export default function OnboardingOverlay({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Fade in after a brief pause
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const advance = () => {
    const current = MOMENTS[step];
    if (current.last) {
      handleComplete();
    } else {
      setStep(s => s + 1);
    }
  };

  const handleComplete = () => {
    setExiting(true);
    localStorage.setItem(STORAGE_KEY, 'true');
    setTimeout(onComplete, 600);
  };

  const moment = MOMENTS[step];

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-700 ${visible && !exiting ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${moment.bg} transition-all duration-700`} />

      {/* Subtle gold wave */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg viewBox="0 0 1440 900" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,900 Q360,200 720,500 Q1080,800 1440,200 L1440,900 Z" fill="#FFC627" />
        </svg>
      </div>

      {/* Skip */}
      <button
        onClick={handleComplete}
        className="absolute top-6 right-6 text-white/30 hover:text-white/60 transition-colors flex items-center gap-1.5 text-xs font-medium"
      >
        Skip <X size={14} />
      </button>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-8 text-center">

        {/* Step dots */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {MOMENTS.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-500 ${
                i === step
                  ? 'w-6 h-2 bg-gcu-gold'
                  : i < step
                  ? 'w-2 h-2 bg-white/40'
                  : 'w-2 h-2 bg-white/15'
              }`}
            />
          ))}
        </div>

        {/* Eyebrow */}
        <p className="text-gcu-gold text-xs font-bold uppercase tracking-widest mb-4 transition-all duration-500">
          {moment.eyebrow}
        </p>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-6 transition-all duration-500">
          {moment.headline}
        </h1>

        {/* Body */}
        <p className="text-white/60 text-base leading-relaxed mb-10 max-w-xl mx-auto transition-all duration-500">
          {moment.body}
        </p>

        {/* CTA */}
        <button
          onClick={advance}
          className={`inline-flex items-center gap-3 font-bold text-sm px-8 py-4 rounded-2xl transition-all duration-300 group ${
            moment.last
              ? 'bg-gcu-gold text-gcu-purple-dark hover:bg-yellow-400 shadow-lg shadow-gcu-gold/20'
              : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
          }`}
        >
          {moment.cta}
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Attribution */}
        {moment.last && (
          <p className="text-white/20 text-xs mt-6">
            GCU Flourish AI · 77 years of character, deployed at scale
          </p>
        )}
      </div>
    </div>
  );
}

export function shouldShowOnboarding(): boolean {
  return !localStorage.getItem(STORAGE_KEY);
}
