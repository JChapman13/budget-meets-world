import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Food.css";

function Food(props) {
  return (
    <div className="restaurant">
      <div
        style={{ backgroundImage: `url(${props.restaurant.image_url})` }}
        className="restaurant-image"
      ></div>
      <div className="restaurant-name">
        <p>{props.restaurant.name}</p>
        <p>
          <img src={require("../../Images/pin-black.svg")} alt="svg icon" />
          {props.restaurant.location.display_address[0]}
        </p>
      </div>
      <div className="restaurant-stat">
        <div className="restaurant-stat-star">
          <p>{props.restaurant && props.restaurant.categories[0].title}</p>
          <p>
            <span>{props.restaurant.rating} rating</span>
          </p>
          <p className="restaurant-stat-review">
            {props.restaurant.review_count} reviews
          </p>
        </div>
        <div className="restaurant-stat-price">
          <p>{props.restaurant.price}</p>
        </div>
      </div>
      <div className="restaurant-btn">
        <button onClick={() => props.getRestaurantDetail(props.restaurant.id)}>
          View Details
        </button>
        <button onClick={() => props.saveRestaurant(props.restaurant.id)}>
          Add to Trip
        </button>
      </div>
    </div>
  );
}

export default Food;
