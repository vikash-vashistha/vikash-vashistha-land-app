import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Text, Checkbox, Select, Stack } from "@chakra-ui/react";
import { PlotFilterSort } from "./PlotFilterSort";

export const Plots = () => {
  const { id } = useParams();
  const [plots, setPlots] = useState([]);
  // getting plots inside land

const location = useLocation();

  useEffect(() => {
    axios
      .get(`http://localhost:2345/products/singleland/${id}${location.search}`)
      .then((res) => {
        console.log(plots, res.data);
        setPlots((prv) => [...res.data]);
        console.log("plots", plots);
      });
  }, [location.search]);

console.log(location.search);

  return (
    <div style={{ display: "flex"}}>
      <PlotFilterSort />{" "}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {plots &&
          plots.map((e, i) => (
            <Stack
              key={e._id}
              style={{
                border: "1px solid grey",
                borderRadius: "5px",
                margin: "5px",
                padding: "5px",
              }}
            >
              <Text>Plot No. {i + 1}</Text>
              <Text>{e.title}</Text>
              {e.road.includes("east") ? <Text>East Road 🛣️</Text> : ""}
              {e.road.includes("west") ? <Text>West Road 🛣️</Text> : ""}
              {e.road.includes("north") ? <Text>North Road 🛣️</Text> : ""}
              {e.road.includes("south") ? <Text>South Road 🛣️</Text> : ""}
              <Text>Price {e.price} 💰</Text>
              <Link
                key={e._id}
                to={`/plotdetails/${e._id}`}
                style={{ margin: "5px", textDecoration: "none" }}
              >
                <Button>Check out</Button>
              </Link>
              <Stack
                style={{
                  border: "5px solid grey",
                  margin: "5px",
                  padding: "20px",
                  height: "150px",
                  width: e.length === e.width ? "150px" : "75px",
                  borderRight: e?.road?.includes("east")
                    ? "10px dashed red"
                    : "5px solid blue",
                  borderLeft: e?.road?.includes("west")
                    ? "10px dashed red"
                    : "5px solid blue",
                  borderBottom: e?.road?.includes("south")
                    ? "10px dashed red"
                    : "5px solid blue",
                  borderTop: e?.road?.includes("north")
                    ? "10px dashed red"
                    : "5px solid blue",
                }}
              >
                <Text>
                  {e?.land_id?.facility?.includes("electricity") ? "💡" : ""}
                </Text>
                <Text>
                  {e?.land_id?.facility?.includes("water") ? "💧" : ""}
                </Text>
                <Text>
                  {e?.land_id?.facility?.includes("road") ? "🛣️" : ""}
                </Text>
                <Text>
                  {e?.land_id?.facility?.includes("sewerage") ? "🚽" : ""}
                </Text>
              </Stack>
            </Stack>
          ))}
      </div>
    </div>
  );
};
