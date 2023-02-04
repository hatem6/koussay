import React, { useContext, useEffect } from 'react'
import { messangerContext } from '../App'
import axios from "axios"
import MessagesSection from './messages/MessagesSection'
export default function Home() {
  const value=useContext(messangerContext)
  useEffect(()=>{
      axios.post("http://localhost:9000/usersData",{name:value[0].displayName,pfp:value[0].photoURL,email:value[0].email}) 
    },[value[0]])
    return (
    <div>
      <p className='text-white'>{value.displayName}</p>
      <div>
        <MessagesSection/>
      </div>
      <div>
        
      </div>
    </div>
  )
}
