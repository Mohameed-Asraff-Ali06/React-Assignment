
/**
 * Fetch transactions data from mock API
 * @returns {Promise<Array>} List of transactions
 * @throws {Error} If fetch fails
 */
// Simulate API call to fetch transactions/**

import { handleError } from "../components/common/errorHandler";

export const fetchTransactionsData = async () => {
  try {
    const response = await fetch("/transactionsData.json");

    if (!response.ok) {
      throw new Error(
        `API Error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    //  Validate data
    if (!Array.isArray(data)) {
      throw new Error("Invalid data format received from API");
    }

    return data;
  } catch (error) {
    handleError("fetchTransactionsData error:", error);

    // Normalize error
    throw new Error(
      "sorry, something went wrong we couldn't load the transactions data."
    );
  }
};