import React, { useContext, useEffect } from 'react'
import logo from './../assets/messangerLogo.png';
import {FcGoogle} from "react-icons/fc";
import { auth,provider, userDb } from './Firebase';
import {signInWithPopup} from 'firebase/auth'
import { messangerContext } from '../App';
import { doc, setDoc } from 'firebase/firestore';
export default function Login() {
  const [setValue]=useContext(messangerContext)
  
  const handleclick=()=>{
    signInWithPopup(auth,provider)
    .then(data=>{
      setValue(data.user.email)
      console.log(data.user)
      setDoc(doc(userDb, data.user.displayName),{ capital: true }, { merge: true }, {
        userInfo: [data.user.displayName, data.user.photoURL] });
      localStorage.setItem('email',data.user.email)
    })
  }
  
  useEffect(()=>{
    setValue(localStorage.getItem('email'))
  },[setValue])
  return (
    <div className='grid mt-[60%] sm:mt-[10%] justify-center'>
        <img src={logo} alt="" className="w-[150px] mx-auto mb-24 sm:mb-16 h-[150px]"/>
        <button onClick={handleclick} className='text-white bg-[#00a4ff]  flex rounded-2xl font-bold py-2 px-[80px]'>Login with Google &nbsp;<FcGoogle size={25}/> </button>
    </div>
  )
}
