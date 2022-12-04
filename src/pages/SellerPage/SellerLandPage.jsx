import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Text, Stack, Flex } from "@chakra-ui/react";
import { LandFilterSort } from "../ProductPage/LandFilterSort";

const token = localStorage.getItem("token");

export const SellerLandPage = () => {
  const [lands, setLands] = useState([]);
  const location = useLocation();
  // getting lands inside scheme
  useEffect(() => {
    if (lands.length === 0 || location.search) {
        axios
          .get(`http://localhost:2345/land/seller/${location.search}`, {
            headers: { authorization: `Bearer ${token}` },
          })
          .then((res) => {
            setLands([...res.data]);
            console.log(res.data);
          });
    }
  }, [location.search]);

  console.log(location.search, lands);
  return (
    <div style={{ display: "flex" }}>
      <LandFilterSort />
      <div style={{ width: "80%", display: "flex", flexWrap: "wrap" }}>
        {lands &&
          lands.map((e, i) => {
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
                  to={`/singleland/${e._id}`}
                  style={{ margin: "5px", textDecoration: "none" }}
                >
                  <Button>Land NO. {i + 1} Check out plots</Button>
                </Link>
                <Text>price = {e.price} rs/sq. ft.</Text>
                <Text>area = {e.area} sq. ft.</Text>
                <Flex>
                  <Text>
                    {e.facility && e.facility.includes("electricity")
                      ? "💡"
                      : ""}
                  </Text>
                  <Text>
                    {e.facility && e.facility.includes("water") ? "💧" : ""}
                  </Text>
                  <Text>
                    {e.facility && e.facility.includes("road") ? "🛣️" : ""}
                  </Text>
                  <Text>
                    {e.facility && e.facility.includes("sewerage") ? "🚽" : ""}
                  </Text>
                </Flex>
                <Flex>
                  {e?.partners?.map((el, it) => (
                    <Link
                      key={it}
                      to={`/chat/${el._id}`}
                      style={{ margin: "5px", textDecoration: "none" }}
                    >
                      <Button colorScheme="teal" variant="link" key={it}>
                        {el.name}
                      </Button>
                    </Link>
                  ))}{" "}
                </Flex>
                <Link to={`/seller/newplot/${e._id}/`}>
                  <Button>create a plot</Button>
                </Link>
              </Stack>
            );
          })}
      </div>
    </div>
  );
};
