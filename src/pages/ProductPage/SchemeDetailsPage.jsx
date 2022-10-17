import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const BalanceDetailsPage = () => {
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
              "L1" date : "" location : "jaipur" scheme : "s1" price : 500 area
              : 1200 partenrs : Array plots : Array
              <p>{e.location}</p>
              <p>{e.price}</p>
              <p>{e.scheme}</p>
            </div>
          );
        })}
    </>
  );
};
