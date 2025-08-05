import React from "react";
import CountUp from "react-countup";

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
  fieldLabelMap: Record<string, string>; // ✅ New prop for dynamic label mapping
}

const KPICards: React.FC<KPICardsProps> = ({
  data,
  selectedActivity,
  selectedSubActivity,
  mapping,
  fieldLabelMap,
}) => {
  if (!data || data.length === 0) return null;

  const key = selectedSubActivity || selectedActivity;
  if (!key || !mapping[key]) return null;

  const fieldsToShow = Object.values(mapping[key]);
  const totals: Record<string, number> = {};

  fieldsToShow.forEach((field) => {
    totals[field] = data.reduce((sum, row) => sum + (row[field] || 0), 0);
  });

  const displayData = Object.entries(totals).map(([field, value]) => ({
    label: fieldLabelMap[field] || field,
    value,
  }));

  const chunked = [];
  for (let i = 0; i < displayData.length; i += 4) {
    chunked.push(displayData.slice(i, i + 4));
  }

  return (
    <div className="mt-8 px-4 space-y-6">
      <h2 className="text-lg font-semibold text-[#6B1E82] mb-2">
        Key Performance Indicators
      </h2>
      {chunked.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
        >
          {row.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center min-h-[100px] hover:shadow-lg transition"
            >
              <h4 className="text-sm text-gray-600 mb-1 text-center">
                {item.label}
              </h4>
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
