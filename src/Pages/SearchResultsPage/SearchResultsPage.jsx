import "./SearchResultsPage.css";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Hotels from "../../Components/Hotels/Hotels";
import TripHeader from "../../Components/TripHeader/TripHeader";
import Flights from "../../Components/Flights/Flights";
import Foods from "../../Components/Foods/Foods";

export default function SearchResultsPage(props) {
    useEffect(()=> {
        props.getFlights()
    },[])
    
  return (
    <div className="SearchResultsPage">
      <TripHeader trip={props.trip} />
      <div className="SearchResultsPage-btn-bar">
        <button onClick={() => props.getFlights()}><img src={require('../../Images/plane-black.svg')} alt="svg icon" />  Flight</button>
        <button onClick={() => props.findHotels()}><img src={require('../../Images/house-black.svg')} alt="svg icon" />  Hotels</button>
        <button onClick={() => props.getRestaurants()}><img src={require('../../Images/spoon-black.svg')} alt="svg icon" />  Restaurant</button>
      </div>
      {props.currentCat === "flight" ? (
        <Flights 
        flights={props.flights} 
        carriers={props.carriers}
        places={props.places} 
        saveFlight={props.saveFlight}/>

      ) : (
        false
      )}
      {props.currentCat === "hotel" ? (
        <Hotels 
          hotels={props.hotels} 
          openHotelDetail={props.openHotelDetail} 
          saveHotel={props.saveHotel} 
          trip={props.trip}
          hotelPhotos={props.hotelPhotos}
          getHotelPhotos={props.getHotelPhotos}
        />
      ) : (
        false
      )}
      {props.currentCat === "rest" ? (
        <Foods
          getRestaurants={props.restaurants}
          restaurants={props.restaurants}
          getRestaurantDetail={props.getRestaurantDetail}
        />
      ) : (
        false
      )}
      <Footer />
    </div>
  );
}
