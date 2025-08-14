import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from "react-router-dom";

import EducationDashboard from "./Pages/Education/EducationDashboard";
import CommunityHealthDashboard from "./Pages/CommunityHealth/CommunityHealthDashboard";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-[100svh] bg-[#F7F9FC] flex flex-col">
        <nav className="bg-white shadow px-4 py-3 flex gap-4">
          <NavLink
            to="/education"
            className={({ isActive }) =>
              `hover:underline ${isActive ? "text-[#005e8e] font-semibold" : "text-[#007BBD]"}`
            }
          >
            Education
          </NavLink>
          <NavLink
            to="/community-health"
            className={({ isActive }) =>
              `hover:underline ${isActive ? "text-[#005e8e] font-semibold" : "text-[#007BBD]"}`
            }
          >
            Community Health
          </NavLink>
        </nav>

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/education" replace />} />
            <Route path="/education" element={<EducationDashboard />} />
            <Route path="/community-health" element={<CommunityHealthDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
