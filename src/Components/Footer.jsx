
import { useContext } from "react";
import { Button } from "@chakra-ui/react";
import { ThemeContext } from "../Context/TheamContext";
import logo from "../logo.png";

export const Footer = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  console.log(theme);

  return (
    <div style={{display: "flex", justifyContent: "space-between"}}>
      <img
        style={{ borderRadius: "50px", width: "8%" }}
        src={logo}
        alt="logo"
      />
      <h5 style={{ textAlign: "center" }}>Made with ❤️ by Vikash Vashistha</h5>
      </div>
      );
    };
    // <Button onClick={() => toggleTheme()}>Change Theam</Button>