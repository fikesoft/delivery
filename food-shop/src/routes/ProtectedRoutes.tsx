import { JSX } from "react"
import { Outlet, Navigate } from "react-router-dom"

const ProtectedRoutes = ():JSX.Element => {
    //Logic of the auth 
    const isAuthenticated = false

    return isAuthenticated ? <Outlet/> : <Navigate to="/login" replace/>
}

export default ProtectedRoutes