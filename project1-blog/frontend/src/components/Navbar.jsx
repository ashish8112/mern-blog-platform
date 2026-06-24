import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function Navbar(){
    const {user,logout} = useAuth();
    const navigate = useNavigate();
    if(user)
    {
        return(
            <navbar>
            <img src="https://i.pinimg.com/736x/46/f7/95/46f79582fd13c8e87ad935f483899986.jpg" style={{height:"50px",width:"50px",borderRadius:"50%"}}></img>
            <button style={{padding:"10px 20px"}} onClick={()=>navigate("/create")}>Create Post</button>
            <button style={{padding:"10px 20px"}} onClick={async()=>await logout()}>Logout</button>
            </navbar>
        )
    }
    return(
        <navbar>
            <img src="https://i.pinimg.com/736x/46/f7/95/46f79582fd13c8e87ad935f483899986.jpg" style={{height:"50px",width:"50px",borderRadius:"50%"}}></img>
            <button style={{padding:"10px 20px"}} onClick={()=>navigate("/login")}>Create Post</button>
            <button style={{padding:"10px 20px"}} onClick={()=>navigate("/register")}>Create Post</button>
        </navbar>
    )
}