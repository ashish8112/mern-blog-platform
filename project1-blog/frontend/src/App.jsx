import { Route,Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute"
import CreatePost from "./pages/CreatePost";
import PostDetail from "./pages/PostDetail";
export default function App(){
  return(
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/create" element={<ProtectedRoute><CreatePost/></ProtectedRoute>}/>
        <Route path="/post/:id" element={<PostDetail></PostDetail>} />
    </Routes>
  )
}