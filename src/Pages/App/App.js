import './App.css';
import React, { useState, useEffect } from 'react'
import {Link, useNavigate, Route, Routes} from 'react-router-dom'
import AuthPage from '../AuthPage/AuthPage';
import SearchPage from '../SearchPage/SearchPage';
import SearchResultsPage from '../SearchResultsPage/SearchResultsPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import SavedTripsPage from '../SavedTripsPage/SavedTripsPage';
import Login from '../../Components/Login/Login';
import Signup from '../../Components/Signup/Signup';


export default function App(props) {
  let navigate = useNavigate()
  const [user, setUser] = useState(null)

  const [currentCat, setCurrentCat] = useState('flight')

  const [trip, setTrip] = useState({
    name: '',
    budget: 0,
    people: 1,
    origin: '',
    destination: 'New York City, NY',
    flight: 0,
    accommodation: 0,
    restaurant: 0,
    startDate: '04/25/2022',
    endDate: '04/27/2022',
  })

  const [hotelList, setHotelList] = useState([])
  

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

  async function findHotels() {
    try {
      let fetchHotelList = await fetch('/api/hotels', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          budget: 2000,
          people: 2,
          destination: 'New York City, NY',
          accommodation: 500,
          startDate: '2022-03-25',
          endDate: '2022-03-27'
        })
    })
      let hotels = await fetchHotelList.json()
      setHotelList(hotels)
      setCurrentCat('hotel')
    } catch (err) {
      console.log(err)
    }
  }

  async function createTrip(object) {
    console.log(object)
    setTrip(object)
    navigate('/')
  }

  useEffect(async () => {
    let token = localStorage.getItem('token')
    if (token){
      const payload = await JSON.parse(atob(token.split('.')[1]))
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
          element={<SearchResultsPage 
            findHotels={findHotels} 
            hotels={hotelList}
            currentCat={currentCat}
          />}
        />
        <Route
          path="/create"
          element={<SearchPage user={user} createTrip={createTrip} />}
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
