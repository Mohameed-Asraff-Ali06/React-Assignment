import PropTypes from "prop-types";
import { FaRupeeSign } from "react-icons/fa";

const TableBody = ({ data, columns }) => {
  return (
    <tbody>
      {data.length === 0 ? (
        <tr>
          <td
            colSpan={columns.length}
            className="text-center py-6 text-gray-500"
          >
            No data found
          </td>
        </tr>
      ) : (
        data.map((row, rowIndex) => (
          <tr
            key={row.id || `${rowIndex}`}
            className="border-b hover:bg-gray-100 transition"
          >
            {columns.map((col) => (
              <td
                key={col.accessor}
                className="px-6 py-4 text-sm text-gray-700"
              >
                {col.accessor === "price" ? (
                  <span className="flex items-center gap-1">
                    <FaRupeeSign className="text-xs" />
                    {Number(row[col.accessor]).toFixed(2)}
                  </span>
                ) : (
                  (row[col.accessor] ?? "-")
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

export default TableBody;
