const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")


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

module.exports=router;