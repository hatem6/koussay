import mongoose from "mongoose";


const messagesSchema=mongoose.Schema({
    name:String,
    message:String
})
const MessagesModel=mongoose.model("",messagesSchema,"")
export default MessagesModel