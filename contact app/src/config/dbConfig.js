const  mongoose  = require("mongoose")

const ConnectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
    }
    catch(err){
        throw err;
    }
}

module.exports={ConnectDB};