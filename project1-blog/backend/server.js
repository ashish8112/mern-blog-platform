require("dotenv").config();
const express = require("express");
const cors = require("cors")
const connectDB = require("./config/db")
const router = require("./routes/authRoutes")

const app=express();

app.use(express.json());
app.use(cors());
app.use("/api/auth",router);
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