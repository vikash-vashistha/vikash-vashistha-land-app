import { Link } from "react-router-dom";
const token = false;
const links = [
  // Fix this links array, it's an array of objects {to: "", title: ""}
  { to: "/", title: "balance" },
  { to: "/balance", title: "Admin" },
  {to: token ? "/login" : "/signup", title: token? "Login" : "Signup"}
];

export const Navbar = () => {
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
