import { useState,useEffect } from "react";
import API from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
export default function PostDetail(){
    const [post,setPost] = useState(null);
    const [comments,setComment] = useState([]);
    const [commentText, setCommentText] = useState("");
    const {id} = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        async function fetchPostDetails(){
            try{
                const res = await API.get(`/posts/${id}`)
                setPost(res.data);
                const {data} = await API.get(`/comments/${id}`)
                setComment(data)
            }
            catch(err)
            {
                alert(err.response?.data?.message||"Unable to find Post");
            }
        }
        fetchPostDetails();
    },[])

    async function handleComment() {
  if (!commentText) return;
  try {
    const { data } = await API.post(`/comments/${id}`, { content: commentText });
    setComment([...comments, data]);
    setCommentText("");
  } catch (err) {
    alert(err.response?.data?.message || "Comment failed");
    navigate("/login");
  }
}

    async function handleLike(){
        try{
            const {data} = await API.post(`/posts/${id}/like`)
            setPost({...post,likes:data.likes})
        }
        catch(err){
            alert(err.response?.data?.message || "Like failed");
            navigate("/login")
        }
    }
    if(!post)
        return <p>loading...</p>
    return(
        <div className="post-detail">
            <div className="post">
                <label htmlFor="post">{post.title}</label>
                <br></br>
                <img src= {post.coverImage} height={200} width={200} />
                <p>{post.content}</p>
                <p>{post.summary}</p>
                <p>Author- {post.author.name}</p>
                <button onClick={handleLike}>Like {post.likes.length}</button>
            </div>
            <div className="comments">
                <label htmlFor="comments">comments</label>
                <br></br>
                {comments.map((comment)=>(
                    <div key={comment._id}>
                    <p>Name- {comment.author.name}</p>
                    <p>Comment- {comment.content}</p>
                     </div>
                ))}    
            </div>
            <input value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Write a comment..." />
            <button onClick={handleComment} id="commentButton">Comment</button>
        </div>
    )
}