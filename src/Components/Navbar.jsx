import { Link } from "react-router-dom";

const links = [
  // Fix this links array, it's an array of objects {to: "", title: ""}
  { to: "/", title: "Home" },
  { to: "/balance", title: "balance" },
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
