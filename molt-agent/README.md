# Molt Agent

Always-on AI layer that works on top of any LMS — no API integration required.

## How it works

```
Student posts in Canvas / Blackboard / D2L
        ↓
Browser extension detects DOM change (MutationObserver)
        ↓
Event sent to agent backend via WebSocket
        ↓
Discussion Agent (Claude Opus 4.6) evaluates context + student history
        ↓
Agent calls tools: get_course_context → get_student_history → post_reply
        ↓
Reply injected into student's page in real time
```

The student never leaves their LMS. No refresh. No form submission. The agent finds them.

## Structure

```
molt-agent/
├── extension/          Chrome Manifest V3 extension
│   ├── manifest.json
│   ├── popup.html
│   └── src/
│       ├── content.ts  MutationObserver + WebSocket client
│       ├── background.ts
│       └── types.ts
│
└── agent/              Node.js agent backend
    └── src/
        ├── index.ts             WebSocket server + event router
        ├── types.ts
        ├── agents/
        │   └── discussion.ts    Discussion Agent (Claude Opus 4.6 + tool use)
        └── tools/
            └── index.ts         Tool definitions + mock implementations
```

## Quick start

### 1. Start the agent backend

```bash
cd agent
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env

npm install
npm run dev
```

You should see:
```
[Molt] Agent server running on ws://localhost:3001
[Molt] Waiting for browser extension connections...
```

### 2. Load the extension

1. Open Chrome → `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked** → select the `extension/` folder
4. Navigate to Canvas, Blackboard, or D2L

### 3. Watch it work

Open a discussion board. Post a question. The agent detects it instantly and replies
while you're still on the page.

## Supported LMS platforms

| Platform | Detection | Tested |
|----------|-----------|--------|
| Canvas (Instructure) | `*.instructure.com` | ✓ |
| Blackboard | `*.blackboard.com` | ✓ |
| D2L Brightspace | `*.brightspace.com` | ✓ |
| Any web LMS | DOM heuristics | partial |

## Adding more agents

The `index.ts` router dispatches events by type. Add a new agent by:

1. Creating `src/agents/your-agent.ts` with a `run*Agent(event)` function
2. Adding the event type case to the `handleEvent` switch in `index.ts`

Planned agents:
- **QA Agent** — answers help requests in real time
- **Early Warning Agent** — detects risk signals and alerts advisors
- **Grading Agent** — evaluates submissions against rubric
- **Nudge Agent** — re-engages idle students

## Production considerations

- Replace mock tool implementations in `tools/index.ts` with real DB queries
- Add Redis for presence tracking and offline message queuing
- Add authentication — validate extension sessions against your user DB
- Rate limit per student to avoid reply spam
- Log all agent decisions for review and model improvement
