require('dotenv').config();
const express = require('express');
const app = express();
const DbConnect = require('./database');
const router = require('./routes');
const ACTIONS =require('./actions')
const cors = require('cors');
const server=require('http').createServer(app);
const io =require('socket.io')(server,{
    cors:{
        origin:['http://localhost:3000'],
        methods:['GET','POST']
    }
})
const corsOption={
    credentials:true,
    origin:['http://localhost:3000']
};
app.use(cors(corsOption));
app.use('/storage',express.static('storage'));
const cookieParser=require('cookie-parser')
const PORT = process.env.PORT || 5500;
DbConnect();
app.use(express.json({limit:'8mb'}));
app.use(router);
app.use(cookieParser);
app.get('/', (req, res) => {
    res.send('Hello from express Js');
});

//socket logic
const socketUserMapping ={

}
io.on('connection',(socket)=>{
    console.log('new connection',socket.id);
    socket.on(ACTIONS.JOIN,({roomId,user})=>{
socketUserMapping[socket.id]=user;
const clients=Array.from(io.sockets.adapter.rooms.get(roomId) ||[])
clients.forEach(clientId=>{
    io.to(clientId).emit(ACTIONS.ADD_PEER,{
     peerId:socket.id,
     createOffer:false,
     user
    })
    socket.emit(ACTIONS.ADD_PEER,{
        peerId:clientId,
        createOffer:true,
        user:socketUserMapping[clientId]
    })
    socket.join(roomId);
})

//handle relay ice
socket.on(ACTIONS.RELAY_ICE,({
    peerId,icecandidate
})=>{io.to(peerId).emit(ACTIONS.RELAY_ICE,{
    peerId:socket.id,
    icecandidate,
});
});
    });


    
//handle relay sdp

socket.on(ACTIONS.SESSION_DESCRIPTION,({peerId,sessionDescription})=>{
    io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION,{
        peerId:socket.id,
        sessionDescription,
    });
});


const leaveRoom=({roomId})=>{

}
socket.on(ACTIONS.LEAVE,leaveRoom);
 const{rooms}=socket;
 Array.from(rooms).forEach(roomId=>{
    const clients=Array.from(io.sockets.adapter.rooms.get(roomId)||[])


 clients.forEach(clientId=>{
    io.to(clientId).emit(ACTIONS.REMOVE_PEER,{
        peerId:socket.id,
        userId:socketUserMapping[socket.id].id,
    })
    socket.emit(ACTIONS.REMOVE_PEER,{
        peerId:clientId,
        userId:socketUserMapping[client.id]?.id,
    })
    socket.leave(roomId)
 })
 delete socketUserMapping[socket.id];

})



socket.on(ACTIONS.LEAVE,leaveRoom);
socket.on('disconnecting')




//handle mute/unmute
socket.on(ACTIONS.MUTE,({roomId,userId})=>{
  const clients=Array.from(io.sockets.adapter.rooms.get(roomId)||[])
});
clients.forEach(clientId=>{
    io.to(clientId).emit(ACTIONS.MUTE,{
        peerId:socket.id,
        userId,
    })
})

socket.on(ACTIONS.UNMUTE,({roomId,userId})=>{
    const clients=Array.from(io.sockets.adapter.rooms.get(roomId)||[])
});
clients.forEach(clientId=>{
    io.to(clientId).emit(ACTIONS.UNMUTE,{
        peerId:socket.id,
        userId,
    })
});

});




server.listen(PORT, () => console.log(`Listening on port ${PORT}`));