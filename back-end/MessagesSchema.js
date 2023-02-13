import mongoose from "mongoose";

const messageSchema=mongoose.Schema({
    name:String,
    message:String
})
const UsersMessagesPositionSchema=mongoose.Schema({
    nameCollec1:String,
    message:[messageSchema]
});
const arraySchema=mongoose.Schema({
    ArrayMessages:[UsersMessagesPositionSchema]
})
export default arraySchema