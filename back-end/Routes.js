import express  from "express";
import {collecModel} from "./server.js"
import Pusher from "pusher";
export const routes=express.Router()

routes.post('/sendMesssage',(req,res)=>{
   collecModel.find({},(err,data)=>{
    if(err) res.status(500).send(err)
    else {
      const userArrayLength=data[0].ArrayMessages.length;
      console.log(userArrayLength)
      let messagesArrayfound=false
      for(let i=0;i<userArrayLength;i++){
        
        if(data[0].ArrayMessages[i].nameCollec1===req.body.nameCollec1){
          console.log("hey")
          collecModel.findByIdAndUpdate({nameCollec1:req.body.nameCollec1},{message:req.body.message},(err,data)=>{
            if(data) res.status(200).send(data)
            else console.log(err)
          })
          messagesArrayfound=true
        }
        else if(data[0].ArrayMessages[i].nameCollec1===req.body.nameCollec2){
          collecModel.findByIdAndUpdate({nameCollec1:req.body.nameCollec2},{message:req.body.message},(err,data)=>{
            if(data) res.status(200).send(data)
            else console.log(err)
          })
        }
        messagesArrayfound=true
      }
      if(!messagesArrayfound){
        collecModel.findByIdAndUpdate({nameCollec1:req.body.nameCollec1},{message:req.body.message},(err,data)=>{
          if(data) res.status(200).send(data)
          else console.log(err)
        })
      }
      }

   })
  })
