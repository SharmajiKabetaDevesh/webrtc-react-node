import {createSlice} from '@reduxjs/toolkit'

const intialState={
    name:"",
    avatar:""
};

export const activateSlice=createSlice({
    name:'activate',
    initialState,
    reducers:{
        setName:(state,acton)=>{
state.name=action.payload;
    },
    setAvatar:(state,action)=>{
        state.avatar=action.payload;
    }

    }

})

export const {setName,setAvatar}=authSlice.actions;
export default activateSlice.reducer;