import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen, Cpu, GraduationCap, BarChart3, TrendingUp,
  ShieldCheck, Users, Target, Zap, Globe, Layers, Bot,
  ArrowRight, ExternalLink, Sparkles, FlaskConical,
  BrainCircuit, Microscope, Award, Briefcase, Network,
  Eye, Atom, Link2, Fingerprint, LayoutGrid, Rocket,
  type LucideIcon
} from 'lucide-react';

/* ─── Types ──────────────────────────────────────────────────────────────── */
type ProductStatus = 'live' | 'pilot' | 'in-dev' | 'vision';
type ProductCategory = 'Student' | 'Faculty' | 'Institution' | 'Infrastructure' | 'Vision';

interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  status: ProductStatus;
  category: ProductCategory;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  borderColor: string;
  features: string[];
  route?: string;
  externalHref?: string;
  isNew?: boolean;
  isRevolutionary?: boolean;
}

/* ─── Products data ──────────────────────────────────────────────────────── */
const PRODUCTS: Product[] = [
  // ── EXISTING PRODUCTS ──────────────────────────────────────────────────
  {
    id: 'paigebreaker',
    name: 'pAIgeBreaker (Read)',
    tagline: 'The tutor that reads with you.',
    description:
      'A browser extension that runs silently alongside everything a student reads. The moment they hit a confusing passage — a term, a concept, a paragraph that won\'t click — it answers instantly. No tab switching. No searching. Just understanding, right there on the page. Works across Canvas, Blackboard, D2L, PDFs, and any web content.',
    status: 'pilot',
    category: 'Student',
    icon: BookOpen,
    color: 'text-violet-400',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/20',
    features: [
      'Real-time reading comprehension AI',
      'Curriculum-aligned answers from source material',
      'Works on any browser content — PDFs, Canvas, articles',
      'Personalized depth by learner level',
      '24/7 availability — never off-duty',
      'Institutional content guardrails',
    ],
    externalHref: '/lumen',
  },
  {
    id: 'outpost-lms',
    name: 'Outpost LMS',
    tagline: 'The LMS that knows everyone.',
    description:
      'Canvas was built in 2008. Outpost is built for 2030. An AI-native learning management system that doesn\'t just host courses — it understands every student, anticipates every need, and adapts every experience in real time. The operating system of the modern university.',
    status: 'pilot',
    category: 'Institution',
    icon: Cpu,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    features: [
      'AI-native architecture — built AI-first, not AI-bolted-on',
      'Real-time student intelligence across every touchpoint',
      'Adaptive course delivery that responds to learning gaps',
      'Unified faculty, student, and admin experience',
      'Replaces Canvas, Blackboard, D2L — not just integrates with them',
      'Institution-level analytics baked in at the core',
    ],
    externalHref: '/outpost',
  },
  {
    id: 'forge',
    name: 'Forge',
    tagline: 'AI that works as hard as your faculty.',
    description:
      'A comprehensive faculty AI toolkit that eliminates the administrative burden of teaching, so instructors can focus on what only humans can do: inspire. From course design to grading to student communication, Forge automates the tedious and amplifies the meaningful.',
    status: 'live',
    category: 'Faculty',
    icon: GraduationCap,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    features: [
      'Discussion Agent — AI moderates and deepens forum threads 24/7',
      'Course Architect — upload syllabus, get full semester infrastructure',
      'Agentic Grader — AI reviews drafts and returns structured feedback',
      'Auto-Respond — draft faculty replies to 14 student emails in 2 minutes',
      'Early Warning — flags at-risk students before they disappear',
      'Voice Demo — conversational AI for office hours and async support',
    ],
    externalHref: '/forge',
  },
  {
    id: 'beacon-ai',
    name: 'Beacon AI',
    tagline: 'Institutional intelligence, finally.',
    description:
      'Universities collect enormous amounts of data and act on almost none of it. Beacon transforms every institutional data point into a clear, actionable signal — for leadership, for deans, for department chairs. The command center for the data-driven university.',
    status: 'live',
    category: 'Institution',
    icon: BarChart3,
    color: 'text-sky-400',
    bgColor: 'bg-sky-500/10',
    borderColor: 'border-sky-500/20',
    features: [
      'Real-time institutional health dashboards',
      'Enrollment forecasting and yield optimization',
      'Student success predictive analytics',
      'Faculty workload and course performance insights',
      'Financial aid efficiency modeling',
      'Cross-department trend analysis',
    ],
    externalHref: '/beacon',
  },
  {
    id: 'pathway-ai',
    name: 'Pathway AI',
    tagline: 'Every student gets a guide.',
    description:
      'The gap between where a student is and where they need to be is a pathway — and most universities leave students to find it alone. Pathway AI maps every student\'s unique academic journey, identifies obstacles before they become failures, and constructs personalized success plans updated in real time.',
    status: 'pilot',
    category: 'Student',
    icon: TrendingUp,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    features: [
      'Personalized academic roadmaps for every student',
      'Early identification of course sequence risks',
      'AI academic advisor available 24/7',
      'Transfer credit optimization and gap analysis',
      'Goal-aligned course recommendations',
      'Proactive intervention alerts for advisors',
    ],
    externalHref: '/pathway-ai',
  },
  {
    id: 'proof-ai',
    name: 'Proof AI',
    tagline: 'Assessment that proves mastery.',
    description:
      'Traditional assessments test memorization. Proof AI tests understanding. An AI-powered assessment engine that adapts to each student\'s demonstrated knowledge level, generates novel questions that can\'t be Google-searched, and provides detailed competency maps that prove genuine learning.',
    status: 'pilot',
    category: 'Faculty',
    icon: ShieldCheck,
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/20',
    features: [
      'Adaptive question difficulty based on demonstrated mastery',
      'AI-generated novel assessments unique to each student',
      'Detailed competency mapping per learning objective',
      'Academic integrity monitoring with behavioral signals',
      'Faculty review and override at every stage',
      'Standards-aligned rubric generation',
    ],
    externalHref: '/proof-ai',
  },
  {
    id: 'retain-ai',
    name: 'Retain AI',
    tagline: 'Keep every student who deserves to stay.',
    description:
      'The most expensive problem in higher education is the student who leaves before they finish. Retain AI predicts dropout risk weeks before the student knows they\'re struggling — and triggers personalized, coordinated interventions across advising, financial aid, and faculty.',
    status: 'pilot',
    category: 'Institution',
    icon: Users,
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/20',
    features: [
      'Predictive dropout risk scores updated daily',
      'Multi-signal early warning (academic, financial, behavioral)',
      'Coordinated cross-department intervention workflows',
      'Personalized outreach drafted by AI, sent by humans',
      'Success coaching resource matching',
      'Retention ROI dashboard for leadership',
    ],
    externalHref: '/retain-ai',
  },
  {
    id: 'outcomes-ai',
    name: 'Outcomes AI',
    tagline: 'Prove your graduates are ready.',
    description:
      'Accreditors, employers, and students all want the same thing: proof that your program delivers. Outcomes AI tracks graduate employment, salary trajectories, competency attainment, and employer satisfaction — then feeds that intelligence back into curriculum design so every cohort is better than the last.',
    status: 'pilot',
    category: 'Institution',
    icon: Target,
    color: 'text-teal-400',
    bgColor: 'bg-teal-500/10',
    borderColor: 'border-teal-500/20',
    features: [
      'Graduate employment and salary outcome tracking',
      'Competency-to-career pathway mapping',
      'Employer satisfaction surveys and feedback loops',
      'Accreditation evidence packaging',
      'Program-level outcome benchmarking',
      'Curriculum feedback from real-world outcome data',
    ],
    externalHref: '/outcomes-ai',
  },
  {
    id: 'mastery-ai',
    name: 'Mastery AI',
    tagline: 'Move at the speed of understanding.',
    description:
      'Time-based learning is an industrial-era concept. Mastery AI replaces seat time with demonstrated competency — letting every student advance when they\'re ready and get support when they\'re not. The engine that makes competency-based education actually work at scale.',
    status: 'pilot',
    category: 'Student',
    icon: Award,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
    features: [
      'Competency-based progression unlocked by demonstration',
      'Micro-assessments that prove mastery in minutes',
      'Personalized learning sequences that fill gaps first',
      'Faculty control over mastery thresholds and standards',
      'Accelerated pathways for advanced learners',
      'Detailed competency transcripts for employers',
    ],
    externalHref: '/mastery-ai',
  },
  {
    id: 'university-os',
    name: 'University OS',
    tagline: 'Run your institution like a platform.',
    description:
      'The full institutional command layer. University OS integrates every system, every department, and every data stream into a unified operating system with a Command Center for leadership, Department Consoles for deans, and a real-time Full Ecosystem view that shows the institution breathing in real time.',
    status: 'live',
    category: 'Infrastructure',
    icon: Layers,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    features: [
      'Executive Command Center — live institutional intelligence',
      'Department Consoles — dean-level dashboards per school',
      'Full Ecosystem view — every AI agent, live',
      'Cross-system data integration layer',
      'Role-based access across all institutional stakeholders',
      'Audit trails and compliance reporting built in',
    ],
    route: '/gcu/university-os',
  },
  {
    id: 'gcu-spirit-agents',
    name: 'GCU Spirit Agents',
    tagline: 'AI with the character of GCU\'s finest.',
    description:
      'Ten AI agents — one for each GCU college — trained to embody servant leadership, integrity, and Christ-centered values. These aren\'t chatbots. They\'re the compassionate presence of GCU\'s best graduates, available to every student, 24/7. The soul layer that makes AI trustworthy.',
    status: 'live',
    category: 'Institution',
    icon: Bot,
    color: 'text-gcu-gold',
    bgColor: 'bg-amber-400/10',
    borderColor: 'border-amber-400/20',
    features: [
      '10 college-specific Spirit Agents fully deployed',
      'Values-aligned: servant leadership, integrity, faith',
      'Natural language pastoral and academic support',
      'Ethical guardrails built at the model level',
      'Alumni-contributed character training data',
      '94% average ethical alignment score across all agents',
    ],
    route: '/gcu/library',
  },

  // ── REVOLUTIONARY NEW PRODUCTS ─────────────────────────────────────────
  {
    id: 'campusgpt',
    name: 'CampusGPT',
    tagline: 'Your university\'s own sovereign AI brain.',
    description:
      'Every university has decades of irreplaceable knowledge locked in course content, research archives, faculty expertise, and institutional memory. CampusGPT is a university-owned, fine-tuned large language model trained exclusively on your institution\'s knowledge — giving students, faculty, and staff an AI that actually knows your university, your programs, and your standards.',
    status: 'in-dev',
    category: 'Infrastructure',
    icon: BrainCircuit,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/20',
    features: [
      'Institution-specific model fine-tuned on your content',
      'FERPA-compliant — your data never leaves your environment',
      'Faculty knowledge capture and preservation',
      'Institutional memory that doesn\'t retire',
      'Program-specific depth no generic AI can match',
      'Sovereign AI — owned, controlled, operated by your institution',
    ],
    isNew: true,
    isRevolutionary: true,
  },
  {
    id: 'holoclass',
    name: 'HoloClass',
    tagline: 'The classroom without walls.',
    description:
      'Physical presence and geographic access are the last great inequities in higher education. HoloClass creates photorealistic, AI-facilitated virtual classrooms where distance students feel as present as those in the front row — with spatial audio, shared virtual whiteboards, AI-mediated discussion, and real-time language translation dissolving every barrier.',
    status: 'vision',
    category: 'Student',
    icon: Eye,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20',
    features: [
      'Photorealistic VR/AR classroom presence',
      'Real-time multilingual translation — learn in any language',
      'AI-facilitated discussion that includes every voice',
      'Shared virtual labs and collaborative workspaces',
      'Haptic feedback for hands-on learning simulations',
      'Works on headsets, tablets, or any browser',
    ],
    isNew: true,
    isRevolutionary: true,
  },
  {
    id: 'laboratory-ai',
    name: 'LaboratoryAI',
    tagline: 'Every experiment. Zero risk.',
    description:
      'Nursing students who need 200 clinical hours. Chemistry students who can\'t access a lab. Engineering students who need to fail safely. LaboratoryAI creates photorealistic, physically accurate virtual laboratory environments where students can conduct any experiment, make any mistake, and learn from every outcome — without cost, risk, or resource constraints.',
    status: 'in-dev',
    category: 'Student',
    icon: Microscope,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
    features: [
      'Photorealistic simulation of chemistry, biology, nursing, engineering',
      'Physically accurate — real outcomes from real procedures',
      'Safe failure — learn from mistakes without consequences',
      'AI instructor monitors and guides in real time',
      'Accreditation-validated clinical hour equivalency',
      'Scales a $50,000 lab to a $50/month subscription',
    ],
    isNew: true,
    isRevolutionary: true,
  },
  {
    id: 'credentialchain',
    name: 'CredentialChain',
    tagline: 'Skills you can prove. Credentials that travel.',
    description:
      'The 4-year degree is a blunt instrument. Employers want to know what you can do, not just where you went. CredentialChain issues blockchain-verified, employer-readable micro-credentials for every competency a student demonstrates — creating a living, portable, tamper-proof skills record that follows graduates for life.',
    status: 'in-dev',
    category: 'Infrastructure',
    icon: Link2,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
    features: [
      'Blockchain-verified micro-credentials per competency',
      'Employer-readable skills wallets — no transcript required',
      'Instant verification — no registrar call needed',
      'Stackable credentials build toward degrees and certifications',
      'Industry-standard competency framework alignment',
      'Portable across institutions, employers, and borders',
    ],
    isNew: true,
    isRevolutionary: true,
  },
  {
    id: 'mentormesh',
    name: 'MentorMesh',
    tagline: 'Connect every student to their ideal mentor.',
    description:
      'The single biggest predictor of student success is having one person who believed in them. MentorMesh uses AI to broker high-signal mentorship connections between students and alumni — matching on career goals, background, personality, and expertise — then facilitates and tracks the relationship to ensure it delivers real outcomes.',
    status: 'in-dev',
    category: 'Student',
    icon: Network,
    color: 'text-fuchsia-400',
    bgColor: 'bg-fuchsia-500/10',
    borderColor: 'border-fuchsia-500/20',
    features: [
      'AI mentorship matching across 100+ compatibility signals',
      'Alumni engagement platform with conversation scaffolding',
      'Goal-tracking and milestone accountability built in',
      'Anonymous matching option for first-generation students',
      'Faculty mentorship coordination and visibility',
      'Institutional alumni relationship intelligence',
    ],
    isNew: true,
    isRevolutionary: true,
  },
  {
    id: 'careercatalyst',
    name: 'CareerCatalyst',
    tagline: 'Map your career from Day 1.',
    description:
      'Most students don\'t think about career outcomes until senior year. By then, critical doors are already closing. CareerCatalyst begins on enrollment day — mapping every student\'s goals, skills, and interests to real-world career trajectories, then building their entire academic experience backward from where they want to land.',
    status: 'in-dev',
    category: 'Student',
    icon: Briefcase,
    color: 'text-lime-400',
    bgColor: 'bg-lime-500/10',
    borderColor: 'border-lime-500/20',
    features: [
      'Career-backward degree planning from Day 1',
      'Real-time labor market intelligence integrated into course selection',
      'AI resume and interview coaching at every stage',
      'Employer relationship network with direct recruiting pathways',
      'Salary outcome predictions per program and concentration',
      'Internship and experiential learning opportunity matching',
    ],
    isNew: true,
    isRevolutionary: true,
  },
  {
    id: 'adaptcore',
    name: 'AdaptCore',
    tagline: 'The curriculum that teaches itself.',
    description:
      'Curriculum design is done once and aged for years. AdaptCore continuously analyzes what\'s working and what\'s not — at the assignment, module, and course level — and proposes real-time curriculum adjustments based on learning outcome data, industry trends, and student performance signals. Courses that evolve as fast as the world does.',
    status: 'vision',
    category: 'Faculty',
    icon: Atom,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
    features: [
      'Continuous curriculum analysis against learning outcomes',
      'AI-proposed module edits reviewed and approved by faculty',
      'Industry trend integration — curricula that stay current',
      'Learning gap detection at cohort and individual level',
      'Cross-institutional curriculum benchmarking',
      'Accreditation-ready evidence generation on demand',
    ],
    isNew: true,
    isRevolutionary: true,
  },
  {
    id: 'sentinel-ai',
    name: 'Sentinel AI',
    tagline: 'Integrity that doesn\'t sleep.',
    description:
      'Academic integrity in the age of AI requires more than plagiarism detection — it requires understanding authorship. Sentinel AI uses behavioral biometrics, writing pattern analysis, and AI signature detection to distinguish genuine student work from ghost-written content, while simultaneously protecting student privacy and civil liberties.',
    status: 'in-dev',
    category: 'Institution',
    icon: Fingerprint,
    color: 'text-slate-400',
    bgColor: 'bg-slate-500/10',
    borderColor: 'border-slate-500/20',
    features: [
      'Behavioral biometric writing pattern baselines',
      'AI-generated content detection tuned per institution',
      'Privacy-preserving — no invasive proctoring cameras',
      'Faculty workflow integration with evidence packages',
      'Appeal-ready documentation for academic conduct review',
      'Continuous learning model that improves with every flag',
    ],
    isNew: true,
    isRevolutionary: true,
  },
  {
    id: 'imago-os',
    name: 'Imago OS',
    tagline: 'The fully transformed institution.',
    description:
      'Every product in this portfolio is a step toward a singular vision: the university as a living, intelligent organism. Imago OS is what emerges when every layer — student experience, faculty tools, institutional intelligence, and physical infrastructure — runs on a unified AI operating system. Not a better university. A new kind of institution.',
    status: 'vision',
    category: 'Vision',
    icon: Globe,
    color: 'text-gcu-gold',
    bgColor: 'bg-amber-400/10',
    borderColor: 'border-amber-400/20',
    features: [
      'Unified AI operating layer across all institutional functions',
      'Self-optimizing — every interaction makes the system smarter',
      'AI-native physical campus with embedded intelligence',
      'Every student\'s entire journey orchestrated by AI',
      'Faculty freed to do what only humans can: inspire',
      'The end state that makes everything else worth building',
    ],
    externalHref: '/imago-os',
    isRevolutionary: true,
  },
];

/* ─── Helper config ──────────────────────────────────────────────────────── */
const STATUS_CONFIG: Record<ProductStatus, { label: string; color: string; bg: string }> = {
  live:     { label: 'Live',     color: 'text-emerald-400', bg: 'bg-emerald-400/10 border border-emerald-400/25' },
  pilot:    { label: 'Pilot',    color: 'text-blue-400',    bg: 'bg-blue-400/10 border border-blue-400/25' },
  'in-dev': { label: 'In Dev',   color: 'text-amber-400',   bg: 'bg-amber-400/10 border border-amber-400/25' },
  vision:   { label: 'Vision',   color: 'text-purple-400',  bg: 'bg-purple-400/10 border border-purple-400/25' },
};

const CATEGORY_CONFIG: Record<ProductCategory, { label: string; icon: LucideIcon }> = {
  Student:        { label: 'Student Experience', icon: GraduationCap },
  Faculty:        { label: 'Faculty Tools',      icon: BookOpen },
  Institution:    { label: 'Institution',         icon: Layers },
  Infrastructure: { label: 'Infrastructure',     icon: Cpu },
  Vision:         { label: 'Vision',              icon: Rocket },
};

const ALL_CATEGORIES: ProductCategory[] = ['Student', 'Faculty', 'Institution', 'Infrastructure', 'Vision'];

/* ─── Stats ──────────────────────────────────────────────────────────────── */
const STATS = [
  { icon: LayoutGrid, label: 'Total Products', value: PRODUCTS.length.toString(), sub: 'existing + new', color: 'text-gcu-gold', bg: 'bg-amber-400/10' },
  { icon: Zap, label: 'Live Today', value: PRODUCTS.filter(p => p.status === 'live').length.toString(), sub: 'fully deployed', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  { icon: FlaskConical, label: 'In Pilot', value: PRODUCTS.filter(p => p.status === 'pilot').length.toString(), sub: 'active testing', color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { icon: Sparkles, label: 'Revolutionary', value: PRODUCTS.filter(p => p.isRevolutionary).length.toString(), sub: 'dent-in-universe ideas', color: 'text-purple-400', bg: 'bg-purple-400/10' },
];

/* ─── Components ─────────────────────────────────────────────────────────── */
function StatusBadge({ status }: { status: ProductStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide ${cfg.bg} ${cfg.color}`}>
      {cfg.label}
    </span>
  );
}

function CategoryBadge({ category }: { category: ProductCategory }) {
  const cfg = CATEGORY_CONFIG[category];
  const Icon = cfg.icon;
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold text-slate-400 bg-slate-800/60 border border-slate-700/50">
      <Icon size={10} />
      {cfg.label}
    </span>
  );
}

function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  const Icon = product.icon;

  const handleClick = () => {
    if (product.route) navigate(product.route);
    else if (product.externalHref) window.open(product.externalHref, '_blank');
  };

  return (
    <div
      className={`relative group flex flex-col bg-slate-900/60 border rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${product.borderColor} ${product.route || product.externalHref ? 'cursor-pointer' : ''}`}
      onClick={product.route || product.externalHref ? handleClick : undefined}
    >
      {/* Corner badges */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5 flex-wrap justify-end">
        {product.isNew && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-gcu-gold/20 border border-gcu-gold/40 text-gcu-gold">
            <Sparkles size={9} /> New
          </span>
        )}
        {product.isRevolutionary && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-500/15 border border-purple-500/30 text-purple-400">
            <Rocket size={9} /> Revolutionary
          </span>
        )}
      </div>

      {/* Icon + title */}
      <div className="flex items-start gap-4 mb-4 pr-20">
        <div className={`flex-shrink-0 w-11 h-11 rounded-xl border flex items-center justify-center ${product.bgColor} ${product.borderColor}`}>
          <Icon size={20} className={product.color} />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg leading-tight">{product.name}</h3>
          <p className={`text-sm font-semibold mt-0.5 ${product.color}`}>{product.tagline}</p>
        </div>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 flex-wrap mb-4">
        <StatusBadge status={product.status} />
        <CategoryBadge category={product.category} />
      </div>

      {/* Description */}
      <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">
        {product.description}
      </p>

      {/* Features */}
      <ul className="space-y-1.5">
        {product.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
            <span className={`mt-0.5 flex-shrink-0 w-1.5 h-1.5 rounded-full ${product.bgColor} border ${product.borderColor}`} style={{ background: 'currentColor' }}>
              <span className={`block w-full h-full rounded-full ${product.color.replace('text-', 'bg-')}`} />
            </span>
            {f}
          </li>
        ))}
      </ul>

      {/* CTA link */}
      {(product.route || product.externalHref) && (
        <div className={`mt-5 pt-4 border-t border-slate-800 flex items-center gap-1.5 text-xs font-semibold ${product.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
          {product.externalHref ? <ExternalLink size={12} /> : <ArrowRight size={12} />}
          {product.externalHref ? 'View product page' : 'Open in portal'}
        </div>
      )}
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────────────── */
export default function LearningSystemsModernization() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');
  const [showRevOnly, setShowRevOnly] = useState(false);

  const filtered = PRODUCTS.filter(p => {
    if (showRevOnly && !p.isRevolutionary) return false;
    if (activeCategory !== 'all' && p.category !== activeCategory) return false;
    return true;
  });

  return (
    <div className="space-y-8 animate-fade-in">

      {/* ── Hero banner ───────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-[#1A1235] to-slate-900 border border-white/10 p-8">
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-30"
            style={{ background: 'radial-gradient(circle, rgba(255,198,39,0.3) 0%, transparent 70%)' }} />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-64 rounded-full opacity-10"
            style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.5) 0%, transparent 70%)' }} />
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-gcu-gold/20 border border-gcu-gold/30 text-gcu-gold text-xs font-bold px-3 py-1.5 rounded-full mb-5">
            <Sparkles size={12} />
            GCU Flourish AI · Greg Lucas · Learning Systems Modernization
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-3">
            Learning Systems<br />
            <span style={{
              background: 'linear-gradient(135deg, #FFC627 0%, #FFE08A 40%, #FFC627 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Modernization
            </span>
          </h1>
          <p className="text-slate-300 text-lg max-w-3xl leading-relaxed mb-6">
            Every product, platform, and revolutionary idea we are building to transform higher education — from the classroom browser to the sovereign university AI brain. This is our dent in the universe.
          </p>
          <div className="flex flex-wrap gap-3">
            {STATS.map(({ icon: Icon, label, value, sub, color, bg }) => (
              <div key={label} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/10 ${bg}`}>
                <Icon size={16} className={color} />
                <div>
                  <p className={`text-lg font-black leading-tight ${color}`}>{value}</p>
                  <p className="text-xs text-slate-400">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Filters ───────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeCategory === 'all'
              ? 'bg-gcu-purple text-white shadow-lg'
              : 'bg-slate-800/60 text-slate-400 hover:text-white border border-slate-700/50'
          }`}
        >
          All Products ({PRODUCTS.length})
        </button>
        {ALL_CATEGORIES.map(cat => {
          const count = PRODUCTS.filter(p => p.category === cat).length;
          const Icon = CATEGORY_CONFIG[cat].icon;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-gcu-purple text-white shadow-lg'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white border border-slate-700/50'
              }`}
            >
              <Icon size={13} />
              {CATEGORY_CONFIG[cat].label} ({count})
            </button>
          );
        })}
        <button
          onClick={() => setShowRevOnly(v => !v)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ml-auto ${
            showRevOnly
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-slate-800/60 text-slate-400 hover:text-white border border-slate-700/50'
          }`}
        >
          <Rocket size={13} />
          Revolutionary Only
        </button>
      </div>

      {/* ── Legend ────────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-4 px-1">
        <span className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Status:</span>
        {(Object.entries(STATUS_CONFIG) as [ProductStatus, typeof STATUS_CONFIG[ProductStatus]][]).map(([key, cfg]) => (
          <span key={key} className={`flex items-center gap-1.5 text-xs font-semibold ${cfg.color}`}>
            <span className={`inline-block w-2 h-2 rounded-full ${cfg.bg.split(' ')[0]}`} /> {cfg.label}
          </span>
        ))}
      </div>

      {/* ── Products grid ─────────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          No products match the current filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* ── Vision footer ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1A1235] to-slate-900 border border-gcu-gold/20 p-8 text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-10"
            style={{ background: 'radial-gradient(ellipse at center, rgba(255,198,39,0.4) 0%, transparent 70%)' }} />
        </div>
        <div className="relative z-10">
          <Rocket size={32} className="text-gcu-gold mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            We are here to make a dent in the universe.
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Every product in this portfolio is a step toward a world where every learner — regardless of zip code, income, or life circumstance — has access to the same quality of education as the most privileged student at the most elite institution on earth. That's the mission. We're building it.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 rounded-xl bg-gcu-gold/10 border border-gcu-gold/20 text-gcu-gold text-sm font-semibold">Greg Lucas · Founder Vision</span>
            <span className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-semibold">GCU Flourish AI · 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
}
