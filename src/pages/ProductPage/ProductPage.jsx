import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const ProductsPage = () => {
  const { auth } = useSelector((state) => ({ auth: state.token }));
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(`http://localhost:2345/products?location=kota`)
      .then((res) => setData([...res.data]));
  };

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 35%)",
          justifyContent: "space-evenly",
          width: "500px",
          margin: "auto",
          paddingTop: "50px",
        }}
      >
        <h4>Serial no.</h4>
        <h4>Particular</h4>
        <h4>Schema</h4>
        <h4>Head</h4>
        <h4>Received</h4>
        <h4>Payment</h4>
      </div>
      {auth &&
        data.map((el) => {
          return (
            <div
              key={el.id}
              className="container"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(8, 35%)",
                justifyContent: "space-evenly",
                width: "500px",
                margin: "auto",
                paddingTop: "10px",
              }}
            >
              <div>{el.id}</div>
              <div>{el.scheme}</div>
              <div>{el.location}</div>
              <div>{el.price}</div>
              <div>{el.area}</div>
              <div>{el.received}</div>
              <div>{el.payment}</div>

              <Link to={`/products/${el.id}`}>more details</Link>
            </div>
          );
        })}
    </>
  );
};