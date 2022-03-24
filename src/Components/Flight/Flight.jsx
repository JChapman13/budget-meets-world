import "./Flight.css";
import React, { useEffect, useState } from "react";
const axios = require('axios').default;


export default function Flight(props) {
  const [carrier, setCarrier] = useState('')
  useEffect(() => {
    const id = props.carriers.map((e) => e.CarrierId)
    const carrierIdx = id.indexOf(props.outboundLeg.CarrierIds[0])
    setCarrier(props.carriers[carrierIdx].Name)
  }, [])
  return (
    <div className="Flight">

      <p>Flight</p>
      <div>
        <p>Carrier: {carrier}</p>
        <p>Departure City: {props.places[0].CityName}</p>
        <p>Arrival City: {props.places[1].CityName}</p>
        <p>Departure Airport: {props.places[0].IataCode} </p>
        <p>Destination Airport: {props.places[1].IataCode} </p>
        <p>Departure Date: {props.outboundLeg.DepartureDate} </p>
        <p>Arrival Date: {props.inboundLeg.DepartureDate} </p>

        <p>Price: ${props.price}</p>
        <button onClick={() => props.saveFlight({
          departureDate: props.outboundLeg.DepartureDate,
          arrivalDate: props.inboundLeg.DepartureDate,
          departureId: props.places[0].PlaceId,
          destinationId: props.places[1].PlaceId,
          departureAirport: props.places[0].IataCode,
          destinationAirport: props.places[1].IataCode,
        })}>Save</button>
      </div>
    </div>
  );
}
