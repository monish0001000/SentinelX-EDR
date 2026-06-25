import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';

import Dashboard from './pages/Dashboard';

import Endpoints from './pages/Endpoints';

import Alerts from './pages/Alerts';

import Investigations from './pages/Investigations';

import Cases from './pages/Cases';
import ThreatHunting from './pages/ThreatHunting';

import DetectionRules from './pages/DetectionRules';
import Simulation from './pages/Simulation';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="endpoints" element={<Endpoints />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="investigations" element={<Investigations />} />
          <Route path="cases" element={<Cases />} />
          <Route path="hunting" element={<ThreatHunting />} />
          <Route path="rules" element={<DetectionRules />} />
          <Route path="simulation" element={<Simulation />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
