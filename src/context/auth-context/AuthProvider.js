import { useState } from "react";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({children}) => {
    const [userLoggedIn, setuserLoggedIn] = useState();

    return <AuthContext.Provider value={{ userLoggedIn, setuserLoggedIn }}>
        {children}
    </AuthContext.Provider>
}