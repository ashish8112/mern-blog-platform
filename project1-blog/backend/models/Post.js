const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: {type:String,required:true},
    content:{type:String,required:true},
    summary:{type:String,maxlength:300},
    coverImage:{type:String,default:"https://picsum.photos/200/200"},
    tags:[{type:String}],
    author:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    likes:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    status:{type:String,enum:["draft","published"],default:"published"},
    views:{type:Number,default:0}
},{timestamps:true})

const Post = mongoose.model("Post",postSchema);

module.exports = Post;