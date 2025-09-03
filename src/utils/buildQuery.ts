// src/utils/buildQuery.ts
export type QueryValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | (string | number)[];

export function buildQuery(params: Record<string, QueryValue> = {}): string {
  const q = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value == null) return;

    // Arrays -> repeated params ?k=a&k=b
    if (Array.isArray(value)) {
      value.forEach((v) => {
        const s = String(v).trim();
        if (s && s !== "All") q.append(key, s);
      });
      return;
    }

    const s = String(value).trim();
    if (!s || s === "All") return;

    // Optional: basic pagination guard
    if ((key === "page" || key === "size") && (!/^\d+$/.test(s) || Number(s) <= 0)) return;

    q.append(key, s);
  });

  const qs = q.toString();
  return qs ? `?${qs}` : "";
}
