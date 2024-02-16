import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { SOCKET_EVENT, SocketContext, makeMessage } from '../../service/socket'
import MessageItem from './MessageItem';

function MessageList() {
    const [messages, setMessages] = useState([]);
    const chatWindow = useRef(null);
    const socket = useContext(SocketContext);

    //새 메세지를 받으면 스크롤이 이동하는 함수
    const moveScrollToRecivemessage = useCallback(()=>{
        if (chatWindow.current) {
            chatWindow.current.scrollTo({
                top: chatWindow.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    },[]);

    //RECEIVE_MESSAGE 이벤트 콜백
    const handleReceiveMessage = useCallback(pongData=>{
        const newMessage = makeMessage(pongData); //./service/socket.js
        setMessages(messages=>[...messages, newMessage]);
        moveScrollToRecivemessage();
    },[moveScrollToRecivemessage]);

    useEffect(()=>{
        socket.on(SOCKET_EVENT.RECEIVE_MESSAGE, handleReceiveMessage);

        return ()=>{
            socket.off(SOCKET_EVENT.RECEIVE_MESSAGE, handleReceiveMessage)
        };
    },[socket, handleReceiveMessage]);


  return (
    <div className='chat-window card' ref={chatWindow}>
        {messages.map((message,index)=>
            socket.id === message.id ?
                <MessageItem key={index} message={message} align={'right'} /> :
                <MessageItem key={index} message={message} align={'left'}/>
        )}
    </div>
  )
}

export default MessageList