import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import styles from "./Carouseldiv.module.css";

import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import { Link } from "react-router-dom";
export const Carouseldiv = (props) => {
  return (
    <div>
      <Carousel className={styles.outer}>
        <div className={styles.inner}>
          <img src={props.img1} className={styles.img} />
          <Link to={props.data ? `scheme/${props?.data[0]?.city}` : "/"}>
            <p className="legend">
              {props.data ? `${props?.data[0]?.city}` : "Logo"}
            </p>
          </Link>
        </div>
        <div className={styles.inner}>
          <img src={props.img2} className={styles.img} />
          <Link to={props.data ? `scheme/${props?.data[1]?.city}` : "Logo"}>
            <p className="legend">
              {props.data ? `${props?.data[1]?.city}` : "Background"}
            </p>
          </Link>
        </div>
        <div className={styles.inner}>
          <img src={props.img3} className={styles.img} />
          <Link to={props.data ? `scheme/${props?.data[2]?.city}` : "Logo"}>
            <p className="legend">
              {props.data ? `${props?.data[2]?.city}` : "Items"}
            </p>
          </Link>
        </div>
        <div className={styles.inner}>
          <img src={props.img4} className={styles.img} />
          <Link to={props.data ? `scheme/${props?.data[3]?.city}` : "Logo"}>
            <p className="legend">
              {props.data ? `${props?.data[3]?.city}` : "Logo"}
            </p>
          </Link>
        </div>
      </Carousel>
    </div>
  );
};
