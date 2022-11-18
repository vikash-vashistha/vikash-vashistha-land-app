import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const baseStyle = {
  color: "black",
  TextDecoration: "none"
}

const activeStyle = {
  color: "red",
  TextDecoration: "none"
}

export const Navbar = () => {
  const { auth } = useSelector((state) => ({ auth: state.token }));

  const links = [
    { to: "/", title: "home" },
    { to: "/admin", title: "admin" },
    { to: "/seller", title: "seller" },
    { to: "/balance", title: "history" },
    { to: "/chat", title: "chat" },

    { 
      to: "/signup" ,
      title:  "New user - Signup",
    },
    { to: auth ? "/signout" : "/login", title: auth ? "signout" : "Login" },
  ];
  // console.log(auth);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-around", borderBottom: "1px solid gray", marginBottom: "10px" }}>
        {links.map((el) => {
          return (
            <NavLink style={({isActive}) => isActive ? activeStyle : baseStyle} key={el.to}  to={el.to}>
              {el.title}
            </NavLink>
          );
        })}
      </div>
    </>
  );
};
