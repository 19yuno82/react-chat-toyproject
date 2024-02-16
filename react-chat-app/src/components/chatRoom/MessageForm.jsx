import React, { useCallback, useContext, useState } from 'react'
import { SocketContext, SOCKET_EVENT } from '../../service/socket';

function MessageForm({nickname}) {
    const [inputMessage, setInputMessage] = useState();
    const socket = useContext(SocketContext);

    //textarea에서 텍스트를 입력하면 inputMessage를 변경합니다.
    const handleChangeInputMessage = useCallback(event=>{
        setInputMessage(event.target.value);
    },[]);

    //버튼을 누르면 실행
    const handleSendMessage = useCallback(()=>{
        //공백 제거
        const noContent = inputMessage.trim() === '';
        //아무 메세지도 없으면 아무 일도 발생하지 않습니다.
        if (noContent) {
            return;
        }

        //메세지가 있으면 nickname과 message를 SEND_MESSAGE 이벤트 타입과 함께 socket 전송
        socket.emit(SOCKET_EVENT.SEND_MESSAGE, {
            sendId:socket.id,
            nickname,
            content: inputMessage,
        });
        //state값은 공백으로 변경
        setInputMessage('');

    },[socket,nickname,inputMessage]);

  return (
    <form className='card'>
        <div className='d-flex align-item-center'>
            <textarea 
            className='form-control'
            maxLength={400}
            autoFocus
            value={inputMessage}
            onChange={handleChangeInputMessage}
            onKeyDown={e=>{
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSendMessage();
                }
            }}
            />
            <button
            type='button'
            className='btn btn-primary send-btn'
            onClick={handleSendMessage}
            >전송</button>
        </div>
    </form>
  )
}

export default MessageForm