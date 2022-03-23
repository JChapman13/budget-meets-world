import './Hotel.css'
import React from 'react'
import { Link } from 'react-router-dom'


export default function Hotel(props) {
   
    return (
        <div className='Hotel'>
            {/* <Link to={`/hotel/${props.hotel.id}`}> */}
            <button onClick={() => props.openHotelDetail(props.hotel.id)} >see more</button>
            <button onClick={() => props.saveHotel(props.hotel.id)}>Save</button>
            <p>Hotel</p>
            <p>Hotel Name: {props.hotel.name}</p>
            <p>Star Rating: {props.hotel.starRating}</p>
            <p>Hotel Address: {props.hotel.address.streetAddress}</p>
            <p>Hotel Rating: {props.hotel.guestReviews ? props.hotel.guestReviews.rating : "No ratings yet"} </p>
            <p>Number of Rating: {props.hotel.guestReviews ? props.hotel.guestReviews.total : "0"} </p>
            <p>Price: {props.hotel.ratePlan.price.current}</p>
            <p>Total price: {props.hotel.ratePlan.price.fullyBundledPricePerStay}</p>
            {/* </Link> */}
            {console.log(props.hotel)}
        </div>
    )
}