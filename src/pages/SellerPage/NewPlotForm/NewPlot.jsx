import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./NewPlot.module.css";
// import {
//   FormControl,
//   Input,
//   Stack,
//   InputLeftElement,
//   FormLabel,
//   InputRightElement,
//   FormErrorMessage,
//   FormHelperText,
//   InputGroup,
//   InputLeftAddon,
//   Button,
//   InputRightAddon,
// } from '@chakra-ui/react';

const date = new Date().toDateString();
export const NewPlot = () => {
  const { id } = useParams();
  const initState = {
    date,
    price: "",
    area: "",
    land_id: id,
    partenrs: false,
    eastroad: false,
    westroad: false,
    northroad: false,
    southroad: false,
  };
  const [formData, setFormData] = useState(initState);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const valueToUpdate = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: valueToUpdate });
  };

  return (
    <div className={styles.temp}>
      <form onSubmit={handleSubmit}>
        <label>Area</label>
        <input
          name="area"
          value={formData.area}
          onChange={handleChange}
          placeholder="Area"
        />

        <label>Price</label>
        <input
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
        />

        <label>Partners</label>
        <input
          name="partners"
          type="checkbox"
          value={formData.partenrs}
          onChange={handleChange}
          placeholder="Partners"
        />
        <label>East road</label>
        <input
          name="eastroad"
          type="checkbox"
          value={formData.eastroad}
          onChange={handleChange}
          placeholder="East Road"
        />
        <label>West Road</label>
        <input
          name="westroad"
          type="checkbox"
          value={formData.westroad}
          onChange={handleChange}
          placeholder="West Road"
        />
        <label>North Road</label>
        <input
          name="northroad"
          type="checkbox"
          value={formData.northroad}
          onChange={handleChange}
          placeholder="North Road"
        />
        <label>South Road</label>
        <input
          name="southroad"
          type="checkbox"
          value={formData.southroad}
          onChange={handleChange}
          placeholder="South Road"
        />
        <input
          type="submit"
          style={{ backgroundColor: "blue", color: "white" }}
          m={"20px"}
        />
      </form>
    </div>
  );
};
