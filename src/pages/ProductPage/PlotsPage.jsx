import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Text, Checkbox, Select, Stack } from "@chakra-ui/react";

export const Plots = () => {
  const { id } = useParams();
  const [plots, setPlots] = useState([]);
  // getting plots inside land

  useEffect(() => {
    axios.get(`http://localhost:2345/products/singleland/${id}`).then((res) => {
      console.log(plots, res.data);
      setPlots( (prv) => [...res.data]);
      console.log("plots", plots);
    });
  }, []);
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "20%" }}>
        <br />

        <h3>Filter</h3>
        <Stack>
          <Checkbox>East Road</Checkbox>
          <Checkbox>West Road</Checkbox>
          <Checkbox>North Road</Checkbox>
          <Checkbox>South Road</Checkbox>
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
        <br />

        <h3>Facing</h3>
        <Select placeholder="Select Face">
          <option value="East">East</option>
          <option value="West">West</option>
          <option value="North">North</option>
          <option value="South">South</option>
        </Select>
      </div>
      <div>
        {plots &&
          plots.map((e, i) => (
            <Stack style={{border:"1px solid grey", borderRadius: "5px", margin: "5px", padding: "5px"}}>
              <Text>Plot No. {i + 1}</Text>
              {e.eastroad ? <Text>East Road</Text> : ""}
              {e.westroad ? <Text>West Road</Text> : ""}
              {e.northroad ? <Text>North Road</Text> : ""}
              {e.southroad ? <Text>South Road</Text> : ""}

              <Link
                key={e._id}
                to={`/plotdetails/${e._id}`}
                style={{ margin: "5px", textDecoration: "none" }}
              >
                <Button>Check out</Button>
              </Link>
            </Stack>
          ))}
      </div>
    </div>
  );
};
