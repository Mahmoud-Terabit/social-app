import React from 'react'
import { Navigate } from 'react-router-dom'

export default function PublicRoute(props) {
    if(localStorage.getItem("userToken") !== null){
        return <Navigate to={"/"} />
    }
    else {
        return props.children
    }
}
