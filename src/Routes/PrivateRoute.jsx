import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuth = useSelector((state) => state.token);

  if (!isAuth) {
    return (
      // <h1 style={{ textAlign: "center" }}>
      //   Not authorized, Please login to continue
      // </h1>
      <Navigate to="/login" />
    );
  } else {
    return children;
  }
};

export default PrivateRoute;
