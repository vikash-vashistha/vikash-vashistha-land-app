import React, { useState } from 'react';
import styles from './NewLand.module.css';
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
  Checkbox
} from '@chakra-ui/react';

const date = new Date().toDateString();
const initState = {
      date,
      "location": "",
      "scheme": "",
      "price": "",
      "area": "",
      "partners": false,
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
        <Input
          name="location"
          value={formData.name}
          onChange={handleChange}
          placeholder="Location"
        />
        <label>Scheme</label>
        <Input
          name="scheme"
          value={formData.scheme}
          onChange={handleChange}
          placeholder="Scheme"
        />

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
        <Checkbox
          colorScheme="red"
          name="partners"
          type="checkbox"
          value={formData.partenrs}
          onChange={handleChange}
        >
          Partners
        </Checkbox>
        <Input type="submit" />
      </form>
    </div>
  );
};
