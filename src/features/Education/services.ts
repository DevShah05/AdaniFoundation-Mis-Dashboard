import api from "../../api/apiClient";
import { EducationApiRegistry, attachActivityNames } from "./registry";

export type Row = Record<string, any>;

// Unwrap common response shapes
function unwrap(data: any): any {
  return data?.data !== undefined ? data.data : data;
}

/** Fetch rows for a single form and normalize fields the dashboard uses. */
export async function fetchFormRows(formKey: string, params: Record<string, any> = {}) {
  const def = EducationApiRegistry[formKey];
  if (!def) throw new Error(`Unknown formKey: ${formKey}`);

  const { data } = await api.get(def.list(params));
  const src = unwrap(data);
  const { activity, subActivity } = attachActivityNames(formKey);

  // Accept: [] | { content: [] } | { records: [] } | null/undefined
  const rawRows: Row[] = Array.isArray(src) ? src : (src?.content ?? src?.records ?? []);
  if (!Array.isArray(rawRows)) return [];

  return rawRows.map((r: Row) => {
    const timestamp = r?.timestamp || r?.updatedAt || r?.createdAt || null;
    return { activity, subActivity, ...r, timestamp };
  });
}

/** Fetch a KPI number for a given form. Supports number, numeric string, or object with a numeric value. */
export async function fetchKpi(formKey: string, kpiKey: string, params: Record<string, any> = {}) {
  const def = EducationApiRegistry[formKey];
  const kpiFn = def?.kpis?.[kpiKey];
  if (!kpiFn) throw new Error(`No KPI '${kpiKey}' for form '${formKey}'`);

  const { data } = await api.get(kpiFn(params));
  const src = unwrap(data);

  if (typeof src === "number" && Number.isFinite(src)) return src;
  if (typeof src === "string") {
    const n = Number(src);
    if (Number.isFinite(n)) return n;
  }
  if (src && typeof src === "object") {
    for (const v of Object.values(src)) {
      const n = Number(v as any);
      if (Number.isFinite(n)) return n;
    }
  }
  return 0;
}

