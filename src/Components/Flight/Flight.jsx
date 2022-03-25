import "./Flight.css";
import React, { useEffect, useState } from "react";
import moment from "moment";

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
        <div className="airline-name">
              <p>{carrier}</p>
        </div>
        <div className='Flight-stat'>
            <div className='Flight-stat-star'>
              <p>{props.places[0].CityName} ({props.places[0].IataCode}) - {props.places[1].CityName} ({props.places[1].IataCode})</p>
              <p>Departure Date: {moment(props.outboundLeg.DepartureDate).format('YYYY-MM-DD')}</p>
              <p>Return Date: {moment(props.inboundLeg.DepartureDate).format('YYYY-MM-DD')}</p>
            </div>
            <div className='Flight-stat-price'>
              <p>Price: ${props.price}</p>
            </div>
        </div>
        <div className='Hotel-btn'>
            <button>see more</button>
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
    </div>
  );
}
