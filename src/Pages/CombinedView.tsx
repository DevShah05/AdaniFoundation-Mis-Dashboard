// src/Pages/CombineView.tsx
import React from "react";
import EducationDashboard from "../Verticals/Education/EducationDashboard";
// import CommunityHealthDashboard from "../Verticals/CommunityHealth/CommunityHealthDashboard";

const CombineView: React.FC = () => {
  return (
    <div className="space-y-12">
      <EducationDashboard />
      {/* <CommunityHealthDashboard /> */}
    </div>
  );
};

export default CombineView;
