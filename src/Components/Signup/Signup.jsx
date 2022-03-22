import './Signup.css'
import React, { useState, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'



export default function Signup(props) {
    const [user, setUser] = useState({
        name:'',
        email: '',
        password: '',
        confirm: '',
        signup: false,
    })

    const [errorFlag, setErrorFlag] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [checkData, setCheckData] = useState([])
    let navigate = useNavigate()

    function handleChange(e) {
        setUser({...user, [e.target.name]:e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let valid = true
        checkData.forEach(eachUser => {
            if (eachUser.email === user.email) {
                setErrorFlag(true)
                setErrorMessage('Email already exists, please try again')
                valid = false
            } else if (user.password !== user.confirm){
                setErrorFlag(true)
                setErrorMessage('Password does not match, please try again')
                valid = false
            }
        })
        if (valid) {
            const fetchResponse = await fetch('/api/users/signup', {
                method: 'post',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name: user.name, 
                    email: user.email, 
                    username: user.username,
                    password: user.password,
                })
            })
            if (!fetchResponse.ok) throw new Error('Fetch failed - Bad request')
            let token = await fetchResponse.json()
            localStorage.setItem('token', token)
            const userDoc = await JSON.parse(window.atob(token.split('.')[1])).user
            props.setUserInState(userDoc)
            navigate("/")
        }
    }

    async function getAllUser() {
        let fetchUsers = await fetch('/api/users/all')
        let users = await fetchUsers.json()
        setCheckData(users)
    }

    useEffect(() => {
        getAllUser()
    }, [])

    return (
        <div className='Signup'>
            <h1>Signup</h1>
            <form autoComplete='off' onSubmit={handleSubmit}>
                <p>name</p>
                <input onChange={handleChange}  type="text" name="name" required/>
                <br></br>
                <p>email</p>
                <input onChange={handleChange}  type="email" name="email" required/>
                <br></br>
                <p>password</p>
                <input onChange={handleChange}  type="password" name="password" required/>
                <br></br>
                <p>confirm password</p>
                <input onChange={handleChange}  type="password" name="confirm" required/>
                { errorFlag ? <p className='error-red'>{errorMessage}</p> : false }
                <br></br>
                <br></br>
                <button type='submit' onSubmit={handleSubmit} >Signup</button>
            </form>
            <p>Already a Member? &nbsp;<Link to="/account/login">Login here</Link></p>
        </div>
    )
}