import React ,{useState}from 'react'
import styles from './StepPhoneEmail.module.css'
import Phone from './Phone/Phone';
import Email from './Email/Email';
const phoneemailmap={
  phone:Phone,
  email:Email,
};
const StepPhoneEmail = ({onNext}) => {
 
  const [type,setType]=useState('phone');
  const Component = phoneemailmap[type]
 
 
   return (
     <>
     <div className={styles.cardWrapper}>
      <div>
      <div className={styles.buttonWrap}>
      <button className={`${styles.tabbutton}  ${
        type==='phone'?styles.active :'' 
      }`} onClick={()=>{setType('phone')}}>
        <img src="/images/phone.png" alt='phonelogo'/>
      </button>
     <button className={`${styles.tabbutton} ${
        type==='email' ? styles.active :''
      }`} onClick={()=>{setType('email')}}>
     <img src="/images/email-outline.png" alt='emaillogo'/>
     </button>

      </div>

        </div>
      <Component onNext={onNext}/>

     </div>
    
     
     </>
       
     
   )
}

export default StepPhoneEmail
