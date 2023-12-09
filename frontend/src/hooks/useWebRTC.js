import {useState,useRef, useEffect} from 'react'
import { useStateWIthCallBack } from './useStateWithCallBack'
import {socketInit} from '../socket/index'
import ACTIONS from '../../actions'
import freeice from 'freeice'
// const users=[
        
//     {
//         id:1,
//         name:'Devesh Sharma'
//     },
//     {
//         id:2,
//         name:'Juhi Sharma'
//     }

// ];

export  const useWebRTC =(roomId,user)=>{
    const clientsRef=useRef({})
    const[clients,setClients]=useStateWIthCallBack(users);
    
    const socket=useRef(null);
    useEffect(()=>{
    socket.current=socketInit();
    },[])
    const audioElements =useRef({
        
    });
    const connections =useRef({
        
    })
    const localMediaStream=useRef(null);
    const provideRef=(instance,userId)=>{
        audioElements.current[userId]=instance;
    }
 
 const addNewClient=useCallback((newClient,cb)=>{
    const lookingFor=clients.find((client)=>{client.id===newClient.id})
    if(lookingFor===undefined){
        setClients((existingClients)=>[...existingClients,newClient],cb);
    }
 },[clients,setClients])
//captureMedia

useEffect(()=>{
const startCapture=async()=>{
    localMediaStream.current= await navigator.mediaDevices.getUserMedia({
        audio:true
    })
}

startCapture().then(()=>{
addNewClient({...user,muted:true},()=>{
    const localELement=audioElements.current[user.id];
    if(localELement){
        localELement.volume=0;
        localELement.srcObject=localMediaStream.current;
    }

  //socket emit Join socket io
  socket.current.emit(ACTIONS.JOIN,{});

});
});
return ()=>{
    //leaving the room
    localMediaStream.current.getTracks()
    .forEach(track=>{
        track.stop()
        socket.current.emit(ACTIONS.LEAVE,{roomId})

    });
}
},[])




useEffect(()=>{
    const handleNewPeer=async({peerId,createOffer,user:remoteUser})=>{
       //if already connected then give warning
       if(peerId in connections.current){
        return console.warn(`You are already connected with${peerId}(${user.name})`)
       }
       connections.current[peerId]=new RTCPeerConnection({
        iceServers:freeice()
       });

       //handle new ice candidate
       connections.current[peerId].onicecandidate=(event)=>{
        socket.current.emit(ACTIONS.RELAY_ICE,{
            peerId,
            icecandidate:event.candidate
        })
       }
//handle on track ion this connection
connections.current[peerId].ontrack=({
    streams:[remoteStream]
})=>{
    addNewClient({...remoteUser,muted:true},()=>{
        if(audioElements.current[remoteUser.id]){
            audioElements.current[remoteUser.id].srcObject=remoteStream
        }else{
            let settled =false;
            const interval =setInterval(()=>{
                if(audioElements.current[remoteUser.id]){
                    audioElements.current[remoteUser.id].srcObject=remoteStream
                    settled=true;
                }if(settled){
                    clearInterval(interval)
                }
            },1000)
        }
    })
}
localMediaStream.current.getTracks().forEach(track=>{
    connections.current[peerId].addTrack(track,localMediaStream.current)
})

//create Offer
if(createOffer){
    const offer=await connections.current[peerId].createOffer()
socket.current.emit(ACTIONS.RELAY_SDP,{
    peerId,
    sessionDescription:offer
})

return()=>{
    socket.current.off(ACTIONS.ADD_PEER)
}
}
 };


socket.current.on(ACTIONS.ADD_PEER,handleNewPeer)
},[])

useEffect(()=>{
socket.current.on(ACTIONS.RELAY_ICE,({peerId,icecandidate})=>{
    if(icecandidate){
        connections.current[peerId].addIceCandidate(icecandidate)
    }
})

return()=>{
    socket.current.off(ACTIONS.RELAY_ICE)
}
},[])






//handle sessoion description

useEffect(() => {
    const handleRemopteSdp=async({peerId,sessionDescription:remoteSessonDescription})=>{
connections.current[peerId].setRemoteDescription(
    new RTCSessionDescription(remoteDescription)
)

//if session description is type of offer then create an answer
if(remoteSessonDescription.type==='offer'){
    const connection =connections.current[peerId]
    const answer=await connection.createAnswer();

    connection.setLocalDescription(answer);
    socket.current.emit(ACTIONS.RELAY_SDP,{
        peerId,
        sessionDescription:answer
    })
}
    }
 socket.current.on(ACTIONS.RELAY_SDP,(handleRemopteSdp))

  return () => {
    socket.current.off(ACTIONS.SESSION_DESCRIPTION)
  }
}, [])


//handle remove peer
useEffect(() => {
    const handleRemovePeer=async()=>{
        if(connections.current[peerId]){
connections.current[peerI].close();
        }

        delete connections.current[peerId];
        delete audioElements.current[peerId];

        setClients(list=>list.filter(client=>client.id!=userId))
    }
  socket.current.on(ACTIONS.REMOVE_PEER,handleRemovePeer);

  return () => {
   socket.current.off(ACTIONS.REMOVE_PEER)
  }
}, [third])



//handling mute
 const handleMute=(isMute,userId)=>{
    let interval=setInterval(()=>{
        if(localMediaStream){
            localMediaStream.current.getTracks()[0].enabled=!isMute;
            if(isMute){
                socket.current.emit(ACTIONS.MUTE,{
                    roomId,
                  userId:userId
                })
            }else{
                socket.current.emit(ACTIONS.UNMUTE,{
                    roomId,
                  userId,
                })
            }
            settled=true;
        }
if(settled){
    clearInterval(interval);
}

    },200);
    
     
}

useEffect(() => {
  clientsRef.current=clients;

  return () => {
    second
  }
}, [clients])


//listen for mute/unmute
useEffect(() => {
  socket.current.on(ACTIONS.MUTE,({peerId,userId})=>{
    setMute(true,userId);
  })

  const setMute=(mute,userId)=>{
    const clientIdx=clientsRef.current.map(client=>client.id).indexOf(userId)
 const connnectedClients=clientsRef.current;
 if(clientIdx>-1){
    connnectedClients[clientIdx].Muted=mute
 }
  }


 
}, [ clients]);
    return {clients,provideRef,handleMute}
}