// src/Components/DataTable.tsx
import React from "react";
import { educationFieldLabelMap } from "../Data/EducationFieldLabelMap";

interface DataTableProps {
  data: any[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="mt-8 px-4">
        <p className="text-center text-gray-500 text-sm">No data available.</p>
      </div>
    );
  }

  // Extract all valid fields used in the current data set
  const visibleFields = Array.from(
    new Set(
      data.flatMap((item) =>
        Object.keys(item).filter((key) => educationFieldLabelMap[key])
      )
    )
  );

  return (
    <div className="mt-10 px-4">
      <h2 className="text-sm font-semibold text-[#6B1E82] mb-3">Detailed Records</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow border">
        <table className="min-w-full text-sm text-left table-auto">
          <thead className="bg-[#6B1E82] text-white">
            <tr>
              <th className="px-3 py-2">Site</th>
              <th className="px-3 py-2">Cluster</th>
              <th className="px-3 py-2">Activity</th>
              <th className="px-3 py-2">Sub-Activity</th>
              {visibleFields.map((field) => (
                <th key={field} className="px-3 py-2">
                  {educationFieldLabelMap[field]}
                </th>
              ))}
              <th className="px-3 py-2">Timestamp</th>
              <th className="px-3 py-2">Images</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="px-3 py-2">{item.site}</td>
                <td className="px-3 py-2">{item.cluster}</td>
                <td className="px-3 py-2">{item.activity}</td>
                <td className="px-3 py-2">{item.subActivity || "-"}</td>
                {visibleFields.map((field) => (
                  <td key={field} className="px-3 py-2 text-center">
                    {item[field] ?? "-"}
                  </td>
                ))}
                <td className="px-3 py-2">
                  {new Date(item.timestamp).toLocaleString()}
                </td>
                <td className="px-3 py-2 space-y-1">
                  {(item.preActivityImages || []).map((url: string, idx: number) => (
                    <a
                      key={`pre-${idx}`}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline block"
                    >
                      Pre
                    </a>
                  ))}
                  {(item.postActivityImages || []).map((url: string, idx: number) => (
                    <a
                      key={`post-${idx}`}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 underline block"
                    >
                      Post
                    </a>
                  ))}
                  {(item.uploadedImages || []).map((url: string, idx: number) => (
                    <a
                      key={`up-${idx}`}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 underline block"
                    >
                      Image
                    </a>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
