import React from "react";
import { Route, Routes } from "react-router-dom";
import EducationDashboard from "../Verticals/Education/EducationDashboard";

const Dashboard: React.FC = () => {
  return (
    <Routes>
      {/* Default route inside /education/* */}
      <Route path="/" element={<EducationDashboard />} />
    </Routes>
  );
};

export default Dashboard;
