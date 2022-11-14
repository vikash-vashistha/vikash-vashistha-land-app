import { useState } from "react";
import axios from "axios";

export const Signup = () => {
  const date = new Date().toDateString();
  const [formData, setFormData] = useState({
    id: Math.random(),
    date,
    name: "",
    role: ["coustomer"],
    email: "",
    password: "",
    phone_no: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(e, formData);
    try {
      await axios
      .post("http://localhost:2345/register", formData)
      .then((res) => {
        console.log("res", res);
      })
      .then(() => {
        alert("user created successfully, Please Sign In");
        // setFormData({
        //   id: Math.random(),
        //   date,
        //   name: "",
        //   email: "",
        //   password: "",
        //   phone_no: "",
        // });
      });
    }catch(e) {
        console.log("error", e);
      }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Sigh up</h3>
      <input
        id="name"
        type="text"
        onChange={handleChange}
        placeholder="enter username"
      />
      <input
        id="email"
        type="text"
        onChange={handleChange}
        placeholder="enter email"
      />
      <input
        id="password"
        type="text"
        onChange={handleChange}
        placeholder="enter password"
      />
      <input
        id="phone_no"
        type="number"
        onChange={handleChange}
        placeholder="enter phone_no"
      />
      <input type="submit" value={"create user"} />
    </form>
  );
};
