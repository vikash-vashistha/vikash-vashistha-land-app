import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import logo from "../logo.png"
import back_ground from "../back_ground.png";
import items from "../items.png";
import { Carousel } from 'react-responsive-carousel';
export const Carouseldiv = () => {
    return (
      <div style={{ width: "90%", margin: "auto" }}>
        <Carousel>
          <div>
            <img src={logo} />
            <p className="legend">Logo</p>
          </div>
          <div>
            <img src={back_ground} />
            <p className="legend">Background</p>
          </div>
          <div>
            <img src={items} />
            <p className="legend">Items</p>
          </div>
        </Carousel>
      </div>
    );
        
    }
