import React, { useState } from 'react'
import styles from './StepOtp.module.css'
import TextInput from '../../../components/Shared/TextInput/TextInput'
import Card from '../../../components/Shared/card/Card'
import Button from '../../../components/Shared/Button/Button'

const StepOtp = ({onNext}) => {
  const [otp, setOtp] = useState('')

  return (
    <div className={styles.cardWrapper}>
<Card className={styles.cardotp} title="Enter the OTP we just 
texted you" icon="lock.png">
    <TextInput value={otp} onChange={(e)=>{setOtp(e.target.value)}}/>
<div className={styles.actionbuttonwrap}>
<p className={styles.bottompara}>
Didn’t receive ? Tap to resend
</p>
<Button text='Next' />
</div>


    </Card>
    </div>

    )
}

export default StepOtp
