import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";



export const Navbar = () => {
  const { auth } = useSelector((state) => ({ auth: state.token }));
  const token = localStorage.getItem("token");
  const links = [
    // Fix this links array, it's an array of objects {to: "", title: ""}
    { to: "/", title: "balance" },
    { to: "/balance", title: "Admin" },
    { to: "/signup", title: "New user - Signup" },
    { to: auth ? "/signout" : "/login", title: token ? "signout" : "Login" },
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
