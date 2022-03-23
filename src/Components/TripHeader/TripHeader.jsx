import './TripHeader.css'
import React from 'react'

export default function SearchResultsPage(props) {


    return (
        <div className='TripHeader'>
            <p>CAD $2000 </p>
            <div className='TripHeader-detail-bar'>
                <p>NewYork</p>
                <p>Jun 17 - Jun 20</p>
                <p>2 adults</p>
            </div>
            <div className='TripHeader-budget-bar'>
                <div style={{width: '30%'}} className='TripHeader-budget-bar-flight'>
                    <p>30%</p>
                    <p>$600</p>
                </div>
                <div style={{width: '30%'}} className='TripHeader-budget-bar-acc'>
                    <p>30%</p>
                    <p>$600</p>
                </div>
                <div style={{width: '30%'}} className='TripHeader-budget-bar-food'>
                    <p>30%</p>
                    <p>$600</p>
                </div>
            </div>
        </div>
    )
}