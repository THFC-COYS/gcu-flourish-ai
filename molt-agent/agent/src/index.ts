/**
 * Molt Agent — WebSocket Server
 *
 * Receives student events from the browser extension,
 * routes them to the appropriate agent, and pushes
 * the agent's action back to the connected student session.
 */

import { WebSocketServer, WebSocket } from 'ws';
import type { StudentEvent, ConnectedSession, AgentMessage } from './types.js';
import { runDiscussionAgent } from './agents/discussion.js';

const PORT = Number(process.env.PORT ?? 3001);
const wss = new WebSocketServer({ port: PORT });

// ── Session registry ────────────────────────────────────────────────────────
// Maps sessionId → WebSocket so we can route replies back to the right student
const sessions = new Map<string, ConnectedSession>();

wss.on('listening', () => {
  console.log(`[Molt] Agent server running on ws://localhost:${PORT}`);
  console.log('[Molt] Waiting for browser extension connections...');
});

wss.on('connection', (ws: WebSocket) => {
  let sessionId: string | null = null;

  ws.on('message', async (data) => {
    let event: StudentEvent;

    try {
      event = JSON.parse(data.toString()) as StudentEvent;
    } catch {
      console.error('[Molt] Could not parse event');
      return;
    }

    // Register session on first message
    if (!sessionId) {
      sessionId = event.sessionId;
      sessions.set(sessionId, { sessionId, ws, connectedAt: Date.now() });
      console.log(`[Molt] Session registered: ${sessionId.slice(0, 8)}... (${sessions.size} active)`);
    }

    // Update last seen
    const session = sessions.get(sessionId);
    if (session) session.lastEvent = Date.now();

    console.log(`\n[Molt] ← ${event.type} from ${event.lms} course ${event.courseId}`);
    console.log(`[Molt]   Content: "${event.content.slice(0, 80)}..."`);

    // Route to agent asynchronously — don't block the WS thread
    handleEvent(event, ws).catch((err) => {
      console.error('[Molt] Agent error:', err);
    });
  });

  ws.on('close', () => {
    if (sessionId) {
      sessions.delete(sessionId);
      console.log(`[Molt] Session closed: ${sessionId.slice(0, 8)}... (${sessions.size} active)`);
    }
  });

  ws.on('error', (err) => {
    console.error('[Molt] WebSocket error:', err.message);
  });
});

// ── Route event to the correct agent ───────────────────────────────────────
async function handleEvent(event: StudentEvent, ws: WebSocket) {
  let action;

  switch (event.type) {
    case 'discussion.post':
    case 'discussion.reply':
      action = await runDiscussionAgent(event);
      break;

    // Future agents plug in here:
    // case 'question.asked':
    //   action = await runQAAgent(event);
    //   break;
    // case 'assignment.opened':
    //   action = await runEarlyWarningAgent(event);
    //   break;

    default:
      console.log(`[Molt] No agent for event type: ${event.type}`);
      return;
  }

  // Only send back to client if they're still connected
  if (ws.readyState !== WebSocket.OPEN) {
    console.log('[Molt] Student disconnected before agent finished — action queued for next login');
    // TODO: persist to DB for delivery on next session
    return;
  }

  const message: AgentMessage = { sessionId: event.sessionId, action };
  ws.send(JSON.stringify(message));
  console.log(`[Molt] → Sent ${action.type} to session ${event.sessionId.slice(0, 8)}...`);
}

// ── Graceful shutdown ───────────────────────────────────────────────────────
process.on('SIGTERM', () => {
  console.log('[Molt] Shutting down...');
  wss.close(() => process.exit(0));
});

process.on('SIGINT', () => {
  console.log('[Molt] Shutting down...');
  wss.close(() => process.exit(0));
});
