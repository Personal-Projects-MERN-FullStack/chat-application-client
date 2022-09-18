// import socketIO from 'socket.io-client';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Join from './component/Join/Join'
import Chat from './component/Chat/Chat'

// const ENDPOINT = 'http://localhost:4500/'
// const socket=socketIO(ENDPOINT, {transports:['websocket']});


function App() {

  

  return (
    
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Join />}/>
      <Route exact path="/Chat" element={<Chat />}/>
      
    </Routes>
  </BrowserRouter>
   
  );
}

export default App;
