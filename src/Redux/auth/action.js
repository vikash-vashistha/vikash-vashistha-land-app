import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./actionTypes";
import axios from "axios";
import { getUser } from "../user/action";

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST
  };
};

const loginSuccess = (token) => {
  return {
    type: LOGIN_SUCCESS,
    payload: token
  };
};

const loginFailure = (err) => {
  return {
    type: LOGIN_FAILURE,
    payload: err
  };
};

const loginUser = (payload) => (dispatch) => {
  const requestAction = loginRequest();
  dispatch(requestAction);
  const { email, password } = payload;
  axios
    .post("https://vikash-land-app.onrender.com/login", {
      email,
      password,
    })
    .then((res) => {
      
      dispatch(loginSuccess(res.data.token));
      dispatch(getUser({token: res.data.token}))
       alert("Sign In Successfull");
      localStorage.setItem("token", res.data.token);
    })
    .catch((err) => {
      dispatch(loginFailure(err.message));
       alert("Sign In Fail");
    });
};

export { loginRequest, loginSuccess, loginFailure, loginUser };
