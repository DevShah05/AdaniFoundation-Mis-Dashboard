// src/features/Education/services.ts
import api from "../../api/api";
import {
  EducationApiRegistry,
  attachActivityNames,
  type FormKey,
} from "./registry";
import type { QueryValue } from "../../utils/buildQuery";

export type Row = Record<string, unknown>;

// ---------- helpers ----------
function unwrap<T = unknown>(wire: any): T | null {
  const d = wire?.data !== undefined ? wire.data : wire;
  return d == null ? null : (d as T);
}

function extractRows(src: unknown): Row[] {
  if (Array.isArray(src)) return src as Row[];
  if (src && typeof src === "object") {
    const obj = src as Record<string, unknown>;
    if (Array.isArray(obj.content)) return obj.content as Row[];
    if (Array.isArray(obj.records)) return obj.records as Row[];
  }
  return [];
}

function coerceNumber(src: unknown): number {
  if (typeof src === "number" && Number.isFinite(src)) return src;
  if (typeof src === "string") {
    const n = Number(src);
    if (Number.isFinite(n)) return n;
  }
  if (src && typeof src === "object") {
    for (const v of Object.values(src as Record<string, unknown>)) {
      const n = Number(v as any);
      if (Number.isFinite(n)) return n;
    }
  }
  return 0;
}

function pickTimestamp(r: Row): unknown {
  return (
    (r as any).timestamp ??
    (r as any).updatedAt ??
    (r as any).createdAt ??
    (r as any).lastModified ??
    (r as any).time ??
    null
  );
}

// ---------- API ----------
export async function fetchFormRows(
  formKey: FormKey,
  params: Record<string, QueryValue> = {},
  signal?: AbortSignal
): Promise<Row[]> {
  const def = EducationApiRegistry[formKey];
  if (!def) throw new Error(`Unknown formKey: ${String(formKey)}`);

  const res = await api.get(def.list(params), { signal });
  const src = unwrap(res);
  const rows = extractRows(src);

  const { activity, subActivity } = attachActivityNames(formKey);

  return rows.map((r) => {
    const row = r as Row;
    const timestamp = pickTimestamp(row);
    return { activity, subActivity, ...row, timestamp };
  });
}

export async function fetchKpi(
  formKey: FormKey,
  kpiKey: string, // loosened to avoid 'never' issues across union forms
  params: Record<string, QueryValue> = {},
  signal?: AbortSignal
): Promise<number> {
  const def = EducationApiRegistry[formKey];
  // widen to a string index using the same QueryValue parameter type
  const kpis = def.kpis as
    | Record<string, (p?: Record<string, QueryValue>) => string>
    | undefined;

  const kpiFn = kpis?.[kpiKey];
  if (!kpiFn) throw new Error(`No KPI '${kpiKey}' for form '${formKey}'`);

  const res = await api.get(kpiFn(params), { signal });
  const src = unwrap(res);
  return coerceNumber(src);
}
