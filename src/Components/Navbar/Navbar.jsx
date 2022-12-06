import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { getUser } from "../../Redux/user/action";
import styles from "./Navbar.module.css"

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
    { to: "/balance", title: "History📃" },
    { to: "/chat", title: "Message💬" },

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
      title: user?.role?.includes("seller") ? "seller👔" : user?.role?.includes("admin") ? "Admin🙎‍♂️" : "",
    },
    {
      to: `/cart/${user._id}`,
      title: "🛒",
    },
    {
      to: auth ? "/signout" : "/login",
      title: auth ? "Signout☣️" : "Login",
    },
  ];
  // console.log(auth);

  return (
    <>
      <div
        className={styles.nav}
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
