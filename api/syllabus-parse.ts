/*
  TeachOS · Syllabus Parse API
  POST { syllabus: string, voice?: string }
  → extracts course info and generates full course package via Grok
*/

// Extracts the outermost JSON object '{' or array '[' from a string that may
// contain markdown fences, model thinking text, or other preamble.
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
      try { return JSON.parse(candidate.slice(0, end + 1)); } catch { /* try next occurrence */ }
    }
    i = text.indexOf(opener, i + 1);
  }
  throw new Error('No valid JSON found in response');
}

const SYSTEM_PROMPT = `You are Course Architect, an AI system built for university faculty inside TeachOS.

Your job is to read a raw course syllabus pasted by a faculty member and extract all structured information from it, then generate a complete course package. Think like an experienced instructional designer.

Instructions:
1. Extract course title, course number, instructor name, overview, number of weeks, learning objectives, and assessments directly from the syllabus text.
2. Generate weekly discussion prompts (one per week) that promote higher-order thinking aligned with the course content.
3. Generate a detailed grading rubric for the most significant assessment (e.g., the final paper, project, or essay). The rubric should have 4–6 criteria, each with Excellent / Satisfactory / Needs Work performance descriptors.
4. Generate 5–7 student FAQ entries covering the most common logistical and academic questions for this type of course.
5. Write a warm, engaging Week 1 kickoff announcement the instructor can paste directly into their LMS. If faculty voice is provided, match their personality and style.

Return ONLY valid JSON — no markdown, no preamble, no explanation. Use this exact schema:

{
  "courseTitle": "Full course title extracted from syllabus",
  "courseNumber": "e.g. BIO 301 — or empty string if not found",
  "instructor": "Instructor name — or empty string if not found",
  "overview": "2–3 sentence course overview paragraph",
  "weeks": 8,
  "learningObjectives": ["By the end of this course, students will be able to...", "..."],
  "assessments": [
    {
      "name": "Assessment name",
      "weight": "20%",
      "type": "Essay | Discussion | Quiz | Project | Exam | Participation",
      "description": "1–2 sentence description"
    }
  ],
  "discussionPrompts": [
    { "week": 1, "prompt": "Discussion prompt that promotes critical thinking about week 1 topics" }
  ],
  "rubric": {
    "assignmentName": "Name of the assignment this rubric covers",
    "totalPoints": 100,
    "criteria": [
      {
        "name": "Criterion name (e.g. Thesis & Argument)",
        "points": 25,
        "excellent": "Detailed description of excellent performance (full points)",
        "satisfactory": "Detailed description of satisfactory performance (partial credit)",
        "needsWork": "Detailed description of performance that needs improvement (minimal credit)"
      }
    ]
  },
  "faq": [
    { "question": "Common student question", "answer": "Clear, helpful answer" }
  ],
  "suggestedAnnouncement": "Full Week 1 kickoff announcement text — warm, addresses students directly, previews the course, tells them what to do first. 150–200 words."
}`;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { syllabus, voice } = req.body;

  if (!syllabus || String(syllabus).trim().length < 50) {
    return res.status(400).json({ error: 'Please provide a syllabus with at least 50 characters of content.' });
  }

  const apiKey = process.env.GROK_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GROK_API_KEY not configured on server.' });
  }

  const voiceBlock = voice?.trim()
    ? `\n\nFaculty voice — write the announcement and FAQ answers to sound like this person:\n${voice.trim()}`
    : '';

  const userMessage = `Parse the following course syllabus and generate a complete course package.

SYLLABUS:
${syllabus.trim()}${voiceBlock}

Extract all available information from the syllabus and generate the discussion prompts, rubric, FAQ, and Week 1 announcement as instructed.`;

  try {
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'grok-3',
        max_tokens: 4000,
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
      return res.status(500).json({ error: 'Failed to parse Grok response as JSON. Raw: ' + raw.slice(0, 400) });
    }

    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json(parsed);
  } catch (err: any) {
    return res.status(500).json({ error: err?.message ?? 'Unexpected server error.' });
  }
}
