const mongoose=require('mongoose')

const connect=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("db is connected ");
        
    } catch (error) {
        console.log("db error:",error);
        
    }
}

module.exports=connect