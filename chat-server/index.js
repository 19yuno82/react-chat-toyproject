const http  = require('http');

const server = http.createServer();

const io = require('socket.io')(server,{
    cors: {origin: '*'}
});

io.on('connection',(socket)=>{
    console.log("connected client");
    socket.on('sendMessage',(data)=>{
        // console.log(data);
        io.emit('sendMessage',data);
    });
});

server.listen(3000);