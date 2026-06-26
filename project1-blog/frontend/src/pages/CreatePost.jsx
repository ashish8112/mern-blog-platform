import { useState } from "react";
import API from "../api/axios";
import {useNavigate} from "react-router-dom"
export default function CreatePost(){
    const navigate = useNavigate();
    const [postData,setPostData] = useState({
        title:"",
        content:"",
        summary:"",
        coverImage:"",
        tags:"",
        status:""
    })
    function handleChange(e)
    {
        setPostData({...postData,[e.target.name]:e.target.value})
    }
    async function handleSubmit(e){
        e.preventDefault();
         const extractedTags = postData.content.match(/#\w+/g)?.map(tag => tag.slice(1)) || [];
        if(!postData.title||!postData.content||!postData.summary)
        {
            alert("Please Enter all filed")
            return;
        }
        try{
        const status = e.target.name === "post" ? "published":"draft"
        await API.post("/posts/",{...postData,status, tags:postData.tags.split(",").map(t=>t.trim())})
        alert(status);
        navigate("/");
        }
        catch(err)
        {
            alert(err.response?.data?.message||"Failed To Draft or Published")
        }
    }
    return(
        <form >
        <label htmlFor="title">Enter Your Title</label>
        <br></br>
        <input type="text" id="title" name="title" value={postData.title} onChange={handleChange}></input>
        <br></br>
        <label htmlFor="content">Write Something About Post.</label>
        <br></br>
        <textarea id="content" name="content" rows="6" cols="50" value={postData.content} onChange={handleChange}></textarea>
        <br></br>
        <label htmlFor="summary">Summary.</label>
        <br></br>
        <textarea id="summary" name="summary" rows="3" cols="30" value={postData.summary} onChange={handleChange}></textarea>
        <br></br>
        <label htmlFor="coverImage">Add CoverImage Link</label>
        <br></br>
        <input type="text" id="coverImage" name="coverImage" value={postData.coverImage} onChange={handleChange}></input>
        <br></br>
        <button type="button" name="post" onClick={handleSubmit}>Post</button>
        <button type="button" name="draft" onClick={handleSubmit}>Draft</button>
        </form>
    )
}
