import "./Footer.css";
import React from "react";
import { Link } from "react-router-dom";

export default function Footer(props) {


    return (
        <div className='footer'>
            <div>
                <Link to="/trips">
                    <img src={require('../../Images/my-trip-btn.svg')} alt="svg icon" />
                    <p>MY TRIPS</p>
                </Link>
            </div>
            <div>
                <Link to="/create">
                    <img src={require('../../Images/search-btn.svg')} alt="svg icon" />
                    <p>SEARCH</p>
                </Link>
            </div>
            <div>
                <Link to="/profile">
                    <img src={require('../../Images/profile-btn.svg')} alt="svg icon" />
                    <p>PROFILE</p>
                </Link>
            </div>
        </div>
    )
}
