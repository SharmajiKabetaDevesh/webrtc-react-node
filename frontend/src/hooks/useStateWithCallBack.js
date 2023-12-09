
import { useCallback,useEffect,useRef ,useState} from "react"
export const useStateWIthCallBack =(initialState)=>{

    const[state,setState]=useState(initialState)
    const cbRef=useRef();
   const updateState=useCallback((newState,cb)=>{
cbRef.current=cb;
setState((prev=>{
    return typeof newState ==='function'?newState(prev):newState;
}))
   },[]) 

   useEffect(()=>{
    if(cbRef.current){
        cbRef.current(state);
        cbRef.current=null;
    }

   },[state])
    return [state,updateState]
    // useState([
    //     {
    //         id:1,
    //         name:'Devesh Sharma'
    //     },
    //     {
    //         id:2,
    //         name:'John Doe'
    //     }
    // ])
}