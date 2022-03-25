import './HotelDetailPage.css'
import React from 'react'
import {Link, useNavigate} from "react-router-dom"



export default function HotelDetailPage(props) {
    let navigate = useNavigate()

    return (
        <div class="hotel-details">
            <button class="back-button" onClick={() => navigate(-1)}>back</button>
            <h3 class="back-title">Accomandation Details</h3>
            <img class="hotel-details-photo" src={props.hotelPhotos} alt="Hotel Image"/>
            <h1>{props.oneHotel.propertyDescription.name}</h1>
            <p class="address"><img src={require('../../Images/pin-black.svg')} alt="svg icon" /> {props.oneHotel.propertyDescription.address.fullAddress}</p>
            <a href='{props.oneHotel.roomsAndRates.bookingUrl}'>All inclusive, All meals included, 
Contactless check-in</a>
            <p class="rating"> <b>{props.oneHotel.propertyDescription.starRating}</b> Star hotel</p>
            <p class="rating">
                {props.oneHotel.guestReviews.brands.rating}/10 guest rating <br /> {props.oneHotel.guestReviews.brands.total} reviews
            </p>
            <h3>About</h3>
            <ul>{props.oneHotel.overview.overviewSections[1].content.map(c => <li>{c}</li>)}</ul>
            <h3>Amenities</h3>
            <ul>{props.oneHotel.overview.overviewSections[0].content.map(c => <li>{c}</li>)}</ul>
            {/* <p>About: {props.oneHotel.overview.overviewSections[2].content.map(c => <li>{c}</li>)}</p> */}
            {/* <p>Price: {props.oneHotel.propertyDescription.featuredPrice.currentPrice.plain}</p> */}
            <h3>Room Types</h3>
            <ul>{props.oneHotel.propertyDescription.roomTypeNames.map(r => <li>{r}</li>)}</ul>

        </div>
    )
}