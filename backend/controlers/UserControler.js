const userModel=require("../models/Usermodel");
const bcrypt=require("bcrypt");
const generateToken = require("../utils/GenerateToken");

const signupUser=async(req,res)=>{
    try{
        let {name,email,password} = req.body;
        if(!email||!password||!name){
        return res.status(400).json({message:"all fields are required"});
        }

        const user=await userModel.findOne({email:email});
        if(user){
             return res.status(400).json({message:"User already exist"});
        }

        const salt=await bcrypt.genSalt(10);
        const hash=await bcrypt.hash(password,salt)
        const newUser=await userModel.create({
                name,
                email:email.toLowerCase(),
                password:hash
            })
        const token=generateToken(newUser);
         return res.status(201).json({token:token,user:newUser})
    }catch(err){
         res.status(500).json({message:`error in signup, ${err.message}`})
    }
}

const loginUser=async(req,res)=>{
    try{
       let {email,password}=req.body;
     if(!email||!password){
        return res.status(400).json({message:"all fields are required"});
        }

    const user=await userModel.findOne({email});
    if(!user){
        return res.status(404).json({message:"user doesnot exist"});
    }
    
    const match=await bcrypt.compare(password,user.password);
    if(match){
        const token=generateToken(user);
        return res.status(200).json({token:token,user:user})
    }else{
        return res.status(401).json({message:"wrong password"});
    }
    }catch(err){
         res.status(500).json({message:`error in login, ${err.message}`})
    }
}


module.exports={signupUser,loginUser}