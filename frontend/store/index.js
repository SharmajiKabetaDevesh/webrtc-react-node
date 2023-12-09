import {configureStore} from '@reduxjs/toolkit'
import auth from'./userSlice'
import activateSlice from './activateSlice'
export const store = configureStore({
    reducer:{
auth,
activate,
    },
})