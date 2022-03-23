import "./Food.css";
import React from "react";

export default function Food(props) {
  return (
    <div className="Food">
      <div className="rest-name"> {props.restaurants.name}</div>
      <div className="rest-rating"> {props.restaurants.rating}</div>
      <div className="rest-address">
        {props.restaurants.location.display_address[0]}
      </div>
      <div className="rest-city">{props.restaurants.location.city}</div>
      <div className="rest-cat">
        {props.restaurants && props.restaurants.categories[0].title}
      </div>
    </div>
  );
}
