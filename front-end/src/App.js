import React, { useState } from 'react'
import Login from './components/login'
import { createContext } from 'react'
import Home from './components/Home';
export const messangerContext=createContext();
export default function App() {
  const [value,setValue]=useState("")
  const logOut=()=>{
    localStorage.clear()
    window.location.reload()
  }
  return (
    <div>
      <messangerContext.Provider value={[setValue]}>
        {value?
        <Home />
        :<Login/>}
        <button onClick={logOut} className="text-white">yp</button>
      </messangerContext.Provider>
      
    </div>
  )
}
