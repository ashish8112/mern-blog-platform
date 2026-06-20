import {useState} from "react"
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
export default function Register(){
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        "username":"",
        "name":"",
        "email":"",
        "password":""
    })
    const {register} = useAuth();
    async function handleSubmit(e){
        e.preventDefault();
        if(!formData.email||!formData.password)
        {
            alert("Please Enter all filed");
            return;
        }
        try{
            await register(formData);
            navigate("/login");
        }
        catch(err){
            alert(err.response?.data?.message||"Registration Failed")
        }
            
    }
    function handleChange(e){
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    return(
       <form onSubmit={handleSubmit}>
       <label htmlFor="username">Enter the User Name </label>
       <br></br>
        <input 
            type="text"
            placeholder="username"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
        />
        <br></br>
        <label htmlFor="user-name">Enter the User Name </label>
       <br></br>
        <input 
            type="text"
            placeholder="Name"
            id="user-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
        />
        <br></br>
       <label htmlFor="user-email">Enter the Email</label>
       <br></br>
        <input 
            type="text"
            placeholder="email"
            id="user-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
        />
        <br></br>
        <label htmlFor="user-password">Enter the Password</label>
        <br></br>
        <input
            type="password"
            placeholder="passwod"
            id="user-password"
            name="password"
            value={formData.password}
            onChange={handleChange}
        />
        <br></br>
        <button type="submit">Submit</button>
       </form>
    )
}