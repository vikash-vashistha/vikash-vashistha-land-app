import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
const token = localStorage.getItem("token");

export const PlotDetails = () => {
  const { id } = useParams();
  const [plotsDetails, setPlotDetails] = useState({});
  const { user } = useSelector((state) => ({ user: state.app.user }));

  useEffect(() => {
    try {
      axios
        .get(`https://vikash-land-app.onrender.com/products/plots/${id}`)
        .then((res) => {
          // console.log("vik",res.data);
          setPlotDetails(res.data[0]);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleCart = () => {
    console.log(user._id, id);
     try {
       axios
         .post(
           `https://vikash-land-app.onrender.com/cart`,
           {
             user_id: user._id,
             plot_id: id,
             land_id: plotsDetails?.land_id,
           },
           {
             headers: { authorization: `Bearer ${token}` },
           }
         )
         .then((res) => {
           console.log("vik", res);
         });
     } catch (e) {
       console.log(e);
     }
  }
  // console.log(plotsDetails);
  return (
    <div style={{ margin: "auto", display: "flex" }}>
      <Stack
        width="sm"
        style={{
          border: "1px solid grey",
          borderRadius: "5px",
          margin: "5px",
          padding: "5px",
        }}
      >
        <Stack
          style={{
            border: "1px solid grey",
            borderRadius: "5px",
            margin: "5px",
            padding: "5px",
          }}
        >
          <Text>
            eastroad -{" "}
            {plotsDetails?.road?.includes("east")
              ? "available"
              : "not available"}
          </Text>
          <Text>
            westroad -{" "}
            {plotsDetails?.road?.includes("west")
              ? "available"
              : "not available"}
          </Text>
          <Text>
            northroad -{" "}
            {plotsDetails?.road?.includes("north")
              ? "available"
              : "not available"}
          </Text>
          <Text>
            southroad -{" "}
            {plotsDetails?.road?.includes("south")
              ? "available"
              : "not available"}
          </Text>
          <Text>price - {plotsDetails?.price} per sq ft</Text>
        </Stack>
        <Stack
          style={{
            border: "1px solid grey",
            borderRadius: "5px",
            margin: "5px",
            padding: "5px",
          }}
        >
          <h3>Land details</h3>
          <Text>rate = {plotsDetails?.land_id?.price} rs/sq. ft.</Text>
          <Text>area = {plotsDetails?.land_id?.area} sq. ft.</Text>
          <Flex>
            <Text>
              {plotsDetails?.land_id?.facility &&
              plotsDetails?.land_id?.facility.includes("electricity")
                ? "💡"
                : ""}
            </Text>
            <Text>
              {plotsDetails?.land_id?.facility &&
              plotsDetails?.land_id?.facility.includes("water")
                ? "💧"
                : ""}
            </Text>
            <Text>
              {plotsDetails?.land_id?.facility &&
              plotsDetails?.land_id?.facility.includes("road")
                ? "🛣️"
                : ""}
            </Text>
            <Text>
              {plotsDetails?.land_id?.facility &&
              plotsDetails?.land_id?.facility.includes("sewerage")
                ? "🚽"
                : ""}
            </Text>
          </Flex>
        </Stack>
        <Stack
          style={{
            border: "1px solid grey",
            borderRadius: "5px",
            margin: "5px",
            padding: "5px",
          }}
        >
          <h3>User details</h3>
          <Text>sold to {plotsDetails?.user_id?.name}</Text>
          <Text>phone no {plotsDetails?.user_id?.phone_no}</Text>
        </Stack>
      </Stack>
      <Stack
        style={{
          border: "5px solid grey",
          margin: "5px",
          padding: "20px",
          height: "150px",
          backgroundColor: plotsDetails?.user_id?.phone_no ? "grey" : "lightGreen",
          width: plotsDetails.length === plotsDetails.width ? "150px" : "75px",
          borderRight: plotsDetails?.road?.includes("east")
            ? "10px dashed black"
            : "5px solid blue",
          borderLeft: plotsDetails?.road?.includes("west")
            ? "10px dashed black"
            : "5px solid blue",
          borderBottom: plotsDetails?.road?.includes("south")
            ? "10px dashed black"
            : "5px solid blue",
          borderTop: plotsDetails?.road?.includes("north")
            ? "10px dashed black"
            : "5px solid blue",
        }}
      >
        <Text>
          {plotsDetails?.land_id?.facility.includes("electricity") ? "💡" : ""}
        </Text>
        <Text>
          {plotsDetails?.land_id?.facility.includes("water") ? "💧" : ""}
        </Text>
        <Text>
          {plotsDetails?.land_id?.facility.includes("road") ? "🛣️" : ""}
        </Text>
        <Text>
          {plotsDetails?.land_id?.facility.includes("sewerage") ? "🚽" : ""}
        </Text>
        </Stack>
        <Button onClick={handleCart}>Add to Cart</Button>
    </div>
  );
};
