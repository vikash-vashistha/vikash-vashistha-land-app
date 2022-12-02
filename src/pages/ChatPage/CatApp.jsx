import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Contacts from "./Contacts";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
const token = localStorage.getItem("token");
const users = [
  {
    id: 1,
    name: "Aman",
  },
  {
    id: 2,
    name: "Albert",
  },
  {
    id: 3,
    name: "Nrupul",
  },
  {
    id: 4,
    name: "Bicky",
  },
  {
    id: 5,
    name: "Nihal",
  },
];

export const ChatApp = () => {
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [messages, setMessages] = useState([]);
  const [subscribedTo, setSubscribedTo] = useState(users[0]);

  const createConnection = (user) => {
    console.log(`started lisening to `, user);
    let id1;
    function listen(callback) {
      id1 = setInterval(() => {
        axios
          .get(`http://localhost:2345/chat/${id}`, {
            headers: { authorization: `Bearer ${token}` },
          })
          .then((res) => {
            console.log("res.data: ", res.data);
            setMessages([...res.data])
          });
        let message = `new Message from ${
          user.name
        } at ${new Date().toTimeString()}`;
        callback(message);
      }, 5000);
    }
    function unsubscribe() {
      console.log(`stopped listening to ${user.name}`);
      clearInterval(id1);
    }
    return { listen, unsubscribe };
  };

 

  useEffect(() => {
    const connection = createConnection(subscribedTo);
    connection.listen((newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });
    return () => {
      connection.unsubscribe();
      setMessages([]);
    };
  }, [subscribedTo]);
  // console.log(onClose);

  return (
    <div>
      {messages?.map((e, i) => (
        <div key={i}>
          <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
            {e?.chat_with?.name}
          </Button>
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>ChatApp</DrawerHeader>

              <DrawerBody>
                <h2> Contacts </h2>
                <Contacts
                  users={users}
                  active={subscribedTo}
                  onChange={(user) => setSubscribedTo(user)}
                />
                <h1> Chats </h1>
                <div className="chatbox">
                  {e?.messages?.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </div>
                <Input placeholder="Type here..." />
              </DrawerBody>

              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="blue">Save</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      ))}
    </div>
  );
};
