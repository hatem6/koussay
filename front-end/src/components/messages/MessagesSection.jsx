import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { messangerContext } from '../../App'
import {BiDotsVerticalRounded} from "react-icons/bi"
export default function MessagesSection() {
    const value=useContext(messangerContext)
    const [menu,setMenu]=useState(false)
    const [users,setUsers]=useState([])
    useEffect(()=>{
        const handleUsersapi= async ()=>{
            try{
                const responseUsers=await axios.get("http://localhost:9000/users")
                setUsers(responseUsers.data)
            }catch(err){
                console.log(err)
            }
        }
        handleUsersapi()
    },[])
    const handleMenu=()=>{
        setMenu(!menu)
    }
    const logOut=()=>{
        localStorage.clear()
        window.location.reload()
      }
  return (
    <div>
        <div className='flex w-[400px] justify-between mx-5'>
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
                transition={{delay:0.4,duration:0.7}}
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

        </div>
    </div>
  )
}
