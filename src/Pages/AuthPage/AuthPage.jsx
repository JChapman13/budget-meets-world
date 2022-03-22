import './AuthPage.css'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AuthPage(props) {


    return (
        <div className='AuthPage'>
            <Outlet/>
        </div>
    )
}