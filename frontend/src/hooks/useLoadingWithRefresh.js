import axios from 'axios';
import{useEffect, useState} from'react'

import { useDispatch } from 'react-redux';
import { setAuth } from '../../store/userSlice';
export function useLoadingWithRefresh(){
    const dispatch=useDispatch();
    const [loading,setloading]=useState(false);
    useEffect(()=>{
(async()=>{
    try{
        const {data}=await axios.get(`${process.env.REACT_APP_API_URL}/api/refresh`,{
            withCredentials:true
        })
        dispatch(setAuth(data));
        setLoading=false;
    }catch(err){
console.log(err)
setLoading(false);
    }
    
})

    },[]);

    return{loading};

}