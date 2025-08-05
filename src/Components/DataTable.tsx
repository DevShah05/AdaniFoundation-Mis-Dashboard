import React from "react";

interface DataTableProps {
  data: any[];
  fieldLabelMap: Record<string, string>; // ✅ Added so we can pass different mappings
}

const DataTable: React.FC<DataTableProps> = ({ data, fieldLabelMap }) => {
  if (!data || data.length === 0) {
    return (
      <div className="mt-8 px-4">
        <p className="text-center text-gray-500 text-sm">No data available.</p>
      </div>
    );
  }

  const visibleFields = Array.from(
    new Set(
      data.flatMap((item) =>
        Object.keys(item).filter((key) => fieldLabelMap[key])
      )
    )
  );

  return (
    <div className="mt-10 px-4">
      <h2 className="text-lg font-semibold text-[#6B1E82] mb-3">
        Detailed Records
      </h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow border scrollbar-thin max-h-[500px]">
        <table className="min-w-full text-sm text-left table-auto">
          <thead className="bg-[#6B1E82] text-white sticky top-0 z-10">
            <tr>
              <th className="px-3 py-2 text-white">Site</th>
              <th className="px-3 py-2 text-white">Cluster</th>
              <th className="px-3 py-2 text-white">Activity</th>
              <th className="px-3 py-2 text-white">Sub-Activity</th>
              {visibleFields.map((field) => (
                <th
                  key={field}
                  className="px-3 py-2 whitespace-nowrap text-sm font-medium text-white"
                >
                  {fieldLabelMap[field]}
                </th>
              ))}
              <th className="px-3 py-2 text-white">Timestamp</th>
              <th className="px-3 py-2 text-white">Images</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="px-3 py-2 text-left">{item.site}</td>
                <td className="px-3 py-2 text-left">{item.cluster || "-"}</td>
                <td className="px-3 py-2 text-left">{item.activity}</td>
                <td className="px-3 py-2 text-left">{item.subActivity || "-"}</td>
                {visibleFields.map((field) => (
                  <td key={field} className="px-3 py-2 text-center">
                    {item[field] ?? "-"}
                  </td>
                ))}
                <td className="px-3 py-2 text-center">
                  {new Date(item.timestamp).toLocaleString()}
                </td>
                <td className="px-3 py-2 space-y-1 text-center">
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
