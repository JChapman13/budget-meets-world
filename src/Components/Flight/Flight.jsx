import "./Flight.css";
import React from "react";

export default function Flight(props) {
    console.log(props.places, 'places')
  return (
    <div className="Flight">
      <p>Flight</p>
      <div>
        {/* <p>Carrier: {props.carriers[0].Name}</p>
        <p>Departure City: {props.places[0].CityName}</p>
        <p>Arrival City: {props.places[1].CityName}</p>
        <p>Departure Airport: {props.places[0].IataCode} </p>
        <p>Destination Airport: {props.places[1].IataCode} </p>
        <p>Price: ${props.price}</p> */}
      </div>
    </div>
  );
}
