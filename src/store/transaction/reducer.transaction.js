import {
  GET_TRANSACTIONS_ERROR,
  GET_TRANSACTIONS_LOADING,
  GET_TRANSACTIONS_SUCCESS,
} from './action.transaction';

const initialState = {
  loading: false,
  error: false,
  transactions: [],
};
export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TRANSACTIONS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        transactions: [...payload],
      };
    case GET_TRANSACTIONS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};
