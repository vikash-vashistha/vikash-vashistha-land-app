import { Button, Stack, Text } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { PlotFilterSort } from "../ProductPage/PlotFilterSort";

const token = localStorage.getItem("token");

export const Cart = () => {
  const { id } = useParams();
  const [total, setTotal] = useState(0)
  const [plots, setPlots] = useState([]);
  // getting plots inside land

const location = useLocation();

  useEffect(() => {
    axios
      .get(`http://localhost:2345/cart/${id}${location.search}`,{
         headers: { authorization: `Bearer ${token}` },
       })
      .then((res) => {
        console.log(plots, res.data);
        setPlots((prv) => [...res.data]);
        console.log("plots", plots);
      });
  }, [location.search]);

console.log(location.search);


return (
  <div style={{ display: "flex" }}>
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
            <Text>{e?.plot_id?.title}</Text>
            {e?.plot_id?.road?.includes("east") ? (
              <Text>East Road 🛣️</Text>
            ) : (
              ""
            )}
            {e?.plot_id?.road?.includes("west") ? (
              <Text>West Road 🛣️</Text>
            ) : (
              ""
            )}
            {e?.plot_id?.road?.includes("north") ? (
              <Text>North Road 🛣️</Text>
            ) : (
              ""
            )}
            {e?.plot_id?.road?.includes("south") ? (
              <Text>South Road 🛣️</Text>
            ) : (
              ""
            )}
            <Text>Price {e?.plot_id?.price} 💰</Text>
            
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
                  e?.plot_id.length === e?.plot_id.width ? "150px" : "75px",
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
                {e?.land_id?.facility?.includes("electricity") ? "💡" : ""}
              </Text>
              <Text>{e?.land_id?.facility?.includes("water") ? "💧" : ""}</Text>
              <Text>{e?.land_id?.facility?.includes("road") ? "🛣️" : ""}</Text>
              <Text>
                {e?.land_id?.facility?.includes("sewerage") ? "🚽" : ""}
              </Text>
            </Stack>
          </Stack>
        ))}
    </div>
    <Text>Totoal Amount </Text>
    <Button>Place Order</Button>
  </div>
);
}