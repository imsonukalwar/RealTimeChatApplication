// import axios from "axios"
// import { useEffect } from "react"
// import { serverUrl } from "../main"
// import { useDispatch, useSelector } from "react-redux"
// import { setUserData } from "../redux/userSlice"


// const GetCurrentUser=()=>{
//     let dispatch=useDispatch()
//     let {userData}=useSelector(state=>state.user)
    
//     useEffect(()=>{
//         const fetchUser=async()=>{
//             try {
//                 let res=await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
//                 dispatch(setUserData(res.data))
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         fetchUser()
//     },[userData]);
// }


import { useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { serverUrl } from "../main";

const GetCurrentUser = () => {
  const dispatch = useDispatch();
  const calledRef = useRef(false); // 🔒 StrictMode safe

  useEffect(() => {
    if (calledRef.current) return; // ❌ double call stop
    calledRef.current = true;

    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/user/current`,
          { withCredentials: true }
        );
        dispatch(setUserData(res.data));
      } catch (err) {
        console.log("No active session",err);
      }
    };

    fetchCurrentUser();
  }, [dispatch]);

  return null; // 👈 ye UI render nahi karta
};

export default GetCurrentUser;
