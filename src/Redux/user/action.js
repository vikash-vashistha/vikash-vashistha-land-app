import axios from "axios";
import { loadData, saveData } from "../../utils/localStorage";
import { get_cart } from "../cart/action";
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from "./actionTypes";

export const getUserRequest = () => {
  return {
    type: GET_USER_REQUEST
  };
};

// action creator
export const getUserSuccess = (payload) => {
  return {
    type: GET_USER_SUCCESS,
    payload
  };
};

export const getUserFailure = (error) => {
  return {
    type: GET_USER_FAILURE,
    payload: error
  };
};

export const getUser = (payload) => (dispatch) => {
  dispatch(getUserRequest());
  // let auth = localStorage.getItem("token")
  console.log("auth", payload);
   axios
     .get(`https://vikash-land-app.onrender.com/user`, {
       headers: { authorization: `Bearer ${payload.token}` },
     })
     .then((res) => {
       // console.log("res.data: ", res.data.user[0]);
       dispatch(getUserSuccess(res.data.user[0]));
       dispatch(get_cart({id: res.data.user[0], token: payload.token}))
     })
     .catch((err) => {
       // console.log(err);
       dispatch(getUserFailure(err));
     });
};
