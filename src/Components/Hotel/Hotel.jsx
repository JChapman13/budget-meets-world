import './Hotel.css'
import React from 'react'
import { useNavigate } from 'react-router-dom'


export default function Hotel(props) {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = ``
    }
 
    return (
        <div className='Hotel' onClick={routeChange}>
            <p>Hotel</p>
            <p>Hotel Name: {props.hotel.name}</p>
            <p>Star Rating: {props.hotel.starRating}</p>
            <p>Hotel Address: {props.hotel.address.streetAddress}</p>
            <p>Hotel Rating: {props.hotel.guestReviews ? props.hotel.guestReviews.rating : "No ratings yet"} </p>
            <p>Number of Rating: {props.hotel.guestReviews ? props.hotel.guestReviews.total : "0"} </p>
            <p>Price: {props.hotel.ratePlan.price.current}</p>
            <p>Total price: {props.hotel.ratePlan.price.fullyBundledPricePerStay}</p>
            {console.log(props.hotel)}
            
            <p>adsfsafasf</p>
        </div>
    )
}