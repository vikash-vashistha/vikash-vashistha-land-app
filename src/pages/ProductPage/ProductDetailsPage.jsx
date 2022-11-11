import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SchemeDetailsPage } from "./SchemeDetailsPage";

export const ProductsDetailsPage = () => {
  const { id } = useParams();
  
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

// getting schemes
  const getProducts = () => {
    console.log(id)
    axios.get(`http://localhost:2345/products/scheme/${id}`).then((res) => {
      setSchemes([...res.data]);
      console.log(res.data);
    });
  };

  return (
      <SchemeDetailsPage schemes={schemes} />
  );
};
