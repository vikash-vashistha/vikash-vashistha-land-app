import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import "./Login.css";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";

function LoginPage(){

  const [show, setShow] = useState(false);
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (e) => setInput(e.target.value);
  const handleInputChangeP = (e) => setPassword(e.target.value);
  const handleClick = () => setShow(!show);

    const isError = input === "";

    const handleGoogle =()=>{
      console.log("here")
    }


      const handleSubmit = ()=>{
        console.log(input,password)
      }
  

  return (
    <div className="LoginBox">
      <FormControl isInvalid={isError}>
        <FormLabel>Email</FormLabel>
        <Input type="email" value={input} onChange={handleInputChange} id="email"/>

        <FormErrorMessage>Email is required.</FormErrorMessage>

        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            onChange={handleInputChangeP}
            value={password}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <div id="googleBox" onClick={handleGoogle}>
          <div>
            <img src="https://play-lh.googleusercontent.com/aFWiT2lTa9CYBpyPjfgfNHd0r5puwKRGj2rHpdPTNrz2N9LXgN_MbLjePd1OTc0E8Rl1" width="30px" alt="" />
          </div>
         <div>
          <button>Continue With Google</button>
         </div>
        </div>
        <Button colorScheme="teal" variant="solid" mt="20px" width="310px" onClick={handleSubmit}>
          LogIn
        </Button>
      </FormControl>
      

    
    </div>
  );
};


export {LoginPage}