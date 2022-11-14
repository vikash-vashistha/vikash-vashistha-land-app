import React, { useState } from 'react';
import styles from './NewLand.module.css';
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
const initState = {
      date,
      "location": "",
      "scheme": "",
      "price": "",
      "area": "",
      "partenrs": false,
      "plots": []
}
export const NewLand = () => {
  const [formData, setFormData] = useState(initState)
  const handleSubmit = (e) => {
e.preventDefault()
    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const valueToUpdate = type === "checkbox" ? checked : value;
    setFormData({...formData, [name]: valueToUpdate})
  }

  return (
    <div className={styles.temp}>
      <form onSubmit={handleSubmit}>
        <label>Location</label>
        <input
          name="location"
          value={formData.name}
          onChange={handleChange}
          placeholder="Location"
        />
        <label>Scheme</label>
        <input
          name="scheme"
          value={formData.scheme}
          onChange={handleChange}
          placeholder="Scheme"
        />

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
        <input type="submit" style={{backgroundColor: "blue", color: "white"}} m={"20px"}/>
      </form>
    </div>
  );
};
