import React, { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, LabelList, CartesianGrid } from "recharts";

interface BarChartSectionProps {
  data: any[];
  selectedActivity: string;
  selectedSubActivity: string;
  mapping: Record<string, { plannedField: string; executedField: string; girlsField?: string; boysField?: string }>;
}

const BLUE = "#007BBD";
const GREEN = "#A4C639";
const nf = new Intl.NumberFormat("en-IN");

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-md bg-white shadow px-3 py-2 border text-xs">
      <div className="font-semibold text-gray-700 mb-1">{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded" style={{ backgroundColor: p.color }} />
          <span className="text-gray-600">{p.name}:</span>
          <span className="font-semibold text-gray-800">{nf.format(Number(p.value ?? 0))}</span>
        </div>
      ))}
    </div>
  );
};

const BarChartSection: React.FC<BarChartSectionProps> = ({ data, selectedActivity, selectedSubActivity, mapping }) => {
  const chartData = useMemo(() => {
    const isSingle = !!selectedSubActivity;

    if (isSingle) {
      const map = mapping[selectedSubActivity];
      if (!map) return [];
      const total = data.reduce(
        (acc, row) => {
          acc.Planned += Number(row?.[map.plannedField] ?? 0);
          acc.Executed += Number(row?.[map.executedField] ?? 0);
          return acc;
        },
        { name: selectedSubActivity, Planned: 0, Executed: 0 }
      );
      return [total];
    }

    const groups: Record<string, { Planned: number; Executed: number }> = {};
    data.forEach((row) => {
      const key = row.subActivity || row.activity;
      const map = mapping[key];
      if (!map) return;
      if (!groups[key]) groups[key] = { Planned: 0, Executed: 0 };
      groups[key].Planned += Number(row?.[map.plannedField] ?? 0);
      groups[key].Executed += Number(row?.[map.executedField] ?? 0);
    });

    return Object.entries(groups).map(([name, v]) => ({ name, ...v }));
  }, [data, mapping, selectedSubActivity]);

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm sm:text-base font-semibold text-[#007BBD]">Planned vs Executed</h2>
        {selectedActivity && !selectedSubActivity && (
          <span className="text-[11px] text-gray-500">By sub-activity of “{selectedActivity}”</span>
        )}
      </div>

      <div className="w-full aspect-[16/9] min-h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barCategoryGap="28%" barSize={26}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "#6b7280" }}
              tickMargin={8}
              tickLine={false}
              minTickGap={0}
              angle={-24}
              interval={0}
              height={75}
              textAnchor="end"
            />
            <YAxis tickFormatter={(v) => nf.format(Number(v))} tick={{ fontSize: 11, fill: "#6b7280" }} width={44} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12 }} verticalAlign="top" align="right" iconType="circle" />
            <Bar dataKey="Planned" name="Planned" fill={BLUE} radius={[8, 8, 0, 0]}>
              <LabelList dataKey="Planned" position="top" formatter={(label) => nf.format(Number(label ?? 0))} className="text-[10px]" />
            </Bar>
            <Bar dataKey="Executed" name="Executed" fill={GREEN} radius={[8, 8, 0, 0]}>
              <LabelList dataKey="Executed" position="top" formatter={(label) => nf.format(Number(label ?? 0))} className="text-[10px]" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartSection;
