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
  Legend,
  LabelList,
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
  show: "bar" | "pie";
}

const COLORS = ["#6B1E82", "#E6518B"];

const Charts: React.FC<ChartsProps> = ({
  data,
  selectedActivity,
  selectedSubActivity,
  mapping,
  show,
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

  return (
    <div className="w-full">
      {show === "bar" && (
        <>
          <h2 className="text-lg font-semibold text-[#6B1E82] mb-2">
            Planned vs Executed
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData} barCategoryGap="30%" barSize={24}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Planned" fill="#6B1E82" radius={[10, 10, 0, 0]}>
                <LabelList dataKey="Planned" position="top" />
              </Bar>
              <Bar dataKey="Executed" fill="#E6518B" radius={[10, 10, 0, 0]}>
                <LabelList dataKey="Executed" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </>
      )}

      {show === "pie" && (
        <>
          <h2 className="text-lg font-semibold text-[#6B1E82] mb-2 text-center">
            Gender-wise Beneficiaries
          </h2>
          <ResponsiveContainer width="100%" height={260}>
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
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
};

export default Charts;
