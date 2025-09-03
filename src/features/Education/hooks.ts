// src/features/Education/hooks.ts
import { useEffect, useMemo, useState } from "react";
import { fetchFormRows, fetchKpi } from "./services";
import { getFormKeysForSelection, type FormKey } from "./registry";
import type { Row } from "./services";

type Filters = {
  site?: string;
  activity?: string;
  subActivity?: string;
};

type Query = Record<string, string | number | boolean | null | undefined>;

export function useEducationRecords(filters: Filters, page?: number, size?: number) {
  const [records, setRecords] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const formKeys: FormKey[] = useMemo(
    () => getFormKeysForSelection(filters.activity, filters.subActivity),
    [filters.activity, filters.subActivity]
  );

  const params: Query = useMemo(() => {
    const q: Query = {};
    if (filters.site) q.site = filters.site;
    if (page !== undefined && size !== undefined) {
      q.page = page;
      q.size = size;
    }
    return q;
  }, [filters.site, page, size]);

  useEffect(() => {
    if (!formKeys.length) {
      setRecords([]);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    const controller = typeof AbortController !== "undefined" ? new AbortController() : null;

    (async () => {
      const results = await Promise.allSettled(
        formKeys.map((k) => fetchFormRows(k, params, controller?.signal))
      );

      if (cancelled) return;

      const ok = results.filter((r): r is PromiseFulfilledResult<Row[]> => r.status === "fulfilled");
      const fail = results.filter((r): r is PromiseRejectedResult => r.status === "rejected");

      setRecords(ok.flatMap((r) => r.value));

      if (fail.length > 0) {
        console.warn("[useEducationRecords] Some endpoints failed:", fail.map((f) => f.reason));
        setError(fail[0].reason ?? new Error("One or more endpoints failed"));
      } else {
        setError(null);
      }
      setLoading(false);
    })().catch((e) => {
      if (cancelled) return;
      setError(e);
      setRecords([]);
      setLoading(false);
    });

    return () => {
      cancelled = true;
      controller?.abort();
    };
  }, [formKeys, params]);

  return { records, loading, error };
}

/** KPI hook */
export function useEducationKpi(
  formKey: FormKey,
  kpiKey: string,
  params?: { site?: string } & Query
) {
  const [value, setValue] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  const kpiParams = useMemo(() => ({ ...(params || {}) }), [params]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const controller = typeof AbortController !== "undefined" ? new AbortController() : null;

    fetchKpi(formKey, kpiKey, kpiParams, controller?.signal)
      .then((n) => {
        if (cancelled) return;
        const num = Number(n);
        setValue(Number.isFinite(num) ? num : 0);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e);
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
      controller?.abort();
    };
  }, [formKey, kpiKey, kpiParams]);

  return { value, loading, error };
}
