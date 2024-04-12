const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user:String,
    name:String,
    mobilenumber:Number,
    pincode:Number,
    location:String,
    area:String,
    city:String,
    state:String,
    isdefault:Boolean
})

module.exports = mongoose.model("address",userSchema);