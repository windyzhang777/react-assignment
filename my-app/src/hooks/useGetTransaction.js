import { useCallback, useState } from "react";
import { useTransactionContext } from "./useTransactionContext";

export const useGetTransaction = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = useTransactionContext();

  const getTransaction = useCallback(() => {
    setIsLoading(true);
    setError(null);

    fetch("/getTransactions", {
      method: "GET",
      header: { "Context-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        dispatch({ type: "GET_ALL_TX", payload: data });
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  }, [dispatch]);

  return {
    isLoading,
    error,
    getTransaction,
  };
};
