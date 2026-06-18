const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{type:String,required:true },
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true,lowercase:true},
    password:{type:String,required:true,minlength:8},
    avatar:{type:String,default:"https://api.dicebear.com/7.x/avataaars/svg?seed=default"},
    bio:{type:String,default:""},
    role:{type:String,enum:["user","author","admin"],default:"author"},
    followers:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}], // array because it will store many array 
    following:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}]
},{timestamps:true});

const User = mongoose.model("User",userSchema);

module.exports = User;
