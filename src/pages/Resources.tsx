import { useState } from 'react';
import {
  Shield, BookOpen, FileText, ChevronDown, ChevronUp,
  ExternalLink, Download, CheckCircle2, Users, Lightbulb
} from 'lucide-react';

interface AccordionItem {
  title: string;
  content: string;
  badge?: string;
}

const ETHICAL_PRINCIPLES: AccordionItem[] = [
  {
    title: '1. Human Flourishing First',
    badge: 'Core Principle',
    content: 'Every GCU Flourish AI prototype exists to augment human capacity, never to replace human judgment, dignity, or relationship. Success is measured not by efficiency metrics, but by whether human flourishing increases. If an AI interaction diminishes human dignity or replaces needed human connection, it fails—regardless of technical performance.',
  },
  {
    title: '2. Transparent Attribution',
    badge: 'Transparency',
    content: 'Every AI response must clearly attribute its source. "This guidance reflects the spirit of GCU nursing alumni and our evidence-based curriculum" is not optional—it is a core feature. Users must never mistake AI output for the voice of a licensed professional, friend, or God. Transparency builds the trust that makes these tools valuable.',
  },
  {
    title: '3. Christ-Centered Values Integration',
    badge: 'Worldview',
    content: 'GCU Flourish AI prototypes reflect the conviction that every person is made in the Imago Dei—image of God—and therefore possesses unconditional dignity. AI responses should embody: compassion (not efficiency), truthfulness (not flattery), servant-heartedness (not self-promotion), and stewardship (not exploitation). Alignment with GCU\'s Christ-centered mission is non-negotiable.',
  },
  {
    title: '4. Competence Boundaries & Escalation',
    badge: 'Safety',
    content: 'AI systems must clearly acknowledge the limits of their competence and provide explicit escalation pathways to qualified human professionals. The Spirit Nurse Assistant never replaces a licensed nurse. The Spirit Faith Companion never replaces a pastor or licensed counselor. Disclose limitations proactively, not reactively.',
  },
  {
    title: '5. Privacy & Data Stewardship',
    badge: 'Governance',
    content: 'All user interactions with GCU Flourish AI prototypes are logged for ethical oversight. Personally identifiable information is never used to train external AI models without explicit informed consent. GCU owns all prototype IP. Data is stewarded—not mined—in alignment with FERPA, HIPAA (for healthcare applications), and GCU data governance policies.',
  },
  {
    title: '6. CETLA Ethical Review Process',
    badge: 'Process',
    content: 'All prototypes must pass a four-stage ethical review before deployment: (1) Faculty design review, (2) CETLA pedagogical assessment, (3) Engineering technical safety audit, (4) College Dean approval. No prototype advances to pilot without completing all four stages. Ethical review is a feature, not a bureaucratic obstacle.',
  },
  {
    title: '7. Continuous Ethical Monitoring',
    badge: 'Ongoing',
    content: 'Deployed prototypes are subject to ongoing ethical monitoring: monthly bias audits, quarterly alignment reviews, and real-time feedback analysis. Any prototype that produces responses inconsistent with GCU values is immediately flagged for review. Ethical alignment is a living commitment, not a one-time certification.',
  },
];

const DOCUMENTATION = [
  { title: 'GCU AI Governance Policy v2.1', type: 'PDF', icon: '📄', tag: 'Governance' },
  { title: 'Spirit Infusion Builder User Guide', type: 'PDF', icon: '📘', tag: 'Guide' },
  { title: 'CETLA Ethical Review Checklist', type: 'XLSX', icon: '✅', tag: 'Process' },
  { title: 'GCU Christ-Centered AI Philosophy', type: 'PDF', icon: '✝️', tag: 'Worldview' },
  { title: 'GCU Technical Safety Standards', type: 'PDF', icon: '⚙️', tag: 'Safety' },
  { title: 'Prototype Commercialization Framework', type: 'PDF', icon: '💼', tag: 'Commerce' },
  { title: 'Data Privacy & FERPA Compliance Guide', type: 'PDF', icon: '🔒', tag: 'Legal' },
  { title: 'Alumni Exemplar Contribution Process', type: 'DOCX', icon: '🎓', tag: 'Process' },
];

const TEAM = [
  { name: 'Demo Admin', role: 'Platform Director & Ethics Lead', team: 'CETLA', icon: '👩‍🏫' },
  { name: 'Engineering Team', role: 'Technical Development & Robotics', team: 'Engineering', icon: '🤖' },
  { name: 'Faculty Builders', role: 'Prototype Creation & Curriculum', team: 'All Colleges', icon: '🎓' },
  { name: 'Student Innovators', role: 'Testing, Innovation & Alumni Stories', team: 'Student Research', icon: '🌱' },
];

function AccordionSection({ item }: { item: AccordionItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 dark:border-[#2D2050] rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex items-center gap-3">
          <CheckCircle2 size={16} className="text-gcu-purple flex-shrink-0" />
          <span className="text-sm font-semibold text-slate-800 dark:text-white">{item.title}</span>
          {item.badge && (
            <span className="hidden sm:block text-xs bg-gcu-purple/10 text-gcu-purple dark:text-purple-300 px-2 py-0.5 rounded-full font-medium">
              {item.badge}
            </span>
          )}
        </div>
        {open ? <ChevronUp size={16} className="text-slate-400 flex-shrink-0" /> : <ChevronDown size={16} className="text-slate-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-4 pb-4 pt-0 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-[#2D2050] mt-0 pt-4 animate-fade-in">
          {item.content}
        </div>
      )}
    </div>
  );
}

export default function Resources() {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      {/* Intro */}
      <div className="page-card p-6 bg-gcu-purple-pale dark:bg-gcu-purple/10 border-gcu-purple/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gcu-purple flex items-center justify-center flex-shrink-0">
            <Shield size={22} className="text-gcu-gold" />
          </div>
          <div>
            <h2 className="text-lg font-black text-gcu-purple dark:text-purple-300 mb-2">
              GCU AI Ethics & Governance Framework
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
              GCU Flourish AI is built on the conviction that ethical AI is not a constraint on innovation—it is the foundation of innovation that lasts.
              Every prototype is governed by GCU's Christ-centered AI philosophy, CETLA's pedagogical standards, and the lived wisdom of our alumni.
            </p>
            <p className="text-xs text-gcu-purple/70 dark:text-purple-400/70 mt-2 font-medium italic">
              "All AI augments human work; transparency and human flourishing first."
            </p>
          </div>
        </div>
      </div>

      {/* Ethical principles accordion */}
      <div className="page-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Shield size={16} className="text-gcu-purple" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">The 7 Ethical Principles</h3>
        </div>
        <div className="space-y-2">
          {ETHICAL_PRINCIPLES.map(item => (
            <AccordionSection key={item.title} item={item} />
          ))}
        </div>
      </div>

      {/* Governance team */}
      <div className="page-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Users size={16} className="text-slate-400" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Platform Governance Team</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TEAM.map(member => (
            <div key={member.name} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#1A1235] border border-slate-100 dark:border-[#2D2050]">
              <span className="text-2xl">{member.icon}</span>
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-white">{member.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{member.role}</p>
                <p className="text-xs text-gcu-purple dark:text-purple-400 font-medium">{member.team}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Documentation library */}
      <div className="page-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={16} className="text-slate-400" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Documentation Library</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DOCUMENTATION.map(doc => (
            <div
              key={doc.title}
              className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-[#2D2050] hover:border-gcu-purple/40 hover:bg-gcu-purple-pale dark:hover:bg-gcu-purple/10 transition-all cursor-pointer group"
            >
              <span className="text-xl">{doc.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-gcu-purple dark:group-hover:text-purple-300 transition-colors truncate">
                  {doc.title}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs text-slate-400">{doc.type}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                  <span className="text-xs text-gcu-purple/60 dark:text-purple-400/60">{doc.tag}</span>
                </div>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                  <Download size={13} />
                </button>
                <button className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                  <ExternalLink size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="page-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb size={16} className="text-gcu-gold" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Quick Links & Key Contacts</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: 'Submit Ethical Review Request', icon: '📋', sub: 'CETLA review portal' },
            { label: 'Contribute Alumni Story', icon: '🎓', sub: 'Spirit infusion submissions' },
            { label: 'Report Ethical Concern', icon: '🚨', sub: 'Anonymous reporting channel' },
            { label: 'Robotics Lab', icon: '🤖', sub: 'Hardware integration requests' },
            { label: 'MIRA AI System', icon: '🧠', sub: 'GCU tutoring AI integration' },
            { label: 'IP & Licensing Office', icon: '⚖️', sub: 'Commercialization inquiries' },
          ].map(link => (
            <button
              key={link.label}
              className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-[#2D2050] hover:border-gcu-purple/40 text-left hover:bg-gcu-purple-pale dark:hover:bg-gcu-purple/10 transition-all group"
            >
              <span className="text-xl">{link.icon}</span>
              <div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-gcu-purple dark:group-hover:text-purple-300 transition-colors">
                  {link.label}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">{link.sub}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <div className="text-center text-xs text-slate-400 dark:text-slate-600 pb-2 leading-relaxed">
        GCU Flourish AI Platform · Governed by GCU AI Ethics Policy v2.1 · Aligned with GCU's Christ-Centered Mission<br />
        Questions? Contact: <span className="text-gcu-purple dark:text-purple-400">ai-governance@flourishai.edu</span>
      </div>
    </div>
  );
}
