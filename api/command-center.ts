import type { VercelRequest, VercelResponse } from '@vercel/node';

const GROK_API_KEY = process.env.GROK_API_KEY ?? '';

function extractJSON(raw: string): unknown {
  const fenceMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  const cleaned = fenceMatch ? fenceMatch[1].trim() : raw.trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('No JSON object found');
  return JSON.parse(cleaned.slice(start, end + 1));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { query } = req.body as { query: string };

  const systemPrompt = `You are the GCU University OS Command Center AI — a real-time intelligence layer across all 15 departments of Grand Canyon University. You have visibility into admissions, student success, financial aid, IT, HR, academic affairs, marketing, alumni, research, facilities, legal, finance, registrar, career services, and faculty development.

Current system status: 47 agents active, 3 human escalations today, 18,342 tasks completed.

When answering questions from university leadership (president, provost, board members), you:
1. Reference specific departments and agent activity
2. Provide concrete metrics and numbers
3. Surface any current alerts or escalations relevant to the question
4. Make strategic recommendations when appropriate
5. Flag ethical considerations or human oversight needs

Return ONLY valid JSON in this exact shape:
{
  "answer": "The main response to the query — detailed, data-informed, executive-level",
  "relevantDepts": ["dept1", "dept2"],
  "keyMetrics": [
    { "label": "...", "value": "...", "trend": "up|down|stable" }
  ],
  "alerts": ["Any current alerts relevant to this query, or empty array"],
  "recommendation": "One strategic recommendation for leadership",
  "confidence": "high|medium|low",
  "humanNote": "Any note about where human judgment is needed, or empty string"
}`;

  const userMessage = `Leadership query: ${query}`;

  try {
    const grokRes = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GROK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'grok-3-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.5,
        max_tokens: 900,
      }),
    });

    if (!grokRes.ok) {
      const err = await grokRes.text();
      return res.status(502).json({ error: err });
    }

    const data = await grokRes.json();
    const raw = data.choices?.[0]?.message?.content ?? '';
    const parsed = extractJSON(raw);
    return res.status(200).json(parsed);
  } catch (e: unknown) {
    return res.status(500).json({ error: String(e) });
  }
}
