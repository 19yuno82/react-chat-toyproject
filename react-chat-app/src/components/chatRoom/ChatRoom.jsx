import React from 'react'

import MessageForm from './MessageForm';
import MessageList from './MessageList';

function ChatRoom({nickname}) {
    
  return (
    <div className='d-flex flex-column' style={{width: 500}}>
        <div className='text-box'>
            <span>{nickname}님 환영합니다!</span>
        </div>
        <MessageList/>
        <MessageForm nickname={nickname}/>
    </div>
  )
}

export default ChatRoom