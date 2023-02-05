import React, { useContext } from 'react'
import { messangerContext } from '../../App'
import { messagesContext } from '../Home'

export default function UserMessage(props) {
  const [theTwoMessageUsers,setTheTwoMessageUsers]=useContext(messagesContext)
  const value=useContext(messangerContext)
  const handleMessageUsersNames=()=>{
    setTheTwoMessageUsers([props.name+value[0].displayName,value[0].displayName+props.name])
    console.log(theTwoMessageUsers)
  }
  return (
    <div key={props.key} onClick={handleMessageUsersNames} className=' active:bg-gray-500 active:bg-opacity-10  w-full h-16'>
        <div className='flex  w-fit mt-2 ml-2'>
            <img src={props.image} alt={props.name} className="w-[40px] mt-1 text-white text-sm h-[40px]"/>
            <p className='text-white ml-6 text-md'>{props.name}</p>
        </div>
    </div>
  )
}
