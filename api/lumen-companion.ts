/*
  Lumen · Learning Companion API
  POST { mode, passage?, question?, concept?, studentHistory? }
  mode: 'qa' | 'explain3ways' | 'spacedRep' | 'crossCourse'
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

const PROMPTS: Record<string, string> = {
  qa: `You are Lumen, a learning companion that reads alongside students. You answer questions about a text passage in a curriculum-aligned, pedagogically sound way.

Be specific. Ground your answer in the passage. Explain the "why" behind the "what". Match your depth to a college student.

Return ONLY valid JSON:
{
  "answer": "Your full answer (2-4 paragraphs, rich and specific)",
  "keyTakeaway": "One sentence: the core thing to understand",
  "followUpQuestions": ["Question that deepens understanding 1", "Question that deepens understanding 2"],
  "relatedConcepts": ["concept 1", "concept 2"]
}`,

  explain3ways: `You are Lumen. A student is stuck on a concept. Explain it three completely different ways so one of them will click.

The three modes:
1. VISUAL: Describe it as a spatial structure, diagram, or process map they can picture in their mind
2. NARRATIVE: Tell it as a story with actors, cause-and-effect, and stakes — who does what to whom and why it matters
3. ANALOGY: Map it to something from everyday life the student already understands

Make each explanation genuinely different — not just the same explanation with different words.

Return ONLY valid JSON:
{
  "concept": "The concept being explained",
  "visual": {
    "label": "Visual",
    "explanation": "Spatial/diagrammatic explanation (3-5 sentences)"
  },
  "narrative": {
    "label": "Narrative",
    "explanation": "Story-based explanation (3-5 sentences with clear actors and events)"
  },
  "analogy": {
    "label": "Analogy",
    "explanation": "Everyday analogy explanation (3-5 sentences)"
  },
  "bestFor": "Which type of learner each mode serves best (1 sentence)"
}`,

  spacedRep: `You are Lumen. Based on a student's current reading passage and their struggle history, identify 3 concepts they studied earlier that are directly relevant to what they're reading now and should be reviewed.

For each concept, explain the exact connection to the current material and generate a quick review question.

Return ONLY valid JSON:
{
  "currentTopic": "What the student is currently reading",
  "reviewConcepts": [
    {
      "concept": "Concept name",
      "course": "Course it was taught in (e.g. BIO 101)",
      "weeksAgo": <number>,
      "strength": "strong | fading | weak",
      "connectionToCurrentReading": "Exactly why this concept is relevant right now (2 sentences)",
      "reviewQuestion": "A targeted question to test their recall",
      "reviewAnswer": "The answer to that question (2-3 sentences)"
    }
  ],
  "priorityReview": "Which concept to review first and why (1 sentence)"
}`,

  crossCourse: `You are Lumen. Identify cross-course connections — concepts the student learned in a previous course that directly apply to what they're reading right now.

These should be genuine, substantive connections that help the student understand the current material, not superficial name-drops.

Return ONLY valid JSON:
{
  "currentCourse": "Current course",
  "currentConcept": "What they're reading about now",
  "connections": [
    {
      "priorCourse": "e.g. BIO 101",
      "priorConcept": "Concept from prior course",
      "connectionStrength": "direct | supporting | foundational",
      "insight": "How understanding the prior concept deepens current material (2-3 sentences)",
      "bridgingStatement": "The exact thing Lumen would say to make this connection feel real to the student (start with 'Remember when...' or 'In [Course]...')"
    }
  ],
  "recommendation": "What the student should do with this information (1-2 sentences)"
}`,
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { mode, passage, question, concept, studentHistory } = req.body;

  if (!mode || !PROMPTS[mode]) {
    return res.status(400).json({ error: 'Invalid mode. Use: qa, explain3ways, spacedRep, crossCourse' });
  }

  const apiKey = process.env.GROK_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GROK_API_KEY not configured.' });

  let userMessage = '';

  if (mode === 'qa') {
    if (!passage || !question) return res.status(400).json({ error: 'qa mode requires passage and question.' });
    userMessage = `Passage:\n${passage.trim()}\n\nStudent question: ${question.trim()}`;
  } else if (mode === 'explain3ways') {
    if (!concept) return res.status(400).json({ error: 'explain3ways mode requires concept.' });
    userMessage = `Explain this concept three different ways: "${concept.trim()}"${passage ? `\n\nContext from current reading:\n${passage.slice(0, 800)}` : ''}`;
  } else if (mode === 'spacedRep') {
    if (!passage) return res.status(400).json({ error: 'spacedRep mode requires passage.' });
    userMessage = `Current reading:\n${passage.slice(0, 1000)}\n\nStudent struggle history: ${studentHistory || 'Has struggled with: cardiac output, osmosis, enzyme kinetics, pharmacokinetics'}\n\nIdentify the most important prior concepts to review.`;
  } else if (mode === 'crossCourse') {
    if (!passage) return res.status(400).json({ error: 'crossCourse mode requires passage.' });
    userMessage = `Current course: ${concept || 'NURS 340'}\nCurrent reading:\n${passage.slice(0, 1000)}\n\nPrior courses: BIO 101, BIO 202, CHEM 101, NURS 220, PHARM 310\n\nFind the most meaningful cross-course connections.`;
  }

  try {
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'grok-3-mini',
        max_tokens: 1800,
        messages: [
          { role: 'system', content: PROMPTS[mode] },
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
