import { useEffect, useState, useCallback, useRef } from "react";
import { handleError } from "../components/common/errorHandler";

export const useFetch = (url, options = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        
        throw new Error("sorry, something went wrong we couldn't load the transactions data.");
      }

      const result = await response.json();

      setData(Array.isArray(result) ? result : []);
    } catch (err) {
      handleError("useFetch error:", err);
      setError(err?.message || "Something went wrong");
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [url]);

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