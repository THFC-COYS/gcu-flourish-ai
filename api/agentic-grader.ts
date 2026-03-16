/*
  TeachOS · Agentic Grader API
  POST { rubric, submission, assignmentTitle?, assignmentType?, totalPoints?, voice? }
  → criterion-by-criterion grade with personalized feedback, score, and integrity flag
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

const SYSTEM_PROMPT = `You are Agentic Grader, an AI teaching assistant built for university faculty inside TeachOS.

Your job is to grade a student submission against a faculty-provided rubric. Grade like an experienced, fair professor: specific, constructive, and rigorous. Your feedback must cite the student's own words and explain exactly why points were earned or lost.

Flag academic integrity concerns only when there is genuine evidence — e.g., writing style inconsistency, unusual vocabulary for the level, passages that sound sourced, or implausible depth for the assignment type.

Return ONLY valid JSON — no markdown, no preamble, no explanation. Use this exact schema:

{
  "totalScore": <number>,
  "totalPossible": <number>,
  "letterGrade": "<A | A- | B+ | B | B- | C+ | C | C- | D | F>",
  "summary": "2–3 sentence overall assessment written directly to the student, constructive and specific",
  "criteria": [
    {
      "name": "criterion name from rubric",
      "score": <number>,
      "possible": <number>,
      "feedback": "2–3 sentences citing the student's own text. Explain precisely why they earned this score — what they did well and what's missing.",
      "quote": "Direct quote from the student's work that most supports this score (20–50 words). Leave empty string if nothing relevant to quote."
    }
  ],
  "strengths": ["specific strength 1", "specific strength 2"],
  "improvements": ["specific improvement 1", "specific improvement 2"],
  "integrityFlag": <true | false>,
  "integrityNote": "If flagged, describe what triggered the concern. Otherwise empty string."
}`;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { rubric, submission, assignmentTitle, assignmentType, totalPoints, voice } = req.body;

  if (!rubric || String(rubric).trim().length < 20) {
    return res.status(400).json({ error: 'Please provide a rubric with at least one criterion.' });
  }
  if (!submission || String(submission).trim().length < 30) {
    return res.status(400).json({ error: 'Please paste a student submission to grade.' });
  }

  const apiKey = process.env.GROK_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GROK_API_KEY not configured on server.' });
  }

  const voiceBlock = voice?.trim()
    ? `\n\nFaculty voice — write feedback in this instructor's voice:\n${voice.trim()}`
    : '';

  const userMessage = `Grade the following student submission.

Assignment: ${assignmentTitle?.trim() || 'Untitled Assignment'}
Type: ${assignmentType?.trim() || 'Written Assignment'}
Total points possible: ${totalPoints || 'as defined in rubric'}

--- RUBRIC ---
${rubric.trim()}

--- STUDENT SUBMISSION ---
${submission.trim()}${voiceBlock}

Grade each rubric criterion individually. Cite specific passages from the student's work in your feedback. Assign scores that reflect the rubric criteria exactly.`;

  try {
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'grok-3-mini',
        max_tokens: 3000,
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
      return res.status(500).json({ error: 'Failed to parse grader response as JSON. Raw: ' + raw.slice(0, 400) });
    }

    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json(parsed);
  } catch (err: any) {
    return res.status(500).json({ error: err?.message ?? 'Unexpected server error.' });
  }
}
