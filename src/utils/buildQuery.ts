export function buildQuery(params: Record<string, any>) {
  const q = new URLSearchParams();

  Object.entries(params).forEach(([k, v]) => {
    const val = v == null ? "" : String(v).trim();
    if (val !== "" && val !== "All") q.append(k, val);
  });

  const s = q.toString();
  return s ? `?${s}` : "";
}
