import "./Flight.css";
import React, { useEffect, useState } from "react";


export default function Flight(props) {
  const [carrier, setCarrier] = useState('')

  console.log(props.carriers, 'carriers')
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
        <p>Price: ${props.price}</p> */}
      </div>
    </div>
  );
}
