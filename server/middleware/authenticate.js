const jwt=require("jsonwebtoken")
const User=require("../models/userSchema")
const authenticate=async (req,res,next)=>
{   
    try{
            
    console.log("hello from middleware")
    const token=req.cookies.hello
    console.log(token)
    const verifyToken=jwt.verify(token,process.env.SECRET_KEY)
    
    const rootUser=await User.findOne({_id:verifyToken._id,"tokens.token":token})
    if(!rootUser)
    {
        throw new Error("User not found ")
    }
        req.token=token
        req.rootUser=rootUser
        req.userID=rootUser._id
    
    next()
    }catch(e)
    {
        console.log(e)
        res.status(401).send("Unauthroized:No token provided");
        
        
    }

}   
module.exports = authenticate