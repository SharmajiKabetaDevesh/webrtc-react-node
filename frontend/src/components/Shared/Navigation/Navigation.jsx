import React from 'react'
import {Link}  from 'react-router-dom'
import styles from './Navigation.module.css'
import {useSelector, useDispatch } from 'react-redux'
import {logout} from '../../../http/index'
import { setAuth } from '../../../../store/userSlice'

const Navigation = () => {
const dispatch=useDispatch();
const{isAuth,user}=useSelector((state)=>{state.auth})
  async function logoutUser(){
    try{
    const{data}=  await logout();
      dispatchEvent(setAuth(data))
    }catch(err)
    {
      console.log(err)
    }

  };
    const brandStyle={
        color:'#fff',
        textDecoration:'none',
        fontWeight:'bold',
        fontSize:'22px',
        display:'flex',
        alignItems:'center'
    }

    const logoText={
        marginLeft:'10px'
    }
  return (
    <nav className={`${styles.navbar} container`}>
    <div>
       <Link style={brandStyle} to="/">

        <img src='/images/hand.png' alt='logo'/>
        <span style={logoText}>CodersHouse</span>
      </Link>
  {isAuth&&  <div className={styles.navRight}>
<h3>{user?.name}</h3>
{user.avatar&&<Link to="/">
  <img src={user.avatar?user.avatar:'/images/monkey.png'}className={styles.avatar} width="40" height="40" alt="avatar"/>
  </Link>}
  {isAuth && <button className={styles.logoutButton}onClick={logoutUser}><img src='alien.png' alt='logout'></img></button>}
    </div>}


    
    </div>
    </nav>
    
  )
}

export default Navigation
