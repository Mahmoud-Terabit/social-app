import { createContext, useEffect, useState } from "react";




export let UserContext = createContext()


export default function UserContextProvider(props){


    // useEffect(()=>{
    //     if(localStorage.getItem("userToken")) {
    //         setToken(localStorage.getItem("userToken"))
    //     }
    // })



    const [token, setToken] = useState(localStorage.getItem("userToken") || null)
    
    
    return <UserContext.Provider value={{token, setToken}}>
        {props.children}
    
    </UserContext.Provider>

}



