import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import Cards from './dbCards.js'
dotenv.config()
//app config
const app=express()
const port=process.env.PORT || 9000
const connectUrl=`mongodb+srv://admin:${process.env.PASSWORD}@cluster0.yde1grw.mongodb.net/database?retryWrites=true&w=majority`
//MiddleWares
app.use(express.json())
app.use(cors())
//db conifg 
mongoose.connect(connectUrl,{
    useNewUrlParser:true
})
const db=mongoose.connection
// Api endpoints
app.get("/data",async(req,res)=>{
    const Data=await Cards.find()
    res.status(200).send(Data)
})
//Listeners
app.listen(port,()=>{console.log(`listening on port : ${port} `)})