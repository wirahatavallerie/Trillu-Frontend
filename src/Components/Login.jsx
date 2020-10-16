import React, { useState } from 'react'
import Head from './Head'
import axios from 'axios'

const Login = () =>{
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    })
    const [registerData, setRegisterData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        confirm_password: ''
    })

    const login = () => {
        axios({
            method: 'post',
            url: 'http://localhost:8000/v1/auth/login',
            data: {
                username: loginData.username,
                password: loginData.password
            }
        })
        .then(res=>{
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('username', loginData.username)
            window.location.replace('/')
        })
        .catch(err=>{
            if(err.response.status === 401){
                alert(err.response.data.message)
            }
        })
    }

    const register = () => {
        axios({
            method: 'post',
            url: 'http://localhost:8000/v1/auth/register',
            data: {
                first_name: registerData.first_name,
                last_name: registerData.last_name,
                username: registerData.username,
                password: registerData.password
            }
        })
        .then(res=>{
            if(registerData.password === registerData.confirm_password){
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('username', loginData.username)
                window.location.replace('/')
            }else{
                alert('Password did not match')
            }
        })
        .catch(err=>{
            if(err.response.status === 401 || err.response.status === 422){
                alert(err.response.data.message)
            }
        })
    }

    const loginHandler = event => {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value
        })
    }

    const registerHandler = event => {
        setRegisterData({
            ...registerData,
            [event.target.name]: event.target.value
        })
    }
    return(
        <>
            <Head />
            <div className="form">
                <header>Login</header>
                    <input type="text" name="username" placeholder="Username" 
                        onChange={(event) => loginHandler(event)}/>
                    <input type="password" name="password" placeholder="Password" 
                        onChange={(event) => loginHandler(event)}/>
                    <input type="submit" value="Login" onClick={()=> login()} />
            </div>
            <div className="form">
                <header>Register</header>
                    <input type="text" name="first_name" placeholder="First Name"
                        onChange={(event) => registerHandler(event)}/>
                    <input type="text" name="last_name" placeholder="Last Name"
                        onChange={(event) => registerHandler(event)}/>
                    <input type="text" name="username" placeholder="Username"
                        onChange={(event) => registerHandler(event)}/>
                    <input type="password" name="password" placeholder="Password"
                        onChange={(event) => registerHandler(event)}/>
                    <input type="password" name="confirm_password" placeholder="Confirm Password"
                        onChange={(event) => registerHandler(event)}/>
                    <input type="submit" onClick={() => register()} value="Register" />
            </div>
        </>
    )
}

export default Login