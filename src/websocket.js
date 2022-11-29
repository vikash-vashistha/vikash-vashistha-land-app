import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";

const client = new WebSocket("ws://localhost:2345");
client.onmessage = (msg) => {
  // setMsg(msg.data);
  console.log("server said ", msg.data);
};

export const Chat = () => {
  const [text, setText] = useState("")
  const [msg, setMsg] = useState("");

  
  client.on("newMessage", function (msg) {
    setMsg(msg)
  })

  const handleChange = (e) => {
    setText(e.target.value);
  }

  const handleClick = () => {
    client.send(text)
    // client.emit("newMessage", text)
  };

  // client.close();
  return (
    <div>
      <p>{msg}</p>
      <Input onChange={handleChange}/>
      <Button onClick={handleClick}>send msg</Button>
    </div>
  );
};
