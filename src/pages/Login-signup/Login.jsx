import { useState } from "react";
import { Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  InputRightElement,
  InputLeftElement,
  PhoneIcon,
  Button,
  Image,
  Box,
  PinInput,
  PinInputField,
  Text,
} from "@chakra-ui/react";
import { loginUser } from "../../Redux/auth/action";

const baseStyle = {
  color: "black",
  TextDecoration: "none",
};

const activeStyle = {
  color: "red",
  TextDecoration: "none",
};

export const Login = () => {
  const { auth } = useSelector((state) => ({ auth: state.auth }));
  const navigate = useNavigate()
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleLogin = ({ email, password }) => {
    dispatch(loginUser({ email, password }));
  };
  const location = useLocation()
  const comingFrom = location?.state?.from?.pathname || "/";
  // console.log(comingFrom);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e, formData);
    let payload = formData
    console.log("before", auth);
    handleLogin(payload)
    // setFormData({
      //   email: "",
    //   password: "",
    // });
    console.log("vikash");
    setTimeout(() => {
      console.log("inside login page", location, comingFrom);
      navigate(comingFrom, { replace: true });
    }, 1000)
    // navigate("/")
  };
  return (
    <Stack margin="auto" width="40%" style={{ marginTop: "50px" }}>
      <NavLink
        style={({ isActive }) => (isActive ? activeStyle : baseStyle)}
        to="/signup"
      >
        Click Here For New User Signup🪧
      </NavLink>
      <form onSubmit={handleSubmit}>
        <h3>Log in</h3>
        <Input
          id="email"
          type="email"
          onChange={handleChange}
          placeholder="enter email"
        />
        <Input
          id="password"
          type="text"
          onChange={handleChange}
          placeholder="enter password"
        />
        <Input type="submit" value={"Log in"} />
      </form>
      <br />
      <br />
      <h3>or use PIN</h3>
      <br />
      <br />
      <Box>
        <PinInput value={otp} onChange={(value) => setOtp(value)} otp>
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </Box>
      <Box>
        <Text>{otp}</Text>
      </Box>
    </Stack>
  );
};
