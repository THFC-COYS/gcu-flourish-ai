import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Check, Save, Wand2, Upload, Eye } from 'lucide-react';
import { COLLEGES } from '../data/mockData';
import { SpiritModule, BuilderFormData } from '../types';
import ChatSimulator from '../components/ChatSimulator';
import { MOCK_PROTOTYPES } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const DEFAULT_MODULES: SpiritModule[] = [
  { id: 'mod-empathy', name: 'Empathy Engine', type: 'empathy', description: 'Warm, compassionate language that honors every person\'s dignity.', enabled: true, promptExample: 'Always acknowledge feelings before providing information.' },
  { id: 'mod-ethics', name: 'Ethical Check', type: 'ethics', description: 'Built-in ethical guardrails and transparent limitation disclosures.', enabled: true, promptExample: 'Disclose AI limitations and escalate when beyond competence.' },
  { id: 'mod-worldview', name: 'Christian Worldview', type: 'worldview', description: 'Christ-centered values: servant-heartedness, integrity, stewardship.', enabled: true, promptExample: 'Reflect the image of God in every person; prioritize human flourishing.' },
  { id: 'mod-stewardship', name: 'Stewardship Module', type: 'stewardship', description: 'Wise use of resources, creation care, and long-term thinking.', enabled: false },
  { id: 'mod-domain', name: 'Domain Excellence', type: 'domain', description: 'College-specific expertise drawn from GCU curriculum and alumni.', enabled: true },
];

const STEPS = ['Basic Info', 'Curriculum & Alumni', 'Spirit Modules', 'Preview & Save'];

function StepIndicator({ current, steps }: { current: number; steps: string[] }) {
  return (
    <div className="flex items-center gap-0">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              i < current ? 'bg-gcu-purple text-white' :
              i === current ? 'bg-gcu-purple text-white ring-4 ring-gcu-purple/20' :
              'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
            }`}>
              {i < current ? <Check size={14} /> : i + 1}
            </div>
            <span className={`text-xs mt-1 font-medium hidden sm:block ${
              i === current ? 'text-gcu-purple dark:text-purple-400' : 'text-slate-500 dark:text-slate-500'
            }`}>{step}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`h-0.5 w-8 sm:w-16 mx-1 transition-colors ${i < current ? 'bg-gcu-purple' : 'bg-slate-200 dark:bg-slate-700'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

const INITIAL_FORM: BuilderFormData = {
  name: '',
  college: '',
  domain: '',
  description: '',
  curriculumContent: '',
  alumniExemplars: '',
  spiritModules: DEFAULT_MODULES,
  commercializationAngle: '',
};

export default function Builder() {
  const navigate = useNavigate();
  const { isRole, user } = useAuth();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<BuilderFormData>(INITIAL_FORM);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isRole('admin', 'faculty')) {
    return (
      <div className="page-card p-12 text-center">
        <div className="text-4xl mb-3">🔒</div>
        <p className="font-bold text-slate-700 dark:text-slate-300">Access Restricted</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Spirit Builder is available to Faculty and Admin roles.</p>
        <button onClick={() => navigate('/library')} className="btn-primary mt-4">View Library</button>
      </div>
    );
  }

  const validate = () => {
    const e: Record<string, string> = {};
    if (step === 0) {
      if (!form.name.trim()) e.name = 'Prototype name is required.';
      if (!form.college) e.college = 'Please select a college.';
      if (!form.domain.trim()) e.domain = 'Domain is required.';
      if (!form.description.trim()) e.description = 'Description is required.';
    }
    if (step === 1) {
      if (!form.curriculumContent.trim()) e.curriculumContent = 'Curriculum content is required.';
      if (!form.alumniExemplars.trim()) e.alumniExemplars = 'Alumni exemplars are required.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validate()) setStep(s => Math.min(s + 1, STEPS.length - 1));
  };

  const prev = () => {
    setStep(s => Math.max(s - 1, 0));
    setErrors({});
  };

  const toggleModule = (id: string) => {
    setForm(f => ({
      ...f,
      spiritModules: f.spiritModules.map(m =>
        m.id === id ? { ...m, enabled: !m.enabled } : m
      ),
    }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      navigate('/library');
    }, 1800);
  };

  // For preview, use a modified version of the nursing prototype as base
  const previewPrototype = {
    ...MOCK_PROTOTYPES[0],
    id: 'preview-proto',
    name: form.name || 'Your New Spirit Vessel',
    college: form.college || 'GCU College',
    description: form.description || 'Your AI prototype description will appear here.',
    aiPersona: {
      ...MOCK_PROTOTYPES[0].aiPersona,
      greeting: `Hello! I'm the ${form.name || 'GCU Spirit AI'}—a new spirit vessel for ${form.college || 'GCU'}. ${form.description ? form.description.slice(0, 100) + '...' : 'How can I help you today?'}`,
    },
  };

  const f = (field: keyof BuilderFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gcu-purple/10 dark:bg-gcu-purple/20 flex items-center justify-center">
          <Wand2 size={20} className="text-gcu-purple" />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">Spirit Infusion Builder</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Create a new GCU-infused AI spirit vessel</p>
        </div>
      </div>

      {/* Step indicator */}
      <div className="page-card p-5 flex items-center justify-center overflow-x-auto">
        <StepIndicator current={step} steps={STEPS} />
      </div>

      {/* Step content */}
      <div className="page-card p-6">
        {/* ── Step 1: Basic Info ── */}
        {step === 0 && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gcu-purple text-white text-xs flex items-center justify-center font-bold">1</span>
              Basic Prototype Information
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="form-label">Prototype Name *</label>
                <input
                  className={`form-input ${errors.name ? 'border-red-400' : ''}`}
                  placeholder="e.g., GCU Spirit Engineering Innovator"
                  value={form.name}
                  onChange={f('name')}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="form-label">GCU College / Department *</label>
                <select
                  className={`form-input ${errors.college ? 'border-red-400' : ''}`}
                  value={form.college}
                  onChange={f('college')}
                >
                  <option value="">Select a college…</option>
                  {COLLEGES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.college && <p className="text-xs text-red-500 mt-1">{errors.college}</p>}
              </div>

              <div>
                <label className="form-label">Domain / Use Case *</label>
                <input
                  className={`form-input ${errors.domain ? 'border-red-400' : ''}`}
                  placeholder="e.g., Telehealth Triage, Ethical Strategy"
                  value={form.domain}
                  onChange={f('domain')}
                />
                {errors.domain && <p className="text-xs text-red-500 mt-1">{errors.domain}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="form-label">Description *</label>
                <textarea
                  className={`form-input min-h-[100px] resize-y ${errors.description ? 'border-red-400' : ''}`}
                  placeholder="Describe what this AI spirit vessel does, who it serves, and how it embodies GCU values…"
                  value={form.description}
                  onChange={f('description')}
                />
                {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="form-label">Commercialization Angle</label>
                <input
                  className="form-input"
                  placeholder="e.g., SaaS license for hospitals; royalties reinvested in scholarships"
                  value={form.commercializationAngle}
                  onChange={f('commercializationAngle')}
                />
              </div>
            </div>
          </div>
        )}

        {/* ── Step 2: Curriculum & Alumni ── */}
        {step === 1 && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gcu-purple text-white text-xs flex items-center justify-center font-bold">2</span>
              Curriculum Content & Alumni Exemplars
            </h3>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-sm text-blue-700 dark:text-blue-300">
              💡 This content will be used to "infuse" the spirit of GCU graduates into your AI. Be specific—the richer the content, the more authentic the AI persona.
            </div>

            <div>
              <label className="form-label">Curriculum Content *</label>
              <div className="flex gap-2 mb-2">
                <button className="flex items-center gap-1.5 text-xs text-gcu-purple dark:text-purple-400 border border-gcu-purple/30 px-3 py-1.5 rounded-lg hover:bg-gcu-purple-pale dark:hover:bg-gcu-purple/10 transition-colors">
                  <Upload size={12} /> Upload PDF/Doc
                </button>
                <span className="text-xs text-slate-400 self-center">or paste text below</span>
              </div>
              <textarea
                className={`form-input min-h-[140px] resize-y ${errors.curriculumContent ? 'border-red-400' : ''}`}
                placeholder="Paste relevant curriculum frameworks, learning objectives, course content, ethical guidelines, and GCU program descriptions…&#10;&#10;Example: 'GCU BSN curriculum includes holistic health assessment, evidence-based NCLEX preparation (95%+ pass rate), patient dignity frameworks, and Christ-centered care philosophies…'"
                value={form.curriculumContent}
                onChange={f('curriculumContent')}
              />
              {errors.curriculumContent && <p className="text-xs text-red-500 mt-1">{errors.curriculumContent}</p>}
            </div>

            <div>
              <label className="form-label">Alumni Exemplars & Stories *</label>
              <div className="flex gap-2 mb-2">
                <button className="flex items-center gap-1.5 text-xs text-gcu-purple dark:text-purple-400 border border-gcu-purple/30 px-3 py-1.5 rounded-lg hover:bg-gcu-purple-pale dark:hover:bg-gcu-purple/10 transition-colors">
                  <Upload size={12} /> Upload Stories
                </button>
              </div>
              <textarea
                className={`form-input min-h-[140px] resize-y ${errors.alumniExemplars ? 'border-red-400' : ''}`}
                placeholder="Describe the spirit of GCU alumni whose values you want to infuse. Include specific stories, outcomes, and character traits…&#10;&#10;Example: 'GCU nursing alumni at Banner Health consistently demonstrate compassionate triage—one alumna described spending 20 extra minutes with a frightened elderly patient, reflecting the belief that every person is made in God\'s image…'"
                value={form.alumniExemplars}
                onChange={f('alumniExemplars')}
              />
              {errors.alumniExemplars && <p className="text-xs text-red-500 mt-1">{errors.alumniExemplars}</p>}
            </div>
          </div>
        )}

        {/* ── Step 3: Spirit Modules ── */}
        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gcu-purple text-white text-xs flex items-center justify-center font-bold">3</span>
              Spirit Infusion Modules
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Enable and configure the ethical modules that will shape how your AI thinks and responds.
            </p>

            <div className="space-y-3">
              {form.spiritModules.map(module => (
                <div
                  key={module.id}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    module.enabled
                      ? 'border-gcu-purple bg-gcu-purple-pale dark:bg-gcu-purple/10'
                      : 'border-slate-200 dark:border-[#2D2050] bg-slate-50 dark:bg-[#1A1235]'
                  }`}
                  onClick={() => toggleModule(module.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                      module.enabled ? 'bg-gcu-purple' : 'bg-slate-200 dark:bg-slate-700'
                    }`}>
                      {module.enabled && <Check size={12} className="text-white" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{module.name}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          module.type === 'empathy' ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300' :
                          module.type === 'ethics' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                          module.type === 'worldview' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' :
                          module.type === 'stewardship' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                          'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
                        }`}>
                          {module.type}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{module.description}</p>
                      {module.enabled && module.promptExample && (
                        <div className="mt-2 bg-white dark:bg-[#241D35] rounded-lg px-3 py-2 border border-gcu-purple/20">
                          <p className="text-xs text-gcu-purple dark:text-purple-300 font-medium">Example prompt instruction:</p>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 italic">"{module.promptExample}"</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gcu-gold-pale dark:bg-gcu-gold/10 border border-gcu-gold/30 rounded-xl p-4">
              <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                🌟 {form.spiritModules.filter(m => m.enabled).length} of {form.spiritModules.length} spirit modules enabled
              </p>
              <p className="text-xs text-amber-600 dark:text-amber-500 mt-1">
                CETLA and your college dean will review enabled modules before production deployment.
              </p>
            </div>
          </div>
        )}

        {/* ── Step 4: Preview & Save ── */}
        {step === 3 && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gcu-purple text-white text-xs flex items-center justify-center font-bold">4</span>
              Preview Your Spirit Vessel
            </h3>

            {/* Summary card */}
            <div className="bg-gcu-purple-pale dark:bg-gcu-purple/10 border border-gcu-purple/20 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gcu-purple text-white text-2xl flex items-center justify-center">✨</div>
                <div>
                  <h4 className="font-bold text-gcu-purple dark:text-purple-300 text-lg">{form.name || 'Unnamed Spirit Vessel'}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{form.college || 'No college selected'} · {form.domain || 'No domain'}</p>
                </div>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300">{form.description || 'No description provided.'}</p>
              <div className="flex flex-wrap gap-1.5">
                {form.spiritModules.filter(m => m.enabled).map(m => (
                  <span key={m.id} className="text-xs bg-white dark:bg-[#241D35] text-gcu-purple dark:text-purple-300 border border-gcu-purple/20 px-2 py-0.5 rounded-full font-medium">
                    ✓ {m.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Live preview chat */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Eye size={16} className="text-slate-500" />
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Live Interaction Preview</p>
              </div>
              <ChatSimulator prototype={previewPrototype} compact />
            </div>

            {saved && (
              <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 rounded-xl px-4 py-3">
                <Check size={18} />
                <div>
                  <p className="font-semibold text-sm">Spirit Vessel Saved!</p>
                  <p className="text-xs mt-0.5">Redirecting to Prototype Library…</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={prev}
          disabled={step === 0}
          className="btn-secondary flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={16} /> Previous
        </button>

        {step < STEPS.length - 1 ? (
          <button onClick={next} className="btn-primary flex items-center gap-2">
            Next <ChevronRight size={16} />
          </button>
        ) : (
          <button
            onClick={handleSave}
            disabled={saved}
            className="btn-primary flex items-center gap-2"
          >
            <Save size={16} /> Save to Library
          </button>
        )}
      </div>

      {/* Ethical note */}
      <div className="text-center text-xs text-slate-400 dark:text-slate-600">
        Created by {user?.name} · All spirit vessels require CETLA ethical review before deployment · GCU AI Governance Policy v2.1
      </div>
    </div>
  );
}
