// ── Re-export shared types + add server-side types ─────────────────────────

export type LMS = 'canvas' | 'blackboard' | 'd2l' | 'unknown';

export interface StudentEvent {
  type: 'discussion.post' | 'discussion.reply' | 'question.asked' | 'page.viewed' | 'assignment.opened';
  lms: LMS;
  studentId: string;
  courseId: string;
  threadId?: string;
  content: string;
  threadContext: ThreadPost[];
  pageTitle?: string;
  timestamp: number;
  sessionId: string;
}

export interface ThreadPost {
  author: 'student' | 'instructor' | 'agent' | 'peer';
  content: string;
  timestamp: number;
}

export type AgentAction =
  | { type: 'reply'; threadId: string; content: string; source: 'agent' }
  | { type: 'flag'; threadId: string; reason: string }
  | { type: 'noop'; reason: string };

export interface AgentMessage {
  sessionId: string;
  action: AgentAction;
}

// ── Server-side: track connected sessions ─────────────────────────────────
export interface ConnectedSession {
  sessionId: string;
  ws: import('ws').WebSocket;
  connectedAt: number;
  lastEvent?: number;
}
