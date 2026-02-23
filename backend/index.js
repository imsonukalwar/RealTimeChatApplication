const express=require("express");
const connect = require("./config/db");
const authRouter = require("./routes/auth.routes.js");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors=require('cors');
const userRouter = require("./routes/user.routes.js");
const messageRoute = require("./routes/message.route.js");
const { app, server } = require("./socket/socket.js");
const port =process.env.PORT||8001;


// const app=express();
app.use(cors(
    {origin:"http://localhost:5173",
    credentials:true
}
))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/message",messageRoute)



server.listen(port,()=>{
    connect();
    console.log(`you are listen at port n0:${port}`);
    
})