import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UniversityOS from './pages/university-os/UniversityOS';
import CommandCenter from './pages/university-os/CommandCenter';
import DepartmentConsole from './pages/university-os/DepartmentConsole';
import FullEcosystem from './pages/university-os/FullEcosystem';
import PrototypeLibrary from './pages/PrototypeLibrary';
import Builder from './pages/Builder';
import TestingZone from './pages/TestingZone';
import Commercialization from './pages/Commercialization';
import Resources from './pages/Resources';
import VisionRoadmap from './pages/VisionRoadmap';
import SpiritNetwork from './pages/SpiritNetwork';
import FlourishAPI from './pages/FlourishAPI';
import FlourishRobotics from './pages/FlourishRobotics';
import ExecutiveBriefing from './pages/ExecutiveBriefing';
import FlourishStandard from './pages/FlourishStandard';
import SpiritTraining from './pages/SpiritTraining';
import ExecutiveTour from './pages/ExecutiveTour';
import GovernanceQA from './pages/GovernanceQA';
import ScalingModel from './pages/ScalingModel';
import LearningSystemsModernization from './pages/LearningSystemsModernization';
import MoltedHome from './pages/molted/MoltedHome';
import MoltedExecTour from './pages/molted/MoltedExecTour';
import MoltedInvestors from './pages/molted/MoltedInvestors';
import MoltedLumen from './pages/molted/MoltedLumen';
import MoltedBeaconAi from './pages/molted/MoltedBeaconAi';
import MoltedForge from './pages/molted/MoltedForge';
import MoltedPathwayAi from './pages/molted/MoltedPathwayAi';
import MoltedProofAi from './pages/molted/MoltedProofAi';
import MoltedRetainAi from './pages/molted/MoltedRetainAi';
import MoltedOutcomesAi from './pages/molted/MoltedOutcomesAi';
import MoltedCampusOS from './pages/molted/MoltedCampusOS';
import MoltedImagoOS from './pages/molted/MoltedImagoOS';
import MoltedMasteryAi from './pages/molted/MoltedMasteryAi';
import MoltedAbout from './pages/molted/MoltedAbout';
import MoltedFoundingPartners from './pages/molted/MoltedFoundingPartners';
import LiveAgentDemo from './pages/molted/LiveAgentDemo';
import DiscussionDemo from './pages/molted/DiscussionDemo';
import CourseArchitect from './pages/molted/CourseArchitect';
import AgenticGrader from './pages/molted/AgenticGrader';
import AutoRespond from './pages/molted/AutoRespond';
import EarlyWarning from './pages/molted/EarlyWarning';
import ForgeVoiceDemo from './pages/molted/ForgeVoiceDemo';
import GCULeadershipDeck from './pages/molted/GCULeadershipDeck';
import MoltBoard from './pages/molted/MoltBoard';
import BeaconDemo from './pages/molted/demos/BeaconDemo';
import RetainAIDemo from './pages/molted/demos/RetainAIDemo';
import OutcomesAIDemo from './pages/molted/demos/OutcomesAIDemo';
import ProofAIDemo from './pages/molted/demos/ProofAIDemo';
import SyllabusSyncDemo from './pages/molted/demos/SyllabusSyncDemo';
import ClinicalAIDemo from './pages/molted/demos/ClinicalAIDemo';
import AdaptiveExamDemo from './pages/molted/demos/AdaptiveExamDemo';
import PathwayDemo from './pages/molted/PathwayDemo';
import LumenDemo from './pages/molted/LumenDemo';

function ProtectedRoutes() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen purple-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-gcu-gold flex items-center justify-center mx-auto mb-4">
            <span className="font-black text-gcu-purple-dark text-lg">GCU</span>
          </div>
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
          <p className="text-white/60 text-sm mt-3">Loading Empyrean LMS…</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/portal/login" replace />;

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="library" element={<PrototypeLibrary />} />
        <Route path="builder" element={<Builder />} />
        <Route path="testing" element={<TestingZone />} />
        <Route path="commercialization" element={<Commercialization />} />
        <Route path="resources" element={<Resources />} />
        <Route path="governance-qa" element={<GovernanceQA />} />
        <Route path="scaling-model" element={<ScalingModel />} />
        <Route path="learning-systems" element={<LearningSystemsModernization />} />
        <Route path="vision" element={<VisionRoadmap />} />
        <Route path="spirit-network" element={<SpiritNetwork />} />
        <Route path="flourish-api" element={<FlourishAPI />} />
        <Route path="flourish-robotics" element={<FlourishRobotics />} />
        <Route path="executive-brief" element={<ExecutiveBriefing />} />
        <Route path="flourish-standard" element={<FlourishStandard />} />
        <Route path="spirit-training" element={<SpiritTraining />} />
        <Route path="university-os" element={<UniversityOS />} />
        <Route path="university-os/command-center" element={<CommandCenter />} />
        <Route path="university-os/department/:deptId" element={<DepartmentConsole />} />
        <Route path="university-os/full-ecosystem" element={<FullEcosystem />} />
      </Route>
      <Route path="*" element={<Navigate to="/portal" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* MoltALP — main public website */}
            <Route path="/" element={<MoltedHome />} />
            <Route path="/lumen" element={<MoltedLumen />} />
            <Route path="/beacon" element={<MoltedBeaconAi />} />
            <Route path="/forge" element={<MoltedForge />} />
            <Route path="/pathway-ai" element={<MoltedPathwayAi />} />
            <Route path="/proof-ai" element={<MoltedProofAi />} />
            <Route path="/retain-ai" element={<MoltedRetainAi />} />
            <Route path="/outcomes-ai" element={<MoltedOutcomesAi />} />
            <Route path="/outpost" element={<MoltedCampusOS />} />
            <Route path="/imago-os" element={<MoltedImagoOS />} />
            <Route path="/mastery-ai" element={<MoltedMasteryAi />} />
            <Route path="/about" element={<MoltedAbout />} />
            <Route path="/founding-partners" element={<MoltedFoundingPartners />} />
            <Route path="/investors" element={<MoltedInvestors />} />
            <Route path="/forge/discussion" element={<DiscussionDemo />} />
            <Route path="/forge/course-architect" element={<CourseArchitect />} />
            <Route path="/forge/agentic-grader" element={<AgenticGrader />} />
            <Route path="/beacon/demo" element={<BeaconDemo />} />
            <Route path="/retain-ai/demo" element={<RetainAIDemo />} />
            <Route path="/outcomes-ai/demo" element={<OutcomesAIDemo />} />
            <Route path="/proof-ai/demo" element={<ProofAIDemo />} />
            <Route path="/syllabussync/demo" element={<SyllabusSyncDemo />} />
            <Route path="/clinical-ai/demo" element={<ClinicalAIDemo />} />
            <Route path="/adaptive-exam/demo" element={<AdaptiveExamDemo />} />
            <Route path="/pathway-ai/demo" element={<PathwayDemo />} />
            <Route path="/lumen/demo" element={<LumenDemo />} />
            <Route path="/command-center" element={<CommandCenter />} />
            <Route path="/forge/auto-respond" element={<AutoRespond />} />
            <Route path="/forge/early-warning" element={<EarlyWarning />} />
            <Route path="/forge/live-demo" element={<LiveAgentDemo />} />
            <Route path="/forge/voice-demo" element={<ForgeVoiceDemo />} />
            <Route path="/exec-tour" element={<MoltedExecTour />} />
            <Route path="/gcu-deck" element={<GCULeadershipDeck />} />
            <Route path="/board" element={<MoltBoard />} />
            {/* GCU Flourish — client portal */}
            <Route path="/portal/login" element={<LoginGuard />} />
            <Route path="/executive-tour" element={<ExecutiveTour />} />
            <Route path="/portal/*" element={<ProtectedRoutes />} />
          </Routes>
          <SpeedInsights />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

function LoginGuard() {
  const { user, isLoading } = useAuth();
  if (isLoading) return null;
  if (user) return <Navigate to="/portal" replace />;
  return <Login />;
}
