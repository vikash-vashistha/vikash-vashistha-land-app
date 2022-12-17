import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Flex, Input, InputGroup, InputRightElement, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const token = localStorage.getItem("token");

export const ChatAll = () => {
  const { user } = useSelector((state) => ({ user: state.app.user }));
  const [chat, setChat] = useState([]);
  const [reply, setReply] = useState([]);
  const [text, setText] = useState("")

  const handleClick = ({el, mes}) => {
    console.log(el, mes);
     axios
       .patch(
         `https://vikash-land-app.onrender.com/chat`,
         {
           user_id: el.user_id._id,
           chat_with: el.chat_with._id,
           messages: [...mes, text],
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
    getData();
  }

  useEffect(() => {
   getData()
  }, []);

  const getData = () => {
     axios
       .get(`https://vikash-land-app.onrender.com/chat/all`, {
         headers: { authorization: `Bearer ${token}` },
       })
       .then((res) => {
         console.log("res.data: ", res.data);
         setChat([...res.data.chats]);
         setReply([...res.data.chats_with]);
       });
  }
  // console.log(onClose);

  return (
    <div style={{ marginTop: "50px" }}>
      {chat?.map((e, i) => (
        <Stack
          style={{
            border: "1px solid grey",
            borderRadius: "5px",
            margin: "5px",
            padding: "5px",
          }}
          key={i}
        >
          <Link
            to={`/chat/${user._id}`}
            style={{ margin: "5px", textDecoration: "none" }}
          >
            <Text fontSize="30px" color="tomato">
              {e?.user_id.name}
            </Text>
          </Link>
          <Stack
            style={{
              border: "1px solid grey",
              borderRadius: "5px",
              margin: "5px",
              padding: "5px",
            }}
          >
            {e?.messages?.map((el, it) => (
              <Text key={it}>💬 {el}</Text>
            ))}
            <Stack
              style={{
                border: "1px solid grey",
                borderRadius: "5px",
                margin: "5px",
                padding: "5px",
              }}
            >
              <Link
                to={`/chat/${user._id}`}
                style={{ margin: "5px", textDecoration: "none" }}
              >
                <Text fontSize="30px" color="tomato">
                  {e?.chat_with.name}
                </Text>
              </Link>
              {reply?.map((rl, rt) => (
                <Stack>
                  {e.chat_with.name == rl.user_id.name &&
                    rl?.messages?.map((rel, rit) => (
                      <Text style={{ textAlign: "end" }} key={rit}>
                        {rel} 💬
                      </Text>
                    ))}
                </Stack>
              ))}
            </Stack>
          </Stack>
          <InputGroup size="md">
            <Input
              onChange={(e) => setText(e.target.value)}
              placeholder="message"
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => handleClick({ el: e, mes: e.messages })}
              >
                Send
              </Button>
            </InputRightElement>
          </InputGroup>
        </Stack>
      ))}
    </div>
  );
};
