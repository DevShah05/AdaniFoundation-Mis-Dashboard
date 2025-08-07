import React, { useState } from "react";
import { dummyEducationData } from "../../Data/dummyEducationData";
import { EducationCommonMapping } from "../../Data/EducationCommonMapping";
import { educationFieldLabelMap } from "../../Data/EducationFieldLabelMap";

import Filters from "../../Components/Filters";
import Charts from "../../Components/Charts";
import KPICards from "../../Components/KPICards";
import ImageSlider from "../../Components/ImageSlider";
import DataTable from "../../Components/DataTable";
import Header from "../../Components/Header";
import GaugeChart from "../../Components/GaugeChart";

const EducationDashboard: React.FC = () => {
  const [selectedSite, setSelectedSite] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedSubActivity, setSelectedSubActivity] = useState("");

  const filteredData = dummyEducationData.filter((item) => {
    return (
      (selectedSite === "" || item.site === selectedSite) &&
      (selectedActivity === "" || item.activity === selectedActivity) &&
      (selectedSubActivity === "" || item.subActivity === selectedSubActivity)
    );
  });

  const key = selectedSubActivity || selectedActivity;
  const map = EducationCommonMapping[key];

  const getValue = (item: any, field: string) =>
    (item as Record<string, any>)[field] || 0;

  const totalPlanned = filteredData.reduce(
    (sum, item) => sum + (map ? getValue(item, map.plannedField) : 0),
    0
  );

  const totalExecuted = filteredData.reduce(
    (sum, item) => sum + (map ? getValue(item, map.executedField) : 0),
    0
  );

  const completion =
    totalPlanned > 0 ? Math.round((totalExecuted / totalPlanned) * 100) : 0;

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <Header subtitle="Education Vertical" />

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
        data={dummyEducationData}
      />

      {/* ✅ 2x2 Grid of Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
        <div className="w-full bg-white rounded-lg shadow p-4">
          <Charts
            data={filteredData}
            selectedActivity={selectedActivity}
            selectedSubActivity={selectedSubActivity}
            mapping={EducationCommonMapping}
            show="bar"
          />
        </div>

        <div className="w-full bg-white rounded-lg shadow p-4">
          <Charts
            data={filteredData}
            selectedActivity={selectedActivity}
            selectedSubActivity={selectedSubActivity}
            mapping={EducationCommonMapping}
            show="pie"
          />
        </div>

        <GaugeChart completion={completion} />
        <ImageSlider data={filteredData} />
      </div>

      <KPICards
        data={filteredData}
        selectedActivity={selectedActivity}
        selectedSubActivity={selectedSubActivity}
        mapping={EducationCommonMapping}
        fieldLabelMap={educationFieldLabelMap}
      />

      <DataTable
        data={filteredData}
        fieldLabelMap={educationFieldLabelMap}
      />
    </div>
  );
};

export default EducationDashboard;
