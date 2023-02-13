import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import modelUsers from "./usersSchema.js"
import MessagesSchema from "./MessagesSchema.js"
import { routes } from "./Routes.js"
import collecSchema from "./CollecSchema.js"
dotenv.config()
//app config
const app=express()
const port=process.env.PORT || 9000
const connectUrl=`mongodb+srv://admin:${process.env.PASSWORD}@cluster0.yde1grw.mongodb.net/messengerdb?retryWrites=true&w=majority`
//MiddleWares
app.use(express.json())
mongoose.set('strictQuery', true)
app.use(cors())
//db conifg 
mongoose.connect(connectUrl,{
    useNewUrlParser:true
})
// Api endpoints
app.use("/userMessagesData",routes)
app.post("/usersData",(req,res)=>{
    modelUsers.countDocuments({email:req.body.email},(err,count)=>{
        if(count==0){
            modelUsers.create(req.body,(err,data)=>{
                if(data) res.status(201).send(data)
                else res.status(404).send(err)
            })   
        }
        else{
            res.status(404).send(err)
        }

    })    
})
const collecModel=mongoose.model("KoussayRouissikoussayrouissi",collecSchema,"KoussayRouissikoussayrouissi")
app.post("/makeMessages/Collection",(req,res)=>{
    
        collecModel.create({nameColl:"ey"},(err,data)=>{
            if(data) res.status(201).send(data)
            else res.status(500).send(err)
        })
        collecModel.findOneAndDelete({nameColl:"ey"},(err,data)=>{
            if (err) res.status(500).send(err)
        })
    }
    )
app.get("/users",async(req,res)=>{
    try{
    const users=await modelUsers.find({})
    res.status(200).send(users)
    }
    catch(err){
        res.status(404).send(err)
    }
    
})
//Listeners
app.listen(port,()=>{console.log(`listening on port : ${port} `)})