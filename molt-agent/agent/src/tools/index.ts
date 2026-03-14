import Anthropic from '@anthropic-ai/sdk';
import type { StudentEvent } from '../types.js';

/**
 * Tools available to the Discussion Agent.
 *
 * In production these would query your course DB, student records,
 * and LMS API. For the scaffold they return realistic mock data
 * so the agent loop runs end-to-end without external dependencies.
 */

export const DISCUSSION_TOOLS: Anthropic.Tool[] = [
  {
    name: 'get_course_context',
    description:
      'Retrieve the course name, description, and current learning objectives for the course the student is in.',
    input_schema: {
      type: 'object',
      properties: {
        courseId: { type: 'string', description: 'The LMS course identifier' },
      },
      required: ['courseId'],
    },
  },
  {
    name: 'get_student_history',
    description:
      'Retrieve the student\'s recent activity: topics they struggled with, questions they\'ve asked, and assignments they\'ve submitted.',
    input_schema: {
      type: 'object',
      properties: {
        studentId: { type: 'string', description: 'Anonymised student session ID' },
        courseId: { type: 'string' },
      },
      required: ['studentId', 'courseId'],
    },
  },
  {
    name: 'post_reply',
    description:
      'Post the agent\'s reply to the discussion thread. Only call this when you have a genuinely helpful, accurate response. Do not call if you are unsure.',
    input_schema: {
      type: 'object',
      properties: {
        threadId: { type: 'string' },
        content: {
          type: 'string',
          description: 'The reply content. Be concise, warm, and academically helpful. Max 150 words.',
        },
      },
      required: ['threadId', 'content'],
    },
  },
  {
    name: 'flag_for_advisor',
    description:
      'Flag this thread for a human advisor or instructor to review. Use when the student appears distressed, the question requires human judgment, or the content is outside academic scope.',
    input_schema: {
      type: 'object',
      properties: {
        threadId: { type: 'string' },
        reason: { type: 'string', description: 'Why this needs human review' },
      },
      required: ['threadId', 'reason'],
    },
  },
];

// ── Tool execution ─────────────────────────────────────────────────────────

export async function executeTool(
  name: string,
  input: Record<string, string>,
  event: StudentEvent,
): Promise<string> {
  switch (name) {
    case 'get_course_context':
      return getCourseContext(input.courseId);
    case 'get_student_history':
      return getStudentHistory(input.studentId, input.courseId);
    case 'post_reply':
      // The actual reply is handled by the agent loop — return confirmation
      return JSON.stringify({ success: true, threadId: input.threadId });
    case 'flag_for_advisor':
      console.log(`[Molt] 🚩 Flagged thread ${input.threadId}: ${input.reason}`);
      return JSON.stringify({ flagged: true });
    default:
      return JSON.stringify({ error: `Unknown tool: ${name}` });
  }
}

// ── Mock data sources (replace with real DB/LMS calls) ────────────────────

async function getCourseContext(courseId: string): Promise<string> {
  // TODO: query your course database
  return JSON.stringify({
    courseId,
    name: 'Introduction to Biology',
    currentModule: 'Cell Division & Mitosis',
    learningObjectives: [
      'Describe the stages of mitosis',
      'Explain the role of chromosomes in cell division',
      'Distinguish mitosis from meiosis',
    ],
    instructor: 'Dr. Ramirez',
  });
}

async function getStudentHistory(studentId: string, courseId: string): Promise<string> {
  // TODO: query student activity from your LMS/DB
  return JSON.stringify({
    studentId,
    courseId,
    recentActivity: [
      { type: 'assignment', name: 'Lab Report: Onion Root Tip', score: 78, completedAt: Date.now() - 86400000 },
      { type: 'quiz', name: 'Cell Cycle Quiz', score: 62, completedAt: Date.now() - 172800000 },
    ],
    frequentlyAskedTopics: ['prophase vs metaphase', 'chromosome alignment'],
    riskSignals: ['quiz score below class average', 'submitted lab report 2 days late'],
  });
}
