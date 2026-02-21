
const uploadCloudinary = require("../config/cloudinary");
const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");
const { io, getReceiverSocketId } = require("../socket/socket");

const sendMessage=async(req,res)=>{
try {
    let sender=req.userId;
    let {receiver}=req.params;
    let{message}=req.body
    let image;
    if(req.file){
        image=await uploadCloudinary(req.file.path)
    }
let conversation = await Conversation.findOne({
    participants: { $all: [sender, receiver] }
})
    let newMessage=await Message.create({
        sender,receiver,message,image
    })
    if(!conversation){
        conversation=await Conversation.create({
            participants:[sender,receiver],
            messages:[newMessage._id]
        })
    }else{
        conversation.messages.push(newMessage._id)
        await conversation.save()
    }
    const receiverSocketId=getReceiverSocketId(receiver)
    console.log("Receiver:", receiver);
    console.log("Socket ID:", receiverSocketId);
    if(receiverSocketId){
    io.to(receiverSocketId).emit("newMessage",newMessage)
    }

    return res.status(201).json(newMessage)
} catch (error) {
    return res.status(500).json("message err",error)
    
}
}

const getMessage = async (req, res) => {
try {
    const sender = req.userId;
    const { receiver } = req.params;

    const conversation = await Conversation.findOne({
    participants: { $all: [sender, receiver] }
    }).populate("messages");

    if (!conversation) {
    return res.status(400).json({message:'conversation is not found'});
    }

    return res.status(200).json(conversation.messages);

} catch (error) {
    console.log("GET MESSAGE ERROR 👉", error);
    return res.status(500).json({
    message: "Message fetch error",
    error: error.message
    });
}
};


module.exports={sendMessage,getMessage};


















// const getMessage=async(req,res)=>{
//     try {
//     let sender=req.userId;
//     let {resever}=req.params;
//     let conversation=await Conversation.findOne( {
//         participants:{$all:[sender,resever]}}).populate("messages")
//         if(!conversation){
//         return res.status(500).json({
//             message:"conversation is not found"
//         })
//         }
//         return res.status(200).json(conversation?.messages)
//     } catch (error) {
//         return res.status(500).json("message err",error)
//     }
// }
