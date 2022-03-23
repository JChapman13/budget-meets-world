import './Flights.css'
import React , {useEffect, useState} from 'react'
import Flight from '../Flight/Flight'
const axios = require('axios').default


export default function Flights(props) {
    const[flights, setFlights] = useState([])
let carriers = [];

useEffect(() => {
    axios.get('/api/flights', {
        params: {
            country: 'CA',
            currency: 'cad',
            locale: 'en-US',
            originPlace: 'YYZ',
            destinationPlace: 'YVR',
            outboundPartialDate: '2022-04-01',
            inboundPartialDate: '2022-04-10'
        }
    })
    .then((result) => {
        console.log(result.data) //dot notation to get specific data
        carriers = result.data.Carriers
        // setFlights(result.data.Quotes)
    })
    .catch((err) => console.log(err, "flight result error")) 
}, [])


    return (
        <div className='Flights'>
            
            {flights.map((f, idx) => {
                return (
                    <Flight 
                    flightInfo={f} 
                    carriers={carriers}/>
                )
            })}
        </div>
    )
}
