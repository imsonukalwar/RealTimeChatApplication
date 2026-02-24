
import axios from 'axios';
import EmojiPicker from 'emoji-picker-react';
import { useEffect, useRef, useState } from "react";
import { BsFillSendCheckFill } from "react-icons/bs";
import { FaImages } from "react-icons/fa6";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { RiEmojiStickerLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import dp from '../assets/dp2.webp';
import { serverUrl } from '../main';
import { setMessages } from '../redux/messageSlice';
import { setSelectedUser } from '../redux/userSlice';
import ReceiverMessage from './ReseverMessage';
import SenderMessage from './SenderMessage';

function MessageArea() {

  const {selectedUser,userData,socket} = useSelector(state=>state.user)
  const {messages} = useSelector(state=>state.message)
  const dispatch = useDispatch()

  const [showPicker,setShowPicker]=useState(false)
  const [input,setInput]=useState("")
  const [frontImage,setFrontImage]=useState("")
  const [backImage,setBackImage]=useState("")
  const [isTyping,setIsTyping]=useState(false)

  const image=useRef()
  const bottomRef=useRef()

  /* ===== helper ids ===== */
  const getSenderId=(m)=> typeof m.sender==="object" ? m.sender?._id : m.sender
  const getReceiverId=(m)=> typeof m.receiver==="object" ? m.receiver?._id : m.receiver

  /* ===== filter chat ===== */
  const filteredMessages = messages?.filter(m=>{
    const sender=getSenderId(m)?.toString()
    const receiver=getReceiverId(m)?.toString()
    const me=userData?._id?.toString()
    const other=selectedUser?._id?.toString()

    return (
      (sender===me && receiver===other) ||
      (sender===other && receiver===me)
    )
  })

  /* ================= IMAGE ================= */
  const handleImage=(e)=>{
    const file=e.target.files[0]
    if(!file) return
    setBackImage(file)
    setFrontImage(URL.createObjectURL(file))
  }

  /* ================= SEND ================= */
  const handleSendMessage=async(e)=>{
    e.preventDefault()
    if(input.length===0 && !backImage) return

    try{
      const formData=new FormData()
      formData.append("message",input)
      if(backImage) formData.append("image",backImage)

      const res=await axios.post(
        `${serverUrl}/api/message/send/${selectedUser._id}`,
        formData,
        {withCredentials:true}
      )

      // ⚠️ keep same redux pattern
      dispatch(setMessages([...messages,res.data]))

      setInput("")
      setFrontImage(null)
      setBackImage(null)

    }catch(err){
      console.log(err)
    }
  }

  /* ================= SOCKET ================= */
  useEffect(()=>{
    if(!socket) return

    const handleNewMessage=(mess)=>{
      dispatch(setMessages([...messages,mess]))
    }

    const typingStart=()=>setIsTyping(true)
    const typingStop=()=>setIsTyping(false)

    socket.on("newMessage",handleNewMessage)
    socket.on("typing",typingStart)
    socket.on("stopTyping",typingStop)

    return ()=>{
      socket.off("newMessage",handleNewMessage)
      socket.off("typing",typingStart)
      socket.off("stopTyping",typingStop)
    }

  },[socket,messages])

  /* ================= AUTO SCROLL ================= */
  useEffect(()=>{
    bottomRef.current?.scrollIntoView({behavior:"smooth"})
  },[filteredMessages])

  /* ================= SEEN EMIT ================= */
  useEffect(()=>{
    if(!socket || !selectedUser || !userData) return

    socket.emit("messageSeen",{
      senderId:selectedUser._id,
      receiverId:userData._id
    })

  },[selectedUser,socket,userData])

  /* ================= SEEN LISTEN ================= */
  useEffect(()=>{
    if(!socket) return

    const handleSeenUpdate=(data)=>{
      dispatch(setMessages(
        messages.map(m=>{
          const senderId=getSenderId(m)?.toString()
          return senderId===data.senderId?.toString()
            ? {...m,seen:true}
            : m
        })
      ))
    }

    socket.on("messagesSeenUpdated",handleSeenUpdate)
    return ()=>socket.off("messagesSeenUpdated",handleSeenUpdate)

  },[socket,messages])

  /* ================= UI ================= */
  return (
  <div className={`lg:w-[70%] ${selectedUser?"flex":"hidden"} lg:block w-full h-screen bg-slate-300 border-l-2 border-gray-300`}>

    {!selectedUser ? (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1 className="text-gray-700 font-semibold text-[50px]">
          Welcome to Chatter
        </h1>
        <span className="text-gray-700 font-semibold text-[30px]">
          Chat friendly....
        </span>
      </div>
    ) : (

    <div className="w-full h-full flex flex-col">

      {/* HEADER */}
      <div className='w-full h-[90px] bg-[#1797c2] rounded-b-[30px] shadow flex items-center px-[20px] gap-[20px]'>

        <div className='cursor-pointer' onClick={()=>dispatch(setSelectedUser(null))}>
          <HiArrowNarrowLeft className="h-[25px] w-[29px] text-white"/>
        </div>

        <div className="w-[50px] h-[50px] rounded-full overflow-hidden bg-white shadow">
          <img src={selectedUser?.image||dp} className="w-full h-full object-cover"/>
        </div>

        <h1 className='text-white font-semibold text-[20px]'>
          {selectedUser?.name||"User"}
        </h1>
      </div>

      {/* MESSAGE AREA */}
      <div className="flex-1 overflow-y-auto py-[25px] px-[20px] flex flex-col gap-[15px]">

        {filteredMessages?.map((mess,i)=>{

          const senderId=getSenderId(mess)?.toString()
          const myId=userData?._id?.toString()
          const msgText=mess.message || mess.text || ""

          return senderId===myId
            ? <SenderMessage key={i} image={mess.image} message={msgText} time={mess.createdAt} seen={mess.seen}/>
            : <ReceiverMessage key={i} image={mess.image} message={msgText} time={mess.createdAt}/>
        })}

        {isTyping && (
          <div className="flex items-center gap-2">
            <div className="bg-white px-4 py-2 rounded-2xl shadow">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:.2s]"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:.4s]"></span>
              </div>
            </div>
            <span className="text-sm text-gray-500">
              {selectedUser?.name} typing...
            </span>
          </div>
        )}

        <div ref={bottomRef}/>
      </div>

      {/* INPUT */}
      <div className="w-full p-3 bg-slate-300">

        {showPicker &&
          <div className="absolute bottom-[110px] left-[40px] z-[100]">
            <EmojiPicker width={250} height={350} onEmojiClick={(e)=>setInput(p=>p+e.emoji)}/>
          </div>
        }

        <img src={frontImage} className='w-[80px] absolute bottom-[120px] right-[40px] rounded-lg shadow'/>

        <form className="w-full h-[60px] rounded-full bg-[#05baf7] flex items-center gap-[20px] px-[20px]" onSubmit={handleSendMessage}>

          <RiEmojiStickerLine className="w-[25px] h-[25px] text-white cursor-pointer"
            onClick={()=>setShowPicker(p=>!p)}
          />

          <input type='file' ref={image} hidden accept='image/*' onChange={handleImage}/>

          <input
            type="text"
            className="w-full h-full bg-transparent outline-none text-white placeholder-white text-[18px]"
            placeholder="message..."
            value={input}
            onChange={(e)=>{
              setInput(e.target.value)
              socket?.emit("typing",selectedUser._id)
              setTimeout(()=>socket?.emit("stopTyping",selectedUser._id),1200)
            }}
          />

          <FaImages className="w-[24px] h-[24px] text-white cursor-pointer"
            onClick={()=>image.current.click()}
          />

          {(input.length>0 || backImage) &&
            <button>
              <BsFillSendCheckFill className="w-[24px] h-[24px] text-white"/>
            </button>
          }

        </form>
      </div>

    </div>
    )}
  </div>
  );
}

export default MessageArea;

