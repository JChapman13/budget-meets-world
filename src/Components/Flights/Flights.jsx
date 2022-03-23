import "./Flights.css";
import React, { useEffect, useState } from "react";
import Flight from "../Flight/Flight";


export default function Flights(props) {
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
    axios.get('/api/flights', {
        params: {
            country: 'CA',
            currency: 'cad',
            locale: 'en-US',
            originPlace: 'YYZ',
            destinationPlace: 'YVR',
            outboundPartialDate: '2022-04-01',
            inboundPartialDate: '2022-04-10'
        }
    })
    .then((result) => {
        console.log(result.data) //dot notation to get specific data
        carriers = result.data.Carriers
        // setFlights(result.data.Quotes)
    })
    .catch((err) => console.log(err, "flight result error")) 
}, [])
  useEffect(() => {
      console.log(props.flights)
    if (props.flights.length !== 0) {
      setIsLoading(false);
    }
  }, [props.flights]);

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <div className="Flights">
      {props.flights.map((f, idx) => {
        return (
          <Flight
            key={f + idx}
            outboundLeg={f.OutboundLeg}
            inboundLeg={f.InboundLeg}
            price={f.MinPrice}
            carriers={props.carriers}
            places={props.places}
          />
        );
      })}
    </div>
  );
}
