import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { critical_action, low_action, major_action, medium_action } from "../../Redux/Bug/action";

export const Modell = ({ id }) => {
  const dispatch = useDispatch();
  const {critical, medium, major, low} = useSelector((state) => state.bug);
  const [edit, setEdit] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleEdit = () => {
    if (edit.length == 0) {
      alert("Please report a bug");
    }

    if (critical?.length < 5 && id == "critical" && edit.length > 0) {
      // console.log(id, edit);
      dispatch(critical_action({id: `item-${5 + 0}-${new Date().getTime()}`, content: edit}));
      setEdit("")
    }
    if (medium?.length < 5 && id == "medium"  && edit.length > 0) {
      // console.log(id, edit);
      dispatch(
        medium_action({
          id: `item-${5 + 0}-${new Date().getTime()}`,
          content: edit,
        })
      );
      setEdit("");
    }
    if (major?.length < 5 && id == "major"  && edit.length > 0) {
      // console.log(id, edit);
      dispatch(
        major_action({
          id: `item-${5 + 0}-${new Date().getTime()}`,
          content: edit,
        })
      );
      setEdit("");
    }
    if (low?.length < 5 && id == "low" && edit.length > 0) {
      // console.log(id, edit);
      dispatch(
        low_action({
          id: `item-${5 + 0}-${new Date().getTime()}`,
          content: edit,
        })
      );
      setEdit("");
    }
  };
console.log(critical);
  return (
    <Stack w="200px">
      <Button w="60px" ml="139px" fontSize="10px" onClick={onOpen} colorScheme="blue">
        <i>Add Task</i>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <i>Report Bug</i>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input onChange={(e) => setEdit(e.target.value)} value={edit} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={() => handleEdit()}>
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};
