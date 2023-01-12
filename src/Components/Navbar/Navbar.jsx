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
import { ThemeContext } from "../../Context/TheamContext";
import { useThrottle } from "use-throttle";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  loginUser,
} from "../../Redux/auth/action";
const token = localStorage.getItem("token");

const baseStyle = {
  color: "black",
  TextDecoration: "none",
};

const activeStyle = {
  color: "red",
  TextDecoration: "none",
};

export const Navbar = () => {
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ user: state.app.user }));
  const ref = useRef();
  const ref1 = useRef();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const auth = useSelector((state) => state.auth.isAuth);
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const throttledText = useThrottle(text, 2000);
  const navigate = useNavigate();
  const location = useLocation();
  const comingFrom = location.state?.from?.pathname || "/";

  const handleSearch = (e) => {
    setText(e.target.value);
  };

  const handleScroll = () => {
    ref.current.scrollTop = 0;
  };

  const handleClose = () => {
    setText("");
    ref1.current.value = "";
  };

  useEffect(() => {
    getData();
    // ref1.current = setInterval(() => {}, 2000);
    // return clearInterval(ref1.current);
  }, [throttledText]);

  // getting locations
  const getData = () => {
    setLoading(true);
    axios
      .get(
        `https://vikash-land-app.onrender.com/products/locations?city=${throttledText}`
      )
      .then((res) => {
        setData([...res.data]);
        setLoading(false);
      });
  };

  useEffect(() => {
    dispatch(getUser());
  }, [auth]);

  useEffect(() => {
    axios
      .get(`https://vikash-land-app.onrender.com/cart/${user._id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setTotal(res.data.length);
      });
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    dispatch(loginFailure(null));
    alert("Sign Out Successfull");
    navigate(comingFrom, { replace: true });
  };
  console.log(auth);

  return (
    <>
      <Flex className={styles.nav} bg="#FFFFE0">
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

        <Flex align="center" gap="1px" wrap="wrap">
          <Flex align="center">
            <InputGroup
              sm="30em"
              md="48em"
              lg="62em"
              xl="80em"
              align="center"
              className={styles.search}
            >
              <InputLeftAddon>
                <CiSearch />
              </InputLeftAddon>
              <Input
                onChange={handleSearch}
                pr="4.5rem"
                type="text"
                placeholder="Search City"
                ref={ref1}
              />
              <InputRightElement width="4.5rem">
                {text && (
                  <Button
                    h="1.5rem"
                    size="sm"
                    style={styles[theme]}
                    onClick={handleClose}
                  >
                    <Image
                      style={{ width: "20px", cursor: "pointer" }}
                      src="https://www.pngkey.com/png/full/105-1058931_black-cross-png-cross-sign-png-black.png"
                      alt="close button"
                    />
                  </Button>
                )}
                {loading && (
                  <Spinner
                    thickness="1px"
                    speed="1.2s"
                    emptyColor="white"
                    color="blue.500"
                    size="sm"
                  />
                )}
              </InputRightElement>
            </InputGroup>
          </Flex>
          <Spacer />
          <Flex mt={20} align="strech" h="380px" position="absolute" zIndex={1}>
            {text && (
              <div
                style={{
                  // marginLeft: "10%",
                  marginTop: "170px",
                  width: "100%",
                  height: "300px",
                  display: "flex",
                  zIndex: -1,
                }}
              >
                <Stack
                  style={{
                    overflowY: "scroll",
                    background: "#FFFFE0",
                    borderRadius: "4px",
                  }}
                  ref={ref}
                >
                  {data &&
                    data.map((e) => (
                      <Text
                        style={{ margin: "5px", textDecoration: "none" }}
                        key={e._id}
                      >
                        <Link
                          to={`/scheme/${e.city}`}
                          style={{ margin: "5px", textDecoration: "none" }}
                        >
                          <span>{e.city}</span>
                          <span> (</span>
                          <span>{e.state}</span> <span>)</span>
                        </Link>
                      </Text>
                    ))}
                </Stack>
                <Button
                  onClick={handleScroll}
                  style={{
                    height: "30px",
                    marginTop: "100%",
                    background: "transparent",
                  }}
                >
                  <MdArrowUpward size="md" />
                </Button>
              </div>
            )}
          </Flex>
        </Flex>

        <Spacer />
        <Flex align="center" wrap="wrap" gap="15px" m="10px">
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : baseStyle)}
            to="/profile"
          >
            {auth ? (
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
              <Text>{total}</Text>
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
            to={auth ? "" : "/login"}
          >
            {auth ? <VscSignOut onClick={handleSignOut} /> : <CiUser />}
          </NavLink>
        </Flex>
      </Flex>
    </>
  );
};
