import React, { useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Login } from "../../Components/Login";
import "./Auth.css";
import { Signup } from "../../Components/Signup";

const Auth = () => {
  const [login, setLogin] = useState(true);

  const handleregister = () => {
    setLogin(true);
  };
  const handlelogin = () => {
    setLogin(false);
  };

  return (
    <div className="maindiv">
      <div id="buttonBox">
        <Button
          colorScheme="teal"
          variant="solid"
          width="100px"
          onClick={handleregister}
        >
          Register
        </Button>

        <Button
          colorScheme="teal"
          variant="solid"
          width="100px"
          onClick={handlelogin}
        >
          Login
        </Button>
      </div>

      <div>{login ? <Signup /> : <Login />}</div>
    </div>
  );
};

export default Auth;
