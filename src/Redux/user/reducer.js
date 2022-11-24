import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS
} from "./actionTypes";

const initState = {
  user: [],
  isLoading: false,
  isError: false
};

const reducer = (state = initState, { type, payload }) => {
  switch (type) {
       case GET_USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: payload,
        isLoading: false
      };
    }
    case GET_USER_FAILURE: {
      return {
        ...state,
        isError: true
      };
    }
    default:
      return state;
  }
};

export { reducer };
