import React,{useState} from 'react'
import Card from "../../../src/components/Shared/card/Card"
import StepName from "../Steps/StepName/StepName"
import StepAvatar from "../Steps/StepAvatar/StepAvatar"
conststeps={
  1:StepName,
  2:StepAvatar
}
const Activate = () => {
  const[step,setstep]=useState(1);
  const Step=steps[step];
  function onNext(){
    setstep(step+1);
  }
  return (
    <div className="cardWrapper">
      <Step onNext={onNext}/>
    </div>
  )
}

export default Activate
