const express=require('express');
const {getCurrentUser} = require('../controller/user.controller.js');
const isAuth = require('../middleware/isAuth.js');


const userRouter=express.Router()

userRouter.post("/current",isAuth,getCurrentUser)





module.exports=userRouter;