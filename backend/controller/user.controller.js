const User = require("../models/user.model");


const getCurrentUser=async(req,res)=>{
    try {
        let userId=req.userId;
        let user=await User.findById(userId).select("-password")
        if(!user){
        return res.status(500).json({
            success:false,
            message:`user is not found`
        })
        }
        return res.status(200).json(user)
    } catch (error) {
    return res.status(500).json({
            success:false,
            message:`isAuth Error: ${error}`
        })
    }
}

module.exports={getCurrentUser};