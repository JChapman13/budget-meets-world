import './Hotels.css'
import React from 'react'
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 42f06f696d4262adfc1eeb74d7ea231b67f3558a



export default function Hotels(props) {


    return (
        <div className='Hotels'>
            <p>Hotels</p>
<<<<<<< HEAD
=======
=======
import Hotel from '../Hotel/Hotel'


export default function Hotels(props) {
    

    return (
        <div className='Hotels'>
            {props.hotels.map(hotel => 
                
                    <Hotel 
                        hotel={hotel}
                    />
                
            )}
>>>>>>> 77ada14e0d7a91ed162f4989a9902f406908e9ce
>>>>>>> 42f06f696d4262adfc1eeb74d7ea231b67f3558a
        </div>
    )
}