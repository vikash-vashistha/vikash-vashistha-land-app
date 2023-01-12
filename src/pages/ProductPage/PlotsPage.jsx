import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Text, Card, CardHeader, CardBody, CardFooter, Select, Stack, Heading, Divider, ButtonGroup, Flex, useDisclosure } from "@chakra-ui/react";
import { PlotFilterSort } from "./PlotFilterSort";
import { useDispatch, useSelector } from "react-redux";
import { GiRoad, GiElectric } from "react-icons/gi";
import { MdOutlineWaterDrop, MdOutlineDeleteSweep } from "react-icons/md";

const token = localStorage.getItem("token");

export const Plots = () => {
  const { user } = useSelector((state) => ({ user: state.app.user }));
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [plots, setPlots] = useState([]);
  // getting plots inside land

const location = useLocation();

  useEffect(() => {
    axios
      .get(
        `https://vikash-land-app.onrender.com/products/singleland/${id}${location.search}`
      )
      .then((res) => {
        console.log(plots, res.data);
        setPlots((prv) => [...res.data]);
        console.log("plots", plots);
      });
  }, [location.search]);

  const handleCart = (e) => {
    console.log(user._id, e);
    dispatch({user, e, token})
  };

   if (!plots) return <div>Lodading...</div>;
  

  return (
    <Flex mt={[150, 10, 10]} gap="20px">
      <PlotFilterSort />{" "}
      <Flex wrap="wrap" gap="20px">
        {plots &&
          plots.map((e, i) => (
            <Card maxW="sm" bg="#FFFFE0">
              <CardBody>
                <Stack mt="6" spacing="3">
                  <Heading size="md">Plot No. {i + 1}</Heading>
                  <Text>{e.title}</Text>
                  {e.road.includes("east") ? (
                    <Flex align="center">
                      East Road <GiRoad />
                    </Flex>
                  ) : (
                    ""
                  )}
                  {e.road.includes("west") ? (
                    <Flex align="center">
                      West Road <GiRoad />
                    </Flex>
                  ) : (
                    ""
                  )}
                  {e.road.includes("north") ? (
                    <Flex align="center">
                      North Road <GiRoad />
                    </Flex>
                  ) : (
                    ""
                  )}
                  {e.road.includes("south") ? (
                    <Flex align="center">
                      South Road <GiRoad />
                    </Flex>
                  ) : (
                    ""
                  )}
                  <Stack
                    style={{
                      border: "5px solid grey",
                      margin: "5px",
                      padding: "20px",
                      height: "150px",
                      backgroundColor: e?.user_id?.phone_no
                        ? "grey"
                        : "lightGreen",
                      width: e.length === e.width ? "150px" : "75px",
                      borderRight: e?.road?.includes("east")
                        ? "10px dashed black"
                        : "5px solid blue",
                      borderLeft: e?.road?.includes("west")
                        ? "10px dashed black"
                        : "5px solid blue",
                      borderBottom: e?.road?.includes("south")
                        ? "10px dashed black"
                        : "5px solid blue",
                      borderTop: e?.road?.includes("north")
                        ? "10px dashed black"
                        : "5px solid blue",
                    }}
                  >
                    <Text>
                      {e?.land_id?.facility?.includes("electricity") ? (
                        <GiElectric />
                      ) : (
                        ""
                      )}
                    </Text>
                    <Text>
                      {e?.land_id?.facility?.includes("water") ? (
                        <MdOutlineWaterDrop />
                      ) : (
                        ""
                      )}
                    </Text>
                    <Text mt="4px">
                      {e?.land_id?.facility?.includes("road") ? <GiRoad /> : ""}
                    </Text>
                    <Text>
                      {e?.land_id?.facility?.includes("sewerage") ? (
                        <MdOutlineDeleteSweep />
                      ) : (
                        ""
                      )}
                    </Text>
                  </Stack>
                  <Text color="blue.600" fontSize="2xl">
                    ₹{e.price}
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Link key={e._id} to={`/plotdetails/${e._id}`}>
                    <Button
                      variant="solid"
                      colorScheme="blue"
                      disabled={e?.user_id?.phone_no ? true : false}
                    >
                      Check
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    colorScheme="blue"
                    onClick={() => handleCart(e)}
                  >
                    Add to cart
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}
      </Flex>
    </Flex>
  );
};
