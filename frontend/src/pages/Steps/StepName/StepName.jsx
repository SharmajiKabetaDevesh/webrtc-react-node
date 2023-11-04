import React from 'react'
import styles from './StepName.module.css'
const StepName = ({onNext}) => {
  return (
    <div>
      Name
      <button onClick={onNext}>Next</button>
    </div>
  )
}

export default StepName
