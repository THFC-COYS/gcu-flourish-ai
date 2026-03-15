import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import JarvisDashboard from './pages/JarvisDashboard';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <JarvisDashboard />
  </StrictMode>
);
