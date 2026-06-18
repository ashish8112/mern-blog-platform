const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const authMiddleware = require("../middleware/authMiddleware")


router.post("/register",async(req,res)=>{
    try{
        const {name,username,email,password,bio} = req.body;
        const existingUser = await User.findOne({username})
            if(existingUser)
                return res.status(400).json({message:"User already registered"})
        const emailCheck = await User.findOne({email})
            if(emailCheck)
                return res.status(400).json({message:"Email Id already Registerd"})
        const hashedPassword = await bcrypt.hash(password,10);
        const user = new User({name,username,email,password:hashedPassword})
        await user.save();
        res.status(201).json({message:"User registerd Successfully "})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

router.post("/login",async(req,res)=>{
    try{
        const{email,password}=req.body;
    const userExists = await User.findOne({email});
        if(!userExists)
            return res.status(404).json({message:"Please Enter Correct Email"});
    const result = await bcrypt.compare(password,userExists.password)
        if(!result)
            return res.status(401).json({message:"Please Enter the Correct Password"})
    const token = jwt.sign({email,id:userExists._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})
    res.status(200).json({message:"welocme"+userExists.name,token,id:userExists._id})
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.get("/users",authMiddleware,async(req,res)=>{
    try{
        const users = await User.find({},{password:false});
        res.status(200).json(users);
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

router.get("/user/:id",async(req,res)=>{
    try{
        const Id = req.params.id;
        const user = await User.findById(Id,{password:false,createdAt:false});
        if(!user)
            return res.status(400).json({message:"User doesn't exist"})
        return res.status(200).json({user})
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
})

router.put("/user/:id",authMiddleware,async(req,res)=>{
    try{
        const Id= req.params.id;
        const {bio,avatar}=req.body;
        if(Id!=req.user.id)
            return res.status(403).json({message:"Not authorized"});
        if(!bio&&!avatar)
            return res.status(400).json({message:"Nothing to updatge"});
        const updateData = {}
        if(bio) updateData.bio=bio;
        if(avatar) updateData.avatar=avatar;
        const updatedUser = await User.findByIdAndUpdate(Id,updateData,{new:true}).select("-password")
        const changes = [];
        if(bio) changes.push("bio");
        if(avatar) changes.push("avatar");
        return res.status(200).json({message:`updated:${changes.join(", ")}`,updatedUser})
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
})
router.delete("/user/:id",authMiddleware,async(req,res)=>{
    try{
        const Id = req.params.id;
        if(Id!=req.user.id)
            return res.status(403).json({message:"Not authorized"});
        const deletedUser = await User.findByIdAndDelete(Id);
        return res.status(200).json({message:"User deleted",deletedUser})
    }
    catch (err){
        return res.status(500).json({message:err.message})
    }
})
module.exports=router;