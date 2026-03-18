import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  UploadCloud, ChevronLeft, Loader2, ArrowRight, Copy, Check,
  BookOpen, Megaphone, HelpCircle, Lightbulb, ChevronDown, ChevronUp,
  GraduationCap, Calendar, Target, FileText, Layers, ClipboardList,
  MessageSquare, Star, Award,
} from 'lucide-react';
import MoltedLayout from './MoltedLayout';

/* ── Constants ─────────────────────────────────────────────────────────── */
const TEAL = '#2563EB';
const TEAL_DIM = 'rgba(37,99,235,0.12)';
const TEAL_BORDER = 'rgba(37,99,235,0.25)';

const PURPLE = '#7C3AED';
const PURPLE_DIM = 'rgba(124,58,237,0.12)';
const PURPLE_BORDER = 'rgba(124,58,237,0.25)';

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

interface RubricCriterion {
  name: string;
  points: number;
  excellent: string;
  satisfactory: string;
  needsWork: string;
}

interface Rubric {
  assignmentName: string;
  totalPoints: number;
  criteria: RubricCriterion[];
}

interface DiscussionPrompt {
  week: number;
  prompt: string;
}

interface SyllabusResult {
  courseTitle: string;
  courseNumber: string;
  instructor: string;
  overview: string;
  weeks: number;
  learningObjectives: string[];
  assessments: Assessment[];
  discussionPrompts: DiscussionPrompt[];
  rubric: Rubric;
  faq: FAQ[];
  suggestedAnnouncement: string;
}

/* ── CopyButton ────────────────────────────────────────────────────────── */
function CopyButton({ text, label = 'Copy', accent = TEAL }: { text: string; label?: string; accent?: string }) {
  const [copied, setCopied] = useState(false);
  const accentDim = accent === PURPLE ? PURPLE_DIM : TEAL_DIM;
  const accentBorder = accent === PURPLE ? PURPLE_BORDER : TEAL_BORDER;
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1800); }}
      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
      style={{
        background: copied ? accentDim : 'rgba(148,163,184,0.10)',
        color: copied ? accent : '#94A3B8',
        border: `1px solid ${copied ? accentBorder : 'rgba(0,0,0,0.08)'}`,
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
              background: active ? TEAL_DIM : 'rgba(148,163,184,0.08)',
              color: active ? TEAL : '#94A3B8',
              border: `1px solid ${active ? TEAL_BORDER : 'rgba(148,163,184,0.12)'}`,
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
      style={{ background: 'rgba(241,243,248,0.95)', borderColor: 'rgba(148,163,184,0.12)' }}
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
                style={{ background: 'rgba(148,163,184,0.10)', color: '#94A3B8', border: '1px solid rgba(148,163,184,0.12)' }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Discussion + Assignment */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div
              className="rounded-xl p-3"
              style={{ background: 'rgba(148,163,184,0.05)', border: '1px solid rgba(148,163,184,0.08)' }}
            >
              <p className="text-xs font-semibold text-molted-muted mb-1.5">Discussion prompt</p>
              <p className="text-sm text-molted-white/80 leading-relaxed">{module.discussionPrompt}</p>
            </div>
            <div
              className="rounded-xl p-3"
              style={{ background: 'rgba(148,163,184,0.05)', border: '1px solid rgba(148,163,184,0.08)' }}
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
      style={{ background: 'rgba(241,243,248,0.95)', borderColor: 'rgba(148,163,184,0.12)' }}
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
        style={{ background: 'rgba(148,163,184,0.05)', border: '1px solid rgba(148,163,184,0.08)' }}
      >
        {module.announcement}
      </div>
    </div>
  );
}

/* ── FAQ card ──────────────────────────────────────────────────────────── */
function FaqCard({ item, index, accent = TEAL }: { item: FAQ; index: number; accent?: string }) {
  const [open, setOpen] = useState(index < 3);
  return (
    <div
      className="rounded-2xl border"
      style={{ background: 'rgba(241,243,248,0.95)', borderColor: 'rgba(148,163,184,0.12)' }}
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
              style={{ background: 'rgba(148,163,184,0.08)', border: '1px solid rgba(148,163,184,0.12)' }}
            >
              <p className="text-molted-white font-semibold">{a.name}</p>
              <p className="text-molted-muted mt-0.5">{a.type} · {a.weight}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b" style={{ borderColor: 'rgba(148,163,184,0.12)' }}>
        {tabs.map(t => {
          const Icon = t.icon;
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-all border-b-2 -mb-px"
              style={{
                color: active ? TEAL : '#94A3B8',
                borderColor: active ? TEAL : 'transparent',
              }}
            >
              <Icon size={13} />
              {t.label}
              {t.count !== undefined && (
                <span
                  className="text-xs px-1.5 py-0.5 rounded-full"
                  style={{
                    background: active ? `${TEAL}20` : 'rgba(148,163,184,0.08)',
                    color: active ? TEAL : '#64748B',
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
        style={{ background: 'rgba(248,249,252,0.95)', borderColor: 'rgba(148,163,184,0.10)' }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb size={14} style={{ color: '#64748B' }} />
          <p className="text-sm font-semibold text-molted-white">Design Insight</p>
        </div>
        <p className="text-molted-muted text-sm leading-relaxed">{result.insights}</p>
      </div>
    </div>
  );
}

/* ── Input form (Mode A) ────────────────────────────────────────────────── */
function InputForm({ onSubmit, loading, loadingStage }: {
  onSubmit: (data: Record<string, string>) => void;
  loading: boolean;
  loadingStage: string;
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
            background: 'rgba(248,249,252,0.95)',
            borderColor: form.title.length > 0 ? TEAL_BORDER : 'rgba(0,0,0,0.08)',
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
                  background: active ? TEAL_DIM : 'rgba(148,163,184,0.08)',
                  color: active ? TEAL : '#94A3B8',
                  border: `1px solid ${active ? TEAL_BORDER : 'rgba(148,163,184,0.12)'}`,
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
            background: 'rgba(248,249,252,0.95)',
            borderColor: form.objectives.length > 0 ? TEAL_BORDER : 'rgba(0,0,0,0.08)',
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
                  background: active ? TEAL_DIM : 'rgba(148,163,184,0.06)',
                  borderColor: active ? TEAL_BORDER : 'rgba(148,163,184,0.12)',
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-bold" style={{ color: active ? TEAL : '#1C1C1E' }}>
                    {opt.title}
                  </p>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={{
                      background: active ? `${TEAL}20` : 'rgba(148,163,184,0.08)',
                      color: active ? TEAL : '#64748B',
                    }}
                  >
                    {opt.words}
                  </span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: active ? 'rgba(37,99,235,0.75)' : '#64748B' }}>
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
            background: 'rgba(248,249,252,0.95)',
            borderColor: form.voice.length > 0 ? TEAL_BORDER : 'rgba(0,0,0,0.08)',
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
            background: 'rgba(248,249,252,0.95)',
            borderColor: form.syllabus.length > 0 ? TEAL_BORDER : 'rgba(0,0,0,0.08)',
          }}
        />
      </div>

      <button
        onClick={() => onSubmit(form)}
        disabled={!ready}
        className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm transition-all duration-200"
        style={{
          background: ready ? TEAL : 'rgba(148,163,184,0.10)',
          color: ready ? '#0A0A0F' : '#64748B',
          cursor: ready ? 'pointer' : 'not-allowed',
        }}
      >
        {loading ? (
          <><Loader2 size={16} className="animate-spin" />{loadingStage || 'Designing your course…'}</>
        ) : (
          <><UploadCloud size={16} />Build Course Structure</>
        )}
      </button>
    </div>
  );
}

/* ── Rubric criterion card (Mode B) ─────────────────────────────────────── */
function RubricCriterionCard({ criterion }: { criterion: RubricCriterion }) {
  const copyText = [
    `${criterion.name} (${criterion.points} pts)`,
    '',
    `Excellent: ${criterion.excellent}`,
    `Satisfactory: ${criterion.satisfactory}`,
    `Needs Work: ${criterion.needsWork}`,
  ].join('\n');

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ borderColor: PURPLE_BORDER }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3.5"
        style={{ background: PURPLE_DIM }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0"
            style={{ background: `${PURPLE}20`, color: PURPLE, border: `1px solid ${PURPLE_BORDER}` }}
          >
            {criterion.points}
          </div>
          <p className="text-molted-white text-sm font-bold">{criterion.name}</p>
        </div>
        <CopyButton text={copyText} label="Copy" accent={PURPLE} />
      </div>

      {/* Performance levels */}
      <div className="grid sm:grid-cols-3 divide-x divide-white/10">
        {/* Excellent */}
        <div
          className="p-4 space-y-2"
          style={{ background: 'rgba(34,197,94,0.05)', borderRight: '1px solid rgba(148,163,184,0.10)' }}
        >
          <div className="flex items-center gap-1.5">
            <Star size={10} style={{ color: '#22C55E' }} fill="#22C55E" />
            <p className="text-xs font-bold uppercase tracking-wide" style={{ color: '#22C55E' }}>Excellent</p>
          </div>
          <p className="text-xs text-molted-white/80 leading-relaxed">{criterion.excellent}</p>
        </div>

        {/* Satisfactory */}
        <div
          className="p-4 space-y-2"
          style={{ background: 'rgba(234,179,8,0.05)', borderRight: '1px solid rgba(148,163,184,0.10)' }}
        >
          <div className="flex items-center gap-1.5">
            <Star size={10} style={{ color: '#EAB308' }} fill="#EAB308" />
            <p className="text-xs font-bold uppercase tracking-wide" style={{ color: '#EAB308' }}>Satisfactory</p>
          </div>
          <p className="text-xs text-molted-white/80 leading-relaxed">{criterion.satisfactory}</p>
        </div>

        {/* Needs Work */}
        <div
          className="p-4 space-y-2"
          style={{ background: 'rgba(239,68,68,0.05)' }}
        >
          <div className="flex items-center gap-1.5">
            <Star size={10} style={{ color: '#EF4444' }} fill="#EF4444" />
            <p className="text-xs font-bold uppercase tracking-wide" style={{ color: '#EF4444' }}>Needs Work</p>
          </div>
          <p className="text-xs text-molted-white/80 leading-relaxed">{criterion.needsWork}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Syllabus parse results (Mode B) ────────────────────────────────────── */
type SyllabusTab = 'extracted' | 'discussions' | 'rubric' | 'faq' | 'announcement';

function SyllabusResults({ result }: { result: SyllabusResult }) {
  const [tab, setTab] = useState<SyllabusTab>('extracted');

  const allDiscussions = (result.discussionPrompts ?? [])
    .map(d => `Week ${d.week}: ${d.prompt}`)
    .join('\n\n');

  const allFaq = (result.faq ?? [])
    .map(f => `Q: ${f.question}\nA: ${f.answer}`)
    .join('\n\n');

  const rubricText = result.rubric
    ? [
        `${result.rubric.assignmentName} — Grading Rubric (${result.rubric.totalPoints} pts)`,
        '',
        ...(result.rubric.criteria ?? []).flatMap(c => [
          `${c.name} (${c.points} pts)`,
          `  Excellent: ${c.excellent}`,
          `  Satisfactory: ${c.satisfactory}`,
          `  Needs Work: ${c.needsWork}`,
          '',
        ]),
      ].join('\n')
    : '';

  const tabs: { key: SyllabusTab; label: string; icon: typeof BookOpen; count?: number }[] = [
    { key: 'extracted', label: 'Extracted', icon: ClipboardList },
    { key: 'discussions', label: 'Discussion Prompts', icon: MessageSquare, count: result.discussionPrompts?.length },
    { key: 'rubric', label: 'Rubric', icon: Award, count: result.rubric?.criteria?.length },
    { key: 'faq', label: 'FAQ', icon: HelpCircle, count: result.faq?.length },
    { key: 'announcement', label: 'Announcement', icon: Megaphone },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="rounded-2xl border p-5"
        style={{ background: PURPLE_DIM, borderColor: PURPLE_BORDER }}
      >
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <p className="text-molted-white font-bold text-lg">{result.courseTitle}</p>
            {(result.courseNumber || result.instructor) && (
              <p className="text-molted-muted text-xs mt-1">
                {[result.courseNumber, result.instructor].filter(Boolean).join(' · ')}
              </p>
            )}
          </div>
          {result.weeks && (
            <span
              className="text-xs px-2.5 py-1 rounded-full font-semibold flex-shrink-0"
              style={{ background: `${PURPLE}20`, color: PURPLE, border: `1px solid ${PURPLE_BORDER}` }}
            >
              {result.weeks} weeks
            </span>
          )}
        </div>
        <p className="text-molted-white/70 text-sm mt-2.5 leading-relaxed">{result.overview}</p>
        <div className="flex gap-4 mt-3 text-xs text-molted-muted flex-wrap">
          <span>{result.learningObjectives?.length ?? 0} objectives extracted</span>
          <span>{result.assessments?.length ?? 0} assessments</span>
          <span>{result.discussionPrompts?.length ?? 0} discussion prompts</span>
          <span>{result.rubric?.criteria?.length ?? 0} rubric criteria</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 flex-wrap border-b" style={{ borderColor: 'rgba(148,163,184,0.12)' }}>
        {tabs.map(t => {
          const Icon = t.icon;
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="flex items-center gap-2 px-3 py-2.5 text-sm font-semibold transition-all border-b-2 -mb-px"
              style={{
                color: active ? PURPLE : '#94A3B8',
                borderColor: active ? PURPLE : 'transparent',
              }}
            >
              <Icon size={13} />
              <span className="hidden sm:inline">{t.label}</span>
              <span className="sm:hidden">{t.label.split(' ')[0]}</span>
              {t.count !== undefined && (
                <span
                  className="text-xs px-1.5 py-0.5 rounded-full"
                  style={{
                    background: active ? `${PURPLE}20` : 'rgba(148,163,184,0.08)',
                    color: active ? PURPLE : '#64748B',
                  }}
                >
                  {t.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab: Extracted */}
      {tab === 'extracted' && (
        <div className="space-y-5">
          {/* Learning Objectives */}
          {result.learningObjectives?.length > 0 && (
            <div
              className="rounded-2xl border p-5"
              style={{ background: 'rgba(241,243,248,0.95)', borderColor: 'rgba(148,163,184,0.12)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Target size={14} style={{ color: PURPLE }} />
                <p className="text-molted-white text-sm font-bold">Learning Objectives</p>
              </div>
              <ul className="space-y-2">
                {result.learningObjectives.map((obj, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-molted-white/80">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                      style={{ background: PURPLE_DIM, color: PURPLE }}
                    >
                      {i + 1}
                    </span>
                    {obj}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Assessments */}
          {result.assessments?.length > 0 && (
            <div
              className="rounded-2xl border p-5"
              style={{ background: 'rgba(241,243,248,0.95)', borderColor: 'rgba(148,163,184,0.12)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <FileText size={14} style={{ color: PURPLE }} />
                <p className="text-molted-white text-sm font-bold">Assessments</p>
              </div>
              <div className="space-y-2.5">
                {result.assessments.map((a, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-3.5"
                    style={{ background: 'rgba(148,163,184,0.06)', border: '1px solid rgba(148,163,184,0.10)' }}
                  >
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <p className="text-molted-white text-sm font-semibold">{a.name}</p>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-bold"
                          style={{ background: PURPLE_DIM, color: PURPLE }}
                        >
                          {a.weight}
                        </span>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: 'rgba(148,163,184,0.10)', color: '#94A3B8' }}
                        >
                          {a.type}
                        </span>
                      </div>
                    </div>
                    {a.description && (
                      <p className="text-xs text-molted-muted leading-relaxed">{a.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab: Discussion Prompts */}
      {tab === 'discussions' && (
        <div className="space-y-3">
          <div className="flex justify-end">
            <CopyButton text={allDiscussions} label="Copy all prompts" accent={PURPLE} />
          </div>
          {(result.discussionPrompts ?? []).map((dp, i) => (
            <div
              key={i}
              className="rounded-2xl border"
              style={{ background: 'rgba(241,243,248,0.95)', borderColor: 'rgba(148,163,184,0.12)' }}
            >
              <div className="flex items-center justify-between px-5 pt-4 pb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black"
                    style={{ background: PURPLE_DIM, color: PURPLE }}
                  >
                    {dp.week}
                  </div>
                  <p className="text-molted-muted text-xs font-semibold uppercase tracking-wide">Week {dp.week}</p>
                </div>
                <CopyButton text={dp.prompt} accent={PURPLE} />
              </div>
              <div
                className="mx-4 mb-4 rounded-xl p-4 text-sm leading-relaxed text-molted-white/80"
                style={{ background: 'rgba(148,163,184,0.05)', border: '1px solid rgba(148,163,184,0.08)' }}
              >
                {dp.prompt}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Rubric */}
      {tab === 'rubric' && result.rubric && (
        <div className="space-y-4">
          {/* Rubric header */}
          <div
            className="rounded-2xl border p-5 flex items-center justify-between gap-4 flex-wrap"
            style={{ background: PURPLE_DIM, borderColor: PURPLE_BORDER }}
          >
            <div>
              <p className="text-molted-white font-bold">{result.rubric.assignmentName}</p>
              <p className="text-molted-muted text-xs mt-0.5">
                {result.rubric.criteria?.length ?? 0} criteria · {result.rubric.totalPoints} total points
              </p>
            </div>
            <CopyButton text={rubricText} label="Copy full rubric" accent={PURPLE} />
          </div>

          {/* Legend */}
          <div className="flex gap-3 flex-wrap">
            {[
              { label: 'Excellent', color: '#22C55E', bg: 'rgba(34,197,94,0.10)' },
              { label: 'Satisfactory', color: '#EAB308', bg: 'rgba(234,179,8,0.10)' },
              { label: 'Needs Work', color: '#EF4444', bg: 'rgba(239,68,68,0.10)' },
            ].map(lvl => (
              <div
                key={lvl.label}
                className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-semibold"
                style={{ background: lvl.bg, color: lvl.color }}
              >
                <Star size={9} fill={lvl.color} style={{ color: lvl.color }} />
                {lvl.label}
              </div>
            ))}
          </div>

          {/* Criteria cards */}
          <div className="space-y-3">
            {(result.rubric.criteria ?? []).map((criterion, i) => (
              <RubricCriterionCard key={i} criterion={criterion} />
            ))}
          </div>
        </div>
      )}

      {/* Tab: FAQ */}
      {tab === 'faq' && (
        <div className="space-y-3">
          <div className="flex justify-end">
            <CopyButton text={allFaq} label="Copy full FAQ" accent={PURPLE} />
          </div>
          {(result.faq ?? []).map((f, i) => (
            <FaqCard key={i} item={f} index={i} accent={PURPLE} />
          ))}
        </div>
      )}

      {/* Tab: Announcement */}
      {tab === 'announcement' && result.suggestedAnnouncement && (
        <div className="space-y-4">
          <div
            className="rounded-2xl border"
            style={{ background: 'rgba(241,243,248,0.95)', borderColor: PURPLE_BORDER }}
          >
            <div className="flex items-center justify-between px-5 pt-4 pb-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center"
                  style={{ background: PURPLE_DIM, color: PURPLE }}
                >
                  <Megaphone size={12} />
                </div>
                <p className="text-molted-white text-sm font-semibold">Week 1 Kickoff Announcement</p>
              </div>
              <CopyButton text={result.suggestedAnnouncement} accent={PURPLE} />
            </div>
            <div
              className="mx-4 mb-4 rounded-xl p-5 text-sm leading-relaxed text-molted-white/80 whitespace-pre-wrap"
              style={{ background: 'rgba(148,163,184,0.05)', border: '1px solid rgba(148,163,184,0.08)' }}
            >
              {result.suggestedAnnouncement}
            </div>
          </div>
          <p className="text-molted-subtle text-xs text-center">
            Paste directly into Canvas, Blackboard, or your LMS announcement tool.
          </p>
        </div>
      )}
    </div>
  );
}

/* ── Syllabus parse form (Mode B) ───────────────────────────────────────── */
function SyllabusForm({ onSubmit, loading, loadingStage }: {
  onSubmit: (syllabus: string, voice: string) => void;
  loading: boolean;
  loadingStage: string;
}) {
  const [syllabus, setSyllabus] = useState('');
  const [voice, setVoice] = useState('');

  const ready = syllabus.trim().length >= 50 && !loading;

  return (
    <div className="space-y-5">
      {/* Syllabus paste */}
      <div>
        <label className="block text-molted-white text-sm font-semibold mb-2">
          Paste your existing syllabus
        </label>
        <p className="text-molted-muted text-xs mb-2">
          Raw text is fine — copy straight from a PDF, Word doc, or LMS. The more content you paste, the richer the output.
        </p>
        <textarea
          value={syllabus}
          onChange={e => setSyllabus(e.target.value)}
          placeholder="Paste your syllabus here — course description, objectives, schedule, assessments, grading policy, anything…"
          rows={14}
          className="w-full rounded-xl border text-sm text-molted-white leading-relaxed resize-none p-3 focus:outline-none transition-colors"
          style={{
            background: 'rgba(248,249,252,0.95)',
            borderColor: syllabus.length > 0 ? PURPLE_BORDER : 'rgba(0,0,0,0.08)',
          }}
        />
        {syllabus.length > 0 && syllabus.trim().length < 50 && (
          <p className="text-xs mt-1" style={{ color: '#EF4444' }}>
            Please paste more content — at least 50 characters needed.
          </p>
        )}
      </div>

      {/* Voice */}
      <div>
        <label className="block text-molted-white text-sm font-semibold mb-1">
          Your voice <span className="text-molted-subtle font-normal">(optional)</span>
        </label>
        <p className="text-molted-muted text-xs mb-2">
          Describe your teaching style and personality. The generated announcement and FAQ answers will sound like you.
        </p>
        <textarea
          value={voice}
          onChange={e => setVoice(e.target.value)}
          placeholder="e.g. I've taught this course for 8 years. I'm warm but direct. I love analogies from everyday life and I always tell students exactly what to expect — no surprises."
          rows={4}
          className="w-full rounded-xl border text-sm text-molted-muted leading-relaxed resize-none p-3 focus:outline-none transition-colors"
          style={{
            background: 'rgba(248,249,252,0.95)',
            borderColor: voice.length > 0 ? PURPLE_BORDER : 'rgba(0,0,0,0.08)',
          }}
        />
      </div>

      <button
        onClick={() => onSubmit(syllabus, voice)}
        disabled={!ready}
        className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm transition-all duration-200"
        style={{
          background: ready ? PURPLE : 'rgba(148,163,184,0.10)',
          color: ready ? '#ffffff' : '#64748B',
          cursor: ready ? 'pointer' : 'not-allowed',
        }}
      >
        {loading ? (
          <><Loader2 size={16} className="animate-spin" />{loadingStage || 'Parsing syllabus…'}</>
        ) : (
          <><Layers size={16} />Parse &amp; Package →</>
        )}
      </button>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────── */
type PageMode = 'build' | 'parse';

export default function CourseArchitect() {
  const [mode, setMode] = useState<PageMode>('build');

  // Mode A state
  const [result, setResult] = useState<CourseResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Mode B state
  const [syllabusResult, setSyllabusResult] = useState<SyllabusResult | null>(null);
  const [syllabusLoading, setSyllabusLoading] = useState(false);
  const [syllabusLoadingStage, setSyllabusLoadingStage] = useState('');
  const [syllabusError, setSyllabusError] = useState<string | null>(null);

  async function handleSubmit(form: Record<string, string>) {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      setLoadingStage('Building course structure…');
      const res1 = await fetch('/api/course-architect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const courseData = await res1.json();
      if (!res1.ok) { setError(courseData.error ?? 'Something went wrong building the course map.'); return; }

      const aLevel = Number(form.announcementLevel) || 1;
      if (aLevel > 1 && Array.isArray(courseData.modules)) {
        setLoadingStage(
          aLevel === 2
            ? 'Writing mini-lesson announcements…'
            : 'Writing deep-dive announcements with examples…'
        );
        const res2 = await fetch('/api/expand-announcements', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            modules: courseData.modules,
            level: form.announcementLevel,
            voice: form.voice,
            courseTitle: courseData.courseTitle,
          }),
        });
        if (res2.ok) {
          const enhanced: Array<{ week: number; announcement: string }> = await res2.json();
          if (Array.isArray(enhanced)) {
            courseData.modules = courseData.modules.map((m: any) => {
              const hit = enhanced.find(a => a.week === m.week);
              return hit ? { ...m, announcement: hit.announcement } : m;
            });
          }
        }
      }

      setResult(courseData);
    } catch {
      setError('Network error — please check your connection and try again.');
    } finally {
      setLoading(false);
      setLoadingStage('');
    }
  }

  async function handleSyllabusParse(syllabus: string, voice: string) {
    setSyllabusLoading(true);
    setSyllabusError(null);
    setSyllabusResult(null);

    try {
      setSyllabusLoadingStage('Reading and parsing your syllabus…');
      const res = await fetch('/api/syllabus-parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ syllabus, voice }),
      });
      const data = await res.json();
      if (!res.ok) { setSyllabusError(data.error ?? 'Something went wrong parsing the syllabus.'); return; }
      setSyllabusResult(data);
    } catch {
      setSyllabusError('Network error — please check your connection and try again.');
    } finally {
      setSyllabusLoading(false);
      setSyllabusLoadingStage('');
    }
  }

  const accentColor = mode === 'parse' ? PURPLE : TEAL;
  const accentDim = mode === 'parse' ? PURPLE_DIM : TEAL_DIM;
  const accentBorder = mode === 'parse' ? PURPLE_BORDER : TEAL_BORDER;

  return (
    <MoltedLayout>
      <div className="min-h-screen pt-24 pb-24 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-10">
            <Link
              to="/teachos"
              className="inline-flex items-center gap-1.5 text-molted-muted text-sm hover:text-molted-white transition-colors mb-6"
            >
              <ChevronLeft size={14} />
              Forge
            </Link>

            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ background: accentDim, color: accentColor, border: `1px solid ${accentBorder}` }}
            >
              <UploadCloud size={11} />
              Course Architect · Beta
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-molted-white tracking-tight">
              {mode === 'build' ? (
                <>Tell us what students should learn.<br /><span style={{ color: TEAL }}>We'll build the semester.</span></>
              ) : (
                <>Paste your syllabus.<br /><span style={{ color: PURPLE }}>We'll package the whole course.</span></>
              )}
            </h1>
            <p className="mt-3 text-molted-muted text-base max-w-lg leading-relaxed">
              {mode === 'build'
                ? 'Enter your learning objectives and course details. Course Architect designs your week-by-week map, writes every announcement, and generates a student FAQ — ready to paste into your LMS.'
                : 'Paste any existing syllabus — raw text is fine. Course Architect extracts course info, generates discussion prompts, builds a grading rubric, writes a student FAQ, and drafts your Week 1 announcement.'
              }
            </p>
          </div>

          {/* Mode toggle */}
          <div
            className="inline-flex rounded-xl p-1 mb-8 gap-1"
            style={{ background: 'rgba(148,163,184,0.08)', border: '1px solid rgba(148,163,184,0.12)' }}
          >
            {([
              { key: 'build' as PageMode, label: 'Build from scratch', icon: GraduationCap, accent: TEAL, accentDim: TEAL_DIM, accentBorder: TEAL_BORDER },
              { key: 'parse' as PageMode, label: 'Parse a syllabus', icon: Layers, accent: PURPLE, accentDim: PURPLE_DIM, accentBorder: PURPLE_BORDER },
            ] as const).map(opt => {
              const active = mode === opt.key;
              const Icon = opt.icon;
              return (
                <button
                  key={opt.key}
                  onClick={() => setMode(opt.key)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all"
                  style={{
                    background: active ? opt.accentDim : 'transparent',
                    color: active ? opt.accent : '#94A3B8',
                    border: active ? `1px solid ${opt.accentBorder}` : '1px solid transparent',
                  }}
                >
                  <Icon size={14} />
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-start">

            {/* Input panel */}
            <div
              className="rounded-3xl p-6 border sticky top-24"
              style={{
                background: 'rgba(241,243,248,0.90)',
                borderColor: mode === 'parse' ? PURPLE_BORDER : 'rgba(148,163,184,0.10)',
              }}
            >
              {mode === 'build' ? (
                <InputForm onSubmit={handleSubmit} loading={loading} loadingStage={loadingStage} />
              ) : (
                <SyllabusForm onSubmit={handleSyllabusParse} loading={syllabusLoading} loadingStage={syllabusLoadingStage} />
              )}
            </div>

            {/* Results panel */}
            <div>
              {/* Mode A error/results */}
              {mode === 'build' && (
                <>
                  {error && (
                    <div
                      className="rounded-2xl p-5 border mb-6"
                      style={{ background: 'rgba(30,58,138,0.08)', borderColor: 'rgba(30,58,138,0.2)' }}
                    >
                      <p className="text-red-400 text-sm font-semibold mb-1">Error</p>
                      <p className="text-molted-muted text-sm">{error}</p>
                    </div>
                  )}

                  {!result && !loading && !error && (
                    <div
                      className="rounded-3xl p-10 border text-center"
                      style={{ background: 'rgba(241,243,248,0.80)', borderColor: 'rgba(148,163,184,0.08)' }}
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
                            style={{ background: 'rgba(148,163,184,0.07)', border: '1px solid rgba(148,163,184,0.08)' }}
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
                      style={{ background: 'rgba(241,243,248,0.80)', borderColor: TEAL_BORDER }}
                    >
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                        style={{ background: TEAL_DIM, border: `1px solid ${TEAL_BORDER}` }}
                      >
                        <Loader2 size={20} style={{ color: TEAL }} className="animate-spin" />
                      </div>
                      <p className="text-molted-white font-semibold mb-1">{loadingStage || 'Designing your course…'}</p>
                      <p className="text-molted-muted text-sm">
                        {loadingStage.includes('announcement')
                          ? 'Writing richer announcements takes a bit longer — hang tight.'
                          : 'Building module map, writing announcements, generating FAQ.'}
                        <br />
                        This takes 15–45 seconds depending on depth and length.
                      </p>
                    </div>
                  )}

                  {result && <Results result={result} />}
                </>
              )}

              {/* Mode B error/results */}
              {mode === 'parse' && (
                <>
                  {syllabusError && (
                    <div
                      className="rounded-2xl p-5 border mb-6"
                      style={{ background: 'rgba(124,58,237,0.06)', borderColor: PURPLE_BORDER }}
                    >
                      <p className="text-red-400 text-sm font-semibold mb-1">Error</p>
                      <p className="text-molted-muted text-sm">{syllabusError}</p>
                    </div>
                  )}

                  {!syllabusResult && !syllabusLoading && !syllabusError && (
                    <div
                      className="rounded-3xl p-10 border text-center"
                      style={{ background: 'rgba(241,243,248,0.80)', borderColor: 'rgba(148,163,184,0.08)' }}
                    >
                      <div className="grid grid-cols-3 gap-3 mb-8 max-w-xs mx-auto">
                        {[
                          { icon: ClipboardList, label: 'Extracted info' },
                          { icon: Award, label: 'Grading rubric' },
                          { icon: MessageSquare, label: 'Discussion prompts' },
                        ].map(({ icon: Icon, label }) => (
                          <div
                            key={label}
                            className="rounded-2xl p-4 flex flex-col items-center gap-2 text-center"
                            style={{ background: 'rgba(124,58,237,0.05)', border: `1px solid ${PURPLE_BORDER}` }}
                          >
                            <Icon size={18} style={{ color: PURPLE }} />
                            <p className="text-molted-subtle text-xs">{label}</p>
                          </div>
                        ))}
                      </div>
                      <p className="text-molted-muted font-semibold mb-2">Your course package will appear here</p>
                      <p className="text-molted-subtle text-sm">
                        Paste your syllabus on the left and click Parse &amp; Package.
                      </p>
                    </div>
                  )}

                  {syllabusLoading && (
                    <div
                      className="rounded-3xl p-10 border text-center"
                      style={{ background: 'rgba(241,243,248,0.80)', borderColor: PURPLE_BORDER }}
                    >
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                        style={{ background: PURPLE_DIM, border: `1px solid ${PURPLE_BORDER}` }}
                      >
                        <Loader2 size={20} style={{ color: PURPLE }} className="animate-spin" />
                      </div>
                      <p className="text-molted-white font-semibold mb-1">{syllabusLoadingStage || 'Parsing syllabus…'}</p>
                      <p className="text-molted-muted text-sm">
                        Extracting course info, generating prompts, building rubric, and writing your announcement.
                        <br />
                        This takes 20–40 seconds.
                      </p>
                    </div>
                  )}

                  {syllabusResult && <SyllabusResults result={syllabusResult} />}
                </>
              )}
            </div>
          </div>

          {/* Footer nudge */}
          <div
            className="mt-16 rounded-3xl p-8 border text-center"
            style={{ background: 'rgba(241,243,248,0.90)', borderColor: 'rgba(148,163,184,0.10)' }}
          >
            <p className="text-molted-muted text-sm mb-1">This is Forge Course Architect — beta.</p>
            <p className="text-molted-white font-semibold mb-5">
              Next: direct LMS publish — build once, schedule everything.
            </p>
            <a
              href="mailto:hello@molted.ai"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:-translate-y-px"
              style={{ background: TEAL, color: '#ffffff' }}
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
