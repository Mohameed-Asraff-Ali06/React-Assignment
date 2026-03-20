import { useFetch } from "./useFetch";
import { fetchTransactionsData } from "../services/transactionsApi";
/**
 * Custom hook to fetch transactions data
 * Uses generic useFetch hook internally
 * @returns {{
 *  transactions: Array,
 *  loading: boolean,
 *  error: string | null,
 *  retry: Function
 * }}
 */
export const useTransactions = () => {
  const { data, loading, error, retry } = useFetch(fetchTransactionsData);

  // 👉 future logic can go here
  const transactions = data ?? [];

  return {
    transactions,
    loading,
    error,
    retry,
  };
};
