import { configureStore } from "@reduxjs/toolkit"
import messageSlice from './messageSlice.js'
import userSlice from './userSlice.js'
export const store=configureStore({
    reducer:{
        user:userSlice,
        message:messageSlice,
    }
})