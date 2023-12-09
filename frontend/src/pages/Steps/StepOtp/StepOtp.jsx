import React, { useState } from 'react'
import styles from './StepOtp.module.css'
import TextInput from '../../../components/Shared/TextInput/TextInput'
import Card from '../../../components/Shared/card/Card'
import Button from '../../../components/Shared/Button/Button'
import { verifyOtp } from '../../../http'
import {useSelector} from 'recat-redux'
import {setAuth} from "../../../store/userSlice"
import{useDispatch} from 'react-redux'
const StepOtp = ({onNext}) => {
  const [otp, setOtp] = useState('')
  const {phone,hash}=useSelector((state)=>state.authSlice);
async function submit(){
    if(!otp||phone||hash){
        return
    }
    try{
const data=  await verifyOtp({otp,phone,hash});
console.log(data);
dispatchEvent(setAuth(data));
onNext();
    }catch(err){
        console.error(err);
    }
    
    
    //onNext();

}
  return (
    <div className={styles.cardWrapper}>
<Card className={styles.cardotp} title="Enter the OTP we just 
texted you" icon="lock.png">
    <TextInput value={otp} onChange={(e)=>{setOtp(e.target.value)}}/>
<div className={styles.actionbuttonwrap}>
<p className={styles.bottompara}>
Didn’t receive ? Tap to resend
</p>
<Button text='Next' onClick={submit} />
</div>


    </Card>
    </div>

    )
}

export default StepOtp
