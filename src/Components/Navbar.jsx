import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAuth } from "../store/actions";


const token = localStorage.getItem("token");

export const Navbar = () => {
  const dispatch = useDispatch();
  if (token) dispatch(addAuth(token));
  const { auth } = useSelector((state) => ({ auth: state.token }));
  
  const links = [
    // Fix this links array, it's an array of objects {to: "", title: ""}
    { to: "/", title: "balance" },
    { to: "/admin", title: "admin" },
    {
      to: auth ? "/signup" : "/random",
      title: auth ? "" : "New user - Signup",
    },
    { to: auth ? "/signout" : "/login", title: auth ? "signout" : "Login" },
  ];
console.log(auth)
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {links.map((el) => {
          return (
            <Link key={el.to} style={{ padding: "10px" }} to={el.to}>
              {el.title}
            </Link>
          );
        })}
      </div>
    </>
  );
};
