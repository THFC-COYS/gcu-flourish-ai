import { useState } from 'react';
import {
  MessageSquare, Star, Filter, ChevronDown,
  CheckCircle, Clock, AlertCircle, Send, ThumbsUp, ThumbsDown, User
} from 'lucide-react';
import { MOCK_PROTOTYPES } from '../data/mockData';

type FeedbackStatus = 'open' | 'in-review' | 'resolved';
type FeedbackCategory = 'accuracy' | 'ethics' | 'usability' | 'content' | 'performance';

interface FeedbackEntry {
  id: string;
  prototypeId: string;
  prototypeName: string;
  prototypeIcon: string;
  author: string;
  role: string;
  rating: number;
  category: FeedbackCategory;
  comment: string;
  timestamp: string;
  status: FeedbackStatus;
  helpful: number;
  notHelpful: number;
}

const MOCK_FEEDBACK: FeedbackEntry[] = [
  { id: 'fb1', prototypeId: 'proto-nursing', prototypeName: 'Spirit Nurse', prototypeIcon: '🏥', author: 'Maria Chen', role: 'Student', rating: 5, category: 'content', comment: 'Spirit Nurse helped me work through a triage scenario I was struggling with in clinical prep. The empathetic tone made it feel like a real mentorship conversation.', timestamp: '2026-03-08T14:23:00Z', status: 'resolved', helpful: 12, notHelpful: 0 },
  { id: 'fb2', prototypeId: 'proto-nursing', prototypeName: 'Spirit Nurse', prototypeIcon: '🏥', author: 'James Okafor', role: 'Faculty', rating: 4, category: 'ethics', comment: 'Excellent ethical alignment. One suggestion: add explicit reminders when Spirit Nurse advises calling 911, ensuring it's always the first response to critical symptoms.', timestamp: '2026-03-05T09:10:00Z', status: 'in-review', helpful: 8, notHelpful: 1 },
  { id: 'fb3', prototypeId: 'proto-business', prototypeName: 'Spirit Strategist', prototypeIcon: '💼', author: 'Sarah Kim', role: 'Student', rating: 5, category: 'usability', comment: 'Love how Spirit Strategist breaks down case studies. It asks the right Socratic questions and doesn\'t just give answers — pushes you to think through the framework.', timestamp: '2026-03-07T11:45:00Z', status: 'open', helpful: 6, notHelpful: 0 },
  { id: 'fb4', prototypeId: 'proto-education', prototypeName: 'Spirit Educator', prototypeIcon: '📚', author: 'Dr. Patel', role: 'Faculty', rating: 4, category: 'accuracy', comment: 'Lesson plan suggestions are strong. Sometimes cites outdated pedagogical frameworks — recommend a curriculum content refresh with 2025 research.', timestamp: '2026-03-06T16:30:00Z', status: 'in-review', helpful: 9, notHelpful: 2 },
  { id: 'fb5', prototypeId: 'proto-theology', prototypeName: 'Spirit Guide', prototypeIcon: '✝️', author: 'Pastor David', role: 'Viewer', rating: 5, category: 'ethics', comment: 'Deeply impressed by how Spirit Guide handles sensitive faith questions with both grace and intellectual rigour. The Christ-centered framing is consistent and never coercive.', timestamp: '2026-03-04T08:00:00Z', status: 'resolved', helpful: 15, notHelpful: 0 },
  { id: 'fb6', prototypeId: 'proto-engineering', prototypeName: 'Spirit Engineer', prototypeIcon: '⚙️', author: 'Alex Torres', role: 'Student', rating: 3, category: 'performance', comment: 'Responses sometimes take too long when working through complex coding problems. Would benefit from streaming output so I can start reading earlier.', timestamp: '2026-03-03T14:10:00Z', status: 'open', helpful: 4, notHelpful: 1 },
  { id: 'fb7', prototypeId: 'proto-arts', prototypeName: 'Spirit Creative', prototypeIcon: '🎨', author: 'Lily Morgan', role: 'Student', rating: 5, category: 'content', comment: 'Spirit Creative helped me unlock a creative block. It asked questions about my intent and audience that completely changed my approach to my senior project.', timestamp: '2026-03-02T10:20:00Z', status: 'resolved', helpful: 10, notHelpful: 0 },
  { id: 'fb8', prototypeId: 'proto-sciences', prototypeName: 'Spirit Scientist', prototypeIcon: '🔬', author: 'Dr. Nguyen', role: 'Faculty', rating: 4, category: 'accuracy', comment: 'Research methodology coaching is excellent. Suggest adding APA 7th edition citation formatting guidance as students frequently ask about this.', timestamp: '2026-03-01T09:50:00Z', status: 'in-review', helpful: 7, notHelpful: 0 },
];

const STATUS_CONFIG: Record<FeedbackStatus, { label: string; color: string; icon: typeof CheckCircle }> = {
  open: { label: 'Open', color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20', icon: AlertCircle },
  'in-review': { label: 'In Review', color: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20', icon: Clock },
  resolved: { label: 'Resolved', color: 'text-green-600 bg-green-50 dark:bg-green-900/20', icon: CheckCircle },
};

const CATEGORY_COLORS: Record<FeedbackCategory, string> = {
  accuracy: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  ethics: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  usability: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  content: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  performance: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export default function FeedbackHub() {
  const [filterStatus, setFilterStatus] = useState<FeedbackStatus | 'all'>('all');
  const [filterCategory, setFilterCategory] = useState<FeedbackCategory | 'all'>('all');
  const [filterSpirit, setFilterSpirit] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [formSpirit, setFormSpirit] = useState('');
  const [formRating, setFormRating] = useState(0);
  const [formCategory, setFormCategory] = useState<FeedbackCategory>('content');
  const [formComment, setFormComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [votes, setVotes] = useState<Record<string, 'up' | 'down' | null>>({});

  const filtered = MOCK_FEEDBACK.filter(f => {
    if (filterStatus !== 'all' && f.status !== filterStatus) return false;
    if (filterCategory !== 'all' && f.category !== filterCategory) return false;
    if (filterSpirit !== 'all' && f.prototypeId !== filterSpirit) return false;
    return true;
  });

  const openCount = MOCK_FEEDBACK.filter(f => f.status === 'open').length;
  const inReviewCount = MOCK_FEEDBACK.filter(f => f.status === 'in-review').length;
  const resolvedCount = MOCK_FEEDBACK.filter(f => f.status === 'resolved').length;
  const avgRating = (MOCK_FEEDBACK.reduce((s, f) => s + f.rating, 0) / MOCK_FEEDBACK.length).toFixed(1);

  function handleVote(id: string, dir: 'up' | 'down') {
    setVotes(v => ({ ...v, [id]: v[id] === dir ? null : dir }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
      setFormSpirit('');
      setFormRating(0);
      setFormComment('');
    }, 2500);
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="text-gcu-purple" size={26} />
            Feedback Hub
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Consolidated feedback and review management for all Spirit vessels
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gcu-purple text-white rounded-lg hover:bg-gcu-purple-dark transition-colors text-sm font-medium"
        >
          <Send size={15} />
          Submit Feedback
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Open', value: openCount, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20', icon: AlertCircle },
          { label: 'In Review', value: inReviewCount, color: 'text-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-900/20', icon: Clock },
          { label: 'Resolved', value: resolvedCount, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20', icon: CheckCircle },
          { label: 'Avg Rating', value: `${avgRating}★`, color: 'text-gcu-purple', bg: 'bg-purple-50 dark:bg-purple-900/20', icon: Star },
        ].map(({ label, value, color, bg, icon: Icon }) => (
          <div key={label} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center mb-2`}>
              <Icon size={16} className={color} />
            </div>
            <div className={`text-xl font-bold ${color}`}>{value}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-wrap gap-3 items-center">
        <Filter size={15} className="text-gray-400 flex-shrink-0" />

        <div className="relative">
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value as typeof filterStatus)}
            className="appearance-none pl-3 pr-8 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gcu-purple/50"
          >
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="in-review">In Review</option>
            <option value="resolved">Resolved</option>
          </select>
          <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value as typeof filterCategory)}
            className="appearance-none pl-3 pr-8 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gcu-purple/50"
          >
            <option value="all">All Categories</option>
            <option value="accuracy">Accuracy</option>
            <option value="ethics">Ethics</option>
            <option value="usability">Usability</option>
            <option value="content">Content</option>
            <option value="performance">Performance</option>
          </select>
          <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={filterSpirit}
            onChange={e => setFilterSpirit(e.target.value)}
            className="appearance-none pl-3 pr-8 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gcu-purple/50"
          >
            <option value="all">All Spirits</option>
            {MOCK_PROTOTYPES.map(p => (
              <option key={p.id} value={p.id}>{p.icon} {p.name}</option>
            ))}
          </select>
          <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        <span className="ml-auto text-xs text-gray-400">{filtered.length} item{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Feedback list */}
      <div className="space-y-4">
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <MessageSquare size={32} className="mx-auto mb-3 opacity-40" />
            <p>No feedback matches the selected filters.</p>
          </div>
        )}
        {filtered.map(fb => {
          const StatusIcon = STATUS_CONFIG[fb.status].icon;
          const myVote = votes[fb.id];
          return (
            <div key={fb.id} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-start gap-3">
                <div className="text-2xl mt-0.5 flex-shrink-0">{fb.prototypeIcon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-semibold text-sm text-gray-900 dark:text-white">{fb.prototypeName}</span>
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium capitalize ${CATEGORY_COLORS[fb.category]}`}>
                      {fb.category}
                    </span>
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_CONFIG[fb.status].color}`}>
                      <StatusIcon size={11} />
                      {STATUS_CONFIG[fb.status].label}
                    </span>
                    <div className="flex ml-auto">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} size={12} className={s <= fb.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 dark:text-gray-600'} />
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                    "{fb.comment}"
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <User size={11} />
                      <span className="font-medium text-gray-600 dark:text-gray-300">{fb.author}</span>
                      <span>·</span>
                      <span>{fb.role}</span>
                      <span>·</span>
                      <span>{new Date(fb.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <button
                        onClick={() => handleVote(fb.id, 'up')}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${myVote === 'up' ? 'text-green-600 bg-green-50 dark:bg-green-900/20' : 'hover:text-green-600'}`}
                      >
                        <ThumbsUp size={11} />
                        {fb.helpful + (myVote === 'up' ? 1 : 0)}
                      </button>
                      <button
                        onClick={() => handleVote(fb.id, 'down')}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${myVote === 'down' ? 'text-red-500 bg-red-50 dark:bg-red-900/20' : 'hover:text-red-500'}`}
                      >
                        <ThumbsDown size={11} />
                        {fb.notHelpful + (myVote === 'down' ? 1 : 0)}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit Feedback Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg p-6 animate-fade-in">
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Feedback Submitted!</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Thank you for helping improve the Flourish AI platform.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Submit Feedback</h2>
                  <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">✕</button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Spirit Vessel</label>
                    <select
                      required
                      value={formSpirit}
                      onChange={e => setFormSpirit(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gcu-purple/50"
                    >
                      <option value="">Select a spirit…</option>
                      {MOCK_PROTOTYPES.map(p => (
                        <option key={p.id} value={p.id}>{p.icon} {p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Category</label>
                    <select
                      value={formCategory}
                      onChange={e => setFormCategory(e.target.value as FeedbackCategory)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gcu-purple/50"
                    >
                      <option value="content">Content Quality</option>
                      <option value="accuracy">Accuracy</option>
                      <option value="ethics">Ethical Alignment</option>
                      <option value="usability">Usability</option>
                      <option value="performance">Performance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(s => (
                        <button
                          type="button"
                          key={s}
                          onClick={() => setFormRating(s)}
                          className="focus:outline-none"
                        >
                          <Star size={24} className={s <= formRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 dark:text-gray-600 hover:text-yellow-300'} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Comment</label>
                    <textarea
                      required
                      rows={4}
                      value={formComment}
                      onChange={e => setFormComment(e.target.value)}
                      placeholder="Share your experience with this Spirit vessel…"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gcu-purple/50 resize-none"
                    />
                  </div>
                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 rounded-lg bg-gcu-purple text-white text-sm font-medium hover:bg-gcu-purple-dark transition-colors flex items-center justify-center gap-2"
                    >
                      <Send size={14} />
                      Submit
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
