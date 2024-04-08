const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    userId:String,
    img:String,
    rating:String
})

module.exports = mongoose.model("product",productSchema);