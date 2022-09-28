import React from "react";
import "./newland.css";
import {
  FormControl,
  Input,
  Stack,
  InputLeftElement,
  FormLabel,
  InputRightElement,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  InputLeftAddon,
  Button,
  InputRightAddon,
} from "@chakra-ui/react";

const NewLand = () => {


    const handleSubmit = ()=>{
        
        console.log("here")
    }


  return (
    <div className="newLand">
      <FormControl isRequired>
        <FormLabel>First name</FormLabel>
        <Input placeholder="First name" />
        <FormLabel>Head</FormLabel>
        <Input placeholder="Head" />

        <FormLabel>Received</FormLabel>
        <Input placeholder="Received" />

        <FormLabel>payment</FormLabel>
        <Input placeholder="Payment" />

        <FormLabel>Price</FormLabel>
        <Input placeholder="Price" />

        <FormLabel>Area</FormLabel>
        <Input placeholder="Area" />

        <Stack spacing={2}>
            
          <FormLabel>Amount</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children="$"
            />
            <Input placeholder="Enter amount" />
            <InputRightElement />
          </InputGroup>
        </Stack>
        <Button colorScheme="blue" m={"20px"} onClick={handleSubmit}>
          Button
        </Button>
      </FormControl>
    </div>
  );
};

export default NewLand;
