const mongoose = require("mongoose");
const mongourl = process.env.MONGO_URL;

const dbconnect=()=>{
    try{
        mongoose.connect(mongourl).then(()=>{
            console.log("mongodb connected successfully")
        })
    }catch(err){
        console.log("database error")
    }
}

module.exports=dbconnect;