import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const ProductsDetailsPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    console.log(id)
    axios.get(`http://localhost:2345/products/scheme/${id}`).then((res) => {
      setProducts([...res.data]);
      console.log(res.data);
    });
  };

  return (
    <>
    {products && products.map((e) => {
      return (
        <div key={e._id}>
          <p>{e.scheme}</p>
        </div>
      );
    })}
    </>
  );
};
