import { PhoneIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Flex,
  Stack,
  Text,
  Image,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  InputLeftAddon,
  InputRightElement,
  InputGroup,
  Select,
} from "@chakra-ui/react";

import axios from "axios";
import { useEffect, useState } from "react";

let auth = localStorage.getItem("token");
export const AdminRequests = () => {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);

  const handleUsers = () => {
    axios
      .get(`http://localhost:2345/request/admin?name=${name}`, {
        headers: { authorization: `Bearer ${auth}` },
      })
      .then((res) => {
        console.log("res.data: ", res.data);
        setUsers([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAllow = (e) => {
    console.log("inside allow handler", e);
    axios
      .patch(`http://localhost:2345/user/admin/${e.user_id._id}`, {
        headers: { authorization: `Bearer ${auth}` },
      })
      .then((res) => {
        console.log("res.data: ", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    
    axios
      .delete(`http://localhost:2345/request/admin/${e._id}`, {
        headers: { authorization: `Bearer ${auth}` },
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
        <Button onClick={handleUsers}>Search</Button>
        <Stack></Stack>
      </Flex>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Date</Th>
            <Th>Phone no</Th>
            <Th>Image</Th>
            <Th>Role</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users &&
            users.map((e, i) => (
              <Tr key={i}>
                <Td>{e?.user_id?.name}</Td>
                <Td>{e?.user_id?.email}</Td>
                <Td>{e?.user_id?.date}</Td>
                <Td>{e?.user_id?.phone_no}</Td>
                <Td>
                  <Image src={e?.user_id?.image} alt="not available" />
                </Td>
                <Td>
                  {e?.user_id?.role?.map((el, it) => (
                    <Text key={it}>{el}</Text>
                  ))}
                </Td>
                <Td>
                  <Button onClick={() => handleAllow(e)}>Allow</Button>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Stack>
  );
};
