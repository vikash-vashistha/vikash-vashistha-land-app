import { useContext } from "react";
import { Button, Flex, HStack, Stack } from "@chakra-ui/react";
import { ThemeContext } from "../Context/TheamContext";
import logo from "../logo.png";

export const Footer = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  console.log(theme);

  return (
    <Flex justify="space-between" bg="#FFFFE0" position="fixed" mt="500px" zIndex={1}>
      <img
        style={{ borderRadius: "50px", width: "8%" }}
        src={logo}
        alt="logo"
      />
      <h5 style={{ textAlign: "center" }}>Made with ❤️ by Vikash Vashistha</h5>
    </Flex>
  );
};
// <Button onClick={() => toggleTheme()}>Change Theam</Button>
