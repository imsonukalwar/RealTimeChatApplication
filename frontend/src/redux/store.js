import { configureStore } from "@reduxjs/toolkit"
import messageSlice from './messageSlice.js'
import userSlice from './userSlice.js'
export const store=configureStore({
    reducer:{
        user:userSlice,
        message:messageSlice,
    }
})




// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./userSlice";
// import messageSlice from './message.Slice'
// import {
//   persistStore,
//   persistReducer,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // localStorage

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const persistedReducer = persistReducer(
//   persistConfig,
//   userReducer
// );

// export const store = configureStore({
//   reducer: {
//     user: persistedReducer,
//     message:messageSlice
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false, // 🔴 IMPORTANT
//     }),
// });

// export const persistor = persistStore(store);












// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./userSlice";
// import messageSlice from './message.Slice'
// import {
//   persistStore,
//   persistReducer,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//   key: "root",
//   storage,
//   blacklist: ["socket"]   // 🔥 IMPORTANT FIX
// };

// const persistedReducer = persistReducer(
//   persistConfig,
//   userReducer
// );

// export const store = configureStore({
//   reducer: {
//     user: persistedReducer,
//     message: messageSlice
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//       immutableCheck:false   // 🔥 ADD THIS
//     }),
// });

// export const persistor = persistStore(store);
