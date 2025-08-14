// src/Pages/CommunityHealth/CommunityHealthDashboard.tsx
import React, { useMemo, useState } from "react";
import { FaHeartbeat } from "react-icons/fa";

import Header from "../../Components/Header";
import Filters from "../../Components/Filters";
import BarChartSection from "../../Components/BarChartSection";
import PieChartSection from "../../Components/PieChartSection";
import GaugeChart from "../../Components/GaugeChartSection"; // or "../../Components/GaugeChart" if that's your file name
import ImageSlider from "../../Components/ImageSlider";
import KPICards from "../../Components/KPICards";
import DataTable from "../../Components/DataTable";

import { dummyCommunityHealthData } from "../../Data/dummyCommunityHealthData";
import { CommunityHealthCommonMapping } from "../../Data/CommunityHealthCommonMapping";
import { communityHealthFieldLabelMap } from "../../Data/CommunityHealthFieldLabelMap";

type Row = Record<string, any>;

const CommunityHealthDashboard: React.FC = () => {
  // filters
  const [selectedSite, setSelectedSite] = useState<string>("");
  const [selectedActivity, setSelectedActivity] = useState<string>("");
  const [selectedSubActivity, setSelectedSubActivity] = useState<string>("");

  // filtered rows
  const filteredData = useMemo(
    () =>
      dummyCommunityHealthData.filter((row: Row) => {
        const matchSite = !selectedSite || row.site === selectedSite;
        const matchActivity = !selectedActivity || row.activity === selectedActivity;
        const matchSub = !selectedSubActivity || row.subActivity === selectedSubActivity;
        return matchSite && matchActivity && matchSub;
      }),
    [selectedSite, selectedActivity, selectedSubActivity]
  );

  // gauge: completion % for current selection
  const key = selectedSubActivity || selectedActivity;
  const map =
    CommunityHealthCommonMapping[key as keyof typeof CommunityHealthCommonMapping];

  const totalPlanned = filteredData.reduce(
    (s: number, r: Row) => s + (map ? r?.[map.plannedField] ?? 0 : 0),
    0
  );
  const totalExecuted = filteredData.reduce(
    (s: number, r: Row) => s + (map ? r?.[map.executedField] ?? 0 : 0),
    0
  );
  const completion = totalPlanned > 0 ? Math.round((totalExecuted / totalPlanned) * 100) : 0;

  // images for slider
  const sliderImages = useMemo(() => {
    const urls: string[] = [];
    for (const r of filteredData) {
      (r.preActivityImages || []).forEach((u: string) => urls.push(u));
      (r.postActivityImages || []).forEach((u: string) => urls.push(u));
      (r.uploadedImages || []).forEach((u: string) => urls.push(u));
    }
    return urls;
  }, [filteredData]);

  // dynamic table columns
  const dynamicKeys = useMemo(
    () =>
      Array.from(
        new Set(
          filteredData.flatMap((r: Row) =>
            Object.keys(r).filter((k) => communityHealthFieldLabelMap[k])
          )
        )
      ),
    [filteredData]
  );

  const columns = useMemo(
    () => [
      { key: "site", label: "Site" },
      { key: "activity", label: "Activity" },
      { key: "subActivity", label: "Sub-Activity" },
      ...dynamicKeys.map((k) => ({ key: k, label: communityHealthFieldLabelMap[k] })),
      { key: "timestamp", label: "Timestamp" },
    ],
    [dynamicKeys]
  );

  const tableData = useMemo(
    () =>
      filteredData.map((r: Row) => ({
        ...r,
        timestamp: r.timestamp ? new Date(r.timestamp).toLocaleString() : "-",
      })),
    [filteredData]
  );

  return (
    <div className="bg-[#F7F9FC] text-gray-800">
      <Header title="Community Health" icon={<FaHeartbeat />} />

      <div className="p-4 sm:p-6 space-y-6 max-w-screen-xl mx-auto">
        {/* Filters */}
        <Filters
          selectedSite={selectedSite}
          setSelectedSite={setSelectedSite}
          selectedActivity={selectedActivity}
          setSelectedActivity={(v) => {
            setSelectedActivity(v);
            setSelectedSubActivity(""); // reset sub-activity when activity changes
          }}
          selectedSubActivity={selectedSubActivity}
          setSelectedSubActivity={setSelectedSubActivity}
          data={dummyCommunityHealthData}
        />

        {/* Row 1: Bar | Pie */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BarChartSection
            data={filteredData}
            selectedActivity={selectedActivity}
            selectedSubActivity={selectedSubActivity}
            mapping={CommunityHealthCommonMapping}
          />
          <PieChartSection
            data={filteredData}
            selectedActivity={selectedActivity}
            selectedSubActivity={selectedSubActivity}
            mapping={CommunityHealthCommonMapping}
          />
        </div>

        {/* Row 2: Gauge | Image Slider */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-semibold text-[#007BBD] mb-2">Completion %</h3>
            <GaugeChart percentage={completion} label={key || "All activities"} />
          </div>
          <ImageSlider title="Activity Images" images={sliderImages} />
        </div>

        {/* Row 3: KPI Carousel */}
        <KPICards
          data={filteredData}
          selectedActivity={selectedActivity}
          selectedSubActivity={selectedSubActivity}
          mapping={CommunityHealthCommonMapping}
          fieldLabelMap={communityHealthFieldLabelMap}
        />

        {/* Row 4: Data Table */}
        <DataTable data={tableData} columns={columns} />
      </div>
    </div>
  );
};

export default CommunityHealthDashboard;
