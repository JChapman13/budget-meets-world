import "./Flight.css";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


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
        <Card sx={{ maxWidth: 345, borderRadius: 5, marginBottom: 5}}>
          <CardMedia />
          <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {carrier}
          </Typography>
          <Typography>
            Departure City: {props.places[0].CityName}
          </Typography>
          <Typography>
            Arrival City: {props.places[1].CityName}
          </Typography>
          <Typography>
            Departure Airport: {props.places[0].IataCode}
          </Typography>
          <Typography>
            Destination Airport: {props.places[1].IataCode}
          </Typography>
          <Typography>
            Arrival City: {props.places[1].CityName}
          </Typography>
          <Typography>
           Departure Date: {props.outboundLeg.DepartureDate}
          </Typography>
           <Typography>
            Arrival Date: {props.inboundLeg.DepartureDate}
           </Typography>
           <Typography>
            Price: ${props.price}
           </Typography>
            
            

          </CardContent>
        <Button onClick={() => props.saveFlight({
          departureDate: props.outboundLeg.DepartureDate,
          arrivalDate: props.inboundLeg.DepartureDate,
          departureCity: props.places[0].CityName,
          destinationCity: props.places[1].CityName,
          departureAirport: props.places[0].IataCode,
          destinationAirport: props.places[1].IataCode,
          price: props.price
        })}>Save</Button>
        </Card>
      </div>
    </div>
  );
}
