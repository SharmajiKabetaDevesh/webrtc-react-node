import React,{useEffect, useState} from 'react'
import Card from '../../../components/Shared/card/Card'
import styles from './StepAvatar.module.css'
import{useSelector,useDispatch} from "react-redux"
import { setAvatar } from '../../../../store/activateSlice'
import { activate } from '../../../http'
import {setAuth} from '../../../../store/userSlice'
import Loader from '../../../components/Shared/Loader/Loader'
const StepAvatar = ({onNext}) => {
  const[loading,setloading]=useState(false)
  const[unmounted,setunmounted]=useState(false)
async function submit(){
  if(!name||!avatar){
    return
  }
  setloading(true);
try{
const {data}=await activate({name,image});
if(data.auth){
  if(!unmounted) dispatch(setAuth(data));
  
}

}catch(error){
  console.log(error)
}finally{
  setloading(setloading(false))
}
}
useEffect(()=>{
  return()=>{
    setunmounted(true);
  };

},[]);
function captureImage(e){
  const dispatch=useDispatch();
  const file=e.target.files[0];
  const reader =new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend=function(){
    setimage(reader.result);
    dispatch(setAvatar);
  }
console.log(e);
}

  const {name}=useSelector((state)=>state.activate);
  const[image,setimage]=useState('/image/alien.png')
  
  if(loading){return <Loader message="Activation in progress"/>}
  return (
    <div className={styles.cardWrapper}>
    <Card className={styles.cardotp} title={`Okay, ${name}`} icon="alien.png">
     
    
    <p className={styles.subheading}>How's ths photo</p>

    <div className={styles.avatarWrapper}>
      <img className={styles.avatar} src={image} alt="avatar"/>
    </div>

    <div>
      <input 
      onChange={captureImage}
      
      type="file" className={styles.avatarInput}/>
      <label className={styles.avatarlabel}htmlFor="avatarInput">Choose a different photo</label>
    </div>
    <Button text='Next' onClick={nextStep} />
      </Card>
        </div>
  )
}

export default StepAvatar
