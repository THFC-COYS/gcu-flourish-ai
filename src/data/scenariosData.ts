import { Scenario } from '../types';

export const PROTOTYPE_SCENARIOS: Record<string, Scenario[]> = {

  // ── NURSING ──────────────────────────────────────────────────────────────────
  'proto-nursing': [
    {
      id: 'nursing-chest-pain',
      title: 'Chest Pain Assessment',
      icon: '💔',
      description: 'Walk through a step-by-step cardiac emergency assessment',
      aiOpener: "Let's run through a chest pain scenario together. You're on the floor and a patient in Room 4B calls out — they're reporting crushing chest pain, 8/10 in severity, radiating to their left arm. It started 15 minutes ago. What's your first move?",
      steps: [
        {
          quickReply: "I stay with the patient and start OPQRST assessment",
          aiResponse: "Perfect — staying present is the first therapeutic intervention. Your OPQRST reveals: Onset 15 min ago, Provocation: worse with movement, Quality: crushing/pressure, Radiation: left arm and jaw, Severity: 8/10, Time: constant since onset.\n\nVitals come back: BP 168/96, HR 112 bpm, RR 22, SpO₂ 91% on room air. The patient is diaphoretic and anxious.\n\nGiven these vitals — what are your immediate priority actions right now?",
        },
        {
          quickReply: "O2 via non-rebreather, call the charge nurse, get IV access, 12-lead ECG",
          aiResponse: "Excellent clinical judgment — you've hit all 4 priority interventions. The 12-lead shows ST elevation in leads II, III, and aVF — inferior wall MI pattern.\n\nThe charge nurse arrives. The patient grabs your hand: *'Am I going to die? I'm scared.'*\n\nYou've completed the clinical steps. Now comes the GCU nursing spirit — how do you respond to this patient's fear while the team mobilizes the cath lab?",
        },
        {
          quickReply: "I look them in the eyes, hold their hand, and say: 'I am right here with you. You're in the right place and we are taking great care of you right now.'",
          aiResponse: "That response just demonstrated the GCU nursing spirit in its fullest form. Evidence shows that those exact words — calm, direct, present — measurably reduce patient anxiety, lower cortisol, and improve outcomes in cardiac events.\n\n**What you did right in this scenario:**\n✅ Immediate assessment (OPQRST) without delay\n✅ Correct priority interventions (O2, IV, ECG, escalation)\n✅ Recognized ST elevation pattern → appropriate escalation\n✅ Therapeutic presence in a moment of fear\n\n*'The patient remembered the nurse who held their hand far longer than the one who saved their life.'*\n\n⭐ Scenario complete. You handled this with both clinical excellence and compassionate dignity.",
        },
      ],
    },
    {
      id: 'nursing-med-error',
      title: 'Medication Error Response',
      icon: '💊',
      description: 'Navigate a near-miss medication error with proper reporting protocol',
      aiOpener: "Here's a difficult but critical scenario. You're administering morning medications and realize — after the fact — that you gave your patient in Room 7 the wrong dose of insulin. They received 20 units of regular insulin instead of 2 units. The error happened 10 minutes ago. The patient is currently alert. What do you do first?",
      steps: [
        {
          quickReply: "Stay with the patient, assess them immediately, and notify the charge nurse right now",
          aiResponse: "Correct — patient safety first, disclosure second, documentation third. Never leave the patient.\n\nYou assess: patient is alert, oriented, reporting no symptoms yet. Blood glucose is 142 mg/dL. But with 20 units on board, hypoglycemia is coming.\n\n10 minutes later: the patient reports feeling 'shaky and sweaty.' BG drops to 58 mg/dL. They're conscious but symptomatic.\n\nThe charge nurse is on the way. What's your immediate treatment for this symptomatic hypoglycemia?",
        },
        {
          quickReply: "Administer 15g fast-acting carbs (orange juice), recheck BG in 15 min, stay at bedside, IV dextrose ready if they decline",
          aiResponse: "Textbook hypoglycemia management — the '15-15 rule.' BG comes back to 89 mg/dL after 15 minutes. Patient is stable. Charge nurse and provider have been notified.\n\nNow comes the part nurses often fear most: the documentation and incident report.\n\nYour charge nurse says: *'You need to fill out a safety event report. And we need to have a conversation with the patient and family.'*\n\nHow do you approach the disclosure conversation with the patient?",
        },
        {
          quickReply: "I'm honest with the patient: explain what happened, what we did about it, that they're safe now, and what we'll do to prevent it happening again",
          aiResponse: "That is the gold standard of error disclosure — and research shows it's also the standard that *reduces* litigation and *increases* patient trust.\n\n**Your documentation should include:**\n- Exact time of error and discovery\n- Medication administered vs. what was ordered\n- Patient's condition at time of discovery\n- All interventions taken (with timestamps)\n- Patient's response and current status\n- Notification chain (charge nurse, provider, family)\n\n**GCU Nursing Spirit Principle:** We are stewards of our patients' safety. Errors happen — what defines our character is how we respond: with honesty, speed, and accountability.\n\n⭐ Scenario complete. You demonstrated courage and integrity under pressure.",
        },
      ],
    },
    {
      id: 'nursing-difficult-family',
      title: 'Difficult Family Interaction',
      icon: '👨‍👩‍👧',
      description: 'De-escalate an angry family member while maintaining professionalism',
      aiOpener: "You're caring for an elderly patient post-surgery. Their adult daughter storms up to the nurses' station: 'Nobody has checked on my mother in TWO HOURS. She's been asking for pain medication and you all just ignore her. I want to speak to someone in charge RIGHT NOW.' Her voice is raised. Other patients can hear. How do you respond?",
      steps: [
        {
          quickReply: "I lower my voice, step toward her calmly, and say: 'I hear you, and I want to help. Let's go to your mother's room right now.'",
          aiResponse: "Perfect de-escalation move. Lowering your voice — not raising it to match hers — is the single most effective technique. Moving *toward* the problem (the patient's room) shows action over defensiveness.\n\nIn the room, you assess the patient: she reports pain at 7/10 and is due for her next dose in 20 minutes. You administer it within the order window.\n\nThe daughter is still upset: 'You people have been running around doing nothing. My mother is suffering and nobody cares.'\n\nHow do you respond to the 'nobody cares' statement without being defensive?",
        },
        {
          quickReply: "I say: 'Your mother matters deeply to us. I can hear how frightened you are — watching someone you love in pain is one of the hardest things. Can you tell me what else is worrying you?'",
          aiResponse: "That's advanced therapeutic communication — you reframed their anger as fear (which it almost always is), validated the emotion, and opened a door. The daughter's shoulders visibly drop.\n\nShe says quietly: *'I just... I'm scared she's not going to make it. The doctor said the surgery went well but she seems so weak.'*\n\nNow the real issue has surfaced. What do you do with this moment?",
        },
        {
          quickReply: "I sit down with her, acknowledge her fear, and offer to arrange a conversation with the care team so she can ask all her questions directly",
          aiResponse: "You just transformed an adversarial interaction into a therapeutic alliance — and that's the GCU nursing spirit at its highest expression.\n\n**What you demonstrated:**\n✅ De-escalation through tone and movement\n✅ Curiosity over defensiveness\n✅ Emotional intelligence — seeing fear beneath anger\n✅ Advocacy: connecting family to the care team\n\n**Documentation note:** Document the family interaction, the patient's pain assessment and medication given, and the plan to connect with the care team. This protects you and creates continuity.\n\n*'People don't care how much you know until they know how much you care.'* — Theodore Roosevelt\n\n⭐ Scenario complete.",
        },
      ],
    },
  ],

  // ── BUSINESS ─────────────────────────────────────────────────────────────────
  'proto-business': [
    {
      id: 'biz-ethical-dilemma',
      title: 'Ethical Pressure Scenario',
      icon: '⚖️',
      description: 'Navigate pressure to falsify financial reporting',
      aiOpener: "You're a mid-level finance manager at a growing company. It's end of quarter and your VP calls you in: 'We're $400K short of our investor target. I need you to reclassify these pending contracts as closed revenue. It's just timing — they'll close next quarter anyway.' This is not how revenue should be recorded under GAAP. How do you respond in this meeting?",
      steps: [
        {
          quickReply: "I stay calm, acknowledge the pressure, but clearly state I can't reclassify revenue that hasn't been earned — and explain why",
          aiResponse: "That took courage, and courage in that moment is servant-leadership in action. Your VP pushes back: 'Look, everyone does this at quarter end. If we miss targets, people lose their jobs — including yours. Just this once.'\n\nTwo things are happening here: a direct ethical line is being crossed, AND a veiled threat has been made. The 'everyone does it' justification is one of the most common rationalizations for fraud.\n\nHow do you respond to the threat while holding your ethical position?",
        },
        {
          quickReply: "I say: 'I understand what's at stake. But misrepresenting revenue exposes the company — and you — to SEC violations, investor fraud, and potential criminal liability. I want to help find another solution that doesn't put us at legal risk.'",
          aiResponse: "Masterful. You reframed the risk in terms they care about — legal liability and company exposure — without moralizing. You've also offered a path forward.\n\nYour VP pauses. 'What do you suggest?'\n\nYou have an opportunity now to offer an alternative that still helps the business. What do you propose?",
        },
        {
          quickReply: "I suggest: accelerate Q2 pipeline calls today to legitimately close 1-2 deals, present investors with a transparent 'near-miss with strong pipeline' narrative, and document this conversation with HR as a protective measure",
          aiResponse: "That's the complete servant-leader response: ethical backbone + constructive solutions + self-protection.\n\n**The GCU Ethical Framework you applied:**\n✅ Held the ethical line under direct pressure\n✅ Reframed risk in business terms (not just moral)\n✅ Offered constructive alternatives\n✅ Protected yourself with documentation\n\n**Critical principle:** The moment you cross that line 'just this once,' you've handed someone power over you forever. Integrity is only real if it holds under pressure.\n\n*'The time is always right to do what is right.'* — Dr. Martin Luther King Jr.\n\n⭐ Scenario complete. You demonstrated the character GCU business alumni are known for.",
        },
      ],
    },
    {
      id: 'biz-mission-driven',
      title: 'Starting a Mission-Driven Business',
      icon: '🚀',
      description: 'Build a values-first business from the ground up',
      aiOpener: "You've been feeling called to start a business — one that genuinely honors God and serves people, not just generates profit. You have $50,000 in savings, a background in marketing, and a passion for helping small nonprofits. You're at the very beginning. Where do you start?",
      steps: [
        {
          quickReply: "I start by writing a mission statement that names who I serve and what change I create — before thinking about products or revenue",
          aiResponse: "That instinct is exactly right — and it's exactly backwards from how most people start (who typically start with 'how do I make money?'). GCU's CCOB calls this 'Purpose Clarity First.'\n\nHere's a framework: *'We exist to [action] for [who] so that [outcome].'*\n\nFor example: *'We exist to equip small nonprofits with professional marketing so that their missions reach more people.'*\n\nNow the harder question: nonprofits typically have tiny budgets. How do you build a sustainable, profitable business serving clients with limited resources?",
        },
        {
          quickReply: "I create tiered pricing — free tools and templates for micro-nonprofits, affordable monthly packages for small ones, and premium retainers for established organizations — so the profitable tier subsidizes the mission tier",
          aiResponse: "That's a genuine impact business model — and one that's both viable and Kingdom-minded. You've essentially built a sliding-scale structure with cross-subsidization.\n\nThis model also gives you a powerful story for investors: 'Our premium clients fund our mission-tier clients. Everyone who pays is advancing the mission, not just the founder.'\n\nNow: you've been running for 6 months, you have 8 clients, but you're barely breaking even. A venture capital firm reaches out — they want to invest $500K for 30% equity. The catch: they want you to drop the free tier and focus on larger nonprofits. What do you do?",
        },
        {
          quickReply: "I decline that specific offer, but use the interest to approach impact investors or CDFIs who fund mission-aligned businesses without requiring us to abandon our values",
          aiResponse: "That decision — walking away from half a million dollars to protect your mission — is one of the defining moments of a values-driven entrepreneur.\n\n**GCU CCOB Framework for Mission-Aligned Funding:**\n- **Impact investors** (B Corp network, Toniic, Mission Investors Exchange) seek financial return *and* social impact\n- **CDFIs** (Community Development Financial Institutions) — low-interest loans for mission-driven businesses\n- **Faith-based funders** — GCU alumni networks, Christian Community Development Association\n- **Revenue-based financing** — repay from revenue, no equity dilution\n\n*'Do not be conformed to this world, but be transformed by the renewal of your mind.'* — Romans 12:2\n\n⭐ Scenario complete. You built a business worthy of the GCU servant-leadership legacy.",
        },
      ],
    },
  ],

  // ── EDUCATION ────────────────────────────────────────────────────────────────
  'proto-education': [
    {
      id: 'edu-struggling-student',
      title: 'Reaching a Struggling Student',
      icon: '🧒',
      description: 'Support a student going through a difficult time at home',
      aiOpener: "It's week 7 of school. Marcus, one of your 8th grade students, used to be engaged — raised his hand, turned in work, joked with classmates. In the past 3 weeks he's submitted nothing, sleeps in class, and seems completely withdrawn. Other teachers have noticed too. You stay after class on Friday and ask if he's okay. He shrugs: 'I'm fine.' How do you approach this?",
      steps: [
        {
          quickReply: "I don't push. I just sit near him and say: 'You don't have to tell me anything. But I've noticed you, and I'm not going anywhere.'",
          aiResponse: "That's the most powerful intervention in the GCU educator's toolkit — presence without pressure. Research on adolescent trust shows teens are most likely to open up when they feel zero obligation to perform.\n\nAfter a long pause, Marcus says quietly: 'My parents are getting divorced. My dad moved out last month. My mom cries every night.'\n\nHe's now disclosed the root cause. He's watching his family break apart and processing grief that adults often can't handle. What do you do next?",
        },
        {
          quickReply: "I thank him for trusting me. I tell him his feelings make complete sense. I ask if he's okay at home — is he safe, is he eating, does he have support?",
          aiResponse: "You've just done a trauma-informed check-in — safety first, academics second. Marcus confirms he's physically safe, but clearly emotionally struggling.\n\nNow you have several responsibilities:\n1. Connect him with the school counselor\n2. Notify the counselor and admin of what you've learned\n3. Modify academic expectations temporarily without abandoning accountability\n4. Keep showing up\n\nHis mom emails you Monday: 'Marcus came home Friday and said you were the only teacher who actually cared. Thank you.' But you still have 28 other students and state testing in 6 weeks. How do you create a sustainable plan that supports Marcus *and* your whole class?",
        },
        {
          quickReply: "I create a simple check-in system (thumbs up/sideways/down at door), give Marcus a private modified deadline extension for 2 weeks, loop in the counselor, and schedule a brief weekly 2-minute check-in with him",
          aiResponse: "That's the GCU educator's approach in full — differentiated support without abandoning standards, sustainable for you, dignifying for the student.\n\n**What you built:**\n✅ A low-burden daily check-in system for the whole class (normalizes emotional awareness)\n✅ A temporary accommodation for Marcus with a specific endpoint (not indefinite)\n✅ A team-based response (counselor + teacher)\n✅ Consistent relational investment (2 minutes/week compounds over a year)\n\n*'Every child deserves a champion — an adult who will never give up on them.'* — Rita Pierson\n\n⭐ Scenario complete.",
        },
      ],
    },
    {
      id: 'edu-lesson-design',
      title: 'Designing an Inclusive Lesson',
      icon: '📝',
      description: 'Build a lesson that reaches every type of learner',
      aiOpener: "You're teaching a unit on the American Revolution to a 5th grade class with significant learning diversity: 4 students with IEPs, 6 English Language Learners at varying proficiency levels, 3 identified gifted students, and the rest at grade level. You need to teach the causes of the Revolution. Using GCU's UDL framework — how do you design the lesson?",
      steps: [
        {
          quickReply: "I start with an Engage hook: show a short video clip of a 'taxation without representation' modern analogy, then ask students what they think is unfair about it",
          aiResponse: "Great UDL Engage strategy — you've activated prior knowledge, created relevance, and used multiple modalities (visual + discussion). ELL students can engage with the visual before the linguistic demands increase.\n\nNow for Explore: students need to encounter the primary content. How do you structure the Explore phase so that all four learner groups can access the material at their level simultaneously (without singling anyone out)?",
        },
        {
          quickReply: "I use choice stations: illustrated timeline for visual learners, audio narration at a listening station, a primary source document with scaffolded questions, and a Socratic discussion corner for gifted students — all covering the same content",
          aiResponse: "That's Universal Design for Learning (UDL) executed beautifully — multiple means of representation, multiple means of engagement, all on the same content objective. Nobody is 'the special ed group.' Everyone chooses.\n\nFor your ELL students at lower proficiency: the illustrated timeline and audio narration are especially accessible. For gifted students: the Socratic discussion will challenge them beyond grade level.\n\nNow: Evaluate. You need to assess learning in a way that's equitable for this class. What does your evaluation look like that isn't just a traditional written quiz?",
        },
        {
          quickReply: "I offer a choice board: written paragraph, recorded video explanation, labeled diagram, or a 2-minute verbal explanation to me — all demonstrating the same understanding of 3 causes of the Revolution",
          aiResponse: "That assessment choice board just eliminated language and format barriers while holding every student to the same *cognitive* standard. That's the essence of equitable assessment.\n\n**Your lesson design demonstrated:**\n✅ UDL's three pillars: multiple means of representation, action & expression, and engagement\n✅ Differentiation without tracking or stigmatizing\n✅ Same learning objective — different access points\n✅ Assessment that separates *knowledge* from *format performance*\n\n**GCU Educator Spirit:** Every learner is made in the image of a creative God. Our job is to find the door *they* can walk through.\n\n⭐ Scenario complete.",
        },
      ],
    },
  ],

  // ── ENGINEERING ──────────────────────────────────────────────────────────────
  'proto-engineering': [
    {
      id: 'eng-sustainable-design',
      title: 'Sustainable Design Challenge',
      icon: '🌱',
      description: 'Design a water system for a rural community with ethical trade-offs',
      aiOpener: "Your engineering team has been contracted to design a water purification system for a rural village in East Africa — population 800, no grid electricity, $30,000 total budget. Clean water access would prevent an estimated 60 child deaths per year from waterborne disease. You have 3 technology options. Which do you evaluate first?",
      steps: [
        {
          quickReply: "I evaluate solar-powered UV purification, biosand filtration, and gravity-fed ceramic filtration — comparing cost, maintenance complexity, local serviceability, and environmental footprint",
          aiResponse: "Excellent — you're applying a Life Cycle Assessment mindset before choosing. Here's what the analysis reveals:\n\n**Solar UV:** $28,000 install, excellent output, requires imported replacement parts, 15-yr lifespan\n**Biosand:** $8,000, removes 95%+ pathogens, local materials, zero energy, maintained by village with basic training\n**Ceramic gravity:** $12,000, 99.9% pathogen removal, locally manufacturable, 5-yr filter replacement\n\nYour team engineer pushes for solar UV: 'It's the most technically advanced and impressive for our portfolio.'\n\nBut the GCU creation-care framework asks a harder question: which option best serves the people AND creation long-term? What's your recommendation and why?",
        },
        {
          quickReply: "I recommend biosand filtration as the primary system: lowest cost, locally maintained, no supply chain dependency, no energy requirement, and frees $22,000 for training, backup systems, and a community water committee",
          aiResponse: "That's engineering wisdom over engineering ego — and it's exactly what servant-leadership looks like in technical practice.\n\nYour engineer is disappointed: 'We could showcase the solar tech at the next conference.'\n\nYou respond: 'Our job is to design for the village, not for our portfolio.' The community has been involved in the decision. They overwhelmingly prefer a system they can repair themselves.\n\nFinal step: you need to document the environmental impact for your grant report. What does a basic Life Cycle Assessment (LCA) include for this project?",
        },
        {
          quickReply: "LCA covers: materials sourcing (where does the sand, gravel, and ceramic come from?), construction footprint, operational environmental impact (zero energy = zero emissions), end-of-life recyclability, and social impact metrics",
          aiResponse: "Complete LCA framework. Here's your project's environmental story:\n\n🌍 **Materials:** Local sand/gravel (zero transport emissions); ceramic sourced from regional supplier (1,200 km, minimal)\n⚡ **Operations:** Zero energy consumption, zero carbon emissions per liter\n♻️ **End of Life:** Sand fully recyclable; ceramic biodegradable\n❤️ **Social Impact:** 800 people with clean water; estimated 60 child lives saved per year; 40% reduction in time women/girls spend water-collecting\n\n**The number GCU creation-care engineering measures above all:** 60 children per year who will grow up because you chose the right design over the impressive one.\n\n*'The earth is the Lord's, and everything in it.'* — Psalm 24:1\n\n⭐ Scenario complete.",
        },
      ],
    },
    {
      id: 'eng-safety-ethics',
      title: 'Engineering Safety Dilemma',
      icon: '⚠️',
      description: 'Respond when your company wants to skip safety testing',
      aiOpener: "You're a structural engineer at a construction firm. Your team has designed a pedestrian bridge for a university campus. Testing protocol calls for 6 weeks of load testing. Your project manager comes to you: 'The client is pushing for early delivery. Skip the final 3 weeks of load testing — our calculations are solid and we've never had a failure.' The bridge will carry up to 800 students daily. What do you do?",
      steps: [
        {
          quickReply: "I decline clearly: safety testing exists because calculations alone don't catch material defects, construction errors, or resonance issues. I document this conversation.",
          aiResponse: "You're absolutely right — and you've just cited the exact reason the Tacoma Narrows Bridge collapsed in 1940: engineering calculations that looked solid on paper failed to account for aerodynamic resonance.\n\nYour PM escalates: 'The client will take their business elsewhere if we can't deliver on their timeline. This is your call to make — but think about what it means for your bonus and this project.'\n\nThis is now a threat wrapped in a business concern. What do you do next?",
        },
        {
          quickReply: "I escalate to the senior engineer and put my objection in writing. I also propose a compromise: a third-party accelerated load test that compresses the schedule to 4 weeks without skipping critical tests.",
          aiResponse: "That's exactly the playbook: escalate, document, and offer an alternative. Your written objection creates a paper trail that protects you and, more importantly, forces the decision to be made at the appropriate level of authority.\n\nThe senior engineer supports you. The accelerated third-party test is approved.\n\nDuring the accelerated testing, engineers discover a hairline crack in one of the concrete piers — a defect in the pour that calculations couldn't have caught. Repairs take 2 weeks.\n\nThe bridge opens 3 weeks late. 800 students cross it safely every day. What do you say when your PM grudgingly thanks you?",
        },
        {
          quickReply: "'Our job is to make sure the structure is worthy of the trust people place in it. I'd make the same call again.'",
          aiResponse: "That is the GCU engineering spirit — excellence and ethics as one integrated value, not competing forces.\n\n**What you demonstrated:**\n✅ Professional courage: refused to compromise safety under pressure\n✅ Paper trail: documented your objection (professional and legal protection)\n✅ Constructive alternative: proposed accelerated testing rather than just saying 'no'\n✅ Escalation: brought the decision to the right level\n\n**The GCU Creation-Care engineering principle:** We are stewards of the built environment. Every structure carries the weight of the trust people place in us.\n\n*'Whatever you do, work at it with all your heart.'* — Colossians 3:23\n\n⭐ Scenario complete.",
        },
      ],
    },
  ],

  // ── HUMANITIES / COUNSELING ──────────────────────────────────────────────────
  'proto-humanities': [
    {
      id: 'hum-crisis-intervention',
      title: 'Client Safety Assessment',
      icon: '🛡️',
      description: 'Navigate a client disclosing thoughts of self-harm',
      aiOpener: "⚠️ Note: This is a training simulation for counseling students. You're in a session with a client — a 22-year-old college student — who has been working with you on anxiety for 3 sessions. Midway through today's session, they pause and say: 'Sometimes I just think about... not being here anymore. Like, what's the point?' How do you respond in this moment?",
      steps: [
        {
          quickReply: "I stay completely calm, lean in, and say: 'Thank you for trusting me with that. I want to understand what you mean — can you tell me more about those thoughts?'",
          aiResponse: "Your calm, non-reactive response just kept the door open. If you'd shown alarm or immediately jumped to protocol, the client might shut down. Your curiosity-first approach honors their trust.\n\nThe client continues: 'I don't have a plan or anything. I just... sometimes I wish I could fall asleep and not wake up. It's not like I'd actually do anything.'\n\nThis is passive suicidal ideation without intent or plan. You need to complete a safety assessment — but do it in a way that feels like care, not interrogation. What do you assess and how?",
        },
        {
          quickReply: "I use the Columbia Protocol conversationally: ask directly about ideation frequency and intensity, any plan, means access, intent, and protective factors — framing each question as genuine curiosity about their wellbeing",
          aiResponse: "Direct questions about suicide don't plant ideas — research consistently confirms this. Your assessment reveals:\n- Ideation: passive, occurring 3-4x per week\n- No plan, no intent, no means access\n- Protective factors: family relationship, faith community, one close friend\n- Risk factors: academic pressure, social isolation, disrupted sleep\n\nBased on the Columbia Protocol, this is **low to moderate risk** — appropriate for outpatient continuation with a safety plan.\n\nNow the next critical step: creating a collaborative safety plan WITH the client, not FOR them. What does that safety plan include?",
        },
        {
          quickReply: "Warning signs they're declining, coping strategies they'll use first, people they can call, crisis resources (988), and agreement to return to session — all written and given to them",
          aiResponse: "That's a complete, collaborative safety plan — and the word 'collaborative' is everything. A safety plan the client helped write has far higher adherence than one handed to them.\n\n**Your clinical response demonstrated:**\n✅ Non-reactive, trust-preserving response\n✅ Direct safety assessment using validated protocol\n✅ Accurate risk stratification (low-moderate → appropriate outpatient)\n✅ Collaborative safety planning\n\n**Documentation:** Document the safety assessment, risk level, safety plan contents, and your clinical reasoning. This is your professional and legal protection.\n\n⚠️ **Always remember:** This AI is for training simulation only. In real practice, always consult your licensed clinical supervisor for any safety concern.\n\n⭐ Scenario complete.",
        },
      ],
    },
    {
      id: 'hum-motivational-interview',
      title: 'Motivational Interviewing Practice',
      icon: '💬',
      description: 'Help an ambivalent client move toward change',
      aiOpener: "You're working with a 35-year-old client referred by their doctor for alcohol use. They drink 6-8 drinks daily and the doctor is concerned. Your client opens the session: 'Look, I know my doctor sent me here, but I don't have a problem. I work, I pay my bills, I'm fine. I just like to unwind.' Using Motivational Interviewing — how do you start?",
      steps: [
        {
          quickReply: "I reflect their autonomy and use open questions: 'It sounds like you're doing well in a lot of areas. What brought you in today — beyond what the doctor suggested?'",
          aiResponse: "That's MI in its purest form — Resist the Righting Reflex. You didn't argue, lecture, or present statistics. You expressed curiosity about *their* motivation.\n\nThe client relaxes slightly: 'I guess... my wife has been saying things. And I've had a couple headaches in the mornings. But that's just dehydration.'\n\nChange talk is emerging: 'my wife has been saying things' and 'headaches.' These are the seeds of internal motivation. How do you draw them out without pushing?",
        },
        {
          quickReply: "I reflect the change talk and ask: 'It sounds like your wife's concern matters to you. On a scale of 0-10, how important is your relationship to you?' Then explore the gap between their drinking and that value.",
          aiResponse: "You've used the Values-Importance ruler — one of MI's most powerful tools. Connecting behavior to *their own* values (not yours) is the engine of lasting change.\n\nClient: '10. She's everything. But I don't think it's that bad...'\n\nAmbivalence is normal — they're weighing the benefits of drinking (stress relief, habit, pleasure) against the costs (marriage, health). The MI practitioner's job is not to resolve the ambivalence FOR them but to help them voice both sides.\n\nWhat MI technique helps the client hear their own arguments for change?",
        },
        {
          quickReply: "A decisional balance — I ask them to tell me the good things about drinking first, then the less good things — and I listen carefully to the change talk in the 'less good' side without jumping on it",
          aiResponse: "The decisional balance with selective reflection of change talk — that's advanced MI technique. By asking about benefits first, you avoid triggering resistance. And when they voice the costs themselves, it's infinitely more powerful than anything you could have told them.\n\nThe client ends the session: 'Maybe I should... think about cutting back a little. I don't know.'\n\nThat's ambivalence — but it's movement. A grain of internally-motivated change talk is worth a thousand brochures.\n\n**MI principles you applied:**\n✅ Express Empathy\n✅ Develop Discrepancy (values vs. behavior)\n✅ Roll with Resistance\n✅ Support Self-Efficacy\n\n*'You can't push a river.'* — MI principle\n\n⭐ Scenario complete.",
        },
      ],
    },
  ],

  // ── SCIENCES ─────────────────────────────────────────────────────────────────
  'proto-science': [
    {
      id: 'sci-research-design',
      title: 'Designing a Research Study',
      icon: '🔬',
      description: 'Build a rigorous, ethical research study from scratch',
      aiOpener: "You're a biology graduate student at GCU. You want to study whether microplastics in the local water supply affect the reproductive rates of freshwater fish — a question with real environmental and public health implications. You have lab access, a $5,000 budget, and 6 months. Where do you begin?",
      steps: [
        {
          quickReply: "I start with a specific, testable hypothesis: 'Freshwater fish exposed to microplastic concentrations matching Phoenix tap water levels will show reduced egg fertilization rates compared to a control group.'",
          aiResponse: "Excellent — you've written a falsifiable, measurable hypothesis. 'Falsifiable' is the key word: a hypothesis you can't possibly disprove isn't scientific.\n\nNow your methodology. You'll need:\n- Experimental group: fish exposed to measured microplastic concentrations\n- Control group: identical fish in filtered, microplastic-free water\n- Same species, same age, same feeding, same temperature — everything controlled except your independent variable\n\nBefore you touch a single fish: what ethical approval process do you need to complete, and why does it matter even for a 'small' student study?",
        },
        {
          quickReply: "I need IACUC approval (Institutional Animal Care and Use Committee) — it reviews animal welfare, the necessity of the research, and that we're using the minimum number of animals needed to get statistically valid results",
          aiResponse: "Exactly right — and the IACUC requirement embodies the GCU creation-care ethic: we are stewards, not owners, of the living things in our care. Even a study that could save ecosystems must minimize harm to the creatures studied.\n\nYour IACUC application is approved. 6 months later, your data shows: experimental group had 34% lower fertilization rates than control. P-value = 0.023.\n\nBefore you claim discovery — what statistical and interpretive cautions do you apply to this result?",
        },
        {
          quickReply: "P < 0.05 is significant, but I need to check statistical power, effect size, and confounding variables. I can't claim causation beyond this controlled setting — correlation in lab conditions requires replication before real-world claims",
          aiResponse: "That epistemic humility is the mark of a great scientist. You've resisted the temptation to overclaim — one of the most common errors in research communication.\n\n**Your study's honest conclusion:** 'Under controlled laboratory conditions, microplastic concentrations matching Phoenix municipal water levels were associated with a statistically significant reduction in fish egg fertilization rates (p=0.023). Further research is needed to confirm this finding under varied conditions and species.'\n\n**GCU Research Ethics Principles:**\n✅ IACUC compliance (animal welfare stewardship)\n✅ Control group and variable isolation\n✅ Statistical rigor (p-value + effect size)\n✅ Epistemic humility in claims\n\n*'The heavens declare the glory of God; the skies proclaim the work of his hands.'* — Psalm 19:1\n\n⭐ Scenario complete.",
        },
      ],
    },
    {
      id: 'sci-lab-safety',
      title: 'Lab Safety Incident Response',
      icon: '🧪',
      description: 'Handle a chemical exposure in the teaching lab',
      aiOpener: "You're supervising a high school chemistry lab. Students are working with dilute sulfuric acid (H₂SO₄, 1M solution). A student accidentally knocks over their beaker — the acid spills across the lab bench and splashes onto their forearm. The student yelps and starts shaking their arm. What do you do in the first 10 seconds?",
      steps: [
        {
          quickReply: "I call out calmly: 'Everyone stop and step back.' I immediately get the student to the eyewash/emergency shower — neutralization starts with large amounts of water, not trying to wipe it off.",
          aiResponse: "Perfect emergency response. Calling for order prevents panic and secondary injuries. Immediate water flush is the universal first response for most chemical exposures — you never try to neutralize an acid with another chemical on the skin, as the reaction can generate heat.\n\nThe student is at the shower. You start the 15-minute continuous flush. Another student is panicking. What do you do simultaneously?",
        },
        {
          quickReply: "I assign a responsible student to watch the clock for the 15-minute flush, call the school nurse immediately, send someone to the office, and keep talking calmly to the injured student while the flush continues",
          aiResponse: "You've just managed a multi-priority emergency with triage thinking — highest priority (patient care) + communications + crowd control simultaneously.\n\nAfter 15 minutes of flushing: the redness is fading and the student reports the burning is mostly gone. The school nurse arrives. The 1M H₂SO₄ is a relatively dilute solution — this appears to be a minor surface burn.\n\nClass is dismissed early. Now: what documentation and reporting steps do you take before tomorrow?",
        },
        {
          quickReply: "I complete an incident report documenting: time, chemical involved, concentration, exposure area, first aid given, nurse's assessment, parent notification. I review the SDS for H₂SO₄ to confirm we followed protocol. I also debrief with the class on what went right and what the SDS says.",
          aiResponse: "Comprehensive and excellent. That documentation protects you, the school, and — most importantly — creates a record that helps prevent the next incident.\n\n**The SDS (Safety Data Sheet) for 1M H₂SO₄ confirms:**\n- Immediate water flush (15+ min): ✅ You did this\n- Remove contaminated clothing: ✅ Should have been done if clothing was affected\n- Seek medical attention for severe burns: appropriate given this was mild\n\n**GCU Lab Safety Philosophy:** Every safety protocol exists because someone was hurt before it was written. Follow them as acts of stewardship and care.\n\n⭐ Scenario complete.",
        },
      ],
    },
  ],

  // ── THEOLOGY ─────────────────────────────────────────────────────────────────
  'proto-theology': [
    {
      id: 'theo-spiritual-doubt',
      title: 'Walking Through Doubt',
      icon: '✝️',
      description: 'Engage honestly with deep questions about faith and suffering',
      aiOpener: "A young adult in your church youth group — 19 years old, heading to college — comes to you after Sunday service. They say: 'I need to talk to someone honest. I've been having serious doubts. Like... I don't know if God is real anymore. My best friend died in a car accident 4 months ago. She was 18. She was the most faith-filled person I knew. How can I believe in a God who let that happen?' How do you respond?",
      steps: [
        {
          quickReply: "I don't offer quick answers. I sit with them and say: 'What happened to your friend is devastating. I'm so sorry. The questions you're asking are some of the most honest questions a person can ask — and they deserve honest answers, not easy ones.'",
          aiResponse: "You've just modeled the most important pastoral virtue: refusing to rush to answers when presence is what's needed. Grief requires witness before it can receive wisdom.\n\nThey continue: 'But I've been reading online and there are so many philosophers who say God can't exist if there's suffering. It actually makes sense to me right now. Is my faith just... falling apart?'\n\nThis is the problem of evil — theodicy — one of the oldest and deepest questions in Christian thought. How do you engage it honestly without dismissing their pain OR abandoning your faith?",
        },
        {
          quickReply: "I acknowledge the argument has real weight — and that the Bible itself engages it honestly. Job, Lamentations, Psalm 22 — Scripture doesn't give tidy answers, it gives honest lament and a God who enters suffering with us.",
          aiResponse: "That's mature, honest theology — and it's far more compelling to a doubting 19-year-old than a defensive answer. You're showing that Christianity has always taken suffering seriously, not explained it away.\n\nThey say: 'But why didn't God just stop it? If He's all-powerful...'\n\nThis is the classical problem of evil: omnipotence + omnibenevolence + the existence of evil seem logically incompatible. This deserves real engagement. How do you respond without either abandoning omnipotence or making God seem cruel?",
        },
        {
          quickReply: "I share the free will theodicy and the greater-good framework — but honestly acknowledge these are incomplete answers. I say: 'I believe God weeps over your friend's death too. The incarnation — God becoming human, suffering on a cross — tells us He didn't stay at a safe distance from pain.' Then I ask what they need right now: to keep wrestling, or to just grieve.",
          aiResponse: "That response demonstrates the theological wisdom and pastoral sensitivity of a mature faith companion:\n\n1. You engaged the intellectual question honestly\n2. You pointed to the incarnation — the most profound Christian answer to suffering\n3. You acknowledged incompleteness — theological humility is more convincing than false certainty\n4. You returned to the person's actual need: permission to grieve\n\n**GCU Theology Spirit:** *'Honest doubt and deep faith are not opposites — they are companions on the same journey.'*\n\nThey leave and say: 'This is the first conversation that didn't feel like someone trying to fix me.'\n\n*'Even though I walk through the darkest valley, I will fear no evil, for you are with me.'* — Psalm 23:4\n\n⭐ Scenario complete.",
        },
      ],
    },
    {
      id: 'theo-pastoral-care',
      title: 'Pastoral Care: Divorce & Shame',
      icon: '🕊️',
      description: 'Walk alongside someone experiencing divorce and spiritual shame',
      aiOpener: "A woman in her 40s — a long-time church member — calls you, the associate pastor. She's crying. Her husband has filed for divorce. She says: 'I feel like I've failed God. Like I'm going to be judged by the whole church. I don't even know if I can come back on Sunday.' How do you pastor her in this phone call?",
      steps: [
        {
          quickReply: "I listen without interrupting, then say: 'You haven't failed God. What you're going through is devastating — and I'm grateful you called. You belong in this church. Now tell me — are you safe and not alone right now?'",
          aiResponse: "You did three essential things: you immediately addressed the shame (you haven't failed God), you affirmed her belonging, and you assessed her safety — appropriate pastoral triage.\n\nShe confirms she's safe and has a sister with her. Then she asks: 'What does the church think about divorce? Am I... is this unforgivable?'\n\nThis is a theology question layered with deep shame. She needs both honest teaching and grace-centered application. How do you navigate this?",
        },
        {
          quickReply: "I'm honest: 'Scripture takes marriage seriously and so does our church. But it also shows a God who meets people in broken situations with mercy, not condemnation. Your worth before God is not determined by your marital status.'",
          aiResponse: "You've held both truth and grace in the same breath — which is exactly the pastoral balance GCU's theology curriculum calls 'grace-truth integration.' Neither cheap grace (it doesn't matter) nor crushing law (you've failed).\n\nShe asks: 'Will people treat me differently? Some of my closest friends are couples we were friends with together. I'm scared I'll be invisible now.'\n\nThis is a real social and ecclesial grief — divorced people often report sudden invisibility in churches designed for families. How do you as a pastor address this structurally?",
        },
        {
          quickReply: "I tell her directly: 'I will personally reach out to your small group leader this week. Our job is to make sure you are not invisible — that will not happen on our watch.' I also offer to check in weekly and connect her to our care team.",
          aiResponse: "You moved from pastoral presence to pastoral action — and that distinction matters. Care that stays in the conversation without institutional follow-through is incomplete.\n\n**What you modeled:**\n✅ Safety check\n✅ Grace before doctrine\n✅ Honest theological engagement without shame\n✅ Structural commitment: not leaving it to chance\n✅ Consistent relational presence\n\n**GCU Pastoral Principle:** *'The church should be the safest place in the world for a broken person.'*\n\nShe attends Sunday. She later tells you: *'You were the first person who made me feel like God wasn't done with me.'*\n\n⭐ Scenario complete.",
        },
      ],
    },
  ],

  // ── ARTS & MEDIA ─────────────────────────────────────────────────────────────
  'proto-arts': [
    {
      id: 'arts-brand-design',
      title: 'Brand Identity for a Nonprofit',
      icon: '🎨',
      description: 'Design a brand that communicates mission and trust',
      aiOpener: "A nonprofit called 'Hope Harbor' serves homeless youth ages 16-22 in Phoenix. They need a complete brand identity: logo, color palette, and tagline. Their values are: safety, dignity, hope, and practical support. They want to appeal to both the youth they serve (who need to feel welcomed, not pitied) AND the donors who fund them (who need to trust the organization). These are often opposite design instincts. Where do you start?",
      steps: [
        {
          quickReply: "I start with the audience tension: youth feel patronized by charity-style imagery (outstretched hands, sad faces), while donors often expect professional, serious aesthetics. The solution is a brand that leads with dignity and aspiration, not need.",
          aiResponse: "That insight is what separates a thoughtful designer from a technically skilled one. The biggest branding mistake nonprofits make is designing for the donor's pity rather than the beneficiary's dignity — and savvy donors increasingly see through it.\n\n**Your design direction:** aspirational, warm, and professional — communicating 'we see these young people as future contributors, not problems to be solved.'\n\nNow: color palette. What colors communicate safety, warmth, hope, AND professional trust — and what combinations should you specifically avoid for this audience?",
        },
        {
          quickReply: "Deep teal or sage green (stability, growth, safety) + warm amber or gold (hope, warmth) + clean white space. Avoid: heavy dark blues that feel corporate, reds that feel urgent/alarming, and pinks that feel patronizing for teenage boys.",
          aiResponse: "Excellent color psychology reasoning. Teal + amber is a powerful combination — the teal grounds the brand in stability (important for anxious youth seeking safety), while amber adds the warmth and hope that differentiates nonprofits from government agencies.\n\nNow the logo concept. The name is 'Hope Harbor' — water metaphor built in. How do you conceptualize a logo that doesn't fall into cliché (waves, anchors, lighthouses are oversaturated in nonprofit design) while still honoring the name?",
        },
        {
          quickReply: "I abstract the harbor concept: a simple geometric shape suggesting shelter or a doorway, rendered in the teal/amber palette, clean enough to work at favicon size. The 'H' letterforms could subtly suggest an open doorway or a protected space.",
          aiResponse: "That's sophisticated conceptual thinking — using letterform integration to encode meaning without illustration. The doorway/shelter reading reinforces 'harbor' while the abstraction keeps it modern and non-cliché.\n\n**Your complete brand system:**\n🎨 Colors: Deep teal (#1E6B6B) + Warm amber (#E8A830) + White\n✏️ Logo: Geometric 'H' suggesting open doorway/shelter\n🔤 Typography: Modern humanist sans-serif (warmth without formality)\n💬 Tagline option: *'A safe place to become.'*\n\n**GCU Creative Steward Principle:** Every design choice is a statement about how you see the people you serve. Make sure yours says: *I see your dignity and your potential.*\n\n⭐ Scenario complete.",
        },
      ],
    },
    {
      id: 'arts-ethical-media',
      title: 'Ethical Storytelling Decision',
      icon: '📸',
      description: 'Navigate representing vulnerable populations with dignity',
      aiOpener: "You're the communications director for a faith-based organization serving refugees. Your executive director wants a year-end fundraising video. She says: 'Get footage of the families — the sadder the better. Donors respond to suffering. Show crying children, difficult living situations. That's what raises money.' You have reservations. Walk me through your thinking.",
      steps: [
        {
          quickReply: "My reservation is that 'poverty porn' — imagery that exploits suffering for emotional manipulation — may raise money short-term but it dehumanizes the people we serve and erodes long-term trust. There's also a consent issue.",
          aiResponse: "You've named the core ethical tension perfectly: effectiveness vs. dignity. And you're right that research on 'poverty porn' shows it often backfires — donors disengage from organizations they perceive as exploitative, and the communities served feel violated, not helped.\n\nYour executive director responds: 'We need $200K by December 31st. I don't have time for a philosophy seminar. What's your alternative?'\n\nThis is the creative challenge: can you produce emotionally compelling content that raises the money AND honors the people? What's your counter-proposal?",
        },
        {
          quickReply: "I propose an asset-framing approach: show families with consent, in their own words, sharing what they're building — not just what they've survived. Show children laughing, mothers who are proud, fathers who are working. Show the transformation, not just the need.",
          aiResponse: "That's the Dignity-Based Storytelling model — increasingly the standard among leading NGOs like Oxfam and World Vision, who have publicly moved away from suffering-imagery after backlash.\n\n**The evidence supports you:** Asset-framed appeals that show strength and transformation actually perform *comparably* to suffering-based appeals — and generate higher second-year retention because donors feel proud of their investment, not just sympathetic.\n\nYour ED is still skeptical. She says: 'What if we just use stock footage that kind of looks like refugees — we don't have to show our actual clients then.'\n\nHow do you respond to this proposal?",
        },
        {
          quickReply: "I tell her this crosses an ethical line: using stock footage and implying it depicts our clients is deceptive to donors. It also violates our brand integrity. If discovered, it damages credibility permanently. We need to do this the right way — real people, real consent, real stories.",
          aiResponse: "That's the GCU Creative Steward in full — holding the ethical line even when the pragmatic pressure is significant.\n\n**The ethical layers you identified:**\n✅ Consent: real clients, real permission, real ownership of their story\n✅ Accuracy: donors are making decisions based on what we show them\n✅ Brand integrity: once deception is discovered, trust is gone\n✅ Dignity: we serve people made in the image of God — we do not use their images for our convenience\n\n**The outcome:** You produce a 3-minute video with two families, fully consented, sharing their stories of strength. It raises $187,000 — $13K short of target, but the organization's donor retention rate increases by 22% the following year.\n\n*'Art is not what you see, but what you make others see.'* — Edgar Degas\n\n⭐ Scenario complete.",
        },
      ],
    },
  ],

  // ── DOCTORAL ─────────────────────────────────────────────────────────────────
  'proto-doctoral': [
    {
      id: 'doc-dissertation-proposal',
      title: 'Refining Your Research Question',
      icon: '📚',
      description: 'Sharpen a dissertation topic into a defensible research question',
      aiOpener: "You're a doctoral student in Educational Leadership. Your passion is teacher burnout — you've been a principal and watched great teachers leave the profession. You want your dissertation to be 'about teacher burnout in Title I schools.' Your committee chair comes back: 'That's a topic, not a research question. You need to narrow it significantly.' Let's work through this together. What specifically about teacher burnout interests you most?",
      steps: [
        {
          quickReply: "I'm most interested in why some teachers in high-poverty schools stay for 10+ years while others leave in year 2 — what's the difference in their experience, support, or mindset?",
          aiResponse: "That's a genuinely interesting and understudied angle — you've shifted from 'why do teachers burn out' (widely studied) to 'what protects certain teachers from burnout' (less studied, more actionable).\n\nThis is called a **resilience framework** — studying what goes right rather than only what goes wrong.\n\nNow let's apply the PICO/PECO research question framework:\n- **Population:** Teachers in Title I schools\n- **Exposure/Experience:** Factors associated with long-term retention (10+ years)\n- **Comparison:** Teachers who left within 2-3 years\n- **Outcome:** What you'll measure\n\nWhat's your outcome variable — what will you actually *measure* to understand the resilience difference?",
        },
        {
          quickReply: "I want to measure perceived self-efficacy, sense of calling/purpose, and administrative support quality — comparing long-stayers vs. early-leavers in the same schools",
          aiResponse: "Excellent — you now have three clearly operationalizable variables. Let's check your methodology fit:\n\n**If you want to understand the *lived experience*** → Qualitative (phenomenological): interview both groups, let themes emerge\n\n**If you want to test whether these variables statistically predict retention** → Quantitative: survey instrument, regression analysis\n\n**If you want both depth and breadth** → Mixed methods: surveys first to find patterns, then interviews to explain them\n\nYour research question is shaping up as: *'What factors contribute to the sustained retention of teachers in Title I schools, as perceived by teachers with 10+ years of service compared to those who left within 3 years?'*\n\nWhich methodology best fits your epistemology and what you want to contribute to the field?",
        },
        {
          quickReply: "Mixed methods — I want the statistical patterns first to know where to focus the interviews, then the interviews to give voice to teachers' actual experiences",
          aiResponse: "Sequential explanatory mixed methods — you collect quantitative data first, analyze it, then use qualitative interviews to explain the findings. It's the most defensible approach for your question.\n\n**Your dissertation is now taking shape:**\n\n📌 **Research Question:** What factors predict long-term retention of teachers in Title I schools, and how do retained teachers describe those factors in their own words?\n\n🔬 **Design:** Sequential explanatory mixed methods\n📊 **Phase 1:** Survey (validated instruments for self-efficacy, calling, admin support)\n🎤 **Phase 2:** Interviews with selected survey respondents\n🎯 **Contribution:** A resilience model for Title I teacher retention — actionable for principals and district leaders\n\n**Your committee chair will be satisfied.** You've moved from a topic to a defensible, original research question with clear methodology.\n\n*'Research is formalized curiosity. It is poking and prying with a purpose.'* — Zora Neale Hurston\n\n⭐ Scenario complete.",
        },
      ],
    },
    {
      id: 'doc-defense-prep',
      title: 'Dissertation Defense Preparation',
      icon: '🎓',
      description: 'Prepare for the hardest questions your committee will ask',
      aiOpener: "Your dissertation defense is in 2 weeks. Your study examined servant-leadership practices in faith-based nonprofits using a qualitative case study design. Your committee has reviewed the document. Your chair tells you: 'Be ready — they're going to push hard on your methodology choices and the transferability of your findings.' Let's run a mock defense. I'll ask you the hardest question first: Why qualitative? Why not a quantitative survey with a larger sample?",
      steps: [
        {
          quickReply: "Because my research question asked 'how' and 'why' servant-leadership manifests in practice — that requires depth and context that a survey can't capture. My goal wasn't statistical generalization but transferable, thick description of a phenomenon.",
          aiResponse: "Strong answer — you've correctly identified the epistemological fit between your question and your design, and you used the term 'transferability' correctly (qualitative's equivalent to external validity).\n\nHere's the follow-up your committee will throw: *'Your sample is 3 organizations, 12 participants. How can you possibly claim any conclusions from such a small sample?'*",
        },
        {
          quickReply: "Qualitative credibility isn't about sample size — it's about depth, saturation, and rigor. I reached data saturation after 9 interviews, used member checking and thick description for credibility, and purposive sampling to ensure participants had direct knowledge of the phenomenon.",
          aiResponse: "Excellent — you've named four of Lincoln & Guba's trustworthiness criteria: credibility (member checking), transferability (thick description), and you've addressed the saturation question. That's the language your committee wants to hear.\n\nNow the hardest question of the defense — and the one most candidates stumble on:\n\n*'What are the limitations of your study, and what should future researchers do differently?'*\n\nMost candidates try to minimize limitations. What's the better approach?",
        },
        {
          quickReply: "Own them fully and confidently — my limitations are single researcher bias (addressed via reflexivity journaling and member checking), organizational self-selection (participating orgs may be higher-performing), and geographic/cultural specificity. Future research should replicate with diverse geographies, add quantitative measures of servant-leadership outcomes, and conduct longitudinal studies.",
          aiResponse: "That is a masterclass in limitations response. You've just demonstrated what separates a doctoral scholar from a defensive student:\n\n**What you did right:**\n✅ Named the limitations before your committee could: shows awareness\n✅ Connected each limitation to the mitigation you already built in\n✅ Proposed specific, actionable future research directions\n✅ Tone of confidence, not apology\n\n**The Golden Rule of the Defense:** Your committee already knows the limitations. They want to see if *you* know them. Confidence in discussing weakness is a sign of scholarly maturity.\n\n**Final coaching:** Walk in knowing that you are the world's expert on this specific study. No one in that room knows your data better than you do. Own the space.\n\n⭐ Mock defense complete. You're ready.",
        },
      ],
    },
  ],

  // ── HONORS ───────────────────────────────────────────────────────────────────
  'proto-honors': [
    {
      id: 'honors-thesis-development',
      title: 'Developing Your Honors Thesis',
      icon: '⭐',
      description: 'Turn a big interest into an original scholarly contribution',
      aiOpener: "You're an Honors student with a 3.97 GPA in computer science and philosophy. You're fascinated by AI ethics — specifically whether AI systems can ever be truly unbiased. You tell your honors advisor you want to write your thesis on 'AI bias.' Your advisor challenges you: 'Every undergraduate in the country is writing about AI bias. What's YOUR unique angle? What can you contribute that no one else can?' Let's find out.",
      steps: [
        {
          quickReply: "My unique angle might be the philosophical question: is 'unbiased AI' even conceptually coherent? If all data encodes human choices, then 'bias-free' might be a category error — a meaningless standard.",
          aiResponse: "Now THAT is an honors-level thesis question. You've moved from a policy question ('how do we reduce AI bias?') to a *conceptual* question ('is the goal coherent?') — which is a genuinely original philosophical contribution.\n\nThis is an analytical philosophy approach — you're not doing a survey or an experiment, you're doing conceptual analysis and argumentation.\n\nLet me push you further: If 'unbiased AI' is a category error, what does that imply for AI ethics policy? Are you arguing we should abandon the concept entirely, or redefine it? And what *would* a defensible standard for AI fairness look like?",
        },
        {
          quickReply: "I'm arguing we should replace 'unbiased' with 'explicitly-values-encoded' — transparent AI that declares its values rather than claiming to have none. The standard shifts from absence of bias to transparency about whose values are embedded and why.",
          aiResponse: "That's a genuinely novel thesis argument — and it has real implications for AI policy, regulation, and corporate AI governance. You've just created what philosophers call a 'conceptual intervention.'\n\nLet me test your argument with the strongest objection:\n\n*'If we admit all AI is values-laden, aren't we just giving corporations and governments permission to build AI that favors their interests? At least the fiction of neutrality created some accountability pressure.'*\n\nHow do you defend your position against this objection?",
        },
        {
          quickReply: "The fiction of neutrality actually provides LESS accountability, not more — it hides whose values are embedded and immunizes the system from critique. Explicit values-encoding forces transparency: whose values? chosen how? accountable to whom? That's a more rigorous accountability framework, not a weaker one.",
          aiResponse: "You just handled the strongest objection to your thesis with a counter-argument that strengthens rather than concedes your position. That's advanced philosophical argumentation.\n\n**Your thesis is now fully formed:**\n\n📌 **Title:** *'Unbiased AI as Category Error: Toward a Transparency-Based Framework for Algorithmic Fairness'*\n\n**Argument structure:**\n1. 'Unbiased AI' is conceptually incoherent (all data encodes choices)\n2. The neutrality fiction creates false accountability\n3. 'Explicitly values-encoded AI' with transparency requirements is the defensible alternative\n4. Application: what this framework means for AI regulation policy\n\n**This thesis will be cited.** This is the quality of thinking that creates careers.\n\n*'The measure of intelligence is the ability to change.'* — Einstein\n\n⭐ Scenario complete. Go write this thesis.",
        },
      ],
    },
    {
      id: 'honors-leadership-challenge',
      title: 'Leading Through Division',
      icon: '🤝',
      description: 'Navigate a deeply divided team as a servant-leader',
      aiOpener: "You're the president of GCU's Honors Student Council. You've proposed a major service initiative — partnering with a local immigration legal aid organization to host a free legal clinic on campus. Half your council is enthusiastic. The other half is concerned: 'This is politically divisive. We'll alienate half the student body. We should stay neutral on anything political.' Your vote is scheduled for next week. How do you lead this council?",
      steps: [
        {
          quickReply: "Before the vote, I host a listening session where each side presents their core concern — not their position — and I reflect back what I'm hearing without taking sides yet.",
          aiResponse: "That's classic adaptive leadership — separating the people from the problem, and getting to interests rather than positions. You've bought yourself information and bought the council goodwill.\n\nAt the listening session, the underlying interests emerge:\n- Pro-clinic: 'This is concrete community service with legal, verifiable need. This is exactly what honors students should do.'\n- Anti-clinic: 'We don't have a mandate to wade into immigration policy. What if our sponsors pull funding? What if it fractures our membership?'\n\nThe real tension: **mission vs. risk**. Both sides care about the organization. How do you design a proposal that addresses the risk concerns without abandoning the service mission?",
        },
        {
          quickReply: "I redesign the proposal: partner with the law school (adds academic legitimacy), make it a legal literacy clinic rather than immigration-specific (broader scope, less polarizing framing), get administration endorsement first, and sunset after one event to evaluate before committing long-term.",
          aiResponse: "That's servant-leadership architecture — you've redesigned the decision itself to reduce risk while preserving the mission. Each modification directly addresses a stated concern:\n- Law school partnership → academic legitimacy, reduces 'political' framing\n- Broader scope → less polarizing, larger student benefit\n- Admin endorsement → sponsor/institutional risk reduced\n- Sunset clause → risk-averse members can support 'one event' even if they'd oppose a permanent program\n\nThe vote happens. It passes 7-3 instead of the predicted 5-5. One of the initially opposed members says: 'I could support this version because you actually listened to us.'\n\nWhat does this teach you about the difference between winning a vote and building a team?",
        },
        {
          quickReply: "Winning a vote means having 5 people go along. Building a team means 7 people genuinely supporting something — because they felt heard, their concerns shaped the outcome, and they trust the process even when they disagree.",
          aiResponse: "That insight is the entire curriculum of servant-leadership compressed into three sentences.\n\n**Robert Greenleaf's test of servant-leadership:** *'Do those served grow as persons? Do they, while being served, become healthier, wiser, freer, more autonomous, more likely themselves to become servants?'*\n\nYou didn't just get your initiative passed — you:\n✅ Taught your council a conflict model they'll use for the rest of their lives\n✅ Converted three opponents into constructive shapers of the outcome\n✅ Built institutional trust that will outlast your term\n✅ Demonstrated that values-based decisions and practical wisdom aren't opposites\n\n**This is what GCU's Honors program exists to produce:** leaders who make the room better, not just outcomes happen.\n\n⭐ Scenario complete.",
        },
      ],
    },
  ],
};
