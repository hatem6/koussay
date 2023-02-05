import express  from "express";
import mongoose from "mongoose";
import MessagesModel from "./MessagesSchema.js";
routes=express.Router()


routes.post("/collectionName",(req,res)=>{
    const collectionName=req.body.nameCollec;
    if(!(mongoose.connection.collections[collectionName])){
        MessagesModel.create()
    }
})
