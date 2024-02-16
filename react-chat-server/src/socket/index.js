const SOCKET_EVENT = {
    JOIN_ROOM: 'JOIN_ROOM',
    UPDATE_NICKNAME: 'UPDATE_NICKNAME',
    SEND_MESSAGE: 'SEND_MESSAGE',
    RECEIVE_MESSAGE: 'RECEIVE_MESSAGE',
};

//초기 상태 설정
let state = {
    room : null
};
//상태를 업데이트하는 함수
function updateState (newState) {
    state = {...state, ...newState};
};
//상태를 읽는 함수
function getState() {
    return state.room;
}

module.exports = function (socketio) {
    socketio.on('connection', (socket)=>{

        //클라이언트와 연결이 되면 연결된 사실 출력
        console.log('socket connection success');

        socket.on('disconnect', reason => {
            //클라이언트와 연결이 끊어지면 이유를 출력
            console.log(`disconnect: ${reason}`);
        });

        Object.keys(SOCKET_EVENT).forEach(typeKey=>{
            const type = SOCKET_EVENT[typeKey];
            socket.on(type, requestData=>{
                const firstVisit = type === SOCKET_EVENT.JOIN_ROOM;

                if (firstVisit) {
                    updateState({room: requestData.room});
                    socket.join(getState());
                }

                const responseData ={
                    ...requestData, // 기존 요청 데이터 객체를 복사 후
                    type,
                    time: new Date(),
                };
                socketio.to(getState()).emit(SOCKET_EVENT.RECEIVE_MESSAGE,responseData);
                console.log(getState());
                console.log(`${type} is fired with data: ${JSON.stringify(responseData)}`);
            });
        });
    });

}