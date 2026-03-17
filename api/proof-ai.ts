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

  const { studentName, program, submission, competencies } = req.body as {
    studentName: string;
    program: string;
    submission: string;
    competencies: string[];
  };

  const systemPrompt = `You are ProofAI, a competency verification and credentialing system. Assess the student's submission against the listed competencies and generate a verified competency credential report.

Return ONLY valid JSON in this exact shape:
{
  "verificationId": "PROOF-${Date.now().toString(36).toUpperCase()}",
  "studentName": "...",
  "program": "...",
  "verifiedAt": "${new Date().toISOString()}",
  "overallMasteryLevel": "emerging|developing|proficient|mastered",
  "competencyResults": [
    {
      "competency": "...",
      "masteryLevel": "emerging|developing|proficient|mastered",
      "score": 85,
      "evidence": "Quote or paraphrase from submission demonstrating this competency",
      "feedback": "Specific, actionable feedback",
      "verified": true
    }
  ],
  "credentialRecommendation": "e.g. Ready for Digital Badge: Healthcare Leadership | Pending: 1 competency",
  "narrativeSummary": "2-3 sentence professional summary of the student's demonstrated competencies",
  "nextMilestone": "What the student needs to reach full credential",
  "employerStatement": "A 1-sentence statement an employer could use to understand this credential"
}`;

  const userMessage = `Student: ${studentName}
Program: ${program}
Competencies to assess: ${competencies.join(', ')}

Submission:
${submission}`;

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
        temperature: 0.3,
        max_tokens: 1200,
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
