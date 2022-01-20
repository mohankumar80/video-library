import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import useAuth from "../context/auth-context/useAuth";

export default function PrivateRoute({path, ...props}) {
    const { userLoggedIn } = useAuth();

    return userLoggedIn ? <Route path={path} {...props} /> : <Navigate replace to="/login" state={{ from: path }} />
}
