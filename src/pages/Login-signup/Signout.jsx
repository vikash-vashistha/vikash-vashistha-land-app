import { useDispatch, useSelector } from "react-redux";
import { addAuth, getAuth, removeAuth } from "../../store/actions";
import { Navigate } from "react-router-dom";

export const Signout = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    localStorage.removeItem("token");
    dispatch(removeAuth(null));
    <Navigate to="/" replace={true} />
  };

  return <button onClick={handleClick}>Sign out</button>;
};
