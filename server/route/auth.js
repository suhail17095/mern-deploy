const express=require("express")
const router=express.Router()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
// const authenticate=require("../middleware/authenticate.js")



const User=require("../models/userSchema")
const Message=require("../models/messageSchema")
const e = require("express")


const authenticate=async(req,res,next)=>
{
    try{
            
        console.log("hello from middleware")
        const token=req.cookies.hello
        const verifyToken=jwt.verify(token,process.env.SECRET_KEY)
        
        const rootUser=await User.findOne({_id:verifyToken._id,"tokens.token":token})
        console.log("rootUser")
        console.log(rootUser)
        if(!rootUser)
        {
            throw new Error("User not found ")
        }
            res.token=token
            res.rootUser=rootUser
            res.userID=rootUser._id
        
        next()
        }catch(e)
        {
            console.log(e)
            res.status(401).send("Unauthroized:No token provided");
            
            
        }
    
}
router.get("/",(req,res)=>
{
    
    res.send("hello");
})
let token;
router.post("/register",(req,res)=>
{
    console.log("hello world   ")
    const {name,email,phone,work,password,cpassword}=req.body
    console.log(req.body);
    

    if(name && email && phone && work && password && cpassword)
    {

    User.findOne({email:email}).then((userExist)=>
    {
        if(userExist)
        {
            res.send("User with same email already exists");
        }
        else{
            const user=new User({name,email,phone,work,password,cpassword})
            user.save().then(()=>
            {
                res.send("User registered successfullly");
            }).catch(()=>
            {
                res.send("User failed to registered");
            })
        }
    })
    }
    else{
        res.send("Fill the data correctly");
    }

})

router.post("/login",async(req,res)=>
{
    const {email,password}=req.body
    if(email && password)
    {
        User.findOne({email:email}).then(async(userExist)=>
        {
            if(userExist)
            {
                const isMatch=await bcrypt.compare(password,userExist.password);
                console.log(isMatch); 
                
                if(isMatch)
                {
                    token=await userExist.generateAuthToken()
                    console.log(token)
                    res.cookie("hello",token,{
                        maxAge: 1000 * 60 * 15, // would expire after 15 minutes
                        httpOnly: true, // The cookie only accessible by the web server                        
                    });
                    
                    // res.cookie("hello","world")
                    res.send("login successfull");
                }
                else{
                    // res.status(400)
                    res.send("Invalid Credentials");
                }

            }
            else{
                // res.status(400)
                res.send("Invalid Credentials");
            }
        }).catch((err)=>
        {
            console.log(err)
            res.send(err);
        })
    }
    else{
        // res.status(400)
        res.send("Invalid Credentials");
    }
})

router.get("/contact",authenticate,(req,res)=>
{
    res.send(req.rootUser)
})

router.post("/about",authenticate,(req,res)=>
{
    console.log("hello from about page")
    console.log(req.cookies)
    res.send(res.rootUser)
})

router.post("/submit_message",async(req,res)=>
{
   
//     try{
//     const {name,email,phone,message}=req.body
//     Message.findOne({email:email}).then((user)=>
//     {   
//         if(user)
//         {
//             user.storeData(name,email,phone,message)
//             res.send("Message send successfully")
//         }
//         else{
//             res.status(401).send("User doesnot exist")
//         }
//     }).catch((e)=>
//     {
//         console.log("err1")
//         console.log(e);
//         res.status(401).send("error")
//     })
// }catch(err)
// {
//     console.log("err2")
//     console.log(err)
//     res.status(401).send("error")
// }
try{
    const {name,email,phone,message}=req.body
    const m=new Message({name,email,phone,message})
    await m.save()
    res.send("Message send succesfully")
}catch(err)
{

    console.log(err)
}


})

router.get("/home",authenticate,async(req,res)=>
{
    res.send(res.rootUser)
})
router.get("/logout",async(req,res)=>{
    res.clearCookie("hello",{ path:"/"})
    res.status(200).send("logout sucessfully");
})

module.exports=router