import mockTransactionsData from "../data/mockTransactions";



// Simulate API call to fetch transactions
export const fetchTransactions = async () => {
  const response = await Promise.resolve({
    data: mockTransactionsData,
  });


  return response.data;
};