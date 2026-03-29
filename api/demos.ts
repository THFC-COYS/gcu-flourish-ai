/*
  MoltED · Demos unified API dispatcher
  POST { type: 'beacon' | 'retain-ai' | 'outcomes-ai' | 'proof-ai' | 'command-center', ...payload }
*/

const GROK_API_KEY = process.env.GROK_API_KEY ?? '';

function extractJSON(raw: string): unknown {
  const fenceMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  const cleaned = fenceMatch ? fenceMatch[1].trim() : raw.trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('No JSON object found');
  return JSON.parse(cleaned.slice(start, end + 1));
}

async function callGrok(systemPrompt: string, userMessage: string, opts: { model?: string; temp?: number; maxTokens?: number } = {}): Promise<unknown> {
  const res = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${GROK_API_KEY}` },
    body: JSON.stringify({
      model: opts.model ?? 'grok-3-mini',
      messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userMessage }],
      temperature: opts.temp ?? 0.4,
      max_tokens: opts.maxTokens ?? 1000,
    }),
  });
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  return extractJSON(data.choices?.[0]?.message?.content ?? '');
}

// ── Handlers ──────────────────────────────────────────────────────────────

async function handleBeacon(body: any) {
  const { studentMessage, persona, touchpoint } = body;
  const system = `You are ${persona}, the AI voice of your institution, deployed at "${touchpoint}". Your personality is warm, faith-informed, encouraging, and distinctly your institution's voice. Respond as the institutional voice.

Return ONLY valid JSON:
{
  "reply": "Full conversational response in ${persona}'s voice",
  "tone": "encouraging|informational|empathetic|celebratory",
  "intent": "What the student was trying to accomplish",
  "escalate": false,
  "escalateReason": "Only if escalate true",
  "followUpSuggestions": ["suggestion 1", "suggestion 2", "suggestion 3"],
  "faithNote": "How faith/values informed this response, or empty string"
}`;
  return callGrok(system, `Student message at "${touchpoint}": ${studentMessage}`, { temp: 0.7, maxTokens: 800 });
}

async function handleRetainAI(body: any) {
  const { student } = body;
  const system = `You are RetainAI, an early intervention system deployed at Yelon Jobs University (YJU).

INSTITUTION: Yelon Jobs University (YJU). This is the ONLY institution name you may use.
FORBIDDEN WORDS — never write any of these: "Grand Canyon University", "GCU", "faith", "prayer", "Bible", "God", "Lord", "proverbs", "scripture", "bless", "grace", "ministry", "Christ", "spiritual", or any other religious language.

Analyze student risk signals and generate an intervention plan. Write the emailDraft as a professional, warm, career-focused message on behalf of Yelon Jobs University (YJU). The email signature must say "Yelon Jobs University (YJU)" — nothing else.

Return ONLY valid JSON:
{
  "riskScore": 87,
  "riskLevel": "high",
  "riskFactors": [{ "factor": "...", "weight": "high|medium|low", "detail": "..." }],
  "predictedOutcome": "e.g. 72% probability of withdrawal within 2 weeks without intervention",
  "interventionPlan": [{ "action": "...", "owner": "advisor|system|counselor", "urgency": "today|this week|this month", "template": "" }],
  "emailDraft": "Full warm, personalized email from advisor to student — mention student name, specific academic concerns, offer support, include encouragement. Always say 'Yelon Jobs University (YJU)' as the institution name. No religious content.",
  "retentionProbability": { "withoutIntervention": 34, "withIntervention": 81 }
}`;
  const msg = `Institution: Yelon Jobs University (YJU)\nStudent: ${student.name}, Major: ${student.major}, GPA: ${student.gpa}, Missed assignments: ${student.missedAssignments}, Logins last 14 days: ${student.loginDaysLast14}, Last login: ${student.lastLoginDaysAgo} days ago, Financial hold: ${student.financialHold}, Advisor: ${student.advisorName}`;
  return callGrok(system, msg, { temp: 0.4, maxTokens: 1200 });
}

async function handleOutcomesAI(body: any) {
  const { reportType, institution, data } = body;
  const reportPrompts: Record<string, string> = {
    accreditation: `Generate an HLC accreditation readiness report. Return JSON: { "overallReadiness": "0-100", "standardsAssessment": [{ "standard": "...", "status": "met|partial|gap", "evidence": "...", "recommendation": "..." }], "executiveSummary": "...", "criticalGaps": ["..."], "strengthHighlights": ["..."], "nextSteps": ["..."] }`,
    board: `Generate a board of trustees summary. Return JSON: { "headline": "...", "keyMetrics": [{ "metric": "...", "value": "...", "trend": "up|down|stable", "context": "..." }], "narrative": "...", "watchItems": ["..."], "celebrationPoints": ["..."], "strategicRecommendations": ["..."] }`,
    rankings: `Generate a rankings improvement analysis. Return JSON: { "currentPositionSummary": "...", "rankingFactors": [{ "factor": "...", "currentScore": "...", "benchmark": "...", "gap": "...", "actionPlan": "..." }], "projectedImprovement": "...", "quickWins": ["..."], "longTermInvestments": ["..."], "competitorInsights": "..." }`,
  };
  const system = `You are OutcomesAI for ${institution}. ${reportPrompts[reportType] ?? reportPrompts.board}\n\nReturn ONLY valid JSON.`;
  return callGrok(system, `Institution: ${institution}\nReport: ${reportType}\nData: ${JSON.stringify(data)}`, { temp: 0.3, maxTokens: 1400 });
}

async function handleProofAI(body: any) {
  const { studentName, program, submission, competencies } = body;
  const system = `You are ProofAI, a competency verification system. Assess the submission against the competencies.

Return ONLY valid JSON:
{
  "verificationId": "PROOF-${Date.now().toString(36).toUpperCase()}",
  "studentName": "...",
  "program": "...",
  "verifiedAt": "${new Date().toISOString()}",
  "overallMasteryLevel": "emerging|developing|proficient|mastered",
  "competencyResults": [{ "competency": "...", "masteryLevel": "...", "score": 85, "evidence": "...", "feedback": "...", "verified": true }],
  "credentialRecommendation": "...",
  "narrativeSummary": "2-3 sentence professional summary",
  "nextMilestone": "...",
  "employerStatement": "1-sentence employer-facing statement"
}`;
  return callGrok(system, `Student: ${studentName}\nProgram: ${program}\nCompetencies: ${competencies.join(', ')}\n\nSubmission:\n${submission}`, { temp: 0.3, maxTokens: 1200 });
}

async function handleCommandCenter(body: any) {
  const { query } = body;
  const system = `You are the University OS Command Center AI — real-time intelligence across all 15 departments. Current: 47 agents active, 3 human escalations today, 18,342 tasks completed.

Return ONLY valid JSON:
{
  "answer": "Detailed executive-level response",
  "relevantDepts": ["dept1", "dept2"],
  "keyMetrics": [{ "label": "...", "value": "...", "trend": "up|down|stable" }],
  "alerts": ["..."],
  "recommendation": "One strategic recommendation",
  "confidence": "high|medium|low",
  "humanNote": "Where human judgment is needed, or empty string"
}`;
  return callGrok(system, `Leadership query: ${query}`, { temp: 0.5, maxTokens: 900 });
}

async function handleSyllabusSync(body: any) {
  const { syllabusText, courseType } = body;
  const system = `You are SyllabusSync, an AI that reads a course syllabus and auto-builds a complete LMS course structure.

Return ONLY valid JSON:
{
  "courseName": "Full course name",
  "courseCode": "e.g. NUR-412",
  "credits": 3,
  "term": "e.g. 8 weeks",
  "totalPoints": 1000,
  "learningObjectives": ["objective 1", "objective 2", "objective 3", "objective 4"],
  "modules": [
    {
      "week": 1,
      "title": "Module title",
      "topics": ["topic 1", "topic 2"],
      "assignments": [
        { "title": "Assignment title", "type": "discussion|paper|quiz|reflection|project", "points": 50, "due": "Wednesday|Sunday|Friday" }
      ]
    }
  ],
  "gradingBreakdown": [
    { "category": "Discussions", "weight": 30, "points": 300 },
    { "category": "Papers", "weight": 40, "points": 400 },
    { "category": "Quizzes", "weight": 20, "points": 200 },
    { "category": "Participation", "weight": 10, "points": 100 }
  ],
  "accreditationTags": ["HLC 4.A", "ACEN Standard 4"],
  "syllabusGaps": ["Missing late work policy", "No accessibility statement"],
  "autoCreated": {
    "discussions": 4,
    "rubrics": 3,
    "assignments": 8,
    "quizzes": 2,
    "gradebook": true,
    "calendarEvents": 12
  },
  "timeSavedHours": 9
}

Generate 4-6 weeks of modules with realistic assignments. Make it specific to the course type.`;
  return callGrok(system, `Course type: ${courseType}\n\nSyllabus:\n${syllabusText}`, { temp: 0.4, maxTokens: 2000 });
}

async function handleClinicalAI(body: any) {
  const { action, scenario, studentMessage, conversationHistory, conversation } = body;

  if (action === 'respond') {
    const system = `You are a standardized patient in a nursing clinical simulation. The patient is: ${scenario.patientName}, ${scenario.age} year old ${scenario.gender}. Chief complaint: ${scenario.chiefComplaint}. Underlying condition: ${scenario.condition}.

Respond ONLY as the patient would — use realistic, natural language. Reveal information gradually as the student asks good questions. If asked about symptoms, describe them authentically. Update vitals slightly as conversation progresses.

Return ONLY valid JSON:
{
  "patientResponse": "Natural patient dialogue — first person, realistic, may show pain/anxiety",
  "vitals": { "bp": "120/80", "hr": 88, "rr": 16, "temp": 98.6, "o2sat": 97, "pain": 6 },
  "newSymptomRevealed": "symptom revealed or empty string",
  "escalating": false
}`;
    const history = (conversationHistory || []).map((m: any) => `${m.role}: ${m.content}`).join('\n');
    return callGrok(system, `Conversation so far:\n${history}\n\nStudent nurse asks: ${studentMessage}`, { temp: 0.7, maxTokens: 600 });
  }

  if (action === 'assess') {
    const system = `You are a clinical nursing education AI assessing a student's patient interview for QSEN competency verification.

Return ONLY valid JSON:
{
  "overallScore": 82,
  "grade": "B",
  "clinicalReasoning": "2-3 sentence summary of the student's clinical thinking",
  "priorityDiagnosis": "Most likely diagnosis the student should have identified",
  "competencies": [
    { "name": "History Taking", "score": 85, "feedback": "specific feedback", "level": "emerging|developing|proficient|mastered" },
    { "name": "Physical Assessment", "score": 78, "feedback": "...", "level": "..." },
    { "name": "Clinical Reasoning", "score": 80, "feedback": "...", "level": "..." },
    { "name": "Safety Awareness", "score": 90, "feedback": "...", "level": "..." },
    { "name": "Communication", "score": 88, "feedback": "...", "level": "..." }
  ],
  "findingsElicited": ["finding 1", "finding 2", "finding 3"],
  "missedFindings": ["critical finding they missed 1", "finding 2"],
  "strengthSummary": "What the student did well",
  "improvementSummary": "Key areas to improve",
  "nclex_readiness": "high|medium|low"
}`;
    const convoText = (conversation || []).map((m: any) => `${m.role}: ${m.content}`).join('\n');
    return callGrok(system, `Patient: ${scenario.patientName} — ${scenario.chiefComplaint}\nCondition: ${scenario.condition}\n\nConversation:\n${convoText}`, { temp: 0.3, maxTokens: 1200 });
  }

  throw new Error('Invalid clinical-ai action');
}

async function handleAdaptiveExam(body: any) {
  const { topic, questionCount } = body;
  const system = `You are AdaptiveExam, an AI that generates unique, high-quality exam questions for higher education. Generate ${questionCount || 8} questions on the topic, spanning difficulty levels 1-5 (1=recall, 5=application/analysis). Mix across sub-topics. Make every question unique — these are AI-generated fresh each time, making sharing useless.

Return ONLY valid JSON:
{
  "examTitle": "...",
  "topic": "...",
  "questions": [
    {
      "id": "q1",
      "question": "Full question text",
      "options": { "A": "...", "B": "...", "C": "...", "D": "..." },
      "correct": "B",
      "explanation": "Why B is correct and why others are wrong — 2-3 sentences",
      "difficulty": 2,
      "subtopic": "specific sub-topic",
      "competency": "What skill/knowledge this tests",
      "bloom": "remember|understand|apply|analyze|evaluate|create"
    }
  ]
}

Vary difficulty: 1-2 questions at level 1, 2 at level 2, 2 at level 3, 1-2 at level 4, 1 at level 5. Order them randomly (not by difficulty).`;
  return callGrok(system, `Topic: ${topic}`, { temp: 0.8, maxTokens: 3000 });
}

// ── Router ────────────────────────────────────────────────────────────────

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).end();

  const { type, ...body } = req.body;

  try {
    let result: unknown;
    switch (type) {
      case 'beacon':          result = await handleBeacon(body); break;
      case 'retain-ai':       result = await handleRetainAI(body); break;
      case 'outcomes-ai':     result = await handleOutcomesAI(body); break;
      case 'proof-ai':        result = await handleProofAI(body); break;
      case 'command-center':  result = await handleCommandCenter(body); break;
      case 'syllabussync':    result = await handleSyllabusSync(body); break;
      case 'clinical-ai':     result = await handleClinicalAI(body); break;
      case 'adaptive-exam':   result = await handleAdaptiveExam(body); break;
      default: return res.status(400).json({ error: `Unknown demo type: ${type}` });
    }
    return res.status(200).json(result);
  } catch (e: unknown) {
    return res.status(500).json({ error: String(e) });
  }
}
