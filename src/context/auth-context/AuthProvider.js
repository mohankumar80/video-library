import { useState, useEffect } from "react";
import { AuthContext } from "./auth-context";
import { fakeAuthApiCall } from "../../fakeAuthApiCall";

export const AuthProvider = ({children}) => {
    const [userLoggedIn, setuserLoggedIn] = useState(false)

    useEffect(() => {
        const login = JSON.parse(localStorage?.getItem("login"))
        login && setuserLoggedIn(true)
    }, [])

    const loginUserWithCredentials = (username, password) => {
        return fakeAuthApiCall(username, password)
    }

    return <AuthContext.Provider value={{ userLoggedIn, setuserLoggedIn, loginUserWithCredentials }}>
        {children}
    </AuthContext.Provider>
}