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

// ── Governance & Audit types ───────────────────────────────────────────────
export interface AuditDimensionScore {
  helpfulness: number;    // 0–20
  safety: number;         // 0–20
  accuracy: number;       // 0–20
  valuesAlignment: number; // 0–20
  escalation: number;     // 0–20
}

export type AuditStatus = 'pass' | 'review' | 'flagged';

export interface AuditResult {
  id: string;
  interactionId: string;
  agentType: string;
  agentId: string;
  college: string;
  departmentHead: string;
  sessionId: string;
  studentInput: string;
  agentResponse: string;
  timestamp: string;
  auditedAt: string;
  scores: AuditDimensionScore;
  totalScore: number;          // sum of above, 0–100
  status: AuditStatus;
  aiRationale: string;
  alertSent: boolean;
  alertSentAt?: string;
  humanScore?: number;
  humanNotes?: string;
  humanScoredAt?: string;
  humanScoredBy?: string;
  resolvedAt?: string;
}

export interface StoredInteraction {
  id: string;
  agentType: string;
  agentId: string;
  college: string;
  departmentHead: string;
  sessionId: string;
  studentInput: string;
  agentResponse: string;
  timestamp: string;
  courseId?: string;
  lms?: string;
}

export interface WeeklyDigest {
  weekOf: string;
  interactions: AuditResult[];
  totalAudited: number;
  passRate: number;
  reviewCount: number;
  flagCount: number;
}
