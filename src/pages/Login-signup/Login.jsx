import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addAuth, getAuth, removeAuth } from "../../store/actions";

export const Login = () => {
  const dispatch = useDispatch();
  const isAuth  = useSelector((state) => state.token);
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
      .post("http://localhost:2345/login", formData)
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

   return isAuth ? (
     <Navigate to="/" />
   ) : (
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
       <input type="submit" value={"Log in"} />
     </form>
   );
};
