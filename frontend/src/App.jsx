import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes} from 'react-router-dom'
import { io } from 'socket.io-client'
import GetCurrentUser from './custumHooks/getCurrentUser'
import useGetOtherUser from './custumHooks/getOtherUser'
import { serverUrl } from './main'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import { setOnlineUsers, setSocket } from './redux/userSlice'
    import { Navigate } from "react-router-dom";

const App = () => {
    let {userData,socket,onlineUser}=useSelector(state=>state.user)
    let dispatch=useDispatch()
    useGetOtherUser()
useEffect(()=>{
    if(userData){
        const socketIo=io(`${serverUrl}`,{query:{
    userId:userData?._id},
    withCredentials:true
})
dispatch(setSocket(socketIo))
socketIo.on("getOnlineUsers",(users)=>{
    dispatch(setOnlineUsers(users))
})
return  ()=>
socketIo.close()
    }else{
        if(socket){
            socket.close()
            dispatch(setSocket(null))
        }
    }
},[userData,dispatch,serverUrl])
return (
    <> 
    <GetCurrentUser/>
    {/* <Routes>
        <Route path='/login'  element={<Login/>} />
        <Route path='/signup'  element={<SignUp/>} />
        <Route path='/' element={<Home/>} />
        <Route path='/profile'  element={<Profile/>} />

    </Routes> */}
    <Routes>

  {/* Login */}
  <Route 
    path="/login"  
    element={!userData ? <Login/> : <Navigate to="/" />} 
  />

  {/* Signup */}
  <Route 
    path="/signup"  
    element={!userData ? <SignUp/> : <Navigate to="/" />} 
  />

  {/* Home */}
  <Route 
    path="/" 
    element={userData ? <Home/> : <Navigate to="/login"/>} 
  />

  {/* Profile */}
  <Route 
    path="/profile"  
    element={userData ? <Profile/> : <Navigate to="/login"/>} 
  />

</Routes>
    </>
)
}

export default App
















{/* <Route path='/login'  element={!userData?<Login/>:<Navigate to="/"/>}/>
        <Route path='/signup'  element={userData?<SignUp/>:<Navigate to="/profile"/>} />
        <Route path='/' element={userData?<Home/>:<Navigate to="/login"/>} />
        <Route path='/profile'  element={userData?<Profile/>:<Navigate to="/signup"/>} /> */}