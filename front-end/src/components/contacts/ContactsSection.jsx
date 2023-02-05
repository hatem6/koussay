import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { messangerContext } from '../../App'
import {BiDotsVerticalRounded} from "react-icons/bi"
import UserContact from './UserContact';
export default function MessagesSection(props) {
    const value=useContext(messangerContext)
    const [menu,setMenu]=useState(false)
    const handleMenu=()=>{
        setMenu(!menu)
    }
    const logOut=()=>{
        localStorage.clear()
        window.location.reload()
      }
  return (
    <div className='w-full overflow-y-scroll sm:w-1/3 border border-transparent absolute top-0 bottom-0 border-r-gray-800  '>
        <div className='flex border border-transparent border-b-gray-800 pb-3 justify-between '>
            <div className='flex mt-3'>
                <img src={require("./../../assets/messangerLogo.png")} alt={value[0].displayName} className="w-[40px] h-[40px]"/>
                <p className=' ml-2 mt-2 text-white'>{value[0].displayName}</p>
            </div>
            <div className='flex mt-3'>
                {menu&&<div className='mr-2'>
                <motion.div
                
                initial="hidden"
                whileInView={"visible"}
                viewport={{once:true,amount:0.5}}
                transition={{delay:0.4,duration:0.4}}
                variants={{
                    hidden:{opacity:0,x:30},
                    visible:{opacity:1,x:-5}
                }}
                >
                    <button onClick={logOut} className='text-black font-bold bg-blue-600 rounded-lg py-2 px-3 '>log out</button>
                </motion.div>
                </div>}
                <div className=''>
                <BiDotsVerticalRounded size={25} className="mt-2 cursor-pointer" onClick={handleMenu} color={"white"}/>
                </div>
            </div>
        </div>
        <div>
            {props.user.map(user=>{
                return(
                    <div key={user._id}>
                    {user.name!==value[0].displayName&&
                <UserContact name={user.name} if={user._id} pfp={user.image} />
                    }
                    </div>
                
                )
            })}
        </div>
    </div>
  )
}
