import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const BalanceDetailsPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState({});

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios.get(`http://localhost:3002/products/${id}`).then((res) => {
      setProducts(res.data);
      console.log(res.data);
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          paddingTop: "50px",
          justifyContent: "center",
          textAlign: "left",
        }}
      >
        <img src={""} alt="" />
        <div className="productDetails" style={{ padding: "20px" }}>
          <div>
            <h2>{products.id}</h2>
            <h2>{products.name}</h2>
            <h5>Price : {products.price}</h5>
          </div>
          <h5>Specifications : {products.name}</h5>
          <div style={{ width: "700px", paddingLeft: "30px" }}>
            {/* Show Product specification here */}
          </div>
        </div>
      </div>
    </>
  );
};
