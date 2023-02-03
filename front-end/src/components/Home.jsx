import React, { useContext, useEffect } from 'react'
import { messangerContext } from '../App'
import axios from "axios"
export default function Home() {
  const [value,setValue]=useContext(messangerContext)
  useEffect(()=>{
      axios.post("http://localhost:9000/usersData",{name:value.displayName,pfp:value.photoURL,email:value.email}) 
    },[value])
    const logOut=()=>{
        localStorage.clear()
        window.location.reload()
      }
    
  return (
    <div>
      <p className='text-white'>{value.displayName}</p>
        <button className='text-white' onClick={logOut}>yo</button>
    </div>
  )
}
