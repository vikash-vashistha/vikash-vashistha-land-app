import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Stack, Text } from "@chakra-ui/react";

export const BalanceDetail = () => {
  const { id } = useParams();
  const [balanceDetails, setBalanceDetail] = useState({});
  const token = localStorage.getItem("token");
  
  useEffect(() => {
    try {
      axios
        .get(`https://vikash-land-app.onrender.com/transaction/balance/${id}`, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);
          setBalanceDetail({ ...res.data.transaction[0] });
        });
    } catch (e) {
      console.log(e);
    }
  }, []);
  console.log(balanceDetails);
  return (
    <Stack style={{ marginTop: "50px" }}>
      <p>type - {balanceDetails?.type}</p>
      <p>date - {balanceDetails?.date}</p>
      <p>amount - {balanceDetails?.amount}</p>

      <Stack
        width="sm"
        style={{ border: "1px solid grey", borderRadius: "5px" }}
      >
        <Text>from - {balanceDetails?.from?.name}</Text>
        <Text>from(email) - {balanceDetails?.from?.email}</Text>
        <Text>from(phone no.) - {balanceDetails?.from?.phone_no}</Text>
      </Stack>
      <Stack
        width="sm"
        style={{ border: "1px solid grey", borderRadius: "5px" }}
      >
        <Text>to - {balanceDetails?.to?.name}</Text>
        <Text>from(email) - {balanceDetails?.to?.email}</Text>
        <Text>from(phone no.) - {balanceDetails?.to?.phone_no}</Text>
      </Stack>
      <p></p>
      <Stack
        width="sm"
        style={{ border: "1px solid grey", borderRadius: "5px" }}
      >
        <Text>land - {balanceDetails?.land_id?.title}</Text>
        <Text>land - {balanceDetails?.land_id?.location}</Text>
      </Stack>
      <Stack
        width="sm"
        style={{ border: "1px solid grey", borderRadius: "5px" }}
      >
        <Text>plot - {balanceDetails?.plot_id?.title}</Text>
        <Text>land - {balanceDetails?.plot_id?.price}</Text>
      </Stack>
    </Stack>
  );
};
