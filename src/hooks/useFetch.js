import { useEffect, useState, useCallback } from "react";

export const useFetch = (fetchFn) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchFn();

      // ✅ Safe fallback
      setData(Array.isArray(result) ? result : []);
    } catch (err) {
      console.error("useFetch error:", err);

      setError(err?.message || "Something went wrong");
      setData([]); // ✅ prevent UI crash
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