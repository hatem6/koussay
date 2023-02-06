import React, { useContext, useEffect, useState } from 'react'
import {IoIosArrowBack,IoMdSend} from "react-icons/io";
import {BiDotsVerticalRounded} from "react-icons/bi"
import {AiFillLike} from "react-icons/ai"
import { messagesContext, showMessageSectionContext } from '../Home';
import { messangerContext } from '../../App';
import Pusher from "pusher-js"
import axios from 'axios';
export default function MessagesSection() {
    const [showMessageSection,setShowMessageSection]=useContext(showMessageSectionContext)
    // the cuurent user data
    const value=useContext(messangerContext)
    // delete button 
    const [showDeletebutton,setshowDeleteButton]=useState(false)
    // the messages from db will be stored in this array
    const [usersMessages,setUsersMessages]=useState([])
    // the two users of the current conversation 
    const [theTwoMessageUsers,setTheTwoMessageUsers]=useContext(messagesContext)
    useEffect(()=>{
        // gets the messages from the db
        var pusher = new Pusher('0d8cf22564509b818c0d', {
            cluster: 'eu'
          });
      
          var channel = pusher.subscribe('messages');
          channel.bind('inserted', function(data) {
            setUsersMessages([...usersMessages,data])
            
          });
          return ()=>{
            channel.unbind_all();
            channel.unsubscribe()
          }
    },[usersMessages])
    //gets the previous messages from db
    useEffect(()=>{
        const handlemsgs=async()=>{
            try{
                axios.post("http://localhost:9000/getCollecName",{collec1:theTwoMessageUsers[0],collec2:theTwoMessageUsers[1]})
                console.log(theTwoMessageUsers[0])
                const res=await axios.get("http://localhost:9000/msgs")
                setUsersMessages(res.data)
            }catch(err){
                console.log(err)
            }
        }
        handlemsgs()
    },[])
    //show or not the messages section
    const handleMessagesShowSection=()=>{
        setShowMessageSection(false)
    }
    // the message value
    const [messageValue,setMessageValue]=useState("")
    // handles the apperance of the delete conversation button
    const handleDeleteButton=()=>{
        setshowDeleteButton(!showDeletebutton)
    }
    // gets the input value
    const handleMessageValue=(e)=>{
        setMessageValue(e.target.value)
    }
    //this function sends the message
    const handleSendingMsg=()=>{
        console.log(messageValue)
        axios.post("http://localhost:9000/userMessagesData/MessagesSend",{nameCollec1:(theTwoMessageUsers[0]).replace(/\s+/g,""),nameCollec2:(theTwoMessageUsers[1]).replace(/\s+/g,""),name:value[0].displayName,message:messageValue})
        setMessageValue("")
    }
  return (
    <div className="text-white hidden sm:block absolute w-2/3 top-0 bottom-0">
        <div className='w-full border border-transparent border-b-gray-800 pb-[18px] flex justify-between'>
            <div className='flex mt-5'>
                <IoIosArrowBack onClick={handleMessagesShowSection} color='white' className='cursor-pointer mt-[2px] block ' size={25}/>
                {<p className='ml-2'>image</p>}
                {<p className='ml-3'>koussay</p>}
            </div>
            <div className='flex'>
            <button className={`text-black ${showDeletebutton? "block" : "hidden"} font-[600] text-sm bg-blue-600 rounded-b-lg rounded-l-lg py-1 mt-[18px] px-2`} >Delete Messages</button>
                <BiDotsVerticalRounded color='white' onClick={handleDeleteButton} className=' cursor-pointer mt-5' size={25}/>
            </div>
        </div>
        <div className='overflow-y-scroll absolute top-[66px] w-full bottom-16'>
            <p className='text-white'>koussay</p>
        </div>
        <div className='flex absolute border border-transparent border-t-gray-800 pt-3 w-full justify-center bottom-0 mx-auto'>
            <div className='flex mb-3 w-full  '>
                <div className='bg-[#2c2c2c] ml-5 rounded-2xl w-[90%]'>
            <input type={"text"} value={messageValue} onChange={handleMessageValue} className=" w-[90%]  bg-transparent outline-none rounded-2xl pl-3 h-10 text-white" placeholder={"Message"}/></div><AiFillLike className={`${messageValue.length>0 ? "hidden" : "block mr-2 cursor-pointer mt-[5px] ml-2"}`} color="#2596be" size={30}/><IoMdSend onClick={handleSendingMsg} color="#2596be" className={`${messageValue.length>0 ? "block cursor-pointer mr-2 mt-[5px] ml-2" : "hidden"}`} size={30}/>

            </div>
        </div>
    </div>
  )
  }