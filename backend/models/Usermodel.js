const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name :{
        type:String,
        required:true,
        minlength:3

    },
    email:{
        type : String,
        required : true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required :true
    }
},{timestamps:true})




module.exports=mongoose.model("user",userSchema);