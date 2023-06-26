import { createContext, useReducer } from "react";

export const TransactionContext = createContext();

const transactionReducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_TX":
      return { ...state, transaction: action.payload };
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
