import "./HotelDetailPage.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
export default function HotelDetailPage(props) {
  let navigate = useNavigate();
  async function goBack() {
    navigate("/");
  }

  return (
    <div>
      <button onClick={() => goBack()}>back</button>
      <p>Accomandation Details</p>
      <img
        style={{ width: "300px" }}
        src={props.hotelPhotos}
        alt="Hotel Image"
      />
      <p>Name: {props.oneHotel.propertyDescription.name}</p>
      <p>Address: {props.oneHotel.propertyDescription.address.fullAddress}</p>
      <p>Booking URL: {props.oneHotel.roomsAndRates.bookingUrl}</p>
      <p>Star: {props.oneHotel.propertyDescription.starRating}</p>
      <p>
        Rating:
        {props.oneHotel.guestReviews.brands.rating} <br />
        Number of ratings: {props.oneHotel.guestReviews.brands.total}
      </p>
      <p>Amenities:</p>
      <ul>
        {props.oneHotel.overview.overviewSections[0].content.map((c) => (
          <li>{c}</li>
        ))}
      </ul>
      <p>About:</p>
      <ul>
        {props.oneHotel.overview.overviewSections[1].content.map((c) => (
          <li>{c}</li>
        ))}
      </ul>
      {/* <p>About: {props.oneHotel.overview.overviewSections[2].content.map(c => <li>{c}</li>)}</p> */}
      {/* <p>Price: {props.oneHotel.propertyDescription.featuredPrice.currentPrice.plain}</p> */}
      <p>Room Types:</p>
      <ul>
        {props.oneHotel.propertyDescription.roomTypeNames.map((r) => (
          <li>{r}</li>
        ))}
      </ul>
    </div>
  );
}
