const jwt =require('jsonwebtoken');

const authMiddleware=(req,res,next)=>{
    try{
      const authHeader=req.headers.authorization;
      if(!authHeader){
        return res.status(400).json({message:"no token provided"});
      }

      const token=authHeader.split(" ")[1];
      if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
      }

      const decode=jwt.verify(token,process.env.SECRET_KEY);
      req.user=decode;

     next();
    }catch(err){

    }
}

module.exports={authMiddleware}