/*
  TeachOS · Course Architect API
  POST { title, level, format, weeks, objectives, syllabus? }
  → full semester structure via Grok
*/

const SYSTEM_PROMPT = `You are Course Architect, an AI system built for university faculty inside TeachOS.

Your job is to design a complete semester course structure from the instructor's inputs. Think like an experienced instructional designer who practices backward design — start from outcomes, build assessments, then design learning activities.

Instructions:
1. Design a week-by-week course map with clear, measurable objectives per module.
2. Each module should have a ready-to-post Canvas/Blackboard announcement the instructor can paste directly. If the instructor provided a voice/personality description, write the announcements to sound authentically like that person — reflect their background, personality, and communication style. Do not sound like a generic LMS template.
3. Generate 6–8 FAQ entries answering the most common logistical and academic questions students will have about this course type.
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
      "announcement": "Ready-to-post weekly announcement — 60–80 words, warm, addressed to students. Preview the topic and tell them what to do first."
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

  const { title, level, format, weeks, objectives, syllabus, announcementLevel, voice } = req.body;

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

  // Scale scope and token budget based on announcement depth
  const aLevel = Number(announcementLevel) || 1;
  const maxWeeks   = aLevel === 1 ? 12 : aLevel === 2 ? 10 : 8;
  const maxTokens  = aLevel === 1 ? 3000 : aLevel === 2 ? 4500 : 6000;
  const clampedWeeks = Math.min(maxWeeks, Math.max(1, Number(weeks) || 8));

  const announcementSpec = aLevel === 1
    ? 'Level 1 — Orientation (60–80 words): Welcome students to the week, name the topic, explain why it matters, tell them what to read or do first.'
    : aLevel === 2
    ? 'Level 2 — Mini Lesson (160–200 words): Open with a welcome, then teach the core ideas of each topic directly in the announcement with brief explanations — students should arrive having engaged with the material before class.'
    : 'Level 3 — Deep Dive (270–320 words): Everything in Level 2, plus include at least one concrete real-world example or short case study that grounds the theory in practice. Make it compelling enough that students share it.';

  const userMessage = `Design a complete course structure for the following:

Course title: ${title}
Level: ${level || 'Undergraduate'}
Format: ${format || 'Online'}
Duration: ${clampedWeeks} weeks
Learning objectives:
${objectives}${syllabusBlock}

Generate all ${clampedWeeks} weekly modules. Keep objectives to 2 per module. Keep topics to 3 per module.

Announcement style for every module:
${announcementSpec}${voice?.trim() ? `\n\nFaculty voice and personality — write ALL announcements to sound authentically like this person:\n${voice.trim()}` : ''}`;

  try {
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'grok-4-latest',
        max_tokens: maxTokens,
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
