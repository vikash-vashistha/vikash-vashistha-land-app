import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUser } from "../../Redux/user/action";
import axios from "axios";
import { Avatar, Text, Button, Paper } from "@mantine/core";

// interface UserInfoActionProps {
//   avatar: string;
//   name: string;
//   email: string;
//   job: string;
// }

export const Profile = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => ({ user: state.app.user }));

  const handleSeller = async () => {
    await axios
      .post(`https://vikash-land-app.onrender.com/request/${user._id}`)
      .then((res) => {
        console.log("res", res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    dispatch(getUser({ token }));
  }, []);
  // console.log(user);
  return (
    <Paper
      mt="150px"
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      })}
    >
      <Avatar src={user?.image} size={120} radius={120} mx="auto" />
      <Text align="center" size="lg" weight={500} mt="md">
        {user?.name}
      </Text>
      <Text align="center" color="dimmed" size="sm">
        {user?.email} • {user?.phone_no}
      </Text>
      {user?.role?.map((el, it) => (
        <Text align="center" color="dimmed" size="sm" key={it}>
          {el}
        </Text>
      ))}
      <Button
        variant="default"
        fullWidth
        mt="md"
        disabled={user?.role?.includes("seller")}
        onClick={handleSeller}
      >
        Request to become Seller
      </Button>
    </Paper>
  );
};

// export function UserInfoAction({
//   avatar,
//   name,
//   email,
//   job,
// }: UserInfoActionProps) {
//   return (

//   );
// }
