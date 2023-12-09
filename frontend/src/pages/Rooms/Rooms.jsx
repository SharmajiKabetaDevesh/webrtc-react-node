import React, { useEffect } from 'react'
import style from './Rooms.module.css'
import RoomCard from '../../components/roomcard/RoomCard';
import AddRoomModel from '../../components/AddroomModel/AddRoomModel';
import { getAllRooms } from '../../http';

// const rooms = [
//       {
//           id: 1,
//           topic: 'Which framework best for frontend ?',
//           speakers: [
//               {
//                   id: 1,
//                   name: 'John Doe',
//                   avatar: '/images/monkey-avatar.png',
//               },
//               {
//                   id: 2,
//                   name: 'Jane Doe',
//                   avatar: '/images/monkey-avatar.png',
//               },
//           ],
//           totalPeople: 40,
//       },
//       {
//           id: 3,
//           topic: 'What’s new in machine learning?',
//           speakers: [
//               {
//                   id: 1,
//                   name: 'John Doe',
//                   avatar: '/images/monkey-avatar.png',
//               },
//               {
//                   id: 2,
//                   name: 'Jane Doe',
//                   avatar: '/images/monkey-avatar.png',
//               },
//           ],
//           totalPeople: 40,
//       },
//       {
//           id: 4,
//           topic: 'Why people use stack overflow?',
//           speakers: [
//               {
//                   id: 1,
//                   name: 'John Doe',
//                   avatar: '/images/monkey-avatar.png',
//               },
//               {
//                   id: 2,
//                   name: 'Jane Doe',
//                   avatar: '/images/monkey-avatar.png',
//               },
//           ],
//           totalPeople: 40,
//       },
//       {
//           id: 5,
//           topic: 'Artificial inteligence is the future?',
//           speakers: [
//               {
//                   id: 1,
//                   name: 'John Doe',
//                   avatar: '/images/monkey-avatar.png',
//               },
//               {
//                   id: 2,
//                   name: 'Jane Doe',
//                   avatar: '/images/monkey-avatar.png',
//               },
//           ],
//           totalPeople: 40,
//       },
//   ];



const Rooms = () => {
    const[rooms,setrooms]=useState([]);
    useEffect(()=>{
const fetchRooms=async()=>{
    const {data}=await getAllRooms();
setrooms(data)
};fetchRooms();
    },[])
    const [showModel,setshowModel]=useState(false)

    function openModel(){
        setshowModel(true)
    };
  return (
    <>
    <div className='container'>
      <div className={style.roomsHeader}>
        <div className={style.left}>
          <span className={style.heading}>
          All Voice Rooms
          </span>
          <div className={style.searchBox}>
            <img src='alien.png' alt='search'/>
            <input type='text' className={style.searchInput}/>
          </div>
         
        </div>
        <div className={style.right}>
<button className={style.startRoomButton}
onClick={openModel}>
  <img
  src='/images/add-room-icon.png'
  alt="add-room"
  />  
  <span>Start a room</span>

</button>
       </div>
      </div>
<div className={style.roomList}>
{rooms.map((room)=>{
  <RoomCard key={room.id} room={room}/>
})}
</div>
    </div>
    {showModel &&<AddRoomModel onClose={()=>{setshowModel(false)}}/>}
    
    </>
  )
}

export default Rooms
