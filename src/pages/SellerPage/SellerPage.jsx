import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  Text,
} from "@chakra-ui/react";

const token = localStorage.getItem("token");
export const SellerPage = () => {
    const [lands, setLands] = useState([]);
  useEffect(() => {
     axios
       .get(`http://localhost:2345/products/lands`, {
         headers: { authorization: `Bearer ${token}` },
       })
       .then((res) => {
         setLands([...res.data]);
         //  console.log(res.data);
       });
  },[])
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          paddingTop: "175px",
        }}
      >
        <Link to="./newland"><Button>register land</Button></Link>
        {lands &&
          lands.map((e, i) => {
            return (
              <Box key={e._id}>
                <Stack>
                  <h3>{"land" + " " + (i+1)}</h3>
                  <Link to={`/seller/newplot/${e._id}/`}>
                    <Button>register plot</Button>
                  </Link>
                  <span style={{ marginLeft: "2%" }}>price = {e.price}</span>
                  <span style={{ marginLeft: "2%" }}>area = {e.area}</span>
                  <Button>become partner</Button>
                </Stack>
              </Box>
            );
          })}
        
      </div>
    </>
  );
};
