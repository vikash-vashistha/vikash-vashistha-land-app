import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { LandDetails } from "./LandDetailsPage";

export const SchemeDetailsPage = ({schemes}) => {
  const [lands, setLands] = useState([]);
  // getting lands inside scheme
  const handleClick1 = (el) => {
    // console.log(el)
    axios.get(`http://localhost:2345/products/lands/${el}`).then((res) => {
      setLands([...res.data]);
      //  console.log(res.data);
    });
  };



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
      <LandDetails lands={lands} />
    </>
  );
};
