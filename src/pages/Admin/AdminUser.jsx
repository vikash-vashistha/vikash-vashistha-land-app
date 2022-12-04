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
export const AdminUser = () => {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // add user
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
     gender: "",
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
     try {
       await axios
         .post("http://localhost:2345/register", formData)
         .then((res) => {
           console.log("res", res);
         })
         .then(() => {
           alert("user created successfully, Please Sign In");
           // setFormData({
           //   id: Math.random(),
           //   date,
           //   name: "",
           //   email: "",
           //   password: "",
           //   phone_no: "",
           // });
         });
     } catch (e) {
       console.log("error", e);
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

  // finish add user

  const handleUsers = () => {
    // console.log("auth", auth);
    axios
      .get(`http://localhost:2345/user/admin?name=${name}`, {
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

  const handleDelete = (e) => {
    axios
      .delete(`http://localhost:2345/user/admin/${e}`, {
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
        <Button onClick={handleUsers}>Search</Button>
        <Stack>
          <Button onClick={onOpen}>Add User</Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <form onSubmit={handleSubmit}>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
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
                  <Select
                    placeholder="Gender"
                    id="gender"
                    onChange={handleChange}
                  >
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

                  <Box boxSize="sm">
                    <Image src={blob} />
                  </Box>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button variant="ghost">
                    <Input type="submit" value={"create user"} />
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
          {users &&
            users.map((e, i) => (
              <Tr key={i}>
                <Td>{e.name}</Td>
                <Td>{e.email}</Td>
                <Td>{e.date}</Td>
                <Td>{e.phone_no}</Td>
                <Td>
                  <Image src={e.image} alt="not available" />
                </Td>
                <Td>
                  {e.role.map((el, it) => (
                    <Text key={it}>{el}</Text>
                  ))}
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
