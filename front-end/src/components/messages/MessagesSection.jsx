import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { messangerContext } from '../../App'

export default function MessagesSection() {
    const value=useContext(messangerContext)
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
        console.log(users)
        console.log(value[0])
    },[])
  return (
    <div>
        <div>

        </div>
        <div>

        </div>
    </div>
  )
}
