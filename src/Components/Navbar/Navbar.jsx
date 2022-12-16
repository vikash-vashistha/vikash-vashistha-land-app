import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import logo from "../../logo2.png";
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
  

  return (
    <>
      <div className={styles.nav}>
        <NavLink className={styles.link}
          style={({ isActive }) => (isActive ? activeStyle : baseStyle)}
          to="/"
        >
          {
            <img
              style={{ borderRadius: "20%", width: "100%", height: "100%" }}
              src={logo}
              alt="logo"
            />
          }
        </NavLink>

        <NavLink
          style={({ isActive }) => (isActive ? activeStyle : baseStyle)}
          to="/balance"
        >
          History📃
        </NavLink>

        <NavLink
          style={({ isActive }) => (isActive ? activeStyle : baseStyle)}
          to="/signup"
        >
          Signup🪧
        </NavLink>

        <NavLink
          style={({ isActive }) => (isActive ? activeStyle : baseStyle)}
          to="/profile"
        >
          {auth ? `👤 (${user?.email})` : "👤"}
        </NavLink>

        <NavLink
          style={({ isActive }) => (isActive ? activeStyle : baseStyle)}
          to={user?.role?.includes("seller") ? "/seller" : "/admin"}
        >
          {user?.role?.includes("seller")
            ? "seller👔"
            : user?.role?.includes("admin")
            ? "Admin🙎‍♂️"
            : ""}
        </NavLink>

        <NavLink
          style={({ isActive }) => (isActive ? activeStyle : baseStyle)}
          to={`/cart/${user._id}`}
        >
          Cart🛒
        </NavLink>

        <NavLink
          style={({ isActive }) => (isActive ? activeStyle : baseStyle)}
          to={auth ? "/signout" : "/login"}
        >
          {auth ? "Signout☣️" : "Login"}
        </NavLink>

        <NavLink
          style={({ isActive }) => (isActive ? activeStyle : baseStyle)}
          to="/chat"
        >
          Message💬
        </NavLink>
      </div>
    </>
  );
};
