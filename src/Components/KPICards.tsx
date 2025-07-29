import React from "react";
import CountUp from "react-countup";
import { educationFieldLabelMap } from "../Data/EducationFieldLabelMap";

interface KPICardsProps {
  data: any[];
  selectedActivity: string;
  selectedSubActivity: string;
  mapping: Record<
    string,
    {
      plannedField: string;
      executedField: string;
      girlsField: string;
      boysField: string;
    }
  >;
}

const KPICards: React.FC<KPICardsProps> = ({
  data,
  selectedActivity,
  selectedSubActivity,
  mapping,
}) => {
  if (!data || data.length === 0) return null;

  // Determine which key to use from the mapping
  const key = selectedSubActivity || selectedActivity;

  // If no selection or invalid key, return null
  if (!key || !mapping[key]) return null;

  // Extract the relevant field names for this activity/sub-activity
  const fieldsToShow = Object.values(mapping[key]);

  // Calculate totals for each field
  const totals: Record<string, number> = {};
  fieldsToShow.forEach((field) => {
    totals[field] = data.reduce((sum, row) => sum + (row[field] || 0), 0);
  });

  // Prepare for display
  const displayData = Object.entries(totals).map(([field, value]) => ({
    label: educationFieldLabelMap[field] || field,
    value,
  }));

  // Split into chunks of 4 for rows
  const chunked = [];
  for (let i = 0; i < displayData.length; i += 4) {
    chunked.push(displayData.slice(i, i + 4));
  }

  return (
    <div className="mt-8 px-4 space-y-6">
      {chunked.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {row.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center"
            >
              <h4 className="text-sm text-gray-500 mb-1 text-center">{item.label}</h4>
              <div className="text-2xl font-bold text-[#6B1E82]">
                <CountUp end={item.value} duration={1.5} separator="," />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default KPICards;