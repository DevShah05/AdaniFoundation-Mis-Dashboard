// src/utils/debounce.ts
/**
 * Simple debounce utility
 * Usage: const debounced = debounce(fn, 300)
 */
export function debounce<F extends (...args: any[]) => void>(
  func: F,
  delay = 300
): (...args: Parameters<F>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
