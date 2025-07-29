// src/Verticals/Education/EducationDashboard.tsx
import React, { useState } from "react";
import { dummyEducationData } from "Data/dummyEducationData";
import { EducationCommonMapping } from "Data/EducationCommonMapping";
import Filters from "Components/Filters";
import Charts from "Components/Charts";
import KPICards from "Components/KPICards";
import ImageSlider from "Components/ImageSlider";
import DataTable from "Components/DataTable";
import Header from "Components/Header";

const EducationDashboard: React.FC = () => {
  const [selectedSite, setSelectedSite] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedSubActivity, setSelectedSubActivity] = useState("");

  // Filter logic
  const filteredData = dummyEducationData.filter((item) => {
    return (
      (selectedSite === "" || item.site === selectedSite) &&
      (selectedActivity === "" || item.activity === selectedActivity) &&
      (selectedSubActivity === "" || item.subActivity === selectedSubActivity)
    );
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <Header title="Education Vertical" />

      {/* Filters */}
      <Filters
        selectedSite={selectedSite}
        setSelectedSite={setSelectedSite}
        selectedActivity={selectedActivity}
        setSelectedActivity={(val) => {
          setSelectedActivity(val);
          setSelectedSubActivity(""); // reset sub-activity when activity changes
        }}
        selectedSubActivity={selectedSubActivity}
        setSelectedSubActivity={setSelectedSubActivity}
        data={dummyEducationData}
      />

      {/* Charts */}
      <Charts
        data={filteredData}
        selectedActivity={selectedActivity}
        selectedSubActivity={selectedSubActivity}
        mapping={EducationCommonMapping}
      />

      {/* KPI Cards */}
      <KPICards
        data={filteredData}
        selectedActivity={selectedActivity}
        selectedSubActivity={selectedSubActivity}
        mapping={EducationCommonMapping}
      />

      {/* Image Slider */}
      <ImageSlider data={filteredData} />

      {/* Data Table */}
      <DataTable data={filteredData} />
    </div>
  );
};

export default EducationDashboard;
