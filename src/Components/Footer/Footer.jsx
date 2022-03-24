import "./Footer.css";
import React from "react";
import { Link } from "react-router-dom";

export default function Footer(props) {


    return (
        <div className='footer'>
            <div>
                <img src={require('../../Images/my-trip-btn.svg')} alt="svg icon" />
                <Link to="/trips">MY TRIPS</Link>
            </div>
            <div>
                <img src={require('../../Images/search-btn.svg')} alt="svg icon" />
                <Link to="/create">SEARCH</Link>
            </div>
            <div>
                <img src={require('../../Images/profile-btn.svg')} alt="svg icon" />
                <Link to="/profile">PROFILE</Link>
            </div>
        </div>
    )
}
