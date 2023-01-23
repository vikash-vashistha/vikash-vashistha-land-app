import { Button, Flex, Image, Input, InputGroup, InputLeftAddon, InputRightElement, Link, Spacer, Spinner, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { CiSearch } from 'react-icons/ci';
import { MdArrowUpward } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useThrottle } from 'use-throttle';

export const CitySearch = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
  const ref = useRef();
  const ref1 = useRef();
  const [text, setText] = useState("");
  const throttledText = useThrottle(text, 2000);

    const handleSearch = (e) => {
      setText(e.target.value);
    };

    const handleScroll = () => {
      ref.current.scrollTop = 0;
    };

    const handleClose = () => {
      setText("");
      ref1.current.value = "";
    };

    useEffect(() => {

      getData();
    }, [throttledText]);

    // getting locations
    const getData = () => {
      setLoading(true);
      axios
        .get(
          `https://vikash-land-app.onrender.com/products/locations?city=${throttledText}`
        )
        .then((res) => {
          setData([...res.data]);
          setLoading(false);
        });
    };
  return (
    <Flex align="center" m="auto" gap="1px" wrap="wrap">
      <Flex align="center">
        <InputGroup
          sm="30em"
          md="48em"
          lg="62em"
          xl="80em"
          align="center"
        >
          <InputLeftAddon>
            <CiSearch />
          </InputLeftAddon>
          <Input
            onChange={handleSearch}
            pr="4.5rem"
            type="text"
            placeholder="Search City"
            ref={ref1}
          />
          <InputRightElement width="4.5rem">
            {text && (
              <Button h="1.5rem" size="sm" onClick={handleClose}>
                <Image
                  style={{ width: "20px", cursor: "pointer" }}
                  src="https://www.pngkey.com/png/full/105-1058931_black-cross-png-cross-sign-png-black.png"
                  alt="close button"
                />
              </Button>
            )}
            {loading && (
              <Spinner
                thickness="1px"
                speed="1.2s"
                emptyColor="white"
                color="blue.500"
                size="sm"
              />
            )}
          </InputRightElement>
        </InputGroup>
      </Flex>
      <Spacer />
      <Flex mt={20} align="strech" h="380px" position="absolute" zIndex={1}>
        {text && (
          <div
            style={{
              // marginLeft: "10%",
              marginTop: "170px",
              width: "100%",
              height: "300px",
              display: "flex",
              zIndex: -1,
            }}
          >
            <Stack
              style={{
                overflowY: "scroll",
                background: "#FFFFE0",
                borderRadius: "4px",
              }}
              ref={ref}
            >
              {data &&
                data.map((e) => (
                  <Text
                    style={{ margin: "5px", textDecoration: "none" }}
                    key={e._id}
                  >
                    <Link
                      to={`/scheme/${e.city}`}
                      style={{ margin: "5px", textDecoration: "none" }}
                    >
                      <span>{e.city}</span>
                      <span> (</span>
                      <span>{e.state}</span> <span>)</span>
                    </Link>
                  </Text>
                ))}
            </Stack>
            <Button
              onClick={handleScroll}
              style={{
                height: "30px",
                marginTop: "100%",
                background: "transparent",
              }}
            >
              <MdArrowUpward size="md" />
            </Button>
          </div>
        )}
      </Flex>
    </Flex>
  );
}
