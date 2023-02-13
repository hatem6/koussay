import express  from "express";
import mongoose from "mongoose";
import {collecModel,collectionUsers} from "./server.js"
import Pusher from "pusher";
export const routes=express.Router()

routes.get('/sendMesssage',(req,res)=>{
  const zero="0"
   collecModel.find({},(err,data)=>{
    if(err) res.status(500).send(err)
    else res.status(200).send(data[0].ArrayMessages[0])
   })
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      const collections = mongoose.modelNames();
      console.log(collections);
      const exists = collections.includes('users');
      console.log(`Collection exists: ${exists}`);
    
      db.close();
    });

  })
