import PropTypes from "prop-types";
import React from "react";

const TableBody = ({ data, columns }) => {
  return (
    <tbody>
      {(data?.length || 0) === 0 ? (
        <tr>
          <td
            colSpan={columns?.length || 1}
            className="text-center py-6 text-gray-500"
          >
            No data found
          </td>
        </tr>
      ) : (
        (data || []).map((row, rowIndex) => (
          <tr
            key={row?.id || `${rowIndex}`}
            className="border-b hover:bg-gray-100 transition"
          >
            {(columns || []).map((col) => (
              <td
                key={col.accessor}
                className="px-6 py-4 text-sm text-gray-700"
              >
                {col.accessor === "price" ? (
                  <span className="flex items-center gap-1">
                    <span>$</span>
                    {Number(row?.[col.accessor] || 0).toFixed(2)}
                  </span>
                ) : (
                  (row?.[col.accessor] ?? "-")
                )}
              </td>
            ))}
          </tr>
        ))
      )}
    </tbody>
  );
};

TableBody.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default React.memo(TableBody);
