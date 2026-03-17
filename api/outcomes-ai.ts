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

  const { reportType, institution, data } = req.body as {
    reportType: 'accreditation' | 'board' | 'rankings';
    institution: string;
    data: Record<string, unknown>;
  };

  const reportPrompts: Record<string, string> = {
    accreditation: `Generate an HLC accreditation readiness report. Evaluate the institution's metrics against accreditation standards. Return JSON with: { "overallReadiness": "percentage 0-100", "standardsAssessment": [{ "standard": "...", "status": "met|partial|gap", "evidence": "...", "recommendation": "..." }], "executiveSummary": "...", "criticalGaps": ["..."], "strengthHighlights": ["..."], "nextSteps": ["..."] }`,
    board: `Generate a board of trustees summary report. Distill institutional data into executive-level insights. Return JSON with: { "headline": "...", "keyMetrics": [{ "metric": "...", "value": "...", "trend": "up|down|stable", "context": "..." }], "narrative": "Full board narrative paragraph...", "watchItems": ["..."], "celebrationPoints": ["..."], "strategicRecommendations": ["..."] }`,
    rankings: `Generate a university rankings improvement analysis. Return JSON with: { "currentPositionSummary": "...", "rankingFactors": [{ "factor": "...", "currentScore": "...", "benchmark": "...", "gap": "...", "actionPlan": "..." }], "projectedImprovement": "...", "quickWins": ["..."], "longTermInvestments": ["..."], "competitorInsights": "..." }`,
  };

  const systemPrompt = `You are OutcomesAI, an institutional intelligence system for ${institution}. ${reportPrompts[reportType] ?? reportPrompts.board}

Return ONLY valid JSON — no markdown, no explanation.`;

  const userMessage = `Institution: ${institution}
Report type: ${reportType}
Data: ${JSON.stringify(data, null, 2)}`;

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
        max_tokens: 1400,
      }),
    });

    if (!grokRes.ok) {
      const err = await grokRes.text();
      return res.status(502).json({ error: err });
    }

    const data2 = await grokRes.json();
    const raw = data2.choices?.[0]?.message?.content ?? '';
    const parsed = extractJSON(raw);
    return res.status(200).json(parsed);
  } catch (e: unknown) {
    return res.status(500).json({ error: String(e) });
  }
}
