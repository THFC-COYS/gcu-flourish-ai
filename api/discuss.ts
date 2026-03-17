/*
  TeachOS · Discussion Intelligence API — v3
  SSE streaming: event: trace | result | error

  POST { mode: 'manual', thread, context?, opts? }
  POST { mode: 'agentic', topic, courseLevel, facultyVoice, numStudents?, facultyPersona? }
*/

/* ── Helpers ─────────────────────────────────────────────────────────────── */

function stripFences(raw: string): string {
  return raw
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();
}

async function callGrokJSON(
  apiKey: string,
  systemPrompt: string,
  userMessage: string,
  maxTokens = 4000,
) {
  const response = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'grok-3',
      max_tokens: maxTokens,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Grok API error (${response.status}): ${err}`);
  }

  const data = await response.json();
  const raw = data.choices?.[0]?.message?.content ?? '';
  return JSON.parse(stripFences(raw));
}

function wait(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms));
}

async function runTraces(
  steps: Array<{ wait: number; step: string; type: string }>,
  emit: (step: string, type: string) => void,
) {
  for (const s of steps) {
    await wait(s.wait);
    emit(s.step, s.type);
  }
}

/* ── System prompts ──────────────────────────────────────────────────────── */

const MANUAL_SYSTEM = `You are Discussion Intelligence, an AI system built for university faculty inside TeachOS.

Analyze a raw discussion board thread and return a structured JSON analysis. The instructor pasted this raw from Canvas, Blackboard, or any LMS — formatting may be messy.

Instructions:
1. Parse the thread into individual student posts (infer author names from patterns).
2. For each post:
   a. Classify quality: misconception | strong | adequate | minimal
   b. Assign confidence (0–100) for your classification
   c. Extract quotedEvidence: the exact phrase from their post that best reveals the quality or issue (or null)
   d. Assign routingDecision: "reply" (misconceptions needing Socratic follow-up), "highlight" (strong posts worth public acknowledgment), "skip" (adequate/minimal — no individual response needed)
   e. Write routingReason: one sentence explaining this routing
   f. For "reply" and "highlight" posts only:
      - Write draftResponse: a first-attempt response
      - Write draftCritique: one sentence critiquing the draft (too leading? not Socratic? too brief?)
      - Write draftResponseFinal: a revised response that incorporates the critique
3. Write classPattern: a cross-post pattern you noticed (e.g. "3 students independently conflated X with Y"), or null
4. Write followUpPrompt: a follow-up discussion question for the next session based on gaps, or null
5. Write instructorPost: a single ready-to-post instructor response (follow tone/length from user message)
6. Write insights: 2–3 sentences of pedagogical insight

Return ONLY valid JSON — no markdown, no preamble:

{
  "summary": "one sentence overview",
  "instructorPost": "full instructor response — ~200 words, warm and intellectually engaged",
  "posts": [
    {
      "author": "student name or 'Unknown'",
      "excerpt": "first 140 characters of their post",
      "quality": "misconception | strong | adequate | minimal",
      "label": "Misconception | Highlight | Adequate | Minimal",
      "confidence": 94,
      "quotedEvidence": "exact phrase or null",
      "routingDecision": "reply | highlight | skip",
      "routingReason": "one sentence",
      "issue": "misconception description or null",
      "draftResponse": "first draft or null if skip",
      "draftCritique": "one-sentence critique or null if skip",
      "draftResponseFinal": "revised response or null if skip"
    }
  ],
  "classPattern": "cross-post pattern or null",
  "followUpPrompt": "follow-up question or null",
  "insights": "2–3 sentences of pedagogical insight"
}`;

const AGENTIC_SYSTEM = `You are a university discussion board simulator. You will plan a realistic student cohort, generate their posts, then craft individual faculty replies — all in one structured JSON response. Work through these steps:

STEP 1 — Plan personas: For each student create a realistic persona (name, year, major, background, likelyWeakness — the reasoning gap they're likely to show).

STEP 2 — Generate posts: Write each student's post based on their persona. Use varied length and writing styles. Seed 1–2 authentic misconceptions, 1 strong analytical post, the rest adequate or minimal.

STEP 3 — Analyze each post:
- quality: misconception | strong | adequate | minimal
- confidence (0–100) for that classification
- quotedEvidence: exact phrase from their post that best reveals the quality/issue
- routingDecision: "reply" (standard engagement), "flag" (potential integrity or wellbeing concern), "acknowledge" (exceptional post deserving special recognition)
- routingReason: one sentence
- depth: "scaffolding" (needs foundational support), "probing" (adequate, push deeper), "synthesis-level" (strong post, engage at highest level)

STEP 4 — Draft faculty replies with self-revision:
- draftReply (60–100 words): addresses student by name, references their quotedEvidence directly, matches faculty voice
- draftCritique: one sentence critique — too leading? Not Socratic enough? Too generic?
- facultyReply (60–120 words): revised final reply incorporating the critique, ALWAYS ends with an open-ended question

STEP 5 — Synthesize:
- classPattern: a pattern noticed across multiple posts (e.g. "3 students conflated X with Y"), or null
- followUpPrompt: a follow-up discussion question for the next class session

Return ONLY valid JSON — no markdown, no preamble:

{
  "topic": "discussion topic as stated",
  "summary": "one sentence describing how this simulated discussion played out pedagogically",
  "personas": [
    {
      "name": "FirstName LastName",
      "year": "Freshman | Sophomore | Junior | Senior | Graduate",
      "major": "field of study",
      "background": "one sentence on academic background and learning style",
      "likelyWeakness": "the reasoning gap this persona is likely to show"
    }
  ],
  "posts": [
    {
      "author": "FirstName LastName",
      "post": "full student post (80–200 words, authentic student voice)",
      "quality": "misconception | strong | adequate | minimal",
      "label": "Misconception | Highlight | Adequate | Minimal",
      "confidence": 94,
      "quotedEvidence": "exact phrase from their post",
      "routingDecision": "reply | flag | acknowledge",
      "routingReason": "one sentence",
      "depth": "scaffolding | probing | synthesis-level",
      "issue": "misconception description or null",
      "draftReply": "first draft faculty reply (60–100 words)",
      "draftCritique": "one-sentence critique of the draft",
      "facultyReply": "revised final reply (60–120 words, ends with open-ended question)"
    }
  ],
  "classPattern": "cross-post pattern or null",
  "followUpPrompt": "follow-up discussion question for next session",
  "insights": "2–3 sentences of pedagogical insight"
}`;

/* ── Handler ─────────────────────────────────────────────────────────────── */

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GROK_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GROK_API_KEY not configured on server.' });
  }

  // SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders();

  function emit(eventType: string, data: unknown) {
    res.write(`event: ${eventType}\ndata: ${JSON.stringify(data)}\n\n`);
    if (typeof (res as any).flush === 'function') (res as any).flush();
  }

  const { mode = 'manual' } = req.body;

  try {
    /* ── Manual ── */
    if (mode === 'manual') {
      const { thread, context, opts } = req.body;

      if (!thread || typeof thread !== 'string' || thread.trim().length < 20) {
        emit('error', { message: 'Please paste at least some discussion content.' });
        return res.end();
      }

      const traces = [
        { wait: 0,   step: 'Parsing raw discussion thread...', type: 'parse' },
        { wait: 350, step: `Reading ${thread.length} characters of pasted content`, type: 'parse' },
        { wait: 400, step: 'Identifying post boundaries and authorship patterns...', type: 'parse' },
        { wait: 500, step: 'Scanning for factual and conceptual misconceptions...', type: 'analyze' },
        { wait: 400, step: 'Scoring reasoning quality per post...', type: 'analyze' },
        { wait: 350, step: 'Extracting quoted evidence from flagged posts...', type: 'analyze' },
        { wait: 400, step: 'Assigning routing decisions — reply · highlight · skip...', type: 'route' },
        { wait: 400, step: 'Drafting Socratic responses...', type: 'draft' },
        { wait: 350, step: 'Self-reviewing drafts for guiding vs. leading tone...', type: 'revise' },
        { wait: 400, step: 'Revising replies based on self-critique...', type: 'revise' },
        { wait: 400, step: 'Synthesizing instructor reply...', type: 'synthesize' },
        { wait: 300, step: 'Scanning for class-wide misconception patterns...', type: 'synthesize' },
        { wait: 300, step: 'Generating follow-up discussion prompt...', type: 'synthesize' },
        { wait: 300, step: 'Building pedagogical insights...', type: 'insights' },
      ];

      const contextBlock = context?.trim()
        ? `\n\nInstructor context (learning objectives / topic):\n${context.trim()}`
        : '';

      const tone = opts?.tone ?? 'conversational';
      const wordCount = Math.min(600, Math.max(50, Number(opts?.wordCount) || 200));
      const nameStudents = opts?.nameStudents !== false;

      const optsBlock = `\n\nInstructor response requirements:
- Tone: ${tone} (${tone === 'formal' ? 'professional and academic' : tone === 'socratic' ? 'question-driven, never stating answers directly' : 'warm, approachable, collegial'})
- Target length: approximately ${wordCount} words
- Name students: ${nameStudents ? 'yes — you may refer to students by first name' : 'no — keep the response anonymous'}`;

      const userMessage = `Analyze this discussion thread:${contextBlock}${optsBlock}\n\n---\n\n${thread.trim()}`;

      const [result] = await Promise.all([
        callGrokJSON(apiKey, MANUAL_SYSTEM, userMessage, 4000),
        runTraces(traces, (step, type) => emit('trace', { step, type })),
      ]);

      emit('result', result);
      return res.end();
    }

    /* ── Agentic ── */
    if (mode === 'agentic') {
      const { topic, courseLevel, facultyVoice, numStudents = 4, facultyPersona } = req.body;

      if (!topic || typeof topic !== 'string' || topic.trim().length < 5) {
        emit('error', { message: 'Please provide a discussion topic.' });
        return res.end();
      }

      const clampedStudents = Math.min(6, Math.max(2, Number(numStudents) || 4));
      const seeded = Math.max(1, Math.floor(clampedStudents * 0.35));

      const traces = [
        { wait: 0,   step: `Planning ${clampedStudents}-student cohort for ${courseLevel} level...`, type: 'plan' },
        { wait: 500, step: 'Generating student personas and likely reasoning gaps...', type: 'plan' },
        { wait: 500, step: `Seeding ${seeded} authentic misconception${seeded > 1 ? 's' : ''} into cohort...`, type: 'plan' },
        { wait: 600, step: 'Writing student posts — varied voice, length, reasoning quality...', type: 'generate' },
        { wait: 600, step: 'Routing each post — reply · flag · acknowledge...', type: 'route' },
        { wait: 400, step: 'Extracting quoted evidence from each post...', type: 'analyze' },
        { wait: 400, step: `Drafting ${clampedStudents} faculty replies in ${facultyVoice} voice...`, type: 'draft' },
        { wait: 500, step: 'Self-critiquing drafts for Socratic depth and leading questions...', type: 'revise' },
        { wait: 450, step: 'Revising all replies based on critique...', type: 'revise' },
        { wait: 500, step: 'Scanning for class-wide misconception patterns...', type: 'synthesize' },
        { wait: 400, step: 'Generating follow-up prompt for next session...', type: 'synthesize' },
        { wait: 300, step: 'Building pedagogical insights...', type: 'insights' },
      ];

      const personaBlock = facultyPersona?.trim()
        ? `\nFaculty personal background (weave naturally into replies — use analogies, references, or phrasing that reflect these traits without forcing it):\n${facultyPersona.trim()}`
        : '';

      const userMessage = `Discussion topic: "${topic.trim()}"
Course level: ${courseLevel ?? 'undergraduate'}
Faculty tone: ${facultyVoice ?? 'conversational'}${personaBlock}
Number of students: ${clampedStudents}

Generate the full cohort plan, discussion thread, and faculty replies now.`;

      const [result] = await Promise.all([
        callGrokJSON(apiKey, AGENTIC_SYSTEM, userMessage, 4800),
        runTraces(traces, (step, type) => emit('trace', { step, type })),
      ]);

      emit('result', result);
      return res.end();
    }

    emit('error', { message: `Unknown mode: ${mode}` });
    res.end();
  } catch (err: any) {
    emit('error', { message: err?.message ?? 'Unexpected server error.' });
    res.end();
  }
}
