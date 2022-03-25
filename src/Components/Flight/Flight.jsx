import "./Flight.css";
import React, { useEffect, useState } from "react";

export default function Flight(props) {
  const [carrier, setCarrier] = useState('')
  useEffect(() => {
    const id = props.carriers.map((e) => e.CarrierId)
    const carrierIdx = id.indexOf(props.outboundLeg.CarrierIds[0])
    setCarrier(props.carriers[carrierIdx].Name)
  }, [])

  return (
    <div className="Flight">
      <div>
            <p>{carrier}</p>
            <p>Departure City: {props.places[0].CityName}</p>
            <p>Arrival City: {props.places[1].CityName}</p>
            <p>Departure Airport: {props.places[0].IataCode}</p>
            <p>Destination Airport: {props.places[1].IataCode}</p>
            <p>Arrival City: {props.places[1].CityName}</p>
            <p>Departure Date: {props.outboundLeg.DepartureDate}</p>
            <p>Arrival Date: {props.inboundLeg.DepartureDate}</p>
            <p>Price: ${props.price}</p>
        <button onClick={() => props.saveFlight({
          departureDate: props.outboundLeg.DepartureDate,
          arrivalDate: props.inboundLeg.DepartureDate,
          departureCity: props.places[0].CityName,
          destinationCity: props.places[1].CityName,
          departureAirport: props.places[0].IataCode,
          destinationAirport: props.places[1].IataCode,
          price: props.price
        })}>Save</button>
      </div>
    </div>
  );
}
