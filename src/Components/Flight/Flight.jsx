import "./Flight.css";
import React from "react";

export default function Flight(props) {

console.log(props, 'props')
    return (
        <div className='Flight'>
            <p>Flight</p>
         <div>
             <p>Carrier: {props.carriers[0].Name}</p>
             {/* <p>departure date: {props.flightInfo.OutboundLeg.DepartureDate}</p> */}
             {/* <p>arrival date: {props.flightInfo.InboundLeg.DepartureDate}</p> */}
             <p>departure city: {props.outboundLeg.DepartureDate}</p>
             <p>arrival city: {console.log(props)}</p>
             <p>travel time: {console.log(props)}</p>
             <p>price: ${props.price}</p>
         </div>
        </div>
    )
}
