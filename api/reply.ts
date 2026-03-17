/*
  Forge · Voice Demo API
  POST { prompt, studentPost, courseId, voice }
  → { type: 'reply', content: string }
     or { type: 'flag', reason: string }
*/

function buildSystemPrompt(voice?: string): string {
  const voiceSection = voice?.trim()
    ? `\nINSTRUCTOR VOICE & CONTEXT:\n${voice.trim()}\n\nWhen drafting the reply, reflect this instructor's personality, background, and interests. Reference their hobbies, experiences, or teaching perspective naturally when it adds warmth — but keep it brief and academic.\n`
    : '';

  return `You are Forge — an AI teaching assistant embedded in a university LMS. You watch discussion boards and draft replies to student posts that sound like the instructor wrote them.
${voiceSection}
YOUR ROLE:
- Draft a reply to the student's discussion post that reflects the instructor's voice
- Be warm but concise. Max 150 words.
- Reference the instructor's background, metaphors, or style when appropriate
- Engage with the academic content thoughtfully
- If the post contains distress or non-academic content, respond with a flag instead

RESPONSE FORMAT:
Return ONLY valid JSON — no markdown, no preamble. Use one of:
{ "type": "reply", "content": "the reply text" }
{ "type": "flag", "reason": "why this needs human review" }`;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, studentPost, courseId = 'demo', voice = '' } = req.body ?? {};

  if (!studentPost || typeof studentPost !== 'string') {
    return res.status(400).json({ error: 'Missing studentPost' });
  }

  const apiKey = process.env.GROK_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GROK_API_KEY not configured on server.' });
  }

  const userMessage = `A student just posted in a discussion thread. Draft a reply in the instructor's voice.

COURSE: ${courseId}
DISCUSSION PROMPT: ${prompt ?? '(not provided)'}

STUDENT POST:
"${studentPost.trim()}"

Draft a reply the instructor could post — warm, concise, and reflecting their personal style.`;

  try {
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'grok-4-latest',
        max_tokens: 512,
        messages: [
          { role: 'system', content: buildSystemPrompt(voice) },
          { role: 'user', content: userMessage },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({ error: `API error: ${err}` });
    }

    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content ?? '';

    // Parse JSON response
    try {
      const clean = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();
      const parsed = JSON.parse(clean);
      res.setHeader('Cache-Control', 'no-store');
      return res.status(200).json(parsed);
    } catch {
      // If model didn't return JSON, treat the whole response as a reply
      res.setHeader('Cache-Control', 'no-store');
      return res.status(200).json({ type: 'reply', content: raw.trim() });
    }
  } catch (err: any) {
    return res.status(500).json({ error: err?.message ?? 'Unexpected server error.' });
  }
}
