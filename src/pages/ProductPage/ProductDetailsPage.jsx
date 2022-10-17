import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const ProductsDetailsPage = () => {
  const { id } = useParams();
  const [schemes, setSchemes] = useState([]);
  const [lands, setLands] = useState([]);
  const [plots, setPlots] = useState([]);

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


  // getting lands inside scheme
  const handleClick1 = (el) => {
    console.log(el)
     axios.get(`http://localhost:2345/products/lands/${el}`).then((res) => {
       setLands([...res.data]);
       console.log(res.data);
     });
  }

  // getting plots inside land
    const handleClick2 = (id) => {
    console.log(id)
     axios
       .get(`http://localhost:2345/products/singleland/${id}`)
       .then((res) => {
         setPlots([...res.data.plots]);
         console.log("plots",plots);
       });
  }

  return (
    <>
      <div>
        {schemes &&
          schemes.map((e) => {
            return (
              <ol key={e._id}>
                <li>
                  <button onClick={() => handleClick1(e.scheme)}>
                    {e.scheme}
                  </button>
                </li>
              </ol>
            );
          })}
      </div>
      <div style={{ marginLeft: "10%" }}>
        {lands &&
          lands.map((e) => {
            return (
              <ol key={e._id}>
                <li>
                  <button onClick={() => handleClick2(e._id)}>
                    no of plots = {e.plots.length}
                  </button>
                  <span style={{ marginLeft: "2%" }}>price = {e.price}</span>
                  <span style={{ marginLeft: "2%" }}>area = {e.area}</span>
                </li>
              </ol>
            );
          })}
      </div>
      <div style={{ marginLeft: "10%" }}>
        {plots &&
          plots.map((e) => {
            return (
              <ol>
                <li>
                  <button >
                    {e}
                  </button>
                </li>
              </ol>
            );
          })}
      </div>
    </>
  );
};
