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
  Checkbox,
} from "@chakra-ui/react";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

let auth = localStorage.getItem("token");

export const AdminLand = () => {
  const date = new Date().toDateString();
  const { user } = useSelector((state) => ({ user: state.app.user }));
  const [name, setName] = useState("");
  const [land, setLand] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initState = {
    date,
    location: "",
    scheme: "",
    price: "",
    area: "",
    title: "",
    status: false,
    facility: [],
  };
  const [formData, setFormData] = useState(initState);
  const [facility, setFacility] = useState([]);
 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    let newData = { ...formData, partners: [user._id] };
    console.log(newData);
    axios
      .post("http://localhost:2345/land/admin", newData)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const valueToUpdate = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: valueToUpdate, facility });
  };

  const handleFacility = (e) => {
    const { value } = e.target;
    setFacility([...facility, value]);
  };

  // finish add user

  const handleLands = () => {
    // console.log("auth", auth);
    axios
      .get(`http://localhost:2345/land/admin?title=${name}`, {
        headers: { authorization: `Bearer ${auth}` },
      })
      .then((res) => {
        console.log("res.data: ", res.data);
        setLand([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (e) => {
    axios
      .delete(`http://localhost:2345/land/admin/${e}`, {
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
        <Button onClick={handleLands}>Search</Button>
        <Stack>
          <Button onClick={onOpen}>Add Land</Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <form onSubmit={handleSubmit}>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <label>Location</label>
                  <Input
                    name="location"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Location"
                  />
                  <label>Area</label>
                  <Input
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    placeholder="Area"
                  />
                  <label>Price</label>
                  <Input
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                  />
                  <label>Scheme</label>
                  <Input
                    name="scheme"
                    value={formData.scheme}
                    onChange={handleChange}
                    placeholder="Scheme"
                  />
                  <Select
                    name="facility"
                    onChange={handleFacility}
                    placeholder="Facility"
                  >
                    <option value="electricity">electricity</option>
                    <option value="water">water</option>
                    <option value="road">road</option>
                    <option value="sewerage">sewerage</option>
                  </Select>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                  />
                  <Checkbox
                    colorScheme="red"
                    name="partners"
                    type="checkbox"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    Partners
                  </Checkbox>
                  <Input type="submit" />
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
            <Th>Location</Th>
            <Th>Scheme</Th>
            <Th>Title</Th>
            <Th>Price</Th>
            <Th>Area</Th>
            <Th>Partners</Th>
            <Th>Facility</Th>
          </Tr>
        </Thead>
        <Tbody>
          {land &&
            land.map((e, i) => (
              <Tr key={i}>
                <Td>{e.location}</Td>
                <Td>{e.scheme.scheme_name}</Td>
                <Td>{e.title}</Td>
                <Td>{e.price}</Td>
                <Td>{e.area}</Td>
                <Td>
                  {e.partners.map((el, it) => (
                    <p key={it}>{el.name}</p>
                  ))}
                </Td>
                <Td>
                  {e.facility.map((el, it) => (
                    <p key={it}>{el}</p>
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
