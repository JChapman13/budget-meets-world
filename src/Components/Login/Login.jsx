import "./Login.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login(props) {
  const [user, setUser] = useState({
    name: "",
    password: "",
  });

  const [error, setError] = useState(false);

  let navigate = useNavigate();

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const fetchResponse = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: user.name,
        password: user.password,
      }),
    });
    if (!fetchResponse.ok) {
      setError(true);
    } else {
      let token = await fetchResponse.json();
      localStorage.setItem("token", token);

      const userDoc = await JSON.parse(window.atob(token.split(".")[1])).user;
      props.setUserInState(userDoc);
      navigate("/");
    }
  }

  return (
    <div className="Login">
      <div className="SearchPage-logo">
        <img className="SearchPage-logo-img" src={require('../../Images/logo.png')} alt="svg icon" />
      </div>
      <div className="Login-title">
        <h1>Welcome Back!</h1>
        <h3>Your dream vacation is one</h3>
        <h3>step away...</h3>
      </div>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <input 
          className="Login-username" 
          onChange={handleChange} 
          type="text" 
          name="name" 
          placeholder="Username" 
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
        <p className="Login-forgot">Forgot Password?</p>
        {error ? (
          <p className="error-red">Incorrect Username or password. Try again</p>
        ) : (
          false
        )}
        <br></br>
        <br></br>
        <button type="submit" onSubmit={handleSubmit}>
          Login
        </button>
      </form>
      <p>
        Not a Member? &nbsp;<Link to="/account/signup">Sign up here</Link>
      </p>
    </div>
  );
}
