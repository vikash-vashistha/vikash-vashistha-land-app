import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const SchemeDetailsPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios.get(`http://localhost:2345/products?location=${id}`).then((res) => {
      setProducts([...res.data]);
      console.log(res.data);
    });
  };

  return (
    <>
      {products &&
        products.map((e) => {
          return (
            <div>
              <p>{e.location}</p>
              <p>{e.price}</p>
              <p>{e.scheme}</p>
            </div>
          );
        })}
    </>
  );
};
