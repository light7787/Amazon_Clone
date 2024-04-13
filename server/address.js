const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    username:String,
    name:String,
    mobile:Number,
    pincode:Number,
    location:String,
    area:String,
    city:String,
    state:String,
    isdefault:Boolean
})

module.exports = mongoose.model("address",addressSchema);