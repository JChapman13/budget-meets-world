import './Hotel.css'
import React, { useState, useEffect } from 'react'

export default function Hotel(props) {
    const [photo, setPhoto] = useState("")
    let startDay = new Date(props.trip.startDate)
    let endDay = new Date(props.trip.endDate)
    let diffTime = Math.abs(endDay - startDay)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    console.log("dsfgsfraghfrsdgfrsgh", props.hotel)
    let hotelId
    if (props.hotel.id) {
        hotelId = props.hotel.id
    } else {
        hotelId = props.hotel.pdpHeader.hotelId
    }

    useEffect(async () => {
        try {
            let fetchHotelPhotos = await fetch("/api/hotels/photos", {
                headers: { id: hotelId },
            });
            let photos = await fetchHotelPhotos.json();
            console.log(photos)
            setPhoto(photos);
        } catch (err) {
            console.log(err);
    }}, [])

    return (
        <div className='Hotel'>
            <div className='Hotel-image'>
                <img src={photo} alt="Hotel Image"/>
            </div>
            <div className='Hotel-name'>
                <p>{props.hotel.name ? props.hotel.name : props.hotel.propertyDescription.name}</p>
                <p><img src={require('../../Images/pin-black.svg')} alt="svg icon" /> 
                    { props.hotel.name ? 
                    props.hotel.address.streetAddress ?
                    props.hotel.address.streetAddress :
                    "Address not available" :
                    props.hotel.propertyDescription.address.fullAddress ? 
                    props.hotel.propertyDescription.address.fullAddress :
                    "Address not available" }
                </p>
            </div>
            <div className='Hotel-stat'>
                <div className='Hotel-stat-star'>
                    <p><span>{props.hotel.name ? props.hotel.starRating : props.hotel.propertyDescription.starRating} </span> Star hotel</p>
                    <p>{props.hotel.name ? 
                        props.hotel.guestReviews.rating ?
                        `${props.hotel.guestReviews.rating}/10 guess rating` :
                        `${props.hotel.guestReviews.brands.rating}/10 guess rating`
                        : "No ratings yet"}
                    </p>
                    <p>{props.hotel.guestReviews ? `${props.hotel.guestReviews.total} reviews` : "0 reviews"}</p>
                    <p>{props.hotel.name ? 
                        props.hotel.guestReviews.total ?
                        `${props.hotel.guestReviews.total} reviews` :
                        `${props.hotel.guestReviews.brands.total} reviews` :
                        "0 reviews"}
                    </p>
                </div>
                <div className='Hotel-stat-price'>
                    <p>CAD ${props.hotel.name ? props.hotel.ratePlan.price.current : props.hotel.propertyDescription.featuredPrice.currentPrice.formatted}</p>
                    <p>CAD ${props.hotel.ratePlan.price.fullyBundledPricePerStay} total</p>
                    { props.hotel.name ? 
                    <p>CAD ${props.hotel.ratePlan.price.fullyBundledPricePerStay.replace('&nbsp;', ' ')} </p> : 
                    <p>CAD ${props.hotel.propertyDescription.featuredPrice.currentPrice.plain * diffDays}</p> }
                </div>
            </div>
            <div className='Hotel-btn'>
                <button onClick={() => props.openHotelDetail(hotelId)} >see more</button>
                <button onClick={() => props.saveHotel(props.hotel.id)}>Save</button>
            </div>
        </div>
    )
}