import mongoose from "mongoose";


const messagesSchema=mongoose.Schema({
    nameCollec1:String,
    name:String,
    message:String
})
const arraySchema=mongoose.Schema({
    ArrayMessages:[messagesSchema]
})
export default arraySchema