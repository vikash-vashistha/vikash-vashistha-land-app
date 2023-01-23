import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../../logo2.png";
import { getUser } from "../../Redux/user/action";
import styles from "./Navbar.module.css";
import { CiUser } from "react-icons/ci";
import { CiChat1 } from "react-icons/ci";
import { SlBag } from "react-icons/sl";
import { GoHome } from "react-icons/go";
import { GiCaptainHatProfile } from "react-icons/gi";
import { VscSignOut } from "react-icons/vsc";
import { BsClockHistory } from "react-icons/bs";
import { MdOutlineAdminPanelSettings, MdArrowUpward } from "react-icons/md";
import {
  Flex,
  Spacer,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Spinner,
  InputRightElement,
  InputLeftElement,
  PhoneIcon,
  Button,
  Image,
  Box,
  Text,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { useThrottle } from "use-throttle";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  loginUser,
} from "../../Redux/auth/action";
import { get_cart, set_cart } from "../../Redux/cart/action";

const baseStyle = {
  color: "black",
  TextDecoration: "none",
};

const activeStyle = {
  color: "red",
  TextDecoration: "none",
};

export const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.app);
  const { cart } = useSelector((state) => state.cart);
  const { isAuth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const comingFrom = location.state?.from?.pathname || "/";



  useEffect(() => {
    dispatch(getUser({ token }))
      dispatch(get_cart({ id: user[0], token}));
  }, []);



  const handleSignOut = () => {
    localStorage.removeItem("token");
    dispatch(loginFailure(null));
    dispatch(set_cart([]));
    alert("Sign Out Successfull");
    navigate(comingFrom, { replace: true });
  };
  console.log(isAuth);

  return (
    <>
      <Flex className={styles.nav}>
        <Flex align="center" m="10px">
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : baseStyle)}
            to="/"
          >
            <Flex align="center" gap="5px" className={styles.home}>
              <GoHome />
              <i>VLA</i>
            </Flex>
          </NavLink>
        </Flex>
        <Spacer />

        

        <Spacer />
        <Flex align="center" wrap="wrap" gap="15px" m="10px">
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : baseStyle)}
            to="/profile"
          >
            {isAuth ? (
              <Flex align="center">
                <GiCaptainHatProfile />
                <Text ml="5px">{user?.email}</Text>{" "}
              </Flex>
            ) : (
              <Flex align="center">
                <GiCaptainHatProfile />
              </Flex>
            )}
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : baseStyle)}
            to="/chat"
          >
            <CiChat1 />
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : baseStyle)}
            to={`/cart/${user._id}`}
          >
            <Flex align="center">
              <SlBag />
              <Text>{cart.length}</Text>
            </Flex>
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : baseStyle)}
            to={user?.role?.includes("seller") ? "/seller" : "/admin"}
          >
            {user?.role?.includes("seller") ? (
              "seller"
            ) : user?.role?.includes("admin") ? (
              <MdOutlineAdminPanelSettings />
            ) : (
              ""
            )}
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : baseStyle)}
            to="/balance"
          >
            <BsClockHistory />
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : baseStyle)}
            to={isAuth ? "" : "/login"}
          >
            {isAuth ? <VscSignOut onClick={handleSignOut} /> : <CiUser />}
          </NavLink>
        </Flex>
      </Flex>
    </>
  );
};



