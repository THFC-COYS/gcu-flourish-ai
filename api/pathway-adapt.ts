/*
  PathwayAI · Adaptive Engine API
  POST { studentName, course, concepts, newSignal, signalType }
  → updated concept states, path recommendation, signal analysis, retainAI flag
*/

function extractJSON(raw: string, opener: '{' | '['): any {
  const closer = opener === '{' ? '}' : ']';
  let text = raw.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();
  let i = text.indexOf(opener);
  while (i !== -1) {
    const candidate = text.slice(i);
    let depth = 0, end = -1;
    for (let j = 0; j < candidate.length; j++) {
      if (candidate[j] === opener) depth++;
      else if (candidate[j] === closer) { depth--; if (depth === 0) { end = j; break; } }
    }
    if (end !== -1) {
      try { return JSON.parse(candidate.slice(0, end + 1)); } catch { /* try next */ }
    }
    i = text.indexOf(opener, i + 1);
  }
  throw new Error('No valid JSON found');
}

const SYSTEM_PROMPT = `You are PathwayAI, an adaptive learning engine for higher education.

You receive a student's current knowledge state (a list of concepts with mastery levels) plus a new learning signal (what they just did — asked a question, re-read a passage, completed a quiz, submitted an assignment).

You analyze the signal deeply: not just what was done, but HOW — time spent, confidence indicators, pattern of confusion — and update the student's knowledge map accordingly.

Return ONLY valid JSON with this exact schema:

{
  "updatedConcepts": [
    {
      "concept": "concept name",
      "status": "mastered | solid | shaky | struggling | gap | not_started",
      "confidence": <0-100>,
      "change": "improved | declined | unchanged | newly_detected",
      "note": "1 sentence explaining why this changed (or didn't)"
    }
  ],
  "signalAnalysis": {
    "signalType": "lumen_confusion | forge_grade | direct_question | re_read | quiz | study_session",
    "depthOfUnderstanding": "surface | partial | solid | deep",
    "keyInsight": "1-2 sentences describing what this signal reveals about the student's understanding",
    "hiddenGap": "A gap the student doesn't know they have yet, or empty string if none detected"
  },
  "pathAdjustment": {
    "action": "accelerate | remediate | reinforce | branch | stay_course",
    "nextConcept": "name of the recommended next concept to study",
    "skipConcepts": ["concepts to skip because already mastered"],
    "insertConcepts": ["prerequisite or bridging concepts to add before continuing"],
    "reason": "2-3 sentence explanation of why the path was adjusted this way"
  },
  "retainAI": {
    "riskLevel": "none | watch | flag | urgent",
    "trigger": "What triggered this risk level, or empty string",
    "action": "What RetainAI would do, or empty string if riskLevel is none"
  },
  "forgeSignal": {
    "detected": <true | false>,
    "insight": "What Forge grading patterns reveal about this student's gaps, or empty string"
  }
}`;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { studentName, course, concepts, newSignal, signalType } = req.body;
  if (!newSignal || String(newSignal).trim().length < 10) {
    return res.status(400).json({ error: 'Please provide a learning signal (what the student just did).' });
  }
  if (!concepts || !Array.isArray(concepts) || concepts.length === 0) {
    return res.status(400).json({ error: 'Please provide the student knowledge state.' });
  }

  const apiKey = process.env.GROK_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GROK_API_KEY not configured.' });

  const conceptSummary = concepts.map((c: any) =>
    `- ${c.concept}: ${c.status} (confidence: ${c.confidence ?? '?'}%)`
  ).join('\n');

  const userMessage = `Student: ${studentName || 'Alex'}
Course: ${course || 'Biology 201'}
Signal type: ${signalType || 'lumen_confusion'}

Current knowledge state:
${conceptSummary}

New learning signal:
${newSignal.trim()}

Analyze this signal, update the knowledge map, and generate a path adjustment. Consider whether this signal reveals any hidden gaps or prerequisites the student may be missing.`;

  try {
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'grok-3-mini',
        max_tokens: 2000,
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
    try { parsed = extractJSON(raw, '{'); }
    catch { return res.status(500).json({ error: 'Failed to parse response. Raw: ' + raw.slice(0, 300) }); }

    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json(parsed);
  } catch (err: any) {
    return res.status(500).json({ error: err?.message ?? 'Unexpected error.' });
  }
}
