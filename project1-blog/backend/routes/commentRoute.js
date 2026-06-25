const Comment = require("../models/Comment")
const Post = require("../models/Post")
const express = require("express")
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get("/:id",async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post)
            return res.status(404).json({message:"Post not found"})
        const comments = await Comment.find({post:req.params.id}).populate("author", "name username") // it return [] in case of empty not null so  !comment will always true
        if(comments.length===0)
            return res.status(404).json({message:"Not comments"})
        return res.status(200).json(comments);
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
})

router.post("/:id",authMiddleware,async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post)
            return res.status(404).json({message:"Post not found"})
        const {content} = req.body;
        if(!content)
            return res.status(400).json({message:"Nohing to post"})
        const comment = new Comment({post:req.params.id,author:req.user.id,content})
        await comment.save();
        res.status(201).json(comment);
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
})

router.delete("/:id",authMiddleware,async(req,res)=>{
    try{
        const comment = await Comment.findById(req.params.id);
        if(!comment)
            return res.status(404).json({message:"Comment not found"})
        if(comment.author.toString()!=req.user.id)
            return res.status(403).json({message:"Not Authorized"});
        const deleteComment = await Comment.findByIdAndDelete(req.params.id)
        return res.status(200).json({message:"Comment Deleted",deleteComment})
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
})

module.exports=router;
