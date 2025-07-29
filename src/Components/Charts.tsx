// src/Components/Charts.tsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

interface ChartsProps {
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

const COLORS = ["#6B1E82", "#E6518B"];

const Charts: React.FC<ChartsProps> = ({
  data,
  selectedActivity,
  selectedSubActivity,
  mapping,
}) => {
  const filteredData = data.filter((item) => {
    const matchActivity = selectedActivity ? item.activity === selectedActivity : true;
    const matchSub = selectedSubActivity ? item.subActivity === selectedSubActivity : true;
    return matchActivity && matchSub;
  });

  const isSingleSubActivity = !!selectedSubActivity;

  const chartData = isSingleSubActivity
    ? (() => {
        const map = mapping[selectedSubActivity];
        if (!map) return [];
        const total: any = { name: selectedSubActivity, Planned: 0, Executed: 0 };
        filteredData.forEach((item) => {
          total.Planned += item[map.plannedField] || 0;
          total.Executed += item[map.executedField] || 0;
        });
        return [total];
      })()
    : (() => {
        const subActivityGroups: Record<string, { Planned: number; Executed: number }> = {};
        filteredData.forEach((item) => {
          const key = item.subActivity || item.activity;
          const map = mapping[key];
          if (!map) return;

          if (!subActivityGroups[key]) {
            subActivityGroups[key] = { Planned: 0, Executed: 0 };
          }
          subActivityGroups[key].Planned += item[map.plannedField] || 0;
          subActivityGroups[key].Executed += item[map.executedField] || 0;
        });
        return Object.entries(subActivityGroups).map(([name, val]) => ({
          name,
          ...val,
        }));
      })();

  const totalGirls = filteredData.reduce((sum, item) => {
    const map = mapping[item.subActivity || item.activity];
    return sum + (item[map?.girlsField] || 0);
  }, 0);

  const totalBoys = filteredData.reduce((sum, item) => {
    const map = mapping[item.subActivity || item.activity];
    return sum + (item[map?.boysField] || 0);
  }, 0);

  const genderData = [
    { name: "Girls", value: totalGirls },
    { name: "Boys", value: totalBoys },
  ];

  const totalPlanned = chartData.reduce((sum, item) => sum + (item.Planned || 0), 0);
  const totalExecuted = chartData.reduce((sum, item) => sum + (item.Executed || 0), 0);
  const completion = totalPlanned ? Math.round((totalExecuted / totalPlanned) * 100) : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 mt-8">
      {/* Bar Chart */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-sm font-semibold text-[#6B1E82] mb-2">
          Planned vs Executed (Bar)
        </h2>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Planned" fill="#6B1E82" />
            <Bar dataKey="Executed" fill="#E6518B" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-sm font-semibold text-[#6B1E82] mb-2">
          Gender-wise Beneficiaries (Pie)
        </h2>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={genderData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label
            >
              {genderData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Gauge (Custom SVG style) */}
      <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center">
        <h2 className="text-sm font-semibold text-[#6B1E82] mb-2">
          Completion Gauge
        </h2>
        <svg width="160" height="100">
          <circle cx="80" cy="80" r="70" fill="none" stroke="#eee" strokeWidth="14" />
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#6B1E82"
            strokeWidth="14"
            strokeDasharray={`${(completion / 100) * 440},440`}
            transform="rotate(-90 80 80)"
          />
          <text x="80" y="85" textAnchor="middle" fontSize="22" fill="#6B1E82">
            {completion}%
          </text>
        </svg>
      </div>
    </div>
  );
};

export default Charts;
