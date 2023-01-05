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
  Flex,
  Stack,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
const token = localStorage.getItem("token");

export const ChatApp = ({ id, nameOwner }) => {

  const { user } = useSelector((state) => ({ user: state.app.user }));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [subscribedTo, setSubscribedTo] = useState(users[0]);
  const [text, setText] = useState("");
  const [replys, setReplys] = useState([]);

  const gettingChat = (ids) => {
    axios
      .get(
        `https://vikash-land-app.onrender.com/chat/${(id = ids ? ids : id)}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        // console.log("res.data: ", res.data);
        setMessages(res.data.chats.length > 0 ? [...res.data.chats[0].messages] : [""]);
        return res.data;
      });
  };

  const gettingReply = (ids) => {
    axios
      .get(`https://vikash-land-app.onrender.com/chat/${id = ids ? ids : id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // console.log("res.data: ", res.data);
        setReplys(res.data.replys.length > 0 ? [...res.data.replys[0].messages] : [""]);
        return res.data;
      });
  };
  // useEffect(() => {
  //   gettingChat()
  // }, [])

  const createConnection = (user) => {
    console.log(`started lisening to `, user?.name);
    let id1;
    function listen(callback) {
      // id1 = setInterval(() => {
      gettingChat(user?._id);
      gettingReply(user?._id);
      let message = `${text} from ${user?.name}`;
      callback(message);
      // }, 5000);
    }
    function unsubscribe() {
      console.log(`stopped listening to ${user?.name}`);
      // clearInterval(id1);
    }
    return { listen, unsubscribe };
  };

  useEffect(() => {
    axios
      .get(`https://vikash-land-app.onrender.com/user/all`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("user.data: ", res.data);
        setUsers([...res.data.user]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
  console.log("ram", messages);

  const handleSave = () => {
    setMessages([
      ...messages,
      `${text} from ${user?.name} ${new Date().toString()}`,
    ]);
    if (messages.length === 0) {
      console.log("inside post", messages);
      axios
        .post(
          `https://vikash-land-app.onrender.com/chat`,
          {
            user_id: `${user?._id}`,
            chat_with: `${subscribedTo?._id}`,
            messages: `${messages[0].messages}`,
          },
          {
            headers: { authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          console.log("user.data: ", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("inside patch", messages);

      axios
        .patch(
          `https://vikash-land-app.onrender.com/chat`,
          {
            user_id: user._id,
            chat_with: subscribedTo._id,
            messages: [...messages, text],
          },
          {
            headers: { authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          console.log("user.data: ", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  //  console.log("sf", subscribedTo)

  return (
    <Stack m="auto" w="sm" mt="100px">
      <Link
        to={``}
        style={{
          margin: "5px",
          fontWeight: "bold",
          textDecoration: "none",
          color: "teal",
        }}
        ref={btnRef}
        onClick={onOpen}
      >
        {nameOwner}
      </Link>
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
              onChange={(user) => {
                // console.log("user",user);
                setSubscribedTo(user);
              }}
            />
            <h1> Chats </h1>
            <Flex>
              <div className="chatbox" style={{ justifyContent: "left" }}>
                {messages?.map((item, it) => (
                  <li
                    style={{
                      border: "1px solid red",
                      backgroundColor: "green",
                    }}
                    key={it}
                  >
                    {item}
                  </li>
                ))}
              </div>
              <div className="chatbox">
                {replys?.map((item, it) => (
                  <li
                    style={{
                      border: "1px solid green",
                      backgroundColor: "red",
                    }}
                    key={it}
                  >
                    {item}
                  </li>
                ))}
              </div>
            </Flex>
            <Input
              placeholder="Type here..."
              onChange={(e) => setText(e.target.value)}
            />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSave}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Stack>
  );
};
