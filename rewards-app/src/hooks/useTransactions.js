import { useEffect, useState } from "react";
import { fetchTransactions } from "../services/transactionsApi";

export const useTransactions = () => {
  const [transactionsState, setTransactionsState] = useState({
    transactions: [],
    isLoading: true,
    error: null,
  });
  useEffect(() => {
    const getTransactions = async () => {
      try {
        const transactions = await fetchTransactions();


        setTransactionsState({
          transactions,
          isLoading: false,
          error: null,
        });
      } catch (err) {
        setTransactionsState({
          transactions: [],
          isLoading: false,
          error: err.message,
        });
      }
    };

    getTransactions();
  }, []);

  return transactionsState;
};