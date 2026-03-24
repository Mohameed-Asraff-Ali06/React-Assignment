import { useEffect, useState, useCallback, useRef } from "react";
import { handleError } from "../components/common/errorHandler";
/**
 * Custom hook to fetch data from an API endpoint.
 *
 * @param {string} url - The API endpoint URL to fetch data from.
 * @param {Object} [options={}] - Fetch API options (method, headers, body, etc.).
 * @param {string} [customErrorMessage] - Optional custom error message to display in UI.
 *
 * @returns {{
 *  data: Array,
 *  loading: boolean,
 *  error: string | null,
 *  retry: Function
 * }}
 *
 * @example
 * const options = useMemo(() => ({ method: "GET" }), []);
 *
 * const { data, loading, error, retry } = useFetch(
 *   "/transactionsData.json",
 *   options,
 *   "Failed to load transactions"
 * );
 *
 * @description
 * - Handles API calls using the Fetch API
 * - Manages loading, error, and data states
 * - Provides retry functionality
 * - Prevents stale data by resetting state on failure
 * - Hides technical errors and exposes user-friendly messages
 */
export const useFetch = (url, options = {}, customErrorMessage) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // keep options stable
  const optionsRef = useRef(options);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const execute = useCallback(async () => {
    if (!url) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, optionsRef.current);

      if (!response.ok) {
        throw new Error();
      }

      const result = await response.json();

      setData(Array.isArray(result) ? result : []);
    } catch (err) {
      handleError("useFetch error:", err);

      // clean user message
      setError(customErrorMessage || "Unable to load data. Please try again.");

      setData([]);
    } finally {
      setLoading(false);
    }
  }, [url, customErrorMessage]);

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
