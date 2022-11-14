import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const token = localStorage.getItem("token");
export const SellerPage = () => {
    const [lands, setLands] = useState([]);
  useEffect(() => {
     axios
       .get(`http://localhost:2345/products/lands`, {
         headers: { authorization: `Bearer ${token}` },
       })
       .then((res) => {
         setLands([...res.data]);
         //  console.log(res.data);
       });
  },[])
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          paddingTop: "175px",
        }}
      >
        <Link to="./newland">register land</Link>
        {lands &&
          lands.map((e) => {
            return (
              <ol key={e._id}>
                <li>
                  <Link to={`/seller/newplot/${e._id}/`}>register plot</Link>
                  <span style={{ marginLeft: "2%" }}>price = {e.price}</span>
                  <span style={{ marginLeft: "2%" }}>area = {e.area}</span>
                  <button>become partner</button>
                </li>
              </ol>
            );
          })}
        
      </div>
    </>
  );
};
