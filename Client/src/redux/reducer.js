import { ADD_TRANSACTIONS } from './actions/actions_type';

const initialState = {
  allTransactions: []
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TRANSACTIONS:
      return { ...state, allTransactions: payload};

    default:
      return state;
  }
};

export default rootReducer; 