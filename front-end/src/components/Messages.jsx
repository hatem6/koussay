import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { messagesDb } from './Firebase';

export default function Messages(props) {
    const [screen1,setScreen1]=useState(false)
    const [messages_table,setMessages_table]=useState([])
    const current_user=props.user[0].displayName;
    window.addEventListener("resize",function(){
        if(window.innerWidth>600){
            setScreen1(true)
        }
        else{
            setScreen1(false)
        }
    })
    const update_conv= (event)=>{
        event.preventDefault();
        const inpt=document.getElementById("inpt").value;
        setMessages_table([...messages_table,current_user.toString()+":"+inpt])
       
        updateDoc(doc(messagesDb,"CZlwYftdwtU2ck5cThqC"),{
            messages:messages_table
            
        })
            
        
        document.getElementById("inpt").value=""
    }
    useEffect(()=>{
        if(window.innerWidth>600){
            setScreen1(true)
        }
        else{
            setScreen1(false)
        }
        const data= async ()=>{
            try{
                const res= await getDoc(doc(messagesDb,"CZlwYftdwtU2ck5cThqC"))
                return res
            }
            catch(error){
                console.log(error)
            }
        }
        data()
        .then(res=>{
            setMessages_table(res.data().messages)
        })
    },[setScreen1])
  return (
    <div className={screen1? "text-white h-full w-full  " : "text-white h-full hidden  "}>   
        <div className=''>
        <form onSubmit={update_conv}>
            <div className=' mb-16 h-[550px] pb-5 overflow-y-scroll'>
            {messages_table.map(res=>{
                return <div key={res+(Math.floor(Math.random()*10000)).toString()} className={res.substring(0,res.indexOf(':'))===current_user?"flex justify-end mt-3  items-end" : "flex justify-start mt-3 items-end" } >
                    {res.substring(0,res.indexOf(':'))===current_user?
                    <p className='text-white mt-3 fit-content  py-2 px-3 rounded-xl  bg-blue-600'>{res.substring(res.indexOf(":")+1,res.length)}</p>   :
                    <p className='text-white mt-3 max-w-[250px] py-2 px-3 rounded-xl bg-gray-600'>{res.substring(res.indexOf(":")+1,res.length)}</p> 
                }
                </div>
            })}
            </div>
            <div className='fixed bottom-0  bg-black w-full pt-2 pb-3'>
            <input type={'text'} id='inpt' className=" text-black pl-2 bg-gray-300 rounded-3xl py-1 text-xl w-[350px] outline-none "/><button onClick={update_conv} type={"submit"} className="text-white  right-16">enter</button>
            </div>
        </form>
        </div>
    </div>
  )
}
