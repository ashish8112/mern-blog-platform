const express = require("express");
const router = express.Router();
const Post = require("../models/Post")
const authMiddleware = require("../middleware/authMiddleware")

router.get("/",async(req,res)=>{
    try{
        const posts = await Post.find({});
        res.status(200).json(posts);
    }
    catch(err)
    {
         return res.status(500).json({message:err.message})
    }
})

router.post("/",authMiddleware,async(req,res)=>{
    try{
        const {title,content,summary,coverImage,tags,status} = req.body;
        const post = new Post({title,content,summary,coverImage,tags,author:req.user.id,status})
        await post.save();
        return res.status(201).json({message:"Post "+status+" post id= "+post._id})
    }
    catch(err)
    {
        return res.status(500).json({message:err.message})
    }   
})
router.get("/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        const post = await Post.findById(id);
        if(!post)
            return res.status(404).json({message:"Post doesn't exists"})
        res.status(200).json(post);
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
})

router.put("/:id",authMiddleware,async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post)
            return res.status(404).json({ message: "Post not found" });
        if(post.author.toString()!=req.user.id)
            return res.status(403).json({message:"Unauthorized "})
        const {title, content, summary, coverImage, tags, status} = req.body
        const updateData = {};
        if(title)updateData.title=title;
        if(content)updateData.content=content;
        if(summary)updateData.summary=summary;
        if(coverImage)updateData.coverImage=coverImage;
        if(tags)updateData.tags=tags;
        if(status)updateData.status=status;
        if(Object.keys(updateData).length===0)
            return res.status(400).json({message:"Nothing to update"})
        const updatePost = await Post.findByIdAndUpdate(post._id,updateData,{new:true})
        res.status(200).json({message:"Updated",updatePost})
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
})

router.delete("/:id",authMiddleware,async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post)
            return res.status(404).json({message:"Post not found"})
        if(post.author.toString()!=req.user.id)
            return res.status(403).json({message:"Unauthorized"})
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Post Deleted",deletedPost})
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
})

router.post("/:id/like",authMiddleware,async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post)
            return res.status(404).json({message:"Post not found"})
        let updatedPost;
        const alreadyLiked = post.likes.some((id)=>(id.toString()===req.user.id))
        if(alreadyLiked)
        {
            updatedPost = await Post.findByIdAndUpdate(req.params.id,{$pull:{likes:req.user.id}},{new:true})//Magic Array not vanilla
        }
        else{
            updatedPost = await Post.findByIdAndUpdate(req.params.id,{$addToSet:{likes:req.user.id}},{new:true})
        }
        res.status(200).json({message:"Done"})
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
})  

module.exports=router;