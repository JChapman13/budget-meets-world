import './Hotels.css'
import React from 'react'
<<<<<<< HEAD



export default function Hotels(props) {


    return (
        <div className='Hotels'>
            <p>Hotels</p>
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
        </div>
    )
}