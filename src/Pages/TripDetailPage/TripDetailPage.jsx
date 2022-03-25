import "./TripDetailPage.css";
import moment from "moment";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Hotels from "../../Components/Hotels/Hotels";
import Foods from "../../Components/Foods/Foods";
<<<<<<< HEAD
import Flights from "../../Components/Flights/Flights";
=======
>>>>>>> 272247882de0b3168c48de904fa038b76dc20c9e

export default function TripDetailPage(props) {
  const [currentView, setCurrentView] = useState("flights");
  let total =
    props.trip.flight + props.trip.accommodation + props.trip.restaurant;
  let flightPercent = Math.round((props.trip.flight / total) * 100);
  let hotelPercent = Math.round((props.trip.accommodation / total) * 100);
  let restPercent = Math.round((props.trip.restaurant / total) * 100);

  let navigate = useNavigate();
  async function goBack() {
    navigate("/trips");
  }

    const toggleView = () => {
    if (currentView === "flights") {
        return (
            <>
            {props.savedFlight.map(flight => 
                <div className="Flight">
                    <div>
                        <div className="airline-name">
                                <p>United</p>
                        </div>
                        <div className='Flight-stat'>
                            <div className='Flight-stat-star'>
                                <p>{flight.departureCity} ({flight.departureAirport}) - {flight.destinationCity} ({flight.destinationAirport})</p>
                                <p>Departure Date: {moment(flight.departureDate).format('YYYY-MM-DD')}</p>
                                <p>Return Date: {moment(flight.arrivalDate).format('YYYY-MM-DD')}</p>
                            </div>
                            <div className='Flight-stat-price'>
                                <p>Price: ${flight.price}</p>
                            </div>
                        </div>
                        <div className='Hotel-btn'>
                            <button>see more</button>
                            <button>Save</button>
                        </div>
                    </div>
                </div>
            )}
            </>
        );
        } else if (currentView === "hotels") {
            return (
                <>
                <Hotels
                    hotels={props.savedHotel}
                    openHotelDetail={props.openHotelDetail}
                    saveHotel={props.saveHotel}
                    trip={props.trip}
                    hotelPhotos={props.hotelPhotos}
                />
                </>
            );
        } else {
            return (
                <>
                <Foods
                    restaurants={props.savedRestaurants}
                    getRestaurantDetail={props.getRestaurantDetail}
                    saveRestaurants={props.saveRestaurants}
                />{" "}
                </>
            );
        }
    };

    return (
        <div className="TripDetailPage">
        <h1>Trip to {props.trip.destination}</h1>
        <button className="TripDetailPage-back-btn" onClick={() => goBack()}>
            <img
            src={require("../../Images/my-trip-back-btn.svg")}
            alt="svg icon"
            />
        </button>
        <button
            className="TripDetailPage-edit-btn"
            onClick={() => props.editOneTrip(props.trip._id)}
        >
            Edit
        </button>
        <div className="TripDetailPage-img"></div>
        <div className="TripDetailPage-budget-bar">
            <div
            style={{ width: `${flightPercent}%` }}
            className="TripDetailPage-budget-bar-flight"
            >
            <small>
                <img src={require("../../Images/plane-black.svg")} alt="svg icon" />
                Flight
            </small>
            <p>{flightPercent}%</p>
            <small>{props.trip.flight}</small>
            </div>
            <div
            style={{ width: `${hotelPercent}%` }}
            className="TripDetailPage-budget-bar-acc"
            >
            <small>
                <img src={require("../../Images/house-black.svg")} alt="svg icon" />
                Accommodation
            </small>
            <p>{hotelPercent}%</p>
            <small>{props.trip.accommodation}</small>
            </div>
            <div
            style={{ width: `${restPercent}%` }}
            className="TripDetailPage-budget-bar-food"
            >
            <small>
                <img src={require("../../Images/spoon-black.svg")} alt="svg icon" />
                Foods
            </small>
            <p>{restPercent}%</p>
            <small>{props.trip.restaurant}</small>
            </div>
        </div>
        <div className="TripDetailPage-info">
            <div className="TripDetailPage-info-key">
            <p>
                <img
                src={require("../../Images/wallet-black.svg")}
                alt="svg icon"
                />
                Budget
            </p>
            <p>
                <img src={require("../../Images/pin-black.svg")} alt="svg icon" />
                Destination Airport
            </p>
            <p>
                <img src={require("../../Images/cal-black.svg")} alt="svg icon" />
                Dates
            </p>
            <p>
                <img
                src={require("../../Images/people-black.svg")}
                alt="svg icon"
                />
                Number of travelers
            </p>
            </div>
            <div className="TripDetailPage-info-value">
            <p>CAD ${props.trip.budget}</p>
            <p className="TripDetailPage-info-value-small">
                {props.trip.destination}
            </p>
            <p className="TripDetailPage-info-value-small">
                {moment(props.trip.startDate).format("MMM D")} -{" "}
                {moment(props.trip.endDate).format("MMM D")}
            </p>
            <p className="TripDetailPage-info-value-small">
                {props.trip.people} adults
            </p>
            </div>
        </div>
        <div className="TripDetailPage-savedList">
            <div className="SearchResultsPage-btn-bar">
            <button onClick={() => setCurrentView("flights")}>
                <img src={require("../../Images/plane-black.svg")} alt="svg icon" />
                Flight
            </button>
            <button onClick={() => setCurrentView("hotels")}>
                <img src={require("../../Images/house-black.svg")} alt="svg icon" />
                Hotels
            </button>
            <button onClick={() => setCurrentView("restaurants")}>
                <img src={require("../../Images/spoon-black.svg")} alt="svg icon" />
                Restaurants
            </button>
            </div>
            {toggleView()}
        </div>
        <Footer />
        </div>
    );
    }
