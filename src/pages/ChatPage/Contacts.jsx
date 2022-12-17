import { Button, Select } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Contacts({ users, active, onChange }) {
  return (
    <div style={{ marginTop: "50px", display: "flex", flexWrap: "wrap", gap: "5px" }}>
      {users.map((user) => (
            <Button
              colorScheme="teal"
              variant="link"
              style={{ background: active === user ? "tomato" : null }}
              key={user._id}
              onClick={() => onChange(user)}
            >
              {user.name}
            </Button>
      ))}
    </div>
  );
}

export default Contacts;
