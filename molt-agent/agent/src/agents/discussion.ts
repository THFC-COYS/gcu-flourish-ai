import Anthropic from '@anthropic-ai/sdk';
import { DISCUSSION_TOOLS, executeTool } from '../tools/index.js';
import type { StudentEvent, AgentAction } from '../types.js';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are Molt's Discussion Agent — an always-on AI teaching assistant embedded
in a university learning management system. You watch discussion boards in real time and respond
to students while they are still logged in.

YOUR ROLE:
- Answer academic questions accurately and concisely
- Clarify misconceptions before they deepen
- Encourage peer discussion rather than replacing it
- Flag distress or off-topic content for human review

RESPONSE PRINCIPLES:
- Be warm but brief. Students are busy. Max 150 words.
- Never claim to be human. You are an AI teaching assistant.
- If you are not confident in an answer, say so and suggest the student ask their instructor.
- Do not respond to content that is not academic (personal, off-topic, distress → flag instead).
- If a student is struggling based on their history, acknowledge it kindly.

DECISION FLOW:
1. Call get_course_context to understand what's being taught right now
2. Call get_student_history to understand this student's context
3. Decide: does this post need a response?
   - Yes → call post_reply with a helpful, concise answer
   - Needs human → call flag_for_advisor
   - No action needed → explain why (noop)
4. Only call post_reply OR flag_for_advisor — never both, never neither without reason.`;

/**
 * Run the Discussion Agent for a single student event.
 * Returns the action the agent decided to take.
 */
export async function runDiscussionAgent(event: StudentEvent): Promise<AgentAction> {
  console.log(`[DiscussionAgent] Processing ${event.type} from student ${event.studentId.slice(0, 8)}...`);

  const userMessage = buildUserMessage(event);
  const messages: Anthropic.MessageParam[] = [
    { role: 'user', content: userMessage },
  ];

  // Track what the agent decides to do
  let finalAction: AgentAction = { type: 'noop', reason: 'Agent did not reach a decision' };

  // Agentic loop — runs until end_turn or we hit max iterations
  const MAX_ITERATIONS = 6;
  let iterations = 0;

  while (iterations < MAX_ITERATIONS) {
    iterations++;

    const stream = client.messages.stream({
      model: 'claude-opus-4-6',
      max_tokens: 2048,
      thinking: { type: 'adaptive' },
      system: SYSTEM_PROMPT,
      tools: DISCUSSION_TOOLS,
      messages,
    });

    // Stream thinking to console for observability
    stream.on('text', (delta) => process.stdout.write(delta));

    const response = await stream.finalMessage();

    if (response.stop_reason === 'end_turn') {
      // Agent finished without tool calls — check if it gave a text decision
      const text = response.content
        .filter((b): b is Anthropic.TextBlock => b.type === 'text')
        .map((b) => b.text)
        .join('');
      if (text.toLowerCase().includes('noop') || text.toLowerCase().includes('no action')) {
        finalAction = { type: 'noop', reason: text.slice(0, 200) };
      }
      break;
    }

    if (response.stop_reason === 'pause_turn') {
      // Server-side tool hit iteration limit — continue
      messages.push({ role: 'assistant', content: response.content });
      continue;
    }

    if (response.stop_reason !== 'tool_use') break;

    // Execute all tool calls
    messages.push({ role: 'assistant', content: response.content });
    const toolResults: Anthropic.ToolResultBlockParam[] = [];

    for (const block of response.content) {
      if (block.type !== 'tool_use') continue;

      const toolInput = block.input as Record<string, string>;
      console.log(`\n[DiscussionAgent] Tool: ${block.name}`, toolInput);

      // Intercept post_reply and flag_for_advisor to capture the agent's decision
      if (block.name === 'post_reply') {
        finalAction = {
          type: 'reply',
          threadId: toolInput.threadId ?? event.threadId ?? '',
          content: toolInput.content,
          source: 'agent',
        };
      } else if (block.name === 'flag_for_advisor') {
        finalAction = {
          type: 'flag',
          threadId: toolInput.threadId ?? event.threadId ?? '',
          reason: toolInput.reason,
        };
      }

      const result = await executeTool(block.name, toolInput, event);
      toolResults.push({
        type: 'tool_result',
        tool_use_id: block.id,
        content: result,
      });
    }

    messages.push({ role: 'user', content: toolResults });
  }

  console.log(`\n[DiscussionAgent] Decision: ${finalAction.type}`);
  return finalAction;
}

// ── Build the user message from the event ─────────────────────────────────
function buildUserMessage(event: StudentEvent): string {
  const contextLines = event.threadContext
    .map((p) => `  [${p.author}]: ${p.content.slice(0, 200)}`)
    .join('\n');

  return `A student just posted in a discussion thread. Decide whether to respond.

COURSE ID: ${event.courseId}
THREAD ID: ${event.threadId ?? 'unknown'}
LMS: ${event.lms}
PAGE: ${event.pageTitle ?? 'Discussion Board'}

THREAD CONTEXT (last ${event.threadContext.length} posts):
${contextLines || '  (no previous posts — this is the first post in the thread)'}

NEW POST FROM STUDENT:
"${event.content}"

Decide: does this student need a response right now?`;
}
