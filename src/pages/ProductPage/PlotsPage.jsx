import { useState } from "react";
import axios from "axios";
import { PlotDetails } from "./PlotDetailsPage";

export const Plots = ({ plots }) => {
  const [plotsDetails, setPlotDetail] = useState([]);
  const handleClick3 = (id) => {
    console.log(id);
    try {
      axios.get(`http://localhost:2345/products/plots/${id}`).then((res) => {
      console.log(res.data);
        setPlotDetail([...res.data]);
        
    });
    } catch (e) {
      console.log(e)
    }
  };
  return (
    <div>
      {plots.map((e, i) => <button style={{marginLeft: "50%"}} key={i} onClick={() => handleClick3(e)}>{ e}</button>)}
      <PlotDetails plotsDetails={plotsDetails} />
    </div>
  );
};
