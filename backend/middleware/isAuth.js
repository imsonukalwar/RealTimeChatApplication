const jwt=require('jsonwebtoken')
const isAuth=async(req,res,next)=>{
    try {
        let {token}=req.cookies.token
        if(!token){
        return res.status(400).json({
            success:false,
            message:"Token is not found "
        })
    }
        let payload=await jwt.verify(token,process.env.KEY)
        console.log(payload);
        req.userId=payload.userId
        next()
    } catch (error) {
    return res.status(500).json({
            success:false,
            message:`isAuth Error: ${error}`
        })
    }
}

module.exports=isAuth