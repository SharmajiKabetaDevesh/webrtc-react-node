import React from 'react'
import styles from './StepAvatar.module.css'
const StepAvatar = ({onNext}) => {
  return (
    <div>
      Avatar
      <button onClick={onNext}>Next</button>
    </div>
  )
}

export default StepAvatar
