import "./Signup.css";
import "../Login/Login.css"
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup(props) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    signup: false,
  });

  const [errorFlag, setErrorFlag] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [checkData, setCheckData] = useState([]);
  let navigate = useNavigate();

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let valid = true;
    checkData.forEach((eachUser) => {
      if (eachUser.email === user.email) {
        setErrorFlag(true);
        setErrorMessage("Email already exists, please try again");
        valid = false;
      } else if (user.password !== user.confirm) {
        setErrorFlag(true);
        setErrorMessage("Password does not match, please try again");
        valid = false;
      }
    });
    if (valid) {
      const fetchResponse = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password,
        }),
      });
      if (!fetchResponse.ok) throw new Error("Fetch failed - Bad request");
      let token = await fetchResponse.json();
      localStorage.setItem("token", token);
      const userDoc = await JSON.parse(window.atob(token.split(".")[1])).user;
      props.setUserInState(userDoc);
      navigate("/trips");
    }
  }

  async function getAllUser() {
    let fetchUsers = await fetch("/api/users/all");
    let users = await fetchUsers.json();
    setCheckData(users);
  }

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <div className="Login">
      <div className="SearchPage-logo">
        <img className="SearchPage-logo-img" src={require('../../Images/logo.png')} alt="svg icon" />
      </div>
      <div className="Login-title">
        <h1>Hi There!</h1>
        <h3>Welcome to the</h3>
        <h3>Wnader Wallet Community!</h3>
      </div>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <input
          className="Login-username"
          onChange={handleChange} 
          type="text" 
          placeholder="Name"  
          name="name" 
          required />
        <br></br>
        <input 
          className="Login-email"
          onChange={handleChange} 
          type="email" 
          placeholder="Email"  
          name="email" 
          required />
        <br></br>
        <input
          className="Login-password"
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Password" 
          required
        />
        <br></br>
        <input
          className="Login-password"
          onChange={handleChange}
          type="password"
          name="confirm"
          placeholder="Confirm password" 
          required
        />
        {errorFlag ? <p className="error-red">{errorMessage}</p> : false}
        <br></br>
        <br></br>
        <div className="Login-btn-div" >
          <button className="Login-btn" type="submit" onSubmit={handleSubmit}>Signup</button>
        </div>
      </form>
      <hr />
      <p className="Login-or">or</p>
      <div className="Login-other-login">
        <img className="SearchPage-or-img" src={require('../../Images/google.svg')} alt="svg icon" />
        <img className="SearchPage-or-img" src={require('../../Images/facebook.svg')} alt="svg icon" />
        <img className="SearchPage-or-img" src={require('../../Images/apple.svg')} alt="svg icon" />
      </div>
      <p className="Login-dont">Already have an account? &nbsp;<Link to="/account/login">Login here</Link></p>
    </div>
  );
}
