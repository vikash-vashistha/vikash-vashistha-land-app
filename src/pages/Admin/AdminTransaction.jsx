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

export const AdminTransaction = () => {
  const [name, setName] = useState("");
  const [transaction, setTransaction] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initState = {
    date,
    amount: "",
    type: "",
    transaction_id: "",
    from: "",
    to: "",
    land_id: "",
    plot_id: ""
  };
  const [formData, setFormData] = useState(initState);
  const handleSubmit = (e) => {
    e.preventDefault();
console.log(formData);
    axios
      .post("http://localhost:2345/transaction/admin", formData)
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

  const handleTransaction = () => {
    // console.log("auth", auth);
    axios
      .get(
        `http://localhost:2345/transaction/admin?transaction_id=${name}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log("res.data: ", res.data);
        setTransaction([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (e) => {
    axios
      .delete(`http://localhost:2345/transaction/admin/${e}`, {
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
        <Button onClick={handleTransaction}>Search</Button>
        <Stack>
          <Button onClick={onOpen}>Add Transaction</Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <form onSubmit={handleSubmit}>
                <ModalHeader>Create Transaction</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <label>Transaction Id</label>
                  <Input
                    name="transaction_id"
                    value={formData.transaction_id}
                    onChange={handleChange}
                    placeholder="Transaction Id"
                  />
                  <label>Type</label>
                  <Input
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    placeholder="Type"
                  />
                  <label>Amount</label>
                  <Input
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Amount"
                  />
                  <label>From</label>
                  <Input
                    name="from"
                    value={formData.from}
                    onChange={handleChange}
                    placeholder="From"
                  ></Input>
                  <br />
                  <label>To</label>
                  <Input
                    name="to"
                    value={formData.to}
                    onChange={handleChange}
                    placeholder="To"
                  ></Input>
                  <br /> <label>Land</label>
                  <Input
                    name="land_id"
                    value={formData.land_id}
                    onChange={handleChange}
                    placeholder="Land"
                  ></Input>
                  <br />
                   <label>Plot</label>
                  <Input
                    name="plot_id"
                    value={formData.plot_id}
                    onChange={handleChange}
                    placeholder="plot"
                  ></Input>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button variant="ghost">
                    <Input type="submit" value={"create transaction"} />
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
            <Th>Id</Th>
            <Th>Type</Th>
            <Th>Date</Th>
            <Th>Amount</Th>
            <Th>From</Th>
            <Th>To</Th>
            <Th>Land</Th>
            <Th>Plot</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transaction &&
            transaction.map((e, i) => (
              <Tr key={i}>
                <Td>{e.transaction_id}</Td>
                <Td>{e.type}</Td>
                <Td>{e.date}</Td>
                <Td>{e.amount}</Td>
                <Td>{e.from.name}</Td>
                <Td>{e.to.name}</Td>
                <Td>
                  {
                    <Tr>
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
                    </Tr>
                  }
                </Td>
                <Td>
                  {
                    <Tr>
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
                    </Tr>
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
