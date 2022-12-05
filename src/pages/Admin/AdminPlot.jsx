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

let newData;
const date = new Date().toDateString();
const token = localStorage.getItem("token");

export const AdminPlot = () => {
  const [name, setName] = useState("");
  const [plot, setPlot] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initState = {
    date,
    price: "",
    area: "",
    title: "",
    length: "",
    width: "",
    land_id: "",
    eastroad: false,
    westroad: false,
    northroad: false,
    southroad: false,
  };
  const [formData, setFormData] = useState(initState);
  const handleSubmit = (e) => {
    e.preventDefault();
    let road = [];

    if (formData?.eastroad) road.push("east");
    if (formData?.westroad) road.push("west");
    if (formData?.northroad) road.push("north");
    if (formData?.southroad) road.push("south");
    newData = {
      date: formData.date,
      price: formData.price,
      title: formData.title,
      length: formData.length,
      widht: formData.width,
      area: formData.area,
      land_id: formData.land_id,
      road,
    };
    console.log("form", formData);
    console.log("new", newData);
    axios
      .post("http://localhost:2345/products/admin", newData)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const valueToUpdate = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: valueToUpdate });

    // console.log(formData);
    // console.log(newData);
  };

  // finish add user

  const handlePlots = () => {
    // console.log("auth", auth);
    axios
      .get(`http://localhost:2345/products/admin?title=${name}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("res.data: ", res.data);
        setPlot([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (e) => {
    axios
      .delete(`http://localhost:2345/products/admin/${e}`, {
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
        <Button onClick={handlePlots}>Search</Button>
        <Stack>
          <Button onClick={onOpen}>Add Plot</Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <form onSubmit={handleSubmit}>
                <ModalHeader>Create Plot</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <label>Area</label>
                  <Input
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    placeholder="Area"
                  />
                  <label>Land</label>
                  <Input
                    name="land_id"
                    value={formData.land_id}
                    onChange={handleChange}
                    placeholder="Land Id"
                  />
                  <label>Price</label>
                  <Input
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                  />
                  <label>Title</label>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="title"
                  ></Input>
                  <br />
                  <label>Length</label>
                  <Input
                    name="length"
                    value={formData.length}
                    onChange={handleChange}
                    placeholder="length"
                  ></Input>
                  <br /> <label>Width</label>
                  <Input
                    name="width"
                    value={formData.width}
                    onChange={handleChange}
                    placeholder="width"
                  ></Input>
                  <br />
                  <label>East road</label>
                  <Checkbox
                    colorScheme="red"
                    name="eastroad"
                    type="checkbox"
                    value={formData.eastroad}
                    onChange={handleChange}
                  ></Checkbox>
                  <br />
                  <label>West Road</label>
                  <Checkbox
                    colorScheme="red"
                    name="westroad"
                    type="checkbox"
                    value={formData.westroad}
                    onChange={handleChange}
                  ></Checkbox>
                  <br />
                  <label>North Road</label>
                  <Checkbox
                    colorScheme="red"
                    name="northroad"
                    type="checkbox"
                    value={formData.northroad}
                    onChange={handleChange}
                  ></Checkbox>
                  <br />
                  <label>South Road</label>
                  <Checkbox
                    colorScheme="red"
                    name="southroad"
                    type="checkbox"
                    value={formData.southroad}
                    onChange={handleChange}
                  ></Checkbox>
                  <br />
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
            <Th>Title</Th>
            <Th>Length</Th>
            <Th>Width</Th>
            <Th>Price</Th>
            <Th>Road</Th>
            <Th>Land</Th>
          </Tr>
        </Thead>
        <Tbody>
          {plot &&
            plot.map((e, i) => (
              <Tr key={i}>
                <Td>{e.title}</Td>
                <Td>{e.length}</Td>
                <Td>{e.width}</Td>
                <Td>{e.price}</Td>
                <Td>
                  {e.road.map((ell, itt) => (
                    <p key={itt}>{ell}</p>
                  ))}
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
                          <span key={it}>{el}</span>
                        ))}
                      </p>
                      <Td>
                        <Button onClick={() => handleDelete(e._id)}>
                          Delete
                        </Button>
                      </Td>
                    </div>
                  }
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Stack>
  );
};
