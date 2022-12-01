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
  Checkbox,
  Select
} from '@chakra-ui/react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const date = new Date().toDateString();
export const NewLand = () => {
  const { id } = useParams();
  const initState = {
        date,
        "location": "",
        "scheme": id,
        "price": "",
        "area": "",
    "title": "",
        "status": false,
        "facility": []
  }
  const { user } = useSelector((state) => ({ user: state.app.user }));
  const [formData, setFormData] = useState(initState);
  const [facility, setFacility] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData);
    let newData = { ...formData, partners: [user._id] }
    console.log(newData);
    axios
      .post("http://localhost:2345/land", newData)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const valueToUpdate = type === "checkbox" ? checked : value;
    setFormData({...formData, [name]: valueToUpdate, facility})
  }

  const handleFacility = (e) => {
    const { value} = e.target;
    setFacility([ ...facility, value ]);
  }
console.log(formData);
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
        <Select
          name="facility"
          onChange={handleFacility}
          placeholder="Facility"
        >
          <option value="electricity">electricity</option>
          <option value="water">water</option>
          <option value="road">road</option>
          <option value="sewerage">sewerage</option>
        </Select>
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <Checkbox
          colorScheme="red"
          name="partners"
          type="checkbox"
          value={formData.status}
          onChange={handleChange}
        >
          Partners
        </Checkbox>
        <Input type="submit" />
      </form>
    </div>
  );
};
