import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./NewPlot.module.css";
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
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";
import axios from "axios";

const date = new Date().toDateString();
export const NewPlot = () => {
  const { id } = useParams();
  const initState = {
    date,
    price: "",
    area: "",
    land_id: id,
    partners: false,
    eastroad: false,
    westroad: false,
    northroad: false,
    southroad: false,
  };
  const [formData, setFormData] = useState(initState);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios.post("http://localhost/land")
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const valueToUpdate = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: valueToUpdate });
  };

  return (
    <Stack className={styles.temp}>
      <form onSubmit={handleSubmit}>
        <label>Area</label>
        <Input
          name="area"
          value={formData.area}
          onChange={handleChange}
          placeholder="Area"
        />

        <label>Price</label>
        <Input
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
        />

        <label>Partners</label>
        <Checkbox
          colorScheme="red"
          name="partners"
          type="checkbox"
          value={formData.partenrs}
          onChange={handleChange}
        ></Checkbox>
        <br />
        <label>East road</label>
        <Checkbox
          colorScheme="red"
          name="eastroad"
          type="checkbox"
          value={formData.eastroad}
          onChange={handleChange}
        ></Checkbox>
        <br />
        <label>West Road</label>
        <Checkbox
          colorScheme="red"
          name="westroad"
          type="checkbox"
          value={formData.westroad}
          onChange={handleChange}
        ></Checkbox>
        <br />
        <label>North Road</label>
        <Checkbox
          colorScheme="red"
          name="northroad"
          type="checkbox"
          value={formData.northroad}
          onChange={handleChange}
        ></Checkbox>
        <br />
        <label>South Road</label>
        <Checkbox
          colorScheme="red"
          name="southroad"
          type="checkbox"
          value={formData.southroad}
          onChange={handleChange}
        ></Checkbox>
        <br />
        <Input type="submit" />
      </form>
    </Stack>
  );
};
