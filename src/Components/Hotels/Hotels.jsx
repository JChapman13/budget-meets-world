import './Hotels.css'
import React from 'react'
import Hotel from '../Hotel/Hotel'


export default function Hotels(props) {
    

    return (
        <div className='Hotels'>
            {props.hotels.map(hotel => 
                
                    <Hotel 
                        hotel={hotel}
                        openHotelDetail={props.openHotelDetail}
                    />
                
            )}
        </div>
    )
}