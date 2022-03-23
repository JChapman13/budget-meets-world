import "./SavedTripsPage.css";
import React from "react";
import Footer from "../../Components/Footer/Footer";
import TripItem from "../../Components/TripItem/TripItem";

export default function SavedTripsPage(props) {
  return (
    <div className="SavedTripsPage">
      <h1>My Trips</h1>
      <button
        className="SavedTripsPage-add-btn"
        onClick={() => console.log("hello")}
      >
        +
      </button>
      <div className="SavedTripsPage-div">
        {props.trips.map((trip) => (
          <TripItem user={props.user} trip={trip} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
