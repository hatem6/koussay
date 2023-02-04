import React, { useContext, useEffect } from 'react'
import { messangerContext } from '../App'
import axios from "axios"
import ContactsSection from './contacts/ContactsSection'
export default function Home() {
  const value=useContext(messangerContext)
  const values=value[0]
  useEffect(()=>{
      axios.post("http://localhost:9000/usersData",{name:values.displayName,pfp:values.photoURL,email:values.email}) 
    },[values])
    return (
    <div>
      <p className='text-white'>{value.displayName}</p>
      <div>
        <ContactsSection/>
      </div>
      <div>
        
      </div>
    </div>
  )
}
