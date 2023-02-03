import React from 'react'

export default function Home() {
    const logOut=()=>{
        localStorage.clear()
        window.location.reload()
      }
  return (
    <div>
        <button className='text-white' onClick={logOut}>yo</button>
    </div>
  )
}
