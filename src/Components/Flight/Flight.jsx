import "./Flight.css";
import React, { useEffect, useState } from "react";
const axios = require('axios').default;


export default function Flight(props) {
  const [carrier, setCarrier] = useState('')

  console.log(props.carriers, 'carriers')
  useEffect(() => {
    const id = props.carriers.map((e) => e.CarrierId)
    const carrierIdx = id.indexOf(props.outboundLeg.CarrierIds[0])
    setCarrier(props.carriers[carrierIdx].Name)
  }, [])
  // async function saveFlight() {
	// 	axios
	// 		.post('/trip/save/flight', {
	// 			data: {
	// 				country: 'CA',
	// 				currency: 'cad',
	// 				locale: 'en-US',
	// 				originPlace: 'YYZ',
	// 				destinationPlace: 'YVR',
	// 				outboundPartialDate: '2022-04',
	// 				inboundPartialDate: '2022-06',
	// 			},
	// 		})
	// 		.then((result) => {

	// 		})
	// 		.catch((err) => console.log(err, 'flight result error'));
	// }

  return (
    <div className="Flight">
      <p>Flight</p>
      <div>
        <p>Carrier: {carrier}</p>
        <p>Departure City: {props.places[0].CityName}</p>
        <p>Arrival City: {props.places[1].CityName}</p>
        <p>Departure Airport: {props.places[0].IataCode} </p>
        <p>Destination Airport: {props.places[1].IataCode} </p>
        <p>Price: ${props.price}</p>
        {/* <button onClick={() => saveFlight()}>Save</button> */}
      </div>
    </div>
  );
}
