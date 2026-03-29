import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const PAGE_META: Record<string, { title: string; subtitle?: string }> = {
  '/portal': { title: 'Dashboard', subtitle: 'Overview of Empyrean LMS platform' },
  '/portal/library': { title: 'Prototype Library', subtitle: 'All 10 college spirit vessels' },
  '/portal/builder': { title: 'Spirit Infusion Builder', subtitle: 'Create & configure new AI prototypes' },
  '/portal/testing': { title: 'Deployment Console', subtitle: 'Deploy and interact with live Spirit Agents — your autonomous AI workforce' },
  '/portal/commercialization': { title: 'Impact & Commercialization Tracker', subtitle: 'Revenue, partnerships, and reinvestment' },
  '/portal/resources': { title: 'Resources & Governance', subtitle: 'Ethical guidelines, policies, and documentation' },
  '/portal/spirit-network': { title: 'Spirit Network', subtitle: 'Alumni wisdom — the living source code of our AI' },
  '/portal/flourish-api': { title: 'Flourish API', subtitle: 'The soul layer for any AI — YJU ethical character as a service' },
  '/portal/flourish-robotics': { title: 'Flourish Robotics', subtitle: 'Phase 2 — Spirit Vessels get bodies · Launching 2027' },
  '/portal/vision': { title: 'Vision & Roadmap', subtitle: 'Phase 1: Digital · Phase 2: Physical embodiment · The global standard' },
  '/portal/executive-brief': { title: 'Executive Briefing', subtitle: 'Presidential summary · The case for YJU as the global authority on ethical AI' },
  '/portal/flourish-standard': { title: 'The Flourish Standard', subtitle: 'YJU\'s ethical AI certification framework · The industry standard we are creating' },
  '/portal/spirit-training': { title: 'Spirit Training Academy', subtitle: 'Practice the hardest human moments — Spirit plays the challenge, you play the professional' },
  '/portal/governance-qa': { title: 'Agent QA Board', subtitle: 'Ethical review, audit logs, and governance protocols' },
  '/portal/scaling-model': { title: 'Scaling Model', subtitle: 'Empyrean LMS global expansion strategy' },
  '/portal/university-os': { title: 'University OS', subtitle: 'AI-powered command infrastructure for YJU operations' },
  '/portal/university-os/command-center': { title: 'Command Center', subtitle: 'Real-time university intelligence dashboard' },
  '/portal/university-os/full-ecosystem': { title: 'Full Ecosystem', subtitle: 'Complete University OS module overview' },
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
            ✦ All AI augments human work; transparency and human flourishing first. Aligned with YJU's Christ-centered AI philosophy. ✦
          </p>
        </footer>
      </div>
    </div>
  );
}
