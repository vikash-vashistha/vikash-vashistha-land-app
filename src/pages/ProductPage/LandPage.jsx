import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


export const Land = () => {
  const { id } = useParams();
  const [lands, setLands] = useState([]);
  // getting lands inside scheme
  useEffect(() => {
    axios.get(`http://localhost:2345/products/alllands/${id}`).then((res) => {
      setLands([...res.data]);
       console.log(res.data);
    });
  }, []);

  return (
    <>
      <div style={{ marginLeft: "10%" }}>
        {lands &&
          lands.map((e) => {
            return (
              <ol key={e._id}>
                <li>
                  <Link
                    to={`/products/singleland/${e._id}`}
                    style={{ margin: "5px", textDecoration: "none" }}
                  >
                    no of plots
                  </Link>
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
