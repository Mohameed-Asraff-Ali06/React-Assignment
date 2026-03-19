import { useEffect, useState } from "react";
import { fetchTransactions } from "../services/transactionsApi";

export const useTransactions = () => {
  const [transactionsData, setTransactionsData] = useState({
    transactions: [],
    loading: true,
    error: null,
  });

  const getTransactions = async () => {
    setTransactionsData((prev) => ({
      ...prev,
      loading: true, 
      error: null,
    }));

    try {
      const transactions = await fetchTransactions();

      setTransactionsData({
        transactions,
        loading: false,
        error: null,
      });
    } catch (err) {
      setTransactionsData({
        transactions: [],
        loading: false,
        error: err?.message || "Something went wrong",
      });
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return {
    ...transactionsData,
    retry: getTransactions, 
  };
};