// src/Verticals/CommunityHealth/CommunityHealthDashboard.tsx

import React, { useState } from "react";
import { dummyCommunityHealthData } from "../../Data/dummyCommunityHealthData";
import { CommunityHealthCommonMapping } from "../../Data/CommunityHealthCommonMapping";
import { communityHealthFieldLabelMap } from "../../Data/CommunityHealthFieldLabelMap";
import Filters from "../../Components/Filters";
import Charts from "../../Components/Charts";
import KPICards from "../../Components/KPICards";
import ImageSlider from "../../Components/ImageSlider";
import DataTable from "../../Components/DataTable";
import Header from "../../Components/Header";

const CommunityHealthDashboard: React.FC = () => {
  const [selectedSite, setSelectedSite] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedSubActivity, setSelectedSubActivity] = useState("");

  const filteredData = dummyCommunityHealthData.filter((item) => {
    return (
      (selectedSite === "" || item.site === selectedSite) &&
      (selectedActivity === "" || item.activity === selectedActivity) &&
      (selectedSubActivity === "" || item.subActivity === selectedSubActivity)
    );
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <Header title="Community Health Vertical" />

      <Filters
        selectedSite={selectedSite}
        setSelectedSite={setSelectedSite}
        selectedActivity={selectedActivity}
        setSelectedActivity={(val) => {
          setSelectedActivity(val);
          setSelectedSubActivity("");
        }}
        selectedSubActivity={selectedSubActivity}
        setSelectedSubActivity={setSelectedSubActivity}
        data={dummyCommunityHealthData}
      />

      {/* Row 1: Bar and Pie Charts */}
      <Charts
        data={filteredData}
        selectedActivity={selectedActivity}
        selectedSubActivity={selectedSubActivity}
        mapping={CommunityHealthCommonMapping}
      />

      {/* Row 2: Gauge and Image Slider */}
      <div className="flex flex-col lg:flex-row gap-6 px-4 mt-8">
        <div className="flex-1 flex justify-center"></div>
        <div className="flex-1">
          <ImageSlider data={filteredData} />
        </div>
      </div>

      {/* Row 3: KPI Cards */}
      <KPICards
        data={filteredData}
        selectedActivity={selectedActivity}
        selectedSubActivity={selectedSubActivity}
        mapping={CommunityHealthCommonMapping}
        fieldLabelMap={communityHealthFieldLabelMap} // ✅ FIX
      />

      {/* Row 4: Data Table */}
      <DataTable
        data={filteredData}
        fieldLabelMap={communityHealthFieldLabelMap}
      />
    </div>
  );
};

export default CommunityHealthDashboard;
