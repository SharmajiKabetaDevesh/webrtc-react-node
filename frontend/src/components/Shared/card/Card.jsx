import React from 'react'
import styles from './Card.module.css'
import {Link} from 'react-router-dom'

const Card = ({title,icon,children}) => {
  return (
    <div>
       <div className={styles.card}>
      <div className={styles.headingwrapper}>
        <img src = {`/images/${icon}`} alt='logo'/>
        <h1 className={styles.heading}>{title}</h1>
      </div>

      {children}
    
<div>

 
</div>


    </div>
    </div>
  )
}

export default Card
