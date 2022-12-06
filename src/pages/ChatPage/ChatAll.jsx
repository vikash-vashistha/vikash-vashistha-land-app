import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
const token = localStorage.getItem("token");


export const ChatAll = () => {
  const [chat, setChat] = useState([]);
  const [reply, setReply] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:2345/chat/all`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("res.data: ", res.data);
        setChat([...res.data.chats]);
        setReply([...res.data.chats_with])
      });
  }, [])
  // console.log(onClose);

  return (
    <div>
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
          <Text fontSize="30px" color="tomato">
            {e?.chat_with.name}
          </Text>
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
          </Stack>
        </Stack>
      ))}

      {reply?.map((e, i) => (
        <Stack
          style={{
            border: "1px solid grey",
            borderRadius: "5px",
            margin: "5px",
            padding: "5px",
          }}
          key={i}
        >
          <Text fontSize="30px" color="tomato">
            {e?.chat_with.name}
          </Text>
          <Stack
            style={{
              border: "1px solid grey",
              borderRadius: "5px",
              margin: "5px",
              padding: "5px",
            }}
          >
            {e?.messages?.map((el, it) => (
              <Text style={{textAlign: "end"}} key={it}>{el} 💬</Text>
            ))}
          </Stack>
        </Stack>
      ))}
    </div>
  );
};