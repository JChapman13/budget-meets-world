import './App.css';
import React, { useState, useEffect } from 'react'
import {Link, useNavigate, Route, Routes} from 'react-router-dom'
import AuthPage from '../AuthPage/AuthPage';
import SearchResultsPage from '../SearchResultsPage/SearchResultsPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import SavedTripsPage from '../SavedTripsPage/SavedTripsPage';
import Login from '../../Components/Login/Login';
import Signup from '../../Components/Signup/Signup';


export default function App(props) {
  const [user, setUser] = useState(null)

  let navigate = useNavigate()

  async function setUserInState(incomingUserData) {
    setUser(incomingUserData)
  }

  async function userLogout () {
    let token = localStorage.getItem('token')
    if (token){
      token= null
      localStorage.removeItem('token')
      setUser(null)
    }
  }

  useEffect(async () => {
    let token = localStorage.getItem('token')
    if (token){
      const payload = await JSON.parse(atob(token.split('.')[1]))
      console.log(payload)
      if (payload.exp < (Date.now() / 1000)) {
        localStorage.removeItem('token')
        token = null
        navigate("/account/login")
      } else {
        try {
          let fetchUser = await fetch('/api/users/', { headers: { "userId": payload.user._id }})
          let user = await fetchUser.json()
          setUser(user)
        } catch(err) {
          console.log("home page error: ", err)
        }
      }
    } else {
      navigate("/account/login")
    }
  }, [])

  return(
    <div className='App'>
      <Routes>
        <Route path="/account" element={<AuthPage />}>
          <Route path="login" element={<Login setUserInState={setUserInState}/>}/>
          <Route path="signup" element={<Signup setUserInState={setUserInState}/>}/>
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
