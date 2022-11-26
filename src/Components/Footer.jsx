
import { useContext } from "react";
import { Button } from "@chakra-ui/react";
import { ThemeContext } from "../Context/TheamContext";

export const Footer = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  console.log(theme);

  return (
      < >
      <h5 style={{ textAlign: "center" }}>Made with ❤️ by Vikash Vashistha</h5>
      <Button onClick={() => toggleTheme()}>Change Theam</Button>
    </>
  );
};