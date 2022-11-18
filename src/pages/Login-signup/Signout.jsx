import { useDispatch, useSelector } from "react-redux";
import { addAuth, getAuth, removeAuth } from "../../store/actions";
import {
  Button,
} from "@chakra-ui/react";

export const Signout = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    localStorage.removeItem("token");
    dispatch(removeAuth(null));
  };

  return <Button onClick={handleClick}>Sign out</Button>;
};
