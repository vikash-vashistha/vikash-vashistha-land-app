import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addAuth, getAuth, removeAuth } from "../../Redux/actions";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  InputRightElement,
  InputLeftElement,
  PhoneIcon,
  Button,
  Image,
  Box,
  PinInput,
  PinInputField,
  Text
} from "@chakra-ui/react";

export const Login = () => {
  const [otp, setOtp] = useState("")
  const dispatch = useDispatch();
  const isAuth  = useSelector((state) => state.token);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e, formData);
    axios
      .post("http://localhost:2345/login", formData)
      .then((res) => {
        console.log(res.data.token);
        localStorage.setItem("token", res.data.token);
        dispatch(addAuth(res.data.token));
        
      })
      .catch(function (e) {
        console.log(e);
      })
      .then(() => {
        setFormData({
          email: "",
          password: "",
        });
      });
  };

   return isAuth ? (
     <Navigate to="/" />
   ) : (
     <Stack margin="auto" width="40%">
       <form onSubmit={handleSubmit}>
         <h3>Log in</h3>
         <Input
           id="email"
           type="email"
           onChange={handleChange}
           placeholder="enter email"
         />
         <Input
           id="password"
           type="text"
           onChange={handleChange}
           placeholder="enter password"
         />
         <Input type="submit" value={"Log in"} />
       </form>
       <br />
       <br />
       <h3>or use PIN</h3>
       <br />
       <br />
       <Box>
         <PinInput value={otp} onChange={(value) => setOtp(value)} otp>
           <PinInputField />
           <PinInputField />
           <PinInputField />
           <PinInputField />
         </PinInput>
         </Box>
         <Box>
           <Text>{otp}</Text>
         </Box>
     </Stack>
   );
};
