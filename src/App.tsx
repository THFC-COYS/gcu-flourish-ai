import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
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
