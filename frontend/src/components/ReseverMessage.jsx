


import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import dp from "../assets/dp2.webp";

const ReceiverMessage=({image,message,time})=>{

const scroll=useRef()
const {selectedUser}=useSelector(s=>s.user)

useEffect(()=>{
 scroll.current?.scrollIntoView({behavior:"smooth"})
},[message,image])

const formatTime=(t)=>{
 const d=new Date(t||new Date())

 const today=new Date()
 const yesterday=new Date()
 yesterday.setDate(today.getDate()-1)

 const clock=d.toLocaleTimeString([],{
  hour:"2-digit",
  minute:"2-digit"
 })

 if(d.toDateString()===today.toDateString())
   return `Today ${clock}`

 if(d.toDateString()===yesterday.toDateString())
   return `Yesterday ${clock}`

 return `${d.toLocaleDateString([],{
  day:"numeric",
  month:"short"
 })} ${clock}`
}

return(
<div className="flex items-end gap-2">

<div className="w-[34px] h-[34px] rounded-full overflow-hidden border shadow">
<img src={selectedUser?.image||dp} className="w-full h-full object-cover"/>
</div>

<div ref={scroll}
 className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-bl-none shadow max-w-[260px] flex flex-col gap-1">

{image&&<img src={image} className="w-[150px] rounded-lg"/>}
{message&&<span>{message}</span>}

<span className="text-[11px] text-gray-400 self-end">
{formatTime(time)}
</span>

</div>
</div>
)
}

export default ReceiverMessage