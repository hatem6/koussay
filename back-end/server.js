import express from "express"
import mongoose, { mongo } from "mongoose"
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
app.use(cors())
//db conifg 
mongoose.connect(connectUrl,{
    useNewUrlParser:true
})
// Api endpoints
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
app.post("/makeMessages/Collection",(req,res)=>{
    const collecModel=mongoose.model(req.body.nameColl,collecSchema,req.body.nameColl)
    if(!(mongoose.connection.collections[req.body.nameCollec1])){
        collecModel.create({nameCollec1:"ey"},(err,data)=>{
            if(data) res.status(201).send(data)
            else res.status(500).send(err)
        })
    }
    })
app.use("/userMessagesData",routes);
const collecNameSet="";
app.post("/getCollecName",(req,res)=>{
    if(mongoose.connection.collections[req.body.collec1]){
        collecNameSet=req.body.collec1;
    }
    else if(mongoose.connection.collections[req.body.collec2]){
        collecNameSet=req.body.collec2;
    } 
})
console.log(collecNameSet)
app.get("/msgs",async(req,res)=>{
    const msgsmodel=mongoose.model(collecNameSet,MessagesSchema,collecNameSet);
    try{
        const msgs=msgsmodel.find({})
    res.status(200).send(msgs)
    }
    catch(err){
        console.log(err);
    }
    
})
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