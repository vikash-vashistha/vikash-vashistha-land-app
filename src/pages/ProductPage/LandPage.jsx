import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Text, Stack, Flex } from "@chakra-ui/react";
import { LandFilterSort } from "./LandFilterSort";

export const Land = () => {
  const { id } = useParams();
  console.log(id)
  const [lands, setLands] = useState([]);
const location = useLocation()
  // getting lands inside scheme
  useEffect(() => {
    if (lands.length === 0 || location.search) {
      // const getLandParams = {
      //   params: {
      //     category: searchParams.getAll("category"),
      //     sortBy: searchParams.getAll("sortBy"),
      //     range: searchParams.getAll("range"),
      //   },
      // };
      axios
        .get(`http://localhost:2345/land/${id}${location.search}`)
        .then((res) => {
          setLands([...res.data]);
          console.log(res.data);
        });
    }
  }, [location.search]);

  const handlePartner = (e) => {
    console.log(e);
    axios
      .get(`http://localhost:2345/land/${e}`)
      .then((res) => {
        console.log( res.data);
      });
  }

console.log(location.search)
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
                <Button onClick={() => handlePartner(e._id)}>become partner</Button>
              </Stack>
            );
          })}
      </div>
    </div>
  );
};
