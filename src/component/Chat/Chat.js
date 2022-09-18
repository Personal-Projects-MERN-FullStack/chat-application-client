import React, { useEffect, useState } from "react";
import { user } from "../Join/Join";
import socketIO from "socket.io-client";
import Message from "../Message/Message";
import ReactScrollToBottom from 'react-scroll-to-bottom';
let socket;
const ENDPOINT = "http://localhost:4500/";

const Chat = () => {
  const [id, setid] = useState("");
  const [messages, setmessages] = useState([]);
  const send = () => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });
    const message = document.getElementById("msg").value;
    socket.emit("message", { message, id });
    document.getElementById("msg").value = "";
  };

  // console.log(messages)

  useEffect(() => {
    const socket = socketIO(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      // alert("connected")
      setid(socket.id);
    });
    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setmessages([...messages,data])
      // console.log(data.user, data.message);
    });

    socket.on("userJoined", (data) => {
      setmessages([...messages,data])
      // console.log(data.user, data.message);
    });
    

    
    return () => {
      // socket.emit('disconnect');
      // socket.on("leave", (data) => {
      //   setmessages([...messages,data])
      //   console.log(data.user, data.message);
      // });
      socket.off()  
    };
  }, []);

  useEffect(() => {
    const socket = socketIO(ENDPOINT, { transports: ["websocket"] });
    socket.on("sendMessage", (data) => {
      setmessages([...messages,data])
      // console.log(data.user, data.message, data.id);
    });
    return () => {
      socket.off()
    };
  }, [messages]);

  //    useEffect(() => {
  //     socket.on('sendMessage', (data) => {
  //         // setMessages([...messages, data]);
  //         console.log(data.user, data.message, data.id);
  //     })
  //    }, [])

  return (
    <div className="bg-black  w-full h-screen flex justify-center items-center ">
      <div className="bg-black h-full w-full md:w-4/6 flex flex-col items-center">
        <div className="bg-gray-500 md:bg-black  h-12 w-full flex justify-center items-center text-white text-2xl ">
          {" "}
          Welcome to chat : <span className="mx-2 animate-pulse"> {user}</span> 
        </div>
        <ReactScrollToBottom className="h-5/6 w-full  ">
          {messages.map((data,i) => {
            return (
              <div className={`flex flex-col  ${data.id===id?"items-end":"items-start"}`}>
                <Message message={data.message} bg={`${data.id===id?"bg-red-900":"bg-gray-700"}`} user={`${data.id===id?"":data.user}`}/>
              </div>
            );
          })}
          {/* <div className="flex flex-col items-end ">
            <Message message={"hey whats aup"} bg={"bg-gray-800"}/>
            <Message message={"hey whats aup"} bg={"bg-gray-800"} />
          </div>
          <div className="flex flex-col items-start ">
            <Message message={"hey whats aup"} bg={"bg-gray-800"} />
            
          </div> */}
        </ReactScrollToBottom>
        <div className="h-12 md:border-2 md:border-black w-full flex  fixed bottom-0 right-0 left-0">
          <input
            onKeyPress={(event)=>event.key === 'Enter' ? send () : null}
            className="w-5/6 h-full text-2xl p-4 outline-none"
            type="text"
            id="msg"
            placeholder="Enter Message here"
          />
          <button onClick={send} className=" invert flex justify-center items-center w-2/6 h-full font-bold text-2xl md:text-white md:text-4xl md:bg-green-900">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 animate-bounce md:animate-none">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
</svg>



          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
