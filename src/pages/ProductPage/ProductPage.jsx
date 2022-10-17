import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const ProductsPage = () => {
  const { auth } = useSelector((state) => ({ auth: state.token }));
  const [text, setText] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, [text]);
  
// getting locations
  const getData = () => {
    axios
      .get(`http://localhost:2345/products/locations?city=${text}`)
      .then((res) => setData([...res.data]));
  };

  return (
    <>
      <div>
        <input onChange={(e) => setText(e.target.value)} />
        <button>search</button>
      </div>
      <div>
        {data &&
          data.map((e) => (
            <button
              style={{ margin: "5px", textDecoration: "none" }}
              key={e._id}
            >
              <Link
                to={`/products/scheme/${e.city}`}
                style={{ margin: "5px", textDecoration: "none" }}
              >
                <span>{e.city}</span>
                <span> (</span>
                <span>{e.state}</span> <span>)</span>
              </Link>
            </button>
          ))}
      </div>
    </>
  );
};
