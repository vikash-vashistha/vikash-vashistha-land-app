import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  useParams,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Text, Stack, Flex, useDisclosure, ButtonGroup, Divider, Heading } from "@chakra-ui/react";
import { LandFilterSort } from "./LandFilterSort";
import { useSelector } from "react-redux";
import { Payment } from "../../Components/Payment";
import { ChatApp } from "../ChatPage/ChatApp";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { GiRoad, GiElectric } from "react-icons/gi";
import { MdOutlineWaterDrop, MdOutlineDeleteSweep } from "react-icons/md";
import styles from "./LandPage.module.css"



export const Land = () => {
  const navigate = useNavigate();
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
    arr.push(user._id);
    axios
      .patch(`https://vikash-land-app.onrender.com/land/partner/${e}`, arr)
      .then((res) => {
        console.log(res.data);
      });
    navigate("payment");
  };

  if (!lands) return <div>Lodading...</div>;
  

  return (
    <Flex ml="20px" mt={[150, 10, 10]} gap="20px">
      <LandFilterSort />
      <Flex w={[300, 800, 1000]} wrap="wrap" gap="20px">
        {lands &&
          lands.map((e, i) => {
            return (
              <Card maxW="md" w={[250, 300, 400]} m={2} p={2} bg="#FFFFE0">
                <CardBody h={[100, 150, 200]}>
                  <Stack spacing="2">
                    <Heading size="md">Living room Sofa</Heading>
                    <Text>area = {e.area} sq. ft.</Text>
                    <Flex>
                      <Text>
                        {e.facility && e.facility.includes("electricity") ? (
                          <GiElectric />
                        ) : (
                          ""
                        )}
                      </Text>
                      <Text>
                        {e.facility && e.facility.includes("water") ? (
                          <MdOutlineWaterDrop />
                        ) : (
                          ""
                        )}
                      </Text>
                      <Text>
                        {e.facility && e.facility.includes("road") ? (
                          <GiRoad />
                        ) : (
                          ""
                        )}
                      </Text>
                      <Text>
                        {e.facility && e.facility.includes("sewerage") ? (
                          <MdOutlineDeleteSweep />
                        ) : (
                          ""
                        )}
                      </Text>
                    </Flex>
                    <Flex wrap="wrap">
                      {e?.partners?.map((el, it) => (
                        <ChatApp id={el?._id} nameOwner={el?.name} />
                      ))}{" "}
                    </Flex>
                    <Text m={0} color="blue.600" fontSize="2xl">
                      price = {e.price} ₹/sq. ft.
                    </Text>
                  </Stack>
                </CardBody>
                <CardFooter m="auto" p={0}>
                  <ButtonGroup spacing="1" className={styles.media}>
                    <Link to={`/singleland/${e._id}`}>
                      <Button variant="solid" colorScheme="blue">
                        Land NO. {i + 1} Check out plots
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      colorScheme="blue"
                      onClick={() => handlePartner(e._id, e.partners)}
                    >
                      become partner
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            );
          })}
      </Flex>
    </Flex>
  );
};
