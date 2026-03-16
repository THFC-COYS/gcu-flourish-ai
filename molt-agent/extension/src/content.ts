/**
 * Molt Agent — Content Script
 *
 * Runs inside the LMS page. Detects which LMS is loaded,
 * observes the DOM for student activity, and relays events
 * to the agent backend via WebSocket. Injects agent replies
 * back into the page in real time.
 */

import type { StudentEvent, ThreadPost, AgentMessage, LMS } from './types';

// ── Config ─────────────────────────────────────────────────────────────────
const AGENT_WS_URL = 'ws://localhost:3001';
const SESSION_ID = crypto.randomUUID();

// ── LMS Detection ──────────────────────────────────────────────────────────
function detectLMS(): LMS {
  const host = location.hostname;
  if (host.includes('instructure.com') || document.querySelector('#application')) return 'canvas';
  if (host.includes('blackboard.com') || document.querySelector('#globalNavPageNavArea')) return 'blackboard';
  if (host.includes('brightspace.com') || document.querySelector('d2l-navigation')) return 'd2l';
  return 'unknown';
}

// ── LMS-specific DOM selectors ─────────────────────────────────────────────
const SELECTORS: Record<LMS, {
  discussionEntry: string;
  entryContent: string;
  entryAuthor: string;
  replyForm: string;
  replyInput: string;
  threadContainer: string;
}> = {
  canvas: {
    discussionEntry: '.discussion_entry, [data-testid="discussion-entry"]',
    entryContent: '.message.user_content, [data-testid="message-content"]',
    entryAuthor: '.author span, [data-testid="author-name"]',
    replyForm: '.discussion-reply-form, [data-testid="discussion-reply-form"]',
    replyInput: '#reply_textarea, [data-testid="reply-textarea"]',
    threadContainer: '#discussion_subentries, [data-testid="discussion-thread"]',
  },
  blackboard: {
    discussionEntry: '.db-entry-main',
    entryContent: '.vtbegenerated',
    entryAuthor: '.db-entry-main .db-entry-author',
    replyForm: '#discussionEntry',
    replyInput: '#discussionEntry textarea',
    threadContainer: '#discussionBoardList',
  },
  d2l: {
    discussionEntry: 'd2l-forum-post',
    entryContent: '.d2l-htmlblock-untrusted',
    entryAuthor: '.d2l-heading-4',
    replyForm: 'd2l-forum-reply-form',
    replyInput: 'd2l-forum-reply-form d2l-input-textarea',
    threadContainer: 'd2l-forum-thread',
  },
  unknown: {
    discussionEntry: '[class*="discussion"] [class*="entry"], [class*="post"]',
    entryContent: '[class*="content"], [class*="message"]',
    entryAuthor: '[class*="author"], [class*="user"]',
    replyForm: '[class*="reply"] form',
    replyInput: '[class*="reply"] textarea',
    threadContainer: '[class*="thread"], [class*="discussion"]',
  },
};

// ── WebSocket connection ────────────────────────────────────────────────────
let ws: WebSocket | null = null;
let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;

function connect() {
  ws = new WebSocket(AGENT_WS_URL);

  ws.onopen = () => {
    console.log('[Molt] Agent connected');
    if (reconnectTimeout) clearTimeout(reconnectTimeout);
  };

  ws.onmessage = (event) => {
    try {
      const msg: AgentMessage = JSON.parse(event.data);
      if (msg.sessionId === SESSION_ID) handleAgentAction(msg);
    } catch (e) {
      console.error('[Molt] Bad message from agent', e);
    }
  };

  ws.onclose = () => {
    console.log('[Molt] Agent disconnected — reconnecting in 3s');
    reconnectTimeout = setTimeout(connect, 3000);
  };

  ws.onerror = () => ws?.close();
}

// ── Send event to agent ────────────────────────────────────────────────────
function sendEvent(event: StudentEvent) {
  if (ws?.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(event));
  }
}

// ── Read thread context ────────────────────────────────────────────────────
function getThreadContext(container: Element, sel: typeof SELECTORS[LMS]): ThreadPost[] {
  const posts: ThreadPost[] = [];
  container.querySelectorAll(sel.discussionEntry).forEach((entry) => {
    const content = entry.querySelector(sel.entryContent)?.textContent?.trim() ?? '';
    const author = entry.querySelector(sel.entryAuthor)?.textContent?.trim() ?? '';
    if (content) {
      posts.push({
        author: author.toLowerCase().includes('instructor') ? 'instructor' : 'peer',
        content,
        timestamp: Date.now(),
      });
    }
  });
  return posts.slice(-10); // last 10 posts for context
}

// ── Inject agent reply into discussion thread ──────────────────────────────
function injectReply(threadId: string, content: string) {
  const lms = detectLMS();
  const sel = SELECTORS[lms];

  // Find thread container by data attribute set during observation
  const container = document.querySelector(`[data-molt-thread="${threadId}"]`);
  if (!container) return;

  // Build the reply card
  const card = document.createElement('div');
  card.className = 'molt-agent-reply';
  card.setAttribute('data-molt-injected', 'true');
  card.innerHTML = `
    <div style="
      margin: 8px 0;
      padding: 12px 16px;
      border-left: 3px solid #F5B740;
      background: rgba(245,183,64,0.06);
      border-radius: 0 8px 8px 0;
      font-family: inherit;
    ">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
        <span style="
          font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;
          color:#F5B740;
        ">Molt · AI Teaching Assistant</span>
      </div>
      <div style="font-size:14px;line-height:1.5;color:inherit;">${escapeHtml(content)}</div>
    </div>
  `;

  container.appendChild(card);
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Handle action from agent ───────────────────────────────────────────────
function handleAgentAction(msg: AgentMessage) {
  const { action } = msg;
  switch (action.type) {
    case 'reply':
      injectReply(action.threadId, action.content);
      break;
    case 'flag':
      console.log(`[Molt] Thread ${action.threadId} flagged: ${action.reason}`);
      // Could add a visual flag indicator here
      break;
    case 'noop':
      // Agent decided no action needed
      break;
  }
}

// ── MutationObserver — watch for new discussion posts ─────────────────────
function startObserver() {
  const lms = detectLMS();
  const sel = SELECTORS[lms];
  const courseId = extractCourseId();

  console.log(`[Molt] Watching ${lms} — course ${courseId}`);

  const seen = new Set<string>();

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof Element)) continue;

        // Check if the added node IS a discussion entry or CONTAINS one
        const entries = node.matches(sel.discussionEntry)
          ? [node]
          : Array.from(node.querySelectorAll(sel.discussionEntry));

        for (const entry of entries) {
          const content = entry.querySelector(sel.entryContent)?.textContent?.trim();
          if (!content || content.length < 5) continue;

          // Deduplicate — same content seen within 2s
          const key = content.slice(0, 80);
          if (seen.has(key)) continue;
          seen.add(key);
          setTimeout(() => seen.delete(key), 2000);

          // Skip our own injected replies
          if (entry.hasAttribute('data-molt-injected')) continue;

          // Tag the thread container for injection targeting
          const threadContainer = entry.closest(sel.threadContainer) ?? entry.parentElement;
          const threadId = crypto.randomUUID();
          threadContainer?.setAttribute('data-molt-thread', threadId);

          const event: StudentEvent = {
            type: 'discussion.post',
            lms,
            studentId: getAnonymousStudentId(),
            courseId,
            threadId,
            content,
            threadContext: threadContainer ? getThreadContext(threadContainer, sel) : [],
            pageTitle: document.title,
            timestamp: Date.now(),
            sessionId: SESSION_ID,
          };

          sendEvent(event);
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// ── Helpers ────────────────────────────────────────────────────────────────
function extractCourseId(): string {
  // Canvas: /courses/12345/...
  const match = location.pathname.match(/\/courses\/(\d+)/);
  if (match) return match[1];
  // Fallback: hash the hostname + pathname prefix
  return btoa(location.hostname + location.pathname.split('/').slice(0, 3).join('/')).slice(0, 12);
}

function getAnonymousStudentId(): string {
  // Store a session-scoped anonymous ID so we don't track real user IDs
  let id = sessionStorage.getItem('molt_anon_id');
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem('molt_anon_id', id);
  }
  return id;
}

// ── Boot ───────────────────────────────────────────────────────────────────
connect();

// Wait for the page to fully render before observing
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startObserver);
} else {
  startObserver();
}
