import React, { useState } from 'react'
import styles from './StepName.module.css'
import Button from "../../../../src/components/Shared/Button"
import TextInput from "../../../../src/components/Shared/TextInput/TextInput"
import Card from '../../../components/Shared/card/Card'
import {setName} from "../../../../store/activateSlice"
import {useDispatch,useSelector} from "react-redux"
const StepName = ({onNext}) => {
  const {name}=useSelector((state=>state.activate));
  const dispatch=useDispatch();

  function nextStep(){
    if(!fullname){
      return;
    }
dispatch(setName(fullname)); 

  }
  const[fullname,setname]=useState('')
  return (
    <div className={styles.cardWrapper}>
    <Card className={styles.cardotp} title="What's your fullname?" icon="alien.png">
        <TextInput value={fullname} onChange={(e)=>{setname(e.target.value)}}/>
    <div className={styles.actionbuttonwrap}>
    <p className={styles.bottompara}>
    People use real name at 
     Coder’s House :)
    </p>
    <Button text='Next' onClick={nextStep} />
    </div>
    
    
        </Card>
        </div>
  )
}

export default StepName
