import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const PAGE_META: Record<string, { title: string; subtitle?: string }> = {
  '/gcu': { title: 'Dashboard', subtitle: 'Overview of Empyrean LMS platform' },
  '/gcu/library': { title: 'Prototype Library', subtitle: 'All 10 college spirit vessels' },
  '/gcu/builder': { title: 'Spirit Infusion Builder', subtitle: 'Create & configure new AI prototypes' },
  '/gcu/testing': { title: 'Deployment Console', subtitle: 'Deploy and interact with live Spirit Agents — your autonomous AI workforce' },
  '/gcu/commercialization': { title: 'Impact & Commercialization Tracker', subtitle: 'Revenue, partnerships, and reinvestment' },
  '/gcu/resources': { title: 'Resources & Governance', subtitle: 'Ethical guidelines, policies, and documentation' },
  '/gcu/spirit-network': { title: 'Spirit Network', subtitle: 'Alumni wisdom — the living source code of our AI' },
  '/gcu/flourish-api': { title: 'Flourish API', subtitle: 'The soul layer for any AI — GCU ethical character as a service' },
  '/gcu/flourish-robotics': { title: 'Flourish Robotics', subtitle: 'Phase 2 — Spirit Vessels get bodies · Launching 2027' },
  '/gcu/vision': { title: 'Vision & Roadmap', subtitle: 'Phase 1: Digital · Phase 2: Physical embodiment · The global standard' },
  '/gcu/executive-brief': { title: 'Executive Briefing', subtitle: 'Presidential summary · The case for GCU as the global authority on ethical AI' },
  '/gcu/flourish-standard': { title: 'The Flourish Standard', subtitle: 'GCU\'s ethical AI certification framework · The industry standard we are creating' },
  '/gcu/spirit-training': { title: 'Spirit Training Academy', subtitle: 'Practice the hardest human moments — Spirit plays the challenge, you play the professional' },
  '/gcu/governance-qa': { title: 'Agent QA Board', subtitle: 'Ethical review, audit logs, and governance protocols' },
  '/gcu/scaling-model': { title: 'Scaling Model', subtitle: 'Empyrean LMS global expansion strategy' },
  '/gcu/university-os': { title: 'University OS', subtitle: 'AI-powered command infrastructure for GCU operations' },
  '/gcu/university-os/command-center': { title: 'Command Center', subtitle: 'Real-time university intelligence dashboard' },
  '/gcu/university-os/full-ecosystem': { title: 'Full Ecosystem', subtitle: 'Complete University OS module overview' },
};

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const meta = PAGE_META[location.pathname] ?? { title: 'Empyrean LMS' };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-[#0D0920]">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(c => !c)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Simulated data banner */}
        <div className="bg-amber-400 text-amber-900 text-xs font-bold text-center py-1.5 px-4 flex-shrink-0">
          ⚠ DEMO MODE — All data, metrics, and figures are simulated for testing purposes only. Not real platform data.
        </div>
        <Header
          title={meta.title}
          subtitle={meta.subtitle}
          onMenuClick={() => setMobileOpen(true)}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8 animate-fade-in">
            <Outlet />
          </div>
        </main>

        {/* Ethical footer */}
        <footer className="border-t border-slate-200 dark:border-[#2D2050] bg-white dark:bg-[#0D0920] px-6 py-3">
          <p className="text-center text-xs text-slate-400 dark:text-slate-600 leading-relaxed">
            ✦ All AI augments human work; transparency and human flourishing first. Aligned with GCU's Christ-centered AI philosophy. ✦
          </p>
        </footer>
      </div>
    </div>
  );
}
