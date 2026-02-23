

import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { BsCheck2, BsCheck2All } from "react-icons/bs";
import dp from "../assets/dp2.webp";

const SenderMessage=({image,message,time,seen})=>{

const scroll=useRef()
const {userData}=useSelector(s=>s.user)

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
<div className="flex items-end gap-2 justify-end">

<div ref={scroll}
 className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white px-4 py-3 rounded-2xl rounded-br-none shadow max-w-[260px] flex flex-col gap-1">

{image&&<img src={image} className="w-[150px] rounded-lg"/>}
{message&&<span>{message}</span>}

<div className="flex items-center gap-1 text-[11px] self-end opacity-90">
<span>{formatTime(time)}</span>

{seen
 ? <BsCheck2All className="text-blue-200 text-[16px]"/>
 : <BsCheck2 className="text-white text-[16px]"/>
}
</div>

</div>

<div className="w-[34px] h-[34px] rounded-full overflow-hidden border shadow">
<img src={userData?.image||dp} className="w-full h-full object-cover"/>
</div>

</div>
)
}

export default SenderMessage