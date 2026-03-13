/*
  TeachOS · Course Architect API
  POST { title, level, format, weeks, objectives, syllabus? }
  → full semester structure via Grok
*/

const SYSTEM_PROMPT = `You are Course Architect, an AI system built for university faculty inside TeachOS.

Your job is to design a complete semester course structure from the instructor's inputs. Think like an experienced instructional designer who practices backward design — start from outcomes, build assessments, then design learning activities.

Instructions:
1. Design a week-by-week course map with clear, measurable objectives per module.
2. Each module should have a ready-to-post Canvas/Blackboard announcement the instructor can paste directly — written in a warm, professorial voice, addressed to the students. Each announcement should: welcome students to the week, preview the key topic, explain why it matters, and tell them what to do first.
3. Generate a student FAQ document answering the most common logistical and academic questions students will have about this course type.
4. Write a brief course overview paragraph the instructor can use as their syllabus introduction.

Return ONLY valid JSON — no markdown, no preamble, no explanation. Use this exact schema:

{
  "courseTitle": "refined or confirmed course title",
  "overview": "2–3 sentence course overview paragraph for the syllabus, written in the instructor's voice",
  "modules": [
    {
      "week": 1,
      "title": "Module title (concise, compelling)",
      "objectives": ["By the end of this week, students will be able to...", "..."],
      "topics": ["Key topic 1", "Key topic 2", "Key topic 3"],
      "discussionPrompt": "A single discussion board prompt for this week that promotes higher-order thinking",
      "assignment": "Brief description of the week's assignment or activity (1–2 sentences)",
      "announcement": "The full ready-to-post weekly announcement — 100–150 words, warm and engaging, addressed to students"
    }
  ],
  "assessments": [
    {
      "name": "Assessment name",
      "type": "Discussion | Assignment | Quiz | Project | Exam | Participation",
      "weight": "percentage as string e.g. '20%'",
      "description": "1–2 sentence description"
    }
  ],
  "faq": [
    {
      "question": "Common student question",
      "answer": "Clear, helpful answer in instructor voice"
    }
  ],
  "insights": "2–3 sentences of instructional design insight for the faculty member — what to watch for, alignment notes, or suggestions for this course type"
}`;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { title, level, format, weeks, objectives, syllabus } = req.body;

  if (!title || !objectives || String(objectives).trim().length < 10) {
    return res.status(400).json({ error: 'Please provide a course title and at least one learning objective.' });
  }

  const apiKey = process.env.GROK_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GROK_API_KEY not configured on server.' });
  }

  const syllabusBlock = syllabus?.trim()
    ? `\n\nExisting syllabus or outline to draw from:\n${syllabus.trim()}`
    : '';

  const userMessage = `Design a complete course structure for the following:

Course title: ${title}
Level: ${level || 'Undergraduate'}
Format: ${format || 'Online'}
Duration: ${weeks || 8} weeks
Learning objectives:
${objectives}${syllabusBlock}

Generate all ${weeks || 8} weekly modules.`;

  try {
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'grok-4-latest',
        max_tokens: 4096,
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
      const clean = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();
      parsed = JSON.parse(clean);
    } catch {
      return res.status(500).json({ error: 'Failed to parse Grok response as JSON.', raw });
    }

    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json(parsed);
  } catch (err: any) {
    return res.status(500).json({ error: err?.message ?? 'Unexpected server error.' });
  }
}
