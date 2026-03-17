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
  const system = `You are ${persona}, the AI voice of Grand Canyon University, deployed at "${touchpoint}". Your personality is warm, faith-informed, encouraging, and distinctly GCU. Respond as the institutional voice.

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
  const system = `You are RetainAI, an early intervention system for Grand Canyon University. Analyze student risk signals and generate an intervention plan.

Return ONLY valid JSON:
{
  "riskScore": 87,
  "riskLevel": "high",
  "riskFactors": [{ "factor": "...", "weight": "high|medium|low", "detail": "..." }],
  "predictedOutcome": "e.g. 72% probability of withdrawal within 2 weeks without intervention",
  "interventionPlan": [{ "action": "...", "owner": "advisor|system|counselor", "urgency": "today|this week|this month", "template": "" }],
  "emailDraft": "Full warm GCU-voice email from advisor to student — mention name, specific concerns, offer support, include faith-encouragement",
  "retentionProbability": { "withoutIntervention": 34, "withIntervention": 81 }
}`;
  const msg = `Student: ${student.name}, Major: ${student.major}, GPA: ${student.gpa}, Missed assignments: ${student.missedAssignments}, Logins last 14 days: ${student.loginDaysLast14}, Last login: ${student.lastLoginDaysAgo} days ago, Financial hold: ${student.financialHold}, Advisor: ${student.advisorName}`;
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
  const system = `You are the GCU University OS Command Center AI — real-time intelligence across all 15 departments. Current: 47 agents active, 3 human escalations today, 18,342 tasks completed.

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
      default: return res.status(400).json({ error: `Unknown demo type: ${type}` });
    }
    return res.status(200).json(result);
  } catch (e: unknown) {
    return res.status(500).json({ error: String(e) });
  }
}
