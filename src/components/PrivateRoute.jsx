import React from 'react'
import { Navigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";

const PrivateRoute = ({ children }) => {
    const [{ user }] = useStateValue();
    

 
    if (!user) {
        return <Navigate to="/" />
    }
    return children
}
export default PrivateRoute