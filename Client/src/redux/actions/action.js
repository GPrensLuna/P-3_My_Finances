import { ADD_TRANSACTIONS } from "./actions_type.js";

 export const addProductInfo = (addTransactions) => {
  return {
    type: ADD_TRANSACTIONS,
    payload: addTransactions,
  };
};