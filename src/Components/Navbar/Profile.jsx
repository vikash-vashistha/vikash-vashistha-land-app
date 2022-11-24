import { useDispatch, useSelector } from "react-redux";
import { Button, Stack, Text, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getUser } from "../../Redux/user/action";

export const Profile = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => ({ user: state.app.user }));

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
      <Text>Role - {user?.role}</Text>
      <Image src={user?.image} />
    </Stack>
  );
};
