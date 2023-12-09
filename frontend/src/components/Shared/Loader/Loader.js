import React from 'react'
import Card from '../card/Card'
import styles from './components/Loader/Loader.module.css'
const Loader = ({message}) => {
  return (
    <div className='cardWrapper'>
      <Card>
      <svg className={styles.spinner}width="120" height="120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="55" stroke="#C4C5C5" stroke-width="10"/>
      <mask id="a" fill="#fff"><path d="M120 60a59.999 59.999 0 1 1-19.584-44.346l-6.719 7.372A50.026 50.026 0 1 0 110.026 60H120Z"/>
      </mask><path d="M120 60a59.999 59.999 0 1 1-19.584-44.346l-6.719 7.372A50.026 50.026 0 1 0 110.026 60H120Z" stroke="#4B3AB1" stroke-width="24" mask="url(#a)"/>
      </svg>
        <span className={StyleSheet.message}>
            {message}

        </span>
      </Card>
    </div>
  )
}

export default Loader
