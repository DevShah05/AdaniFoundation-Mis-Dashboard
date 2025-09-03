import React, { useMemo, useState } from "react";
import { FaGraduationCap } from "react-icons/fa";

import Header from "../../Components/Header";
import Filters from "../../Components/Filters";
import BarChartSection from "../../Components/BarChartSection";
import PieChartSection from "../../Components/PieChartSection";
import GaugeChart from "../../Components/GaugeChartSection";
import ImageSlider from "../../Components/ImageSlider";
import KPICards from "../../Components/KPICards";
import DataTable from "../../Components/DataTable";

import { EducationCommonMapping } from "../../Data/EducationCommonMapping";
import { educationFieldLabelMap } from "../../Data/EducationFieldLabelMap";


import { useEducationRecords } from "../../features/Education/hooks";

type Row = Record<string, any>;

const EducationDashboard: React.FC = () => {
  const [selectedSite, setSelectedSite] = useState<string>("");
  const [selectedActivity, setSelectedActivity] = useState<string>("");
  const [selectedSubActivity, setSelectedSubActivity] = useState<string>("");

  // Live data from APIs (combined across the selected form(s))
  const { records, loading, error } = useEducationRecords({
    site: selectedSite || undefined,
    activity: selectedActivity || undefined,
    subActivity: selectedSubActivity || undefined,
  });

  const filteredData: Row[] = useMemo(() => records ?? [], [records]);

  // Completion % (Planned vs Executed)
  const key = selectedSubActivity || selectedActivity;
  const map = EducationCommonMapping[key as keyof typeof EducationCommonMapping];

  const totalPlanned = filteredData.reduce(
    (s: number, r: Row) => s + (map ? Number(r?.[map.plannedField] ?? 0) : 0),
    0
  );
  const totalExecuted = filteredData.reduce(
    (s: number, r: Row) => s + (map ? Number(r?.[map.executedField] ?? 0) : 0),
    0
  );
  const completion = totalPlanned > 0 ? Math.round((totalExecuted / totalPlanned) * 100) : 0;

  // Images
  const sliderImages = useMemo(() => {
    const urls: string[] = [];
    for (const r of filteredData) {
      (r.preActivityImages || []).forEach((u: string) => urls.push(u));
      (r.postActivityImages || []).forEach((u: string) => urls.push(u));
      (r.uploadedImages || []).forEach((u: string) => urls.push(u));
    }
    return urls;
  }, [filteredData]);

  // Dynamic columns using your label map
  const dynamicKeys = useMemo(
    () =>
      Array.from(
        new Set(
          filteredData.flatMap((r: Row) =>
            Object.keys(r).filter((k) => educationFieldLabelMap[k])
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
      ...dynamicKeys.map((k) => ({ key: k, label: educationFieldLabelMap[k] })),
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
      <Header title="Education" icon={<FaGraduationCap />} />

      <div className="p-4 sm:p-6 space-y-6 max-w-screen-xl mx-auto">
        <Filters
          selectedSite={selectedSite}
          setSelectedSite={setSelectedSite}
          selectedActivity={selectedActivity}
          setSelectedActivity={(v) => {
            setSelectedActivity(v);
            setSelectedSubActivity("");
          }}
          selectedSubActivity={selectedSubActivity}
          setSelectedSubActivity={setSelectedSubActivity}
          data={filteredData}
        />

        {/* Loading/Error banners */}
        {loading && (
          <div className="bg-white rounded-lg shadow p-3 text-sm text-gray-600">
            Loading data…
          </div>
        )}
        {Boolean(error) && (
          <div className="bg-white rounded-lg shadow p-3 text-sm text-red-600">
            Failed to load data: {String((error as any)?.message ?? error)}
          </div>
        )}

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BarChartSection
            data={filteredData}
            selectedActivity={selectedActivity}
            selectedSubActivity={selectedSubActivity}
            mapping={EducationCommonMapping}
          />
          <PieChartSection
            data={filteredData}
            selectedActivity={selectedActivity}
            selectedSubActivity={selectedSubActivity}
            mapping={EducationCommonMapping}
          />
        </div>

        {/* Gauge + Images */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-semibold text-[#007BBD] mb-2">Completion %</h3>
            <GaugeChart percentage={completion} label={key || "All activities"} />
          </div>
          <ImageSlider title="Activity Images" images={sliderImages} />
        </div>

        {/* KPIs + Table */}
        <KPICards
          data={filteredData}
          selectedActivity={selectedActivity}
          selectedSubActivity={selectedSubActivity}
          mapping={EducationCommonMapping}
          fieldLabelMap={educationFieldLabelMap}
        />

        <DataTable data={tableData} columns={columns} />
      </div>
    </div>
  );
};

export default EducationDashboard;
