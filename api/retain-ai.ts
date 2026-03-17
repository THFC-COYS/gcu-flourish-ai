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

  const { student } = req.body as {
    student: {
      name: string;
      gpa: number;
      missedAssignments: number;
      loginDaysLast14: number;
      financialHold: boolean;
      lastLoginDaysAgo: number;
      major: string;
      advisorName: string;
    };
  };

  const systemPrompt = `You are RetainAI, an early intervention system for Grand Canyon University. Analyze student risk signals and generate an intervention plan.

Return ONLY valid JSON in this exact shape:
{
  "riskScore": 87,
  "riskLevel": "high",
  "riskFactors": [
    { "factor": "Missed 4 assignments", "weight": "high", "detail": "..." },
    { "factor": "Low login frequency", "weight": "medium", "detail": "..." }
  ],
  "predictedOutcome": "e.g. 72% probability of course withdrawal within 2 weeks without intervention",
  "interventionPlan": [
    { "action": "Send personalized check-in email", "owner": "advisor", "urgency": "today", "template": "Full draft of the email..." },
    { "action": "Schedule 15-min Zoom touchpoint", "owner": "advisor", "urgency": "this week", "template": "" },
    { "action": "Connect to financial aid office", "owner": "system", "urgency": "today", "template": "" }
  ],
  "emailDraft": "Full warm, GCU-voice email draft from the advisor to the student — mention their name, specific concerns, offer support, include faith-encouragement",
  "retentionProbability": {
    "withoutIntervention": 34,
    "withIntervention": 81
  }
}`;

  const userMessage = `Student profile:
Name: ${student.name}
Major: ${student.major}
GPA: ${student.gpa}
Missed assignments (last 30 days): ${student.missedAssignments}
Days logged in (last 14 days): ${student.loginDaysLast14}
Last login: ${student.lastLoginDaysAgo} days ago
Financial hold: ${student.financialHold ? 'Yes' : 'No'}
Assigned advisor: ${student.advisorName}

Analyze this student's risk and generate a complete intervention plan.`;

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
        temperature: 0.4,
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
