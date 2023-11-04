import React from 'react';
import {useHistory } from 'react-router-dom';
import Card from '../../components/Shared/card/Card';
import Button from '../../components/Shared/Button/Button.jsx';
import styles from './Home.module.css';

const Home = () => {
 
  const History =useHistory();
  function startRegister(){
    History.push('/authenticate')
  }
  return (
    <div className={styles.cardwrapper}>
      <Card title="Welcome to CodersHouse !!" icon="hand.png">
      <p className={styles.text}>
      We’re working hard to get Coder’s House ready for everyone! 
      While we wrap up the finishing touches, we’re adding people 
      gradually to make sure nothing breaks.
      </p>
<div>
<Button text='Lets Go' onClick={startRegister}/>
  
</div>
<div className={styles.signinwrapper}>
  <span className={styles.invite}>Have an Invite text ?</span>
  

</div>
      </Card>
    
    </div>
  )
}

export default Home;
