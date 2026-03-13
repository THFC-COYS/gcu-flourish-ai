/*
  TeachOS · Expand Announcements API
  POST { modules, level, voice?, courseTitle }
  → enhanced announcements for Level 2 (mini-lesson) or Level 3 (deep dive)

  Kept as a separate call so the main course-architect call stays fast.
  Each level has its own token budget and week cap to stay under Vercel's 60s limit.
*/

export const config = { maxDuration: 60 };

const LEVEL_SPEC: Record<number, { words: string; instruction: string; maxWeeks: number; maxTokens: number }> = {
  2: {
    words: '160–200 words',
    instruction:
      'Open with a brief welcome, then teach the core ideas of each topic directly in the announcement. ' +
      'Give students enough explanation that they arrive to the week having already engaged with the material. ' +
      'Do not just list topics — explain them clearly and concisely.',
    maxWeeks: 8,
    maxTokens: 3500,
  },
  3: {
    words: '270–320 words',
    instruction:
      'Open with a brief welcome, then teach the core ideas of each topic directly in the announcement (like Level 2). ' +
      'Then add at least one concrete real-world example or short case study that grounds the theory in practice. ' +
      'Make it compelling — a great story, a surprising statistic, or a scenario students can picture themselves in. ' +
      'Students should feel genuinely excited to open the module.',
    maxWeeks: 6,
    maxTokens: 3500,
  },
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { modules, level, voice, courseTitle } = req.body;

  if (!Array.isArray(modules) || modules.length === 0) {
    return res.status(400).json({ error: 'modules array required' });
  }

  const apiKey = process.env.GROK_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GROK_API_KEY not configured on server.' });
  }

  const aLevel = Number(level) || 2;
  const spec = LEVEL_SPEC[aLevel] ?? LEVEL_SPEC[2];

  // Hard cap weeks to keep this call within the timeout budget
  const cappedModules = modules.slice(0, spec.maxWeeks);

  const voiceBlock = voice?.trim()
    ? `\n\nVoice — write every announcement to sound authentically like this instructor:\n${voice.trim()}`
    : '';

  const moduleList = cappedModules
    .map((m: any) => `Week ${m.week}: ${m.title}\nTopics: ${Array.isArray(m.topics) ? m.topics.join(', ') : m.topics}`)
    .join('\n\n');

  const userMessage = `Course: ${courseTitle || 'this course'}

Write a weekly announcement for each module listed below.

Announcement requirements:
- Length: ${spec.words} per announcement
- Style: ${spec.instruction}
- Address students directly (not the instructor)${voiceBlock}

Return ONLY a JSON array — no markdown, no explanation:
[{"week": 1, "announcement": "..."}, ...]

Modules:
${moduleList}`;

  try {
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'grok-4-latest',
        max_tokens: spec.maxTokens,
        messages: [
          {
            role: 'system',
            content:
              'You are an expert instructional designer writing engaging weekly course announcements for university faculty. ' +
              'Return ONLY valid JSON array output with no markdown, no preamble, no explanation.',
          },
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
      const clean = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();
      parsed = JSON.parse(clean);
    } catch {
      return res.status(500).json({ error: 'Failed to parse announcement response as JSON.', raw });
    }

    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json(parsed);
  } catch (err: any) {
    return res.status(500).json({ error: err?.message ?? 'Unexpected server error.' });
  }
}
