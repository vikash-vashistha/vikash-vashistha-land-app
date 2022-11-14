import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export const PlotDetails = () => {
  const { id } = useParams();
  const [plotsDetails, setPlotDetail] = useState([]);

  useEffect(() => {
    try {
      axios.get(`http://localhost:2345/products/plots/${id}`).then((res) => {
        console.log(res.data);
        setPlotDetail([...res.data]);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <div style={{ marginLeft: "70%" }}>
      {plotsDetails &&
        plotsDetails.map((e) => {
          return (
            <ol key={e._id}>
              <li>
                <p>facing - {e.face}</p>
                <p>road - {e.road}</p>
                <p>water - {e.water}</p>
                <p>electricity - {e.electricity}</p>
                <p>rate - {e.price} per sq ft</p>
              </li>
            </ol>
          );
        })}
    </div>
  );
};
