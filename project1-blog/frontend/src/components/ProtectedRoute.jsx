import {jwtDecode} from "jwt-decode"
import {Navigate} from "react-router-dom"
import { useAuth } from "../context/AuthContext";
export default function ProtectedRoute({children}){
    const {user} = useAuth();
    if(!user)
        return <Navigate to="/login" replace/>
    try{
        const decode = jwtDecode(user.token) // btw this is unnecessary as our backend is validating token
    }
    catch(err)
    {
        alert(err.message);
        return <Navigate to="/login" replace/>
    }
    return children;
}