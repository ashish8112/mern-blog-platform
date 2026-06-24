import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function Navbar(){
    const {user,logout} = useAuth();
    const navigate = useNavigate();
    if(user)
    {
        return(
            <nav style={{margin:"10px 30px",display:"flex",justifyContent:"space-between"}}>
            <img src="https://i.pinimg.com/736x/46/f7/95/46f79582fd13c8e87ad935f483899986.jpg" style={{height:"50px",width:"50px",borderRadius:"50%"}}></img>
            <div>
            <button style={{padding:"10px 20px",cursor:"pointer"}} onClick={()=>navigate("/create")}>Create Post</button>
            <button style={{padding:"10px 20px",cursor:"pointer"}} onClick={()=>logout()}>Logout</button>
            </div>
            </nav>
        )
    }
    return(
        <nav style={{margin:"10px 30px",display:"flex",justifyContent:"space-between"}}>
            <img src="https://i.pinimg.com/736x/46/f7/95/46f79582fd13c8e87ad935f483899986.jpg" style={{height:"50px",width:"50px",borderRadius:"50%"}}></img>
            <div>
            <button style={{padding:"10px 20px",cursor:"pointer"}} onClick={()=>navigate("/login")}>Login</button>
            <button style={{padding:"10px 20px",cursor:"pointer"}} onClick={()=>navigate("/register")}>Register</button>
            </div>
        </nav>
    )
}