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
            .filter((item) => item.activity === selectedActivity && item.subActivity !== "")
            .map((item) => item.subActivity)
        )
      ).sort()
    : [];

  return (
    <div className="w-full bg-white p-4 rounded shadow-sm">
      <div className="flex flex-wrap gap-4 justify-start items-end">
        {/* Site Filter */}
        <div className="w-full sm:w-1/3 md:w-1/4">
          <label className="block text-gray-700 text-xs font-semibold mb-1">Site</label>
          <select
            value={selectedSite}
            onChange={(e) => setSelectedSite(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="">All</option>
            {siteOptions.map((site, index) => (
              <option key={index} value={site}>
                {site}
              </option>
            ))}
          </select>
        </div>

        {/* Activity Filter */}
        <div className="w-full sm:w-1/3 md:w-1/4">
          <label className="block text-gray-700 text-xs font-semibold mb-1">Activity</label>
          <select
            value={selectedActivity}
            onChange={(e) => {
              setSelectedActivity(e.target.value);
              setSelectedSubActivity("");
            }}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="">All</option>
            {activityOptions.map((activity, index) => (
              <option key={index} value={activity}>
                {activity}
              </option>
            ))}
          </select>
        </div>

        {/* Sub-Activity Filter */}
        {subActivityOptions.length > 0 && (
          <div className="w-full sm:w-1/3 md:w-1/4">
            <label className="block text-gray-700 text-xs font-semibold mb-1">Sub-Activity</label>
            <select
              value={selectedSubActivity}
              onChange={(e) => setSelectedSubActivity(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
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
    </div>
  );
};

export default Filters;
