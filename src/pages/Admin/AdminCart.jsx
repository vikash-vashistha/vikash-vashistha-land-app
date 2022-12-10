import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  Stack,
  Input,
  Image,
  Text,
} from "@chakra-ui/react";

import axios from "axios";
import { useState } from "react";
const token = localStorage.getItem("token");

export const AdminCart = () => {
  const [name, setName] = useState("");
  const [cart, setCart] = useState([]);
  

  const handleCart = () => {
    // console.log("auth", auth);
    axios
      .get(`https://vikash-land-app.onrender.com/cart/admin?user=${name}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("res.data: ", res.data);
        setCart([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (e) => {
    axios
      .delete(`https://vikash-land-app.onrender.com/cart/admin/${e}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("res.data: ", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Stack
      style={{
        border: "1px solid grey",
        borderRadius: "5px",
        margin: "5px",
        padding: "5px",
      }}
    >
      <Flex gap="5px">
        <Input onChange={(e) => setName(e.target.value)} />
        <Button onClick={handleCart}>Search</Button>
      </Flex>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>user</Th>
            <Th>Land</Th>
            <Th>Plot</Th>
          </Tr>
        </Thead>
        <Tbody>
          {cart &&
            cart.map((e, i) => (
              <Tr key={i}>
                <Td>
                  {
                    <Tr>
                      <p>{e.user_id.name}</p>
                      <p>{e.user_id.email}</p>
                      <p>{e.user_id.date}</p>
                      <p>{e.user_id.phone_no}</p>
                      <p>
                        <Image style={{width: "50px"}} src={e.user_id.image} alt="not available" />
                      </p>
                      <p>
                        {e.user_id.role.map((el, it) => (
                          <span key={it}>{el}</span>
                        ))}
                      </p>
                    </Tr>
                  }
                </Td>
                <Td>
                  {
                    <div>
                      <p>{e.land_id.location}</p>
                      <p>{e.land_id.scheme.scheme_name}</p>
                      <p>{e.land_id.title}</p>
                      <p>{e.land_id.price}</p>
                      <p>{e.land_id.area}</p>
                      <p>
                        {e.land_id.partners.map((el, it) => (
                          <span key={it}>{el.name}</span>
                        ))}
                      </p>
                      <p>
                        {e.land_id.facility.map((el, it) => (
                          <p key={it}>{el}</p>
                        ))}
                      </p>
                    </div>
                  }
                </Td>
                <Td>
                  {
                    <div>
                      <p>{e.plot_id.title}</p>
                      <p>{e.plot_id.length}</p>
                      <p>{e.plot_id.width}</p>
                      <p>{e.plot_id.price}</p>
                      <p>
                        {e.plot_id.road.map((ell, itt) => (
                          <span key={itt}>
                            {ell}
                            <br />
                          </span>
                        ))}
                      </p>
                    </div>
                  }
                </Td>
                <Td>
                  <Button onClick={() => handleDelete(e._id)}>Delete</Button>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Stack>
  );
};
