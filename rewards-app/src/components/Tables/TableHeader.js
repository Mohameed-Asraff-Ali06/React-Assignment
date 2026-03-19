import PropTypes from "prop-types";

const TableHeader = ({ columns, onSort, sortConfig }) => {
  
  return (
    <thead className="bg-gray-300 border-b border-gray-400 text-gray-800">
      <tr>
        {columns.map((col) => {
          const isSorted = sortConfig.key === col.accessor;

          return (
            <th
              key={col.accessor}
              onClick={() => col.sortable && onSort(col.accessor)}
              className={`px-6 py-3 text-left font-semibold text-gray-800 border-b border-gray-400 ${
                col.sortable
                  ? "cursor-pointer hover:bg-gray-400"
                  : "cursor-default"
              }`}
            >
              <div className="flex items-center gap-2">
                {col.label}
                {col.sortable && (
                  <span className="text-xs">
                    {isSorted
                      ? sortConfig.direction === "asc"
                        ? "▲"
                        : "▼"
                      : "⇅"}
                  </span>
                )}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
      sortable: PropTypes.bool, // ✅ important
    }),
  ).isRequired,
  onSort: PropTypes.func.isRequired,
  sortConfig: PropTypes.shape({
    key: PropTypes.string,
    direction: PropTypes.string,
  }).isRequired,
};

export default TableHeader;
