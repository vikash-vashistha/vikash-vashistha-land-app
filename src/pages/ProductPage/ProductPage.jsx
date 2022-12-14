import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../Context/TheamContext";
import { useThrottle } from "use-throttle";

import {
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Spinner,
  InputRightElement,
  InputLeftElement,
  PhoneIcon,
  Button,
  Image,
  Box,
  Text
} from "@chakra-ui/react";
import { Carouseldiv } from "../../Components/Carouseldiv";

export const styles = {
  dark: {
    color: "blue",
    background: "pink",
    margin: "5px",
  },
  light: {
    color: "pink",
    background: "blue",
    margin: "5px",
  },
};

export const ProductsPage = () => {
  const ref = useRef();
  const ref1 = useRef();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { auth } = useSelector((state) => ({ auth: state.token }));
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const throttledText = useThrottle(text, 2000);

  const handleSearch = (e) => {
    setText(e.target.value);
  }

  const handleScroll = () => {
    ref.current.scrollTop = 0;
  };

    const handleClose= () => {
      setText("");
      ref1.current.value = "";
    };

  useEffect(() => {
    getData();
    // ref1.current = setInterval(() => {}, 2000);
    // return clearInterval(ref1.current);
  }, [throttledText]);

  // getting locations
  const getData = () => {
    setLoading(true)
    axios
      .get(`https://vikash-land-app.onrender.com/products/locations?city=${throttledText}`)
      .then((res) => {
        setData([...res.data]);
        setLoading(false);
      });
  };

  return (
    <div style={{marginTop: "50px"}}>
      <div>
        <InputGroup margin="auto" size="md" width="80%">
          <InputLeftAddon>🔎</InputLeftAddon>
          <Input
            onChange={handleSearch}
            pr="4.5rem"
            type="text"
            placeholder="Search City"
            ref={ref1}
          />
          <InputRightElement width="4.5rem">
            {text && (
              <Button
                h="1.5rem"
                size="sm"
                style={styles[theme]}
                onClick={handleClose}
              >
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
      </div>
      <div
        style={{
          display: "flex",
          height: "380px",
          margin: "5px",
          alignItems: "stretch",
          // border: "1px solid red",
          position: "absolute",
          zIndex: 1,
        }}
      >
        {text && (
          <div
            style={{
              // border: "1px solid red",
              marginLeft: "10%",
              width: "100%",
              height: "300px",
              display: "flex",
              zIndex: -1,
            }}
          >
            <div
              style={{
                overflowY: "scroll",
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
            </div>
            <Button
              style={{ height: "30px", marginTop: "80%" }}
              onClick={handleScroll}
            >
              ⬆️
            </Button>
          </div>
        )}
      </div>
      <Carouseldiv  />
    </div>
  );
};
