import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const PAGE_META: Record<string, { title: string; subtitle?: string }> = {
  '/': { title: 'Dashboard', subtitle: 'Overview of GCU Flourish AI platform' },
  '/library': { title: 'Prototype Library', subtitle: 'All 10 college spirit vessels' },
  '/builder': { title: 'Spirit Infusion Builder', subtitle: 'Create & configure new AI prototypes' },
  '/testing': { title: 'Deployment Console', subtitle: 'Deploy and interact with live Spirit Agents — your autonomous AI workforce' },
  '/commercialization': { title: 'Impact & Commercialization Tracker', subtitle: 'Revenue, partnerships, and reinvestment' },
  '/resources': { title: 'Resources & Governance', subtitle: 'Ethical guidelines, policies, and documentation' },
  '/spirit-network': { title: 'Spirit Network', subtitle: 'Alumni wisdom — the living source code of our AI' },
  '/flourish-api': { title: 'Flourish API', subtitle: 'The soul layer for any AI — GCU ethical character as a service' },
  '/flourish-robotics': { title: 'Flourish Robotics', subtitle: 'Phase 2 — Spirit Vessels get bodies · Launching 2027' },
  '/vision': { title: 'Vision & Roadmap', subtitle: 'Phase 1: Digital · Phase 2: Physical embodiment · The global standard' },
  '/executive-brief': { title: 'Executive Briefing', subtitle: 'Presidential summary · The case for GCU as the global authority on ethical AI' },
  '/flourish-standard': { title: 'The Flourish Standard', subtitle: 'GCU\'s ethical AI certification framework · The industry standard we are creating' },
  '/spirit-training': { title: 'Spirit Training Academy', subtitle: 'Practice the hardest human moments — Spirit plays the challenge, you play the professional' },
};

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const meta = PAGE_META[location.pathname] ?? { title: 'GCU Flourish AI' };

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
