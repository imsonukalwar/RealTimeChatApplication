const express=require('express')
const {sendMessage, getMessage} = require('../controller/message.controller.js');
const isAuth = require('../middleware/isAuth.js');
const upload = require('../middleware/multer.js');

const messageRoute=express.Router()

messageRoute.post("/send/:receiver",isAuth,upload.single("image"),sendMessage)
messageRoute.get("/get/:receiver",isAuth,getMessage)



module.exports=messageRoute;