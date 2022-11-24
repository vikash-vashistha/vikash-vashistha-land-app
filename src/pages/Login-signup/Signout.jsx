import { useDispatch, useSelector } from "react-redux";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  loginUser,
} from "../../Redux/auth/action";
import { Button } from "@chakra-ui/react";
import {  useLocation, useNavigate } from "react-router-dom";

export const Signout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const location = useLocation();
  const comingFrom = location.state?.from?.pathname || "/";
  
  const handleClick = () => {
    localStorage.removeItem("token");
    dispatch(loginFailure(null));
     navigate(comingFrom, {replace: true});
  
  };
// console.log("lllll",location);
  return <Button onClick={handleClick}>Sign out</Button>;
};
