import { ADD_AUTH, REMOVE_AUTH, GET_AUTH } from "./actionTypes";

export const addAuth = (data) => ({
  type: ADD_AUTH,
  payload: data,
});

export const removeAuth = (data) => {
  return {
    type: REMOVE_AUTH,
    payload: data,
  };
};

export const getAuth = () => {
  return {
    type: GET_AUTH
  };
};
