import React, { useContext, useEffect, useState } from 'react'
import { messangerContext } from '../App'
import axios from "axios"
import { createContext } from 'react'
import ContactsSection from './contacts/ContactsSection'
import MessagesSection from './messages/MessagesSection'
export const messagesContext=createContext()
export default function Home() {
  const value=useContext(messangerContext)
  const [theTwoMessageUsers,setTheTwoMessageUsers]=useState("")
  const values=value[0]
  const [users,setUsers]=useState([])
  useEffect(()=>{
      axios.post("http://localhost:9000/usersData",{name:values.displayName,pfp:values.photoURL,email:values.email}) 
},[values])
    useEffect(()=>{
      const handleUsersapi= async ()=>{
          try{
              const responseUsers=await axios.get("http://localhost:9000/users")
              setUsers(responseUsers.data)
          }catch(err){
              console.log(err)
          }
      }
      handleUsersapi();
  },[])
    return (
    <div className='flex'>
      <messagesContext.Provider value={[theTwoMessageUsers,setTheTwoMessageUsers]}>
      <div className='sm:w-1/3'>
        <ContactsSection user={users} />
      </div>
      <div className=''>
        <MessagesSection/>
      </div>
      </messagesContext.Provider>
    </div>
  )
}
