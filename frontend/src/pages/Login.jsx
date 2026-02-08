import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../main';

const Login = () => {
    let nevigate=useNavigate()
    let [show,setShow]=useState(false)
    let [email,setEmail]=useState("")
    let [password,setpassword]=useState("")
    let [loading,setLoading]=useState(false)
    let [err,setErr]=useState("")
    const handleLogin=async(e)=>{
        e.preventDefault()
        setLoading(true)
        try {
            let res = await axios.post(`${serverUrl}/api/auth/login`,{
            email,password
            },{withCredentials:true})
            setEmail("")
            setpassword("")
            if(res.data.success)
            console.log(res.data);
        setLoading(false)
        setErr("")
        } catch (error) {
            console.log(error);
            setErr(error.response.data.message)
        }
    }
return (
    <div className="w-full h-[100vh] bg-slate-200 flex items-center justify-center">
    <div className="w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[10px]">
        {/* Header */}
        <div className="w-full h-[200px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex items-center justify-center">
        <h1 className="text-gray-600 font-bold text-[30px]">
            Login to <span className="text-white">Chatter</span>
        </h1>
        </div>

        {/* Form */}
        <form className="w-full flex flex-col gap-[20px] items-center mt-5" onSubmit={handleLogin}>

        <input
            type="email"
            placeholder="email"
            className="w-[90%] h-[50%] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-200 shadow-lg"
            onChange={(e)=>{setEmail(e.target.value
            )}} value={email}

        />

        <div className="w-[90%] h-[50%] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white] overflow-hidden  rounded-lg shadow-gray-200 shadow-lg relative">
            <input
            type={`${show ? "text":"password"}`}
            placeholder="password"
            className="w-full h-full outline-none border-[#20c7ff] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-200 text[19px]"
            onChange= {(e)=>{setpassword(e.target.value
            )}} value={password}
            />
            <span className="absolute top-[10px] right-[20px] text-[19px] text-[#20c7ff] font-semibold cursor-pointer" onClick={()=>setShow(prev=>!prev)}>{`${show ? "hidden":"show"}`}</span>
            </div>
            {/* {err&&<p>{err}</p>} */}
            {err && (
  <div className="mt-3 flex items-center gap-2 rounded-lg border border-red-200 
  bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm animate-shake">
    
    <span className="text-red-600 text-lg">⚠️</span>

    <p className="font-medium">
      Incorrect password.
      <span className="block text-xs text-red-500">
        Please check and try again.
      </span>
    </p>
  </div>
)}

            <button className="px-[20px] py-[10px]
                bg-[#20c7ff]
                hover:bg-[#0bb3e8]
                rounded-2xl
                shadow-gray-400 shadow-lg
                hover:shadow-xl
                text-[20px]
                w-[200px]
                mt-[20px]
                font-semibold
                cursor-pointer
                transition-all
                duration-300
                hover:scale-105"  disabled={loading}>{loading?"Loading...":"Login"}</button>
            <p>Want to create new account ?  <span className="text-blue-400 cursor-pointer text-[bold]" onClick={()=>nevigate('/signup')}>SignUp</span></p>
        </form>
    </div>
</div>
);
}

export default Login
