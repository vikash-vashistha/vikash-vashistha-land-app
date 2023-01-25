import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modell } from "./Modell";
import { RiDeleteBin5Line } from "react-icons/ri";
import {
  critical_action_delete,
  low_action_delete,
  major_action_delete,
  medium_action_delete,
} from "../../Redux/Bug/action";
import { DragAndDrop } from "./DragAndDrop";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { critical, major, medium, low } = useSelector((state) => state.bug);
  console.log(critical);
  const handleDelete = (a, i) => {
    if (a == "critical") dispatch(critical_action_delete(i));
    if (a == "major") dispatch(major_action_delete(i));
    if (a == "medium") dispatch(medium_action_delete(i));
    if (a == "low") dispatch(low_action_delete(i));
  };
  return (
    <>
      <Stack justify="center" align="center">
        <Heading size="xl">Task Manager</Heading>
        <HStack p={5} gap={1} h="360px">
          <Stack h="100%">
            <Modell id="critical" />
            <Heading
              size="sm"
              as="button"
              borderRadius="md"
              bg="#f65251"
              color="white"
              px={4}
              h={8}
              justify="space-between"
              align="center"
            >
              Critical Severity
            </Heading>
            <Stack>
              <Spacer />
              {critical &&
                critical.map((e, i) => {
                  return (
                    <Flex key={i}
                      as="button"
                      borderRadius="md"
                      bg="tomato"
                      color="white"
                      px={4}
                      h={8}
                      justify="space-between"
                      align="center"
                    >
                      <Text key={i}>{e.content}</Text>
                      <RiDeleteBin5Line
                        onClick={() => handleDelete("critical", i)}
                      />
                    </Flex>
                  );
                })}
            </Stack>
          </Stack>
          <Stack h="100%">
            <Modell id="major" />
            <Heading
              size="sm"
              as="button"
              borderRadius="md"
              bg="#f4b452"
              color="white"
              px={4}
              h={8}
              justify="space-between"
              align="center"
            >
              Major Severity
            </Heading>
            <Stack>
              <Spacer />
              {major &&
                major.map((e, i) => {
                  return (
                    <Flex
                      key={i}
                      as="button"
                      borderRadius="md"
                      bg="#e1ad26"
                      color="white"
                      px={4}
                      h={8}
                      justify="space-between"
                      align="center"
                    >
                      <Text key={i}>{e.content}</Text>
                      <RiDeleteBin5Line
                        onClick={() => handleDelete("major", i)}
                      />
                    </Flex>
                  );
                })}
            </Stack>
          </Stack>
          <Stack h="100%">
            <Modell id="medium" />
            <Heading
              size="sm"
              as="button"
              borderRadius="md"
              bg="#5f55d0"
              color="white"
              px={4}
              h={8}
              justify="space-between"
              align="center"
            >
              Medium Severity
            </Heading>
            <Stack>
              <Spacer />
              {medium &&
                medium.map((e, i) => {
                  return (
                    <Flex
                      key={i}
                      as="button"
                      borderRadius="md"
                      bg="#3956bc"
                      color="white"
                      px={4}
                      h={8}
                      justify="space-between"
                      align="center"
                    >
                      <Text key={i}>{e.content}</Text>
                      <RiDeleteBin5Line
                        onClick={() => handleDelete("medium", i)}
                      />
                    </Flex>
                  );
                })}
            </Stack>
          </Stack>
          <Stack h="100%">
            <Modell id="low" />
            <Heading
              size="sm"
              as="button"
              borderRadius="md"
              bg="#277c53"
              color="white"
              px={4}
              h={8}
              justify="space-between"
              align="center"
            >
              Low Severity
            </Heading>
            <Stack>
              <Spacer />
              {low &&
                low.map((e, i) => {
                  return (
                    <Flex
                      key={i}
                      as="button"
                      borderRadius="md"
                      bg="#44700f"
                      color="white"
                      px={4}
                      h={8}
                      justify="space-between"
                      align="center"
                    >
                      <Text key={i}>{e.content}</Text>
                      <RiDeleteBin5Line
                        onClick={() => handleDelete("low", i)}
                      />
                    </Flex>
                  );
                })}
            </Stack>
          </Stack>
        </HStack>
      </Stack>
    </>
  );
};
