/**
 * Sort data based on column and direction
 */
export const sortData = (data = [], sortConfig) => {
  if (!sortConfig?.key) return data; // ✅ ALWAYS return array

  return [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });
};