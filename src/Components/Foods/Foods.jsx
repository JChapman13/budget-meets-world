import "./Foods.css";
import React, { useState, useEffect } from "react";
import Food from "../Food/Food";
const axios = require("axios").default;

export default function Foods(props) {
  return (
      props.restaurants ? 
        <div className="Foods">
          {props.restaurants.map((item, idx) => {
            return (
              <Food
                key={item.name + idx}
                restaurant={item}
                getRestaurants={props.getRestaurants}
                getRestaurantDetail={props.getRestaurantDetail}
                saveRestaurant={props.saveRestaurant}
              />
            );
          })}
        </div>
      : 
        <p>No Restaurant</p>
  );
}
