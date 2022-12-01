import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./NewPlot.module.css";
import { Input, Stack, Checkbox } from "@chakra-ui/react";
import axios from "axios";
let newData;
const date = new Date().toDateString();
const token = localStorage.getItem("token");

export const NewPlot = () => {
  const { id } = useParams();
  const initState = {
    date,
    price: "",
    area: "",
    title: "",
    length: "",
    width: "",
    land_id: id,
    eastroad: false,
    westroad: false,
    northroad: false,
    southroad: false,
  };
  const [formData, setFormData] = useState(initState);
  const handleSubmit = (e) => {
    e.preventDefault();
    let road = [];

    if (formData?.eastroad) road.push("east");
    if (formData?.westroad) road.push("west");
    if (formData?.northroad) road.push("north");
    if (formData?.southroad) road.push("south");
    newData = {
      date: formData.date,
      price: formData.price,
      title: formData.title,
      length: formData.length,
      widht: formData.width,
      area: formData.area,
      land_id: formData.land_id,
      road,
    };
    console.log("form", formData);
    console.log("new", newData);
    axios
      .post("http://localhost:2345/products",newData).then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const valueToUpdate = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: valueToUpdate });

    // console.log(formData);
    // console.log(newData);
  };
  console.log(id);
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
        <label>Title</label>
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="title"
        ></Input>
        <br />
        <label>Length</label>
        <Input
          name="length"
          value={formData.length}
          onChange={handleChange}
          placeholder="length"
        ></Input>
        <br /> <label>Width</label>
        <Input
          name="width"
          value={formData.width}
          onChange={handleChange}
          placeholder="width"
        ></Input>
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
