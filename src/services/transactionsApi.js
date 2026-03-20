
/**
 * Fetch transactions data from mock API
 * @returns {Promise<Array>} List of transactions
 * @throws {Error} If fetch fails
 */
// Simulate API call to fetch transactions
export const fetchTransactionsData = async () => {
  const response = await fetch("/mock/transactionsData.json");

  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }

  const data = await response.json();

  return data;
};
