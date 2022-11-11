import { useState } from "react";
import axios from "axios";
import { Plots } from "./PlotsPage";

export const LandDetails = ({ lands }) => {
  const [plots, setPlots] = useState([]);
  // getting plots inside land
  const handleClick2 = (id) => {
    console.log(id);
    axios.get(`http://localhost:2345/products/singleland/${id}`).then((res) => {
      console.log(res.data);
      setPlots((prv) => [...res.data.plots]);
      console.log("plots", plots);
    });
  };
  return (
    <>
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
                  <button>become partner</button>
                </li>
              </ol>
            );
          })}
      </div>

      <Plots plots={plots} />
    </>
  );
};
