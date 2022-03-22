import './App.css';
import React, { Component } from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthPage from '../AuthPage/AuthPage';
import SearchResultsPage from '../SearchResultsPage/SearchResultsPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import SavedTripsPage from '../SavedTripsPage/SavedTripsPage';
import Login from '../../Components/Login/Login';
import Signup from '../../Components/Signup/Signup';


export default class App extends Component {
  state = {
    user: null
  }

  setUserInState = (incomingUserData) => {
    this.setState({ user: incomingUserData})
  }

  render() {
    return(
      <div className='App'>
        <Routes>
          <Route path="/account" element={<AuthPage />}>
            <Route path="login" element={<Login setUserInState={this.setUserInState}/>}/>
            <Route path="signup" element={<Signup setUserInState={this.setUserInState}/>}/>
          </Route>
          <Route
            path="/"
            element={<SearchResultsPage />}
          />
          <Route 
            path="/profile"
            element={<ProfilePage />}
          />
          <Route 
            path="/trips"
            element={<SavedTripsPage />}
          />
        </Routes>
      </div>
    )
  }
}
