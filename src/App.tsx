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
import MoltedHome from './pages/molted/MoltedHome';
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
          <p className="text-white/60 text-sm mt-3">Loading GCU Flourish AI…</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="library" element={<PrototypeLibrary />} />
        <Route path="builder" element={<Builder />} />
        <Route path="testing" element={<TestingZone />} />
        <Route path="commercialization" element={<Commercialization />} />
        <Route path="resources" element={<Resources />} />
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
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginGuard />} />
            <Route path="/executive-tour" element={<ExecutiveTour />} />
            {/* MoltED Ai — public company website */}
            <Route path="/molted" element={<MoltedHome />} />
            <Route path="/molted/lumen" element={<MoltedLumen />} />
            <Route path="/molted/beacon" element={<MoltedBeaconAi />} />
            <Route path="/molted/forge" element={<MoltedForge />} />
            <Route path="/molted/pathway-ai" element={<MoltedPathwayAi />} />
            <Route path="/molted/proof-ai" element={<MoltedProofAi />} />
            <Route path="/molted/retain-ai" element={<MoltedRetainAi />} />
            <Route path="/molted/outcomes-ai" element={<MoltedOutcomesAi />} />
            <Route path="/molted/outpost" element={<MoltedCampusOS />} />
            <Route path="/molted/imago-os" element={<MoltedImagoOS />} />
            <Route path="/molted/mastery-ai" element={<MoltedMasteryAi />} />
            <Route path="/molted/about" element={<MoltedAbout />} />
            <Route path="/molted/founding-partners" element={<MoltedFoundingPartners />} />
            <Route path="/molted/investors" element={<MoltedInvestors />} />
            <Route path="/molted/forge/discussion" element={<DiscussionDemo />} />
            <Route path="/molted/forge/course-architect" element={<CourseArchitect />} />
            <Route path="/molted/forge/agentic-grader" element={<AgenticGrader />} />
            <Route path="/molted/forge/auto-respond" element={<AutoRespond />} />
            <Route path="/molted/forge/early-warning" element={<EarlyWarning />} />
            <Route path="/molted/forge/live-demo" element={<LiveAgentDemo />} />
            <Route path="/molted/forge/voice-demo" element={<ForgeVoiceDemo />} />
            <Route path="/*" element={<ProtectedRoutes />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

function LoginGuard() {
  const { user, isLoading } = useAuth();
  if (isLoading) return null;
  if (user) return <Navigate to="/" replace />;
  return <Login />;
}
