import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import CombinedView from "./Pages/CombinedView";
import CommunityHealthDashboard from "./Verticals/CommunityHealth/CommunityHealthDashboard";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">

        {/* 🔹 Navigation Bar */}
        <nav className="bg-white shadow p-4 flex gap-4">
          <Link to="/education" className="text-blue-600 hover:underline">
            Education
          </Link>
          <Link to="/community-health" className="text-blue-600 hover:underline">
            Community Health
          </Link>
          <Link to="/combined" className="text-blue-600 hover:underline">
            Combined View
          </Link>
        </nav>

        <Routes>
          {/* Redirect root to /education */}
          <Route path="/" element={<Navigate to="/education" />} />

          {/* Education Vertical */}
          <Route path="/education/*" element={<Dashboard />} />

          {/* Community Health Vertical */}
          <Route path="/community-health" element={<CommunityHealthDashboard />} />

          {/* Combined View */}
          <Route path="/combined" element={<CombinedView />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
