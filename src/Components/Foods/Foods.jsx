import "./Foods.css";
import React, { useState, useEffect } from "react";
import Food from "../Food/Food";
import axios from "axios";
export default function Foods(props) {
  console.log(props);
  return (
    <div className="Foods">
      {props.restaurants.map((item, idx) => {
        return (
          <Food
            key={item.name + idx}
            restaurant={item}
            getRestaurants={props.getRestaurants}
            getRestaurantDetail={props.getRestaurantDetail}
          />
        );
      })}
    </div>
  );
}
