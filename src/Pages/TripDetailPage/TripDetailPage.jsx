import './TripDetailPage.css'
import moment from 'moment'
import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'

export default function TripDetailPage(props) {
    let total = props.trip.flight + props.trip.accommodation + props.trip.restaurant
    let flightPercent = Math.round((props.trip.flight / total) * 100)
    let hotelPercent = Math.round((props.trip.accommodation / total) * 100)
    let restPercent = Math.round((props.trip.restaurant / total) * 100)

    let navigate = useNavigate()
    async function goBack() {
        navigate('/trips')
    }

    return (
        <div className='TripDetailPage'>
            <h1>Trip to {props.trip.destination}</h1>
            <button className='TripDetailPage-back-btn' onClick={() => goBack()}><img src={require('../../Images/my-trip-back-btn.svg')} alt="svg icon" /></button>
            <button className='TripDetailPage-edit-btn' onClick={() => props.editOneTrip()}>Edit</button>
            <div className='TripDetailPage-img'>

            </div>
            <div className='TripDetailPage-budget-bar'>
                <div style={{width: `${flightPercent}%`}} className='TripDetailPage-budget-bar-flight'>
                    <small><img src={require('../../Images/plane-black.svg')} alt="svg icon" />Flight</small>
                    <p>{flightPercent}%</p>
                    <small>{props.trip.flight}</small>
                </div>
                <div style={{width: `${hotelPercent}%`}} className='TripDetailPage-budget-bar-acc'>
                    <small><img src={require('../../Images/house-black.svg')} alt="svg icon" />Accommodation</small>
                    <p>{hotelPercent}%</p>
                    <small>{props.trip.accommodation}</small>
                </div>
                <div style={{width: `${restPercent}%`}} className='TripDetailPage-budget-bar-food'>
                    <small><img src={require('../../Images/spoon-black.svg')} alt="svg icon" />Foods</small>
                    <p>{restPercent}%</p>
                    <small>{props.trip.restaurant}</small>
                </div>
            </div>
            <div className='TripDetailPage-info'>
                <div className='TripDetailPage-info-key'>
                    <p><img src={require('../../Images/wallet-black.svg')} alt="svg icon" />Budget</p>
                    <p><img src={require('../../Images/pin-black.svg')} alt="svg icon" />Destination Airport</p>
                    <p><img src={require('../../Images/cal-black.svg')} alt="svg icon" />Dates</p>
                    <p><img src={require('../../Images/people-black.svg')} alt="svg icon" />Number of travelers</p>
                </div>
                <div className='TripDetailPage-info-value'>
                    <p>CAD ${props.trip.budget}</p>
                    <p className='TripDetailPage-info-value-small'>{props.trip.destination}</p>
                    <p className='TripDetailPage-info-value-small'>{moment(props.trip.startDate).format('MMM D')} - {moment(props.trip.endDate).format('MMM D')}</p>
                    <p className='TripDetailPage-info-value-small'>{props.trip.people} adults</p>
                </div>
            </div>
            <div className='TripDetailPage-savedList'>
                {props.savedHotel.map(hotel => 
                    <div>
                        {console.log(hotel, "fdasfgasg")}
                        {/* <p>{hotel.body.smallPrint.display}</p> */}
                        {/* <p>{hotel.propertyDescription.featuredPrice.currentPrice.plain}</p> */}
                    </div>
                    )}
                {props.savedFlight.map(flight =>
                    <div>
                       <p>{flight.departureDate}</p> 
                       <p>{flight.arrivalDate}</p> 
                       <p>{flight.departureCity}</p> 
                       <p>{flight.destinationCity}</p> 
                       <p>{flight.departureAirport}</p> 
                       <p>{flight.destinationAirport}</p> 
                       <p>{flight.price}</p> 
                    </div>
                    )} 
            </div>
            <Footer />
        </div>
    )
}