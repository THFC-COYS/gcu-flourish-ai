/*
  TeachOS · Discussion Intelligence API
  POST { mode: 'manual', thread: string, context?: string, opts? }
  POST { mode: 'agentic', topic: string, courseLevel: string, facultyVoice: string, numStudents?: number }
*/

/* ── Shared helpers ──────────────────────────────────────────────────────── */

function stripFences(raw: string): string {
  return raw
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();
}

async function callGrok(apiKey: string, systemPrompt: string, userMessage: string, maxTokens = 2048) {
  const response = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
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

/* ── Manual mode ─────────────────────────────────────────────────────────── */

const MANUAL_SYSTEM = `You are Discussion Intelligence, an AI system built for university faculty inside TeachOS.

Your job is to analyze a raw discussion board thread and return a structured JSON analysis. The instructor has pasted the thread text directly — it may be messy, copied from Canvas or Blackboard, with inconsistent formatting.

Instructions:
1. Parse the thread into individual student posts. Infer author names from formatting patterns (e.g. "FirstName LastName", timestamps, "Re:", indentation).
2. For each post assess:
   - Does it contain a factual or conceptual misconception?
   - Is the reasoning quality: strong (analytical, shows real understanding), adequate (correct but surface-level), or minimal (very short, low effort)?
3. For every misconception: draft a Socratic follow-up response that guides the student toward correct thinking WITHOUT directly correcting them. Sound like a thoughtful professor.
4. For strong posts: draft a short public acknowledgment the instructor could post to highlight the thinking to the class.
5. Write a brief pedagogical insight (2–3 sentences) for the instructor summarizing the state of the discussion.
6. Write a single instructor response the faculty member can post directly to the discussion board. This is the most important output. It should:
   - Open with 1–2 sentences acknowledging the quality of engagement in the thread
   - Gently surface and reframe the most important misconception(s) without calling out students by name — ask a guiding question instead of correcting directly
   - Explicitly highlight 1–2 ideas from strong posts and invite the class to build on them (you may name those students)
   - Close with a forward-looking question or prompt that pushes the class deeper into the topic
   - Tone and length: follow the instructor response requirements provided in the user message
   - Default if not specified: warm, intellectually engaged, ~200 words

Return ONLY valid JSON — no markdown, no preamble, no explanation. Use this exact schema:

{
  "summary": "one sentence overview of what this discussion thread is about and how it went overall",
  "instructorPost": "the full ready-to-post instructor response — 150–250 words, warm and intellectually engaged",
  "posts": [
    {
      "author": "student name, or 'Unknown' if not identifiable",
      "excerpt": "first 140 characters of their post text",
      "quality": "misconception | strong | adequate | minimal",
      "label": "Misconception | Highlight | Adequate | Minimal",
      "issue": "describe the misconception clearly if present, otherwise null",
      "draftResponse": "the response text the instructor could post — present for misconceptions and strong posts, null for adequate/minimal"
    }
  ],
  "insights": "2–3 sentences of pedagogical insight for the instructor: what does this discussion reveal about class understanding, and what should the instructor address next?"
}`;

/* ── Agentic mode ────────────────────────────────────────────────────────── */

const AGENTIC_SYSTEM = `You are a university discussion board simulator. Given a topic, course level, and faculty voice persona, you will:

1. Generate a realistic student discussion thread (the number of posts is specified by the user). Make the posts feel authentic — varied length, different writing styles, one or two students with genuine misconceptions, one strong analytical post, the rest adequate or minimal.

2. For EVERY student post, write an individual faculty reply that:
   - Addresses that specific student by first name
   - Acknowledges what they got right before pushing further
   - Gently surfaces any misconception through questioning, never direct correction
   - Deepens their thinking with a follow-up observation or reframe
   - ALWAYS ends with a single open-ended question that invites them to go further
   - Matches the faculty voice/tone specified
   - Is 60–120 words

Return ONLY valid JSON — no markdown, no preamble. Use this exact schema:

{
  "topic": "the discussion topic as stated",
  "summary": "one sentence describing how this simulated discussion played out pedagogically",
  "posts": [
    {
      "author": "FirstName LastName",
      "post": "the full student post text (80–200 words, authentic student voice)",
      "quality": "misconception | strong | adequate | minimal",
      "label": "Misconception | Highlight | Adequate | Minimal",
      "issue": "clearly describe the misconception if present, otherwise null",
      "facultyReply": "the faculty reply — addresses student by name, nudges deeper, ENDS with an open-ended question"
    }
  ],
  "insights": "2–3 sentences of pedagogical insight: what patterns does this thread reveal, and what should the instructor address in the next class session?"
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

  const { mode = 'manual' } = req.body;

  try {
    res.setHeader('Cache-Control', 'no-store');

    /* ── Manual ── */
    if (mode === 'manual') {
      const { thread, context, opts } = req.body;

      if (!thread || typeof thread !== 'string' || thread.trim().length < 20) {
        return res.status(400).json({ error: 'Please paste at least some discussion content.' });
      }

      const contextBlock = context?.trim()
        ? `\n\nInstructor context (learning objectives / topic):\n${context.trim()}`
        : '';

      const tone = opts?.tone ?? 'conversational';
      const wordCount = Math.min(600, Math.max(50, Number(opts?.wordCount) || 200));
      const nameStudents = opts?.nameStudents !== false;

      const optsBlock = `\n\nInstructor response requirements:
- Tone: ${tone} (${tone === 'formal' ? 'professional and academic' : tone === 'socratic' ? 'question-driven, never stating answers directly' : 'warm, approachable, collegial'})
- Target length: approximately ${wordCount} words
- Name students: ${nameStudents ? 'yes — you may refer to students by first name' : 'no — keep the response anonymous, do not name individual students'}`;

      const userMessage = `Analyze this discussion thread:${contextBlock}${optsBlock}\n\n---\n\n${thread.trim()}`;
      const parsed = await callGrok(apiKey, MANUAL_SYSTEM, userMessage);
      return res.status(200).json(parsed);
    }

    /* ── Agentic ── */
    if (mode === 'agentic') {
      const { topic, courseLevel, facultyVoice, numStudents = 4 } = req.body;

      if (!topic || typeof topic !== 'string' || topic.trim().length < 5) {
        return res.status(400).json({ error: 'Please provide a discussion topic.' });
      }

      const clampedStudents = Math.min(6, Math.max(2, Number(numStudents) || 4));

      const userMessage = `Discussion topic: "${topic.trim()}"
Course level: ${courseLevel ?? 'undergraduate'}
Faculty voice/persona: ${facultyVoice ?? 'warm and Socratic — intellectually curious, never condescending, uses student names'}
Number of student posts to generate: ${clampedStudents}

Generate the full discussion thread and faculty replies now.`;

      const parsed = await callGrok(apiKey, AGENTIC_SYSTEM, userMessage, 3000);
      return res.status(200).json(parsed);
    }

    return res.status(400).json({ error: `Unknown mode: ${mode}` });

  } catch (err: any) {
    return res.status(500).json({ error: err?.message ?? 'Unexpected server error.' });
  }
}
