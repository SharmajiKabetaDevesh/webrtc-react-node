import React from 'react'
import {useHistory} from"react-router-dom"
import styles from "./RoomCard.module.css"
const RoomCard = ({room}) => {
  const history=useHistory()
  return (
    <div onClick={()=>{
      history.push(`/room/${room.id}`)

    }}
    className={styles.card}>
      <h3 className={styles.topic}>{room.topic}</h3>
      <div className={`${styles.speakers}
       ${rooms.speakers.length===1?styles.singlespeaker:""}`}>
        <div className={styles.avatars}>
         {room.speakers.map(speaker=>{
            <img key={speaker.id} src={speaker.avatar} alt="speaker-avatar"/>
         })}
        </div>
        <div className={styles.names}>
{room.speakers.map((speaker)=>{
<div key={speaker.id}className={styles.namesWrapper}>
    <span>{speaker.name}</span>
    <img src="/images/chat.png" alt="chatimage"/> 
</div>

})}
        </div>
      </div>

      <div className={styles.peopleCount}>
        <spam>{room.totalPeople}</spam>
        <img src="/images/user-icon.png" alt="user-icon"/>
      </div>
    </div>
  )
}

export default RoomCard
