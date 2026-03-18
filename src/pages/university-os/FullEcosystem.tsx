import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2, Cpu, Heart, GraduationCap, TrendingUp,
  ChevronDown, ChevronRight, ArrowRight, Bot, Users,
  Megaphone, BookOpen, UserCheck, DollarSign, Shield,
  Wrench, Library, Globe, Scale, BarChart3, Star,
  Layers, Zap, CheckCircle2, Activity, Sparkles,
  FlaskConical, Code2, Rocket, Package
} from 'lucide-react';

// ─── Layer definitions ─────────────────────────────────────────────────────

const LAYERS = [
  {
    id: 'ops',
    number: '01',
    title: 'Institutional Operations Layer',
    subtitle: 'University OS',
    tagline: '30–50 humans run the entire university back-office',
    icon: Building2,
    color: 'purple',
    gradient: 'from-gcu-purple to-[#2D1B55]',
    border: 'border-gcu-purple/30',
    badge: 'bg-gcu-purple-pale dark:bg-gcu-purple/20 text-gcu-purple dark:text-purple-300',
    description: 'Every administrative function — HR, finance, legal, facilities, IT, admissions, marketing — handled by 1 human per department managing a team of specialized AI agents.',
    products: ['University OS', 'Command Center', '13 Department Consoles'],
    route: '/university-os',
  },
  {
    id: 'platform',
    number: '02',
    title: 'Platform Layer',
    subtitle: 'MoltALP Outpost / Campus OS',
    tagline: 'The operating system faculty and staff see every day',
    icon: Cpu,
    color: 'blue',
    gradient: 'from-blue-700 to-blue-900',
    border: 'border-blue-300/30',
    badge: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300',
    description: 'The institutional portal connecting all departments, faculty tools, advising systems, and student services into one coherent operating environment.',
    products: ['Imago OS', 'TeachOS', 'Forge', 'Beacon AI', 'Lumen', 'PAIge Breaker'],
    route: '/molted/outpost',
  },
  {
    id: 'character',
    number: '03',
    title: 'AI Character Layer',
    subtitle: 'GCU Flourish Spirit Vessels',
    tagline: '50 years of GCU character embedded in every agent',
    icon: Heart,
    color: 'pink',
    gradient: 'from-pink-600 to-rose-800',
    border: 'border-pink-300/30',
    badge: 'bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300',
    description: 'The "soul layer" — Christ-centered character, ethical guardrails, and compassionate communication built into every AI agent across every layer of the system.',
    products: ['Spirit Nurse', 'Spirit Teacher', 'Spirit Advisor', 'Spirit Chaplain', 'Spirit Business Advisor', '+ 5 more'],
    route: '/library',
  },
  {
    id: 'student',
    number: '04',
    title: 'Student-Facing Layer',
    subtitle: 'MoltALP Learning Products',
    tagline: 'Personalized AI for every student, every step',
    icon: GraduationCap,
    color: 'amber',
    gradient: 'from-amber-500 to-orange-700',
    border: 'border-amber-300/30',
    badge: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300',
    description: 'The tools students interact with directly — learning paths, tutoring, retention support, career coaching, and assessment — all powered by Spirit-infused AI.',
    products: ['Pathway AI', 'Mastery AI', 'RetainAI', 'ProofAI', 'OutcomesAI', 'Course Architect'],
    route: '/molted/pathway-ai',
  },
  {
    id: 'commercial',
    number: '05',
    title: 'Commercialization Layer',
    subtitle: 'Flourish API & Standard',
    tagline: 'License the model. Set the global standard.',
    icon: TrendingUp,
    color: 'emerald',
    gradient: 'from-emerald-600 to-teal-800',
    border: 'border-emerald-300/30',
    badge: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300',
    description: 'GCU licenses its soul layer, ethical framework, and University OS model to other institutions, healthcare systems, and organizations worldwide.',
    products: ['Flourish API', 'Flourish Standard', 'Flourish Robotics', 'Impact Tracker'],
    route: '/flourish-api',
  },
];

// ─── Detailed department data ───────────────────────────────────────────────

const DEPT_DETAIL = [
  {
    id: 'admissions',
    emoji: '🎓',
    name: 'Admissions & Enrollment',
    humanTitle: 'Director of Enrollment Strategy',
    humanName: 'Tyler Brooks',
    humanRole: 'Sets enrollment targets, approves scholarship packages, manages partner relationships, interprets policy edge cases, and ensures brand voice is maintained across all prospective student touchpoints.',
    color: 'blue',
    agents: [
      {
        name: 'Enrollment Concierge AI',
        handles: 'Every prospective student inquiry 24/7',
        detail: 'Answers questions about programs, tuition, deadlines, and campus life. Remembers every prior conversation. Sends personalized follow-ups at optimal times. Handles 800+ daily interactions with zero dropped conversations.',
        volume: '800+ inquiries/day',
      },
      {
        name: 'Application Review AI',
        handles: 'Complete application processing pipeline',
        detail: 'Checks completeness, scores applications against admission rubrics, flags unusual cases for human review, generates decision letters, and maintains the audit trail for each decision. Reduces review time from days to minutes.',
        volume: '300+ apps/day',
      },
      {
        name: 'Scholarship Match AI',
        handles: 'Scholarship identification and packaging',
        detail: 'Analyzes each applicant\'s profile against all available scholarship criteria, builds optimized aid packages, and proactively surfaces match opportunities that humans often miss. Increased scholarship awards by 34%.',
        volume: '200+ matches/day',
      },
      {
        name: 'Virtual Tour AI',
        handles: 'Immersive campus tour experiences',
        detail: 'Guides prospective students through personalized virtual campus tours based on their stated interests. Answers real-time questions during the tour. Connects tour content to relevant programs. Available in 6 languages.',
        volume: '175+ tours/day',
      },
      {
        name: 'CRM & Nurture AI',
        handles: 'Lead nurturing and yield campaign execution',
        detail: 'Manages the entire prospective student journey from first inquiry to enrollment confirmation. Sends personalized email sequences, triggers timely text messages, and adjusts nurture paths based on engagement signals.',
        volume: '5,000+ contacts managed',
      },
    ],
    savings: '$420K/yr · replaces 14 FTEs',
  },
  {
    id: 'marketing',
    emoji: '📣',
    name: 'Marketing & Brand',
    humanTitle: 'VP of Marketing & Communications',
    humanName: 'Amara Diallo',
    humanRole: 'Owns brand standards, approves major campaigns, sets messaging strategy, manages agency relationships, makes final calls on crisis communications, and represents the institution externally.',
    color: 'pink',
    agents: [
      {
        name: 'Content Creator AI',
        handles: 'All written content production',
        detail: 'Writes blog posts, social media content, email campaigns, ad copy, press releases, and website copy — all in GCU\'s brand voice. Produces a week\'s worth of content in an hour. Human lead reviews and approves.',
        volume: '60+ pieces/day',
      },
      {
        name: 'Campaign Manager AI',
        handles: 'Digital advertising and campaign optimization',
        detail: 'Manages Google Ads, Meta, LinkedIn, and programmatic campaigns. Runs A/B tests automatically, reallocates budget to top performers, generates ROAS reports, and flags anomalies for human review.',
        volume: '$2M+ ad spend managed',
      },
      {
        name: 'Social Listening AI',
        handles: 'Brand monitoring and social engagement',
        detail: 'Monitors all brand mentions across every platform in real time. Tracks sentiment, identifies emerging narratives, drafts responses for human approval on sensitive topics, and directly responds to routine comments and questions.',
        volume: '1,200+ mentions monitored/day',
      },
      {
        name: 'SEO & Analytics AI',
        handles: 'Organic search strategy and web analytics',
        detail: 'Tracks keyword rankings, identifies content gaps, monitors competitor movements, generates weekly SEO reports, and flags pages needing updates. Increased organic traffic 340% in 6 months.',
        volume: '500+ keywords tracked',
      },
    ],
    savings: '$380K/yr · replaces 12 FTEs',
  },
  {
    id: 'academic-affairs',
    emoji: '📚',
    name: 'Academic Affairs',
    humanTitle: 'Provost Support Officer',
    humanName: 'Marcus Williams',
    humanRole: 'Advises the Provost on academic policy decisions, chairs curriculum committees, resolves faculty disputes, interprets accreditation requirements, and signs off on all curriculum changes before they go live.',
    color: 'purple',
    agents: [
      {
        name: 'Curriculum Designer AI',
        handles: 'Course design, revision, and benchmarking',
        detail: 'Drafts new course syllabi based on learning outcomes, revises existing courses to address assessment gaps, benchmarks curriculum against peer institutions and industry standards, and ensures accessibility compliance.',
        volume: '50+ course reviews/week',
      },
      {
        name: 'Schedule Builder AI',
        handles: 'Master course schedule optimization',
        detail: 'Builds the entire academic schedule by solving room constraints, faculty availability, student demand patterns, and accreditation requirements simultaneously. Reduced scheduling from 3 weeks to 4 hours.',
        volume: 'All 1,200+ sections per term',
      },
      {
        name: 'Assessment AI',
        handles: 'Learning assessment design and analysis',
        detail: 'Designs assessments aligned to course learning outcomes, creates rubrics, analyzes assessment data to identify where students are struggling, and surfaces recommendations for curriculum revision to the human lead.',
        volume: '90+ assessments/week',
      },
      {
        name: 'Accreditation AI',
        handles: 'SACSCOC, HLC, and program-specific compliance',
        detail: 'Tracks all accreditation requirements across every program, maintains documentation, surfaces compliance gaps months before deadlines, and drafts accreditation reports. Self-study that took 6 months now takes 3 weeks.',
        volume: 'Continuous monitoring',
      },
      {
        name: 'Faculty Coordinator AI',
        handles: 'Faculty workload and committee management',
        detail: 'Tracks faculty load across teaching, research, and service. Identifies imbalances, surfaces scheduling conflicts, coordinates committee assignments, and sends reminders for deadlines. Frees faculty from administrative friction.',
        volume: '400+ faculty tracked',
      },
    ],
    savings: '$510K/yr · replaces 17 FTEs',
  },
  {
    id: 'student-success',
    emoji: '💛',
    name: 'Student Success & Services',
    humanTitle: 'Dean of Students Support Officer',
    humanName: 'Dr. Lisa Park',
    humanRole: 'Makes all high-stakes student decisions — dismissal appeals, crisis interventions, ADA accommodations requiring judgment, Title IX matters, and any situation where a student\'s wellbeing requires human presence and authority.',
    color: 'amber',
    agents: [
      {
        name: 'Academic Advisor AI',
        handles: 'Degree planning and proactive advising for all students',
        detail: 'Every student gets a personalized advisor AI that knows their full academic history, degree requirements, and career goals. Proactively flags students falling behind, schedules check-ins, and builds optimized degree plans. 1 AI advisor per student — not 1 human per 400.',
        volume: '1,800+ advising sessions/day',
      },
      {
        name: 'Financial Aid AI',
        handles: 'FAFSA guidance, aid packaging, and appeals support',
        detail: 'Walks students through FAFSA step by step, explains their aid package in plain language, identifies additional scholarship opportunities, and helps prepare appeal documentation. Response time: 2 minutes vs. 2-week email queues.',
        volume: '400+ aid questions/day',
      },
      {
        name: 'Mental Health Triage AI',
        handles: 'First-response emotional support and crisis escalation',
        detail: 'Provides immediate compassionate support for students expressing distress. Uses clinical screening frameworks to assess severity. Connects students to resources. Escalates crisis situations to a licensed counselor within 90 seconds — not days.',
        volume: '90+ check-ins/day · 3-tier protocol',
      },
      {
        name: 'Career Coach AI',
        handles: 'Resume review, interview prep, and job matching',
        detail: 'Reviews resumes and cover letters with specific, actionable feedback. Conducts mock interviews and provides detailed coaching. Matches students to job postings based on skills and goals. Tracks placement outcomes for institutional reporting.',
        volume: '280+ coaching sessions/day',
      },
      {
        name: 'Housing & Dining AI',
        handles: 'Housing applications, room changes, and dining issues',
        detail: 'Manages the entire housing lifecycle — applications, roommate matching, room change requests, maintenance issues, and dining account questions. Resolves 94% of issues without escalation. Available 24/7 for urgent situations.',
        volume: '165+ requests/day',
      },
      {
        name: 'Registrar AI',
        handles: 'Transcripts, enrollment verification, and grade corrections',
        detail: 'Processes transcript requests, issues enrollment verification letters, manages grade correction requests, handles enrollment holds, and manages the entire graduation audit process. Same-day processing vs. 5-10 business day wait.',
        volume: '330+ requests/day',
      },
    ],
    savings: '$680K/yr · replaces 23 FTEs',
  },
  {
    id: 'faculty-development',
    emoji: '⭐',
    name: 'Faculty Development',
    humanTitle: 'Chief Learning Officer Support',
    humanName: 'Dr. Angela Moore',
    humanRole: 'Designs the overall faculty development strategy, facilitates high-stakes performance conversations, manages promotion and tenure review coordination, and builds the institutional learning culture.',
    color: 'yellow',
    agents: [
      {
        name: 'PD Coach AI',
        handles: 'Personalized professional development for every faculty member',
        detail: 'Builds a unique professional development pathway for each faculty member based on their role, goals, student feedback, and peer observation data. Nudges completion of key milestones, tracks progress, and surfaces new learning opportunities.',
        volume: '400 faculty · personalized weekly',
      },
      {
        name: 'Instructional Design AI',
        handles: 'Course build support and accessibility auditing',
        detail: 'Partners with faculty to improve course design — reviewing alignment between outcomes, activities, and assessments. Audits all courses for ADA/WCAG compliance and surfaces specific fixes. Reduces course build time by 60%.',
        volume: '80+ course support sessions/week',
      },
      {
        name: 'Peer Review AI',
        handles: 'Blind peer observation cycle facilitation',
        detail: 'Manages the entire peer review cycle — scheduling observations, collecting structured feedback, anonymizing identities, aggregating themes, and preparing reports for faculty and department chairs. Removes human bias from scheduling.',
        volume: 'All 400 faculty annually',
      },
      {
        name: 'Research Support AI',
        handles: 'Grant writing assistance and IRB prep',
        detail: 'Identifies grant opportunities matching each faculty member\'s research interests, drafts narrative sections for federal and foundation grants, helps prepare IRB applications, and tracks submission deadlines. Grant submission rate up 4x.',
        volume: '55+ research support requests/week',
      },
    ],
    savings: '$290K/yr · replaces 10 FTEs',
  },
  {
    id: 'hr',
    emoji: '🤝',
    name: 'Human Resources',
    humanTitle: 'Chief People Officer',
    humanName: 'James Okonkwo',
    humanRole: 'Makes all hiring decisions, handles terminations and serious disciplinary matters, sets compensation strategy, navigates complex employee relations situations, and stewards the institutional culture.',
    color: 'green',
    agents: [
      {
        name: 'Talent Scout AI',
        handles: 'End-to-end recruiting pipeline',
        detail: 'Posts all open positions across 40+ job boards simultaneously, screens incoming applications against defined criteria, ranks candidates, schedules interviews, and manages the entire candidate communication pipeline. Time-to-fill reduced from 45 to 18 days.',
        volume: '230+ applications screened/day',
      },
      {
        name: 'Onboarding AI',
        handles: 'New employee setup and first-90-days experience',
        detail: 'Manages the entire onboarding journey — paperwork, system access provisioning, benefits enrollment guidance, policy acknowledgments, role-specific training sequences, and 30/60/90 day check-ins. Onboarding time: 2 days vs. 2 weeks.',
        volume: 'Every new hire · day 1 through day 90',
      },
      {
        name: 'Benefits Concierge AI',
        handles: '24/7 benefits education and enrollment support',
        detail: 'Explains health, dental, vision, 403b, FSA, and all other benefits in plain language. Guides employees through open enrollment. Answers "what does my insurance cover?" questions instantly. Reduces HR phone calls by 78%.',
        volume: '190+ benefits questions/day',
      },
      {
        name: 'Compliance Training AI',
        handles: 'Mandatory training delivery and completion tracking',
        detail: 'Delivers all required training — FERPA, Title IX, harassment prevention, safety, and IT security — through engaging formats. Tracks completion, sends reminders, generates compliance reports for leadership, and updates content as regulations change.',
        volume: '1,200 employees · continuous',
      },
      {
        name: 'Employee Relations AI',
        handles: 'Conflict first-response and policy guidance',
        detail: 'Handles initial employee concerns — policy lookup, documentation of issues, initial conversation frameworks, and referral routing. Resolves 65% of concerns without human escalation. For the other 35%, provides the CPO with full context before they engage.',
        volume: '35+ ER inquiries/day',
      },
    ],
    savings: '$450K/yr · replaces 15 FTEs',
  },
  {
    id: 'finance',
    emoji: '💰',
    name: 'Finance & Budget',
    humanTitle: 'CFO Support Officer',
    humanName: 'Priya Sharma',
    humanRole: 'Owns all financial strategy decisions, signs financial statements, approves exceptions to policy, manages banking and investment relationships, and presents financial health to the board.',
    color: 'emerald',
    agents: [
      {
        name: 'Budget Analyst AI',
        handles: 'Real-time budget monitoring for all 13 departments',
        detail: 'Tracks every department\'s actual spend vs. budget in real time. Alerts human leads when approaching thresholds, identifies unusual patterns, forecasts end-of-year positions, and generates variance narratives for monthly reports.',
        volume: '13 depts · continuous monitoring',
      },
      {
        name: 'Accounts Payable AI',
        handles: 'Full invoice processing pipeline',
        detail: 'Receives invoices by email or portal, extracts data, matches to purchase orders, routes for approval at the right dollar threshold, processes payments on schedule, and maintains the vendor master file. Zero invoices lost in 6 months.',
        volume: '340+ invoices/day',
      },
      {
        name: 'Financial Reporting AI',
        handles: 'All management and regulatory reporting',
        detail: 'Produces the monthly financial package, department-level dashboards, board financial reports, Form 990 data packages, and DOE financial responsibility reports. Month-end close reduced from 10 days to 1.5 days.',
        volume: '22+ reports/month',
      },
      {
        name: 'Audit Prep AI',
        handles: 'External audit documentation and evidence management',
        detail: 'Organizes all documentation requested by external auditors, matches evidence to control objectives, tracks PBC (prepared by client) list completion, and flags gaps weeks before auditors arrive. Audit prep time cut by 70%.',
        volume: 'Continuous audit-readiness',
      },
    ],
    savings: '$520K/yr · replaces 17 FTEs',
  },
  {
    id: 'it',
    emoji: '💻',
    name: 'IT & Digital Infrastructure',
    humanTitle: 'CTO Support Officer',
    humanName: 'Nathan Cruz',
    humanRole: 'Makes all technology architecture decisions, responds to security incidents requiring human judgment, manages vendor contracts, approves system changes, and owns the institution\'s technology roadmap.',
    color: 'cyan',
    agents: [
      {
        name: 'Help Desk AI',
        handles: 'All Tier 1 and Tier 2 IT support',
        detail: 'Resolves password resets, software installation, VPN issues, email configuration, printer problems, account unlocks, and access requests — all without human involvement. Handles 97% of all tickets. Average resolution: 47 seconds.',
        volume: '1,250+ tickets/day',
      },
      {
        name: 'Security Monitor AI',
        handles: 'Continuous cybersecurity monitoring and incident detection',
        detail: 'Analyzes all network traffic, login events, and system logs for anomalies in real time. Correlates events across systems to identify attack patterns. Automatically blocks known threats. Surfaces novel threats for human review within minutes, not days.',
        volume: '8,400+ security events/day',
      },
      {
        name: 'Systems Admin AI',
        handles: 'User provisioning, access management, and patch tracking',
        detail: 'Creates accounts for new employees and students, manages permission changes, deprovisions leavers on their last day, tracks software license utilization, and maintains the patch status of all systems. Provisioning time: 4 minutes vs. 2 days.',
        volume: '310+ provisioning events/day',
      },
      {
        name: 'Data Steward AI',
        handles: 'Data quality, FERPA governance, and reporting pipelines',
        detail: 'Monitors data quality across all institutional systems, flags data integrity issues, enforces FERPA data-sharing rules, manages data request fulfillment, and maintains reporting pipelines for institutional research and accreditation.',
        volume: 'All institutional data systems',
      },
    ],
    savings: '$590K/yr · replaces 20 FTEs',
  },
  {
    id: 'facilities',
    emoji: '🏗️',
    name: 'Facilities & Operations',
    humanTitle: 'Director of Facilities',
    humanName: 'David Nakamura',
    humanRole: 'Makes capital project decisions, manages construction relationships, handles emergency situations requiring physical presence, negotiates major vendor contracts, and maintains campus safety standards.',
    color: 'orange',
    agents: [
      {
        name: 'Maintenance AI',
        handles: 'Work order creation, dispatch, and SLA tracking',
        detail: 'Receives maintenance requests from students, faculty, and staff via any channel (web, text, email, phone transcription). Creates work orders, assigns to the right technician based on skill and location, tracks completion, and closes tickets. Work order backlog eliminated in 60 days.',
        volume: '178+ work orders/day',
      },
      {
        name: 'Space Scheduler AI',
        handles: 'Room reservations and utilization optimization',
        detail: 'Manages all room reservation requests across campus — classrooms, conference rooms, event spaces, and recreational facilities. Resolves conflicts, identifies underutilized spaces, and generates utilization reports that informed a 34% improvement in space efficiency.',
        volume: '234+ reservations/day',
      },
      {
        name: 'Vendor Manager AI',
        handles: 'Facilities vendor lifecycle management',
        detail: 'Tracks all facilities vendor contracts, renewal dates, and performance metrics. Sends renewal alerts 90 days out, compiles performance documentation, matches invoices to work completed, and drafts vendor performance reviews.',
        volume: '44+ vendor interactions/day',
      },
    ],
    savings: '$310K/yr · replaces 10 FTEs',
  },
  {
    id: 'research-library',
    emoji: '🔬',
    name: 'Research & Library',
    humanTitle: 'Dean of Research Support',
    humanName: 'Dr. Ahmed Hassan',
    humanRole: 'Oversees research ethics (IRB), manages relationships with major grant funders, resolves complex intellectual property questions, and sets the institution\'s research strategic priorities.',
    color: 'indigo',
    agents: [
      {
        name: 'Research Navigator AI',
        handles: 'Database searching, citation, and literature reviews',
        detail: 'Every student and faculty member has a 24/7 research librarian. Searches all major databases, manages citation libraries, conducts systematic literature reviews, and identifies seminal works in any field — in minutes instead of hours.',
        volume: '312+ research sessions/day',
      },
      {
        name: 'Library Concierge AI',
        handles: 'Resource access and interlibrary loan management',
        detail: 'Handles all resource requests — physical book holds, e-reserve setup, interlibrary loan requests, copyright clearance questions, and course pack assistance. Processes requests same-day vs. 3-5 business days.',
        volume: '187+ resource requests/day',
      },
      {
        name: 'Grant Writer AI',
        handles: 'Federal and foundation grant development support',
        detail: 'Identifies funding opportunities matching faculty research profiles, drafts narrative sections for NSF, NIH, and major foundation grants, aligns proposals to funder priorities, and tracks submission deadlines. Faculty grant submission rate up 4x since deployment.',
        volume: '28+ grant support sessions/week',
      },
    ],
    savings: '$260K/yr · replaces 9 FTEs',
  },
  {
    id: 'alumni',
    emoji: '🌍',
    name: 'Alumni & Development',
    humanTitle: 'VP of Development',
    humanName: 'Sofia Petrov',
    humanRole: 'Personally cultivates all major gift relationships ($100K+), makes strategic decisions on naming opportunities, represents the institution at donor events, and stewards board-level donor relationships.',
    color: 'violet',
    agents: [
      {
        name: 'Alumni Engagement AI',
        handles: 'Mass alumni relationship management',
        detail: 'Maintains a personalized relationship with every alum — birthdays, life milestones, career updates, reunion invites, and news from their college. Sends communications that feel personal because they are personalized. Alumni engagement up 210%.',
        volume: '2,847+ alumni interactions/day',
      },
      {
        name: 'Donor Relations AI',
        handles: 'Major gift cultivation pipeline (below $100K)',
        detail: 'Identifies donors with major gift potential, drafts personalized cultivation plans, writes stewardship reports showing impact of past gifts, and prepares the VP for high-stakes meetings with full donor history and recommended asks.',
        volume: '184+ donor interactions/day',
      },
      {
        name: 'Annual Fund AI',
        handles: 'Annual giving campaigns and lapsed donor re-engagement',
        detail: 'Runs all annual fund campaigns — identifying segments, personalizing outreach, managing telefund script personalization, tracking results in real time, and running re-engagement sequences for lapsed donors. Annual fund raised $3.2M with 1 human officer.',
        volume: '1,200+ outreach actions/day',
      },
      {
        name: 'Events AI',
        handles: 'Event logistics, registration, and post-event follow-up',
        detail: 'Manages the full event lifecycle — invitations, registration, reminders, day-of communications, logistics coordination with facilities, and post-event surveys and impact reports. Handles 50+ events per year with no dedicated events staff.',
        volume: '312+ event actions/day',
      },
    ],
    savings: '$370K/yr · replaces 12 FTEs',
  },
  {
    id: 'legal',
    emoji: '⚖️',
    name: 'Legal & Compliance',
    humanTitle: 'General Counsel Support Officer',
    humanName: 'Rachel Kim',
    humanRole: 'Handles all legal matters requiring attorney judgment, responds to litigation and regulatory inquiries, makes final calls on policy interpretation, and manages outside counsel relationships.',
    color: 'slate',
    agents: [
      {
        name: 'Policy AI',
        handles: 'Institutional policy lifecycle management',
        detail: 'Drafts new policies and revises existing ones based on regulatory changes, accreditation requirements, and institutional needs. Maintains a current policy handbook automatically. Routes policies for stakeholder review and tracks approval status.',
        volume: '34+ policy actions/day',
      },
      {
        name: 'Privacy & FERPA AI',
        handles: 'Student privacy compliance and breach response',
        detail: 'Monitors all data systems for FERPA compliance in real time. Delivers training to staff who access student records. Manages student data request fulfillment. When a potential breach occurs, immediately begins the documentation and notification protocol. FERPA incidents down 90%.',
        volume: '89+ compliance checks/day',
      },
      {
        name: 'Risk Assessment AI',
        handles: 'Institutional risk identification and mitigation tracking',
        detail: 'Continuously scans institutional activities, contracts, and operations for legal and compliance risk. Flags emerging risks to the human lead early, tracks mitigation actions, and maintains the institutional risk register for board reporting.',
        volume: '22+ risk evaluations/day',
      },
    ],
    savings: '$280K/yr · replaces 9 FTEs',
  },
  {
    id: 'institutional-research',
    emoji: '📊',
    name: 'Institutional Research',
    humanTitle: 'VP of Strategic Planning',
    humanName: 'Jennifer Walsh',
    humanRole: 'Sets the strategic planning agenda, presents institutional data to the board, leads environmental scanning for the next strategic plan, and owns relationships with accreditation and government reporting bodies.',
    color: 'teal',
    agents: [
      {
        name: 'Survey AI',
        handles: 'All institutional survey design and analysis',
        detail: 'Designs NSSE, FSSE, alumni surveys, employee engagement surveys, and custom institutional surveys. Deploys them, maximizes response rates through personalized reminders, analyzes results, and produces presentation-ready reports with actionable insights.',
        volume: '147+ survey responses/day',
      },
      {
        name: 'Accreditation Data AI',
        handles: 'SACSCOC and HLC data collection and formatting',
        detail: 'Knows every data element required by every accreditor. Continuously collects required data from institutional systems, formats it to specification, tracks compliance gaps, and drafts the narrative sections of self-study reports.',
        volume: '88+ data elements tracked daily',
      },
      {
        name: 'Strategic Planning AI',
        handles: 'Environmental scanning and benchmarking intelligence',
        detail: 'Monitors higher education landscape continuously — peer institution moves, enrollment trends, regulatory changes, demographic shifts, and competitive intelligence. Delivers a weekly briefing to the VP. Prepares full environmental scan reports for strategic planning retreats.',
        volume: '34+ intelligence briefings/week',
      },
    ],
    savings: '$240K/yr · replaces 8 FTEs',
  },
];

// ─── Color Map ──────────────────────────────────────────────────────────────

const CM: Record<string, { bg: string; border: string; text: string; badge: string; icon: string; dot: string }> = {
  blue:    { bg: 'bg-blue-50 dark:bg-blue-900/10',    border: 'border-blue-200 dark:border-blue-800',    text: 'text-blue-700 dark:text-blue-300',    badge: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',    icon: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600',    dot: 'bg-blue-500' },
  pink:    { bg: 'bg-pink-50 dark:bg-pink-900/10',    border: 'border-pink-200 dark:border-pink-800',    text: 'text-pink-700 dark:text-pink-300',    badge: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300',    icon: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600',    dot: 'bg-pink-500' },
  purple:  { bg: 'bg-purple-50 dark:bg-purple-900/10',border: 'border-purple-200 dark:border-purple-800',text: 'text-purple-700 dark:text-purple-300',  badge: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',  icon: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600',  dot: 'bg-purple-500' },
  amber:   { bg: 'bg-amber-50 dark:bg-amber-900/10',  border: 'border-amber-200 dark:border-amber-800',  text: 'text-amber-700 dark:text-amber-300',   badge: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',   icon: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600',   dot: 'bg-amber-500' },
  yellow:  { bg: 'bg-yellow-50 dark:bg-yellow-900/10',border: 'border-yellow-200 dark:border-yellow-800',text: 'text-yellow-700 dark:text-yellow-300',  badge: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',  icon: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600',  dot: 'bg-yellow-500' },
  green:   { bg: 'bg-green-50 dark:bg-green-900/10',  border: 'border-green-200 dark:border-green-800',  text: 'text-green-700 dark:text-green-300',   badge: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',   icon: 'bg-green-100 dark:bg-green-900/30 text-green-600',   dot: 'bg-green-500' },
  emerald: { bg: 'bg-emerald-50 dark:bg-emerald-900/10', border: 'border-emerald-200 dark:border-emerald-800', text: 'text-emerald-700 dark:text-emerald-300', badge: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300', icon: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600', dot: 'bg-emerald-500' },
  cyan:    { bg: 'bg-cyan-50 dark:bg-cyan-900/10',    border: 'border-cyan-200 dark:border-cyan-800',    text: 'text-cyan-700 dark:text-cyan-300',    badge: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300',    icon: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600',    dot: 'bg-cyan-500' },
  orange:  { bg: 'bg-orange-50 dark:bg-orange-900/10',border: 'border-orange-200 dark:border-orange-800',text: 'text-orange-700 dark:text-orange-300',  badge: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',  icon: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600',  dot: 'bg-orange-500' },
  indigo:  { bg: 'bg-indigo-50 dark:bg-indigo-900/10',border: 'border-indigo-200 dark:border-indigo-800',text: 'text-indigo-700 dark:text-indigo-300',  badge: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300',  icon: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600',  dot: 'bg-indigo-500' },
  violet:  { bg: 'bg-violet-50 dark:bg-violet-900/10',border: 'border-violet-200 dark:border-violet-800',text: 'text-violet-700 dark:text-violet-300',  badge: 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300',  icon: 'bg-violet-100 dark:bg-violet-900/30 text-violet-600',  dot: 'bg-violet-500' },
  slate:   { bg: 'bg-slate-50 dark:bg-slate-800/30',  border: 'border-slate-200 dark:border-slate-700',  text: 'text-slate-700 dark:text-slate-300',   badge: 'bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300',   icon: 'bg-slate-100 dark:bg-slate-700/50 text-slate-600',   dot: 'bg-slate-500' },
  teal:    { bg: 'bg-teal-50 dark:bg-teal-900/10',    border: 'border-teal-200 dark:border-teal-800',    text: 'text-teal-700 dark:text-teal-300',    badge: 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300',    icon: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600',    dot: 'bg-teal-500' },
};

// ─── Sub-components ─────────────────────────────────────────────────────────

function LayerCard({ layer, isActive, onClick }: { layer: typeof LAYERS[0]; isActive: boolean; onClick: () => void }) {
  const Icon = layer.icon;
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
        isActive
          ? `bg-gradient-to-br ${layer.gradient} border-transparent shadow-lg`
          : `bg-white dark:bg-[#1A1235] border-slate-200 dark:border-slate-700 hover:border-gcu-purple/30`
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isActive ? 'bg-white/20' : layer.badge}`}>
            <Icon size={16} className={isActive ? 'text-white' : ''} />
          </div>
          <div>
            <div className={`text-xs font-black ${isActive ? 'text-white/60' : 'text-slate-400'}`}>{layer.number}</div>
            <div className={`text-sm font-bold leading-tight ${isActive ? 'text-white' : 'text-slate-800 dark:text-slate-200'}`}>{layer.subtitle}</div>
          </div>
        </div>
        <ChevronRight size={14} className={isActive ? 'text-white/60' : 'text-slate-300'} />
      </div>
    </button>
  );
}

function AgentCard({ agent, color }: { agent: { name: string; handles: string; detail: string; volume: string }; color: string }) {
  const [open, setOpen] = useState(false);
  const c = CM[color];
  return (
    <div className={`rounded-xl border ${c.border} overflow-hidden transition-all`}>
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-full text-left p-4 flex items-start justify-between gap-3 hover:opacity-90 transition-opacity ${c.bg}`}
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${c.icon}`}>
            <Bot size={14} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{agent.name}</p>
            <p className={`text-xs font-medium ${c.text} mt-0.5`}>{agent.handles}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              <span className={`font-semibold ${c.text}`}>{agent.volume}</span>
            </p>
          </div>
        </div>
        {open ? <ChevronDown size={14} className="text-slate-400 flex-shrink-0 mt-1" /> : <ChevronRight size={14} className="text-slate-400 flex-shrink-0 mt-1" />}
      </button>
      {open && (
        <div className="px-4 pb-4 pt-2 bg-white dark:bg-[#1A1235]">
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{agent.detail}</p>
        </div>
      )}
    </div>
  );
}

function DeptBlock({ dept, isOpen, onToggle }: {
  dept: typeof DEPT_DETAIL[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const c = CM[dept.color];
  return (
    <div className={`page-card overflow-hidden border-2 transition-all ${isOpen ? c.border : 'border-transparent'}`}>
      {/* Header — always visible */}
      <button
        onClick={onToggle}
        className="w-full text-left p-5 flex items-start justify-between gap-4"
      >
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="text-3xl flex-shrink-0 leading-none mt-0.5">{dept.emoji}</div>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">{dept.name}</h3>
            <p className={`text-sm font-semibold mt-0.5 ${c.text}`}>{dept.humanName} · {dept.humanTitle}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed max-w-2xl">{dept.humanRole}</p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${c.badge}`}>
                {dept.agents.length} agents
              </span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{dept.savings}</span>
            </div>
          </div>
        </div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-colors ${isOpen ? c.icon : 'bg-slate-100 dark:bg-slate-800'}`}>
          {isOpen
            ? <ChevronDown size={14} className={c.text} />
            : <ChevronRight size={14} className="text-slate-400" />
          }
        </div>
      </button>

      {/* Expanded agent detail */}
      {isOpen && (
        <div className="px-5 pb-5 border-t border-slate-100 dark:border-slate-700 pt-4">
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
            Agent Roster — what each AI handles
          </p>
          <div className="space-y-2">
            {dept.agents.map(agent => (
              <AgentCard key={agent.name} agent={agent} color={dept.color} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────

export default function FullEcosystem() {
  const navigate = useNavigate();
  const [activeLayer, setActiveLayer] = useState('ops');
  const [openDepts, setOpenDepts] = useState<Set<string>>(new Set(['admissions']));

  const toggleDept = (id: string) => {
    setOpenDepts(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const expandAll = () => setOpenDepts(new Set(DEPT_DETAIL.map(d => d.id)));
  const collapseAll = () => setOpenDepts(new Set());

  const currentLayer = LAYERS.find(l => l.id === activeLayer)!;

  const PLATFORM_PRODUCTS = [
    { emoji: '🏫', name: 'Imago OS', desc: 'The institutional operating layer — connects all departments, systems, and people into one coherent environment.', route: '/molted/imago-os' },
    { emoji: '🧑‍🏫', name: 'TeachOS', desc: 'Faculty command center — course management, student tracking, assessment tools, and Spirit agent access in one place.', route: '/molted' },
    { emoji: '⚒️', name: 'Forge', desc: 'The AI faculty toolkit — course architect, agentic grader, discussion AI, and early warning system.', route: '/molted/forge' },
    { emoji: '🔦', name: 'Beacon AI', desc: 'Real-time student success intelligence — surfaces at-risk students before they drop out.', route: '/molted/beacon' },
    { emoji: '💡', name: 'Lumen', desc: 'Institutional analytics and decision intelligence for leadership teams.', route: '/molted/lumen' },
    { emoji: '🤖', name: 'PAIge Breaker', desc: 'AI literacy and onboarding for the entire campus community — students, faculty, and staff.', route: '/molted' },
  ];

  const SPIRIT_VESSELS = [
    { emoji: '👩‍⚕️', name: 'Spirit Nurse', desc: 'Telehealth, patient education, NCLEX prep', college: 'Nursing' },
    { emoji: '🧑‍💼', name: 'Spirit Business Advisor', desc: 'Executive strategy, ethical leadership', college: 'Business' },
    { emoji: '👩‍🏫', name: 'Spirit Teacher', desc: 'Tutoring, mentoring, pedagogy support', college: 'Education' },
    { emoji: '⚙️', name: 'Spirit Stewardship Innovator', desc: 'Engineering, creation care', college: 'Engineering' },
    { emoji: '🤝', name: 'Spirit Ethical Companion', desc: 'Humanities, human dignity', college: 'Liberal Arts' },
    { emoji: '🔬', name: 'Spirit Discovery Guide', desc: 'Sciences, research methods', college: 'Science' },
    { emoji: '✝️', name: 'Spirit Faith Companion', desc: 'Theology, pastoral care', college: 'Theology' },
    { emoji: '🎨', name: 'Spirit Creative Steward', desc: 'Arts & media, creative expression', college: 'Arts & Media' },
    { emoji: '📝', name: 'Spirit Research Mentor', desc: 'Doctoral studies, academia', college: 'Doctoral' },
    { emoji: '🏆', name: 'Spirit Elite Innovator', desc: 'Honors, interdisciplinary leadership', college: 'Honors' },
  ];

  const STUDENT_PRODUCTS = [
    { emoji: '🧭', name: 'Pathway AI', desc: 'Personalized learning path builder from enrollment through graduation.', route: '/molted/pathway-ai' },
    { emoji: '🧠', name: 'Mastery AI', desc: 'Adaptive tutoring that learns how each student learns best.', route: '/molted/mastery-ai' },
    { emoji: '🫂', name: 'RetainAI', desc: 'Proactive retention intervention — identifies disengagement before dropout.', route: '/molted/retain-ai' },
    { emoji: '✅', name: 'ProofAI', desc: 'Academic integrity and AI attribution system for student work.', route: '/molted/proof-ai' },
    { emoji: '📈', name: 'OutcomesAI', desc: 'Career outcome tracking and placement pipeline from junior year forward.', route: '/molted/outcomes-ai' },
    { emoji: '🏗️', name: 'Course Architect', desc: 'AI-assisted course builder that turns expertise into structured curriculum.', route: '/molted/forge/course-architect' },
  ];

  const COMMERCIAL_PRODUCTS = [
    { emoji: '⚡', name: 'Flourish API', desc: 'License the soul layer to other institutions, healthcare systems, or enterprises. Embed GCU character into any AI deployment.', route: '/flourish-api' },
    { emoji: '🏅', name: 'Flourish Standard', desc: 'GCU\'s ethical AI certification framework — become the ISO of ethical AI for higher education.', route: '/flourish-standard' },
    { emoji: '🤖', name: 'Flourish Robotics', desc: 'Phase 2 (2027): Spirit Vessels get physical form — nursing robots, campus companions, pastoral care androids.', route: '/flourish-robotics' },
    { emoji: '📊', name: 'Impact Tracker', desc: 'Commercialization dashboard — revenue, partnerships, reinvestment metrics, and mission ROI.', route: '/commercialization' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-gcu-purple-dark to-[#0D0920] p-6 sm:p-8">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-white/20"
              style={{ width: `${(i + 1) * 200}px`, height: `${(i + 1) * 200}px`, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
            />
          ))}
        </div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-6 justify-between">
          <div>
            <div className="inline-flex items-center gap-2 bg-gcu-gold/20 border border-gcu-gold/30 text-gcu-gold text-xs font-semibold px-3 py-1 rounded-full mb-4">
              <Layers size={12} />
              Complete Ecosystem Map — All 5 Layers
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-3 leading-tight">
              The Full GCU<br />
              <span className="text-gcu-gold">Flourish AI Stack</span>
            </h1>
            <p className="text-white/70 text-sm max-w-xl leading-relaxed">
              From institutional back-office to the student in the seat — every layer, every product,
              every agent, and every human who manages them. This is what a 21st-century university looks like.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 lg:w-80 flex-shrink-0">
            {[
              { value: '5', label: 'System layers', icon: Layers },
              { value: '13', label: 'Dept pods', icon: Building2 },
              { value: '50+', label: 'AI agents', icon: Bot },
              { value: '30–50', label: 'Human team', icon: Users },
              { value: '20+', label: 'Products', icon: Package },
              { value: '$173M', label: 'Annual reinvest', icon: Zap },
            ].map(({ value, label, icon: Icon }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                <Icon size={14} className="text-gcu-gold mx-auto mb-1" />
                <p className="text-lg font-black text-white leading-tight">{value}</p>
                <p className="text-xs text-white/50">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Layer selector + detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Left: Layer nav */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1 mb-3">Select a Layer</p>
          {LAYERS.map(layer => (
            <LayerCard
              key={layer.id}
              layer={layer}
              isActive={activeLayer === layer.id}
              onClick={() => setActiveLayer(layer.id)}
            />
          ))}
        </div>

        {/* Right: Layer detail */}
        <div className="lg:col-span-2">
          <div className={`rounded-2xl border-2 ${currentLayer.border} bg-white dark:bg-[#1A1235] overflow-hidden`}>
            {/* Header */}
            <div className={`bg-gradient-to-br ${currentLayer.gradient} p-5`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-black text-white/50">LAYER {currentLayer.number}</span>
              </div>
              <h2 className="text-xl font-black text-white">{currentLayer.title}</h2>
              <p className="text-white/70 text-sm mt-1">{currentLayer.tagline}</p>
              <p className="text-white/60 text-xs mt-2 leading-relaxed max-w-xl">{currentLayer.description}</p>
            </div>

            {/* Products in this layer */}
            <div className="p-5 border-b border-slate-100 dark:border-slate-700">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Products in this layer</p>
              <div className="flex flex-wrap gap-2">
                {currentLayer.products.map(p => (
                  <span key={p} className={`text-xs font-semibold px-3 py-1.5 rounded-full ${currentLayer.badge}`}>{p}</span>
                ))}
              </div>
            </div>

            {/* Quick navigate */}
            <div className="p-5">
              <button
                onClick={() => navigate(currentLayer.route)}
                className="flex items-center gap-2 text-xs font-semibold text-gcu-purple dark:text-purple-400 hover:gap-3 transition-all"
              >
                <ArrowRight size={13} />
                Open {currentLayer.subtitle} →
              </button>
            </div>
          </div>

          {/* How layers connect */}
          <div className="mt-4 page-card p-5">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">How the layers connect</p>
            <div className="space-y-2">
              {[
                { from: '01 University OS', to: '02 Platform Layer', desc: 'Ops data feeds into faculty and staff dashboards in real time' },
                { from: '02 Platform Layer', to: '03 Character Layer', desc: 'Every platform interaction is routed through a Spirit Vessel for tone and ethics' },
                { from: '03 Character Layer', to: '04 Student Layer', desc: 'Spirit character is the "voice" students hear in all AI tools' },
                { from: '04 Student Layer', to: '05 Commercial Layer', desc: 'Student outcomes data validates the model for external licensing' },
                { from: '05 Commercial Layer', to: '01 University OS', desc: 'Licensing revenue funds the next generation of agents and human team' },
              ].map(({ from, to, desc }) => (
                <div key={from + to} className="flex items-start gap-3">
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <span className="text-xs font-bold text-gcu-purple dark:text-purple-400">{from}</span>
                    <ArrowRight size={10} className="text-slate-300" />
                    <span className="text-xs font-bold text-gcu-purple dark:text-purple-400">{to}</span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">— {desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          LAYER 1: UNIVERSITY OS — FULL DEPT BREAKDOWN
      ═══════════════════════════════════════════════════════════ */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-md bg-gcu-purple flex items-center justify-center">
                <Building2 size={12} className="text-white" />
              </div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">Layer 01 — University OS</h2>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Every department human, their role, and every AI agent they manage — fully explained.
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={expandAll} className="text-xs font-semibold text-gcu-purple dark:text-purple-400 hover:underline">Expand all</button>
            <span className="text-slate-300">·</span>
            <button onClick={collapseAll} className="text-xs font-semibold text-slate-400 hover:underline">Collapse all</button>
          </div>
        </div>

        <div className="space-y-3">
          {DEPT_DETAIL.map(dept => (
            <DeptBlock
              key={dept.id}
              dept={dept}
              isOpen={openDepts.has(dept.id)}
              onToggle={() => toggleDept(dept.id)}
            />
          ))}
        </div>

        {/* University OS totals */}
        <div className="page-card p-5 bg-gradient-to-r from-gcu-purple-pale to-white dark:from-gcu-purple/10 dark:to-[#1A1235] border-gcu-purple/20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Total Department Pods', value: '13', icon: Building2 },
              { label: 'Total AI Agents', value: '50+', icon: Bot },
              { label: 'Human Team Members', value: '30–50', icon: Users },
              { label: 'Annual Savings vs Traditional', value: '$5.1M+', icon: TrendingUp },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <Icon size={16} className="text-gcu-purple dark:text-purple-400 mx-auto mb-1" />
                <p className="text-2xl font-black text-slate-900 dark:text-white">{value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          LAYER 2: PLATFORM LAYER
      ═══════════════════════════════════════════════════════════ */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
            <Cpu size={12} className="text-white" />
          </div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white">Layer 02 — Platform Layer (MoltALP)</h2>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 -mt-2">The tools faculty, staff, and advisors use every day.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PLATFORM_PRODUCTS.map(p => (
            <button
              key={p.name}
              onClick={() => navigate(p.route)}
              className="page-card p-4 text-left hover:shadow-card-hover hover:-translate-y-0.5 transition-all group"
            >
              <div className="text-2xl mb-2">{p.emoji}</div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">{p.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{p.desc}</p>
              <div className="flex items-center gap-1 mt-3 text-xs text-gcu-purple dark:text-purple-400 font-semibold group-hover:gap-2 transition-all">
                Explore <ArrowRight size={10} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          LAYER 3: CHARACTER / SPIRIT LAYER
      ═══════════════════════════════════════════════════════════ */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-md bg-pink-600 flex items-center justify-center">
            <Heart size={12} className="text-white" />
          </div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white">Layer 03 — AI Character Layer (Spirit Vessels)</h2>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 -mt-2">The soul embedded in every agent across every layer — 1 per GCU college.</p>

        <div className="page-card p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {SPIRIT_VESSELS.map(v => (
              <div key={v.name} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#241D35] hover:bg-gcu-purple-pale dark:hover:bg-gcu-purple/10 transition-colors">
                <span className="text-2xl flex-shrink-0">{v.emoji}</span>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{v.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{v.desc}</p>
                  <p className="text-xs text-gcu-purple dark:text-purple-400 font-medium mt-0.5">College of {v.college}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Spirit Modules in Every Vessel</p>
            <div className="flex flex-wrap gap-2">
              {['Empathy Engine', 'Ethical Guardrails', 'Christian Worldview', 'Stewardship Module', 'Domain Excellence', 'Imago Dei Principle', 'Always-Escalatable'].map(m => (
                <span key={m} className="text-xs bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300 px-2 py-1 rounded-full font-medium">{m}</span>
              ))}
            </div>
          </div>
          <div className="mt-3">
            <button onClick={() => navigate('/library')} className="text-xs font-semibold text-gcu-purple dark:text-purple-400 flex items-center gap-1 hover:gap-2 transition-all">
              <ArrowRight size={12} /> Open Spirit Vessel Library
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          LAYER 4: STUDENT-FACING LAYER
      ═══════════════════════════════════════════════════════════ */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-md bg-amber-500 flex items-center justify-center">
            <GraduationCap size={12} className="text-white" />
          </div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white">Layer 04 — Student-Facing Layer</h2>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 -mt-2">Every product a student touches — personalized, Spirit-infused, and outcome-focused.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STUDENT_PRODUCTS.map(p => (
            <button
              key={p.name}
              onClick={() => navigate(p.route)}
              className="page-card p-4 text-left hover:shadow-card-hover hover:-translate-y-0.5 transition-all group border-amber-100 dark:border-amber-900/20"
            >
              <div className="text-2xl mb-2">{p.emoji}</div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">{p.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{p.desc}</p>
              <div className="flex items-center gap-1 mt-3 text-xs text-amber-600 dark:text-amber-400 font-semibold group-hover:gap-2 transition-all">
                Explore <ArrowRight size={10} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          LAYER 5: COMMERCIALIZATION LAYER
      ═══════════════════════════════════════════════════════════ */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-md bg-emerald-600 flex items-center justify-center">
            <TrendingUp size={12} className="text-white" />
          </div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white">Layer 05 — Commercialization Layer</h2>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 -mt-2">License the model. Set the global ethical AI standard. Fund the mission forever.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {COMMERCIAL_PRODUCTS.map(p => (
            <button
              key={p.name}
              onClick={() => navigate(p.route)}
              className="page-card p-5 text-left hover:shadow-card-hover hover:-translate-y-0.5 transition-all group"
            >
              <div className="text-2xl mb-2">{p.emoji}</div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">{p.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{p.desc}</p>
              <div className="flex items-center gap-1 mt-3 text-xs text-emerald-600 dark:text-emerald-400 font-semibold group-hover:gap-2 transition-all">
                Explore <ArrowRight size={10} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="page-card p-6 bg-gradient-to-br from-slate-900 to-gcu-purple-dark border-[#2D2050]">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-gcu-gold/20 border border-gcu-gold/30 text-gcu-gold text-xs font-semibold px-3 py-1 rounded-full mb-4">
            <Sparkles size={12} />
            The complete vision
          </div>
          <h2 className="text-2xl font-black text-white mb-2">One university. Five layers. One mission.</h2>
          <p className="text-white/60 text-sm max-w-xl mx-auto leading-relaxed mb-6">
            Human flourishing — from the back-office to the front row of every classroom —
            powered by the most ethical, character-driven AI system ever built for higher education.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => navigate('/university-os')} className="btn-gold text-xs px-5 py-2.5 flex items-center gap-2">
              <Building2 size={13} /> Open University OS
            </button>
            <button onClick={() => navigate('/university-os/command-center')} className="border border-white/30 text-white text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
              <Activity size={13} /> Live Command Center
            </button>
            <button onClick={() => navigate('/executive-brief')} className="border border-white/30 text-white text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
              <Rocket size={13} /> Executive Briefing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
