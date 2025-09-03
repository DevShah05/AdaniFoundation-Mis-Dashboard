import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from "react-router-dom";

import EducationDashboard from "./Pages/Education/EducationDashboard";
import CommunityHealthDashboard from "./Pages/CommunityHealth/CommunityHealthDashboard";
import Login from "./Pages/Auth/Login";               // ✅ new login page
import RequireAuth from "./Components/RequiredAuth";  // ✅ route guard
import { logout } from "./utils/auth";               // ✅ logout helper

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-[100svh] bg-[#F7F9FC] flex flex-col">
        {/* Top navigation */}
        <nav className="bg-white shadow px-4 py-3 flex gap-4 items-center">
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

          {/* Logout button */}
          <div className="ml-auto">
            <button
              onClick={() => {
                logout();
                location.href = "/login";
              }}
              className="text-sm text-[#007BBD] hover:underline"
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Routes */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/education" replace />} />

            {/* Login route (unprotected) */}
            <Route path="/login" element={<Login />} />

            {/* Protected dashboards */}
            <Route
              path="/education"
              element={
                <RequireAuth>
                  <EducationDashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/community-health"
              element={
                <RequireAuth>
                  <CommunityHealthDashboard />
                </RequireAuth>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
