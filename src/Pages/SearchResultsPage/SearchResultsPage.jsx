import './SearchResultsPage.css'
import React from 'react'
import Footer from '../../Components/Footer/Footer'
import Hotels from '../../Components/Hotels/Hotels'

export default function SearchResultsPage(props) {


    return (
        <div className='SearchResultsPage'>
            <h1>SearchResultsPage</h1>
            <Hotels />
            <Footer />
        </div>
    )
}