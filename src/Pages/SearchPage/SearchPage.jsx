import './SearchPage.css'
import React, { useState, useEffect } from 'react'
import Footer from '../../Components/Footer/Footer'
import moment from 'moment'
import DatePicker from 'react-datepicker'

export default function SearchPage(props) {
    const [trip, setTrip] = useState({
        name: '',
        budget: 1000,
        people: 1,
        origin: '',
        destination: '',
        flight: 0,
        accommodation: 0,
        restaurant: 0,
        startDate: '',
        endDate: '',
    })

    const [triap, setaTrip] = useState({
        budget: 2000,
        people: 2,
        destination: 'New York City, NY',
        accommodation: 500,
        startDate: '03/25/2022',
        endDate: '03/27/2022',
    })

    function handleChange(e) {
        if (e.target.budget > 0 )
        setTrip({...trip, [e.target.name]:e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(trip)
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

    async function getDefaultDate() {
        let startdate = new Date()
        let dayOfWeek = 5;
        let diff = startdate.getDay() - dayOfWeek;
        if (diff > 0) {
            startdate.setDate(startdate.getDate() + 6);
        }
        else if (diff < 0) {
            startdate.setDate(startdate.getDate() + ((-1) * diff))
        }
        let enddate = new Date()
        let enddayOfWeek = 7;
        let enddiff = enddate.getDay() - enddayOfWeek;
        if (enddiff > 0) {
            enddate.setDate(enddate.getDate() + 6);
        }
        else if (enddiff < 0) {
            enddate.setDate(enddate.getDate() + ((-1) * enddiff))
        }
        setTrip({...trip, startDate: moment(startdate).format('L'), endDate: moment(enddate).format('L') })
    }
    
    useEffect(() => {
        getUserLocation()
        getDefaultDate()
    }, [])

    return (
        <div className='SearchPage'>
            <h1>SearchPage</h1>
            <form onSubmit={handleSubmit} >
                    <input onChange={handleChange} type="text" name="name" placeholder='Trips name?' />
                <div className='duo-input'>
                    <input onChange={handleChange} type="number" name="budget" placeholder='enter your budget' />
                    <input onChange={handleChange} type="number" name="people" value={trip.people} />
                </div>
                <div className='duo-input'>
                    <input onChange={handleChange} type="text" name="origin" placeholder='From?' value={trip.origin} />
                    <input onChange={handleChange} type="text" name="destination" placeholder='To?' />
                </div>
                <div className='duo-input'>
                    <input onChange={handleChange} type="date" name="startDate" value={trip.startDate} />
                    {/* <input onChange={handleChange} type="date" name="endDate" value={trip.endDate} /> */}
                    {/* <
                        selected={trip.endDate}
                        onChange={(date) => setTrip({...trip, endDate: moment(enddate).format('L') })}
                    /> */}
                </div>
                <p>Flight</p>
                <input onChange={handleChange} type="number" name="flight" value={trip.flight} />
                <p>Accommodation</p>
                <input onChange={handleChange} type="number" name="accommodation" value={trip.accommodation} />
                <p>Food</p>
                <input onChange={handleChange} type="number" name="restaurant" value={trip.restaurant} />
                <br />
                <br />
                <button onSubmit={handleSubmit} >Done</button>
            </form>
            <Footer />
        </div>
    )
}