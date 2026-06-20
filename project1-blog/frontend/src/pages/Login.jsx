import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import {useNavigate} from "react-router-dom"

export default function Login(){
    const [formData,setFormData]= useState({
        email:"",
        password:""
    })
    const {login} = useAuth();
    const navigate = useNavigate();
    async function handleSubmit(e){
         e.preventDefault();
            if(!formData.email||!formData.password)
            {
                alert("Please Enter all field")
                return 
            }
        try{
            await login(formData);
            navigate("/")
        }
        catch(err){
            alert(err.response?.data?.message||"Login Failed")
        }
    }
    function handleChange(e){
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="user-email">Enter the email</label>
            <br></br>
            <input
            type="email"
            placeholder="abc@gmail.com"
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
            placeholder="password"
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