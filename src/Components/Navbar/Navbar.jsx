import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { getUser } from "../../Redux/user/action";

const baseStyle = {
  color: "black",
  TextDecoration: "none",
};

const activeStyle = {
  color: "red",
  TextDecoration: "none",
};

export const Navbar = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ auth: state.auth.isAuth }));
   const { user } = useSelector((state) => ({ user: state.app.user }));

  useEffect(() => {
    dispatch(getUser());
  }, [auth]);
  
 console.log(auth,user);
  const links = [
    { to: "/", title: "🏠" },
    { to: "/balance", title: "history📃" },
    { to: "/chat", title: "message💬" },

    {
      to: "/signup",
      title: "New user - Signup🪧",
    },
    {
      to: "/profile",
      title: auth ? `👤 (${user?.email})` : "👤",
    },
    {
      to: user?.role?.includes("seller") ? "/seller" : "/admin",
      title: user?.role?.includes("seller") ? "seller👔" : user?.role?.includes("admin") ? "admin🙎‍♂️" : "",
    },
    {
      to: `/cart/${user._id}`,
      title: "🛒",
    },
    {
      to: auth ? "/signout" : "/login",
      title: auth ? "signout☣️" : "Login",
    },
  ];
  // console.log(auth);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          borderBottom: "1px solid gray",
          marginBottom: "10px",
        }}
      >
        {links.map((el) => {
          return (
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : baseStyle)}
              key={el.to}
              to={el.to}
            >
              {el.title}
            </NavLink>
          );
        })}
      </div>
    </>
  );
};
