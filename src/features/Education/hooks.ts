// src/features/Education/hooks.ts
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFormRows, fetchKpi } from "./services";
import { getFormKeysForSelection, type FormKey } from "./registry";
import type { Row } from "./services";

export type Filters = {
  site?: string;
  activity?: string;
  subActivity?: string;
};

type QueryParams = Record<string, string | number | boolean | null | undefined>;

function buildParams(filters: Filters, page?: number, size?: number): QueryParams {
  const q: QueryParams = {};
  if (filters.site) q.site = filters.site;
  if (page !== undefined && size !== undefined) {
    q.page = page;
    q.size = size;
  }
  return q;
}

async function fetchRecords(
  formKeys: FormKey[],
  params: QueryParams,
  signal?: AbortSignal
): Promise<Row[]> {
  if (!formKeys.length) return [];
  const results = await Promise.allSettled(
    formKeys.map((k) => fetchFormRows(k, params, signal))
  );
  const ok = results.filter(
    (r): r is PromiseFulfilledResult<Row[]> => r.status === "fulfilled"
  );
  const fail = results.find(
    (r): r is PromiseRejectedResult => r.status === "rejected"
  );
  if (fail) {
    const partial = ok.flatMap((r) => r.value);
    (partial as any).__partial = true;
    throw fail.reason ?? new Error("One or more endpoints failed");
  }
  return ok.flatMap((r) => r.value);
}

export function useEducationRecords(filters: Filters, page?: number, size?: number) {
  const formKeys = useMemo<FormKey[]>(
    () => getFormKeysForSelection(filters.activity, filters.subActivity),
    [filters.activity, filters.subActivity]
  );

  const params = useMemo(() => buildParams(filters, page, size), [filters, page, size]);

  const query = useQuery({
    queryKey: ["education", "records", formKeys, params],
    // type the signal param to avoid "implicit any"
    queryFn: ({ signal }: { signal?: AbortSignal }) =>
      fetchRecords(formKeys, params, signal),
    enabled: formKeys.length > 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    // v5 replacement for keepPreviousData
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
  });

  return {
    records: query.data ?? [],
    loading: query.isLoading || query.isFetching,
    error: query.error as unknown,
  };
}

export function useEducationKpi(
  formKey: FormKey,
  kpiKey: string,
  params?: { site?: string } & QueryParams
) {
  const kpiParams = useMemo(() => ({ ...(params || {}) }), [params]);

  const query = useQuery({
    queryKey: ["education", "kpi", formKey, kpiKey, kpiParams],
    queryFn: async ({ signal }: { signal?: AbortSignal }) => {
      const n = await fetchKpi(formKey, kpiKey, kpiParams, signal);
      const num = Number(n);
      return Number.isFinite(num) ? num : 0;
    },
    enabled: Boolean(formKey && kpiKey),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    // v5 replacement for keepPreviousData
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
  });

  return {
    value: query.data ?? 0,
    loading: query.isLoading || query.isFetching,
    error: query.error as unknown,
  };
}
