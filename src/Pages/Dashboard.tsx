// src/Pages/Dashboard.tsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import EducationDashboard from "../Verticals/Education/EducationDashboard";
// import CommunityHealthDashboard from "../Verticals/CommunityHealth/CommunityHealthDashboard"; // future

const Dashboard: React.FC = () => {
  return (
    <Routes>
      <Route path="/education" element={<EducationDashboard />} />
      {/* <Route path="/community-health" element={<CommunityHealthDashboard />} /> */}
      {/* Add other verticals as needed */}
    </Routes>
  );
};

export default Dashboard;
