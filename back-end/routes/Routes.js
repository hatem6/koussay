const mongoose=require("mongoose")
const express=require("express")
const dotenv=require("dotenv")
const messageModel=require("./../models/MessagesSchema.js")
dotenv.config()


const router=express.Router()

const Pusher = require("pusher");

const pusher = new Pusher({
  appId:process.env.PUSHER_APP_ID,
  key:process.env.PUSHER_KEY,
  secret:process.env.PUSHER_SECRET,
  cluster: "eu",
  useTLS: true
});


const db=mongoose.connection;
db.once("open",()=>{
    console.log("db connected")
    const msgCollection=db.collection("Messages")
    const chnageStream=msgCollection.watch()
    chnageStream.on("change",(change)=>{
    if(change.operationType=="insert"){
        const messageDetail=change.fullDocument;
        pusher.trigger("messages","inserted",{
            _id:messageDetail._id,
            Collection1:messageDetail.Collection1,
            Collection2:messageDetail.Collection2,
            name:messageDetail.name,
            message:messageDetail.message
        })
    }
    else{
        console.log(err)
    }
})
})

//sending endpoint
router.post("/",(req,res)=>{
    messageModel.create(req.body,async(err,data)=>{
        res.status(201).send(data)
    })
})
router.get("/getdata",async(req,res)=>{
    try{
        const resultData=await messageModel.find()
        res.status(200).send(resultData)
    }catch(err){
        console.log(err)
    }
})
module.exports=router