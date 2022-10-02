import { ADD_AUTH, REMOVE_AUTH, GET_AUTH } from "./actionTypes";


const init = { token: "" };
export const reducer = (state = init, { type, payload }) => {
  switch (type) {
    case ADD_AUTH:
      return {
        token: payload
      };
    case GET_AUTH:
      return {
        token: payload,
      };
    case REMOVE_AUTH:
      return {
        token: payload,
      };

    default:
      return state;
  }
};
