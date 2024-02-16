import React, {useEffect, useRef, useState, useCallback} from 'react'
import {socket, SocketContext, SOCKET_EVENT} from '../service/socket'
import { useLocation } from 'react-router-dom';

import ChatRoom from './chatRoom/ChatRoom';
import NicknameForm from './NicknameForm';

function Chat() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    //name과 room 값 가져오기
    const name = searchParams.get('name');
    const room = searchParams.get('room');

    const prevNickname = useRef(null); //prevnickname 변경은 컴포넌트를 리렌더링하지 않습니다.
    const [nickname,setNickname] = useState(name);

    const handleSubmitNickname = useCallback(newNickname=>{
        prevNickname.current = nickname;
        setNickname(newNickname);
    },[nickname]);

    useEffect(()=>{
        return ()=>{ //App 컴포넌트 unmount 시 실행
        socket.disconnect();
        }
    },[]);

    useEffect(()=>{
        if (prevNickname.current) {
        socket.emit(SOCKET_EVENT.UPDATE_NICKNAME, {
            //서버에는 이전 닉네임과 바뀐 닉네임을 전송
            prevNickname: prevNickname.current,
            nickname
        })
        } else {
        socket.emit(SOCKET_EVENT.JOIN_ROOM, {nickname,room}); //JOIN_ROOM event와 nickname data 전송
        }
    },[nickname,room]);

  return (
    <SocketContext.Provider value={socket}>
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <NicknameForm handleSubmitNickname={handleSubmitNickname}/>
        <ChatRoom nickname={nickname}/>
        </div>
    </SocketContext.Provider>
  )
}

export default Chat