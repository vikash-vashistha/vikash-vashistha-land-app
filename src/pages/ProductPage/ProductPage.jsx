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
  Stack,
  Text,
} from "@chakra-ui/react";

import img1 from "../../logo1.png";
import img2 from "../../back_ground.png";
import img3 from "../../items.png";
import img4 from "../../logo3.png";

import { Carouseldiv } from "../../Components/Carouseldiv";
import { LandingScroller } from "../LandingPageScrollers/locationScroller";
import { useEffect } from "react";

// export const styles = {
//   dark: {
//     color: "blue",
//     background: "pink",
//     margin: "5px",
//   },
//   light: {
//     color: "pink",
//     background: "blue",
//     margin: "5px",
//   },
// };

export const ProductsPage = () => {
  
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setTimeout(() => {
     onOpen()
   }, 2000)
  }, [])

  return (
    <Stack mt={[150, 10, 10]}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <i>
              <Text fontSize="xxxl">VLA</Text>
            </i>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="xl">(Vikash Land App)</Text>
            <Text fontSize="xl">
              For testing purposes, only Jaipur city data is available. You can
              use the search bar or choose from the list of popular cities
              below. 
            </Text>
            <Text fontSize="sm">
              I created the entire project by focusing more on the functionality
              than the UI. I have created the customer, seller, and admin sides
              of the website. On this website, customers can purchase plots,
              become partners in a land, request to become sellers, and chat
              with the landowners. seller can register new land. Administrators
              can control all fields.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Carouseldiv img1={img1} img2={img2} img3={img3} img4={img4} />
      <LandingScroller />
    </Stack>
  );
};
