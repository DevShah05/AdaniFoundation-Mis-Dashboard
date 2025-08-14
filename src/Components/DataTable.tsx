import React from "react";

interface DataTableProps {
  data: any[];
  columns: { key: string; label: string }[];
  className?: string;
}

const getDeep = (obj: any, path: string) =>
  path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);

const nf = new Intl.NumberFormat("en-IN");
const renderCell = (v: any) => {
  if (v === null || v === undefined || v === "") return "-";
  if (typeof v === "number" || (!isNaN(Number(v)) && v !== true && v !== false)) {
    return nf.format(Number(v));
  }
  if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}T/.test(v)) {
    try {
      return new Date(v).toLocaleString("en-IN", {
        day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
      });
    } catch {}
  }
  if (Array.isArray(v)) return v.join(", ");
  if (typeof v === "object") return JSON.stringify(v);
  return String(v);
};

const DataTable: React.FC<DataTableProps> = ({ data, columns, className = "" }) => {
  return (
    <div className={`w-full bg-white rounded-lg shadow ring-1 ring-black/5 ${className}`}>
      <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: "touch" }}>
        <table className="w-max min-w-[900px] md:min-w-full text-sm text-gray-700 border-collapse">
          <thead className="bg-[#007BBD] text-white sticky top-0 z-10">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-3 py-2 text-left font-semibold border-b border-[#005e8e] whitespace-nowrap">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-3 py-4 text-center text-gray-500">
                  No records found.
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr key={idx} className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-[#E6F4FA] transition`}>
                  {columns.map((col) => {
                    const raw = getDeep(row, col.key);
                    return (
                      <td key={col.key} className="px-3 py-2 whitespace-nowrap border-b border-gray-200">
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

