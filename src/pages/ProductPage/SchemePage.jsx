import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, ButtonGroup, Divider, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'

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

  if (!schemes) return <div>Lodading...</div>
  
    return (
      <Flex wrap="wrap" mt="150px" gap="20px">
        {schemes &&
          schemes.map((e, i) => {
            return (
              <Card maxW="sm">
                <CardBody>
                  <Image
                    src={e.image}
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">scheme {e.scheme_name}</Heading>
                    <Text color="blue.600" fontSize="2xl">
                      {e.city}
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Link
                      to={`/lands/${e._id}`}
                      style={{ margin: "5px", textDecoration: "none" }}
                    >
                      <Button variant="solid" colorScheme="blue">
                        Scheme NO. {i + 1} Checkout Lands
                      </Button>
                    </Link>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            );
          })}
      </Flex>
    );
};
