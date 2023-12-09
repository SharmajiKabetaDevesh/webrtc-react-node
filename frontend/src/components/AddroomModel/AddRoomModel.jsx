import React ,{useState}from 'react'
import styles from './AddRoomModel.module.css'
import TextInput from'../Shared/TextInput/TextInput'
import {createRoom as create} from '../../http/index'
import {useHistory} from "react-router-dom"
const AddRoomModel = ({onClose}) => {
const[roomType,setroomType]=useState('open')
const[topic,settopic]=useState('')
const history=useHistory();
async function createRoom(){
    try{
        if(!topic){ return};
    const {data}= await create({topic,roomType});

    history.push(`/room/${data.id}`)
    console.log(data);
    }catch(err){
        console.log(err)
    }

}
  return (
    <div className={styles.modelMask}>
      <div className={styles.modelBody}>
        <button onClick={onClose}className={styles.closeButton}>
            <img src="/images/close.png" alt="close"/>
        </button>
      <div className={styles.modelHeader}>
        <h3 className={syles.heading}>Enter the topic to be discusses</h3>
        <TextInput value={topic} onChange={(e)=>{settopic(e.target.value)}}fullwidth="true"/>
        <h2 className={styles.subheading}>Rooms types</h2>
      </div>
      <div className={styles.roomTypes}>
<div onClick={()=>{setroomType(open)}} className={`${styles.typeBox}${roomType==='open' ?styles.active:""}`}>
    <img src="/images/globe.png" alt="globe"/> 
<span>Open</span>
</div>
<div onClick={()=>{setroomType(social)}} className={`${styles.typeBox}${roomType==='social' ?styles.active:""}`}>
    <img src="/images/social.png" alt="social"/> 
<span>Social</span>
</div>
<div onClick={()=>{setroomType(lock)}} className={`${styles.typeBox}${roomType==='lock' ?styles.active:""}`}>
    <img src="/images/lock.png" alt="lock"/> 
<span>Private</span>
</div>
      </div>
      <div className={styles.modelFooter}>

        <h2 >Start a room,open to everyone</h2>
        <button onClick={createRoom}className={styles.footerButton}>
            <img src="/images/celebration.png"alt="celebration"/>
            Let's Go</button>
      </div>
    </div>
    </div>
  )
}

export default AddRoomModel
