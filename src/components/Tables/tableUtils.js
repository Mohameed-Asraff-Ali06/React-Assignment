import { handleError } from "../common/errorHandler";

/**
 * Sorts data based on key and direction
 * @param {Array} data
 * @param {{key: string, direction: string}} sortConfig
 * @returns {Array}
 */
export const sortData = (data = [], sortConfig) => {
  try {
    // Validate input
    if (!Array.isArray(data)) {
      throw new Error("Invalid data: expected array");
    }

    if (!sortConfig || !sortConfig.key) {
      return data;
    }

    const { key, direction = "asc" } = sortConfig;

    return [...data].sort((a, b) => {
      const aValue = a?.[key];
      const bValue = b?.[key];

      // Handle null/undefined (push to bottom)
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      // Handle strings
      if (typeof aValue === "string" && typeof bValue === "string") {
        const result = aValue.localeCompare(bValue, undefined, {
          numeric: true,
          sensitivity: "base",
        });

        return direction === "asc" ? result : -result;
      }

      // Handle numbers
      if (typeof aValue === "number" && typeof bValue === "number") {
        return direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      // Handle mixed types (fallback to string compare)
      const result = String(aValue).localeCompare(String(bValue));

      return direction === "asc" ? result : -result;
    });
  } catch (error) {
    handleError("sortData", error);
    return Array.isArray(data) ? data : [];
  }
};
