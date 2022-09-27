import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addAuth, getAuth, removeAuth } from "../store/actions";

export const LoginPage = () => {
   const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      .post("https://reqres.in/api/login", formData)
      .then((res) => {
        console.log(res.data.token);
        localStorage.setItem("token", res.data.token);
        dispatch(addAuth(res.data.token))
      })
      .catch(function (e) {
        console.log(e);
      })
      .then(() => {
        setFormData({
          email: "",
          password: "",
        });
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
        type="text"
        onChange={handleChange}
        placeholder="enter password"
      />
      <input type="submit" value={"create user"} />
    </form>
  );
};
