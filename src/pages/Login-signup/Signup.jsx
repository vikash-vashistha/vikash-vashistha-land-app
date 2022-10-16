import { useState } from "react";
import axios from "axios";

export const Signup = () => {
  const date = new Date().toDateString();
  const [formData, setFormData] = useState({
    id: Math.random(),
    date,
    name: "",
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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e, formData);
    axios
      .post("http://localhost:8080/user", formData)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        console.log("res", res);
      })
      .catch(function (e) {
        console.log("error", e);
      })
      .then(() => {
        alert("user created successfully");
        setFormData({
          id: Math.random(),
          date,
          name: "",
          email: "",
          password: "",
          phone_no: "",
        });
      });
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
