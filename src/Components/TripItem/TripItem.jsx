import './TripItem.css'
import React from 'react'

export default function TripItem(props) {

    return (
        <div className='TripItem'>
            <button><span>Trip to {props.trip.destination}</span><span>></span></button>
        </div>
    )
}