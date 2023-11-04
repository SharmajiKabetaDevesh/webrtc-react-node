import React, { useState } from 'react'
import styles from '../StepPhoneEmail.module.css'
import Card from '../../../../components/Shared/card/Card';
import Button from '../../../../components/Shared/Button/Button';
import TextInput from '../../../../components/Shared/TextInput/TextInput';
const Email = ({onNext}) => {
  const [email,setemail]=useState('');
  return (
    
    <Card title="Enter your Email Id" icon="emojiemail.png">
    <TextInput value={email} onChange={(e)=>{setemail(e.target.value)}}/>
<div className={styles.actionbuttonwrap}>
<Button text='Lets Go' onClick={onNext} />

</div>
<p className={styles.bottompara}>

By entering your email, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!
</p>
    </Card>
  

  )
}

export default Email
