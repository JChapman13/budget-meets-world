import "./Hotels.css";
import React from "react";
import Hotel from "../Hotel/Hotel";

export default function Hotels(props) {

  if (props.hotels.length === 0) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    )
  } else {
    return (
      <div className="Hotels">
        {props.hotels.map((hotel) => (
          <Hotel 
            hotel={hotel} 
            openHotelDetail={props.openHotelDetail} 
            saveHotel={props.saveHotel} 
            trip={props.trip}
            hotelPhotos={props.hotelPhotos}
            getHotelPhotos={props.getHotelPhotos}
          />
        ))}
      </div>
    );
  }
}
