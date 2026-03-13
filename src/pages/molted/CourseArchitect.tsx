import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  UploadCloud, ChevronLeft, Loader2, ArrowRight, Copy, Check,
  BookOpen, Megaphone, HelpCircle, Lightbulb, ChevronDown, ChevronUp,
  GraduationCap, Calendar, Target, FileText,
} from 'lucide-react';
import MoltedLayout from './MoltedLayout';

/* ── Constants ─────────────────────────────────────────────────────────── */
const TEAL = '#2DD4BF';
const TEAL_DIM = 'rgba(45,212,191,0.12)';
const TEAL_BORDER = 'rgba(45,212,191,0.25)';

/* ── Types ─────────────────────────────────────────────────────────────── */
interface Module {
  week: number;
  title: string;
  objectives: string[];
  topics: string[];
  discussionPrompt: string;
  assignment: string;
  announcement: string;
}

interface Assessment {
  name: string;
  type: string;
  weight: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface CourseResult {
  courseTitle: string;
  overview: string;
  modules: Module[];
  assessments: Assessment[];
  faq: FAQ[];
  insights: string;
}

/* ── CopyButton ────────────────────────────────────────────────────────── */
function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1800); }}
      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
      style={{
        background: copied ? TEAL_DIM : 'rgba(255,255,255,0.06)',
        color: copied ? TEAL : '#86868B',
        border: `1px solid ${copied ? TEAL_BORDER : 'rgba(255,255,255,0.08)'}`,
      }}
    >
      {copied ? <Check size={11} /> : <Copy size={11} />}
      {copied ? 'Copied' : label}
    </button>
  );
}

/* ── SelectChip ────────────────────────────────────────────────────────── */
function SelectChip({ options, value, onChange }: {
  options: string[]; value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-2 flex-wrap">
      {options.map(opt => {
        const active = opt === value;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={{
              background: active ? TEAL_DIM : 'rgba(255,255,255,0.04)',
              color: active ? TEAL : '#86868B',
              border: `1px solid ${active ? TEAL_BORDER : 'rgba(255,255,255,0.07)'}`,
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

/* ── Module card ───────────────────────────────────────────────────────── */
function ModuleCard({ module }: { module: Module }) {
  const [open, setOpen] = useState(module.week <= 2);

  const allText = [
    `Week ${module.week}: ${module.title}`,
    '',
    'Learning Objectives:',
    ...module.objectives.map(o => `• ${o}`),
    '',
    'Topics:',
    ...module.topics.map(t => `• ${t}`),
    '',
    `Discussion Prompt: ${module.discussionPrompt}`,
    '',
    `Assignment: ${module.assignment}`,
  ].join('\n');

  return (
    <div
      className="rounded-2xl border transition-all duration-200"
      style={{ background: 'rgba(17,17,24,0.8)', borderColor: 'rgba(255,255,255,0.07)' }}
    >
      <button
        className="w-full flex items-center gap-4 p-4 text-left"
        onClick={() => setOpen(o => !o)}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-sm"
          style={{ background: TEAL_DIM, color: TEAL, border: `1px solid ${TEAL_BORDER}` }}
        >
          {module.week}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-molted-white text-sm font-bold">{module.title}</p>
          <p className="text-molted-muted text-xs mt-0.5 truncate">
            {module.topics.slice(0, 3).join(' · ')}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <CopyButton text={allText} label="Copy week" />
          {open ? <ChevronUp size={14} className="text-molted-muted" /> : <ChevronDown size={14} className="text-molted-muted" />}
        </div>
      </button>

      {open && (
        <div className="px-4 pb-5 space-y-4">
          {/* Objectives */}
          <div>
            <p className="text-xs font-semibold text-molted-muted uppercase tracking-wide mb-2">Learning Objectives</p>
            <ul className="space-y-1">
              {module.objectives.map((o, i) => (
                <li key={i} className="flex gap-2 text-sm text-molted-white/80">
                  <Target size={12} className="flex-shrink-0 mt-0.5" style={{ color: TEAL }} />
                  {o}
                </li>
              ))}
            </ul>
          </div>

          {/* Topics */}
          <div className="flex flex-wrap gap-2">
            {module.topics.map((t, i) => (
              <span
                key={i}
                className="text-xs px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(255,255,255,0.06)', color: '#86868B', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Discussion + Assignment */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div
              className="rounded-xl p-3"
              style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <p className="text-xs font-semibold text-molted-muted mb-1.5">Discussion prompt</p>
              <p className="text-sm text-molted-white/80 leading-relaxed">{module.discussionPrompt}</p>
            </div>
            <div
              className="rounded-xl p-3"
              style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <p className="text-xs font-semibold text-molted-muted mb-1.5">Assignment</p>
              <p className="text-sm text-molted-white/80 leading-relaxed">{module.assignment}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Announcement card ─────────────────────────────────────────────────── */
function AnnouncementCard({ module }: { module: Module }) {
  return (
    <div
      className="rounded-2xl border"
      style={{ background: 'rgba(17,17,24,0.8)', borderColor: 'rgba(255,255,255,0.07)' }}
    >
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black"
            style={{ background: TEAL_DIM, color: TEAL }}
          >
            {module.week}
          </div>
          <p className="text-molted-white text-sm font-semibold">{module.title}</p>
        </div>
        <CopyButton text={module.announcement} />
      </div>
      <div
        className="mx-4 mb-4 rounded-xl p-4 text-sm leading-relaxed text-molted-white/80 whitespace-pre-wrap"
        style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.05)' }}
      >
        {module.announcement}
      </div>
    </div>
  );
}

/* ── FAQ card ──────────────────────────────────────────────────────────── */
function FaqCard({ item, index }: { item: FAQ; index: number }) {
  const [open, setOpen] = useState(index < 3);
  return (
    <div
      className="rounded-2xl border"
      style={{ background: 'rgba(17,17,24,0.8)', borderColor: 'rgba(255,255,255,0.07)' }}
    >
      <button className="w-full flex items-center justify-between gap-3 p-4 text-left" onClick={() => setOpen(o => !o)}>
        <p className="text-molted-white text-sm font-semibold">{item.question}</p>
        {open ? <ChevronUp size={14} className="flex-shrink-0 text-molted-muted" /> : <ChevronDown size={14} className="flex-shrink-0 text-molted-muted" />}
      </button>
      {open && (
        <p className="px-4 pb-4 text-sm text-molted-white/80 leading-relaxed">{item.answer}</p>
      )}
    </div>
  );
}

/* ── Result tabs ───────────────────────────────────────────────────────── */
type Tab = 'map' | 'announcements' | 'faq';

function Results({ result }: { result: CourseResult }) {
  const [tab, setTab] = useState<Tab>('map');

  const allAnnouncements = result.modules
    .map(m => `--- Week ${m.week}: ${m.title} ---\n\n${m.announcement}`)
    .join('\n\n');

  const allFaq = result.faq
    .map(f => `Q: ${f.question}\nA: ${f.answer}`)
    .join('\n\n');

  const tabs: { key: Tab; label: string; icon: typeof BookOpen; count?: number }[] = [
    { key: 'map', label: 'Course Map', icon: BookOpen, count: result.modules.length },
    { key: 'announcements', label: 'Announcements', icon: Megaphone, count: result.modules.length },
    { key: 'faq', label: 'Student FAQ', icon: HelpCircle, count: result.faq.length },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="rounded-2xl border p-5"
        style={{ background: TEAL_DIM, borderColor: TEAL_BORDER }}
      >
        <p className="text-molted-white font-bold text-lg">{result.courseTitle}</p>
        <p className="text-molted-white/70 text-sm mt-1.5 leading-relaxed">{result.overview}</p>
        <div className="flex gap-4 mt-3 text-xs text-molted-muted">
          <span>{result.modules.length} weeks designed</span>
          <span>{result.assessments.length} assessments</span>
          <span>{result.faq.length} FAQ entries</span>
        </div>
      </div>

      {/* Assessments row */}
      {result.assessments?.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {result.assessments.map((a, i) => (
            <div
              key={i}
              className="rounded-xl px-3 py-2 text-xs"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <p className="text-molted-white font-semibold">{a.name}</p>
              <p className="text-molted-muted mt-0.5">{a.type} · {a.weight}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
        {tabs.map(t => {
          const Icon = t.icon;
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-all border-b-2 -mb-px"
              style={{
                color: active ? TEAL : '#86868B',
                borderColor: active ? TEAL : 'transparent',
              }}
            >
              <Icon size={13} />
              {t.label}
              {t.count !== undefined && (
                <span
                  className="text-xs px-1.5 py-0.5 rounded-full"
                  style={{
                    background: active ? `${TEAL}20` : 'rgba(255,255,255,0.05)',
                    color: active ? TEAL : '#3A3A40',
                  }}
                >
                  {t.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      {tab === 'map' && (
        <div className="space-y-3">
          {result.modules.map(m => <ModuleCard key={m.week} module={m} />)}
        </div>
      )}

      {tab === 'announcements' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <CopyButton text={allAnnouncements} label="Copy all announcements" />
          </div>
          {result.modules.map(m => <AnnouncementCard key={m.week} module={m} />)}
        </div>
      )}

      {tab === 'faq' && (
        <div className="space-y-3">
          <div className="flex justify-end">
            <CopyButton text={allFaq} label="Copy full FAQ" />
          </div>
          {result.faq.map((f, i) => <FaqCard key={i} item={f} index={i} />)}
        </div>
      )}

      {/* Insight */}
      <div
        className="rounded-2xl p-5 border"
        style={{ background: 'rgba(17,17,24,0.9)', borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb size={14} style={{ color: '#E8A020' }} />
          <p className="text-sm font-semibold text-molted-white">Design Insight</p>
        </div>
        <p className="text-molted-muted text-sm leading-relaxed">{result.insights}</p>
      </div>
    </div>
  );
}

/* ── Input form ────────────────────────────────────────────────────────── */
function InputForm({ onSubmit, loading }: {
  onSubmit: (data: Record<string, string>) => void;
  loading: boolean;
}) {
  const [form, setForm] = useState({
    title: '',
    level: 'Undergraduate',
    format: 'Online',
    weeks: '8',
    objectives: '',
    syllabus: '',
    announcementLevel: '1',
    voice: '',
  });

  const set = (k: string) => (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const ready = form.title.trim().length > 2 && form.objectives.trim().length > 10 && !loading;

  return (
    <div className="space-y-5">
      {/* Course title */}
      <div>
        <label className="block text-molted-white text-sm font-semibold mb-2">Course title</label>
        <input
          type="text"
          value={form.title}
          onChange={set('title')}
          placeholder="e.g. Introduction to Organizational Behavior"
          className="w-full rounded-xl border text-sm text-molted-white p-3 focus:outline-none transition-colors"
          style={{
            background: 'rgba(17,17,24,0.9)',
            borderColor: form.title.length > 0 ? TEAL_BORDER : 'rgba(255,255,255,0.08)',
          }}
        />
      </div>

      {/* Level + Format */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-molted-muted text-xs font-semibold mb-2">Level</label>
          <SelectChip
            options={['Undergraduate', 'Graduate', 'Professional', 'Continuing Ed']}
            value={form.level}
            onChange={v => setForm(f => ({ ...f, level: v }))}
          />
        </div>
        <div>
          <label className="block text-molted-muted text-xs font-semibold mb-2">Format</label>
          <SelectChip
            options={['Online', 'In-Person', 'Hybrid']}
            value={form.format}
            onChange={v => setForm(f => ({ ...f, format: v }))}
          />
        </div>
      </div>

      {/* Weeks */}
      <div>
        <label className="block text-molted-muted text-xs font-semibold mb-2">Duration (weeks)</label>
        <div className="flex gap-2">
          {['4', '6', '8', '10', '12', '16'].map(n => {
            const active = form.weeks === n;
            return (
              <button
                key={n}
                type="button"
                onClick={() => setForm(f => ({ ...f, weeks: n }))}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={{
                  background: active ? TEAL_DIM : 'rgba(255,255,255,0.04)',
                  color: active ? TEAL : '#86868B',
                  border: `1px solid ${active ? TEAL_BORDER : 'rgba(255,255,255,0.07)'}`,
                }}
              >
                {n}w
              </button>
            );
          })}
        </div>
      </div>

      {/* Objectives */}
      <div>
        <label className="block text-molted-white text-sm font-semibold mb-2">
          Learning objectives
        </label>
        <p className="text-molted-muted text-xs mb-2">
          One per line. These drive everything — be specific about what students will know or do.
        </p>
        <textarea
          value={form.objectives}
          onChange={set('objectives')}
          placeholder={`Students will analyze organizational behavior frameworks and apply them to real workplace scenarios.\nStudents will develop team leadership skills through case-based problem solving.\nStudents will critically evaluate research on motivation, communication, and group dynamics.`}
          rows={6}
          className="w-full rounded-xl border text-sm text-molted-white leading-relaxed resize-none p-3 focus:outline-none transition-colors"
          style={{
            background: 'rgba(17,17,24,0.9)',
            borderColor: form.objectives.length > 0 ? TEAL_BORDER : 'rgba(255,255,255,0.08)',
          }}
        />
      </div>

      {/* Announcement depth */}
      <div>
        <label className="block text-molted-white text-sm font-semibold mb-1">
          Announcement depth
        </label>
        <p className="text-molted-muted text-xs mb-3">
          How much content should each weekly announcement carry?
        </p>
        <div className="space-y-2">
          {[
            {
              value: '1',
              title: 'Level 1 — Orientation',
              desc: 'Introduces the week\'s topics and objectives. Tells students what to read and where to start. Quick and to the point.',
              words: '~70 words',
            },
            {
              value: '2',
              title: 'Level 2 — Mini Lesson',
              desc: 'Expands on each topic with brief explanations. Teaches the core ideas directly in the announcement — students arrive to class having already engaged with the material.',
              words: '~180 words',
            },
            {
              value: '3',
              title: 'Level 3 — Deep Dive',
              desc: 'Everything in Level 2, plus real-world examples or a short case study that anchors the theory in practice. The richest announcement — drives the highest engagement.',
              words: '~300 words',
            },
          ].map(opt => {
            const active = form.announcementLevel === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setForm(f => ({ ...f, announcementLevel: opt.value }))}
                className="w-full text-left rounded-xl border p-3.5 transition-all"
                style={{
                  background: active ? TEAL_DIM : 'rgba(255,255,255,0.02)',
                  borderColor: active ? TEAL_BORDER : 'rgba(255,255,255,0.07)',
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-bold" style={{ color: active ? TEAL : '#F5F5F7' }}>
                    {opt.title}
                  </p>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={{
                      background: active ? `${TEAL}20` : 'rgba(255,255,255,0.05)',
                      color: active ? TEAL : '#3A3A40',
                    }}
                  >
                    {opt.words}
                  </span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: active ? 'rgba(45,212,191,0.75)' : '#3A3A40' }}>
                  {opt.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Faculty voice */}
      <div>
        <label className="block text-molted-white text-sm font-semibold mb-1">
          Your voice <span className="text-molted-subtle font-normal">(optional)</span>
        </label>
        <p className="text-molted-muted text-xs mb-2">
          Describe yourself — your background, teaching style, personality, hobbies, vibe.
          The announcements will sound like you, not a template.
        </p>
        <textarea
          value={form.voice}
          onChange={set('voice')}
          placeholder="e.g. I've been teaching organizational behavior for 12 years. Former HR director turned academic. I love basketball and always use sports analogies. I keep things direct and practical — I hate jargon. I like to open with a story or something that surprises students."
          rows={4}
          className="w-full rounded-xl border text-sm text-molted-muted leading-relaxed resize-none p-3 focus:outline-none transition-colors"
          style={{
            background: 'rgba(17,17,24,0.9)',
            borderColor: form.voice.length > 0 ? TEAL_BORDER : 'rgba(255,255,255,0.08)',
          }}
        />
      </div>

      {/* Optional syllabus paste */}
      <div>
        <label className="block text-molted-white text-sm font-semibold mb-1">
          Existing syllabus <span className="text-molted-subtle font-normal">(optional)</span>
        </label>
        <p className="text-molted-muted text-xs mb-2">
          Paste an existing outline or syllabus to redesign or build on — or leave blank to generate from scratch.
        </p>
        <textarea
          value={form.syllabus}
          onChange={set('syllabus')}
          placeholder="Paste existing syllabus, topic list, or outline here…"
          rows={4}
          className="w-full rounded-xl border text-sm text-molted-muted leading-relaxed resize-none p-3 focus:outline-none transition-colors"
          style={{
            background: 'rgba(17,17,24,0.9)',
            borderColor: form.syllabus.length > 0 ? TEAL_BORDER : 'rgba(255,255,255,0.08)',
          }}
        />
      </div>

      <button
        onClick={() => onSubmit(form)}
        disabled={!ready}
        className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm transition-all duration-200"
        style={{
          background: ready ? TEAL : 'rgba(255,255,255,0.06)',
          color: ready ? '#0A0A0F' : '#3A3A40',
          cursor: ready ? 'pointer' : 'not-allowed',
        }}
      >
        {loading ? (
          <><Loader2 size={16} className="animate-spin" />Designing your course...</>
        ) : (
          <><UploadCloud size={16} />Build Course Structure</>
        )}
      </button>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────── */
export default function CourseArchitect() {
  const [result, setResult] = useState<CourseResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(form: Record<string, string>) {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/course-architect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) { setError(data.error ?? 'Something went wrong.'); return; }
      setResult(data);
    } catch {
      setError('Network error — check your connection.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <MoltedLayout>
      <div className="min-h-screen pt-24 pb-24 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-10">
            <Link
              to="/molted/teachos"
              className="inline-flex items-center gap-1.5 text-molted-muted text-sm hover:text-molted-white transition-colors mb-6"
            >
              <ChevronLeft size={14} />
              TeachOS
            </Link>

            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ background: TEAL_DIM, color: TEAL, border: `1px solid ${TEAL_BORDER}` }}
            >
              <UploadCloud size={11} />
              Course Architect · Beta
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-molted-white tracking-tight">
              Tell us what students should learn.
              <br />
              <span style={{ color: TEAL }}>We'll build the semester.</span>
            </h1>
            <p className="mt-3 text-molted-muted text-base max-w-lg leading-relaxed">
              Enter your learning objectives and course details.
              Course Architect designs your week-by-week map, writes every
              announcement, and generates a student FAQ — ready to paste into your LMS.
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-start">

            {/* Input */}
            <div
              className="rounded-3xl p-6 border sticky top-24"
              style={{ background: 'rgba(17,17,24,0.7)', borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <InputForm onSubmit={handleSubmit} loading={loading} />
            </div>

            {/* Results */}
            <div>
              {error && (
                <div
                  className="rounded-2xl p-5 border mb-6"
                  style={{ background: 'rgba(232,23,15,0.08)', borderColor: 'rgba(232,23,15,0.2)' }}
                >
                  <p className="text-red-400 text-sm font-semibold mb-1">Error</p>
                  <p className="text-molted-muted text-sm">{error}</p>
                </div>
              )}

              {!result && !loading && !error && (
                <div
                  className="rounded-3xl p-10 border text-center"
                  style={{ background: 'rgba(17,17,24,0.5)', borderColor: 'rgba(255,255,255,0.04)' }}
                >
                  <div className="grid grid-cols-3 gap-3 mb-8 max-w-xs mx-auto">
                    {[
                      { icon: BookOpen, label: 'Course map' },
                      { icon: Megaphone, label: 'Announcements' },
                      { icon: HelpCircle, label: 'Student FAQ' },
                    ].map(({ icon: Icon, label }) => (
                      <div
                        key={label}
                        className="rounded-2xl p-4 flex flex-col items-center gap-2 text-center"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                      >
                        <Icon size={18} className="text-molted-subtle" />
                        <p className="text-molted-subtle text-xs">{label}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-molted-muted font-semibold mb-2">Your course structure will appear here</p>
                  <p className="text-molted-subtle text-sm">
                    Fill in course details on the left and click Build Course Structure.
                  </p>
                </div>
              )}

              {loading && (
                <div
                  className="rounded-3xl p-10 border text-center"
                  style={{ background: 'rgba(17,17,24,0.5)', borderColor: TEAL_BORDER }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: TEAL_DIM, border: `1px solid ${TEAL_BORDER}` }}
                  >
                    <Loader2 size={20} style={{ color: TEAL }} className="animate-spin" />
                  </div>
                  <p className="text-molted-white font-semibold mb-1">Designing your course...</p>
                  <p className="text-molted-muted text-sm">
                    Building module map, writing announcements, generating FAQ.
                    <br />
                    This takes 15–30 seconds for a full semester.
                  </p>
                </div>
              )}

              {result && <Results result={result} />}
            </div>
          </div>

          {/* Footer nudge */}
          <div
            className="mt-16 rounded-3xl p-8 border text-center"
            style={{ background: 'rgba(17,17,24,0.7)', borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <p className="text-molted-muted text-sm mb-1">This is TeachOS Course Architect — beta.</p>
            <p className="text-molted-white font-semibold mb-5">
              Next: direct LMS publish — build once, schedule everything.
            </p>
            <a
              href="mailto:hello@molted.ai"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:-translate-y-px"
              style={{ background: TEAL, color: '#0A0A0F' }}
            >
              Join the early access list
              <ArrowRight size={14} />
            </a>
          </div>

        </div>
      </div>
    </MoltedLayout>
  );
}
