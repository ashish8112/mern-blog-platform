import { createContext, useContext, useState } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export default function AuthProvider({children}){
        const [user,setUser] = useState(
            JSON.parse(localStorage.getItem("blogUser"))||null // if user refresh the page set user with localStorage to avoid login everytime after refresh
        );
        async function register ({username,name,email,password}){
            const {data} = await API.post("/auth/register",{username,name,email,password})
            return data; // good convention but we are not using it anywhere
        }
        async function login({email,password}){
            const {data} = await API.post("/auth/login",{email,password})
            localStorage.setItem("blogUser",JSON.stringify(data));
            setUser(data);
            return(data); // same as above 
        }
        async function logout (){
            localStorage.removeItem("blogUser");
            setUser(null);
        }
        return(
            <AuthContext.Provider value= {{user,login,logout,register}}>
            {children}
            </AuthContext.Provider>
        )
}

export function useAuth()
{
    return useContext(AuthContext);
}