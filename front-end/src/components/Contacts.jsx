import React, { useEffect, useState } from 'react'
import {HiDotsVertical} from 'react-icons/hi'
export default function Contacts(props) {
    const [screen,setScreen]=useState(false)
    window.addEventListener("resize",function(){
        if(window.innerWidth<600){
            setScreen(true)
        }
        else{
            setScreen(false)
        }
    })
    useEffect(()=>{
        if(window.innerWidth<600){
            setScreen(true)
        }
        else{
            setScreen(false)
        }
    },[])
  return (
    <div className={screen?"text-white h-full w-full mt-2  overflow-y-scroll " : "text-white h-full  relative mt-2  w-[500px] overflow-y-scroll "}>
        <div className='flex fixed top-1 justify-between mx-2'>
        <div className='flex '>
        <img src={props.user[0].photoURL} alt={props.user[0].displayName} className="rounded-full w-[45px] h-[45px] "  />
        <p className='ml-2 mt-2'>{props.user[0].displayName}</p>
        </div>
        <HiDotsVertical color="white" className="mt-2 absolute right-0 cursor-pointer" size={25}/>
        </div>
        <div>
            
        </div>
        </div>
  )
}
