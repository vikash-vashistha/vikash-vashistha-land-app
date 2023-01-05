import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  InputRightElement,
  InputLeftElement,
  Button,
  Image,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Select,
} from "@chakra-ui/react";

import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons';

export const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
  const [file, setFile] = useState(null);
  const [blob, setBlob] = useState(null);

  const date = new Date().toDateString();
  const [formData, setFormData] = useState({
    id: Math.random(),
    date,
    name: "",
    gender:"",
    role: ["coustomer"],
    email: "",
    password: "",
    phone_no: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e, formData);

    // const formdata = new FormData();
    // formdata.append("image", file, file.name);

    // const requestOptions = {
    //   method: "POST",
    //   headers: {
    //     Authorization: "Bearer b72cda895107807fbc95798a93f21574824abb5c",
    //   },
    //   body: formdata,
    //   redirect: "follow",
    // };

    // fetch("https://api.imgur.com/3/upload", requestOptions)
    //   .then((response) => response.json())
    //   .then((result) => console.log(result))
    //   .catch((error) => console.log(error));

    try {
     let res = await axios
        .post("https://vikash-land-app.onrender.com/register", formData)
      let data = await res.json()
      console.log(data);
          alert("user created successfully, Please Sign In");
          navigate("/login");
          setFormData({
            id: Math.random(),
            date,
            name: "",
            email: "",
            password: "",
            phone_no: "",
          });
      
    } catch (e) {
      console.log("error", e.response.data.message);
    }
  };

  useEffect(() => {
    file && setBlob(URL.createObjectURL(file));
  }, [file]);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(blob);
    };
  }, [blob]);

  return (
    <Stack spacing={4} margin="auto" width="40%" style={{ marginTop: "50px" }}>
      <form onSubmit={handleSubmit}>
        <h3>Sigh up</h3>
        <Input
          id="name"
          type="text"
          onChange={handleChange}
          placeholder="enter username"
        />
        <Input
          id="email"
          type="text"
          onChange={handleChange}
          placeholder="enter email"
        />
        <InputGroup size="md">
          <Input
            id="password"
            onChange={handleChange}
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <InputGroup>
          <InputRightElement
            pointerEvents="none"
            children={<PhoneIcon color="gray.300" />}
          />
          <InputLeftAddon children="+91" />
          <Input
            id="phone_no"
            onChange={handleChange}
            type="tel"
            placeholder="phone number"
          />
        </InputGroup>
        <Input
          type="file"
          placeholder="upload image"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <Select placeholder="Gender" id="gender" onChange={handleChange}>
          <option value="male">male</option>
          <option vlaue="female">female</option>
          <option value="other">other</option>
        </Select>
        <Button
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
            }, 2000);
          }}
          isLoading={loading}
        >
          status
        </Button>
        <Input type="submit" value={"create user"} />
      </form>
      <Box boxSize="sm">
        <Image src={blob} />
      </Box>
    </Stack>
  );
};
