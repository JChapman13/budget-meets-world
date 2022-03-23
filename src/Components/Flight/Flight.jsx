import "./Flight.css";
import React from "react";

export default function Flight(props) {
  return (
    <div className="Flight">
      <p>Flight</p>
      <div>
        <p>Carrier: {props.carriers[0].Name}</p>
        <p>departure city: {props.outboundLeg.DestinationId}</p>
        <p>arrival city: {props.inboundLeg.DestinationId}</p>
        <p>travel time:</p>
        <p>price: ${props.price}</p>
      </div>
    </div>
  );
}
