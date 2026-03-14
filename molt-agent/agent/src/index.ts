/**
 * Molt Agent — WebSocket + HTTP Server
 *
 * Receives student events from the browser extension via WebSocket,
 * and exposes a REST endpoint for the demo UI (/api/reply).
 */

import { createServer, IncomingMessage, ServerResponse } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import type { StudentEvent, ConnectedSession, AgentMessage } from './types.js';
import { runDiscussionAgent } from './agents/discussion.js';

const PORT = Number(process.env.PORT ?? 3001);

// ── HTTP server (also hosts WebSocket) ─────────────────────────────────────
const httpServer = createServer((req: IncomingMessage, res: ServerResponse) => {
  // CORS for local dev
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/api/reply') {
    handleReplyRequest(req, res);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

async function handleReplyRequest(req: IncomingMessage, res: ServerResponse) {
  let body = '';
  req.on('data', (chunk) => (body += chunk));
  req.on('end', async () => {
    try {
      const { prompt, studentPost, courseId = 'demo-101', voice = '' } = JSON.parse(body);

      const event: StudentEvent & { instructorVoice?: string } = {
        type: 'discussion.post',
        lms: 'canvas',
        studentId: 'demo-student',
        courseId,
        threadId: 'demo-thread',
        content: studentPost,
        threadContext: prompt
          ? [{ author: 'instructor', content: prompt, timestamp: Date.now() - 60_000 }]
          : [],
        pageTitle: 'Live Demo Discussion',
        timestamp: Date.now(),
        sessionId: crypto.randomUUID(),
        instructorVoice: voice,
      };

      const action = await runDiscussionAgent(event);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(action));
    } catch (err) {
      console.error('[Molt] /api/reply error:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Agent failed' }));
    }
  });
}

// ── WebSocket server (shared HTTP server) ──────────────────────────────────
const wss = new WebSocketServer({ server: httpServer });

// Maps sessionId → WebSocket so we can route replies back to the right student
const sessions = new Map<string, ConnectedSession>();

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

async function handleEvent(event: StudentEvent, ws: WebSocket) {
  let action;

  switch (event.type) {
    case 'discussion.post':
    case 'discussion.reply':
      action = await runDiscussionAgent(event);
      break;
    default:
      console.log(`[Molt] No agent for event type: ${event.type}`);
      return;
  }

  if (ws.readyState !== WebSocket.OPEN) {
    console.log('[Molt] Student disconnected before agent finished — action queued for next login');
    return;
  }

  const message: AgentMessage = { sessionId: event.sessionId, action };
  ws.send(JSON.stringify(message));
  console.log(`[Molt] → Sent ${action.type} to session ${event.sessionId.slice(0, 8)}...`);
}

// ── Start ───────────────────────────────────────────────────────────────────
httpServer.listen(PORT, () => {
  console.log(`[Molt] Agent server running on http://localhost:${PORT} + ws://localhost:${PORT}`);
  console.log('[Molt] POST /api/reply ready for demo UI');
});

process.on('SIGTERM', () => {
  console.log('[Molt] Shutting down...');
  httpServer.close(() => process.exit(0));
});

process.on('SIGINT', () => {
  console.log('[Molt] Shutting down...');
  httpServer.close(() => process.exit(0));
});
