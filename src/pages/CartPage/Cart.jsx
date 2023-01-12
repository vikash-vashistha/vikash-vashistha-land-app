import { Button, ButtonGroup, Divider, Flex, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Payment } from "../../Components/Payment";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { GiRoad, GiElectric } from "react-icons/gi";
import { MdOutlineWaterDrop, MdOutlineDeleteSweep } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { get_cart, remove_from_cart } from "../../Redux/cart/action";


export const Cart = () => {
  const { token } = useSelector((state) => state.auth);
  const {cart, total} = useSelector((state) => state.cart)
  const dispatch = useDispatch();
  const { id } = useParams(); 
  // getting plots inside land

  const location = useLocation();

  useEffect(() => {
    dispatch(get_cart({id, token}))
  }, []);

  const itemRemoveHandler = (e) => {
    dispatch(remove_from_cart({ id: e, token }));
  };

  console.log(cart);
  if(!cart) return  <div>loading...</div>

  return (
    <Stack m="auto" mt={[150, 10, 10]} bg="#FFFFE0">
      <HStack ml={2} justify="space-around">
        <Text color="blue.600" fontSize="2xl">
          Total - ₹{total}
        </Text>
        <Button variant="ghost" colorScheme="blue">
          <Payment price={total} />
        </Button>
      </HStack>
      <Flex ml="40px" wrap="wrap" gap="40px">
        {cart &&
          cart.map((e, i) => (
            <Card maxW="sm">
              <CardBody>
                <Stack mt="6" spacing="3">
                  <Heading size="md">Plot No. {i + 1}</Heading>
                  <Text>{e?.plot_id?.title}</Text>
                  {e?.plot_id?.road?.includes("east") ? (
                    <Flex align="center">
                      East Road <GiRoad />
                    </Flex>
                  ) : (
                    ""
                  )}
                  {e?.plot_id?.road?.includes("west") ? (
                    <Flex align="center">
                      West Road <GiRoad />
                    </Flex>
                  ) : (
                    ""
                  )}
                  {e?.plot_id?.road?.includes("north") ? (
                    <Flex align="center">
                      North Road <GiRoad />
                    </Flex>
                  ) : (
                    ""
                  )}
                  {e?.plot_id?.road?.includes("south") ? (
                    <Flex align="center">
                      South Road <GiRoad />
                    </Flex>
                  ) : (
                    ""
                  )}

                  <Link
                    key={e._id}
                    to={`/plotdetails/${e._id}`}
                    style={{ margin: "5px", textDecoration: "none" }}
                  ></Link>
                  <Stack
                    style={{
                      border: "5px solid grey",
                      margin: "5px",
                      padding: "20px",
                      height: "150px",
                      backgroundColor: e?.plot_id?.user_id?.phone_no
                        ? "grey"
                        : "lightGreen",
                      width:
                        e?.plot_id?.length === e?.plot_id?.width
                          ? "150px"
                          : "75px",
                      borderRight: e?.plot_id?.road?.includes("east")
                        ? "10px dashed black"
                        : "5px solid blue",
                      borderLeft: e?.plot_id?.road?.includes("west")
                        ? "10px dashed black"
                        : "5px solid blue",
                      borderBottom: e?.road?.includes("south")
                        ? "10px dashed black"
                        : "5px solid blue",
                      borderTop: e?.plot_id?.road?.includes("north")
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
                    <Text>
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
                    ₹{e?.plot_id?.price}
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Button
                    variant="solid"
                    colorScheme="red"
                    onClick={() => itemRemoveHandler(e._id)}
                  >
                    Remove
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}
      </Flex>
    </Stack>
  );
};
