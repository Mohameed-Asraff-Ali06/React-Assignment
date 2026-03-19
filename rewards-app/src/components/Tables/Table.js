import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { sortData } from "./tableUtils";
import { FiChevronLeft, FiChevronRight, FiSearch } from "react-icons/fi";

const ITEMS_PER_PAGE = 5;

const Table = ({ columns, data }) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);


  // Sorting
  const handleSort = (key) => {
    let direction = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    return sortData(data, sortConfig);
  }, [data, sortConfig]);

  // Filtering
  const filteredData = useMemo(() => {
    return sortedData.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [sortedData, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

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
        <TableBody data={paginatedData} columns={columns} />
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-6 mt-6">
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

export default Table;
