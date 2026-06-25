const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    post:{type:mongoose.Schema.Types.ObjectId,ref:"Post"},
    author:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    content:{type:String,required:true}
},{timestamps:true})

const Comment = mongoose.model("Comment",commentSchema);

module.exports=Comment;
