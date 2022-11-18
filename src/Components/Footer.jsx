
import { useContext } from "react";
import { Button } from "@chakra-ui/react";
import { ThemeContext } from "../Context/TheamContext";

export const Footer = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  console.log(theme);

  return (
    <div>
      <Button onClick={() => toggleTheme()}>Change Theam</Button>
    </div>
  );
};
