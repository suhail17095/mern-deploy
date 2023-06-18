const mongoose=require("mongoose")
const messageSchema=mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    message:String
})

messageSchema.methods.storeData=async function(name,email,phone,message)
{
    try{
    const m=new messageSchema({name,email,phone,message})
    await m.save()
    return m
    }
    catch(e)
    {
        console.log(e)
    }
}

const Message=mongoose.model("Message",messageSchema);
module.exports=Message