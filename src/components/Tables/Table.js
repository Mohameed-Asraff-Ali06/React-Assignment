import React, { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { sortData } from "./tableUtils";
import { FiChevronLeft, FiChevronRight, FiSearch } from "react-icons/fi";
import useDebounce from "../../hooks/useDebounce";

const Table = ({ columns, data }) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  // Sorting
const handleSort = useCallback((key) => {
  let direction = "asc";

  if (sortConfig.key === key && sortConfig.direction === "asc") {
    direction = "desc";
  }

  setSortConfig({ key, direction });
}, [sortConfig]);

  const sortedData = useMemo(() => {
    return sortData(data || [], sortConfig);
  }, [data, sortConfig]);

  // Filtering
  // ebounced value
  const debouncedSearch = useDebounce(searchTerm, 400);

  // Filtered data (using debounced value)
const filteredData = useMemo(() => {
  if (!debouncedSearch) return sortedData;

  const lowerSearch = debouncedSearch.toLowerCase();

  return sortedData.filter((row) =>
    Object.values(row).some((value) =>
      String(value || "").toLowerCase().includes(lowerSearch)
    )
  );
}, [sortedData, debouncedSearch]);

  // Pagination
  const totalPages = Math.ceil((filteredData?.length || 0) / pageSize);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData?.slice(start, start + pageSize) || [];
  }, [filteredData, currentPage, pageSize]);

  useEffect(() => {
  setCurrentPage(1);
}, [debouncedSearch, pageSize]);
  return (
    <div className="bg-white shadow-lg rounded-xl p-4">
      {/* Search */}

      <div className="relative mb-4">
        <FiSearch className="absolute left-3 top-3 text-gray-400" />

        <input
          type="text"
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Table */}
      <table className="min-w-full text-sm border rounded-lg overflow-hidden">
        <TableHeader
          columns={columns}
          onSort={handleSort}
          sortConfig={sortConfig}
        />
        <TableBody data={paginatedData || []} columns={columns} />
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Items per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1); // reset to first page
            }}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className="flex items-center gap-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="p-2 bg-white border rounded-full hover:bg-gray-100 disabled:opacity-40"
          >
            <FiChevronLeft />
          </button>

          <span className="text-sm font-medium text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="p-2 bg-white border rounded-full hover:bg-gray-100 disabled:opacity-40"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
    }),
  ).isRequired,
  data: PropTypes.array.isRequired,
};

export default React.memo(Table);