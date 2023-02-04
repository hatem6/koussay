import React from 'react'

export default function UserMessage(props) {
  return (
    <div key={props.key} className=' active:bg-gray-500 active:bg-opacity-10 border w-full h-16 border-transparent border-b-gray-800'>
        <div className='flex  w-fit mt-2 ml-2'>
            <img src={props.image} alt={props.name} className="w-[40px] mt-1 text-white text-sm h-[40px]"/>
            <p className='text-white ml-6 text-md'>{props.name}</p>
        </div>
    </div>
  )
}
