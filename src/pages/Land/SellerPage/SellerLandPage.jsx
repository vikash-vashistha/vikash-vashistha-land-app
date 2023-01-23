import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Text, Stack, Flex, HStack } from "@chakra-ui/react";
import { LandFilterSort } from "../LandProductPage/LandFilterSort";

const token = localStorage.getItem("token");

export const SellerLandPage = () => {
  const [lands, setLands] = useState([]);
  const location = useLocation();
  // getting lands inside scheme
  useEffect(() => {
    if (lands.length === 0 || location.search) {
        axios
          .get(
            `https://vikash-land-app.onrender.com/land/seller/all/${location.search}`,
            {
              headers: { authorization: `Bearer ${token}` },
            }
          )
          .then((res) => {
            setLands([...res.data]);
            console.log(res.data);
          });
    }
  }, [location.search]);

  console.log(location.search, lands);
  return (
    <Flex mt={[150, 10, 10]} gap="20px">
      <LandFilterSort />
      <Flex w={[300, 800, 1000]} wrap="wrap" gap="20px">
        {lands &&
          lands.map((e, i) => {
            return (
              <Stack maxW="md" w={[250, 300, 400]} m={2} p={2} bg="#FFFFE0">
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
      </Flex>
    </Flex>
  );
};
