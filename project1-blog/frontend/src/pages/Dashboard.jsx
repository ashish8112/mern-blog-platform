import { useState,useEffect } from "react";
import API from "../api/axios"
import { useNavigate } from "react-router-dom";

export default function  Dashboard(){
    const [posts,setPost] =  useState([])
    const navigate = useNavigate();
    useEffect(()=>{
        async function fetchPost(){
            try{
                 const {data} = await API.get("/posts/my/posts");
                 setPost(data);
            }
           catch(err)
           {
            alert(err.response?.data?.message||"Unable to fetch Dashboard")
           }
        }
        fetchPost();
    },[])
    async function handleClick(postId){
        try{
            const {data} = await API.post(`/posts/${postId}/like`);
            setPost(posts.map((p)=>(
                (p._id===postId)?{...p,likes:data.likes}:p
            )))
        }
        catch(err){
            alert(err.response?.data?.message|| "Like Failed!")
            navigate("/login");
        }
    }
    async function handleDelete(postId) {
        try {
            await API.delete(`/posts/${postId}`);
            setPost(posts.filter(p => p._id !== postId));
        } 
        catch (err) {
        alert(err.response?.data?.message || "Delete failed");
        return;
        }
}
    if(posts.length===0)
        return(
                <div>
                    <p>No Posts Yet</p>
                    <button onClick={()=>navigate("/create")} style={{margin:"10px 20px"}}>Create Your First Post</button>
                </div>
    )
    return(
        <div>
            {posts.map((post,index)=>(
                <div key={post._id} className="post-card">
                <h2>Post {index+1}</h2>
                <img src= {post.coverImage} height={200} width={200} />
                <p onClick={()=>navigate(`/post/${post._id}`)} style={{cursor:"pointer",color:"blue"}}>{post.title}</p>
                <p>{post.content}</p>
                <p>{post.summary}</p>
                <p>{post.author.name}</p>
                <button onClick={()=>handleClick(post._id)}>Like {post.likes.length}</button>
                <button style={{marginLeft:"70%"}}onClick={() => handleDelete(post._id)}>Delete</button>
                </div>
            ))}
        </div>
    )
}