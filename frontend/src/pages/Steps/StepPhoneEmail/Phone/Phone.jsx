import React,{useState} from 'react'
import styles from '../StepPhoneEmail.module.css'
import Card from '../../../../components/Shared/card/Card';
import Button from '../../../../components/Shared/Button/Button';
import TextInput from '../../../../components/Shared/TextInput/TextInput';

import { sendOtp } from '../../../../http';
import {useDispatch} from 'react-redux';
import {setOtp} from '../../../../store/userSlice'

const Phone = ({onNext}) => {
  const [phoneNumber,setphonenumber]=useState('');
const dispatch=useDispatch()
async function submit(){
  if(!phoneNumber){
    return
  }
  //server request
 const {data}=await sendOtp({phoneNumber});
 console.log(data)
dispatch(setOtp({phone:data.phone,hash:data.hash}))

  onNext();
}

  return (
   
    <Card title="Enter your phone number" icon="telephone.png">
    <TextInput value={phoneNumber} onChange={(e)=>{setphonenumber(e.target.value)}}/>
<div className={styles.actionbuttonwrap}>
<Button text='Next' onClick={submit} />
</div>
<p className={styles.bottompara}>
By entering your number, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!
</p>

    </Card>
  

  )
}

export default Phone;