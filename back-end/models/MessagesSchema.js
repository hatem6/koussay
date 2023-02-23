const mongoose=require("mongoose")

const messageSchema=mongoose.Schema({
    Collection1:String,
    Collection2:String,
    name:String,
    message:String
})

const messageModel=mongoose.model("Messages",messageSchema,"Messages")
module.exports=messageModel
