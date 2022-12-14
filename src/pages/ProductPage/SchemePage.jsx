import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Stack, Text } from "@chakra-ui/react";


export const Scheme = () => {
  const {id} = useParams();
console.log(IDBObjectStore)
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  // getting schemes
  const getProducts = () => {
    axios
      .get(`https://vikash-land-app.onrender.com/scheme/all/${id}`)
      .then((res) => {
        setSchemes([...res.data]);
        console.log(res.data);
      });
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", marginTop: "50px" }}>
      {schemes &&
        schemes.map((e, i) => {
          return (
            <Stack
              width="sm"
              key={e._id}
              style={{
                border: "1px solid grey",
                borderRadius: "5px",
                margin: "5px",
                padding: "5px",
              }}
            >
              <Link
                to={`/lands/${e._id}`}
                style={{ margin: "5px", textDecoration: "none" }}
              >
                <Button>Scheme NO. {i + 1} Checkout Lands</Button>
              </Link>
              <Text>{e.city}</Text>
              <Text>scheme {e.scheme_name}</Text>
            </Stack>
          );
        })}
    </div>
  );
};
