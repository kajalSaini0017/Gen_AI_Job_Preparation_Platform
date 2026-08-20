const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true,"Username is required for creating Account"],
        unique : true
    },
    email : {
        type : String,
        required : [true,"Email is required for creating user account"],
        unique : [true,"email is already exist"]
    },
    password :{
         type : String,
         required : [true,"Password is required for creating account"]
    }
},{
    timestamps : true
})

const userModel = mongoose.model('users',userSchema);

module.exports = userModel;