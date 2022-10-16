import { useDispatch, useSelector } from "react-redux";
import { addAuth, getAuth, removeAuth } from "../../store/actions";

export const Signout = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    localStorage.removeItem("token");
    dispatch(removeAuth(null));
  };

  return <button onClick={handleClick}>Sign out</button>;
};
