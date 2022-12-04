import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Contacts({ users, active, onChange }) {
  return (
    <div>
      {users.map((user) => (
        <div
          style={{ background: active === user ? "tomato" : null }}
          key={user._id}
          onClick={() => onChange(user)}
        >
          <Link
            to={`/chat/${user._id}`}
            style={{ margin: "5px", textDecoration: "none" }}
          >
            <Button colorScheme="teal" variant="link">
              {user.name}
            </Button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Contacts;
