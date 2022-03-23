import './Login.css'
import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'



export default function Login(props) {
    const [user, setUser] = useState({
        name:'',
        password: '',
    })

    const [error, setError] = useState(false)

    let navigate = useNavigate()

    function handleChange(e) {
        setUser({...user, [e.target.name]:e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const fetchResponse = await fetch('/api/users/login', {
<<<<<<< HEAD
            method: 'post',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: user.name,
=======
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: user.name,
>>>>>>> 42f06f696d4262adfc1eeb74d7ea231b67f3558a
                password: user.password,
            })
        })
        if (!fetchResponse.ok){
            setError(true)
        } else {
            let token = await fetchResponse.json()
            localStorage.setItem('token', token)
    
            const userDoc = await JSON.parse(window.atob(token.split('.')[1])).user
            props.setUserInState(userDoc)
            navigate("/")
        }
    }

    return (
        <div className='Login'>
            <h1>Login</h1>
            <form autoComplete='off' onSubmit={handleSubmit}>
                <p>name</p>
                <input onChange={handleChange}  type="text" name="name" required />
                <br></br>
                <p>password</p>
                <input onChange={handleChange}  type="password" name="password" required />
                {error ? <p className='error-red'>Incorrect Username or password. Try again</p> : false }
                <br></br>
                <br></br>
                <button type='submit' onSubmit={handleSubmit} >Login</button>
            </form>
            <p>Not a Member? &nbsp;<Link to="/account/signup">Sign up here</Link></p>
        </div>
    )
}