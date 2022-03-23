import './Footer.css'
import React from 'react'
import { Link } from 'react-router-dom'



export default function Footer(props) {


    return (
        <div className='footer'>
            <div>
                <Link to="/">MY TRIPS</Link>
            </div>
            <div>
                <Link to="/create">SEARCH</Link>
            </div>
            <div>
                <Link to="/profile">PROFILE</Link>
            </div>
        </div>
    )
}