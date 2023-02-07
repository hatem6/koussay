import express  from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import messagesSchema from "./MessagesSchema.js";
export const routes=express.Router()
routes.post("/MessagesSend",(req,res)=>{
    const collectionName1=req.body.nameCollec1;
    const collectionName2=req.body.nameCollec2;
    const pusher = new Pusher({
        appId: "1547331",
        key: "0d8cf22564509b818c0d",
        secret: "e8c6b5d71553374171df",
        cluster: "eu",
        useTLS: true
      });
    const db=mongoose.connection;
    db.on("open",()=>{
        console.log(mongoose.connection.collections[collectionName1])
        if(!(mongoose.connection.collections[collectionName2])&&mongoose.connection.collections[collectionName1]){
            const MessagesModel=mongoose.model(collectionName1,messagesSchema)
            MessagesModel.create(req.body,(err,data)=>{
                if(data) res.status(201).send(data)
                
            })
        }
        else if(!(mongoose.connection.collections[collectionName1])&&mongoose.connection.collections[collectionName1]){
            const MessagesModel=mongoose.model(collectionName2,messagesSchema)
            MessagesModel.create(req.body,(err,data)=>{
                if(data) res.status(201).send(data)
                
            })
        }
        db.once("open",()=>{
            console.log("db connected");
            if(!(mongoose.connection.collections[collectionName1])){
                const messageColl=mongoose.Collection(collectionName1)            ;
                const stremChange=messageColl.watch()
                stremChange.on("change",(change)=>{
                    if(change.operationType==="insert"){
                        const messagesDetail=change.fullDocument;
                        pusher.trigger("messages","inserted",{
                            name:messagesDetail.name,
                            message:messagesDetail.message
                        })
                    }
                    else{
                        console.log(err)
                    }
                })
            }
            else if(!(mongoose.connection.collections[collectionName2])){
                const messageColl=mongoose.Collection(collectionName1);
                const stremChange=messageColl.watch()
                stremChange.on("change",(change)=>{
                    if(change.operationType==="insert"){
                        const messagesDetail=change.fullDocument;
                        pusher.trigger("messages","inserted",{
                            name:messagesDetail.name,
                            message:messagesDetail.message
                        })
                    }
                    else{
                        console.log(err)
                    }
                })
            }
        })

    })
    
})

