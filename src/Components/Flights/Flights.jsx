import "./Flights.css";
import React, { useEffect, useState } from "react";
import Flight from "../Flight/Flight";


export default function Flights(props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (props.flights.length !== 0) {
      setIsLoading(false);
    }
  }, [props.flights]);

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <div className="Flights">
        {console.log(props.flights)}
      {props.flights.map((f, idx) => {
        return (
          <Flight
            key={f + idx}
            outboundLeg={f.OutboundLeg}
            inboundLeg={f.InboundLeg}
            price={f.MinPrice}
            carriers={props.carriers}
          />
        );
      })}
    </div>
  );
}
