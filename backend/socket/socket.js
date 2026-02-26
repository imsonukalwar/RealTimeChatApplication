
const http=require("http")
const express=require("express")
const {Server}=require("socket.io")
const Message=require("../models/message.model")

const app=express()
const server=http.createServer(app)

// const io=new Server(server,{
//  cors:{origin:"https://realtimechatapplication-1-qcr5.onrender.com",credentials:true}
// })

const allowedOrigins = [
  "http://localhost:5173",
  "https://real-time-chat-application-up5f.vercel.app",
  "https://realtimechatapplication-1-qcr5.onrender.com",
  "https://chatter10.netlify.app"
];

const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Socket CORS not allowed"));
      }
    },
    credentials: true
  }
});

const userSocketMap={}

const getReceiverSocketId=(id)=>userSocketMap[id]

io.on("connection",(socket)=>{

 const userId=socket.handshake.query.userId
 if(userId) userSocketMap[userId]=socket.id

 io.emit("getOnlineUsers",Object.keys(userSocketMap))

 /* ===== TYPING ===== */
 socket.on("typing",(receiverId)=>{
  const id=getReceiverSocketId(receiverId)
  if(id) io.to(id).emit("typing")
 })

 socket.on("stopTyping",(receiverId)=>{
  const id=getReceiverSocketId(receiverId)
  if(id) io.to(id).emit("stopTyping")
 })

 /* ===== SEEN EVENT ===== */
socket.on("messageSeen",async(data)=>{
//   const {senderId,receiverId}=data
  const senderId=data.senderId?.toString()
  const receiverId=data.receiverId?.toString()

  await Message.updateMany(
    {sender:senderId,receiver:receiverId,seen:false},
    {$set:{seen:true}}
  )

  const senderSocketId=getReceiverSocketId(senderId)
  if(senderSocketId){
    io.to(senderSocketId).emit("messagesSeenUpdated",{senderId})
  }
})

 socket.on("disconnect",()=>{
  delete userSocketMap[userId]
  io.emit("getOnlineUsers",Object.keys(userSocketMap))
 })

})

module.exports={app,server,io,getReceiverSocketId}