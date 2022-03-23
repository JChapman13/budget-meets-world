import "./Flights.css";
import React, { useEffect, useState } from "react";
import Flight from "../Flight/Flight";
const axios = require("axios").default;

export default function Flights(props) {
  return (
    <div className="Flights">
      {props.flights.map((f, idx) => {
        return (
          <Flight
            key={f + idx}
            outboundLeg={f.OutboundLeg}
            inboundLeg={f.InboundLeg}
            price={f.MinPrice}
            carriers={carriers}
          />
        );
      })}
    </div>
  );
}
