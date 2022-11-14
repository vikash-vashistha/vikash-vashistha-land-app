import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

export const Plots = () => {
  const { id } = useParams();
  const [plots, setPlots] = useState([]);
  // getting plots inside land

  useEffect(() => {
    axios.get(`http://localhost:2345/products/singleland/${id}`).then((res) => {
      console.log(res.data);
      setPlots((prv) => [...res.data.plots]);
      console.log("plots", plots);
    });
  }, []);
  return (
    <>
      <div>
        {plots.map((e, i) => (
          <Link
            to={`/products/plotdetails/${e}`}
            style={{ margin: "5px", textDecoration: "none" }}
          >
            {e}
          </Link>
        ))}
      </div>
    </>
  );
};
