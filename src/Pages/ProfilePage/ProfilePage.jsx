import "./ProfilePage.css";
import React from "react";
import { Link } from 'react-router-dom'
import Footer from "../../Components/Footer/Footer";

export default function ProfilePage(props) {
  return (
    <div className="ProfilePage-container">
      <div className="ProfilePage">
        <div className="SearchPage-logo">
          <img className="SearchPage-logo-img" src={require('../../Images/logo.png')} alt="svg icon" />
        </div>
        <div className="ProfilePage-title">
          <h1>Welcome {props.user ? props.user.name : ""}!</h1>
        </div>
        <div className="ProfilePage-btn-div" >
          <button className="ProfilePage-btn" onClick={() => props.userLogout()} >Log Out</button>
        </div>
        <Footer />
      </div>
    </div>
  );
}
