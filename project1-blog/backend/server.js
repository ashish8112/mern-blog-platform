require("dotenv").config();
const express = require("express");
const cors = require("cors")
const connectDB = require("./config/db")
const authRouter = require("./routes/authRoutes")
const postRouter = require("./routes/postRoutes");
const commentRouter = require("./routes/commentRoute");
const app=express();

app.use(express.json());
app.use(cors({
    origin: "https://ashishblog.vercel.app"
}));
app.use("/api/auth",authRouter);
app.use("/api/posts",postRouter)
app.use("/api/comments/",commentRouter)
app.use((req,res)=>{
    return res.status(404).json({message:"Please Enter correct url"})
})

app.use((err,req,res,next)=>{
    console.error(err.message);
    return res.status(500).json({message:err.message})
})

connectDB();

app.listen(process.env.PORT,()=>{
    console.log("Server Started at port "+process.env.PORT);
})