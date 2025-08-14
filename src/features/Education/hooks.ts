import { useEffect, useMemo, useState } from "react";
import { fetchFormRows, fetchKpi } from "./services";
import { getFormKeysForSelection } from "./registry";
import type { Row } from "./services";

type Filters = {
  site?: string;
  activity?: string;
  subActivity?: string;
};

/** Fetch + combine rows from the selected form(s). Robust to partial failures. */
export function useEducationRecords(filters: Filters, page = 0, size = 200) {
  const [records, setRecords] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const formKeys = useMemo(
    () => getFormKeysForSelection(filters.activity || "", filters.subActivity || ""),
    [filters.activity, filters.subActivity]
  );

  useEffect(() => {
    let ok = true;
    setLoading(true);
    setError(null);

    const params: Record<string, any> = {
      site: filters.site ? filters.site : undefined,
      page,
      size,
    };

    if (!formKeys.length) {
      setRecords([]);
      setLoading(false);
      return;
    }

    Promise.allSettled(formKeys.map((k) => fetchFormRows(k, params)))
      .then((results) => {
        if (!ok) return;

        const fulfilled = results.filter(r => r.status === "fulfilled") as PromiseFulfilledResult<Row[]>[];
        const rejected  = results.filter(r => r.status === "rejected") as PromiseRejectedResult[];

        const rows = fulfilled.flatMap(r => r.value);
        setRecords(rows);

        if (rejected.length > 0) {
          console.warn("[useEducationRecords] Some endpoints failed:", rejected.map(r => r.reason));
          setError(rejected[0].reason ?? new Error("One or more endpoints failed"));
        } else {
          setError(null);
        }
      })
      .catch((e) => {
        if (!ok) return;
        setError(e);
        setRecords([]);
      })
      .finally(() => ok && setLoading(false));

    return () => {
      ok = false;
    };
  }, [formKeys.join("|"), JSON.stringify({ site: filters.site || "", page, size })]);

  return { records, loading, error };
}

/** Optional: generic KPI hook if you want to show server KPIs as numbers. */
export function useEducationKpi(formKey: string, kpiKey: string, params?: { site?: string }) {
  const [value, setValue] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let ok = true;
    setLoading(true);
    setError(null);

    fetchKpi(formKey, kpiKey, params || {})
      .then((n) => ok && setValue(Number.isFinite(Number(n)) ? Number(n) : 0))
      .catch((e) => ok && setError(e))
      .finally(() => ok && setLoading(false));

    return () => {
      ok = false;
    };
  }, [formKey, kpiKey, params?.site]);

  return { value, loading, error };
}
