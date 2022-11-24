import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  console.log("inside private route", location);
  const { auth } = useSelector((state) => ({ auth: state.auth.isAuth }));
  console.log("auth", auth);
  if (!auth) {
    return (
      // <h1 style={{ textAlign: "center" }}>
      //   Not authorized, Please login to continue
      // </h1>
      <Navigate to="/login" state={{ from: location }} replace />
    );
  }
    return children;
  
};

export default PrivateRoute;