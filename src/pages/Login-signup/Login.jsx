import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addAuth, getAuth, removeAuth } from "../../store/actions";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleGoogle = () => {
    navigate("http://localhost:2345/auth/google")
  };

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
        dispatch(addAuth(res.data.token));
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
    <>
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
      <button onClick={handleGoogle}>Google Sign in</button>
    </>
  );
};
