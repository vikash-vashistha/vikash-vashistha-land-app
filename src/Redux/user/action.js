import axios from "axios";
import { loadData, saveData } from "../../utils/localStorage";
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
  let auth = localStorage.getItem("token")
  // console.log("auth", auth);
   axios
     .get(`https://vikash-land-app.onrender.com/user`, {
       headers: { authorization: `Bearer ${auth}` },
     })
     .then((res) => {
       // console.log("res.data: ", res.data.user[0]);
       dispatch(getUserSuccess(res.data.user[0]));
     })
     .catch((err) => {
       // console.log(err);
       dispatch(getUserFailure(err));
     });
};
