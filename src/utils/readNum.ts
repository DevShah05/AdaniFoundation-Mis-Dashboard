// src/utils/readNum.ts
export function readNum(
  obj: Record<string, any>,
  primary: string,
  aliases: string[] = []
): number {
  const tryKeys = [primary, ...aliases];
  for (const k of tryKeys) {
    const v = obj?.[k];
    if (v == null) continue;
    if (typeof v === "number" && Number.isFinite(v)) return v;
    if (typeof v === "string") {
      const n = Number(v.replace(/,/g, ""));
      if (Number.isFinite(n)) return n;
    }
  }
  return 0;
}

