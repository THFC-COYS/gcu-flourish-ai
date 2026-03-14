// ── Shared types between extension and agent backend ─────────────────────

export type LMS = 'canvas' | 'blackboard' | 'd2l' | 'unknown';

export interface StudentEvent {
  type: 'discussion.post' | 'discussion.reply' | 'question.asked' | 'page.viewed' | 'assignment.opened';
  lms: LMS;
  studentId: string;        // anonymised session hash
  courseId: string;
  threadId?: string;
  content: string;          // the text the student wrote or is viewing
  threadContext: ThreadPost[];
  pageTitle?: string;
  timestamp: number;
  sessionId: string;        // extension session — used to route WS reply back
}

export interface ThreadPost {
  author: 'student' | 'instructor' | 'agent' | 'peer';
  content: string;
  timestamp: number;
}

// ── Messages from agent → extension ──────────────────────────────────────

export type AgentAction =
  | { type: 'reply'; threadId: string; content: string; source: 'agent' }
  | { type: 'flag'; threadId: string; reason: string }
  | { type: 'noop'; reason: string };

export interface AgentMessage {
  sessionId: string;
  action: AgentAction;
}
