import { createSlice } from "@reduxjs/toolkit";


const userSlice=createSlice({
    name:'user',
    initialState:{
        userData:null,
        profileData:null,
        otherUsers:null,
        selectedUser:null,
        socket:null,
        onlineUser:null,
        SearchData:null,
        loading:true,///////////////////
    },
    reducers:{
        setUserData:(state,action)=>{
            state.userData=action.payload
            state.loading=false/////////////////////
        },
                clearUser:(state)=>{//////////////////////
    state.userData=null
    state.loading=false
},
        setOtherUserData:(state,action)=>{
            state.otherUsers=action.payload
        },
        setSelectedUser:(state,action)=>{
            state.selectedUser=action.payload
},
        setSocket:(state,action)=>{
            state.socket=action.payload
        },
        setOnlineUsers:(state,action)=>{
            state.onlineUser=action.payload
            
        },
        setSearchData:(state,action)=>{
            state.SearchData=action.payload
            
        }
    }
    
})

export const {setUserData,setOtherUserData,setSelectedUser,setSocket,setOnlineUsers,setSearchData,clearUser}=userSlice.actions;
export default userSlice.reducer



