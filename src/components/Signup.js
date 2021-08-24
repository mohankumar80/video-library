import axios from 'axios';
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../context/auth-context/useAuth';

export default function Signup() {
    const [formDetails, setformDetails] = useState({ username: "", password: "" })
    const { setuserLoggedIn } = useAuth();

    const { state } = useLocation();
    const navigate = useNavigate();

    const loginHandler = async e => {
        e.preventDefault();
        const { username, password } = formDetails;
        try {
            const response = await axios.post("https://backend-video-library.herokuapp.com/user/signup", {
                username, password
            })
            if(response.data.success) {
                setuserLoggedIn(true)
                navigate("/login",{ state })
            }
        } catch (error) {
            console.log("failed to login");
        }
    }

    const usernameHandler = e => {
        const username = e.target.value;
        setformDetails(data => {
            return {...data, username}
        })
    }

    const passwordHandler = e => {
        const password = e.target.value;
        setformDetails(data => {
            return {...data, password}
        })
    }

    return (
        <div className="Login">
            <div className="login-container">
                <form onSubmit={loginHandler} className="login-sub-container">
                    <input type="text" onChange={usernameHandler} className="input-styled login-inputs" placeholder="username" />
                    <input type="password" onChange={passwordHandler} className="input-styled login-inputs" placeholder="password" />
                    <button type="submit" className="btn btn-primary btn-login">
                        sign up
                    </button>
                </form>
                <div className="signup-container">
                    <Link to="/login" className="btn btn-secondary btn-signup text-align-center" state={state}>login</Link>
                </div>
            </div>
        </div>
    )
}
