import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams, useLocation, Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Text, Stack, Flex, useDisclosure } from "@chakra-ui/react";
import { LandFilterSort } from "./LandFilterSort";
import { useSelector } from "react-redux";
import { Payment } from "../../Components/Payment";

export const Land = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => ({ user: state.app.user }));
  const { id } = useParams();
  console.log(id);
  const [lands, setLands] = useState([]);
  const location = useLocation();
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
        .get(
          `https://vikash-land-app.onrender.com/land/${id}${location.search}`
        )
        .then((res) => {
          setLands([...res.data]);
          console.log(res.data);
        });
    }
  }, [location.search]);

  const handlePartner = (e, p) => {
    console.log(e, p);
    let arr = p.map((el) => el._id);
    arr.push(user._id)
    axios
      .patch(`https://vikash-land-app.onrender.com/land/partner/${e}`, arr)
      .then((res) => {
        console.log(res.data);
      });
    navigate("payment")
  };

  console.log(location.search, lands);
  return (
    <div style={{ display: "flex", marginTop: "50px" }}>
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
                <Button onClick={() => handlePartner(e._id, e.partners)}>
                  become partner
                </Button>
              </Stack>
            );
          })}
      </div>
    </div>
  );
};
