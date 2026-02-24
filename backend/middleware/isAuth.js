const jwt=require('jsonwebtoken')
const isAuth=async(req,res,next)=>{
    try {
        let token=req.cookies.token
        if(!token){
        return res.status(401).json({
            success:false,
            message:"Token is not found "
        })
    }
        let payload= await jwt.verify(token,process.env.KEY)
        // req.userId=payload.userId
        req.userId=payload.id
        next()
    } catch (error) {
    return res.status(401).json({
            success:false,
            message:`isAuth Error: ${error}`
        })
    }
}

module.exports=isAuth