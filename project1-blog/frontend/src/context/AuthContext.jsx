import { createContext, useContext, useState } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export default function AuthProvider({children}){
        const [user,setUser] = useState(
            JSON.parse(localStorage.getItem("blogUser"))||null
        );
        async function register ({username,name,email,password}){
            const {data} = await API.post("/auth/register",{username,name,email,password})
            return data;
        }
        async function login({email,password}){
            const {data} = await API.post("/auth/login",{email,password})
            localStorage.setItem("blogUser",JSON.stringify(data));
            setUser(data);
            return(data);
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