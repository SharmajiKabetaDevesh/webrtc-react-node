import React,{useState} from 'react'
import styles from '../StepPhoneEmail.module.css'
import Card from '../../../../components/Shared/card/Card';
import Button from '../../../../components/Shared/Button/Button';
import TextInput from '../../../../components/Shared/TextInput/TextInput';
const Phone = ({onNext}) => {
  const [phoneNumber,setphonenumber]=useState('');
  return (
   
    <Card title="Enter your phone number" icon="telephone.png">
    <TextInput value={phoneNumber} onChange={(e)=>{setphonenumber(e.target.value)}}/>
<div className={styles.actionbuttonwrap}>
<Button text='Next' onClick={onNext} />
</div>
<p className={styles.bottompara}>
By entering your number, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!
</p>

    </Card>
  

  )
}

export default Phone;