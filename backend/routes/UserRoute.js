const express=require("express");
const router=express.Router();
const {signupUser,loginUser}=require("../controlers/UserControler")

 router.post("/signup",signupUser)
 router.post("/login",loginUser)

module.exports=router;