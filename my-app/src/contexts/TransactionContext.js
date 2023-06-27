import { createContext, useReducer } from "react";
import { calcPointsPerTx } from "../helpers/commonHelpers";

export const TransactionContext = createContext();

const transactionReducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_TX":
      const updated = action?.payload?.map((d) => ({
        ...d,
        points: calcPointsPerTx(d.amount),
      }));
      updated?.sort((a, b) => a.id < b.id);
      return { ...state, transaction: updated };
    default:
      return state;
  }
};

export const TransactionContextProvider = ({
  children,
}) => {
  const [state, dispatch] = useReducer(transactionReducer, {
    transaction: null,
  });
  return (
    <TransactionContext.Provider
      value={{ ...state, dispatch }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
