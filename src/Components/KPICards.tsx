import React, { useMemo } from "react";
import { readNum } from "../utils/readNum";

type Row = Record<string, any>;

interface KPICardsProps {
  data: Row[];
  selectedActivity: string;
  selectedSubActivity: string;
  mapping: Record<
    string,
    { plannedField: string; executedField: string; girlsField: string; boysField: string; extraFields?: string[] }
  >;
  /** label map used to name any extraFields you expose */
  fieldLabelMap: Record<string, string>;
}

const nf = new Intl.NumberFormat("en-IN");

const StatCard: React.FC<{ label: string; value: number; tone?: "blue" | "green" | "amber" | "slate" }> = ({
  label,
  value,
  tone = "slate",
}) => {
  const tones: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    amber: "bg-amber-50 text-amber-700",
    slate: "bg-slate-50 text-slate-700",
  };
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className={`inline-block px-3 py-1 rounded ${tones[tone]}`}>{nf.format(value)}</div>
    </div>
  );
};

const KPICards: React.FC<KPICardsProps> = ({
  data,
  selectedActivity,
  selectedSubActivity,
  mapping,
  fieldLabelMap,
}) => {
  const sums = useMemo(() => {
    const mapKey = selectedSubActivity || selectedActivity;
    const m = mapKey ? mapping[mapKey] : undefined;

    let planned = 0;
    let executed = 0;
    let girls = 0;
    let boys = 0;

    const extras: Record<string, number> = {};

    if (m) {
      for (const r of data) {
        // if the parent hasn't filtered rows, guard here
        if (selectedActivity && r.activity !== selectedActivity) continue;
        if (selectedSubActivity && r.subActivity !== selectedSubActivity) continue;

        planned += readNum(r, m.plannedField);
        executed += readNum(r, m.executedField);
        girls   += readNum(r, m.girlsField);
        boys    += readNum(r, m.boysField);

        if (m.extraFields?.length) {
          for (const ex of m.extraFields) {
            extras[ex] = (extras[ex] ?? 0) + readNum(r, ex);
          }
        }
      }
    }

    return { planned, executed, girls, boys, extras };
  }, [data, selectedActivity, selectedSubActivity, mapping]);

  const extraEntries = useMemo(
    () =>
      Object.entries(sums.extras || {}).map(([k, v]) => ({
        key: k,
        label: fieldLabelMap[k] || k,
        value: v,
      })),
    [sums.extras, fieldLabelMap]
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard label="Num. Units Planned / Planned" value={sums.planned} tone="blue" />
      <StatCard label="Num. Units Executed / Executed" value={sums.executed} tone="green" />
      <StatCard label="Num. Girl Students Benefited" value={sums.girls} />
      <StatCard label="Num. Boy Students Benefited" value={sums.boys} />

      {extraEntries.map(({ key, label, value }) => (
        <StatCard key={key} label={label} value={value} tone="amber" />
      ))}
    </div>
  );
};

export default KPICards;
