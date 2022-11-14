import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Contacts from "./Contacts";
import { users } from "./chat";
import createConnection from "./chat";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [subscribedTo, setSubscribedTo] = useState(users[0]);
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

  return (
    <div>
      <h1>
        <u> ChatApp </u>
      </h1>
      <br />
      <h2> Contacts </h2>
      <Contacts
        users={users}
        active={subscribedTo}
        onChange={(user) => setSubscribedTo(user)}
      />
      <hr />
      <h1> Chats </h1>
      <div className="chatbox">
        {messages.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </div>
    </div>
  );
};

export default ChatApp;
