import './TripHeader.css'
import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

export default function SearchResultsPage(props) {
    let total = props.trip.flight + props.trip.accommodation + props.trip.restaurant
    let flightPercent = Math.round((props.trip.flight / total) * 100)
    let hotelPercent = Math.round((props.trip.accommodation / total) * 100)
    let restPercent = Math.round((props.trip.restaurant / total) * 100)
    // add a comment to test
    return (
        <div className='TripHeader'>
            <p className='TripHeader-budget'><img src={require('../../Images/wallet-white.svg')} alt="svg icon" /> CAD ${props.trip.budget} </p>
            <div className='TripHeader-detail-bar'>
                <p><img src={require('../../Images/pin-white.svg')} alt="svg icon" /> {props.trip.destination}</p>
                <p><img src={require('../../Images/cal-white.svg')} alt="svg icon" /> {moment(props.trip.startDate).format('MMM D')} - {moment(props.trip.endDate).format('MMM D')}</p>
                <p><img src={require('../../Images/people-white.svg')} alt="svg icon" /> {props.trip.people} adults</p>
            </div>
            <div className='TripHeader-budget-bar'>
                <div style={{width: `${flightPercent}%`}} className='TripHeader-budget-bar-flight'>
                    <p><img src={require('../../Images/plane-black.svg')} alt="svg icon" /> {flightPercent}%</p>
                    <p>${props.trip.flight}</p>
                </div>
                <div style={{width: `${hotelPercent}%`}} className='TripHeader-budget-bar-acc'>
                    <p><img src={require('../../Images/house-black.svg')} alt="svg icon" /> {hotelPercent}%</p>
                    <p>${props.trip.accommodation}</p>
                </div>
                <div style={{width: `${restPercent}%`}} className='TripHeader-budget-bar-food'>
                    <p><img src={require('../../Images/spoon-black.svg')} alt="svg icon" /> {restPercent}%</p>
                    <p>${props.trip.restaurant}</p>
                </div>
            </div>
            <Link className='edit-btn' to='/create'>edit</Link>
        </div>
    )
}