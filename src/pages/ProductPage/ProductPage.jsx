

import img1 from "../../logo1.png";
import img2 from "../../back_ground.png";
import img3 from "../../items.png";
import img4 from "../../logo3.png";


import { Carouseldiv } from "../../Components/Carouseldiv";
import { LandingScroller } from "../LandingPageScrollers/locationScroller";

// export const styles = {
//   dark: {
//     color: "blue",
//     background: "pink",
//     margin: "5px",
//   },
//   light: {
//     color: "pink",
//     background: "blue",
//     margin: "5px",
//   },
// };

export const ProductsPage = () => {
 

  return (
    <div style={{ marginTop: "50px" }}>

      <Carouseldiv img1={img1} img2={img2} img3={img3} img4={img4} />
      <LandingScroller />
    </div>
  );
};
