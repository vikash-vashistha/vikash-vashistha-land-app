import { useDispatch, useSelector } from "react-redux";
import { removeAuth } from "../store/actions";

export const SignoutPage = () => {
  const dispatch = useDispatch();
  
  const handleClick = () => {
    dispatch(removeAuth(null));
    localStorage.removeItem("token");
  };

  return <button onClick={handleClick}>Sign out</button>;
};
