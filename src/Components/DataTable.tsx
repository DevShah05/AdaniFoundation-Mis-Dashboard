// src/Components/DataTable.tsx
import React, { useMemo } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface DataTableProps {
  data: any[];
  columns: { key: string; label: string }[];
  className?: string;
  /** "links" = do not load images (default), "thumbs" = show tiny <img> */
  imageMode?: "links" | "thumbs";
  /** cap thumbnails per cell when imageMode="thumbs" */
  maxThumbsPerCell?: number;
}

const getDeep = (obj: any, path: string) =>
  path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);

// ---------- URL helpers ----------
const API_BASE =
  (import.meta as any)?.env?.VITE_API_BASE_URL || "https://mis.adani.digital";

const toAbsolute = (url: string) => {
  if (!url) return "";
  try {
    // already absolute?
    return new URL(url).href;
  } catch {
    // relative path -> make absolute
    return API_BASE.replace(/\/+$/, "") + "/" + url.replace(/^\/+/, "");
  }
};

const isProbablyUrl = (s: string) => /^https?:\/\//i.test(s) || s.startsWith("/");
const isImageUrl = (s: string) =>
  /\.(png|jpe?g|gif|webp|bmp|svg)(\?.*)?$/i.test(s) || s.includes("/image/");

// image-field keys (so we can allow wrapping in those cells)
const IMAGE_KEYS = new Set([
  "preActivityImagePaths",
  "postActivityImagePaths",
  "imagePaths",
  "uploadedImages",
]);

// ---------- renderers ----------
const nf = new Intl.NumberFormat("en-IN");

function renderUrl(value: string) {
  const href = toAbsolute(value);
  const label = value.length > 60 ? value.slice(0, 57) + "…" : value;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#007BBD] underline"
    >
      {label}
    </a>
  );
}

/** One link PER image (no thumbnails) */
function renderImageLinks(values: string[]) {
  const urls = values.filter(Boolean).map(toAbsolute);
  if (!urls.length) return "-";
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-1">
      {urls.map((u, i) => (
        <a
          key={`${u}-${i}`}
          href={u}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#007BBD] underline"
        >
          {`Open image ${i + 1}`}
        </a>
      ))}
    </div>
  );
}

/** Optional: tiny thumbnails mode if you ever switch imageMode="thumbs" */
function renderImageThumbs(values: string[], maxThumbs: number) {
  const urls = values.filter(Boolean).map(toAbsolute);
  const thumbs = urls.slice(0, maxThumbs);
  const remaining = Math.max(0, urls.length - thumbs.length);
  return (
    <div className="flex items-center gap-2">
      {thumbs.map((u, i) => (
        <a
          key={`${u}-${i}`}
          href={u}
          target="_blank"
          rel="noopener noreferrer"
          title="Open image"
        >
          <img
            src={u}
            alt="img"
            className="w-8 h-8 rounded object-cover border border-gray-200"
            loading="lazy"
          />
        </a>
      ))}
      {remaining > 0 && <span className="text-xs text-gray-500">+{remaining} more</span>}
    </div>
  );
}

/* ---------- Helpers for Export ---------- */

/** Normalize any cell value to a string for export (CSV/Excel). */
function formatForExport(val: any): string {
  if (val == null) return "";
  // ISO timestamps -> keep readable local time
  if (typeof val === "string" && /^\d{4}-\d{2}-\d{2}T/.test(val)) {
    try {
      return new Date(val).toLocaleString("en-IN");
    } catch {
      return val;
    }
  }

  // URL string
  if (typeof val === "string" && isProbablyUrl(val)) {
    return toAbsolute(val);
  }

  // Array (images or strings)
  if (Array.isArray(val)) {
    // Cast to strings & absolutize URLs
    const parts = val
      .filter(Boolean)
      .map(String)
      .map((s) => (isProbablyUrl(s) ? toAbsolute(s) : s));
    // Join with commas so they’re readable in Excel
    return parts.join(", ");
  }

  // Plain object -> compact JSON
  if (typeof val === "object") {
    try {
      return JSON.stringify(val);
    } catch {
      return String(val);
    }
  }

  // number-like -> keep as string (don’t format with commas here)
  return String(val);
}

/** Escape for CSV cell */
function csvEscape(s: string): string {
  return `"${s.replace(/"/g, '""')}"`;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  className = "",
  imageMode = "links", // default: links only (no image downloads)
  maxThumbsPerCell = 3,
}) => {
  const rows = useMemo(() => data ?? [], [data]);

  const renderCell = (v: any) => {
    if (v === null || v === undefined || v === "") return "-";

    // numbers (or numeric-like strings)
    if (typeof v === "number" || (!isNaN(Number(v)) && v !== true && v !== false)) {
      return nf.format(Number(v));
    }

    // ISO-like date string
    if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}T/.test(v)) {
      try {
        return new Date(v).toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      } catch {}
    }

    // single string URL
    if (typeof v === "string" && isProbablyUrl(v)) {
      if (isImageUrl(v)) {
        return imageMode === "thumbs" ? renderImageThumbs([v], 1) : renderImageLinks([v]);
      }
      return renderUrl(v);
    }

    // arrays
    if (Array.isArray(v)) {
      const parts = v.filter(Boolean).map(String);

      // looks like image/URL array
      if (parts.length && parts.some((x) => isProbablyUrl(x) || isImageUrl(x))) {
        const imgs = parts.filter((x) => isProbablyUrl(x) || isImageUrl(x));
        return imageMode === "thumbs"
          ? renderImageThumbs(imgs, maxThumbsPerCell)
          : renderImageLinks(imgs);
      }

      // array of strings possibly with normal URLs → linkify each
      if (parts.length && parts.some(isProbablyUrl)) {
        return (
          <div className="flex flex-col">
            {parts.map((s, i) =>
              isProbablyUrl(s) ? <div key={i}>{renderUrl(s)}</div> : <div key={i}>{s}</div>
            )}
          </div>
        );
      }
      return parts.join(", ");
    }

    // plain object → stringify compactly
    if (typeof v === "object") {
      try {
        return JSON.stringify(v);
      } catch {
        return String(v);
      }
    }

    return String(v);
  };

  /* ---------- Export Handlers ---------- */

  const exportCSV = () => {
    const header = columns.map((c) => csvEscape(c.label)).join(",");
    const body = rows
      .map((row) =>
        columns
          .map((c) => csvEscape(formatForExport(getDeep(row, c.key))))
          .join(",")
      )
      .join("\n");
    const blob = new Blob([header + "\n" + body], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "export.csv");
  };

  const exportExcel = () => {
    const exportData = rows.map((row) => {
      const out: Record<string, any> = {};
      columns.forEach((c) => {
        out[c.label] = formatForExport(getDeep(row, c.key));
      });
      return out;
    });

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, "export.xlsx");
  };

  return (
    <div className={`w-full bg-white rounded-lg shadow ring-1 ring-black/5 ${className}`}>
      {/* Export buttons */}
      <div className="flex justify-end gap-2 p-2">
        <button
          onClick={exportCSV}
          className="px-3 py-1 text-sm bg-[#007BBD] text-white rounded hover:bg-[#005e8e]"
        >
          Export CSV
        </button>
        <button
          onClick={exportExcel}
          className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
        >
          Export Excel
        </button>
      </div>

      <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: "touch" }}>
        <table className="w-max min-w-[900px] md:min-w-full text-sm text-gray-700 border-collapse">
          <thead className="bg-[#007BBD] text-white sticky top-0 z-10">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-3 py-2 text-left font-semibold border-b border-[#005e8e] whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-3 py-4 text-center text-gray-500">
                  No records found.
                </td>
              </tr>
            ) : (
              rows.map((row, idx) => (
                <tr
                  key={idx}
                  className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-[#E6F4FA] transition`}
                >
                  {columns.map((col) => {
                    const raw = getDeep(row, col.key);
                    const tdClass = IMAGE_KEYS.has(col.key)
                      ? "px-3 py-2 border-b border-gray-200" // allow wrapping for image links
                      : "px-3 py-2 whitespace-nowrap border-b border-gray-200";

                    return (
                      <td key={col.key} className={tdClass}>
                        {renderCell(raw)}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
