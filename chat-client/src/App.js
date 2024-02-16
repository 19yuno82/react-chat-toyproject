import {io} from 'socket.io-client';
import {useState, useEffect} from 'react';
import { UlMessage, LiMessage } from './ui-components';

import './App.css';

const socket = io('http://localhost:3000');

function App() {

  const [isConnected,setIsConnected] = useState(false);
  const [newMessage,setNewMessage] = useState('');
  const [messages,setMessages] = useState([]);

  useEffect(()=>{

    socket.on('connect', ()=> setIsConnected(true));

    socket.on('sendMessage', (data)=>{
      // console.log(data);
      setMessages(messages=>[...messages,data]);
    })
    return ()=>{
      socket.off('connect');
      socket.off('sendMessage');
    }

  },[]);

  const sendMessage = () => {
    socket.emit('sendMessage',{
      userid: socket.id,
      message: newMessage
    });
  }

  return (
    <div className="App">
      <h2>{isConnected ? 'CONNECT' : 'DISCONNECT'}</h2>
      <UlMessage>
        
        {messages.map(data=>(
          <LiMessage>{data.userid}: {data.message}</LiMessage>
        ))}
      
      </UlMessage>
      <input 
      type='text'
      onChange={e=>setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Enter</button>
    </div>
  );
}

export default App;
