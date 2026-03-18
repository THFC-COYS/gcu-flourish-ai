import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import MoltLMSHome from './pages/molted/MoltedHome';
import MoltLMSExecTour from './pages/molted/MoltedExecTour';
import MoltLMSInvestors from './pages/molted/MoltedInvestors';
import MoltLMSLumen from './pages/molted/MoltedLumen';
import MoltLMSBeaconAi from './pages/molted/MoltedBeaconAi';
import MoltLMSForge from './pages/molted/MoltedForge';
import MoltLMSPathwayAi from './pages/molted/MoltedPathwayAi';
import MoltLMSProofAi from './pages/molted/MoltedProofAi';
import MoltLMSRetainAi from './pages/molted/MoltedRetainAi';
import MoltLMSOutcomesAi from './pages/molted/MoltedOutcomesAi';
import MoltLMSCampusOS from './pages/molted/MoltedCampusOS';
import MoltLMSImagoOS from './pages/molted/MoltedImagoOS';
import MoltLMSMasteryAi from './pages/molted/MoltedMasteryAi';
import PathwayDemo from './pages/molted/PathwayDemo';
import LumenDemo from './pages/molted/LumenDemo';
import MoltLMSAbout from './pages/molted/MoltedAbout';
import MoltLMSFoundingPartners from './pages/molted/MoltedFoundingPartners';
import LiveAgentDemo from './pages/molted/LiveAgentDemo';
import DiscussionDemo from './pages/molted/DiscussionDemo';
import CourseArchitect from './pages/molted/CourseArchitect';
import AgenticGrader from './pages/molted/AgenticGrader';
import AutoRespond from './pages/molted/AutoRespond';
import EarlyWarning from './pages/molted/EarlyWarning';
import ForgeVoiceDemo from './pages/molted/ForgeVoiceDemo';
import GCULeadershipDeck from './pages/molted/GCULeadershipDeck';
import GovernanceQA from './pages/GovernanceQA';
import ScalingModel from './pages/ScalingModel';
import BeaconDemo from './pages/molted/demos/BeaconDemo';
import RetainAIDemo from './pages/molted/demos/RetainAIDemo';
import OutcomesAIDemo from './pages/molted/demos/OutcomesAIDemo';
import ProofAIDemo from './pages/molted/demos/ProofAIDemo';
import SyllabusSyncDemo from './pages/molted/demos/SyllabusSyncDemo';
import ClinicalAIDemo from './pages/molted/demos/ClinicalAIDemo';
import AdaptiveExamDemo from './pages/molted/demos/AdaptiveExamDemo';
import MondayStack from './pages/molted/MondayStack';
import CrossProductLoop from './pages/molted/CrossProductLoop';
import VoiceABDemo from './pages/molted/VoiceABDemo';

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

  if (!user) return <Navigate to="/gcu/login" replace />;

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
      <Route path="*" element={<Navigate to="/gcu" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Molt — main public website */}
            <Route path="/" element={<MoltLMSHome />} />
            <Route path="/lumen" element={<MoltLMSLumen />} />
            <Route path="/lumen/demo" element={<LumenDemo />} />
            <Route path="/beacon" element={<MoltLMSBeaconAi />} />
            <Route path="/beacon/demo" element={<BeaconDemo />} />
            <Route path="/forge" element={<MoltLMSForge />} />
            <Route path="/pathway-ai" element={<MoltLMSPathwayAi />} />
            <Route path="/pathway-ai/demo" element={<PathwayDemo />} />
            <Route path="/proof-ai" element={<MoltLMSProofAi />} />
            <Route path="/proof-ai/demo" element={<ProofAIDemo />} />
            <Route path="/retain-ai" element={<MoltLMSRetainAi />} />
            <Route path="/retain-ai/demo" element={<RetainAIDemo />} />
            <Route path="/outcomes-ai" element={<MoltLMSOutcomesAi />} />
            <Route path="/outcomes-ai/demo" element={<OutcomesAIDemo />} />
            <Route path="/outpost" element={<MoltLMSCampusOS />} />
            <Route path="/imago-os" element={<MoltLMSImagoOS />} />
            <Route path="/mastery-ai" element={<MoltLMSMasteryAi />} />
            <Route path="/about" element={<MoltLMSAbout />} />
            <Route path="/founding-partners" element={<MoltLMSFoundingPartners />} />
            <Route path="/investors" element={<MoltLMSInvestors />} />
            <Route path="/forge/discussion" element={<DiscussionDemo />} />
            <Route path="/forge/course-architect" element={<CourseArchitect />} />
            <Route path="/forge/agentic-grader" element={<AgenticGrader />} />
            <Route path="/forge/auto-respond" element={<AutoRespond />} />
            <Route path="/forge/early-warning" element={<EarlyWarning />} />
            <Route path="/forge/live-demo" element={<LiveAgentDemo />} />
            <Route path="/forge/voice-demo" element={<ForgeVoiceDemo />} />
            <Route path="/forge/monday-stack" element={<MondayStack />} />
            <Route path="/forge/voice-ab" element={<VoiceABDemo />} />
            <Route path="/syllabussync/demo" element={<SyllabusSyncDemo />} />
            <Route path="/clinical-ai/demo" element={<ClinicalAIDemo />} />
            <Route path="/adaptive-exam/demo" element={<AdaptiveExamDemo />} />
            <Route path="/cross-product-loop" element={<CrossProductLoop />} />
            <Route path="/command-center" element={<CommandCenter />} />
            <Route path="/exec-tour" element={<MoltLMSExecTour />} />
            <Route path="/gcu-deck" element={<GCULeadershipDeck />} />
            {/* GCU Flourish — client portal */}
            <Route path="/gcu/login" element={<LoginGuard />} />
            <Route path="/executive-tour" element={<ExecutiveTour />} />
            <Route path="/gcu/*" element={<ProtectedRoutes />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

function LoginGuard() {
  const { user, isLoading } = useAuth();
  if (isLoading) return null;
  if (user) return <Navigate to="/gcu" replace />;
  return <Login />;
}
