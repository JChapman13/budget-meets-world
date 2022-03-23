import "./Foods.css";
import React, { useState, useEffect } from "react";
import Food from "../Food/Food";
import axios from "axios";
export default function Foods(props) {
  return (
    <div className="Foods">
      {props.restaurants.map((item, idx) => {
        return <Food key={item + idx} restaurant={item} />;
      })}
    </div>
  );
}
