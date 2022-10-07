import axios from 'axios';
export const GET_TRANSACTIONS_LOADING = 'GET_TRANSACTIONS/LOADING';
export const GET_TRANSACTIONS_SUCCESS = 'GET_TRANSACTIONS/SUCCESS';
export const GET_TRANSACTIONS_ERROR = 'GET_TRANSACTIONS/ERROR';

//
export const getTransactions = () => async (dispatch) => {
  dispatch({ type: GET_TRANSACTIONS_LOADING });
  try {
    const res = await axios.get('http://localhost:8080/transaction');
    dispatch({ type: GET_TRANSACTIONS_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_TRANSACTIONS_ERROR });
  }
};
