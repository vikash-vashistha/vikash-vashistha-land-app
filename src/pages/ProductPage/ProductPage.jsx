import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../Context/TheamContext";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  InputRightElement,
  InputLeftElement,
  PhoneIcon,
  Button,
  Image,
  Box,
} from "@chakra-ui/react";

export const styles = {
  dark: {
    color: "blue",
    background: "pink",
  },
  light: {
    color: "pink",
    background: "blue",
  },
};

export const ProductsPage = () => {
  const ref = useRef();
  // const ref1 = useRef();
  const {theme, toggleTheme} = useContext(ThemeContext);
  const { auth } = useSelector((state) => ({ auth: state.token }));
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const handleClick = () => {
    ref.current.scrollTop = 0;
  };

  useEffect(() => {
    
    getData();
    // ref1.current = setInterval(() => {}, 2000);
    // return clearInterval(ref1.current);
  }, [text]);

  // getting locations
  const getData = () => {
    axios
      .get(`http://localhost:2345/products/locations?city=${text}`)
      .then((res) => setData([...res.data]));
  };

  return (
    <div>
      <div>
        <InputGroup margin="auto" size="md" width="80%">
          <Input
            onChange={(e) => setText(e.target.value)}
            pr="4.5rem"
            type="text"
            placeholder="Search City"
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              style={styles[theme]}
              onClick={handleClick}
            >
              search
            </Button>
          </InputRightElement>
        </InputGroup>
      </div>
      <div style={{ display: "flex", height: "450px", margin: "5px" }}>
        <div
          style={{
            margin: "auto",
            width: "90%",
            height: "430px",
            overflowY: "scroll",
          }}
          ref={ref}
        >
          {data &&
            data.map((e) => (
              <Button
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
              </Button>
            ))}
        </div>
        <Button
          style={{ height: "30px", marginTop: "35%" }}
          onClick={handleClick}
        >
          ⬆️
        </Button>
      </div>
    </div>
  );
};
