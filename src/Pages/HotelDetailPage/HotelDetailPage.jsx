import './HotelDetailPage.css'
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'

export default function HotelDetailPage(props) {

    return (
        <div>
            {props.hotelPhotos.hotelImages.map((h, idx) => 
                {if (idx < 4) {
                    return <img style={{width: '300px'}} src={h.baseUrl.replace('_{size}', '')} alt="Hotel Image"/>
                }}
                )}
            {/* <img style={{ width: '300px' }} src={props.hotelPhotos.hotelImages[0].baseUrl.replace('_{size}', '')} alt="Hotel Image"/> */}
            <p>Booking URL: {props.oneHotel.roomsAndRates.bookingUrl}</p>
            <p>Amenities:</p>
            <ul>{props.oneHotel.overview.overviewSections[0].content.map(c => <li>{c}</li>)}</ul>
            <p>What's around:</p>
            <ul>{props.oneHotel.overview.overviewSections[1].content.map(c => <li>{c}</li>)}</ul>
            <p>About: {props.oneHotel.overview.overviewSections[2].content.map(c => <li>{c}</li>)}</p>
            <p>Address: {props.oneHotel.propertyDescription.address.fullAddress}</p>
            <p>Name: {props.oneHotel.propertyDescription.name}</p>
            <p>Star: {props.oneHotel.propertyDescription.starRating}</p>
            <p>Price: {props.oneHotel.propertyDescription.featuredPrice.currentPrice.plain}</p>
            <p>Room Types:</p>
            <ul>{props.oneHotel.propertyDescription.roomTypeNames.map(r => <li>{r}</li>)}</ul>
            <p>Rating: 
                {props.oneHotel.guestReviews.brands.rating} <br />
                Number of ratings: {props.oneHotel.guestReviews.brands.total}
            </p>

        </div>
    )
}