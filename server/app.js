const express=require("express");
const cors=require("cors")
const cookieParser=require("cookie-parser")
const app=express()



app.use(express.json())
app.use(cookieParser())
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const User=require("./models/userSchema")
dotenv.config({path:"./config.env"})

const PORT=process.env.PORT

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://mern-deploy-production-9a71.up.railway.app");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(cors({ credentials: true, origin:[ "http://localhost:3000","https://mern-deploy-production-9a71.up.railway.app"] }));
app.use(require("./route/auth"))


// mongoose connection
require("./db/conn") 


app.get("/home",(req,res)=>
{
    res.send("home");
})



app.listen(PORT,()=>
{
    console.log("listening at port"+PORT);
})