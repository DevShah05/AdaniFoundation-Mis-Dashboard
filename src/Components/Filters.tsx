import React, { useMemo } from "react";

interface FiltersProps {
  selectedSite: string;
  setSelectedSite: (site: string) => void;
  selectedActivity: string;
  setSelectedActivity: (activity: string) => void;
  selectedSubActivity: string;
  setSelectedSubActivity: (subActivity: string) => void;
  data: any[];
  className?: string;
}

const Filters: React.FC<FiltersProps> = ({
  selectedSite,
  setSelectedSite,
  selectedActivity,
  setSelectedActivity,
  selectedSubActivity,
  setSelectedSubActivity,
  data,
  className = "",
}) => {
  const siteOptions = useMemo(
    () =>
      Array.from(new Set(data.map((d) => (d.site != null ? String(d.site) : ""))))
        .filter(Boolean)
        .sort((a, b) => String(a).localeCompare(String(b))),
    [data]
  );

  const activityOptions = useMemo(
    () =>
      Array.from(new Set(data.map((d) => (d.activity != null ? String(d.activity) : ""))))
        .filter(Boolean)
        .sort((a, b) => String(a).localeCompare(String(b))),
    [data]
  );

  const subActivityOptions = useMemo(() => {
    if (!selectedActivity) return [];
    return Array.from(
      new Set(
        data
          .filter(
            (d) =>
              d.activity === selectedActivity &&
              d.subActivity !== undefined &&
              d.subActivity !== ""
          )
          .map((d) => String(d.subActivity))
      )
    ).sort((a, b) => a.localeCompare(b));
  }, [data, selectedActivity]);

  const resetAll = () => {
    setSelectedSite("");
    setSelectedActivity("");
    setSelectedSubActivity("");
  };

  return (
    <section className={`w-full bg-white rounded-lg shadow p-4 ring-1 ring-black/5 ${className}`} aria-label="Filters">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-[#007BBD]">Filters</h3>
        <button
          type="button"
          onClick={resetAll}
          className="text-xs font-semibold text-[#007BBD] hover:text-[#005e8e] px-2 py-1 rounded-md hover:bg-[#007BBD]/10 transition"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
        <div className="flex flex-col">
          <label htmlFor="filter-site" className="text-gray-700 text-xs font-semibold mb-1">Site</label>
          <select
            id="filter-site"
            value={selectedSite}
            onChange={(e) => setSelectedSite(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#007BBD]/30"
          >
            <option value="">All</option>
            {siteOptions.map((site) => (
              <option key={site} value={site}>{site}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="filter-activity" className="text-gray-700 text-xs font-semibold mb-1">Activity</label>
          <select
            id="filter-activity"
            value={selectedActivity}
            onChange={(e) => {
              setSelectedActivity(e.target.value);
              setSelectedSubActivity("");
            }}
            className="w-full border border-gray-300 rounded px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#007BBD]/30"
          >
            <option value="">All</option>
            {activityOptions.map((activity) => (
              <option key={activity} value={activity}>{activity}</option>
            ))}
          </select>
        </div>

        {selectedActivity && subActivityOptions.length > 0 ? (
          <div className="flex flex-col">
            <label htmlFor="filter-subactivity" className="text-gray-700 text-xs font-semibold mb-1">Sub-Activity</label>
            <select
              id="filter-subactivity"
              value={selectedSubActivity}
              onChange={(e) => setSelectedSubActivity(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#007BBD]/30"
            >
              <option value="">All</option>
              {subActivityOptions.map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>
        ) : selectedActivity ? (
          <div className="text-[11px] text-gray-500">No sub-activities for “{selectedActivity}”.</div>
        ) : null}
      </div>
    </section>
  );
};

export default Filters;


