import { useState,useEffect } from "react";
import API from "../api/axios";
import { useParams } from "react-router-dom";
export default function PostDetail(){
    const [post,setPost] = useState({});
    const [comments,setComment] = useState([]);
    const postId = useParams();
    useEffect(()=>{
        async function fetchPostDetails(){
            try{
                const post = await API.get(`/posts/${postId}`)
                setPosts(posts.data);
                const comments = await API.get(`/comments/${postId}`)
                setComments(comments.data)
            }
            catch(err)
            {
                alert(err.response?.data?.message||"Unable to find Post");
            }
        }
        fetchPostDetails();
    },[])
    return(
        <div className="post-detail">
        <div className="post">
        <label htmlFor="post">{post.title}</label>
        <br></br>
        <img src= {post.coverImage} height={200} width={200} />
        <p>{post.content}</p>
        <p>{post.summary}</p>
        <p>{post.author}</p>
        <p>{post.likes.length}</p>
        </div>
        <div className="comments">
        <label htmlFor="comments">comments</label>
        <br></br>
        {comments.map((comment)=>(
            <div key={comment._id}>
            <p>Name- {comment.author}</p>
            <p>{comment.content}</p>
            </div>
        ))}    
        </div>
        </div>
        
    )
}