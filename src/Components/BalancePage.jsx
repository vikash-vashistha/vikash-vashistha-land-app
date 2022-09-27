import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const BalancePage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch(`http://localhost:3002/products`)
      .then((d) => d.json())
      .then((res) => setData([...res]));
  };

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 35%)",
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
      {data.map((el) => {
        return (
          <div
            key={el.id}
            className="container"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 35%)",
              justifyContent: "space-evenly",
              width: "500px",
              margin: "auto",
              paddingTop: "10px",
            }}
          >
            <div className="name">{el.name}</div>
            <div className="price">{el.price}</div>
            <Link to={`/products/${el.id}`}>more details</Link>
          </div>
        );
      })}
    </>
  );
};
