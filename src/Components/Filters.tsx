// src/Components/Filters.tsx
import React from "react";

interface FiltersProps {
  selectedSite: string;
  setSelectedSite: (site: string) => void;
  selectedActivity: string;
  setSelectedActivity: (activity: string) => void;
  selectedSubActivity: string;
  setSelectedSubActivity: (subActivity: string) => void;
  data: any[];
}

const Filters: React.FC<FiltersProps> = ({
  selectedSite,
  setSelectedSite,
  selectedActivity,
  setSelectedActivity,
  selectedSubActivity,
  setSelectedSubActivity,
  data,
}) => {
  const siteOptions = Array.from(new Set(data.map((item) => item.site))).sort();
  const activityOptions = Array.from(new Set(data.map((item) => item.activity))).sort();

  const subActivityOptions = selectedActivity
    ? Array.from(
        new Set(
          data
            .filter(
              (item) =>
                item.activity === selectedActivity && item.subActivity !== ""
            )
            .map((item) => item.subActivity)
        )
      ).sort()
    : [];

  return (
    <div className="w-full flex flex-wrap items-center justify-start gap-4 bg-white px-4 py-3 rounded shadow mb-6">
      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-1">Site</label>
        <select
          value={selectedSite}
          onChange={(e) => setSelectedSite(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-48"
        >
          <option value="">All</option>
          {siteOptions.map((site, index) => (
            <option key={index} value={site}>
              {site}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-1">Activity</label>
        <select
          value={selectedActivity}
          onChange={(e) => {
            setSelectedActivity(e.target.value);
            setSelectedSubActivity("");
          }}
          className="border border-gray-300 rounded px-3 py-2 w-64"
        >
          <option value="">All</option>
          {activityOptions.map((activity, index) => (
            <option key={index} value={activity}>
              {activity}
            </option>
          ))}
        </select>
      </div>

      {subActivityOptions.length > 0 && (
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">Sub-Activity</label>
          <select
            value={selectedSubActivity}
            onChange={(e) => setSelectedSubActivity(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-64"
          >
            <option value="">All</option>
            {subActivityOptions.map((sub, index) => (
              <option key={index} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Filters;