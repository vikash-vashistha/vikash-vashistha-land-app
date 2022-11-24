
import { useContext } from "react";
import { Button } from "@chakra-ui/react";
import { ThemeContext } from "../Context/TheamContext";

export const Footer = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  console.log(theme);

  return (
      <div style={{ padding: "25px", backgroundColor: "#eef1ff" }}>
      <h5 style={{ textAlign: "center" }}>Made with ❤️ by Vikash</h5>
      <Button onClick={() => toggleTheme()}>Change Theam</Button>
    </div>
  );
};