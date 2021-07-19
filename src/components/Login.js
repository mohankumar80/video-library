import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../context/auth-context/useAuth';

export default function Login() {
    const [formDetails, setformDetails] = useState({ usernam: "", password: "" })
    const { setuserLoggedIn, loginUserWithCredentials } = useAuth();

    const { state } = useLocation();
    const navigate = useNavigate();

    const loginHandler = async e => {
        e.preventDefault();
        const { username, password } = formDetails;
        const response = await loginUserWithCredentials(username, password);
        if(response.success) {
            setuserLoggedIn(true)
            navigate(state?.from ? state.from : "/history")
            localStorage?.setItem("login", JSON.stringify({ isUserLoggedIn: true }))
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
                        login
                    </button>
                </form>
                <div className="signup-container">
                    <button className="btn btn-secondary btn-signup text-align-center">Sign Up</button>
                </div>
            </div>
        </div>
    )
}
