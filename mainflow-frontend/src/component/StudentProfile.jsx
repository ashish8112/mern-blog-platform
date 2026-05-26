import {useState} from 'react'
export default function StudentProfile({name,branch,college})
{
    const [btn , togglebtn]=useState(false)
    return (
        <div className='profile'>
        <p>Name: {name}</p>
        <br/>
        <p>Branch: {branch}</p>
        <br/>
        <p>College: {college}</p>
        {btn?<button onClick={()=>togglebtn(false)}>Followed</button> :<button onClick={()=>togglebtn(true)}>Follow</button>}
        </div>
    )   
}