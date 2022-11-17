import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";



export const Navbar = () => {
  const { auth } = useSelector((state) => ({ auth: state.token }));

  const links = [
    { to: "/", title: "home" },
    { to: "/admin", title: "admin" },
    { to: "/seller", title: "seller" },
    { to: "/balance", title: "history" },
    { to: "/form", title: "register a new land /partner in a land" },
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
      <div style={{ display: "flex", justifyContent: "space-around" }}>
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
