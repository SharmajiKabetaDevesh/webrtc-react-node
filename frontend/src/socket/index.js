import {io} from 'socket.io-client'
export const socketInit=()=>{
    const options={
        'force new connection':true,
        reconnectionAttempt:'Infinity',
        timeout:1000,
        transports:['websocket'],
    };
    return io('http://localhost:5500',options)
}