import { ADD_AUTH, REMOVE_AUTH, GET_AUTH } from "./actionTypes";

const temp = localStorage.getItem("token");
const init = { token: temp || "" };
export const reducer = (state = init, { type, payload }) => {
  switch (type) {
    case ADD_AUTH:
      return {
        token: payload,
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
