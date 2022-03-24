import './HotelDetailPage.css'
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'

export default function HotelDetailPage(props) {
    const [index, setIndex] = useState(0)
    
    let newIndex = 0
    function goToLeft() {
        if (index === 0) {
            newIndex = props.project.images.length - 1
            setIndex(newIndex)
        } else {
            newIndex = index
            setIndex(newIndex - 1)
        }
    }
    function goToRight() {
        if (index === props.project.images.length - 1) {
            setIndex(0)
        } else {
            let newIndex = index
            setIndex(newIndex + 1)
        }
    }

    return (
        <div>
            {/* {props.hotelPhotos.hotelImages.map((h, idx) => 
                {if (idx < 4) {
                    return <img style={{width: '300px'}} src={h.baseUrl.replace('_{size}', '')} alt="Hotel Image"/>
                }}
                )} */}
            <img style={{ width: '300px' }} src={props.hotelPhotos} alt="Hotel Image"/>
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