import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";


export const Scheme = () => {
  const { id } = useParams();

  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  // getting schemes
  const getProducts = () => {
    console.log(id);
    axios.get(`http://localhost:2345/products/scheme/${id}`).then((res) => {
      setSchemes([...res.data]);
      console.log(res.data);
    });
  };

  return (
    <div>
      {schemes &&
        schemes.map((e) => {
          return (
            <ol key={e._id}>
              <li>
                <Link
                  to={`/products/lands/${e.scheme}`}
                  style={{ margin: "5px", textDecoration: "none" }}
                >
                  {e.scheme}
                </Link>
              </li>
            </ol>
          );
        })}
    </div>
  );
};
