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
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";

const baseStyle = {
  color: "black",
  TextDecoration: "none",
};

const activeStyle = {
  color: "red",
  TextDecoration: "none",
};

export const Login = () => {
  const { isAuth } = useSelector((state) => state.auth );
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e, formData);
    let payload = formData
    console.log("before", isAuth);
    handleLogin(payload)
    setFormData({
        email: "",
      password: "",
    });
  };

  console.log(isAuth);

  if (isAuth) return navigate(comingFrom, { replace: true });
  
  return (
    <Card w="400px" m="auto" mt="150px">
      <CardBody size="sm">
        <Box p={4} border="1px solid grey">
          <NavLink
            border="1px solid grey"
            borderRadius="4px"
            style={({ isActive }) => (isActive ? activeStyle : baseStyle)}
            to="/signup"
          >
            Click Here For New User Signup🪧
          </NavLink>
        </Box>
        <form onSubmit={handleSubmit}>
          <h3>Log in</h3>
          <Input
            id="email"
            type="email"
            onChange={handleChange}
            placeholder="enter email"
            value={formData.email}
          />
          <Input
            id="password"
            type="text"
            onChange={handleChange}
            placeholder="enter password"
            value={formData.password}
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
      </CardBody>
    </Card>
  );
};
