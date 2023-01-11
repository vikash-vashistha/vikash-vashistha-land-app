import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./actionTypes";
import axios from "axios";

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST
  };
};

const loginSuccess = (token) => {
  return {
    type: LOGIN_SUCCESS,
    auth: true,
    payload: token
  };
};

const loginFailure = (err) => {
  return {
    type: LOGIN_FAILURE,
    auth: false,
    payload: err
  };
};

const loginUser = (payload) => (dispatch) => {
  const requestAction = loginRequest();
  dispatch(requestAction);
  const { email, password } = payload;
  // console.log(payload);
  axios
    .post("https://vikash-land-app.onrender.com/login", {
      email,
      password,
    })
    .then((res) => {
      const successAction = loginSuccess(res.data.token);
      dispatch(successAction);
       alert("Sign In Successfull");
      localStorage.setItem("token", res.data.token);
    })
    .catch((err) => {
      const failureAction = loginFailure(err.message);
      dispatch(failureAction);
       alert("Sign In Fail");
    });
};

export { loginRequest, loginSuccess, loginFailure, loginUser };
