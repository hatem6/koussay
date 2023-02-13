import express  from "express";
import mongoose from "mongoose";
import {collecModel,collectionUsers} from "./server.js"
import Pusher from "pusher";
import messagesSchema from "./MessagesSchema.js";
export const routes=express.Router()
routes.post('/sendMesssage',(req,res)=>{


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
