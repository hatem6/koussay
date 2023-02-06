import mongoose from "mongoose"
const usersSchema=mongoose.Schema({
    name:String,
    pfp:String,
    email:String
})
const modelUsers=mongoose.model("users",usersSchema,"users")
export default modelUsers

