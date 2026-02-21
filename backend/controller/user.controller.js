const uploadCloudinary = require("../config/cloudinary");
const User = require("../models/user.model");


const getCurrentUser=async(req,res)=>{
    try {
        let userId=req.userId;
        // let userId=req.id;
        let user=await User.findById(userId).select("-password")
        if(!user){
        return res.status(400).json({
            success:false,
            message:`user is not found`
        })
        }
        return res.status(200).json(user)
    } catch (error) {
    return res.status(500).json({
            success:false,
            message:`getcurrentuser Error: ${error}`
        })
    }
}

// const edietProfile=async(req,res)=>{
//     try {
//         let {name}=req.body;
//         let image;
//         let file = null; 
//         if(req.file){
//             image=await uploadCloudinary(req.file.path)
//         }
//         let user=await User.findByIdAndUpdate(req.userId,{name,image})
//         if(!user){
//             return res.status(400).json({message:"user not found"})
//         }
//         return res.status(200).json(user)
//     } catch (error) {
//     return res.status(500).json({
//             success:false,
//             message:`editprofile Error: ${error}`
//         })
//     }
// }


const edietProfile = async (req, res) => {
  try {
    const { name } = req.body;

    const updateData = {}; 

    if (name) {
      updateData.name = name;
    }

    if (req.file) {
      const imageUrl = await uploadCloudinary(req.file.path);
      updateData.image = imageUrl;
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      updateData,
      { new: true }
    );

    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `editprofile Error: ${error.message}`
    });
  }
};


const getOtherUser=async(req,res)=>{
  try {
    let users=await User.find({
      _id:{$ne:req.userId}
    }).select("-password")
    return res.status(200).send(users)
  } catch (error) {
  return res.status(500).json({
      success: false,
      message: `getotheruser Error: ${error.message}`
    });
  }
}

const search=async(req,res)=>{
  try {
    let {query}=req.query
    if(!query || !query.trim()){
      return res.status(400).json({
            success:false,
            message:`query is required`
        })
    }
    let users=await User.find({
      // _id: { $ne: req.user._id },//this line cgpt
      $or:[
        {name:{$regex:query,$options:"i"}},
        {userName:{$regex:query,$options:"i"}}
      ]
    })
    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `search Error: ${error.message}`
    });
  }
}

module.exports={getCurrentUser,edietProfile,getOtherUser,search};