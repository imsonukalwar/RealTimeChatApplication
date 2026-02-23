const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt=require('bcrypt')



const signUp = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const result = await User.findOne({ userName });
    if (result) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    const result1 = await User.findOne({ email });
    if (result1) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const hashpass = await bcrypt.hash(password, 10);
    const user = await User.create({ userName, email, password: hashpass });

    const token = jwt.sign(
      { id: user._id },
      process.env.KEY,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // production me true
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    user.token = token;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User register successful!",
      user:user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message, // 🔥 FIX HERE
    });
  }
};



const login=async(req,res)=>{
    try {
    const {email,password}=req.body;
    if (!email || !password) {
        return res.status(400).json({
        success: false,
        message: "All fields are required"
        });
    }
    const user=await User.findOne({email})
    if(!user){
    return res.status(400).json({
            success:false,
            message:"user is not found "
        })
    }
    const passcomp=await bcrypt.compare(password,user.password)
    if(!passcomp){
    return res.status(400).json({
            success:false,
            message:"Incorrect password !"
        })
    }
    const token = jwt.sign({id:user._id},process.env.KEY,{expiresIn:"7d"})
    res.cookie("token", token, {
    httpOnly: true,
    secure: true, // production me true
    sameSite:"strict",
    maxAge:7*24*60 * 60 * 1000
        });
    await user.save();
    return res.status(202).json({
            success:true,
            message:"User login successfull !",
            user:user,
        })
    } catch (error) {
    return res.status(500).json({
            success:false,
            message:error
        })
    }
}




const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true, // production me true
      sameSite: "strict"
    });

    return res.status(200).json({
      success: true,
      message: "User logout successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};




module.exports={signUp,login,logout}



