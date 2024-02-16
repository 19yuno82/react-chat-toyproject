import {createContext} from 'react';
import socketio from 'socket.io-client';
import dayjs from 'dayjs';


export const socket = socketio(process.env.REACT_APP_BACK_URL, {withCredentials: true});
export const SocketContext = createContext(socket);
export const SOCKET_EVENT={
    JOIN_ROOM:'JOIN_ROOM',
    UPDATE_NICKNAME: 'UPDATE_NICKNAME',
    SEND_MESSAGE:'SEND_MESSAGE',
    RECEIVE_MESSAGE: 'RECEIVE_MESSAGE',
};

socket.on('connect', ()=>{
    console.log('socket server connect');
});

socket.on('disconnect', ()=>{
    console.log('socket server disconnect');
});

export const makeMessage = pongData => {
    const {prevNickname, sendId, nickname, content, type, time} = pongData;
    let nicknameLabel;
    let contentLabel='';
    let userId= '';
    switch (type) {
        case SOCKET_EVENT.JOIN_ROOM: {
            contentLabel = `${nickname} has joined the room`;
            break;
        }
        case SOCKET_EVENT.UPDATE_NICKNAME: {
            contentLabel = `User's name has beened changed.\n ${prevNickname} => ${nickname}`
            break;
        }
        case SOCKET_EVENT.SEND_MESSAGE: {
            contentLabel = String(content);
            nicknameLabel = nickname;
            userId = sendId;
            break;
        }
        default:
    }
    return {
        id: userId,
        nickname: nicknameLabel,
        content: contentLabel,
        time: dayjs(time).format('HH:mm'),
    }
}