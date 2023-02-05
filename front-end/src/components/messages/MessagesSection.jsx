import React, { useState } from 'react'
import {IoIosArrowBack,IoMdSend} from "react-icons/io";
import {BiDotsVerticalRounded} from "react-icons/bi"
import {AiFillLike} from "react-icons/ai"
export default function MessagesSection() {
    const [showDeletebutton,setshowDeleteButton]=useState(false)
    const [messageValue,setMessageValue]=useState("")
    const handleDeleteButton=()=>{
        setshowDeleteButton(!showDeletebutton)
    }
    const handleMessageValue=(e)=>{
        setMessageValue(e.target.value)
    }
  return (
    <div className="text-white hidden sm:block absolute w-2/3 top-0 bottom-0">
        <div className='w-full border border-transparent border-b-gray-800 pb-[18px] flex justify-between'>
            <div className='flex mt-5'>
                <IoIosArrowBack color='white' className='cursor-pointer mt-[2px] block ' size={25}/>
                {<p className='ml-2'>image</p>}
                {<p className='ml-3'>koussay</p>}
            </div>
            <div className='flex'>
            <button className={`text-black ${showDeletebutton? "block" : "hidden"} font-[600] text-sm bg-blue-600 rounded-b-lg rounded-l-lg py-1 mt-[18px] px-2`} >Delete Messages</button>
                <BiDotsVerticalRounded color='white' onClick={handleDeleteButton} className=' cursor-pointer mt-5' size={25}/>
            </div>
        </div>
        <div>
            <p className='text-white'>koussay</p>
        </div>
        <div className='flex absolute border border-transparent border-t-gray-800 pt-3 w-full justify-center bottom-0 mx-auto'>
            <div className='flex mb-3 w-full  '>
                <div className='bg-[#2c2c2c] ml-5 rounded-2xl w-[90%]'>
            <input type={"text"} value={messageValue} onChange={handleMessageValue} className=" w-[90%]  bg-transparent outline-none rounded-2xl pl-2 h-10 text-white" placeholder={"Message"}/></div><AiFillLike className={`${messageValue.length>0 ? "hidden" : "block mr-2 mt-[5px] ml-2"}`} color="#2596be" size={30}/><IoMdSend color="#2596be" className={`${messageValue.length>0 ? "block mr-2 mt-[5px] ml-2" : "hidden"}`} size={30}/>

            </div>
        </div>
    </div>
  )
  }