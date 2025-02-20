import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { OnboardingLayout } from './components/OnboardingLayout';
import { Welcome } from './pages/Welcome';
import { Signup } from './pages/Signup';
import { VerifyEmail } from './pages/VerifyEmail';
import { EnrichmentLoading } from './pages/EnrichmentLoading';
import { EnrichmentResults } from './pages/EnrichmentResults';
import { UseCases } from './pages/UseCases';
import { DataSources } from './pages/DataSources';
import { Success } from './pages/Success';
import { SetupAcquisition } from './pages/SetupAcquisition';
import { SetupProductAnalytics } from './pages/SetupProductAnalytics';
import Dashboard from './pages/Dashboard';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<OnboardingLayout />}>
            <Route path="/" element={<Welcome />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/enrichment" element={<EnrichmentLoading />} />
            <Route path="/enrichment-results" element={<EnrichmentResults />} />
            <Route path="/customize" element={<UseCases />} />
            <Route path="/connect" element={<DataSources />} />
            <Route path="/setup-acquisition" element={<SetupAcquisition />} />
            <Route path="/setup-product/*" element={<SetupProductAnalytics />} />
            <Route path="/success" element={<Success />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App