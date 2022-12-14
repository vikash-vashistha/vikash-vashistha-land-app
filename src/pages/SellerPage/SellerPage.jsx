import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Stack,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";
import styles from "./SellerPage.module.css";

const token = localStorage.getItem("token");
export const SellerPage = () => {
  const [lands, setLands] = useState([]);
  const [scheme, setSchemes] = useState([]);

  const schemeHandler = () => {
    axios.get(`https://vikash-land-app.onrender.com/scheme/`).then((res) => {
      setSchemes([...res.data]);
      console.log(res.data);
    });
  };

  // useEffect(() => {
  //    axios
  //      .get(`https://vikash-land-app.onrender.com/land`, {
  //        headers: { authorization: `Bearer ${token}` },
  //      })
  //      .then((res) => {
  //        setLands([...res.data]);
  //         console.log(res.data);
  //      });
  // },[])
  return (
    <Stack style={{ marginTop: "50px" }}>
    <Button onClick={schemeHandler}>Choose Scheme</Button>
      <Flex flexWrap ="wrap">
        {scheme &&
          scheme.map((e, i) => {
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
                  to={`/lands/seller`}
                  style={{ margin: "5px", textDecoration: "none" }}
                >
                  <Button>Scheme NO. {i + 1} Checkout Lands</Button>
                </Link>
                <Link to={`/seller/newland/${e._id}`}>
                  <Button>register a land</Button>
                </Link>
                <Text>{e.city}</Text>
                <Text>scheme {e.scheme_name}</Text>
              </Stack>
            );
          })}
      </Flex>

      <Stack className={styles.main}>
        {lands &&
          lands.map((e, i) => {
            return (
              <Stack key={e._id} className={styles.inner}>
                <Text>{"land" + " " + (i + 1)}</Text>
                <Link to={`/seller/newplot/${e._id}/`}>
                  <Button>create a plot</Button>
                </Link>
                <Text style={{ marginLeft: "2%" }}>price = {e.price}</Text>
                <Text style={{ marginLeft: "2%" }}>area = {e.area}</Text>
              </Stack>
            );
          })}
      </Stack>
    </Stack>
  );
};
