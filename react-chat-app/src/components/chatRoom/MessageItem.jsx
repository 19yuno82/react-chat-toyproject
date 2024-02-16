import React from 'react'

function MessageItem({message,bgcolor,align}) {
    const {nickname,content,time} = message;

  return (
    <div className='d-flex flex-row' style={{justifyContent:align}}>
      
        {nickname && <div className='message-nickname'>{nickname}</div>}
        <div>{content}</div>
        <div className='time'>{time}</div>
      
    </div>
  )
}

export default MessageItem