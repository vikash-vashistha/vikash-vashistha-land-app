import { useState } from "react";
import axios from "axios";

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    age: "",
    email: "",
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
      .then(() => {
        setFormData({
          email: "",
          password: "",
        });
      })
      .catch(function (e) {
        console.log(e);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Log in</h3>
      <input
        id="email"
        type="email"
        onChange={handleChange}
        placeholder="enter email"
      />
      <input
        id="password"
        type="number"
        onChange={handleChange}
        placeholder="enter password"
      />
      <input type="submit" value={"create user"} />
    </form>
  );
};
