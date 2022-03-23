import './Flights.css'
import React , {useEffect, useState} from 'react'
import Flight from '../Flight/Flight'
const axios = require('axios').default


export default function Flights(props) {
    const[flights, setFlights] = useState([])
    const [carriers, setCarriers] = useState([])


useEffect(() => {
    axios.get('/api/flights', {
        params: {
            country: 'CA',
            currency: 'cad',
            locale: 'en-US',
            originPlace: 'YYZ',
            destinationPlace: 'YVR',
            outboundPartialDate: '2022-04',
            inboundPartialDate: '2022-06'
        }
    })
    .then((result) => {
        setCarriers (result.data.Carriers)
        setFlights(result.data.Quotes)
        // console.log(carriers)
        // console.log(result.data, 'data')
        // console.log(result.data.Carriers, 'carrier data')
        // console.log(result.data.Quotes, 'data.quotes')

    })
    .catch((err) => console.log(err, "flight result error")) 
}, [])

    return (
        <div className='Flights'>
            
            {flights.map((f,idx) => {
                console.log(flights, 'flights')
                return (
                    <Flight key={f + idx}
                    outboundLeg={f.OutboundLeg}
                    inboundLeg={f.InboundLeg}
                    price={f.MinPrice}
                    carriers={carriers}/>
                    )
            })}
        </div>
    )
}
