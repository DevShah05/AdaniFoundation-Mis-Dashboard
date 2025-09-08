// src/Components/BarChartSection.tsx
import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { readNum } from "../utils/readNum";
import { EducationCommonMapping } from "../Data/EducationCommonMapping";

type Row = Record<string, any>;

interface Props {
  data: Row[];
  selectedActivity: string;
  selectedSubActivity: string;
  mapping: typeof EducationCommonMapping;
}

const nf = new Intl.NumberFormat("en-IN");

const BarChartSection: React.FC<Props> = ({
  data,
  selectedSubActivity,
  mapping,
}) => {
  // Which buckets to show on X
  const buckets = useMemo(() => {
    if (selectedSubActivity && mapping[selectedSubActivity]) {
      return [selectedSubActivity];
    }
    return Object.keys(mapping);
  }, [selectedSubActivity, mapping]);

  // Aggregate data into buckets
  const rows = useMemo(() => {
    const totals: Record<string, { planned: number; executed: number }> = {};
    for (const b of buckets) totals[b] = { planned: 0, executed: 0 };

    for (const r of data) {
      const label = (r.subActivity as string) || (r.activity as string) || "";
      if (!label || !totals[label]) continue;

      const def = mapping[label];
      if (!def) continue;

      totals[label].planned += readNum(r, def.plannedField);
      totals[label].executed += readNum(r, def.executedField);
    }

    return buckets.map((label) => ({
      name: label,
      Planned: totals[label]?.planned ?? 0,
      Executed: totals[label]?.executed ?? 0,
    }));
  }, [data, buckets, mapping]);

  const yMax = useMemo(() => {
    let m = 0;
    for (const r of rows) {
      m = Math.max(m, r.Planned, r.Executed);
    }
    return Math.ceil(m * 1.1); // 10% headroom
  }, [rows]);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-sm font-semibold text-[#007BBD] mb-2">
        Planned vs Executed
      </h3>

      <div className="w-full aspect-[16/9] min-h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={rows}
            margin={{ top: 30, right: 30, left: 10, bottom: 60 }} // space for legend + rotated labels
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              interval={0}           // show ALL categories
              angle={-35}            // rotate so long names fit
              textAnchor="end"
              height={70}            // room for rotated labels
              tick={{ fontSize: 11 }}
            />
            <YAxis
              domain={[0, yMax]}
              tickFormatter={(v) => nf.format(v as number)}
            />
            <Tooltip
              formatter={(v: any) => nf.format(Number(v))}
              labelFormatter={(l) => String(l)}
            />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ fontSize: 12 }}
            />
            <Bar dataKey="Planned" fill="#1E88E5" />
            <Bar dataKey="Executed" fill="#8BC34A" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartSection;
