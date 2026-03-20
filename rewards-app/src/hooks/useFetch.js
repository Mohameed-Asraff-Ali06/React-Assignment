import { useEffect, useState, useCallback } from "react";

/**
 * Generic hook to fetch data using a provided async function.
 *
 * @param {Function} fetchFn - Async function that returns data (e.g., API call)
 *
 * @returns {{
 *  data: any,
 *  loading: boolean,
 *  error: string | null,
 *  retry: Function
 * }}
 *
 * @example
 * const { data, loading, error, retry } = useFetch(fetchTransactions);
 */

export const useFetch = (fetchFn) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    execute();
  }, [execute]);

  return {
    data,
    loading,
    error,
    retry: execute,
  };
};