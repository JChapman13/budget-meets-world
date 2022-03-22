import './SearchPage.css'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'
import moment from 'moment'

export default function SearchPage(props) {
    const [trip, setTrip] = useState({
        name: '',
        budget: 0,
        people: 1,
        origin: '',
        destination: '',
        flight: 0,
        accommodation: 0,
        restaurant: 0,
        startDate: '',
        endDate: '',
        submitError: '',
    })
    
    const [submitError, setSubmitError] = useState('')

    let navigate = useNavigate()

    function handleChange(e) {
        if (e.target.name === 'budget' || e.target.name === 'flight' || e.target.name === 'accommodation' || e.target.name === 'restaurant' || e.target.name === 'people') {
            let num = parseInt(e.target.value)
            setTrip({...trip, [e.target.name]:num })
        } else {
            setTrip({...trip, [e.target.name]:e.target.value })
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let valid = true
        if (trip.budget === 0) {
            valid = false
            setSubmitError('Please set budget for your trip')
        } else if (trip.flight === 0 && trip.accommodation === 0 && trip.restaurant === 0) {
            valid = false
            setSubmitError('Please edit budget for your trip')
        }
        if (valid) {
            await props.createTrip(trip)
            // navigate('/')
        }
    }

    async function getUserLocation() {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        async function success(pos) {
            let crd = pos.coords;
            let location = await fetch(`https://api.geocod.io/v1.7/reverse?q=${crd.latitude},${crd.longitude}&limit=1&api_key=${process.env.REACT_APP_GEO_KEY}`)
            let trueLocation = await location.json()
            setTrip({...trip, origin:`${trueLocation.results[0].address_components.city}, ${trueLocation.results[0].address_components.state}` })
        }
        function error(err) {
            setTrip({...trip, origin:'' })
        }
        navigator.geolocation.getCurrentPosition(success, error, options)
    }


    // It's not working right now, we'll do it later
    async function getDefaultDate() {
        let startdate = new Date()
        let dayOfWeek = 5;
        let diff = startdate.getDay() - dayOfWeek;
        if (diff > 0) {
            startdate.setDate(startdate.getDate() + 6);
        } else if (diff < 0) {
            startdate.setDate(startdate.getDate() + ((-1) * diff))
        }
        let enddate = new Date()
        let enddayOfWeek = 7;
        let enddiff = enddate.getDay() - enddayOfWeek;
        if (enddiff > 0) {
            enddate.setDate(enddate.getDate() + 6);
        } else if (enddiff < 0) {
            enddate.setDate(enddate.getDate() + ((-1) * enddiff))
        }
        let one = moment(startdate).format('YYYY-MM-DD')
        setTrip({...trip, startDate: one, endDate: moment(enddate).format('YYYY-MM-DD') })
    }
    
    useEffect(() => {
        getUserLocation()
        getDefaultDate()
    }, [])

    useEffect(() => {
        if (trip.budget === 0) {
            setTrip({...trip, flight: 0})
        } else if ((trip.flight + trip.accommodation + trip.restaurant) > trip.budget) {
            let set = trip.budget - trip.accommodation - trip.restaurant
            setTrip({...trip, flight: set})
        }
    }, [trip.flight])

    useEffect(() => {
        if (trip.budget === 0) {
            setTrip({...trip, accommodation: 0})
        } else if ((trip.flight + trip.accommodation + trip.restaurant) > trip.budget) {
            let set = trip.budget - trip.flight - trip.restaurant
            setTrip({...trip, accommodation: set})
        }
    }, [trip.accommodation])

    useEffect(() => {
        if (trip.budget === 0) {
            setTrip({...trip, restaurant: 0})
        } else if ((trip.flight + trip.accommodation + trip.restaurant) > trip.budget) {
            let set = trip.budget - trip.accommodation - trip.flight
            setTrip({...trip, restaurant: set})
        }
    }, [trip.restaurant])

    return (
        <div className='SearchPage'>
            <h1>SearchPage</h1>
            <form onSubmit={handleSubmit} >
                    <input onChange={handleChange} type="text" name="name" placeholder='Trips name?' required />
                <div className='duo-input'>
                    <input onChange={handleChange} type="number" pattern='[0-9]' name="budget" value={trip.budget} required />
                    <input onChange={handleChange} type="number" name="people" value={trip.people} />
                </div>
                <div className='duo-input'>
                    <input onChange={handleChange} type="text" name="origin" placeholder='From?' value={trip.origin} required />
                    <input onChange={handleChange} type="text" name="destination" placeholder='To?' required />
                </div>
                <div className='duo-input'>
                    <input onChange={handleChange} type="date" name="startDate" value={trip.startDate} required />
                    <input onChange={handleChange} type="date" name="endDate" value={trip.endDate} required />
                </div>
                <p>Flight</p>
                <input onChange={handleChange} type="number" name="flight" value={trip.flight} required />
                <p>Accommodation</p>
                <input onChange={handleChange} type="number" name="accommodation" value={trip.accommodation} required />
                <p>Food</p>
                <input onChange={handleChange} type="number" name="restaurant" value={trip.restaurant} required />
                { submitError ? <p>{submitError}</p> : false }
                <br />
                <br />
                <button onSubmit={handleSubmit} >Done</button>
            </form>
            <Footer />
        </div>
    )
}