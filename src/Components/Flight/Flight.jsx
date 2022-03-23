import "./Flight.css";
import React from "react";

export default function Flight(props) {
  return (
    <div className="Flight">
      <p>Flight</p>
      <div>
        <p>
          carrier
          {props.flightInfo}
        </p>
        <p>departure time</p>
        <p>arrival time</p>
        <p>departure city</p>
        <p>arrival city</p>
        <p>travel time</p>
        <p>price</p>
      </div>
    </div>
  );
}
