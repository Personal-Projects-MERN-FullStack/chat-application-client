import React, { useState } from 'react';
import {Link} from 'react-router-dom';


let user;


const Join = () => {
    const[name , setname] = useState();
    const sendUser=()=>{
      
       user =  document.getElementById('joinInput').value;
       document.getElementById('joinInput').value = "";
    }
    // console.log("joinpage")



  return (
    <div className="bg-black w-full h-screen flex justify-center items-center ">
        <div className='shadow-2xl rounded-lg shadow-red-900 w-4/6 h-3/6 w-full md:h-3/6 md:w-3/6 space-y-14 text-white flex flex-col justify-start items-center'>
            <h1 className='text-2xl animate-pulse border-b-2 w-4/6 border-white flex justify-center items-center py-8'>Spv Chat</h1>
            <input onChange={(e)=>{setname(e.target.value)}} type="text"  className="w-5/6 h-12 rounded-lg p-2 text-black text-2xl " placeholder="Enter a Name" id="joinInput" required/>
           <Link onClick={(event)=> !name?event.preventDefault() :null} to="/Chat">
            <button onClick={sendUser} className="bg-red-800 animate-bounce  p-2 rounded-xl px-12 hover:shadow-inner hover:translate-x-4"> Join </button>
            </Link>
        </div>
    </div>
  )
}

export default Join
export {user}