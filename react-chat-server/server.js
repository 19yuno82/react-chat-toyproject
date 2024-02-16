const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');
const socketio = require('socket.io')(server, {
    cors: {
        origin: process.env.FRONT_URL,
        methods: ['GET','POST'],
        credentials: true,
    },
});

const socket = require('./src/socket');

//express의 미들웨어 사용 방식
app.use(cors({origin: process.env.FRONT_URL, credentials: true}));
socket(socketio); //socket파일에서 정의할 모듈에 socketio 객체를 전달

server.listen(process.env.PORT, ()=>{
    console.log(process.env.FRONT_URL);
    console.log(`server is running on http://localhost:4000 || ${new Date().toString()}`);
});