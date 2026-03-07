import { useState } from 'react';
import { GraduationCap, ChevronRight, BookOpen } from 'lucide-react';
import { MOCK_PROTOTYPES } from '../data/mockData';
import { Prototype } from '../types';
import { TRAINING_BY_PROTOTYPE, TrainingScenario } from '../data/trainingData';
import TrainingSimulator from '../components/TrainingSimulator';

const DIFFICULTY_COLORS = {
  Foundational: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
  Intermediate: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800',
  Advanced: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800',
};

const COACHING_PROTOTYPES = MOCK_PROTOTYPES.filter(p => !p.productType || p.productType === 'coaching');

export default function SpiritTraining() {
  const [selectedPrototype, setSelectedPrototype] = useState<Prototype | null>(null);
  const [activeScenario, setActiveScenario] = useState<TrainingScenario | null>(null);

  const scenarios = selectedPrototype ? (TRAINING_BY_PROTOTYPE[selectedPrototype.id] ?? []) : [];

  if (activeScenario && selectedPrototype) {
    return (
      <div className="h-[calc(100vh-180px)]">
        <TrainingSimulator
          prototype={selectedPrototype}
          scenario={activeScenario}
          onExit={() => setActiveScenario(null)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gcu-purple to-purple-800 rounded-2xl p-6 text-white">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <GraduationCap size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Spirit Training Academy</h2>
            <p className="text-purple-200 text-sm mt-1 max-w-2xl">
              Practice the hardest human moments in a safe environment. Each Spirit plays a realistic character — a frightened patient, a resistant teenager, a founder in crisis — and you practice being the professional who helps them.
            </p>
            <div className="flex items-center gap-4 mt-3 text-xs text-purple-300">
              <span>🎭 Spirit plays the challenge</span>
              <span>·</span>
              <span>🎓 You play the professional</span>
              <span>·</span>
              <span>✓ Get real feedback after</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spirit Selector */}
        <div className="lg:col-span-1">
          <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
            Choose a Spirit
          </h3>
          <div className="space-y-2">
            {COACHING_PROTOTYPES.map(proto => {
              const count = (TRAINING_BY_PROTOTYPE[proto.id] ?? []).length;
              const isSelected = selectedPrototype?.id === proto.id;
              return (
                <button
                  key={proto.id}
                  onClick={() => {
                    setSelectedPrototype(proto);
                    setActiveScenario(null);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center gap-3 ${
                    isSelected
                      ? 'bg-gcu-purple text-white border-gcu-purple shadow-md'
                      : 'bg-white dark:bg-[#1A1235] border-slate-200 dark:border-[#2D2050] hover:border-gcu-purple/50 dark:hover:border-gcu-purple/50 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <span className="text-xl flex-shrink-0">{proto.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{proto.name}</p>
                    <p className={`text-xs mt-0.5 ${isSelected ? 'text-purple-200' : 'text-slate-500 dark:text-slate-400'}`}>
                      {count} scenario{count !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <ChevronRight size={14} className={`flex-shrink-0 ${isSelected ? 'text-purple-200' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Scenario Panel */}
        <div className="lg:col-span-2">
          {!selectedPrototype ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 border-2 border-dashed border-slate-200 dark:border-[#2D2050] rounded-2xl">
              <BookOpen size={40} className="text-slate-300 dark:text-slate-600 mb-4" />
              <p className="text-slate-500 dark:text-slate-400 font-medium">Select a Spirit to see training scenarios</p>
              <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Each Spirit plays a different kind of challenging character</p>
            </div>
          ) : scenarios.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 border-2 border-dashed border-slate-200 dark:border-[#2D2050] rounded-2xl">
              <p className="text-slate-500 dark:text-slate-400 font-medium">No training scenarios yet for {selectedPrototype.name}</p>
              <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">More scenarios coming soon</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedPrototype.icon}</span>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{selectedPrototype.name} — Training Scenarios</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{selectedPrototype.domain.split('·')[0].trim()}</p>
                </div>
              </div>

              <div className="grid gap-4">
                {scenarios.map(scenario => (
                  <button
                    key={scenario.id}
                    onClick={() => setActiveScenario(scenario)}
                    className="w-full text-left bg-white dark:bg-[#1A1235] border border-slate-200 dark:border-[#2D2050] rounded-xl p-4 hover:border-gcu-purple/50 dark:hover:border-gcu-purple/50 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl flex-shrink-0 mt-0.5">{scenario.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-gcu-purple dark:group-hover:text-purple-300 transition-colors">
                            {scenario.title}
                          </h4>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${DIFFICULTY_COLORS[scenario.difficulty]}`}>
                            {scenario.difficulty}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                          You play: <span className="font-semibold text-gcu-purple dark:text-purple-300">{scenario.studentRole}</span>
                          {' · '}
                          Spirit plays: <span className="font-semibold text-amber-600 dark:text-amber-400">{scenario.characterName}</span>
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                          {scenario.characterSetup.split('.')[0]}.
                        </p>
                      </div>
                      <div className="flex-shrink-0 self-center">
                        <div className="w-8 h-8 rounded-full bg-gcu-purple/10 dark:bg-gcu-purple/20 flex items-center justify-center group-hover:bg-gcu-purple transition-colors">
                          <ChevronRight size={16} className="text-gcu-purple group-hover:text-white transition-colors" />
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="bg-slate-50 dark:bg-[#1A1235]/50 border border-slate-100 dark:border-[#2D2050] rounded-xl p-4">
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  <span className="font-bold text-slate-700 dark:text-slate-300">How it works:</span> Spirit plays the character — fully in character, realistic, and not easy. You practice your professional response in free conversation. After 3+ exchanges, you can end the session and receive structured feedback from {selectedPrototype.name} on what you did well, what to work on, and whether you demonstrated GCU character.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
