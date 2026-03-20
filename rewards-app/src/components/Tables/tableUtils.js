/**
 * Sort data based on column and direction
 */
export const sortData = (data = [], sortConfig) => {
  if (!sortConfig?.key) return data;

  return [...data].sort((a, b) => {
    const aValue = a?.[sortConfig.key];
    const bValue = b?.[sortConfig.key];

    //  Handle strings (names, alphanumeric)
    if (typeof aValue === "string" && typeof bValue === "string") {
   

      return sortConfig.direction === "asc"
        ? aValue.localeCompare(bValue, undefined, {
            numeric: true,
            sensitivity: "base", //  ignore case
          })
        : bValue.localeCompare(aValue, undefined, {
            numeric: true,
            sensitivity: "base",
          });
    }

    //  Handle numbers
    if (aValue < bValue) {
      
      
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }

    return 0;
  });
};