import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../context/auth-context/useAuth';

export default function Login() {
    const [formDetails, setformDetails] = useState({ username: "", password: "" })
    const { setuserLoggedIn } = useAuth();

    const { state } = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
        const userLogin = JSON.parse(localStorage?.getItem("userLogin"))
        if(userLogin) {
            setuserLoggedIn(userLogin.user)
            navigate(state?.from ? state.from : "/")
        }
    }, [setuserLoggedIn, state, navigate])

    const loginHandler = async e => {
        e.preventDefault();
        const { username, password } = formDetails;
        try {
            const response = await axios.post("https://backend-video-library.herokuapp.com/user/login", {
                username, password
            })
            if(response.data.success) {
                setuserLoggedIn(response.data.user);
                localStorage?.setItem("userLogin", JSON.stringify({ user: response.data.user }))
                navigate(state?.from ? state.from : "/login")
                toast.success("Login Successfull", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
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
                        login
                    </button>
                </form>
                <div className="signup-container">
                    <Link to="/signup" className="btn btn-secondary btn-signup text-align-center" state={state}>Sign Up</Link>
                </div>
            </div>
        </div>
    )
}
