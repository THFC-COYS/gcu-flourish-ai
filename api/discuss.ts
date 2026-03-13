/*
  TeachOS · Discussion Intelligence API
  POST { thread: string, context?: string }
  → structured analysis via Claude
*/

const SYSTEM_PROMPT = `You are Discussion Intelligence, an AI system built for university faculty inside TeachOS.

Your job is to analyze a raw discussion board thread and return a structured JSON analysis. The instructor has pasted the thread text directly — it may be messy, copied from Canvas or Blackboard, with inconsistent formatting.

Instructions:
1. Parse the thread into individual student posts. Infer author names from formatting patterns (e.g. "FirstName LastName", timestamps, "Re:", indentation).
2. For each post assess:
   - Does it contain a factual or conceptual misconception?
   - Is the reasoning quality: strong (analytical, shows real understanding), adequate (correct but surface-level), or minimal (very short, low effort)?
3. For every misconception: draft a Socratic follow-up response that guides the student toward correct thinking WITHOUT directly correcting them. Sound like a thoughtful professor.
4. For strong posts: draft a short public acknowledgment the instructor could post to highlight the thinking to the class.
5. Write a brief pedagogical insight (2–3 sentences) for the instructor summarizing the state of the discussion.

Return ONLY valid JSON — no markdown, no preamble, no explanation. Use this exact schema:

{
  "summary": "one sentence overview of what this discussion thread is about and how it went overall",
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

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { thread, context } = req.body;

  if (!thread || typeof thread !== 'string' || thread.trim().length < 20) {
    return res.status(400).json({ error: 'Please paste at least some discussion content.' });
  }

  const apiKey = process.env.GROK_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GROK_API_KEY not configured on server.' });
  }

  const contextBlock = context?.trim()
    ? `\n\nInstructor context (learning objectives / topic):\n${context.trim()}`
    : '';

  const userMessage = `Analyze this discussion thread:${contextBlock}\n\n---\n\n${thread.trim()}`;

  try {
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'grok-4-latest',
        max_tokens: 2048,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({ error: `Grok API error: ${err}` });
    }

    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content ?? '';

    let parsed;
    try {
      // Strip any accidental markdown fences
      const clean = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();
      parsed = JSON.parse(clean);
    } catch {
      return res.status(500).json({ error: 'Failed to parse Grok response as JSON.', raw });
    }

    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json(parsed);
  } catch (err: any) {
    return res.status(500).json({ error: err?.message ?? 'Unexpected server error.' });
  }
}
