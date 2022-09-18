import React from 'react'

const Message = ({message,bg,user}) => {
    if(user){
        return (
            <div className= {`w-auto m-2 p-2 text-white rounded-lg inline-block ${bg}`}>{`${user} : ${message}`}</div>
          )
    }else{
        return (
            <div className= {`w-3/6 m-2 p-2 text-white rounded-lg inline-block ${bg}`}>{`You : ${message}`}</div>
          )
    }
  
}

export default Message