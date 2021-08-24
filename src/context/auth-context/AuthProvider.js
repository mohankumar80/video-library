import { useState } from "react";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({children}) => {
    const [userLoggedIn, setuserLoggedIn] = useState();

    // useEffect(() => {
    //     const login = JSON.parse(localStorage?.getItem("login"))
    //     login && setuserLoggedIn(true)
    // }, [])

    return <AuthContext.Provider value={{ userLoggedIn, setuserLoggedIn }}>
        {children}
    </AuthContext.Provider>
}