import React, { useEffect, useState } from 'react'
import Contacts from './Contacts'
import Messages from './Messages'
import {onAuthStateChanged} from "firebase/auth"
import { auth } from './Firebase'
export default function Home() {
    const [userInfo,setUserinfo]=useState([])
    useEffect(()=>{
      onAuthStateChanged(auth,user=>{
        if(user){
            setUserinfo([{displayName:user.displayName,photoURL:user.photoURL,
                localId:user.reloadUserInfo.localId}])
        }
      })
    },[])
  return (
    <div className='text-white flex w-full'>
        <div className='w-full flex h-full'>
            {userInfo.length===0 ?
            <p>loading</p>
            :
            <>
            <Contacts user={userInfo} />
            <Messages user={userInfo} />
            </>
            }
        </div>
    </div>
  )
}
