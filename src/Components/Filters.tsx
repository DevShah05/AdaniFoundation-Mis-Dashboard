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
    <div className="w-full bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">

        {/* Site Filter */}
        <div className="flex flex-col">
          <label className="text-gray-700 text-sm font-semibold mb-1">Site</label>
          <select
            value={selectedSite}
            onChange={(e) => setSelectedSite(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
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
        <div className="flex flex-col">
          <label className="text-gray-700 text-sm font-semibold mb-1">Activity</label>
          <select
            value={selectedActivity}
            onChange={(e) => {
              setSelectedActivity(e.target.value);
              setSelectedSubActivity("");
            }}
            className="border border-gray-300 rounded-lg p-2 w-full"
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
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-semibold mb-1">Sub-Activity</label>
            <select
              value={selectedSubActivity}
              onChange={(e) => setSelectedSubActivity(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
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

        {/* Placeholder for 4th column if Sub-Activity not shown */}
        {subActivityOptions.length === 0 && (
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-semibold mb-1">&nbsp;</label>
            <div className="border border-transparent rounded-lg p-2 w-full"></div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Filters;
