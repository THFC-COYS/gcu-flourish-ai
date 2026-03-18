import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Send, RefreshCw, Activity, Heart, Wind, Thermometer, CheckCircle, AlertTriangle, ClipboardList } from 'lucide-react';

const NAVY = '#1E40AF';
const NAVY_DIM = 'rgba(30,64,175,0.08)';
const NAVY_BORDER = 'rgba(30,64,175,0.22)';

const CARD = '#f8fafc';
const CARD_INNER = '#f1f5f9';
const BORDER = 'rgba(148,163,184,0.20)';
const DIVIDER = 'rgba(148,163,184,0.15)';

const MASTERY_COLORS: Record<string, string> = {
  mastered: '#16a34a', proficient: '#0284c7', developing: '#d97706', emerging: '#dc2626',
};

const PATIENT_SCENARIOS = [
  {
    id: 'cardiac',
    label: 'Chest Pain — Cardiac',
    setting: 'Emergency Department',
    patientName: 'Mr. Robert Hayes',
    age: 58,
    gender: 'male',
    chiefComplaint: 'Chest pain, onset 2 hours ago',
    condition: 'NSTEMI (non-ST elevation myocardial infarction)',
    difficulty: 'Intermediate',
    initVitals: { bp: '162/94', hr: 102, rr: 20, temp: 98.8, o2sat: 95, pain: 7 },
    color: '#dc2626',
    hint: 'Ask about radiation, diaphoresis, nausea, risk factors',
  },
  {
    id: 'respiratory',
    label: 'Respiratory Distress — Pediatric',
    setting: 'Pediatric Unit',
    patientName: 'Lily Chen (parent speaking)',
    age: 7,
    gender: 'female',
    chiefComplaint: 'Difficulty breathing since this morning',
    condition: 'Acute asthma exacerbation',
    difficulty: 'Intermediate',
    initVitals: { bp: '105/68', hr: 118, rr: 28, temp: 99.1, o2sat: 91, pain: 4 },
    color: '#0284c7',
    hint: 'Assess work of breathing, triggers, medication history, allergies',
  },
  {
    id: 'diabetic',
    label: 'Altered Mental Status — Diabetic',
    setting: 'Medical-Surgical Unit',
    patientName: 'Ms. Patricia Gomez',
    age: 67,
    gender: 'female',
    chiefComplaint: 'Confusion and shaking for 30 minutes',
    condition: 'Hypoglycemia (blood glucose 42 mg/dL)',
    difficulty: 'Advanced',
    initVitals: { bp: '138/82', hr: 96, rr: 18, temp: 98.2, o2sat: 98, pain: 2 },
    color: '#d97706',
    hint: 'Check glucose, assess LOC, medication list, last meal, fall risk',
  },
];

interface Vitals { bp: string; hr: number; rr: number; temp: number; o2sat: number; pain: number; }
interface Message { role: 'student' | 'patient'; content: string; }
interface CompetencyResult { name: string; score: number; feedback: string; level: string; }
interface AssessmentResult {
  overallScore: number;
  grade: string;
  clinicalReasoning: string;
  priorityDiagnosis: string;
  competencies: CompetencyResult[];
  findingsElicited: string[];
  missedFindings: string[];
  strengthSummary: string;
  improvementSummary: string;
  nclex_readiness: string;
}

function VitalSign({ label, value, unit, icon, alert }: { label: string; value: string | number; unit: string; icon: React.ReactNode; alert?: boolean }) {
  return (
    <div className="flex flex-col items-center p-3 rounded-xl"
      style={{ background: alert ? 'rgba(220,38,38,0.06)' : CARD_INNER, border: alert ? '1px solid rgba(220,38,38,0.2)' : `1px solid ${BORDER}` }}>
      <div className="mb-1" style={{ color: alert ? '#dc2626' : '#64748b' }}>{icon}</div>
      <p className="text-lg font-black" style={{ color: alert ? '#dc2626' : '#1e293b' }}>{value}</p>
      <p className="text-[10px] text-slate-400">{unit}</p>
      <p className="text-[9px] font-semibold uppercase tracking-wide mt-0.5" style={{ color: alert ? '#dc2626' : '#94a3b8' }}>{label}</p>
    </div>
  );
}

export default function ClinicalAIDemo() {
  const [scenario, setScenario] = useState(PATIENT_SCENARIOS[0]);
  const [phase, setPhase] = useState<'select' | 'interview' | 'assessment'>('select');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [vitals, setVitals] = useState<Vitals>(PATIENT_SCENARIOS[0].initVitals);
  const [loading, setLoading] = useState(false);
  const [assessing, setAssessing] = useState(false);
  const [assessment, setAssessment] = useState<AssessmentResult | null>(null);
  const [error, setError] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  function startScenario(s: typeof PATIENT_SCENARIOS[0]) {
    setScenario(s);
    setVitals(s.initVitals);
    setMessages([{
      role: 'patient',
      content: s.id === 'respiratory'
        ? `(Parent speaking, clearly anxious) — She started having trouble breathing this morning. I gave her the rescue inhaler twice but it's not helping. She's been coughing all night and now she can barely speak a full sentence without stopping to breathe. Please help her.`
        : s.id === 'cardiac'
        ? `(Sitting up in bed, hand on chest, grimacing) — It started about two hours ago. Kind of a heavy pressure right here. I tried lying down but it didn't help. My wife made me come in. It's probably nothing — I've been stressed at work.`
        : `(Confused, mildly trembling, speech slightly slurred) — I... I don't feel right. I took my insulin this morning like always. I think I ate breakfast. I'm not sure. Everything feels... slow.`,
    }]);
    setPhase('interview');
    setError('');
    setAssessment(null);
  }

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: 'student', content: input.trim() };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/demos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'clinical-ai',
          action: 'respond',
          scenario: { patientName: scenario.patientName, age: scenario.age, gender: scenario.gender, chiefComplaint: scenario.chiefComplaint, condition: scenario.condition },
          studentMessage: userMsg.content,
          conversationHistory: history.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data: any = await res.json();
      setMessages(prev => [...prev, { role: 'patient', content: data.patientResponse }]);
      if (data.vitals) setVitals(data.vitals);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }

  async function submitAssessment() {
    setAssessing(true); setError('');
    try {
      const res = await fetch('/api/demos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'clinical-ai',
          action: 'assess',
          scenario: { patientName: scenario.patientName, age: scenario.age, chiefComplaint: scenario.chiefComplaint, condition: scenario.condition },
          conversation: messages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      setAssessment(await res.json());
      setPhase('assessment');
    } catch (e) {
      setError(String(e));
    } finally {
      setAssessing(false);
    }
  }

  function reset() { setPhase('select'); setMessages([]); setAssessment(null); setError(''); setInput(''); }

  const nclexColor: Record<string, string> = { high: '#16a34a', medium: '#d97706', low: '#dc2626' };

  return (
    <div className="min-h-screen" style={{ background: '#ffffff', color: '#0f172a' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: '#e2e8f0' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">Home</Link>
            <span className="text-slate-300">/</span>
            <span className="text-sm font-semibold" style={{ color: NAVY }}>ClinicalAI Demo</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: NAVY_DIM, border: `1px solid ${NAVY_BORDER}`, color: NAVY }}>
            <Activity size={11} />
            ClinicalAI · Patient Simulation
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight mb-2 text-slate-900">ClinicalAI — AI Standardized Patient</h1>
          <p className="text-slate-500">Interview a simulated patient, gather assessment data, and receive QSEN competency scoring — replacing $40K mannequins with AI.</p>
        </div>

        {/* Scenario Select */}
        {phase === 'select' && (
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Select Patient Scenario</p>
            <div className="grid gap-4">
              {PATIENT_SCENARIOS.map(s => (
                <button key={s.id} onClick={() => startScenario(s)}
                  className="group p-5 rounded-2xl text-left transition-all hover:-translate-y-0.5 hover:shadow-md"
                  style={{ background: CARD, border: `1px solid ${BORDER}`, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black flex-shrink-0"
                        style={{ background: `${s.color}12`, color: s.color }}>
                        {s.patientName[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-black text-slate-800">{s.patientName}</p>
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                            style={{ background: `${s.color}12`, color: s.color }}>{s.difficulty}</span>
                        </div>
                        <p className="text-sm font-semibold text-slate-600 mb-1">{s.chiefComplaint}</p>
                        <p className="text-xs text-slate-400">{s.setting} · Age {s.age}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <p className="text-xs font-semibold text-slate-400 mb-1">Initial Vitals</p>
                      <div className="text-xs text-slate-500 space-y-0.5">
                        <p>BP {s.initVitals.bp}</p>
                        <p>HR {s.initVitals.hr} · O₂ {s.initVitals.o2sat}%</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 text-xs font-medium" style={{ color: s.color }}>
                    <span>Hint: {s.hint}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Interview Phase */}
        {phase === 'interview' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Patient info + vitals — left column */}
            <div className="space-y-4">
              {/* Patient card */}
              <div className="p-4 rounded-xl" style={{ background: NAVY_DIM, border: `1px solid ${NAVY_BORDER}` }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white"
                    style={{ background: scenario.color }}>
                    {scenario.patientName[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{scenario.patientName}</p>
                    <p className="text-xs text-slate-500">Age {scenario.age} · {scenario.setting}</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.7)' }}>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Chief Complaint</p>
                  <p className="text-sm font-semibold text-slate-800">{scenario.chiefComplaint}</p>
                </div>
              </div>

              {/* Vitals monitor */}
              <div className="p-4 rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <div className="flex items-center gap-2 mb-3">
                  <Activity size={13} style={{ color: NAVY }} />
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Live Vitals</p>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse ml-auto" style={{ background: '#16a34a' }} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <VitalSign label="BP" value={vitals.bp} unit="mmHg" icon={<Heart size={14} />} alert={parseInt(vitals.bp) > 140} />
                  <VitalSign label="HR" value={vitals.hr} unit="bpm" icon={<Activity size={14} />} alert={vitals.hr > 100 || vitals.hr < 60} />
                  <VitalSign label="RR" value={vitals.rr} unit="/min" icon={<Wind size={14} />} alert={vitals.rr > 20} />
                  <VitalSign label="O₂ Sat" value={`${vitals.o2sat}%`} unit="SpO₂" icon={<Activity size={14} />} alert={vitals.o2sat < 95} />
                  <VitalSign label="Temp" value={vitals.temp} unit="°F" icon={<Thermometer size={14} />} alert={vitals.temp > 100.4} />
                  <VitalSign label="Pain" value={`${vitals.pain}/10`} unit="NRS" icon={<AlertTriangle size={14} />} alert={vitals.pain >= 7} />
                </div>
              </div>

              {/* Progress + submit */}
              <div className="p-4 rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Interview Progress</p>
                <p className="text-2xl font-black text-slate-800">{messages.filter(m => m.role === 'student').length}</p>
                <p className="text-xs text-slate-500 mb-4">questions asked</p>
                <button
                  onClick={submitAssessment}
                  disabled={assessing || messages.filter(m => m.role === 'student').length < 3}
                  className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
                  style={{
                    background: assessing || messages.filter(m => m.role === 'student').length < 3
                      ? CARD_INNER : `linear-gradient(135deg, #1e3a8a, #1e40af)`,
                    color: assessing || messages.filter(m => m.role === 'student').length < 3 ? '#94a3b8' : '#fff',
                    boxShadow: messages.filter(m => m.role === 'student').length >= 3 ? '0 4px 14px rgba(30,64,175,0.25)' : 'none',
                  }}>
                  {assessing ? <RefreshCw size={14} className="animate-spin" /> : <ClipboardList size={14} />}
                  {assessing ? 'Grading...' : messages.filter(m => m.role === 'student').length < 3 ? `Ask ${3 - messages.filter(m => m.role === 'student').length} more` : 'Submit for Grading'}
                </button>
                {messages.filter(m => m.role === 'student').length < 3 && (
                  <p className="text-xs text-slate-400 text-center mt-2">Complete at least 3 questions</p>
                )}
              </div>
            </div>

            {/* Chat — center + right (2 columns) */}
            <div className="lg:col-span-2 flex flex-col" style={{ minHeight: 500 }}>
              <div className="flex-1 flex flex-col rounded-2xl overflow-hidden" style={{ border: `1px solid ${BORDER}` }}>
                {/* Chat header */}
                <div className="px-5 py-4 flex items-center justify-between" style={{ background: NAVY_DIM, borderBottom: `1px solid ${NAVY_BORDER}` }}>
                  <div>
                    <p className="font-bold text-slate-800">Patient Interview — {scenario.patientName}</p>
                    <p className="text-xs text-slate-500">{scenario.setting} · Speak directly to the patient</p>
                  </div>
                  <button onClick={reset} className="text-xs text-slate-400 hover:text-slate-600 transition-colors">← Change scenario</button>
                </div>

                {/* Messages */}
                <div ref={chatRef} className="flex-1 overflow-y-auto p-5 space-y-4" style={{ background: '#fafafa', maxHeight: 400 }}>
                  {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'student' ? 'justify-end' : 'justify-start'}`}>
                      {m.role === 'patient' && (
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mr-2 mt-0.5"
                          style={{ background: `${scenario.color}14`, color: scenario.color }}>
                          {scenario.patientName[0]}
                        </div>
                      )}
                      <div className="max-w-[80%]">
                        <div className="px-4 py-3 rounded-2xl text-sm leading-relaxed"
                          style={{
                            background: m.role === 'student' ? NAVY : '#fff',
                            color: m.role === 'student' ? '#fff' : '#1e293b',
                            border: m.role === 'patient' ? `1px solid ${BORDER}` : 'none',
                            borderRadius: m.role === 'student' ? '1rem 1rem 0.25rem 1rem' : '1rem 1rem 1rem 0.25rem',
                          }}>
                          {m.content}
                        </div>
                        <p className="text-xs text-slate-400 mt-1 px-1">{m.role === 'student' ? 'You (Student Nurse)' : scenario.patientName}</p>
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mr-2"
                        style={{ background: `${scenario.color}14`, color: scenario.color }}>
                        {scenario.patientName[0]}
                      </div>
                      <div className="px-4 py-3 rounded-2xl text-sm" style={{ background: '#fff', border: `1px solid ${BORDER}` }}>
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 rounded-full animate-bounce bg-slate-400" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 rounded-full animate-bounce bg-slate-400" style={{ animationDelay: '150ms' }} />
                          <span className="w-1.5 h-1.5 rounded-full animate-bounce bg-slate-400" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="px-4 py-3 flex gap-3 items-end" style={{ background: '#fff', borderTop: `1px solid ${BORDER}` }}>
                  <textarea
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                    placeholder="Ask the patient a question... (e.g. 'Can you describe the pain?')"
                    rows={2}
                    className="flex-1 resize-none outline-none text-sm text-slate-800 placeholder-slate-400"
                    style={{ background: 'transparent' }}
                  />
                  <button onClick={sendMessage} disabled={loading || !input.trim()}
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                    style={{
                      background: loading || !input.trim() ? CARD_INNER : NAVY,
                      color: loading || !input.trim() ? '#94a3b8' : '#fff',
                    }}>
                    <Send size={15} />
                  </button>
                </div>
              </div>

              {error && (
                <div className="mt-3 p-3 rounded-lg text-sm" style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.15)', color: '#b91c1c' }}>
                  {error}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Assessment Phase */}
        {phase === 'assessment' && assessment && (
          <div className="max-w-4xl">
            {/* Score header */}
            <div className="p-6 rounded-2xl mb-6" style={{ background: NAVY_DIM, border: `1px solid ${NAVY_BORDER}` }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: NAVY }}>Clinical Assessment — {scenario.patientName}</p>
                  <p className="text-3xl font-black text-slate-900">{assessment.overallScore}<span className="text-lg font-normal text-slate-400">/100</span></p>
                  <p className="text-slate-600 mt-1">{assessment.clinicalReasoning}</p>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-black" style={{ color: assessment.overallScore >= 85 ? '#16a34a' : assessment.overallScore >= 70 ? '#d97706' : '#dc2626' }}>
                    {assessment.grade}
                  </div>
                  <div className="flex items-center gap-1 justify-end mt-1">
                    <span className="text-xs text-slate-500">NCLEX Readiness:</span>
                    <span className="text-xs font-bold capitalize" style={{ color: nclexColor[assessment.nclex_readiness] ?? '#64748b' }}>
                      {assessment.nclex_readiness}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.7)' }}>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Priority Diagnosis</p>
                <p className="text-sm font-bold text-slate-800">{assessment.priorityDiagnosis}</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Competency scores */}
              <div className="p-5 rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">QSEN Competency Scores</p>
                <div className="space-y-4">
                  {assessment.competencies?.map((c, i) => {
                    const color = MASTERY_COLORS[c.level] ?? '#64748b';
                    return (
                      <div key={i}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-semibold text-slate-700">{c.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold capitalize"
                              style={{ background: `${color}14`, color, border: `1px solid ${color}25` }}>{c.level}</span>
                            <span className="text-sm font-black" style={{ color }}>{c.score}</span>
                          </div>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden mb-1" style={{ background: '#e2e8f0' }}>
                          <div className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${c.score}%`, background: `linear-gradient(90deg, ${color}88, ${color})` }} />
                        </div>
                        <p className="text-xs text-slate-500">{c.feedback}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Findings + feedback */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl" style={{ background: 'rgba(22,163,74,0.06)', border: '1px solid rgba(22,163,74,0.18)' }}>
                  <p className="text-xs font-semibold text-green-700 uppercase tracking-widest mb-2">Findings Elicited</p>
                  <div className="flex flex-wrap gap-1.5">
                    {assessment.findingsElicited?.map((f, i) => (
                      <span key={i} className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(22,163,74,0.12)', color: '#15803d', border: '1px solid rgba(22,163,74,0.25)' }}>
                        <CheckCircle size={10} /> {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl" style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.15)' }}>
                  <p className="text-xs font-semibold text-red-700 uppercase tracking-widest mb-2">Missed Findings</p>
                  <div className="flex flex-wrap gap-1.5">
                    {assessment.missedFindings?.map((f, i) => (
                      <span key={i} className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(220,38,38,0.1)', color: '#b91c1c', border: '1px solid rgba(220,38,38,0.2)' }}>
                        <AlertTriangle size={10} /> {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Strengths</p>
                  <p className="text-sm text-slate-700">{assessment.strengthSummary}</p>
                </div>

                <div className="p-4 rounded-xl" style={{ background: 'rgba(217,119,6,0.06)', border: '1px solid rgba(217,119,6,0.15)' }}>
                  <p className="text-xs font-semibold text-amber-700 uppercase tracking-widest mb-2">Areas to Improve</p>
                  <p className="text-sm text-slate-700">{assessment.improvementSummary}</p>
                </div>

                <button onClick={reset}
                  className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:-translate-y-px"
                  style={{ background: `linear-gradient(135deg, #1e3a8a, #1e40af)`, color: '#fff', boxShadow: '0 4px 14px rgba(30,64,175,0.25)' }}>
                  Try Another Patient
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 pt-8 border-t flex justify-between items-center" style={{ borderColor: '#e2e8f0' }}>
          <Link to="/syllabussync/demo" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">← SyllabusSync Demo</Link>
          <Link to="/adaptive-exam/demo" className="text-sm font-semibold flex items-center gap-1" style={{ color: '#6366f1' }}>
            Try Adaptive Exam →
          </Link>
        </div>
      </div>
    </div>
  );
}
