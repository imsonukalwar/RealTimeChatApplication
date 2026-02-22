const express=require('express');
const {getCurrentUser, edietProfile, getOtherUser,search} = require('../controller/user.controller.js');
const isAuth = require('../middleware/isAuth.js');
const upload = require('../middleware/multer.js');


const userRouter=express.Router()

userRouter.get("/current",isAuth,getCurrentUser)
userRouter.put("/profile",isAuth,upload.single("image"),edietProfile)
userRouter.get("/others",isAuth,getOtherUser)
userRouter.get("/search",isAuth,search)


module.exports=userRouter;