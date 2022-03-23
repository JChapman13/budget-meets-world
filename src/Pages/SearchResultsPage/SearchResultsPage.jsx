import './SearchResultsPage.css'
import React from 'react'
import {Link} from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'
import Hotels from '../../Components/Hotels/Hotels'
import TripHeader from '../../Components/TripHeader/TripHeader'

export default function SearchResultsPage(props) {


    return (
        <div className='SearchResultsPage'>
            <TripHeader   />
            <div className='SearchResultsPage-btn-bar'>
                <button onClick={() => console.log('hello')}>Flight</button>
                <button onClick={() => props.findHotels()}>Hotels</button>
                <button onClick={() => console.log('hello')}>Restaurant</button>
            </div>
            { props.currentCat === "flight" ? <Flights /> : false }
            { props.currentCat === "hotel" ? <Hotels hotels={props.hotels}/> : false }
            { props.currentCat === "rest" ? <Foods /> : false }
            <Footer />
            // add lalala
        </div>
    )
}