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

  const { studentMessage, persona, touchpoint } = req.body as {
    studentMessage: string;
    persona: string;
    touchpoint: string;
  };

  const systemPrompt = `You are ${persona}, the AI voice of Grand Canyon University. You are deployed at the "${touchpoint}" touchpoint. Your personality is warm, faith-informed, encouraging, and distinctly GCU. You speak in first person as the institutional voice — not as a generic AI.

Respond to the student's message with a helpful, on-brand reply. Then provide metadata about the interaction.

Return ONLY valid JSON in this exact shape:
{
  "reply": "The full conversational response to the student in ${persona}'s voice",
  "tone": "e.g. encouraging / informational / empathetic / celebratory",
  "intent": "What the student was trying to accomplish",
  "escalate": false,
  "escalateReason": "Only if escalate is true — why this needs a human",
  "followUpSuggestions": ["suggestion 1", "suggestion 2", "suggestion 3"],
  "faithNote": "Optional — a brief note on how faith/values informed this response, or empty string"
}`;

  const userMessage = `Student message at "${touchpoint}": ${studentMessage}`;

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
        temperature: 0.7,
        max_tokens: 800,
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
