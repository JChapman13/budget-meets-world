import './Flights.css'
import React , {useEffect, useState} from 'react'



export default function Flights(props) {
    const[flights, setFlights] = useState([])

useEffect(() => {
    fetch('/flights', {
        params: {
            // key:value for the backend

        }
    })
    .then((result) => {
        console.log(result) //dot notation to get specific data
        
        setFlights(result)
    })
    .catch((err) => console.log(err, "flight result error")) 
}, [])


    return (
        <div className='Flights'>
            <p>Flights</p>
            
            {flights.map((f, idx) => {
                return (
                    <Flight flightInfo={f}/>
                )
            })}
        </div>
    )
}
