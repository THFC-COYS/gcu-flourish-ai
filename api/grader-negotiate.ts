/*
  POST { originalGrade, criterionName, facultyFeedback, submission, rubric }
  → { revisedScore, revisedFeedback, agentReasoning, accepted: boolean, changeAmount: number }

  The agent considers the faculty's pushback and either adjusts the score or
  explains why it stands by its original assessment.
*/

function extractJSON(raw: string, opener: '{' | '['): any {
  const closer = opener === '{' ? '}' : ']';
  let text = raw.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();
  let i = text.indexOf(opener);
  while (i !== -1) {
    const candidate = text.slice(i);
    let depth = 0;
    let end = -1;
    for (let j = 0; j < candidate.length; j++) {
      if (candidate[j] === opener) depth++;
      else if (candidate[j] === closer) { depth--; if (depth === 0) { end = j; break; } }
    }
    if (end !== -1) {
      try { return JSON.parse(candidate.slice(0, end + 1)); } catch { /* try next */ }
    }
    i = text.indexOf(opener, i + 1);
  }
  throw new Error('No valid JSON found in response');
}

const SYSTEM_PROMPT = `You are an experienced, fair university grader who has just graded a student submission. A faculty member is now pushing back on one of your criterion scores.

Your role is to genuinely reconsider — not rubber-stamp the pushback, but actually weigh it. You should adjust the score when:
- The faculty provides meaningful context you didn't have (e.g., first-generation student, learning differences, known classroom context, oral discussion that supplements the written work)
- The faculty correctly identifies that your reading was too narrow or missed legitimate evidence
- The pushback reveals an ambiguity in the rubric that fairly favors the student

You should stand firm when:
- The pushback is vague or emotional without substantive reasoning ("you were too harsh" with no specifics)
- The faculty is asking you to overlook genuinely missing work
- Adjusting would be unfair to other students graded on the same rubric

Be direct, collegial, and specific in your reasoning. Cite the submission and rubric.

Return ONLY valid JSON — no markdown, no preamble. Use this exact schema:

{
  "revisedScore": <number — same as original if not accepting>,
  "revisedFeedback": "Updated feedback for the student on this criterion. If not adjusting, this can be the original feedback.",
  "agentReasoning": "1–3 sentences explaining your decision to the faculty member — why you're adjusting or why you're standing firm. Be specific and reference the submission and/or rubric.",
  "accepted": <true if score changed, false if standing firm>,
  "changeAmount": <number — positive if increased, negative if decreased, 0 if no change>
}`;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { originalGrade, criterionName, facultyFeedback, submission, rubric } = req.body;

  if (!criterionName || !facultyFeedback?.trim()) {
    return res.status(400).json({ error: 'criterionName and facultyFeedback are required.' });
  }
  if (!originalGrade || typeof originalGrade.score !== 'number' || typeof originalGrade.possible !== 'number') {
    return res.status(400).json({ error: 'originalGrade must include score and possible fields.' });
  }

  const apiKey = process.env.GROK_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GROK_API_KEY not configured on server.' });
  }

  const userMessage = `I originally graded the criterion "${criterionName}" as ${originalGrade.score}/${originalGrade.possible} points.

My original feedback was:
"${originalGrade.feedback || 'No feedback recorded.'}"

${originalGrade.quote ? `The passage I cited from the student's work was:\n"${originalGrade.quote}"\n` : ''}
--- FACULTY PUSHBACK ---
${facultyFeedback.trim()}

--- RUBRIC (for reference) ---
${rubric?.trim() || 'Not provided.'}

--- STUDENT SUBMISSION (for reference) ---
${submission?.trim() || 'Not provided.'}

Please reconsider your score for "${criterionName}" in light of the faculty's feedback. Respond with the JSON schema specified.`;

  try {
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'grok-3',
        max_tokens: 800,
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
      parsed = extractJSON(raw, '{');
    } catch {
      return res.status(500).json({ error: 'Failed to parse negotiation response as JSON. Raw: ' + raw.slice(0, 400) });
    }

    // Ensure changeAmount is correct relative to original score
    if (typeof parsed.changeAmount !== 'number') {
      parsed.changeAmount = (parsed.revisedScore ?? originalGrade.score) - originalGrade.score;
    }

    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json(parsed);
  } catch (err: any) {
    return res.status(500).json({ error: err?.message ?? 'Unexpected server error.' });
  }
}
