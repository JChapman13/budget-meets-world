import './TripDetailPage.css'
import moment from 'moment'
import React from 'react'
import {Link} from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'

export default function TripDetailPage(props) {
    let total = props.trip.flight + props.trip.accommodation + props.trip.restaurant
    let flightPercent = Math.round((props.trip.flight / total) * 100)
    let hotelPercent = Math.round((props.trip.accommodation / total) * 100)
    let restPercent = Math.round((props.trip.restaurant / total) * 100)

    return (
        <div className='TripDetailPage'>
            <h1>Trip to {props.trip.destination}</h1>
            <button className='TripDetailPage-edit-btn' onClick={() => console.log("hello")}>edit</button>
            <div className='TripDetailPage-img'>

            </div>
            <div className='TripDetailPage-budget-bar'>
                <div style={{width: `${flightPercent}%`}} className='TripDetailPage-budget-bar-flight'>
                    <p>Flight</p>
                    <p>{flightPercent}%</p>
                    <p>{props.trip.flight}</p>
                </div>
                <div style={{width: `${hotelPercent}%`}} className='TripDetailPage-budget-bar-acc'>
                    <p>Accommodation</p>
                    <p>{hotelPercent}%</p>
                    <p>{props.trip.accommodation}</p>
                </div>
                <div style={{width: `${restPercent}%`}} className='TripDetailPage-budget-bar-food'>
                    <p>Foods</p>
                    <p>{restPercent}%</p>
                    <p>{props.trip.restaurant}</p>
                </div>
            </div>
            <div className='TripDetailPage-info'>
                <div>
                    <p>Budget</p>
                    <p>CAD ${props.trip.budget}</p>
                </div>
                <div>
                    <p>Destination Airport</p>
                    <p>{props.trip.destination}</p>
                </div>
                <div>
                    <p>Dates</p>
                    <p>{moment(props.trip.startDate).format('MMM D')} - {moment(props.trip.endDate).format('MMM D')}</p>
                </div>
                <div>
                    <p>Number of travelers</p>
                    <p>{props.trip.people} adults</p>
                </div>
            </div>
            <div className='TripDetailPage-savedList'>
            </div>
            <Footer />
        </div>
    )
}