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
import { useSelector } from "react-redux";

let auth = localStorage.getItem("token");

export const AdminScheme = () => {
  const { user } = useSelector((state) => ({ user: state.app.user }));
  const [name, setName] = useState("");
  const [scheme, setScheme] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();


  const date = new Date().toDateString();
  const [formData, setFormData] = useState({
    date,
    city: "",
    scheme_name: "",
    user_id: user?._id
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
    console.log(e, formData, user);
    try {
      await axios
        .post("http://localhost:2345/scheme/admin", formData)
        .then((res) => {
          console.log("res", res);
        })
        .then(() => {
          setFormData({
            date,
            city: "",
            scheme_name: "",
            user_id: user?._id,
          });
        });
    } catch (e) {
      console.log("error", e);
    }
  };


  // finish add user

  const handleSchemes = () => {
    // console.log("auth", auth);
    axios
      .get(`http://localhost:2345/scheme/admin?scheme_name=${name}`, {
        headers: { authorization: `Bearer ${auth}` },
      })
      .then((res) => {
        console.log("res.data: ", res.data);
        setScheme([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (e) => {
    axios
      .delete(`http://localhost:2345/scheme/admin/${e}`, {
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
        <Input onChange={(e) => setName(e.target.value)} />
        <Button onClick={handleSchemes}>Search</Button>
        <Stack>
          <Button onClick={onOpen}>Add Scheme</Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <form onSubmit={handleSubmit}>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <h3>Sigh up</h3>
                  <Input
                    id="city"
                    type="text"
                    onChange={handleChange}
                    placeholder="enter city"
                  />
                  <Input
                    id="scheme_name"
                    type="text"
                    onChange={handleChange}
                    placeholder="enter scheme"
                  />
                 
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button variant="ghost">
                    <Input type="submit" value={"create scheme"} />
                  </Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
        </Stack>
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
          {scheme &&
            scheme.map((e, i) => (
              <Tr key={i}>
                <Td>{e.city}</Td>
                <Td>{e.scheme_name}</Td>
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
