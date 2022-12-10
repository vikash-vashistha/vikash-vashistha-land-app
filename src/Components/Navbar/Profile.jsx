import { useDispatch, useSelector } from "react-redux";
import { Button, Stack, Text, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getUser } from "../../Redux/user/action";
import axios from "axios";

export const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ user: state.app.user }));
  
  const handleSeller = async () => {
    await axios
      .post(`https://vikash-land-app.onrender.com/request/${user._id}`)
      .then((res) => {
        console.log("res", res);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    dispatch(getUser());
  }, []);
// console.log(user);
  return (
    <Stack
      width="sm"
      style={{
        border: "1px solid grey",
        borderRadius: "5px",
        margin: "5px",
        padding: "5px",
      }}
    >
      <Text>Name - {user?.name}</Text>
      <Text>Email - {user?.email}</Text>
      <Text>Phone - {user?.phone_no}</Text>
      <Text
        style={{
          border: "1px solid grey",
          borderRadius: "5px",
          margin: "5px",
          padding: "5px",
        }}
      >
        Role -{" "}
        {user?.role?.map((el, it) => (
          <Text style={{marginLeft: "50px"}} key={it}>{el}</Text>
        ))}
      </Text>
      <Image src={user?.image} />
      <Button disabled={user?.role?.includes("seller")} onClick={handleSeller}>Request to become Seller</Button>
    </Stack>
  );
};
