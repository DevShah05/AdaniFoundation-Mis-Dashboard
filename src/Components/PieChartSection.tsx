import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface PieChartSectionProps {
  data: any[];
  selectedActivity: string;
  selectedSubActivity: string;
  mapping: Record<string, { plannedField: string; executedField: string; girlsField: string; boysField: string }>;
}

const BLUE = "#007BBD";
const GREEN = "#A4C639";
const nf = new Intl.NumberFormat("en-IN");

const CustomTooltip: React.FC<any> = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  return (
    <div className="rounded-md bg-white shadow px-3 py-2 border text-xs">
      <div className="font-semibold text-gray-700 mb-1">{p.name}</div>
      <div className="text-gray-600">{nf.format(Number(p.value ?? 0))} beneficiaries</div>
    </div>
  );
};

const PieChartSection: React.FC<PieChartSectionProps> = ({ data, selectedActivity, selectedSubActivity, mapping }) => {
  const { genderData, total } = useMemo(() => {
    const filtered = data.filter((row) => {
      const a = selectedActivity ? row.activity === selectedActivity : true;
      const s = selectedSubActivity ? row.subActivity === selectedSubActivity : true;
      return a && s;
    });

    let totalGirls = 0;
    let totalBoys = 0;

    for (const row of filtered) {
      const key = row.subActivity || row.activity;
      const map = mapping[key];
      if (!map) continue;
      totalGirls += Number(row?.[map.girlsField] ?? 0);
      totalBoys  += Number(row?.[map.boysField] ?? 0);
    }

    return {
      genderData: [
        { name: "Girls", value: totalGirls },
        { name: "Boys",  value: totalBoys  },
      ],
      total: totalGirls + totalBoys,
    };
  }, [data, selectedActivity, selectedSubActivity, mapping]);

  const renderLabel = (entry: any) => {
    if (!total) return `${entry.name}: 0%`;
    const pct = Math.round((Number(entry.value || 0) / total) * 100);
    return `${entry.name} ${pct}%`;
    };

  return (
    <div className="bg-white rounded-lg shadow p-4 w-full h-full">
      <h2 className="text-sm sm:text-base font-semibold text-[#007BBD] mb-2 text-center">Gender-wise Beneficiaries</h2>

      <div className="w-full aspect-[16/9] min-h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={genderData} dataKey="value" nameKey="name" innerRadius="50%" outerRadius="70%" label={renderLabel} labelLine={false}>
              {genderData.map((g) => (
                <Cell key={g.name} fill={g.name === "Girls" ? BLUE : GREEN} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={32} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChartSection;
