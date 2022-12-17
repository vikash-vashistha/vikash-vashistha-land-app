import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";

import {
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Spinner,
  InputRightElement,
  InputLeftElement,
  PhoneIcon,
  Button,
  Image,
  Box,
  Text,
} from "@chakra-ui/react";
import { Carouseldiv } from "../../Components/Carouseldiv";

export const LandingScroller = () => {
  const [data, setData] = useState([]);




  useEffect(() => {
    getData();
  }, []);

  // getting locations
  const getData = () => {
    axios
      .get(`https://vikash-land-app.onrender.com/products/image`)
      .then((res) => {
        console.log(res.data);
        setData([...res.data]);
      });
  };

  return (
    <div >
      <Carouseldiv
        img1={data[0]?.image}
        img2={data[1]?.image}
        img3={data[2]?.image}
        img4={data[3]?.image}
        data={data}
      />
    </div>
  );

}
