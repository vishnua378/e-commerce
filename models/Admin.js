// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// const adminSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     password:{
//         type:String,
//         require:true
//     }

// });

// adminSchema.pre("save",async function(next){
//     const salt = await bcrypt.genSalt(10)
//     this.password=await bcrypt.hash(this.password,salt);
// })

// const Admin = mongoose.model('Admin',adminSchema);

// module.exports = Admin; 