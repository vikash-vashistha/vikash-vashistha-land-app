import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Box, Button, Checkbox, Text, layoutPropNames, Stack } from "@chakra-ui/react";


export const Land = () => {
  const { id } = useParams();
  const [lands, setLands] = useState([]);
  // getting lands inside scheme
  useEffect(() => {
    axios.get(`http://localhost:2345/products/alllands/${id}`).then((res) => {
      setLands([...res.data]);
       console.log(res.data);
    });
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "20%" }}>
        <br />

        <h3>Filter</h3>
        <Stack>
          <Checkbox>Water</Checkbox>
          <Checkbox>Electricty</Checkbox>
          <Checkbox>Road</Checkbox>
          <Checkbox>Sewerage</Checkbox>
        </Stack>
        <br />

        <h3>Sort by price</h3>
        <Stack>
          <Checkbox>Low to High</Checkbox>
          <Checkbox>High to Low</Checkbox>
        </Stack>
        <br />

        <h3>Select range</h3>
        <Stack>
          <Checkbox>1L to 5L</Checkbox>
          <Checkbox>5L to 15L</Checkbox>
          <Checkbox>15L to 25L</Checkbox>
          <Checkbox>25L to 50L</Checkbox>
          <Checkbox>50L and above</Checkbox>
        </Stack>
      </div>
      <div style={{ width: "80%"}}>
        {lands &&
          lands.map((e) => {
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
                  to={`/products/singleland/${e._id}`}
                  style={{ margin: "5px", textDecoration: "none" }}
                >
                  <Button>Check out plots</Button>
                </Link>
                <Text>price = {e.price}</Text>
                <Text>area = {e.area}</Text>
                <Button>become partner</Button>
              </Stack>
            );
          })}
      </div>
    </div>
  );
};
