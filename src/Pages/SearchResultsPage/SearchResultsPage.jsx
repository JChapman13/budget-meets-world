import './SearchResultsPage.css'
import React from 'react'
import Footer from '../../Components/Footer/Footer'
import Flights from '../../Components/Flights/Flights'
export default function SearchResultsPage(props) {


    return (
        <div className='SearchResultsPage'>
            <h1>SearchResultsPage</h1>
            <Flights/>
            <Footer />
        </div>
    )
}